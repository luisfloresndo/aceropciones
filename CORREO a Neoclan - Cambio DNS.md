# CORREO PARA NEOCLAN — listo para enviar

**Para:** *(soporte de Neoclan)*
**Asunto:** Solicitud de cambio DNS — aceropciones.com.mx (2 registros)

---

Buen día:

Escribo por parte de **Aceropciones y Maquilas**, con autorización del cliente, respecto
al dominio **aceropciones.com.mx** (cuenta de cPanel `aceropcionescom`, IP 201.158.32.60).

Vamos a migrar **únicamente el sitio web** a una nueva plataforma de hospedaje.
**El correo permanece intacto en su servidor** — las cuentas siguen operando ahí sin
ningún cambio.

Les solicito modificar **dos registros**, y solo esos dos:

### 1 · Registro A del dominio raíz — cambio de valor

| | |
|---|---|
| **Nombre** | `aceropciones.com.mx` (raíz / `@`) |
| **Tipo** | A |
| **Valor actual** | `201.158.32.60` |
| **Valor nuevo** | `216.150.1.1` |

### 2 · Registro de `www` — cambio de TIPO

⚠️ Este no es un cambio de valor: hay que **eliminar el registro A** actual y **crear un
CNAME** en su lugar.

| | |
|---|---|
| **Eliminar** | `www.aceropciones.com.mx` — tipo **A** → `201.158.32.60` |
| **Crear** | `www.aceropciones.com.mx` — tipo **CNAME** → `f75131de8301ed63.vercel-dns-017.com.` |

*El valor del CNAME termina en punto: es un nombre completamente calificado.*

---

### Lo que NO debe modificarse

Les pido confirmar que estos registros permanecen exactamente como están:

- **MX** → `mail.aceropciones.com.mx`
- **A** de `mail`, `webmail`, `cpanel`, `whm`, `webdisk`, `cpcalendars`, `cpcontacts`
- **TXT** del SPF, el DKIM (`default._domainkey`) y el DMARC (`_dmarc`)

---

### Dos peticiones adicionales

1. **TTL de 300 segundos** en esos dos registros. Nos permite revertir con rapidez si
   detectamos algo inesperado.
2. **Confirmación por este medio** cuando el cambio esté aplicado, para verificar de
   nuestro lado y comprobar que el correo sigue operando con normalidad.

Una nota: al revisar el **Zone Editor del cPanel** noté que sus registros no coinciden
con lo que responden sus nameservers (`dns1`/`dns2.neoclan.net.mx`) — por ejemplo, el
cPanel muestra `mail` como CNAME mientras que sus servidores responden un registro A.
Entiendo entonces que la zona en operación se administra de su lado, y por eso les hago
la solicitud directamente. Si me equivoco y puedo aplicarlo yo desde el cPanel, con
gusto lo hago y les evito el trabajo.

Quedo atento y agradezco su apoyo.

**Luis Flores**
TitanGeek
lflores@titangeek.com.mx

---
---

# ✅ CHECKLIST AL RECIBIR SU CONFIRMACIÓN

Avísame y verifico:

```bash
dig A   aceropciones.com.mx +short        # → 216.150.1.1
dig CNAME www.aceropciones.com.mx +short  # → f75131de8301ed63.vercel-dns-017.com.
dig MX  aceropciones.com.mx +short        # → 10 mail.aceropciones.com.mx   ← CRÍTICO
dig A   mail.aceropciones.com.mx +short   # → 201.158.32.60                 ← CRÍTICO
dig TXT aceropciones.com.mx +short        # → el SPF intacto
curl -sI https://aceropciones.com.mx/     # → 200
```

**Prueba de correo (solo tú puedes hacerla):**

- [ ] Enviar un correo desde una cuenta @aceropciones.com.mx a un Gmail
- [ ] Responderlo hacia esa cuenta y confirmar que llega
- [ ] Abrir `webmail.aceropciones.com.mx`
- [ ] Confirmar que el correo enviado **no cayó en spam** *(valida SPF y DKIM)*

En Vercel, ambos dominios deben pasar a **"Valid Configuration"** y emitir SSL solos.

---

# 🔙 REVERSA

Si algo sale mal, se les pide restaurar:

- **A** `@` → `201.158.32.60`
- **A** `www` → `201.158.32.60` *(y eliminar el CNAME)*

---

# 📌 ESTADO EN VERCEL (ya configurado)

| Dominio | Configuración |
|---|---|
| `aceropciones.com.mx` | Production · **canónico** |
| `www.aceropciones.com.mx` | Redirect **308** → `aceropciones.com.mx` |
| `aceropciones.vercel.app` | Production *(se conserva)* |

Ambos marcan *"Invalid Configuration"* — es lo esperado hasta que Neoclan aplique el
cambio. Se corrige solo.
