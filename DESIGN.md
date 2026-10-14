---
name: Sales Process Italia
description: Un palco scuro continuo su cui si muove una sola luce arancione; il quadrato del marchio porta la storia dai contatti al fatturato.
colors:
  arancio: "#FF8200"
  arancio-caldo: "#FF9A38"
  arancio-pressato: "#E87300"
  arancio-brace: "#B85B00"
  su-arancio: "#100F12"
  fondo-base: "#161519"
  nero-palco: "#020202"
  testo-1: "#F8F8F8"
  testo-2: "#FFFFFFCC"
  testo-3: "#FFFFFF8F"
  testo-4: "#FFFFFF66"
  superficie-1: "#FFFFFF0A"
  superficie-2: "#FFFFFF0F"
  superficie-3: "#FFFFFF17"
  velo-nav: "#121115D1"
  filo: "#FFFFFF1F"
  filo-forte: "#FFFFFF33"
  bordo-ui: "#FFFFFF57"
  bordo-arancio: "#FF82006B"
  rottura: "#CC3366"
  ok: "#4ADE80"
typography:
  display:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(40px, 8.2vw, 128px)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.042em"
  muro:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(50px, 15.4vw, 200px)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  numero:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(52px, 6.4vw, 92px)"
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: "-0.04em"
    fontFeature: "tnum"
  headline:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(30px, 4.4vw, 56px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.036em"
  headline-sm:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(26px, 3.2vw, 44px)"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "-0.036em"
  title:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(21px, 2.1vw, 27px)"
    fontWeight: 500
    lineHeight: 1.22
    letterSpacing: "-0.02em"
  title-card:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1.32
    letterSpacing: "-0.01em"
  deck:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(16px, 1.25vw, 19px)"
    fontWeight: 400
    lineHeight: 1.58
    letterSpacing: "-0.008em"
  body:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "-0.008em"
  body-sm:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.54
    letterSpacing: "0.01em"
  label:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.005em"
  meta:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0"
    fontFeature: "tnum"
rounded:
  hard: "2px"
  r8: "8px"
  card: "12px"
  panel: "20px"
  pill: "999px"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  s-9: "96px"
  s-10: "128px"
  s-11: "168px"
  sezione: "clamp(60px, 4.2vw + 45px, 112px)"
  sezione-fitta: "clamp(48px, 3vw + 37px, 80px)"
components:
  button-arancio:
    backgroundColor: "{colors.arancio}"
    textColor: "{colors.su-arancio}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "50px"
  button-arancio-hover:
    backgroundColor: "{colors.arancio-pressato}"
    textColor: "{colors.su-arancio}"
  button-bianco:
    backgroundColor: "{colors.testo-1}"
    textColor: "{colors.su-arancio}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "50px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.testo-1}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "50px"
  button-sm:
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.testo-2}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "38px"
  chip-attivo:
    backgroundColor: "#FF82001A"
    textColor: "{colors.arancio}"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.superficie-1}"
    rounded: "{rounded.card}"
  card-hover:
    backgroundColor: "{colors.superficie-2}"
  pannello:
    backgroundColor: "{colors.superficie-1}"
    rounded: "{rounded.panel}"
    padding: "32px"
  campo:
    backgroundColor: "{colors.superficie-1}"
    textColor: "{colors.testo-1}"
    rounded: "{rounded.r8}"
    padding: "0 16px"
    height: "52px"
  nav-voce:
    textColor: "{colors.testo-2}"
    rounded: "{rounded.r8}"
    padding: "10px 14px"
  nav-voce-attiva:
    textColor: "{colors.testo-1}"
  particella:
    backgroundColor: "{colors.arancio}"
    rounded: "{rounded.hard}"
    size: "12px"
---

# Design System: Sales Process Italia

## 1. Overview

**Creative North Star: "Dal buio dei contatti alla luce del fatturato"**

Il sito è un palco scuro unico. Non c'è una pila di fasce con il loro fondo: c'è una stanza fissa (`.palco`, a z-index −1) dietro tutta la pagina, e le sezioni, trasparenti, dichiarano quale luce vogliono. Camminando nella pagina cambia l'illuminazione della stanza, non la stanza. Sopra quel buio si muove una sola luce, l'arancio del marchio, che non è mai vernice: è alone, bordo acceso, numero, cursore. Il quadrato del mark (la "particella", 12px, raggio 2px) è il modulo di tutto: elenca, conta, nomina, scopre, e alla fine si monta nella scalinata del logo.

La pelle è vincolata dal cliente e allineata al riferimento sharpify.io: near-black freddo, gerarchia fatta con l'opacità del bianco e non con una palette, DM Sans al display a peso 500, raggi 2/8/12/999px. Il DNA che resta di Sales Process: l'arancio `#FF8200`, il mark a moduli, il payoff FATTURARE ×3, le fotografie con le mani nere e l'oggetto arancione, la voce italiana diretta. Densità media-bassa, respiro di sezione fluido (60px a 360px, 112px di tetto), contenitori da 1080 a 1400px.

Il sistema rifiuta la pila di blocchi con la stessa dissolvenza su ogni sezione, le card tutte uguali, il "kicker" maiuscolo spaziato sopra ogni titolo, il quadratino tinto d'accento sotto le icone, il badge-pill sopra l'H1, il magnetic hover e il tilt 3D da cartolina, il bianco su arancio.

Il movimento è texture, non collezione di effetti: tre gesti, ciascuno con il suo asse, una sola curva d'ingresso (`cubic-bezier(.16,.84,.24,1)`, `--ease-salita`). **Il gradino** (materia): foto e pannelli vengono scoperti da quattro colonne sfalsate che salgono (`.scalinata`, anche nella View Transition fra pagine, a quattro gradini). **La riga** (testo): le parole salgono in verticale dentro una maschera, split fatto al build; il testo non entra mai in diagonale. **La luce** (interazione): una luce radiale segue il cursore su CTA, card e palco; la superficie resta ferma. Le griglie entrano con una citazione della diagonale (`--dx` = −0,45 × `--travel`), solo movimento senza dissolvenza; scrub e loop sempre lineari. Il 3D (three.js) vive solo nell'hero della home, desktop con puntatore fine, senza reduced-motion, scaricato dopo il load e fermo fuori viewport.

**Key Characteristics:**
- Un fondo continuo con sette atmosfere in dissolvenza incrociata (1100ms), accese da un IntersectionObserver sulla fascia centrale del viewport.
- Un solo accento, `#FF8200`, usato come luce; testo scuro `#100F12` su ogni fill arancione.
- Una sola famiglia, DM Sans variabile ospitata in casa; nessun serif, nessun monospace.
- La particella del marchio come modulo di elenchi, grafici a unità, chiuse e bottoni.
- Tre gesti di motion, una curva d'ingresso, reduced-motion gestito a token (il travel va a zero, la dissolvenza sopravvive).
- Bersagli touch ≥ 44px (`--tap`) su ogni puntatore grossolano; nessun testo sotto 12px.

## 2. Colors: La luce sul palco

Un palco neutro e freddo, quasi nero, e una famiglia calda di arancio che fa da luce; il resto è bianco a opacità diverse.

### Primary
- **Arancio Sales Process** (`arancio`): il brand. Fill dei CTA di conversione, particella, mark, numeri e unità, barra di avanzamento, filo della nav corrente, contorno di focus (`outline: 2px` con offset 3px), selezione di testo, cursore dei campi. È satura al massimo e non ha headroom: non esiste un arancio più brillante.
- **Arancio Caldo** (`arancio-caldo`): l'arancio dei testi piccoli e dell'hover dei link (9,3:1 sul fondo); scende anche sugli accenti nell'atmosfera fredda "notte". Già desaturato: mai come fill.
- **Arancio Pressato** (`arancio-pressato`): hover e active dei fill arancioni. L'interazione scurisce il fill invece di schiarirlo.
- **Brace** (`arancio-brace`): la massa degli aloni e delle atmosfere calde (scritta come `rgba(184,91,0,…)` nei gradienti del palco e del muro).
- **Inchiostro su Arancio** (`su-arancio`): l'unico colore di testo ammesso su un fill arancione, e anche il testo del CTA bianco.

### Tertiary
- **Rosso Perdita** (`rottura`): solo il colore della perdita: il contro-esempio, i varchi dove il contatto cade, lo zero, la squalifica del form (fondo al 10%, bordo al 28%), i punti `lista--no` a triangolo.
- **Verde Numero Verde** (`ok`): le liste di ciò che rientra (`lista--ok`) e il blocco del numero verde, per convenzione italiana.

### Neutral
- **Base Fredda** (`fondo-base`): il fondo del 90% della pagina e del palco; bianco sopra = 17,9:1.
- **Nero Palco** (`nero-palco`): l'atmosfera "nero" (hero, aperture interne, footer), su cui l'oggetto arancione si legge come luce.
- **Bianco Riferimento** (`testo-1`): titoli e testo primario. **Testo 2** (80%) corpo e deck; **Testo 3** (56%) meta, didascalie, fonti, voci di footer; **Testo 4** (40%) solo testo ≥ 24px o glifi decorativi.
- **Superfici 1/2/3** (bianco al 4/6/9%): card, form, campi. Mai grigi opachi: ogni superficie resta trasparente alla luce che le passa dietro.
- **Velo Nav** (`velo-nav`): nav fissata e piastra CTA mobile, con `backdrop-filter: saturate(140%) blur(18px)`; pieno `#121115` con reduced-transparency.
- **Filo / Filo Forte** (bianco al 12% / 20%): filetti e divisori, decorativi. **Bordo UI** (34%, 3:1): il contorno di tutto ciò che è cliccabile (outline CTA, chip, campi, burger, social). **Bordo Arancio** (arancio al 42%): stato acceso di chip, pill del tetto, reparti della macchina.

Le sette atmosfere del palco (in `sfondi.css`, non token): **nero** `#020202`; **brace** veletta calda dall'alto a sinistra su `#1D1714→#161519`; **alba** luce dal bordo basso su `#141317`; **radente** luce rasa da sinistra su `#161519`; **notte** l'unica fredda, acciaio `rgba(44,58,84)` su `#111318`; **pozzo** `#060607` con una luce d'angolo; **fuoco** rosso perdita + arancio su `#2A1510→#161519`, sotto il contro-esempio. Una vignettatura comune (`rgba(0,0,0,.42)` ai bordi) le fa leggere come una stanza.

### Named Rules
**The Light Rule.** L'arancio è luce, non vernice: sotto il 3% dei pixel. Nei titoli compare in una sola parola dell'H1 di ogni pagina e nel payoff del tetto; ogni `h2 .ar` torna al colore del titolo (`h2 .ar { color: inherit }`), anche nei titoli futuri.

**The Dark-on-Fill Rule.** Testo bianco su arancio è vietato (2,49:1). Su ogni fill arancione, barra annuncio compresa, il testo è `#100F12`. L'hover dei fill scurisce a `#E87300` e allarga il glow; non schiarisce mai.

**The Opacity Ladder Rule.** La gerarchia si fa con l'opacità del bianco (100/80/56/40%) e delle superfici (4/6/9%), non con nuovi grigi o nuove tinte. Un grigio opaco su una card è un errore.

**The One Cold Room Rule.** La famiglia delle atmosfere è calda; esiste una sola zona fredda, "notte", ed è acciaio spento, non blu. Tutto resta scuro→scuro: il testo non cambia regole di leggibilità fra atmosfere.

## 3. Typography

**Display Font:** DM Sans (con Segoe UI, system-ui, sans-serif), file variabile woff2 ospitato in casa, assi wght 100–1000, sottoinsieme latino, `font-display: swap`
**Body Font:** DM Sans (stessa pila)
**Label/Mono Font:** nessuno. Le cifre si allineano con `font-variant-numeric: tabular-nums` su DM Sans.

**Character:** Una sola famiglia, tenuta da corpo, peso e tono invece che dal cambio di carattere. Il display a 500 è ciò che rende il registro elegante e non urlato; il 700 è riservato ai colpi.

### Hierarchy
- **Display** (700, `clamp(40px, 8.2vw, 128px)`, 0,98, −0,042em): l'H1 di ogni pagina, centrato, `text-wrap: balance`. Nella home il colpo dell'hero sale a `clamp(42px, 8.4vw, 132px)`, interlinea 0,96, preceduto da un attacco a 500 in Testo 2.
- **Muro** (700, `clamp(50px, 15.4vw, 200px)`, 0,9, −0,04em, maiuscolo): solo FATTURARE ×3, centrato, terza riga arancione. È un titolo di coda, non un messaggio.
- **Numero** (500, `clamp(52px, 6.4vw, 92px)`, 0,96, −0,04em, cifre tabulari): le cifre del registro; l'unità a 0,36em in arancio, subordinata.
- **Headline** (500, `clamp(30px, 4.4vw, 56px)`, 1,10, −0,036em): ogni titolo di sezione. **Headline-sm** (500, `clamp(26px, 3.2vw, 44px)`, 1,16) per i titoli di secondo livello.
- **Title** (500, `clamp(21px, 2.1vw, 27px)`, 1,22, −0,02em) e **Title-card** (700, 17px, 1,32, −0,01em): titoli di blocco e di card/tile/persona.
- **Deck** (400, `clamp(16px, 1.25vw, 19px)`, 1,58, max 58ch, Testo 2): il sommario sotto i titoli.
- **Body** (400, 16px, 1,62, max 64ch, Testo 2) e **Body-sm** (400, 15px, 1,54, +0,01em).
- **Label** (500, 15px, 1,35, −0,005em, in tondo, Testo 3): l'occhiello di sezione, preceduto da una particella arancione di 8px.
- **Meta** (500, 13px, 1,45, tracking 0, cifre tabulari, Testo 3): fonti, date, legende, filtri. Le etichette dei campi e delle intestazioni di tabella stanno a 600 13px.

Altri registri reali: il **fregio** (700, `clamp(46px, 7.6vw, 116px)`, maiuscolo, righe piene alternate a righe in contorno `-webkit-text-stroke: 1.4px` al 32%) e la **parola fantasma** delle aperture interne (700, fino a 350px, solo contorno al 8,5%, tagliata dal bordo inferiore).

### Named Rules
**The One Family Rule.** Solo DM Sans. Instrument Serif è ritirato (giro 2), IBM Plex Mono è escluso per decisione del cliente, nessun monospace. Mai animare `font-weight` o `font-variation-settings`.

**The Two Tones Rule.** Esiste un solo sistema di titolo. Il titolo "a due voci" (`.duevoci`) è lo stesso Headline in due toni: la prima riga in Testo 1, la seconda in Testo 3. Niente caps + corsivo, niente secondo corpo.

**The 12px Floor Rule.** Nessun testo sotto 12px. Le etichette di servizio stanno a 12–13px, in tondo; il maiuscolo spaziato sopra un titolo è la cadenza da template.

**The Flat Digits Rule.** Le cifre hanno letter-spacing 0 e cifre tabulari: tracciare i numeri fa oscillare le colonne.

## 4. Elevation

Il sistema non costruisce profondità con le ombre: la costruisce con la luce. La profondità viene dal palco (atmosfere, vignettatura, una torcia arancione da 1000px al 7,5% che segue il mouse dietro il contenuto), dall'alone radiale a tre strati che scende dall'alto dietro hero e aperture interne, e dalla scala di opacità delle superfici. Le card sono piatte: filo al 12%, superficie al 4%, e al passaggio salgono di un gradino di luce, non di quota. Le ombre esistono solo dove un oggetto deve sembrare un volume fisico (i blocchi dei reparti sotto il tetto, il pulsante play dei video, i cubi dell'hero) o come alone arancione di un elemento acceso.

### Shadow Vocabulary
- **Alone di pagina** (`--alone`: tre `radial-gradient` arancio/brace a 0,26–0,30 da 50% in alto): dietro hero e testa delle pagine interne. Dipinto una volta, mai animato. Versione fioca `--alone-fioco` dietro tetto, candidatura e fasce `sez--alone`.
- **Luce accesa** (`box-shadow: 0 0 0 4px rgba(255,130,0,.16), 0 0 26px rgba(255,130,0,.85)`): il contatto e i varchi accesi nella macchina; la trave del tetto usa `0 0 16px rgba(255,130,0,.6), 0 0 52px rgba(255,130,0,.32)`.
- **Faccia illuminata** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 14px 22px -14px rgba(0,0,0,.7)`): i blocchi dei reparti sotto il tetto, illuminati da sopra.
- **Anello di focus dei campi** (`box-shadow: 0 0 0 3px rgba(255,130,0,.18)` con bordo arancione).
- **Bordo acceso** (`box-shadow: inset 0 0 0 1px rgba(255,130,0,.42)`): hover delle schede persona.

### Named Rules
**The Continuous Stage Rule.** Le sezioni non dipingono un fondo e non si separano con un filo: il fondo è il palco. Si anima solo l'opacità dei livelli del palco (compositor), mai un gradiente, mai un blur su area grande. Ad alto contrasto le atmosfere si spengono.

**The Light-Not-Lift Rule.** Una superficie risponde al passaggio illuminandosi dove si trova il cursore (radiale bianco 7,5% + arancio 5%, 340px), non sollevandosi con un'ombra. Spostamento massimo 3px in tutto il sistema.

## 5. Components

### Buttons
Tutti pill, fermi e luminosi: il bottone non va verso il cursore, si illumina dove sei.
- **Shape:** pill (999px), altezza 50px, padding orizzontale 26px, DM Sans 700 15px. Variante compatta 44px / 18px / 14px; in nav 42px (44px su touch); nel menu mobile e nel form a tutta larghezza (54–56px).
- **Arancio (conversione):** fill Arancio, testo Inchiostro su Arancio; hover a Arancio Pressato e lift di 2px. Con `.cta--luce` (solo mouse, senza reduced-motion) una luce bianca/arancio segue il cursore dentro il bottone in `mix-blend-mode: screen`, con alone sfocato dipinto una volta.
- **Bianco (hero):** fill `#F8F8F8`, testo `#100F12`; hover bianco pieno e lift di 2px.
- **Outline:** bordo UI 1px, testo Testo 1; al passaggio un velo arancione (16%→8%) si riempie da sinistra con `scaleX` e il bordo si accende d'arancio.
- **Testo:** senza contenitore, peso 500, min-height 24px (44px su touch).
- **Active:** `scale: .985`, nessun lift. La particella dentro un CTA fa un gradino lungo la diagonale (3px, −2px); la freccia SVG (mai il glifo unicode) fa un passo di 3px nella sua direzione.

### Chips
- **Style:** pill 38px (44px su touch), 500 14px in tondo, Testo 2, bordo UI 1px, fondo trasparente.
- **State:** hover Testo 1 su Superficie 2; premuto (`aria-pressed`) testo Arancio, fondo arancio al 10%, Bordo Arancio.

### Cards / Containers
- **Corner Style:** 12px per card, tile, schede, pannelli dei reparti; 20px per pannelli grandi (form, filtro, fascicoli, mappa, lenti).
- **Background:** Superficie 1, Superficie 2 al passaggio; i pannelli fotografici su `#0B0A0C` con un velo nero dal 32% in giù.
- **Shadow Strategy:** piatte; luce al cursore (vedi Elevation).
- **Border:** Filo 1px, Filo Forte al passaggio; i pannelli dei reparti si accendono a Bordo Arancio.
- **Internal Padding:** 24px (`s-5`) per card e schede, 32px (`s-6`) per form e pannelli.
- **Icone:** nude, un tratto SVG a 1,75 di spessore, 22–26px, in arancio. Nessun quadratino tinto sotto.

### Inputs / Fields
- **Style:** 52px, Superficie 1, bordo UI 1px, raggio 8px, 400 16px, testo Testo 1; label sempre visibile sopra (600 13px, Testo 2), mai il placeholder come label.
- **Focus:** bordo Arancio, fondo arancio al 4%, anello `0 0 0 3px` arancio al 18%.
- **Error:** la squalifica in tempo reale è un riquadro Rosso Perdita al 10% con bordo al 28%, raggio 8px, che entra con il gesto di testa.

### Navigation
- **Barra annuncio:** fissa in cima, 40px (44px su touch), gradiente `#C56200→#FF8200→#FF9A38`, testo `#100F12` 700 13px; l'intera fascia è un solo link; chiusura in un bersaglio 44px. Degrada per larghezza (via i posti, poi la data, poi il testo della pill).
- **Nav:** 76px (60px sotto 1100px), trasparente sull'hero, velata (Velo Nav + blur) dopo 48px di scroll con isteresi a 12px. Voci 500 15px Testo 2 → Testo 1; un filo arancione di 2px cresce da sinistra al passaggio e resta acceso sulla pagina corrente. Nessun transform sul testo. Il mark si accende modulo per modulo all'apertura. Sotto la nav, un filo arancione di 2px legato allo scroll (`animation-timeline: scroll()`).
- **Mobile:** sotto 1100px burger 44px (bordo UI, raggio 8px) che diventa × in due tempi; il menu scende dalla nav e le voci (500 24px, righe da 60px) salgono a gradini. Sotto 620px una piastra fissa in basso porta il CTA arancione a tutta larghezza (52px).
- **Footer:** sei colonne, voci 400 14,5px Testo 3 con passo di 3px al passaggio, social in quadrati 44px raggio 8px; si chiude con quattro particelle arancioni da 9px montate a scalinata.

### La particella
Il quadrato del mark, 12px con raggio 2px (8px nelle liste e negli occhielli). Elenca (`.lista`: particella arancione, verde per ciò che rientra, triangolo rosso per ciò che non rientra), conta (grafici a unità: un quadrato = 100.000 €), nomina (l'occhiello), scopre (la maschera a quattro gradini, la View Transition fra pagine), attraversa (il contatto da 18px che percorre i quattro reparti nella macchina pinnata).

### L'occhiello (copy approvato)
Le sezioni esistenti portano un occhiello di copy approvato. È una didascalia in tondo (Label, Testo 3) preceduta da una particella di 8px; da 1024px esce dalla colonna del titolo e va in una colonna di margine (3fr / 9fr) con un filetto Filo Forte sopra. Senza parentesi quadre, senza maiuscolo. Dentro card, schede persona e video perde la particella. L'occhiello di pagina (`.pill-eyebrow`) non è più una pill: è una riga di colophon in Testo 2, senza scatola e senza arancio sul testo.

### Il muro FATTURARE
Tre righe identiche, centrate (decisione cliente), la terza in Arancio. Salgono una per una dentro la maschera con una leggera pressa verticale (`scale: 1 1.05→1`); un bagliore arancione sfocato sta dietro, fuori dalla maschera. Con il mouse, il punto sotto il cursore si accende dentro le lettere (`background-clip: text`, coordinate registrate con `@property` così la luce scivola).

### Comportamenti trasversali
- **Reduced motion:** a token, mai `*{animation:none}`. Le durate si accorciano (reveal 180ms), `--travel`, `--dx`, `--dy` vanno a 0, la dissolvenza resta; parole, maschere, scalinate, marquee, View Transition, torcia, luce al cursore, fregio e 3D si fermano o non partono. Ogni stato resta raggiungibile.
- **Touch:** su `pointer: coarse` ogni bersaglio autonomo arriva a 44px (`--tap`): CTA di testo, chip, voci e link legali del footer, barra annuncio, burger, social.
- **Movimento automatico:** il marquee dei loghi si ferma a hover e focus; la deriva delle lenti e l'impulso della mappa si spengono in reduced-motion.

## 6. Do's and Don'ts

### Do:
- **Do** tenere l'arancio `#FF8200` come unico accento e usarlo come luce: una parola nell'H1 di pagina, il payoff del tetto, numeri, particelle, bordi accesi, focus.
- **Do** mettere sempre `#100F12` su ogni fill arancione e scurire a `#E87300` all'hover.
- **Do** costruire ogni nuova sezione trasparente sul palco e dichiararne l'atmosfera (`sf--…`, `data-atmo`), scegliendo fra le sette esistenti.
- **Do** fare la gerarchia con le opacità del bianco (100/80/56/40%) e delle superfici (4/6/9%).
- **Do** usare la particella solo se conta, nomina o scopre qualcosa; altrimenti esce.
- **Do** far entrare la materia con il gradino, il testo con la riga verticale in maschera, l'interazione con la luce al cursore; curva `--ease-salita`, scrub lineare, spostamento massimo 3px negli hover.
- **Do** dare 44px a ogni bersaglio su touch, label visibili ai campi, focus `2px` arancione con offset 3px.
- **Do** dare a ogni numero fonte e data, in Meta 13px con cifre tabulari.
- **Do** usare le fotografie del cliente (mani nere con oggetto arancione) e i ritratti reali, in scala di grigi che si colora al passaggio.

### Don't:
- **Don't** mettere testo bianco su arancio, mai: nemmeno nella barra annuncio, nel menu o nei bottoni.
- **Don't** usare Instrument Serif, IBM Plex Mono o qualunque monospace: il sito è tutto DM Sans.
- **Don't** colorare d'arancio le parole marcate nei titoli di sezione: nove parole arancioni in una pagina sono un tic.
- **Don't** aggiungere occhielli a sezioni nuove come cadenza di default, né scriverli in maiuscolo spaziato o tra parentesi quadre.
- **Don't** mettere quadratini arancioni sulle card del team o dei reparti, né un rounded square tinto sotto le icone.
- **Don't** ridisegnare il logo: si usa il file vero.
- **Don't** spostare il muro FATTURARE dall'asse centrale.
- **Don't** dipingere un fondo proprio su una sezione o separarla con un filo di 1px: la pagina diventa una pila di blocchi.
- **Don't** applicare la stessa dissolvenza a ogni sezione o fare card tutte uguali.
- **Don't** usare magnetic hover, tilt 3D o easing con overshoot; il testo non entra mai in diagonale.
- **Don't** animare gradienti, blur su area grande, `font-weight` o `font-variation-settings`; si animano solo transform, opacity, clip-path su pochi elementi.
- **Don't** scrivere testo sotto 12px, né Testo 4 (40%) sotto 24px.
- **Don't** usare il duotone nero/arancio sui volti: disumanizza la prova che converte di più.
- **Don't** pubblicare numeri senza fonte né inventare dati mancanti (numero verde, liberatorie, ISO).
