---
name: Sales Process Italia
description: Un palco scuro continuo su cui si muove una sola luce arancione; il quadrato del marchio porta la storia dai contatti al fatturato, a capitoli.
colors:
  arancio: "#FF8200"
  arancio-caldo: "#FF9A38"
  arancio-pressato: "#E87300"
  arancio-brace: "#B85B00"
  su-arancio: "#100F12"
  fondo-base: "#161519"
  nero-palco: "#020202"
  fondo-menu: "#0F0E11"
  testo-1: "#F8F8F8"
  testo-2: "#FFFFFFCC"
  testo-segue: "#FFFFFFAD"
  testo-3: "#FFFFFF8F"
  testo-4: "#FFFFFF66"
  superficie-1: "#FFFFFF0A"
  superficie-2: "#FFFFFF0F"
  superficie-3: "#FFFFFF17"
  velo-nav: "#121115D1"
  velo-menu: "#02020294"
  filo: "#FFFFFF1F"
  filo-forte: "#FFFFFF33"
  bordo-ui: "#FFFFFF57"
  bordo-arancio: "#FF82006B"
  rottura: "#F04B3A"
  ok: "#4ADE80"
typography:
  display:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(40px, 8.2vw, 128px)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  display-pagina:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(40px, 5vw, 82px)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  payoff:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(52px, 7.4vw, 118px)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  menu-voce:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(36px, min(7.2vh, 6.2vw), 92px)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.035em"
  capitolo:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(52px, 5.2vw, 84px)"
    fontWeight: 600
    lineHeight: 0.8
    letterSpacing: "-0.045em"
    fontFeature: "tnum"
  numero:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(64px, 7.6vw, 124px)"
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: "-0.045em"
    fontFeature: "tnum"
  headline:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(36px, 4vw + 6px, 64px)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  headline-sm:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(22px, 3.2vw, 44px)"
    fontWeight: 500
    lineHeight: 1.16
    letterSpacing: "-0.02em"
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
  menu: "28px"
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
  button-nav:
    backgroundColor: "{colors.arancio}"
    textColor: "{colors.su-arancio}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "42px"
  menu-bottone:
    backgroundColor: "#FFFFFF08"
    textColor: "{colors.testo-1}"
    rounded: "{rounded.pill}"
    padding: "0 16px 0 20px"
    height: "44px"
  menu-bottone-hover:
    backgroundColor: "#FFFFFF12"
  menu-card:
    backgroundColor: "{colors.fondo-menu}"
    rounded: "{rounded.menu}"
  menu-voce:
    textColor: "{colors.testo-2}"
    typography: "{typography.menu-voce}"
  menu-voce-attiva:
    textColor: "{colors.testo-1}"
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
  particella:
    backgroundColor: "{colors.arancio}"
    rounded: "{rounded.hard}"
    size: "12px"
---

# Design System: Sales Process Italia

## 1. Overview

**Creative North Star: "Dal buio dei contatti alla luce del fatturato"**

Il sito è un palco scuro unico. Non c'è una pila di fasce con il loro fondo: c'è una stanza fissa (`.palco`, a z-index −1) dietro tutta la pagina, e le sezioni, trasparenti, dichiarano quale luce vogliono. Camminando nella pagina cambia l'illuminazione della stanza, non la stanza. Sopra quel buio si muove una sola luce, l'arancio del marchio, che non è mai vernice: è alone, bordo acceso, numero, cursore. Il quadrato del mark (la "particella", 12px, raggio 2px) è il modulo di tutto, e nella home diventa un oggetto: il cubo arancione, sparso nell'hero, che cade fra due mani nel problema, passa di mano nel metodo e viene alzato come un trofeo nel finale.

La pelle è vincolata dal cliente e allineata al riferimento sharpify.io: near-black freddo, gerarchia fatta con l'opacità del bianco e non con una palette, DM Sans al display a peso 500, raggi 2/8/12/999px. Il DNA che resta di Sales Process: l'arancio `#FF8200`, il mark a moduli, il payoff FATTURARE ×3, le fotografie con le mani in bianco e nero e l'oggetto arancione (anche quelle generate del giro 3, scontornate dalla luminanza: galleggiano sul palco senza scatola), la voce italiana diretta. Densità media-bassa, respiro di sezione fluido (60px a 360px, 112px di tetto), contenitori da 980 a 1400px.

Una pagina lunga si legge **a capitoli** (giro 4). La home è una copertina (hero, loghi), sei capitoli in ordine di racconto (01 Il problema · 02 La soluzione · 03 Il metodo · 04 I risultati · 05 Le persone · 06 Il podcast) e una chiusura (dove siamo, finale); l'ordine è scritto nel commento in testa a `pages/index.html`. Ogni capitolo apre con un segnacapitolo e un h2, le sezioni che lo continuano hanno un h3 un gradino sotto, e il palco cambia luce una volta per capitolo, non per sezione. Il sistema rifiuta la pila di blocchi con la stessa dissolvenza su ogni sezione, le card tutte uguali, l'occhiello sopra il titolo di sezione (maiuscolo spaziato o no), il quadratino tinto d'accento sotto le icone, il magnetic hover e il tilt 3D da cartolina, il bianco su arancio.

Il movimento è texture, non collezione di effetti: tre gesti, ciascuno con il suo asse, una sola curva d'ingresso (`cubic-bezier(.16,.84,.24,1)`, `--ease-salita`). **Il gradino** (materia): foto e pannelli vengono scoperti da quattro colonne sfalsate che salgono (`.scalinata`, anche nella View Transition fra pagine). **La riga** (testo): le parole salgono in verticale dentro una maschera, split fatto al build; il testo non entra mai in diagonale. **La luce** (interazione): una luce radiale segue il cursore su CTA, card e palco; la superficie resta ferma. Le scene fotografiche si muovono legate allo scroll (`animation-timeline: view()`), sempre lineari: le mani della caduta, la staffetta orizzontale, il braccio del finale. Le griglie entrano con una citazione della diagonale (`--dx` = −0,45 × `--travel`), solo movimento. Il 3D (three.js) vive solo nell'hero della home, desktop con puntatore fine, senza reduced-motion, scaricato dopo il load e fermo fuori viewport.

**Key Characteristics:**
- Un fondo continuo con sette atmosfere in dissolvenza incrociata (1100ms), una per capitolo, accese da un IntersectionObserver sulla fascia centrale del viewport.
- Un solo accento, `#FF8200`, usato come luce; testo scuro `#100F12` su ogni fill arancione.
- Una sola famiglia, DM Sans variabile ospitata in casa; nessun serif, nessun monospace.
- Due livelli di titolo e basta: h2 che apre un capitolo, h3 che lo continua.
- La particella del marchio come modulo di elenchi, campi a unità, sedie, chiuse; il cubo come filo fotografico della home.
- Tre gesti di motion, una curva d'ingresso, reduced-motion gestito a token (il travel va a zero, la dissolvenza sopravvive).
- Bersagli touch ≥ 44px (`--tap`) su ogni puntatore grossolano; nessun testo sotto 12px.

## 2. Colors: La luce sul palco

Un palco neutro e freddo, quasi nero, e una famiglia calda di arancio che fa da luce; il resto è bianco a opacità diverse.

### Primary
- **Arancio Sales Process** (`arancio`): il brand. Fill del CTA di conversione (la candidatura), particella, mark, cubo, unità dei numeri, contorno dei numeri di capitolo, barra di avanzamento, filo della pagina corrente nel menu, contorno di focus (`outline: 2px` con offset 3px), selezione di testo, cursore dei campi. È satura al massimo e non ha headroom: non esiste un arancio più brillante.
- **Arancio Caldo** (`arancio-caldo`): l'arancio dei testi piccoli (numero del capitolo nella nav, tipo nelle righe d'indice, ruoli, date, dettagli dei passaggi, testo della pill d'apertura) e dell'hover dei link (9,3:1 sul fondo); scende anche sugli accenti nell'atmosfera fredda "notte". Già desaturato: mai come fill.
- **Arancio Pressato** (`arancio-pressato`): hover e active dei fill arancioni. L'interazione scurisce il fill invece di schiarirlo.
- **Brace** (`arancio-brace`): la massa degli aloni e delle atmosfere calde (scritta come `rgba(184,91,0,…)` nei gradienti del palco, del finale e della card del menu).
- **Inchiostro su Arancio** (`su-arancio`): l'unico colore di testo ammesso su un fill arancione, e anche il testo del CTA bianco.

### Tertiary
- **Rosso Perdita** (`rottura`): solo il colore della perdita, rosso caldo nella famiglia dell'arancio (era il lampone `#CC3366` fino al giro 2). Lo zero vuoto del conto 4 → 3 → 0 (solo contorno, 2px), le frecce dei passaggi rotti, la luce rossa dell'atmosfera "fuoco", la squalifica del form (fondo al 10%, bordo al 28%), i punti `lista--no` a triangolo.
- **Verde Numero Verde** (`ok`): le liste di ciò che rientra (`lista--ok`) e il blocco del numero verde, per convenzione italiana.

### Neutral
- **Base Fredda** (`fondo-base`): il fondo del 90% della pagina e del palco; bianco sopra = 17,9:1.
- **Nero Palco** (`nero-palco`): l'atmosfera "nero" (hero, loghi, aperture interne, footer), su cui l'oggetto arancione si legge come luce.
- **Fondo Menu** (`fondo-menu`): la card del menu, opaca, con una brace radiale al 20% dietro le anteprime. Opaca di proposito: una card semitrasparente sopra l'hero mescolava due titoli.
- **Bianco Riferimento** (`testo-1`): titoli e testo primario. **Testo 2** (80%) corpo e deck; **Secondo tempo** (`testo-segue`, 68%) solo il secondo tempo dei titoli; **Testo 3** (56%) meta, didascalie, fonti, descrizioni d'indice e di menu; **Testo 4** (40%) solo testo ≥ 24px o glifi (i numeri quieti dei principi DNA).
- **Superfici 1/2/3** (bianco al 4/6/9%): card, form, campi. Mai grigi opachi: ogni superficie resta trasparente alla luce che le passa dietro.
- **Velo Nav** (`velo-nav`): nav velata e piastra CTA mobile, con `backdrop-filter: saturate(140%) blur(18px)`; pieno `#121115` con reduced-transparency. **Velo Menu** (`velo-menu`, nero al 58% con blur 6px; 86% senza blur in reduced-transparency): copre la pagina sotto la card.
- **Filo / Filo Forte** (bianco al 12% / 20%): filetti, divisori, il filo del segnacapitolo, la riga in testa a conto, indici e registri. **Bordo UI** (34%, 3:1): il contorno di tutto ciò che è cliccabile (outline CTA, bottone Menu, chip, campi, social). **Bordo Arancio** (arancio al 42%): stato acceso di chip, pannelli dei reparti, palco della sala.

Le sette atmosfere del palco (in `sfondi.css`, non token): **nero** `#020202`; **brace** veletta calda dall'alto a sinistra su `#1D1714→#161519`; **alba** luce dal bordo basso su `#141317`; **radente** luce rasa da sinistra su `#161519`; **notte** l'unica fredda, acciaio `rgba(44,58,84)` su `#111318`; **pozzo** `#060607` con una luce d'angolo; **fuoco** rosso perdita `rgba(240,75,58,.20)` + arancio su `#2A1510→#161519`, sotto il contro-esempio. Una vignettatura comune (`rgba(0,0,0,.42)` ai bordi) le fa leggere come una stanza. Nella home: copertina nero, 01 fuoco, 02 alba, 03 radente, 04 brace, 05 pozzo, 06 notte, finale alba.

### Named Rules
**The Light Rule.** L'arancio è luce, non vernice: sotto il 3% dei pixel. Nei titoli compare in una sola parola dell'H1 di ogni pagina e nella terza riga del payoff; ogni `h2 .ar` torna al colore del titolo (`h2 .ar { color: inherit }`), anche nei titoli futuri.

**The Dark-on-Fill Rule.** Testo bianco su arancio è vietato (2,49:1). Su ogni fill arancione, barra annuncio e selezione comprese, il testo è `#100F12`. L'hover dei fill scurisce a `#E87300`; non schiarisce mai.

**The One Orange Button Rule.** Il fill arancione è della candidatura, la conversione del sito (nav, piastra mobile, piede del menu, chiuse). Ogni altro invito primario è bianco: il canale YouTube del podcast, l'hero. Due bottoni arancioni nello stesso schermo sono un errore.

**The Problem Is White Rule.** Nel capitolo del problema i numeri sono bianchi e lo zero è vuoto in Rosso Perdita: l'arancio lì è solo il cubo che cade, così il colore resta legato alla soluzione.

**The Opacity Ladder Rule.** La gerarchia si fa con l'opacità del bianco (100/80/68/56/40%) e delle superfici (4/6/9%), non con nuovi grigi o nuove tinte. Un grigio opaco su una card è un errore.

**The One Cold Room Rule.** La famiglia delle atmosfere è calda; esiste una sola zona fredda, "notte", ed è acciaio spento, non blu. Tutto resta scuro→scuro: il testo non cambia regole di leggibilità fra atmosfere.

## 3. Typography

**Display Font:** DM Sans (con Segoe UI, system-ui, sans-serif), file variabile woff2 ospitato in casa, assi wght 100–1000, sottoinsieme latino, `font-display: swap`
**Body Font:** DM Sans (stessa pila)
**Label/Mono Font:** nessuno. Le cifre si allineano con `font-variant-numeric: tabular-nums` su DM Sans.

**Character:** Una sola famiglia, tenuta da corpo, peso e tono invece che dal cambio di carattere. Il titolo a 500 è ciò che rende il registro elegante e non urlato; il 700 è riservato ai colpi (H1, payoff, numeri).

### Hierarchy
- **Display** (700, `clamp(40px, 8.2vw, 128px)`, 0,98, −0,03em, word-spacing .04em): l'H1 della home, centrato, `text-wrap: balance`, preceduto da un attacco a 500 `clamp(20px, 2.5vw, 38px)` in Testo 2. La parola d'accento è l'unico punto arancione. **Display-pagina** (700, `clamp(40px, 5vw, 82px)`, 1,02): l'H1 delle aperture interne, a filo sinistro accanto alla foto, max 16ch.
- **Payoff** (700, `clamp(52px, 7.4vw, 118px)`, 0,9, −0,035em, maiuscolo): solo FATTURARE ×3 nel finale, a filo sinistro, terza riga arancione. È un titolo di coda, non un messaggio.
- **Capitolo** (600, `clamp(52px, 5.2vw, 84px)`, 0,8, −0,045em, cifre tabulari, contorno `-webkit-text-stroke: 1.5px` arancio con un velo d'arancio al 16% dentro): il numero del segnacapitolo; il nome accanto a 500 `clamp(17px, 1.3vw, 20px)` in Testo 1. La stessa voce, a 700 `clamp(72px, 7vw, 128px)` (46px sotto 900px) e **vuota**, solo contorno, numera i reparti della staffetta: pieno = capitolo, vuoto = reparto, perché su telefono «03 Il metodo» e «01 Pubblicità» stanno nello stesso schermo.
- **Numero** (700, `clamp(64px, 7.6vw, 124px)`, 0,86, −0,045em, cifre tabulari): le cifre dei numeri a unità; i fatti degli Eventi a `clamp(52px, 5.6vw, 88px)`; il conto 4 → 3 → 0 a 600 `clamp(76px, 8.4vw, 136px)`, 0,84. L'unità a 0,32–0,36em in arancio, subordinata.
- **Headline** (500, `clamp(36px, 4vw + 6px, 64px)`, 1,06, −0,02em, word-spacing .03em, max 22ch): l'h2 che apre un capitolo o una sezione di pagina interna. **Headline-sm** (500, `clamp(22px, 3.2vw, 44px)`, 1,16, −0,02em): l'h3 delle sezioni che continuano un capitolo. I minimi (36 / 22px) tengono due livelli leggibili anche su telefono.
- **Voce del menu** (500, `clamp(36px, min(7.2vh, 6.2vw), 92px)`, 1, −0,035em; `clamp(34px, 10.5vw, 54px)` sotto 900px): i nomi delle sette pagine nella card del menu.
- **Title** (500, `clamp(21px, 2.1vw, 27px)`, 1,22, −0,02em) e **Title-card** (700, 17px, 1,32, −0,01em): titoli di blocco e di card/persona. I titoli di colonna del conto e d'indice stanno fra 21 e 36px a 500.
- **Deck** (400, `clamp(16px, 1.25vw, 19px)`, 1,58, max 58ch, Testo 2): il sommario sotto i titoli.
- **Body** (400, 16px, 1,62, max 64ch, Testo 2) e **Body-sm** (400, 15px, 1,54, +0,01em).
- **Label** (500, 15px, 1,35, −0,005em, in tondo, Testo 3): etichette di gruppo che non stanno sopra un titolo (la riga sopra i loghi, i blocchi di "Dove siamo"), precedute da una particella di 8px; descrizioni del menu.
- **Meta** (500, 13px, 1,45, tracking 0, cifre tabulari, Testo 3): fonti, date, legende, filtri, note. Le etichette dei campi stanno a 600 13px.

### Named Rules
**The One Family Rule.** Solo DM Sans. Instrument Serif è ritirato (giro 2), IBM Plex Mono è escluso per decisione del cliente, nessun monospace. Mai animare `font-weight` o `font-variation-settings`.

**The Two Levels Rule.** Un titolo per sezione, e due soli livelli: h2 `t-d2` che apre, h3 `t-d3` che continua. Un h3 non supera mai l'h2 del suo capitolo, un numero interno (i reparti della staffetta) non supera su telefono il numero del capitolo che lo contiene, e nessuna risoluzione dentro un capitolo (il payoff del tetto, a `clamp(30px, 4.4vw, 64px)`) supera il suo titolo.

**The Second Beat Rule.** Quando un titolo è una frase in due tempi, il secondo tempo (`.segue`) scende di un gradino di luce, a `rgba(255,255,255,.68)`: uno, non due (a 56% si spegneva sulle luci calde). Niente caps + corsivo, niente secondo corpo, niente arancio.

**The No Label Above Rule.** Il titolo dice di cosa parla la sezione, il sommario dice perché; sopra il titolo non c'è niente. Un'informazione che stava in un occhiello entra nel sommario o nell'etichetta (i numeri dicono «Imprenditori seguiti, dal 2020», con il «quando» in Testo 3 dentro la stessa riga). L'unico segno sopra un h2 è il segnacapitolo, che è un indice.

**The 12px Floor Rule.** Nessun testo sotto 12px. Le etichette di servizio stanno a 12–13px, in tondo; il maiuscolo spaziato non esiste nel sito (il payoff maiuscolo è un titolo, non un'etichetta).

**The Flat Digits Rule.** Le cifre hanno letter-spacing 0 nelle etichette e cifre tabulari ovunque: tracciare i numeri fa oscillare le colonne.

## 4. Elevation

Il sistema non costruisce profondità con le ombre: la costruisce con la luce. La profondità viene dal palco (atmosfere, vignettatura, una torcia arancione da 1000px al 7,5% che segue il mouse dietro il contenuto), dall'alone radiale a tre strati che scende dall'alto dietro hero e aperture interne, dalla brace che sale dal pavimento nel finale, e dalla scala di opacità delle superfici. Le fotografie non hanno scatola: fondo trasparente, sfumano in basso o ai bordi con una maschera. Le card sono piatte: filo al 12%, superficie al 4%, e al passaggio salgono di un gradino di luce, non di quota. L'unico livello davvero sopra la pagina è il menu: velo nero sfocato, poi la card opaca. Le ombre esistono solo dove un oggetto deve sembrare un volume fisico (i blocchi dei reparti sotto il tetto, il pulsante play dei video, i libri, i ritratti del marchio fatto di volti, i cubi dell'hero) o come alone arancione di un elemento acceso.

### Shadow Vocabulary
- **Alone di pagina** (`--alone`: tre `radial-gradient` arancio/brace a 0,26–0,30 da 50% in alto): dietro hero e aperture interne. Dipinto una volta, mai animato. Versione fioca `--alone-fioco` dietro tetto, candidatura e fasce `sez--alone`.
- **Luce accesa** (`box-shadow: 0 0 16px rgba(255,130,0,.6), 0 0 52px rgba(255,130,0,.32)`): la trave del tetto.
- **Faccia illuminata** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 14px 22px -14px rgba(0,0,0,.7)`): i blocchi dei reparti sotto il tetto, illuminati da sopra.
- **Volto posato** (`box-shadow: 0 18px 40px -18px rgba(0,0,0,.8)`): i ritratti del marchio fatto di volti.
- **Anello di focus dei campi** (`box-shadow: 0 0 0 3px rgba(255,130,0,.18)` con bordo arancione).
- **Bordo acceso** (`box-shadow: inset 0 0 0 1px rgba(255,130,0,.42)`): hover delle schede persona.

### Named Rules
**The Continuous Stage Rule.** Le sezioni non dipingono un fondo: il fondo è il palco, e cambia una volta per capitolo. Si anima solo l'opacità dei livelli del palco (compositor), mai un gradiente, mai un blur su area grande. Ad alto contrasto le atmosfere si spengono. I filetti esistono dentro le sezioni (in testa a un indice, a un conto, a un registro), mai come confine fra due sezioni.

**The Light-Not-Lift Rule.** Una superficie risponde al passaggio illuminandosi dove si trova il cursore (radiale bianco 7,5% + arancio 5%, 340px), non sollevandosi con un'ombra. Spostamento massimo 3px in tutto il sistema, fuori dalle voci del menu e dell'indice che fanno un passo laterale.

## 5. Components

### Buttons
Tutti pill, fermi e luminosi: il bottone non va verso il cursore, si illumina dove sei.
- **Shape:** pill (999px), altezza 50px, padding orizzontale 26px, DM Sans 700 15px. Variante compatta 44px / 18px / 14px; in nav 42px / 20px / 14px (44px su touch); nel piede del menu sotto 900px e nella piastra mobile a tutta larghezza (52–54px).
- **Arancio (conversione):** solo la candidatura. Fill Arancio, testo Inchiostro su Arancio; hover a Arancio Pressato e lift di 2px. Con `.cta--luce` (solo mouse, senza reduced-motion) una luce bianca/arancio segue il cursore dentro il bottone in `mix-blend-mode: screen`, con alone sfocato dipinto una volta.
- **Bianco:** fill `#F8F8F8`, testo `#100F12`; hover bianco pieno e lift di 2px. È l'invito primario di tutto ciò che non è la candidatura (hero, canale YouTube del podcast con il suo segno SVG a 22px).
- **Outline:** bordo UI 1px, testo Testo 1; al passaggio un velo arancione (16%→8%) si riempie da sinistra con `scaleX` e il bordo si accende d'arancio.
- **Testo:** senza contenitore, peso 500, min-height 24px (44px su touch).
- **Active:** `scale: .985`, nessun lift. La particella dentro un CTA fa un gradino lungo la diagonale (3px, −2px); la freccia SVG (mai il glifo unicode) fa un passo di 3px nella sua direzione.

### Chips
- **Style:** pill 38px (44px su touch), 500 14px in tondo, Testo 2, bordo UI 1px, fondo trasparente.
- **State:** hover Testo 1 su Superficie 2; premuto (`aria-pressed`) testo Arancio, fondo arancio al 10%, Bordo Arancio.

### Cards / Containers
Le card sono poche e servono dove c'è un oggetto da maneggiare (schede persona, video, form); i contenuti in sequenza si mettono in fila tipografica, non in scatola (indici, conto, numeri, servizi, principi).
- **Pannelli dei reparti:** una fotografia per reparto, a tutta altezza sotto un velo nero, con numero, nome e una riga di descrizione in basso; il soggetto della foto può cambiare, la forma no.
- **Corner Style:** 12px per card, schede e pannelli dei reparti; 20px per pannelli grandi (form, filtro, mappa); 22% del lato per ritratti e sedie (il raggio del marchio).
- **Background:** Superficie 1, Superficie 2 al passaggio; i pannelli fotografici su `#0B0A0C` con un velo nero dal 32% in giù.
- **Shadow Strategy:** piatte; luce al cursore (vedi Elevation).
- **Border:** Filo 1px, Filo Forte al passaggio; i pannelli dei reparti si accendono a Bordo Arancio.
- **Internal Padding:** 24px (`s-5`) per card e schede, 32px (`s-6`) per form e pannelli.
- **Icone:** nude, un tratto SVG a 1,75 di spessore, 26–30px, in arancio; solo dove nominano un reparto (staffetta, tetto). Gli otto servizi non hanno icone. Nessun quadratino tinto sotto.

### Inputs / Fields
- **Style:** 52px, Superficie 1, bordo UI 1px, raggio 8px, 400 16px, testo Testo 1; label sempre visibile sopra (600 13px, Testo 2), mai il placeholder come label.
- **Focus:** bordo Arancio, fondo arancio al 4%, anello `0 0 0 3px` arancio al 18%.
- **Error:** la squalifica in tempo reale è un riquadro Rosso Perdita al 10% con bordo al 28%, raggio 8px, che entra con il gesto di testa.

### Navigation
- **Barra annuncio:** fissa in cima, 40px (44px su touch), gradiente `#C56200→#FF8200→#FF9A38`, testo `#100F12` 700 13px; l'intera fascia è un solo link; chiusura in un bersaglio 44px. Degrada per larghezza (via i posti, poi la data, poi il testo della pill).
- **Nav:** 76px (60px sotto 1100px), trasparente sull'hero, velata (Velo Nav + blur, filo in basso) dopo 48px di scroll con isteresi a 12px; sotto 1100px sempre su Base Fredda. Contiene solo tre cose: il marchio, il CTA arancione della candidatura e il bottone **Menu**. Nessuna voce in linea. Sotto 620px il CTA esce dalla nav (lo porta la piastra) e il bottone resta un quadrato da 44px con i soli due tratti.
- **Capitolo corrente** (solo da 1101px, solo con la nav velata): fra marchio e comandi, dopo un filo verticale Filo Forte di 20px, il numero del capitolo (600, Arancio Caldo, tabulare) e il nome (500 14px, Testo 2). Lo decide la sezione `[data-cap]` che attraversa la linea mediana; entra con una salita di 6px e una dissolvenza (`--t-stato`). È `aria-hidden`: ripete il segnacapitolo, non lo sostituisce.
- **Bottone Menu:** pill 44px, bordo UI, fondo bianco al 3% (7% al passaggio, bordo a Testo 2), «Menu» 600 14px e due tratti da 1,6px (il secondo corto, 12px, si allunga al passaggio). Nella card diventa «Chiudi» e i tratti ruotano in una ×.
- **Piastra mobile:** sotto 620px una piastra fissa in basso (Velo Nav + blur) porta il CTA arancione a tutta larghezza (52px); si nasconde scendendo.
- **Footer:** sei colonne, voci 400 14,5px Testo 3 con passo di 3px al passaggio, social in quadrati 44px raggio 8px; si chiude con quattro particelle arancioni da 9px montate a scalinata.

### Il menu: la card gigante
Un dialogo vero, uguale su tutti gli schermi, che nasce dal bottone.
- **Forma:** card fissa a 8–14px dai bordi, raggio 28px (22px sotto 900px), Fondo Menu opaco con una brace radiale, bordo Filo Forte. Sotto, un velo sulla pagina (Velo Menu) come `::before` del dialogo; la nav sotto il velo si spegne (opacity 0), così il marchio non si sdoppia.
- **Apertura:** la `clip-path` parte dal rettangolo del bottone Menu, misurato in JS all'apertura (`--da`, `inset(...) round` metà altezza del bottone), e si apre a `inset(0 round 28px)` in 680ms `--ease-salita`. Alla chiusura rientra nel bottone in 420ms `--ease-uscita`: l'uscita è più veloce dell'ingresso. Il velo sfuma in 320ms all'apertura, 240ms con 120ms di ritardo alla chiusura.
- **Voci:** le sette pagine a corpo da titolo (Voce del menu, Testo 2), e nella stessa riga una descrizione (500 15px, Testo 3) in una colonna allineata per tutte le righe (`grid-template-columns: subgrid`). Salgono di 26px a gradini (170ms + 45ms per voce). Sopra l'elenco le altre voci si spengono a `rgba(255,255,255,.48)` (~5:1 sul fondo della card); la voce scelta torna Testo 1, fa un passo di .36em a destra e una particella arancione si accende nel margine davanti. La pagina corrente è Testo 1 con un sottolineato arancione da .05em. Fuoco: anello arancio 3px stretto sulla parola, raggio 6px.
- **Anteprime:** a destra (5/12) la fotografia della pagina sotto il cursore o il fuoco, maschera in basso, dissolvenza e scala da .96; uscendo dall'elenco torna quella della pagina corrente. Il Team mostra i cinque volti disposti come i quadrati del marchio. Le immagini si scaricano alla prima apertura, non al caricamento.
- **Piede:** filo in testa, CTA arancione della candidatura, mail, indirizzo, social 44px; entra per ultimo (420ms con 480ms di ritardo).
- **Comportamento:** fuoco su «Chiudi» all'apertura, Tab che gira dentro la card, Esc, clic sul velo o su un link chiudono; il fuoco torna al bottone. `html.menu-aperto` blocca lo scroll con `scrollbar-gutter: stable` (nessun salto della barra). Tornando dalla cache del browser il menu è chiuso.
- **Sotto 900px:** una colonna, niente anteprime né descrizioni, l'elenco scende verso il pollice sopra il CTA a tutta larghezza.
- **Reduced motion:** niente `clip-path` né salita; voci e piede in sola dissolvenza da 180ms, nessun passo laterale.

### Il segnacapitolo
Il numero, il nome e un filo. Apre il primo blocco di ogni capitolo (`.sez--capo`, respiro sopra × 1,2); i blocchi che continuano il capitolo (`.sez--segue`, respiro sopra × 0,4, testa più stretta) portano un h3 e niente segnacapitolo.
- **Forma:** numero a due cifre in Capitolo (contorno arancio 1,5px con velo d'arancio al 16%; i numeri dei reparti della staffetta restano vuoti e, su telefono a 46px, più piccoli del numero di capitolo che li contiene), nome accanto in Testo 1, poi un filo di 1px che sfuma da Filo Forte a trasparente fino al margine e si disegna entrando (`scale: 0 1 → 1`, scroll-driven, solo senza reduced-motion).
- **Centrato** (`.capo--c`): sopra le composizioni centrate (il tetto, i cartelli dei risultati) numero e nome si impilano sopra il titolo, senza filo.
- È un indice, non un occhiello: compare una volta per argomento, solo dove la pagina si legge a capitoli e il numero conta davvero (la nav lo ripete).

### Il contro-esempio
Una scena sola, sull'atmosfera "fuoco": titolo → caduta → conto → frase. Usata identica in home (capitolo 01) e nella pagina Metodo.
- **La caduta:** la fotografia delle due mani e del cubo, a tutta larghezza, separata in tre strati PNG trasparenti (`tools/strati.mjs`) posati in percentuale, così fermi ricompongono la foto esatta (proporzioni 2688×1520, margini negativi in alto e in basso). Allo scroll (`view-timeline`, lineare, cover 18–62%) le mani si allontanano del 7% verso l'esterno, solo verso l'esterno, e il cubo parte fra le dita, ruota da −8° a 15° e cade. Senza `view()` o a motion ridotto: la foto ferma. Sotto 700px il fotogramma si allarga al 150% e si stringe sul centro.
- **Il conto 4 → 3 → 0:** tre colonne uguali sotto un filo Filo Forte; ogni colonna apre con il suo numero dentro il titolo della colonna (letto come «4 fornitori da coordinare»). Numeri bianchi; lo zero è vuoto, solo contorno 2px in Rosso Perdita. Il «3» contiene i tre passaggi rotti (fra chi e chi in Meta con una freccia rossa, poi cosa cade a 500 19–22px); la riga dello zero ha il corpo dei passaggi, non quello di una nota. Sotto 900px una colonna, ogni numero con il suo filo.
- **La chiusa** (`.contro__chiusa`): una frase, 500 `clamp(20px, 1.7vw, 26px)`, Testo 2 con la parte che pesa in 600 Testo 1, max 46ch.

### I numeri a unità
Tre voci di registro (un quadrato = un imprenditore / un settore / un processo), ognuna con il suo campo di quadrati sulla stessa griglia a 50 colonne (25 su mobile): l'altezza del campo è la quantità. SVG con `<pattern>`, acceso riga per riga allo scroll con `steps()`. Solo il primo campo è arancio. Cifra in Numero, etichetta 500 17–20px Testo 1 con il «quando» in Testo 3 nella stessa riga, legenda in Meta. In home i numeri continuano le schede dei clienti con una riga d'attacco, non con un titolo.

### L'indice
Righe tipografiche per podcast, articoli, libri, ruoli: tipo (500 14px, Arancio Caldo), titolo (500 `clamp(24px, 2.4vw, 36px)`), descrizione (Testo 3, max 46ch), azione. Le colonne sono dell'indice, non della riga (`subgrid`): un'azione più lunga non sposta le altre. Tutta la riga è il bersaglio; al passaggio una luce arancione al 10% attraversa la riga e il titolo fa un passo di 8px. Stessa logica nei principi del DNA: il numero (600 30–42px) sta in Testo 4, un gradino sotto il titolo, e si accende d'arancio con un passo di 4px al passaggio.

### Il podcast
Un capitolo (06), sull'atmosfera "notte": a sinistra (7/12) logo, titolo, sommario, il CTA bianco verso il canale YouTube (nuova scheda) e una nota in Meta; a destra (5/12) il microfono, che sale con la sezione un filo più lento del testo e sfuma in basso (max 76vh; su telefono al massimo 300px). Il logo lo inserisce il build (`<!--LOGO-PODCAST-->` in `tools/build.mjs`) da `src/assets/podcast/fatturare-logo.(svg|webp|png)`, alto `clamp(72px, 6.4vw, 104px)`; finché il file manca, al suo posto resta il nome scritto. Non va ridisegnato.

### Le aperture
- **Home:** hero centrato sul nero, campo di contatti (3D su desktop, DOM altrove), attacco a 500 e colpo in Display.
- **Pagine interne:** titolo a filo sinistro (7/12) in Display-pagina con deck, accanto (5/12) la fotografia che dice la pagina (la scalinata, lo scontrino, la bussola, il biglietto, il microfono, la tazzina; per il Team cinque ritratti veri disposti come i cinque quadrati del marchio), che sale dal fondo e vi sfuma. L'alone di pagina dietro. Sotto 900px una colonna.
- **La pill d'apertura** (`.pill-eyebrow`): esiste sopra l'H1 della home e delle aperture interne per richiesta esplicita del cliente nel giro 4 («la hero vorrei fosse a pillola»). È un'eccezione concordata per quelle otto aperture, non un componente del sistema: non si replica sopra altri titoli, non si copia in pagine nuove senza una nuova richiesta.

### La particella
Il quadrato del mark, 12px con raggio 2px (8px nelle liste e nelle etichette). Elenca (`.lista`: particella arancione, verde per ciò che rientra, triangolo rosso per ciò che non rientra), conta (campi a unità, grafici delle schede: un quadrato = 100.000 €, le trenta sedie della sala), scopre (la maschera a quattro gradini, la View Transition fra pagine), indica (davanti alla voce del menu sotto il cursore), chiude (la scalinata del footer). Nel racconto della home diventa il cubo fotografato.

### Il finale
Il payoff FATTURARE ×3 a filo sinistro (7/12), tre righe uguali che salgono una per una dentro la maschera, la terza in Arancio; accanto (5/12) il braccio che alza il cubo, che sale dal fondo della sezione e sfuma. La luce viene dal pavimento (brace radiale al 34%, atmosfera "alba"). Un solo CTA.

### Comportamenti trasversali
- **Reduced motion:** a token, mai `*{animation:none}`. Le durate si accorciano (reveal 180ms), `--travel`, `--dx`, `--dy` vanno a 0, la dissolvenza resta; parole, maschere, scalinate, marquee, View Transition, torcia, luce al cursore, caduta, staffetta orizzontale, clip-path del menu e 3D si fermano o non partono. Ogni stato resta raggiungibile.
- **Scroll-driven:** dove esiste `animation-timeline` le scene sono legate allo scroll e lineari; dove non esiste un solo IntersectionObserver aggiunge `.is-in`, con uno stato finale forzato dopo 3s.
- **Touch:** su `pointer: coarse` ogni bersaglio autonomo arriva a 44px (`--tap`): CTA di testo, chip, bottone Menu, voci e link legali del footer, barra annuncio, social, azioni d'indice.
- **Movimento automatico:** il marquee dei loghi si ferma a hover e focus.

## 6. Do's and Don'ts

### Do:
- **Do** tenere l'arancio `#FF8200` come unico accento e usarlo come luce: una parola nell'H1 di pagina, la terza riga del payoff, unità, particelle, contorni dei numeri di capitolo, bordi accesi, focus.
- **Do** mettere sempre `#100F12` su ogni fill arancione e scurire a `#E87300` all'hover; riservare il fill arancione alla candidatura e usare il bianco per ogni altro invito primario.
- **Do** costruire una pagina lunga a capitoli: segnacapitolo + h2 (`t-d2`) per aprire, h3 (`t-d3`) e `.sez--segue` per continuare, una sola atmosfera per capitolo scelta fra le sette esistenti.
- **Do** scrivere un titolo per sezione; se la frase ha due tempi, il secondo in `.segue` (68%).
- **Do** fare la gerarchia con le opacità del bianco (100/80/68/56/40%) e delle superfici (4/6/9%).
- **Do** mettere le sequenze in fila tipografica con le colonne condivise (`subgrid`), non in card.
- **Do** usare la particella solo se conta, nomina, indica o scopre qualcosa; altrimenti esce.
- **Do** far entrare la materia con il gradino, il testo con la riga verticale in maschera, l'interazione con la luce al cursore; curva `--ease-salita`, scrub lineare, uscite più rapide degli ingressi, spostamento massimo 3px negli hover.
- **Do** far nascere un livello sovrapposto dal controllo che lo apre, e trattarlo come dialogo (fuoco intrappolato, Esc, velo, fuoco restituito, scroll bloccato senza salto).
- **Do** dare 44px a ogni bersaglio su touch, label visibili ai campi, focus `2px` arancione con offset 3px.
- **Do** dare a ogni numero fonte e data, in Meta 13px con cifre tabulari.
- **Do** usare le fotografie della serie (mani in bianco e nero con oggetto arancione) senza scatola, sfumate sul palco, e i ritratti reali in scala di grigi che si colorano al passaggio.

### Don't:
- **Don't** mettere testo bianco su arancio, mai: nemmeno nella barra annuncio, nel menu o nei bottoni.
- **Don't** mettere due bottoni arancioni nello stesso schermo, né un fill arancione su un invito che non sia la candidatura.
- **Don't** usare Instrument Serif, IBM Plex Mono o qualunque monospace: il sito è tutto DM Sans.
- **Don't** colorare d'arancio le parole marcate nei titoli di sezione, né i numeri del capitolo del problema.
- **Don't** mettere un occhiello, un'etichetta o una pill sopra un titolo di sezione, in nessuna forma (maiuscolo spaziato, tondo, tra parentesi quadre, con o senza particella). La pill d'apertura resta un'eccezione del cliente, non un precedente.
- **Don't** numerare sezioni che non sono capitoli di un racconto: i numeri 01–06 esistono perché l'ordine conta e la nav lo usa.
- **Don't** far superare a un h3 o a una frase di risoluzione il titolo del suo capitolo.
- **Don't** rimettere voci di navigazione in linea nella nav: le pagine stanno nella card.
- **Don't** mettere quadratini arancioni sulle card del team o dei reparti, né un rounded square tinto sotto le icone, né icone sugli otto servizi.
- **Don't** ridisegnare il logo del sito o quello del podcast: si usano i file veri.
- **Don't** dipingere un fondo proprio su una sezione o separarne due con un filo di 1px: la pagina diventa una pila di blocchi.
- **Don't** applicare la stessa dissolvenza a ogni sezione o fare card tutte uguali.
- **Don't** usare magnetic hover, tilt 3D o easing con overshoot; il testo non entra mai in diagonale.
- **Don't** animare gradienti, blur su area grande, `font-weight` o `font-variation-settings`; si animano transform, opacity e clip-path su pochi elementi.
- **Don't** scrivere testo sotto 12px, né Testo 4 (40%) sotto 24px.
- **Don't** usare il duotone nero/arancio sui volti: disumanizza la prova che converte di più.
- **Don't** pubblicare numeri senza fonte né inventare dati mancanti (numero verde, liberatorie, ISO, logo del podcast).
