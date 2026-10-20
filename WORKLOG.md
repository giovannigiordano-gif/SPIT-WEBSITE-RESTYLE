# WORKLOG — restyling "wow" di salesprocess.it

Branch: `restyling-wow` (base: `main`, commit `70355d4` = stato dell'handoff).
Ogni fase chiusa = un commit. Questo file è il registro: fasi, scelte (una riga di motivo), problemi, cosa resta.

---

## 0 · Skill e strumenti

| Skill / tool | Stato | Uso |
|---|---|---|
| **playwright-cli** (Microsoft, `@playwright/cli` 0.1.22) | installata globale + skill in `~/.claude/skills/playwright-cli` | tutta la verifica visiva: `tools/qa/audit.js` gira con `playwright-cli run-code` |
| **img2threejs** v2.0.0 | installata in `~/.claude/skills/img2threejs` (copia della release: il symlink dell'installer fallisce su Windows senza modalità sviluppatore, EPERM) | ricostruzione procedurale del mark a scalinata in Three.js |
| **awesome-design-md** (pacchetto skill della raccolta VoltAgent, 73 template) | installata in `~/.claude/skills/awesome-design-md` | riferimenti di principio (Ferrari, NVIDIA, Framer, Nike), nessun DESIGN.md di brand installato |
| impeccable | caricata | context, craft-floor, direzione, detector finale, finish review |
| frontend-design, design-taste-frontend, ui-ux-pro-max, motion-design | caricate | anti-slop, dial, checklist UX, grammatica del movimento |
| ⚠ **Python assente** sulla macchina | — | img2threejs (script `forge/`) e ui-ux-pro-max (`search.py`) richiedono Python: installarlo vuol dire accettare una licenza a tuo nome, quindi non l'ho fatto. Uso il *metodo* di img2threejs a mano e la checklist di ui-ux-pro-max senza il motore di ricerca. **Da decidere insieme** se installare Python 3.12. |
| Generazione immagini | non usata | l'unico generatore disponibile (Higgsfield) è a crediti: niente spese senza conferma. Percorso *code-first*. |

## 1 · Audit iniziale (Playwright CLI, 8 pagine × 1440/1024/768/390/360)

Screenshot in `qa/audit-prima/` (piega reale + full-page "composto", con animazioni scroll-driven portate
al fotogramma finale, immagini lazy forzate e pin rimossi; oltre 16.000px catturato a tranche).
Report numerici in `qa/audit-prima/report-*.json`.

**Cosa funziona già (si tiene):** palette e legge dell'arancio, logo vero, DM Sans 500, contenuti con
fonte, facciate per video e mappa, zero errori in console, zero overflow orizzontale a tutte le larghezze,
reduced-motion gestito a token, skip link, label sempre visibili nei form.

**Cosa non funziona — onestamente:**

*Struttura e continuità*
1. Ogni sezione è un rettangolo col suo fondo e un filo di 1px in cima (`.sf + .sf`): la pagina si legge
   come una pila di blocchi. Stacchi netti ben visibili hero→nastro, numeri(blu)→cosa(nero),
   cartelli(nero)→contro(rosso), testimonianze→risorse→dove.
2. Quattro nastri orizzontali in movimento sulla home (prove, fregio, loghi, squadra): troppi marquee.
3. Il pugno con le banconote compare due volte in home (hero e cartelli).

*Gerarchia e layout (pattern da "AI slop")*
4. "Cosa facciamo": 12 card identiche icona+titolo+testo. Su mobile diventano 2.400px di lista uguale.
5. "I numeri": tre card con numero gigante + etichetta + accento = il template hero-metric.
6. "Risorse": tre card uguali in fila; i link `cta--testo` sono centrati mentre il resto è a sinistra.
7. Un occhiello maiuscolo spaziato sopra ogni titolo di sezione: è la cadenza da template.
8. Eventi: sei slot di programma in griglia da 4 → due celle vuote; è una sequenza, chiede una timeline.
9. Footer a 1440: la colonna "Contatti" cade da sola su una seconda riga.

*Bug*
10. Metodo: il link "Salta la scena del metodo" resta visibile sopra il contenuto (translate senza clip).
11. Nav: con il numero verde assente il gruppo mostra "Scrivici" e "Scrivi", due link identici.
12. Barra annuncio < 560px: la pill si riduce a un ovale nero vuoto (testo nascosto, freccia sola).
13. Muro: il glow del terzo FATTURARE è tagliato dalla maschera → rettangolo scuro visibile attorno.
14. Loghi clienti senza dimensioni intrinseche: box 0×34px finché non caricano, la larghezza (e la velocità)
    del marquee salta mentre arrivano; pesi ottici sbilanciati (25px contro 170px di larghezza).

*Mobile e accessibilità*
15. Target sotto 44px: pill barra 20×26, × 28×28, chip filtri 34px, link footer 24px, social 38px,
    `cta--testo` 24px, "Apri in Google Maps" 40px.
16. Testo a 10–11px in molte etichette (schede, lenti, conto, footer).
17. Home a 390px alta 19.250px (24 schermate): bento e footer da comprimere.

*Movimento*
18. Un solo gesto d'ingresso uguale ovunque (sale + dissolve): corretto come sistema, piatto come
    esperienza. Nessun momento firma al primo scroll; l'hero è testo centrato con una foto sotto.

## 2 · Direzione creativa

**Lettura del brief.** Redesign *preserve* di una landing B2B (agenzia commerciale) per titolari di PMI,
linguaggio scuro e cinematografico, costruito con CSS scroll-driven + GSAP + un solo Three.js lazy.
Dial: varietà 7 · movimento 8 · densità 4.

**Tesi — "Dal buio dei contatti alla luce del fatturato".** Un palcoscenico unico e scuro su cui si muove
una sola luce arancione. La particella del marchio (il quadrato) racconta la storia per tutta la pagina:
contatti sparsi → la scalinata del processo → quattro reparti sotto un tetto → un numero solo.
Rifiuto: blocchi impilati, la stessa dissolvenza su ogni sezione, card tutte uguali.

**Palette (invariata nel DNA, nuovi ruoli).** Fondo `#161519` / nero palco `#020202`; arancio `#FF8200`
come *luce*, non come vernice (<3% dei pixel); famiglia calda `#FF9A38/#E87300/#B85B00/#8A4300`; una sola
zona fredda (era `#1E3A6E`, nel giro 2 spenta in acciaio `rgba(44,58,84)` su `#111318`); `#CC3366` solo
per la perdita. Strategia: palco neutro + una luce che si sposta.

**Tipografia.** DM Sans (display 500, colpo 700), e solo DM Sans. *(Il piano iniziale teneva Instrument
Serif italic come contrappunto, max due usi per pagina; nel giro 2 di verifica è stato ritirato: in home
tornava tre volte e, col maiuscolo, faceva un secondo sistema di titoli — vedi §4.)* Scala fluida con
`clamp()`, minimo 12px per le etichette, 16px per il corpo. I titoli chiave si compongono parola per
parola (split fatto al build, non a runtime: niente CLS, niente bug di autoSplit).

**Ritmo.** Scala a passi di 4px (4·8·12·16·24·32·48·64·96·128·168). Le sezioni non dipingono più un fondo proprio:
stanno su un **palco continuo** (fondo fisso con sette atmosfere in dissolvenza incrociata guidate dalla
sezione in vista). Elementi che sbordano fra le sezioni, giunture sfumate, mai un filo netto.

**Linguaggio del movimento — tre gesti, non uno per sezione.**
1. *Il gradino* (materia): immagini e blocchi salgono scoperti da quattro colonne sfalsate.
2. *La riga* (testo): parole che salgono dentro una maschera, in verticale, mai in diagonale.
3. *La luce* (interazione): la luce arancione segue il cursore su superfici e palco; mai tilt da cartolina.
Curva unica d'ingresso `--ease-salita`; durate a token (120/200/320ms per tocco, micro e stato,
620/760/940ms per rivelazione, maschera e apertura, 1100ms per il palco), scrub sempre lineare. Fisica "rigida"
per tutto ciò che è scalinata: niente overshoot.

**Tre momenti firma.**
1. **Hero 3D — "Non ti vendiamo contatti"**: centinaia di cubi grafite (i contatti) fluttuano in
   profondità attorno al titolo; la luce arancione segue il cursore. Al primo scroll i cubi convergono e
   si montano nella scalinata del logo (ricostruita in Three.js con il metodo img2threejs), che sale
   oltre il bordo dell'hero dentro la sezione successiva. Mobile, low-power e reduced-motion: la
   stessa scena in versione DOM (contatti in CSS, marchio SVG che si monta allo scroll con le
   animazioni scroll-driven), zero JS 3D. *(Il piano era uno still pre-renderizzato; la versione DOM
   pesa meno e si muove.)*
2. **La macchina (pin)**: il contatto (un quadrato arancione) attraversa i quattro reparti e i tre
   passaggi di consegna, che si accendono al suo passaggio, fino alla trattativa. È il rovescio esatto
   del contro-esempio, dove gli stessi pacchetti cadono.
3. **Il muro FATTURARE**: chiusura tipografica che si comprime a scatti con lo scroll e reagisce alla luce
   del cursore.

**Dove va il 3D.** Solo nell'hero della home, desktop con puntatore fine e GPU; caricato dopo il load,
renderizzato solo quando serve (pausa fuori viewport e a scheda nascosta).

**Librerie.** GSAP 3.13 + ScrollTrigger (già nel progetto, da CDN) · CSS scroll-driven animations
(compositor, zero JS) · Three.js r16x lazy solo desktop. **Niente Lenis**: pubblico su Windows con rotella,
lo scroll smussato rompe find-in-page, tastiera e lettori di schermo; lo smoothing va sullo `scrub`.

## 3 · Fasi

- [x] 0 · Installazione skill, git + branch, audit, direzione (questo file, `PRODUCT.md`) — `dca5424`
- [x] 1 · Design system: palco continuo, testate di margine, componenti, bug 10–16 — `72fca77`
- [x] 2 · Sezioni della home una per una — `f72f27e`
- [x] 3 · Pagine interne — `b6b6716`
- [x] 4 · Movimento + 3D (hero WebGL, torcia, muro, passaggio fra pagine) — `e1c03bf`
- [x] 5 · Performance (Lighthouse mobile ≥ 90) e accessibilità — `040ac40`, tastiera e reduced-motion
  `1c57c1a`, detector impeccable `6d049fc`

**Fase 5 — performance e accessibilità** (Lighthouse 12.6.1, profilo mobile, server locale con brotli)

| Pagina | Prima | Dopo · Perf | A11y | BP | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| Home | 79 / 92 / 100 / 100 | **96** | **100** | 100 | 100 | 2,8 s | 0 |
| Metodo | — | 98 | 100 | 100 | 100 | 2,3 s | 0 |
| Risultati | — | 97 | 100 | 100 | 100 | 2,6 s | 0 |
| DNA | — | 98 | 100 | 100 | 100 | 2,3 s | 0 |
| Team | — | 96 | 100 | 100 | 100 | 2,7 s | 0 |
| Eventi | — | 98 | 100 | 100 | 100 | 2,2 s | 0 |
| Fatturare³ | — | 99 | 100 | 100 | 100 | 2,2 s | 0,003 |
| Candidatura | — | 99 | 100 | 100 | 100 | 2,1 s | 0 |

Cosa ha fatto la differenza: un solo CSS (`sito.css`, generato dal build con impronta `?v=`) al posto di
nove fogli + Google Fonts; font ospitati in casa (DM Sans variabile, precaricato) — risolve anche il
peso 600 che veniva arrotondato al 700; `dati.js` in `defer` e montato subito (prima bloccava il primo
paint, e montava DOPO che motion.js aveva misurato i caroselli vuoti); le parole dell'H1 partono a metà
maschera (dipinte dal primo fotogramma: LCP da 4,5 a 2,8 s); varianti a misura delle immagini
(`tools/immagini.mjs`); grafici a torre disegnati con una maschera (−650 nodi); server di sviluppo con
brotli e `no-cache` al posto di `no-store` (bfcache).
Accessibilità: numeri fantasma come contenuto generato dal CSS, `role="listitem"` tolto dai link, cloni
del carosello fuori dal tab order, indice del diagramma a contrasto pieno, e soprattutto le rivelazioni
a scroll che finiscono a `entry 100%` e — per le card con testo — senza dissolvenza: prima un testo
visibile in fondo alla prima schermata restava a metà opacità (1,8:1) finché non si scorreva.
- [x] 6 · Due giri completi verifica → correzione a tutti i breakpoint, prima/dopo — giro 1 `fc55572`,
  giro 2 `35c2ae8` (vedi sotto)

**Fase 6 — i due giri di verifica**

*Giro 1* (audit a 5 larghezze, passeggiate a scroll 1440/1024/390, test funzionali, detector impeccable):
bersagli touch a 44px (chip, frecce, barra), CTA fissa solo sotto i 620px, link morto `#carta` del
footer diventato segnaposto dichiarato, bagliori decorativi tolti, niente bianco su arancio nel menu.

*Giro 2* — revisione indipendente (agente `impeccable-finish-reviewer`, contro il contratto di direzione)
+ nuove passeggiate a scroll. Ogni rilievo è stato **ricontrollato sullo stato attuale** prima di
correggere: due erano su catture vecchie (doppio CTA a 1024 già risolto nel giro 1; mail del footer già
spezzata dopo la @), uno andava contro l'HANDOFF (vedi §4, fregio). Corretti:
1. **Icone dentro quadratini tinti** (tetto, macchina, indice dei servizi): ora icone nude. Il cliente
   aveva chiesto «niente quadratini» sulle card dei reparti; nella macchina l'icona resta spenta e si
   accende col bordo quando il contatto arriva — la luce che passa *dentro* il reparto.
2. **Due sistemi di titolo** (CAPS + serif / tondo con parola arancione): uno solo. I titoli a due voci
   sono DM Sans 500 al corpo di `.t-d2`, seconda voce in `--c-t3`. Instrument Serif ritirato.
3. **Nove parole arancioni nei titoli**: l'arancio resta nell'H1 di ogni pagina e nel payoff del tetto;
   nei titoli di sezione la parola torna del colore del titolo (markup e copy invariati).
4. **Hero 3D**: il marchio montato leggeva `#E57A28` (nebbia + tone mapping) → materiale fuori da
   entrambi, misurato a schermo `#FD7F0E`. I cubi in spirale passavano dietro «fattura» → *radura*:
   maschera ellittica misurata sui nodi di testo, più un disco pieno sul marchio perché non si spenga.
   Stessa radura sul campo DOM (mobile/fallback): a 360px i contatti finivano accanto al testo.
5. **Riga d'identità sopra l'H1** («Agenzia 4 in 1 · dal 2020 · Milano»): scesa al piede dell'hero come
   colophon (stesso testo). L'occhiello di pagina non è più una pill tinta: riga con la particella.
6. **Due loghi rotti nel marquee** (`c-16`, `c-24`): la ricolorazione in bianco aveva riempito il fondo
   opaco → quadrato e cerchio bianchi. Rigenerati dagli originali con una chiave sulla luminosità.
7. **Istogramma dei numeri** in blu e verde fuori palette → ultima barra accesa in arancio solo sul
   numero protagonista, bianca sulle due voci di conferma.
8. **Vuoti fra le sezioni**: i padding di sezioni vicine si sommavano (272px a 1440) → `--sez-y` da
   136 a ~106px a 1440; footer meno distante dal muro. Zona fredda dei numeri meno satura (si leggeva
   come un'altra pagina). Numero verde segnaposto tratteggiato: non sembra più un pulsante.

Trovati dalla verifica *dopo* le correzioni, e corretti nello stesso giro:
9. **La scena pinnata finiva sotto la nav**: il pin parte a `top top` e con il nuovo `--sez-y` il titolo
   cadeva sotto nav + barra fisse (106 < 121px). La sezione che contiene la macchina ora ha un respiro
   superiore di almeno barra + nav + 32px. Misurato: titolo 32px sotto la nav a 1440×900, 1280×720,
   1024×800 e su `metodo.html`; la scena entra intera anche a 1280×720.
10. **Link e-mail del footer a 32px su touch** (768/390/360, tutte le pagine): la soglia `pointer:
   coarse` di `chrome.css` veniva annullata da `sections.css`, che nel bundle arriva dopo. Ripetuta lì.

Esito della verifica del giro 2:
- **Audit** (`qa/audit-r2`, 8 pagine × 1440/1024/768/390/360, riassunto con `tools/qa/riassunto.mjs`):
  zero overflow orizzontale, zero elementi che sporgono, zero testi sotto i 12px, zero immagini senza
  alt, zero errori di console. Unico rilievo il punto 10. Una richiesta `ERR_ABORTED` del logo grande
  è il caricamento lazy interrotto dal cambio di pagina dell'audit, non un errore del sito.
- **Test funzionali** (`tools/qa/funzioni.js`): 15/15 + 15 ancore + 16 link interni a 200, zero errori JS.
- **Lighthouse mobile**: Home 96/100/100/100 (LCP 2,8 s, CLS 0, TBT 40 ms) · Metodo 96/100/100/100 (LCP
  2,1 s) · Eventi 96/100/100/100 (LCP 2,1 s). Le differenze di ±2 punti rispetto alla fase 5 sono
  rumore fra due esecuzioni sullo stesso server locale.
- **Prima/dopo** dei punti chiave: `docs/prima-dopo/01…08` (`node tools/qa/prima-dopo.mjs`; il «prima»
  è ritagliato dall'audit iniziale `qa/audit-prima`, il «dopo» è catturato dal vivo allo stesso scroll).

- [x] 7 · Giro 3, sulle richieste del cliente (14/10) — `269e670`

**Fase 7 — giro 3: il riscontro del cliente**

Il riscontro, testuale: *«puoi usare higgsfield per generare immagini dove servono · queste parti non
mi piacciono* [fregio FATTURARE, numeri con gli istogrammi, la macchina, il muro FATTURARE ×3, il
contro-esempio] *· inoltre non sono chiari i titoli delle sezioni · le pagine interne non mi piacciono,
sono ancora come quelle vecchie»*. Skill: impeccable (new-work, craft-floor), frontend-design,
design-taste-frontend, motion-design; immagini con Higgsfield.

*Diagnosi prima di toccare il codice.* «Titoli non chiari» voleva dire due cose, entrambe visibili nelle
catture del cliente: (1) **leggibilità** — a 30–64px il DM Sans 500 con -.036em di spaziatura fondeva le
lettere («fornitori» si leggeva «fomitori», «I numeri» → «Inumeri»); (2) **gerarchia** — ogni sezione
aveva due titoli, un occhiello minuto in una colonna di margine e un titolo-frase lontano da lui. Le
pagine interne erano lo stesso schema ripetuto sette volte (titolo centrato su nero, parola fantasma,
card) con quasi nessuna immagine.

*Il filo nuovo: un oggetto.* Il quadrato del marchio in volume, un **cubo arancione**, attraversa la home:
contatto sparso nell'hero 3D → cade fra due mani nel contro-esempio → passa di mano nella staffetta → è
alzato come un trofeo nel finale. Le fotografie lo rendono fisico con la grammatica della serie del
cliente (mani in bianco e nero, un oggetto arancione, fondo piatto).

1. **Titoli**: spaziatura display -.02em + word-spacing; via gli occhielli dalle teste (anche il
   craft-floor di impeccable li vieta); un titolo per sezione; nelle frasi in due tempi il secondo tempo
   scende di un gradino di luce (`.segue`). Gli occhielli che portavano informazione sono entrati nel
   sommario (es. «Dal 2020, senza arrotondare») o nel titolo («Quello che compri: due numeri, non un
   report»). Nessuna parola nuova inventata nei titoli.
2. **Fregio**: rimosso.
3. **Numeri**: campi di quadrati a unità — un quadrato = un imprenditore / un settore / un processo, la
   stessa griglia a 50 colonne (25 su mobile) per tutti e tre, quindi l'altezza del campo È la quantità.
   SVG con `<pattern>` (non 933 nodi), acceso riga per riga allo scroll con `steps()`.
4. **Contro-esempio**: foto a tutta larghezza (due mani che non si toccano, il cubo che cade), poi la
   catena dei quattro fornitori spezzata in tre punti con il cubo che cade sotto la linea allo scroll, e
   il conto con lo **zero vuoto** (solo contorno). Il rosso della perdita da `#CC3366` (lampone, stonava
   con l'arancio) a `#F04B3A`.
5. **Metodo → staffetta**: la sezione si ferma e scorre in orizzontale; quattro reparti (icona + numero
   fantasma, decisione cliente) alternati a tre foto del cubo che passa di mano, con cosa passa, SLA e
   strumento. Il contatto resta fermo al 32% dello schermo e accende ciò che attraversa. Su mobile e a
   motion ridotto è una colonna, tutta accesa.
6. **Finale** (era il muro): la mano che alza il cubo accanto al payoff a filo sinistro, tre righe uguali
   e la terza accesa; via la luce del cursore sulle lettere.
7. **Pagine interne**: apertura nuova per tutte, titolo a sinistra e una foto che dice la pagina (Metodo:
   la scalinata · Risultati: lo scontrino · DNA: la bussola · Eventi: il biglietto · Fatturare³: il
   microfono · Candidatura: la tazzina; Team: cinque ritratti veri disposti come i cinque quadrati del
   marchio). E un capitolo che esiste solo lì: le trenta sedie, i nove slot del trimestre, i libri come
   oggetti, i 33 settori in elenco, il manifesto a tutta misura, i fondatori con il ritratto. Contro-
   esempio e staffetta riusati nella pagina Metodo.

*Le fotografie.* 11 immagini generate con Higgsfield (`gpt_image_2_5`, qualità alta, 2k, due foto del
cliente come riferimento di stile), ~30 crediti in tutto. Il fondo quasi-nero delle foto non coincide con
nessuna atmosfera del palco: l'alfa è ricavata dalla luminanza (`tools/foto.mjs`), così mani e oggetto
galleggiano sul fondo del sito senza scatola. Originali, job e prompt in `assets-src/higgsfield/`.

*Verifica.* Audit 8 pagine × 1440/390 pulito (`qa/audit-r3`), passeggiate a scroll di home (1440, 390),
Metodo, Eventi, Candidatura, Fatturare³; test funzionali 15/15; Lighthouse mobile Home 96, Metodo 98 (era
93 finché la foto d'apertura aveva `fetchpriority="high"`: rubava banda all'H1, che è l'elemento LCP),
DNA 98, Team 94, Eventi 96 — accessibilità 100 ovunque.

- [x] 8 · Giro 4, sulle richieste del cliente (14/10, pomeriggio) — `a69dc55` (menu, home a capitoli,
  contro-esempio, podcast), `b86555a` (revisione indipendente, pagine interne), chiusura con DESIGN.md
  e prima/dopo 01–16 (`docs/prima-dopo/15-podcast.jpg`, `16-menu.jpg` nuovi)

**Fase 8 — giro 4: «la home ha tante sezioni disordinate»**

Il riscontro, testuale: *«questa parte non mi piace* [la riga «▪ Agenzia 4 in 1 · dal 2020 · Milano»
sotto l'hero] *· la home ha tante sezioni disordinate, in cui non si capisce gerarchia · Quattro fornitori
diversi non sono un reparto… riprogettala · Quello che pubblichiamo ogni settimana: dedica questa sezione
solo al podcast, manda al canale YouTube · la hero vorrei fosse a pillola e il menu effetto wow,
soprattutto da desktop, magari a card gigante»*.

1. **Hero a pillola.** La riga d'identità torna dentro la pill della prima consegna, sopra il titolo, in
   home e in tutte le aperture interne (`.pill-eyebrow`, type.css).
2. **Il menu è una card gigante**, su tutti gli schermi. L'header si riduce a marchio, candidatura e un
   bottone «Menu»; la card nasce DAL bottone (il suo rettangolo, misurato in JS, è il ritaglio di
   partenza della `clip-path`) e ci rientra alla chiusura, più veloce. Dentro: le sette pagine a corpo da
   titolo con una riga di descrizione allineata in colonna (subgrid), al passaggio le altre voci si
   spengono e a destra compare la fotografia di quella pagina (caricate solo alla prima apertura); in
   basso candidatura, mail, indirizzo, social. È un dialogo vero: fuoco intrappolato, Esc, clic sul velo,
   fuoco restituito al bottone, scroll bloccato senza salto della barra (`scrollbar-gutter`). Sette test
   nuovi in `tools/qa/funzioni.js`.
3. **La home a capitoli.** Prima: tredici sezioni in fila, ognuna col suo titolo grande e la sua luce,
   le prove PRIMA della spiegazione e il problema DOPO la soluzione. Ora: copertina (hero, loghi) → sei
   capitoli in ordine di racconto — 01 Il problema · 02 La soluzione · 03 Il metodo · 04 I risultati ·
   05 Le persone · 06 Il podcast — → chiusura (dove siamo, finale). Ogni capitolo apre con un
   segnacapitolo (numero, nome, filo che si disegna) e un h2; le sezioni che lo continuano hanno un h3 un
   gradino sotto e metà respiro sopra. **Una luce del palco per capitolo**, non una per sezione. Scorrendo,
   la nav dice in che capitolo sei.
4. **Il contro-esempio riprogettato.** Erano cinque blocchi (titolo, foto, un elenco di tre righe, un
   secondo elenco di tre righe, una frase) alti 2.000px, e non si capiva quale elenco contasse. Ora una
   scena: titolo → la foto in **tre strati** (`tools/strati.mjs`: mani e cubo separati per componenti
   connesse) che allo scroll si muove — le mani si allontanano, il cubo cade da fra le dita → il conto in
   tre colonne che scende **4 → 3 → 0**, con i tre passaggi rotti dentro il «3» e lo zero vuoto → la frase
   che chiude. Numeri bianchi: l'arancio, nel capitolo del problema, è solo il contatto che cade. Lo
   stesso conto nella pagina Metodo.
5. **Il podcast ha il suo capitolo.** Al posto dell'indice a tre righe: logo del podcast, cosa racconta
   (copy della pagina Fatturare³), il canale YouTube (`UCaB0Zuz1IO5pTSJ5qZPv8IA`, nuova scheda) e il
   microfono. Anche la pagina Fatturare³ ora porta al canale. ⚠ **Il logo allegato in chat non è
   arrivato su disco**: il build lo inserisce da solo appena esiste
   `src/assets/podcast/fatturare-logo.(svg|webp|png)`; finché manca, il nome resta scritto nella pill.
6. Rifiniture dallo stesso giro: via l'occhiello col trattino sopra i numeri (il «quando» sta
   nell'etichetta: «Imprenditori seguiti, dal 2020»), via «Oltre le parole», servizi senza icone, la
   particella orfana sopra i loghi, il secondo tempo dei titoli un gradino più chiaro (.68), il payoff
   del tetto arriva prima. Il finale ha un CTA solo (il podcast ha ormai il suo capitolo).
7. **Due bug JS trovati in verifica**: nel ramo per i browser senza `animation-timeline` (Firefox,
   Safari ≤17) `$('.rise, …').forEach` era chiamato su un elemento, non su una lista — l'errore fermava
   tutto il resto di motion.js; e la staffetta aveva lo stesso errore su `tappe`. Entrambi `$$`.
8. **Revisione indipendente** (impeccable-finish-reviewer, sulle catture rifatte dopo l'ultimo build —
   la prima volta le ha rifiutate perché più vecchie dei sorgenti, e aveva ragione). Otto correzioni,
   tutte applicate:
   - il **segnacapitolo** era un'etichetta da 15px: ora il numero è grande e a contorno (la voce dei
     numeri della staffetta), il nome accanto; nei capitoli che aprono con una composizione centrata
     (tetto, cartelli) sta impilato sopra il titolo;
   - il titolo del capitolo 04 era più piccolo degli h3 che lo seguono (48 contro 44px): ora a corpo
     pieno, con la colonna centrale dei cartelli più larga; il payoff del tetto non supera più l'h2;
   - su telefono h2 e h3 si leggevano uguali (30/26px): ora 36/22;
   - «I nostri numeri…» subito sotto «I numeri dei clienti…» era un doppione: i numeri continuano le
     schede con una riga d'attacco («Dal 2020, senza arrotondare»);
   - «Dove siamo» sembrava un settimo capitolo: titolo un gradino sotto; il podcast perde il secondo
     pulsante («Articoli e libri») e la pill dice solo «Fatturare Fatturare Fatturare»; il microfono su
     telefono non riempie più uno schermo;
   - menu: anello del fuoco stretto sulla parola, voci spente a ~5:1 invece di ~2,7:1, la foto se ne va
     con le voci alla chiusura, la nav sotto il velo si spegne (il marchio non si sdoppia più a metà
     apertura);
   - il conto 4 → 3 → 0 a tre colonne uguali, e la riga dello zero al corpo dei passaggi rotti.
9. **Pagine interne, dai rilievi rimasti del giro 3**: Risultati mette le schede dei clienti prima dei
   numeri (come la home); Eventi senza l'occhiello sopra i tre numeri (il «quando» passa nella nota);
   i numeri dei dieci principi del DNA un gradino sotto i titoli (grigi, arancio al passaggio); gli
   indici (podcast, articoli, ruoli) in subgrid, colonne allineate fra le righe.

10. **Le foto dei quattro reparti** (riscontro arrivato durante la chiusura: *«queste foto qua non mi
    fanno impazzire, vorrei immagini più realistiche, meno simboliche»*). Il megafono, la matita, il
    contratto arrotolato e il tocco erano le foto della serie del cliente usate come simboli. Al loro
    posto quattro **scene di lavoro** generate con Higgsfield (`gpt_image_2_5`, 4:5, 2k), luce scura e
    calda, un accento arancione dentro la scena: il media buyer davanti alle campagne (Pubblicità), le
    bozze di pagina annotate in arancio (Marketing), il colloquio con il CV in mano (Reclutamento), la
    lavagna con l'imbuto (Formazione). Dieci immagini generate, quattro scelte (~27 crediti); scartate
    quelle con un volto riconoscibile e quelle con la cupola di Roma alla finestra — lo studio è a Milano.
    Varianti web opache (`node tools/foto.mjs reparto-`), provenienza in `assets-src/higgsfield/`.
    Cambiano in home e nella pagina Metodo (stesso componente). Le foto della serie del cliente restano
    dove servono come oggetti (fascicoli di Risultati).

*Verifica.* Audit 8 pagine × 1440/1024/768/390/360 senza rilievi (`qa/audit-r4`, `qa/audit-r4b` dopo il
cambio dei titoli su mobile); passeggiate a scroll della home a 1440 e 390 (`qa/r4-home-*`); test
funzionali 36/36, sette nuovi sul menu; Lighthouse mobile Home 96/100/100/100 (LCP 2,8 s, CLS 0,
TBT 10 ms), Metodo 97, Fatturare³ 98 — accessibilità 100.

- [ ] 9 · Ciclo di miglioramento continuo con agenti (14/10, sera) — *«perfeziona tutto, ciclo continuo
  di miglioramento, feedback fra te e i tuoi agenti» · «aggiungi effetti nelle pagine»*

**Fase 9 — il ciclo**

Ogni giro: prove fresche (audit 8 pagine × 5 larghezze `qa/audit-c<n>`, passeggiate della home
`qa/c<n>-home-*`) → agenti in parallelo, ognuno con un mandato stretto e senza toccare i file → io
verifico ogni rilievo sul sito vivo, scarto quelli sbagliati e dico perché, correggo in blocco →
build, test funzionali, audit → commit → il giro dopo riparte dalle stesse domande sul nuovo stato.

Giro 1 — agenti: regia del movimento (inventario degli effetti pagina per pagina e un effetto-firma
per ogni pagina interna), collaudo Firefox + WebKit e tastiera, correzione di bozze, revisione di
design delle pagine interne, seconda revisione della home.

*Le prove prima di tutto.* Il revisore delle interne ha rifiutato le catture del Metodo: le foto della
staffetta mancavano. Il sito era a posto (verificato: caricate, opacità 1); era l'audit che scattava
la pagina intera prima della DECODIFICA delle immagini fuori viewport (`decoding="async"`). Corretto
`tools/qa/audit.js`: scorre la pagina, aspetta ogni `naturalWidth`, forza la decodifica.

*Applicato (parte A, design e testi):*
- **Foto dei reparti nella grammatica del sito.** A colori pieni sembravano foto di repertorio accanto
  alla serie in bianco e nero. `tools/foto.mjs` ora le vira: grigio con un filo di colore (18%), neri
  schiacciati, e resta pieno solo l'arancio molto saturo (pennarello, cartellina, grafici, imbuto).
  Prima prova sbagliata — anche mani e legno caldo diventavano arancioni — corretta stringendo la
  soglia di saturazione (e, nella foto della pubblicità, la soglia larga vale solo sui monitor).
  Inquadratura per scheda sulle mani al lavoro e un taglio «stretto» per il telefono (`<picture>`).
- **Home**: il numero dei reparti della staffetta non supera più quello del capitolo (64 contro 84px);
  titoli dei quattro pannelli alla stessa altezza; il tetto senza icone (le hanno già i reparti della
  staffetta); niente occhiello sopra il titolo del podcast (il nome passa nella nota); stacchi fra
  capitoli misurati e pareggiati (il titolo delle schede era a 28px dai pugni).
- **Pagine interne a due livelli, come la home**: le sezioni che continuano un argomento hanno un h3 e
  la stessa luce (Risultati: numeri e settori; DNA: missione e visione; Metodo: tabella e reparti);
  «Via Marco D'Agrate» un gradino sotto; nel Metodo due capitoli («Il problema», «Il metodo») senza
  numero, didascalie della staffetta accanto alle foto, bordo sinistro allineato al resto (la pista
  usava la larghezza dell'involucro senza i margini: 80px invece di 120); Candidatura: le tre tappe
  accanto al modulo (era l'ultima sezione e ripeteva i punti dell'elenco); DNA: missione e visione
  senza occhiello arancione e un gradino sotto la chiusa del manifesto; Team: niente quadratini
  arancioni nelle schede dei fondatori (regola del cliente), volti dell'apertura `aria-hidden`;
  Fatturare³: niente colonna di etichette nel podcast, e i due libri disegnati in CSS sostituiti da una
  foto della serie con i titoli veri (dalla pagina Team: *Lo Schema Perfetto*, *Accelerare il
  Fatturato!*); Risultati: 33 settori su due colonne anche da telefono.
- **Dati e testi** (correzione di bozze, 49 voci: applicate quelle certe): «Tutte e tredici» → dodici
  (il team è di dodici); il primo cliente aveva numeri diversi fra scheda e fascicolo (4 contro 14
  venditori, Meta + telefono contro Meta + fiere) → allineati; **le schede provvisorie non dichiarano
  più «con liberatoria»**: finché `prov:true` stampano «Dato provvisorio · in attesa di liberatoria» e
  la nota sotto il nastro lo dice; il pulsante della pagina Eventi tornava «Invia la candidatura»
  invece di «Prenota il posto» (bug, test aggiunto); «Reparti 01 e 02», orari con il trattino breve,
  «Apple Podcasts», CAP prima della città nel footer, apostrofi dritti ovunque, «Cofondatore», «in
  Borsa», «non spetta a noi mostrarli», «un tempo e un responsabile», «Preferisci scriverci?» (il
  numero di telefono non c'è), una nota interna visibile ai visitatori tolta da Fatturare³; una
  concordanza nel testo del cliente (DNA: «Se guidati…»).
- **CSS morto rimosso** (card «a lente», risorse a card, fascia crema, classi mai usate): il foglio
  unico passa da 110 a 105 KB senza cambiare un pixel.

*Applicato (parte B, «aggiungi effetti nelle pagine»).* La regia del movimento ha fatto l'inventario
pagina per pagina (animazioni vive lette con `document.getAnimations()`, non dal codice) e ha proposto
un effetto-firma per ogni pagina interna, nato dal contenuto della pagina, dentro i tre gesti del
sistema (gradino, riga, luce). Il criterio: togliendo l'effetto, chi guarda perde un'informazione?
- **Metodo · il filo della staffetta**: un filo arancione scende nel margine alla linea di lettura
  (60% dello schermo), ogni reparto si accende quando il filo lo raggiunge, il cubo si posa sulla
  trattativa. Vale anche per la staffetta della home su telefono (prima era ferma).
- **Risultati · i mesi in mezzo**: nel fascicolo, il prima, gli undici mesi che si accendono uno per uno,
  il dopo. Volutamente NON un numero che conta da 1,4 a 3,1: stamperebbe valori che nessun cliente ha
  dichiarato. Apertura: lo scontrino si srotola dal basso.
- **DNA · un principio alla volta**: la luce della riga segue la lettura; niente resta acceso.
- **Team · il marchio fatto di volti**: i cinque volti arrivano sparsi e si montano nei cinque quadrati
  del marchio (il gesto dell'hero, fatto con le persone); nella frase sopra la griglia, passando su
  «Giulia», «Cristian», «Matteo» si accende la loro faccia.
- **Eventi · la sala posto per posto**: prima il palco, poi le trenta sedie una per una dalla prima fila
  (prima si accendevano a blocchi di dieci).
- **Fatturare³ · detto tre volte**: il titolo in tre tempi, il microfono sale con il terzo.
- **Candidatura · gli slot del trimestre**: i quattro assegnati si riempiono uno per uno, i cinque liberi
  restano vuoti (nessun conto alla rovescia).
- **Home**: il trofeo del finale ora si alza (era l'unico fotogramma fermo del racconto del cubo); il
  conto 4 → 3 → 0 cade in ordine; il segnaposto della mappa cade una volta invece di pulsare
  all'infinito; la scalinata del Metodo si costruisce all'apertura.
- **Un bug vero**: nel Metodo ogni clic su un filtro della tabella rifaceva la transizione di PAGINA su
  tutto lo schermo, con righe vecchie e nuove sovrapposte per 700ms (`startViewTransition` senza un
  nome sulla tabella). Ora le righe del reparto si rimettono in fila (WAAPI, 320ms).
- **Animazioni infinite**: restano solo i loghi dei clienti (con pausa). Spente le 14 dei contatti
  dell'hero sotto la scena 3D (nessuno le vedeva) e il segnaposto che pulsava.
Verifica: ogni effetto fotografato a più punti di scroll/tempo; movimento ridotto su 8 pagine → niente
di invisibile, nessuna animazione infinita; console pulita; 38/38 test; Lighthouse mobile Home 96,
Team 97, Fatturare³ 98, Risultati 97, Metodo 98, CLS 0. Il velo arancione dentro i numeri dei capitoli
faceva scendere l'accessibilità della home a 96 (lo strumento misurava il riempimento, 1,27:1, invece
del contorno): spostato su uno strato a parte, di nuovo 100.
*Da decidere (C2)*: su telefono i quadrati dell'hero galleggiano all'infinito (versione DOM approvata);
proposta: due oscillazioni e poi fermi.

*Rilievi non applicati, e perché:* nel Metodo, filtrare la tabella sul primo reparto da telefono
(nasconderebbe nove righe su dodici a chi non tocca i filtri); nella correzione di bozze, le frasi del
cliente che sono scelte di tono e non errori («in fondo al tuo bilancio», «Do more with less»,
«Uffici di rappresentanza») → elencate per il cliente in §6.

*Giro 2 (revisione) e giro 3 degli effetti — «aggiungi ancora effetti wow, deve superare il sito
della Apple».* Il vocabolario delle pagine prodotto Apple tradotto nei tre gesti del sistema, senza una
riga di testo nuovo; più le correzioni chieste dal revisore della home al giro 2.
- **La foto che passa di mano** (tutte le pagine): dal menu a card gigante la fotografia della pagina
  sotto il cursore VOLA al suo posto nell'apertura della pagina nuova, mentre la pagina sale a gradini
  attorno a lei; verso il Team volano i cinque volti, uno dietro l'altro. View Transitions fra documenti
  con un nome dato al volo (motion.js nella pagina che parte, `pagereveal` nel <head> di quella che
  arriva, `<link rel=expect blocking=render>`). La card del menu si dissolve da sola in 280ms; al clic
  la voce scelta resta accesa e le altre si spengono. Più: la pagina sotto il cursore si scarica prima
  del clic (Speculation Rules, solo prefetch dell'HTML). È una cosa che il sito Apple non fa.
- **La frase che si accende** (home e Metodo «E paghi quattro volte lo stesso contatto…», DNA chiusa del
  manifesto): parole grigie che si accendono alla linea di lettura (split di build `data-accendi`).
  Spenta è --c-t4, 3,8:1: sopra la soglia AA per testo grande anche prima di accendersi.
- **Il numero a rullo** (home e Risultati, 150 · 33 · 750): contatore meccanico, colonne di cifre alla
  larghezza vera del DM Sans (il font servito non ha cifre tabellari: misurate), il numero vero resta
  nel testo per i lettori di schermo.
- **Il finale fermo** (home, desktop): la sezione è alta due schermi e il contenuto resta fermo per il
  secondo: le tre righe atterrano, il braccio alza il cubo, la luce sale, poi frase e CTA. Risolve il
  rilievo del giro 2 (trofeo e payoff non stavano mai nello stesso schermo).
- **L'hero che si allontana**, **il numero del capitolo che si posa** (entra a 2,3× e si posa accanto al
  nome), **gli schermi che si alzano** (le testimonianze entrano inclinate e si alzano in piano).
- **Correzioni del giro 2**: gli otto servizi su telefono sono una galleria orizzontale nativa (da
  1.000px a ~230px); «Dove siamo» con mezzo respiro (non è un capitolo); 02 → 03 da 357 a ~220px (una
  regola non scattava più quando GSAP avvolge la staffetta nel suo pin-spacer); il filo della staffetta
  su telefono corre sul bordo della colonna, senza gancio; la foto del reclutamento ritagliata sulla
  cartellina arancione; nel Metodo i due segnacapitolo hanno di nuovo il numero.
- **Strumenti**: l'audit scorre in modo istantaneo e non porta allo stato finale le animazioni d'uscita
  (l'hero «spento» falsava la misura dei bersagli tattili).
Verifica: catture a più punti di scroll (1440 e 390) e del volo fra le pagine fotogramma per
fotogramma; 38/38 test; movimento ridotto su 8 pagine pulito; audit 8 pagine × 5 larghezze senza
rilievi; Lighthouse mobile Home 96, Metodo 97, DNA 98, Risultati 97, accessibilità 100, CLS 0.

*Giro 3, revisione della regia* (agente: «Hero 3D, staffetta e finale fermo sono al livello Apple;
Apple vince ancora sui fotogrammi di mezzo»). Applicato:
- **Bug**: le testimonianze si inclinavano anche a movimento ridotto; il fuoco della tastiera poteva
  finire su un bottone invisibile (hero in uscita, CTA del finale): ora il fuoco lo riporta pieno; zeri
  tagliati nel rullo fermo (la prima riga del tamburo ora è vuota); il menu poteva riaprirsi spento
  dopo una partenza interrotta; la scena 3D girava sotto la card del menu, opaca (ora si ferma).
- **Il volo dal menu, coreografato**: fra 100 e 250ms si sovrapponevano elenco, titolo vecchio e
  titolo nuovo e i gradini non si vedevano. Ora la card se ne va in 180ms, la pagina vecchia sparisce,
  la foto resta sola sul buio e la pagina nuova sale a gradini attorno a lei (tipo di transizione
  dal-menu); in volo la foto si solleva del 6%; i cinque volti partono a 90ms l'uno dall'altro.
- **Regolazioni**: rullo con un giro in più al massimo e il tamburo che sfuma ai bordi mentre gira
  (prima sfarfallava); hero che resta pieno per il primo terzo dell'uscita; numero del capitolo da 1,8×
  e il nome che si scopre dopo, mai sotto il numero; schermi lineari su un tratto lungo; finale e
  frase che si accende ritarati; filo arancione che dice quanto resta della galleria dei servizi.
- **Tre momenti nuovi proposti dalla regia**: *il bottone diventa la pagina* («Candida la tua
  azienda», ovunque: il bottone si allarga, si spegne nel buio e dentro compare la candidatura —
  parte dal colore del bottone, bianco nell'hero, arancio altrove; mai testo bianco sull'arancio);
  *il cubo sul filo* (su telefono e nel Metodo un cubo del marchio cavalca la punta del filo della
  staffetta e si posa sulla trattativa); *l'ultimo passaggio è tuo* (nel finale la luce lascia il cubo
  e va ad accendere il CTA).
- **Movimento ridotto**: un controllo nuovo elenca ogni animazione viva a movimento ridotto; restano
  solo dissolvenze (le tre righe del finale erano già bloccate da una regola !important, ora anche
  senza animazione).
Verifica: catture del volo, del bottone e del cubo fotogramma per fotogramma; 38/38 test; audit
senza rilievi; Lighthouse mobile Home 96, Candidatura 98, Team 96, accessibilità 100, CLS 0.
*Giro 3, QA su più browser* (Chrome 155, WebKit/Safari 26.6; Firefox non avviabile in questo ambiente:
la sua strada di ripiego è stata provata con Chrome senza view() né View Transitions). Applicato:
- **Il passaggio fra le pagine saltava in avanti, in Chrome.** Non era l'ambiente di prova (come
  avevo scritto): l'adesione @view-transition stava solo in sito.css, e Chrome decide se fare il
  passaggio prima di aver riconvalidato il foglio. Ora è in linea nel <head> di ogni pagina: 6 voli su
  6 e 4 aperture del bottone su 4. In produzione dipendeva da come l'host mette in cache sito.css.
- **Il rullo tagliava 2–3px a destra della cifra** (la spaziatura negativa applicata due volte).
- **Menu e tastiera**: con il menu aperto il resto della pagina è inerte (Safari col Tab usciva
  verso i bottoni dietro la card) ed Esc chiude anche se il fuoco è caduto sul <body>.
- Il menu che si riapriva spento dopo una navigazione interrotta era già corretto (riparti()).
Restano: «Prefetch request denied: URL must be secure» in WebKit sul server di sviluppo (http); in
produzione su https non compare.

*Giro 3, secondo passaggio della regia* (con i passaggi fra le pagine finalmente veri, fotogramma
per fotogramma): tutti gli otto effetti passano; «il volo dal menu va oltre qualunque cosa ci sia
su apple.com, che non ha coreografie fra le pagine»; frase, rullo e finale fermo al livello Apple.
Applicato:
- **Menu su telefono** (senza anteprime): il tipo dal-menu arriva sempre; prima per 120ms si vedevano
  menu, titolo vecchio e titolo nuovo insieme.
- **Logo doppio** nel volo da desktop fra 60 e 150ms: la card copre nav e barra mentre se ne va.
- **Il bottone diventa la pagina**, fotogrammi di mezzo: dal bottone arancio la scritta sparisce
  subito (il pannello È il bottone), dal bianco il pannello parte già buio; la pagina entra prima (niente
  200ms di vuoto); il pannello non copre la nav da cui parte.
- **Il cubo sul filo** è sticky dentro un binario misurato al ridimensionamento: lo muove il
  compositore con lo scroll (sui telefoni un listener lo lasciava un fotogramma indietro).
- L'ultimo passaggio parte dal cubo già acceso e passa dietro alle parole; il filo del capitolo si
  disegna dopo il nome; l'hero resta pieno fino a metà uscita; il nome del capitolo in nav non si
  muove più a movimento ridotto.
Verifica: 38/38 test, movimento ridotto senza movimento, audit senza rilievi, Lighthouse mobile
Home 96, Metodo 97, Candidatura 99, accessibilità 100, CLS 0.

*Ritocchi del 15.10* (prima versione; preloader, cursore e polvere sono stati poi corretti dalla
revisione della regia: vedi il paragrafo successivo) — «metti il logo corretto; dati fiscali corretti nel footer, cercali sul web;
preloader e transizioni fra le pagine; nella barra in alto per ora "vuoi collaborare con noi? Candida
la tua azienda"; effetti mouse ed effetti di sfondo leggeri fra le sezioni».
- **Il logo.** La variante della nav era stata ricavata TAGLIANDO il file del cliente in altezza (per
  togliere il payoff), e il taglio mozzava l'ultimo quadrato del marchio. Ora ovunque il lockup intero
  (marchio completo, nome, payoff), come nell'intestazione del sito ufficiale: 40px nella nav su
  desktop, 34 sotto i 1100px, 30 sui telefoni. Una differenza resta (§6): il logo pubblicato su
  salesprocess.it ha il payoff con i punti, il file HD ricevuto con le virgole.
- **I dati fiscali** (cercati sul web e incrociati, non inventati): Sales Process S.r.l. · P.IVA e C.F.
  03924340130 (footer ufficiale di go.salesprocess.it; reportaziende.it; companyreports.it) · REA
  CO-407061 (companyreports.it, visurissima.it) · capitale sociale € 30.000,00 (footer ufficiale di
  go.salesprocess.it) · sede legale Piazza IV Novembre 1, 22070 Capiago Intimiano (CO) (visurissima.it).
  Tolti i segnaposto «[Ragione sociale]», «P.IVA [da cliente]» e «ISO 9001:2015 n. [da cliente]»: il
  numero del certificato non è pubblicato da nessuna parte (resta «Certificazione · in arrivo»).
- **La barra in alto**: «Vuoi collaborare con noi? · Candida la tua azienda →», verso la candidatura (al
  posto del Sales Process Day del 14.10, ormai passato). Chiave di chiusura nuova: chi aveva chiuso
  l'annuncio dell'evento vede l'invito.
- **Il sipario** (preloader e passaggio fra le pagine): alla prima pagina della sessione il logo vero sale,
  un filo arancione si carica, poi quattro gradini scuri salgono uno dopo l'altro (il gesto del marchio)
  e la pagina si compone mentre si scopre, in circa 2 secondi. Nei browser senza View Transitions fra
  documenti (Firefox) lo stesso sipario fa da passaggio: i gradini salgono a coprire, la pagina nuova
  nasce coperta e si scopre. Dove le View Transitions ci sono, la pagina vecchia si spegne, per un
  attimo sul buio resta il logo, poi la nuova sale a gradini. Non blocca i clic; nessun sipario a
  movimento ridotto.
- **Il mouse**: il cursore-particella (il punto è la particella arancione del marchio, esatto; un anello
  lo segue, abbraccia i bottoni senza spostarli, si accende sui link, si allarga sulle foto; nei campi di
  testo torna il cursore del sistema) e la profondità (fotografie e polvere scivolano di pochi pixel in
  senso opposto al cursore, ognuna alla sua distanza: nel contro-esempio il cubo si sposta più delle
  mani). Solo mouse e senza movimento ridotto.
- **Lo sfondo**: la polvere (diciannove quadrati del marchio quasi spenti su due piani, salgono piano con
  lo scroll e col mouse; nessun ciclo infinito) e la lama di luce sui confini fra le stanze (dove cambia
  la luce del palco: si allarga dal centro e si accende quando il confine passa a metà schermo).
Verifica: catture del preloader (desktop e telefono), del passaggio con il logo, del sipario di ripiego
(simulato in Chrome togliendo le View Transitions), del cursore e degli sfondi; 38/38 test (aggiornata la
chiave della barra nel test); movimento ridotto pulito; audit 8 pagine × 5 larghezze senza rilievi;
Lighthouse mobile Home 95, Metodo 96, accessibilità 100, CLS 0 (il preloader costa ~0,2s di Speed Index).

*Ritocchi del 15.10, revisione della regia* («così come sono, preloader e cursore peggiorano
l'usabilità»). Applicato:
- **Preloader**: si alza a 0,45s (era 1,1s) e sparisce entro ~1,1s; un clic, un tasto o la rotella lo
  fanno salire subito; finché copre intercetta i clic (prima passavano ai bottoni nascosti sotto: un clic
  sul sipario portava alla candidatura); mai sulla pagina Candidatura; l'apertura della pagina non
  aspetta più sotto il sipario (la foto del Metodo, in pausa, spostava l'LCP a 1,1s). Tolto lo stacco a
  tre quarti dello schermo (il calore del pavimento è un bagliore unico).
- **Cursore**: il cursore del sistema resta sempre visibile (nascosto, toglieva il cursore di testo, si
  bloccava nei momenti lenti e restava incastrato sui video); resta l'anello come accento, che abbraccia
  i bottoni e sparisce sui video e nei campi; spento anche con contrasto elevato o colori forzati.
- **Passaggio fra le pagine**: la pagina vecchia esce in 160ms e il logo resta solo sul buio per ~140ms
  prima dei gradini; il sipario di ripiego parte dopo 220ms (era 470).
- **Barra**: l'invito «Candida la tua azienda» è una frase sottolineata con la freccia, non una pill: con
  la pill la prima schermata aveva tre bottoni identici (barra, nav, hero).
- **Polvere**: 12 quadrati più grandi (a 1x i più piccoli sembravano pixel morti); la lama di luce anche
  sulla staffetta fissata (#metodo dentro il pin-spacer). **Logo del footer** non più schiacciato del 5%.
Verifica: 38/38 test; movimento ridotto pulito; audit 8 pagine × 5 larghezze senza rilievi; Lighthouse
mobile Home 95 (Speed Index 2,1s, era 3,0s), Metodo 97, Candidatura 98, accessibilità 100, CLS 0.

*Il logo del podcast (15.10)* — «Fatturare Fatturare Fatturare: questa sezione non mi piace, incolla lì il
logo del podcast» (con il logo allegato). Nel finale della home le tre righe tipografiche FATTURARE sono
diventate il logo del podcast (che il payoff lo porta già scritto): una copertina con gli angoli
arrotondati che atterra come un adesivo e si raddrizza, accanto al braccio che alza il cubo; la nota «Il
payoff, e anche il nome del podcast» resta sotto. Lo stesso file entra dagli agganci già pronti nel
capitolo podcast della home e nella sezione podcast di Fatturare³ (il logo del giro 4 non era leggibile).
Originale in assets-src/podcast/, versione web 24 KB. Il file è 300×300: sopra i 150px, sugli schermi
retina, si sgrana un poco (§6). Se invece «questa sezione» era il titolo della pagina Fatturare³, va
spostato lì.

*Il conto 4 · 3 · 0 (15.10)* — «questa sezione è poco leggibile». Le tre colonne avevano tre grammatiche
diverse (un elenco; coppie grigie da 14px alternate a frasi grandi; una frase sola) e titoli quasi al corpo
del testo. Ora hanno la stessa anatomia, allineata riga per riga (subgrid): numero e titolo (600, più
grande), un filo, il contenuto, la nota in fondo; un filo verticale separa i tre conti. Nei passaggi rotti
prima cosa cade, in bianco, poi fra chi e chi (15px e 80% di luminosità, prima 14px e 56%); lo zero vuoto
con il contorno a 3px, così si legge come cifra. Home e Metodo; polvere del palco più tenue.

*Schede, recensioni, team e finale (15.10, pomeriggio)*
- **Le schede dei clienti** («togli provenienza e dato provvisorio, anima le card»): tolta la riga della
  fonte da ogni scheda e la nota sotto il nastro (Home e Risultati). Le schede entrano a ventaglio quando la
  fascia sale (una dopo l'altra, dal basso, appena ruotate); quella che passa al centro si accende: bordo
  arancio, la torre del «dopo» che ricresce dal livello di partenza, i dettagli aperti. Su telefono e tablet,
  dove il nastro è uno scorrimento nativo, la scheda al centro si accende lo stesso. Al passaggio del mouse
  sale di un gradino. ⚠ Senza fonte i numeri sembrano definitivi: vanno confermati prima di andare online (§6).
- **Le recensioni** («migliora la sezione delle recensioni»): non più cinque riquadri uguali ma un lettore
  e la sua scaletta. Il video scelto è grande; accanto le cinque testimonianze in fila, con miniatura e nome;
  si sceglie e il video parte lì con un clic solo (la miniatura in onda è a colori, con il filo arancio). Il
  player resta a facciata: nessun iframe finché non si clicca. Su telefono la scaletta va sotto. Tolta la
  sesta cella «I numeri dei nostri clienti, con fonte e data»: con il lettore la griglia non ha più un buco
  da chiudere, e le schede non hanno più la fonte.
- **Il team**: tolta Paola Russo; aggiunto Andrea Berrini, Direttore marketing, nel reparto Marketing (home e
  pagina Team). Manca il ritratto: per ora le sue iniziali, grandi e a contorno, nello stesso riquadro (§6).
- **Il finale** («ripristina la sezione fatturare fatturare fatturare come era prima però rendila più wow»):
  tornano le tre righe al posto del logo del podcast (che resta nei capitoli podcast). Su desktop la scena
  resta ferma mentre le righe, a tutta scala (fino a 210px), atterrano una dopo l'altra; poi una luce le
  attraversa dentro le lettere, una riga dopo l'altra; il braccio con il cubo sale DAVANTI al payoff; poi la
  frase e il CTA, che la luce accende da dietro. Su telefono e tablet le righe prendono tutta la larghezza
  della colonna, come un manifesto (65–150px), e la luce passa mentre salgono. A movimento ridotto: righe
  piene, ferme.
Verifica: 38/38 test (il video di testa entra al clic, la scaletta cambia video e carica il player giusto);
movimento ridotto senza movimento né testo invisibile; audit 8 pagine × 5 larghezze senza rilievi; righe del
finale misurate a 360/390/768/900/1023px, nessuna esce dalla colonna; Lighthouse mobile Home 95, Risultati 96,
Team 96, accessibilità 100, CLS 0.

*Gli otto servizi (15.10)* — «qui vorrei delle icone animate, o almeno delle piccole infografiche». Ogni
servizio (Home e Metodo) apre con una piccola infografica animata, non un'icona da catalogo: una scena di
circa due secondi su una tela 96×48, con il tratto delle icone del sito e il soggetto in arancio (la
particella del marchio: il contatto, la trattativa, il titolare).
- Costruzione del processo: tre passaggi si collegano, un contatto li attraversa, l'ultimo si chiude con la spunta.
- CRM e pipeline: le colonne si riempiono, una trattativa passa all'ultima colonna e si accende.
- Script e gestione obiezioni: la domanda del cliente, poi la risposta che si scrive; la domanda si fa da parte.
- Offerta e prezzo: il cartellino si posa ruotando sul suo foro, lo scudo lo difende.
- Direzione commerciale: l'ago della bussola gira e si ferma sul numero finale, in cima a una linea che sale.
- Rendiconto settimanale: quattro settimane che si sommano superano la linea del mese, poi la spunta.
- Riattivazione dormienti: una griglia di contatti spenti, cinque si risvegliano uno dopo l'altro con un'onda.
- Formazione del titolare: la guida sale due gradini insieme al titolare, poi si ferma e lui fa l'ultimo da solo.
La scena parte quando è a schermo (le quattro voci di una riga a 140ms l'una dall'altra; nella galleria del
telefono quando la card entra di lato) e si ripete al passaggio del mouse, solo a scena finita. Nessun ciclo
infinito, nessun riquadro tinto sotto; a movimento ridotto la scena è già finita. Era una regola mia del giro 4
(«gli otto servizi non hanno icone»): la richiesta la supera, e DESIGN.md ora la descrive così.
Problema trovato: la classe `avanza` della trattativa era già quella della barra di avanzamento della pagina
(il rettangolo diventava una linea fissa di 2px): rinominata `trattativa`.
Verifica: catture della sequenza a 0,2–3,6s (desktop, telefono, passaggio del mouse, movimento ridotto); 38/38
test; movimento ridotto senza movimento né invisibili; audit 8 pagine × 5 larghezze senza rilievi; Lighthouse
mobile Home 95, Metodo 97, accessibilità 100, CLS 0.

*La staffetta diventa un percorso (15.10)* — «Il fatturato non si perde nei reparti…: questa sezione è molto
bella ma gli elementi fluttuanti senza casa rendono tutto disordinato. Mi piace l'impostazione orizzontale, che
manterrei, ma vorrei fosse un percorso. Aggiungi animazioni, container e rendila chiara alla lettura.»
- **Le case**: ogni tappa è una card. I quattro reparti (numero fantasma e icona, nome, cosa fa, e in fondo
  sotto un filo cosa consegnano), i tre passaggi (la foto del cubo che passa di mano in una cornice con la sua
  luce, «Passaggio n di 3», cosa passa, e il tempo e lo strumento come due etichette con il loro segno),
  l'arrivo (la trattativa, la card calda). Prima le didascalie dei passaggi stavano a un'altra quota delle foto.
- **Il percorso**: una linea sola, che è il bordo delle card (in orizzontale il bordo alto, in colonna il
  sinistro), con un nodo per tappa: cerchio il reparto, quadrato il passaggio, quadrato grande l'arrivo.
- **Le animazioni**: su desktop resta la scena orizzontale fissata; una sola timeline fa scorrere la pista,
  accende la linea dietro il cubo e porta il cubo da un nodo all'altro. Quando arriva, il nodo si accende con
  un'onda, la tappa si accende (il numero, l'icona, la consegna, e nella foto il cubo diventa arancione) e la
  card dove sta il cubo ha il bordo e un'ombra calda. Le card che arrivano da destra si srotolano dalla linea.
  Su telefono, tablet e nella pagina Metodo è una colonna: la linea scende sul bordo sinistro alla linea di
  lettura, il cubo la cavalca e ogni tappa si accende quando il suo nodo la attraversa. A movimento ridotto è
  tutto acceso e fermo.
- Il testo non si spegne mai (si spengono solo i segni e la foto): una card «in attesa» resta leggibile.
- Nella pagina Metodo la colonna su desktop ha card a due colonne (chi e cosa a sinistra, il resto a destra).

*Il team in home* — «le modifiche al team vanno fatte anche in home page». Nel codice la home aveva già il
team nuovo (Andrea Berrini con le iniziali, senza Paola Russo: lo stesso elenco della pagina Team, verificato
nel carosello). La causa probabile è la cache: il foglio di stile aveva la versione nell'indirizzo, i due
script no, e un browser che li aveva già scaricati poteva mostrare la pagina nuova con i dati vecchi. Ora anche
`dati.js` e `motion.js` hanno la versione nell'indirizzo (`?v=` dal loro contenuto, nel build).
Verifica: catture della scena a 1024, 1280, 1440 e 1920 in nove punti dello scorrimento, della colonna a 390,
900 e nel Metodo, e a movimento ridotto; 38/38 test; movimento ridotto senza invisibili; audit 8 pagine × 5
larghezze senza rilievi; Lighthouse mobile Home 95, Metodo 96, accessibilità 100, CLS 0.

*Risultati: solo il logo (15.10)* — «anche in pagina risultati togli provenienza e settore e modifica le
immagini, magari lascia solo logo». Le schede dei clienti (Home e Risultati) hanno in testa solo il logo, più
grande, in una sua fascia; le legende dei numeri non citano più la fonte; il fascicolo apre con il logo del
cliente grande sulla sua luce al posto della foto, e la sua riga dice «Fascicolo 01 · 11 mesi». Tolti «fonte» dal
titolo dei numeri, dalla descrizione della pagina e dalla frase d'apertura.

*Audit di tutte le pagine (15.10)* — «fai un audit di tutte le pagine e sistema e rendile da oscar. tutte!».
Catture a scorrimento di 8 pagine a 1440 e 390 (172 fotogrammi), quattro revisori in parallelo (Home; Metodo e
DNA; Risultati, Team e Candidatura; Eventi e Fatturare³), Lighthouse su tutte. Corretto:
- **Un solo arancione per schermo** (la regola del sistema, violata quasi ovunque): quando a schermo c'è già un
  invito arancione della pagina (una chiusa, il finale, il form, la sala), il bottone della nav diventa un
  contorno e la piastra del telefono scende. Prima la piastra conosceva solo Candidatura e Home, e in Metodo, DNA,
  Eventi e Fatturare³ restava sopra la chiusa. Il play dei video è bianco.
- **Telefono**: passata l'apertura, la barra in cima esce e la nav sale (barra, nav e piastra prendevano un quarto
  dello schermo). Titoli d'apertura più grandi (Home 46–60px, pagine interne 38–52px); la foto d'apertura delle
  pagine interne più piccola, a destra, nel primo schermo; nel Team il marchio fatto di volti apre la pagina.
- **Giunture**: gli aloni delle chiuse, del tetto e del form nascevano con una riga dritta sul primo pixel della
  sezione; ora sfumano. Mezzo respiro (non uno intero) fra le chiuse e il piè di pagina.
- **Piè di pagina**: il segnaposto «Numero verde da fornire» non si mostra più (torna da solo con il numero, §6);
  riga legale allineata.
- **Home**: il finale fermo parte dall'alto (prima ~300px di palco vuoto fra la mappa e le righe); sul telefono il
  braccio con il cubo esce dalle tre righe invece di restare sotto il CTA; la staffetta finisce con le card al
  margine destro (non a mezzo schermo vuoto) e il capitolo 04 non galleggia più a 350px; il campo dei 750 sul
  telefono è su 40 colonne (era alto mezzo schermo); «Dal 2020, senza arrotondare.» è una frase, non una
  didascalia; nel lettore dei video il play sta in basso a sinistra e non copre i volti.
- **Metodo**: righe orfane nei titoli (spazi che non vanno a capo, testo invariato); su telefono la tabella è
  raggruppata per reparto (il nome una volta sola: erano 2.400px di card che lo ripetevano); lo SLA in bianco
  (dodici celle arancioni erano vernice); nel percorso il nodo del passaggio acceso è vuoto, così non si confonde
  con il cubo; in colonna la foto del passaggio è una striscia (il passaggio collega, non pesa più dei reparti).
- **DNA**: missione e visione con la gerarchia giusta (la frase in bianco grande, l'etichetta sotto); il filo che
  apre la chiusa del manifesto corre per tutta la misura; la luce di lettura dei principi sta dentro la colonna.
- **Risultati**: il nastro tiene le schede alte uguali (i dettagli della scheda al centro si accendono senza
  allungarla); il fascicolo su 5/7; i 33 settori in tre colonne da undici.
- **Team**: le mezze figure si avvicinano al volto (le teste variavano di due volte e mezza fra primi piani e
  mezze figure), stesso margine sinistro in tutte le sezioni, ritratti dei fondatori più grandi, l'ufficio con la
  card dell'indirizzo accanto (e «Vieni a prendere un caffè» porta a «dove siamo», non al form), la Direzione
  con l'etichetta neutra (i reparti sono quattro).
- **Candidatura (e il form di Eventi)**: il form si controlla prima di partire (campi vuoti segnati, con il
  messaggio del browser sotto, e il fuoco sul primo; prima un form vuoto «partiva» e restava su «Invio in
  corso…»); sotto il milione la squalifica compare sotto il campo che la provoca e il bottone «Iscriviti al
  podcast» porta davvero al podcast; il settore suggerisce i 33 settori; la tendina ha il segno del sito; su
  telefono il form viene subito dopo il titolo; sulla pagina della candidatura nav, barra e piastra portano al
  form invece di ricaricare la pagina; la sede legale ha il numero civico.
- **Eventi**: le sedie della sala sono trenta posti vuoti che si accendono (contorno e velo arancione, file
  curve verso il palco), il palco è una luce (la scritta in grigio leggibile: era l'unico errore di contrasto di
  Lighthouse); il programma ha il titolo fermo a sinistra e la giornata a destra; «Vieni se / Non vieni se» è un
  registro a due colonne (anche in Candidatura); la piastra del telefono dice «Prenota il posto» e porta alla sala.
- **Fatturare³**: il titolo a tre righe a gradino, come il marchio; il logo del podcast accanto al titolo del
  podcast; le righe «in arrivo» non fingono di essere link (niente luce né passo, solo il badge); i titoli degli
  articoli alla misura di un indice; ai libri il nome dell'autore, non la nota «copertina e link da fornire»; su
  telefono la foto dei libri apre la sezione.
- **Tecnica**: immagine per la condivisione (og.jpg) e meta og/twitter, icona per la schermata Home di iPhone,
  il nome accessibile dei bottoni della scaletta contiene il testo visibile (Lighthouse).
Problema trovato: nel mio script di modifica una sostituzione di testo ha trasformato `$$(` in `$(` (in
JavaScript `$$` è un segno speciale nelle sostituzioni) e ha rotto il form e la mappa: i test l'hanno trovato,
corretto prima del commit; gli script di modifica ora sostituiscono con split/join.
Giro di conferma: nuove catture a scorrimento delle 8 pagine a 1440 e 390 (le correzioni si vedono tutte; la foto
d'apertura del Metodo ora entra dal bordo destro dello schermo invece di finire con un taglio dritto); 42/42 test;
movimento ridotto senza movimento né testo invisibile (i dettagli delle schede ora restano leggibili in grigio
invece di sparire); audit 8 pagine × 5 larghezze senza rilievi; Lighthouse mobile su tutte le pagine: prestazioni
95–98, accessibilità 100 (Eventi era 96), buone pratiche 100, SEO 100, CLS 0.

*DNA, Team e più 3D (15.10)* — «La pagina del DNA: aggiungi riferimenti al DNA nella pagina, come un effetto a
scroll, anche le card dei punti magari con un effetto simile al DNA. Migliora la pagina del team, deve essere più
wow. Aggiungi in generale più effetti 3D al sito, compresa la home.»
- **DNA**: una doppia elica fatta con i quadrati del marchio (un filamento arancione, uno bianco) che si
  attorciglia mentre la pagina scorre, sotto l'apertura; la stessa elica in piedi fra le due colonne dei dieci
  principi, che diventano le coppie di basi: ogni coppia arriva aperta, le due card ruotate verso l'esterno, e si
  chiude piatta mentre sale. Tutto CSS (una proprietà registrata animata dallo scroll), niente librerie.
- **Team**: il marchio fatto di volti arriva dal fondo dello spazio e, quando l'apertura esce, ruota e si apre in
  profondità; le dodici facce si girano verso di te a onda; un filtro per reparto (Tutti, Direzione, Pubblicità,
  Marketing, Reclutamento, Formazione) fa girare via in 3D chi non c'entra e scivolare gli altri al loro posto; i
  ritratti dei fondatori si alzano dal tavolo; al passaggio la faccia si stacca dal fondo.
- **Più 3D nel sito** (CSS, legato allo scroll, mai al cursore): le parole dei titoli si alzano ruotando sul loro
  piede; i pannelli dei reparti e le tre righe del finale si alzano dal tavolo; i numeri del conto cadono come
  palette; le foto d'apertura delle pagine interne arretrano in profondità quando escono; il nastro delle schede e
  la squadra della home girano a ventaglio; il cubo della staffetta è un cubo vero a sei facce che rotola lungo la
  linea (anche in colonna, sul telefono e nel Metodo).
Problema trovato: il nodo del passaggio acceso tornava pieno nella scena (una regola con la stessa specificità
veniva dopo); corretto.
Verifica: catture dell'elica in tre punti dello scorrimento, dei principi, del Team (arrivo, uscita, griglia,
filtro durante e dopo), del cubo ingrandito, dei ventagli e della foto del Metodo; 42/42 test; movimento ridotto
senza movimento né invisibili; audit 8 pagine × 5 larghezze senza rilievi; Lighthouse mobile Home 95, DNA 98, Team
95, Metodo 96, accessibilità 100, CLS 0.

*La staffetta più dinamica (15.10)* — «Il fatturato non si perde nei reparti. Si perde nei passaggi fra i reparti:
bella così, ma rendila più dinamica e wow.» Impostazione, testi e percorso restano; cambia come si muove.
- **Il cubo si ferma alle tappe**: fra due nodi accelera e frena (curva a S) mentre la pista scorre regolare, così
  resta sul nodo il tempo di leggere la tappa; rotola mentre viaggia e lascia una scia di luce lunga quanto è veloce.
- **Le card dondolano**: sono appese alla linea per il bordo alto; quando la linea corre si inclinano contro il moto
  e quando si ferma oscillano un poco e tornano dritte (una molla per card, al massimo 7°, mai storte a riposo).
- **I numeri contano** quando il cubo arriva alla tappa (in colonna, quando la tappa passa la linea di lettura), una
  volta sola, col punto delle migliaia come nel testo.
- **L'arrivo**: dodici quadrati del marchio esplodono dal nodo della trattativa e la card si accende con un'onda.
- **Il palco**: un pavimento di quadrati in prospettiva che scorre con la pista e una pozza di luce sotto il cubo; le
  foto dei passaggi scorrono più piano della loro cornice (parallasse).
- **In colonna** (telefono, Metodo) ogni tappa arriva girata sul lato della linea, come un cartello che si raddrizza.
Problemi trovati: l'italiano di Intl non mette il punto sotto le cinque cifre («1000»): formattatore nostro. Sul
telefono il filo dell'avanzamento restava a mezz'aria quando la barra arancione usciva e la nav saliva: ora sale con
lei.
Verifica: scena catturata ferma in quattro punti, in corsa (card inclinate di ~2°, scia di 107px, pozza sotto il
cubo) e all'arrivo (scoppio, onda); colonna sul telefono e nel Metodo con i numeri che contano; 42/42 test;
movimento ridotto senza movimento né invisibili.

*Il DNA, secondo giro (15.10)* — «L'elica del DNA molto più di impatto; vorrei magari un effetto 3D dei punti del
DNA, un effetto 3D delle card che girano scorrendo.»
- **L'elica diventa WebGL** su desktop (`src/js/elica3d.js`, three.js come l'hero, caricato dopo il load solo con
  puntatore fine e senza movimento ridotto): i punti sono i blocchi del marchio in volume, un filamento arancione e
  uno perla, pioli in due colori; luce e nebbia dell'hero. Sotto l'apertura la fascia è alta 56vh e l'elica, inclinata
  verso chi guarda, si scrive da sinistra a destra la prima volta che entra a schermo, poi gira con lo scroll. La
  camera sta all'altezza degli occhi: l'elica si vede da sopra quando è in basso e da sotto quando sale.
- **La spina dei principi** è la stessa elica in piedi: si scrive mentre leggi e accende i pioli alla linea di lettura.
- **Le card girano scorrendo**: ogni riga di principi è un piolo di una scala a chiocciola attorno alla spina; arriva
  girata, si posa piatta dove leggi, riparte girando. Le card hanno lo spessore; si accende una riga alla volta. Sul
  telefono ogni card gira sul suo asse, meno.
- **Fuori dal WebGL** l'elica CSS è più grande e i suoi punti sono cubi.
Problemi trovati: una tela con `height: auto` non si allunga fra `top` e `bottom` (è un elemento sostituito) e la
spina restava alta 146px; i pioli non ancora scritti lasciavano un dischetto sull'asse; la luce di lettura accendeva
tre righe insieme; le card girate creavano 4px di scorrimento orizzontale a 1024. Tutto corretto. Trovato anche che
l'ingresso a cascata delle griglie (`.comand > *`) vinceva sulle animazioni della spina CSS: ora i selettori sono più
specifici.
Verifica: catture della fascia mentre si scrive e a scrittura finita, da sopra e da sotto; dei principi in tre punti
a 1440 e 1024; telefono e movimento ridotto; video di 21s (`qa/dna-elica-3d.mp4`); 42/42 test; movimento ridotto senza
movimento né invisibili; audit Home e DNA × 5 larghezze senza rilievi; Lighthouse mobile DNA 97, Home 95,
accessibilità 100, CLS 0.

*Le recensioni video anche in Risultati (16.10)* — «Nella pagina delle recensioni inserisci anche le recensioni
video.» In Risultati, fra i numeri e il caso per intero (prima quanto, poi chi lo dice, poi come), le stesse cinque
testimonianze video della home nello stesso lettore con la scaletta, sempre a facciata (il player entra al clic). Il
titolo e il sottotitolo sono quelli della home. Il palco si spegne (atmosfera nero): si abbassano le luci, come in
sala. Nessun codice nuovo: il lettore monta su `#video-grid` in qualunque pagina.
Verifica: catture a 1440 e 390 e nel pannello del browser; tre test nuovi (cinque voci in scaletta, nessun iframe al
caricamento, la scaletta fa partire il video scelto): 45/45; movimento ridotto senza invisibili; audit Risultati × 5
larghezze senza rilievi; Lighthouse mobile Risultati 96, accessibilità 100, CLS 0.

*Podcast, menu, libri, mappa e footer (16.10)*
- **Fatturare³**: tolta la sezione «Le cose che ci chiedono più spesso, scritte una volta» (i sei articoli senza
  link). Di conseguenza «articoli» esce dal sommario d'apertura, dal titolo e dalla descrizione della pagina e dal
  footer («Gli articoli»).
- **Il podcast nel menu, con il logo**: la voce Fatturare³ ora si chiama Podcast e ha il logo del podcast accanto al
  nome, su desktop e telefono.
- **I libri**: «Lo Schema Perfetto» e «Accelerare il Fatturato!» portano alle pagine Amazon indicate dal cliente,
  ripulite dei parametri di tracciamento (`/dp/B08BWF2K9K` e `/dp/B0B4G37HJ1`); anche dalla scheda di Alberto Frisoni nel
  Team. Il titolo è il link e la riga intera lo prende; il link è alto 44px.
- **Dove siamo** (home e candidatura): centrata e chiamata «Dove siamo»; l'indirizzo e il caffè nel sommario; la mappa
  **si carica da sola, sempre** (iframe in pagina, `loading=lazy`: il browser la carica quando ci si avvicina), a tutta
  misura; sotto le tre sedi in fila. La sede legale ora ha il civico anche in home («Piazza IV Novembre 1», come nel
  footer).
- **Footer**: tolti i quattro quadratini in fondo; la riga legale chiude la pagina con il suo respiro.
Problemi trovati: sul telefono la mappa sporgeva di 8px e spingeva fuori il bottone del menu (un'altezza minima con
`aspect-ratio` si trasferisce alla larghezza): ora solo proporzioni. I titoli dei libri, come link, erano alti 31px
sui touch: portati a 44.
Verifica: catture a 1440 e 390 di «Dove siamo» (mappa caricata senza clic), menu aperto, libri e footer; 45/45 test
(i due sulla mappa e sui video aggiornati: la mappa è in pagina senza clic, i video restano a facciata); movimento
ridotto senza invisibili; audit Home, Fatturare³, Candidatura e Team × 5 larghezze senza rilievi; Lighthouse mobile
Home 95, Fatturare³ 97, Candidatura 97, accessibilità 100, CLS 0.

*Il marchio fatto di volti si rinnova (16.10)* — «Il reparto che ti consegniamo ha nomi e cognomi: a fianco c'è
l'infografica a forma del nostro logo con le facce di cinque persone, che però sono sempre le stesse. Devono cambiare
ogni poco, in modo dinamico.»
- Ogni ~2,3 s uno dei cinque quadrati si gira (rotazione sull'asse verticale, il ritratto nuovo è già decodificato
  quando il quadrato è di taglio) e mostra un'altra persona del team. Chi arriva si vede per un momento a colori e
  ha nome e ruolo nell'angolo vuoto del marchio, in basso a sinistra (sul telefono accanto al marchio, che è piccolo).
- Una persona non sta mai in due quadrati insieme; torna per prima chi manca da più tempo, quindi in mezzo minuto
  passano tutti quelli che hanno il ritratto (Andrea Berrini resta fuori finché manca la sua foto). L'apertura parte
  sempre dagli stessi cinque volti, così il passaggio dal menu (le cinque facce che volano) resta quello.
- Si ferma fuori schermo, a scheda nascosta e sotto il cursore; c'è un bottone per fermarlo (SC 2.2.2). A movimento
  ridotto non parte.
Verifica: catture nel tempo a 1440 e 390 (un cambio alla volta, mai doppioni, nome giusto), video di 15s
(`qa/team-volti.mp4`), due test nuovi (i volti cambiano da soli senza doppioni; il bottone li ferma): 47/47; movimento
ridotto senza movimento; audit Team × 5 larghezze senza rilievi; Lighthouse mobile Team 95, accessibilità 100, CLS 0.

*Online su Vercel (16.10)* — «Deployalo sulla repo.» Il repository era già collegato a Vercel
(spit-restyle.vercel.app) ma l'indirizzo dava 404: Vercel pubblicava la radice del repo, il sito sta in `src/`. Con
`vercel.json` (cartella di pubblicazione `src`, niente install né build, `noindex` solo sull'indirizzo vercel.app) il
deploy è partito da solo al push ed è stato online in circa 25 secondi.
Verifica sul sito online: tutte le pagine e i 34 percorsi della home rispondono 200; la suite completa girata
sull'indirizzo pubblico: 47/47, nessun errore JS, 16 link interni a 200 (il form non invia niente, il test è
innocuo); Lighthouse mobile online Home 97, DNA 95, Team 97, accessibilità e buone pratiche 100, CLS 0 (SEO 63
per il noindex voluto).

*Il ritratto di Andrea Berrini (16.10)* — «Foto di Andrea Berrini da usare.» L'originale è in
`assets-src/team/berrini-originale.jpg` (1080×1324); il ritratto è tagliato quadrato come gli altri (la testa a circa
due terzi dell'altezza, centrata) e salvato come `src/assets/team-webp/berrini.webp` (640px) e `berrini-400.webp`
(400px), con gli stessi parametri degli altri. Al posto delle iniziali ora c'è la foto nella griglia del Team, nella
squadra della home e nel marchio di volti che cambia (adesso ci passano tutti e dodici).
Verifica: catture della griglia (filtro Marketing) e del marchio con Berrini appena arrivato, a colori e col nome;
la foto si carica in home; 47/47 test.

*Favicon (16.10)* — «Favicon: usa l'icona di Sales Process.» Il favicon era una S fatta di quadratini, non il
marchio. Ora è il marchio vero (i cinque quadrati arancioni) su un quadrato scuro arrotondato: `favicon.svg` per le
schede, `/favicon.ico` alla radice (16, 32, 48 px) per chi lo cerca lì e per i risultati di ricerca, l'icona di iPhone
a 180 px. Nel `<head>` il .ico ha `sizes="32x32"`, così Chrome sceglie l'SVG.

*Eventi: work in progress (16.10)* — «Sezione eventi: metti una pagina work in progress, nascondi quella attuale.»
`/eventi.html` è ora una pagina in lavorazione: l'apertura delle altre pagine con il biglietto (dal menu la foto vola
lì come prima), «Work in progress.», «Stiamo preparando la pagina dei nostri eventi. Torna a trovarci presto.», il
marchio che si monta un quadrato alla volta (fermo a movimento ridotto) e due uscite: la candidatura e il podcast. La
pagina del Sales Process Day è nascosta, non cancellata: `pages/_nascoste/eventi.html` (il build legge solo
`pages/*.html`); per rimetterla basta riportarla in `pages/`. La piastra del telefono dice «Prenota il posto» solo
se la pagina ha `#posti`, quindi torna da sola con la pagina vera.
Verifica: catture a 1440 e 390; i due test del form eventi sostituiti da due sulla pagina in lavorazione (44 test, i
tre in meno erano le ancore della pagina nascosta); movimento ridotto senza movimento.

*Il menu con le particelle (16.10)* — «Anche nel menu inserisci effetti particellari e animati.»
- **La polvere del menu** (`src/js/menu-polvere.js`, caricato alla prima apertura): i quadrati del marchio, per lo più
  bianco caldo e uno su quattro arancione, a tre profondità, su una tela dietro le voci. All'apertura esplodono dal
  bottone Menu, da dove nasce la card, e si spargono frenando; poi salgono piano ondeggiando. Si scostano dal cursore;
  passando su una voce dal suo quadratino parte uno sbuffo arancione e le particelle arancioni le arrivano da tutta la
  card e le girano attorno; la voce cliccata scoppia. Alla chiusura si spengono e il ciclo si ferma.
- **Le voci si alzano** ruotando sul loro piede, a gradini, come le parole dei titoli.
- A movimento ridotto niente tela e niente rotazione.
Verifica: catture dell'apertura a 180, 420, 800 e 1700 ms, del passaggio su una voce, del telefono; a movimento
ridotto la tela non c'è; i sette test del menu passano (44/44).

*Ottimizzazione per il telefono (16.10)* — «In ultimis, ottimizza il sito per mobile.» Prima i dati: Lighthouse
mobile su tutte le pagine (95–98, TBT 0, CLS 0: il peso stava nell'LCP, 2,5–2,9 s, quasi tutto «ritardo di resa») e
una revisione a tutta pagina a 390px. Poi un commit per ogni intervento:
- **GSAP solo in home**: serve al tetto e alla staffetta, che stanno solo lì; sulle altre sette pagine erano ~45 KB
  compressi scaricati e avviati per niente.
- **I titoli delle pagine interne si vedono dal primo fotogramma**: partono a metà della maschera, come l'H1 della
  home (prima partivano nascosti e l'LCP aspettava la loro salita). Sul telefono la foto d'apertura si scopre dopo
  100ms invece di 380–480. Provata anche la priorità alta per la foto: l'LCP peggiorava (2,3 → 3,0 s), lasciata bassa.
- **Le foto d'apertura scaricano la misura giusta**: sul telefono sono larghe al massimo 250px ma `sizes` faceva
  scegliere la 800; ora la 480 (la 800 solo a 3x).
- **Metodo**: sul telefono la tabella dei passaggi (dodici schede, circa quattro schermate) parte da Pubblicità, 3 righe
  su 12; Tutti resta a un tocco.
- **DNA**: sul telefono le card dei principi girano al massimo di 16° (era 40°) e restano piatte più a lungo.
- **Il sipario** della prima visita sul telefono resta 220ms invece di 450 prima di alzarsi; **i comandi rispondono al
  tocco** (chip, Menu, pause, frecce, social si premono; niente lampo grigio).
- **Le animazioni infinite si fermano fuori schermo** (i contatti dell'hero, il nastro dei loghi): sul telefono,
  oltre l'hero, da 14 in corso a 0.
Provato e scartato: ritagli orizzontali delle foto dei passaggi per la staffetta in colonna. Il centro delle foto (mani
e cubo) è pieno di dettaglio e il ritaglio da 640px pesava quasi quanto la verticale da 800: lo «spreco» che Lighthouse
contava erano zone nere, che costano poco.
Risultato, Lighthouse mobile prima → dopo: Metodo 96 → 99 (LCP 2,79 → 2,26 s, 657 → 552 KB), Risultati 95 → 98
(2,93 → 2,48 s, 412 → 324 KB), DNA 98 → 99 (2,50 → 2,12 s, 359 → 217 KB), Team 96 → 98 (2,86 → 2,41 s), Eventi 98 → 99
(294 → 193 KB), Fatturare³ 97 → 99 (389 → 272 KB), Candidatura 98 (2,50 → 2,20 s, 803 → 668 KB), Home 96 (2,85 s:
il suo titolo era già visibile dal primo fotogramma; pesa la pagina, la più lunga). Accessibilità, buone pratiche e SEO
100, CLS 0 ovunque. Audit 8 pagine a 390 e 360 senza rilievi; movimento ridotto senza movimento né invisibili; 44/44 test.

*L'hero 3D anche sul telefono (16.10)* — «La hero 3D la vorrei anche da mobile.»
- **Il cancello**: la scena dell'hero ora parte anche sul telefono; restano fuori movimento ridotto, risparmio dati e
  telefoni con poca memoria (deviceMemory < 3), che hanno la versione DOM. L'elica del DNA resta solo desktop.
- **Sul telefono più leggera**: 120 contatti invece di 300, risoluzione al massimo 1,4x, il marchio grande quanto
  quello DOM (154px, sborda del 18% come lui, sopra c'è il testo). Senza cursore la luce arancione gira da sola.
- **three.js ridotto e di casa**: una build con il tree-shaking di esbuild che esporta solo le classi usate dalle due
  scene (`tools/three-sp.entry.js` → `src/js/vendor/three-sp.min.js`, 134 KB gzip invece di 171), dallo stesso dominio:
  niente connessione in più al CDN.
- **Compilazione in parallelo**: i programmi WebGL si compilano con `renderer.compileAsync` prima del primo fotogramma;
  prima cadevano nel primo fotogramma e bloccavano il thread per ~0,4 s.
Misure (Lighthouse mobile, home): 96 senza 3D; 87 col 3D e three.js intero (TBT 364 ms); 92 con la build ridotta
(TBT ~220 ms); 95–96 con la compilazione in parallelo (TBT 8–17 ms). LCP 2,85 s e CLS 0 invariati, +127 KB di peso
(caricati dopo il load).
Verifica: telefono emulato (390×844, tocco): i contatti 3D intorno al titolo con la luce che gira, la convergenza
allo scroll e il marchio montato in fondo all'hero; a movimento ridotto resta la versione DOM; desktop: hero ed elica
del DNA invariati con la build ridotta; 44/44 test; movimento ridotto senza movimento.

*I cubi dell'hero lungo la home (16.10)* — «I cubotti della hero li amo: riprendi effetti 3D simili per tutta la
homepage, senza esagerare.»
- **Tre momenti, non uno sciame**: i cubi tornano solo dove la frase accanto li chiama (gli «elementi fluttuanti senza
  casa» erano già stati bocciati), e ogni volta fanno quello che dice la frase.
  - **Cadono** (01, il problema), accanto a «Sono tre passaggi che cadono per terra»: sei contatti (quattro sul
    telefono) galleggiano nel vuoto a destra del titolo; scorrendo cadono uno alla volta rotolando, passano dietro le
    mani della foto e spariscono; l'arancione per ultimo. Sul telefono stanno nella fascia fra il sommario e le mani.
  - **Crescono** (04, i risultati, solo desktop): accanto a «I numeri dei clienti, non le promesse.» cinque blocchi
    scendono e si posano a scalinata, due grafite e tre arancioni, come i grafici a unità delle schede sotto (prima
    grigio, dopo arancio). La scalinata si misura sulla fine reale del titolo e sul bottone pausa; sotto i 1100px,
    dove la pausa è nascosta, sul bordo della colonna.
  - **Arrivano** (il finale): quattro contatti arancioni (tre sul telefono) entrano dai bordi liberi dello schermo e
    volano nel cubo alzato come un trofeo, prima che la luce lasci il cubo per il CTA. Su desktop da destra e dal
    fondo, curvando verso l'esterno del braccio (verso l'interno sparivano dietro); sul telefono da sinistra, sopra le
    righe del payoff (da sotto passavano dietro le lettere giganti).
- **Una tela sola, dietro il contenuto**: `src/js/cubi3d.js`, fissa come il palco e subito sopra di lui; i cubi passano
  dietro foto e testo, mai sopra una parola. Le foto della caduta e del trofeo sono ritagli trasparenti, quindi mani e
  braccio coprono davvero i cubi, e nel finale l'ultimo tratto sparisce dentro il cubo. Stessi blocchi, materiali e
  luci dell'hero, con in più un riempimento frontale debole: sulle atmosfere calde il grafite senza riempimento si
  leggeva come un buco.
- **Lo scroll dà la meta, i cubi la inseguono** con un filo d'inerzia (una rotella a scatti non li fa saltare); dopo un
  salto con un'ancora il momento parte già al suo punto, senza rigiocare i voli.
- **Costo**: il modulo (7 KB compressi) si scarica in idle quando il primo momento è a meno di uno schermo e usa la
  stessa build di three.js dell'hero, già in cache; si disegna solo vicino ai momenti e non ridisegna quando non c'è
  nessun cubo in scena. Stesso cancello dell'hero: con movimento ridotto, risparmio dati o poca memoria non si scarica;
  ad alto contrasto la tela è nascosta.
Verifica: desktop 1440, 1280, 1024 e telefono 390 (fotogrammi e video dei tre momenti); 44/44 test; movimento ridotto
senza three.js né tela; Lighthouse mobile home 96 / 100 / 100 / 100, TBT 18 ms, CLS 0 (senza scroll il modulo non si
scarica).

*Il numero verde (20.10)* — «Metti questa foto come numero verde.» Il bloccante era aperto dal primo giro: il numero
non è pubblicato su salesprocess.it e nella prima immagine ricevuta le cifre non si leggevano. Il badge nuovo è nitido:
**800 411 001**.
- **Il badge così com'è**: cornetta, «Numero Verde» e cornice verdi, cifre bianche su fondo trasparente, fatto per il
  fondo scuro. Non è ridisegnato (come il logo): ritagliato solo il margine trasparente (175×82 → 162×58) perché si
  allinei alla colonna, salvato in WebP senza perdita (5 KB). L'originale è in `assets-src/brand/`.
- **Nel piè di pagina di tutte le pagine**, in testa ai Contatti: link `tel:800411001`, nome accessibile «Chiama il
  Numero Verde 800 411 001», testo alternativo con il numero. Il link non aggiunge cornici sue (sarebbero due): al
  passaggio il badge si schiarisce appena. Il vecchio pulsante verde disegnato in CSS e il segnaposto tratteggiato
  sono stati tolti.
- **«Chiama» nella nav**: era già previsto che comparisse con il numero; un link di testo accanto al CTA (mai un
  secondo bottone), alto quanto un tocco, presente anche sul telefono accanto al Menu.
Verifica: 1440, 1024, 390 e 360 senza sbordi; 46/46 test (due nuovi: badge e nav portano allo stesso numero);
Lighthouse mobile home 96 / 100 / 100 / 100, Metodo 99 / 100 / 100 / 100.

### Cosa è stato fatto, fase per fase (skill applicate)

**Fase 1 — design system** (impeccable craft-floor, design-taste-frontend, ui-ux-pro-max checklist)
- Palco fisso con 7 atmosfere in dissolvenza (`sfondi.css`), sezioni trasparenti: spariti stacchi e fili.
- Occhielli in tondo con la particella; su desktop didascalia di margine (colonna 3/12).
- Token: respiro fluido `--sez-y`, soglia testo 12–13px, `--tap` 44px, `--barra-h/--nav-h`.
- Barra = un solo link; nav senza doppione "Scrivici/Scrivi"; Fatturare³ nel menu mobile; menu animato,
  burger→X, fuoco nel pannello; footer a 6 colonne; frecce e pausa in SVG; skip link sistemato.

**Fase 2 — home** (frontend-design, motion-design, gpt-taste)
- Hero con campo di contatti e marchio che si monta; titoli composti parola per parola (split al build).
- Schede-grafico a unità; fregio scroll-driven; tetto a blocchi; registro dei numeri; quattro reparti
  fotografici + indice degli otto servizi; parallasse dei pugni; conto 4/3/0 come registro; macchina a
  binario con il pacchetto (pin desktop, colonna su mobile); video in gerarchia; risorse come indice.

**Fase 3 — pagine interne**: parola fantasma nelle aperture, registro e linea del tempo (Eventi,
Candidatura), indice (Fatturare³, Team), manifesto ed elenco numerato (DNA), muro di settori (Risultati).

**Fase 4 — 3D e movimento** (img2threejs, motion-design)
- `src/js/scena3d.js`: three.js r170 da jsDelivr, solo desktop/puntatore fine, dopo il load in idle.
- Verifica img2threejs (`src/_dev/marchio3d.html`, render `qa/f4/verifica-marchio.jpg`): i quattro tratti
  d'identità (progressione 0,83, zig-zag, raggio 22%, arancio) presenti; un difetto trovato e corretto
  (lo smusso esterno ingrossava i blocchi del 5% → `bevelOffset` negativo). Punteggio stimato 0,88.
- Torcia sul palco, parallasse nei pannelli, luce sulle lettere del muro, View Transition a scalinata.

## 4 · Registro delle scelte

- Palette, font, raggi e logo **non cambiano**: sono decisioni chiuse col cliente (HANDOFF §6).
- Occhielli: il testo resta (è copy approvato), cambia il ruolo: diventano **didascalie di margine**
  (colonna 3/12 da 1024px, con filetto) invece del "kicker" maiuscolo sopra ogni titolo.
- Le quattro foto-mano diventano i quattro reparti di "Cosa facciamo" (megafono→Pubblicità,
  penna→Marketing, contratto→Reclutamento, tocco→Formazione): l'asset più forte del brand usato per
  quello che significa, invece che come sfondo ripetuto delle schede.
- Schede-risultato: grafico a unità con la particella (un quadrato = 100.000 €) al posto della foto:
  rappresenta solo i due dati dichiarati, non inventa valori intermedi.

*Giro 2 di verifica*
- **Un solo sistema di titolo, una sola famiglia.** Il dispositivo CAPS + serif era del riferimento
  (sharpify), non del brand: il cliente aveva già chiesto «tutto DM Sans» per le meta. Il markup
  (`.duevoci`, `.t-caps`, `.t-voce`) resta, cambia solo il registro: chi riprende il codice non trova
  classi sparite.
- **Arancio nei titoli: solo nell'H1 e nel payoff del tetto.** Regola scritta in `type.css`
  (`h2 .ar { color: inherit }`), non pagina per pagina: vale anche per i titoli futuri.
- **Rilievi del revisore NON applicati, e perché:**
  - *Il fregio FATTURARE "consuma" il muro 12.000px prima*: il fregio è il punto 3 della sequenza della
    home nell'HANDOFF (§5), quindi struttura concordata. Resta.
  - *«Con liberatoria» stampato su schede provvisorie* e la nota «le altre non hanno liberatoria»:
    sono copy del prototipo consegnato, e i dati sono già marcati `prov:true` e listati fra i bloccanti
    (HANDOFF §7). Il brief vieta di cambiare il copy → **da decidere insieme** (§6).
  - *Spostare gli occhielli nella nav sotto i 1024px*: troppo per un giro di rifinitura e fragile
    sui lettori di schermo. Ho invece abbassato la didascalia di margine da 1100 a **1024px**.
  - *Foto delle mani dentro le card della macchina*: le quattro mani sono già i quattro reparti di
    «Cosa facciamo», cinque schermate sopra; ripeterle nella scena pinnata la appesantisce. Al loro
    posto la luce: icona e bordo si accendono al passaggio del contatto.
  - *Numero verde in un colore neutro*: il verde è la convenzione italiana del numero verde e l'HANDOFF
    lo descrive così. Finché manca il numero il blocco è tratteggiato e senza hover (segnaposto
    dichiarato, non un pulsante).
- **Lo zero in `#CC3366`** del contro-esempio resta: è l'unico numero "di perdita" del sito ed è
  semantico, non decorativo (token `--c-rottura`).

*Giro 4*
- **I numeri dei capitoli (01–06) sono legittimi**: il racconto ha un ordine e la nav lo usa. Non sono
  la numerazione decorativa «01 / 02 / 03» delle pagine generate: compaiono sei volte, una per argomento.
- **Nel capitolo del problema i numeri sono bianchi** (4, 3) e lo zero è vuoto in `--c-rottura`:
  l'arancio lì è solo il cubo che cade, così il colore resta legato alla soluzione.
- **Il CTA del podcast è bianco**: l'arancio resta alla candidatura, che è la conversione della pagina.
- **Il menu mette il fuoco su «Chiudi»** all'apertura (schema del dialogo WAI-ARIA): con il Tab si scende
  sulle voci. Il logo in testa alla card non prende il fuoco per primo, così un Invio distratto non
  riporta alla home.
- **Le mani della caduta si muovono solo verso l'esterno**: verso l'interno il taglio della foto (il
  braccio che finisce) entrava nello schermo.
- **Rilievi del revisore (giro 3) non applicati, e perché:** «Il palco» nella pianta della sala resta
  (orienta la pianta: senza, le trenta sedie non hanno un davanti); «La missione / La visione» restano
  (dicono quale delle due frasi è quale); il blocco «Dentro i quattro reparti» del Metodo resta lo stesso
  componente della home (un solo modo di presentare i reparti in tutto il sito).

## 5 · Problemi trovati durante il lavoro

- Chrome taglia gli screenshot oltre 16.384px e ricomincia dall'alto → audit a tranche da 8.000px.
- Il pane del browser dell'app è nascosto: lì le immagini lazy non partono. Verifica sempre via Playwright CLI.
- Negli screenshot full-page il palco (fisso) copre solo il primo viewport: la fascia scura sotto
  l'apertura delle pagine è un artefatto di cattura. Per le giunture fanno fede le passeggiate a scroll
  (`tools/qa/run-scorri.sh`).
- `.bento--reparti` perdeva contro `.bento` (stessa specificità, regola successiva) → `.bento.bento--reparti`.
- Muro: lo shorthand `background` nella riga arancione azzerava `background-clip: text` → rettangolo pieno.
  Corretto con `background-image`.
- View Transition fra documenti: in una scheda nascosta o in headless la cattura della pagina vecchia
  aspetta 4 s (timeout) prima di navigare. Il passaggio ora si salta lì (`pageswap` + `skipTransition`),
  e una guardia stretta su `unhandledrejection` tiene pulita la console.
- Ho tolto due etichette che avevo aggiunto io ("Articolo 01…", "Ruolo aperto"): erano copy nuovo e la
  seconda implicava che le posizioni fossero aperte.
- Due loghi clienti (`c-16`, `c-24`) erano rotti già nel prototipo: nella ricolorazione in bianco il fondo
  opaco dell'originale era diventato un quadrato/cerchio pieno. Rigenerati da `assets-src/clients-originali`
  con alpha = luminosità (ffmpeg `geq`), ritagliati sul contenuto, larghezza aggiornata in `LOGHI`.
- Il marchio 3D usciva corallo: la nebbia della scena ne mangiava il 16% e il tone mapping lo spingeva
  verso il salmone. Misurato a schermo con ffmpeg prima e dopo (`#E57A28` → `#FD7F0E`).
- `Range.getBoundingClientRect()` su un elemento con figli a blocco restituisce la larghezza della
  colonna: la radura del 3D si misura sui **nodi di testo**, che sono stretti sui glifi.
- A metà sessione il dev server si è fermato e la sessione di Playwright CLI si è chiusa: riavviati
  (`preview_start salesprocess`, `playwright-cli open`). Lo script dei prima/dopo falliva per lo spazio
  nel percorso del progetto (`Nuovo sito spit`) passato a `playwright-cli.cmd` via shell.
- Catture della macchina dopo averla superata: il pin di GSAP sposta il `top` dell'elemento della durata
  del pin, quindi `top + scrollY` misurato a valle punta oltre la scena. Si misura dall'alto.

## 6 · Da decidere insieme

**Azioni che non ho fatto perché irreversibili o fuori dal mio perimetro**
- **Merge di `restyling-wow` su `main` (locale)**: non fatto. Il deploy l'ha chiesto il cliente il 16.10 (vedi «Online»).
- **Pubblicazione su GitHub** (15.10, su richiesta: «pusha il sito su questa repo, sempre»): il progetto è su
  https://github.com/giovannigiordano-gif/SPIT-WEBSITE-RESTYLE (repository **pubblico**): il ramo `restyling-wow`
  e, con lo stesso contenuto, il `main` del repository; il `main` locale resta il sito originale. Da qui in poi
  ogni modifica viene spinta lì. Nel repository ci sono anche HANDOFF, WORKLOG, documenti di lavoro e gli
  originali delle foto: se non devono essere pubblici, il repository va reso privato.
- **Online** (16.10, su richiesta: «deployalo sulla repo»): il sito è su **https://spit-restyle.vercel.app**, il
  progetto Vercel già collegato al repository. Pubblicava la radice del repo (la home dava 404 e i percorsi assoluti
  /css, /assets si rompevano sotto /src/): `vercel.json` ora pubblica `src/`, senza installazione né build (il sito
  costruito è nel repository). Ogni push lo aggiorna in circa mezzo minuto. Sull'indirizzo vercel.app c'è un
  `X-Robots-Tag: noindex`: è una copia di lavoro del sito del cliente e non deve finire nei motori di ricerca (per
  questo Lighthouse lì dà SEO 63); un dominio vero aggiunto in seguito non ne è toccato. Da decidere: quando e come
  il dominio salesprocess.it passa a questo progetto. GitHub Pages resta sconsigliato (percorsi assoluti dalla radice).
- **Installare Python 3.12** (serve agli script di img2threejs e ui-ux-pro-max): richiede di accettare
  una licenza sulla macchina. La ricostruzione 3D è stata fatta seguendo il metodo a mano (WORKLOG §3).
- `src/assets/fonts/instrument-serif-italic-latin.woff2` non è più usato: non l'ho cancellato.
- **Gli originali 2k delle foto generate (64 MB di PNG in `assets-src/higgsfield/`, 16 immagini) sono nei commit
  `269e670` e del giro 4.** Tenerli in git dà la provenienza completa ma appesantisce il repository; toglierli dalla
  storia vorrebbe dire riscriverla, e non l'ho fatto. Alternative da decidere: lasciarli, spostarli su
  git LFS, o archiviarli fuori dal repository (le varianti web in `src/assets/foto/` bastano al sito).

**Le fotografie generate (giri 3 e 4)**
- Sedici immagini sono **generate** con Higgsfield, non scattate: dodici con mani anonime e oggetti
  (stessa grammatica della serie del cliente) e, dal giro 4, quattro scene di lavoro per i reparti con
  persone di spalle, sfocate o fuori campo — nessun volto riconoscibile. Non sono il team né clienti
  veri, e non vanno presentate come tali. Se il cliente vuole dichiararlo (o sostituirle con scatti veri
  del suo ufficio, la scelta migliore per le quattro scene), l'elenco con uso e prompt è in
  `assets-src/higgsfield/provenienza.json`.
- **La staffetta ha di nuovo card e una linea** (15.10, richiesta dell'agenzia). Nel giro 3 il cliente aveva
  bocciato la «macchina» (schede in scatola su un binario, con un quadrato che scorreva). Il percorso è diverso:
  tiene le fotografie dei passaggi, la linea è il bordo delle card e non un binario a parte, e la tappa si
  accende solo quando il contatto ci arriva. Ma l'idea di partenza è vicina, e va confermata col cliente finale.
- **Dall'audit del 15.10, proposte che toccano testi o dati (non applicate):**
  - Risultati: la frase d'apertura dice ancora «Ogni numero su questa pagina ha una data e una liberatoria
    firmata»: vale solo quando le liberatorie ci sono davvero. Due titoli di fila ripetono «numeri».
  - Candidatura: una riga sulla privacy accanto al bottone (nome e telefono si raccolgono senza avviso: testo
    da scrivere con il legale); il contatore «Q4 2026 · 31 candidature · agg. 09.09.2026» va aggiornato; il
    form va collegato a un invio vero (CRM o servizio): oggi si controlla ma non spedisce.
  - Metodo: «Dentro i quattro reparti» racconta per la quarta volta gli stessi reparti (proposta: toglierla dal
    Metodo, o mettere le foto nelle card del percorso).
  - DNA: l'apertura ripete «fatturato» fra titolo e sommario; un invito «Leggi i dieci principi» manca.
  - Eventi: «30 posti» compare cinque volte e il rimborso quattro; finché la data è passata la pagina
    dovrebbe dire «prossima edizione» e il form diventare una lista d'attesa.
  - Fatturare³: un episodio vero sulla pagina (serve l'ID dell'ultimo episodio); «Ricevilo per email» è un
    mailto travestito da iscrizione; mancano i link di Spotify e Apple Podcasts (quelli dei libri sono arrivati il
    16.10).
  - Team: «CEO» nella griglia e «Fondatore» nella sezione dei fondatori per Alberto Frisoni: va scelto uno.
  - L'immagine per la condivisione usa il dominio www.salesprocess.it (const SITO in tools/build.mjs): da
    confermare quando si va online.
- Il **muro FATTURARE centrato** era una decisione del cliente (HANDOFF §6). Su richiesta esplicita
  dell'agenzia («questa parte non mi piace») è diventato il finale con la foto, payoff a filo sinistro:
  va confermato anche con il cliente finale.

**Contenuti — i bloccanti dell'HANDOFF §7** (il numero verde è arrivato il 20.10, gli altri sono ancora aperti)
- ~~**Numero verde**~~ **risolto il 20.10**: 800 411 001, con il badge del cliente nel piè di pagina e «Chiama» nella
  nav (`const TEL` in cima a `tools/build.mjs`; con `null` spariscono entrambi). Da confermare: se il numero va
  pubblicizzato anche per chi chiama dall'estero (i numeri verdi di solito non lo permettono).
- **Schede-risultato reali con liberatoria firmata.** ⚠ Dal 15.10, su richiesta dell'agenzia, le sei
  schede non dicono più da dove vengono i numeri né che sono provvisori (tolte la riga della fonte e la
  nota sotto il nastro). Nei dati restano marcate `prov:true`. Così sembrano risultati definitivi:
  **prima di andare online servono i numeri veri con la liberatoria firmata** di ogni cliente, oppure le
  schede vanno tolte.
- **Il reparto di Andrea Berrini** (Direttore marketing): l'ho messo in Marketing, da confermare. Il ritratto è
  arrivato il 16.10 ed è in pagina. Paola Russo è stata tolta dal team; la sua foto resta in
  `src/assets/team-webp/` (non l'ho cancellata).
- I tre **passaggi di consegna** (chi, cosa, SLA, strumento): sono il contenuto della scena pinnata.
- **Fascicoli clienti**, **candidature per trimestre**, **elenco reale dei 33 settori**, **durata media del
  rapporto**, **certificato ISO** (il link «Certificazione» è un segnaposto dichiarato). Ragione sociale, P.IVA,
  REA e capitale sono nel footer dal 15.10, presi da fonti pubbliche (§3): vanno confermati sulla
  visura camerale, il REA viene da due aggregatori e non dal sito del cliente.
- **Copertine dei libri**: gli articoli sono stati tolti dal cliente e i link dei libri sono arrivati (16.10);
  mancano solo le copertine. Il podcast porta al canale YouTube indicato dall'agenzia (giro 4).
- **La mappa e i cookie** (16.10): su richiesta del cliente la mappa di Google si carica da sola, senza clic.
  L'embed di Google scrive cookie di terze parti; senza un banner che li blocchi prima del consenso (per esempio
  quello di iubenda, che il sito già usa per le policy) è un rischio rispetto alla normativa sui cookie. Da decidere
  se attivare il blocco preventivo o tornare al clic.
- **Logo del podcast**: risolto il 15.10 con il file allegato in chat (`src/assets/podcast/fatturare-logo.webp`,
  originale in `assets-src/podcast/`), nel capitolo «Il podcast» della home e nella sezione podcast di
  Fatturare³. Non è stato ridisegnato.

**Dalla correzione di bozze (ciclo 1) — scelte del cliente, non errori: da confermare**
- **La data dell'evento.** Sales Process Day era il **14 ottobre 2026**: dal 15.10 la barra in cima
  invita a collaborare, ma il menu («Sales Process Day · 14 ottobre 2026 · Milano») e la pagina Eventi
  vendono ancora un evento passato. Serve la data della prossima edizione (o la decisione di
  trasformare la pagina in un «com'è andata»).
- **Il logo del podcast in alta risoluzione.** Quello allegato in chat è 300×300 px. Da quando nel
  finale sono tornate le tre righe, il logo compare solo nei capitoli podcast, a 72–104px: lì il file
  basta anche sugli schermi retina. La versione da 600×600 o il vettoriale serve solo per usarlo più grande.
- **Il logo con i punti.** Sul sito ufficiale il payoff è «FATTURARE. FATTURARE. FATTURARE.» (file
  `logo-2048x498-1.avif`, 8,4 KB, caricato a ottobre 2025 in salesprocess.it/wp-content/uploads/2025/10/);
  il file HD consegnato con l'handoff ha «FATTURARE, FATTURARE, FATTURARE.». Non l'ho scaricato senza
  un ok: con l'ok (o con il file vettoriale dal cliente) si sostituisce in `src/assets/brand/` e il resto
  segue da solo.
- Finale della home: «il numero che trovi in fondo al tuo bilancio» — in fondo al conto economico c'è
  l'utile, il fatturato sta in cima. Proposta: «il numero che trovi in cima al tuo conto economico».
- DNA: il principio «Do more with less» è l'unico titolo in inglese (proposta: «Fare di più con meno»).
- «Uffici di rappresentanza» per la sede di Milano: se il team lavora lì, «Sede operativa» è più esatto.
- I moduli (candidatura, prenotazione) non inviano niente: il pulsante resta su «Invio in corso…».
  Serve il collegamento al CRM o a un servizio di invio prima della pubblicazione.
- Gergo non spiegato per un titolare di PMI: VSL, nurturing, SLA, referral, upsell (proposte nel
  rapporto del correttore: «video di vendita (VSL)», «passaparola»…).

**Decisione con il cliente**
- **Lo stack** (HANDOFF §7): statico com'è, o WordPress. Su WordPress la scena pinnata e l'hero 3D sono
  i primi elementi a rischio; tutto il resto è CSS e porta bene.
