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
zona fredda `#1E3A6E`; `#CC3366` solo per la perdita. Strategia: palco neutro + una luce che si sposta.

**Tipografia.** DM Sans (display 500, colpo 700) + Instrument Serif italic come contrappunto, max due usi
per pagina: entrambe vincolate dal cliente. Scala fluida con `clamp()`, minimo 12px per le etichette,
16px per il corpo. I titoli chiave si compongono parola per parola (split fatto al build, non a runtime:
niente CLS, niente bug di autoSplit).

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

- [x] 0 · Installazione skill, git + branch, audit, direzione (questo file, `PRODUCT.md`)
- [ ] 1 · Design system: palco continuo, scala, etichette di margine, componenti, bug 10–16
- [ ] 2 · Sezioni della home una per una
- [ ] 3 · Pagine interne
- [ ] 4 · Movimento + 3D (hero, macchina, muro, cursore)
- [ ] 5 · Rifinitura, performance (Lighthouse mobile ≥ 90), accessibilità
- [ ] 6 · Due giri completi verifica → correzione a tutti i breakpoint, prima/dopo

## 4 · Registro delle scelte

- Palette, font, raggi e logo **non cambiano**: sono decisioni chiuse col cliente (HANDOFF §6).
- Occhielli: il testo resta (è copy approvato), cambia il ruolo: diventano **etichette di margine**
  sticky (testata corrente) su desktop invece del "kicker" maiuscolo sopra ogni titolo.
- Le quattro foto-mano diventano i quattro reparti di "Cosa facciamo" (megafono→Pubblicità,
  penna→Marketing, contratto→Reclutamento, tocco→Formazione): l'asset più forte del brand usato per
  quello che significa, invece che come sfondo ripetuto delle schede.
- Schede-risultato: grafico a unità con la particella (un quadrato = 100.000 €) al posto della foto:
  rappresenta solo i due dati dichiarati, non inventa valori intermedi.

## 5 · Problemi trovati durante il lavoro

- Chrome taglia gli screenshot oltre 16.384px e ricomincia dall'alto → audit a tranche da 8.000px.
- Il pane del browser dell'app è nascosto: lì le immagini lazy non partono. Verifica sempre via Playwright CLI.

## 6 · Da decidere insieme

- Installare Python 3.12 (serve agli script di img2threejs e ui-ux-pro-max).
- I bloccanti di contenuto dell'HANDOFF §7 restano aperti (numero verde, liberatorie, passaggi, libri…).
