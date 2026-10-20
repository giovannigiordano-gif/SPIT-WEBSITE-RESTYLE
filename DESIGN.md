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
  frase:
    fontFamily: "DM Sans, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(26px, 2.9vw, 46px)"
    fontWeight: 600
    lineHeight: 1.16
    letterSpacing: "-0.022em"
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
  cursore-anello:
    backgroundColor: "transparent"
    rounded: "10px"
    size: "34px"
---

# Design System: Sales Process Italia

## 1. Overview

**Creative North Star: "Dal buio dei contatti alla luce del fatturato"**

Il sito è un palco scuro unico. Non c'è una pila di fasce con il loro fondo: c'è una stanza fissa (`.palco`, a z-index −1) dietro tutta la pagina, e le sezioni, trasparenti, dichiarano quale luce vogliono. Camminando nella pagina cambia l'illuminazione della stanza, non la stanza. Sopra quel buio si muove una sola luce, l'arancio del marchio, che non è mai vernice: è alone, bordo acceso, numero, cursore. Il quadrato del mark (la "particella", 12px, raggio 2px) è il modulo di tutto, e nella home diventa un oggetto: il cubo arancione, sparso nell'hero, che cade fra due mani nel problema, passa di mano nel metodo e viene alzato come un trofeo nel finale.

La pelle è vincolata dal cliente e allineata al riferimento sharpify.io: near-black freddo, gerarchia fatta con l'opacità del bianco e non con una palette, DM Sans al display a peso 500, raggi 2/8/12/999px. Il DNA che resta di Sales Process: l'arancio `#FF8200`, il mark a moduli, il payoff FATTURARE ×3, le fotografie con le mani in bianco e nero e l'oggetto arancione (anche quelle generate del giro 3, scontornate dalla luminanza: galleggiano sul palco senza scatola), la voce italiana diretta. Densità media-bassa, respiro di sezione fluido (60px a 360px, 112px di tetto), contenitori da 980 a 1400px.

Una pagina lunga si legge **a capitoli** (giro 4). La home è una copertina (hero, loghi), sei capitoli in ordine di racconto (01 Il problema · 02 La soluzione · 03 Il metodo · 04 I risultati · 05 Le persone · 06 Il podcast) e una chiusura (dove siamo, finale); l'ordine è scritto nel commento in testa a `pages/index.html`. Ogni capitolo apre con un segnacapitolo e un h2, le sezioni che lo continuano hanno un h3 un gradino sotto, e il palco cambia luce una volta per capitolo, non per sezione. Il sistema rifiuta la pila di blocchi con la stessa dissolvenza su ogni sezione, le card tutte uguali, l'occhiello sopra il titolo di sezione (maiuscolo spaziato o no), il quadratino tinto d'accento sotto le icone, il magnetic hover e il tilt 3D da cartolina, il bianco su arancio.

Il movimento è texture, non collezione di effetti: tre gesti, ciascuno con il suo asse, e una curva d'ingresso per blocchi e testo (`cubic-bezier(.16,.84,.24,1)`, `--ease-salita`). **Il gradino** (materia): foto e pannelli vengono scoperti da quattro colonne sfalsate che salgono (`.scalinata`, anche nel passaggio fra le pagine). **La riga** (testo): le parole salgono in verticale dentro una maschera, oppure restano ferme e si accendono alla linea di lettura (`[data-accendi]`); lo split è fatto al build in entrambi i casi e il testo non entra mai in diagonale. **La luce** (interazione e racconto): una luce radiale segue il cursore su CTA, card e palco; la superficie resta ferma. Il cursore del sistema resta sempre visibile: lo accompagna solo un anello a quadrato arrotondato, e le fotografie scivolano di pochi pixel in senso opposto al puntatore (la profondità). Nel finale la stessa luce lascia il cubo e va ad accendere il CTA. Le scene fotografiche si muovono legate allo scroll (`animation-timeline: view()`), sempre lineari: le mani della caduta, la staffetta, il braccio del finale, gli schermi delle testimonianze. Le griglie entrano con una citazione della diagonale (`--dx` = −0,45 × `--travel`), solo movimento. Il 3D (three.js, una build ridotta servita dal sito) vive nell'hero della home e, dal 15.10, nell'elica del DNA; scaricato dopo il load, fermo fuori viewport o sotto il menu, mai a movimento ridotto né in risparmio dati. L'elica è solo desktop con puntatore fine; l'hero dal 16.10 anche sul telefono, alleggerito (120 contatti, 1,4x, il marchio grande quanto quello DOM, la luce che gira da sola senza cursore) e con i programmi WebGL compilati in parallelo prima del primo fotogramma. Dal 15.10 («più effetti 3D al sito») c'è anche un 3D di CSS, legato allo scroll e mai al cursore: le parole dei titoli si alzano ruotando sul loro piede dentro la maschera; i pannelli dei reparti, le tre righe del finale e i ritratti dei fondatori si alzano dal tavolo (rotateX sul bordo basso); i numeri del conto cadono come palette di un tabellone; le foto d'apertura delle pagine interne arretrano in profondità quando escono; il nastro delle schede e la squadra della home girano a ventaglio (le card ai lati guardano il centro e arretrano); il cubo della staffetta è un cubo vero, a sei facce, che rotola lungo la linea. A movimento ridotto niente di questo si muove.

Il giro 3 degli effetti ha aggiunto le coreografie che legano le pagine fra loro, sempre dentro quei tre gesti: la fotografia del menu che **vola** nell'apertura della pagina scelta, il **bottone che diventa la pagina** della candidatura, l'hero che **arretra**, il numero del capitolo che **si posa**, il **numero a rullo**, il **cubo sul filo** della staffetta su telefono, il **finale fermo** su desktop. Le coreografie fra documenti hanno curve proprie (vedi Il passaggio fra le pagine); l'ingresso di blocchi e testo resta `--ease-salita`. A movimento ridotto il sito è fermo: restano solo le dissolvenze.

I ritocchi del 15.10 hanno aggiunto la regia attorno alle pagine, con gli stessi materiali (il logo vero, i quattro gradini, la particella, la luce arancione): **il sipario** (un preloader corto alla prima pagina della sessione, e il passaggio di ripiego dove mancano le View Transitions), il **logo sul buio** fra una pagina e l'altra, **l'anello del cursore**, **la profondità**, **la polvere** nel palco e **la lama di luce** sui confini fra le stanze. Una revisione della regia li ha tenuti corti e cedevoli: il cursore del sistema non si nasconde mai, il preloader si alza a 0,45s, si salta al primo gesto e non trattiene l'apertura della pagina.

**Key Characteristics:**
- Un fondo continuo con sette atmosfere in dissolvenza incrociata (1100ms), una per capitolo, accese da un IntersectionObserver sulla fascia centrale del viewport.
- Un solo accento, `#FF8200`, usato come luce; testo scuro `#100F12` su ogni fill arancione.
- Una sola famiglia, DM Sans variabile ospitata in casa; nessun serif, nessun monospace.
- Due livelli di titolo e basta: h2 che apre un capitolo, h3 che lo continua.
- La particella del marchio come modulo di elenchi, campi a unità, sedie, chiuse; il cubo come filo fotografico della home.
- Tre gesti di motion, una curva d'ingresso, reduced-motion gestito a token (il travel va a zero, la dissolvenza sopravvive); i passaggi fra le pagine sono View Transitions fra documenti con nomi dati al volo, e dove mancano il sipario a quattro gradini.
- Un sito statico e leggero: Lighthouse mobile 95–98 anche con il sipario (Home 95, Metodo 97, Candidatura 98), accessibilità 100, CLS 0 su ogni pagina misurata.
- Bersagli touch ≥ 44px (`--tap`) su ogni puntatore grossolano; nessun testo sotto 12px.

## 2. Colors: La luce sul palco

Un palco neutro e freddo, quasi nero, e una famiglia calda di arancio che fa da luce; il resto è bianco a opacità diverse.

### Primary
- **Arancio Sales Process** (`arancio`): il brand. Fill del CTA di conversione (la candidatura), particella, mark, cubo, unità dei numeri, contorno dei numeri di capitolo, barra di avanzamento, filo della pagina corrente nel menu, contorno di focus (`outline: 2px` con offset 3px), selezione di testo, cursore dei campi. È satura al massimo e non ha headroom: non esiste un arancio più brillante.
- **Arancio Caldo** (`arancio-caldo`): l'arancio dei testi piccoli (numero del capitolo nella nav, tipo nelle righe d'indice, ruoli, date, dettagli dei passaggi, testo della pill d'apertura) e dell'hover dei link (9,3:1 sul fondo); scende anche sugli accenti nell'atmosfera fredda "notte". Già desaturato: mai come fill.
- **Arancio Pressato** (`arancio-pressato`): hover e active dei fill arancioni. L'interazione scurisce il fill invece di schiarirlo.
- **Brace** (`arancio-brace`): la massa degli aloni e delle atmosfere calde (scritta come `rgba(184,91,0,…)` nei gradienti del palco, del finale, della card del menu e nel bagliore del pavimento del sipario).
- **Inchiostro su Arancio** (`su-arancio`): l'unico colore di testo ammesso su un fill arancione, e anche il testo del CTA bianco.

### Tertiary
- **Rosso Perdita** (`rottura`): solo il colore della perdita, rosso caldo nella famiglia dell'arancio (era il lampone `#CC3366` fino al giro 2). Lo zero vuoto del conto 4 → 3 → 0 (solo contorno, 2px), le frecce dei passaggi rotti, la luce rossa dell'atmosfera "fuoco", la squalifica del form (fondo al 10%, bordo al 28%), i punti `lista--no` a triangolo.
- **Verde Numero Verde** (`ok`): le liste di ciò che rientra (`lista--ok`), per convenzione italiana il colore del numero verde. Il numero verde stesso (dal 20.10) è il badge del cliente con il suo verde: il token non lo ridipinge.

### Neutral
- **Base Fredda** (`fondo-base`): il fondo del 90% della pagina e del palco; bianco sopra = 17,9:1.
- **Nero Palco** (`nero-palco`): l'atmosfera "nero" (hero, loghi, aperture interne, footer), su cui l'oggetto arancione si legge come luce.
- **Fondo Menu** (`fondo-menu`): la card del menu, opaca, con una brace radiale al 20% dietro le anteprime. Opaca di proposito: una card semitrasparente sopra l'hero mescolava due titoli.
- **Bianco Riferimento** (`testo-1`): titoli e testo primario. **Testo 2** (80%) corpo e deck; **Secondo tempo** (`testo-segue`, 68%) solo il secondo tempo dei titoli; **Testo 3** (56%) meta, didascalie, fonti, descrizioni d'indice; **Testo 4** (40%) solo testo ≥ 24px o glifi (i numeri quieti dei principi DNA).
- **Superfici 1/2/3** (bianco al 4/6/9%): card, form, campi. Mai grigi opachi: ogni superficie resta trasparente alla luce che le passa dietro.
- **Velo Nav** (`velo-nav`): nav velata e piastra CTA mobile, con `backdrop-filter: saturate(140%) blur(18px)`; pieno `#121115` con reduced-transparency. **Velo Menu** (`velo-menu`, nero al 58% con blur 6px; 86% senza blur in reduced-transparency): copre la pagina sotto la card.
- **Filo / Filo Forte** (bianco al 12% / 20%): filetti, divisori, il filo del segnacapitolo, la riga in testa a conto, indici e registri. **Bordo UI** (34%, 3:1): il contorno di tutto ciò che è cliccabile (outline CTA, bottone Menu, chip, campi, social). **Bordo Arancio** (arancio al 42%): stato acceso di chip, pannelli dei reparti, palco della sala.

Le sette atmosfere del palco (in `sfondi.css`, non token): **nero** `#020202`; **brace** veletta calda dall'alto a sinistra su `#1D1714→#161519`; **alba** luce dal bordo basso su `#141317`; **radente** luce rasa da sinistra su `#161519`; **notte** l'unica fredda, acciaio `rgba(44,58,84)` su `#111318`; **pozzo** `#060607` con una luce d'angolo; **fuoco** rosso perdita `rgba(240,75,58,.20)` + arancio su `#2A1510→#161519`, sotto il contro-esempio. Una vignettatura comune (`rgba(0,0,0,.42)` ai bordi) le fa leggere come una stanza. Nella home: copertina nero, 01 fuoco, 02 alba, 03 radente, 04 brace, 05 pozzo, 06 notte, finale alba. Sopra le atmosfere, nello stesso palco, vive la polvere e sui confini passa la lama di luce (vedi Elevation); ad alto contrasto la polvere si spegne con le atmosfere.

### Named Rules
**The Light Rule.** L'arancio è luce, non vernice: sotto il 3% dei pixel. Nei titoli compare in una sola parola dell'H1 di ogni pagina e nella terza riga del payoff; ogni `h2 .ar` torna al colore del titolo (`h2 .ar { color: inherit }`), anche nei titoli futuri.

**The Dark-on-Fill Rule.** Testo bianco su arancio è vietato (2,49:1). Su ogni fill arancione, barra annuncio e selezione comprese, il testo è `#100F12`. L'hover dei fill scurisce a `#E87300`; non schiarisce mai.

**The One Orange Button Rule.** Il fill arancione è della candidatura, la conversione del sito (nav, piastra mobile, piede del menu, chiuse). Ogni altro invito primario è bianco: il canale YouTube del podcast, l'hero. Due bottoni arancioni nello stesso schermo sono un errore. La barra in cima non ripete il bottone: il suo invito è una frase sottolineata con la freccia. Tre inviti identici nella prima schermata (barra, nav, hero) sono un difetto, non un'enfasi. La regola la fa rispettare il sito stesso (dal 15.10): quando a schermo c'è un invito arancione della pagina (una chiusa, il finale, il form, la sala) il bottone della nav diventa un contorno (`html.cta-gemello`) e la piastra del telefono scende; il play dei video è bianco. Sulla pagina della candidatura nav, barra e piastra portano al form (`#candidatura`), in Eventi la piastra dice «Prenota il posto» e porta alla sala.

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
- **Payoff** (700, `clamp(52px, 7.4vw, 118px)`, 0,9, −0,035em, maiuscolo): solo FATTURARE ×3 nel finale, a filo sinistro, terza riga arancione. È un titolo di coda, non un messaggio. Nel finale fermo su desktop va a tutta scala, `clamp(72px, min(12.4vw, 19vh), 210px)` con interlinea 0,86; in colonna (≤ 900px) prende tutta la larghezza, `clamp(52px, 18vw, 150px)`, come un manifesto.
- **Capitolo** (600, `clamp(52px, 5.2vw, 84px)`, 0,8, −0,045em, cifre tabulari, contorno `-webkit-text-stroke: 1.5px` arancio con un velo d'arancio al 16% dentro): il numero del segnacapitolo; il nome accanto a 500 `clamp(17px, 1.3vw, 20px)` in Testo 1. La stessa voce, a 700 `clamp(46px, 4.4vw, 64px)`, −0,05em, e **vuota**, solo contorno 1,5px arancio, numera i reparti della staffetta (i «numeri fantasma», decisione del cliente): pieno = capitolo, vuoto = reparto, perché su telefono «03 Il metodo» e «01 Pubblicità» stanno nello stesso schermo. Il tetto di 64px tiene il numero del reparto sempre sotto quello del capitolo (84px).
- **Numero** (700, `clamp(64px, 7.6vw, 124px)`, 0,86, −0,045em): le cifre dei numeri a unità, composte dal rullo (vedi I numeri a unità); i fatti degli Eventi a `clamp(52px, 5.6vw, 88px)`; il conto 4 → 3 → 0 a 600 `clamp(76px, 8.4vw, 136px)`, 0,84. L'unità a 0,32–0,36em in arancio, subordinata.
- **Frase** (600, `clamp(26px, 2.9vw, 46px)`, 1,16, −0,022em, max 30ch, Testo 2 con la parte che pesa a 700 Testo 1): la frase del costo che chiude il contro-esempio, in home e nel Metodo; si accende parola per parola. Stessa funzione, a 500 `clamp(30px, 4vw, 60px)`, per la chiusa del manifesto del DNA.
- **Headline** (500, `clamp(36px, 4vw + 6px, 64px)`, 1,06, −0,02em, word-spacing .03em, max 22ch): l'h2 che apre un capitolo o una sezione di pagina interna. **Headline-sm** (500, `clamp(22px, 3.2vw, 44px)`, 1,16, −0,02em): l'h3 delle sezioni che continuano un capitolo. I minimi (36 / 22px) tengono due livelli leggibili anche su telefono.
- **Voce del menu** (500, `clamp(36px, min(7.2vh, 6.2vw), 92px)`, 1, −0,035em; `clamp(34px, 10.5vw, 54px)` sotto 900px): i nomi delle sette pagine nella card del menu.
- **Title** (500, `clamp(21px, 2.1vw, 27px)`, 1,22, −0,02em) e **Title-card** (700, 17px, 1,32, −0,01em): titoli di blocco e di card/persona. I titoli di colonna del conto e d'indice stanno fra 21 e 36px a 500.
- **Deck** (400, `clamp(16px, 1.25vw, 19px)`, 1,58, max 58ch, Testo 2): il sommario sotto i titoli.
- **Body** (400, 16px, 1,62, max 64ch, Testo 2) e **Body-sm** (400, 15px, 1,54, +0,01em).
- **Label** (500, 15px, 1,35, −0,005em, in tondo, Testo 3): etichette di gruppo che non stanno sopra un titolo (la riga sopra i loghi, i blocchi di "Dove siamo"), precedute da una particella di 8px. Il menu non ha descrizioni: solo i nomi delle pagine (15.10).
- **Meta** (500, 13px, 1,45, tracking 0, cifre tabulari, Testo 3): fonti, date, legende, filtri, note. Le etichette dei campi stanno a 600 13px.

### Named Rules
**The One Family Rule.** Solo DM Sans. Instrument Serif è ritirato (giro 2), IBM Plex Mono è escluso per decisione del cliente, nessun monospace. Mai animare `font-weight` o `font-variation-settings`.

**The Two Levels Rule.** Un titolo per sezione, e due soli livelli: h2 `t-d2` che apre, h3 `t-d3` che continua. Un h3 non supera mai l'h2 del suo capitolo, un numero interno (i reparti della staffetta) non supera su telefono il numero del capitolo che lo contiene, e nessuna risoluzione dentro un capitolo (il payoff del tetto, a `clamp(30px, 4.4vw, 64px)`) supera il suo titolo.

**The Second Beat Rule.** Quando un titolo è una frase in due tempi, il secondo tempo (`.segue`) scende di un gradino di luce, a `rgba(255,255,255,.68)`: uno, non due (a 56% si spegneva sulle luci calde). Niente caps + corsivo, niente secondo corpo, niente arancio.

**The No Label Above Rule.** Il titolo dice di cosa parla la sezione, il sommario dice perché; sopra il titolo non c'è niente. Un'informazione che stava in un occhiello entra nel sommario o nell'etichetta (i numeri dicono «Imprenditori seguiti, dal 2020», con il «quando» in Testo 3 dentro la stessa riga). L'unico segno sopra un h2 è il segnacapitolo, che è un indice.

**The 12px Floor Rule.** Nessun testo sotto 12px. Le etichette di servizio stanno a 12–13px, in tondo; il maiuscolo spaziato non esiste nel sito (il payoff maiuscolo è un titolo, non un'etichetta).

**The Flat Digits Rule.** Le cifre hanno letter-spacing 0 nelle etichette e `font-variant-numeric: tabular-nums` dichiarato ovunque: tracciare i numeri fa oscillare le colonne. Il sottoinsieme di DM Sans servito però non ha cifre tabellari, quindi la dichiarazione non allinea niente: dove una colonna di cifre deve restare ferma (il rullo) le larghezze sono misurate cifra per cifra in `dati.js` (`LARGO`, in em a 700 e −0,045em).

**The Lit Word Rule.** Una frase che si accende (`[data-accendi]`) parte da Testo 4 (40%, 3,8:1 sul palco): è ammessa solo su testo ≥ 24px, dove 3,8:1 supera la soglia AA anche prima di accendersi. Le parole non si muovono, cambia solo il colore.

## 4. Elevation

Il sistema non costruisce profondità con le ombre: la costruisce con la luce. La profondità viene dal palco (atmosfere, vignettatura, una torcia arancione da 1000px al 7,5% che segue il mouse dietro il contenuto), dall'alone radiale a tre strati che scende dall'alto dietro hero e aperture interne, dalla brace che sale dal pavimento nel finale, e dalla scala di opacità delle superfici. Le fotografie non hanno scatola: fondo trasparente, sfumano in basso o ai bordi con una maschera. Le card sono piatte: filo al 12%, superficie al 4%, e al passaggio salgono di un gradino di luce, non di quota. L'unico livello davvero sopra la pagina è il menu: velo nero sfocato, poi la card opaca. Le ombre esistono solo dove un oggetto deve sembrare un volume fisico (i blocchi dei reparti sotto il tetto, il pulsante play dei video, i libri, i ritratti del marchio fatto di volti, i cubi dell'hero) o come alone arancione di un elemento acceso.

Il palco ha due segni propri (15.10). **La polvere** (`.palco__polvere`, scritta dal build con posizioni deterministiche): dodici quadrati del marchio su due piani, sei lontani (3,5–5px, bianco all'8–14%) e sei vicini (5–7,5px, 10–18%), raggio 26%; tre sono arancioni (opacità × 1,8, con un alone). Salgono con lo scroll della pagina (`animation-timeline: scroll(root block)`, lineari: 16–40vh il piano lontano, 45–95vh il vicino) e col mouse scivolano con la profondità (8 e 24px al massimo); nessun ciclo infinito, si muovono solo se si muove la pagina o il cursore. **La lama di luce**: un filo di 1px in testa a ogni sezione che cambia la luce del palco (`main > .sf:not(.sez--segue):not(:first-child)`, e `#metodo` dentro il pin-spacer della staffetta fissata), sotto il contenuto. Con `view()` si allarga dal centro (scala .15 → 1), si accende quando il confine passa a metà schermo e poi scende a .15; senza, resta ferma a .3. Non è un filetto fra due sezioni: è luce che attraversa la soglia, solo dove la stanza cambia.

### Shadow Vocabulary
- **Alone di pagina** (`--alone`: tre `radial-gradient` arancio/brace a 0,26–0,30 da 50% in alto): dietro hero e aperture interne. Dipinto una volta, mai animato. Versione fioca `--alone-fioco` dietro tetto, candidatura e fasce `sez--alone`.
- **Luce accesa** (`box-shadow: 0 0 16px rgba(255,130,0,.6), 0 0 52px rgba(255,130,0,.32)`): la trave del tetto.
- **Faccia illuminata** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 14px 22px -14px rgba(0,0,0,.7)`): i blocchi dei reparti sotto il tetto, illuminati da sopra.
- **Volto posato** (`box-shadow: 0 18px 40px -18px rgba(0,0,0,.8)`): i ritratti del marchio fatto di volti.
- **Anello di focus dei campi** (`box-shadow: 0 0 0 3px rgba(255,130,0,.18)` con bordo arancione).
- **Bordo acceso** (`box-shadow: inset 0 0 0 1px rgba(255,130,0,.42)`): hover delle schede persona.
- **Cubo acceso** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 0 16px rgba(255,130,0,.55)`, fill `linear-gradient(145deg, #FFA24A, #E06F00)`): il cubo del marchio che percorre la linea della staffetta.
- **Luce del CTA** (`radial-gradient(closest-side, rgba(255,130,0,.40), transparent)`, 380×190px, dietro il CTA del finale): la luce che lascia il cubo e accende l'ultimo invito.
- **Lama di luce** (`linear-gradient(90deg, rgba(255,150,60,0), rgba(255,150,60,.55) 50%, rgba(255,150,60,0))` alto 1px, con `box-shadow: 0 0 28px 3px rgba(255,130,0,.16)`): il confine fra due stanze del palco.
- **Polvere accesa** (`box-shadow: 0 0 10px rgba(255,130,0, o × 1,4)`): i tre quadrati arancioni della polvere.
- **Bagliore del sipario** (`radial-gradient(60% 100% at 50% 100%, rgba(184,91,0,.22), transparent 70%)`, sul 40% in basso): un solo bagliore a tutta larghezza sotto i quattro gradini.

### Named Rules
**The Continuous Stage Rule.** Le sezioni non dipingono un fondo: il fondo è il palco, e cambia una volta per capitolo. Si anima solo l'opacità dei livelli del palco (compositor), mai un gradiente, mai un blur su area grande. Ad alto contrasto le atmosfere si spengono. I filetti esistono dentro le sezioni (in testa a un indice, a un conto, a un registro), mai come confine fra due sezioni. Sul confine passa solo la lama di luce, e solo dove la stanza cambia: è luce arancione che si accende con lo scroll, non un divisore grigio.

**The Light-Not-Lift Rule.** Una superficie risponde al passaggio illuminandosi dove si trova il cursore (radiale bianco 7,5% + arancio 5%, 340px), non sollevandosi con un'ombra. Spostamento massimo 3px in ogni hover del sistema, fuori dalle voci del menu e dell'indice che fanno un passo laterale. La profondità non è un hover: è la parallasse di tutto lo schermo rispetto al puntatore, su `transform`, e non solleva mai una superficie.

## 5. Components

### Buttons
Tutti pill, fermi e luminosi: il bottone non va verso il cursore, si illumina dove sei.
- **Shape:** pill (999px), altezza 50px, padding orizzontale 26px, DM Sans 700 15px. Variante compatta 44px / 18px / 14px; in nav 42px / 20px / 14px (44px su touch); nel piede del menu sotto 900px e nella piastra mobile a tutta larghezza (52–54px).
- **Arancio (conversione):** solo la candidatura. Fill Arancio, testo Inchiostro su Arancio; hover a Arancio Pressato e lift di 2px. Con `.cta--luce` (solo mouse, senza reduced-motion) una luce bianca/arancio segue il cursore dentro il bottone in `mix-blend-mode: screen`, con alone sfocato dipinto una volta.
- **Bianco:** fill `#F8F8F8`, testo `#100F12`; hover bianco pieno e lift di 2px. È l'invito primario di tutto ciò che non è la candidatura (hero, canale YouTube del podcast con il suo segno SVG a 22px).
- **Outline:** bordo UI 1px, testo Testo 1; al passaggio un velo arancione (16%→8%) si riempie da sinistra con `scaleX` e il bordo si accende d'arancio.
- **Testo:** senza contenitore, peso 500, min-height 24px (44px su touch).
- **Il bottone diventa la pagina:** ogni `a.cta` verso `/candidatura.html` fuori dal menu (nav, hero, piastra, finale) riceve al clic il nome `cta-pagina`; la candidatura dà lo stesso nome alla sua apertura (`.testa-pag`). Il pannello si allarga in 620ms dal bottone all'apertura, passa per il buio della pagina (`--c-base`) e i raggi da 999px a 0. Dal bottone arancio (tipo `cta-ar`) la scritta sparisce subito, il pannello È il bottone; dal bottone bianco dell'hero (tipo `cta-bianco`) il pannello parte già buio. La pagina nuova compare solo sul buio, mai sull'arancio: nessun testo bianco su arancio, nemmeno per un fotogramma.
- **Active:** `scale: .985`, nessun lift. La particella dentro un CTA fa un gradino lungo la diagonale (3px, −2px); la freccia SVG (mai il glifo unicode) fa un passo di 3px nella sua direzione.

### Chips
- **Style:** pill 38px (44px su touch), 500 14px in tondo, Testo 2, bordo UI 1px, fondo trasparente.
- **State:** hover Testo 1 su Superficie 2; premuto (`aria-pressed`) testo Arancio, fondo arancio al 10%, Bordo Arancio.

### Cards / Containers
Le card sono poche e servono dove c'è un oggetto da maneggiare (schede persona, video, form); i contenuti in sequenza si mettono in fila tipografica, non in scatola (indici, conto, numeri, servizi, principi).
- **Pannelli dei reparti:** una fotografia per reparto, a tutta altezza sotto un velo nero, con numero, nome e una riga di descrizione in basso; il soggetto della foto può cambiare, la forma no. Il taglio è per reparto (`--pos` in `dati.js`, sulle mani al lavoro: il reclutamento a `94% 35%`, sulla cartellina arancione); su telefono un taglio «stretto» già centrato (`<picture>`).
- **Le infografiche dei servizi** (`.si`, dal 15.10, «qui vorrei delle icone animate, o almeno delle piccole infografiche»): ogni servizio apre con una scena di circa due secondi su una tela 96×48 (88×44 su telefono), con il tratto delle icone (1,6, terminali arrotondati), le linee in bianco al 44% (66% al passaggio) e il soggetto in Arancio: la particella del marchio, cioè il contatto, la trattativa, il titolare. Il processo si costruisce e un contatto lo attraversa fino alla firma; nella pipeline una trattativa passa all'ultima colonna; all'obiezione segue la risposta scritta; il cartellino si posa e lo scudo lo difende; l'ago della bussola si ferma sul numero finale; quattro settimane salgono oltre la linea del mese; nella griglia dei contatti spenti cinque si risvegliano con un'onda; la guida sale due gradini con il titolare, poi lui fa l'ultimo da solo. Il disegno è lo stato finale: la scena parte a schermo (IntersectionObserver al 60%; 140ms fra le quattro voci di una riga, nessuna attesa nella galleria del telefono) e si ripete al passaggio del mouse, solo a scena finita. Tempo e non scroll, curve `--ease-salita`, salti con salita in uscita e discesa in entrata, nessun ciclo infinito, nessun riquadro tinto sotto. A movimento ridotto la scena è già finita.
- **Gli otto servizi su telefono** (≤ 640px): una galleria orizzontale nativa (scroll-snap, carte da 12px con Filo), senza ingresso a scroll; sotto, un filo di 2px su Filo che si riempie d'arancio con lo scorrimento (`scroll-timeline: --servizi inline`, `timeline-scope` sul contenitore): dice quanto resta.
- **Le testimonianze: un lettore e la sua scaletta** (`.video--lettore`, dal 15.10): a sinistra (8/12) il video scelto, grande; a destra (4/12) le cinque testimonianze in fila (`.video__voce`: bottoni con miniatura 16:9 da 112px, nome in 500 e «Cliente Sales Process» in Meta, raggio 12px, Filo). Si sceglie e il video parte lì con un clic solo; il palco cambia con una dissolvenza e una scala da .985 (380ms). Quella in onda ha il filo arancione a sinistra (`inset 3px 0 0`), il bordo arancio al 55% e la miniatura a colori (le altre al 70% di grigio); `aria-pressed` dice quale. Il player resta a facciata, nessun iframe prima del clic. Sotto 900px la scaletta va sotto il video. Dal 16.10 lo stesso lettore è anche in Risultati, fra i numeri e il caso per intero, sul palco spento (nero).
- **Il palco delle testimonianze** (`.video > .video__palco`) entra come uno schermo posato sul tavolo e si alza in piano mentre sale (`schermo-alza`: `perspective(1200px) translateY(56px) rotateX(20deg) scale(.96)` → `none`, lineare, entry 0% → cover 45%). Prospettiva per elemento, nessuno strato 3D permanente; a movimento ridotto fermo. È un ingresso legato allo scroll, non un tilt al cursore.
- **Le schede dei clienti** (`.scheda`, nastro di Home e Risultati): in testa solo il logo del cliente (dal 15.10: niente settore, città né fonte), alto fino a 46px in una fascia di 76px chiusa da un filo; poi il grafico a unità prima/dopo, l'intervallo di fatturato, il tempo. Lo spazio dei dettagli è sempre riservato, così le schede restano alte uguali. Entrano a ventaglio quando la fascia sale (`scheda-entra`: da 64px sotto, ruotate di 2,5°, trasparenti; sulla timeline `--nastro`, 7% di ritardo per scheda). Quella che passa al centro si accende (`.is-centro`: bordo arancio al 50%, la torre del «dopo» ricresce dal basso con un `clip-path` in 1,1s, i dettagli si aprono): sul nastro automatico lo decide il carosello, dove il nastro è uno scorrimento nativo un IntersectionObserver sulla fascia centrale (16%). Al passaggio del mouse sale di 6px.
- **Ritratti che mancano:** chi non ha ancora la foto ha le sue iniziali nello stesso riquadro (`.pers__mono`, `.volto__mono`): 700 `clamp(64px, 7vw, 96px)`, vuote, contorno 1,5px bianco al 28%, su un buio radiale `#2A2730 → #121115`. Un segnaposto dichiarato, mai un volto inventato.
- **Corner Style:** 12px per card, schede e pannelli dei reparti; 20px per pannelli grandi (form, filtro, mappa); 22% del lato per ritratti e sedie (il raggio del marchio).
- **Background:** Superficie 1, Superficie 2 al passaggio; i pannelli fotografici su `#0B0A0C` con un velo nero dal 32% in giù.
- **Shadow Strategy:** piatte; luce al cursore (vedi Elevation).
- **Border:** Filo 1px, Filo Forte al passaggio; i pannelli dei reparti si accendono a Bordo Arancio.
- **Internal Padding:** 24px (`s-5`) per card e schede, 32px (`s-6`) per form e pannelli.
- **Icone:** nude, un tratto SVG a 1,75 di spessore, 26–30px, in arancio; solo dove nominano un reparto (staffetta, tetto). Gli otto servizi hanno invece le loro infografiche animate (sopra). Nessun quadratino tinto sotto.

### Inputs / Fields
- **Style:** 52px, Superficie 1, bordo UI 1px, raggio 8px, 400 16px, testo Testo 1; label sempre visibile sopra (600 13px, Testo 2), mai il placeholder come label.
- **Focus:** bordo Arancio, fondo arancio al 4%, anello `0 0 0 3px` arancio al 18%.
- **Error:** la squalifica in tempo reale è un riquadro Rosso Perdita al 10% con bordo al 28%, raggio 8px, che entra con il gesto di testa.

### Navigation
- **Barra annuncio** (dal 15.10 un invito a collaborare): fissa in cima, 40px (44px su touch), gradiente `#C56200→#FF8200→#FF9A38`, testo `#100F12` 700 13px; l'intera fascia è un solo link verso la candidatura: un quadratino fermo `#4A2200` da 7px, «Vuoi collaborare con noi?» e l'invito «Candida la tua azienda» con la freccia SVG. L'invito è **una frase sottolineata, non una pill** (sottolineato 1,5px a `rgba(16,15,18,.45)`, pieno al passaggio, la freccia fa un passo di 3px): con la pill la prima schermata aveva tre «Candida la tua azienda» identici. Sotto 420px dell'invito resta solo la freccia, perché il bersaglio è già tutta la fascia. Chiusura in un bersaglio 44px, ricordata in `localStorage` con la chiave `barra-collabora` (nuova: chi aveva chiuso l'annuncio dell'evento vede l'invito, che è un altro messaggio).
- **Nav:** 76px (60px sotto 1100px), trasparente sull'hero, velata (Velo Nav + blur, filo in basso) dopo 48px di scroll con isteresi a 12px; sotto 1100px sempre su Base Fredda. Contiene solo tre cose: il marchio (il lockup intero, vedi Il logo), il CTA arancione della candidatura e il bottone **Menu**. Nessuna voce in linea. Sotto 620px il CTA esce dalla nav (lo porta la piastra) e il bottone resta un quadrato da 44px con i soli due tratti.
- **Capitolo corrente** (solo da 1101px, solo con la nav velata): fra marchio e comandi, dopo un filo verticale Filo Forte di 20px, il numero del capitolo (600, Arancio Caldo, tabulare) e il nome (500 14px, Testo 2). Lo decide la sezione `[data-cap]` che attraversa la linea mediana; entra con una salita di 6px e una dissolvenza (`--t-stato`). È `aria-hidden`: ripete il segnacapitolo, non lo sostituisce.
- **Bottone Menu:** pill 44px, bordo UI, fondo bianco al 3% (7% al passaggio, bordo a Testo 2), «Menu» 600 14px e due tratti da 1,6px (il secondo corto, 12px, si allunga al passaggio). Nella card diventa «Chiudi» e i tratti ruotano in una ×.
- **Piastra mobile:** sotto 620px una piastra fissa in basso (Velo Nav + blur) porta il CTA arancione a tutta larghezza (52px); si nasconde sopra l'apertura e quando a schermo c'è già un invito arancione della pagina. Passata l'apertura, sul telefono la barra in cima esce e la nav sale al suo posto (`html.barra-via`).
- **Footer:** sei colonne; la prima porta il logo intero, che scala dentro la colonna fino a 222px di larghezza senza deformarsi (`width: min(100%, 222px); height: auto`; con l'altezza in linea era schiacciato del 5%). Voci 400 14,5px Testo 3 con passo di 3px al passaggio, social in quadrati 44px raggio 8px. La riga legale (400 13px, Testo 3) dice la società per intero, senza segnaposto: © 2026 Sales Process S.r.l., P.IVA e C.F., REA, capitale sociale, Privacy e Cookie Policy, data dei dati. Si chiude con quattro particelle arancioni da 9px montate a scalinata.

### Il logo
Il file vero del cliente, mai ridisegnato e mai tagliato: ovunque il lockup intero (marchio completo, nome e payoff), dalla variante a misura `logo-full-h112.webp` (461×112, `tools/immagini.mjs`), scritto dal build (`LOGO(h)` in `tools/build.mjs`). Nella nav e nella testa del menu alto 40px, 34px sotto 1100px, 30px sotto 620px; nella nav non è differito (sta sopra la piega), altrove `loading="lazy"`. Nel footer scala intero dentro la colonna. Lo stesso file sta al centro del sipario (`min(58vw, 280px)`) e sul buio del passaggio fra le pagine (`min(46vw, 230px)`). La vecchia variante della nav era il file tagliato in altezza per togliere il payoff, e il taglio mozzava l'ultimo quadrato del marchio.

### Il menu: la card gigante
Un dialogo vero, uguale su tutti gli schermi, che nasce dal bottone.
- **Forma:** card fissa a 8–14px dai bordi, raggio 28px (22px sotto 900px), Fondo Menu opaco con una brace radiale, bordo Filo Forte. Sotto, un velo sulla pagina (Velo Menu) come `::before` del dialogo; la nav sotto il velo si spegne (opacity 0), così il marchio non si sdoppia.
- **Apertura:** la `clip-path` parte dal rettangolo del bottone Menu, misurato in JS all'apertura (`--da`, `inset(...) round` metà altezza del bottone), e si apre a `inset(0 round 28px)` in 680ms `--ease-salita`. Alla chiusura rientra nel bottone in 420ms `--ease-uscita`: l'uscita è più veloce dell'ingresso. Il velo sfuma in 320ms all'apertura, 240ms con 120ms di ritardo alla chiusura.
- **Voci:** le sette pagine a corpo da titolo (Voce del menu, Testo 2), solo i nomi: dal 15.10 nessuna descrizione accanto. Salgono di 26px a gradini (170ms + 45ms per voce). Sopra l'elenco le altre voci si spengono a `rgba(255,255,255,.48)` (~5:1 sul fondo della card); la voce scelta torna Testo 1, fa un passo di .36em a destra e una particella arancione si accende nel margine davanti. La pagina corrente è Testo 1 con un sottolineato arancione da .05em. Fuoco: anello arancio 3px stretto sulla parola, raggio 6px.
- **Anteprime:** a destra (5/12) la fotografia della pagina sotto il cursore o il fuoco, maschera in basso, dissolvenza e scala da .96; uscendo dall'elenco torna quella della pagina corrente. Il Team mostra i cinque volti disposti come i quadrati del marchio. Le immagini si scaricano alla prima apertura, non al caricamento.
- **Piede:** filo in testa, CTA arancione della candidatura, mail, indirizzo, social 44px; entra per ultimo (420ms con 480ms di ritardo).
- **Comportamento:** fuoco su «Chiudi» all'apertura, Tab che gira dentro la card, Esc, clic sul velo o su un link chiudono; il fuoco torna al bottone. Con il menu aperto ogni altro figlio del `<body>` è `inert` (Safari col Tab usciva verso i bottoni dietro la card) ed Esc è ascoltato sul documento, quindi chiude anche se il fuoco è caduto sul `<body>`. `html.menu-aperto` blocca lo scroll con `scrollbar-gutter: stable` (nessun salto della barra). Tornando dalla cache del browser il menu è chiuso e una partenza interrotta viene azzerata.
- **La partenza:** al clic su una voce verso un'altra pagina il menu non si chiude: la voce scelta resta accesa (passo e particella), le altre scendono a .18 in 220ms, l'anteprima accesa riceve il nome della foto d'apertura della pagina nuova e vola (vedi Il passaggio fra le pagine). La card ha un nome suo (`menu-card`), sta sopra nav e barra e si dissolve in 180ms (opacità e scala .985), così il logo non si sdoppia e «Chiudi» non resta sopra «Menu».
- **Sotto 900px:** una colonna, niente anteprime, l'elenco scende verso il pollice sopra il CTA a tutta larghezza.
- **Reduced motion:** niente `clip-path` né salita; voci e piede in sola dissolvenza da 180ms, nessun passo laterale.

### Il segnacapitolo
Il numero, il nome e un filo. Apre il primo blocco di ogni capitolo (`.sez--capo`, respiro sopra × 1,2); i blocchi che continuano il capitolo (`.sez--segue`, respiro sopra × 0,4, testa più stretta) portano un h3 e niente segnacapitolo.
- **Forma:** numero a due cifre in Capitolo (contorno arancio 1,5px con velo d'arancio al 16%; i numeri dei reparti della staffetta restano vuoti e, su telefono a 46px, più piccoli del numero di capitolo che li contiene), nome accanto in Testo 1, poi un filo di 1px che sfuma da Filo Forte a trasparente fino al margine. Il velo d'arancio sta su uno strato a parte (`::before` con `attr(data-n)`), così i controlli di contrasto misurano il contorno e non il riempimento.
- **Il numero si posa** (giro 3 effetti, sulla timeline `--capo` del segnacapitolo, solo con `view()` e senza reduced-motion): il numero entra a 1,8× e trasparente e si posa accanto al nome (entry 20% → cover 40%, `cubic-bezier(.2,.7,.2,1)`, origine in basso a sinistra, al centro in `.capo--c`); il nome si scopre da sinistra (`clip-path`, cover 33–41%) solo quando il numero si è posato, e il filo si disegna dopo il nome (cover 38–50%). Il cambio di capitolo si annuncia come un titolo di sala, poi diventa segnaletica.
- **Centrato** (`.capo--c`): sopra le composizioni centrate (il tetto, i cartelli dei risultati) numero e nome si impilano sopra il titolo, senza filo.
- È un indice, non un occhiello: compare una volta per argomento, solo dove la pagina si legge a capitoli e il numero conta davvero (la nav lo ripete). Oltre alla home, il Metodo ha due capitoli numerati: 01 Il problema, 02 Il metodo.

### Il contro-esempio
Una scena sola, sull'atmosfera "fuoco": titolo → caduta → conto → frase. Usata identica in home (capitolo 01) e nella pagina Metodo.
- **La caduta:** la fotografia delle due mani e del cubo, a tutta larghezza, separata in tre strati PNG trasparenti (`tools/strati.mjs`) posati in percentuale, così fermi ricompongono la foto esatta (proporzioni 2688×1520, margini negativi in alto e in basso). Allo scroll (`view-timeline`, lineare, cover 18–62%) le mani si allontanano del 7% verso l'esterno, solo verso l'esterno, e il cubo parte fra le dita, ruota da −8° a 15° e cade. Senza `view()` o a motion ridotto: la foto ferma. Sotto 700px il fotogramma si allarga al 150% e si stringe sul centro.
- **Il conto 4 → 3 → 0:** tre colonne con **la stessa anatomia**, allineate riga per riga (`subgrid`, 15.10, «poco leggibile»): il numero dentro il titolo della colonna (letto come «4 fornitori da coordinare»; titolo 600 `clamp(22px, 1.9vw, 28px)`), un filo, il contenuto, la nota in fondo (400 15px, Testo 3). Un filo Filo Forte sopra e un filo verticale fra i tre conti. Numeri bianchi; lo zero è vuoto, solo contorno 3px in Rosso Perdita, così si legge come cifra. Il «3» contiene i tre passaggi rotti: prima cosa cade (600 17–19px, Testo 1), sotto fra chi e chi (500 15px, Testo 2, freccia rossa); la riga dello zero ha il corpo dei passaggi, non quello di una nota. Sotto 900px una colonna, ogni numero con il suo filo.
- **La chiusa** (`.contro__chiusa`): una frase in Frase (600 `clamp(26px, 2.9vw, 46px)`, max 30ch), Testo 2 con la parte che pesa in 700 Testo 1, a `clamp(56px, 6vw, 104px)` dal conto. È il punto del capitolo e **si accende**: le parole sono ferme e passano da Testo 4 al loro colore una dopo l'altra mentre la frase sale verso la linea di lettura (`view-timeline: --frase`, finestra di 7% per parola distribuita su un tratto di 30%, da cover 16%). Stesso trattamento per la chiusa del manifesto del DNA. Senza `view()` o a movimento ridotto: accesa da subito.

### I numeri a unità
Tre voci di registro (un quadrato = un imprenditore / un settore / un processo), ognuna con il suo campo di quadrati sulla stessa griglia a 50 colonne (25 su mobile): l'altezza del campo è la quantità. SVG con `<pattern>`, acceso riga per riga allo scroll con `steps()`. Solo il primo campo è arancio. Cifra in Numero, etichetta 500 17–20px Testo 1 con il «quando» in Testo 3 nella stessa riga, legenda in Meta. In home i numeri continuano le schede dei clienti con una riga d'attacco, non con un titolo.
- **Il rullo** (home e Risultati: 150 · 33 · 750): un contatore meccanico. Ogni cifra è un tamburo alto 1em che ritaglia una colonna «spazio, 0–9, 0–9»; la prima riga è vuota, così il tamburo fermo non mostra zeri tagliati. Ogni colonna è larga quanto la sua cifra d'arrivo misurata (`--wd`) più .08em d'aria restituita dai margini, così il numero fermo ha la spaziatura del numero scritto. Le colonne a destra fanno un giro in più e partono 90ms dopo; 1,6s `cubic-bezier(.3,.55,.1,1)`, avviato da un IntersectionObserver (60% visibile). Mentre gira il tamburo sfuma ai bordi (maschera 18–82%), come un tamburo vero. Il numero vero è nel testo per i lettori di schermo (`.sr`), le colonne sono `aria-hidden`; a movimento ridotto le cifre sono già ferme.

### L'indice
Righe tipografiche per podcast, articoli, libri, ruoli: tipo (500 14px, Arancio Caldo), titolo (500 `clamp(24px, 2.4vw, 36px)`), descrizione (Testo 3, max 46ch), azione. Le colonne sono dell'indice, non della riga (`subgrid`): un'azione più lunga non sposta le altre. Tutta la riga è il bersaglio; al passaggio una luce arancione al 10% attraversa la riga e il titolo fa un passo di 8px. Stessa logica nei principi del DNA: il numero (600 30–42px) sta in Testo 4, un gradino sotto il titolo, e si accende d'arancio con un passo di 4px al passaggio.

### Il podcast
Un capitolo (06), sull'atmosfera "notte": a sinistra (7/12) logo, titolo, sommario, il CTA bianco verso il canale YouTube (nuova scheda) e una nota in Meta; a destra (5/12) il microfono, che sale con la sezione un filo più lento del testo e sfuma in basso (max 76vh; su telefono al massimo 300px). Il logo lo inserisce il build (`<!--LOGO-PODCAST-->` in `tools/build.mjs`) da `src/assets/podcast/fatturare-logo.(svg|webp|png)`, alto `clamp(72px, 6.4vw, 104px)`; finché il file manca, al suo posto resta il nome scritto. Non va ridisegnato.

### Il menu, il podcast, il footer (16.10)
- **Il podcast nel menu**: la voce di Fatturare³ si chiama **Podcast** e porta il logo del podcast davanti al nome (alto 0,8em, raggio 18%; al passaggio gira di −6° e cresce del 6%). L'anteprima resta il microfono.
- **I libri** in Fatturare³ portano alla loro pagina Amazon: il titolo è il link, la riga intera lo prende, a destra «Su Amazon →» che fa un passo al passaggio. Nel Team i due titoli nella scheda di Alberto Frisoni sono link.
- **Il footer** finisce con la riga legale (respiro `--s-7` sotto): i quattro quadratini della chiusa sono stati tolti («togli quei pallini»).
- **Il numero verde** (20.10): in testa ai Contatti del footer il badge del cliente, così com'è (162×58, WebP; ritagliato solo il margine trasparente), link `tel:800411001`; nessuna cornice del link, al passaggio `brightness(1.2)`. Con il numero c'è anche «Chiama» nella nav: testo 14px, alto quanto un tocco, mai un secondo bottone accanto al CTA.

### Il telefono (16.10)
Sul telefono il sito fa le stesse cose con meno attrito: i titoli delle aperture sono dipinti dal primo fotogramma (partono a metà della maschera), le foto d'apertura si scoprono dopo 100ms e arrivano nella misura che serve; la tabella del Metodo parte da un reparto; le card del DNA girano al massimo di 16°; il sipario della prima visita dura meno; ogni comando si preme al tocco; le animazioni infinite si fermano fuori schermo. GSAP si carica solo in home.

### Il menu con le particelle (16.10)
La polvere del palco nella card del menu: quadrati del marchio (raggio 22%) da 2 a 9px, opacità .14–.7 con la profondità, uno su quattro arancione, una tela 2D dietro le voci (una ogni 11.000 px², fra 50 e 150). All'apertura esplodono dal bottone Menu a ventaglio verso l'interno e frenano; poi salgono a 7–27 px/s ondeggiando. Il cursore le scosta (raggio 120px); la voce sotto il cursore richiama le arancioni da tutta la card e le fa girare attorno al suo quadratino, da cui parte uno sbuffo di otto quadrati; la voce cliccata ne fa scoppiare ventidue. Le voci all'apertura si alzano ruotando sul piede (78° → 0, 820ms, a gradini di 45ms). Il modulo arriva alla prima apertura; a movimento ridotto non c'è.

### I cubi lungo la home (16.10)
I contatti dell'hero tornano tre volte, ognuna accanto alla frase che li chiama, e mai altrove (un quarto momento sarebbe decorazione): **cadono** a destra del titolo del problema (sei blocchi, uno arancione, che galleggiano e poi cadono rotolando dietro le mani; quattro sul telefono, fra il sommario e le mani), **crescono** a scalinata accanto ai numeri (solo desktop: due grafite e tre arancioni a gradini di 1,16 × 0,72 lati, come i grafici a unità), **arrivano** dai bordi liberi nel cubo del trofeo prima che la luce passi al CTA. Una tela WebGL fissa dietro il contenuto, mai sopra una parola; stessi blocchi e luci dell'hero più un riempimento frontale (.55); lo scroll dà la meta e i cubi la inseguono con inerzia. Stesso cancello dell'hero.

### Eventi in lavorazione (16.10)
La pagina Eventi è in lavorazione: l'apertura standard con il biglietto, «Work in progress.» con «progress» in arancio, e sotto il sommario il marchio a 36px che si monta un quadrato alla volta (3,2 s in ciclo, 150ms fra un quadrato e l'altro, curva d'ingresso), poi i due inviti (bianco e contorno). La pagina completa è in `pages/_nascoste/eventi.html`.

### Dove siamo
Non è un capitolo: è la chiusura, prima del finale. Dopo il podcast respira la metà (`.podcast-sez + .dove`, `padding-top: calc(var(--sez-y) * .45)`), senza segnacapitolo. Dal 16.10 («deve essere centrata e chiamata Dove siamo; la mappa deve caricarsi da sola, sempre») è una colonna centrata: il titolo «Dove siamo», l'indirizzo con il caffè nel sommario, la mappa vera a tutta misura (raggio 20px, 21:9 su desktop, 16:9 fino a 1100px, 5:4 sul telefono; un iframe in pagina con `loading=lazy`, nessun clic) e sotto le tre sedi in fila, centrate, con la luce al cursore. Solo proporzioni, mai un'altezza minima: con `aspect-ratio` il minimo si trasferisce alla larghezza e la mappa sporge dallo schermo. Uguale in home e in candidatura.

### Le aperture
- **Home:** hero centrato sul nero, campo di contatti (3D su desktop, DOM altrove), attacco a 500 e colpo in Display. **L'hero arretra** (`hero-arretra`, `scroll(root block)`, 0–70vh; 15–85vh sotto 900px): pieno per il primo 55%, poi scala a .9, sale di 2vh e si spegne, mentre i contatti convergono nel marchio. A scroll zero è identico (l'H1 resta l'elemento LCP); il fuoco della tastiera dentro l'hero lo riporta pieno.
- **Pagine interne:** titolo a filo sinistro (7/12) in Display-pagina con deck, accanto (5/12) la fotografia che dice la pagina (la scalinata, lo scontrino, la bussola, il biglietto, il microfono, la tazzina; per il Team cinque ritratti veri disposti come i cinque quadrati del marchio), che sale dal fondo e vi sfuma. L'alone di pagina dietro. Sotto 900px una colonna.
- **La pill d'apertura** (`.pill-eyebrow`): esiste sopra l'H1 della home e delle aperture interne per richiesta esplicita del cliente nel giro 4 («la hero vorrei fosse a pillola»). È un'eccezione concordata per quelle otto aperture, non un componente del sistema: non si replica sopra altri titoli, non si copia in pagine nuove senza una nuova richiesta.

### La staffetta · il percorso
Il capitolo 03 (dal 15.10, «gli elementi fluttuanti senza casa rendono tutto disordinato… vorrei fosse un percorso, con container, chiaro alla lettura»): un **percorso** di sette tappe, quattro reparti e tre passaggi di consegna, che finisce sulla trattativa. Ogni tappa è una card appesa a una linea sola: la linea è il bordo della card che la tocca (in orizzontale il bordo alto, in colonna il bordo sinistro), quindi quel lato non ha bordo e il raggio da 14px sta solo sugli altri angoli. Il contatto, il cubo del marchio, percorre la linea; dietro di lui la linea è accesa, e ogni tappa si accende quando lui arriva al suo nodo.
- **Le tappe:** la card è Superficie con un gradiente dal 5% all'1,5% e Filo 1px. Il **reparto** porta il numero fantasma in contorno e l'icona (decisione cliente), il nome (500 `clamp(24px, 2vw, 32px)`), cosa fa (16px, Testo 2) e, in fondo sotto un filo, cosa consegna (600 16–18px, Arancio Caldo). Il **passaggio** porta la fotografia del cubo che passa di mano in una cornice (raggio 10px, una luce arancione al 20% dietro il cubo, `object-fit: cover`), «Passaggio n di 3», cosa passa (600 18–21px) e due etichette a pill, il tempo e lo strumento, ognuna con il suo segno. **L'arrivo** è la tappa calda: bordo arancio al 24%, la foto del cubo sul contratto, «La trattativa.».
- **I nodi:** il reparto è un cerchio da 12px, il passaggio un quadrato con raggio 3px (il cubo che passa), l'arrivo un quadrato da 18px. Spento: vuoto, contorno bianco al 42%. Acceso: arancio pieno, un alone al 16% e un bagliore; quando il cubo arriva, un'onda si allarga una volta (`nodo-onda`, 900ms).
- **Spenta e accesa:** spenta, la tappa tiene il testo pieno e spegne solo i segni (numero al 22%, icona al 34%, consegna in Testo 3, etichette su Filo Forte) e la fotografia, in bianco e nero, cubo compreso; accesa, tutto torna arancione, e il cubo della foto diventa arancione quando ci arriva il cubo del percorso. Lo stato di base è acceso: lo spegnimento esiste solo dove c'è chi riaccende.
- **La scena** (home, desktop ≥ 1024px e ≥ 680px d'altezza, senza reduced-motion): l'unico pin del sito (GSAP). Le card stanno in fila, alte uguali (`clamp(300px, 42vh, 440px)`), centrate sotto barra e nav; il titolo del capitolo resta in alto a sinistra. Una sola timeline fa scorrere la pista, accende la linea (`scaleX`) e porta il cubo da nodo a nodo, così con lo scrub tutto resta in sincrono; i nodi della scena li disegna il percorso (`.percorso`, misurato da `motion.js`). La tappa raggiunta è accesa (`.is-on`), quella dove sta il cubo è la corrente (`.is-qui`: bordo arancio al 42% e un'ombra calda). Le card che arrivano da destra **si srotolano dalla linea** (`clip-path` dal bordo alto, legato allo scorrimento orizzontale con `containerAnimation`, fra il 88% e il 64% della larghezza); quelle a schermo all'inizio sono già aperte.
- **La colonna** (Metodo sempre, home sotto 1024px, movimento ridotto): la linea è il bordo sinistro delle card, un pezzo grigio per tappa allungato sul passo, dal primo nodo all'arrivo. Dove c'è `view()` la linea arancione scende alla linea di lettura (`--lettura`: 40vh sopra il bordo basso) e ogni tappa si accende quando il suo nodo la attraversa (timeline `--tappa` della card). Da 900px la card si apre su due colonne (5/7): chi e cosa a sinistra, il resto a destra; la foto a sinistra della sua didascalia.
- **Il cubo sul percorso:** in colonna un cubo da 14px (Cubo acceso) cavalca la punta della linea dal primo nodo all'arrivo, dove si posa a 1,3×; è `position: sticky` alla linea di lettura dentro un binario (`.staffetta__binario`) di cui `motion.js` misura gli estremi solo al ridimensionamento. Nella scena lo muove la timeline.

### La particella
Il quadrato del mark, 12px con raggio 2px (8px nelle liste e nelle etichette). Elenca (`.lista`: particella arancione, verde per ciò che rientra, triangolo rosso per ciò che non rientra), conta (campi a unità, grafici delle schede: un quadrato = 100.000 €, le trenta sedie della sala), scopre (la maschera a quattro gradini, la View Transition fra pagine), indica (davanti alla voce del menu sotto il cursore), chiude (la scalinata del footer). Nel racconto della home diventa il cubo fotografato.

### La staffetta più dinamica (15.10)
«Bella così, ma più dinamica e wow»: la scena resta la stessa, cambia la fisica. Il cubo sosta su ogni nodo (curva a S fra i nodi, la pista scorre lineare) e lascia una scia lunga quanto la sua velocità; le card, appese per il bordo alto, dondolano contro il moto della linea con una molla ciascuna (massimo 7°, dritte a riposo); i numeri delle tappe contano una volta all'arrivo del cubo; all'arrivo dodici quadrati del marchio esplodono dal nodo; sotto, un pavimento di quadrati in prospettiva scorre con la pista e una pozza di luce segue il cubo; le foto scorrono in parallasse dentro la cornice. In colonna la tappa arriva girata sul lato della linea. A movimento ridotto niente di questo.

### Il DNA (15.10)
«Aggiungi riferimenti al DNA nella pagina, come un effetto a scroll, anche le card dei punti»: una **doppia elica** fatta con i quadrati del marchio — un filamento arancione, uno bianco, legati da fili sottili — che si attorciglia mentre la pagina scorre (`--giro`, una proprietà registrata animata dalla timeline di scroll e ereditata dalle coppie). Ogni coppia ruota di un passo più della precedente; i quadrati restano rivolti a chi guarda e si spengono quando passano dietro (opacità dal seno dell'angolo). La si incontra due volte: distesa sotto l'apertura, a tutta misura, e in piedi fra le due colonne dei dieci principi, che diventano le coppie di basi: ogni coppia di principi arriva aperta (le due card ruotate verso l'esterno sul lato della spina) e si chiude piatta mentre sale. A movimento ridotto l'elica è ferma, già disegnata, e le card sono piatte.

### Il DNA, secondo giro (15.10)
«L'elica del DNA molto più di impatto; un effetto 3D dei punti; le card che girano scorrendo.»
- **L'elica in WebGL** (`src/js/elica3d.js`, stesso cancello e stesso momento della scena dell'hero): i punti sono i blocchi del marchio in volume (il rettangolo arrotondato estruso dell'hero), un filamento arancione e uno perla, i pioli in due colori come le coppie di basi, un giro ogni dieci coppie come il DNA vero. La luce è quella dell'hero (chiave calda dall'alto a sinistra, controluce arancione), la nebbia scurisce l'estremo lontano. La tela è una finestra: la camera sta all'altezza degli occhi e inquadra solo il rettangolo della tela, così l'elica si vede da sopra quando è in basso e da sotto quando sale.
- **La fascia** sotto l'apertura è alta 56vh su desktop; l'elica la attraversa inclinata verso chi guarda e, la prima volta che entra a schermo, si scrive da sinistra a destra (i filamenti si disegnano, i blocchi arrivano e si agganciano, i pioli si tendono); poi gira con lo scroll e, piano, da sola. La versione CSS le cede il posto ritirandosi da sinistra a destra.
- **La spina dei principi** è la stessa elica in piedi fra le due colonne: si scrive mentre leggi (arriva fino alla linea di lettura e non torna indietro) e i pioli che passano alla linea si accendono.
- **La scala a chiocciola**: ogni riga di principi è un piolo attorno alla spina. Arriva dal basso girata (74°), si posa piatta nella fascia di lettura e riparte girando dall'altra parte; le card hanno lo spessore (due fianchi che si vedono solo quando girano). In colonna (telefono) ogni card gira sul suo asse, fino a 40°. Si accende una riga alla volta: bordo, ombra calda e numero arancioni, come la tappa corrente della staffetta.
- **Fuori dal WebGL** (telefono, tablet al tocco, movimento ridotto) l'elica è CSS, più grande, e i punti sono cubi (faccia, cima e fianco). A movimento ridotto tutto è fermo e piatto; resta solo la luce della riga che leggi.

### Il Team (15.10)
- **Il marchio fatto di volti si rinnova** (16.10): dopo l'arrivo, ogni ~2,3 s un quadrato si gira sull'asse verticale (260ms di uscita, 560ms di rientro con la curva d'ingresso) e mostra un'altra persona del team; chi arriva è a colori per 1,6 s e ha nome (600, 15–18px) e ruolo (13px, Testo 3) nell'angolo vuoto del marchio, in basso a sinistra, con sopra il bottone di pausa. Mai la stessa persona in due quadrati; torna per prima chi manca da più tempo. Si ferma fuori schermo, sotto il cursore e col bottone; a movimento ridotto è fermo.
- **Il marchio fatto di volti** arriva dal fondo dello spazio: ogni volto gira sul suo asse e si posa nella sua casella del marchio; quando l'apertura esce, il marchio ruota e i volti si separano in profondità (ognuno alla sua `--z`).
- **La griglia**: le dodici facce si girano verso di te a onda, colonna dopo colonna, e hanno finito quando sono tutte a schermo; al passaggio la faccia si stacca dal fondo (ombra e filo, niente arancione).
- **Il filtro dei reparti** (Tutti, Direzione, Pubblicità, Marketing, Reclutamento, Formazione, gli stessi chip del Metodo): chi non c'entra si gira via in 3D, chi resta scivola al suo posto (FLIP), chi entra si gira verso di te. A movimento ridotto il filtro cambia la griglia senza animazioni.

### Il finale
Il payoff FATTURARE ×3 a filo sinistro, tre righe uguali che salgono una per una dentro la maschera, la terza in Arancio, e il braccio che alza il cubo, che sale dal fondo della sezione e sfuma. La luce viene dal pavimento (brace radiale al 34%, atmosfera "alba"). Un solo CTA. Il logo del podcast non sta qui (provato il 15.10 e tolto): sta nei capitoli podcast.
- **La luce nelle lettere** (15.10): le righe sono dipinte da un gradiente ritagliato sul testo (`background-clip: text`), con una banda calda (bianco → `#FFD3A3` sulle righe bianche, `#FFB46A` → `#FFF1DE` su quella arancione) che le attraversa una volta, una riga dopo l'altra, dopo l'atterraggio (`luce-riga`, sulla `background-position`, lineare e legata allo scroll). Fuori dalla banda il colore è quello di sempre; senza `view()` o a movimento ridotto le righe sono piene e ferme.
- **Il finale fermo** (desktop ≥ 1024px e ≥ 680px d'altezza, con `view()`, senza reduced-motion): la sezione è alta `200svh` e il contenuto resta sticky per il secondo schermo, sulla timeline `--finale` (entry = il riquadro sale, contain = il riquadro è fermo). Il payoff va a tutta scala in una colonna sola e il braccio, in assoluto a destra (`min(36vw, 520px)`, z-index 2), sale **davanti** alle lettere. Le tre righe atterrano (entry 42% + 10% per riga), la luce le attraversa (contain 14% + 7% per riga), il braccio alza il cubo dal pavimento (`trofeo-fermo`, entry 35% → contain 40%), la luce del pavimento sale, poi frase e CTA (contain 26–46%). Payoff e trofeo stanno nello stesso schermo.
- **L'ultimo passaggio è tuo:** alzato il trofeo, la luce arancione parte dal cubo già accesa, scivola fino al CTA e lo accende da dietro (contain 44–64%), passando dietro alle parole. Su telefono e schermi bassi la luce si accende una volta, in posto. Il fuoco della tastiera mostra il CTA pieno a qualunque punto.

### Il passaggio fra le pagine
View Transitions fra documenti (Chrome); dove mancano, il sipario di ripiego (vedi Il sipario).
- **L'adesione** `@view-transition { navigation: auto }` (e `none` a movimento ridotto) è **in linea nel `<head>` di ogni pagina** (`tools/build.mjs`), non nel foglio: Chrome decide se fare il passaggio prima di aver riconvalidato `sito.css`, e con il foglio non in cache il passaggio saltava a ogni navigazione in avanti. `motion.css` porta solo nomi e animazioni.
- **Di base, il logo sul buio e la scalinata** (15.10): la pagina vecchia esce in 160ms (`cubic-bezier(.4,0,1,1)`, a opacità 0 e scala .985); sotto c'è il fondo del passaggio, `::view-transition` in Base Fredda con il logo intero al centro (`min(46vw, 230px)`), che resta solo sul buio per ~140ms; dopo 300ms la nuova sale con il bordo a quattro gradini (`clip-path`, 640ms `--ease-salita`). Barra e nav hanno un nome proprio e restano ferme. Il volo dal menu e il bottone che diventa la pagina hanno la loro coreografia e un fondo senza logo.
- **La foto che passa di mano** (`foto-pagina`): dal menu, l'anteprima accesa vola al suo posto nell'apertura della pagina nuova (900ms `cubic-bezier(.2,.82,.22,1)`; in volo si solleva del 6%, come presa in mano). Verso il Team volano i cinque volti, ciascuno con il suo nome `volto-<cognome>` e la classe `volto` (780ms, a 90ms l'uno dall'altro). Con il tipo `dal-menu` la pagina vecchia non resta sotto (opacità 0) e la nuova sale a gradini dopo 120ms (820ms), attorno alla foto; il tipo arriva anche da telefono, dove non ci sono anteprime. Nella pagina d'arrivo la foto non rifà la sua apertura (`.vt-arrivo`).
- **Il bottone diventa la pagina** (`cta-pagina`, tipi `dal-cta` + `cta-ar` o `cta-bianco`): vedi Buttons. La pagina vecchia si dissolve in 300ms mentre il bottone la copre, la nuova compare dopo 160ms; nav e barra restano sopra il pannello.
- **Nomi dati al volo:** la pagina che parte li scrive in `motion.js` e li annota in `sessionStorage` (`vt-menu`, `vt-foto`, `vt-cta`); la pagina che arriva li legge nello script `pagereveal` del `<head>`, aggiunge i tipi e li toglie a passaggio finito. Le pagine con una foto d'apertura aspettano il primo fotogramma con `<link rel="expect" blocking="render">`. In una scheda nascosta o sotto automazione il passaggio si salta subito.
- **Nessuna attesa di rete:** Speculation Rules, solo `prefetch` dell'HTML (`/*.html` e `/`), `eagerness: moderate` (200ms sopra un link o al tocco); mai il prerender, nessuno script eseguito in anticipo.

### Il sipario
Quattro gradini scuri a tutta altezza (Base Fredda, un quarto di larghezza ciascuno), il logo vero al centro e un bagliore di brace dal pavimento. È il gesto del gradino applicato alla soglia del sito; lo governa uno script in linea nel `<head>`, prima del primo fotogramma (classi `sipario-su`, `-primo`, `-via`, `-giu` su `<html>`).
- **Il preloader** (prima pagina della sessione, `sessionStorage` `visto`): il logo sale (220ms `--ease-salita`), sotto un filo arancione di 2px si carica (300ms, dopo 100ms); a **0,45s** i gradini salgono uno dopo l'altro (420ms `cubic-bezier(.7,0,.2,1)`, 50ms fra l'uno e l'altro) e logo e filo se ne vanno prima (260ms): finito in ~1,1s. Un clic, un tasto, la rotella o un tocco lo fanno salire subito. Finché copre **intercetta i clic** (prima passavano ai bottoni nascosti sotto). Mai sulla Candidatura. La pagina sotto non aspetta: l'apertura gira e l'LCP si dipinge sotto il sipario (con l'apertura in pausa l'LCP del Metodo slittava a 1,1s).
- **Il ripiego** (solo dove manca `onpagereveal`, cioè senza View Transitions fra documenti): al clic su un link interno i gradini salgono dal basso a coprire (300ms, 35ms fra l'uno e l'altro, il logo dopo 180ms) e dopo 220ms si naviga; la pagina nuova nasce coperta (`sessionStorage` `sipario`) e si scopre dopo 120ms. Dove le View Transitions ci sono, il sipario si toglie a `pagereveal` e il passaggio lo fanno loro.
- A movimento ridotto non esiste (né preloader né ripiego); tornando dalla cache del browser è già tolto.

### L'anello del cursore e la profondità
Il cursore del sistema resta sempre visibile: nasconderlo toglieva il cursore di testo, si bloccava nei momenti lenti e restava incastrato sui video. Lo accompagna un accento, scritto da `motion.js` in rAF (il ciclo si ferma all'arrivo).
- **L'anello** (`.cursore-anello`): un quadrato arrotondato di 34px (raggio 10px, bordo 1,5px bianco al 28%) che segue il puntatore con un filo di ritardo. Sui bottoni (CTA, Menu, chip, social, play, chiusura della barra) ne prende la forma, 12px più grande e con il loro raggio, e li **abbraccia** con il bordo arancio caldo: il bottone resta fermo, niente magnetic. Sui link si **accende** (54px, raggio 16px, bordo arancio caldo al 90%, velo arancio all'8%); sulle fotografie si **allarga** (86px, raggio 24px, bianco al 70%); premendo scala a .9. Sparisce nei campi di testo e sopra gli iframe, dove i movimenti li riceve il video.
- **La profondità:** le fotografie (aperture, finale, podcast, cartelli, staffetta, volti, libri; nella caduta le mani a 6 e il cubo a 22) e i due piani della polvere (8 e 24) scivolano in senso opposto al puntatore, ciascuno alla sua distanza (fino a k px in orizzontale, 0,7 k in verticale), con un ritardo lento. Scrive `transform`, perché le animazioni di scroll delle stesse figure lavorano su `translate` e i due si sommano; si aggiornano solo le figure in vista. Il testo resta fermo.
- Solo mouse (`hover: hover` e `pointer: fine`); spenti a movimento ridotto, con `prefers-contrast: more` e con `forced-colors`.

### Comportamenti trasversali
- **Reduced motion = statico:** a token, mai `*{animation:none}`. Le durate si accorciano (reveal 180ms), `--travel`, `--dx`, `--dy` vanno a 0, restano solo le dissolvenze; parole, maschere, scalinate, marquee, passaggi fra le pagine (`@view-transition` a `none`), foto in volo, bottone che diventa la pagina, torcia, luce al cursore, caduta, staffetta orizzontale, filo e cubo, rullo, frase che si accende (già accesa), hero che arretra, numero che si posa, schermi, finale fermo, clip-path del menu, 3D, sipario, anello del cursore, profondità, polvere che sale e lama che si allarga (resta ferma a .3) si fermano o non partono. Ogni stato resta raggiungibile, verificato su otto pagine.
- **Scroll-driven:** dove esiste `animation-timeline` le scene sono legate allo scroll e lineari; dove non esiste un solo IntersectionObserver aggiunge `.is-in`, con uno stato finale forzato dopo 3s.
- **Touch:** su `pointer: coarse` ogni bersaglio autonomo arriva a 44px (`--tap`): CTA di testo, chip, bottone Menu, voci e link legali del footer, barra annuncio, social, azioni d'indice.
- **Movimento automatico:** il marquee dei loghi (46s, lineare) è l'unica animazione infinita voluta e si ferma a hover e focus. Fa eccezione il campo di contatti DOM dell'hero (`galleggia`, infinito, alternato) dove la scena 3D non c'è, cioè su telefono: è la versione approvata, in attesa di una decisione del cliente (WORKLOG §6, C2); sotto la scena 3D e a movimento ridotto è fermo.
- **Misure verificate (giro 3):** Lighthouse mobile 96–99 (Home 96, Metodo 97, Candidatura 99), accessibilità 100, CLS 0; lo split delle parole al build e i margini negativi delle maschere e del rullo esistono perché nessuna animazione cambi l'altezza di una riga.

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
- **Do** far nascere un livello sovrapposto dal controllo che lo apre, e trattarlo come dialogo (fuoco intrappolato, resto della pagina `inert`, Esc sul documento, velo, fuoco restituito, scroll bloccato senza salto).
- **Do** legare le pagine con View Transitions fra documenti: adesione in linea nel `<head>`, nomi dati al volo dalla pagina che parte e da `pagereveal` in quella che arriva, e tolti a passaggio finito.
- **Do** riportare pieno, al fuoco della tastiera, ogni blocco che un'animazione di scroll spegne o sposta (hero che arretra, CTA del finale).
- **Do** dare 44px a ogni bersaglio su touch, label visibili ai campi, focus `2px` arancione con offset 3px.
- **Do** dare a ogni numero fonte e data, in Meta 13px con cifre tabulari.
- **Do** usare le fotografie della serie (mani in bianco e nero con oggetto arancione) senza scatola, sfumate sul palco, e i ritratti reali in scala di grigi che si colorano al passaggio.
- **Do** usare ovunque il lockup intero del cliente dal file vero a misura (`logo-full-h112.webp`), scalato senza deformarlo.
- **Do** tenere il cursore del sistema sempre visibile: un accento di cursore lo accompagna, non lo sostituisce, e si spegne su touch, a movimento ridotto, con contrasto elevato e con colori forzati.
- **Do** tenere il preloader corto (si alza entro 0,45s), saltabile al primo gesto, lontano dalla Candidatura e senza trattenere l'apertura: l'LCP si dipinge sotto di lui.

### Don't:
- **Don't** mettere testo bianco su arancio, mai: nemmeno nella barra annuncio, nel menu o nei bottoni.
- **Don't** mettere due bottoni arancioni nello stesso schermo, né un fill arancione su un invito che non sia la candidatura.
- **Don't** mettere tre inviti identici nella stessa schermata: nella barra l'invito è una frase sottolineata, non un terzo bottone.
- **Don't** usare Instrument Serif, IBM Plex Mono o qualunque monospace: il sito è tutto DM Sans.
- **Don't** colorare d'arancio le parole marcate nei titoli di sezione, né i numeri del capitolo del problema.
- **Don't** mettere un occhiello, un'etichetta o una pill sopra un titolo di sezione, in nessuna forma (maiuscolo spaziato, tondo, tra parentesi quadre, con o senza particella). La pill d'apertura resta un'eccezione del cliente, non un precedente.
- **Don't** numerare sezioni che non sono capitoli di un racconto: i numeri 01–06 esistono perché l'ordine conta e la nav lo usa.
- **Don't** far superare a un h3 o a una frase di risoluzione il titolo del suo capitolo.
- **Don't** rimettere voci di navigazione in linea nella nav: le pagine stanno nella card.
- **Don't** mettere quadratini arancioni sulle card del team o dei reparti, né un rounded square tinto sotto le icone, né icone da catalogo sugli otto servizi (lì c'è la scena che racconta il servizio).
- **Don't** ridisegnare, tagliare o schiacciare il logo del sito o quello del podcast: si usano i file veri, interi.
- **Don't** dipingere un fondo proprio su una sezione o separarne due con un filo grigio di 1px: la pagina diventa una pila di blocchi. L'unica luce sul confine è la lama, arancione, accesa dallo scroll e solo dove cambia la stanza.
- **Don't** applicare la stessa dissolvenza a ogni sezione o fare card tutte uguali.
- **Don't** usare magnetic hover, tilt 3D al cursore o easing con overshoot; il testo non entra mai in diagonale. Il 3D del sito è legato allo scroll o al tempo, finisce piatto, e il testo non resta mai di traverso a riposo. L'unica inclinazione è d'ingresso e legata allo scroll (il palco delle testimonianze, il ventaglio delle schede), e finisce su `transform: none`.
- **Don't** mettere l'adesione `@view-transition` nel foglio di stile: salta quando il foglio non è in cache.
- **Don't** aggiungere animazioni infinite: oltre al marquee dei loghi (con pausa) non ce ne sono di volute.
- **Don't** accendere parole (`[data-accendi]`) su testo sotto 24px: spente sono in Testo 4.
- **Don't** animare gradienti, blur su area grande, `font-weight` o `font-variation-settings`; si animano transform, opacity e clip-path su pochi elementi.
- **Don't** scrivere testo sotto 12px, né Testo 4 (40%) sotto 24px.
- **Don't** nascondere il cursore del sistema (`cursor: none`) né sostituirlo con un disegno.
- **Don't** fare un preloader lungo, che non si salta o che mette in pausa la pagina sotto: costa LCP e Speed Index a ogni prima visita.
- **Don't** usare il duotone nero/arancio sui volti: disumanizza la prova che converte di più.
- **Don't** inventare dati mancanti (liberatorie, ISO, ritratti) né pubblicare numeri di clienti senza la loro liberatoria: dal 15.10 le schede non stampano più la fonte, quindi i numeri online devono essere quelli veri e autorizzati.
- **Don't** ridisegnare il badge del numero verde né rifargli la cornice in CSS: è un'immagine del cliente, come il logo.
