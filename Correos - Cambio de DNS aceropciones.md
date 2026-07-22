# Cambio de DNS para publicar aceropciones.com.mx

Documento de apoyo — TitanGeek · julio 2026

---

## ANTES DE ENVIAR: los 2 datos que te faltan

Estos valores te los da Vercel **después** de agregar el dominio al proyecto
(*Settings → Domains → Add Domain*). Aparecerán marcados como "Invalid
Configuration" hasta que se haga el cambio — eso es normal.

| Dato | Dónde lo ves | Anótalo aquí |
|---|---|---|
| **IP del registro A** | Panel de Vercel (suele ser `76.76.21.21`) | `________________` |
| **Valor del CNAME de www** | Panel de Vercel (único por proyecto, tipo `xxxxxxxx.vercel-dns-017.com`) | `________________` |

> ⚠️ **Usa los valores que muestre TU panel**, no los del ejemplo.

---

## Estado actual del dominio (verificado el 22/jul/2026)

| Registro | Valor actual | ¿Se toca? |
|---|---|---|
| Nameservers | `dns1.neoclan.net.mx` / `dns2.neoclan.net.mx` | ❌ **NO** |
| A (raíz) | `201.158.32.60` | ✅ Sí — se cambia |
| www | resuelve a `201.158.32.60` | ✅ Sí — se cambia |
| MX | `10 mail.aceropciones.com.mx` | ❌ **NO — es el correo** |
| TXT / SPF | `v=spf1 ip4:201.158.32.34 ip4:201.158.32.60 include:_spfmx.neoclan.net.mx +a +mx ~all` | ❌ **NO** |

**La regla de oro:** se cambian dos registros. Nada más. Si alguien propone
cambiar nameservers, se cae el correo de la empresa.

---

# OPCIÓN A — Correo para Aceropciones (el cliente)

**Asunto:** Publicación de aceropciones.com.mx — último paso

---

Estimado [Nombre]:

Buen día. El sitio web ya está terminado y listo para publicarse.

Para ponerlo en línea bajo **aceropciones.com.mx** solo falta un ajuste técnico
en la configuración del dominio. Es un cambio menor —dos registros— que aplica
quien administra el dominio; por lo que veo, actualmente lo administra
**Neoclan**.

Un punto importante para su tranquilidad: **este cambio no afecta el correo
electrónico de la empresa**. Los registros del correo no se tocan; únicamente se
redirige la dirección del sitio web hacia la nueva infraestructura.

Para avanzar necesito una de estas dos opciones, la que les resulte más cómoda:

1. **Que me den acceso** al panel de administración del dominio, y yo aplico el
   cambio y lo verifico; o
2. **Que me indiquen el contacto** de quien lo administra, y les envío la
   instrucción exacta por escrito para que la apliquen ellos.

Sobre tiempos: el cambio en sí toma unos minutos. La propagación en internet
puede tardar de unas horas hasta 24–48 horas, que es el estándar. Durante ese
periodo el sitio actual sigue funcionando, así que no hay interrupción.

Quedo atento a sus comentarios para coordinarlo.

Saludos cordiales,

**Luis Flores**
TitanGeek
lflores@titangeek.com.mx

---

# OPCIÓN B — Correo técnico para Neoclan (o quien administre el DNS)

**Asunto:** Solicitud de cambio de DNS — aceropciones.com.mx (solo registros A y CNAME)

---

Buen día:

Por instrucción y con autorización de **Aceropciones y Maquilas**, solicito el
siguiente cambio en la zona DNS del dominio **aceropciones.com.mx**.

## Cambiar únicamente estos dos registros

| Tipo | Nombre | Valor actual | Valor nuevo |
|---|---|---|---|
| **A** | `@` (raíz) | `201.158.32.60` | `[IP QUE DA VERCEL]` |
| **CNAME** | `www` | apunta a `201.158.32.60` | `[VALOR QUE DA VERCEL]` |

*Nota: si su panel no permite CNAME en `www`, puede usarse un registro **A** con
la misma IP del registro raíz.*

## NO modificar (importante)

Para no afectar la operación de correo de la empresa, favor de **dejar
exactamente como están** los siguientes registros:

- **Nameservers:** `dns1.neoclan.net.mx` / `dns2.neoclan.net.mx` — se mantienen.
- **MX:** `10 mail.aceropciones.com.mx` — no se toca.
- **TXT / SPF:** `v=spf1 ip4:201.158.32.34 ip4:201.158.32.60 include:_spfmx.neoclan.net.mx +a +mx ~all` — no se toca.
- Cualquier otro registro existente en la zona.

## Motivo

El sitio web institucional se migra a nueva infraestructura de hospedaje
(Vercel). **El servicio de correo permanece intacto en su servidor actual**; por
eso el cambio se limita a los registros del sitio web y no a los nameservers.

Agradeceré me confirmen por este medio cuando el cambio esté aplicado, para
verificar la propagación y la emisión del certificado SSL.

Quedo atento a cualquier duda.

Saludos cordiales,

**Luis Flores**
TitanGeek
lflores@titangeek.com.mx

---

# Después del cambio — cómo verificar

Desde una terminal:

```bash
# Debe devolver la IP nueva de Vercel
dig A aceropciones.com.mx +short

# Debe devolver el CNAME de Vercel
dig CNAME www.aceropciones.com.mx +short

# El correo debe seguir intacto: 10 mail.aceropciones.com.mx
dig MX aceropciones.com.mx +short
```

En el panel de Vercel, el dominio debe pasar de **"Invalid Configuration"** a
**"Valid Configuration"**, y el certificado SSL se emite automáticamente.

**Checklist final:**

- [ ] `aceropciones.com.mx` abre el sitio nuevo
- [ ] `www.aceropciones.com.mx` redirige correctamente
- [ ] El candado de SSL (https) aparece sin advertencias
- [ ] **El correo de la empresa sigue enviando y recibiendo**
- [ ] Las 11 páginas de producto cargan
- [ ] El formulario de contacto y los botones de WhatsApp funcionan
