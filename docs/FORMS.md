# Rávezető — Form Handling Recommendation

> **Constraint:** Do not modify the production WordPress site or its wp_mail configuration.  
> Forms must work in the new React site independently.

---

## Current WordPress Behaviour (from backup analysis)

The theme `functions.php` defines three AJAX form handlers:

| Form | Action | Fields | Recipient | From header |
|------|--------|--------|-------------|-------------|
| Contact | `enquiry` | name, email, message | `admin_email` (WP option) | `info@ravezeto.hu` |
| Pályázat | `palyazat_form` | company_name, contact_name, email, tel | admin_email | `info@ravezeto.hu` |
| Mentally | `mentally_form` | company_name, contact_name, email, tel | admin_email | `info@ravezeto.hu` |

Success messages (verbatim):
- Contact: „Üzenet sikeresen elküldve!"
- Pályázat/Mentally: „Kapcsolatfelvételi szándékát rögzítettük!"

Error messages (verbatim):
- „Minden mező kitöltése kötelező."
- „Érvénytelen e-mail cím."
- „Probléma volt az E-mail küldéskor. Próbálja újra később."

External form also used:
- GINOP Plusz Google Form: `https://forms.gle/VQA4YtYU8knR4q9T7` (link only — keep as external)

---

## Recommended Solution

### Option A (Recommended): Formspree or similar form backend

**Why:** Zero production WordPress changes. No server required during development. GDPR-friendly EU endpoints available.

| Property | Value |
|----------|-------|
| Service | [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) |
| Setup | Create 3 forms (contact, pályázat, mentally) |
| Recipient | `info@ravezeto.hu` |
| Reply-to | Submitter's email |
| Cost | Free tier sufficient for expected volume |

**Implementation (Phase 2):**
```typescript
// POST to Formspree endpoint — no WordPress involved
await fetch('https://formspree.io/f/XXXX', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message }),
});
```

**Pros:** Simple, no backend code, works on static hosting  
**Cons:** Third-party dependency, client must create account

---

### Option B: Custom serverless function

**Why:** Full control, no third-party form service.

| Property | Value |
|----------|-------|
| Platform | Vercel/Netlify serverless (when user requests deploy) OR local Express proxy for dev |
| Email | SendGrid / Resend / SMTP via `info@ravezeto.hu` |
| Endpoint | `/api/contact`, `/api/palyazat`, `/api/mentally` |

**Pros:** Own infrastructure, custom validation  
**Cons:** Requires email API key, more setup

---

### Option C: mailto fallback (not recommended as primary)

Use only as degraded fallback if API fails — poor UX on mobile.

---

## Recommendation Summary

| Phase | Approach |
|-------|----------|
| **Development** | Formspree test endpoints (separate from production) |
| **Production deploy** | Client creates production Formspree forms OR serverless with company SMTP |
| **Never** | POST to `ravezeto.hu/wp-admin/admin-ajax.php` from React site |

---

## Form UI Specification

### Contact Form (`/kapcsolat`)

| Field | Type | Required | Label (HU) |
|-------|------|----------|------------|
| name | text | yes | Név |
| email | email | yes | E-mail |
| message | textarea | yes | Üzenet |

Submit: „Küldés"  
Success redirect: `/kapcsolat?submitted=1` (replaces `/sikeres-kuldes/`)

### Pályázat Form (`/palyazatok`)

| Field | Type | Required | Label (HU) |
|-------|------|----------|------------|
| company_name | text | yes | Cég neve |
| contact_name | text | yes | Kapcsolattartó neve |
| email | email | yes | E-mail |
| tel | tel | yes | Telefonszám |

Hidden field: `current_page` (URL, for admin context — matches WP behaviour)

### Mentally Form (`/mentally`)

Same fields as Pályázat form.

---

## Validation Rules

- All required fields non-empty
- Email format validation (same as WP `is_email`)
- Phone: accept Hungarian formats (+36, 06, spaces)
- Client-side validation for UX; server-side validation on endpoint
- Honeypot field for spam (hidden `website` field — reject if filled)
- Rate limiting via Formspree built-in or serverless

---

## GDPR / Consent

- Link to `/jogi/adatvedelem` near submit button
- Optional checkbox: „Elfogadom az adatkezelési tájékoztatót" — confirm with client if required (WP forms did not have explicit checkbox)
- Form data processed per `Adatvedelmi_2025.pdf` content

---

## Development Testing

During `npm run dev`:
- Use Formspree test mode OR mock endpoint that logs to console
- Never send test emails to `info@ravezeto.hu` without client approval
- Display success/error states matching verbatim Hungarian messages from WP

---

## Action Required Before Phase 2

- [ ] Client confirms form recipient: `info@ravezeto.hu` (and `kepzes@ravezeto.hu` for pályázat?)
- [ ] Client creates Formspree account OR provides SMTP/API credentials
- [ ] Confirm GDPR checkbox requirement
