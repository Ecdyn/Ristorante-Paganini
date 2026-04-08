# Phase 5: English and Italian Onepages - Research

**Researched:** 2026-04-08
**Domain:** Multilingual HTML localization — static onepage translation, hreflang reciprocal clusters, OG/JSON-LD per-language metadata
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** English copy uses warm & professional tone — same family "we" voice as German, slightly less formal since English has no Sie/Du distinction. Polished but inviting, matching premium positioning.
- **D-02:** Italian copy uses "Voi" (semi-formal plural) register — warmer than Lei, addresses visitors as a group. Reflects southern Italian hospitality tradition while maintaining premium feel.
- **D-03:** Both EN and IT are faithful translations of the German copy — same content, structure, and messaging translated accurately. No cultural adaptation or content restructuring.
- **D-04:** All 7 FAQ questions translated directly from German to EN and IT — same questions, same structure, same FAQPage JSON-LD schema. Leipzig-specific terms get natural equivalents ("Mittagstisch" → "business lunch" / "pranzo di lavoro").
- **D-05:** FAQPage JSON-LD in EN and IT pages mirrors the German schema structure with translated `name` and `text` fields for all 7 Q&A pairs.
- **D-06:** Meta titles: EN "Ristorante Paganini | Italian Restaurant Leipzig", IT "Ristorante Paganini | Ristorante Italiano Lipsia".
- **D-07:** Meta descriptions are faithful translations of the German meta description — same tone, family tradition mention, Leipzig city center.
- **D-08:** OG locale values: `og:locale="en_GB"` for English, `og:locale="it_IT"` for Italian.
- **D-09:** JSON-LD Restaurant/LocalBusiness: `description` and `inLanguage` fields updated per language; all other fields (address, geo, hours, phone) remain identical.
- **D-10:** Italian tagline H1 (`Dove il gusto incontra la tradizione`) stays in Italian on all three pages — brand signature, not translatable content.
- **D-11:** "Ristorante Paganini" brand mark above H1 stays unchanged on all pages.
- **D-12:** CTA buttons: EN "Reserve a Table" + "Menu", IT "Prenota un Tavolo" + "Menu".
- **D-13:** Language-neutral section IDs identical across all three pages: `#hero`, `#info`, `#about`, `#menu`, `#lunch`, `#gallery`, `#reservation`, `#events`, `#location`, `#faq`, `#contact`, `#footer`.
- **D-14:** Full hreflang block with all 4 tags on every page: `hreflang="de"`, `hreflang="en"`, `hreflang="it"`, `hreflang="x-default"` → DE.
- **D-15:** Self-canonical per language page — EN canonical points to EN URL, IT canonical points to IT URL.
- **D-16:** Language switcher links in all three footers updated to navigate correctly between DE/EN/IT versions.

### Claude's Discretion

- Exact English and Italian copy wording (within faithful translation + tone direction)
- Natural language phrasing for FAQ answers in each language
- Minor phrasing adjustments where literal translation would sound awkward
- `aria-label` attribute translations if present on sections
- Comment convention language (HTML comments can remain in English for developer audience)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LANG-02 | English version at /en/index.html fully localized | Full content inventory from de/index.html completed; EN translations drafted for all 12 sections, meta, JSON-LD, and hreflang |
| LANG-03 | Italian version at /it/index.html fully localized | Full content inventory from de/index.html completed; IT translations drafted for all 12 sections, meta, JSON-LD, and hreflang |

</phase_requirements>

---

## Summary

Phase 5 is a pure translation and localization task with no new HTML structures, no CSS changes, and no JS changes. The source of truth (`de/index.html`) is a complete, well-structured 748-line file. Both `en/` and `it/` directories do not yet exist — they must be created. The shared assets (`../assets/css/main.css`, `../assets/js/main.js`, `../assets/img/*`, favicons) are already relative-path compatible from `/en/` and `/it/` subdirectories identically to how they work from `/de/`.

The primary work is: copy `de/index.html` to each new language file, then systematically replace every German string with the target-language equivalent across five areas: (1) HTML attributes (`lang`, `aria-label`), (2) head metadata (title, description, canonical, OG, Twitter), (3) JSON-LD structured data (description, inLanguage, FAQPage), (4) visible body copy (nav labels, headings, paragraphs, button text, captions, table cells, footer labels), and (5) the DE footer language switcher `aria-current` must be moved to the correct language on each file. The DE page also needs its hreflang cluster verified — it is already present and structurally correct per code inspection.

**Primary recommendation:** Treat each new file as a full copy of `de/index.html` with a systematic find-and-replace pass for all German strings. Work section-by-section to avoid missed strings. The `<!-- SYNC: -->` comments in the German source already flag the critical cross-language sync points.

---

## Standard Stack

### Core

| Technology | Version | Purpose | Why Standard |
|------------|---------|---------|--------------|
| HTML5 | Living Standard | New language files | Same file model as `de/index.html` — copy-and-translate approach |
| JSON-LD (Schema.org) | Schema.org v25 | Per-language Restaurant + FAQPage schema | `inLanguage` field changes; all address/geo/hours fields stay identical |
| hreflang HTML head method | Living Standard | Reciprocal language cluster | Google Search Central recommended method; already implemented in DE |

### Supporting

| Technology | Version | Purpose | When to Use |
|------------|---------|---------|-------------|
| `og:locale` | OpenGraph spec | Social sharing locale | Set to `en_GB` / `it_IT` per decision D-08 |
| `lang` attribute | HTML5 | Document language declaration | `lang="en"` on `<html>` for EN, `lang="it"` for IT |

### Alternatives Considered

None applicable — this phase copies an established pattern, no library decisions needed.

**Installation:** No packages to install.

---

## Architecture Patterns

### New File Locations

```
en/
└── index.html       ← copy of de/index.html, fully translated to English
it/
└── index.html       ← copy of de/index.html, fully translated to Italian
de/
└── index.html       ← existing; hreflang already complete — verify only
assets/              ← unchanged; shared by all three pages via ../assets/
```

### Pattern 1: Copy-and-Translate Workflow

**What:** Start from `de/index.html` as template. Make no structural changes. Replace German strings only.

**When to use:** Always — no exceptions. Structure, IDs, classes, data attributes are frozen.

**Key rule:** Section IDs (`#hero`, `#info`, etc.) are language-neutral and must NOT be translated. They are anchor targets for the language switcher — changing them would break cross-language navigation.

### Pattern 2: Hreflang Reciprocal Block (identical on all 3 pages)

**What:** All four `<link rel="alternate">` tags appear verbatim in every language file. Only the `<link rel="canonical">` and `<html lang="">` differ per file.

**Example (EN page):**
```html
<!-- Source: de/index.html hreflang pattern — replicated unchanged -->
<html lang="en">
<link rel="canonical" href="https://www.example.com/en/">
<link rel="alternate" hreflang="de" href="https://www.example.com/de/">
<link rel="alternate" hreflang="en" href="https://www.example.com/en/">
<link rel="alternate" hreflang="it" href="https://www.example.com/it/">
<link rel="alternate" hreflang="x-default" href="https://www.example.com/de/">
```

**Example (IT page):**
```html
<html lang="it">
<link rel="canonical" href="https://www.example.com/it/">
<link rel="alternate" hreflang="de" href="https://www.example.com/de/">
<link rel="alternate" hreflang="en" href="https://www.example.com/en/">
<link rel="alternate" hreflang="it" href="https://www.example.com/it/">
<link rel="alternate" hreflang="x-default" href="https://www.example.com/de/">
```

### Pattern 3: JSON-LD Per-Language Fields

Only two fields change per language in the Restaurant/LocalBusiness block:

```json
{
  "description": "[translated description]",
  "inLanguage": "en"
}
```

All other fields (name, url, telephone, servesCuisine, priceRange, address, geo, openingHoursSpecification, image) stay identical across all three files.

The `url` field in JSON-LD should match the canonical URL for each language page.

### Pattern 4: FAQPage JSON-LD Translation

The FAQPage schema `name` and `text` fields must exactly match the visible `<dt>` and `<dd>` text in the `#faq` section. They are translated together as a unit.

### Pattern 5: Footer Language Switcher — `aria-current`

In `de/index.html` the DE link has `aria-current="true"`. In `en/index.html` the EN link gets `aria-current="true"` and DE/IT links have no `aria-current`. Same logic for IT.

```html
<!-- In en/index.html footer -->
<a href="/de/" style="color: var(--color-text-inverse);">DE</a> |
<a href="/en/" aria-current="true" style="color: var(--color-accent-light); font-weight: var(--font-weight-bold);">EN</a> |
<a href="/it/" style="color: var(--color-text-inverse);">IT</a>
```

### Anti-Patterns to Avoid

- **Translating section IDs:** `id="hero"`, `id="faq"`, etc. must stay in English on all three pages — they are JS hooks and anchor targets.
- **Translating class names or data attributes:** `class="menu-card"`, `data-variant="primary"`, etc. are CSS/JS hooks — never translate.
- **Changing image paths:** `../assets/img/` works identically from `/en/` and `/it/` — do not modify.
- **Translating dish names in menu cards:** Dish names (e.g., "Tagliatelle al Tartufo", "Margherita D.O.P.") are Italian proper names — they remain in Italian on all three pages. Only the description text underneath each dish name is translated.
- **Changing the H1 tagline:** `Dove il gusto incontra la tradizione` is a brand signature — stays in Italian on all three pages (D-10).
- **Omitting hreflang return tag on any page:** Google ignores the entire cluster if any page is missing a return tag.
- **Using DE canonical on EN/IT pages:** Each language file must have its own self-pointing canonical.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| Language detection redirect | Custom language-switcher JS on the language pages | Separate static files — language switching is footer links only on these pages; root redirect is Phase 7 |
| Translation memory/glossary | Custom spreadsheet or tooling | The CONTEXT.md decisions already encode all terminology choices |

---

## Runtime State Inventory

Step 2.5: This is a translation/localization phase — new file creation, not renaming of existing identifiers. No runtime state affected.

| Category | Items Found | Action Required |
|----------|-------------|-----------------|
| Stored data | None — no database or CMS | None |
| Live service config | None — static HTML site | None |
| OS-registered state | None | None |
| Secrets/env vars | None | None |
| Build artifacts | None — no build step | None |

**Nothing found in any category:** Verified by project architecture — plain HTML/CSS/JS static site with no runtime state.

---

## Environment Availability

Step 2.6: This phase creates static HTML files only. No external tools, services, CLIs, or runtimes beyond a text editor/file system are required.

**Status: SKIPPED** — Phase 5 is file creation (HTML copy + text replacement). No external dependencies.

---

## Complete Translation Reference

### Translatable Strings Inventory (de/index.html — full audit)

The following is the complete list of German strings requiring translation, grouped by location. This is the authoritative reference for the planner to create per-section tasks.

#### `<html>` element
| Attribute | DE value | EN value | IT value |
|-----------|----------|----------|----------|
| `lang` | `de` | `en` | `it` |

#### `<head>` metadata
| Element | DE | EN | IT |
|---------|-----|-----|-----|
| `<title>` | `Ristorante Paganini \| Italienisches Restaurant Leipzig` | `Ristorante Paganini \| Italian Restaurant Leipzig` | `Ristorante Paganini \| Ristorante Italiano Lipsia` |
| `<meta name="description">` | `Erleben Sie authentische…` | `Experience authentic Italian cuisine…` | `Scoprite la cucina italiana autentica…` |
| `<link rel="canonical">` | `/de/` | `/en/` | `/it/` |
| `og:locale` | `de_DE` | `en_GB` | `it_IT` |
| `og:title` | same as title | same as EN title | same as IT title |
| `og:description` | same as meta desc | same as EN desc | same as IT desc |
| `og:url` | `/de/` | `/en/` | `/it/` |
| `twitter:title` | same as title | same as EN title | same as IT title |
| `twitter:description` | same as meta desc | same as EN desc | same as IT desc |

#### JSON-LD Restaurant block (only changed fields)
| Field | DE | EN | IT |
|-------|-----|-----|-----|
| `description` | `Authentisches italienisches Restaurant…Familiengeführt seit Generationen.` | `Authentic Italian restaurant in central Leipzig. Family-run for generations.` | `Autentico ristorante italiano nel centro di Lipsia. A conduzione familiare da generazioni.` |
| `inLanguage` | `de` | `en` | `it` |
| `url` | `/de/` | `/en/` | `/it/` |

#### JSON-LD FAQPage block (all 7 Q&A pairs)

**FAQ 1 — Reservation required?**
- DE name: `Muss ich reservieren?`
- EN name: `Do I need a reservation?`
- IT name: `Devo prenotare?`
- DE text: `Wir empfehlen eine Reservierung…`
- EN text: `We recommend a reservation, especially on weekends and public holidays. During the week, tables are often available at short notice. Reserve conveniently by phone at +49 341 XXXXXXXX or use our online reservation system.`
- IT text: `Vi consigliamo di prenotare, soprattutto nei fine settimana e nei giorni festivi. Durante la settimana è spesso possibile trovare un tavolo anche all'ultimo momento. Prenotate comodamente per telefono al +49 341 XXXXXXXX o tramite il nostro sistema di prenotazione online.`

**FAQ 2 — Business lunch?**
- DE name: `Gibt es einen Mittagstisch?`
- EN name: `Do you have a business lunch?`
- IT name: `Offrite un pranzo di lavoro?`
- DE text: `Ja, wir bieten montags bis freitags…`
- EN text: `Yes, we offer a changing business lunch menu Monday to Friday from 11:30 to 14:30. Our lunch menu includes a starter, pasta, main course and dessert — freshly prepared with seasonal ingredients at an attractive price.`
- IT text: `Sì, offriamo un menu di pranzo di lavoro variabile dal lunedì al venerdì dalle 11:30 alle 14:30. Il nostro menu include antipasto, pasta, secondo e dessert — preparato fresco con ingredienti di stagione a un prezzo conveniente.`

**FAQ 3 — Parking?**
- DE name: `Wo kann ich parken?`
- EN name: `Where can I park?`
- IT name: `Dove posso parcheggiare?`
- DE text: `In unmittelbarer Nähe…`
- EN text: `Parking is available close by on Große Fleischergasse and in the Brühl Center car park, just 200 metres away. Further public parking is available throughout Leipzig city centre.`
- IT text: `Nelle immediate vicinanze trovate parcheggi sulla Große Fleischergasse e al parcheggio Brühl Center, a soli 200 metri. Ulteriori parcheggi pubblici sono disponibili nel centro di Lipsia.`

**FAQ 4 — Vegetarian/vegan?**
- DE name: `Gibt es vegetarische oder vegane Gerichte?`
- EN name: `Do you have vegetarian or vegan dishes?`
- IT name: `Avete piatti vegetariani o vegani?`
- DE text: `Selbstverständlich…`
- EN text: `Of course. Our menu offers a selection of vegetarian dishes including pasta, pizza and antipasti. For vegan guests we are happy to adapt our dishes — just ask us.`
- IT text: `Certo. Il nostro menù offre una selezione di piatti vegetariani, tra cui pasta, pizza e antipasti. Per gli ospiti vegani adattiamo volentieri i nostri piatti — chiedeteci pure.`

**FAQ 5 — Terrace?**
- DE name: `Haben Sie eine Terrasse?`
- EN name: `Do you have a terrace?`
- IT name: `Avete una terrazza?`
- DE text: `Ja, unser Restaurant verfügt…`
- EN text: `Yes, our restaurant has a welcoming terrace right in the heart of Leipzig city centre. In fine weather you can enjoy your meal outdoors — the terrace is open seasonally from spring to autumn.`
- IT text: `Sì, il nostro ristorante dispone di una piacevole terrazza nel cuore del centro di Lipsia. Con il bel tempo potete gustare il vostro pasto all'aperto — la terrazza è aperta stagionalmente dalla primavera all'autunno.`

**FAQ 6 — Payment methods?**
- DE name: `Welche Zahlungsmethoden akzeptieren Sie?`
- EN name: `What payment methods do you accept?`
- IT name: `Quali metodi di pagamento accettate?`
- DE text: `Wir akzeptieren Bargeld…`
- EN text: `We accept cash and all major credit and debit cards (Visa, Mastercard, EC card). Contactless payment is also available.`
- IT text: `Accettiamo contanti e tutte le principali carte di credito e di debito (Visa, Mastercard, Bancomat). È disponibile anche il pagamento contactless.`

**FAQ 7 — Dogs welcome?**
- DE name: `Sind Hunde willkommen?`
- EN name: `Are dogs welcome?`
- IT name: `I cani sono benvenuti?`
- DE text: `Ja, gut erzogene Hunde…`
- EN text: `Yes, well-behaved dogs are very welcome — both inside and on our terrace. We are happy to provide a water bowl.`
- IT text: `Sì, i cani ben educati sono i benvenuti — sia all'interno che sulla nostra terrazza. Siamo felici di mettere a disposizione una ciotola d'acqua.`

#### Header navigation (desktop `<nav>`)
| Link text | DE | EN | IT |
|-----------|-----|-----|-----|
| Home/Start | `Start` | `Home` | `Home` |
| About | `Über uns` | `About Us` | `Chi Siamo` |
| Menu | `Speisekarte` | `Menu` | `Menu` |
| Lunch | `Mittagstisch` | `Business Lunch` | `Pranzo di Lavoro` |
| Reservation | `Reservierung` | `Reservations` | `Prenotazioni` |
| Contact | `Kontakt` | `Contact` | `Contatti` |

#### Mobile menu `aria-label` + close button + links
| Item | DE | EN | IT |
|------|-----|-----|-----|
| Mobile menu `aria-label` | `Navigation` | `Navigation` | `Navigazione` |
| Close button `aria-label` | `Navigation schließen` | `Close navigation` | `Chiudi navigazione` |
| Close button text | `Schließen` | `Close` | `Chiudi` |
| Menu toggle `aria-label` | `Navigation öffnen` | `Open navigation` | `Apri navigazione` |
| Home link | `Start` | `Home` | `Home` |
| Opening hours | `Öffnungszeiten` | `Opening Hours` | `Orari` |
| About | `Über uns` | `About Us` | `Chi Siamo` |
| Menu | `Speisekarte` | `Menu` | `Menu` |
| Lunch | `Mittagstisch` | `Business Lunch` | `Pranzo di Lavoro` |
| Gallery | `Galerie` | `Gallery` | `Galleria` |
| Reservation | `Reservierung` | `Reservations` | `Prenotazioni` |
| Events | `Veranstaltungen` | `Events` | `Eventi` |
| Location | `Anfahrt` | `Getting Here` | `Come Raggiungerci` |
| FAQ | `FAQ` | `FAQ` | `FAQ` |
| Contact | `Kontakt` | `Contact` | `Contatti` |

#### Section: Hero (`#hero`)
| String | DE | EN | IT |
|--------|-----|-----|-----|
| `<img alt>` | `Elegantes italienisches Restaurant Ristorante Paganini in Leipzig` | `Elegant Italian restaurant Ristorante Paganini in Leipzig` | `Elegante ristorante italiano Ristorante Paganini a Lipsia` |
| Trust cue 1 | `Seit über 30 Jahren familiengeführt` | `Family-run for over 30 years` | `A conduzione familiare da oltre 30 anni` |
| Trust cue 2 | `Im Herzen der Leipziger Innenstadt` | `In the heart of Leipzig city centre` | `Nel cuore del centro di Lipsia` |
| Trust cue 3 | `Mo–Sa 11:30–22:00 Uhr · +49 341 XXXXXXXX` | `Mon–Sat 11:30–22:00 · +49 341 XXXXXXXX` | `Lun–Sab 11:30–22:00 · +49 341 XXXXXXXX` |
| CTA primary | `Tisch reservieren` | `Reserve a Table` | `Prenota un Tavolo` |
| CTA secondary | `Speisekarte` | `Menu` | `Menu` |

#### Section: Info bar (`#info`)
| String | DE | EN | IT |
|--------|-----|-----|-----|
| Label: Opening hours | `Öffnungszeiten:` | `Opening Hours:` | `Orari:` |
| Hours text | `Mo–Fr 11:30–22:00 · Sa 12:00–22:00 · So 12:00–21:00` | `Mon–Fri 11:30–22:00 · Sat 12:00–22:00 · Sun 12:00–21:00` | `Lun–Ven 11:30–22:00 · Sab 12:00–22:00 · Dom 12:00–21:00` |
| Label: Address | `Adresse:` | `Address:` | `Indirizzo:` |
| Label: Phone | `Telefon:` | `Phone:` | `Telefono:` |
| CTA | `Tisch reservieren` | `Reserve a Table` | `Prenota un Tavolo` |
| Label: Lunch | `Mittagstisch:` | `Business Lunch:` | `Pranzo di Lavoro:` |
| Lunch hours | `Mo–Fr 11:30–14:30 Uhr` | `Mon–Fri 11:30–14:30` | `Lun–Ven 11:30–14:30` |
| Terrace note | `Terrasse geöffnet (saisonal)` | `Terrace open (seasonal)` | `Terrazza aperta (stagionale)` |

#### Section: About (`#about`)
| String | DE | EN | IT |
|--------|-----|-----|-----|
| `<h2>` | `Unsere Geschichte` | `Our Story` | `La Nostra Storia` |
| Para 1 | `Willkommen im Ristorante Paganini…` | `Welcome to Ristorante Paganini — your piece of Italy in the heart of Leipzig. For over 30 years we have run our restaurant with the same passion our family brought from our Italian homeland. We combine traditional recipes with fresh, carefully selected ingredients for an authentic taste experience.` | `Benvenuti al Ristorante Paganini — il vostro angolo d'Italia nel cuore di Lipsia. Da oltre 30 anni gestiamo il nostro ristorante con la stessa passione che la nostra famiglia ha portato dalla terra d'origine. Uniamo ricette tradizionali a ingredienti freschi e selezionati per un'esperienza di gusto autentica.` |
| Para 2 | `Unsere Küche lebt von der Einfachheit…` | `Our cuisine lives by the simplicity and honesty of the Italian tradition. From handmade pasta to oven-fresh pizza — every dish tells a story of quality and dedication. We source our ingredients, wherever possible, directly from selected suppliers in Italy and the region.` | `La nostra cucina si ispira alla semplicità e all'onestà della tradizione italiana. Dalla pasta fatta a mano alla pizza fresca di forno — ogni piatto racconta una storia di qualità e dedizione. Approvvigionamo i nostri ingredienti, quando possibile, direttamente da fornitori selezionati in Italia e nella regione.` |
| Para 3 | `Ob ein entspanntes Mittagessen…` | `Whether a relaxed lunch, a romantic dinner or an evening with friends — you are warmly welcome. Come in, take a seat and let our hospitality and cuisine enchant you.` | `Che si tratti di un pranzo tranquillo, una cena romantica o una serata con gli amici — siete i benvenuti. Entrate, accomodatevi e lasciatevi incantare dalla nostra ospitalità e dalla nostra cucina.` |

#### Section: Menu (`#menu`)
| String | DE | EN | IT |
|--------|-----|-----|-----|
| `<h2>` | `Unsere Speisekarte` | `Our Menu` | `Il Nostro Menu` |
| Intro para | `Entdecken Sie die Vielfalt…` | `Discover the diversity of Italian cuisine — from classic pasta to crispy pizza, fine antipasti and exquisite wines. Our menu combines tradition with seasonal inspiration.` | `Scoprite la ricchezza della cucina italiana — dalla pasta classica alla pizza croccante, dai raffinati antipasti ai vini pregiati. Il nostro menu unisce tradizione e ispirazione stagionale.` |
| Wine card category heading | `Wein` | `Wine` | `Vino` |
| Dish descriptions (3 per category — translate only the description, not the Italian dish name) | see table below | see table below | see table below |
| CTA download | `Speisekarte herunterladen` | `Download Menu` | `Scarica il Menu` |
| CTA view | `Vollständige Speisekarte` | `Full Menu` | `Menu Completo` |
| PDF href | `../assets/pdf/speisekarte.pdf` | `../assets/pdf/speisekarte.pdf` | `../assets/pdf/speisekarte.pdf` |

**Dish descriptions to translate (dish names stay in Italian):**

| Dish | DE desc | EN desc | IT desc |
|------|---------|---------|---------|
| Tagliatelle al Tartufo | `Frische Bandnudeln mit schwarzem Trüffel und Parmigiano` | `Fresh ribbon pasta with black truffle and Parmigiano` | `Tagliatelle fresche con tartufo nero e Parmigiano` |
| Spaghetti alle Vongole | `Spaghetti mit frischen Venusmuscheln, Knoblauch und Weißwein` | `Spaghetti with fresh clams, garlic and white wine` | `Spaghetti con vongole fresche, aglio e vino bianco` |
| Rigatoni alla Norma | `Rigatoni mit Aubergine, Tomate und gesalzenem Ricotta` | `Rigatoni with aubergine, tomato and salted ricotta` | `Rigatoni con melanzane, pomodoro e ricotta salata` |
| Margherita D.O.P. | `San-Marzano-Tomaten, Büffelmozzarella, frisches Basilikum` | `San Marzano tomatoes, buffalo mozzarella, fresh basil` | `Pomodori San Marzano, mozzarella di bufala, basilico fresco` |
| Diavola | `Pikante Salami, Tomaten, Mozzarella, Peperoncini` | `Spicy salami, tomatoes, mozzarella, pepperoncini` | `Salame piccante, pomodori, mozzarella, peperoncini` |
| Quattro Formaggi | `Mozzarella, Gorgonzola, Parmigiano, Taleggio` | `Mozzarella, Gorgonzola, Parmigiano, Taleggio` (cheese names are proper nouns — unchanged) | `Mozzarella, Gorgonzola, Parmigiano, Taleggio` |
| Carpaccio di Manzo | `Hauchdünn geschnittenes Rinderfilet mit Rucola und Parmesan` | `Thinly sliced beef fillet with rocket and Parmesan` | `Filetto di manzo tagliato finemente con rucola e Parmigiano` |
| Burrata con Pomodori | `Cremige Burrata mit marinierten Tomaten und Basilikum` | `Creamy burrata with marinated tomatoes and basil` | `Burrata cremosa con pomodori marinati e basilico` |
| Vitello Tonnato | `Zartes Kalbfleisch mit feiner Thunfischcreme und Kapern` | `Tender veal with delicate tuna cream and capers` | `Vitello tenero con crema di tonno e capperi` |
| Chianti Classico Riserva | `Kräftiger Rotwein aus der Toskana mit Noten von Kirsche und Leder` | `Full-bodied red wine from Tuscany with notes of cherry and leather` | `Vino rosso corposo dalla Toscana con note di ciliegia e cuoio` |
| Pinot Grigio delle Venezie | `Frischer, leichter Weißwein aus Venetien` | `Fresh, light white wine from Veneto` | `Vino bianco fresco e leggero dal Veneto` |
| Prosecco di Valdobbiadene | `Feiner Schaumwein mit fruchtigen Noten und eleganter Perlage` | `Fine sparkling wine with fruity notes and elegant bubbles` | `Spumante raffinato con note fruttate e perlage elegante` |

#### Section: Business Lunch (`#lunch`)
| String | DE | EN | IT |
|--------|-----|-----|-----|
| `<h2>` | `Mittagstisch` | `Business Lunch` | `Pranzo di Lavoro` |
| Intro para | `Genießen Sie unser wechselndes Mittagsmenü…` | `Enjoy our changing lunch menu — freshly prepared every day with seasonal ingredients. A taste of Italy for your lunch break.` | `Godetevi il nostro pranzo di lavoro variabile — preparato fresco ogni giorno con ingredienti di stagione. Un pezzo d'Italia per la vostra pausa pranzo.` |
| Category: Starter | `Vorspeise` | `Starter` | `Antipasto` |
| Bruschetta desc | `Geröstetes Brot mit frischen Tomaten, Basilikum und Olivenöl` | `Toasted bread with fresh tomatoes, basil and olive oil` | `Pane tostato con pomodori freschi, basilico e olio d'oliva` |
| Category: Pasta | `Pasta` | `Pasta` | `Pasta` |
| Tagliatelle Ragù desc | `Handgemachte Tagliatelle mit hausgemachtem Bolognese-Ragù` | `Handmade tagliatelle with homemade Bolognese ragù` | `Tagliatelle fatte a mano con ragù bolognese fatto in casa` |
| Category: Main | `Hauptgericht` | `Main Course` | `Secondo` |
| Pollo desc | `Geschmortes Huhn mit Tomaten, Oliven und Kräutern, serviert mit Polenta` | `Braised chicken with tomatoes, olives and herbs, served with polenta` | `Pollo brasato con pomodori, olive ed erbe aromatiche, servito con polenta` |
| Category: Dessert | `Dessert` | `Dessert` | `Dessert` |
| Panna Cotta desc | `Cremige Vanille-Panna-Cotta mit frischen Beeren` | `Creamy vanilla panna cotta with fresh berries` | `Panna cotta alla vaniglia con frutti di bosco freschi` |
| Holiday note | `Bitte beachten Sie: An Feiertagen kann das Mittagsangebot abweichen.` | `Please note: Lunch service may vary on public holidays.` | `Si prega di notare: il servizio pranzo può variare nei giorni festivi.` |
| CTA download | `Mittagskarte herunterladen` | `Download Lunch Menu` | `Scarica il Menu del Pranzo` |
| PDF href | `../assets/pdf/mittagskarte.pdf` | `../assets/pdf/mittagskarte.pdf` | `../assets/pdf/mittagskarte.pdf` |

#### Section: Gallery (`#gallery`)
| Item | DE | EN | IT |
|------|-----|-----|-----|
| `<h2>` | `Impressionen` | `Gallery` | `Galleria` |
| Image 1 alt + lightbox alt | `Handgemachte Pasta nach traditionellem Familienrezept` | `Handmade pasta using a traditional family recipe` | `Pasta fatta a mano secondo la ricetta di famiglia` |
| Image 1 caption | `Handgemachte Pasta` | `Handmade Pasta` | `Pasta Fatta a Mano` |
| Image 2 alt + lightbox alt | `Elegantes Ambiente im Ristorante Paganini` | `Elegant atmosphere at Ristorante Paganini` | `Atmosfera elegante al Ristorante Paganini` |
| Image 2 caption | `Unser Restaurant` | `Our Restaurant` | `Il Nostro Ristorante` |
| Image 3 alt + lightbox alt | `Frische Pizza aus dem Steinofen` | `Fresh pizza from the stone oven` | `Pizza fresca dal forno a legna` |
| Image 3 caption | `Pizza aus dem Steinofen` | `Stone Oven Pizza` | `Pizza dal Forno` |
| Image 4 alt + lightbox alt | `Gemütliche Ecke für ein romantisches Abendessen` | `Cosy corner for a romantic dinner` | `Angolo accogliente per una cena romantica` |
| Image 4 caption | `Romantisches Ambiente` | `Romantic Atmosphere` | `Atmosfera Romantica` |
| Image 5 alt + lightbox alt | `Sonnige Terrasse im Herzen von Leipzig` | `Sunny terrace in the heart of Leipzig` | `Terrazza soleggiata nel cuore di Lipsia` |
| Image 5 caption | `Unsere Terrasse` | `Our Terrace` | `La Nostra Terrazza` |
| Image 6 alt + lightbox alt | `Eingang des Ristorante Paganini an der Großen Fleischergasse` | `Entrance to Ristorante Paganini on Große Fleischergasse` | `Ingresso del Ristorante Paganini in Große Fleischergasse` |
| Image 6 caption | `Unser Eingang` | `Our Entrance` | `Il Nostro Ingresso` |

#### Section: Reservation (`#reservation`)
| String | DE | EN | IT |
|--------|-----|-----|-----|
| `<h2>` | `Tisch reservieren` | `Reserve a Table` | `Prenota un Tavolo` |
| Intro para | `Sichern Sie sich Ihren Tisch…` | `Secure your table at Ristorante Paganini. We look forward to your visit.` | `Assicuratevi il vostro tavolo al Ristorante Paganini. Vi aspettiamo con piacere.` |
| Widget placeholder text | `Hier können Sie direkt einen Tisch reservieren. Alternativ: +49 341 XXXXXXXX` | `Reserve your table directly here. Alternatively: +49 341 XXXXXXXX` | `Prenotate direttamente qui il vostro tavolo. In alternativa: +49 341 XXXXXXXX` |
| Phone CTA | `Rufen Sie uns an` | `Call Us` | `Chiamateci` |

#### Section: Groups & Events (`#events`)
| String | DE | EN | IT |
|--------|-----|-----|-----|
| `<h2>` | `Gruppen & Veranstaltungen` | `Groups &amp; Events` | `Gruppi &amp; Eventi` |
| Para 1 | `Planen Sie ein besonderes Essen…` | `Planning a special meal with your family, friends or colleagues? We are happy to host your private celebration or business dinner — with an individually tailored menu and personal service.` | `Pianificate un pasto speciale con la famiglia, gli amici o i colleghi? Siamo lieti di ospitare la vostra festa privata o la vostra cena di lavoro — con un menu personalizzato e un servizio attento.` |
| Para 2 | `Ob Geburtstag, Jubiläum…` | `Whether birthday, anniversary, corporate event or Christmas party — get in touch, and we will create an unforgettable evening for you and your guests.` | `Che si tratti di un compleanno, un anniversario, un evento aziendale o una festa di Natale — contattateci e organizzeremo per voi una serata indimenticabile.` |
| CTA phone | `Jetzt anrufen` | `Call Now` | `Chiamate Ora` |
| CTA email | `E-Mail schreiben` | `Send an Email` | `Scrivete un'Email` |

#### Section: Location (`#location`)
| String | DE | EN | IT |
|--------|-----|-----|-----|
| `<h2>` | `So finden Sie uns` | `Getting Here` | `Come Raggiungerci` |
| Country in address | `Deutschland` | `Germany` | `Germania` |
| Parking label | `Parkmöglichkeiten:` | `Parking:` | `Parcheggio:` |
| Parking item 1 | `Große Fleischergasse (Straßenparken)` | `Große Fleischergasse (street parking)` | `Große Fleischergasse (parcheggio in strada)` |
| Parking item 2 | `Brühl Center Parkhaus (ca. 200 m)` | `Brühl Center car park (approx. 200 m)` | `Parcheggio Brühl Center (ca. 200 m)` |
| Parking item 3 | `Öffentliche Parkplätze in der Innenstadt` | `Public parking in the city centre` | `Parcheggi pubblici nel centro città` |
| Map CTA | `Auf Google Maps anzeigen` | `View on Google Maps` | `Visualizza su Google Maps` |
| Map image alt | `Lage des Ristorante Paganini in der Leipziger Innenstadt` | `Location of Ristorante Paganini in Leipzig city centre` | `Posizione del Ristorante Paganini nel centro di Lipsia` |

#### Section: FAQ (`#faq`)
| String | DE | EN | IT |
|--------|-----|-----|-----|
| `<h2>` | `Häufig gestellte Fragen` | `Frequently Asked Questions` | `Domande Frequenti` |
| All 7 `<dt>` and `<dd>` pairs | see JSON-LD FAQ reference above — visible HTML text must exactly match JSON-LD | same EN text as JSON-LD above | same IT text as JSON-LD above |

#### Section: Contact (`#contact`)
| String | DE | EN | IT |
|--------|-----|-----|-----|
| `<h2>` | `Kontakt` | `Contact` | `Contatti` |
| Sub-heading | `Erreichen Sie uns` | `Get in Touch` | `Contattateci` |
| Label: Phone | `Telefon:` | `Phone:` | `Telefono:` |
| Label: Email | `E-Mail:` | `Email:` | `Email:` |
| Label: Address in address block | `Adresse:` | `Address:` | `Indirizzo:` |
| Sub-heading: hours | `Öffnungszeiten` | `Opening Hours` | `Orari di Apertura` |
| Monday–Friday | `Montag – Freitag` | `Monday – Friday` | `Lunedì – Venerdì` |
| Saturday | `Samstag` | `Saturday` | `Sabato` |
| Sunday | `Sonntag` | `Sunday` | `Domenica` |
| Instagram link | `Folgen Sie uns auf Instagram` | `Follow us on Instagram` | `Seguiteci su Instagram` |

#### Lightbox modal (outside `<main>`, after it)
| String | DE | EN | IT |
|--------|-----|-----|-----|
| `aria-label` on lightbox div | `Bildergalerie` | `Image gallery` | `Galleria immagini` |
| Close button `aria-label` | `Galerie schließen` | `Close gallery` | `Chiudi galleria` |
| Prev button `aria-label` | `Vorheriges Bild` | `Previous image` | `Immagine precedente` |
| Next button `aria-label` | `Nächstes Bild` | `Next image` | `Immagine successiva` |

#### Footer (`#footer`)
| String | DE | EN | IT |
|--------|-----|-----|-----|
| Legal heading | `Rechtliches` | `Legal` | `Note Legali` |
| Impressum link text | `Impressum` | `Imprint` | `Note Legali` |
| Datenschutz link text | `Datenschutz` | `Privacy Policy` | `Privacy` |
| Impressum href | `/de/impressum.html` | `/en/impressum.html` | `/it/impressum.html` |
| Datenschutz href | `/de/datenschutz.html` | `/en/datenschutz.html` | `/it/datenschutz.html` |
| Language switcher heading | `Sprache` | `Language` | `Lingua` |
| Active language link | `aria-current="true"` on DE | `aria-current="true"` on EN | `aria-current="true"` on IT |
| Copyright line | `© 2026 Ristorante Paganini. Alle Rechte vorbehalten.` | `© 2026 Ristorante Paganini. All rights reserved.` | `© 2026 Ristorante Paganini. Tutti i diritti riservati.` |

---

## Common Pitfalls

### Pitfall 1: Missing hreflang Return Tags
**What goes wrong:** Google ignores the entire hreflang cluster if any one page in the cluster is missing a return tag.
**Why it happens:** Implementors add hreflang to new pages but forget to verify the existing DE page already has complete tags.
**How to avoid:** The DE page already has all 4 hreflang tags including `/en/` and `/it/` (confirmed by code inspection). Copy the identical block to EN and IT pages. After creating both files, do a cross-check: each page must list all three language URLs.
**Warning signs:** Hreflang validation tool (e.g., hreflang.org or Google Search Console) reports errors.
[VERIFIED: de/index.html code inspection — all 4 hreflang tags present and correct]

### Pitfall 2: Wrong Canonical URL on Language Pages
**What goes wrong:** EN or IT page has canonical pointing to DE URL — creates SEO conflict.
**Why it happens:** Forgetting to update the canonical when copying the DE template.
**How to avoid:** The canonical is on line 25 of de/index.html. It must be the first change made when creating each new language file.
**Warning signs:** `<link rel="canonical" href="https://www.example.com/de/">` found in en/ or it/ file.

### Pitfall 3: Translating Section IDs or Anchor Hrefs
**What goes wrong:** Nav links like `href="#reservierung"` on the DE page get translated to `href="#reservation"` on EN, but the section `id` was also changed — or not. Either way causes broken in-page navigation.
**Why it happens:** Translator treats all German text as translatable.
**How to avoid:** Section IDs are already English (`#hero`, `#info`, `#about`, `#menu`, `#lunch`, `#gallery`, `#reservation`, `#events`, `#location`, `#faq`, `#contact`, `#footer`) — they must be copied verbatim. Nav link `href` attributes already use these IDs and are correct as-is.
[VERIFIED: de/index.html code inspection — all section IDs are already language-neutral English]

### Pitfall 4: German Strings Left in `aria-label` Attributes
**What goes wrong:** Visual content is translated but ARIA labels remain in German, causing screen reader issues for EN/IT users.
**Why it happens:** aria-label attributes are not visible in the browser and easy to miss.
**How to avoid:** The translation reference above includes all aria-label values. The most critical ones: mobile menu toggle, mobile menu close button, lightbox modal label, lightbox navigation buttons.

### Pitfall 5: FAQPage JSON-LD Out of Sync with Visible Text
**What goes wrong:** FAQ section HTML is updated but FAQPage JSON-LD in `<head>` still has German text (or vice versa).
**Why it happens:** The two locations are far apart in the file. Easy to update one and miss the other.
**How to avoid:** Treat FAQPage JSON-LD and `#faq` section as a single atomic unit. The `<!-- SYNC: -->` comment in the source file marks this. The translation reference above provides matching text for both locations.

### Pitfall 6: Dish Names Wrongly Translated
**What goes wrong:** "Tagliatelle al Tartufo" becomes "Truffle Ribbon Pasta" in the EN file, losing authenticity.
**Why it happens:** Automatic translation or thoroughness instinct.
**How to avoid:** Italian dish names (Tagliatelle al Tartufo, Spaghetti alle Vongole, Carpaccio di Manzo, etc.) are proper Italian culinary names. Only the description text beneath each dish name is translated. This is explicitly noted in the menu section of the translation reference above.

### Pitfall 7: `og:locale` Value Wrong
**What goes wrong:** EN page has `og:locale="en_US"` instead of `en_GB`, or IT page has `og:locale="it"` instead of `it_IT`.
**How to avoid:** Decision D-08 specifies `en_GB` and `it_IT`. These are the exact values to use.

### Pitfall 8: Footer Legal Links Still Point to DE Legal Pages
**What goes wrong:** `en/index.html` footer has `<a href="/de/impressum.html">` — English visitor lands on German legal page.
**How to avoid:** Legal page hrefs in the footer must be updated to `/en/impressum.html`, `/en/datenschutz.html` for EN, and `/it/impressum.html`, `/it/datenschutz.html` for IT. Phase 6 creates these files, but the links must already be correct from Phase 5.

---

## Code Examples

### Complete Head Metadata Pattern (EN page)

```html
<!-- Source: de/index.html adapted per decisions D-06 to D-15 -->
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Ristorante Paganini | Italian Restaurant Leipzig</title>
  <meta name="description" content="Experience authentic Italian cuisine in the heart of Leipzig. Ristorante Paganini — family-run, with a passion for quality and hospitality for generations. Reserve a table: +49 341 XXXXXXXX">

  <link rel="canonical" href="https://www.example.com/en/">

  <link rel="alternate" hreflang="de" href="https://www.example.com/de/">
  <link rel="alternate" hreflang="en" href="https://www.example.com/en/">
  <link rel="alternate" hreflang="it" href="https://www.example.com/it/">
  <link rel="alternate" hreflang="x-default" href="https://www.example.com/de/">

  <meta property="og:type" content="restaurant">
  <meta property="og:locale" content="en_GB">
  <meta property="og:site_name" content="Ristorante Paganini">
  <meta property="og:title" content="Ristorante Paganini | Italian Restaurant Leipzig">
  <meta property="og:description" content="Experience authentic Italian cuisine in the heart of Leipzig. Ristorante Paganini — family-run, with a passion for quality and hospitality for generations. Reserve a table: +49 341 XXXXXXXX">
  <meta property="og:url" content="https://www.example.com/en/">
  ...
```

### Complete Head Metadata Pattern (IT page)

```html
<!-- Source: de/index.html adapted per decisions D-06 to D-15 -->
<html lang="it">
<head>
  <title>Ristorante Paganini | Ristorante Italiano Lipsia</title>
  <meta name="description" content="Scoprite la cucina italiana autentica nel cuore di Lipsia. Ristorante Paganini — a conduzione familiare, con passione per la qualità e l'ospitalità da generazioni. Prenotate un tavolo: +49 341 XXXXXXXX">

  <link rel="canonical" href="https://www.example.com/it/">
  <!-- hreflang block identical to EN page -->
  <meta property="og:locale" content="it_IT">
  <meta property="og:url" content="https://www.example.com/it/">
  ...
```

### JSON-LD Restaurant Block (EN page — only changed fields shown)

```json
{
  "@context": "https://schema.org",
  "@type": ["Restaurant", "LocalBusiness"],
  "name": "Ristorante Paganini",
  "description": "Authentic Italian restaurant in central Leipzig. Family-run for generations.",
  "url": "https://www.example.com/en/",
  "inLanguage": "en",
  ...all other fields identical to de/index.html...
}
```

### Footer Language Switcher (EN page)

```html
<!-- In en/index.html footer — aria-current on EN link -->
<p><strong>Language</strong></p>
<p>
  <a href="/de/" style="color: var(--color-text-inverse);">DE</a> |
  <a href="/en/" aria-current="true" style="color: var(--color-accent-light); font-weight: var(--font-weight-bold);">EN</a> |
  <a href="/it/" style="color: var(--color-text-inverse);">IT</a>
</p>
```

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual browser validation + HTML validator |
| Config file | none |
| Quick run command | Open file in browser, verify rendered text |
| Full suite command | W3C HTML validator + hreflang checker |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LANG-02 | EN page at /en/index.html, fully localized, zero German strings | manual | `grep -r "[äöüÄÖÜß]" en/index.html` to find leftover German | Wave 0 (file created this phase) |
| LANG-03 | IT page at /it/index.html, fully localized, zero German strings | manual | `grep -r "[äöüÄÖÜß]" it/index.html` to find leftover German | Wave 0 (file created this phase) |
| SEO-03 | All 4 hreflang tags on all 3 pages, no orphan | manual | `grep -c "hreflang" de/index.html en/index.html it/index.html` — each should return 4 | existing + new |
| D-08 | og:locale correct per page | manual | `grep "og:locale" en/index.html it/index.html` | new |
| D-13/D-15 | Canonical URLs self-pointing per page | manual | `grep "canonical" en/index.html it/index.html` | new |

### Sampling Rate

- **Per task commit:** Render in browser, verify section headings and nav labels in target language
- **Per wave merge:** Full manual pass — zero German strings, all hreflang tags, canonical correct
- **Phase gate:** All 5 success criteria from phase description verified before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `en/index.html` — covers LANG-02 (created in Wave 1 of this phase)
- [ ] `it/index.html` — covers LANG-03 (created in Wave 1 of this phase)
- [ ] `en/` directory must be created
- [ ] `it/` directory must be created

---

## Security Domain

This phase creates static read-only HTML files with no user input, no forms, no scripting, and no backend. ASVS categories V2 (Authentication), V3 (Session Management), V4 (Access Control), V6 (Cryptography) do not apply.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | n/a — static file |
| V3 Session Management | no | n/a — static file |
| V4 Access Control | no | n/a — static file |
| V5 Input Validation | no | no user input in these files |
| V6 Cryptography | no | n/a — no secrets, no data |

No threat patterns applicable for static HTML translation files.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Italian "Voi" register is correct hospitality convention for a southern Italian family restaurant addressing German customers in Italian | Translation Reference — IT copy | Copy may feel slightly unusual to native Italian speakers; discretion note in CONTEXT.md covers this |
| A2 | "Lipsia" is the correct Italian name for Leipzig | Meta title IT, multiple translation strings | If wrong, swap to "Leipzig" — both are used, Leipzig is internationally understood |
| A3 | `en_GB` is preferred over `en_US` for og:locale on a Leipzig restaurant targeting European English speakers | Head metadata section | Minimal SEO impact either way; D-08 locks this choice |

**Verified claims:** All structural claims (file paths, section IDs, hreflang block structure, JSON-LD field names, HTML attribute values) verified by direct inspection of `de/index.html`. [VERIFIED: codebase inspection]

---

## Open Questions

1. **PDF assets for EN/IT**
   - What we know: DE page links to `../assets/pdf/speisekarte.pdf` and `../assets/pdf/mittagskarte.pdf`. EN/IT pages use the same relative paths (shared assets).
   - What's unclear: The PDFs are placeholders ("before launch"). They are currently German-language PDFs. EN/IT pages will link to the same German PDFs.
   - Recommendation: Keep shared PDF paths. The plan should add a `<!-- PLACEHOLDER: Replace with EN/IT PDF version before launch -->` comment on these links. No blocking issue for Phase 5.

2. **Legal page links in footer**
   - What we know: EN footer links to `/en/impressum.html` and `/en/datenschutz.html`. These files do not exist until Phase 6.
   - What's unclear: Whether broken footer links are acceptable during Phase 5.
   - Recommendation: Write the correct links now — broken links during development are expected and noted in Phase 6 scope. Add `<!-- Phase 6 will create these pages -->` comment.

---

## Sources

### Primary (HIGH confidence)

- `de/index.html` — direct code inspection; all structural claims, section IDs, attribute values, and string locations verified [VERIFIED: codebase inspection]
- `CLAUDE.md` — project constraints, tech stack decisions, hreflang rules [VERIFIED: codebase inspection]
- `05-CONTEXT.md` — locked decisions D-01 through D-16 [VERIFIED: codebase inspection]

### Secondary (MEDIUM confidence)

- Google Search Central hreflang docs (referenced in CLAUDE.md) — reciprocal tag requirement, x-default pointing to primary language [CITED: developers.google.com/search/docs/specialty/international/localized-versions]

### Tertiary (LOW confidence — marked as ASSUMED)

- Italian "Voi" register recommendation — training knowledge, not verified against a current style guide [ASSUMED]
- "Lipsia" as standard Italian name for Leipzig — training knowledge [ASSUMED]

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — this phase creates no new dependencies; copies established pattern
- Architecture: HIGH — copy-and-translate pattern verified against existing de/index.html
- Translation strings: HIGH for structure, MEDIUM for exact phrasing (discretion area per CONTEXT.md)
- Pitfalls: HIGH — all identified from direct code inspection of source file

**Research date:** 2026-04-08
**Valid until:** Stable — until de/index.html changes (content changes in DE must be replicated to EN/IT)
