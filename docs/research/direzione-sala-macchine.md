# Direzione: SALA MACCHINE

**Concept.** Ogni agenzia mostra al cliente la brochure del reparto vendita. Questa direzione fa l'opposto: apre la porta della sala macchine e lascia l'imprenditore davanti al quadro di controllo, con i quadranti accesi, le tracce che si disegnano, i passaggi di consegna misurati e le persone al loro posto. Il sito non è la pubblicità della macchina: è la macchina vista da dentro, su un fondo di carta millimetrata nera dove ogni numero porta la sua fonte e la sua data. La grammatica non è quella del registro contabile compilato a posteriori — è quella dello strumento di misura in esercizio adesso: quadranti, tracce, tick, SLA, dispersioni. E il mark non è un ornamento: gli 11 moduli a serpentina del logo SONO la pipeline dei 4 reparti, quindi il diagramma centrale del sito è il logo ingrandito.

**Perche calza.** Il DNA di SalesProcess non è l'arancione: è la contabilità come linguaggio (Fatturare, Fatturato, Cassa, Margine, Reparto). Questa direzione promuove quel linguaggio da copy a strumentazione — e risolve il problema numero uno del sito attuale, che vende "AUMENTARE IL FATTURATO" senza un solo numero verificabile in pagina. Rispetto il vincolo "come Sharpify, ma con il nostro DNA" rubando il livello e non la pelle: fondo unico per il 92% della pagina, giunzioni a filo (0px tra le fasce), opacità del bianco come sistema di gerarchia al posto di una palette, una sola formula di testa-sezione ripetuta 8 volte, un solo accento con budget d'area ≤3%, CTA pill, una sola fascia chiara di rottura. E correggo i tre difetti che ho misurato nel loro DOM: la scala di prossimità invertita del carousel (card centrale a scale 0.841 contro 1.06 ai bordi), i bordi UI a 1.19-1.51:1 sotto la soglia SC 1.4.11, e gli 8 count-up cablati nel tema e mai innescati. Non è un clone perché non ne condivide nemmeno un ingrediente: loro sono near-black FREDDO #161519 + verde menta + DM Sans su tutto + zero fotografia + superfici tinte d'accento + 11 raggi; questa è nero CALDO #0B0A09 (R>B, un fondo caldo smorza l'arancio invece di eccitarlo) + arancio come traccia strumentale + Red Hat Display con IBM Plex Mono confinato ai dati + fotografia proprietaria mano-su-nero + superfici rigorosamente neutre (arancio@0.18 su nero collassa a #402915, marrone) + tre raggi con il 2px come default. Sul "molto animato, forte e potente": sei momenti-firma, una scena pinnata, due elementi scrubbati — ma ogni movimento trasporta un dato, mai un effetto. È la forma di forza che un imprenditore di 52 anni con 3 M€ di fatturato legge come competenza industriale, non come agenzia che si mette in mostra. E il "wow" non è un blob shader: è che i numeri sono suoi, sono datati, e uno per uno gli dicono chi glieli ha fatti.

**Palette.** FONDI (un solo fondo, giunzioni a filo, zero gradienti di sezione)
#0B0A09 --fondo — base canonica su ~92% della pagina. Near-black CALDO (R11 > B9): scelta deliberatamente opposta al #161519 freddo di Sharpify, perché un fondo caldo sotto un accento caldo riduce il contrasto simultaneo e smorza l'alone dell'arancio. Bianco sopra = 19,8:1.
#060505 --fondo-incassato — solo dentro i quadranti e le celle dati: i blocchi dati sono INCASSATI (più scuri del piano), non elevati. È la firma tattile del quadro di controllo e sostituisce integralmente le ombre.
#000000 --fondo-foto — solo dietro gli inserti fotografici full-bleed (le foto del brand sono già su nero puro: si fondono senza cornice).
rgba(255,255,255,.035) --piano-1 → #1A1918 (1,07:1) — fascia di sezione, header di tabella.
rgba(255,255,255,.055) --piano-2 → #201F1E (1,13:1) — telaio del modulo strumento.
rgba(255,255,255,.085) --piano-3 → #262524 (1,20:1) — hover di modulo, riga attiva.
rgba(11,10,9,.90) --piano-fisso + backdrop-filter blur(18px) saturate(160%) — nav e barra di stato. UNICO backdrop-filter del sito.
#3B2413 --velo-caldo — superficie calda OPACA, non alpha. Fondo dei soli chip-delta. Arancio sopra = 5,82:1 (verificato). Mai scalare, mai usare alpha arancione al suo posto.
#F2EFE7 --crema — una sola fascia in tutta la pagina (160px, ~2% dell'altezza): rassegna stampa e certificazione. Testo sopra #17140F.

RETICOLO (la firma visiva: il piano è carta millimetrata, non vuoto)
rgba(255,255,255,.030) --reticolo-maggiore — linea ogni 64px.
rgba(255,255,255,.014) --reticolo-fine — linea ogni 8px.
rgba(255,130,0,.22) --reticolo-attivo — solo le 2 linee che passano per il quadrante in hover.

BORDI (3 step dichiarati per ruolo, non 6 per abitudine — su #0B0A09 la soglia legale è α ≥ .34)
rgba(255,255,255,.10) --filo → 1,25:1 — DECORATIVO. Mai unico confine di un elemento interattivo.
rgba(255,255,255,.18) --filo-forte → 1,66:1 — DECORATIVO: separatori di tabella, tick.
rgba(255,255,255,.34) --bordo-ui → 3,05:1 — OBBLIGATORIO su tutto ciò che è cliccabile o filtrabile (WCAG SC 1.4.11). Soglia cablata nel token, non affidata alla code review.
rgba(255,130,0,.40) --bordo-attivo — stadio acceso della pipeline, chip di filtro selezionato.

TESTO (4 step, non 18)
#FFFFFF --t1 → 19,8:1 — titoli, valori, numeroni.
rgba(255,255,255,.72) --t2 → #BBBAB9, 10,3:1 — deck e corpo.
rgba(255,255,255,.50) --t3 → #868584, 5,4:1 — TUTTE le label mono, i timestamp, le righe "FONTE:". Regola dura che corregge Sharpify: sotto 15px non si scende sotto .50, mai.
rgba(255,255,255,.38) --t4 → #686867, 3,53:1 — SOLO glifi ≥24px: gli indici di sezione a 88px, i numeri di stazione. Sotto .38 non esiste token.
#000000 --t-su-arancio — obbligatorio su ogni superficie arancione. Bianco su #FF8200 = 2,49:1, fallisce anche AA large. Nero su #FF8200 = 8,44:1.

ACCENTO (famiglia a 5 livelli per luminanza, esattamente come il verde di Sharpify non è un colore ma una famiglia)
#FF8200 --segnale — IL BRAND. 7,95:1 su fondo. Inchiostro di 1-3 parole per viewport, traccia dei grafici, fill del CTA, mark, focus ring, filo attivo.
#FF9A38 --segnale-alto — 9,30:1. SOLO hover di link testuali. Nota tecnica non negoziabile: #FF8200 ha headroom di gamut ZERO (B=0, R clippato a 255; già a L+0.02 esce da sRGB), quindi "arancio più brillante" non esiste. Questo token è già desaturato e vira al giallo: va dichiarato come eccezione, non usato come stato generico.
#E87300 --segnale-fill — 6,45:1. Stato :active dei fill. Il modello di interazione è invertito: l'hover non sale in luminanza, scende nel fill e sale nel glow.
#B85B00 --segnale-pivot — punto di pareggio (nero 4,53 / bianco 4,63). Sopra si scrive nero, sotto si scrive bianco, in mezzo non si scrive.
#8A4300 --segnale-cupo — 2,70:1, MAI testo. Assi dei grafici, tick spenti, tracce inattive.
#A34E00 --segnale-stampa — solo sulla fascia crema (arancio su crema = 2,16:1, fallisce; questo dà 5,01:1).
rgba(255,255,255,.90) --glow-nucleo + rgba(255,130,0,.28)/.50 --glow-alone — il glow ha nucleo BIANCO e alone arancione. Arancio@.30 diretto su nero dà #542E08 (fango); sopra un nucleo bianco@.55 dà #B28D66 (caldo, luminoso). Massimo 2 occorrenze per pagina: CTA hero e spia di esercizio.

SEMANTICI (hue lontane dal brand, perché l'accento arancione divora lo slot "warning")
#4ADE80 --ok → 11,3:1 — solo stati confermati, sempre con glifo.
#FFD84D --attenzione — giallo puro, non ambra, per non collidere col marchio.
#CC3366 --dispersione → il magenta accidentale del sito attuale, qui LEGITTIMATO con un mestiere preciso: è il colore della perdita. Compare solo nel contro-esempio "4 fornitori diversi", sulle percentuali di lead che si perdono nei passaggi. Un colore residuo diventa un argomento di vendita.
#7AA2FF --info → 7,90:1.

DATI: massimo 2 serie + 1 evidenza per grafico. Serie "dopo" #FFFFFF · serie "prima" rgba(255,255,255,.28) · evidenza/delta --segnale · griglia --segnale-cupo. Nessuno stato affidato al solo colore: sempre colore + glifo + testo.
BUDGET D'AREA: arancio ≤3% dei pixel di ogni viewport, massimo un elemento arancione dominante per schermata. VIETATI: gradienti arancio↔bianco, superfici tinte d'arancio oltre α .10, testo arancione sotto 15px o sotto peso 500, arancio su #000 puro per aree estese.

**Tipografia.** DUE FAMIGLIE, TRE VOCI. Entrambe su Google Fonts, entrambe self-hostate in WOFF2 subset latin+latin-ext (servono à è é ì ò ù), preload della sola variabile del display.

1) RED HAT DISPLAY — variabile (wght 400-900), asse usato solo a 400 / 500 / 700 / 800. È già il font dominante del brand (164 nodi nel DOM attuale): tenerlo è capitale di riconoscibilità, non pigrizia. È geometrico-industriale, regge il tracking negativo aggressivo ed è più caratterizzato del DM Sans di Sharpify (che è la scelta neutra per definizione e oggi la usano tutti). Fuori definitivamente: Nunito, Montserrat, Roboto, Roboto Slab.
2) IBM PLEX MONO — 400 / 500 / 600. È la voce della macchina: label di sistema, unità di misura, timestamp, SLA, ID scheda, celle di tabella, bollettino. Plex nasce per contesti tecnico-istituzionali (IBM), non "da coder": è la differenza tra strumentazione industriale e terminale crypto. Budget: ≤15% dei glifi della pagina, MAI per corpo di lettura, MAI oltre 3 righe consecutive.
3) Nessun terzo font. Il contrappunto serif di Sharpify (Editorial Old, 2 nodi) qui non serve: il contrappunto è già il salto sans↔mono, ed è più coerente con un quadro di controllo di quanto sarebbe un didone editoriale.

SCALA (clamp, con i plateau di tracking derivati dalla legge misurata su Sharpify)
d1-hero · RHD 800 · clamp(44px, 6.6vw, 104px) · lh .98 · ls -.042em
d2-sezione · RHD 800 · clamp(34px, 4.4vw, 68px) · lh 1.04 · ls -.038em
d3-statement · RHD 600 · clamp(28px, 3.4vw, 52px) · lh 1.16 · ls -.032em — la frase scrubbata
n1-quadrante · RHD 800 · clamp(56px, 9vw, 132px) · lh .86 · ls -.045em · tabular-nums — unità in span separato: IBM Plex Mono 600 a 0.26em del numero, allineata a baseline con flex align-items:baseline, colore --t3. È il "$50M" di Sharpify tradotto: "486 K€", "1,4 M€", "+18,4%". Mai il simbolo $.
n2-quadrante-piccolo · RHD 800 · 48px · lh .90 · ls -.040em — dentro il modulo 328×176.
t1-blocco · RHD 700 · clamp(24px, 2.4vw, 30px) · lh 1.20 · ls -.020em
t2-modulo · RHD 700 · 20px · lh 1.30 · ls -.014em
deck · RHD 400 · clamp(17px, 1.3vw, 19px) · lh 1.62 · ls -.010em · max-width 68ch
corpo · RHD 400 · 17px · lh 1.62 · ls -.005em · max-width 72ch
label-dato · PLEX MONO 500 · 13px · ls +.04em · UPPERCASE · --t3 — la label sotto ogni numero.
cella-dato · PLEX MONO 400 · 15px · ls 0 (ZERO: tracciare i numeri fa oscillare le colonne) · tabular-nums · --t2
micro-fonte · PLEX MONO 500 · 11px · ls +.10em · UPPERCASE · --t3 (5,4:1, legale a 11px) — "FONTE: CRM CLIENTE · AGG. 09.2026"
eyebrow · PLEX MONO 600 · 12px · ls +.12em · UPPERCASE · --t3, preceduta dal quadrato del mark (6px, --segnale) e dall'indice a due cifre: "■ 04 — I NUMERI"
indice-sezione · RHD 800 · 88px · ls -.04em · --t4 — il numerone decorativo in colonna 12, allineato alla testa. A 88px il 3,53:1 è legale.
bottone · RHD 700 · 16px · ls +.01em · lh 1

LEGGE DEL TRACKING (tre plateau con inversione di segno tra 15 e 17px — trasferibile a qualunque font)
≤12px UPPERCASE → +.12em · ≤12px minuscolo → +.08em · 13-14px → +.04em · 15-16px → +.02em · 17-24px → -.010em · ≥32px → plateau piatto a -.038/-.045em (in em NON cresce oltre: un solo token per tutta la fascia display, non una curva).
ECCEZIONE MONO: sul mono le cifre hanno ls 0; il + si applica solo alle label maiuscole.
NUMERI: font-variant-numeric: tabular-nums su ogni cifra del sito; font-feature-settings "zero" 1 sul mono dove disponibile. Formattazione sempre Intl.NumberFormat('it-IT'): migliaia con il punto (1.284), decimali con la virgola (18,4%), valuta in euro (486 K€ / 1,4 M€). Ogni contatore ha min-inline-size fisso pari alla larghezza del valore finale: CLS 0,00 per costruzione.

## Flusso sezioni

- 00 · BARRA DI ESERCIZIO (fixed, h 40px, --piano-fisso). Funzione: dichiarare che la macchina è accesa e datata, prima di qualunque promessa. Mono 12px. A sinistra: spia 7px --segnale con pulse 1,6s + «IN ESERCIZIO — Q4 2026: 9 SLOT, 4 ASSEGNATI». Al centro: «AGG. 09.09.2026». A destra: «SALES PROCESS DAY · MILANO · 22.10 · 30 POSTI →» + chiusura. Sotto 860px cade il centro, sotto 480px resta solo spia + slot. Nessun countdown, nessuna scarsità inventata: il numero degli slot è un fatto strutturale scritto nel CMS.
- 01 · NAV STICKY (fixed a top 40px, h 72px, trasparente → --piano-fisso con isteresi 48/12px). Funzione: dare al sito la struttura che oggi non ha (hamburger + un CTA su 4.363px di pagina). Mark 19,5×36 + wordmark. Quattro voci in Plex Mono 13px UPPERCASE +.04em — «METODO · RISULTATI · REPARTO · EVENTI» — quattro come i reparti. A destra: pill --segnale con testo NERO «CANDIDA LA TUA AZIENDA». I tre elementi a destra normalizzati a forza: height 40px, radius 999px, font 700 14px, line-height 1, padding-block 0.
- 02 · HERO — IL QUADRO (min-height calc(100svh - 112px), padding-top 96px). Funzione retorica: promettere e simultaneamente rendicontare, nella stessa schermata. Colonna sinistra (col 1-6): eyebrow «■ AZIENDE DA 1 A 5 M€ DI FATTURATO · NO START-UP» — il criterio di selezione arriva PRIMA del CTA selettivo, altrimenti è posa; H1 d1-hero su tre righe «Non promettiamo fatturato. Lo rendicontiamo.» con «rendicontiamo» in --segnale; deck 19px «Costruiamo da ZERO il tuo reparto vendita — pubblicità, marketing a risposta diretta, reclutamento, formazione — sotto lo stesso tetto. Tu guardi un numero solo: quanto fatturi. In 6 mesi o meno.»; CTA pill arancio «Candida la tua azienda» + sotto-label mono «4 slot liberi su 9 · risposta in 48 ore lavorative» + link secondario outline «Apri il quadro del metodo →». Colonna destra (col 7-12): IL QUADRO, 4 moduli strumento 328×176 in 2×2 con intestazione mono «QUADRO DI CONTROLLO — CLIENTE 07/12 · IMPIANTISTICA · 42 DIPENDENTI» e piede «FONTE: CRM DEL CLIENTE · PERIODO 03.2025–02.2026 · PUBBLICATO CON LIBERATORIA». I quattro quadranti: LEAD GENERATI / 30 GG «1.284» · APPUNTAMENTI FISSATI «212» · TRATTATIVE CHIUSE «47» · FATTURATO GENERATO «486» + unità «K€». Sotto il quadro, una traccia SVG 656×72 che si disegna.
- 03 · NASTRO DEL PAYOFF (h 56px, filo sopra e sotto, giunzione a filo con l'hero). Funzione: la firma del brand come strumento, non come decorazione. «FATTURARE ■ FATTURARE ■ FATTURARE ■» in RHD 800 32px ls -.02em --segnale su --fondo-incassato, translateX(0→-50%) in 42s linear, contenuto duplicato lato server con il clone aria-hidden. A destra, ancorato: controllo reale «❚❚ FERMA IL NASTRO» (bordo --bordo-ui, mono 12px) — WCAG 2.2.2 è livello A, non è opzionale. Pausa anche su hover e focus-within.
- 04 · I CONSUNTIVI (nastro afferrabile, padding-block 96px). Eyebrow «■ 01 — I CONSUNTIVI», H2 «Dodici aziende, dodici estratti di CRM.», deck «Nessun numero è nostro. Sono i loro, con la loro liberatoria e la loro data.» Track di 12 schede 300×400 (aspect 3/4, radius 2px, gap 16px, padding-block 40px) che scorre a 42px/s in delta-time, afferrabile, con inerzia al rilascio. Ogni scheda: header mono «SCHEDA 03 / 12» + «IMPIANTISTICA · BERGAMO»; numerone bianco «+180%»; label mono «APPUNTAMENTI / MESE»; riga bianca 20px «DA 1,4 A 3,1 M€ IN 11 MESI»; sparkline 268×40; piede micro-fonte «FONTE: CRM CLIENTE · AGG. 08.2026». All'hover, in 200ms, sale dal basso una seconda riga di contesto: «CANALE: META + TELEFONO · VENDITORI RECLUTATI: 4 · TEMPO MEDIO DI CHIUSURA: 21 GG». Sotto il nastro, mono: «12 schede su 150 clienti · le altre 138 non hanno liberatoria, non un risultato peggiore.»
- 05 · STATEMENT DI POSIZIONAMENTO (padding-block 160/128px, container 1040, l'UNICO blocco davvero vuoto della pagina). Funzione: il respiro che paga la densità, e l'unico punto dove il movimento porta significato. Eyebrow «■ 02 — CHI SIAMO». d3-statement scrubbato parola per parola: «Quattro reparti sotto lo stesso tetto. Un numero solo da guardare: il tuo fatturato.» — le ultime tre parole arrivano in --segnale.
- 06 · IL PERCORSO 4 IN 1 (l'UNICA scena pinnata, end +=260%). Funzione: spostare l'argomento dai 4 reparti ai 3 passaggi di consegna, che è la cosa che nessun competitor sta dicendo. Eyebrow «■ 03 — IL METODO 4 IN 1», H2 «Il fatturato non si perde nei reparti. Si perde nei passaggi tra i reparti.» Il diagramma è il mark ingrandito: 11 moduli su griglia 3×5 a serpentina ascendente, 4 stazioni-reparto + 3 stazioni-passaggio + 4 punti di misura. Stazioni: «REPARTO 01 PUBBLICITÀ» → «PASSAGGIO 1 — LEAD: 1.284, SLA 4 ORE, CRM CONDIVISO» → «REPARTO 02 MARKETING A RISPOSTA DIRETTA» → «PASSAGGIO 2 — LEAD EDUCATO: 302, SLA 24 ORE» → «REPARTO 03 RECLUTAMENTO» → «PASSAGGIO 3 — VENDITORE OPERATIVO: 4, 90 GG» → «REPARTO 04 FORMAZIONE» → uscita «TRATTATIVA CHIUSA: 47 · 61% DI CHIUSURA». Ogni stazione porta il nome della persona che la presidia. In alto a destra, un interruttore reale a due stati: «[ 1 REPARTO ] / [ 4 FORNITORI DIVERSI ]». Nel secondo stato lo stesso percorso mostra le perdite in --dispersione: «−38% AL PASSAGGIO 1 · NESSUN SLA · LEAD RAFFREDDATO 6 GG · NESSUNO RESPONSABILE DEL NUMERO FINALE».
- 07 · I NUMERI (padding-block 128px). Funzione: prova di scala, ma sempre con un nome proprio nella stessa schermata, perché l'imprenditore italiano davanti a un numero grande e anonimo pensa «gonfiato». Eyebrow «■ 04 — I NUMERI», H2 «Dal 2020, senza arrotondare.» Quattro moduli 328×176 in riga: «150 / IMPRENDITORI SEGUITI» · «33 / SETTORI DIVERSI» · «750 / PROCESSI DI VENDITA REALIZZATI» · «500+ / VENDITORI GESTITI». Sotto, un modulo largo 1360×176 diviso: a sinistra «34 / PERSONE, TUTTE INTERNE», a destra la foto dell'ufficio di Via Marco D'Agrate. Piede unico mono: «AGG. 09.2026 · FONTE: GESTIONALE INTERNO · I 33 SETTORI SONO ELENCATI QUI SOTTO». Segue l'elenco reale dei 33 settori in mono 13px a tre colonne: 33 nomi battono 2.300 clienti senza nomi.
- 08 · IL REPARTO (persone, padding-block 128px, inserto fotografico). Funzione: qui si fa l'OPPOSTO di Sharpify, che può essere un'entità senza volti perché vende software-like. Noi vendiamo persone che entrano in azienda. Eyebrow «■ 05 — IL REPARTO», H2 «Trentaquattro persone. Queste otto lavorano sulla tua azienda.» Otto moduli 328×328 (2 moduli in altezza): ritratto su nero, nome in RHD 700 20px, ruolo in mono 13px, e sopra il ritratto il tag arancione del reparto «REPARTO 03 · RECLUTAMENTO». Sotto, una riga fattuale: «Alberto Frisoni, fondatore · 750 processi di vendita realizzati · 2 libri · il podcast dal 2023». Alfio Bardolla compare qui e solo qui, una riga, fattuale: «Co-founder: Alfio Bardolla, gruppo quotato su Euronext Growth Milan.» Nessun patrimonio personale, nessuna posa da guru.
- 09 · COSA ENTRA, COSA ESCE (tabella reale, filtrabile, padding-block 128px). Funzione: rendere ispezionabile l'offerta invece di descriverla. Eyebrow «■ 06 — COSA ENTRA, COSA ESCE», H2 «Ogni reparto ha un input, un output, un tempo e un nome.» Tabella 1360 a 6 colonne (200/300/300/120/240/200): «REPARTO · COSA RICEVE · COSA CONSEGNA · SLA · STRUMENTO · CHI RISPONDE». Righe alte 56px, header 44px, separatori --filo-forte, zebra su --piano-1, prima colonna sticky. Sopra la tabella 5 chip di filtro reali (--bordo-ui, mono 13px): «TUTTI · PUBBLICITÀ · MARKETING · RECLUTAMENTO · FORMAZIONE» con contatore vivo «12 righe su 28».
- 10 · CHI ENTRA, CHI NO (padding-block 128px, due colonne 1/1 con una regola verticale --filo al centro). Funzione: rendere verificabile la selettività, che è l'unica cosa che giustifica «Candida la tua azienda». Eyebrow «■ 07 — CHI ENTRA, CHI NO», H2 «Non lavoriamo con tutti. Il filtro è scritto prima, non dopo.» Colonna A «ENTRI SE»: fatturi tra 1 e 5 milioni; hai già un prodotto che si vende, anche male; hai un margine che regge un reparto; sei disposto a leggere numeri ogni settimana. Colonna B «NON ENTRI SE» (glifi in --dispersione): fatturi meno di 1 milione; sei una start-up senza storico; cerchi lead da rivendere; vuoi che vendiamo noi al posto tuo. Piede mono: «Q4 2026: 31 CANDIDATURE RICEVUTE · 9 SLOT · 4 ASSEGNATI · AGG. 09.09.2026».
- 11 · BOLLETTINO (h 240px, --fondo-incassato, giunzione a filo). Funzione: la macchina che gira, per davvero. Sei righe mono 12px, moderate e datate, alimentate dal CMS: «09.09.2026 · 11:24 · CANDIDATURA RICEVUTA · ARREDO · 2,1 M€ · IN VALUTAZIONE» / «08.09.2026 · 16:02 · CANDIDATURA NON IDONEA · FATTURATO SOTTO SOGLIA» / «05.09.2026 · 09:41 · REPARTO CONSEGNATO · IMPIANTISTICA · 4 VENDITORI OPERATIVI». Non è un feed finto in tempo reale e non finge di esserlo: intestazione «BOLLETTINO — ULTIME 6 VALUTAZIONI · AGGIORNATO A MANO IL LUNEDÌ» e controllo di pausa. Se il cliente non può alimentarlo settimanalmente, questa fascia non si costruisce.
- 12 · FATTURARE FATTURARE FATTURARE (padding-block 128px). Funzione: promuovere il payoff da slogan a contenitore editoriale, perché è già un media brand vivo (Spotify, Apple, YouTube). Eyebrow «■ 08 — FATTURARE FATTURARE FATTURARE», H2 «Il podcast. I numeri detti da chi li ha fatti.» Tre card episodio 440×260 con numero di episodio in mono, titolo reale, durata, e il numero del caso citato. Al posto di «Blog» o «Risorse»: il nome del brand.
- 13 · FASCIA CREMA — RASSEGNA E CERTIFICAZIONI (#F2EFE7, h 160px, l'unica rottura di valore, ~2% della pagina). Funzione: in Italia l'esistenza legale documentata è un proof point competitivo che Sharpify non ha. Label mono 12px +.18em «RASSEGNA E CERTIFICAZIONI» in #6B675E, margin-bottom 56px. Loghi testate a 26px, grayscale, mask-image con stop al 7% e 93%, pausa su hover, e a destra il blocco «ISO 9001:2015 · CERTIFICATO N. [da cliente] · ENTE IMQ · SCADENZA 2027» con link al PDF. Accento --segnale-stampa.
- 14 · IL CAFFÈ (pre-footer, padding-block 128px, foto vera dell'ufficio a tutta larghezza). Funzione: chiudere spostando la conversione da un form a un luogo fisico — l'antidoto italiano al sospetto «agenzia che sta su Zoom». UNA VOLTA SOLA in tutto il sito (oggi è incollato identico su home, quiz, eventi e carriera). H2 «Via Marco D'Agrate 41, Milano. Il caffè lo facciamo noi.» CTA outline «Fissa il caffè» + mono «Lun-Ven 9:00-18:00 · rispondiamo entro 48 ore lavorative».
- 15 · FOOTER (--fondo, padding 72px 32px 0, 5 colonne 1.5fr 1fr 1fr 1.05fr 1fr, gap 36px, filo superiore). Funzione: controllo di esistenza. Titoli colonna mono 12px +.10em --t4, link 14px --t3 → #fff con underline wipe 320ms. Colonna contatti con ragione sociale completa, P.IVA, sede legale di Capiago Intimiano (CO), sede operativa di Milano, numero di certificato. Barra inferiore mono 13px con «Dati aggiornati al 09.09.2026 — un solo numero per concetto su sito, LinkedIn e podcast».

## Momenti firma

- 1. ACCENSIONE DEL QUADRO (hero, one-shot, 1.100ms totali). Il quadro dell'hero fa la sua accensione come uno strumento: (a) i fili dei 4 moduli si disegnano con clip-path inset(0 100% 0 0) → inset(0) in 380ms --ease-out, stagger 70ms in ordine di lettura; (b) le label mono salgono da dentro una maschera (wrapper overflow:clip, figlio translateY(100%) → 0, 420ms, stagger 70ms); (c) i 4 numeri contano in 900ms power2.out con Intl.NumberFormat('it-IT'), tabular-nums e min-inline-size fisso; (d) la traccia SVG sotto il quadro si disegna con pathLength="1" e stroke-dashoffset 1 → 0 in 900ms (nessuna misura JS della lunghezza); (e) alla fine si accende la spia --segnale con --glow-alone e parte il pulse 1,6s. VINCOLO LCP DURO: l'H1 e il deck NON partecipano, sono dipinti al parse con opacity 1. Nessuna animazione della prima schermata è gated dal bundle JS: l'accensione è CSS con animation-delay, il solo count-up è JS e non è l'elemento LCP.
- 2. IL LOGO È LA PIPELINE (scena pinnata, l'unico pin del sito, end +=260%, scrub 0.7, ease none). La ricostruzione SVG del mark mostra 11 moduli su griglia 3×5 disposti a serpentina ascendente: quel percorso viene ingrandito a diagramma di sezione (viewBox 3×5 unità, larghezza 1040px). Un pacchetto — il quadrato singolo del mark, 24px, --segnale — percorre la serpentina lungo un <path> con offset-path e offset-distance da 0% a 100% legato al progress dello scrub, e ogni modulo che tocca si accende (fill da --segnale-cupo a --segnale, border-color a --bordo-attivo, 200ms). A ognuna delle 4 stazioni-reparto la timeline si ferma su un fermo (gsap timeline con posizioni assolute) e il pannello laterale cambia contenuto in 260ms; alle 3 stazioni-passaggio il contatore CONVERTE unità sotto gli occhi: 1.284 lead → 302 lead educati → 4 venditori operativi → 47 trattative chiuse. L'interruttore «4 FORNITORI DIVERSI» rigioca lo stesso percorso con le dispersioni in --dispersione e i moduli dei passaggi spenti. Su mobile il pin non esiste: le 11 stazioni diventano 4 card in scroll-snap orizzontale nativo con la serpentina come indicatore di posizione, e il contro-esempio diventa una seconda colonna della stessa tabella.
- 3. LO STATEMENT CHE SI SCRIVE (l'unico elemento scrubbato oltre al pin, 3.000px più in basso). GSAP SplitText type:"words" (NON chars: l'italiano ha parole lunghe e glifi accentati, il char-by-char le spezza in modo illeggibile e gonfia il DOM da 12 a 58 nodi), aria:"auto", mask disattivata. ScrollTrigger start "top 78%", end "+=85%" (765px su viewport 900 = 64px di scroll per parola), scrub 0.6, ease none. Anima SOLO la proprietà color, da rgba(255,255,255,.12) a #FFFFFF, stagger 0.08, durata per parola 0.34s → fronte d'onda largo ~4 parole. Le ultime tre parole («il tuo fatturato») hanno una seconda passata a --segnale con lo stesso stagger: è il reveal bicolore che nel DOM di Sharpify esiste come codice morto con zero target (cercano .sin-tekst, che non esiste). Qui ha i suoi target ed è il momento in cui il sito dice chi è mentre lo scrive.
- 4. IL NASTRO DEI CONSUNTIVI AFFERRABILE (rAF scritto a mano, ~5KB, con i quattro difetti di Sharpify corretti). (a) Velocità in DELTA-TIME: pos -= 0.042 * dt (dt in ms) = 42px/s identici su 60, 120 e 144Hz — il loro pos -= 0.5 per frame raddoppia su un 120Hz. (b) Scala di prossimità CORRETTA: t = max(0, 1 - |cx - vpCx| / (vpW*0.45)); s = 0.92 + 0.10*t → la card centrale è la più grande (1.02) e le laterali le più piccole (0.92), con z-index 2 sopra t>0.65. Nel loro sito la formula è invertita (misurata dal vivo: 0.841 al centro contro 1.06 ai bordi): il momento più visto della pagina ha una valle dove doveva avere un picco. Alla stessa t si legano opacity 0.62→1 e il colore del testo della scheda; nessun blur, che su 12 card è il costo GPU più alto del sito. (c) INERZIA: speed += (target - speed) * 0.08 per frame, target 0 su hover e 0.042 fuori; al rilascio del drag, velocità dell'ultimo pointermove con decadimento 0.94/frame fino a rientrare nell'auto-scroll. (d) ZERO layout thrashing: offsetLeft/offsetWidth di tutte le card misurati UNA volta in una cache invalidata solo su resize debounced 80ms — non letti dopo aver scritto il transform della track come fanno loro, ogni frame. Drag con soglia 18px, axis-lock (se |dx| < |dy| vince lo scroll verticale), touchAction pan-y↔none, click-guard 320ms in capture phase.
- 5. LA TABELLA CHE FILTRA DAVVERO (la prova che non è un SaaS finto). I 5 chip di filtro sono controlli reali: al click, document.startViewTransition() riordina e filtra le righe del DOM, ogni <tr> ha view-transition-name derivato dall'id, e il contatore mono passa da «28 righe» a «12 righe su 28» con un count-up di 200ms. Fallback senza View Transitions: le righe uscenti fanno opacity 1→0 in 120ms e le entranti opacity+translateY(8px) in 200ms con stagger 24ms, massimo 12 righe animate (le altre appaiono). Nessun controllo decorativo in tutta la pagina: se un elemento sembra cliccabile, fa qualcosa; se non può farlo, è inquadrato come stampato — con didascalia mono «ESTRATTO», bordo --filo e nessun affordance.
- 6. LA SERPENTINA COME SISTEMA (a costo quasi zero, e nessun concorrente può copiarla perché è il loro logo). Il quadrato singolo del mark (7px, radius 1px) sostituisce il pallino in TUTTE le liste del sito. Gli 11 moduli in ordine di percorso sono il loader e l'elemento di transizione di pagina: view-transition-name: mark sul mark della nav, @view-transition { navigation: auto } cross-document, così il logo è l'unica cosa che non si ricarica tra home, /metodo, /reparto, /eventi (15 righe di CSS, zero SPA, zero router). Nelle teste di sezione, l'eyebrow è preceduta dal quadrato e i moduli 01-08 si accendono progressivamente scendendo nella pagina: il logo diventa la barra di progresso della lettura, legata a animation-timeline: scroll(root block) — compositor thread, zero JS.

## Motion

FILOSOFIA. Il movimento è texture, non collezione di effetti. Dal DOM di Sharpify ho misurato la decisione che regge tutto il loro sito: un override che normalizza a forza TUTTE le 26 entrate a una sola curva e una sola durata (.animated { animation-duration:.7s !important; animation-timing-function: cubic-bezier(.25,.46,.45,.94) !important }). Loro ci arrivano con un !important su tre sistemi di reveal paralleli (0,55s / 0,7s / 1,05s, 2 easing, 4 stagger diversi): assemblato, non progettato. Qui è un design system dichiarato, con un solo osservatore che deriva il ritardo dall'indice.

TOKEN (fonte unica di verità)
--dur-tick: 120ms — feedback tattile, cambio di bordo
--dur-fast: 200ms — micro-stato (color, background, border-color)
--dur-base: 420ms — cambi di stato di pannello, maschere brevi
--dur-reveal: 620ms — l'ingresso, unico per tutto il sito
--dur-count: 900ms — count-up e disegno delle tracce
--dur-boot: 1100ms — la sola sequenza di accensione dell'hero
--ease-out: cubic-bezier(.22, 1, .36, 1) — expo.out: OGNI entrata e OGNI micro-stato. Una curva.
--ease-io: cubic-bezier(.65, 0, .35, 1) — SOLO scambi di stato bidirezionali (filtro, interruttore 1-reparto/4-fornitori).
linear — SOLO scrub e loop. Su ogni tween scrubbato ease:"none": l'easing lo fa già lo scroll.
--travel: 24px — ampiezza di ingresso, un solo asse (Y+). Le varianti X e Y− non esistono nel CSS.
--travel-dato: 16px — ingresso dei blocchi mono, più corto perché più denso.
--stagger: 70ms — tra elementi fratelli, catena massima 490ms (7 elementi); oltre, la riga successiva riparte da 0.
--stagger-riga: 24ms — righe di tabella e di bollettino, massimo 12.
--lift-btn: 2px · --lift-modulo: 3px — ampiezza massima di hover in tutto il sito: 3px.
--payoff-speed: 42s · --nastro-speed: 42px/s · --pulse: 1600ms
--marquee-state: running

GERARCHIA A SEI LIVELLI (il budget di attenzione, non quello tecnico)
L0 — non si muove MAI: la tipografia display, i numeroni, il reticolo, gli eyebrow, i fili, i loghi, le foto. Zero scale, zero rotate, zero tilt, zero parallasse su contenuto di lettura. Sopra la piega girano 3 animazioni: la spia + l'accensione del quadro + il nastro del payoff.
L1 — micro-stato, 120-200ms: color, background, border-color. È la maggioranza netta delle transizioni del sito. Non produce movimento, produce risposta.
L2 — sollevamento tattile, 200ms: translateY(-2px) sui bottoni, -3px sui moduli, SEMPRE accoppiato a un cambio di bordo (--filo → --bordo-ui) o all'accensione delle 2 linee di reticolo che passano per il modulo. Gerarchia deliberata a due livelli: in nav e footer solo colore, in pagina colore + lift.
L3 — ingresso, 620ms, one-shot e IRREVERSIBILE: opacity 0→1 + translateY(var(--travel))→0. Un solo gesto, un solo asse, ripetuto in tutta la pagina. Sempre unobserve()/disconnect() dopo il primo scatto: risalendo non si ri-anima nulla, che è ciò che elimina la sensazione-giocattolo dei siti costruiti con AOS. Failsafe setTimeout(3000) che forza lo stato visibile se l'osservatore non scatta: il contenuto non può restare invisibile.
L3-bis — mask reveal, 620ms: il vocabolario adiacente che Sharpify non usa affatto. Testo dentro overflow:clip che sale da translateY(100%), e clip-path: inset(100% 0 0 0) → inset(0) sulle foto e sui fili dei moduli. Fa sembrare il contenuto STAMPATO invece che fatto apparire, e non aggiunge un solo effetto nuovo alla tavolozza percepita: resta un movimento verticale, un asse, una curva.
L4 — loop ambient, sempre in periferia e mai dentro un blocco di lettura: 3 in tutto il sito. Spia 1,6s (solo box-shadow spread, nessun transform), nastro del payoff 42s, nastro dei consuntivi 42px/s. Tutti e tre sospesi da IntersectionObserver quando fuori schermo, su hover, su focus-within, su visibilitychange, e disattivati in reduced-motion.
L5 — gli unici due elementi scrubbati, a 3.000px di distanza l'uno dall'altro: la scena pinnata del percorso (end +=260%, scrub 0.7) e lo statement parola-per-parola (end +=85%, scrub 0.6). Un evento speciale resta speciale perché non ha concorrenti.

REGOLE DI BUDGET (derivate dai numeri misurati, da scrivere nel contratto)
max 3 animazioni concorrenti per viewport · max 1 pin per pagina · max 2 elementi scrubbati · 1 easing di ingresso e 1 durata di ingresso per tutto il sito · 1 asse, ampiezza ≤24px in ingresso e ≤3px in hover · 0 animazioni di proprietà di layout (mai width, height, top, left, margin, padding) · 0 animazioni di blur o backdrop-filter · will-change aggiunto su onStart e RIMOSSO su onComplete/transitionend, mai permanente (nel loro DOM ci sono 40 will-change mai rimossi e 34 backdrop-filter attivi) · nessun getBoundingClientRect dentro un listener di pointermove/scroll: misure in cache, invalidate su resize e su ScrollTrigger.refresh() · gsap.quickTo, mai gsap.to dentro pointermove · document.fonts.ready.then(() => ScrollTrigger.refresh()) obbligatorio, altrimenti tutti gli start/end sono calcolati sui line-break del fallback · content-visibility: auto + contain-intrinsic-size su tutte le fasce tranne hero e scena pinnata · pinSpacing: true sempre.

ARCHITETTURA: 70% CSS NATIVO, 25% GSAP, 5% NIENTE
Il 70% dei movimenti (tutti i reveal L3, la barra di progresso del logo, le micro-parallassi) è CSS scroll-driven: animation-timeline: view(), animation-range: entry 12% cover 38%, con @supports not (animation-timeline: view()) che porta a stato finale visibile. Gira sul compositor thread: resta fluido anche col main thread occupato, cosa che nessuna libreria può replicare. Il 25% è GSAP 3.13 (core 23KB + ScrollTrigger 11KB + SplitText 7KB = 41KB gz, tutti i plugin oggi gratuiti) per le due sole scene scrubbate, i count-up e il nastro. Il 5% è WebGL: zero. Il glow dell'hero è un radial-gradient dipinto una volta più una grana SVG feTurbulence in data-URI al 3,5%, statica.

SMOOTH SCROLL: NO. Nessun Lenis, nessun ScrollSmoother. Il pubblico — imprenditori di PMI italiane, in gran parte su desktop Windows con la rotella — è il profilo peggiore possibile per lo scroll-hijack, e il riferimento scelto dal cliente non lo usa (nel loro DOM c'è scroll-behavior: auto e un solo ScrollTrigger). Lo smoothing si sposta dallo scroll all'animazione: scrub 0.6-0.7 sulle due scene, che è un lerp di 600-700ms tra scroll e animazione. Si ottiene circa il 70% della sensazione «costosa» a zero costo di usabilità, zero KB e zero latenza sull'input. scroll-behavior: smooth solo sugli anchor, disattivato in reduced-motion.

MOBILE (gsap.matchMedia, che crea e DISTRUGGE le scene ai breakpoint invece di lasciarle inerti in memoria)
<1024px: zero pin, zero scroll orizzontale forzato, zero magnetic, zero cursore custom, zero WebGL. La scena del percorso diventa 4 card in scroll-snap nativo (scroll-snap-type: x mandatory, scroll-snap-align: center, flex 0 0 82%, overscroll-behavior-x: contain). Il nastro dei consuntivi diventa overflow-x: auto nativo con snap. Le tracce SVG si disegnano una volta all'ingresso, non scrubbate. Durate × 0,8, --travel 16px, --payoff-speed 30s (tragitto più corto = velocità percepita costante). dpr limitato a 1,5.

PREFERS-REDUCED-MOTION: TOKEN, NON INTERRUTTORE
Vietato il classico * { animation: none !important }: rompe accordion e dropdown e fa scomparire per sempre ogni elemento con fill-mode: both che parte da opacity 0. Si ridefiniscono i token alla radice: --dur-tick 1ms, --dur-fast 100ms, --dur-base 140ms, --dur-reveal 180ms, --dur-boot 200ms, --travel 0px, --travel-dato 0px, --marquee-state paused. Il movimento va a zero, la dissolvenza sopravvive, ogni stato resta raggiungibile. Lato JS, due rami in gsap.matchMedia: senza pin, senza SplitText (che elimina anche il rischio a11y sugli screen reader), con gsap.set sulle parole a #fff, contatori al valore finale, nastro fermo con overflow-x: auto scrollabile a mano, spia senza pulse, e @view-transition { navigation: none }. Nel DOM di Sharpify la copertura reduced-motion è al 5% — due soli blocchi su marquee loghi e bolla WhatsApp, con scoperti lo scrub GSAP, le 36 entrate, il rAF del carousel e i due pulse. Qui è al 100%, ed è verificabile in 5 secondi da chiunque: DevTools → Rendering → Emulate prefers-reduced-motion.

CONFORMITÀ (argomento commerciale, non solo etica, con lo European Accessibility Act in vigore dal 28.06.2025)
SC 2.2.2 Pause Stop Hide, livello A: il nastro del payoff, il nastro dei consuntivi e il bollettino durano oltre 5s e hanno un controllo di pausa REALE, oltre alla pausa su hover e focus-within. SC 2.3.1 Three Flashes: la spia a 1,6s è lontanissima dalla soglia. SC 2.3.3: reduced-motion completo. SC 1.4.11: --bordo-ui a 3,05:1 su ogni controllo. SC 1.4.1: nessuno stato affidato al solo colore, sempre colore + glifo + testo. Ogni SVG di dato è aria-hidden con una tabella testuale adiacente (o un <figcaption> con i valori): la narrazione scrollata del percorso ha SEMPRE il suo equivalente statico in tabella, che è anche la versione che si stampa e quella che indicizza Google. Navigazione da sola tastiera: durante la scena pinnata il focus resta visibile e dentro il viewport.

TEST DECISIVO. Uno screenshot statico di ogni fascia deve funzionare come manifesto. Se la pagina senza motion è brutta, il motion sta coprendo una gerarchia debole — e questa direzione, che ha 8 teste-sezione identiche e un modulo strumento riusato 20 volte, è progettata per superare quel test a motion spento.

## Rischi

- DIPENDENZA TOTALE DAI DATI DEL CLIENTE, ed è un rischio bloccante, non gestibile in design. Questa direzione senza 8-12 schede consuntivo reali (settore, città, numero, finestra temporale, fonte, liberatoria firmata) e senza 5 aggregati riconciliati e datati non è una direzione: è una scenografia. E il sito attuale ha oggi la stessa frase di testimonianza ripetuta cinque volte sotto cinque nomi veri — cioè il cliente ha già dimostrato di poter consegnare vuoto al posto di dati. Mitigazione: la sezione consuntivi si costruisce sul numero di schede REALMENTE consegnate; con 6 schede si fanno 6 card e la riga «6 schede su 150 clienti, le altre non hanno liberatoria» diventa un punto di forza. Con 0 schede la direzione va scartata a favore di un'altra.
- IL RISCHIO SAAS FINTO NON È ELIMINATO, È SOLO PRESIDIATO. Quadranti, tracce, tabelle filtrabili e bollettino sono a un millimetro dal «sembra un software che non avete». Tengo il confine con cinque regole dure (ogni dato porta fonte e data; nessun controllo decorativo; ogni blocco dati adiacente a un volto con nome; i blocchi non replicabili sono inquadrati come ESTRATTO stampato; niente sidebar, niente finta app), ma basta un editor che aggiunge un grafico senza fonte, o un numero non datato, perché il frame si rompa — e quando si rompe si porta dietro la credibilità di tutti gli altri numeri della pagina. Serve una regola scritta nel CMS: nessun blocco dato si pubblica senza i campi fonte e data_aggiornamento, validati in build.
- È LA DIREZIONE PIÙ COSTOSA DA COSTRUIRE E DA MANTENERE DELLE QUATTRO. Una scena pinnata con 11 stazioni, 3 conversioni di unità e un contro-esempio a due stati richiede una versione mobile completamente diversa (scroll-snap), un equivalente statico in tabella per screen reader e reduced-motion, e un rAF scritto a mano per il nastro: sono tre implementazioni dello stesso contenuto. Stima onesta: 8-11 settimane su Astro, contro 6-8 di una direzione senza scena pinnata. E i numeri datati fanno invecchiare il sito a vista: un «AGG. 09.2026» ancora lì nel 2027 fa più danno di quanto il dato faccia bene. Serve un rituale trimestrale di aggiornamento e un documento unico di fonte dei numeri, altrimenti in sei mesi il sito nuovo ha lo stesso problema del vecchio.
- LA DENSITÀ PUÒ LEGGERSI COME FREDDEZZA CON UN IMPRENDITORE DI 55 ANNI. Mono, reticolo, SLA e tabelle sono il linguaggio della competenza per chi ha una mentalità industriale, e possono essere il linguaggio dell'esclusione per chi voleva vedere delle facce. Il correttivo è strutturale (la fascia REPARTO con gli otto volti arriva prima della tabella, il caffè chiude la pagina, il copy è in italiano piano) ma resta un rischio di prima impressione: c'è una probabilità concreta che il cliente guardi la prima comp e dica «sembra un software, dove sono le persone». Va portata in presentazione con la fascia volti e la foto dell'ufficio già dentro la prima comp, non promesse per la seconda.
- MONO + RETICOLO + ARANCIO CONFINA CON L'ESTETICA TERMINALE CRYPTO/AI, che è precisamente il cliché da evitare. Le uniche tre cose che tengono il progetto sul lato industriale-italiano sono la fotografia proprietaria (mano su nero con oggetto arancione), il nero caldo e il copy contabile. Se lo shooting non si fa e le foto restano i 30 ritratti a 300×300, la direzione scivola verso il cliché contro cui è stata costruita. La produzione fotografica (6 nuovi oggetti: cuffie, telefono, badge, calcolatrice, chiave, contratto + l'ufficio + 8 ritratti a risoluzione piena) è una dipendenza di pari rango con i dati.
- L'ARANCIO HA HEADROOM DI GAMUT ZERO E QUESTO VINCOLO SI DIMENTICA IN FASE DI ESTENSIONE. #FF8200 ha B=0 e R clippato a 255: già a L+0.02 esce da sRGB, quindi non esiste uno stato hover «più brillante» e ogni tentativo produce un arancio desaturato virato al giallo. Il modello di interazione va invertito (hover = più glow, fill più profondo, superficie sotto più chiara) e va insegnato: il primo designer che entra nel progetto senza saperlo inventerà #FFA040 per un hover, poi una superficie arancio@0.18 che su nero collassa a #402915 — marrone — e il sistema si sporca in tre schermate. Va scritto in cima al file dei token con i due numeri di soglia (α ≥ .455 per testo corpo, α ≥ .340 per confini UI su #0B0A09) e messo in un test automatico.
- IL RETICOLO È UN LIVELLO COMPOSITO A TUTTO SCHERMO E PERMANENTE. Costa poco se implementato come pseudo-elemento position:fixed dipinto una volta (mai background-attachment: fixed, che ridipinge a ogni scroll), ma su DPR non interi (1,5 · 2,75 dei mid-range Android) le linee da 1px producono moiré e disallineamento visibile. Serve una matrice di test dispositivi reali (1x, 1.5x, 2x, 2.75x) e probabilmente due varianti di opacità per fascia di DPR. È il tipo di dettaglio che non si vede in Figma e si vede in mano al cliente.
- DUE ELEMENTI SCRUBBATI CONTRO L'UNICO DI SHARPIFY. È una deviazione consapevole dal modello di parsimonia che ho misurato e che funziona (un solo ScrollTrigger, zero pin, su 8.242px di pagina). La giustifico con la distanza — 3.000px tra i due — e con il fatto che il pin è l'argomento e lo scrub è l'identità, ma è la scelta più attaccabile della direzione: se in review si dovesse tagliare qualcosa, si taglia il pin e la pipeline diventa una sequenza di 4 blocchi con reveal L3, non si taglia lo statement.

---

# SALA MACCHINE — specifica completa

Direzione per il restyling di salesprocess.it. Angolo: proof-first, energia da quadro di controllo industriale.
Tutte le misure sono in px su viewport di riferimento 1440×900. Tutti i rapporti di contrasto sono calcolati (formula WCAG 2.x su luminanza relativa sRGB, compositing alpha nello spazio 8-bit non lineare come fa il browser), non stimati.

---

## 0. LA REGOLA D'ORO

**Ogni pixel di dato porta la sua fonte e la sua data. Ogni blocco di dati sta accanto a una persona con un nome. Nessun controllo è decorativo.**

Sono tre frasi e sono l'intera differenza tra questa direzione e un SaaS finto. Vanno nel file dei token, nel CMS come campi obbligatori, e nella checklist di review. Se un blocco non può rispettarle, non si costruisce.

---

## 1. TOKEN

```css
:root{
  /* ═══ FONDI — un solo fondo per il 92% della pagina, giunzioni a filo ═══ */
  --fondo:            #0B0A09;   /* near-black CALDO: R11 > B9. Bianco sopra 19,8:1 */
  --fondo-incassato:  #060505;   /* i blocchi dati sono INCASSATI, non elevati */
  --fondo-foto:       #000000;   /* solo dietro le foto full-bleed */
  --piano-1: rgba(255,255,255,.035);  /* → #1A1918  1,07:1 */
  --piano-2: rgba(255,255,255,.055);  /* → #201F1E  1,13:1 */
  --piano-3: rgba(255,255,255,.085);  /* → #262524  1,20:1  hover */
  --piano-fisso: rgba(11,10,9,.90);   /* nav + barra: unico backdrop-filter */
  --velo-caldo:       #3B2413;   /* OPACO, non alpha. Arancio sopra = 5,82:1 */
  --crema:            #F2EFE7;   /* una sola fascia, 160px */
  --crema-ink:        #17140F;

  /* ═══ RETICOLO — la firma: il piano è carta millimetrata ═══ */
  --reticolo-maggiore: rgba(255,255,255,.030);  /* ogni 64px */
  --reticolo-fine:     rgba(255,255,255,.014);  /* ogni 8px  */
  --reticolo-attivo:   rgba(255,130,0,.22);

  /* ═══ BORDI — 3 step per ruolo. Su #0B0A09 la soglia legale è α ≥ .34 ═══ */
  --filo:        rgba(255,255,255,.10);  /* 1,25:1 DECORATIVO */
  --filo-forte:  rgba(255,255,255,.18);  /* 1,66:1 DECORATIVO */
  --bordo-ui:    rgba(255,255,255,.34);  /* 3,05:1 ✓ SC 1.4.11 — OBBLIGATORIO sugli interattivi */
  --bordo-attivo: rgba(255,130,0,.40);

  /* ═══ TESTO — 4 step, non 18 ═══ */
  --t1: #FFFFFF;                      /* 19,8:1 */
  --t2: rgba(255,255,255,.72);        /* 10,3:1 */
  --t3: rgba(255,255,255,.50);        /*  5,4:1 — TUTTE le label mono e i micro 11px */
  --t4: rgba(255,255,255,.38);        /*  3,53:1 — SOLO glifi ≥24px */
  --t-su-arancio: #000000;            /* obbligatorio: bianco su #FF8200 = 2,49:1 ✗ */

  /* ═══ ACCENTO — famiglia a 5 livelli per luminanza ═══ */
  --segnale:       #FF8200;  /* 7,95:1 su fondo · nero sopra 8,44:1 */
  --segnale-alto:  #FF9A38;  /* 9,30:1 — SOLO hover di link testuali */
  --segnale-fill:  #E87300;  /* 6,45:1 — :active dei fill */
  --segnale-pivot: #B85B00;  /* pareggio nero 4,53 / bianco 4,63 */
  --segnale-cupo:  #8A4300;  /* 2,70:1 MAI testo — assi, tick spenti */
  --segnale-stampa:#A34E00;  /* 5,01:1 solo sulla crema */

  /* ═══ GLOW — nucleo BIANCO, alone arancione. Max 2 per pagina ═══ */
  --glow: 0 0 10px rgba(255,255,255,.55),
          0 0 34px rgba(255,130,0,.28),
          0 0 70px rgba(255,130,0,.16);

  /* ═══ SEMANTICI — hue lontane dal brand ═══ */
  --ok: #4ADE80; --attenzione: #FFD84D; --dispersione: #CC3366; --info: #7AA2FF;

  /* ═══ TIPOGRAFIA ═══ */
  --f-display: 'Red Hat Display', system-ui, sans-serif;
  --f-mono:    'IBM Plex Mono', ui-monospace, monospace;
  --tr-display: -.042em; --tr-d2: -.038em; --tr-title: -.020em;
  --tr-body: -.010em; --tr-small: +.020em; --tr-meta: +.040em; --tr-eyebrow: +.120em;

  /* ═══ SPAZIO — scala unica, tutto multiplo del reticolo fine (8) ═══ */
  --s1:8px; --s2:16px; --s3:24px; --s4:32px; --s5:48px;
  --s6:64px; --s7:96px; --s8:128px; --s9:160px; --s10:192px;

  /* ═══ RAGGI — 3 visibili. Squadrato = strumento; tondo = software ═══ */
  --r-0: 0;        /* fili, fasce, celle di tabella */
  --r-tick: 2px;   /* IL DEFAULT: moduli, chip, schede, tabella */
  --r-foto: 6px;   /* solo ritratti e inserti fotografici */
  --r-pill: 999px; /* SOLO i CTA. Nessuna eccezione */

  /* ═══ MOTION ═══ */
  --dur-tick:120ms; --dur-fast:200ms; --dur-base:420ms;
  --dur-reveal:620ms; --dur-count:900ms; --dur-boot:1100ms;
  --ease-out: cubic-bezier(.22,1,.36,1);
  --ease-io:  cubic-bezier(.65,0,.35,1);
  --travel:24px; --travel-dato:16px;
  --stagger:70ms; --stagger-riga:24ms;
  --lift-btn:2px; --lift-modulo:3px;
  --payoff-speed:42s; --nastro-speed:42; /* px/s, delta-time */
  --pulse:1600ms; --marquee-state:running;

  /* ═══ MODULO E GRIGLIA ═══ */
  --mod-w:328px; --mod-h:176px; --mod-gap:16px;
  --gutter:24px; --margine:32px;
  --mark-u:6px; --mark-gap:1.5px;
}

@media (prefers-reduced-motion: reduce){
  :root{
    --dur-tick:1ms; --dur-fast:100ms; --dur-base:140ms;
    --dur-reveal:180ms; --dur-count:1ms; --dur-boot:200ms;
    --travel:0px; --travel-dato:0px; --marquee-state:paused;
  }
  html{ scroll-behavior:auto }
}
@media (prefers-contrast: more){
  :root{ --filo:rgba(255,255,255,.22); --filo-forte:rgba(255,255,255,.34);
         --t3:rgba(255,255,255,.62); --reticolo-maggiore:rgba(255,255,255,.05) }
}
```

**I due numeri da mettere in cima al file e in un test automatico.** Su `#0B0A09`: α ≥ **.455** perché un bianco trasparente sia testo corpo legale (4,5:1); α ≥ **.340** perché sia un confine UI legale (3:1). Sono le due soglie che nel DOM di Sharpify sono violate sistematicamente (bordi a 1,19–1,51:1, `color: rgba(255,255,255,.30)` usato 6 volte = 2,69:1). Non si prevengono in code review: si cablano nel token.

---

## 2. IL RETICOLO (implementazione)

```css
body{ background: var(--fondo) }

.reticolo{
  position:fixed; inset:0; z-index:0; pointer-events:none;
  background-image:
    linear-gradient(to right,  var(--reticolo-maggiore) 0 1px, transparent 1px 100%),
    linear-gradient(to bottom, var(--reticolo-maggiore) 0 1px, transparent 1px 100%),
    linear-gradient(to right,  var(--reticolo-fine)     0 1px, transparent 1px 100%),
    linear-gradient(to bottom, var(--reticolo-fine)     0 1px, transparent 1px 100%);
  background-size: 64px 64px, 64px 64px, 8px 8px, 8px 8px;
}
main{ position:relative; z-index:1 }
```

`position: fixed` su un layer dipinto **una volta** (non `background-attachment: fixed`, che ridipinge a ogni scroll ed è uno dei costi più alti del web). Il contenuto scorre sopra un piano immobile: è esattamente la sensazione di uno strumento fisso su cui passano i dati. In `@media (max-width:760px)` cade il reticolo fine e resta solo il maggiore a 32px.

Il reticolo regala il sistema di misura: **tutto è multiplo di 8**, i padding di sezione sono multipli di 64, e i moduli si allineano visibilmente alle linee maggiori. È il motivo per cui questa direzione non ha bisogno di ombre: la profondità è data dai blocchi *incassati* (`--fondo-incassato`, più scuri del piano) contro un reticolo che scompare sotto di essi.

---

## 3. GRIGLIA, CONTENITORI, RITMO VERTICALE

**Scala di contenitori** (si restringono al crescere della densità di lettura, come in Sharpify: 1440→1260→1200→1120):

| Larghezza | Padding | Uso |
|---|---|---|
| **1512** | 32 | barra di esercizio, nav |
| **1360** | 32 | sezioni piene, quadro, tabella, moduli (4 × 328 + 3 × 16 = 1360 esatti) |
| **1200** | 24 | griglie di card editoriali |
| **1040** | 24 | statement, diagramma del percorso, blocchi di lettura |
| **720** | — | misura di lettura massima assoluta (corpo, deck) |

**Griglia**: 12 colonne, gutter 24px per l'editoriale, **16px per i dati** (due gutter dichiarati, non di più). Le teste di sezione occupano le colonne 1-8; l'indice a due cifre (`04` in RHD 800 88px `--t4`) sta in colonna 12, allineato in alto alla eyebrow.

**Ritmo verticale**: **0px di margine tra le sezioni, su tutte e 16 le fasce.** Il ritmo esiste solo come padding interno. È la scoperta strutturale più importante fatta su Sharpify (gap misurato: 0px su tutte le 14 fasce) e produce l'effetto decisivo: 16 blocchi vengono letti come **un documento continuo**, non come una sequenza di moduli. Senza confini il cervello non conta le sezioni, e questa è la premessa di tutta la densità.

Padding di sezione: `128px` default · `160/192px` sulle due fasce di respiro (statement, caffè) · `64px` sulle fasce dense (bollettino, crema) · `96px` sull'hero-top.

**Formula di testa-sezione, ripetuta 8 volte identica** (la prevedibilità è ciò che si compra la densità):

```
■ 04 — I NUMERI                        ← eyebrow: quadrato mark 6px --segnale + indice + nome
        ↓ 20px
Dal 2020, senza arrotondare.           ← H2 d2-sezione, RHD 800, ls -.038em
        ↓ 24px
Ogni numero qui sotto ha una fonte…    ← deck opzionale, 19px, max 68ch
        ↓ 64px
[corpo]
```

**Allineamento: TUTTE le teste a sinistra. Nessuna eccezione.** È una correzione deliberata a Sharpify, che ne ha 6 centrate e 2 a sinistra: con 2 casi su 8 legge come incoerenza, non come sistema. Un quadro di controllo si legge da sinistra.

---

## 4. IL MODULO STRUMENTO 328×176 — l'atomo del sito

Un solo componente, riusato ~20 volte in tutta la pagina, in tre taglie: `328×176` (1×1), `328×328` (1×2, i ritratti), `1360×176` (4×1, il modulo largo).

```css
.modulo{
  inline-size:var(--mod-w); block-size:var(--mod-h);
  background:var(--fondo-incassato);
  border:1px solid var(--filo);
  border-radius:var(--r-tick);
  padding:20px 20px 16px;
  display:flex; flex-direction:column; justify-content:space-between;
  transition: border-color var(--dur-fast) var(--ease-out),
              background   var(--dur-fast) var(--ease-out),
              transform    var(--dur-fast) var(--ease-out);
}
.modulo:hover{                       /* solo se il modulo È interattivo */
  border-color:var(--bordo-ui);
  background:var(--piano-2);
  transform:translateY(calc(-1 * var(--lift-modulo)));
}
.modulo:hover .modulo__mira{ opacity:1 }   /* le 2 linee di reticolo si accendono */
```

Anatomia interna, dall'alto:
1. **`.modulo__label`** — mono 13px/500 +.04em UPPERCASE `--t3`, una riga, `text-overflow:ellipsis`. Es. `LEAD GENERATI / 30 GG`.
2. **`.modulo__valore`** — RHD 800 48px lh .90 ls -.040em `--t1` `tabular-nums`, con `.modulo__unita` in mono 600 14px `--t3` allineata a baseline (`display:flex; align-items:baseline; gap:6px`). Es. `486` + `K€`.
3. **`.modulo__delta`** — chip: `background:var(--velo-caldo)`, `color:var(--segnale)`, mono 600 15px, padding `4px 8px`, `--r-tick`, preceduto dal glifo `▲`. Arancio su velo = 5,82:1. **È l'unico posto della pagina dove testo arancione può stare a 15px**, perché sta su una superficie calda e non su nero.
4. **`.modulo__traccia`** — sparkline SVG `288×36`, stroke 1.5px `--segnale`, `vector-effect:non-scaling-stroke`, asse in `--segnale-cupo`, 12 punti. `aria-hidden="true"` + i valori in una `<table class="a11y-only">` adiacente.
5. **`.modulo__fonte`** — mono 11px/500 +.10em UPPERCASE `--t3`. Es. `FONTE: CRM CLIENTE · AGG. 08.2026`. **Campo obbligatorio: nessun modulo si pubblica senza.**

**Il numero è solo 48px** dentro il modulo (132px nei quadranti maggiori della fascia NUMERI). La monumentalità non viene dalla dimensione assoluta ma dal rapporto interno: 48:11 = **4,4:1** tra valore e riga di fonte. È il meccanismo di Sharpify (44:12 = 3,7:1) portato un gradino oltre.

**Breakpoint del modulo**: ≥1360 → 4 in riga · 1100-1359 → 3 · 760-1099 → 2 · <760 → 1 a larghezza piena, `block-size:auto`, `min-block-size:152px`. Gap sempre 16px.

---

## 5. CATALOGO COMPONENTI

### 5.1 Barra di esercizio — `.esercizio`
`position:fixed; top:0; height:40px; z-index:9500; background:var(--piano-fisso); backdrop-filter:blur(18px) saturate(160%); border-bottom:1px solid var(--filo)`. `body{padding-top:40px}`.
Interno: flex, gap 16px, padding `0 32px`, mono 12px/500 +.06em.
- `.spia` — 7px, `border-radius:50%`, `--segnale`, `animation: spia var(--pulse) ease infinite` su **solo `box-shadow`** (`0 0 0 0 rgba(255,130,0,.65)` → `0 0 0 7px rgba(255,130,0,0)`): zero transform, zero layout thrash.
- Testo `IN ESERCIZIO — Q4 2026: 9 SLOT, 4 ASSEGNATI` in `--t2`, `<strong>` in `--t1`.
- Centro `AGG. 09.09.2026` in `--t3`.
- Destra: link evento + pill `--segnale` h 26px con testo nero, e chiusura `×` a `--t3` → `--t1`.
Degradazione: `@860px` cade il centro, font 11px, gap 10px · `@480px` resta `● IN ESERCIZIO · 4/9 SLOT`.

### 5.2 Nav — `.nav`
`position:fixed; top:40px; height:72px; z-index:9000; background:transparent; border-bottom:1px solid transparent; transition: background .3s var(--ease-out), border-color .3s, backdrop-filter .3s`.
Stato scrollato con **isteresi a due soglie** (attiva a 48px, disattiva a 12px — il `scrollY > 30` con `classList.toggle` secco di Sharpify sfarfalla su trackpad e rubber-band iOS mentre il `backdrop-filter` transiziona per 300ms):

```js
let on=false; const f=()=>{const y=scrollY;
  if(!on&&y>48){on=true;nav.classList.add('is-fissa')}
  else if(on&&y<12){on=false;nav.classList.remove('is-fissa')}};
addEventListener('scroll',f,{passive:true}); f();
```

Sequenza: mark (19,5×36) + wordmark → `.nav__voci` (mono 13px UPPERCASE +.04em, padding `8px 14px`, `--r-tick`, hover `background:var(--piano-2); color:var(--t1)`, **nessun transform**) → `margin-left:auto` → pill CTA.
I tre elementi a destra sono normalizzati a forza: `height:40px; border-radius:var(--r-pill); font:700 14px/1 var(--f-display); padding-block:0`. È il singolo intervento che fa sembrare una nav progettata invece che assemblata.
`@1024px`: voci a `display:none`, appare `.burger` (44×44, `--bordo-ui`), nav h 56px, fondo **opaco di default**.

### 5.3 CTA — tre livelli, tutti pill
```css
.cta{ display:inline-flex; align-items:center; gap:10px;
  height:56px; padding:0 34px; border-radius:var(--r-pill); border:0;
  background:var(--segnale); color:var(--t-su-arancio);      /* NERO. 8,44:1 */
  font:700 16px/1 var(--f-display); letter-spacing:.01em;
  box-shadow:0 8px 24px rgba(255,130,0,.22);
  transition: background var(--dur-fast) var(--ease-out),
              transform  var(--dur-fast) var(--ease-out),
              box-shadow var(--dur-fast) var(--ease-out);
}
.cta:hover{ transform:translateY(calc(-1*var(--lift-btn)));
            box-shadow:0 12px 32px rgba(255,130,0,.34), var(--glow) }
.cta:active{ background:var(--segnale-fill); transform:none }
.cta:focus-visible{ outline:2px solid var(--segnale); outline-offset:3px }
```
**Il modello di interazione è invertito e va spiegato al team**: l'hover non schiarisce l'arancio (impossibile: gamut zero), aggiunge glow; l'active lo approfondisce. `--glow` compare qui e sulla spia: due occorrenze in tutta la pagina.
Secondario outline: `border:1px solid var(--bordo-ui)`, fondo trasparente, testo `--t1`, h 56px, hover `background:var(--piano-2); border-color:var(--t1)`.
Terziario testuale: `color:var(--t1)`, freccia `→` che esce di `translateX(4px)`, underline wipe 320ms (`background-size:100% 1px → 0 → 100%` che esce da un lato e rientra dall'altro — il dettaglio che si nota al secondo passaggio, non al primo).
**Sotto-label del CTA primario**: mono 12px `--t3`, `margin-top:12px` — `4 slot liberi su 9 · risposta in 48 ore lavorative`. Il CTA selettivo è legittimo solo se la selezione è visibile.

### 5.4 Scheda consuntivo — `.scheda`
`300×400` (`aspect-ratio:3/4`), `--r-tick`, `background:var(--fondo-incassato)`, `border:1px solid var(--filo)`, `overflow:clip`, padding `20px`, `cursor:grab`.
Struttura: header mono 11px in due righe (`SCHEDA 03 / 12` a sinistra, `IMPIANTISTICA · BERGAMO` a destra, separati da un `--filo` a 1px) → numerone RHD 800 64px `--t1` → label mono 13px `--t3` → riga bianca RHD 700 20px `DA 1,4 A 3,1 M€ IN 11 MESI` → sparkline 268×40 → piede fonte.
**Con foto** (se il cliente consegna gli scatti): `background-image` con scrim a 4 stop — `linear-gradient(180deg, rgba(0,0,0,.28) 0%, rgba(0,0,0,.38) 40%, rgba(0,0,0,.62) 75%, rgba(0,0,0,.76) 100%)`. Non un overlay piatto: 28% in alto perché la foto respiri, 76% in basso perché il testo sia garantito. Il gradiente fa il lavoro che di solito si affida al photo-editing. **Vietato** il `text-shadow: 0 0 8px rgba(255,255,255,.9)` che Sharpify mette sulle label: impasta le maiuscole e il chip ha già bordo e superficie che risolvono la leggibilità.
**Hover** (che a Sharpify manca completamente: le loro card sono trascinabili ma non interrogabili): `border-color:var(--bordo-ui)` e dal basso sale in 200ms una riga di contesto — `CANALE: META + TELEFONO · VENDITORI RECLUTATI: 4 · TEMPO MEDIO DI CHIUSURA: 21 GG`. Densità informativa in più, movimento in più zero.

### 5.5 Nastro (track) — `.nastro`
`overflow:clip`, `mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)` — i bordi svaniscono invece di essere tagliati: costa una riga. Track `display:flex; gap:16px; width:max-content; padding-block:40px`, contenuto duplicato lato server con il clone `aria-hidden="true"`, wrap su `scrollWidth/2`.
Loop rAF (specifiche complete nel momento-firma 4): delta-time 42px/s, scala di prossimità `s = 0.92 + 0.10*t` (corretta), opacity `0.62 + 0.38*t`, `z-index` 2 sopra `t>0.65`, inerzia lerp `0.08`, momentum `0.94`, cache delle misure invalidata su resize debounced 80ms, drag con soglia 18px + axis-lock + click-guard 320ms.
`@media (prefers-reduced-motion:reduce)` e `@media (max-width:1023px)`: rAF non parte, `overflow-x:auto; scroll-snap-type:x mandatory` e le schede a `scroll-snap-align:center; flex:0 0 82%`. L'informazione resta raggiungibile a mano — è la soluzione corretta, l'unica cosa che Sharpify fa bene in materia di accessibilità.

### 5.6 Tabella — `.tab`
`width:1360px`, `border-collapse:separate; border-spacing:0`, `--r-tick` sul wrapper con `overflow:clip`.
`thead th`: mono 12px/600 +.10em UPPERCASE `--t3`, h 44px, `background:var(--piano-1)`, `border-bottom:1px solid var(--filo-forte)`, `text-align:left` (le colonne numeriche `right`).
`tbody td`: mono 15px/400 ls **0** `tabular-nums` `--t2`, h 56px, padding `0 16px`, `border-bottom:1px solid var(--filo)`. Prima colonna `--t1` weight 500 e `position:sticky; left:0; background:var(--fondo-incassato)`.
`tbody tr:hover`: `background:var(--piano-2)` e la cella SLA passa a `--segnale`. 120ms.
Chip di filtro: `height:34px; padding:0 14px; border:1px solid var(--bordo-ui); border-radius:var(--r-pill); font: mono 600 13px +.04em`. Selezionato: `background:var(--velo-caldo); border-color:var(--bordo-attivo); color:var(--segnale)`. Sono `<button aria-pressed>`, gruppo in un `role="group"` con `aria-label="Filtra per reparto"`.
`@media (max-width:760px)`: la tabella si riorganizza in card `<dl>` (una per riga, label/valore in coppia). **Non** una tabella che scorre in orizzontale e non una tabella finta: se non entra, cambia forma.

### 5.7 Diagramma del percorso — `.percorso`
SVG `viewBox="0 0 30 50"` (le stesse unità della ricostruzione del mark), reso a 1040×1733 nella scena pinnata, 11 `<rect>` da 8,8 unità con `rx=".8"`.
Ordine di percorso (dal basso, ascendente, ricavato dalla geometria reale del logo): `c0r4 → c1r4 → c2r4 → c2r3 → c2r2 → c1r2 → c0r2 → c0r1 → c0r0 → c1r0 → c2r0`. È una **serpentina ascendente a 11 stazioni su griglia 3×5**: 4 reparti + 3 passaggi + 4 punti di misura.
Stati del modulo: spento `fill:var(--segnale-cupo); opacity:.35` → attivo `fill:var(--segnale); opacity:1` + `--bordo-attivo`. Il pacchetto è un `<rect>` 24px `--segnale` su `offset-path: path(...)` con `offset-distance` legato allo scrub.
Pannello laterale (col 9-12, `position:sticky` dentro il pin): titolo stazione RHD 700 30px, mono per SLA/strumento/responsabile, e il ritratto della persona che presidia la stazione, 96×96 `--r-foto`.
Interruttore a due stati: `role="radiogroup"`, due `<button>` in un contenitore `--bordo-ui`, transizione `--ease-io` 260ms. Nello stato «4 fornitori» i 3 moduli-passaggio si spengono, compaiono le percentuali in `--dispersione` e la traccia di uscita si assottiglia proporzionalmente (`stroke-width` da 6 a 2,2).
**Equivalente statico obbligatorio**: sotto il diagramma, una `<table>` con le 11 stazioni, gli input, gli output, gli SLA e i responsabili. È la versione per screen reader, per reduced-motion, per la stampa e per Google. Non è un ripiego: è il contenuto, e il diagramma ne è la visualizzazione.

### 5.8 Bollettino — `.bollettino`
`background:var(--fondo-incassato)`, `padding:40px 32px`, `border-block:1px solid var(--filo)`.
Header: mono 12px +.10em `BOLLETTINO — ULTIME 6 VALUTAZIONI · AGGIORNATO A MANO IL LUNEDÌ` + pulsante pausa.
Righe: mono 12px `--t3`, timestamp e settore in `--t2`, esito con glifo (`■` `--ok` / `✕` `--dispersione`) **più** testo. Ogni riga `border-bottom:1px solid var(--filo)`, h 36px. `aria-live="off"` (non è un contenuto urgente, non va annunciato).
Se non è alimentato settimanalmente dal CMS, **questa fascia non si costruisce**. Un bollettino con la data di tre mesi fa fa più danno dell'assenza del bollettino.

### 5.9 Marquee del payoff — `.payoff`
```css
.payoff{ height:56px; overflow:clip; background:var(--fondo-incassato);
         border-block:1px solid var(--filo); display:flex; align-items:center }
.payoff__track{ display:flex; width:max-content; gap:0;
  animation: scorri var(--payoff-speed) linear infinite;
  animation-play-state: var(--marquee-state); }
@keyframes scorri{ to{ transform:translate3d(-50%,0,0) } }
.payoff:hover .payoff__track,
.payoff:focus-within .payoff__track{ animation-play-state:paused }
.payoff__parola{ font:800 32px/1 var(--f-display); letter-spacing:-.02em;
                 color:var(--segnale); padding:0 28px }
.payoff__sep{ inline-size:8px; block-size:8px; background:var(--segnale); align-self:center }
```
Più il controllo reale (`.payoff__pausa`, mono 12px, `--bordo-ui`, `aria-pressed`) che scrive `--marquee-state` su `:root` e persiste la scelta in `localStorage`. **SC 2.2.2 è livello A**: la pausa non è una gentilezza.

### 5.10 Fascia crema — `.crema`
`background:var(--crema); color:var(--crema-ink); padding:32px 0 34px`. Label mono 12px +.18em `#6B675E`, `margin-bottom:56px`. Loghi h 26px, `filter:grayscale(100%)`, `opacity:.85`, `mix-blend-mode:multiply`, `mask-image` con stop 7%/93%, pausa su hover, `prefers-reduced-motion` → `overflow-x:auto`.
**Bilanciamento ottico per singolo logo**: ogni testata riceve la sua altezza (23-42px) perché l'altezza uguale non dà peso ottico uguale. Sono 6-8 override manuali e sono direzione artistica vera, non pignoleria.
**Da NON copiare da Sharpify**: `filter:invert(1) + mix-blend-mode:screen` sui loghi (funziona solo su loghi monocromatici scuri e distrugge qualsiasi logo a colori) e il muro di 25 tile bianche (939px, l'11% della pagina, che buca la disciplina scura e legge come una parete "as seen on" del 2016). Qui i loghi cliente stanno su tile scure con `--filo` e monocromia al 60% di bianco che va al 100% in hover: la stessa prova, dentro il sistema invece che contro.

### 5.11 Footer — `.piede`
`background:var(--fondo); padding:72px 32px 0; border-top:1px solid var(--filo)`. `.piede__top{ display:grid; grid-template-columns:1.5fr 1fr 1fr 1.05fr 1fr; gap:36px; padding-bottom:60px; border-bottom:1px solid var(--filo) }`.
Titoli colonna mono 12px/700 +.10em `--t4` mb 18px · link 14px `--t3` → `#fff` con underline wipe 320ms, gap 10px · social 36×36 `--r-tick` `--bordo-ui`.
Colonna contatti in mono: ragione sociale completa, P.IVA, sede legale Capiago Intimiano (CO), sede operativa Via Marco D'Agrate 41 Milano, numero di certificato ISO, `amministrazione@salesprocess.it`. **Per l'imprenditore italiano il footer con la P.IVA è un controllo di esistenza**, ed è un proof point che Sharpify non ha.
Barra inferiore: `padding:24px 0`, mono 13px `--t4`, con la riga di protocollo: `Dati aggiornati al 09.09.2026 — un solo numero per concetto su sito, LinkedIn e podcast`.

### 5.12 Stati (dove si gioca la credibilità perché nessuno ci guarda)
- **Form inviato**: `Candidatura ricevuta. La leggiamo noi, non un software. Rispondiamo entro 48 ore lavorative.`
- **Quiz / non idoneo**: `La tua azienda non rientra nei parametri di questo percorso. Non è un no per sempre: è un no per adesso. Ti mandiamo il podcast e ci riparliamo quando sei sopra il milione.`
- **Eventi senza date**: `Nessuna serata in programma. Le prossime date escono prima sulla newsletter che sul sito.`
- **Errore di campo**: glifo `✕` `--dispersione` + testo + `aria-describedby`. Mai il solo colore.
- **404**: `Questa pagina non c'è. Queste tre invece sì:` + i tre link più utili, in mono.
- **Slot esauriti**: `Q4 2026: 9 slot su 9 assegnati. Le candidature restano aperte per il Q1 2027.` Nessun countdown, nessun contatore javascript: la scarsità si dichiara come fatto strutturale, non come pressione temporale.

---

## 6. IL COPY (deck completo, italiano, pronto)

**Hero.** Eyebrow `■ AZIENDE DA 1 A 5 M€ DI FATTURATO · NO START-UP` · H1 `Non promettiamo fatturato. Lo rendicontiamo.` · Deck `Costruiamo da ZERO il tuo reparto vendita — pubblicità, marketing a risposta diretta, reclutamento, formazione — sotto lo stesso tetto. Tu guardi un numero solo: quanto fatturi. In 6 mesi o meno.` · CTA `Candida la tua azienda` + `4 slot liberi su 9 · risposta in 48 ore lavorative` · Secondario `Apri il quadro del metodo →`

**Teste di sezione** (le otto, in ordine): `■ 01 — I CONSUNTIVI` / `Dodici aziende, dodici estratti di CRM.` · `■ 02 — CHI SIAMO` / `Quattro reparti sotto lo stesso tetto. Un numero solo da guardare: il tuo fatturato.` · `■ 03 — IL METODO 4 IN 1` / `Il fatturato non si perde nei reparti. Si perde nei passaggi tra i reparti.` · `■ 04 — I NUMERI` / `Dal 2020, senza arrotondare.` · `■ 05 — IL REPARTO` / `Trentaquattro persone. Queste otto lavorano sulla tua azienda.` · `■ 06 — COSA ENTRA, COSA ESCE` / `Ogni reparto ha un input, un output, un tempo e un nome.` · `■ 07 — CHI ENTRA, CHI NO` / `Non lavoriamo con tutti. Il filtro è scritto prima, non dopo.` · `■ 08 — FATTURARE FATTURARE FATTURARE` / `Il podcast. I numeri detti da chi li ha fatti.`

**Righe di servizio** (il tono che fa la differenza): `12 schede su 150 clienti · le altre 138 non hanno liberatoria, non un risultato peggiore.` · `AGG. 09.2026 · FONTE: GESTIONALE INTERNO` · `FONTE: CRM DEL CLIENTE · PUBBLICATO CON LIBERATORIA` · `Q4 2026: 31 CANDIDATURE RICEVUTE · 9 SLOT · 4 ASSEGNATI` · `Via Marco D'Agrate 41, Milano. Il caffè lo facciamo noi.`

**Contro-esempio (4 fornitori)**: `Dispersione al passaggio 1: −38%` · `Nessun SLA tra chi genera il lead e chi lo chiama` · `Lead raffreddato: 6 giorni` · `Nessuno responsabile del numero finale`

**Lessico ammesso**: fatturato, cassa, margine, processo, reparto, rete vendita, venditori, candidatura, numeri, appuntamenti, trattative, conversione, delega. Verbi all'indicativo presente, prima plurale: reclutiamo, profiliamo, realizziamo, manteniamo, misuriamo, consegniamo.
**Vietato**: soluzioni innovative, sinergie, eccellenza, a 360 gradi, digital transformation, growth hacking, brand awareness, storytelling, funnel, boost, unlock, seamless, scalare il business, Book a demo, Get started, Learn more, il simbolo `$`, «crediamo che», «la nostra passione», «garantiamo il risultato», libertà finanziaria, mindset, rivoluzionario, segreto, trucco, hack.
**Maiuscolo enfatico**: razionato, non abolito. Massimo **una parola in caps per blocco di testo**, e solo dal lessico core (ZERO, FATTURATO, 4 IN 1). Il caps a raffica su mezza frase esce.
**Tu** sempre, ma tu *rispettoso*: si dà del tu a un pari, non a un ragazzo a cui si spiega la vita.

---

## 7. STACK, IMPLEMENTAZIONE, BUDGET

**Percorso raccomandato: Astro statico + GSAP 3.13 + Sanity (o Storyblok) con visual editing.** Tetto qualitativo 9,5/10, LCP mobile realistico 1,2-1,8s, JS al primo render 41KB gz (GSAP core 23 + ScrollTrigger 11 + SplitText 7), DOM 900-1400 nodi. Astro dà lo stesso tetto di Next a un terzo della complessità e senza i ~90KB gz di React/hydration prima di aver animato qualcosa. WordPress+Elementor ha un tetto reale di ~7/10 e un LCP mobile che raramente scende sotto 2,2-2,8s — ed è lo stack di Sharpify, che quindi *sembra* premium pagandolo in 2.069 nodi DOM, 17.057 regole CSS, jQuery legacy in parallelo a jQuery 3.6, tre build di FontAwesome, due di Bootstrap e nove librerie caricate con **zero elementi target** (aos, typed, tilt, isotope, masonry ×2, compare, clb-slider). Non è un'opinione estetica: è un vantaggio misurabile su LCP e INP.

**Contenuto tipizzato** (la build fallisce se manca un campo, invece di pubblicare una card rotta):
```
scheda_consuntivo { settore, provincia, valore, unità(enum), label, riga_contesto,
                    serie[12], fonte*, data_aggiornamento*, liberatoria(bool)* }
quadrante        { label, valore, unità(enum), delta?, fonte*, data_aggiornamento* }
stazione         { indice(1..11), tipo(reparto|passaggio|misura), nome, input, output,
                   sla, strumento, responsabile→persona, dispersione_4fornitori? }
persona          { nome, ruolo, reparto(enum 01..04), ritratto, interno(bool) }
riga_bollettino  { data*, ora, esito(enum), settore, fatturato_fascia, nota }
```
I campi con `*` sono obbligatori a schema. È il modo tecnico di far rispettare la regola d'oro anche quando il progetto passa di mano.

**Budget di performance, da scrivere nel contratto**: LCP < 1,8s · INP < 100ms · **CLS 0,00** (un sito animato non ha scuse: ogni shift è un bug) · TTFB < 200ms · TBT < 200ms · HTML 40KB gz · CSS critico inline ≤ 14KB (1 RTT) · CSS totale 60KB gz · JS primo render ≤ 100KB gz · font ≤ 120KB (Red Hat Display variabile subset + IBM Plex Mono 3 pesi subset) · immagine hero ≤ 180KB AVIF · **DOM < 1500 nodi**.
Misurazione sul campo, non in laboratorio: pacchetto `web-vitals` con `onLCP/onINP/onCLS` verso un endpoint. Lighthouse non cattura l'INP. Test obbligatori su un Android di fascia media e un iPhone SE con throttling 4G.

**LCP: la regola che nessuno rispetta.** La prima schermata non contiene animazioni gated da JavaScript. L'elemento LCP è **testo** (l'H1), non un'immagine e non un canvas. L'accensione del quadro è CSS con `animation-delay`, parte al parse e non tocca H1 né deck. Font in `<link rel=preload as=font crossorigin>` con `font-display:swap` e `size-adjust`/`ascent-override` sul fallback per azzerare lo shift. `document.fonts.ready.then(() => ScrollTrigger.refresh())` obbligatorio.

**Lazy-init per scena**: un `IntersectionObserver` con `rootMargin:"300px 0px"` che fa `import()` del chunk della scena e `unobserve`. Il codice del percorso 4-in-1 non esiste nel bundle iniziale. `document.addEventListener('visibilitychange')` → `gsap.globalTimeline.pause()`.

**View Transitions cross-document**: `@view-transition{navigation:auto}` + `view-transition-name:mark` sul mark. 15 righe, zero SPA, zero router, zero SEO fragile. Dove non è supportato la regola viene ignorata e la navigazione funziona normalmente.

---

## 8. LE CINQUE REGOLE ANTI-SAAS-FINTO (la parte che salva la direzione)

1. **Fonte e data su ogni dato.** Nessun blocco numerico esiste senza `FONTE:` e `AGG. MM.AAAA`. Un SaaS finto non data mai i suoi numeri; un rendiconto lo fa sempre. È anche la correzione al problema reale del brand: oggi convivono 150 vs +800 imprenditori, 20 vs 30 vs 34 persone, 6 mesi vs 9/12 mesi. Un numero per concetto, su tutte le proprietà digitali, con la data visibile.
2. **Nessun controllo decorativo.** I 5 chip filtrano davvero, l'interruttore cambia davvero il diagramma, il pulsante di pausa ferma davvero il nastro. Ciò che non può essere reale è inquadrato come **stampato**: didascalia mono `ESTRATTO`, bordo `--filo`, nessuna affordance. Zero finte sidebar, zero finte app, zero finti dropdown.
3. **Ogni blocco dati ha una faccia accanto.** I 4 reparti sono 4 persone con nome e ritratto. Le 11 stazioni hanno un responsabile. Gli aggregati (150/33/750) stanno nella stessa schermata di un nome proprio. Sharpify può essere un'entità senza volti perché vende software-like a service provider internazionali; noi vendiamo persone che entrano in azienda, e il compratore italiano di PMI compra dalla faccia.
4. **Le prove istituzionali stanno in pagina, non nel footer nascosto.** P.IVA, sede fisica, numero e scadenza del certificato ISO, rassegna stampa. È il proof point che il riferimento non ha e che in Italia pesa più di dieci testimonianze auto-pubblicate. Corollario: la pagina «Politica di qualità» oggi risponde 404 mentre il footer la linka — va riparata prima del restyling, perché è il punto esatto in cui il brand vuole essere credibile e si sabota.
5. **Il registro visuale è strumentazione industriale, non SaaS californiano.** Blocchi incassati e non elevati, raggio 2px, reticolo, tick, mono istituzionale, tabelle. I riferimenti culturali sono Olivetti, la segnaletica di Bob Noorda e un quadro elettrico, non un dashboard di Figma. Zero glassmorphism, zero blob sfocati, zero card tutte uguali con icona tonda, zero gradienti viola-blu, zero `border-radius:16px` con ombra morbida.

---

## 9. COSA NON FARE (lista chiusa)

Gradienti arancio↔bianco (il singolo elemento che datta il sito attuale al 2016 e un problema di accessibilità nello stesso gesto) · superfici tinte d'arancio oltre α .10 · testo arancione sotto 15px o sotto peso 500 · bianco su fondo arancione · arancio su `#000` puro per aree estese · `#CC3366` fuori dal suo unico mestiere · Nunito, Montserrat, Roboto, Roboto Slab · le parentesi quadre `[ SEZIONE ]` di Sharpify (firma loro, non nostra: da noi il glifo è il quadrato del mark) · scroll orizzontale forzato · cursore custom · scramble text · sequenze di immagini scrubbate · WebGL · Lenis e ScrollSmoother · countdown, «solo per oggi», ticker di iscrizioni, pop-up all'ingresso, prezzi barrati, «valore 240€ GRATIS» · foto stock di handshake e grafici che salgono · testimonianze con lo stesso testo ripetuto (oggi sono cinque, sotto cinque nomi di persone reali: è la cosa più autolesionista del sito attuale, e va rimossa prima e non dopo) · il blocco «caffè» duplicato su quattro pagine · la pagina /carriera/ in nav senza una sola posizione aperta · lo slug `/team-2/`.

---

## 10. DIPENDENZE BLOCCANTI DAL CLIENTE

Senza i punti 1-3 questa direzione non si costruisce. Vanno chiesti prima della prima comp, non dopo.

1. **8-12 schede consuntivo reali**: settore, provincia, valore, finestra temporale, cosa è stato fatto, canale, venditori reclutati, tempo medio di chiusura, fonte del dato, liberatoria firmata per nome/logo/numero. Per i cinque nomi già sul sito (Straniero, Mabiglia, Scuderi, Cianflone, Petrazzuolo): fatturato prima, fatturato dopo, in quanti mesi.
2. **Riconciliazione dei numeri con etichette distinte**: quanti sono i clienti paganti del 4 in 1, quanti i partecipanti agli eventi, quanti i lead. Più: retention/durata media del rapporto in mesi (è il numero che manca del tutto e che discrimina un'agenzia da un venditore di corsi: se è buono, va per primo), clienti attivi oggi, candidature ricevute vs accettate al trimestre, team interni vs collaboratori, elenco nominale dei 33 settori.
3. **I dati delle 11 stazioni**: chi passa cosa a chi, con quale SLA, con quale strumento, con quale responsabile — e le percentuali di dispersione del contro-esempio. È contenuto, non grafica, e va costruito insieme a loro in una sessione di due ore.
4. **Certificazione**: norma esatta (ISO 9001:2015?), ente (IMQ/CSQ?), numero, scopo, rilascio e scadenza. Più ragione sociale completa, P.IVA, forma societaria reale, anno di costituzione.
5. **Produzione fotografica**: 8 ritratti del team a risoluzione piena (i 300×300 attuali non bastano), l'ufficio di Via Marco D'Agrate con le persone al lavoro, e l'estensione della serie mano-su-nero-con-oggetto-arancione con 5-6 nuovi oggetti secondo la mappa un oggetto = un concetto (cuffie = podcast, telefono = appuntamento fissato, badge = reclutamento, calcolatrice = numeri, chiave = delega). Questa serie è il vero vantaggio visivo su Sharpify, che non ha fotografia propria e vive di un'estetica affittata da mille SaaS.
6. **Il file vettoriale originale del logo** (oggi esiste un solo PNG 293×68; in `src/_dev/mark.html` c'è una ricostruzione SVG funzionante a 11 moduli, ma per la produzione serve l'originale).
7. **Fonte del claim** «−50% rischio di fallimento / −80% esaurire la cassa»: lo studio citabile, oppure il claim esce. In una pagina costruita sulla verificabilità, un dato senza fonte contamina tutti i dati con fonte.
8. **Il rituale**: un documento unico di fonte dei numeri, aggiornato trimestralmente, con un responsabile nominato. Senza quello, in sei mesi il sito nuovo ha esattamente il problema del vecchio — con l'aggravante che qui le date sono scritte in pagina.

---

## 11. IL TEST FINALE

Screenshot statico, motion spento, reduced-motion attivo: ogni fascia deve funzionare come un manifesto e ogni numero deve essere leggibile con la sua fonte. Se la pagina ferma è bella, il movimento è un guadagno. Se è brutta, il movimento sta coprendo una gerarchia debole — ed è precisamente la diagnosi del sito attuale, dove 110 sezioni Elementor non diventano un buon sito aggiungendo GSAP.
