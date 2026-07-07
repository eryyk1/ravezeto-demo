# Rávezető — Missing Content Register

> Everything not fully available in the WordPress backup  
> **Rule:** Never replace missing professional content with generic AI marketing text  
> **Primary source:** `CONTENT_INVENTORY.md` + `CONTENT_INVENTORY.json`

---

## Legend

| Status | Meaning |
|--------|---------|
| ✅ | Available in backup — ready to use |
| ⚠️ | Partially available — needs cleanup or assembly |
| ❌ | Missing — client action required |
| ℹ️ | Decision needed — not blocking |

---

## 1. Visual Assets

| Item | Status | Source / Action |
|------|--------|-----------------|
| Company logo | ✅ | `themes/RavezetoNewTheme/images/home/logo.png` |
| Primary green hex | ⚠️ | Sample from logo.png in Phase 2 — provisional `#2A6B52` in design system |
| Button green asset | ✅ | `themes/.../images/home/button_green.png` |
| Homepage backgrounds | ✅ | `themes/.../images/home/` (224 theme images total) |
| SVG illustrations (43) | ✅ | `uploads/2016–2017/*.svg` |
| Partner logo JPGs (34) | ✅ | `uploads/` + logos CPT metadata |
| Mentally graphics | ✅ | `themes/.../images/` (haBajVan, miutanBeavatkoztunk, gondolatFelho, etc.) |
| Mentally video | ✅ | `themes/.../images/video/Mentally.mp4` |
| Széchenyi 2020 banner | ✅ | `themes/.../images/home/Szechenyi-2020-logo.png` |
| Reference case images (ref1–35) | ⚠️ | Posts exist in SQL but many have empty titles — images may be thumbnail-only |
| ESBA/GINOP banner images | ✅ | `uploads/2024/12/esba.jpg`, infoblokk images |

---

## 2. Team Portraits

| Team member | Status | Upload path |
|-------------|--------|-------------|
| Ríz Ádám | ✅ | `uploads/2017/01/Riz-Adam.jpg` |
| Bíró Gabriella | ✅ | `uploads/2016/06/portrait_biro_gabriella.jpg` |
| Soós Andrea | ✅ | `uploads/2019/12/portrait_soos_andrea-e1575455494622.jpg` |
| Molnár Zsolt | ✅ | `uploads/2019/12/portrait_molnar_zsolt-e1575460119239.jpg` |
| Dr. Szalay Árpád | ✅ | `uploads/2020/01/portrait_szalay_arpad-e1579080209295.jpg` |
| Duleba Marianna | ❌ | Not found in uploads — use initials placeholder until provided |
| Halász Krisztina | ❌ | Not found in uploads |
| Mázásné Dinnyés Hajnalka | ❌ | Not found in uploads |

**Additional team posts in SQL (not in colleagues CPT):**
| Name | Status | Notes |
|------|--------|-------|
| Szőke Ádám | ⚠️ | Post 806 — bio in SQL, no portrait found |
| Berta Anikó | ⚠️ | Post 800 (slug duleba-marianna) — bio in SQL, portrait missing |

**Placeholder rule:** Green circle with initials, no stock photo, no AI face.

---

## 3. Page Content Gaps

| Page / Section | Status | Issue | Resolution |
|----------------|--------|-------|------------|
| Pályázatok hero subtitle | ❌ | Template has placeholder „Ultra jok vagyunk..." | Replace with tender CPT intro or homepage palyazatIntro |
| Szolgáltatásaink template | ❌ | Placeholder text | Use services CPT + page 34 SQL content |
| CSR template mid-sections | ❌ | Placeholder text | Use page 394 verbatim content |
| Csapatunk page (736) | ⚠️ | Empty in SQL — content in PHP template | Use template-csapatunk.php hardcoded text |
| Felnőttképzés page (738) | ⚠️ | Empty in SQL — content in PHP template | Use template-felnottkepzes.php |
| Tanácsadás page (750) | ⚠️ | Empty in SQL — content in PHP template | Use template-tanacsadas.php |
| Referenciák page (746) | ⚠️ | Empty in SQL | Use references CPT + ref posts |
| Mentally page (742) | ⚠️ | Empty in SQL | Use template-mentally.php |
| Kapcsolat page (740) | ⚠️ | Empty in SQL | Use template_kapcsolatok.php + contact sub-pages |
| Magunkról (30) | ✅ | Full SQL content with Citius Altius Fortius text | Merge into /rolunk |
| EMPX pages | ℹ️ | Legacy product content | Redirect to /mentally or 410 — client decision |

---

## 4. Structured Content Not Yet in JSON Inventory

| Content type | Count | Status | Action |
|--------------|-------|--------|--------|
| Trainings (`trainings` CPT) | 25 | ⚠️ | In SQL — add to inventory JSON before Phase 2 |
| Tenders (`tenders` CPT) | 2 | ⚠️ | In SQL — full HTML content available |
| EMPX posts | 6 | ℹ️ | Archive or redirect |
| Blog posts (legitimate) | ~10 | ⚠️ | Team bios, GINOP posts — evaluate |
| Blog posts (spam) | ~30+ | ❌ | Gamstop/casino spam — **never migrate** |
| ref1–ref35 posts | 35 | ⚠️ | Titles empty — likely image-only case study tiles |
| buszkek_vagyunk category | ⚠️ | Queried in CSR template | Extract category posts from SQL |
| palyazat category posts | ⚠️ | Queried in palyazat section | Extract from SQL |

---

## 5. Documents & Legal

| Document | Status | Path |
|----------|--------|------|
| Adatvédelmi tájékoztató 2025 | ✅ | `uploads/2025/03/Adatvedelmi_2025.pdf` |
| GDPR Kapcsolatok | ✅ | `uploads/2018/08/GDPR_Kapcsolatok.pdf` |
| Belső adatkezelési szabályzat | ✅ | `uploads/2018/05/RAvezeto_belso_adatkezelesi_szab.pdf` |
| GINOP projekt PDF | ✅ | `uploads/2025/02/Ginop-5.3.1.-14.pdf` |
| Pályázati lehetőségek PDF | ✅ | `uploads/2017/04/palyazati_lehetosegek.pdf` |
| PR anyag PDF | ✅ | `uploads/2017/06/PR_Ravezeto_Projekt_Kft_0531_02.pdf` |
| Cookie policy (HTML) | ✅ | Page 331 in SQL — full text |
| Impresszum (HTML) | ✅ | Page 86 in SQL — full text |

---

## 6. Contact & Company Data

| Field | Status | Value |
|-------|--------|-------|
| Company name | ✅ | RÁvezető Projekt Kft. |
| Address | ✅ | 1146 Budapest, Izsó u. 7. 1/3. |
| Phone (primary) | ✅ | +36 70 513 4128 |
| Phone (alt) | ✅ | 06 1 798 80 33 |
| Email | ✅ | info@ravezeto.hu |
| Email (training/grants) | ✅ | kepzes@ravezeto.hu |
| Office hours | ✅ | H-P 9.00–16.00 |
| Doorbell | ✅ | 6. kapucsengő |
| Training reg. (legacy) | ✅ | E-000362/2014 |
| Training reg. (current) | ✅ | B/2020/001943, E/2021/000106 |
| Facebook | ✅ | profile.php?id=100063907730525 |
| Google Maps link | ✅ | In footer.php template |
| Minősített szolgáltató links | ✅ | ifka.hu portals in post 589 |

---

## 7. Testimonials (Available Verbatim)

| Client | Status | Source |
|--------|--------|--------|
| Horváth Botond, Smart Digital Kft. | ✅ | template-csapatunk.php |
| Sarkadi-Nagy András, SALDO Zrt. | ✅ | template-csapatunk.php |
| Amberger Árpád, Globomax Zrt. | ✅ | template-csapatunk.php |
| Váginé Varga Zsuzsa, SZE | ✅ | template-csapatunk.php |
| Arany Mónika | ✅ | template-csapatunk.php |
| Page 458 (Ügyfeleink írták) | ✅ | SQL — additional testimonials |

---

## 8. Technical / Build Decisions Needed

| Item | Status | Notes |
|------|--------|-------|
| Font licensing (Söhne) | ℹ️ | Budget confirmation — open-source fallback documented |
| Form backend account | ❌ | Client must create Formspree or provide SMTP |
| EMPX → Mentally redirect | ℹ️ | Client confirmation |
| Spam blog posts | ℹ️ | Confirm 410 on deploy |
| Video captions/transcript | ❌ | Mentally.mp4 — no transcript in backup |
| Varta font (current theme) | ✅ | `themes/.../css/font/Varta/` — can reuse |
| Google Form (GINOP) | ✅ | Keep as external link |

---

## 9. Content That Must NOT Be Invented

The following must come **only** from backup sources — if missing, use placeholder marker `[HIÁNYZÓ TARTALOM]` in dev, never AI copy:

- Service descriptions (7 services CPT)
- Reference project lists (7 categories — extensive HTML)
- Training programme descriptions (25 trainings)
- Tender page full content (GINOP 5.3.1, GINOP Plusz)
- Team bios (colleagues CPT)
- Statistics (16 év, 400+, etc.)
- Shackleton / Aurelius quotes
- Mentally product copy
- CSR organisation list
- Client testimonials

---

## 10. Pre-Phase-2 Checklist

- [ ] Client provides 3 missing team portraits
- [ ] Client confirms EMPX handling
- [ ] Client confirms form backend (Formspree recommended)
- [ ] Client confirms green hex from logo (or approve design system provisional)
- [ ] Extract trainings (25) into CONTENT_INVENTORY.json
- [ ] Extract ref1–35 image attachments
- [ ] Flag spam posts for 410 exclusion
- [ ] Confirm Széchenyi banner retention on new site

---

**Total missing items requiring client input: 8 critical, 12 minor/decision**
