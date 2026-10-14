# Direzione: PARTITA DOPPIA

**Concept.** Il sito non racconta la macchina: è il suo registro. Ogni affermazione ha la sua controparte in numeri nella colonna accanto — come nella partita doppia, invenzione italiana, dove nessuna scrittura esiste senza il suo riscontro. La superficie è un terminale ad ambra su nero caldo (l'arancio #FF8200 su nero non è "SaaS scuro": è il fosforo ambra dei terminali finanziari e industriali, l'unica traduzione culturalmente esatta del verde-menta di Sharpify), e la grammatica è quella del libro mastro: tabelle, totali a doppia riga, timestamp, numerazione dei reparti, un margine verticale che corre per tutta la pagina. Il wow non è uno spettacolo aggiunto: è la densità informativa che si compila sotto gli occhi — righe che si scrivono, totali che quadrano, una pipeline che si riempie, una tabella che si riordina.

**Perche calza.** Il DNA vero di SalesProcess non è l'arancione: è la contabilità come linguaggio ("Fatturare" tre volte, Fatturato, Cassa, Margine, Reparto). Questa direzione prende quel linguaggio e lo promuove da copy a architettura: il registro è il layout, il totale è la chiusura di sezione, il margine del libro mastro è la colonna di navigazione. Il payoff FATTURARE FATTURARE FATTURARE diventa il totale a triplice riga del bilancio e il nome del contenitore editoriale. Il mark a scalinata diventa il modulo funzionale: il quadrato singolo è il bullet e il "pacchetto" che attraversa la pipeline, quattro quadrati in salita sono i 4 reparti con il quadrato n-esimo acceso. Il CTA "Candida la tua azienda" smette di essere posa perché la selettività è resa in dati (criterio ICP 1-5 M€, candidature ricevute vs accettate nel trimestre). Di Sharpify rubiamo il livello e i meccanismi — fondo unico, opacità come sistema di gerarchia, una sola formula di testa-sezione ripetuta, un solo accento, giunzioni a filo, motion parsimonioso e normalizzato a un'unica curva — e ne correggiamo i tre difetti misurati: la scala invertita del carousel, i bordi UI sotto 3:1, il reveal bicolore che nel loro sito è codice morto con zero target (qui è il momento-firma). Rispetto "molto animato, forte e potente": la pagina ha 6 momenti-firma e una scena pinnata, ma il movimento porta sempre informazione — è il tipo di forza che un imprenditore di 50 anni con 3 M€ di fatturato riconosce come competenza, non come agenzia che si mette in mostra. E non è un clone: Sharpify è near-black freddo + verde + DM Sans + pill ovunque; questa è nero caldo + ambra + Red Hat Display/IBM Plex Mono + zero pill, raggio 2px, tabelle.

**Palette.** FONDI (un solo fondo per il 92% della pagina, giunzioni a filo, zero gradienti)
--nero #0C0B0A — base canonica, near-black CALDO (R12 > B10). Scelta opposta al #161519 freddo di Sharpify: un fondo caldo smorza l'arancio invece di eccitarlo, ed è l'antidoto misurabile al rischio energy-drink.
--nero-profondo #000000 — solo dietro l'inserto fotografico full-bleed dell'evento.
--sup-1 rgba(255,255,255,.035) → #151413, CR 1.07 — fascia di sezione, header di tabella.
--sup-2 rgba(255,255,255,.060) → #1B1A19, CR 1.13 — pannelli, card, righe pari.
--sup-3 rgba(255,255,255,.090) → #222120, CR 1.22 — stato hover / riga attiva.
--sup-sticky rgba(10,9,8,.90) + backdrop-filter blur(20px) saturate(180%) — nav e barra di stato.
--veil-caldo #3B2413 — superficie calda OPACA (mai alpha arancione: arancio@.18 su nero collassa a #402915, marrone). Usata solo dietro i quadranti numerici.

BORDI (3 step dichiarati per ruolo, non 6 per abitudine)
--bordo-hairline rgba(255,255,255,.10) → 1.25:1 — DECORATIVO. Mai unico confine di un elemento interattivo.
--bordo-forte rgba(255,255,255,.18) → 1.66:1 — DECORATIVO, separatori di tabella.
--bordo-ui rgba(255,255,255,.34) → 3.04:1 — OBBLIGATORIO su tutto ciò che è cliccabile (SC 1.4.11). La soglia è cablata nel token: su #0C0B0A serve α ≥ .340.
--bordo-accento rgba(255,130,0,.34) — riga attiva, stadio acceso della pipeline.

TESTO (4 step, non 18)
--t1 #FFFFFF — 19.67:1. Titoli, numeri, valori di tabella.
--t2 rgba(255,255,255,.72) → #BBBBBA, 10.24:1 — deck, corpo.
--t3 rgba(255,255,255,.50) → #868585, 5.34:1 — label mono, meta, colonne secondarie.
--t4 rgba(255,255,255,.38) → #686867, 3.53:1 — SOLO ≥24px o glifi decorativi. Sotto .38 non esiste token.
--t-su-arancio #000000 — obbligatorio su ogni superficie arancione (bianco su #FF8200 = 2.49:1, fallisce).

ACCENTO (famiglia a 5 livelli per luminanza, come il verde di Sharpify — non un colore singolo)
--ambra #FF8200 — IL BRAND. 7.91:1 su base, 8.45:1 col nero sopra. Inchiostro, hairline attiva, tasto pieno, mark.
--ambra-alta #FF9A38 — 9.30:1. SOLO hover di link testuali. Nota tecnica: #FF8200 ha headroom di gamut ZERO (B=0, R clippato), quindi "arancio più brillante" non esiste — questo token è già desaturato e va dichiarato come tale.
--ambra-fill #E87300 — 6.45:1. Stato premuto del tasto (l'hover non si accende: si espande).
--ambra-pivot #B85B00 — punto di pareggio nero 4.53 / bianco 4.63. Regola: sopra si usa nero, sotto si usa bianco.
--ambra-cupa #8A4300 — 2.70:1, MAI testo. Tick spenti del margine, griglie dei micro-grafici.
--glow-nucleo rgba(255,255,255,.90) + --glow-alone rgba(255,130,0,.28) / .50 — il glow ha nucleo BIANCO e alone ambra. Arancio@.30 diretto su nero dà #542E08 (fango); sopra un nucleo bianco@.55 dà #B28D66 (caldo, luminoso). Non è un vezzo: è ciò che separa premium da sporco.

SEMANTICI (hue lontane dal brand, perché l'accento divora lo slot "warning")
--ok #4ADE80 — 11.29:1. Solo il glifo di quadratura e gli stati confermati.
--attenzione #FFD84D — giallo puro, non ambra, per non collidere col marchio.
--errore #CC3366 — magenta-rosso: il residuo accidentale del sito attuale, qui LEGITTIMATO come hue di danger (colonna "4 fornitori diversi", glifi ✕).
--info #7AA2FF — 7.90:1.

DATI (disciplina di dataviz: mai un arcobaleno)
Serie A "dopo" = #FFFFFF · Serie B "prima" = rgba(255,255,255,.28) · Evidenza/delta = --ambra · Griglia = --ambra-cupa. Massimo 2 serie + 1 evidenza per grafico. Nessuno stato affidato al solo colore: sempre colore + glifo + testo.

BUDGET D'AREA: l'ambra occupa ≤3% dei pixel di ogni viewport; massimo un elemento ambra dominante per schermata. Vietati: gradienti arancio↔bianco, superfici tinte d'arancio oltre α .10, testo ambra sotto 15px o sotto peso 500, arancio su #000 puro per aree estese.

**Tipografia.** DUE FAMIGLIE, un contrappunto strumentale (non editoriale come l'Editorial Old di Sharpify).

1) RED HAT DISPLAY — variabile, Google Fonts, subset latin. Pesi usati: 400 / 500 / 700 / 800. È già il font dominante del brand (164 nodi nel DOM attuale), è geometrico-industriale e regge il tracking negativo. Fuori definitivamente: Nunito, Montserrat, Roboto, Roboto Slab.
2) IBM PLEX MONO — Google Fonts. Pesi 400 / 500 / 600. È il font della macchina: valori di tabella, timestamp, label di sistema, eyebrow, SLA, ID caso. Progettato per contesti tecnico-istituzionali, non "da coder". Budget d'area: ≤15% dei caratteri della pagina, MAI per corpo lungo.
3) NEWSREADER Italic (opzionale, gated) — un solo uso in tutto il sito: il virgolettato del cliente dentro la riga espansa del registro, 22px/300 italic. Si attiva solo quando esistono citazioni vere firmate. Se non arrivano, non si carica.

SCALA (clamp, plateau di tracking)
display-1 · RHD 800 · clamp(44px, 7.2vw, 104px) · lh .98 · ls -.040em — H1 hero
display-2 · RHD 800 · clamp(34px, 4.6vw, 64px) · lh 1.06 · ls -.035em — H2 di sezione
numero-quadrante · RHD 800 · clamp(56px, 7vw, 96px) · lh .90 · ls -.045em · tabular-nums — con unità in span separato a .34em (il "$50M" di Sharpify tradotto in "18,4 M€")
titolo-1 · RHD 700 · clamp(24px, 2.6vw, 34px) · lh 1.20 · ls -.020em
titolo-2 · RHD 700 · 20px · lh 1.30 · ls -.010em — titolo di card/modulo
deck · RHD 400 · clamp(17px, 1.4vw, 19px) · lh 1.60 · ls -.010em · max-width 62ch
corpo · RHD 400 · 17px · lh 1.62 · ls -.010em · max-width 68ch
corpo-sm · RHD 400 · 15px · lh 1.58 · ls +.020em
valore · IBM Plex Mono 500 · 15px · lh 1.50 · ls 0 · tabular-nums — celle di tabella, allineate a destra
valore-forte · IBM Plex Mono 600 · 17px · ls -.010em — delta, totali di riga (l'unico mono che può essere ambra)
meta · IBM Plex Mono 500 · 13px · lh 1.45 · ls +.040em — timestamp, fonte, sotto-label CTA
sistema · IBM Plex Mono 600 · 11px · lh 1.20 · ls +.120em · UPPERCASE · --t3 — eyebrow, header di colonna, indice di sezione

LA LEGGE DEL TRACKING (tre plateau con inversione di segno tra 15 e 17px — indipendente dal font, 6 token e basta)
--tr-display -.040em (≥32px, PIATTO: non inseguire una curva, da 44 a 104px il valore in em non cambia)
--tr-titolo -.020em (24-31px) · --tr-corpo -.010em (17-23px) · --tr-corpo-sm +.020em (15-16px) · --tr-meta +.040em (13-14px) · --tr-sistema +.120em (≤12px UPPERCASE)
Rapporto display:meta = 104:11 ≈ 9,5:1. È questa ampiezza che permette all'11px di restare davvero 11px.

REGOLE DI CIFRA (non negoziabili in una direzione proof-first)
font-variant-numeric: tabular-nums su OGNI numero; min-inline-size in ch su ogni contatore (zero CLS); unità e valuta in span separato a peso 500 e dimensione .34em del numero; separatore decimale ITALIANO (virgola) e migliaia con punto via Intl.NumberFormat('it-IT'); mai il simbolo $.
CAPS: massimo una parola in caps per blocco, e solo dal lessico core (ZERO, FATTURARE, 4 IN 1). Tutto il resto in caps è mono ≤13px.

## Flusso sezioni

- 00 · BARRA DI STATO (fixed, h 40px) — Funzione: dichiarare al primo pixel che c'è una macchina accesa, con una data. Non un banner promozionale: una riga di telemetria. Mono 12px, --t3, dot ambra 8px con pulse 1.6s (solo box-shadow spread, zero transform), separatori '·'. Copy: `● SISTEMA ATTIVO · 750 PROCESSI REALIZZATI · DATI AGGIORNATI AL 07.09.2026 · PROSSIMA SERATA MILANO 14.10 — 30 POSTI →`. A 860px cade il conteggio processi, a 430px resta solo la serata. La X di chiusura setta html.stato-off e azzera il padding-top del body.
- 01 · NAV STICKY (h 72px, top 40px) — Funzione: dare al sito la struttura che oggi non ha (oggi: hamburger + un CTA su 4.363px). Mark a scalinata 28px + wordmark; poi quattro voci — `Metodo · Risultati · Il reparto · Fatturare³` — e a destra il tasto ambra. Le voci sono quattro perché quattro è il numero del brand. Hover voce: solo colore (--t2 → --t1) + una hairline ambra 1px che appare sotto, nessun transform. Isteresi a due soglie: attiva a 48px, disattiva a 12px, per non sfarfallare mentre il backdrop-filter transiziona in 300ms. Sotto 1024px: burger, inner h 60px, fondo già opaco.
- 02 · HERO — IL QUADRO COMANDI (min-h 100svh, pt 160px) — Funzione: la prova entra PRIMA della piega, non dopo. Griglia 7/5. Sinistra: eyebrow `01 — REPARTO VENDITA / COSTRUZIONE DA ZERO`; H1 display-1 su tre righe «Ti costruiamo il reparto vendita. Da ZERO. In 6 mesi o meno.» con ZERO in ambra (unica parola ambra del viewport); deck «Pubblicità, marketing a risposta diretta, reclutamento, formazione della rete vendita. Quattro reparti sotto lo stesso tetto, allineati su un solo numero: il tuo fatturato.»; tasto ambra `Candida la tua azienda` con sotto-label mono `Fatturato 1–5 M€ · no start-up · rispondiamo in 48 ore`; link secondario `Apri il registro dei risultati ↓`. Destra: IL PANNELLO — modulo r10 su --sup-2, header mono `REGISTRO PROCESSI — ESTRATTO · agg. 07.09.2026`, 5 righe tabellari (settore · fatturato iniziale → attuale · mesi · Δ), doppia riga di chiusura e totale. L'H1 è l'elemento LCP ed è opaco al parse: si muove la maschera, non il testo.
- 03 · NASTRO DEI RISCONTRI (h ~440px, dentro l'hero, top -64px) — Funzione: prova nominale in movimento, la sostituzione dei 30 ritratti 300x300 muti. Schede di riscontro 300x186, r10, --sup-2, bordo-hairline: header mono `IMPIANTISTICA · 2024`, numero 44px tabular bianco + unità ambra, label caps 12px --t3 `INCREMENTO DI FATTURATO IN 11 MESI`, footer con monogramma cliente in un quadrato 28px r2 e uno sparkline SVG di 12 punti (stroke bianco 1.5px, ultimo punto ambra 3px). Scorrimento delta-time reale 30px/s su qualunque refresh rate, pausa su hover E focus, drag con axis-lock e inerzia al rilascio, scala di prossimità CORRETTA (0.94 + 0.06·t, opacity .62 → 1, z-index coerente). Hover: il bordo va a --bordo-ui e in 200ms si rivela una riga di contesto (canale, tempo medio di chiusura) — densità in più, movimento in meno.
- 04 · LO STATEMENT (h ~460px, pt/pb 128px) — Funzione: dire chi siamo in una frase, e costringere a leggerla piano. Testo centrato, max-width 1160px, display-2 a 56-64px: «Non ti vendiamo clienti. Ti costruiamo il reparto che li chiude.» È il punto di massima quiete della pagina: nient'altro nel viewport, nessun bordo, nessun numero. Il movimento è uno solo e trasporta significato (vedi signature #2).
- 05 · [ 03/09 ] TELEMETRIA — I NUMERI, CON LA DATA (pt 96 / pb 96) — Funzione: prova di scala, ma granulare invece che grande (in Italia la specificità batte la grandezza). Quattro quadranti, perché quattro è il numero del brand: `150 IMPRENDITORI SERVITI`, `33 SETTORI DIVERSI`, `750 PROCESSI DI VENDITA REALIZZATI`, `500+ VENDITORI GESTITI`. Ogni quadrante: numero 96px display 800 tabular, unità/segno ambra in span separato, label mono caps 13px, micro-serie di 8 barre verticali che si disegnano, e la micro-label onesta `dato aggiornato a settembre 2026 · fonte: registro interno`. Sotto la riga di quadranti, un nome proprio nella stessa schermata: `Ultimo processo consegnato: EVERGREEN LIFE — impiantistica · 11 mesi` (da confermare col cliente). Nessun glow diffuso animato: radial-gradient ambra .16 dipinto una volta dietro il numero.
- 06 · [ 04/09 ] METODO 4 IN 1 — LA PIPELINE E I TRE HANDOFF (scena pinnata, end +=280%) — Funzione: mostrare il meccanismo, non elencare quattro icone. Testa allineata a sinistra (la regola: centro se segue un nastro, sinistra se segue una griglia): `METODO 4 IN 1` + telemetria a destra `4 REPARTI · 3 HANDOFF · 1 TETTO`. Deck: «Il valore non sono i quattro reparti. Sono i tre passaggi di consegna che si rompono quando i reparti stanno in quattro aziende diverse.» Poi la scena: quattro stadi 01 PUBBLICITÀ / 02 MARKETING A RISPOSTA DIRETTA / 03 RECLUTAMENTO / 04 FORMAZIONE RETE VENDITA, un condotto orizzontale, tre etichette di handoff con SLA. È l'unico pin del sito e non esiste sotto 1024px.
- 07 · [ 05/09 ] IL CONTRO-ESEMPIO (pt 96 / pb 96) — Funzione: il contenuto più persuasivo disponibile, e oggi non è sul sito. Tabella di confronto a due colonne su un'unica hairline verticale centrale: `QUATTRO FORNITORI DIVERSI` (glifi ✕ in --errore) vs `QUATTRO REPARTI, UN TETTO` (quadratino ambra). Righe reali: «Il lead pubblicitario arriva al marketing senza sapere da quale annuncio» / «Ogni lead porta con sé l'annuncio, la promessa e l'obiezione attesa» — «Il venditore lo assumi tu, poi lo formi tu» / «Lo selezioniamo noi, lo formiamo noi, resta tuo» — «Quattro report che non si sommano» / «Un solo numero: il fatturato». Otto righe, mono 15px, leader dots. Zero animazione oltre il reveal: qui si legge.
- 08 · [ 06/09 ] IL REGISTRO — I CASI, PER ESTESO (min-h 900px) — Funzione: sostituire per sempre le cinque testimonianze con testo placeholder identico. Una tabella maestra vera, non una griglia di card: colonne SETTORE / FATTURATO INIZIALE / FATTURATO ATTUALE / Δ / MESI / REPARTI ATTIVATI, 12-16 righe, filtri a chip in cima. Riga espandibile con referente, canale e virgolettato. Copy di header: `REGISTRO DEI PROCESSI CONSEGNATI` + telemetria `12 AZIENDE · 6 SETTORI · 2021—2026 · dati forniti dai clienti`. Empty state progettato e onesto: «Il registro è in aggiornamento. Pubblichiamo un caso solo quando il cliente ci autorizza il numero.»
- 09 · [ 07/09 ] CHI ENTRA, CHI NO (pt 96 / pb 96) — Funzione: rendere vera la selettività, che è ciò che legittima il CTA. Due colonne di criteri con i glifi coerenti, e in cima una riga di telemetria che è il pezzo forte: `CANDIDATURE RICEVUTE NEL TRIMESTRE: 84 · IN VALUTAZIONE: 9 · ACCETTATE: 11` (numeri da confermare). Criteri reali: fatturato 1–5 M€ · prodotto o servizio già validato sul mercato · disponibilità a un budget pubblicitario continuativo · un referente interno con potere di decisione. Colonna destra: no start-up · no chi cerca solo lead da rivendere · no chi non vuole assumere venditori. Chiusura: «Non è un no per sempre. È un no per adesso.»
- 10 · [ 08/09 ] IL REPARTO — LE PERSONE, LEGATE AI REPARTI (pt 96 / pb 128) — Funzione: qui facciamo l'OPPOSTO di Sharpify, che è un'entità senza volti. Noi vendiamo persone che entrano in azienda, e il compratore italiano di PMI compra dalla faccia. Griglia di ritratti in bianco e nero (grayscale(1) → 0 in 200ms su hover), ognuno con etichetta mono del reparto `03 · RECLUTAMENTO`. Al passaggio, nel margine si accende il quadrato corrispondente del mark. Testa: `34 PERSONE, DIVISE IN QUATTRO REPARTI` + una riga: «Il tuo venditore lo seleziona Giulia. Lo forma Cristian. Il budget lo gestisce Francesco.» Slug /team/, mai /team-2/.
- 11 · [ 09/09 ] FATTURARE FATTURARE FATTURARE (pt 128) — Funzione: il payoff smette di essere decorazione e diventa il nome del contenitore editoriale (il posto che in Sharpify occupa un generico [ RESOURCES ]). Tre blocchi: podcast (episodi, piattaforme, ultimo titolo), articoli, prossima serata datata. Sopra tutto, il marquee del payoff: tre parole in display 800 96px caps che scorrono, la terza in ambra, con pulsante di pausa REALE (WCAG 2.2.2 è livello A, obbligatorio) oltre alla pausa su hover e focus.
- 12 · INSERTO EVENTO — SALA (full-bleed, h 520px, fondo #000) — Funzione: l'unica rottura di registro della pagina, il ruolo che in Sharpify ha la fascia crema al 2%. Fotografia vera del Sales Process Day con la texture sticker/graffiti già esistente, sopra un solo blocco: `SALES PROCESS DAY · MILANO · 14.10.2026` + `30 POSTI IN SALA · RIMBORSO IMMEDIATO AL DESK, SENZA SPIEGAZIONI` + tasto outline `Prendi uno dei 30 posti`. Il registro energico del brand vive qui e non contamina il resto: è un altro mondo, dichiarato.
- 13 · SCHEDA ANAGRAFICA — CHI SIAMO E LE PROVE ISTITUZIONALI (pt 96) — Funzione: in Italia l'esistenza legale documentata è un proof point competitivo, e Sharpify non ce l'ha. Tabella chiave/valore in mono a due colonne: ragione sociale, P.IVA, forma societaria, anno di costituzione, sede operativa Milano Via Marco D'Agrate 41, sede legale Capiago Intimiano (CO), certificazione con norma/ente/numero/scadenza, co-founder. Alberto Frisoni in due righe fattuali (750 processi, 2 libri, il podcast dal 2023). Alfio Bardolla in UNA riga: co-founder, gruppo quotato su Euronext Growth Milan. Nessun patrimonio personale, nessuna icona aspirazionale.
- 14 · IL TOTALE CHE QUADRA + IL CAFFÈ (pt 128 / pb 96) — Funzione: chiusura contabile e chiusura umana, in quest'ordine. Prima il totale a doppia riga (signature #6). Poi, una volta sola in tutto il sito, il caffè: foto vera dell'ufficio, «Vieni a prendere un caffè in Via Marco D'Agrate 41. Il nostro ufficio di Milano è a dieci minuti dalla tangenziale.» + orari e tempo di risposta dichiarato.
- 15 · FOOTER (pt 72, fondo #0A0908) — Funzione: densità di navigazione + controllo di esistenza. Cinque colonne (brand / METODO / RISULTATI / FATTURARE³ / CONTATTI) con la gerarchia fatta di tre soli grigi: titolo colonna --t4, link --t3, hover --t1. Riga legale con P.IVA e numero di certificazione. In fondo, il payoff impostato come totale di bilancio: tre righe FATTURARE, la terza in ambra, chiuse da una doppia riga a piena larghezza.

## Momenti firma

- 1 · LA COMPILAZIONE DEL REGISTRO (hero, ~1.400ms, one-shot, LCP-safe). Il pannello a destra dell'H1 si scrive da solo. Ogni riga entra con mask reveal — non fade+translate: `clip-path: inset(100% 0 0 0) → inset(0 0 0 0)` dentro un contenitore `overflow: clip`, 620ms, cubic-bezier(.22,1,.36,1), stagger 70ms — così il contenuto sembra STAMPATO invece che fatto apparire, e resta un solo asse e una sola curva. Dopo la quinta riga (a 350ms dall'ultima) si disegna la doppia riga di chiusura via `transform: scaleX(0 → 1)` con `transform-origin: left`, 420ms. Poi il totale fa count-up 900ms `power2.out` con `snap`, formattato `Intl.NumberFormat('it-IT')`, in tabular-nums con `min-inline-size: 9ch` (zero CLS). Trigger: IntersectionObserver threshold .18, `unobserve()` immediato, failsafe `setTimeout(2500)` che forza lo stato finale se l'osservatore non scatta. Vincolo: l'H1 (elemento LCP) è già opaco al parse e non dipende dal bundle JS — il pannello entra dopo e non tocca l'LCP.
- 2 · IL CARETTO CHE SCRIVE LO STATEMENT (scrub, 720px di corsa). È il momento-firma di Sharpify riscattato: nel loro sito il reveal bicolore esiste nel codice e ha ZERO target (il selettore `.sin-tekst` non esiste in pagina), quindi il vero colpo di teatro non è mai attivo. Qui lo accendiamo. Due tween sovrapposti sullo stesso stagger, sfalsati di 220ms: il primo porta ogni carattere da rgba(255,255,255,.14) ad AMBRA in 180ms, il secondo da ambra a bianco pieno in 220ms. Risultato: un fronte d'onda ambra largo ~3 caratteri che corre lungo la frase come un cursore di scrittura e lascia dietro di sé testo bianco definitivo. `SplitText.create('#claim',{type:'words,chars', aria:'auto', autoSplit:true})`, `ScrollTrigger {start:'top 78%', end:'+=72%', scrub:.5, refreshPriority:-1}`, `ease:'none'` su entrambi i tween. Il testo è già leggibile al 14%: l'animazione aggiunge enfasi, non informazione. `document.fonts.ready.then(ScrollTrigger.refresh)` obbligatorio. Reduced-motion: nessun split, `gsap.set` finale.
- 3 · LA PIPELINE DEI 4 REPARTI CON I TRE HANDOFF (unica scena pinnata, end +=280%, scrub .6). Quattro stadi in riga, tutti a opacity .34 e bordo-hairline. Un quadrato ambra 12px — il modulo del mark, quindi il logo che diventa il pacchetto di dati — parte dallo stadio 01 e attraversa il condotto: `gsap.to('.pkg',{x:()=>track.offsetWidth-12, ease:'none'})` dentro una timeline scrubbata, con `invalidateOnRefresh:true`. Ogni volta che il pacchetto entra in uno stadio, quello stadio si accende (border-color → --bordo-accento, background → --sup-3, titolo → --t1, 200ms) e il suo contatore si scrive: 01 `1.000 contatti generati` → 02 `180 profilati, 41 in trattativa` → 03 `4 venditori selezionati su 96 candidature` → 04 `37% di conversione a 90 giorni`. Nei tre intervalli compare l'etichetta dell'handoff: `HANDOFF 1 · lead → lead educato · SLA 24h · CRM condiviso`. A fine scena i tre handoff restano accesi tutti insieme e appare la riga di chiusura: «Tre passaggi di consegna. Con quattro fornitori diversi sono tre buchi. Qui sono tre righe di un processo.» Regole: `pinSpacing:true` (mai disattivarlo, produce CLS), `anticipatePin:1`, un solo pin in tutta la pagina, e `gsap.matchMedia('(min-width:1024px) and (prefers-reduced-motion: no-preference)')` con `return () => scene.kill()`. Sotto 1024px: quattro card verticali con la linea di connessione che si disegna via `animation-timeline: view()`, zero pin, zero JS.
- 4 · IL MARGINE (rail verticale, 88px, per tutti gli ~8.000px di pagina, ZERO JavaScript). Una hairline verticale continua a rgba(255,130,0,.18) sul bordo sinistro della griglia — il margine rosso del registro — con un tick 8x1px in corrispondenza di ogni sezione e l'indice mono `01`…`09` a --t4. Sopra la hairline spenta corre un segmento ambra pieno che cresce con lo scroll: `.margine__fill{ transform-origin: top; animation: rail linear both; animation-timeline: scroll(root block) }` con `@keyframes rail{ from{scale:1 0} to{scale:1 1} }`, tutto sul compositor thread, insensibile a qualunque blocco del main thread. Il tick della sezione corrente passa ad ambra piena e il suo indice a --t1 via `animation-timeline: view()` sulla sezione. `@supports not (animation-timeline: scroll())` → la hairline resta statica, l'indice resta leggibile, nulla si rompe. È insieme progresso, indice, firma strutturale e il pezzo di identità più economico dell'intero sito. Sotto 1280px collassa in una barra 2px sotto la nav.
- 5 · LA TABELLA CHE SI RIORDINA (il registro, filtri a chip). Il momento di 'densità informativa che si anima' senza aggiungere un solo effetto nuovo alla tavolozza. Al click su un chip di settore la tabella si riordina con View Transitions same-document: `document.startViewTransition(() => renderRows(filtro))`, con `view-transition-name` UNIVOCO per riga (`--vt: case-{id}` — nomi duplicati abortiscono silenziosamente la transizione: è il bug numero uno di questa API), `::view-transition-old(*)` a 180ms e `::view-transition-new(*)` a 260ms con la curva di sistema. Le righe che escono svaniscono e collassano, quelle che restano traslano alla nuova posizione. Fallback dove l'API non c'è: `Flip.getState()` + `Flip.from({duration:.42, ease:'power2.inOut', absolute:true})` di GSAP (plugin ora gratuito). Hover riga: `background: var(--sup-3)` 200ms + il Δ che passa da bianco ad ambra + il bordo sinistro della riga che si accende a 2px ambra. Click riga: si apre in 260ms una riga di dettaglio con referente, canale e virgolettato. Nessun lift, nessuna ombra: una riga di registro non si solleva, si accende.
- 6 · IL TOTALE CHE QUADRA (pre-footer, ~1.100ms, one-shot). La chiusura contabile del documento, ed è il momento in cui il concept si rivela. Due colonne di numeri affiancate su una hairline verticale: a sinistra `COSA ABBIAMO PROMESSO` (in 6 mesi o meno · un reparto vendita · quattro reparti allineati), a destra `COSA ABBIAMO CONSEGNATO` con i valori che fanno count-up in 900ms fino ad allinearsi esattamente all'altezza della riga corrispondente a sinistra. Quando l'ultimo contatore si ferma, una doppia riga a piena larghezza si disegna da sinistra (`scaleX`, 520ms) e compare, in mono 20px, il glifo di quadratura `✓` in --ok con la parola `QUADRA`. Immediatamente sotto, il payoff impostato come totale di bilancio: tre righe in display 800 — FATTURARE / FATTURARE / FATTURARE — la terza in ambra, chiuse dalla stessa doppia riga, e il tasto `Candida la tua azienda`. È l'unico punto del sito in cui compare il verde, ed è il punto in cui l'intera metafora del titolo diventa visibile senza che nessuno l'abbia spiegata.

## Motion

FILOSOFIA. Il movimento è texture, non collezione di effetti. Un solo gesto (rise/mask verticale), un solo asse, una sola curva di reveal, ampiezze sotto la soglia di distrazione. La parsimonia paga i sei picchi: un solo pin, due scrub non adiacenti, tutto il resto one-shot e irreversibile. Nessuno smooth scroll globale: lo smoothing va sull'animazione (`scrub: .5–.6`), non sull'input dell'utente. Il pubblico — imprenditori di PMI su desktop Windows con la rotella del mouse — è il profilo peggiore possibile per lo scroll-hijack, e Sharpify stesso non lo usa. `scroll-behavior: smooth` solo per gli anchor, disattivato in reduced-motion.

TOKEN (unica fonte di verità: se un valore non è qui, non si usa)
:root{
  --dur-istante: 120ms; --dur-rapida: 200ms; --dur-reveal: 620ms; --dur-lunga: 900ms;
  --ease-out: cubic-bezier(.22, 1, .36, 1);      /* expo-out: l'unica curva di ingresso */
  --ease-io:  cubic-bezier(.65, 0, .35, 1);      /* solo per stati reversibili */
  --travel: 24px; --stagger: 70ms; --parallasse: 1;
  --marquee-stato: running; --marquee-dur: 46s;
}
Due durate di reveal massimo (micro 200ms / reveal 620ms), non tre come Sharpify (che ha 0,55 / 0,7 / 1,05s con quattro stagger diversi: è assemblato, non progettato). Ogni ingresso della pagina usa `--dur-reveal` e `--ease-out`. Senza eccezioni.

GERARCHIA A SEI LIVELLI
L0 · FERMO. Tipografia display, numeri, quadranti, il margine, la griglia, i bordi. Nessun titolo che vola, nessuna rotazione, nessuna scala su testo. È la spina dorsale.
L1 · MICRO-STATO (200ms, --ease-io): `color`, `background-color`, `border-color`. È la maggioranza netta delle transizioni del sito. Non produce movimento, produce risposta.
L2 · TATTILE (200ms): `translateY(-2px)` sui soli tasti; le card e le righe di registro NON si alzano — si ACCENDONO (bordo + superficie). Coerenza semantica: uno strumento non è un oggetto fisico. Ampiezza massima su tutto il sito: 2px.
L3 · INGRESSO (620ms, one-shot, un asse): mask reveal `clip-path: inset(100% 0 0 0) → inset(0)` dentro `overflow: clip`, oppure figlio a `translateY(110%) → 0`. Stagger 70ms, catena massima 490ms (7 elementi). Sempre `unobserve()` + failsafe `setTimeout(2500)`. Risalendo la pagina non si ri-anima nulla: è ciò che elimina l'effetto flipbook dei siti fatti con AOS.
L4 · AMBIENT PERIFERICO: il dot di stato (1.6s, solo `box-shadow` spread, zero transform), i due marquee (46s / 34s mobile). Solo ai bordi della pagina — barra di stato, nastro dei riscontri, payoff. Mai dentro un blocco di lettura. Ogni loop è sospeso da IntersectionObserver quando esce dal viewport e da `visibilitychange` quando il tab passa in background.
L5 · I DUE PICCHI: il caretto sullo statement (scrub .5, 720px) e la pipeline (pin, scrub .6, +=280%). Sono a ~3.000px di distanza: non competono mai nello stesso viewport. Deroga consapevole alla regola "un solo elemento scrubbato per pagina"; se il budget si stringe, la pipeline degrada a reveal per stati (`toggleActions: 'play none none none'`) e la scena resta comprensibile.

ARCHITETTURA TECNICA — 70/20/10
70% CSS nativo scroll-driven (`animation-timeline: view()` e `scroll(root block)`, `animation-range: entry 15% cover 40%`): tutti i reveal ordinari, il margine, gli sparkline, le linee di connessione mobile. Gira sul compositor thread, zero JS, resta fluido anche col main thread occupato. Sempre dietro `@supports not (animation-timeline: view())` che ripristina lo stato finale.
20% GSAP 3.13 (core + ScrollTrigger + SplitText + Flip ≈ 45KB gz, tutto gratuito da aprile 2025, servito da locale mai da CDN): le due scene scrubbate, il conteggio, il drag del nastro, il riordino della tabella.
10% (in pratica 0%) WebGL: nessuno. Il glow è un radial-gradient dipinto una volta, o un asset pre-sfocato. `filter: blur()` animato su aree grandi è il costo GPU più alto del web e qui non serve.

REGOLE DI PERFORMANCE CABLATE
Solo `transform` / `translate` / `scale` / `opacity` / `color` / `clip-path`; zero animazioni di proprietà di layout. `will-change` è un prestito: si aggiunge in `onStart` e si rimuove in `onComplete` / `transitionend` — mai 40 dichiarazioni permanenti come in Sharpify. Massimo ~10 layer promossi contemporaneamente. Mai `getBoundingClientRect()` dentro `pointermove`/`scroll`: misure in cache, invalidate su resize debounced 80ms e su `ScrollTrigger.refresh()`. `gsap.quickTo` per qualunque loop di puntatore, mai `gsap.to`. Velocità dei marquee delta-time (`pos -= 0.03 * dt`), non frame-based, così 60/120/144Hz danno la stessa velocità. `content-visibility: auto` + `contain-intrinsic-size: auto 800px` sulle sezioni sotto la piega, ESCLUSA la sezione pinnata. Budget: max 3 animazioni concorrenti per viewport, 1 pin in tutta la pagina, meno di 2ms di JS per frame nelle scene scrubbate, INP < 100ms, CLS 0,00.

MOBILE (<1024px) — riduzione, non miniaturizzazione
Zero pin, zero scroll orizzontale forzato, zero drag inerziale (scroll nativo + `scroll-snap-type: x mandatory` + `overscroll-behavior-x: contain`), zero cursore custom, zero WebGL. La pipeline diventa quattro card verticali con la linea che si disegna. La tabella maestra diventa una lista di schede chiave/valore (mai una tabella a sei colonne compressa in 375px: è il punto di rottura della direzione). `--travel: 16px`, durate ×0,8, marquee 34s (tragitto più corto, velocità percepita costante), `--parallasse: 0`. Il margine collassa in una barra 2px. Tutto gestito con `gsap.matchMedia()`, che CREA e DISTRUGGE le scene al breakpoint invece di lasciarle inerti a consumare memoria.

PREFERS-REDUCED-MOTION — token, non interruttore
Vietato `* { animation: none !important }`: rompe gli accordion e fa scomparire per sempre ogni elemento con `fill-mode: both` che parte da opacity 0.
@media (prefers-reduced-motion: reduce){
  :root{ --dur-istante:1ms; --dur-rapida:100ms; --dur-reveal:140ms; --dur-lunga:180ms;
         --travel:0px; --parallasse:0; --marquee-stato:paused; }
}
Il travel va a zero, la dissolvenza sopravvive, ogni stato resta raggiungibile. Nel dettaglio: nessuno split del testo (elimina anche il rischio a11y sugli screen reader) e `gsap.set(chars,{color:'#fff'})`; nessun pin, la pipeline diventa un reveal a stati statico; i contatori mostrano subito il valore finale; i marquee `animation-play-state: paused` con `overflow-x: auto` sul contenitore, così l'informazione resta scorrevole a mano; il rAF del nastro non parte; il dot di stato non pulsa. Lato JS due varianti gemelle con `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` e `('(prefers-reduced-motion: reduce)')`, così il cambio a runtime dell'impostazione di sistema fa teardown pulito. Rispettiamo gratis anche `prefers-reduced-transparency`, `prefers-contrast`, `(update: slow)` e `Save-Data`.
Copertura dichiarata: 100% delle animazioni della pagina. Sharpify è al 5% (due soli blocchi in tutto il sito): è un differenziale verificabile da chiunque in cinque secondi, ed è anche conformità WCAG 2.3.3 e SC 2.2.2 (livello A, obbligatorio: il marquee del payoff ha un pulsante di pausa reale, non solo l'hover).

IL TEST DECISIVO. Uno screenshot statico di ogni sezione deve funzionare come manifesto. Se la pagina senza motion è brutta, il motion sta coprendo una gerarchia debole — e in una direzione proof-first sarebbe il fallimento peggiore possibile.

## Rischi

- BLOCCANTE — è l'unica delle quattro direzioni che non si può costruire senza il dataset. Un registro con sei righe vaghe è peggio di nessun registro: la tabella maestra, i quattro quadranti e il totale che quadra richiedono numeri veri, nominali, datati e con liberatoria. Oggi i numeri esistono ma si contraddicono (150 vs +800 imprenditori, +20 vs 30 vs 34 persone, 6 mesi vs 9/12) e le cinque testimonianze hanno tutte la stessa frase placeholder. Mitigazione obbligatoria: un documento unico di fonte dei numeri firmato dal cliente prima del design definitivo, un numero per concetto su tutte le proprietà digitali, data di aggiornamento visibile, e empty state progettati per ogni modulo dati. Senza questo la direzione va rifiutata, non annacquata.
- FREDDEZZA. Tabelle, mono, timestamp e totali possono leggere 'software di contabilità' invece di 'partner che mi fa crescere'. Il calore lo portano solo quattro cose e vanno difese in ogni revisione: il nero CALDO #0C0B0A (non il nero freddo di Sharpify), l'ambra, i volti del reparto in una griglia grande, e l'inserto evento full-bleed. Se in fase di build si tagliano i volti o l'inserto 'per densità', la direzione diventa ostile.
- ESPOSIZIONE. Pubblicare una tabella di casi con Δ, mesi e settore mette il brand in una posizione verificabile: qualunque prospect può chiamare un cliente citato. È esattamente il punto di forza della direzione e insieme il suo rischio reputazionale — un solo numero gonfiato contamina tutti gli altri, e il claim senza fonte già presente sul sito ('-50% rischio di fallimento') va eliminato o citato. Serve una policy scritta: si pubblica solo ciò che il cliente autorizza e che è ricostruibile da CRM.
- IL MONO INVECCHIA. L'estetica terminale è una moda del dev-tooling 2023-2026 e tra tre anni può datare come oggi datano i gradienti arancio→bianco. Contromisure già cablate: budget d'area ≤15% dei caratteri, mai corpo lungo in mono, nessun effetto CRT (no scanline, no glitch, no testo che 'digita' da solo fuori dai due momenti-firma), e la struttura che regge anche se un giorno il mono viene sostituito — perché la vera identità è il registro e il margine, non il font a larghezza fissa.
- ZERO PILL. Abbandonare il raggio pill in favore del tasto rettangolare r2 è una scelta d'identità forte (Sharpify non ha una sola eccezione: ogni CTA è un pill, ed è il segnale universale di cliccabile). Rinunciarvi sposta l'affordance sul colore pieno, sul bordo --bordo-ui a 3.04:1 e sul cursore. Va verificato con un click-test su 5-8 utenti del target reale prima di consolidarlo; se cade, si recupera solo sul CTA primario, non su tutto il sistema.
- BUDGET DI MOTION PIÙ ALTO DELLE ALTRE DIREZIONI. Due scrub più un pin più un rAF di drag più i conteggi: è oltre la regola 'un solo elemento scrubbato per pagina' derivata da Sharpify. La difesa è la distanza (i due scrub non condividono mai un viewport) e il degrado dichiarato (la pipeline scende a reveal per stati). Ma va misurato su hardware reale — un Android di fascia media e un iPhone SE con throttling 4G — e il refresh del pin va tenuto sotto controllo: ogni `ScrollTrigger.refresh()` con un pin è un reflow completo.
- DENSITÀ SU MOBILE. Una tabella a sei colonne è il punto di rottura: se la si affronta come 'responsive squeeze' invece di riprogettarla come lista di schede chiave/valore, metà del pubblico vede la direzione al suo peggio. Il mobile va disegnato per primo su tre componenti (registro, pipeline, quadranti), non adattato per ultimo.
- RISCHIO DI RIUNIONE, NON DI DESIGN. Il cliente ha chiesto 'wow': qui il wow è cerebrale (densità che si riordina, numeri che quadrano) più che spettacolare (nessun WebGL, nessun blob, nessuna sequenza scrubbata di immagini). Va venduto con una demo interattiva dei sei momenti-firma, non con moodboard statiche — altrimenti in presentazione perde contro una direzione più rumorosa e meno difendibile.

---

# PARTITA DOPPIA — specifica completa

> Il sito come libro mastro del fatturato, letto su un terminale ad ambra.
> Riferimento strutturale: sharpify.io. Riferimento culturale: il registro contabile italiano e il terminale industriale a fosforo ambra. Zero somiglianza di pelle.

---

## 1. Fondamenta

### 1.1 Stack raccomandato
**Astro statico + GSAP 3.13 + Storyblok** (o Sanity se contano più la modellazione dei casi e il costo).
- `output: 'static'`, zero JS di framework per default, islands `client:visible` solo su registro filtrabile e nastro.
- Motion stack: GSAP core 23KB gz + ScrollTrigger 11KB + SplitText 7KB + Flip ≈ **45KB gz**, servito da locale. Nessun jQuery.
- Content collections con schema Zod: **la build fallisce se manca un campo obbligatorio di un caso**. In una direzione proof-first questo non è un dettaglio tecnico, è il presidio del concept.
- View Transitions cross-document via `@view-transition { navigation: auto }` per home ↔ /metodo/ ↔ /team/ ↔ caso singolo. 15 righe, degrado silenzioso.
- Se il vincolo è restare su WordPress+Elementor: il tetto realistico è ~7/10 e la tabella maestra va comunque costruita come blocco custom con dati in ACF. Le due scene scrubbate sopravvivono solo se agganciate ad attributi `data-scene` sui container, mai a classi generate.

### 1.2 Budget contrattuali
| Metrica | Target |
|---|---|
| LCP (mobile 4G, Moto G) | < 1,8s — l'elemento LCP è l'H1, testo, già opaco al parse |
| INP | < 100ms |
| CLS | **0,00** (un sito animato non ha scuse) |
| Nodi DOM | < 1.500 (Sharpify è a 2.069; SplitText solo su due frasi) |
| CSS critico inline | 14KB |
| JS al primo render | 100KB gz |
| Font | 2 famiglie, subset latin, variabile dove disponibile, `preload` + `size-adjust` sul fallback |

### 1.3 Griglia
```
Container:  1440px  nav e barra di stato (padding 40px)
            1320px  registro, tabelle, pipeline  ← il più largo: il dato ha bisogno di spazio
            1200px  griglie di card e quadranti
             960px  contro-esempio, scheda anagrafica
             720px  deck e corpo editoriale (misura di lettura)
Colonne:    12, gutter 24px
Margine:    colonna fissa 88px a sinistra della griglia (≥1280px) — vedi §3.1
Sezioni:    giuntate a filo. Gap inter-sezione = 0px su TUTTE le fasce.
            Il ritmo verticale esiste solo come padding interno.
```
**Scala di spaziatura (una vera scala, non valori accordati a mano):**
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`
- 160 padding-top hero (copre 40+72 di chrome fisso + 48 di aria)
- 128 respiro dei punti di transizione (statement, pre-footer)
- 96 padding standard di sezione
- 64 / 48 margine sotto la testa-sezione
- 32 / 24 gutter e padding di modulo
- 16 / 12 / 8 / 4 interni

**Gutter per componente:** 8 (chip) · 12 (righe di tabella) · 16 (celle) · 18 (griglia card) · 24 (quadranti, colonne di griglia) · 32 (colonne footer).

**Raggi — quattro valori, e sono deliberatamente piccoli:**
`2px` celle, chip, tag, tasti, badge (il "taglio tecnico": è il raggio dominante) · `10px` pannelli e moduli · `18px` solo card fotografiche e inserto evento · `50%` solo dot di stato e avatar.
**Nel sito non esiste una sola pill.** È la deviazione più visibile da Sharpify ed è consapevole: un quadro comandi non ha pillole, ha tasti.

---

## 2. Componenti

### 2.1 Barra di stato — `.stato`
```css
.stato{ position:fixed; inset-block-start:0; inline-size:100%; block-size:40px; z-index:9500;
  background:#0A0908; border-block-end:1px solid var(--bordo-hairline);
  display:flex; align-items:center; justify-content:center; overflow:hidden; }
.stato__riga{ display:flex; gap:12px; font:600 12px/1 'IBM Plex Mono'; letter-spacing:.08em;
  text-transform:uppercase; color:var(--t3); padding-inline:20px 44px; white-space:nowrap; }
.stato__dot{ inline-size:8px; block-size:8px; border-radius:50%; background:var(--ambra);
  animation:pulsa 1.6s ease infinite; }
@keyframes pulsa{ 0%{box-shadow:0 0 0 0 rgba(255,130,0,.6)} 70%{box-shadow:0 0 0 7px rgba(255,130,0,0)} 100%{box-shadow:0 0 0 0 rgba(255,130,0,0)} }
.stato__valore{ color:var(--t1); }   /* solo i numeri passano a bianco pieno */
.stato__cta{ color:var(--ambra); font-weight:600; }  /* 12px: unico ambra sotto 15px ammesso perché è un link con underline, non testo di lettura */
```
Copy: `● SISTEMA ATTIVO · 750 PROCESSI REALIZZATI · DATI AGGIORNATI AL 07.09.2026 · PROSSIMA SERATA MILANO 14.10 — 30 POSTI →`
Degradazione: @860px cade il conteggio processi; @430px resta solo la serata. `body{ padding-block-start:40px }`, azzerato da `html.stato-off`.

### 2.2 Nav — `.nav`
```css
.nav{ position:fixed; inset-block-start:40px; inline-size:100%; block-size:72px; z-index:9000;
  background:transparent; border-block-end:1px solid transparent;
  transition: background .3s ease, border-color .3s ease, backdrop-filter .3s ease; }
.nav.is-fondo{ background:var(--sup-sticky); backdrop-filter:saturate(180%) blur(20px);
  border-block-end-color:var(--bordo-hairline); }
.nav__inner{ max-inline-size:1440px; margin-inline:auto; padding-inline:40px;
  block-size:72px; display:flex; align-items:center; gap:26px; }
.nav a{ font:500 15px/1 'Red Hat Display'; letter-spacing:-.01em; color:var(--t2);
  padding:8px 14px; border-radius:2px; position:relative; transition:color var(--dur-rapida) var(--ease-io); }
.nav a::after{ content:''; position:absolute; inset-inline:14px; inset-block-end:2px; block-size:1px;
  background:var(--ambra); transform:scaleX(0); transform-origin:left;
  transition:transform var(--dur-rapida) var(--ease-out); }
.nav a:hover{ color:var(--t1) } .nav a:hover::after{ transform:scaleX(1) }
.nav a[aria-current="page"]{ color:var(--t1) } .nav a[aria-current="page"]::after{ transform:scaleX(1) }
```
**Isteresi obbligatoria** (Sharpify ha una soglia secca a 30px e sfarfalla mentre il backdrop-filter transiziona per 300ms):
```js
let attivo=false;
const f=()=>{ const y=scrollY;
  if(!attivo && y>48){ attivo=true; nav.classList.add('is-fondo'); }
  else if(attivo && y<12){ attivo=false; nav.classList.remove('is-fondo'); } };
addEventListener('scroll', f, {passive:true}); f();
```
**Normalizzazione forzata dei controlli a destra** (l'intervento che fa sembrare una nav progettata invece che assemblata): tasto CTA, switch e burger tutti a `block-size:40px; border-radius:2px; font:700 14px/1; padding-block:0`.
Voci: `Metodo · Risultati · Il reparto · Fatturare³`. Quattro, come i reparti.

### 2.3 Testa-sezione — la formula, ripetuta 9 volte
È la sintassi che si compra la densità: il lettore la impara una volta e poi non decodifica più. Traduzione dell'eyebrow `[ SEZIONE ]` di Sharpify in un **indice di registro a due lati**.
```
─────────────────────────────────────────────────────────────  ← hairline .10, piena larghezza
▪ 04 / 09   METODO 4 IN 1                4 REPARTI · 3 HANDOFF · 1 TETTO
                                                                ↑ telemetria mono, --t3, allineata a destra
H2  display-2, --t1
deck  19px, --t2, max-width 720px
                                                                ← margine 48px verso il corpo
```
```css
.testa{ border-block-start:1px solid var(--bordo-hairline); padding-block-start:24px;
  display:grid; grid-template-columns:1fr auto; align-items:baseline; gap:24px; margin-block-end:32px; }
.testa__id{ font:600 11px/1.2 'IBM Plex Mono'; letter-spacing:.12em; text-transform:uppercase; color:var(--t3);
  display:flex; align-items:center; gap:10px; }
.testa__id::before{ content:''; inline-size:8px; block-size:8px; background:var(--ambra); border-radius:1px; } /* il quadrato del mark */
.testa__tel{ font:500 13px/1.45 'IBM Plex Mono'; letter-spacing:.04em; color:var(--t3); text-align:end; }
.testa h2{ grid-column:1/-1; margin:32px 0 0; }
.testa__deck{ grid-column:1/-1; max-inline-size:720px; margin-block-start:20px; }
```
Il lato destro **porta sempre un dato**. È la differenza tra la nostra testa-sezione e la loro: la stessa quantità di CSS, il doppio di informazione.
Allineamento: sinistra sempre. Nessuna eccezione (Sharpify ne ha 2 su 8 e leggono come incoerenza).

### 2.4 Tasto primario — `.tasto`
```css
.tasto{ display:inline-flex; align-items:center; gap:10px; block-size:56px; padding-inline:32px;
  border:0; border-radius:2px; background:var(--ambra); color:#000;
  font:700 15px/1 'Red Hat Display'; letter-spacing:.02em; cursor:pointer;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.34), 0 10px 28px rgba(255,130,0,.20);
  outline:1px solid transparent; outline-offset:0;
  transition: outline-offset var(--dur-rapida) var(--ease-out),
              outline-color var(--dur-rapida) var(--ease-out),
              box-shadow var(--dur-rapida) var(--ease-out),
              transform var(--dur-istante) var(--ease-out),
              background var(--dur-rapida) var(--ease-io); }
.tasto:hover{ outline-color:rgba(255,130,0,.42); outline-offset:4px;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.34), 0 0 12px var(--glow-nucleo), 0 0 44px var(--glow-alone-forte); }
.tasto:active{ background:var(--ambra-fill); transform:translateY(1px);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.5), 0 4px 14px rgba(255,130,0,.16); }
.tasto:focus-visible{ outline:2px solid var(--ambra); outline-offset:3px; }
.tasto__sub{ display:block; margin-block-start:12px; font:500 12px/1.45 'IBM Plex Mono';
  letter-spacing:.04em; color:var(--t3); }
```
**La decisione tecnica che risolve il vincolo del gamut.** `#FF8200` ha headroom ZERO (canale B a 0, R clippato a 255): non esiste un arancio "più brillante" per l'hover — a chroma costante, già a +0.02 L esce da sRGB e vira al giallo. Quindi **l'hover non si accende: si espande.** L'outline cresce di 4px, il glow passa dal nucleo bianco all'alone forte, il fill resta identico. È un modello di interazione invertito rispetto allo standard, ed è l'unico corretto per questo colore.
Testo **sempre nero** su ambra: bianco su #FF8200 dà 2,49:1 e fallisce anche AA large. Nero dà 8,45:1.
Secondario: identico ma `background:transparent; color:var(--t1); box-shadow:inset 0 0 0 1px var(--bordo-ui)`; hover → `border` ambra + `background:var(--sup-2)`.

### 2.5 Il pannello / modulo dati — `.modulo`
Il componente più riusato del sito: hero, quadranti, registro, contro-esempio, scheda anagrafica.
```css
.modulo{ background:var(--sup-2); border:1px solid var(--bordo-hairline); border-radius:10px; overflow:clip; }
.modulo__head{ display:flex; align-items:center; justify-content:space-between; gap:16px;
  padding:14px 20px; background:var(--sup-1); border-block-end:1px solid var(--bordo-forte);
  font:600 11px/1.2 'IBM Plex Mono'; letter-spacing:.12em; text-transform:uppercase; color:var(--t3); }
.modulo__body{ padding:8px 0; }
.modulo__riga{ display:grid; grid-template-columns:1.4fr .9fr .9fr .6fr .7fr;
  align-items:center; gap:16px; padding:12px 20px;
  font:500 15px/1.5 'IBM Plex Mono'; font-variant-numeric:tabular-nums; color:var(--t1);
  border-block-end:1px solid rgba(255,255,255,.06);
  transition: background var(--dur-rapida) var(--ease-io); }
.modulo__riga > :not(:first-child){ text-align:end; }
.modulo__riga .settore{ font:500 15px/1.5 'Red Hat Display'; letter-spacing:.02em; color:var(--t2); text-align:start; }
.modulo__riga .delta{ font:600 17px/1 'IBM Plex Mono'; letter-spacing:-.01em; color:var(--t1); }
.modulo__riga:hover{ background:var(--sup-3); box-shadow:inset 2px 0 0 var(--ambra); }
.modulo__riga:hover .delta{ color:var(--ambra); }
/* il totale: la doppia riga del bilancio */
.modulo__totale{ display:grid; grid-template-columns:1fr auto; padding:20px;
  border-block-start:3px double var(--bordo-ui);
  font:600 11px/1.2 'IBM Plex Mono'; letter-spacing:.12em; text-transform:uppercase; color:var(--t3); }
.modulo__totale b{ font:800 28px/1 'Red Hat Display'; letter-spacing:-.03em; color:var(--t1);
  font-variant-numeric:tabular-nums; }
.modulo__totale b em{ font-style:normal; font-weight:500; font-size:.34em; color:var(--ambra); margin-inline-start:.2em; }
```
La `border-block-end: 3px double` è la firma tipografica del concept e costa una riga di CSS. Se serve controllo esatto dello spessore: `box-shadow: inset 0 -1px 0 var(--bordo-ui), inset 0 -4px 0 -3px var(--bordo-ui)`.

### 2.6 Quadrante numerico — `.quadrante`
Quattro per riga, gutter 24px, `flex: 0 0 calc((100% - 72px)/4)`, min-inline-size 220px.
```css
.quadrante{ position:relative; padding:32px 24px; background:var(--sup-2);
  border:1px solid var(--bordo-hairline); border-radius:10px; overflow:clip;
  transition:border-color var(--dur-rapida) var(--ease-io); }
.quadrante::before{ content:''; position:absolute; inset:-40% 0 auto 0; block-size:220px; z-index:0;
  background:radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,130,0,.16) 0%, transparent 66%); }
.quadrante > *{ position:relative; z-index:1; }
.quadrante__num{ font:800 clamp(56px,7vw,96px)/.9 'Red Hat Display'; letter-spacing:-.045em;
  color:var(--t1); font-variant-numeric:tabular-nums; min-inline-size:4ch; display:inline-block; }
.quadrante__unita{ font:500 .34em/1 'Red Hat Display'; color:var(--ambra); margin-inline-start:.12em; }
.quadrante__label{ margin-block-start:12px; font:600 13px/1.4 'IBM Plex Mono';
  letter-spacing:.08em; text-transform:uppercase; color:var(--t2); }
.quadrante__serie{ margin-block-start:20px; display:flex; align-items:flex-end; gap:4px; block-size:36px; }
.quadrante__serie i{ flex:1; background:var(--ambra-cupa); transform-origin:bottom; transform:scaleY(0); }
.quadrante__serie i:last-child{ background:var(--ambra); }
.quadrante__fonte{ margin-block-start:16px; padding-block-start:12px;
  border-block-start:1px solid rgba(255,255,255,.06);
  font:500 12px/1.45 'IBM Plex Mono'; letter-spacing:.04em; color:var(--t4); }
.quadrante:hover{ border-color:var(--bordo-accento); }
```
Il numero è bianco, non ambra: l'arancio pesa Y=0,372 contro Y=0,538 del verde di Sharpify, cioè −31% di luce. Nel loro sistema l'accento *illumina*; nel nostro *scalda*. Quindi il bianco fa il lavoro di luminanza e l'ambra fa il lavoro cromatico su unità e glow. È la compensazione che evita che la pagina risulti più spenta dell'originale.
Copy delle micro-label: `dato aggiornato a settembre 2026 · fonte: registro interno`. Mai "in crescita ogni trimestre": fattuale, non aspirazionale.

### 2.7 Scheda di riscontro — `.riscontro` (nastro)
```
┌──────────────────────────────────────┐  300 × 186, r10, --sup-2, bordo-hairline
│ IMPIANTISTICA · 2024        ▪▪▪▪    │  head mono 11px --t3 · sparkline 12 punti a destra
│                                      │
│ +121%                                │  44px/800 tabular bianco, il segno + in ambra
│ INCREMENTO DI FATTURATO IN 11 MESI  │  caps 12px mono --t3
│ ──────────────────────────────────── │
│ [EL]  Da 1,4 a 3,1 M€                │  monogramma 28px r2 su --sup-3 + valore mono 13px
└──────────────────────────────────────┘
hover → bordo --bordo-ui, si rivela in 200ms: `canale: telefono + LinkedIn · chiusura media 21 gg`
```
Le card **non si alzano** (`translateY` 0): si accendono. Nessuna fotografia con scrim, nessun `text-shadow` (il doppio bagliore sulle label di Sharpify è un difetto da non copiare: impasta caps da 15px).
**Meccanica del nastro** — le quattro correzioni ai difetti misurati nell'originale:
```js
const CACHE = misura();                    // offsetLeft/offsetWidth letti UNA volta, non per frame
addEventListener('resize', debounce(()=>{ Object.assign(CACHE, misura()); }, 80), {passive:true});
let vel = .03, target = .03;               // px per millisecondo → delta-time, non frame-based
function frame(t){
  const dt = Math.min(t - last, 34); last = t;
  vel += (target - vel) * .08;             // rampa lerpata: la pausa su hover non è più un booleano secco
  pos -= vel * dt;
  if (pos <= -CACHE.mezzo) pos += CACHE.mezzo;
  track.style.transform = `translate3d(${pos}px,0,0)`;
  for (const c of cards){
    const cx = CACHE.x[c.i] + pos;
    const t2 = Math.max(0, 1 - Math.abs(cx - CACHE.vpCx) / (CACHE.vpW * .45));
    c.el.style.transform = `scale(${(0.94 + 0.06*t2).toFixed(4)}) translateZ(0)`;  // PICCO al centro
    c.el.style.opacity  = (0.62 + 0.38*t2).toFixed(3);                              // profondità di campo
    c.el.style.zIndex   = t2 > .65 ? 2 : 1;
  }
  raf = requestAnimationFrame(frame);
}
```
1. **Scala corretta**: nell'originale la card centrale è `scale(0.841)` contro `1.06` ai bordi — misurato dal vivo — mentre riceve `z-index:2`. La formula era invertita: il momento più visto del sito ha una valle dove doveva avere un picco. Qui `0.94 + 0.06·t`, più opacity legata alla stessa `t`.
2. **Delta-time**: `pos -= .03 * dt` invece di `pos -= .5` per frame, così 60/120/144Hz danno la stessa velocità.
3. **Velocità lerpata + momentum**: hover porta `target` a 0 con rampa; al rilascio del drag la velocità dell'ultimo `pointermove` decade a 0.94/frame fino a rientrare nell'auto-scroll.
4. **Zero layout sincrono**: nessuna lettura di `offsetLeft` dopo una scrittura di `transform`.
Drag: `pointerdown/move/up` + `setPointerCapture`, soglia 18px, axis-lock (`if(Math.abs(dx)<Math.abs(dy)) return`), `touch-action: pan-y ↔ none`, click-guard 320ms in capture phase, `cursor: grab/grabbing`.
Maschera ai bordi: `mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)` — i riscontri svaniscono invece di essere tagliati. Costa una riga.
`will-change: transform` aggiunto all'avvio del rAF e **rimosso quando il nastro è in pausa o fuori viewport**.

### 2.8 Registro filtrabile — `.registro`
```
[ TUTTI 12 ] [ IMPIANTISTICA 3 ] [ SERVIZI B2B 4 ] [ MANIFATTURA 2 ] [ FORMAZIONE 3 ]
      ↑ chip r2, 36px, --sup-2, bordo-hairline; attivo: background ambra, testo nero, conteggio in rgba(0,0,0,.55)

SETTORE            FATTURATO INIZIALE   ATTUALE      Δ       MESI   REPARTI
Impiantistica              1,4 M€       3,1 M€    +121%       11    01·02·03·04
Servizi B2B                2,2 M€       3,8 M€     +73%        9    01·02·04
...
═══════════════════════════════════════════════════════════════════════════════
12 AZIENDE · 6 SETTORI                        INCREMENTO GESTITO   +18,4 M€
```
Header di colonna: mono 11px +.12em caps --t3, `position: sticky; top: 112px` (nav + barra di stato), fondo `--sup-1`.
Righe alternate: pari `transparent`, dispari `rgba(255,255,255,.02)`. Leader dots tra settore e primo valore su ≥1280px: `border-bottom: 1px dotted rgba(255,255,255,.14)` su uno span flessibile.
`REPARTI` è la firma del mark: quattro quadrati 8px, accesi in ambra quelli attivati, spenti a `--ambra-cupa` gli altri.
Riga espansa (click, 260ms, `grid-template-rows: 0fr → 1fr`): referente, canale, tempo medio di chiusura e, se esiste, il virgolettato in Newsreader italic 22px.
Empty state: «Il registro è in aggiornamento. Pubblichiamo un caso solo quando il cliente ci autorizza il numero. Nel frattempo: [Ascolta il podcast]».
Mobile: ogni riga diventa un `.modulo` con head `IMPIANTISTICA · 2024` e quattro coppie chiave/valore. **Progettato prima del desktop.**

### 2.9 Pipeline 4 in 1 — `.pipeline`
```
        01 PUBBLICITÀ      02 MARKETING       03 RECLUTAMENTO   04 FORMAZIONE
        ┌────────────┐     ┌────────────┐     ┌────────────┐    ┌────────────┐
   ▪───▶│            │──▶──│            │──▶──│            │──▶─│            │
        └────────────┘  ↑  └────────────┘  ↑  └────────────┘  ↑ └────────────┘
                    HANDOFF 1          HANDOFF 2          HANDOFF 3
```
Stadio spento: `opacity:.34; border:1px solid var(--bordo-hairline)`.
Stadio acceso: `opacity:1; border-color:var(--bordo-accento); background:var(--sup-3)`, titolo `--t1`, contatore che si scrive.
Condotto: hairline 1px `--ambra-cupa`; il segmento percorso passa a `--ambra` via `scaleX` legato al progresso.
Pacchetto: quadrato 12px `--ambra`, `border-radius:1px` — il modulo del logo.
Etichette handoff: mono 12px, `HANDOFF 1 · lead → lead educato · SLA 24h · CRM condiviso`, `--t3`, con il numero in `--t1`.
Contatori per stadio (copy):
- 01 Pubblicità → `1.000 contatti generati · 6 fonti di traffico`
- 02 Marketing a risposta diretta → `180 profilati · 41 in trattativa`
- 03 Reclutamento → `4 venditori selezionati su 96 candidature`
- 04 Formazione rete vendita → `37% di conversione a 90 giorni`
Chiusura: «Tre passaggi di consegna. Con quattro fornitori diversi sono tre buchi. Qui sono tre righe di un processo.»

### 2.10 Contro-esempio — `.confronto`
Due colonne su una hairline verticale centrale (`border-inline-start` sulla seconda colonna), max-inline-size 960px, otto righe.
Sinistra: header `QUATTRO FORNITORI DIVERSI`, glifo `✕` 14px in `--errore` in un quadrato 20px r2 con `background: rgba(204,51,102,.10)`.
Destra: header `QUATTRO REPARTI, UN TETTO`, quadrato ambra 8px.
Righe (mono 15px, lh 1.5, --t2 a sinistra / --t1 a destra):
| ✕ | ▪ |
|---|---|
| Il lead arriva al marketing senza sapere da quale annuncio | Ogni lead porta con sé annuncio, promessa e obiezione attesa |
| Il venditore lo assumi tu, poi lo formi tu | Lo selezioniamo noi, lo formiamo noi, resta tuo |
| Quattro report che non si sommano | Un solo numero: il fatturato |
| Quando il dato è brutto, la colpa è dell'altro fornitore | Quando il dato è brutto, è nostro |
Zero animazione oltre il reveal di sezione. Qui si legge.

### 2.11 Marquee del payoff — `.payoff`
```css
.payoff{ overflow:clip; padding-block:48px;
  mask-image:linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent); }
.payoff__track{ display:flex; inline-size:max-content; gap:64px;
  animation:scorri var(--marquee-dur) linear infinite;
  animation-play-state:var(--marquee-stato); }
@keyframes scorri{ to{ transform:translate3d(-50%,0,0) } }
.payoff__w{ font:800 clamp(48px,9vw,96px)/1 'Red Hat Display'; letter-spacing:-.04em;
  text-transform:uppercase; color:var(--t1); }
.payoff__w:nth-child(3n){ color:var(--ambra); }   /* la terza parola */
.payoff:hover .payoff__track, .payoff:focus-within .payoff__track{ animation-play-state:paused }
@media (prefers-reduced-motion:reduce){ .payoff__track{animation:none} .payoff{overflow-x:auto} }
```
Contenuto duplicato una volta lato server, il clone `aria-hidden="true"`.
**Pulsante di pausa reale** in alto a destra, 32px r2, mono 11px `PAUSA / RIPRENDI`: SC 2.2.2 è livello A, obbligatorio, e l'hover non basta per chi naviga da tastiera. Con l'European Accessibility Act in vigore dal 28 giugno 2025 è anche un argomento commerciale verso aziende.
IntersectionObserver che mette in pausa fuori viewport + `visibilitychange`.

### 2.12 Footer
Grid `1.5fr 1fr 1fr 1fr 1.05fr`, gap 32px, max-inline-size 1320px, padding `72px 40px 0`, fondo `#0A0908`.
Gerarchia con tre soli grigi: titolo colonna `--t4` 12px/700 +.10em caps → link `--t3` 14px → hover `--t1`. Zero colore, zero bordi, zero card.
Colonne: brand + tagline / METODO / RISULTATI / FATTURARE³ / CONTATTI.
Riga legale (mono 12px `--t4`): ragione sociale · P.IVA · sede legale · certificazione n. — per l'imprenditore italiano il footer con la P.IVA è un controllo di esistenza, ed è una prova che Sharpify non ha.
Sotto tutto: il payoff come totale di bilancio, tre righe display 800, la terza in ambra, chiuse da `border-block-start: 3px double var(--bordo-ui)` a piena larghezza.

---

## 3. Firme strutturali

### 3.1 Il Margine
```css
.margine{ position:absolute; inset-block:0; inset-inline-start:0; inline-size:88px; pointer-events:none; }
.margine__linea{ position:absolute; inset-block:0; inset-inline-end:0; inline-size:1px;
  background:rgba(255,130,0,.18); }
.margine__fill{ position:absolute; inset-block-start:0; inset-inline-end:0; inline-size:1px; block-size:100%;
  background:var(--ambra); transform-origin:top;
  animation:rail linear both; animation-timeline:scroll(root block); }
@keyframes rail{ from{ scale:1 0 } to{ scale:1 1 } }
@supports not (animation-timeline: scroll(root block)){ .margine__fill{ display:none } }
.margine__tick{ position:absolute; inset-inline-end:0; inline-size:8px; block-size:1px;
  background:var(--ambra-cupa); }
.margine__idx{ position:absolute; inset-inline-end:16px; font:600 11px/1 'IBM Plex Mono';
  letter-spacing:.12em; color:var(--t4); }
.sezione:has(> .testa) .margine__idx{ /* acceso via animation-timeline: view() sulla sezione */ }
@media (max-width:1279px){ .margine{ position:fixed; inset:112px 0 auto 0; inline-size:100%; block-size:2px } }
```
Zero JavaScript, compositor thread, insensibile a qualunque blocco del main thread.

### 3.2 Il mark come sistema
- Quadrato 8px r1 = bullet di ogni lista del sito (sostituisce il pallino) e glifo dell'eyebrow.
- Quattro quadrati in salita = i 4 reparti; l'n-esimo acceso indica lo stato in pipeline, tabella e team.
- Quadrato 12px = il pacchetto che attraversa la pipeline.
- Loader/transizione di pagina: i quattro quadrati che si accendono dal basso, `stagger .06`, `ease:'expo.out'`, `transform-origin: bottom`. È l'unica animazione di logo che vale la pena fare.
- Il passo diagonale del mark (rise/run) è l'**unico angolo del brand**: usato per l'offset verticale progressivo tra i quattro quadranti (0 / 8 / 16 / 24px) — il layout stesso sale.

---

## 4. Copy di esempio (italiano, pronto)

**Hero**
`01 — REPARTO VENDITA / COSTRUZIONE DA ZERO`
«Ti costruiamo il reparto vendita. Da **ZERO**. In 6 mesi o meno.»
«Pubblicità, marketing a risposta diretta, reclutamento, formazione della rete vendita. Quattro reparti sotto lo stesso tetto, allineati su un solo numero: il tuo fatturato.»
Tasto: `Candida la tua azienda` · sub: `Fatturato 1–5 M€ · no start-up · rispondiamo in 48 ore`
Secondario: `Apri il registro dei risultati ↓`

**Statement** — «Non ti vendiamo clienti. Ti costruiamo il reparto che li chiude.»

**Teste di sezione**
`▪ 03 / 09  TELEMETRIA` — «I numeri. Con la data accanto.» — telemetria: `AGGIORNATO 07.09.2026 · FONTE: REGISTRO INTERNO`
`▪ 04 / 09  METODO 4 IN 1` — «Il valore non sono i quattro reparti. Sono i tre passaggi di consegna.» — `4 REPARTI · 3 HANDOFF · 1 TETTO`
`▪ 05 / 09  IL CONFRONTO` — «Se i tuoi quattro fornitori non si parlano, stai pagando quattro volte lo stesso lead.»
`▪ 06 / 09  REGISTRO` — «I processi che abbiamo consegnato.» — `12 AZIENDE · 6 SETTORI · 2021—2026 · DATI FORNITI DAI CLIENTI`
`▪ 07 / 09  CHI ENTRA, CHI NO` — «La selezione, scritta.» — `TRIMESTRE IN CORSO: 84 CANDIDATURE · 11 ACCETTATE`
`▪ 08 / 09  IL REPARTO` — «34 persone, divise in quattro reparti.»
`▪ 09 / 09  FATTURARE FATTURARE FATTURARE` — «Il podcast, gli articoli, le serate.»

**Stati vuoti e di sistema** — è qui che si gioca la credibilità, perché nessuno ci fa attenzione
- Registro vuoto: «Il registro è in aggiornamento. Pubblichiamo un caso solo quando il cliente ci autorizza il numero.»
- Quiz non idoneo: «La tua azienda non rientra nei parametri di questo percorso. Non è un no per sempre: è un no per adesso. Ti mandiamo il podcast e ci riparliamo quando sei sopra il milione.»
- Form inviato: «Candidatura ricevuta. La leggiamo noi, non un software. Ti rispondiamo entro 48 ore lavorative.»
- Eventi vuoti: «Nessuna serata in programma. Le prossime date escono prima sulla newsletter che sul sito.»
- Errore di rete: «Non riusciamo a raggiungere il registro. Riprova, oppure scrivici a amministrazione@salesprocess.it.»

**Totale che quadra** — `COSA ABBIAMO PROMESSO` / `COSA ABBIAMO CONSEGNATO` / `✓ QUADRA` / FATTURARE ×3 / `Candida la tua azienda`

> **Nota sui numeri.** Confermati dal dossier: 150 imprenditori, 33 settori, 750 processi, +500 venditori, +1.100 partecipanti agli eventi, +35 serate sold out, +92% recensioni positive, 34 persone, 2 libri, ICP 1–5 M€, garanzia di rimborso al desk. Da riconciliare prima del build (oggi si contraddicono): imprenditori 150 vs +800, team 20/30/34, promessa 6 mesi vs 9/12 mesi vs X2–X5. Le righe del registro qui sopra sono **esempi di formato**, non dati: vanno sostituite una a una con casi autorizzati.

---

## 5. Stati — matrice completa
| Elemento | riposo | hover | focus-visible | active | disabled |
|---|---|---|---|---|---|
| Tasto primario | ambra, testo nero, glow .20 | outline-offset 0→4px, glow forte, fill invariato | outline 2px ambra, offset 3px | `#E87300` + translateY(1px) | `--ambra-cupa`, testo `rgba(0,0,0,.5)`, `cursor:not-allowed` |
| Tasto secondario | bordo `--bordo-ui` | bordo ambra + `--sup-2` | outline 2px ambra | `--sup-3` | bordo `--bordo-hairline`, testo `--t4` |
| Voce nav | `--t2` | `--t1` + hairline ambra scaleX 0→1 | outline 2px ambra offset 2px | — | — |
| Riga registro | `--t1` su transparent | `--sup-3` + inset 2px ambra + Δ ambra | outline 2px ambra inset | riga espansa 260ms | — |
| Chip filtro | `--sup-2`, bordo hairline | bordo `--bordo-ui` | outline 2px ambra | ambra pieno, testo nero, `aria-pressed="true"` | opacity .4 |
| Card riscontro | `--sup-2`, bordo hairline | bordo `--bordo-ui` + riga contesto rivelata | outline 2px ambra | `cursor:grabbing` | — |
| Quadrante | bordo hairline | bordo accento | — | — | — |
| Stadio pipeline | opacity .34 | — | — | acceso: bordo accento + `--sup-3` | — |
| Link testuale | `--t2` + underline `rgba(255,255,255,.24)` | `--ambra-alta` + underline wipe 320ms | outline 2px ambra | — | — |
| Input | `--sup-2`, bordo `--bordo-ui`, r2 | bordo `rgba(255,255,255,.5)` | bordo ambra + `box-shadow: 0 0 0 3px rgba(255,130,0,.18)` | — | `--sup-1`, testo `--t4` |
| Input errore | bordo `--errore` + glifo ✕ + testo `--errore` 13px | — | — | — | — |

**Focus ring globale:** `outline: 2px solid var(--ambra); outline-offset: 3px`. È l'unico colore della palette che soddisfa SC 1.4.11 senza sforzo (7,91:1 contro l'1,25–1,66 dei bordi bianchi). Il vantaggio matematico dell'ambra sta qui, e va sfruttato.

---

## 6. Conformità — cablata nei token, non nella code review
Due soglie in cima al file dei token e in un test automatico che fa fallire la build:
- **α ≥ 0,455** per qualunque `color` di testo corpo su `#0C0B0A`
- **α ≥ 0,340** per qualunque bordo che delimiti un elemento interattivo
Nessuno stato affidato al solo colore (WCAG 1.4.1): sempre colore + glifo + testo. `aria-label` sul parent degli elementi splittati (`SplitText { aria: 'auto' }`). Il focus da tastiera resta visibile e dentro il viewport durante l'intera scena pinnata — da verificare a mano, è il test che quasi tutti saltano. `prefers-reduced-motion` coperto al 100% (Sharpify: 5%).

---

## 7. Cosa NON facciamo, e perché
Gradienti arancio↔bianco (datano al 2016 e attraversano il pivot di contrasto: qualunque testo sopra fallisce da qualche parte). Superfici tinte d'arancio oltre α .10 (arancio@.18 su nero collassa a `#402915`, marrone — il verde nella stessa posizione dà un neutro scuro: è l'unica deviazione strutturale obbligata rispetto al sistema di Sharpify). Testo ambra sotto 15px o sotto peso 500 (canale B a zero → aberrazione cromatica longitudinale → alone che divora le aste). Arancio su `#000` puro per aree estese. Blob viola-blu, glassmorphism generico, cursore custom, scroll orizzontale forzato, smooth scroll globale, sequenze di immagini scrubbate, WebGL, countdown finti, `$`, CTA in inglese, "Elevate your business". Nessuna card con icona tonda. Nessun `text-shadow` decorativo. Nessuna pill.

---

## 8. Ordine di lavoro
1. **Riconciliazione dei numeri** e raccolta di 12–16 casi autorizzati (bloccante: senza questo la direzione non parte).
2. Token in `:root` + i due test di soglia + i 404 riparati (`/risorse/`, `/politica-di-qualita/` — servire un 404 sulla pagina Qualità mentre si rivendica una certificazione è autolesionismo).
3. Componenti statici: modulo, tasto, testa-sezione, registro, quadrante, footer. **Screenshot test: la pagina senza una riga di motion deve già essere il miglior sito della categoria in Italia.**
4. Motion L1–L3 (CSS scroll-driven + un solo IntersectionObserver che deriva il ritardo dall'indice).
5. I sei momenti-firma, in quest'ordine: Margine → compilazione hero → caretto → totale che quadra → registro filtrabile → pipeline.
6. Mobile-first su registro, pipeline e quadranti. Misure su Android di fascia media e iPhone SE con throttling 4G.
7. Passata di accessibilità: sola tastiera, VoiceOver, reduced-motion, `prefers-contrast`.
