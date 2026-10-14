# HANDOFF — Restyling salesprocess.it

**Progetto:** nuovo sito Sales Process Italia
**Cartella:** `C:\Users\UTENTE\Desktop\Nuovo sito spit`
**Stato:** prototipo statico completo e navigabile, 8 pagine, in attesa di dati reali dal cliente
**Ultimo aggiornamento:** ottobre 2026

> **Leggi prima questo file, poi `docs/superpowers/specs/2026-09-09-salesprocess-restyling-design.md`.**
> La sezione **"Regole non negoziabili"** contiene decisioni già prese con il cliente: disfarle
> significa rifare un giro di revisione già chiuso.

---

## 1 · Avvio in trenta secondi

```bash
cd "C:\Users\UTENTE\Desktop\Nuovo sito spit"
node tools/build.mjs
node tools/serve.mjs
```

Poi apri `http://localhost:4321`. Nessuna dipendenza da installare: niente `npm install`, niente
`node_modules`. Serve solo Node (testato su 24.x). FFmpeg è stato usato per preparare gli asset,
ma non serve per far girare il sito.

In Claude Code c'è anche `.claude/launch.json`, quindi il preview si avvia con il tool del browser
usando il nome **`salesprocess`**.

---

## 2 · Architettura — la cosa più importante da capire

**Si modifica `pages/`, non `src/*.html`.** I file HTML dentro `src/` sono **generati** e vengono
sovrascritti a ogni build.

```
pages/*.html        ← SORGENTE. Solo il <main>, senza head/nav/footer.
                      Prima riga: un commento con title: e desc:
tools/build.mjs     ← avvolge ogni frammento con head, barra, nav, footer, script
                      e scrive src/*.html. Qui dentro stanno anche:
                        · il menu di navigazione (NAV, NAV_EXTRA)
                        · il footer completo, i social, le sedi
                        · const TEL → il numero verde (vedi §7)
src/*.html          ← GENERATO. Non modificare a mano.
src/css/*.css       ← sorgente, nove fogli (vedi §4)
src/js/dati.js      ← TUTTI i contenuti strutturati + il rendering
src/js/motion.js    ← il JS di interazione (caroselli, GSAP, mappa, form)
src/assets/         ← solo ciò che viene servito
assets-src/         ← originali pesanti FUORI dall'albero servito (3 MB)
docs/research/      ← i dossier della fase di ricerca (660 KB)
tools/serve.mjs     ← dev server statico, porta 4321
```

**Flusso tipico:** modifichi `pages/qualcosa.html` o un CSS → `node tools/build.mjs` → ricarichi.

### Perché un build e non un framework

Niente React, niente Astro, niente bundler: il sito è HTML statico con GSAP da CDN. Nav e footer
finiscono nel markup **servito** (non iniettati da JS) perché l'LCP e l'indicizzazione non devono
dipendere dal bundle. Se in futuro serve un CMS, la struttura è già pronta per essere portata su
Astro con poco lavoro — `dati.js` diventa il content layer.

---

## 3 · La direzione di design, e perché è questa

Il cliente ha indicato **sharpify.io** come riferimento. La direzione è stata scelta dopo una fase
di ricerca documentata in `docs/research/` (5 recon dal vivo, 5 direzioni creative, 3 giurie
comparative, una sintesi).

**La prima consegna è stata respinta dal cliente** perché prendeva la *struttura* di Sharpify ma non
il suo *aspetto*. La direzione attuale è un allineamento deliberato alla pelle del riferimento:

| Elemento | Scelta | Perché |
|---|---|---|
| Fondo | near-black freddo `#161519` + nero profondo `#020202` | misurato sul riferimento |
| Accento | arancione `#FF8200` | DNA Sales Process, sostituisce il verde menta del riferimento |
| Carattere | **DM Sans** | è il font del riferimento (1.853 nodi su 2.000) |
| Display | peso **500**, non 700, a 112–132px, tracking −0,036em | misurato: è il peso 500 a renderlo elegante |
| Contrappunto | Instrument Serif *italic* | il ruolo che nel riferimento ha Editorial Old |
| Firma visiva | alone radiale arancione dall'alto | il riferimento la fa con un `top.webp`, qui è CSS |
| Raggi | 2 / 8 / 12 / 999px | misurati sul riferimento |

### L'arancio non è il verde

Il verde `#3DDC84` del riferimento è chiaro e poco saturo. `#FF8200` è scuro e satura al massimo
(B=0, R clippato → **headroom di gamut zero**). Tre conseguenze cablate nei token:

1. l'alone **non** è `#FF8200` ad alta alpha — darebbe `#552F07`, fango. È un nucleo caldo profondo
   (`#B85B00`/`#8A4300`) con un cuore più brillante;
2. **non esiste un arancio più brillante per l'hover** → l'hover *scurisce* il fill (`#E87300`) e
   allarga il glow;
3. **testo bianco su fill arancione = 2,49:1 → vietato.** Sul fill si usa sempre `#100F12`.

---

## 4 · Il design system

I nove fogli, in ordine di caricamento (l'ordine conta, è cascata):

| Foglio | Righe | Cosa contiene |
|---|---:|---|
| `tokens.css` | 190 | **unica fonte di verità**: colori, tipografia, spazi, raggi, durate, easing |
| `type.css` | 185 | la scala tipografica |
| `base.css` | 287 | reset, contenitori, CTA, card, particella, maschera a scalinata |
| `chrome.css` | 201 | barra annuncio, nav, menu mobile, piastra CTA, footer |
| `sfondi.css` | 109 | **le atmosfere delle fasce** (vedi sotto) |
| `sections.css` | 899 | tutte le sezioni |
| `infografica.css` | 176 | il diagramma del contro-esempio |
| `motion.css` | 120 | apertura, muro, reveal delle teste di sezione |
| `interazioni.css` | 202 | ingressi a cascata, hover, barra di avanzamento, mappa |

### Le atmosfere (`sfondi.css`)

Il sito era un unico nero: corretto come sistema, monotono come esperienza. Cinque atmosfere,
assegnate alla sequenza, **mai due uguali di fila**:

| Classe | Direzione della luce |
|---|---|
| `.sf--alba` | sale dal bordo inferiore |
| `.sf--brace` | veletta calda dall'alto a sinistra |
| `.sf--notte` | **l'unica fascia fredda del sito** — blu `#1E3A6E` |
| `.sf--radente` | raso da sinistra |
| `.sf--pozzo` | nero profondo, una sola luce d'angolo |
| `.sf--fuoco` | **una sola in tutta la pagina**, sotto il contro-esempio |

Tre vincoli che tengono l'insieme:
1. la famiglia è calda. **Una sola fascia fredda**: due la farebbero diventare un tema;
2. nessun gradiente attraversa il pivot di contrasto (sono tutti scuro→scuro), quindi il testo non
   cambia regole di leggibilità passando da una fascia all'altra;
3. tutto è **dipinto una volta**: nessun gradiente animato, nessun blur su area grande, nessun
   `mix-blend-mode`. Ad alto contrasto le atmosfere si spengono.

### Il sistema di motion

**Un solo gesto d'ingresso** (sale + dissolve, curva `--ease-salita`) e **un solo dispositivo di
hover** (la luce che segue il cursore). La differenza fra un sistema di motion e una collezione di
animazioni è che qui non c'è un effetto diverso per sezione.

- **70% CSS nativo** (scroll-driven animations), 25% GSAP, 5% niente
- **Un solo pin** in tutto il sito: la scena del metodo
- **Nessuno smooth scroll globale** — no Lenis, no ScrollSmoother. Lo smoothing va sull'animazione
  (`scrub`), non sull'input. Il pubblico è fatto di titolari di PMI su desktop Windows con la
  rotella del mouse: è il profilo peggiore per lo scroll-hijack, e **il riferimento stesso non lo usa**
- Ampiezza massima di hover: **3px**. Niente tilt 3D, niente magnetic hover
- `prefers-reduced-motion` è gestito **a token**, non con un interruttore: `--travel` va a zero e la
  dissolvenza sopravvive. **Mai** `*{animation:none!important}` — farebbe sparire per sempre ogni
  elemento con `fill-mode: both` che parte da `opacity: 0`

---

## 5 · Le pagine

Otto pagine. Nav desktop: Metodo · Risultati · DNA · Team · Eventi (+ Fatturare³ nel menu mobile e
nel footer — sei voci nella barra desktop la fanno sfondare a 1200px).

| Pagina | Contenuto |
|---|---|
| `index.html` | **15 sezioni** — vedi sotto |
| `metodo.html` | contro-esempio, la macchina pinnata, tabella input/output filtrabile, bento |
| `risultati.html` | i numeri, nastro delle schede, fascicoli, i 33 settori |
| `dna.html` | storia, politica della qualità, **i 10 principi** (presi da `/dna/` del cliente) |
| `team.html` | 12 volti, i due fondatori, l'ufficio, lavora con noi |
| `eventi.html` | Sales Process Day: garanzia, programma, filtro, form di prenotazione |
| `fatturare.html` | podcast, articoli, i due libri, il muro |
| `candidatura.html` | chi entra/chi no, form con squalifica in tempo reale, mappa, cosa succede dopo |

### La sequenza della home

1. **hero** — centrato, alone dall'alto, pugno con banconote scoperto dalla maschera a scalinata
2. **nastro prove** — carosello di 6 schede-risultato, ognuna con fonte e liberatoria
3. **fregio** — FATTURARE a piena larghezza che scorre, una parola piena e una in contorno
4. **tetto** — *il momento della pagina*: la trave si disegna, i 4 reparti convergono sotto, i
   tiranti li agganciano, appare il payoff. «Sotto lo stesso tetto» reso letterale
5. **loghi clienti** — marquee
6. **numeri** — 3 card, numero a 124px, istogramma che rappresenta la quantità
7. **cosa facciamo** — bento di 12 tile con icone disegnate
8. **cartelli** — i due pugni con PIÙ CLIENTI e le banconote
9. **contro-esempio** — *infografica*: 3 pacchetti che cadono, il conto 4 / 3 / 0
10. **metodo** — la macchina pinnata, 4 reparti + 3 handoff
11. **team** — slider di 12 persone + la porta alla pagina Team
12. **testimonianze** — griglia 3×2, 5 video reali + la porta ai risultati
13. **risorse** — podcast, evento, libri
14. **dove siamo** — mappa a facciata + sedi
15. **muro** — FATTURARE ×3 centrato

---

## 6 · Regole non negoziabili

### Decisioni prese **con il cliente** (non disfarle senza chiedere)

| Regola | Quando è stata chiesta |
|---|---|
| **Niente parentesi quadre** negli occhielli | erano la firma del riferimento, il cliente le ha fatte togliere |
| **Mai IBM Plex Mono** — «non voglio mai più vederlo» | tutto è DM Sans, anche le meta |
| **Il logo è il file vero**, non ricostruito | un logo non si ridisegna: si usa |
| **Nessun nome di persona** nella sezione metodo | i referenti stanno solo sulla pagina Team |
| **Niente quadratini arancioni** sulle card team | sostituiti da etichetta tipografica con filetto |
| **Niente quadratini** nelle card dei reparti | sostituiti da icona + numero fantasma |
| **Francesco Piergianni rimosso** da ogni scheda | dati, asset e copy ripuliti |
| **Fascia ISO/P.IVA rimossa** | conteneva solo segnaposto |
| Il muro FATTURARE è **centrato**, non a scalinata | a scalinata si leggeva come un elenco |

> **Filippo Farronato** non è mai stato nei dati: la pagina `/team-2/` del cliente non lo include.
> Se è in azienda, va aggiunto — non è stato "rimosso".

### Regole tecniche (scoperte sul campo, costano tempo se si riscoprono)

- **`animation-delay` è IGNORATO sulle timeline scroll-driven.** Lo stagger si fa spostando
  `animation-range-start`. Vale per ogni `animation-timeline: view()` del progetto.
- **Mai animare `width`, `height`, `font-size`, `font-weight`, `font-variation-settings`**: non sono
  compositabili. `font-variation-settings` in particolare fa rifloware il testo e produce CLS.
- **Il reset `img{max-width:100%}` clampa il `width:400%`** della maschera a scalinata: lì serve
  `max-width: none`, altrimenti ogni colonna mostra un quarto d'immagine schiacciato.
- **`SplitText` con `autoSplit: true` distrugge e ricrea gli elementi** quando il webfont atterra.
  Un tween costruito sul risultato di `SplitText.create()` resta agganciato ai nodi buttati: zero
  errori in console, zero effetto. *(Questo bug è esattamente quello che affligge il riferimento:
  su sharpify.io il reveal bicolore ha zero target in pagina e non si attiva mai.)*
- **`document.fonts.ready.then(() => ScrollTrigger.refresh())`** è obbligatorio, o gli start/end
  sono calcolati sulle metriche del fallback.
- **Mai `.set({display:'none'})` dentro una timeline pinnata**: è una mutazione di layout che
  disallinea start/end senza produrre un solo errore in console.
- **Griglia CSS:** una colonna non scende sotto il `min-content` dei suoi figli. Serve
  `min-width: 0` sui figli, o la griglia sfonda. *(È successo due volte, in due punti diversi.)*
- **Attenzione alle media query duplicate fra fogli diversi**: a parità di specificità vince
  l'ultimo caricato. Una `@media (max-width:1024px)` aggiunta in `sections.css` ha sovrascritto per
  un giro la regola a una colonna del footer in `chrome.css`.
- **Il pane del browser di Claude Code non segue lo scroll sotto emulazione del viewport** e i suoi
  `clientWidth`/`innerWidth` diventano incoerenti. Per verificare un overflow reale usa
  `window.scrollTo(500,0)` e leggi `scrollX`: se resta 0, non c'è overflow. Per ispezionare una
  sezione lontana, generati una pagina temporanea in `src/_dev/` che la metta in cima.

### Regole di contenuto

- **Un solo valore per concetto.** Il sito attuale del cliente dichiara 150 vs +800 imprenditori,
  20 vs 30 vs 34 persone, 6 vs 9/12 mesi. Qui si pubblica il numero **verificabile**: le persone
  sono **dodici**, perché dodici sono quelle sulla loro pagina team.
- **Nessuna scheda-risultato senza fonte, data e liberatoria.**
- **Ogni cifra passa da `Intl.NumberFormat('it-IT')`.** Il simbolo `$` non esiste nel sito.
- **Mai testo bianco su arancione.**
- I segnaposto nel codice sono marcati `prov: true` (14 occorrenze in `dati.js`) e `[da cliente]`
  nelle pagine: è così che si trova cosa manca.

---

## 7 · Cosa manca dal cliente — i bloccanti

### Bloccante immediato

**Il numero verde.** Non è pubblicato da nessuna parte su salesprocess.it (verificate home, `/dna/`,
`/team-2/`, `/quiz/`) e nell'immagine fornita le cifre non erano leggibili. **Non è stato inventato.**
Il blocco è costruito e stilato in verde; senza cifre **non finge di essere un link** (è un `<div>`,
non una `<a>`).

Si cambia in **un solo punto**, in cima a `tools/build.mjs`:

```js
const TEL = { num: null, label: 'Numero verde da fornire' }
//            ↑ metti qui il numero, es. '800 123 456'
```

### Dati e asset da raccogliere

| Cosa | Dove serve |
|---|---|
| **Ragione sociale, P.IVA** | footer |
| **Certificato ISO**: norma, ente, numero, scadenza + PDF | va reintrodotto quando ci sono i dati veri |
| **4–6 schede-risultato reali** con liberatoria firmata | `PROVE` in `dati.js` — oggi inventate |
| **I tre passaggi di consegna**: chi passa cosa a chi, SLA, strumento, responsabile | `HANDOFF` — è il contenuto della scena centrale |
| **Fascicoli clienti** completi | `FASCICOLI` — oggi uno solo, provvisorio |
| **Candidature ricevute / slot / assegnate** per trimestre | pagina candidatura |
| **URL podcast, articoli, libri** (titoli e copertine) | `fatturare.html`, oggi marcati `.todo` |
| **Elenco reale dei 33 settori** | `SETTORI` — oggi plausibile, da confermare |
| **Durata media del rapporto in mesi** | manca del tutto, ed è il numero che distingue un'agenzia da un venditore di corsi |

### Decisione da prendere con il cliente

**Lo stack.** Oggi è un sito statico. Il sito attuale è WordPress + Elementor. Se deve restare su
WordPress, il tetto di qualità reale scende a ~7/10 e la scena pinnata è il primo elemento
sacrificabile. È un cambio di processo di aggiornamento, non solo un restyling.

---

## 8 · Provenienza degli asset

Tutto preso dal cliente, niente stock.

| Asset | Origine | Note |
|---|---|---|
| `brand/logo*.webp` | PNG 4118×1001 fornito dal cliente | tre varianti ritagliate dallo stesso file |
| `brand/mark.svg` | **ricostruito** misurando il PNG | 5 quadrati in scalinata. ⚠ serve il vettoriale originale |
| `webp/hand-*.webp` | foto del sito attuale | mani nere su trasparente con oggetto arancione |
| `webp/extra-1,2` | foto del sito attuale | i due pugni: PIÙ CLIENTI e le banconote |
| `clients-white/*.png` | 25 loghi clienti dal sito | erano PNG trasparenti, ricolorati in bianco |
| `team-webp/*.webp` | 12 ritratti da `/team-2/` | ritagliati 640×640, monocromia applicata in CSS |
| `video/*.webp` | locandine dei 5 video reali | 4 YouTube + 1 Vimeo, mappati al nome verificando il DOM |

**I video sono reali**, con il nome giusto accanto a ciascuno:

| Cliente | Piattaforma | ID |
|---|---|---|
| Alessandro Cianflone | Vimeo | `1135278717` |
| Roberto Straniero | YouTube | `nw8QUpAVD-4` |
| Claudia Mabiglia | YouTube | `rQK-SIR9NDY` |
| Alessandro Scuderi | YouTube | `7yS2POkFDb4` |
| Claudia Petrazzuolo | YouTube | `y47Ho--fc28` |

> Sul sito attuale, sotto ognuno di questi cinque nomi, c'è **lo stesso paragrafo segnaposto
> ripetuto**. Non è stato riportato: il video è la testimonianza, una didascalia falsa la indebolisce.

### Prestazioni: due facciate, non due embed

**Video e mappa si caricano solo al click.** Cinque iframe YouTube al caricamento costerebbero oltre
un megabyte; l'embed di Google Maps scrive cookie di profilazione al primo byte — con una cookie
policy iubenda attiva, caricarlo senza consenso è **un problema legale, non solo di performance**.

Risultato: **zero iframe pre-caricati**, 1,9 MB serviti in totale.

---

## 9 · Accessibilità — stato

Un audit tecnico completo è stato eseguito e i difetti corretti. Stato attuale:

- contrasti verificati numericamente su tutti i token (`--c-t2` 11,8:1 · `--c-t3` 6,3:1 su base)
- `--c-t4` (3,8:1) è riservato a **testo ≥24px o glifi decorativi** — non usarlo sotto
- una sola `h1` per pagina, un solo `<main>`, `lang="it"`, gerarchia dei titoli senza salti
- tutte le immagini hanno `alt`, tutti i campi hanno `<label>` visibile (mai il placeholder come label)
- focus ring arancione 2px (è l'unico colore della palette che soddisfa SC 1.4.11 senza sforzo)
- controlli di pausa **reali** su ogni movimento automatico (SC 2.2.2 è livello A, non una gentilezza)
- target ≥24px (SC 2.5.8)
- skip link, e uno specifico per saltare la scena pinnata
- nessun link `href="#"`: dove la destinazione non esiste, l'elemento **non è un link** e lo dichiara

**Non verificato:** navigazione da tastiera dentro la scena pinnata, e LCP/INP su hardware reale.

---

## 10 · Dove trovare il resto

| File | Cosa |
|---|---|
| `docs/superpowers/specs/2026-09-09-...-design.md` | la spec: processo, decisione, vincoli bloccanti |
| `docs/research/SINTESI.md` | **102 KB** — la specifica operativa completa della direzione scelta |
| `docs/research/direzione-*.md` | le 5 direzioni creative valutate |
| `docs/research/giuria-*.md` | le 3 giurie comparative |
| `docs/research/recon-*.md` | i 5 dossier di ricerca sul riferimento e sul DNA del brand |

> Nota: `SINTESI.md` descrive una direzione precedente ("Scalinata Viva", nero caldo + Red Hat
> Display). **La pelle attuale è diversa** — è l'allineamento a Sharpify chiesto dal cliente dopo
> quella spec. Restano validi: la legge dell'arancio, i ragionamenti sul contrasto, le ricette di
> motion, l'elenco dei dati mancanti. **Non è valida** la parte su colori caldi e tipografia.

---

## 11 · Primi passi suggeriti per chi riprende

1. `node tools/build.mjs && node tools/serve.mjs` — guarda il sito per intero
2. Leggi **§6 Regole non negoziabili** prima di toccare qualsiasi cosa
3. Chiedi al cliente i dati di **§7**, partendo dal numero verde e dalle liberatorie
4. Cerca `prov: true` in `dati.js` e `[da cliente]` nelle pagine per trovare tutti i segnaposto
5. Decidi lo stack di produzione **prima** di investire altro lavoro sul prototipo

### Comandi utili

```bash
node tools/build.mjs                              # ricostruisce src/ da pages/
grep -rn "prov: true" src/js/dati.js              # trova i dati provvisori
grep -rn "da cliente\|\.todo" pages/              # trova i segnaposto nelle pagine
grep -n "const TEL" tools/build.mjs               # il numero verde
```
