# RUNBOOK — Conectar aceropciones.com.mx a Vercel

Ruta elegida: **mover la zona DNS a Cloudflare** (cuenta TitanGeek), y desde ahí apuntar
el sitio a Vercel. El correo se queda intacto en el servidor de Neoclan.

**Tiempo:** 40–60 min de trabajo · **Caída esperada de correo:** ninguna
**Punto de no retorno:** el Paso 5. Todo lo anterior es reversible sin consecuencias.

---

## ⚠️ LAS TRES REGLAS

1. **Todo en gris, "DNS only".** Si `mail`, `webmail` o `cpanel` quedan proxeados
   (nube naranja), **el correo deja de funcionar**. Es el error número uno.
2. **No toques los nameservers en Akky hasta el Paso 5.** Primero se verifica.
3. **No borres nada en Neoclan ni en el cPanel** por lo menos dos semanas. Esa zona
   es tu red de seguridad.

---

## PASO 0 · Crear la cuenta de Cloudflare *(tú)*

1. Ve a `dash.cloudflare.com/sign-up`
2. Regístrate con un correo **de rol**, no personal: `dns@titangeek.com.mx` o
   `infra@titangeek.com.mx`
3. Verifica el correo
4. **Activa 2FA de inmediato** — My Profile → Authentication → Two-Factor.
   Guarda los códigos de respaldo en tu gestor de contraseñas.

> No pases al Paso 1 sin el 2FA activo. Esta cuenta va a controlar el DNS de todos
> tus clientes.

---

## PASO 1 · Agregar el dominio en Cloudflare

1. **Add a domain** → escribe `aceropciones.com.mx`
2. Elige el plan **Free**
3. Cloudflare escanea la zona y precarga los registros que encuentre

⚠️ **No confíes en el escaneo.** Suele traer bien lo básico y perder cosas. En el
Paso 2 se verifica registro por registro.

Cloudflare te va a mostrar **dos nameservers** asignados a tu cuenta
(tipo `xxx.ns.cloudflare.com`). **Apúntalos, pero no los uses todavía.**

---

## PASO 2 · Dejar la zona idéntica a la original

Esta es la lista real, obtenida por transferencia de zona desde `dns1.neoclan.net.mx`.
Compara lo que importó Cloudflare contra esta tabla. Agrega lo que falte, corrige lo
que difiera, **borra lo que Cloudflare haya inventado**.

### Registros que NO cambian (el correo y el hosting)

| Tipo | Nombre | Contenido | Proxy |
|---|---|---|---|
| MX | `@` | `mail.aceropciones.com.mx` · prioridad **10** | — |
| A | `mail` | `201.158.32.60` | 🔘 **DNS only** |
| A | `webmail` | `201.158.32.60` | 🔘 **DNS only** |
| A | `cpanel` | `201.158.32.60` | 🔘 **DNS only** |
| A | `whm` | `201.158.32.60` | 🔘 **DNS only** |
| A | `webdisk` | `201.158.32.60` | 🔘 **DNS only** |
| A | `cpcalendars` | `201.158.32.60` | 🔘 **DNS only** |
| A | `cpcontacts` | `201.158.32.60` | 🔘 **DNS only** |

### Registros TXT (autenticación de correo — críticos)

| Nombre | Contenido |
|---|---|
| `@` | `v=spf1 ip4:201.158.32.34 ip4:201.158.32.60 include:_spfmx.neoclan.net.mx +a +mx ~all` |
| `_dmarc` | `v=DMARC1;p=none;sp=none;adkim=r;aspf=r;pct=100;fo=0;rf=afrf;ri=86400` |
| `default._domainkey` | *(el DKIM completo — ver abajo)* |

**DKIM completo, en una sola línea:**

```
v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvLR8ZZ94oGzNVqaECYZDwN8C1CsSxzlH45KDBxk+oJeZJGpLKWKnRFGYTEEKwcpCE8nkSdlylLjz4NIJMxfQ89x6gNVBud3wCDsP6Ttbyam4CyhHpUaUkeFvt9WBmscxtmhzNReAAjXwXvZYKd53SLYcnaTqSSE5fdAByTGRrYikf0X2R4kWVuBZLviS+gRYeBkO+KrZ3NqAX87NmHr0pKRhaOXjRsiJ1XX3CXtITUcbio4NUC/cc+kRIFLz5etsBZmAcRQynWstGHoU3soFr4tP9KUMnNlfZ0tfAsol7uDYy0P3Wi7Vi2oalMFbhqdmTfNP/+6W+bwU3/YTIW9wJwIDAQAB;
```

> Si Cloudflare ya lo importó, **déjalo como está** — no lo retecleés. Un carácter
> mal copiado en el DKIM rompe la firma de todos los correos salientes.

### Los dos que SÍ cambian

Se llenan en el Paso 3, con los valores que dé Vercel.

| Tipo | Nombre | Antes | Ahora |
|---|---|---|---|
| A | `@` | `201.158.32.60` | *IP de Vercel* |
| CNAME | `www` | *(era A a `201.158.32.60`)* | *CNAME de Vercel* |

### Lo que NO se copia

Estos existen en el cPanel pero **no** en la zona real. Son basura local — si
Cloudflare los importó, bórralos:

- `ftp` (no existe en la zona viva)
- `_cpanel-dcv-test-record`
- Los 5 registros `_acme-challenge.*`

### Ajustes de la zona

- **SSL/TLS → Overview:** ponlo en **Full (strict)**
- **TTL:** deja **Auto** en todo (Cloudflare usa 300s → reversa rápida)

---

## PASO 3 · Agregar el dominio en Vercel

1. Proyecto `aceropciones` → **Settings → Domains → Add**
2. Escribe `aceropciones.com.mx` y acepta que agregue también `www`
3. **Canónico:** el dominio raíz sin `www` como principal; `www` redirige con 308
   *(igual que hicimos en TitanGeek, y consistente con la papelería de AOM)*
4. Vercel te muestra los dos valores. Cópialos a Cloudflare, **ambos en DNS only**

> Vercel va a marcar *"Invalid Configuration"*. Es normal — todavía no cambiamos
> los nameservers. Se corrige solo en el Paso 5.
>
> *Referencia: en TitanGeek la IP fue `216.198.79.1` y el CNAME era único del
> proyecto. **No reutilices los de TitanGeek** — cada proyecto tiene los suyos.*

---

## PASO 4 · ✅ VERIFICAR ANTES DE TOCAR NADA

**Este paso es el que hace que todo lo demás sea seguro.** Los nameservers de
Cloudflare ya responden aunque el dominio no esté delegado todavía.

Avísame y corro la comparación: consulto los 15 registros directo a los nameservers
de Cloudflare y los contrasto contra la zona original de Neoclan.

Si algo no coincide, se corrige aquí — **sin que nada esté en producción**.

No sigas al Paso 5 hasta que la comparación salga limpia.

---

## PASO 5 · 🔴 Cambiar los nameservers en Akky *(tú — punto de no retorno)*

1. Entra a `portal.akky.mx` → **MIS DOMINIOS**
2. En `aceropciones.com.mx`, abre el menú **•••**
3. Busca la opción de **servidores DNS / nameservers**

> ⚠️ **NO es "DNS Personalizado"** — ese es un servicio de paga de Akky ($174 MXN)
> y no lo necesitas. Tú solo vas a cambiar a qué nameservers apunta el dominio,
> que es gratis.

4. Reemplaza `dns1.neoclan.net.mx` y `dns2.neoclan.net.mx` por los dos de Cloudflare
5. Guarda

**Qué pasa ahora:** durante la propagación, unos resolvers preguntan a Neoclan y otros
a Cloudflare. Como ambos responden lo mismo en todo lo del correo, **nadie nota nada**.
Lo único que cambia según quién conteste es el sitio web: unos ven el viejo, otros el
nuevo. Se estabiliza entre 15 minutos y 2 horas.

---

## PASO 6 · Verificación final

Avísame y compruebo:

```bash
dig NS  aceropciones.com.mx +short          # → los de Cloudflare
dig A   aceropciones.com.mx +short          # → la IP de Vercel
dig MX  aceropciones.com.mx +short          # → mail.aceropciones.com.mx  ← CRÍTICO
dig A   mail.aceropciones.com.mx +short     # → 201.158.32.60             ← CRÍTICO
dig TXT aceropciones.com.mx +short          # → el SPF intacto
curl -sI https://aceropciones.com.mx/       # → 200
```

**Y la prueba que de verdad importa, que solo tú puedes hacer:**

- [ ] Mandar un correo **desde** una cuenta @aceropciones.com.mx a tu Gmail
- [ ] Responderlo **hacia** esa cuenta y confirmar que llegó
- [ ] Entrar a `webmail.aceropciones.com.mx` y que abra
- [ ] Que el correo enviado **no caiga en spam** (eso valida SPF y DKIM)

En Vercel, el dominio debe pasar a **"Valid Configuration"** y emitir el SSL solo.

---

## PLAN DE REVERSA

**Nivel 1 — algo está mal en un registro.**
Corriges en Cloudflare. Con TTL de 300s se propaga en minutos.

**Nivel 2 — botón de pánico.**
Regresas los nameservers en Akky a `dns1.neoclan.net.mx` y `dns2.neoclan.net.mx`.
La zona de Neoclan sigue ahí intacta, sin un solo cambio. Tarda más (delegación),
pero devuelve todo al estado original.

---

## CIERRE (los días siguientes)

- [ ] Avisar a AOM que su correo sigue igual y el sitio nuevo ya está en línea
- [ ] Escribir a Neoclan: **el DNS ahora lo administra TitanGeek.** Que si alguna vez
      cambian la IP del servidor de correo, tienen que avisarte — ya no pueden
      actualizarla ellos
- [ ] Dejar constancia en la entrega: *"la administración DNS quedó alojada en la
      cuenta de TitanGeek"*
- [ ] Definir con AOM el costo del hosting: **sigue siendo necesario para el correo**
- [ ] A las 2 semanas, si todo está estable: dar de baja el sitio viejo del servidor
- [ ] *(Opcional, aparte)* Quitar el mecanismo `+a` del SPF. Con la raíz en Vercel,
      ese `+a` autoriza a Vercel a enviar correo como AOM. Inofensivo, pero
      innecesario — el SPF ya lleva las IPs explícitas. **No lo hagas el mismo día.**

---

## RESPALDO — la zona original completa

Si todo se pierde, con esto se reconstruye. Obtenida por AXFR el 10/ago/2026.

```dns
aceropciones.com.mx.          14400  SOA   dns1.neoclan.net.mx. postmaster.neoclan.net.mx. 2025032601
aceropciones.com.mx.          14400  NS    dns1.neoclan.net.mx.
aceropciones.com.mx.          14400  NS    dns2.neoclan.net.mx.
aceropciones.com.mx.          14400  A     201.158.32.60
www.aceropciones.com.mx.      14400  A     201.158.32.60
aceropciones.com.mx.             60  MX    10 mail.aceropciones.com.mx.
mail.aceropciones.com.mx.        60  A     201.158.32.60
webmail.aceropciones.com.mx.  14400  A     201.158.32.60
cpanel.aceropciones.com.mx.   14400  A     201.158.32.60
whm.aceropciones.com.mx.      14400  A     201.158.32.60
webdisk.aceropciones.com.mx.  14400  A     201.158.32.60
cpcalendars.aceropciones.com.mx. 14400 A   201.158.32.60
cpcontacts.aceropciones.com.mx.  14400 A   201.158.32.60
aceropciones.com.mx.          14400  TXT   "v=spf1 ip4:201.158.32.34 ip4:201.158.32.60 include:_spfmx.neoclan.net.mx +a +mx ~all"
_dmarc.aceropciones.com.mx.    3600  TXT   "v=DMARC1;p=none;sp=none;adkim=r;aspf=r;pct=100;fo=0;rf=afrf;ri=86400"
default._domainkey.aceropciones.com.mx. 14400 TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvLR8ZZ94oGzNVqaECYZDwN8C1CsSxzlH45KDBxk+oJeZJGpLKWKnRFGYTEEKwcpCE8nkSdlylLjz4NIJMxfQ89x6gNVBud3wCDsP6Ttbyam4CyhHpUaUkeFvt9WBmscxtmhzNReAAjXwXvZYKd53SLYcnaTqSSE5fdAByTGRrYikf0X2R4kWVuBZLviS+gRYeBkO+KrZ3NqAX87NmHr0pKRhaOXjRsiJ1XX3CXtITUcbio4NUC/cc+kRIFLz5etsBZmAcRQynWstGHoU3soFr4tP9KUMnNlfZ0tfAsol7uDYy0P3Wi7Vi2oalMFbhqdmTfNP/+6W+bwU3/YTIW9wJwIDAQAB;"
```

**Datos de contexto:** registrador Akky (expira 05/mar/2027) · servidor
`201.158.32.60` · cPanel usuario `aceropcionescom` · **26 cuentas de correo activas**
