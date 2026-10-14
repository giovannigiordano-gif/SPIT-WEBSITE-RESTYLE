# Direzione: PIANO SEQUENZA

**Concept.** Il sito è un unico piano sequenza girato in un teatro di posa nero: nessun taglio, nessuna cucitura fra le sezioni (0px di gap, come Sharpify), un solo fondo, e la luce arancione che entra solo dove c'è qualcosa da guardare. Le sezioni non sono moduli: sono scene numerate di un film documentario sul fatturato, siglate come un ciak (mono, "SCENA 04 / 11 — IL METODO"), con i segni di taglio dell'inquadratura agli angoli e una grana di pellicola fissa al 3,5%. Il montaggio è lo scroll; l'unico stacco del film è la scena pinnata dei tre passaggi del 4 in 1, dove la macchina si ferma e l'oggetto arancione passa di mano in mano fino al contratto firmato.

**Perche calza.** Il DNA di SalesProcess è già cinematografico e nessuno l'ha usato: le foto proprietarie sono mani su fondo nero che reggono un oggetto arancione, cioè letteralmente inquadrature di una consegna. Il nero non è "dark mode": è il fondo nativo delle loro fotografie, quindi portandolo a fondo di sistema le foto smettono di essere ritagli incollati e diventano pagina — guadagno enorme a costo zero. L'arancio #FF8200 diventa la luce (segnale, ≤3% dei pixel, 7,91:1 su #0C0B0A, AAA come inchiostro) e mai più il riempimento dei gradienti arancio→bianco. Il mark a scalinata dà l'unico angolo del brand e il passo di offset che fa "salire" le griglie. Il payoff FATTURARE FATTURARE FATTURARE diventa il cartello finale del film, tre righe a scalinata che si accendono una per volta: non è decorazione, è il titolo. Del brief "Sharpify" prende il livello e il rigore — un fondo, gerarchia per opacità, bordi hairline, tracking negativo sul display e positivo sulle micro-caps, un solo accento, un solo elemento scrubbato, CTA sempre pill — e non la pelle: niente parentesi quadre, niente verde, niente DM Sans, niente muro di tile bianche. Il "molto animato, forte, potente, wow" arriva dalla regia (un pin, uno scrub, un nastro con profondità di campo, un cartello finale) e non dalla quantità: 6 momenti-firma su 9.200px, ognuno che porta un argomento di vendita. E soddisfa l'imprenditore italiano da 1-5 M€ perché il registro non è "startup smart" ma documentario: ciak, timecode, dato aggiornato al mese, nomi e cognomi, P.IVA, ISO, l'indirizzo di Via Marco D'Agrate.

**Palette.** FONDO E SUPERFICI (neutre, mai tinte d'arancio)
--nero-scena #0C0B0A — near-black caldo (R12>B10): un fondo caldo smorza l'arancio, uno freddo lo eccita. Copre il 93% della pagina.
--nero-pieno #000000 — solo dentro le foto full-bleed, mai come fondo di sezione (su OLED i bordi collassano).
--sup-1 rgba(255,255,255,.035) → #151413 (CR 1,07) fascia
--sup-2 rgba(255,255,255,.060) → #1B1A19 (CR 1,13) card
--sup-3 rgba(255,255,255,.090) → #222120 (CR 1,22) card:hover
--sup-nav rgba(12,11,10,.90) + backdrop-filter blur(18px) saturate(160%)
--carta #EAE6DE — l'unica banda chiara del film (≤2,4% della pagina), la "sala di proiezione"
--inchiostro #14120F — nero su carta (15,02:1)
--inchiostro-2 rgba(20,18,15,.60) → #6A6762 su carta (4,52:1, il gradino più basso ammesso lì)

BORDI (3, per ruolo)
--bordo-hairline rgba(255,255,255,.10) → 1,25:1 — DECORATIVO, mai unico confine
--bordo-forte rgba(255,255,255,.18) → 1,66:1 — DECORATIVO
--bordo-ui rgba(255,255,255,.34) → 3,04:1 — obbligatorio su tutto ciò che è interattivo (WCAG 1.4.11)

TESTO (4 gradini, non 18)
--t1 #FFFFFF 19,67:1 · --t2 rgba(255,255,255,.72) → #BBBBBA 10,24:1 · --t3 rgba(255,255,255,.50) → #868585 5,34:1 · --t4 rgba(255,255,255,.38) → #686867 3,53:1 SOLO ≥24px. Sotto 0,38 non esiste token.

ARANCIO (famiglia a 5 livelli, come il verde di Sharpify)
--arancio #FF8200 — IL BRAND. Inchiostro, hairline d'accento, focus ring, fill del CTA. 7,91:1 su fondo.
--arancio-caldo #FF9A38 — 9,30:1. Solo hover di link testuali, mai fill (è arancio desaturato: #FF8200 ha headroom di gamut ZERO, non esiste un arancio "più brillante").
--arancio-fondo #E87300 — 6,45:1. Hover dei fill: l'interazione va verso il basso, non verso l'alto.
--arancio-pivot #B85B00 — punto di pareggio nero/bianco: sopra testo nero, sotto testo bianco.
--arancio-profondo #8A4300 — 2,70:1 su nero (MAI testo lì), 5,85:1 sulla carta: è l'accento della banda chiara.
--velo-caldo #3B2413 — superficie calda dichiarata OPACA, non alpha.

GLOW (nucleo bianco + aureola arancione: è ciò che salva l'arancio dal fango)
--glow-core rgba(255,255,255,.90) · --glow-halo rgba(255,130,0,.28) · --glow-halo-forte rgba(255,130,0,.50)
--luce-chiave radial-gradient(ellipse 78% 46% at 50% 8%, rgba(255,130,0,.16) 0%, transparent 66%)

SEMANTICI (hue separate dal brand: l'accento arancione divora lo slot warning)
--ok #4ADE80 11,3:1 · --attenzione #FFD84D giallo puro, non ambra · --allarme #CC3366 (il magenta "accidentale" del DOM attuale, legittimato come hue di rottura: marca i 3 passaggi che si rompono) · --info #7AA2FF 7,9:1

LEGGI DURE, VERIFICATE
1. Ogni pill arancione porta testo #0C0B0A (7,91:1). Bianco su #FF8200 = 2,49:1: vietato.
2. Vietate le superfici tinte d'arancio oltre α .10: arancio@.18 su nero collassa a #382008, cioè MARRONE (chroma da .185 a .047). Le superfici restano neutre in white-alpha. Se serve calore si usa --velo-caldo opaco.
3. Vietato ogni gradiente arancio↔bianco. La profondità si fa con --luce-chiave e con 3 gradini di superficie.
4. Sulla banda carta l'arancio #FF8200 dà 2,00:1: lì l'accento è #8A4300, oppure arancio come fill con testo nero.
5. Mai arancio sotto 15px e sotto peso 500 (canale blu a 0 → alone cromatico che divora le aste).
6. Budget: ≤3% dei pixel per viewport, un solo oggetto arancione dominante per schermata, massimo due.

**Tipografia.** QUATTRO TAGLI, TRE RUOLI, UNA STORIA (cartello / voce narrante / ciak)

1. CARTELLO — Red Hat Display (variable, Google Fonts, asse wght 300-900). Resta il font del brand, promosso all'estremo: solo 800 e 900, solo display. Geometrico-industriale, regge il tracking negativo, dice "reparti e processi".
2. TESTO — Red Hat Text 400/500 (fratello di famiglia, Google Fonts). Neutro, migliore del taglio Display a 17px. Zero personalità: è il corpo del documentario.
3. VOCE NARRANTE — Instrument Serif *Italic* (Google Fonts), SOLO corsivo, SOLO 2 istanze per pagina: didascalie sotto le fotografie e la citazione cliente. È il contrappunto editoriale (l'equivalente dell'Editorial Old di Sharpify, che loro usano su 2 nodi).
4. CIAK — IBM Plex Mono 500 (Google Fonts), solo maiuscole, cifre e 6 segni: eyebrow, numeri di scena, timecode, SLA, unità di misura, label dei chip. È ciò che rende il registro documentario e non "startup".
Fuori: Nunito, Montserrat, Roboto, Roboto Slab.

BUDGET FONT REALE: Red Hat Display var latin subset ~34KB + Red Hat Text var latin ~30KB + Instrument Serif Italic subsettato ai soli glifi usati ~14KB + IBM Plex Mono subsettato a A-Z 0-9 .·:/–%€+ ~15KB = ~93KB WOFF2, dentro il budget di 120KB. font-display: swap; preload dei soli Display e Text; @font-face di fallback con size-adjust/ascent-override per CLS 0.

SCALA (clamp, con i tre plateau di tracking)
Cartello XL / H1: clamp(44px, 8.2vw, 116px) · 900 · lh .98 · tracking -.045em
Cartello L / H2 di scena: clamp(34px, 4.6vw, 64px) · 800 · lh 1.06 · -.040em
Cartello M / statement scrubbato: clamp(30px, 3.6vw, 52px) · 800 · lh 1.18 · -.035em
Numero: clamp(56px, 7vw, 96px) · 800 · lh .90 · -.040em · font-variant-numeric: tabular-nums
Unità del numero ($ € M % +): 34px · 800 · #FF8200 (span separato, subordinato alla cifra)
H3 card / stazione: 19px · 700 · lh 1.30 · -.012em
Deck: clamp(17px, 1.4vw, 20px) · 400 · lh 1.60 · -.010em · max-width 62ch
Corpo: 17px · 400 · lh 1.62 · -.010em · max-width 68ch
Corpo piccolo: 15px · 400 · lh 1.58 · +.020em
Meta: 13px · 500 · lh 1.45 · +.040em
CIAK / eyebrow: 11px · Plex Mono 500 · lh 1.20 · +.140em · uppercase · --t3
MICRO: 10px · Plex Mono 500 · +.120em · uppercase · --t4 (solo ≥24px vietato: qui si usa --t3)
VOCE NARRANTE: Instrument Serif Italic 26px/1.35 · tracking 0 · --t2 (didascalie 20px/1.4)

LA LEGGE DEL TRACKING (6 token, non una curva)
--tr-cartello -.045em (≥64px) · --tr-display -.040em (32-63px) · --tr-titolo -.020em (24-31px) · --tr-corpo -.010em (17-23px) · --tr-piccolo +.020em (15-16px) · --tr-meta +.040em (13-14px) · --tr-ciak +.140em (≤12px UPPERCASE)
Il plateau del display è PIATTO: un solo token su tutta la fascia, non una funzione continua. L'inversione di segno cade fra 15 e 17px. Il rapporto cartello:corpo è 116:15 = 7,7:1 — è quell'ampiezza a permettere che il 10px del ciak resti davvero 10px.

## Flusso sezioni

- SCENA 00 — BARRA CRITERIO (fissa, 40px, #0C0B0A, hairline bottom .10, Plex Mono 11px +.14em). Funzione: legittima il CTA selettivo prima di qualsiasi altra cosa (il criterio oggi è sepolto in una landing). Bullet = un quadrato 8px arancio del mark, statico, nessun pulse. Copy: «■ CANDIDATURE APERTE · FATTURATO 1–5 M€ · NO START-UP · 12 AZIENDE PER TRIMESTRE · RISPOSTA IN 48 ORE». Sotto 860px cade «12 AZIENDE PER TRIMESTRE», sotto 480px resta «FATTURATO 1–5 M€ · RISPOSTA IN 48 ORE».
- SCENA 00b — NAV STICKY (fixed top 40px, h 76px desktop / 60px mobile, trasparente → --sup-nav con isteresi 48/12px, transition 300ms). Mark a scalinata 34px + wordmark. Quattro voci come i quattro reparti: «Metodo · Risultati · Chi siamo · Eventi» (16px/500, padding 8px 16px, radius 8px, hover background rgba(255,255,255,.06)) + pill arancio «Candida la tua azienda» (h 40px, radius 999, 14px/700, testo #0C0B0A). Normalizzazione forzata dei bottoni a destra: h 40px, radius 999, 14px/700, line-height 1 — è l'intervento che fa sembrare la nav disegnata. Sotto 1024px: burger + la sola pill.
- SCENA 01 — INQUADRATURA D'APERTURA (1080px desktop). Funzione: promessa in una frase, con la controtesi. Frame 2.39:1 con i quattro segni di taglio hairline 14px, foto proprietaria (mano su nero con la penna arancione) a destra in mask reveal, --luce-chiave dietro il titolo. CIAK: «SCENA 01 · AGENZIA 4 IN 1 · DAL 2020 · MILANO». H1 (116px/900/-.045em, due righe in mask reveal): «Non ti vendiamo contatti. Ti consegniamo il reparto che FATTURA.» — «FATTURA» in #FF8200. Deck: «Pubblicità, marketing a risposta diretta, reclutamento e formazione della rete vendita: quattro reparti sotto lo stesso tetto, allineati sullo stesso numero. Il tuo.» CTA primario pill arancio «Candida la tua azienda» + sotto-label mono «Fatturato 1–5 M€ · no start-up · risposta in 48 ore»; secondario outline «Guarda come funziona il 4 in 1» (anchor alla scena 04). Didascalia in Instrument Serif Italic sotto la foto: «Il primo oggetto che consegniamo è un contratto firmato da qualcun altro.»
- SCENA 02 — I PROVINI (480px, dentro la piega: a 900px di viewport se ne vedono i primi ~260px, quindi lo scroll è innescato dalla curiosità). Funzione: la prova entra prima dell'offerta, e ha nomi. Nastro di card-risultato afferrabile con profondità di campo. CIAK: «■ I NUMERI DEI CLIENTI, NON LE PROMESSE». Card 300×400 (3/4), foto reale del cliente, scrim a 4 stop, due chip: «DA 1,4 A 3,1 M€ / 11 MESI» + «IMPIANTISTICA · 9 VENDITORI». Hover: il bordo va a rgba(255,255,255,.34) e in 200ms compare la terza riga «canale: outbound + fiere · fonte: CRM cliente». Bottone «PAUSA» in mono sotto il nastro (WCAG 2.2.2, livello A).
- SCENA 03 — LO STATEMENT (520px, il respiro più grande: padding-bottom 128px). Funzione: la tesi, letta piano perché è lo scroll a scriverla. Unico elemento scrubbato della pagina. Testo (52px/800/-.035em, centrato, max 18ch per riga): «Il marketing porta le persone. Il reparto vendita porta il fatturato. Noi costruiamo entrambi.» Le parole partono a rgba(255,255,255,.14) e arrivano a bianco pieno; «fatturato» ed «entrambi» atterrano su #FF8200.
- SCENA 04 — IL PASSAGGIO (scena pinnata, l'unico stacco del film, 900px di viewport + 240% di corsa). Funzione: vendere il meccanismo, non le icone. CIAK «SCENA 04 · IL METODO 4 IN 1». H2: «Quattro reparti. Tre passaggi. È nei passaggi che le aziende perdono il fatturato.» Due binari che convergono: in alto LA DOMANDA (REPARTO 01/04 PUBBLICITÀ → REPARTO 02/04 MARKETING A RISPOSTA DIRETTA), in basso LA SQUADRA (REPARTO 03/04 RECLUTAMENTO → REPARTO 04/04 FORMAZIONE RETE VENDITA); i due binari si incontrano su LA TRATTATIVA, dove appare la foto del contratto firmato. Sette stati: 4 stazioni + 3 passaggi, ognuno con la consegna dichiarata («consegna: contatto profilato · SLA 24 ore · strumento: CRM condiviso»). Ultimo stato, il contro-esempio: «Con quattro fornitori diversi i passaggi si rompono qui, qui e qui» e le tre giunzioni diventano #CC3366 tratteggiate. Skip-link «Salta la scena del metodo» come primo elemento focusabile della sezione.
- SCENA 05 — I NUMERI (620px). Funzione: prova di scala, con la data di aggiornamento accanto — meno seducente, infinitamente più credibile. CIAK «DAL 2020 · 33 SETTORI». Tre stat card a lente, disposte a scalinata (offset -12px e -24px, il passo del mark): «150 IMPRENDITORI SERVITI», «33 SETTORI DIFFERENTI», «750 PROCESSI DI VENDITA REALIZZATI». Numero bianco 96px tabular, unità arancio 34px, contesto 12px --t3: «dato aggiornato a settembre 2026 · fonte: registro clienti interno». Sotto, una riga con un nome proprio nella stessa schermata: «L'ultimo: Evergreen Life, impiantistica, ingresso a 1,4 M€.»
- SCENA 06 — I VOLTI (900px). Funzione: qui facciamo l'opposto di Sharpify, che è un'entità senza facce. Loro vendono software a service provider; noi vendiamo persone che entrano in azienda. H2: «Il reparto che ti consegniamo ha nomi e cognomi.» Deck: «34 persone, quattro reparti, un ufficio in Via Marco D'Agrate 41 a Milano.» Griglia di ritratti in bianco e nero su nero (un solo oggetto arancione per scatto), ogni persona taggata col numero del reparto: «REPARTO 03/04 · RECLUTAMENTO». Prima card, doppia larghezza: Alberto Frisoni — «750 processi di vendita realizzati, oltre 500 venditori gestiti, due libri, un podcast dal 2023.» Riga fattuale su Alfio Bardolla, co-founder, come prova di solidità societaria e non come icona: «Co-founder: gruppo quotato su Euronext Growth Milan, oltre 100 dipendenti.» Nessuna cifra di patrimonio personale.
- SCENA 07 — LA CARTA (220px, l'unica banda chiara del film: 2,4% della pagina, e arriva dopo 6.000px di nero, quindi colpisce come un flash). Funzione: la prova istituzionale, che in Italia pesa più di dieci testimonianze. Fondo #EAE6DE, inchiostro #14120F, accento #8A4300. Label mono «QUELLO CHE PUOI VERIFICARE PRIMA DI PARLARCI», margin-bottom 64px. Riga con: certificazione ISO 9001:2015 (ente, numero, scadenza), P.IVA e ragione sociale, i loghi stampa in monocromatico #14120F al 70% → 100% in hover, con mask-image ai bordi al 7% e 93%.
- SCENA 08 — INSERTO: SALES PROCESS DAY (760px, pieno campo, registro EVENTO). Funzione: l'unico posto dove il brand alza la voce, e lo può fare perché documenta qualcosa che è realmente accaduto. Fotografia dell'evento con gli sticker «FATTURARE», arancio dominante e saturo, caps compresso, densità volutamente affollata. Non si mescola col resto: entra e esce a filo, come un inserto di pellicola diversa. Copy: «1.100 imprenditori passati dalle nostre serate. 35 sold out negli ultimi 12 mesi. 30 sedie per volta.» CTA «Prendi uno dei 30 posti». Micro-label: «Se non ti è utile, ti rimborsiamo al desk, in sala, senza spiegazioni.»
- SCENA 09 — CARTELLO FINALE (700px). Funzione: il titolo del film arriva alla fine, come nei film che se lo possono permettere. Tre righe a scalinata (indent 0 / 5,5ch / 11ch, il passo del mark), 116px/900/-.045em: FATTURARE / FATTURARE / FATTURARE — la terza in #FF8200. Si accendono una per riga con il mask reveal. Sotto: «È il nome del nostro podcast e l'unica cosa che ci interessa misurare. 2023–oggi.» CTA terziario con underline wipe: «Ascolta l'ultimo episodio». Questa sezione è anche il contenitore editoriale del sito: la sezione risorse non si chiama Blog, si chiama Fatturare Fatturare Fatturare.
- SCENA 10 — IL CAFFÈ (520px, una volta sola in tutto il sito). Funzione: sposta la conversione da un form a un luogo fisico. Foto vera dell'ufficio, non stock. Copy: «Hai un'azienda fra 1 e 5 milioni e vuoi capire se ha senso. Vieni a prendere un caffè in Via Marco D'Agrate 41.» Form candidatura a 5 campi + micro-copy di sistema: «La leggiamo noi, non un software. Ti rispondiamo entro 48 ore lavorative.»
- FOOTER (480px, #0A0908). Quattro colonne come i quattro reparti + colonna brand: METODO / RISULTATI / AZIENDA / CONTATTI. Tre livelli di grigio come gerarchia pura (titolo colonna --t4 12px +.10em, link --t3, hover bianco). Riga legale con ragione sociale, P.IVA, sede legale di Capiago Intimiano (CO) e sede operativa di Milano: per l'imprenditore italiano il footer con la P.IVA è un controllo di esistenza. Un solo link colorato in tutto il footer.

## Momenti firma

- 1. L'APERTURA IN 940ms (il primo respiro che a Sharpify manca: da loro sopra la piega girano 3 animazioni e l'H1 è statico). Sequenza a 5 battute su una sola timeline CSS, che parte al parse e non attende JS (l'elemento LCP è testo e non deve mai dipendere dal bundle): 0ms i quattro segni di taglio si disegnano (scaleX/scaleY 0→1, transform-origin agli angoli, 240ms, --ease-scena); 120ms la riga ciak entra in mask reveal da translateY(100%); 220ms e 310ms le due righe dell'H1 salgono da translateY(112%) dentro wrapper con overflow:clip (760ms ciascuna, stagger 90ms) — il testo è già opaco, si muove la maschera; 520ms il deck rise+fade 26px/620ms; 640ms i due CTA, stagger 70ms; 700ms la foto della mano fa il suo mask reveal con clip-path inset(0 0 100% 0)→inset(0). Nessun elemento parte da opacity 0 gated da JavaScript. Totale 940ms, poi la pagina è ferma.
- 2. LO STATEMENT CHE LO SCROLL SCRIVE (l'unico elemento scrubbato dei 9.200px: un evento speciale resta speciale perché non ha concorrenti). SplitText su parole con aria:'auto', colore da rgba(255,255,255,.14) a #FFFFFF, stagger 0.1, durata per-parola 0.3, ease none, ScrollTrigger start 'top 78%' end '+=76%' scrub 0.55 — una corsa di ~684px su viewport 900, cioè ~45px di scroll per parola: il fronte d'onda è largo ~2,5 parole e legge come un evidenziatore. Seconda passata sulla stessa timeline a offset 0 che porta le due parole con classe .chiave («fatturato», «entrambi») a #FF8200 — è il reveal bicolore che Sharpify ha nel codice e non ha mai attivato perché il selettore .sin-tekst non esiste sulla loro pagina. Il testo è leggibile al 14% dall'inizio: l'animazione aggiunge enfasi, non informazione.
- 3. IL PASSAGGIO (la scena pinnata, il centro del film e il miglior argomento di vendita del brand). gsap.matchMedia('(min-width:1024px) and (prefers-reduced-motion:no-preference)'), timeline con 7 label su ScrollTrigger {trigger:'#passaggio', start:'top top', end:'+=240%', pin:true, pinSpacing:true, scrub:.65, anticipatePin:1, fastScrollEnd:true, invalidateOnRefresh:true}. Ogni stazione entra con la sua fotografia in clip-path reveal e il suo blocco dati; fra due stazioni l'oggetto arancione (un quadrato del mark che porta la foto dentro una maschera circolare 44px) percorre il binario con motionPath lungo una polyline SVG di 1px, mentre il tratto già percorso si colora da rgba(255,255,255,.18) a #FF8200 tramite stroke-dashoffset. A p=.86 i due binari convergono e appare LA TRATTATIVA con la foto del contratto firmato; a p=.94 scatta il contro-esempio: le tre giunzioni si spezzano (stroke #CC3366 dasharray 6 6, un solo passaggio di 320ms, nessuna ripetizione) con la riga «Quando i quattro reparti sono quattro fornitori, i passaggi si rompono qui, qui e qui». Vincolo di progetto: ogni singolo frame della scena deve funzionare come screenshot statico. Sotto 1024px il pin viene distrutto e la scena diventa 4 card sticky + 3 blocchi passaggio con animation-timeline: view(), zero JS.
- 4. IL NASTRO DEI PROVINI CON PROFONDITÀ DI CAMPO (qui battiamo Sharpify sul loro stesso terreno correggendo un bug misurato dal vivo: da loro la card centrale è scale(0.841) e quelle ai bordi 1.06, cioè il momento più visto del sito ha una valle dove doveva avere un picco). rAF a delta-time: pos -= 0.034 * dt (identico a 60, 120 e 144Hz, mentre il loro pos -= 0.5 per frame raddoppia la velocità su un 120Hz). t = max(0, 1 - |cx - vpCx| / (vpW*.45)); scale = 0.86 + 0.20*t; opacity = 0.52 + 0.48*t; filter = blur((1-t)*1.4px); zIndex = t>.6 ? 2 : 1 — scala, opacità e sfocatura sulla stessa t danno una vera profondità di campo. Velocità come variabile lerpata (speed += (target-speed)*0.08, target 0 in hover, 0.034 fuori) e momentum al rilascio del drag (velocità dell'ultimo pointermove, decadimento 0.94/frame): niente più stop e ripartenze a booleano secco. offsetLeft/offsetWidth letti UNA volta in cache e invalidati solo su resize debounced a 80ms, per eliminare il layout sincrono forzato che loro fanno 29 volte per frame. Drag con soglia 18px, axis-lock, setPointerCapture, click-guard 320ms. Bottone PAUSA reale, non solo hover.
- 5. IL CARTELLO FINALE FATTURARE × 3 (il payoff smette di essere una riga di testo arancione e diventa il titolo del film). Tre righe indentate col passo del mark (0 / 5,5ch / 11ch), ognuna in un wrapper overflow:clip; salgono da translateY(105%) in 720ms con --ease-scena e stagger 140ms, innescate una sola volta da animation-timeline: view() con animation-range 'entry 20% cover 45%' — quindi compositor thread, zero JS. La terza riga arriva a #FF8200 e porta il --e-glow (nucleo bianco 12px + aureola arancione 40/75px): è l'unico glow di testo di tutta la pagina. Le tre virgole del payoff restano, il punto esclamativo mai. Su reduced-motion le tre righe sono già a posto e resta solo un fade di 180ms.
- 6. LA LUCE CHE SEGUE IL CURSORE SUL CTA (un solo elemento in tutta la pagina, tradotto dal .glow-btn di Sharpify con il nucleo bianco che è ciò che impedisce all'arancio di diventare fango). Il bottone non si muove verso il cursore: resta fermo e si illumina dove sei. Due pseudo-elementi ancorati a --x/--y aggiornate su pointermove throttlato in rAF (mai una scrittura per evento): ::before inset -4px, mix-blend-mode screen, opacity 0→1 in 250ms, background = radial-gradient(88px 88px at var(--x) var(--y), rgba(255,255,255,.92) 0%, rgba(255,255,255,.32) 45%, transparent 70%) + radial-gradient(130px 130px at var(--x) var(--y), rgba(255,130,0,.50) 0%, transparent 75%); ::after inset -12px, filter blur(22px), radial-gradient(210px 210px, rgba(255,130,0,.28), transparent 80%). isolation:isolate sul bottone (obbligatorio, o il blend screen sfonda sul fondo pagina). Hover translateY(-2px), fill #FF8200 → #E87300 (verso il basso: non esiste un arancio più brillante). focus-visible: outline 2px solid #FF8200, offset 3px — l'arancio è l'unico colore della palette che soddisfa SC 1.4.11 senza sforzo, mentre i bordi bianchi arrivano a 1,66:1. Attivo solo con (hover:hover) and (pointer:fine).

## Motion

PRINCIPIO: il movimento è texture, non collezione di effetti. Un easing, due durate di reveal, un asse, ampiezze sotto la soglia di distrazione, un solo picco. Lo smoothing sta nell'animazione (scrub), non nello scroll: NIENTE Lenis, niente ScrollSmoother, scroll nativo — il pubblico (imprenditori PMI, desktop Windows, rotella) è il profilo peggiore per lo scroll-hijack, e il riferimento scelto dal cliente non lo usa.

TOKEN
:root{
  --dur-xs:120ms; --dur-s:200ms; --dur-m:420ms;
  --dur-reveal:620ms;   /* l'unica durata di ingresso di tutto il sito */
  --dur-maschera:760ms; /* mask reveal delle righe display */
  --dur-l:1100ms;       /* contatori */
  --ease-scena:cubic-bezier(.22,1,.36,1);   /* expo.out — entrate */
  --ease-taglio:cubic-bezier(.65,0,.35,1);  /* in-out — cambi di stato */
  --travel:26px; --stagger:70ms; --stagger-riga:90ms; --parallasse:1;
  --passo:12px;  /* il passo della scalinata del mark */
  --nastro:running;
}

GERARCHIA A SEI LIVELLI
L0 — non si muove mai: cartelli, numeri, ciak, griglia, hairline, i segni di taglio dopo l'apertura, la grana. È la spina dorsale.
L1 — micro-stato 180-200ms: color, background, border-color. Nessun movimento, solo risposta. È la maggioranza delle transizioni.
L2 — lift tattile 200-250ms: translateY(-2px) sui bottoni, -3px sulle card, sempre accoppiato a un cambio di bordo. Ampiezza massima 3px. Zero scale, zero tilt.
L3 — ingresso 620ms one-shot: rise+fade 26px su un solo asse (Y), oppure mask reveal 760ms per le righe display. Sempre irreversibile (unobserve/animation-fill-mode both): risalendo non si ri-anima nulla, così non c'è l'effetto flipbook. Failsafe temporale a 3000ms che forza lo stato finale.
L4 — ambient loop: SOLO il nastro dei provini (34px/s desktop, 26 mobile), in periferia, sospendibile, con bottone di pausa reale, spento in reduced-motion. Nessun dot pulsante, nessun anello rotante: il quadrato del mark è statico.
L5 — l'unico scrubbato: lo statement (684px, 15 parole). Più l'unico pin: la scena del passaggio.

ARCHITETTURA: 70% CSS nativo scroll-driven (animation-timeline: view(), compositor thread, zero JS, con @supports not(animation-timeline: view()){ .reveal{opacity:1; translate:none} } come fallback obbligatorio); 20% GSAP su 3 scene (1 pin + 1 scrub + il rAF del nastro + la luce del CTA: gsap core 23KB + ScrollTrigger 11KB + SplitText 7KB = 41KB gz); 0% WebGL — la grana è un PNG feTurbulence renderizzato una volta in data-URI a opacity .035, la luce chiave è un radial-gradient dipinto una volta.

REGOLE DI BUDGET
max 3 animazioni concorrenti per viewport · 1 pin per pagina · 1 elemento scrubbato per pagina · 1 easing e 2 durate di reveal per tutto il sito · 1 asse, ampiezza ≤32px in ingresso, ≤3px in hover · 0 animazioni di proprietà di layout (mai width/height/top/left/margin) · will-change aggiunto su onStart e RIMOSSO su onComplete/transitionend (mai i 40 will-change permanenti di Sharpify) · contain: layout paint sulle scene indipendenti e content-visibility:auto + contain-intrinsic-size sotto la piega, ESCLUSA la scena pinnata · ogni scena è un chunk caricato da IntersectionObserver con rootMargin 300px · document.fonts.ready.then(()=>ScrollTrigger.refresh()) e invalidateOnRefresh:true su ogni trigger con valori funzione · gsap.globalTimeline.pause() su visibilitychange.

MOBILE (gsap.matchMedia, che crea e DISTRUGGE le scene invece di lasciarle inerti)
Zero pin, zero scroll orizzontale, zero luce sul cursore, zero WebGL. Il passaggio diventa 4 card sticky + 3 blocchi in view(). Durate × 0,8, --travel 20px, nastro a 26px/s. Il frame 2.39:1 dell'hero diventa 4:5 (a 375px un 2.39 sarebbe alto 157px e il cinema svanisce): il ritaglio cambia, l'inquadratura resta.

REDUCED-MOTION: token, non interruttore
@media (prefers-reduced-motion: reduce){
  :root{ --dur-xs:1ms; --dur-s:100ms; --dur-m:140ms; --dur-reveal:180ms; --dur-maschera:180ms; --dur-l:1ms;
         --travel:0px; --parallasse:0; --nastro:paused; }
}
Il travel va a zero, la dissolvenza sopravvive, ogni stato resta raggiungibile. MAI `*{animation:none!important}`: rompe gli accordion e fa scomparire per sempre tutto ciò che ha animation-fill-mode:both partendo da opacity 0. In JS: mm.add('(prefers-reduced-motion: reduce)', ...) → non si registra il pin, non si splitta il testo (elimina anche il rischio a11y sugli screen reader), gsap.set(words,{color:'#fff'}), il rAF del nastro non parte e il contenitore diventa overflow-x:auto scorribile a mano, i contatori mostrano subito il valore finale, @view-transition{navigation:none}. Sharpify copre il reduced-motion al 5% (due soli blocchi, su 36 entrate, uno scrub, un rAF e quattro loop): questa è una differenza verificabile in cinque secondi da chiunque, ed è un argomento commerciale con l'European Accessibility Act in vigore.

CONFORMITÀ: SC 2.2.2 Pause/Stop/Hide (livello A) sul nastro → pausa su hover, su focus-within e bottone PAUSA persistente. SC 2.3.1 → nessun lampeggio. SC 2.3.3 → reduced-motion su tutto. Timecode in aria-hidden con un'etichetta di scena accessibile separata. Focus sempre visibile e SEMPRE dentro il viewport durante la scena pinnata, con skip-link dedicato.

TRANSIZIONI DI PAGINA: View Transitions cross-document, 15 righe. @view-transition{navigation:auto}; ::view-transition-old(root) 220ms cubic-bezier(.4,0,1,1); ::view-transition-new(root) 320ms cubic-bezier(0,0,.2,1); view-transition-name:marchio sul mark a scalinata, che così vola da una pagina all'altra. Nome unico per documento, o la transizione viene abortita in silenzio.

## Rischi

- LA SCENA PINNATA È UNA SCOMMESSA SUI DATI CHE IL CLIENTE NON HA ANCORA. Il momento centrale del film vive di tre passaggi dichiarati (cosa passa, con quale SLA, con quale strumento) e di quattro fotografie nuove. Senza quei dati la scena diventa quattro icone animate, cioè esattamente ciò che critichiamo nel sito attuale, e avremmo speso il 35% del budget di motion per una decorazione. Va bloccato in un workshop di due ore con Frisoni prima di scrivere una riga di GSAP.
- IL REGISTRO CINEMATOGRAFICO PUÒ LEGGERE «ARTISTICO» A UN IMPRENDITORE DI 55 ANNI. Ciak, timecode, segni di taglio e grana sono un vocabolario da studio creativo; il pubblico compra concretezza contabile. La mitigazione è nel contenuto — ogni scena porta un numero, un nome proprio o un meccanismo, e il ciak è documentario (SLA, date, fonti) e non poetico — ma resta il rischio numero uno. Test di verifica: cinque interviste da dieci minuti con imprenditori del target sul prototipo della sola hero.
- DIPENDENZA FOTOGRAFICA TOTALE. La direzione non ha un piano B se non arrivano: 6 nuovi scatti mano-su-nero (cuffie/podcast, telefono/appuntamento, badge/reclutamento, calcolatrice/numeri, chiave/delega, contratto firmato), la foto vera dell'ufficio di Via Marco D'Agrate e i ritratti clienti ri-scattati (gli attuali sono 300×300px, inservibili). Senza materiale, il nero resta nero e vuoto: è il rischio strutturale di ogni direzione che nasce dalla fotografia invece che dall'illustrazione.
- QUATTRO TAGLI TIPOGRAFICI E DUE LIVELLI DI TEXTURE SONO UN SISTEMA FRAGILE. Instrument Serif Italic oltre due istanze per pagina vira in «moda/matrimonio»; la grana sopra il 5% diventa sporco; i segni di taglio su ogni card diventano un pattern e perdono senso. Va scritto un limite d'uso duro nel design system e va negato al cliente il controllo su font, colori, motion e ordine delle sezioni: se glieli diamo, in tre mesi il sito è di nuovo generico e sarà colpa nostra.
- LA PAGINA È LUNGA: ~9.200px con 2.160px di corsa dentro il pin. Se la scena pinnata non è comprensibile subito, l'utente si sente sequestrato invece che affascinato. Limiti già imposti (end +=240%, un solo pin, nessun pin consecutivo, skip-link) ma la verifica è empirica: se nei test di scroll-depth il 40% abbandona dentro il pin, la scena va accorciata a +=160% e portata a cinque stati invece di sette.
- L'ARANCIO NON HA HEADROOM DI GAMUT E QUESTO SI SCONTRA CON L'ASPETTATIVA «MOLTO ANIMATO E POTENTE». #FF8200 è già il tetto: ogni stato «più acceso» desatura e vira al giallo, quindi tutta l'interazione va verso il basso (fill #E87300) o verso il glow. Il team di sviluppo lo dimenticherà almeno una volta e produrrà un hover #FFA040 che sembra un altro brand. Serve un test automatico sui token, non una code review.
- LA BANDA CARTA E L'INSERTO EVENTO SONO DUE ROTTURE DI SISTEMA NELLA STESSA PAGINA. Sharpify se ne concede una (il 2% crema). Noi ne facciamo due (carta + registro graffiti): se la seconda non è chiaramente «un'altra pellicola» — a filo, pieno campo, con il suo trattamento tipografico — il film perde unità e legge come un sito assemblato. Se in fase di revisione dobbiamo tagliarne una, si taglia l'inserto evento e lo si sposta sulla pagina Eventi.
- IL PIN E LO SCRUB SONO GLI UNICI DUE PUNTI DOVE UNA REGRESSIONE È INVISIBILE IN CI. Un aggiornamento di font, una riga di copy più lunga o un'immagine senza aspect-ratio spostano start/end e la scena si disallinea senza errori in console. Mitigazione obbligatoria: document.fonts.ready + refresh, invalidateOnRefresh, vincoli di lunghezza sul copy nel CMS (H1 max 60 caratteri, claim di stazione max 80) e uno snapshot visivo automatico su cinque valori di progress della scena pinnata.

---

# PIANO SEQUENZA — specifica completa

## 0. La regola che genera tutto

Il sito è un piano sequenza: **un solo fondo, nessun taglio**. Da qui derivano, per necessità e non per gusto, cinque decisioni:

1. **Gap inter-sezione = 0px su tutte le 12 scene.** Il ritmo verticale esiste solo come padding interno. Dodici fasce vengono lette come un documento continuo, non come una sequenza di moduli: è la premessa di tutta la densità.
2. **La gerarchia è fatta con l'opacità del bianco, non con una palette.** Quattro gradini di testo, tre di superficie, tre di bordo. L'arancio non partecipa alla gerarchia: partecipa alla luce.
3. **Il movimento è periferico, il contenuto è fermo.** L'occhio legge numeri e claim su superfici immobili.
4. **Un solo picco.** Un pin e uno scrub in 9.200px. Il resto della pagina "non si muove tanto" proprio per pagare quei due momenti: è un budget di attenzione, non un budget tecnico.
5. **Ogni frame deve funzionare come screenshot statico.** Se una scena è bella solo in movimento, il motion sta coprendo una gerarchia debole.

---

## 1. Colore — token e contrasti calcolati

Tutti i rapporti sotto sono **calcolati** (formula WCAG 2.x su luminanza relativa sRGB, compositing alpha in spazio 8-bit non lineare come fa il browser), non stimati.

```css
:root{
  /* fondo e superfici — neutre, mai tinte d'arancio */
  --nero-scena:#0C0B0A;              /* 93% della pagina, near-black CALDO (R12>B10) */
  --nero-pieno:#000000;              /* solo dentro le fotografie full-bleed */
  --sup-1:rgba(255,255,255,.035);    /* #151413  CR 1,07  fascia   */
  --sup-2:rgba(255,255,255,.060);    /* #1B1A19  CR 1,13  card     */
  --sup-3:rgba(255,255,255,.090);    /* #222120  CR 1,22  hover    */
  --sup-nav:rgba(12,11,10,.90);
  --carta:#EAE6DE;                   /* unica banda chiara, ≤2,4% della pagina */
  --inchiostro:#14120F;              /* su carta 15,02:1 */
  --inchiostro-2:rgba(20,18,15,.60); /* #6A6762 su carta 4,52:1 — gradino minimo */

  /* bordi — tre, per ruolo */
  --bordo-hairline:rgba(255,255,255,.10);  /* 1,25:1 DECORATIVO */
  --bordo-forte:rgba(255,255,255,.18);     /* 1,66:1 DECORATIVO */
  --bordo-ui:rgba(255,255,255,.34);        /* 3,04:1 ✓ SC 1.4.11 — obbligatorio sull'interattivo */

  /* testo — quattro gradini */
  --t1:#FFFFFF;                      /* 19,67:1 */
  --t2:rgba(255,255,255,.72);        /* #BBBBBA 10,24:1 */
  --t3:rgba(255,255,255,.50);        /* #868585  5,34:1 */
  --t4:rgba(255,255,255,.38);        /* #686867  3,53:1 — SOLO ≥24px */
  --t-su-arancio:#0C0B0A;            /* obbligatorio su ogni fill arancione */

  /* arancio — famiglia a cinque livelli */
  --arancio:#FF8200;                 /* 7,91:1 su fondo · 7,91:1 col nero sopra */
  --arancio-caldo:#FF9A38;           /* 9,30:1 — solo hover di link testuali */
  --arancio-fondo:#E87300;           /* 6,45:1 — hover dei fill */
  --arancio-pivot:#B85B00;           /* pareggio nero/bianco */
  --arancio-profondo:#8A4300;        /* 2,70:1 su nero (mai testo) · 5,85:1 su carta */
  --velo-caldo:#3B2413;              /* superficie calda OPACA, non alpha */

  /* luce */
  --glow-core:rgba(255,255,255,.90);
  --glow-halo:rgba(255,130,0,.28);
  --glow-halo-forte:rgba(255,130,0,.50);
  --e-1:0 1px 14px rgba(0,0,0,.30);
  --e-2:0 12px 32px rgba(0,0,0,.44);
  --e-3:0 24px 80px rgba(0,0,0,.56);
  --e-glow:0 0 12px var(--glow-core), 0 0 40px var(--glow-halo), 0 0 75px var(--glow-halo);
  --luce-chiave:radial-gradient(ellipse 78% 46% at 50% 8%, rgba(255,130,0,.16) 0%, transparent 66%);

  /* semantici — hue separate dal brand */
  --ok:#4ADE80; --attenzione:#FFD84D; --allarme:#CC3366; --info:#7AA2FF;

  /* raggi — quattro, non undici */
  --r-ciak:2px; --r-card:12px; --r-pannello:20px; --r-pill:999px;
}
```

### Le sette leggi dell'arancio (verificate, non opinioni)

| # | Legge | Numero che la impone |
|---|---|---|
| 1 | Ogni pill arancione porta testo `#0C0B0A` | bianco su `#FF8200` = **2,49:1**, fallisce anche AA large |
| 2 | Nessuna superficie tinta d'arancio oltre α .10 | arancio@.18 su fondo → **`#382008`**, marrone (chroma .185→.047) |
| 3 | Nessun gradiente arancio↔bianco | attraversa il pivot di contrasto: qualunque testo sopra fallisce da qualche parte |
| 4 | Sulla carta l'accento è `#8A4300` | `#FF8200` su `#EAE6DE` = **2,00:1** |
| 5 | Nessun arancio sotto 15px né sotto peso 500 | canale B = 0 → aberrazione cromatica, alone sulle aste |
| 6 | L'arancio non è mai un colore di stato | è il brand, non un semaforo. Warning al giallo puro, danger al magenta |
| 7 | ≤3% dei pixel per viewport, un oggetto arancione dominante per schermata | è la parsimonia che legge premium, non il colore |

**Soglie da cablare nel test automatico dei token, non nella code review:** su `#0C0B0A` serve α ≥ **.455** perché un bianco trasparente sia testo AA, e α ≥ **.340** perché un bordo sia un confine UI legale. Sono i due numeri in cima al file dei token.

**Compensazione di luminanza.** L'arancio pesa Y = 0,372 contro Y = 0,538 del verde di Sharpify: −31% di luce. Nel loro sistema l'accento *illumina*; nel nostro *scalda*. Quindi: i numeri delle statistiche restano **bianco puro** (19,67:1) e l'arancio prende solo l'unità e il glow sottostante. Il bianco fa il lavoro di luminanza, l'arancio quello cromatico. È anche il motivo per cui ogni glow ha un **nucleo bianco**: arancio@.30 diretto sul fondo dà `#552F07` (marrone); arancio@.30 sopra un nucleo bianco@.55 resta caldo e luminoso.

---

## 2. Tipografia

Quattro tagli, tre ruoli, una storia: **cartello** (Red Hat Display 800/900), **testo** (Red Hat Text 400/500), **voce narrante** (Instrument Serif Italic, max 2 istanze/pagina), **ciak** (IBM Plex Mono 500, solo caps/cifre).

```css
:root{
  --f-cartello:'Red Hat Display', system-ui, sans-serif;
  --f-testo:'Red Hat Text', system-ui, sans-serif;
  --f-voce:'Instrument Serif', Georgia, serif;   /* solo italic */
  --f-ciak:'IBM Plex Mono', ui-monospace, monospace;

  --tr-cartello:-.045em; --tr-display:-.040em; --tr-titolo:-.020em;
  --tr-corpo:-.010em;    --tr-piccolo:+.020em; --tr-meta:+.040em; --tr-ciak:+.140em;
}
h1{font:900 clamp(44px,8.2vw,116px)/.98 var(--f-cartello); letter-spacing:var(--tr-cartello)}
h2{font:800 clamp(34px,4.6vw,64px)/1.06 var(--f-cartello); letter-spacing:var(--tr-display)}
.statement{font:800 clamp(30px,3.6vw,52px)/1.18 var(--f-cartello); letter-spacing:-.035em}
.numero{font:800 clamp(56px,7vw,96px)/.90 var(--f-cartello); letter-spacing:var(--tr-display);
        font-variant-numeric:tabular-nums; min-inline-size:5ch}
.unita{font:800 34px/1 var(--f-cartello); color:var(--arancio)}
h3{font:700 19px/1.30 var(--f-testo); letter-spacing:-.012em}
.deck{font:400 clamp(17px,1.4vw,20px)/1.60 var(--f-testo); letter-spacing:var(--tr-corpo);
      color:var(--t2); max-width:62ch}
p{font:400 17px/1.62 var(--f-testo); letter-spacing:var(--tr-corpo); color:var(--t2); max-width:68ch}
.ciak{font:500 11px/1.20 var(--f-ciak); letter-spacing:var(--tr-ciak);
      text-transform:uppercase; color:var(--t3); margin-bottom:20px}
.voce{font:italic 400 26px/1.35 var(--f-voce); color:var(--t2)}
```

**Legge del tracking: tre plateau con inversione di segno fra 15 e 17px.** Il plateau del display è *piatto* (un solo token da 32px a 116px, non una curva). Il rapporto cartello:corpo è 7,7:1 — è quell'ampiezza a permettere che il ciak da 10px resti davvero 10px senza competere.

**Budget font:** Display var latin ~34KB + Text var latin ~30KB + Instrument Serif Italic subsettato ai soli glifi usati ~14KB + Plex Mono subsettato a `A-Z 0-9 . · : / – % € + ■` ~15KB = **~93KB WOFF2**. `preload` solo su Display e Text, `font-display:swap`, `@font-face` di fallback con `size-adjust`/`ascent-override` per CLS 0.

---

## 3. Griglia, spaziature, la scalinata come sistema

**Container che si restringono al crescere della densità di lettura:**

| Larghezza | Uso | Padding laterale |
|---|---|---|
| 1440px | nav inner | 40px |
| 1320px | scene piene (hero, passaggio, volti) | 40 / 24 / 18px |
| 1160px | griglie e nastri | 24px |
| 880px | pannelli editoriali, statement | 24px |
| 68ch | misura di lettura dei paragrafi | — |

**Griglia:** 12 colonne desktop / 6 tablet / 4 mobile, gutter **20px**, margini 40 / 24 / 18px. Breakpoint: 1440 · 1200 · 1024 · 768 · 480.

**Scala di spaziatura (vera, non accordata a mano):** `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.
Valori strutturali: padding-top hero **160px** (copre i 116px di chrome fisso + 44 di aria); padding-bottom statement **128px** (il respiro più grande); scene dense 48 top / 96 bottom; banda carta 32/34 con **64px** di margine sotto la label; footer 72 top.

**Il mark a scalinata diventato sistema** (`--passo: 12px`, angolo del brand `26.57deg`, rise 1 : run 2):
- il **quadrato singolo 8px** sostituisce il pallino in tutte le liste e apre i ciak: `■ I NUMERI, NON LE PROMESSE`;
- **quattro quadrati in salita** = i quattro reparti; l'n-esimo acceso in arancio segna lo stato corrente nella scena pinnata e nella nav di sezione;
- le tre stat card salgono di `calc(var(--i) * -12px)`: il layout stesso sale;
- le tre righe del cartello finale indentano di `0 / 5.5ch / 11ch`;
- **un solo angolo** in tutto il sito per divisori e tagli: 26,57°;
- il loader (se serve) è i quattro quadrati che si accendono dal basso, `stagger .06`, `ease expo.out`, `transform-origin:bottom`. È l'unica animazione di logo che vale la pena fare.

---

## 4. Componenti (misure e stati)

### 4.1 Barra criterio
`position:fixed; top:0; height:40px; background:var(--nero-scena); border-bottom:1px solid var(--bordo-hairline); z-index:9500; body{padding-top:40px}`. Contenuto flex gap 12px: quadrato 8px `--arancio` (statico) + testo Plex Mono 11px `+.14em` `--t2` + link «Vedi i criteri» (`--arancio`, underline wipe 320ms). Nessun pulse: SC 2.3.1 e budget di movimento. Degradazione: `@860px` cade `· 12 AZIENDE PER TRIMESTRE`; `@480px` resta `FATTURATO 1–5 M€ · RISPOSTA IN 48 ORE`.

### 4.2 Nav
`fixed; top:40px; height:76px (60px <1024)`. Stato base trasparente; `.scrollata` → `background:var(--sup-nav); backdrop-filter:blur(18px) saturate(160%); border-bottom:1px solid var(--bordo-hairline)`, transizione 300ms `--ease-taglio`. **Isteresi obbligatoria** (attiva a 48px, disattiva a 12px) per non far sfarfallare il `backdrop-filter` intorno alla soglia:
```js
let on=false; const h=document.querySelector('.nav');
const f=()=>{const y=scrollY; if(!on&&y>48){on=true;h.classList.add('scrollata')}
             else if(on&&y<12){on=false;h.classList.remove('scrollata')}};
addEventListener('scroll',()=>requestAnimationFrame(f),{passive:true});
```
Sequenza: mark 34px (`flex-shrink:0`) → voci (`margin-left:26px; gap:2px`) → destra (`margin-left:auto; gap:12px`). Voci: 16px/500 `--t2`, padding 8px 16px, radius 8px; hover `background:rgba(255,255,255,.06); color:var(--t1)`; **nessun transform in header** (gerarchia di hover a due livelli: in header solo colore, in pagina colore + lift). Bottoni a destra normalizzati a forza: `height:40px; border-radius:999px; font:700 14px/1 var(--f-testo); padding:0 22px`. Sotto 1024px: burger + la sola pill, fondo opaco di default.

### 4.3 Ciak (eyebrow)
Plex Mono 11px/500, `+.14em`, uppercase, `--t3`, `margin-bottom:20px`. Tre formati, uno per lavoro: `SCENA 04 / 11 — IL METODO` (posizione nel film), `REPARTO 02 / 04 · MARKETING A RISPOSTA DIRETTA` (nomenclatura proprietaria), `■ I NUMERI DEI CLIENTI, NON LE PROMESSE` (tesi). Le parentesi quadre di Sharpify sono sostituite dal **numero di scena e dal quadrato del mark**: stessa densità informativa, zero derivazione.

### 4.4 Testa-scena (formula unica, ripetuta 8 volte)
`ciak` → gap 20px → `h2` → gap 24px → `deck` (max 62ch) → gap 48px → corpo della scena. Allineamento: **sinistra quando segue una griglia, centro quando segue un nastro o un full-bleed** — e la regola è scritta, non improvvisata. La prevedibilità della formula è ciò che compra la densità: il lettore la impara al primo colpo.

### 4.5 Inquadratura (segni di taglio)
```html
<div class="inquadratura" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
```
Quattro L da 14px, `border:1px solid var(--bordo-forte)` su due lati ciascuna, posizionate agli angoli con `inset:0`. Usata **solo** su: frame dell'hero, scena pinnata, inserto evento, cartello finale. Mai sulle card (diventerebbe un pattern e perderebbe senso). In apertura si disegnano con `scaleX/scaleY 0→1`, `transform-origin` agli angoli, 240ms.

### 4.6 Timecode di scena
`position:fixed; left:24px; bottom:20px; z-index:70`, Plex Mono 11px `--t4`, `aria-hidden="true"`, nascosto sotto 900px. Testo `SCENA 04 / 11 · 00:03:12`, dove il timecode è il progresso di scroll mappato su una durata fittizia di 8 minuti. Aggiornato in rAF, `textContent` riscritto solo al cambio di valore, `font-variant-numeric:tabular-nums; min-inline-size:22ch`. In reduced-motion mostra solo `SCENA 04 / 11`. L'etichetta accessibile della scena vive in un `<h2>` reale, non qui.

### 4.7 Card provino (result card)
`300×400px`, `aspect-ratio:3/4`, `border-radius:var(--r-pannello)`, `overflow:hidden`, `background-size:cover`, `-webkit-mask-image:-webkit-radial-gradient(white,black)` per forzare il clipping del raggio.
Quattro strati: fotografia reale del cliente → scrim `linear-gradient(180deg, rgba(0,0,0,.24) 0%, rgba(0,0,0,.36) 40%, rgba(0,0,0,.58) 75%, rgba(0,0,0,.74) 100%)` (lo scrim a 4 stop fa il lavoro che di solito si affida al photo-editing) → contenuto `z-index:1`, flex column, gap 12px, padding 0 8px 12px → due chip.
Chip: `254×58px`, `background:rgba(0,0,0,.28)`, `backdrop-filter:blur(2px)`, `border:1px solid rgba(255,255,255,.55)`, `radius:8px`, padding 10px 12px, gap 12px. Numero **Red Hat Display 36px/800 tabular, `nowrap; flex-shrink:0`**; label **Plex Mono 11px `+.12em` uppercase**. Rapporto 3,3:1 dentro 58px di altezza: è ciò che rende il chip leggibile a 300px. **Nessun `text-shadow`** — il chip ha già vetro e bordo, il bagliore impasterebbe i caps.
Hover (che a Sharpify manca del tutto): `border-color:var(--bordo-ui)`, e in 200ms compare una terza riga di contesto (`canale · fonte del dato`). Densità informativa in più, movimento in più zero.

### 4.8 Stat card a lente
```
.lente        380×360 · radius 12 · overflow:hidden · padding:2px   ← i 2px sono la feritoia
              background:#151311
  .blob       260×290 · absolute · border-radius:50% · filter:blur(44px) · z-index:-1
              background:radial-gradient(circle, rgba(255,255,255,.34) 0%,
                                                  rgba(255,130,0,.55) 40%, transparent 72%)
  .interno    376×356 · z-index:1 · backdrop-filter:blur(72px)
              background:rgba(18,16,14,.72) · border:1px solid var(--bordo-hairline)
              box-shadow:inset 0 1px 0 rgba(255,255,255,.08)
              radius:12 · padding:44px 30px · flex column · gap:16px
```
Il bagliore esce dai 2px di feritoia e viene **diffuso** dal vetro: non è un `box-shadow`, è una lente. Il nucleo bianco nel gradiente del blob è ciò che impedisce all'arancio di diventare marrone sotto il blur.
Gerarchia interna a cinque livelli: ciak → **numero 96px bianco tabular** + unità 34px arancio in span separato → label 16px/600 `-.01em` uppercase `--t2` → contesto 12px `--t3` («dato aggiornato a settembre 2026 · fonte: registro clienti interno»). La monumentalità viene dal **rapporto 96:12 = 8:1** dentro una card di 360px, non dalla dimensione assoluta.
Gutter fra card 30px, offset a scalinata `-0px / -12px / -24px`.

### 4.9 Stazione reparto (scena pinnata)
Blocco `420×280px`, `background:var(--sup-2)`, `border:1px solid var(--bordo-hairline)`, radius 12, padding 26px 24px. Contenuto: quattro quadrati 8px in salita (l'n-esimo in `--arancio`) → ciak `REPARTO 02 / 04` → h3 nome reparto 19px/700 → claim 15px `--t2` (max 80 caratteri) → riga consegna in Plex Mono 11px `--t3`: `CONSEGNA: CONTATTO PROFILATO · SLA 24 H · CRM CONDIVISO`. Stato attivo: `border-color:rgba(255,130,0,.42)`, `background:var(--sup-3)`, `box-shadow:var(--e-2)`. Stato rotto (contro-esempio): `border-color:var(--allarme)`, giunzione `stroke-dasharray:6 6`.

### 4.10 CTA — tre livelli, tutti pill
**Primario:** `height:56px; padding:0 34px; border-radius:999px; background:var(--arancio); color:#0C0B0A; font:700 17px var(--f-testo); isolation:isolate`. Hover: `background:var(--arancio-fondo); transform:translateY(-2px)`, glow `0 0 12px rgba(255,255,255,.5), 0 0 40px rgba(255,130,0,.34)` + la luce che segue il cursore (§ momenti-firma 6). Active: `translateY(0)`. Focus-visible: `outline:2px solid var(--arancio); outline-offset:3px`. Disabled: `background:var(--velo-caldo); color:var(--t3); cursor:not-allowed`. Loading: label sostituita da `INVIO IN CORSO…` in mono, larghezza bloccata, nessuno spinner rotante.
Sotto-label sempre presente, Plex Mono 11px `--t3`: `FATTURATO 1–5 M€ · NO START-UP · RISPOSTA IN 48 ORE`.
**Secondario outline:** `border:1px solid var(--bordo-ui)` (3,04:1, non le hairline illegali), background trasparente, `padding:17px 34px`, 17px/700; hover `background:rgba(255,255,255,.06)`.
**Terziario testuale:** `--arancio` con underline wipe — `background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat`, hover `background-size:100% 1px`, 320ms `--ease-taglio`; hover colore `--arancio-caldo`. È il dettaglio che si nota al secondo passaggio, non al primo.

### 4.11 Voce narrante
Instrument Serif Italic 26px/1.35 `--t2`, `max-width:34ch`, allineata a sinistra sotto la fotografia, precedute da un filetto 24px `--bordo-forte`. **Massimo due istanze per pagina**, entrambe con una funzione: didascalia della fotografia d'apertura e citazione cliente. Mai su un titolo.

### 4.12 Banda carta (l'unica inversione)
`background:var(--carta); color:var(--inchiostro); padding:32px 0 34px`. Label `QUELLO CHE PUOI VERIFICARE PRIMA DI PARLARCI` in Plex Mono 12px `+.18em`, colore `#6A6762`, `margin-bottom:64px`. Loghi stampa: `height:28px` con **override manuale per singolo logo** (24–40px) per pareggiare il peso ottico — è direzione artistica vera e costa otto righe; `filter:grayscale(1); opacity:.7 → 1` in hover; `mask-image:linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)` ai bordi. **Niente `mix-blend-mode:multiply` né `filter:invert(1)`**: gli asset arrivano come SVG monocromatici, non si aggiustano con i filtri. Accento della banda: `--arancio-profondo` (5,85:1). Focus ring qui: `outline:2px solid var(--inchiostro)`.

### 4.13 Form candidatura
Cinque campi: azienda, fatturato annuo (select: `1–2 M€ / 2–3 M€ / 3–5 M€ / oltre 5 M€ / sotto 1 M€`), settore, nome e ruolo, telefono. Input: `height:52px`, `background:var(--sup-2)`, `border:1px solid var(--bordo-ui)`, radius 12, 17px, `--t1`; focus `border-color:var(--arancio)` + `outline:2px solid var(--arancio); outline-offset:2px`. Errore: `border-color:var(--allarme)` + messaggio 15px `--allarme` **con icona e testo** (mai solo colore, SC 1.4.1), `aria-live="polite"`.
Stato «sotto 1 M€» selezionato → messaggio immediato, non un rifiuto alla fine: «La tua azienda non rientra nei parametri di questo percorso. Non è un no per sempre: è un no per adesso. Ti mandiamo il podcast e ci riparliamo quando sei sopra il milione.»
Successo: «Candidatura ricevuta. La leggiamo noi, non un software. Ti rispondiamo entro 48 ore lavorative.»
Stato vuoto della sezione eventi: «Nessuna serata in programma in questo momento. Le prossime date escono prima sulla newsletter che sul sito.»

### 4.14 Footer
`background:#0A0908; padding:72px 40px 0`. Grid `1.5fr 1fr 1fr 1.05fr 1fr`, gap 36px, `padding-bottom:60px`, `border-bottom:1px solid var(--bordo-hairline)`. Titoli colonna 12px/700 `+.10em` uppercase `--t4`; link 14px `--t3` → `--t1` (transizione color 200ms) con underline wipe; social 36×36 radius 8 `border:1px solid var(--bordo-ui)`. Riga legale 13px `--t4`: ragione sociale, P.IVA, sede legale Capiago Intimiano (CO), sede operativa Via Marco D'Agrate 41 Milano, numero di certificato ISO. Un solo link colorato in tutto il footer.

### 4.15 Grana di pellicola
Un unico layer: `position:fixed; inset:0; pointer-events:none; z-index:60; opacity:.035; background-image:url(data:image/png;base64,…)` — tile 128×128 generato **una volta** da `feTurbulence baseFrequency=.9 numOctaves=3` e salvato come PNG in data-URI (~2,4KB). Nessuna animazione, nessun `mix-blend-mode`, nessun `filter`. È la texture del film e costa un paint iniziale.

---

## 5. Copy della home, scena per scena (italiano reale, pronto)

**Barra criterio** — `■ CANDIDATURE APERTE · FATTURATO 1–5 M€ · NO START-UP · 12 AZIENDE PER TRIMESTRE · RISPOSTA IN 48 ORE`

**Nav** — Metodo · Risultati · Chi siamo · Eventi + *Candida la tua azienda*

**Scena 01 — Apertura**
Ciak: `SCENA 01 · AGENZIA 4 IN 1 · DAL 2020 · MILANO`
H1: **Non ti vendiamo contatti. Ti consegniamo il reparto che FATTURA.**
Deck: «Pubblicità, marketing a risposta diretta, reclutamento e formazione della rete vendita: quattro reparti sotto lo stesso tetto, allineati sullo stesso numero. Il tuo.»
CTA: *Candida la tua azienda* — `FATTURATO 1–5 M€ · NO START-UP · RISPOSTA IN 48 ORE` · secondario: *Guarda come funziona il 4 in 1*
Voce narrante: «*Il primo oggetto che consegniamo è un contratto firmato da qualcun altro.*»

**Scena 02 — I provini**
Ciak: `■ I NUMERI DEI CLIENTI, NON LE PROMESSE`
Card (esempi, da confermare con liberatoria): `DA 1,4 A 3,1 M€ / 11 MESI` · `IMPIANTISTICA · 9 VENDITORI` — `12 VENDITORI RECLUTATI / 90 GIORNI` · `SERRAMENTI · RETE DA ZERO` — `+180% APPUNTAMENTI / 4 MESI` · `CONSULENZA · OUTBOUND + FIERE`
Bottone: `PAUSA`

**Scena 03 — Statement (scrub)**
«Il marketing porta le persone. Il reparto vendita porta il **fatturato**. Noi costruiamo **entrambi**.»

**Scena 04 — Il passaggio (pin)**
Ciak: `SCENA 04 · IL METODO 4 IN 1`
H2: **Quattro reparti. Tre passaggi. È nei passaggi che le aziende perdono il fatturato.**
Binario LA DOMANDA: `REPARTO 01/04 · PUBBLICITÀ` — «Sfruttiamo tutte le fonti di traffico e i canali pubblicitari, online e offline.» → `CONSEGNA: CONTATTO GREZZO · SLA 24 H · CRM CONDIVISO` → `REPARTO 02/04 · MARKETING A RISPOSTA DIRETTA` — «Profiliamo ed educhiamo le persone che catturiamo dalla pubblicità.»
Binario LA SQUADRA: `REPARTO 03/04 · RECLUTAMENTO` — «Reclutiamo e selezioniamo le figure commerciali.» → `CONSEGNA: VENDITORE ASSUNTO · SLA 30 GIORNI · SCHEDA COMPETENZE` → `REPARTO 04/04 · FORMAZIONE RETE VENDITA` — «Manteniamo costantemente alte le performance dei tuoi commerciali.»
Convergenza: `LA TRATTATIVA` — «Il contatto educato incontra il venditore formato. È l'unico punto in cui nasce il fatturato.»
Contro-esempio: **«Quando i quattro reparti sono quattro fornitori, i passaggi si rompono qui, qui e qui.»** — «Nessuno risponde del contatto perso, del venditore sbagliato, della trattativa non chiusa. E tu paghi quattro volte lo stesso lavoro.»

**Scena 05 — I numeri**
Ciak: `DAL 2020 · 33 SETTORI`
`150` IMPRENDITORI SERVITI · `33` SETTORI DIFFERENTI · `750` PROCESSI DI VENDITA REALIZZATI
Contesto: `dato aggiornato a settembre 2026 · fonte: registro clienti interno`

**Scena 06 — I volti**
H2: **Il reparto che ti consegniamo ha nomi e cognomi.**
Deck: «34 persone, quattro reparti, un ufficio in Via Marco D'Agrate 41 a Milano.»
Card Frisoni: «750 processi di vendita realizzati, oltre 500 venditori gestiti, due libri, un podcast dal 2023.»
Riga Bardolla: «Co-founder: gruppo quotato su Euronext Growth Milan, oltre 100 dipendenti.»

**Scena 07 — La carta** — `QUELLO CHE PUOI VERIFICARE PRIMA DI PARLARCI`

**Scena 08 — Sales Process Day** — «1.100 imprenditori passati dalle nostre serate. 35 sold out negli ultimi 12 mesi. 30 sedie per volta.» · *Prendi uno dei 30 posti* · «Se non ti è utile, ti rimborsiamo al desk, in sala, senza spiegazioni.»

**Scena 09 — Cartello finale** — FATTURARE / FATTURARE / **FATTURARE** · «È il nome del nostro podcast e l'unica cosa che ci interessa misurare. 2023–oggi.» · *Ascolta l'ultimo episodio*

**Scena 10 — Il caffè** — «Hai un'azienda fra 1 e 5 milioni e vuoi capire se ha senso. Vieni a prendere un caffè in Via Marco D'Agrate 41.»

### Voce: regole non negoziabili
Tu sempre, ma da pari. Indicativo presente, prima persona plurale, verbi di azione. Frasi brevi. Numeri prima degli aggettivi. Concretezza fisica (reparto, tetto, tavolo, caffè, sedie). **Massimo una parola in caps per blocco**, e solo dal lessico core (ZERO, FATTURARE, 4 IN 1). Vietati: soluzioni innovative, a 360 gradi, digital transformation, growth hacking, brand awareness, funnel, boost, unlock, «Book a demo», il simbolo `$`, libertà finanziaria, mindset, rivoluzionario, segreto, hack, countdown finti, «solo per oggi», «garantiamo il risultato» senza condizioni scritte.

---

## 6. Accessibilità — dove diventiamo il fratello maggiore di Sharpify

| Difetto misurato nel riferimento | Cosa facciamo |
|---|---|
| bordi a white@.07–.14 → **1,19–1,51:1**, e sono l'unico confine delle card | tre bordi per ruolo; `--bordo-ui` a **3,04:1** obbligatorio sull'interattivo; nessuna card dipende dal bordo (ha anche un delta di superficie) |
| `color:rgba(255,255,255,.30)` usato 6 volte → **2,69:1** | il gradino più basso è `--t4` a **3,53:1**, e il token stesso dichiara «SOLO ≥24px». Sotto .38 non esiste token |
| 18 alpha di testo, 11 raggi | **4 gradini di testo, 4 raggi, 3 superfici, 3 bordi** |
| reduced-motion coperto al 5% (2 blocchi su 36 entrate, 1 scrub, 1 rAF, 4 loop) | copertura totale via token di durata e travel |
| marquee senza controllo di pausa persistente | bottone `PAUSA` reale (SC 2.2.2, livello A) + hover + focus-within |
| testo splittato senza cura per gli screen reader | `SplitText.create(..., {aria:'auto'})` → `aria-label` sul parent, `aria-hidden` sugli span; in reduced-motion non si splitta affatto |
| — | skip-link «Salta al contenuto» e «Salta la scena del metodo»; focus sempre visibile e dentro il viewport durante il pin; nessuno stato comunicato dal solo colore; `prefers-reduced-transparency` → si spengono i `backdrop-filter`; test obbligatori con sola tastiera, VoiceOver e NVDA |

---

## 7. Performance — budget contrattuali

| Metrica | Target |
|---|---|
| LCP (75° perc., 4G, Moto G) | **< 1,8s** — l'elemento LCP è il testo dell'H1, e **nessuna animazione sopra la piega è gated da JavaScript** |
| INP | **< 100ms** |
| CLS | **0,00** — un sito animato non ha scuse |
| TTFB | < 200ms (statico su CDN: 30–80ms) |
| Nodi DOM | **< 1500** (Sharpify è a 2.069; le 110 section Elementor attuali sono oltre 3.000) |
| JS al primo render | < 100KB gz — di cui **41KB** per tutto il motion stack (gsap 23 + ScrollTrigger 11 + SplitText 7) |
| CSS critico inline | 14KB (1 RTT) |
| Font | ~93KB |
| Hero AVIF | ≤ 180KB, `fetchpriority="high"`, width/height espliciti |
| Frame budget | < 2ms di JS per frame nelle scene scrubbate (8,3ms totali a 120Hz) |

Regole: `contain:layout paint` sulle scene; `content-visibility:auto` + `contain-intrinsic-size:auto 800px` sotto la piega **esclusa la scena pinnata** (altera i calcoli di start/end); zero animazioni di proprietà di layout; nessun `filter:blur()` animato; niente `getBoundingClientRect()` dentro un listener; `gsap.quickTo` nei loop di puntatore, mai `gsap.to`; `{passive:true}` su tutti i listener di scroll/pointer; terze parti dopo `load` o in worker; misurazione reale con `web-vitals` v4 (`onLCP/onINP/onCLS`) su un endpoint, non solo Lighthouse.

**Stack raccomandato:** Astro statico (`output:'static'`) + GSAP servito da locale + Storyblok o Sanity per il visual editing, con content collections tipizzate (Zod) — la build fallisce se manca un campo, invece di pubblicare una card rotta. Il cliente cambia i contenuti dentro vincoli (H1 max 60 caratteri, claim di stazione max 80, `stat_cards` esattamente 3, `result_cards` 4–16): **i vincoli sono il prodotto**. Non gli si consegnano font, colori, parametri di motion né ordine delle sezioni.

---

## 8. Cosa serve dal cliente perché questa direzione esista (bloccante)

1. **I tre passaggi**, in dettaglio: chi passa cosa a chi, con quale SLA e con quale strumento. Senza questo la scena centrale non ha contenuto.
2. **Riconciliazione dei numeri**: oggi convivono 150 vs +800 imprenditori, +20 vs 30 vs 34 persone, 6 mesi vs 9/12 mesi. Un numero per concetto, su tutte le proprietà, con data di aggiornamento visibile e un documento di fonte aggiornato ogni trimestre.
3. **4–6 card-risultato documentabili** (azienda, settore, fatturato prima/dopo, mesi, cosa è stato fatto) con liberatoria. Le testimonianze attuali hanno la stessa frase placeholder ripetuta sotto cinque nomi veri: quella sezione non esiste finché non arrivano i testi reali.
4. **Certificazione**: norma esatta, ente, numero, scopo, scadenza. E la pagina «Politica di Qualità» oggi risponde 404 mentre è linkata dal footer: si ripara prima del restyling.
5. **Fotografia**: 6 nuovi scatti mano-su-nero (cuffie, telefono, badge, calcolatrice, chiave, contratto firmato — un oggetto per reparto e per scena, al posto delle icone), l'ufficio di Milano, ritratti clienti a ≥1200px.
6. **Fonte** del claim «−50% rischio di fallimento / −80% esaurire la cassa», o si elimina: in una sezione-numeri, un dato senza fonte contamina i dati con fonte.

## 9. Anti-slop: cosa non faremo, mai

Gradienti viola-blu e arancio↔bianco · glassmorphism generico · blob sfocati animati · card tutte uguali con icona tonda · «Elevate your business» · spacing uniforme senza gerarchia · Inter come unico font · cursore custom · scroll orizzontale forzato · sequenze di immagini scrubbate · scramble text · smooth scroll globale · marquee di loghi grigi · count-up di tre secondi · muro di tile bianche · `text-shadow` di bagliore sui caps · `filter:invert(1)` sui loghi cliente · countdown e scarsità inventata · un secondo pin.
