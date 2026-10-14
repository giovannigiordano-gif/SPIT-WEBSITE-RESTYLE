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

**Ritmo.** Scala 8px (4·8·12·16·24·32·48·64·96·128·168). Le sezioni non dipingono più un fondo proprio:
stanno su un **palco continuo** (fondo fisso con sei atmosfere in dissolvenza incrociata guidate dalla
sezione in vista). Elementi che sbordano fra le sezioni, giunture sfumate, mai un filo netto.

**Linguaggio del movimento — tre gesti, non uno per sezione.**
1. *Il gradino* (materia): immagini e blocchi salgono scoperti da quattro colonne sfalsate.
2. *La riga* (testo): parole che salgono dentro una maschera, in verticale, mai in diagonale.
3. *La luce* (interazione): la luce arancione segue il cursore su superfici e palco; mai tilt da cartolina.
Curva unica d'ingresso `--ease-salita`, tre durate 180/420/900ms, scrub sempre lineare. Fisica "rigida"
per tutto ciò che è scalinata: niente overshoot.

**Tre momenti firma.**
1. **Hero 3D — "Non ti vendiamo contatti"**: centinaia di cubi grafite (i contatti) fluttuano in
   profondità attorno al titolo; la luce arancione segue il cursore. Al primo scroll i cubi convergono e
   si montano nella scalinata del logo (ricostruita in Three.js con il metodo img2threejs), che sale
   oltre il bordo dell'hero dentro la sezione successiva. Mobile, low-power e reduced-motion: still
   pre-renderizzato della stessa scena, zero JS 3D.
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
  giro 2 (vedi sotto)

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
- Occhielli: il testo resta (è copy approvato), cambia il ruolo: diventano **etichette di margine**
  sticky (testata corrente) su desktop invece del "kicker" maiuscolo sopra ogni titolo.
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
- **URL di podcast, articoli e libri** (titoli e copertine), oggi marcati `.todo` in `fatturare.html`.

**Decisione con il cliente**
- **Lo stack** (HANDOFF §7): statico com'è, o WordPress. Su WordPress la scena pinnata e l'hero 3D sono
  i primi elementi a rischio; tutto il resto è CSS e porta bene.
