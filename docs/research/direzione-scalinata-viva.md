# Direzione: Scalinata Viva

**Concept.** Il sito non è una sequenza di sezioni: è un solo oggetto che sale. La particella elementare è il quadrato del mark — un modulo di 12px che si moltiplica, si impila, si stacca e si ricompone per costruire tutto: il logo, i glifi di sezione, i bullet, i 4 reparti, le colonne dei numeri, la maschera delle fotografie, la barra di progresso, la transizione tra pagine. Ogni movimento della pagina avviene lungo un unico angolo, 31,72°, che è la pendenza reale della scalinata del logo: il brand non è un colore applicato, è una direzione, e l'utente la sente prima di saperla nominare.

**Perche calza.** Rispetta il DNA alla lettera e lo promuove: l'arancio #FF8200 torna a essere segnale (≤3% dei pixel, un solo quadrato acceso per viewport) invece che riempimento; il nero diventa il fondo nativo del sistema, così le fotografie mano-su-nero-con-oggetto-arancione smettono di essere ritagli incollati e diventano pagina; il mark a scalinata passa da file a grammatica (bullet, eyebrow, progress, maschera, loader); FATTURARE FATTURARE FATTURARE passa da riga di testo a firma scrubbata e a nome del contenitore editoriale; il 4 in 1 non è più quattro iconcine ma la scena centrale del sito, con i tre handoff resi letterali da tre quadrati che passano di colonna in colonna. Dal cliente prendo la richiesta reale — "molto animato, forte, potente, wow" — e la soddisfo con la continuità, non con la quantità: un solo oggetto che si trasforma per 8.000px produce più stupore di venti effetti diversi, e costa meno frame. Da Sharpify rubo il rigore (fondo unico, bianco a scala di opacità, hairline, tracking negativo sul display e positivo sulle micro-caps, CTA sempre pill, una sola rottura di valore, un solo accento, tutto one-shot) e ne ribalto quattro decisioni per non farne un clone: asse diagonale invece di verticale, fondo caldo #0C0B0A invece del freddo #161519, superfamiglia Red Hat (Display + Text + Mono) invece di DM Sans, fascia "carta da fattura" #F0EBE2 invece di crema, e la particella geometrica invece del glow decorativo. Il CTA resta selettivo e la selettività diventa verificabile: accanto a "Candida la tua azienda" ci sono sempre il criterio (1–5 M€, no start-up), il tempo di risposta e il numero di aziende accettate al mese. Tutto il copy è in italiano, con lessico contabile (fatturato, cassa, margine, reparto, rete vendita): il registro è imprenditore-a-imprenditore con il bilancio in mezzo, non startupper anglofono.

**Palette.** BASE E SUPERFICI (neutre — mai tinte d'arancio oltre α 0.10, il fango è dietro l'angolo)
#0C0B0A  --c-base            fondo canonico, near-black CALDO (R12>B10: smorza l'alone dell'arancio invece di eccitarlo come farebbe il #161519 freddo di Sharpify)
#080706  --c-base-deep       solo dietro le fotografie full-bleed e il registro evento
rgba(255,255,255,0.035) --c-surface-1  → #151413 · CR 1.07 · fasce di sezione
rgba(255,255,255,0.06)  --c-surface-2  → #1B1A19 · CR 1.13 · card a riposo
rgba(255,255,255,0.09)  --c-surface-3  → #222120 · CR 1.22 · card:hover (l'elevazione si fa alzando la superficie, non illuminando l'arancio)
rgba(10,9,8,0.94)       --c-surface-sticky  nav scrolled + backdrop-filter: saturate(150%) blur(18px)
#F0EBE2  --c-carta           UNICA rottura di valore della pagina (≈2% dei pixel): fascia "carta da fattura" delle prove istituzionali. Ink su carta #171310 (CR 15,55) e #5C554B (CR 6,19). ATTENZIONE: #FF8200 su carta = 2,09 → arancio VIETATO come testo qui; l'arancio su carta è solo #8A4300 (CR 6,13).

BORDI (3 step, non 6 — con la soglia legale cablata nel token)
rgba(255,255,255,0.10) --c-border-hairline  → CR 1.25 · DECORATIVO: nessuna card dipende da questo bordo, ogni card ha anche un delta di superficie
rgba(255,255,255,0.18) --c-border-strong    → CR 1.66 · DECORATIVO: separatori, griglia
rgba(255,255,255,0.34) --c-border-ui        → #5F5E5D · CR 3.04 ✓ WCAG SC 1.4.11 · OBBLIGATORIO su tutto ciò che è interattivo (input, bottone outline, checkbox, tab)

TESTO (4 step, non 18 — sotto 0.38 non esiste alcun token)
#FFFFFF                --c-text-1  CR 19.67 · display, numeri
rgba(255,255,255,0.72) --c-text-2  → #BBBBBA · CR 10.24 · corpo
rgba(255,255,255,0.50) --c-text-3  → #868585 · CR 5.34 · deck secondario, meta
rgba(255,255,255,0.38) --c-text-4  → #686867 · CR 3.53 · SOLO ≥24px (didascalie grandi, numeri di reparto spenti)

ACCENTO — famiglia a 5 livelli, perché #FF8200 ha ZERO headroom di gamut (L 0.735 C 0.185 h 53.8, B=0, R clippato): non esiste un "arancio più brillante" per l'hover
#FF9A38  --c-accent-hot    CR 9.30 · SOLO hover di link testuali (accetta desaturazione, non usarlo mai come fill)
#FF8200  --c-accent-ink    CR 7.91 (AAA) · IL BRAND: 1–3 parole per viewport, il quadrato acceso, la freccia, il focus ring
#E87300  --c-accent-mid    CR 6.45 · fill:hover del CTA primario (l'hover SCURISCE il fill e ALLARGA il glow: modello di interazione invertito)
#B85B00  --c-accent-pivot  punto di pareggio (nero 4.53 / bianco 4.63): sopra si usa nero, sotto si usa bianco. Mai a occhio.
#8A4300  --c-accent-deep   CR 2.70 · NON è testo su nero · ma bianco sopra dà 7.28 ✓ → è l'arancio per la fascia carta e per i fill che devono portare testo bianco
#3B2413  --c-accent-veil   superficie calda OPACA (CR 1.36), non un alpha: così nessuno la scala per sbaglio e nessuno genera marrone

GLOW — nucleo bianco, aureola arancione (è il meccanismo che salva l'arancio dal fango: #FF8200@0.30 diretto su base dà #552F07 = marrone; sopra un nucleo bianco@0.55 dà #B38D66 = caldo e luminoso)
--glow-core: rgba(255,255,255,0.90) · --glow-halo: rgba(255,130,0,0.28) · --glow-halo-strong: rgba(255,130,0,0.50)
--e-glow: 0 0 10px var(--glow-core), 0 0 34px var(--glow-halo), 0 0 72px var(--glow-halo)
--e-ambient: radial-gradient(ellipse 70% 45% at 50% 8%, rgba(255,130,0,0.14) 0%, transparent 64%)  ← sostituisce TUTTI i gradienti arancio→bianco del sito attuale

OMBRE NEUTRE (profondità), separate dal glow (importanza)
--e-1: 0 1px 12px rgba(0,0,0,0.30) · --e-2: 0 12px 32px rgba(0,0,0,0.44) · --e-3: 0 24px 72px rgba(0,0,0,0.56)

SEMANTICI — hue spinte lontano dal brand, perché l'arancio divora lo slot "warning"
#4ADE80 success (CR 11.29) · #FFD84D warning giallo puro, NON ambra (CR 14.22) · #CC3366 danger magenta-rosso, legittimato dal residuo già nel DOM (CR 3.96 → solo ≥24px, icone o bordi; il testo di errore usa #FF9AB8) · #7AA2FF info (CR 7.90). Nessuno stato è solo-colore: sempre colore + glifo quadrato + testo.

REGOLE DURE DELL'ARANCIO: (1) ogni pill arancione piena ha color:#0C0B0A, mai bianco (bianco su #FF8200 = 2,49 → fallisce anche AA large); (2) mai arancio sotto 15px e mai sotto weight 500 (l'alone da aberrazione cromatica divora le aste); (3) mai superfici tinte arancio oltre α 0.10 (#FF8200@0.18 su base = #382008 = marrone); (4) mai gradiente arancio→bianco; (5) un solo elemento arancione dominante per viewport, due il massimo tollerato; (6) budget ≤3% dei pixel; (7) i numeroni restano BIANCHI (19.67:1), l'arancio sta solo sull'unità (€, %, M) e nel glow sotto — il glow fa il lavoro cromatico, il bianco quello di luminanza, compensando i −31% di luce dell'arancio rispetto al verde di Sharpify.

**Tipografia.** SUPERFAMIGLIA UNICA: Red Hat (tutte su Google Fonts, tutte variabili, self-hosted WOFF2 subset latin) + un solo contrappunto serif.
· Red Hat Display  — variable wght 300–900 · display e titoli · usata a 700/800 (asse wght animabile: è il font che permette il signature moment del payoff)
· Red Hat Text     — variable wght 300–700 · corpo, nav, bottoni · 400/500/700
· Red Hat Mono     — variable wght 300–700 · TUTTI i dati: eyebrow, micro-label, numeri di reparto, righe di contesto (settore / fatturato di partenza / mesi), footer legale, P.IVA. È la traduzione tipografica del DNA contabile: il sito parla come un libro mastro, e nessun competitor italiano di categoria lo fa.
· Instrument Serif — regular + italic · SOLO le citazioni dei clienti · massimo 2 istanze per pagina · è l'equivalente dell'Editorial Old di Sharpify, ma libero e con una personalità editoriale italiana (alta corsa, contrasto forte)
Peso totale: 4 file WOFF2 variabili subsettati ≈ 118KB. Fuori per sempre: Nunito, Montserrat, Roboto, Roboto Slab, Inter.

SCALA (clamp reali, viewport 390 → 1440)
--t-display-0  Red Hat Display 800 · clamp(52px, 9.2vw, 128px) / 0.96 · tracking -0.042em   → payoff FATTURARE (3 righe stack)
--t-display-1  Red Hat Display 700 · clamp(38px, 6.4vw, 84px)  / 1.02 · tracking -0.040em   → H1 hero
--t-display-2  Red Hat Display 700 · clamp(32px, 4.6vw, 60px)  / 1.06 · tracking -0.040em   → H2 di sezione
--t-numero     Red Hat Display 700 · clamp(56px, 8vw, 116px)   / 0.92 · tracking -0.045em · font-variant-numeric: tabular-nums · min-inline-size in ch → i numeroni; unità (€ M % +) in span separato a 0.36× e color #FF8200
--t-title-1    Red Hat Display 700 · clamp(24px, 2.4vw, 34px)  / 1.20 · tracking -0.020em
--t-title-2    Red Hat Display 600 · 22px / 1.30 · tracking -0.020em                        → h3 card
--t-body-lg    Red Hat Text 400 · clamp(18px, 1.5vw, 20px) / 1.60 · tracking -0.010em · max-width 62ch → deck
--t-body       Red Hat Text 400 · 17px / 1.62 · tracking -0.010em · max-width 68ch
--t-body-sm    Red Hat Text 400 · 15px / 1.56 · tracking +0.020em
--t-meta       Red Hat Mono 500 · 13px / 1.45 · tracking +0.040em
--t-eyebrow    Red Hat Mono 700 · 11px / 1.20 · tracking +0.140em · UPPERCASE · color --c-text-3
--t-quote      Instrument Serif 400 · clamp(26px, 2.8vw, 40px) / 1.28 · tracking -0.010em

LA LEGGE DEL TRACKING (tre plateau, inversione di segno tra 15 e 17px — 6 token, non una curva)
--tr-eyebrow +0.140em (≤12px UPPER, mono) · --tr-meta +0.040em (13–14px) · --tr-body-sm +0.020em (15–16px) · --tr-body -0.010em (17–23px) · --tr-title -0.020em (24–31px) · --tr-display -0.040em (≥32px, PIATTO: un solo token su tutta la fascia display, non una funzione continua)
Rapporto display:body = 128:17 ≈ 7,5:1. È questa ampiezza che permette all'11px di restare davvero 11px.

DETTAGLI CHE FANNO LA DIFFERENZA
· L'eyebrow NON è "[ SEZIONE ]" (sarebbe la pelle di Sharpify): è `■ 02 / 04 — MARKETING A RISPOSTA DIRETTA` — il quadrato del mark come glifo (12px, border-radius 2px) + indice contabile in Red Hat Mono. La sintassi si impara al primo colpo e si ripete 8 volte.
· Ogni numero vive dentro un recinto (chip r2px o card r12px): nessuna cifra libera nel flusso.
· @font-face di fallback con size-adjust / ascent-override / descent-override calibrati su Arial, così il font-swap produce CLS 0 e SplitText non ri-spezza le righe.
· Asse variabile come firma: sul payoff, `@property --wght { syntax:'<number>' }` + `font-variation-settings:'wght' var(--wght)` da 400 a 800 durante lo scrub. Un solo posto in tutto il sito.
· Maiuscolo enfatico razionato: massimo UNA parola in caps per blocco, e solo dal lessico core (ZERO, FATTURATO, 4 IN 1).

## Flusso sezioni

- 00 · BARRA ANNUNCIO (fixed, h 40px, fondo #3B2413 opaco + hairline bassa). Funzione: urgenza DATATA, mai finta. Contenuto: '■ SALES PROCESS DAY · MILANO · 14 OTTOBRE · 30 POSTI IN SALA' + pill 'Prendi uno dei 30 posti' (fill #FF8200, testo #0C0B0A) + X di chiusura. Un solo quadrato pulsante 1,6s (box-shadow spread 0→7px, nessun transform).
- 01 · NAV STICKY (fixed top 40px, h 80px, trasparente → rgba(10,9,8,.94) + blur 18px con isteresi 48/12px). Funzione: dire 'questo è un sito costruito, non una landing'. Contenuto: mark + wordmark · Metodo · Risultati · Chi siamo · Eventi · pill 'Candida la tua azienda'. Dentro il mark, i 4 quadrati sono la BARRA DI PROGRESSO dei 4 atti della pagina: si accendono in arancio uno per uno mentre scendi. Quattro voci, quattro reparti, quattro quadrati: la stessa quantità ovunque.
- 02 · HERO (min-height 100svh, padding-top 168px, --e-ambient dietro). Funzione: una sola promessa, in caratteri da 84px. Eyebrow pill: '■ SOLO AZIENDE DA 1 A 5 MILIONI DI FATTURATO · NO START-UP'. H1: 'Ti costruiamo il reparto vendita. Da ZERO. In 6 mesi o meno.' ('ZERO' in #FF8200). Deck: 'Pubblicità, marketing a risposta diretta, reclutamento e formazione della rete vendita. Quattro reparti sotto lo stesso tetto, un solo numero da guardare: il tuo fatturato.' CTA primario 'Candida la tua azienda' + sub-label mono 'FATTURATO 1–5 M€ · RISPOSTA IN 48 ORE LAVORATIVE · 4 AZIENDE ACCETTATE AL MESE'. CTA secondario outline: 'Guarda come funziona il 4 in 1'. Qui gira IL CANTIERE (moment 1).
- 03 · NASTRO DELLE PROVE (h 470px, dentro l'hero, i primi 280px visibili sopra la piega). Funzione: la prova entra PRIMA della piega, così lo scroll parte per curiosità e non per dovere. 7 card-risultato 274×366 (aspect 3/4) su fotografia reale del cliente + scrim a 4 stop + due chip di vetro: 'DA 1,4 A 3,1 M€' / '11 MESI'. Afferrabile (cursor: grab), delta-time 0.026 px/ms, momentum al rilascio, bottone di pausa reale (WCAG 2.2.2), hover che rivela la riga di contesto mono 'IMPIANTISTICA · 14 VENDITORI · CHIUSURA MEDIA 21 GIORNI'.
- 04 · LA FIRMA (h 92vh, fondo --c-base, nessuna card). Funzione: chi siamo in tre parole, e il lettore le scrive lui. Contenuto: 'FATTURARE / FATTURARE / FATTURARE' in stack verticale, display-0 128px/800, tracking -0.042em, terza riga in #FF8200. Sotto, mono 13px: 'È l'unica cosa che misuriamo. È anche il nome del nostro podcast — 84 episodi.' Qui gira LA FIRMA CHE SI SCRIVE (moment 2).
- 05 · IL CONTRO-ESEMPIO (h 300px, testa isolata allineata a sinistra, 404px vuoti a destra). Funzione: costruire il problema prima di vendere la soluzione — è il contenuto più persuasivo disponibile e oggi non è sul sito. Eyebrow '■ PRIMA DI PARLARE DEL METODO'. H2: 'Quattro fornitori diversi non sono un reparto. Sono tre passaggi che cadono per terra.' Deck: 'L'agenzia che fa la pubblicità non parla con chi scrive le mail. Chi scrive le mail non sa chi hai assunto. Chi hai assunto non è stato formato da nessuno. Tu paghi quattro volte lo stesso lead.'
- 06 · IL METODO 4 IN 1 — SCENA UNICA PINNATA (pin, end +=260%, 334px di scroll per beat). Funzione: il movimento È il concetto. Quattro colonne di quadrati (Pubblicità · Marketing a risposta diretta · Reclutamento · Formazione rete vendita) e TRE handoff: un quadrato si stacca e viaggia lungo la diagonale del brand da una colonna all'altra ('1 lead' → '1 lead educato' → '1 venditore' → esce fatturato). Al progress 0–0,15 le colonne sono separate e i quadrati cadono nei vuoti; poi si agganciano. Qui gira LA MACCHINA (moment 3).
- 07 · I NUMERI (h 440px, 3 card 377×350 gap 30px, --e-glow con nucleo bianco). Funzione: prova di scala, ma verificabile. '150 IMPRENDITORI' / '33 SETTORI' / '750 PROCESSI DI VENDITA REALIZZATI'. Numeri bianchi 116px, unità in #FF8200, colonna di quadrati che si impila accanto a ciascuno (istogramma fatto con la particella). Micro-label mono: 'dato aggiornato a settembre 2026 · fonte: gestionale interno'. Sotto, un link: 'Vedi i 33 settori, uno per uno →' (la granularità batte la grandezza).
- 08 · I 4 REPARTI SONO 34 PERSONE (griglia 4 colonne, una per reparto, ritratti in b/n che vanno a colori in hover). Funzione: qui SalesProcess fa l'opposto di Sharpify — loro sono un'entità senza volti, noi vendiamo persone che entrano in azienda. Ogni volto è etichettato con il reparto: 'RECLUTAMENTO — Giulia Elicio, HR'. Eyebrow '■ IL METODO HA UNA FACCIA'. H2: 'Il reparto che ti costruiamo è fatto da queste persone.' CTA outline: 'Tutte e 34 →'
- 09 · CASE STUDY (3 card grandi 1120px, r20px, fotografia + maschera a scalinata). Funzione: prova nominale, l'unica che l'imprenditore italiano accetta. Ogni card: logo cliente + 'DA 1,4 A 3,1 M€ IN 11 MESI' + riga mono 'IMPIANTISTICA CIVILE · LOMBARDIA · FATTURATO DI PARTENZA 1,4 M€ · 14 VENDITORI RECLUTATI' + citazione in Instrument Serif 40px + nome, cognome, ruolo, azienda. Qui gira LA MASCHERA A SCALINATA (moment 5).
- 10 · SALES PROCESS DAY — INSERTO PIENO CAMPO (100vw, fondo #080706, fotografia evento con sticker/graffiti). Funzione: l'unico punto dove il registro EVENTO entra, riconoscibile come 'un altro mondo', esattamente come Sharpify usa la sua unica fascia crema. Contenuto: '+1.100 imprenditori · +35 serate sold out negli ultimi 12 mesi · 92% di recensioni positive' + 'Rimborso immediato al desk, senza spiegazioni' + pill 'Prendi uno dei 30 posti'. Marquee del payoff in caps compresso sul fondo, con controllo di pausa.
- 11 · FATTURARE FATTURARE FATTURARE — IL CONTENITORE EDITORIALE (h 1200px, card #1B1A19 r18px). Funzione: non vendiamo solo, pubblichiamo — da anni, sulla stessa cosa. Non si chiama 'Blog' né 'Risorse': si chiama col payoff. Contenuto: ultimo episodio in evidenza + 3 episodi + il libro 'Accelerare il Fatturato!' come lead magnet + pill 'Ascolta su Spotify'. Tag mono 10px: 'PODCAST' / 'CASO REALE' / 'EVENTO'.
- 12 · CERTIFICATI, VERIFICABILI — FASCIA CARTA (h 190px, fondo #F0EBE2, ≈2% della pagina). Funzione: l'unica rottura di valore, e la spendiamo sull'arma italiana che Sharpify non ha: l'esistenza legale documentata. Label mono #5C554B: 'CERTIFICATI, VERIFICABILI'. Contenuto: ISO 9001:2015 con numero di certificato ed ente + 4–6 loghi press monocromatici in #171310 con mask-image ai bordi (7%/93%) + 'P.IVA · sede legale · ufficio di Milano'. Arancio qui solo #8A4300.
- 13 · IL CAFFÈ (h 420px, fotografia vera dell'ufficio di Via Marco D'Agrate 41, una volta sola in tutto il sito). Funzione: sposta la conversione da un form a un luogo fisico — l'antidoto italiano al sospetto 'agenzia che sta su Zoom'. H2: 'Vieni a prendere un caffè in Via Marco D'Agrate.' Deck: 'Milano, quarto piano. Il caffè lo facciamo noi, la macchina è buona. Se preferisci partire da una call, va bene uguale.' Riga fattuale, una sola: 'Co-fondata con Alfio Bardolla (gruppo quotato su Euronext Growth Milan, oltre 100 dipendenti).'
- 14 · LA CANDIDATURA (h 700px, form su --c-surface-2, bordi --c-border-ui 0.34). Funzione: chiudere valutando, non implorando. H2: 'Candida la tua azienda.' Tre criteri a quadrati accesi: '■ Fatturato tra 1 e 5 milioni' / '■ Un prodotto o servizio già validato' / '■ Nessuna start-up'. 5 campi (azienda, fatturato a fasce, settore, nome, contatto). Bottone: 'Invia la candidatura'. Micro-copy: 'La leggiamo noi, non un software. Ti rispondiamo entro 48 ore lavorative.'
- 15 · FOOTER (5 colonne 1.5fr 1fr 1fr 1.05fr 1fr, gap 36px, fondo #080706, padding 72px 40px 0). Funzione: densità di navigazione + controllo di esistenza. Colonne: SALESPROCESS / METODO / RISULTATI / FATTURARE×3 / CONTATTI. Titoli mono 11px al 38%, link 15px al 50% → 100% con underline wipe 320ms. Bottom: ragione sociale, P.IVA, sede legale, ISO, privacy, cookie — tutto in Red Hat Mono 12px. Ultima riga: i 4 quadrati, tutti accesi.

## Momenti firma

- 1) IL CANTIERE — l'apertura (1.100ms, one-shot, zero costo su LCP). All'ingresso i 4 quadrati del mark si costruiscono uno sopra l'altro lungo la diagonale a 31,72° (stagger 90ms, transform-origin: bottom left, ease --ease-salita), poi si SEPARANO e ognuno vola al suo posto nella pagina: uno diventa il mark in nav, uno il glifo dell'eyebrow, uno il primo quadrato del progress, uno il quadrato del CTA. Implementazione: GSAP Flip (gratuito da 3.13) — `const st = Flip.getState('.q'); ...riparent...; Flip.from(st, {duration:.62, stagger:.09, ease:'expo.out', absolute:true})`. Vincolo assoluto: l'H1 è già dipinto OPACO al parse; si muove solo la maschera (`clip-path: inset(0 0 100% 0) → inset(0)` su un wrapper, animazione CSS `--t-scena 980ms`), così l'elemento LCP non è mai gated da JavaScript. Nessun preloader a schermo pieno: la pagina è già leggibile, i quadrati la stanno solo raggiungendo.
- 2) LA FIRMA CHE SI SCRIVE — FATTURARE ×3 (l'unico scrub tipografico della pagina, 648px di corsa = 72vh, 24px di scroll per carattere). SplitText `type:'chars', aria:'auto'` su 3 righe da 9 caratteri; timeline con `scrollTrigger:{start:'top 78%', end:'+=72%', scrub:.55}`, `ease:'none'`, stagger 0.055, proprietà animate: `color` da rgba(255,255,255,0.10) a #FFFFFF sulle righe 1–2 e a #FF8200 sulla riga 3, PIÙ l'asse variabile `--wght` da 400 a 800 (@property + font-variation-settings su Red Hat Display). Il testo è leggibile al 10% già prima: il motion aggiunge enfasi, non informazione. Fronte d'onda ~3 caratteri. Dietro, un solo quadrato per lettera si accende e si spegne come una testina di stampa: la frase non appare, viene BATTUTA. Nessun altro scrub compete con questo nei primi 5.000px.
- 3) LA MACCHINA — il 4 in 1 come scena unica pinnata (l'UNICO pin del sito, `pin:true, pinSpacing:true, anticipatePin:1, end:'+=260%', scrub:.6, invalidateOnRefresh:true`, 2.340px = 334px per beat, 7 beat). Beat 0 (progress 0–0.15): quattro colonne di quadrati SEPARATE da vuoti; tre quadrati provano a passare da una all'altra e CADONO nei vuoti (`y:'+=220', rotate:-8, opacity:0`, ease 'power1.in') — è il contro-esempio, reso letterale. Beat 1: le colonne si agganciano con uno scatto secco (`--ease-scatto`, 200ms, `x` che collassa a gap 18px) e i vuoti scompaiono. Beat 2–5: ogni reparto si impila (7 quadrati, stagger 64ms) mentre la sua etichetta entra in mask reveal; il quadrato di handoff viaggia da una colonna alla successiva lungo la diagonale del brand (`motionPath` non serve: `x/y` lineari a 31,72°, ease 'none' perché l'easing lo fa lo scroll) e si TRASFORMA in etichetta: '1 lead' → '1 lead educato' → '1 venditore'. Beat 6: dalla quarta colonna esce un quadrato arancione che diventa il numero del fatturato. Mobile (<1024px): `gsap.matchMedia()` sostituisce il pin con 4 blocchi in scroll nativo, ognuno con il proprio `animation-timeline: view()` — stessa scena, zero hijack.
- 4) I NUMERI CHE SI IMPILANO invece di contare (l'anti-cliché del count-up). Il numerone è BIANCO, statico, 116px, tabular-nums, con `min-inline-size` in ch: appare già finito. Accanto, una colonna di N quadrati (max 12, poi si passa al moltiplicatore mono '×10') si impila dal basso con `animation-timeline: view(); animation-range: entry 20% cover 45%`, stagger derivato dall'indice via `--i`, e SOLO l'ultimo quadrato è arancione. Il count-up sopravvive in un solo punto e su una sola cosa: l'unità (M€) sale in 980ms con `snap` e `Intl.NumberFormat('it-IT')`. Il glow sotto la card è il costrutto a lente: wrapper r10px `overflow:hidden` con `padding:2px` → blob 250×280 `border-radius:50%` `filter:blur(40px)` in #8A4300 → `.inner` con `backdrop-filter:blur(80px)` e bordo 2px rgba(255,130,0,.28). Il bagliore esce dai 2px di feritoia; il nucleo resta bianco.
- 5) LA MASCHERA A SCALINATA sulle fotografie (il pattern con il miglior rapporto effetto/rischio, e nessuno lo fa perché nessuno ha questo logo). Le foto mano-su-nero-con-oggetto-arancione e i case study non compaiono: vengono SCOPERTE da un bordo a gradini che avanza lungo la diagonale del brand. Implementazione: `@property --scalino { syntax:'<percentage>'; initial-value:100% }` + `clip-path: polygon(0 var(--scalino), 25% calc(var(--scalino) - 4%), 25% calc(var(--scalino) - 4%), 50% calc(var(--scalino) - 8%), ...)` a 4 gradini, `transition: --scalino var(--t-scena) var(--ease-salita)`, innescata una volta da IntersectionObserver (threshold .18, unobserve). Budget: massimo 2 elementi con clip-path animata per viewport (è raster, non composite); l'alternativa a costo zero per gli altri è `overflow:clip` + `translateY(101%)` sul figlio.
- 6) LA CONTINUITÀ TRA PAGINE — la scalinata che attraversa lo schermo (View Transitions API cross-document, 15 righe di CSS, zero JS, degrada a niente dove non è supportata). `@view-transition { navigation: auto }`; il mark porta `view-transition-name: marchio` su TUTTE le pagine, quindi non si ricarica: si sposta. La transizione di root non è un fade ma un wipe a 4 gradini: `::view-transition-new(root) { animation: 380ms var(--ease-quadro) both scalinata-in }` con `--ease-quadro: steps(4, end)` — l'unico easing a scatti del sito, e ha esattamente 4 step come i reparti. Ogni `view-transition-name` è unico nel documento (è il bug numero uno di questa API). Con `prefers-reduced-motion: reduce` → `@view-transition { navigation: none }`.

## Motion

FILOSOFIA: un solo oggetto, un solo angolo, una sola curva, due durate. Il movimento non è una collezione di effetti: è una TEXTURE riconoscibile. Il budget non è tecnico, è di attenzione — un momento speciale resta speciale perché non ha concorrenti.

TOKEN (unica fonte di verità, in :root)
--passo-x: 1; --passo-y: 0.618;            /* la pendenza reale del mark */
--angolo: 31.72deg;                         /* l'UNICO angolo del brand: tagli, wipe, direzione di entrata, ombre */
--travel: 24px;                             /* ampiezza unica di ingresso, mai superata */
--dx: calc(var(--travel) * -0.851);         /* -20.4px  (cos 31,72°) */
--dy: calc(var(--travel) *  0.526);         /* +12.6px  (sin 31,72°) */
--t-tap: 120ms; --t-micro: 200ms; --t-stato: 320ms; --t-reveal: 620ms; --t-scena: 980ms; --t-cantiere: 1100ms;
--stagger: 64ms; --stagger-riga: 128ms; --stagger-mark: 90ms;
--ease-salita: cubic-bezier(.16,.84,.24,1);   /* LA curva: ogni ingresso, ogni reveal, ogni lift */
--ease-scatto: cubic-bezier(.62,0,.20,1);     /* solo cambi di stato: nav scrolled, tab, accordion */
--ease-quadro: steps(4, end);                 /* solo progress a 4 quadrati e wipe di pagina */
--nastro-v: 0.026;                            /* px/ms, delta-time — NON px/frame */

LA LEGGE DEI DUE ASSI (è la traduzione di Sharpify, non la copia: loro hanno un asse verticale, noi ne abbiamo uno diagonale con una regola semantica)
· LA MATERIA (quadrati, card, superfici, immagini, il mark) entra lungo la diagonale: translate3d(var(--dx), var(--dy), 0) → 0. Sale da sinistra, come il logo.
· IL TESTO entra in verticale dentro una maschera: overflow:clip + translateY(101%) → 0. Si legge in orizzontale, quindi non lo si muove in diagonale. Mai.
Nessuna terza direzione esiste. Zero rotate, zero scale su testo, zero tilt 3D, zero skew da velocità di scroll.

GERARCHIA (6 livelli, ognuno con un tetto)
L0 · Non si muove mai: display, numeri, eyebrow, griglia, hairline, loghi. È la spina dorsale.
L1 · Micro-stato 120–200ms: color, background, border-color. Non produce movimento, produce risposta. È la maggioranza netta delle transizioni.
L2 · Lift tattile 200ms: bottoni translateY(-2px), card translate3d(-2px,-3px,0) lungo la diagonale. Ampiezza MASSIMA 4px, sempre accoppiata a un cambio di bordo o di superficie.
L3 · Ingresso 620ms one-shot: rise diagonale di 24px (materia) o mask reveal verticale (testo). Un solo gesto ripetuto ~40 volte, sempre irreversibile (unobserve/disconnect: risalendo non si ri-anima nulla → niente effetto flipbook) + failsafe setTimeout(3000) che forza lo stato visibile.
L4 · Ambient loop: quadrato pulsante 1,6s (solo box-shadow), nastro prove 26px/s, marquee del payoff 52s. SEMPRE in periferia, mai dentro un blocco di lettura, sempre sospendibile, sempre con controllo di pausa visibile.
L5 · I due picchi scrubbati: la firma FATTURARE×3 (648px) e la scena pinnata del 4 in 1 (2.340px). Nient'altro è scrubbato in 8.000px di pagina.

BUDGET DA CONTRATTO (verificabili in DevTools in 30 secondi)
· max 3 animazioni concorrenti per viewport · max 1 pin in tutta la pagina · max 2 ScrollTrigger scrubbati · max 2 clip-path animate per viewport · max 10 layer promossi contemporaneamente
· 0 animazioni di proprietà di layout (width, height, top, left, margin, padding) · 0 blur animati su aree grandi · 0 backdrop-filter in animazione (solo su nav, come cambio di stato)
· will-change è un PRESTITO: si aggiunge in onStart/pointerenter e si RIMUOVE in onComplete/transitionend. Nessun will-change permanente (è il difetto misurato di Sharpify: 40 mai rimossi).
· Nessun smooth scroll globale: NO Lenis, NO ScrollSmoother. Il pubblico è imprenditori su desktop Windows con la rotella: lo scroll-hijack è il modo più rapido di perdere il cliente. Lo smoothing si sposta sull'animazione con scrub .55–.6 (e ease:'none' su ogni tween scrubbato). È il 70% della sensazione premium a zero costo di usabilità e zero KB.
· `scroll-behavior: smooth` solo per gli anchor, azzerato in reduced-motion.
· document.fonts.ready.then(() => ScrollTrigger.refresh()) — obbligatorio, altrimenti start/end sono calcolati sui line-break del fallback.
· gsap.quickTo (non gsap.to) in ogni loop di pointermove; getBoundingClientRect letto UNA volta e cachato, invalidato su resize debounced 80ms e su refresh.
· Nastro delta-time: pos -= var(--nastro-v) * dt, velocità lerpata (`v += (target - v) * 0.08`), momentum al rilascio con decadimento 0.94/frame, misure di offsetLeft/offsetWidth in cache (mai read-after-write nel rAF).

MOBILE (<1024px) via gsap.matchMedia(), che CREA e DISTRUGGE le scene invece di lasciarle inerti
Zero pin, zero scroll orizzontale, zero magnetic, zero cursore custom, zero WebGL. La scena del 4 in 1 diventa 4 blocchi in scroll nativo con animation-timeline: view(). --travel scende a 16px, le durate × 0,7, il nastro passa a scroll nativo con scroll-snap-type: x mandatory e scroll-snap-align: center. dpr limitato a 1,5 se mai servisse un canvas.

PREFERS-REDUCED-MOTION — token, non interruttori (mai `* { animation: none !important }`: rompe gli accordion e fa scomparire per sempre gli elementi con fill-mode both)
@media (prefers-reduced-motion: reduce) { :root { --travel: 0px; --dx: 0px; --dy: 0px; --t-reveal: 140ms; --t-scena: 160ms; --t-cantiere: 0ms; --nastro-stato: paused; } }
Il travel va a zero, la dissolvenza sopravvive, ogni stato resta raggiungibile. Lato JS: mm.add('(prefers-reduced-motion: reduce)', ...) → nessun pin, nessuno scrub, SplitText NON viene eseguito (gsap.set sui colori finali), il rAF del nastro non parte e il contenitore resta `overflow-x: auto` scrollabile a mano, i numeri sono già finiti, il marquee è in pausa, `@view-transition { navigation: none }`. Copertura dichiarata: 100% delle animazioni, non il 5% (Sharpify ha esattamente 2 blocchi in tutto il sito).

CONFORMITÀ (argomento commerciale, non solo etica — European Accessibility Act dal 28 giugno 2025)
SC 2.2.2 Pause/Stop/Hide (livello A): ogni movimento automatico oltre 5s ha un controllo di pausa REALE e visibile (non solo hover) — nastro prove e marquee del payoff. SC 2.3.1: nessun flash oltre 3/s. SC 2.3.3: reduced-motion completo. SC 1.4.11: --c-border-ui a 0.34 = 3,04:1 su tutto ciò che è interattivo. Focus ring: `outline: 2px solid #FF8200; outline-offset: 3px` — è l'unico colore della palette che passa 1.4.11 senza sforzo (7,91:1). Durante la scena pinnata il focus da tastiera resta visibile e nel viewport.

PERFORMANCE (target, non speranze): LCP < 1,8s su Moto G / 4G throttled · INP < 100ms · CLS 0,00 · TBT < 200ms · < 1.500 nodi DOM · < 2ms di JS per frame nelle scene scrubbate · GSAP core 23KB + ScrollTrigger 11KB + SplitText 7KB + Flip 5KB ≈ 46KB gz, tutto il resto è CSS. Ripartizione: 70% CSS nativo scroll-driven (animation-timeline: view() / scroll(root), compositor thread, zero JS, con @supports fallback), 20% GSAP su 2 scene, 0% WebGL. I quadrati delle scene non sono 400 div: sono griglie CSS con al massimo 28 nodi per scena, generate con un solo `<rect>` in `<use>` dove servono di più. content-visibility: auto + contain-intrinsic-size: auto 800px su tutte le sezioni sotto la piega, ESCLUSA quella pinnata.

## Rischi

- L'asse diagonale è la scommessa dell'intera direzione, e può leggersi come deriva. 24px di travel con dx -20,4px significa che ogni elemento entra più da sinistra che da sotto: su una griglia a 4 colonne l'effetto è una coreografia, su un blocco di testo largo può sembrare che la pagina scivoli. Mitigazione già cablata (il testo sale in verticale dentro maschere, solo la materia va in diagonale) ma va verificata su 3 sezioni prima di firmarla: se in test l'effetto è instabile, si scende a --travel 18px e dx -12px, mantenendo l'angolo solo su mark, wipe e handoff.
- Il concept ha un solo modo di fallire, ed è la ripetizione. 'Tutto è lo stesso oggetto' a metà pagina rischia di diventare 'ho capito, sono quadrati': dal quinto uso la particella deve portare informazione nuova (un handoff, un conteggio, una maschera) e non decorazione. Regola di taglio da applicare in review: se un quadrato non conta qualcosa, non nomina qualcosa o non scopre qualcosa, si toglie.
- L'arancio non ha headroom di gamut: non esiste un #FF8200 'più acceso' per l'hover, e una griglia di quadrati arancioni su nero diventa energy-drink o, peggio, marrone (#FF8200@0.18 su base = #382008). Tutta la direzione poggia su una disciplina che il cliente potrà voler rompere ('facciamone di più arancioni'): serve mettere per iscritto il tetto — un solo quadrato acceso per viewport, ≤3% dei pixel, numeroni bianchi con l'unità arancione — e difenderlo, perché è esattamente ciò che separa questa direzione dal sito attuale.
- La scena pinnata del 4 in 1 è il momento più costoso del progetto in ogni senso: 2.340px di scroll, un pin-spacer, 7 beat, contro-esempio incluso. È anche il punto dove il pubblico può sentirsi ostaggio se lo scroll non avanza. Mitigazioni: end non oltre +=260%, anticipatePin 1, nessun secondo pin da nessuna parte, versione mobile completamente diversa (4 blocchi in scroll nativo), e test obbligatorio su un Android di fascia media reale — non solo Lighthouse, che non misura l'INP.
- Il concept anima dati che oggi NON esistono. Il nastro delle prove, i case study prima/dopo, i 33 settori elencati, la retention media: senza quel dataset la scena più bella del sito mostra card vuote, e le testimonianze attuali (cinque nomi veri con lo stesso testo placeholder ripetuto) sono già la prova che il vuoto si nota. Questa direzione è subordinata a un blocco di raccolta dati con liberatorie: se il cliente consegna solo 2 case documentati, il nastro va ridisegnato per 2 card, non riempito di aria.
- Non regge su WordPress + Elementor. Le View Transitions cross-document, il code splitting per scena, i 4 font variabili subsettati, il tetto di 1.500 nodi e un LCP sotto 1,8s non sono raggiungibili con 110 section e jQuery: il percorso è Astro statico + GSAP + CMS con visual editing (Storyblok o Sanity), 6–10 settimane, più la migrazione SEO con redirect 1:1 e i 404 attuali (/risorse/, /politica-di-qualita/) da riparare prima. È un cambio di processo per il cliente, non solo un restyling: va venduto come tale o si torna su Elementor in sei mesi.
- Il registro doppio è fragile. Lo sticker/graffiti del Sales Process Day è l'asset con più energia del brand, ma se contamina il sito istituzionale il brand perde l'autorevolezza necessaria a vendere a un'azienda da 5 milioni. Il confinamento in un unico inserto pieno campo funziona solo se nessuno, in fase di produzione contenuti, decide di 'metterne un po' anche nell'hero'. Lo stesso vale per Alfio Bardolla: una riga fattuale nella pagina Chi siamo è un asset, una foto in home con il patrimonio personale sposta SalesProcess dal territorio agenzia al territorio guru e riattiva l'allergia del pubblico.

---

# SCALINATA VIVA — spec completa di direzione

> Il sito non è una sequenza di sezioni: è un solo oggetto che sale. La particella elementare è il quadrato del mark. L'angolo è 31,72°. Non ne esiste un altro.

---

## 1. La legge fondamentale (quattro righe che governano tutto)

1. **Una particella**: il quadrato del mark, modulo base 12px, `border-radius: 2px`. Compare come bullet, glifo di eyebrow, progress in nav, mattone delle colonne dei reparti, istogramma dei numeri, gradino delle maschere fotografiche, wipe di transizione tra pagine.
2. **Un angolo**: 31,72° (`--passo-y: 0.618` su `--passo-x: 1`, la pendenza reale della scalinata). Lo usano: la direzione d'ingresso della materia, i tre handoff del 4 in 1, il wipe delle immagini, la diagonale delle ombre. Nessun altro angolo compare nel sito.
3. **Due assi con una regola semantica**: la **materia** entra in diagonale (`translate3d(-20.4px, 12.6px, 0) → 0`); il **testo** entra in verticale dentro una maschera (`translateY(101%) → 0`). Si legge in orizzontale, quindi il testo non si muove in diagonale.
4. **Un accento, come segnale**: `#FF8200` su ≤3% dei pixel. Se l'arancio non è cliccabile, non è un numero e non è il quadrato acceso, è sbagliato.

---

## 2. Token file (`tokens.css`, unica fonte di verità)

```css
:root{
  /* ---------- GEOMETRIA DEL BRAND ---------- */
  --passo-x: 1; --passo-y: .618;
  --angolo: 31.72deg;
  --q: 12px;                  /* la particella */
  --q-gap: 4px;               /* gap tra particelle in una colonna */
  --travel: 24px;
  --dx: calc(var(--travel) * -.851);
  --dy: calc(var(--travel) *  .526);

  /* ---------- SPAZIO (scala vera, non accordata a mano) ---------- */
  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:24px; --s-6:32px;
  --s-7:48px; --s-8:64px; --s-9:96px; --s-10:128px; --s-11:168px;

  /* ---------- CONTAINER ---------- */
  --w-nav:1440px; --w-statement:1260px; --w-grid:1200px; --w-editoriale:1120px; --w-lettura:68ch;

  /* ---------- RAGGI (4, non 11) ---------- */
  --r-hard:2px;    /* particella, tag mono, chip numerico */
  --r-card:12px;
  --r-panel:20px;
  --r-pill:999px;

  /* ---------- COLORE (vedi campo palette) ---------- */
  --c-base:#0C0B0A; --c-base-deep:#080706; --c-carta:#F0EBE2;
  --c-surface-1:rgba(255,255,255,.035);
  --c-surface-2:rgba(255,255,255,.06);
  --c-surface-3:rgba(255,255,255,.09);
  --c-border-hairline:rgba(255,255,255,.10);
  --c-border-strong:rgba(255,255,255,.18);
  --c-border-ui:rgba(255,255,255,.34);     /* 3.04:1 — soglia SC 1.4.11 cablata */
  --c-text-1:#FFFFFF;
  --c-text-2:rgba(255,255,255,.72);
  --c-text-3:rgba(255,255,255,.50);
  --c-text-4:rgba(255,255,255,.38);        /* SOLO >=24px */
  --c-accent-hot:#FF9A38; --c-accent-ink:#FF8200; --c-accent-mid:#E87300;
  --c-accent-pivot:#B85B00; --c-accent-deep:#8A4300; --c-accent-veil:#3B2413;
  --glow-core:rgba(255,255,255,.90);
  --glow-halo:rgba(255,130,0,.28);
  --glow-halo-strong:rgba(255,130,0,.50);
  --e-1:0 1px 12px rgba(0,0,0,.30);
  --e-2:0 12px 32px rgba(0,0,0,.44);
  --e-3:0 24px 72px rgba(0,0,0,.56);
  --e-glow:0 0 10px var(--glow-core), 0 0 34px var(--glow-halo), 0 0 72px var(--glow-halo);
  --e-ambient:radial-gradient(ellipse 70% 45% at 50% 8%, rgba(255,130,0,.14) 0%, transparent 64%);

  /* ---------- TIPOGRAFIA ---------- */
  --f-display:'Red Hat Display', system-ui, sans-serif;
  --f-text:'Red Hat Text', system-ui, sans-serif;
  --f-mono:'Red Hat Mono', ui-monospace, monospace;
  --f-quote:'Instrument Serif', Georgia, serif;
  --tr-eyebrow:.140em; --tr-meta:.040em; --tr-body-sm:.020em;
  --tr-body:-.010em; --tr-title:-.020em; --tr-display:-.040em;

  /* ---------- MOTION ---------- */
  --t-tap:120ms; --t-micro:200ms; --t-stato:320ms;
  --t-reveal:620ms; --t-scena:980ms; --t-cantiere:1100ms;
  --stagger:64ms; --stagger-riga:128ms; --stagger-mark:90ms;
  --ease-salita:cubic-bezier(.16,.84,.24,1);
  --ease-scatto:cubic-bezier(.62,0,.20,1);
  --ease-quadro:steps(4,end);
  --nastro-v:.026;             /* px/ms */
  --nastro-stato:running;
}

@media (prefers-reduced-motion: reduce){
  :root{
    --travel:0px; --dx:0px; --dy:0px;
    --t-reveal:140ms; --t-scena:160ms; --t-cantiere:0ms;
    --nastro-stato:paused;
  }
  html{ scroll-behavior:auto; }
}
```

Due numeri da mettere in cima al file **e in un test automatico**, perché sono le due soglie che un sistema white-alpha su near-black sbaglia sempre: su `#0C0B0A` serve **α ≥ 0.455** perché un testo bianco passi AA, e **α ≥ 0.340** perché un bordo passi SC 1.4.11. Sotto quelle soglie non esiste alcun token.

---

## 3. Griglia e ritmo verticale

**Quattro container che si stringono al crescere della densità** (1440 → 1260 → 1200 → 1120): il display parla a tutta larghezza, le card si stringono, l'editoriale si stringe di più. Il testo di lettura è comunque limitato a `--w-lettura: 68ch`.

**Griglia**: 12 colonne, gutter **18px** (il gutter dominante, come nelle card e nel nastro), margini laterali 40px desktop / 24px tablet / 18px mobile. Griglia servizi/reparti: `repeat(4, 1fr)` → 3 → 2 → 1 a 1024/768/480, gap sempre 18px, **zero varianza di span** (il "bento" è una griglia uniforme: azzera il costo di scansione, ed è ciò che permette densità alta senza affollamento).

**Sezioni giuntate a filo**: gap inter-sezione **0px** su tutte le fasce. Il ritmo verticale esiste solo come padding interno. Effetto: 15 blocchi si leggono come un documento continuo, non come una sequenza di moduli — è la premessa di tutta la densità.

**Pattern testa-respiro / corpo-denso**, otto volte. Ogni blocco denso è preceduto da una fascia di 266–434px che contiene 2–3 righe di testo e nient'altro. Padding strutturali: hero `168px` top (copre 40+80=120px di chrome fisso + 48 di aria), statement `128px` bottom, teste di sezione `96px` top, griglie `36px / 84px`, footer `72px` top.

**Allineamento, regola dura**: testa centrata se segue un nastro o un full-bleed; testa a **sinistra con 404px di vuoto a destra** se segue una griglia. Nessuna eccezione (Sharpify ha 2 casi su 8 e legge come incoerenza).

---

## 4. Il sistema "quadro" (la particella)

| Uso | Misura | Regola |
|---|---|---|
| Bullet di lista | 8px, r2px, `--c-accent-ink` | sostituisce il pallino in tutto il sito |
| Glifo di eyebrow | 12px, r2px, `--c-text-3` (arancio solo sulla sezione attiva) | `■ 02 / 04 — NOME REPARTO` |
| Progress in nav | 4 quadrati 7px, gap 3px, in salita | si accendono con `--ease-quadro` sui 4 atti della pagina |
| Mattone di colonna (4 in 1) | 16px, r2px, gap 4px, max 7 per colonna | il reparto è alto quanto il suo lavoro |
| Istogramma dei numeri | 14px, gap 4px, max 12 poi `×10` in mono | solo l'ultimo è arancione |
| Gradino di maschera | 4 gradini su 100% di larghezza | `clip-path: polygon()` interpolato via `@property` |
| Wipe di pagina | 4 step | `steps(4, end)`, 380ms |
| Loader (solo pagine interne) | 4 quadrati che si impilano | 4 × 90ms = 360ms, poi il contenuto |

**Tetto di nodi**: massimo 28 particelle-nodo per scena. Dove servono di più (istogrammi, colonne), un solo `<rect>` in `<symbol>` richiamato con `<use>`, oppure `background-image` a pattern ripetuto con `background-size` animato. Il DOM totale della home resta sotto 1.500 nodi.

---

## 5. Componenti (misure reali, stati completi)

### 5.1 Barra annuncio
`position:fixed; top:0; height:40px; z-index:9500; background:#3B2413; border-bottom:1px solid var(--c-border-hairline); box-shadow:var(--e-1)`. Interno flex gap 12px, padding `0 44px 0 20px`. Quadrato 8px `#FF8200` con `animation: q-pulse 1.6s ease infinite` (solo `box-shadow: 0 0 0 0 rgba(255,130,0,.7) → 0 0 0 7px rgba(255,130,0,0)`, **nessun transform**). Messaggio mono 13px `--c-text-2`; la data in `#FFD84D` 700; pill 12px/700 padding `6px 16px` r999 fill `#FF8200` testo `#0C0B0A` → hover `#E87300`. Degrado: `@860px` cade il tag, `@430px` cade la città. `html.ann-off body{padding-top:0}`.

### 5.2 Nav sticky
`fixed; top:40px; height:80px; background:transparent; transition: background var(--t-stato) var(--ease-scatto), backdrop-filter var(--t-stato), border-color var(--t-stato)`. Stato scrolled: `rgba(10,9,8,.94)` + `backdrop-filter:saturate(150%) blur(18px)` + hairline. **Isteresi obbligatoria**: attiva a 48px, disattiva a 12px (una soglia secca a 30px sfarfalla su trackpad e scroll-bounce mentre il backdrop transiziona).
Sequenza: mark 36px (con i 4 quadrati di progress) + wordmark → nav `margin-left:26px; gap:2px` → destra `margin-left:auto; gap:12px`.
Link nav: Red Hat Text 15px/500, padding `8px 14px`, r8px, `--c-text-2` → hover `--c-text-1` + `background: var(--c-surface-2)` + **underline wipe** 320ms (`background-size: 0% 1px → 100% 1px`, `background-position: left bottom`). Nessun transform in header (gerarchia di hover a due livelli: in header solo colore, in pagina colore + lift).
I tre elementi a destra sono **normalizzati a forza**: `height:40px; border-radius:999px; font:700 14px/1 var(--f-text); padding-block:0`. È il singolo intervento che fa sembrare la nav disegnata invece che assemblata.
`@1024px`: nav a `display:none`, burger, inner `height:64px`, fondo **opaco di default** (la trasparenza si rinuncia su mobile). Menu mobile: pannello a tutta altezza, voci 24px, ingresso 4 righe con stagger 64ms in mask reveal.

### 5.3 CTA — tre livelli, tutti pill
**Primario** (`.cta-1`, uno per schermata): `display:inline-flex; gap:10px; height:56px; padding:0 34px; border-radius:999px; background:#FF8200; color:#0C0B0A; font:700 17px/1 var(--f-text); box-shadow:var(--e-glow)`. Hover: `background:#E87300` (l'arancio **scurisce**, non si accende: non c'è headroom di gamut) + `--glow-halo → --glow-halo-strong` + `translateY(-2px)`, 200ms `--ease-salita`. Active: `translateY(0) scale(.985)`, 120ms. Focus: `outline:2px solid #FF8200; outline-offset:3px` su fondo scuro; su fondo arancione l'outline è `#0C0B0A`. Dentro il bottone, a destra, **un quadrato 8px** che al hover scatta di un gradino lungo la diagonale (`translate3d(3px,-2px,0)`): è la micro-firma, e vale più di un'icona freccia.
Sub-label mono 12px `--c-text-3` sempre sotto il primario: `FATTURATO 1–5 M€ · RISPOSTA IN 48 ORE LAVORATIVE`.
**Secondario outline**: `border:1px solid var(--c-border-ui)` (3,04:1, non hairline decorativa), bg trasparente, `color:var(--c-text-1)`, hover `background:var(--c-surface-2); border-color:var(--c-text-3)`.
**Terziario testuale**: `color:#FF8200` 500, hover `#FF9A38` + underline wipe. Mai sotto 15px.

### 5.4 Card-risultato (nastro prove)
274×366px (`aspect-ratio:3/4`), r20px, `overflow:hidden`, fotografia reale del cliente in `background-size:cover`. Scrim a 4 stop — è la tecnica chiave, fa il lavoro che di solito si affida al photo-editing: `linear-gradient(180deg, rgba(0,0,0,.28) 0%, rgba(0,0,0,.38) 40%, rgba(0,0,0,.60) 75%, rgba(0,0,0,.74) 100%)`.
Chip statistica 246×60, `background:rgba(0,0,0,.28); backdrop-filter:blur(2px); border:1px solid rgba(255,255,255,.70); border-radius:2px; padding:10px 12px; gap:12px`. Valore Red Hat Display 38px/700 `white-space:nowrap; flex-shrink:0`; label Red Hat Mono 12px/700 caps `+0.06em`. Rapporto 3:1 dentro 60px di altezza. **Niente `text-shadow`** (il bagliore da 2012 impasta i caps sopra la fotografia; il chip ha già vetro e hairline al 70%).
**Hover** (che Sharpify non ha): bordo a `rgba(255,255,255,.24)`, e in 200ms scende una riga di contesto mono 11px — `IMPIANTISTICA · 14 VENDITORI · CHIUSURA MEDIA 21 GIORNI`. Densità informativa in più, movimento in meno.
**Nastro**: track flex gap 18px, padding `40px 0`, contenuto clonato 1× per il loop, `mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)`.
Scala di prossimità **corretta** (Sharpify la ha invertita: centrale 0,841 contro 1,06 ai bordi): `t = max(0, 1 - |cx - vpCx| / (vpW*.45))`; `s = (vpW<=768 ? .96 + .07*t : .94 + .12*t)`; `opacity = .62 + .38*t`; `filter: blur(calc((1 - var(--t)) * 1.4px))` solo ai bordi; `z-index = t > .65 ? 2 : 1`. Il centro è un picco, non una valle.
Drag: `pointerdown/move/up` + `setPointerCapture`, soglia 18px, **axis-lock** (`if(|dx| < |dy|) return`), `touch-action: pan-y ↔ none`, click-guard 320ms in capture con `stopImmediatePropagation`, momentum al rilascio. Misure in cache, invalidate su resize debounced 80ms.
**Controllo di pausa visibile** in basso a destra del nastro (40×40, r999, `--c-border-ui`): due barrette / triangolo, `aria-pressed`. È SC 2.2.2, livello A: obbligatorio, non opzionale.

### 5.5 Card numero (a lente)
Wrapper 377×350, r12px, `overflow:hidden`, `padding:2px`, `background:rgba(59,36,19,.32)`. Dentro: `.blob` 250×280 `border-radius:50%; filter:blur(40px); z-index:-1; background:#8A4300`; `.inner` `backdrop-filter:blur(80px); background:rgba(20,14,10,.62); border:2px solid rgba(255,130,0,.28); border-radius:12px; padding:44px 30px; gap:16px`. Il bagliore esce dai 2px di feritoia e viene diffuso dal vetro: non è un `box-shadow`, è una lente.
Gerarchia interna a 5 livelli: (1) colonna di quadrati che si impila; (2) numero Red Hat Display 116px/700 `-0.045em` **bianco**, unità in span 42px `#FF8200`; (3) etichetta Red Hat Display 16px/600 caps `-0.32px` al 72%; (4) riga di contesto mono 12px al 50% — `su 33 settori diversi, dal 2020`; (5) micro-label mono 11px al 38% — `dato aggiornato a settembre 2026`. La monumentalità viene dal rapporto 116:11 dentro 350px, non dalla dimensione assoluta.

### 5.6 Colonna reparto (la scena pinnata)
Colonna 280px: indice mono 11px `01 / 04` → nome Red Hat Display 22px/700 → 7 mattoni 16px in salita (gap 4px) → descrizione Red Hat Text 15px/1.56 al 72% → sotto, la persona: ritratto 44px r999 + `GIULIA ELICIO · HR` in mono 11px. Handoff tra colonne: pill mono 11px su `--c-accent-veil`, `1 LEAD → `, che nasce dal quadrato in viaggio.

### 5.7 Case card
Full-bleed 1120px, r20px, griglia `1.1fr 1fr`: a sinistra fotografia con **maschera a scalinata**, a destra pannello `--c-surface-2` padding 48px. Contenuto: logo cliente h28px monocromatico al 60% → 100% in hover — mai `filter:invert()` + `mix-blend-mode` (si rompe con qualsiasi logo a colori: gli SVG monocromatici si chiedono a monte) → numero prima/dopo `DA 1,4 A 3,1 M€` 56px → riga dati mono 12px su 4 voci → citazione Instrument Serif 40px/1.28 → firma `Nome Cognome · Ruolo · Azienda` in mono 12px.

### 5.8 Form di candidatura
Campi: `height:56px; background:var(--c-surface-2); border:1px solid var(--c-border-ui); border-radius:2px; padding:0 16px; font:400 17px var(--f-text); color:var(--c-text-1)`. Label sopra, mono 12px caps al 50%. Focus: `border-color:#FF8200; box-shadow:0 0 0 3px rgba(255,130,0,.18)`. Errore: bordo `#CC3366`, testo `#FF9AB8` 15px + quadrato di stato — **mai solo colore**. Il fatturato si dichiara a fasce (`< 1 M€` / `1–3 M€` / `3–5 M€` / `> 5 M€`), e la fascia `< 1 M€` cambia in tempo reale il testo del bottone in `Iscriviti alla newsletter` con una riga di spiegazione onesta. Successo: il form collassa e i 4 quadrati si impilano una volta sola.

### 5.9 Fascia carta
`background:#F0EBE2; padding:34px 0 36px; overflow:hidden`. Label mono 11px `+0.18em` `#5C554B`, `margin-bottom:64px`. Marquee loghi press: `width:max-content; animation: carta-slide 52s linear infinite`, `translateX(0 → -50%)`, contenuto duplicato, `mask-image` con stop 7%/93%, pausa su hover **e focus-within**, `prefers-reduced-motion` → `animation:none` + `overflow-x:auto`. **Bilanciamento ottico per singolo logo** (override manuali di altezza 23–42px: l'altezza uguale non dà peso ottico uguale — questo è il dettaglio che separa un marquee curato da uno generico). Loghi in `#171310`, nessun blend mode. A destra, il certificato: `ISO 9001:2015 · ENTE · N. CERTIFICATO · SCADENZA` in mono 12px, linkato al PDF.

### 5.10 Footer
`background:#080706; padding:72px 40px 0`. `.top` grid `1.5fr 1fr 1fr 1.05fr 1fr`, gap 36px, `padding-bottom:60px`, `border-bottom:1px solid var(--c-border-hairline)`. Titoli colonna mono 11px `+0.10em` al 38%; link 15px al 50% → 100% con underline wipe 320ms; social 36×36 r8px `border:1px solid var(--c-border-ui)`, hover `border-color:#FF8200; background:var(--c-accent-veil)`. Bottom: mono 12px al 38% con ragione sociale, P.IVA, sede legale, ISO, privacy, cookie. Ultima riga: i 4 quadrati, tutti accesi.

---

## 6. Sequenza della home con copy reale

Vedi il campo `sectionFlow` per le 16 fasce con misure e funzione retorica. Curva: **promessa (13%) → prova (6%) → identità (5%) → problema (4%) → metodo (28%) → prova di scala (5%) → persone (8%) → prova nominale (12%) → energia (6%) → autorità (2%) → luogo (5%) → candidatura (6%)**. Rapporto prova:offerta ≈ 1,6:1 — è un sito che dimostra più di quanto propone, e la prova è **stratificata per tipo** (nominale, aggregata, umana, istituzionale, di community), mai la stessa due volte.

**Copy che non compare altrove nella spec:**
- Eyebrow di sezione: `■ 01 / 04 — PUBBLICITÀ` · `■ I NUMERI, NON LE PROMESSE` · `■ DAL 2020 — 33 SETTORI` · `■ CHI ENTRA, CHI NO` · `■ IL METODO HA UNA FACCIA` · `■ CERTIFICATI, VERIFICABILI`
- Headline alternative per l'hero (da testare A/B): *"Non ti vendiamo clienti. Ti costruiamo il reparto che li chiude."* / *"Quattro reparti. Un solo numero: il tuo fatturato."*
- Reparti: **01 Pubblicità** — "Compriamo attenzione dove i tuoi clienti sono già. Online e offline, con un budget che rendiconta ogni euro." · **02 Marketing a risposta diretta** — "Profiliamo ed educhiamo chi arriva, prima che parli con un venditore. Il venditore trova un interlocutore, non uno sconosciuto." · **03 Reclutamento** — "Selezioniamo i commerciali: annunci, colloqui, prove sul campo, inserimento. Restano tuoi." · **04 Formazione rete vendita** — "Script, affiancamento, numeri settimanali. Le performance non si alzano una volta: si mantengono."
- Handoff: `1 LEAD →` · `1 LEAD EDUCATO →` · `1 VENDITORE FORMATO →` · `FATTURATO`
- Stati vuoti (dove si gioca la credibilità perché nessuno ci guarda): quiz non idoneo → *"La tua azienda non rientra nei parametri di questo percorso. Non è un no per sempre: è un no per adesso. Ti mandiamo il podcast e ci riparliamo quando sei sopra il milione."* · eventi senza date → *"Nessuna serata in programma in questo momento. Le prossime date escono prima sulla newsletter che sul sito."* · form inviato → *"Candidatura ricevuta. La leggiamo noi, non un software. Ti rispondiamo entro 48 ore lavorative."* · 404 → *"Questa pagina non c'è. Il processo di vendita, invece, lo costruiamo. →"*

**Cosa il brand non dice mai**: soluzioni innovative, sinergie, a 360 gradi, growth hacking, brand awareness, storytelling, scalare il business, book a demo, get started, `$`, "crediamo che", "la nostra passione", "garantiamo il risultato", "rivoluzionario", "segreto", countdown finti, "solo per oggi". La scarsità si dichiara come **fatto strutturale** (30 sedie in sala, 4 aziende accettate al mese), mai come pressione temporale.

---

## 7. Motion: implementazione delle due scene

### 7.1 Il layer di base (70% della pagina, zero JS)
```css
@keyframes salita{
  from{ opacity:0; translate: var(--dx) var(--dy); }
  to  { opacity:1; translate: 0 0; }
}
.materia{
  animation: salita linear both;
  animation-timeline: view();
  animation-range: entry 12% cover 38%;
}
.materia:nth-child(n){ animation-delay: calc(var(--i,0) * var(--stagger)); }

/* il testo NON usa la diagonale */
.riga{ display:block; overflow:clip; }
.riga > span{
  display:block;
  animation: risalita var(--t-reveal) var(--ease-salita) both;
}
@keyframes risalita{ from{ translate:0 101%; } to{ translate:0 0; } }

@supports not (animation-timeline: view()){
  .materia{ opacity:1; translate:none; }   /* poi IntersectionObserver, threshold .14, unobserve */
}
```
Failsafe temporale come rete di sicurezza: `setTimeout(() => document.querySelectorAll('.materia:not(.is-in)').forEach(e => e.classList.add('is-in')), 3000)`. Il contenuto non resta mai invisibile.

### 7.2 La firma (scrub tipografico)
```js
gsap.registerPlugin(ScrollTrigger, SplitText);
const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {
  const s = SplitText.create("#firma .riga", { type:"chars", aria:"auto", autoSplit:true });
  const tl = gsap.timeline({ scrollTrigger:{
    trigger:"#firma", start:"top 78%", end:"+=72%", scrub:.55, refreshPriority:-1
  }});
  tl.to(s.chars, { color:"#FFFFFF", stagger:.055, duration:.3, ease:"none" }, 0)
    .to(s.chars.filter(c => c.closest(".riga-3")), { color:"#FF8200", stagger:.055, duration:.3, ease:"none" }, 0)
    .to("#firma", { "--wght":800, duration:1, ease:"none" }, 0);
  return () => { tl.kill(); s.revert(); };
});
mm.add("(prefers-reduced-motion: reduce)", () => {
  gsap.set("#firma .riga", { color:"#FFFFFF" });
  gsap.set("#firma .riga-3", { color:"#FF8200" });
});
document.fonts.ready.then(() => ScrollTrigger.refresh());
```
648px di corsa, 27 caratteri, **24px di scroll per carattere**, fronte d'onda ~3 caratteri. Il testo parte già leggibile al 10% di bianco: il motion aggiunge enfasi, non informazione.

### 7.3 La macchina (l'unico pin)
```js
mm.add("(min-width:1024px) and (prefers-reduced-motion: no-preference)", () => {
  const tl = gsap.timeline({ scrollTrigger:{
    trigger:"#metodo", start:"top top", end:"+=260%",
    pin:true, pinSpacing:true, anticipatePin:1, scrub:.6,
    invalidateOnRefresh:true, fastScrollEnd:true
  }});
  // beat 0 — il contro-esempio: i passaggi cadono
  tl.to(".handoff", { y:"+=220", rotate:-8, opacity:0, stagger:.05, ease:"power1.in", duration:.6 })
  // beat 1 — le colonne si agganciano
    .to(".colonna", { x:0, duration:.4, ease:"none" })
    .set(".gap-vuoto", { display:"none" })
  // beat 2..5 — ogni reparto si impila, ogni handoff viaggia sulla diagonale
    .from(".col-1 .mattone", { yPercent:120, opacity:0, stagger:.06, ease:"none", duration:.5 })
    .fromTo(".handoff-1", { x:0, y:0, opacity:0 }, { x:262, y:-162, opacity:1, ease:"none", duration:.5 })
    /* ... 2, 3, 4 ... */
    .from(".uscita-fatturato", { scale:.6, opacity:0, ease:"none", duration:.4 });
  return () => tl.kill();
});
```
`262 / -162` è la diagonale: `tan(31,72°) = 0,618`. Ogni handoff percorre lo stesso angolo di ogni altra cosa nel sito.
Mobile: 4 blocchi in scroll nativo, ciascuno con `animation-timeline: view()`; `ScrollTrigger.config({ limitCallbacks:true, ignoreMobileResize:true })`.

### 7.4 Regole di igiene
`will-change` aggiunto in `onStart` e **rimosso** in `onComplete` / `transitionend`. `content-visibility:auto; contain-intrinsic-size:auto 800px` su tutte le sezioni sotto la piega **tranne** quella pinnata (altera i calcoli di start/end). `contain: layout paint` sulle sezioni indipendenti. Ogni scena è un chunk caricato da IntersectionObserver con `rootMargin:"300px 0px"`. `gsap.globalTimeline.pause()` su `visibilitychange`. Loop ambient in pausa fuori viewport.

---

## 8. Accessibilità e conformità

- Focus ring `2px solid #FF8200`, offset 3px: 7,91:1 su base, l'unico colore della palette che passa SC 1.4.11 senza sforzo.
- `--c-border-ui` a 0.34 (3,04:1) su ogni elemento interattivo; le hairline a 0.10 restano **decorative** e nessun componente dipende solo da esse.
- Nessun token di testo sotto α 0.38, e quel gradino dichiara "SOLO ≥24px".
- SplitText con `aria:"auto"` (aria-label sul parent, aria-hidden sugli span) e **non eseguito** in reduced-motion.
- SC 2.2.2: controllo di pausa reale e visibile su nastro prove e marquee del payoff, non solo hover.
- SC 2.3.1: nessun flash oltre 3/s (il quadrato pulsante è a 0,625 Hz).
- Durante la scena pinnata: navigazione da sola tastiera testata, focus sempre visibile e dentro il viewport, Esc che salta la sezione (`skip-link` "Salta il metodo →").
- Rispetto gratuito di `prefers-reduced-transparency` (via i `backdrop-filter`), `prefers-contrast` (bordi a 0.34 → 0.55), `(update: slow)` e `Save-Data` (nessuna scena scrubbata).
- Test: DevTools → Rendering → Emulate prefers-reduced-motion; VoiceOver/NVDA sull'H1 splittato; hardware reale (un Android di fascia media + iPhone SE) con throttling 4G.

---

## 9. Stack e piano

**Astro statico + GSAP 3.13 + Storyblok** (o Sanity se contano più la modellazione dei case study e il costo). Output HTML su CDN, TTFB 30–80ms, zero JS di framework per default, `astro:assets` per AVIF/WebP responsive, content collections con schema Zod: **la build fallisce se manca un campo**, invece di pubblicare una card rotta. Next.js non aggiungerebbe nulla di visivo e costerebbe ~90KB gz di hydration; WordPress + Elementor ha un tetto reale intorno a 7/10 e non regge né il budget di nodi né le View Transitions cross-document.

**Editabilità consegnata come sistema di sezioni, non come pagina.** Blocchi tipizzati con vincoli: `hero{ eyebrow ≤28ch, title ≤60ch, cta_label ≤24ch }`, `nastro_prove{ items[4..16]{ logo, valore, unità(enum), label ≤32ch, contesto ≤48ch } }`, `numeri{ items[3..3] }`, `metodo{ steps[4..4] }`, `case{ settore, fatturato_prima, fatturato_dopo, mesi, quote 80..260ch, liberatoria:bool }`. I vincoli **sono il prodotto**: è precisamente ciò che manca in Elementor, dove tutto è possibile e quindi tutto degrada. Al cliente **non** si danno in mano: parametri di motion, colori, tipografia, ordine delle sezioni, numero di CTA per pagina. Se serve flessibilità si espone come varianti preimpostate.

**Fasi.** (0) Riparazione e bonifica: 404 su /risorse/ e /politica-di-qualita/, articolo con corpo vuoto, slug /team-2/ → /team/, LinkedIn `insider-crew` e "2-10 dipendenti", claim senza fonte. (1) Riconciliazione dei numeri: un documento unico di fonte, un numero per concetto, data di aggiornamento visibile. (2) Raccolta dataset e liberatorie. (3) Design system + le due scene in prototipo isolato, misurate su hardware reale. (4) Build. (5) Migrazione SEO con redirect 1:1 e 60 giorni di monitoraggio Search Console. (6) Consegna umana: un Loom per ruolo, un documento di due pagine, 30–60 giorni di supporto.

---

## 10. Bloccanti da chiedere al cliente prima di animare qualsiasi cosa

1. **Riconciliare i numeri**: 150 vs +800 imprenditori vs +1.100 partecipanti; 20 vs 30 vs 34 persone; 6 mesi vs 9/12 mesi; +40-100% vs X2-X5. Servono tre etichette distinte (clienti paganti / partecipanti eventi / lead) e una data di aggiornamento.
2. **8–12 card-risultato** con logo, settore, fatturato prima, fatturato dopo, mesi, e **liberatoria scritta**. Senza questo il nastro anima il vuoto.
3. Per i cinque nomi già sul sito (Straniero, Mabiglia, Scuderi, Cianflone, Petrazzuolo): dati reali o rimozione. Le testimonianze con testo placeholder identico ripetuto vanno giù **subito**, non al lancio.
4. **Retention / durata media del rapporto in mesi**: è il numero che manca e che discrimina un'agenzia da un venditore di corsi. Se è buono, va per primo.
5. Candidature ricevute vs accettate al mese: rende **vera** la selettività, che oggi senza criterio suona come posa.
6. Certificazione: norma esatta, ente, numero, scopo, scadenza. È l'asset più sottosfruttato del brand, e la pagina che dovrebbe ospitarlo dà 404.
7. Ragione sociale, P.IVA, forma societaria, anno: per l'imprenditore italiano il footer con la P.IVA è un controllo di esistenza.
8. Fotografia dell'ufficio di Via Marco D'Agrate e delle persone al lavoro; estensione della serie mano-su-nero-con-oggetto-arancione (cuffie = podcast, telefono = appuntamento, badge = reclutamento, calcolatrice = numeri, chiave = delega): **un oggetto per reparto, sostituiscono le icone**.
9. Ritratti clienti ad alta risoluzione: meglio 6 grandi che 30 da 300×300.
10. Fonte del claim "-50% rischio di fallimento / -80% esaurire la cassa", o si elimina: in una sezione-numeri credibile un dato senza fonte contamina quelli con fonte.

---

## 11. Definition of done (QA prima del lancio)

- [ ] `ScrollTrigger.getAll().length ≤ 3` e `document.querySelectorAll('.pin-spacer').length === 1`
- [ ] Sopra la piega girano ≤ 3 animazioni; l'elemento LCP è testo e non è gated da JS
- [ ] LCP < 1,8s / INP < 100ms / CLS 0,00 su Moto G + 4G throttled, misurati con `web-vitals` sul campo, non solo Lighthouse
- [ ] `document.querySelectorAll('*').length < 1500`
- [ ] Zero `will-change` residui a riposo; zero `backdrop-filter` in animazione; zero animazioni di proprietà di layout
- [ ] Reduced-motion: nessuno scrub, nessun pin, nessun rAF, nastri scrollabili a mano, tutto raggiungibile
- [ ] Solo tastiera: intera pagina navigabile, focus sempre visibile, pin attraversabile, skip-link funzionante
- [ ] Nessun testo bianco su fill arancione in nessuno stato; nessun arancio sotto 15px; nessun arancio come testo sulla fascia carta
- [ ] Un solo font family per ruolo, 4 file WOFF2, nessun Nunito/Montserrat/Roboto residuo
- [ ] **Test dello screenshot**: ogni sezione, immobile, funziona come manifesto. Se una sezione ha bisogno del motion per essere bella, il motion sta coprendo un problema di gerarchia — e va risolta la gerarchia.
- [ ] Test con 5 imprenditori reali del target (1–5 M€, desktop Windows, rotella): capiscono l'offerta in 20 secondi e trovano il criterio di candidatura senza cercarlo.
