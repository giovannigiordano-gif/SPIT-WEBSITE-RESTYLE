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
- **Merge di `restyling-wow` su `main` e qualunque deploy**: non fatti. Il branch è pronto da rivedere.
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
- Il **muro FATTURARE centrato** era una decisione del cliente (HANDOFF §6). Su richiesta esplicita
  dell'agenzia («questa parte non mi piace») è diventato il finale con la foto, payoff a filo sinistro:
  va confermato anche con il cliente finale.

**Contenuti — i bloccanti dell'HANDOFF §7, tutti ancora aperti**
- **Numero verde** (`const TEL` in cima a `tools/build.mjs`): il blocco del footer è pronto, tratteggiato
  finché manca il numero.
- **Schede-risultato reali con liberatoria firmata.** ⚠ Oggi le sei schede sono provvisorie ma ognuna
  stampa «Fonte: CRM cliente · agg. 08.2026 · con liberatoria», e la nota sotto il nastro dice che le
  altre non hanno liberatoria. È copy del prototipo e non l'ho toccato, ma **non può andare online
  così**: o arrivano le liberatorie, o la riga va riscritta (proposta: «Dato provvisorio · in attesa di
  liberatoria» quando `prov:true`).
- I tre **passaggi di consegna** (chi, cosa, SLA, strumento): sono il contenuto della scena pinnata.
- **Fascicoli clienti**, **candidature per trimestre**, **elenco reale dei 33 settori**, **durata media del
  rapporto**, **ragione sociale e P.IVA** (footer), **certificato ISO** (il link «Certificazione» è un
  segnaposto dichiarato).
- **URL di articoli e libri** (titoli e copertine), oggi marcati `.todo` in `fatturare.html`. Il podcast
  ora porta al canale YouTube indicato dall'agenzia (giro 4).
- **Logo del podcast** (giro 4): il file allegato in chat non è leggibile dal disco. Salvarlo come
  `src/assets/podcast/fatturare-logo.svg` (o `.webp`/`.png`) e lanciare `node tools/build.mjs`: entra da
  solo nel capitolo «Il podcast» della home e nella sezione podcast di Fatturare³. Non va ridisegnato.

**Decisione con il cliente**
- **Lo stack** (HANDOFF §7): statico com'è, o WordPress. Su WordPress la scena pinnata e l'hero 3D sono
  i primi elementi a rischio; tutto il resto è CSS e porta bene.
