# Sharpify.io — Reverse engineering dell'architettura visiva e della grammatica delle sezioni

## Punti chiave

- Il fondo è UNO SOLO: ~92% degli 8242px di pagina è #000000/#020202. Non c'è alternanza scuro/chiaro classica — le uniche due rotture di valore sono la fascia crema #F4F2EC di 168px (2,0% della pagina) e il muro di 25 tile logo BIANCHE 228x120px. Tutta la gerarchia è fatta con ~23 alpha di bianco (1.0 / .86 / .79 / .78 / .58 / .40 / .30 / .12 / .08 / .07 / .06 / .05), non con colori.
- Le sezioni sono giuntate a filo: il gap misurato tra la fine di una sezione e l'inizio della successiva è 0px su TUTTE le 14 fasce. Il ritmo verticale è generato solo da padding interno (36/60/72/80/84/96/128/160px). Non esistono margini inter-sezione.
- Formula unica di testa-sezione ripetuta 7 volte: eyebrow letterale '[ NOME ]' in DM Sans 16px/600, letter-spacing +1,4px, uppercase, rgba(255,255,255,0.79), margin-bottom 20px → H2 DM Sans 64px/500, line-height 1.2, letter-spacing -3px. La ripetizione compra densità: il lettore impara la sintassi una volta sola.
- La stat card 'glow' è un costrutto a 4 strati, non un box-shadow: wrapper 377x350 radius 10px overflow hidden con padding 2px → .blob 250x280 border-radius 50% con filter blur(40px) e z-index -1 in colore pieno (#D12C2C rosso / rgba(0,102,51,.25) verde / #4FA1FF blu) → .inner con backdrop-filter blur(80px), border 2px rgba(0,153,76,.55), padding 48x32px. Il bagliore filtra dai 2px di gap e viene diffuso dal vetro.
- Range tipografico enorme = densità gratis. Dal display 112px (H1, weight 500, letter-spacing -4px) alle micro-label 10px c'è un rapporto 11:1. Con quel salto, il testo da 12px può restare davvero piccolo senza competere. Il contrappunto serif è un singolo gesto: 'Relentlessly' in Editorial Old 96px weight 100 accanto a 'WHAT WE DO' in DM Sans 96px/600.
- Il motion è chirurgico: UN SOLO ScrollTrigger su tutta la pagina (start 'top 80%', end '+=80%', scrub 0.5, 720px di corsa) che colora 53 span .word dal 12% al 100% di bianco. Tutto il resto è CSS: fadeInUp 0.7s cubic-bezier(.25,.46,.45,.94), reveal IntersectionObserver 0.45-0.55s con translateY(28px), marquee loghi 46s lineari.
- Quattro container che si restringono con la densità del contenuto: 1440px (nav, padding 40px) → 1260px (statement, footer) → 1200px (griglia servizi, resources) → 1120px (pannelli editoriali). Gutter differenziati: 8px (badge), 10px (tile logo), 18px (card servizi e card risultato), 30px (stat card), 36px (colonne footer).
- Il 'bento servizi' NON è un bento: è una griglia uniforme repeat(4,1fr) x 3 righe, celle identiche 286,5x213,2px, gap 18px, max-width 1200px. Zero varianza di span. Il costo di scansione azzerato è ciò che permette 12 voci di servizio senza affollamento.
- Da NON copiare: il text-shadow 0 0 8px rgba(255,255,255,.9) sulle label delle card risultato (bagliore da 2012 su caps 15px sopra fotografia), il filter:invert(1) + mix-blend-mode:screen sui loghi cliente (si rompe con qualsiasi logo non monocromatico), e il video full-bleed da 800px (9,7% della pagina) tirato su con margin-top:clamp(-96px,-6vw,-24px) senza poster, didascalia o funzione.
- Il sito è tenuto insieme da ~14KB di override !important agganciati a hash data-id di Elementor, ha una sezione '[ case studies ]' presente nel DOM ad altezza 0 e una riga tech-partner duplicata in display:none. Cinque font caricati (DM Sans 1865 nodi, Nunito 30, Instrument Sans 17, Editorial Old 2, Inter 1): Nunito e Inter servono un solo componente ciascuno — accidente, non sistema.

---

# Sharpify.io — Reverse engineering dell'architettura visiva

**Metodo**: DOM ispezionato dal vivo a viewport emulata 1440x900. Altezza documento reale **8242px** (9,2 viewport). 1934 nodi nel body. Tutte le misure sotto sono `getComputedStyle` reali, non stime.

---

## 1. SEQUENZA NARRATIVA: 14 fasce, la funzione retorica di ciascuna, il ritmo

### La scoperta strutturale che governa tutto

Ho misurato il gap fra la fine di ogni fascia e l'inizio della successiva. **È 0px su tutte e 14.** Nessun margine inter-sezione, nessuna regola, nessun cambio di fondo a separare. Il ritmo verticale esiste *solo* dentro le sezioni, come padding. Effetto: 14 blocchi vengono letti come **un documento continuo**, non come una sequenza di moduli. È la premessa di tutta la densità.

| # | Fascia | Top→Bottom | Altezza | % pagina | Fondo | Funzione retorica |
|---|---|---|---|---|---|---|
| 0 | Barra annuncio (fixed) | 0→44 | 44px | — | gradient 90° `#00352b → #006633 55% → #00813f` | "Qui succedono cose, con una data." Urgenza datata, non generica |
| 0 | Nav sticky (fixed) | 44→129 | 85px | — | trasparente → `rgba(8,8,8,.88)` allo scroll | Orientamento minimo: 3 voci sole |
| 1 | **Hero** | 44→1135 | 1091px | 13,2% | `#020202` | "Ti prometto una cosa sola, in caratteri da 112px" |
| 1b | ↳ Marquee card risultato (dentro l'hero) | 622→1115 | 493px | 6,0% | trasparente | **La prova entra prima della piega.** A 900px di viewport si vedono i primi ~280px delle card: numeri e facce già visibili, la scroll è innescata dalla curiosità, non dal dovere |
| 2 | **Statement di posizionamento** | 1135→1538 | 403px | 4,9% | gradient 360° `#000 → #020202` | "Chi siamo in una frase." Reveal parola-per-parola: il lettore è *costretto* a leggerla piano |
| 3 | Video full-bleed | 1451→2251 | 800px | 9,7% | trasparente | Volto/atmosfera. Tirato su di `-86,4px` (`margin-top: clamp(-96px,-6vw,-24px)`) a sovrapporsi allo statement |
| 4 | **[ TECH PARTNERS ]** | 2251→2667 | 416px | 5,0% | `#000` | Prova di **legittimità**: non i clienti, le piattaforme che ti certificano. 6 badge, gap 8px, riga alta 160px |
| 5 | **[ DIGITAL DOMINANCE ]** — solo testa | 2667→2933 | 266px | 3,2% | `#000` | Testa isolata, allineata a **sinistra**: annuncia il numero prima di darlo. Costruzione dell'attesa |
| 6 | **3 stat card con glow** | 2933→3323 | 390px | 4,7% | `#000` + 3 blob colorati | Prova di **scala**: $50M / 25 / 2300. Il momento di massimo colore della pagina |
| 7 | **[ OUR SERVICES ]** — testa | 3323→3757 | 434px | 5,3% | `#000` | Cambio di registro: da prova a offerta. Split asimmetrico 942px testo / **404px vuoti** |
| 8 | Griglia 12 servizi | 3757→4652 | 895px | 10,9% | `#000` | Prova di **ampiezza**: 12 voci = "copriamo tutto". Chiude con CTA verde piena |
| 9 | **[ PARTNERS ]** + muro loghi | 4652→5591 | 939px | 11,4% | `#000` con **25 tile bianche** | Prova di **volume**. Rottura di valore violenta. Chiude con lo slot `YOUR LOGO HERE` |
| 10 | **[ RESOURCES & INSIGHTS ]** — testa | 5591→5861 | 270px | 3,3% | `#000`, padding-top 80px | "Non vendiamo solo, insegniamo" |
| 11 | Corpo resources | 5861→7204 | 1343px | **16,3%** | `#000`, card `#111` | Blocco più grande della pagina: contenuto educational + evento datato + lead magnet |
| 12 | **AS FEATURED IN** | 7204→7372 | 168px | 2,0% | **`#F4F2EC`** | Prova di **autorità stampa**. Unica fascia chiara: 2% della pagina = massimo impatto per minimo spazio |
| 13 | **[ ABOUT US ]** | 7372→7759 | 387px | 4,7% | `#000` | Riassunto breve, centrato, CTA outline. Chiusura calma |
| 14 | Footer | 7759→8242 | 483px | 5,9% | `#0D0C10` | Densità di navigazione: 5 colonne |

### La curva retorica

**Promessa (13%) → identità (5%) → prova legittimità (5%) → prova scala (8%) → offerta (16%) → prova volume (11%) → autorità (18%) → chi siamo (5%)**

La prova occupa **~29% della pagina** (2406px: card risultato + stat card + partner + featured + tech partner). L'offerta ne occupa **16%**. Il rapporto prova:offerta è **1,8:1** — è un sito che dimostra il doppio di quanto propone. E la prova è **stratificata per tipo**, non ripetuta: piattaforme che ti certificano → numeri aggregati → numeri per cliente → conteggio clienti → testate. Cinque prove diverse, mai la stessa due volte.

### Il ritmo di alternanza reale

Non c'è alternanza scuro/chiaro. C'è **alternanza di densità sullo stesso fondo**:

```
DENSO    ░░░░████░░░████░░░░████████░░░░████████░░░░░░████████████░░██░░░
         hero card  badge  stat    servizi 12    partner 25  resources  feat
RESPIRO  ████░░░░████░░░████░░░░░░░░████░░░░░░░░████░░░░░░░░░░░░░░░░░░████
         h1   statem  testa   testa      testa       testa            about
```

Il pattern è **testa-respiro / corpo-denso**, sette volte. Ogni blocco denso è preceduto da una fascia di 266–434px che contiene 2–3 righe di testo e nient'altro. Quella fascia è il "reset" percettivo che rende possibile il blocco denso dopo.

**Allineamento**: 6 teste su 8 sono centrate, 2 a sinistra — e sono esattamente le due seguite da una griglia di card (`[ DIGITAL DOMINANCE ]`, `[ OUR SERVICES ]`). Regola implicita difendibile: *centro se segue un marquee o un full-bleed, sinistra se segue una griglia*. Con 2 casi su 8 però legge più come incoerenza che come sistema.

---

## 2. ANATOMIA DEI COMPONENTI RICORRENTI

### 2.1 Barra annuncio — `.sf-announce`

```
position: fixed; top: 0; height: 44px; z-index: 9500;
background: linear-gradient(90deg, #00352b 0%, #006633 55%, #00813f 100%);
box-shadow: 0 1px 14px rgba(0,0,0,.28);
display: flex; align-items: center; justify-content: center; overflow: hidden;
body { padding-top: 44px }   /* html.sf-ann-off body { padding-top: 0 } */
```

**Struttura interna** (`.sf-announce-link`, flex, gap **13px**, padding `0 46px 0 20px` — i 46px a destra liberano la X):

1. `.sf-announce-dot` — 8px, `border-radius:50%`, `#FF5252`, `animation: sf-ann-pulse 1.6s infinite` — l'anello pulsa via `box-shadow: 0 0 0 0 → 0 0 0 7px rgba(255,82,82,0) → 0`. **Nessun transform**: zero layout thrash.
2. `.sf-announce-tag` — nascosto sotto 860px
3. `.sf-announce-msg` — 14px/500, `rgba(255,255,255,.92)`, `white-space:nowrap; text-overflow:ellipsis`; `<strong>` in `#fff`/700
4. `.sf-announce-when` — **`#CEDC00`** (lime acido), 700 — la data è l'unico elemento in secondo accento
5. `.sf-announce-btn` — pill: bg `#CEDC00`, testo `#00332f`, 13px/700, padding `6px 16px`, radius 99px → hover `#e0eb47`
6. `.sf-announce-x` — absolute right 12px, `translateY(-50%)`, `rgba(255,255,255,.55)` → `#fff`

**Degradazione progressiva reale**: `@860px` font 12px, gap 9px, padding `0 38px 0 13px`; `@430px` cade `.sf-announce-city`. Tre livelli di contenuto sacrificabile in ordine di importanza.

**Hover**: solo il bottone cambia (`background .2s`). Il resto è inerte. Difeso da ~10 righe di `!important` che spengono decorazioni tema su `a`, `a::before/::after`.

### 2.2 Nav sticky — `.sf-hdr`

```
position: fixed; top: 44px; z-index: 9000;
background: transparent; border-bottom: 1px solid transparent;
transition: background .3s ease, border-color .3s ease, backdrop-filter .3s ease;

.sf-hdr.sf-scrolled {
  background: rgba(8,8,8,0.88);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom-color: rgba(255,255,255,0.08);
}
.sf-hdr-inner { max-width:1440px; margin:0 auto; padding:0 40px; height:84px; display:flex; align-items:center }
```

**Sequenza orizzontale**: logo (h **40px**, `flex-shrink:0`) → `.sf-nav` (`margin-left:26px`, `gap:2px`) → `.sf-right` (`margin-left:auto`, `gap:14px`).

| Elemento | Misure |
|---|---|
| Link nav | 16px/500, `rgba(255,255,255,.86)`, padding `8px 16px`, **radius 8px**. Hover: `background: rgba(0,102,51,.35)`, colore `#fff`, `transition: color .2s, background .2s` |
| Switch lingua `.lang-btn` | pill 99px, h 40px, 13px/700, ls +0,52px, padding `16px/13px`. Attivo `.on`: bg `#006633`, `#fff`. Inattivo: `rgba(255,255,255,.6)` |
| `.login-btn` | pill 99px, h 40px, bg `rgb(14,17,23)`, 14px/700, padding `0 26px` |
| `.sf-cta` | pill 99px, h 40px, bg `#006633`, 14px/700, padding `0 24px` → hover `#00813f` |

**Il dettaglio da rubare**: i tre bottoni a destra sono **normalizzati a forza** a `height:40px !important; border-radius:99px; font-size:14px; font-weight:700; line-height:1; padding-top:0; padding-bottom:0`. Tre componenti di provenienza diversa, una sola silhouette. È ciò che fa sembrare la nav progettata.

**Breakpoint 1024px**: nav, lingua, login e CTA vanno tutti a `display:none`, appare `.mob-burger`, inner scende a `height:64px; padding:0 18px`, e il fondo diventa **opaco di default** (`rgba(8,8,8,.94)`, blur 16px) — su mobile la trasparenza è rinunciata.

### 2.3 Card risultato — `.doe-simple-slider__card.case-card`

Il componente meglio risolto della pagina. **274 x 365px**, `aspect-ratio: 3/4`, `border-radius: 20px`, `overflow:hidden`, `background-size:cover; background-position:center`, `padding-top:36px`, flex column `justify-content:center`.

Quattro strati:

```
1. background-image        →  foto reale del cliente (evodeck1.jpg, sco1.avif, xtend.webp…)
2. .case-card__overlay     →  position:absolute; inset:0; pointer-events:none
                              linear-gradient(180deg,
                                rgba(0,0,0,.28)  0%,
                                rgba(0,0,0,.38) 40%,
                                rgba(0,0,0,.60) 75%,
                                rgba(0,0,0,.72) 100%)
3. .case-card__content     →  position:relative; z-index:1; padding:0 6px 10px;
                              flex column; align-items:center; gap:14px
4. → logo (36px) + .case-card__stats (flex column, gap 12px, width 100%)
```

**Lo scrim a 4 stop è la tecnica chiave.** Non un overlay piatto: 28% in alto (la foto respira), 72% in basso (il testo è garantito leggibile). Il gradiente fa il lavoro che di solito si affida al photo-editing.

**Chip statistica** — `.case-card__stat-box`, 246 x 60px (2 per card):
```
background: rgba(0,0,0,0.25);
backdrop-filter: blur(2px);          /* vetro appena accennato */
border: 1px solid rgba(255,255,255,0.70);   /* hairline al 70% — molto acceso */
border-radius: 8px;
padding: 10px 12px; display:flex; align-items:center; gap:12px;
width: calc(100% - 16px); margin: 0 8px;
```
- `.case-card__stat-val` — **DM Sans 38px/500, line-height 1, `white-space:nowrap; flex-shrink:0`**
- `.case-card__stat-lbl` — **Nunito** 15px/600, lh 1.3, uppercase, ls 0.05em

**Rapporto numero:label = 2,5:1** (38px vs 15px) dentro un chip di 60px. Il numero occupa quasi tutta l'altezza; la label vive nello spazio residuo a destra. Questo è ciò che rende il chip leggibile a 274px di larghezza.

**Track**: `.doe-simple-slider__track` flex, **gap 18px**, `padding: 40px 0`, **14 card**. Hover card: `transition: transform .12s` (micro-lift immediato, quasi tattile).

### 2.4 Stat card con glow — il costrutto a 4 strati

Non è un `box-shadow`. È una **lente**:

```
.card (wrapper)     377 x 350 · radius 10px · overflow:hidden · position:relative
                    padding: 2px            ← i 2px sono la feritoia da cui esce il bagliore
                    background: rgba(26,9,9,.32) | rgba(9,10,26,.2) | rgba(90,150,255,.17)

  .blob             250 x 280 · position:absolute · top/bottom 35px · left/right 63,3px
                    border-radius: 50%
                    filter: blur(40px)      ← il glow
                    z-index: -1
                    background: #D12C2C  |  rgba(0,102,51,.25)  |  #4FA1FF

  .fakeblob         377 x 350 · absolute · trasparente · z-index:-1   (strato residuo, inerte)

  .inner            373 x 346 · position:relative · z-index:1
                    backdrop-filter: blur(80px)     ← il vetro che diffonde il blob
                    background: rgba(34,12,12,.52) | rgba(12,13,34,.8) | rgba(8,13,22,.78)
                    border: 2px solid rgba(0,153,76,.55)
                    border-radius: 10px
                    padding: 48px 32px · flex column · gap 16px
```

Blob sfocato dietro + vetro da 80px davanti: il colore filtra dai 2px di gap del wrapper e viene *diffuso*, non semplicemente sovrapposto. Tre colori diversi (rosso / verde / blu) su tre card identiche = differenziazione senza cambiare struttura.

**Gerarchia interna a 5 livelli** (gap 16px):

| Livello | Specifica |
|---|---|
| 1. Icona | `.sharp-card-icon` 58x58, radius **14px**, bg `rgba(0,102,51,.18)`, border 1px `rgba(0,153,76,.35)`, SVG 22–28px stroke bianco |
| 2. Badge trend | `.sharp-card-badge` pill 99px, `#4ADE80` su `rgba(74,222,128,.12)`, border 1px `rgba(74,222,128,.28)`, 14px/700, padding `5px 14px`, gap 5px, h 36px — testo "↑ growing every quarter" |
| 3. Numero | `.holder` DM Sans **44px/500**, lh 44px, **ls -1,98px**. Span separati: `.text-before` ($) · `.number` (50) · `.text-after` (M) |
| 4. Etichetta | `h6.title` 16px/600, ls **-0,32px**, uppercase, `rgba(255,255,255,.78)` |
| 5. Contesto | `p.sharp-card-context` **12px/600**, `rgba(255,255,255,.40)` — "Tracked across all active client campaigns" |

**Il numero è solo 44px.** La percezione di monumentalità viene dal quinto livello: la riga di contesto a 12px al 40% di bianco. Rapporto 44:12 = **3,7:1** dentro una card di 350px. È il contrasto interno, non la dimensione assoluta, a creare la scala. E lo `$`/`M` in span separati permette di trattare tipograficamente l'unità come subordinata alla cifra.

Gutter fra card: **30px**. `justify-content:center; flex: 0 0 28%; min-width:220px`.

**Reveal**: `opacity 0 → 1` + `translateY(28px) → 0`, `0.55s`, `cubic-bezier(.25,.46,.45,.94)`, classe `.doe-visible` da IntersectionObserver, `will-change: opacity, transform`.

### 2.5 "Bento" servizi — non è un bento

```
.sf-svc-sec  { background:#000; padding: 36px 24px 84px }
.sf-svc-grid { max-width:1200px; margin:0 auto; display:grid;
               grid-template-columns: repeat(4,1fr); gap:18px }
```
Computed reale: **4 colonne da 286,5px x 3 righe da 213,16px**, 12 celle identiche. **Zero varianza di span.** Chiamarlo bento è generoso — ed è proprio la sua forza: nessun costo di scansione, 12 voci lette in un passaggio.

**Card** — `.sf-svc-card`, 287 x 213px:
```
background: linear-gradient(160deg, rgba(255,255,255,0.055), rgba(255,255,255,0.02));
border: 1px solid rgba(255,255,255,0.08);
border-radius: 18px;
padding: 26px 24px;
display:flex; flex-direction:column;
transition: border-color .25s, background .25s, transform .25s;

:hover {
  border-color: rgba(0,153,76,0.42);
  background: linear-gradient(160deg, rgba(255,255,255,0.08), rgba(0,102,51,0.06));
  transform: translateY(-4px);
}
```
Il gradiente a 160° al **5,5% → 2%** di bianco è quasi invisibile: la card *esiste* come regione senza diventare oggetto. All'hover il gradiente si tinge di verde al 6% — l'accento entra solo su intenzione.

Contenuto:
- `.sf-svc-ic-wrap` 46x46, radius **12px**, bg `rgba(0,153,76,.12)`, border 1px `rgba(0,153,76,.28)`, **margin-bottom 18px**; icona 22x22 `color:#3ddc84`
- `h3` DM Sans **17px/700**, lh 1.3, ls **-0.01em**, `margin: 0 0 8px`
- `p` **14px/400**, lh **1.55**, `rgba(255,255,255,0.58)`, `margin:0`

**CTA di chiusura** — `.sf-svc-cta { text-align:center; margin-top:44px }`:
```
background:#006633; 15px/700; letter-spacing:.02em;
padding:16px 42px; border-radius:100px;
box-shadow: 0 8px 24px rgba(0,102,51,0.4);
:hover { background:#00813f; transform:translateY(-2px); box-shadow: 0 12px 30px rgba(0,102,51,0.55) }
```
L'ombra è **colorata dell'accento**, non nera — e cresce all'hover (24px→30px blur, .4→.55 alpha). Unico glow-verde della pagina fuori dalle stat card.

**Breakpoint**: `1024px → repeat(3,1fr)` · `768px → repeat(2,1fr)` · `480px → 1fr`. Quattro stati, gap sempre 18px.

### 2.6 Riga loghi marquee — `.sf-marquee` (il componente più curato)

```
.sf-featured { background:#f4f2ec; padding: 32px 0 34px; overflow:hidden }
.sf-featured__label { 12px/700; letter-spacing:0.18em; uppercase;
                      color:#9a968c; margin: 0 0 76px }      /* 76px di respiro! */

.sf-marquee {
  margin-top: 36px; overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
}
.sf-marquee__row {
  display:flex; align-items:center; width: max-content;
  animation: sf-logos-slide 46s linear infinite;
}
@keyframes sf-logos-slide { from { transform: translateX(0) } to { transform: translateX(-50%) } }

.sf-marquee__row img {
  height:30px; padding: 0 55px;
  filter: grayscale(100%); opacity:.85; mix-blend-mode: multiply;
  transition: opacity .2s, filter .2s;
}
.sf-marquee:hover .sf-marquee__row { animation-play-state: paused }
.sf-marquee__row img:hover { filter: grayscale(0); opacity: 1 }
@media (prefers-reduced-motion: reduce) { .sf-marquee__row { animation:none } .sf-marquee { overflow-x:auto } }
```

Quattro cose da rubare integralmente:
1. **`mask-image` con stop al 7% e 93%** — i loghi svaniscono ai bordi invece di essere tagliati. Costa una riga.
2. **`translateX(0) → -50%` con contenuto duplicato** (18 img = 9 uniche x2) — loop perfetto senza JS.
3. **Bilanciamento ottico per logo**, `@media(min-width:761px)`: Forbes 25px, Baltic Times 38px, Latvijas Radio 42px, Dienas Bizness 33px, Clutch 24px, Latka 30px, Mirror Review 23px, Clinton Courier 34px. **Otto override manuali** perché l'altezza uguale non dà peso ottico uguale. Questa è direzione artistica vera.
4. **Hover mette in pausa + dissatura al contrario**, e `prefers-reduced-motion` diventa scroll manuale. Accessibilità senza perdere la funzione.

Mobile `@760px`: img 19px, padding `0 38px`, durata **34s** (più veloce perché il tragitto è più corto — velocità percepita costante).

### 2.7 Eyebrow tra parentesi quadre

```
DM Sans · 16px · 700→600 · letter-spacing: +1,4px (0,0875em) · text-transform: uppercase
color: rgba(255,255,255,0.79) · margin-bottom: 20px  (15px nella sezione About)
Testo: "[ we are sharpify ]" — parentesi e spazi DIGITATI nel contenuto
```

Sette istanze: `[ we are sharpify ]` `[ tech partners ]` `[ our services ]` `[ partners ]` `[ case studies ]` `[ resources & insights ]` `[ about us ]`.

Nessuno pseudo-elemento, nessun bordo, nessun pill. Le parentesi sono **testo**. Costo: zero CSS. Resa: un marcatore di sezione che sembra un sistema di documentazione tecnica. La firma retorica è che l'eyebrow *nomina il capitolo* invece di descriverlo — legge come un indice, e implica che il documento sia strutturato.

**Distinguere dall'eyebrow-pill dell'hero**, che è un componente diverso:
```
P · DM Sans 15px/600 · ls +1,35px · uppercase · color: #66CC99
background: rgba(0,102,51,0.25) · border: 1px solid rgba(0,102,51,0.5)
border-radius: 99px · padding: 6px 18px · height 38px · width 245px
Testo: "FOR SERVICE PROVIDERS"
```
Il pill (una volta, nell'hero) qualifica il **pubblico**. Le parentesi quadre (sette volte) nominano la **sezione**. Due lavori, due forme.

### 2.8 Pill CTA — tre livelli

**Primario `.glow-btn`** (hero) — il pezzo più elaborato:
```
:root { --glow-core: rgba(255,255,255,.9);
        --glow-color: rgba(0,153,76,.25);
        --glow-color-strong: rgba(0,153,76,.55) }

.glow-btn {
  --x: 50%; --y: 50%;                     /* aggiornate da JS al movimento del cursore */
  display:inline-flex; align-items:center; gap:8px;
  padding: 16px 42px; border-radius: 130px; border:none;
  font: 600 18px Inter; color: #142629;
  background: radial-gradient(50% 50% at 50% 50%, #fff 0%, #eef3f1 100%);
  box-shadow: 0 0 16px 4px rgba(255,255,255,0.35);
  isolation: isolate;                     /* contiene il mix-blend-mode dei figli */
  transition: transform .25s ease;
}
.glow-btn::before {                        /* glow interno inseguitore */
  inset: -4px; opacity: 0; z-index: 1; mix-blend-mode: screen;
  background: radial-gradient(85px 85px at var(--x) var(--y),
                var(--glow-core) 0%, rgba(255,255,255,.3) 45%, transparent 70%),
              radial-gradient(120px 120px at var(--x) var(--y),
                var(--glow-color-strong) 0%, transparent 75%);
}
.glow-btn::after {                         /* bloom esterno */
  inset: -12px; opacity: 0; z-index: 0; filter: blur(22px);
  background: radial-gradient(200px 200px at var(--x) var(--y),
                var(--glow-color) 0%, transparent 80%);
}
.glow-btn:hover::before, .glow-btn:hover::after { opacity: 1 }   /* transition .25s */
.glow-btn:hover { transform: translateY(-2px) }
.glow-btn:focus-visible { outline: 3px solid #CEDC00; outline-offset: 3px }
```
Dimensioni rese: **197 x 56px**. Wrapper `.sf-hero-cta { text-align:center; margin: 34px 0 0; z-index:3 }` (26px su mobile). L'`isolation:isolate` è necessario perché `mix-blend-mode:screen` non sfondi sul fondo della pagina — dettaglio che quasi tutti sbagliano.

**Secondario verde pieno** (`.sf-cta` nav, `.sf-svc-cta-btn`): bg `#006633` → `#00813f`, radius 99–100px.

**Terziario outline** (About "All Services"): `border: 1px solid rgba(255,255,255,0.22)`, bg trasparente, radius 99px, padding `17px 36px`, **17px/700**.

**Regola**: ogni CTA della pagina è un pill (99 / 100 / 130px). Nessuna eccezione. Il raggio pill è il segnale universale di "cliccabile".

### 2.9 Footer a 5 colonne (non 4)

```
#sharpify-footer { background: #0d0c10; padding: 72px 40px 0; font-family:'DM Sans' }
.sf-inner { max-width: 1260px; margin: 0 auto }
.sf-top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.05fr 1fr;   /* brand + COMPANY/SERVICES/BLOG/CONTACT */
  gap: 36px;
  padding-bottom: 60px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
```

| Elemento | Specifica |
|---|---|
| `.sf-col-title` | 12px/700, ls **0.1em**, uppercase, `rgba(255,255,255,0.3)`, `margin: 0 0 18px` |
| `.sf-links` | flex column, **gap 10px**; `a` 14px `rgba(255,255,255,0.6)` → `#fff` (`transition: color .2s`) |
| `a.sf-rate` | **`#CEDC00`** /700 — l'unico link colorato del footer, la richiesta di recensione |
| `.sf-social-link` | **36x36**, radius **8px**, border 1px `rgba(255,255,255,0.35)`, flex center. Hover: border `#006633`, bg `rgba(0,102,51,0.2)`. Gap 14px |
| `.sf-brand-tagline` | 14px, `rgba(255,255,255,0.45)`, lh 1.65, `max-width: 280px`, `margin: 16px auto 28px`, **centrato** |
| `.sf-contact-item` | flex `align-items:flex-start`, gap 10px, 14px `rgba(255,255,255,0.6)`, mb 10px; SVG 15x15 `fill:currentColor`, `opacity:.5`, `margin-top:2px` (allineamento ottico all'x-height) |
| `.sf-bottom` | flex `space-between`, padding `24px 0`; copyright 13px al **30%**; `.sf-legal` gap 24px, 13px al 30% → 60% |

**Tre livelli di grigio come gerarchia pura**: titolo colonna 30% → link 60% → hover 100%. Zero colore, zero bordi, zero card. Una densità di navigazione notevole in 483px.

Breakpoint: `900px → 1fr 1fr` con brand a `grid-column: 1/-1` e tagline riallineata a sinistra, padding `48px 24px 0`, bottom in colonna; `480px → 1fr`, gap 28px.

---

## 3. GRIGLIA E SISTEMA DI SPAZIATURA

### Quattro container, che si restringono al crescere della densità

| Larghezza | Padding laterale | Uso |
|---|---|---|
| **1440px** | 40px (nav) / 60px (`.e-con` Elementor) | Nav inner, contenitori di sezione. Contenuto utile a 1440vp: **1320–1360px** |
| **1260px** | 96px (statement) | Statement di posizionamento, `.sf-inner` del footer |
| **1200px** | 24px | Griglia servizi (`.sf-svc-grid`), corpo resources (`.sr-body`) |
| **1120px** | — | Pannelli e titoli resources (`.sr-panel`, `.sr-section-title`) |

Progressione **1440 → 1260 → 1200 → 1120**: il display parla a tutta larghezza, le card si stringono, il contenuto editoriale si stringe di più. La misura di lettura è governata dal tipo di contenuto, non da un container unico. Il testo About è ulteriormente limitato a `max-width: 720px`.

### Gutter, per componente

| Gutter | Componente |
|---|---|
| **8px** | Badge tech partner |
| **10px** | Tile logo partner (`flex: 0 0 calc((100% - 50px)/6)` → 6 per riga) |
| **12px** | Chip statistica dentro la card risultato |
| **14px** | Contenuto card risultato (logo↔stat); gruppo bottoni nav |
| **18px** | **Griglia servizi + track card risultato** (il gutter dominante) |
| **24px** | Pannelli resources |
| **30px** | Stat card |
| **32px** | Griglia eventi resources |
| **36px** | Colonne footer |
| **40px** | Flex testa Digital Dominance |

### Scala verticale (padding, non margini)

```
2 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 24 · 26 · 30 · 32 · 34 · 36 · 40 · 44 · 46 · 48 · 56 · 60 · 64 · 72 · 76 · 80 · 84 · 96 · 128 · 160
```

Valori strutturali:
- **160px** — padding-top hero (copre 44+85=129px di chrome fisso, +31px di aria)
- **128px** — padding-bottom statement (il respiro più grande della pagina)
- **96px** — padding laterale statement
- **84px** — padding-bottom griglia servizi
- **80px** — padding-top testa resources
- **76px** — margin-bottom label "AS FEATURED IN"
- **72px** — padding-top footer; `margin-top` titolo sezione eventi
- **64px / 56px** — margin-bottom tab resources / banner canale
- **48px / 32px** — padding interno stat card
- **44px** — margin-top CTA servizi
- **36px** — padding-top griglia servizi; margin-top marquee
- **26px / 24px** — padding card servizi

**Verdetto onesto**: non è un sistema di token. È una scala a base 2 con forte preferenza per i multipli di 4, ma con valori dispari accordati a mano (26, 34, 46, 76, 286,5). Funziona perché è *stato guardato*, non perché sia derivato. Da reinterpretare come scala vera: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.

### Scala dei raggi (censimento su 1934 nodi)

| Raggio | Nodi | Significato assegnato |
|---|---|---|
| 2px | 74 | Residui tema Elementor (rumore, non intenzione) |
| **8px** | 40 | Chip inline, link nav hover, icona social |
| **10px** | 16 | Stat card, icona card resources |
| **12px** | 68 | Tile logo, icon-wrap servizi, slot "your logo" |
| **14px** | 4 | Icona stat card, card piccola resources |
| **18px** | 14 | **Card servizi, card featured resources, banner** |
| **20px** | 15 | **Card risultato fotografiche** |
| 50% | 11 | Dot, blob |
| **99 / 100 / 130px** | 13+ | Tutti i pill CTA |

Regola implicita coerente: **più l'oggetto è grande, più il raggio cresce** (chip 8 → card 10-14 → card grande 18 → card foto 20 → pill ∞).

### Scala tipografica reale

| Ruolo | Font | Dimensione | Peso | Tracking | Line-height | Colore |
|---|---|---|---|---|---|---|
| **H1 hero** | DM Sans | **112px** | 500 | **-4px** (-0,036em) | 1,08 (120,96px) | `#F8F8F8` |
| **Display servizi** | DM Sans | **96px** | 600 | -3px | 1,2 (115,2px) | `#FFF` uppercase |
| **Contrappunto serif** | **Editorial Old** | **96px** | **100** | -3px | 1,2 | `#FFF` |
| H2 sezione | DM Sans | **64px** | 500 | **-3px** | 1,2 (76,8px) | `#FFF` |
| H2 statement | DM Sans | **56px** | 700 | **-2,24px** (-0,04em) | 1,2 (67,2px) | `rgba(255,255,255,.12)` → `#FFF` |
| H2 About | DM Sans | 45,76px | 700 | -1,83px | 1,0 | `#FFF` |
| Numero stat card | DM Sans | **44px** | 500 | **-1,98px** | 1,0 | `#FFF` |
| Numero card risultato | DM Sans | **38px** | 500 | 0 | 1,0 | `#FFF` |
| Deck / sottotitolo | **Instrument Sans** | **28px** | 500 | 0 | 1,21 (34px) | `rgb(213,213,213)` |
| Titolo evento | DM Sans | 28px | 700 | -0,98px | 1,22 | `#FFF` |
| Corpo About | **Instrument Sans** | 20px | 400 | -0,8px | **1,6** (32px) | `rgba(255,255,255,.55)`, max-w 720px |
| Titolo resources | DM Sans | 22px | 700 | **+0,22px** | 1,2 | `#FFF` |
| Bottone outline | DM Sans | 17px | 700 | 0 | — | `#FFF` |
| **h3 card servizi** | DM Sans | **17px** | 700 | -0,17px | 1,3 (22,1px) | `#FFF` |
| Eyebrow `[ ]` | DM Sans | 16px | 600 | **+1,4px** | 1,4 | `rgba(255,255,255,.79)` |
| h6 label stat | DM Sans | 16px | 600 | **-0,32px** | 1,4 | `rgba(255,255,255,.78)` |
| Nav / body | DM Sans | 16px | 500/400 | 0 | 1,5 (24px) | `rgba(255,255,255,.86)` |
| Eyebrow pill hero | DM Sans | 15px | 600 | **+1,35px** | 1,6 | `#66CC99` |
| Label chip risultato | **Nunito** | 15px | 600 | **+0,05em** | 1,3 | `#FFF` |
| **p card servizi** | DM Sans | **14px** | 400 | 0 | **1,55** (21,7px) | `rgba(255,255,255,.58)` |
| Link footer | DM Sans | 14px | 400 | 0 | 1,5 | `rgba(255,255,255,.6)` |
| Contesto stat card | DM Sans | **12px** | 600 | 0 | — | `rgba(255,255,255,.40)` |
| Titolo colonna footer | DM Sans | 12px | 700 | **+0,1em** | — | `rgba(255,255,255,.3)` |
| Label "AS FEATURED IN" | DM Sans | 12px | 700 | **+0,18em** | — | `#9A968C` |
| Tag resources | DM Sans | **10px** | 700 | **+0,07em** | — | `#FF6B6B` / `#4ADE80` |

**La legge tipografica del sito**: *tracking negativo sul display, positivo sulle micro-label*.
- ≥44px → da **-1,98 a -4px** (fino a -0,04em)
- 16–28px → da **-0,98 a -0,17px**, quasi neutro
- ≤16px in maiuscolo → da **+0,05 a +0,18em**

Il rapporto display:body è **112:14 = 8:1**. È questa ampiezza a permettere che il 12px resti davvero 12px.

**Censimento font** (nodi): DM Sans **1865** · Nunito 30 · Instrument Sans 17 · Arial 15 · Editorial Old 2 · Inter 1. Il sistema *vuole* essere DM Sans + Editorial Old (contrappunto) + Instrument Sans (deck). Nunito (label chip) e Inter (bottone hero) sono residui: un font ciascuno per un componente.

### Colore: opacità come sistema, non palette

**Fondi**: `#000000` (dominante) · `#020202` (hero) · `#0D0C10` (footer) · `#111111` (card resources) · `#F4F2EC` (unica fascia crema) · `#FFFFFF` (25 tile logo)

**Scala bianco — 23 alpha distinti fanno tutto il lavoro di gerarchia**:
```
1.00  titoli, numeri
0.86  link nav
0.79  eyebrow [ ]
0.78  h6 label stat
0.70  hairline chip su foto
0.60  link footer
0.58  corpo card servizi
0.55  corpo About
0.45  tagline footer
0.40  contesto stat card
0.35  tab inattiva
0.30  titolo colonna footer, copyright
0.22  bordo bottone outline
0.12  parole non ancora rivelate
0.08  bordo card servizi, bordo nav scrolled
0.07  bordo card resources
0.055 fondo card servizi (stop 1)
0.02  fondo card servizi (stop 2)
```

**Scala verde** (accento primario): `#00352B` → `#003D1F` → **`#006633`** (primario) → `#00813F` (hover) → `#00994C` (glow, bordi) → `#3DDC84` (icone, 45 nodi) → `#4ADE80` (badge) → `#66CC99` (testo chiaro, il "+")

**Secondo accento**: **`#CEDC00`** lime acido — solo tre punti in tutta la pagina: la data nella barra annuncio, il suo bottone, il link "Rate us" nel footer, più l'outline di `focus-visible`. Quattro usi, mai decorativo.

**Allarme**: `#FF5252` (dot pulsante), `#FF6B6B` su `rgba(255,77,77,.16)` (tag YouTube)
**Hue di glow** (solo stat card): `#D12C2C` · `rgba(0,102,51,.25)` · `#4FA1FF`

`#006633` appare come background su **9 nodi** su 1934. È un token di wayfinding, non un colore di brand spalmato.

---

## 4. COME SHARPIFY GESTISCE LA DENSITÀ

Dieci meccanismi misurabili. Sono la risposta al "perché non sembra affollato".

**1. Un solo fondo, nessuna cucitura.** ~92% degli 8242px è `#000`/`#020202`. Senza cambi di fondo non ci sono confini di sezione, e senza confini il cervello non conta i moduli: legge un documento. Le 14 fasce diventano un flusso.

**2. Il contrasto è portato dall'opacità, non dalla tinta.** 23 alpha di bianco. Una card a `rgba(255,255,255,.055)` di fondo con bordo `rgba(255,255,255,.08)` è ~5% più chiara della pagina: **registra come regione senza diventare oggetto**. Puoi metterne 12 in 895px perché nessuna reclama attenzione.

**3. Contenimento hairline al minimo.** I bordi sono 1px al 7–8% di bianco. È la Legge della Regione Comune applicata alla soglia minima percepibile: il raggruppamento avviene, il peso visivo no.

**4. Il tipo urla, il colore tace.** Display 112/96/64px con tracking da -3 a -4px. Range 8:1 verso il corpo. Il grido è tipografico e monocromatico, quindi non consuma il budget di colore — che resta interamente disponibile per i 3 glow delle stat card e i 4 tocchi di lime.

**5. Una formula di testa-sezione, sette ripetizioni.** `[ NOME ]` 16px/600 +1,4px caps al 79% → gap 20px → H2 64px/500 a -3px → deck opzionale 28px Instrument Sans. Il lettore la impara al primo colpo e non deve più decodificare. **La prevedibilità è ciò che si compra la densità.**

**6. Vuoto deliberato dove conta.** La testa servizi occupa 942px di una riga da 1345px: **404px lasciati vuoti** a destra. Lo statement è 1260px max con 96px di padding laterale e **128px di padding inferiore** per due righe di testo. Il respiro non è distribuito: è concentrato nei punti di transizione.

**7. Ogni numero è recintato.** Nessuna cifra vive libera nel flusso. Sempre in un chip (`stat-box`, radius 8px, bordo 70% bianco) o in una card (radius 10px). 14 card risultato x 2 chip = **28 numeri in 493px** senza collisione, perché ogni numero ha un recinto.

**8. Griglia uniforme, non bento.** 4x3 celle identiche da 286,5x213,2px. La varianza di span costa attenzione; qui è zero. Dodici servizi si scansionano come una lista.

**9. I marquee comprano tempo, non spazio.** Due caroselli (14 card risultato + 18 loghi stampa) presentano ~32 elementi di prova in **661px totali** facendoli passare attraverso una finestra fissa. Il tempo sostituisce l'altezza di pagina.

**10. La rottura di valore è razionata.** Una sola fascia chiara in tutta la pagina: 168px su 8242 = **2,0%**. Arrivando dopo 7204px di nero, quei 168px crema colpiscono come un flash. È l'economia del contrasto: spendere poco per ottenere molto.

### Il motion, misurato

**Un solo ScrollTrigger su tutta la pagina.**
```js
ScrollTrigger: { start: "top 80%", end: "+=80%", scrub: 0.5, toggleActions: "play" }
// corsa reale: 415px → 1135px = 720px di scroll
```
Colora **53 span `.word`** (ciascuno ulteriormente splittato in `.char`, entrambi `display:inline-block`) da `rgba(255,255,255,.12)` a `#FFF`, `transition: color .3s`, stagger 0,1. Il conteggio conferma: 53 nodi a 56px e 53 nodi a `rgba(255,255,255,0.12)` nel censimento.

Tutto il resto è CSS:
| Meccanismo | Specifica |
|---|---|
| `fadeInUp` | `translate3d(0,30px,0) → none`, **0,7s**, `cubic-bezier(.25,.46,.45,.94)`, `animation-fill-mode: both`, `backface-visibility: hidden` |
| Reveal `.doe-visible` | IntersectionObserver: `opacity 0→1` + `translateY(28px)→0`, **0,45s** (tile partner) / **0,55s** (stat card), stesso easing, `will-change` |
| `sf-logos-slide` | 46s linear infinite (34s mobile), pausa su hover, disattivata da `prefers-reduced-motion` |
| `sf-ann-pulse` | 1,6s infinite, solo `box-shadow` spread 0→7px |
| `.glow-btn` | glow inseguitore via `--x`/`--y`, opacity .25s, `translateY(-2px)` |
| Hover card | servizi `translateY(-4px)` .25s · resources featured `-5px` .22s · resources card `-3px` .22s · card risultato `transform .12s` |

**Sette meccanismi, un solo effetto scrubbato.** E `elementor-invisible` è ridefinito da `visibility:hidden` a `opacity:0 !important` per evitare il flash alla rimozione della classe. Disciplina reale.

---

## 5. I 5 PATTERN PIÙ RIUTILIZZABILI

**1. Stat card a lente: blob sfocato + pannello frosted.**
Wrapper `overflow:hidden` con `padding:2px` → `.blob` `border-radius:50%` in colore pieno con `filter:blur(40px)`, `z-index:-1` → `.inner` con `backdrop-filter:blur(80px)` + `border:2px solid rgba(accento,.55)`. Il bagliore esce dai 2px di feritoia e viene diffuso dal vetro. Tre hue diverse su tre card strutturalmente identiche = differenziazione a costo zero. Riutilizzabile per qualsiasi trittico di numeri.

**2. Card fotografica con scrim a 4 stop e chip di vetro.**
`aspect-ratio:3/4`, radius 20px, `background-size:cover`; overlay `linear-gradient(180deg, rgba(0,0,0,.28) 0%, .38 40%, .60 75%, .72 100%)`; chip `rgba(0,0,0,.25)` + `backdrop-filter:blur(2px)` + hairline `rgba(255,255,255,.70)` radius 8px; numero 38px/500 `nowrap flex-shrink:0` accanto a label 15px/600 caps. Rapporto 2,5:1. Trasforma una foto cliente qualunque in prova quantificata leggibile a 274px.

**3. Formula di testa-sezione con eyebrow letterale.**
`[ NOME SEZIONE ]` come **testo**, 16px/600, ls +1,4px, caps, 79% bianco, mb 20px → H2 64px/500 a ls -3px, lh 1,2 → deck opzionale 28px in un secondo sans. Zero CSS strutturale, effetto "documento tecnico strutturato". Ripetuta 7 volte diventa sintassi.

**4. Sistema monocromatico a scala di opacità.**
Un fondo + ~10 alpha di bianco per la gerarchia + un accento speso su <10 nodi + un secondo accento su 4 punti. Sostituisce integralmente una palette: nessun colore da armonizzare, contrasto sempre prevedibile, densità infinita senza chiasso.

**5. Marquee loghi rifinito.**
`mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)` + contenuto duplicato con `translateX(0)→-50%` + **override di altezza per singolo logo** (23–42px) per pareggiare il peso ottico + `animation-play-state:paused` su hover + `prefers-reduced-motion` → `overflow-x:auto`. Quattro dettagli, tutti a basso costo, che separano un marquee curato da uno generico.

*Bonus, quasi gratis*: la **normalizzazione forzata dei bottoni** in nav (`height:40px; border-radius:99px; font-size:14px; font-weight:700; line-height:1; padding-top/bottom:0` su tre componenti di origine diversa). È il singolo intervento che fa sembrare la nav disegnata invece che assemblata.

## I 3 PATTERN PIÙ DEBOLI — DA NON COPIARE

**1. Il bagliore da 2012 sulle label e gli hack di blend sui loghi.**
```css
.case-card__stat-lbl { text-shadow: 0 0 8px rgba(255,255,255,.9), 0 0 2px rgba(255,255,255,1) }
.case-card__logo-img { filter: invert(1); mix-blend-mode: screen }
```
Il `text-shadow` doppio impasta caps da 15px sopra fotografia: il testo perde definizione invece di guadagnarne, e il chip ha già `backdrop-filter` + bordo al 70% che risolvono la leggibilità. `invert(1)` + `screen` è un espediente per sbiancare loghi cliente: funziona solo su loghi monocromatici scuri e distrugge qualsiasi logo a colori o già chiaro. Sui 25 tile partner la stessa logica al contrario (`mix-blend-mode:multiply` su tile **bianche**) fa scomparire ogni logo scuro. La soluzione corretta sono asset SVG monocromatici forniti a monte, non filtri.

**2. Il video full-bleed da 800px senza funzione.**
9,7% della pagina (secondo blocco più grande dopo resources), `width:1471px` full-bleed, tirato su di `-86,4px` con `margin-top: clamp(-96px,-6vw,-24px)` a sovrapporsi allo statement. Nessun poster progettato, nessuna didascalia, nessun numero, nessuna CTA, nessuna gerarchia interna. In una pagina in cui ogni altro pixel porta un dato, 800px di autoplay non argomentato sono il blocco a più bassa informazione della pagina — e arriva subito dopo il momento retoricamente più forte (il reveal parola-per-parola), sprecandone la spinta.

**3. Il debito strutturale: override a hash, contenuto fantasma, cinque font.**
- ~**14KB di CSS `!important`** agganciato a hash `data-id` di Elementor (`[data-id="c0b7d13"], [data-id="f0be82b"], …` in liste da 30 selettori). Ogni ri-salvataggio in Elementor può rigenerare gli hash e spaccare il layout.
- Sezione **`[ case studies ]` presente nel DOM ad altezza 0** (con il contenuto AliExpress / Akira / Triller e un contatore "0 B" mai visibile) + una **riga tech-partner duplicata in `display:none`** + `.fakeblob` completamente inerte. Contenuto fantasma che pesa nel DOM e nel SEO senza rendere nulla.
- **Cinque font**: DM Sans (1865 nodi), Nunito (30), Instrument Sans (17), Editorial Old (2), Inter (1). Nunito serve *solo* la label del chip risultato; Inter serve *solo* il bottone hero. Due webfont per due componenti: accidente sedimentato, non contrappunto. Il contrappunto vero — Editorial Old weight 100 a 96px — è ottimo e va tenuto; gli altri due vanno assorbiti in DM Sans.

*Menzione*: il **muro di 25 tile bianche 228x120px** nella sezione Partners. Concettualmente è "prova di volume", ma buca la disciplina scura con 939px (11,4% della pagina) di superficie bianca frammentata, e legge come una parete "as seen on" del 2016. La versione forte è tile scure con hairline all'8% e loghi monocromatici al 60% di bianco che vanno al 100% in hover — la stessa prova, dentro il sistema invece che contro.

---

## Nota di trasferibilità

Il paradosso utile: Sharpify è costruito sullo **stesso stack** del sito da ristilizzare (WordPress + Elementor + GSAP 3.12.5 + ScrollTrigger), e ottiene un risultato incomparabilmente più alto **non** con tecnologia migliore, ma con quattro decisioni:

1. **Un fondo unico** invece di gradienti di sezione
2. **L'opacità come sistema di gerarchia** invece di una palette
3. **Una sola formula di testa-sezione** ripetuta invece di sezioni tutte diverse
4. **Un solo effetto scrubbato** invece di animazioni sparse

Tutte e quattro sono decisioni di direzione artistica, non di implementazione. E tutte e quattro sono direttamente applicabili sostituendo il verde `#006633` con l'arancio `#FF8200` — che, essendo più caldo e più saturo, richiederà alpha più bassi negli accenti (indicativamente `.08–.12` invece di `.12–.18` sui fondi delle icon-wrap) per non sfondare sul nero.
