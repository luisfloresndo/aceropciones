# PLAN — Conectar aceropciones.com.mx a Vercel

Verificado el 10 de agosto de 2026 contra los servidores autoritativos y el cPanel.
**Actualizado:** se obtuvo la zona completa por transferencia AXFR. Ya no hay incógnitas.

---

## RESUMEN EN UNA LÍNEA

Se cambian **dos registros DNS**. Nada más. El correo de las 26 cuentas no se toca.
**El Zone Editor del cPanel es una copia muerta — editarlo no cambia nada.** La zona real
la sirve Neoclan, y ya la tenemos completa (§2.B).

---

## 1. ESTADO ACTUAL (verificado)

| Elemento | Valor | Dónde |
|---|---|---|
| **Registrador** | Akky | portal.akky.mx |
| **Nameservers** | `dns1.neoclan.net.mx` · `dns2.neoclan.net.mx` | (SOA responde `dns5.neoclan.net.mx`) |
| **Servidor web/correo** | `201.158.32.60` (IP dedicada) | cPanel, usuario `aceropcionescom` |
| **Cuentas de correo activas** | **26 de 120** | En el mismo servidor |
| **Sitio nuevo** | `aceropciones.vercel.app` — en producción, sano | Vercel (plan Pro) |
| **Dominio en Vercel** | ❌ **Aún no agregado** | — |

### Dominios de AOM

| Dominio | Estado |
|---|---|
| `aceropciones.com.mx` | ✅ Activo y delegado. Sitio + correo |
| `aceropciones.mx` | Registrado en Akky, **sin nameservers** (no resuelve) |
| `acerociones.com.mx` | Registrado en Akky, **sin nameservers** (defensivo por error de tecleo) |

---

## 2.A ⚠️ EL cPANEL ES UNA COPIA MUERTA (comprobado)

El **Zone Editor del cPanel** NO es la zona que se sirve al público. Comprobado registro
por registro contra `dns1.neoclan.net.mx`:

| Registro | En el cPanel | Lo que Neoclan sirve de verdad |
|---|---|---|
| MX | → `aceropciones.com.mx` (raíz) | → `mail.aceropciones.com.mx` (TTL 60) |
| `mail` | **CNAME** → raíz | **Registro A** → 201.158.32.60 (TTL 60) |
| `www` | **CNAME** → raíz | **Registro A** → 201.158.32.60 |
| `ftp` | A → 201.158.32.60 | **No existe** |
| SPF | incluye `ip4:...32.25` **y** `...32.34` | solo `ip4:...32.34` |
| `_cpanel-dcv-test-record` | Existe | **No existe** |
| `_acme-challenge.*` (5 registros) | Existen | **No existe ninguno** |

**Prueba definitiva:** el serial del SOA en Neoclan es `2025032601` — 26 de marzo de 2025.
Si el cPanel escribiera en la zona viva, el serial se habría movido con cada renovación de
AutoSSL. No se ha movido en más de un año.

> ### ⛔ Regla operativa
> **No edites el Zone Editor del cPanel para este cambio. No sirve de nada.**
> Cualquier modificación ahí se queda en el servidor y nunca llega al DNS público.

### Además: el dominio del typo

`acerociones.com.mx` (sin la "p") también tiene una zona escrita en el cPanel, pero **no
tiene nameservers asignados en Akky** — nadie consulta esa zona jamás. Sirve solo como
defensa de marca. Más adelante conviene delegarlo y redirigirlo al dominio bueno.

---

## 2.B ✅ LA ZONA REAL COMPLETA (obtenida por AXFR)

Los nameservers de Neoclan permiten transferencia de zona, así que tenemos la lista
**completa y exacta** — 16 registros, sin suposiciones:

```dns
aceropciones.com.mx.          14400  SOA   dns1.neoclan.net.mx. postmaster.neoclan.net.mx. 2025032601
aceropciones.com.mx.          14400  NS    dns1.neoclan.net.mx.
aceropciones.com.mx.          14400  NS    dns2.neoclan.net.mx.
aceropciones.com.mx.          14400  A     201.158.32.60          ← ✏️ CAMBIA a Vercel
www.aceropciones.com.mx.      14400  A     201.158.32.60          ← ✏️ CAMBIA a Vercel
aceropciones.com.mx.             60  MX    10 mail.aceropciones.com.mx.
mail.aceropciones.com.mx.        60  A     201.158.32.60
webmail.aceropciones.com.mx.  14400  A     201.158.32.60
cpanel.aceropciones.com.mx.   14400  A     201.158.32.60
whm.aceropciones.com.mx.      14400  A     201.158.32.60
webdisk.aceropciones.com.mx.  14400  A     201.158.32.60
cpcalendars...                14400  A     201.158.32.60
cpcontacts...                 14400  A     201.158.32.60
aceropciones.com.mx.          14400  TXT   v=spf1 ip4:201.158.32.34 ip4:201.158.32.60 include:_spfmx.neoclan.net.mx +a +mx ~all
_dmarc.aceropciones.com.mx.    3600  TXT   v=DMARC1;p=none;sp=none;adkim=r;aspf=r;pct=100;fo=0;rf=afrf;ri=86400
default._domainkey...         14400  TXT   v=DKIM1; k=rsa; p=MIIBIjANBgkq... (DKIM completo)
```

**Por qué esto importa:** con la zona completa en mano, migrar los nameservers deja de ser
un salto al vacío. Se puede recrear idéntica en otro proveedor **antes** de tocar la
delegación, y entonces el cambio es de riesgo cero.

> 🟢 `mail` es un registro **A independiente**, no un alias de la raíz. Cambiar el A de la
> raíz **no afecta el correo**. El SPF también lleva las IPs explícitas.

---

## 3. LO QUE HAY QUE CAMBIAR (solo 2 registros)

| Tipo | Nombre | Valor actual | Valor nuevo |
|---|---|---|---|
| **A** | `@` (raíz) | `201.158.32.60` | *[la IP que dé Vercel]* |
| **CNAME** | `www` | → `aceropciones.com.mx` | *[el CNAME que dé Vercel]* |

Los valores exactos aparecen **después** de agregar el dominio en Vercel (paso 4.1).
Referencia: en TitanGeek fueron `216.198.79.1` y un CNAME único del proyecto — **cada
proyecto tiene el suyo, no se reutilizan**.

---

## 4. ⛔ LO QUE NO SE TOCA (el correo de 26 cuentas)

| Registro | Valor | Para qué sirve |
|---|---|---|
| **MX** | `10 mail.aceropciones.com.mx` | Recepción de correo |
| **A** `mail` | `201.158.32.60` | El servidor de correo |
| **A** `webmail` | `201.158.32.60` | Acceso web al correo |
| **A** `cpanel` | `201.158.32.60` | Panel de hosting |
| **A** `ftp` · `webdisk` · `cpcalendars` | `201.158.32.60` | Servicios del hosting |
| **TXT (SPF)** | `v=spf1 ip4:201.158.32.34 ip4:201.158.32.60 include:_spfmx.neoclan.net.mx +a +mx ~all` | Autoriza quién envía correo |

**Regla:** se editan dos renglones. Todo lo demás se queda **idéntico**.

---

## 5. PASOS

### 5.1 — Elegir la ruta

Hay dos caminos válidos. **Ya no son "seguro vs. arriesgado"** — con la zona completa de
§2.B, los dos son controlables.

#### 🥈 Ruta A — Pedirle el cambio a Neoclan
Escribir el correo de §7 y que ellos apliquen los dos registros.

- ✅ Cero riesgo técnico, cero trabajo
- ❌ Dependes de sus tiempos hoy y **cada vez** que haya que tocar el DNS
- ❌ Sigues sin poder verificar ni revertir por tu cuenta

#### 🥇 Ruta B — Mover los nameservers a Cloudflare *(recomendada)*
Se recrea la zona de §2.B idéntica en Cloudflare, y **después** se cambia la delegación
en Akky. Durante la propagación ambos juegos de nameservers responden lo mismo → **cero
ventana de caída**.

- ✅ Control total y permanente. Nunca más dependes de Neoclan para un cambio de DNS
- ✅ Gratis, y con TTL bajo puedes revertir en minutos
- ✅ Reversa limpia: si algo falla, se regresan los nameservers a Neoclan en Akky
- ⚠️ Requiere transcribir 13 registros sin equivocarse — **pero ya los tenemos exactos**
- ⚠️ Los 5 registros `_acme-challenge` del cPanel **no se copian**: son basura local

> **Regla de oro de la Ruta B:** el correo no se toca. Se copian tal cual MX, `mail`,
> `webmail`, `cpanel`, `whm`, `webdisk`, `cpcalendars`, `cpcontacts`, SPF, DKIM y DMARC.
> Solo cambian la raíz y `www`.

**Mi recomendación:** Ruta B. El único motivo para elegir A es si AOM prefiere que su
proveedor histórico conserve el control — y esa es una decisión del cliente, no técnica.

⚠️ **Antes de la Ruta B:** confirmarlo con AOM. Mover nameservers es un cambio de
administración del dominio, no solo un ajuste técnico.

### 5.2 — Agregar el dominio en Vercel
Proyecto `aceropciones` → Settings → Domains → **Add Existing** → `aceropciones.com.mx`
(acepta que agregue también `www`).

**Decisión de canónico:** dejar `aceropciones.com.mx` como principal (sin `www`) y que
`www` redirija con **308 permanente** — igual que se hizo en TitanGeek, y consistente con
la papelería de AOM.

Va a marcar *"Invalid Configuration"*: es normal hasta que cambie el DNS.

### 5.3 — Aplicar el cambio DNS
Cambiar los dos registros de §3 donde corresponda según 5.1.

### 5.4 — Verificar
```bash
dig A aceropciones.com.mx +short        # debe dar la IP de Vercel
dig CNAME www.aceropciones.com.mx +short # debe dar el CNAME de Vercel
dig MX aceropciones.com.mx +short        # DEBE seguir en mail.aceropciones.com.mx
curl -sI https://aceropciones.com.mx/    # debe dar 200
```
Y la prueba que de verdad importa: **mandar y recibir un correo de ida y vuelta** desde
una cuenta @aceropciones.com.mx.

En Vercel, el dominio debe pasar a **"Valid Configuration"** y emitir el SSL solo
(minutos a 48h; en TitanGeek fue casi inmediato).

### 5.5 — Cierre
- Confirmar con AOM que su correo funciona normal
- Dar de baja el sitio viejo del servidor (o dejarlo sin publicar)
- Definir si se conserva el hosting de Neoclan **solo para correo** (sí, mientras el
  correo viva ahí) y ajustar el costo con el cliente

---

## 6. PLAN DE REVERSA

**Ruta A (Neoclan aplica):** se revierte volviendo a poner `A @ → 201.158.32.60` y
`A www → 201.158.32.60`. Como el TTL es de 14400 (4 horas), conviene **pedirles bajar el
TTL a 300 unas horas antes**. Así la reversa es casi inmediata.

**Ruta B (Cloudflare):** dos niveles de reversa.

1. *Rápida* — corregir el registro en Cloudflare. Con TTL de 300 se propaga en minutos.
2. *Total* — regresar los nameservers a `dns1`/`dns2.neoclan.net.mx` en Akky. La zona de
   Neoclan sigue intacta ahí, sin cambios. Tarda más (delegación), pero es el botón de
   pánico definitivo.

> Guarda el bloque DNS de §2.B. **Es la copia de seguridad de la zona original.**

---

## 7. BORRADOR — correo para Neoclan

**Asunto:** Consulta de administración DNS — aceropciones.com.mx

---

Buen día:

Escribo por parte de **Aceropciones y Maquilas**, con autorización del cliente, respecto
al dominio **aceropciones.com.mx** (cuenta de cPanel `aceropcionescom`, IP 201.158.32.60).

Vamos a migrar **únicamente el sitio web** a una nueva plataforma de hospedaje. **El
correo permanece intacto en su servidor** — las 26 cuentas siguen operando ahí sin cambio.

Necesitamos modificar solo dos registros:

| Tipo | Nombre | Valor actual | Valor nuevo |
|---|---|---|---|
| A | `@` (raíz) | 201.158.32.60 | *(se los proporciono al confirmar)* |
| CNAME | `www` | aceropciones.com.mx | *(se los proporciono al confirmar)* |

**No se modifica nada más:** MX, SPF, `mail`, `webmail`, `cpanel`, `ftp` y demás registros
se quedan exactamente como están.

Mi consulta es la siguiente: al revisar el **Zone Editor del cPanel**, los registros no
coinciden con lo que responden sus nameservers (`dns1`/`dns2.neoclan.net.mx`). Por ejemplo,
en el cPanel el MX apunta al dominio raíz y `mail` figura como CNAME, mientras que sus
nameservers responden MX hacia `mail.aceropciones.com.mx` y `mail` como registro A.

**¿Dónde se edita la zona DNS que realmente está en operación?** ¿Se hace desde el cPanel,
desde algún panel suyo al que podamos tener acceso, o lo aplican ustedes directamente?

Si lo aplican ustedes, con gusto les envío los dos valores exactos en cuanto me confirmen.
También agradecería saber si es posible **bajar el TTL a 300 segundos** unas horas antes
del cambio, para poder revertir rápido si hiciera falta.

Quedo atento.

**Luis Flores**
TitanGeek · lflores@titangeek.com.mx

---

## 8. MEJORA OPCIONAL (después, no urgente)

El SPF actual incluye el mecanismo **`+a`**, que autoriza a la IP del registro A del
dominio a enviar correo. Cuando la raíz apunte a Vercel, ese `+a` estaría autorizando a
Vercel a enviar correo como AOM — inofensivo, pero innecesario.

Como el SPF ya lleva las IPs explícitas (`ip4:201.158.32.60`, `.34`) y el mecanismo `+mx`,
**se puede quitar el `+a`** sin afectar la entrega. Es higiene, no urgencia — y conviene
hacerlo en un momento aparte del cambio principal, no todo junto.
