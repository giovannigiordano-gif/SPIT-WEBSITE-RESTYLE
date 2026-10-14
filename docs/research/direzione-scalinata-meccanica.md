# Direzione: SCALINATA MECCANICA

**Concept.** Il sito non è una vetrina: è il quadro di comando di un impianto che produce fatturato. La struttura è dichiarata invece di essere nascosta — telaio a 4 macro-colonne visibile (una per reparto), sezioni numerate con cartiglio da disegno tecnico, dati in monospace come su uno strumento di misura — e la tipografia è portata a dimensioni murali con interlinea compressa, fino a diventare architettura. L'arancio #FF8200 smette di essere "il colore del brand" e diventa segnaletica di sicurezza: appare solo dove si agisce, dove si misura o dove si passa un pezzo da un reparto all'altro. Il wow non arriva da effetti aggiunti, arriva da due cose: la violenza del carattere e la precisione meccanica del movimento — niente galleggia, tutto scatta in posizione e si blocca.

**Perche calza.** RISPETTA IL DNA. (1) L'arancio e il nero restano il cuore, ma con il ruolo che l'analisi tecnica impone: #FF8200 ha zero headroom di gamut (a +0,02 L esce da sRGB) e con testo bianco dà 2,49:1, mentre come inchiostro su nero caldo #0C0B0A dà 7,91:1 (AAA) e con testo nero sopra 8,45:1. Il registro "segnaletica industriale" è l'unico che usa l'arancio esattamente dove è matematicamente forte — piastre di comando, righe di quota, numeri, focus ring — e lo tiene fuori dalle superfici tinte, dove collasserebbe in marrone (#402915 a alpha 0.18). (2) Il mark a scalinata non è conservato, è promosso a sistema: il quadrato singolo diventa il bullet, i 4 quadrati in salita diventano l'indicatore di reparto (l'n-esimo acceso), il passo diagonale del logo diventa l'unico angolo del brand, e i 4 quadrati sono la ragione per cui il telaio ha 4 macro-colonne e non 3 o 5. (3) FATTURARE FATTURARE FATTURARE passa da riga di testo a due cose insieme: nastro-timbro a piena larghezza in caps compressi (la ripetizione è nativa del marquee) e nome del contenitore editoriale del sito. (4) Il metodo 4 in 1 diventa il motore architetturale: numerazione REPARTO 01/04 in tutte le eyebrow, 4 macro-colonne, e l'unica scena pinnata della pagina è la catena dei 3 passaggi di consegna — cioè il vero argomento di vendita, che oggi nessun competitor sta dicendo e che nel sito attuale sono 4 iconcine Elementor. (5) Il CTA resta selettivo e porta sempre il criterio accanto ("FATTURATO 1–5 M€ · NO START-UP · RISPOSTA IN 48 ORE"): la selettività senza criterio dichiarato è posa, con il criterio è serietà. (6) Copy interamente in italiano, lessico contabile (fatturato, cassa, margine, reparto, passaggio di consegna), zero inglesismi da SaaS, zero simbolo $.

SODDISFA LA RICHIESTA DEL CLIENTE. "Stile Sharpify" viene onorato dove conta — un solo fondo scurissimo su circa il 92% della pagina, gerarchia costruita su alpha di bianco invece che su una palette, bordi hairline, densità informativa altissima, una sola banda chiara come rottura di valore, una sola formula di testa-sezione ripetuta, un solo elemento scrubbato — ma la pelle è diversa in ogni punto verificabile: non near-black freddo ma nero caldo, non verde menta ma arancio-segnaletica, non DM Sans ma Red Hat Display (già di marca) più Archivo compressa e IBM Plex Mono, non eyebrow tra parentesi quadre ma cartiglio numerato da disegno tecnico, non card a vetro con blob sfocato ma targhe a spigolo vivo, e — decisione più radicale — non pill: in tutto il sito il raggio è 0, il CTA è una piastra rettangolare. Chi conosce Sharpify riconosce il rigore, non il sito.

"MOLTO ANIMATO, FORTE E POTENTE" senza carnevale: 6 momenti-firma, un solo pin, un solo scrub, un solo easing di reveal, un solo asse — la sensazione di "molto animato" arriva dal fatto che ogni singolo elemento risponde (cambio di stato a 160-200ms su bordo, riga arancione, variazione di peso del font), non dal fatto che tutto si muove. E "faccia dire wow": il muro tipografico da 152px che si stampa con il peso variabile che si comprime, il nastro FATTURARE che si restringe quando lo scroll accelera, la catena dei 3 handoff che si disegna sotto gli occhi. Tutto misurato: sotto la piega girano al massimo 3 animazioni, LCP target < 1,8s.

**Palette.** FONDI
#0C0B0A  base canonica — near-black CALDO (R12 > B10). Scelta deliberatamente opposta al #161519 freddo di Sharpify: un fondo freddo sotto un accento caldo eccita l'arancio e produce l'alone da energy-drink; un fondo caldo lo smorza. Copre circa il 92% della pagina.
#000000  solo dietro fotografia full-bleed e nel duotone (mai come fondo di sezione: su OLED azzera i bordi hairline).
--sup-1  rgba(255,255,255,0.035) -> #151413 (CR 1.07) superficie di sezione
--sup-2  rgba(255,255,255,0.060) -> #1B1A19 (CR 1.13) targhe, schede, fascicoli
--sup-3  rgba(255,255,255,0.090) -> #222120 (CR 1.22) stato hover/attivo delle stesse
#EAE6DC  CARTA TECNICA — unica banda chiara del sito (una sola, circa 200px su circa 7.800: 2,5%). Nero su carta 15,78:1.

BORDI (tre step, per ruolo, non sei)
rgba(255,255,255,0.10) -> #242323 (1,25:1) hairline DECORATIVA — telaio, divisori, cornici foto. Mai unico confine di un elemento cliccabile.
rgba(255,255,255,0.18) -> #383736 (1,66:1) hairline forte — bordo di targa a riposo.
rgba(255,255,255,0.34) -> #5F5E5D (3,04:1) BORDO UI — obbligatorio su tutto ciò che è interattivo: soddisfa WCAG SC 1.4.11 (>=3,0:1), che i bordi di Sharpify (1,19-1,51:1) non soddisfano.
rgba(255,255,255,0.055) -> #191817 (1,11:1) linee del telaio a 4 macro-colonne (deve essere quasi invisibile: si sente, non si guarda).

TESTO (quattro step, non diciotto)
#FFFFFF                 19,67:1 AAA — display, numeri
rgba(255,255,255,0.72)  #BBBBBA 10,24:1 AAA — corpo
rgba(255,255,255,0.50)  #868585  5,34:1 AA  — meta, label, dati secondari
rgba(255,255,255,0.38)  #686867  3,53:1     — SOLO >=24px. Sotto 0,38 non esiste alcun token (Sharpify usa 0,30 = 2,69:1, che fallisce sempre).

ACCENTO — famiglia a 5 livelli, come il verde di Sharpify è una famiglia e non un colore
#FF8200 ACCENTO/INCHIOSTRO   7,91:1 su base · nero sopra 8,45:1 — il brand. Piastre CTA, righe di quota, numeri-unità, quadrato acceso del mark, focus ring, passaggi di consegna.
#FF9A38 ACCENTO/CALDO        9,30:1 — SOLO hover di link testuali. È arancio desaturato verso il giallo: mai come fill, o diventa un altro brand.
#E87300 ACCENTO/PROFONDO     6,45:1 · nero sopra 6,88:1 — hover della piastra piena. L'hover scende, non sale: da #FF8200 non esiste "più brillante" dentro sRGB.
#B85B00 PIVOT                nero 4,53 / bianco 4,63 — punto di pareggio. Sopra questa luminanza il testo va NERO, sotto va bianco. Nessun arancio si usa senza aver controllato da che parte del pivot sta.
#8A4300 RUGGINE              2,70:1 su base (mai testo su nero) MA 5,84:1 su carta #EAE6DC — è l'unico "arancio" ammesso come testo nella banda chiara, perché #FF8200 su carta dà 2,00:1 e non passa nemmeno come large text.
#3B2413 VELO CALDO           1,36:1 — superficie calda dichiarata come colore OPACO, non come alpha, così nessuno la scala per sbaglio e non si produce fango.

GLOW (usato in un solo punto della pagina: la piastra CTA dell'hero)
--glow-core rgba(255,255,255,0.90) nucleo BIANCO stretto + --glow-halo rgba(255,130,0,0.30) aureola larga. Verificato: arancio@0.30 diretto su base atterra su #542E08 (marrone); sopra un nucleo bianco@0.55 atterra su #B28D66 (caldo, non fangoso). Il nucleo bianco non è un vezzo, è ciò che tiene il glow luminoso.

SEMANTICI — hue separate dal brand, perché l'accento arancione divora lo slot "warning"
#FFD84D warning  14,22:1 · nero sopra 15,18 — giallo puro, non ambra (l'ambra sta a 20 gradi di hue dal brand e non si distingue)
#CC3366 danger/rottura 3,96:1 — legittimato dal DOM esistente. NON testo normale su nero: si usa come riga da 2px (>=3,0 per elementi non testuali) o come fill con testo bianco (4,96:1). È il colore dei tre passaggi di consegna che si rompono nel contro-esempio.
#4ADE80 success 11,29:1
#7AA2FF info    7,90:1
Nessuno stato è mai solo-colore: sempre colore + glifo + parola (WCAG 1.4.1).

BUDGET D'AREA: l'arancio occupa al massimo il 3% dei pixel di ogni viewport, un solo elemento arancione dominante per schermata (due è il massimo tollerato). Regola pratica: se l'arancio non è cliccabile, non è un numero e non è un passaggio di consegna, è sbagliato.

**Tipografia.** TRE FAMIGLIE, TRE MESTIERI MECCANICI (nessun residuo: fuori Nunito, Montserrat, Roboto, Roboto Slab)

1) RED HAT DISPLAY Variable (Google Fonts, wght 300-900) — la voce del brand, già dominante su 164 nodi del sito attuale. Fa display, titoli e corpo. È geometrico-industriale: regge il tracking negativo estremo meglio di un umanista, ed essendo variabile abilita il momento-firma dell'hero (animazione dell'asse wght).
2) ARCHIVO Variable (Google Fonts, wght 100-900, wdth 62-125) — la SEGNALETICA. Solo caps, solo compressa (wdth 75-88). Tre soli usi in tutto il sito: il nastro FATTURARE, le fasce di avviso/evento, le label da 13px sopra le fotografie. Archivo è disegnato per stampa e segnaletica ad alte prestazioni: è il carattere giusto per un timbro. Subset con pyftsubset ai soli A-Z 0-9 e punteggiatura -> circa 18KB woff2.
3) IBM PLEX MONO 400/500 (Google Fonts) — la STRUMENTAZIONE. Numerazione delle sezioni, cartigli, eyebrow, tabelle dati, unità di misura, targhe, footer, date di aggiornamento, SLA. È il carattere di IBM: legge "macchina misurata", non "terminale crypto", purché non lo si usi mai per il corpo del testo né per i numeroni (che restano Red Hat 900).

Budget font: 3 file variabili/statici woff2, subset latin+latin-ext, preload dei soli due che servono sopra la piega (Red Hat Display, IBM Plex Mono). Totale <= 118KB. font-display: swap, e sul @font-face di fallback size-adjust/ascent-override calibrati per CLS 0.

SCALA (clamp reali, viewport 360 -> 1440)
--t-muro     Red Hat Display 900 · clamp(52px, 10.6vw, 152px) · lh 0.88 · tracking -0.045em   (H1 hero, 3 righe)
--t-display1 Red Hat Display 800 · clamp(40px, 6.4vw,  96px) · lh 0.94 · tracking -0.040em   (teste di sezione)
--t-display2 Red Hat Display 800 · clamp(32px, 4.2vw,  60px) · lh 1.02 · tracking -0.035em   (statement, contro-esempio)
--t-numero   Red Hat Display 900 · clamp(56px, 8.8vw, 128px) · lh 0.86 · tracking -0.045em · font-variant-numeric: tabular-nums  (targhe numeriche)
--t-titolo1  Red Hat Display 700 · 28px · lh 1.15 · tracking -0.020em
--t-titolo2  Red Hat Display 700 · 20px · lh 1.30 · tracking -0.010em
--t-corpo-lg Red Hat Display 400 · 20px · lh 1.55 · tracking -0.010em · max 46ch
--t-corpo    Red Hat Display 400 · 17px · lh 1.62 · tracking -0.010em · max 62ch
--t-meta     IBM Plex Mono 400 · 13px · lh 1.45 · tracking +0.040em
--t-dato     IBM Plex Mono 500 · 15px · lh 1.40 · tracking +0.020em · tabular-nums
--t-eyebrow  IBM Plex Mono 500 · 11px · lh 1.20 · tracking +0.140em · UPPERCASE
--t-segnale  Archivo 800 wdth 78 · 13px · tracking +0.180em · UPPERCASE  (label su fotografia, fasce avviso)
--t-timbro   Archivo 800 wdth 78 · clamp(56px, 9vw, 140px) · lh 0.92 · tracking +0.020em · UPPERCASE  (nastro FATTURARE)

LA LEGGE DEL TRACKING — tre plateau con inversione di segno tra 15 e 17px, sei token e basta:
--tr-timbro  +0.020em  (caps enormi compressi: il tracking positivo grande spezzerebbe il timbro)
--tr-eyebrow +0.140em  (<=12px UPPERCASE)
--tr-meta    +0.040em  (13-14px)
--tr-dato    +0.020em  (15-16px, banda di inversione)
--tr-corpo   -0.010em  (17-23px)
--tr-display -0.040em  (>=32px: PLATEAU PIATTO. Non è una curva: da 40px a 152px il valore in em non cambia. Molti sistemi inseguono una funzione continua che non esiste.)
Rapporto display:eyebrow = 152:11 ~= 14:1. È questa ampiezza che permette all'11px di restare davvero 11px senza competere.

REGOLE DURE
- Arancio come testo mai sotto 15px e mai sotto peso 500: #FF8200 ha il canale blu a 0, l'aberrazione cromatica dell'occhio è massima e l'alone divora le aste sottili. L'eyebrow arancione da 10px è il peggior uso possibile: le eyebrow sono bianco@0.50, l'arancio sta sulla parola-chiave del display.
- Una sola parola in arancio per headline. Una sola parola in caps enfatico per blocco di testo, e solo dal lessico core (ZERO, FATTURATO, 4 IN 1).
- Numeri sempre tabular-nums + min-inline-size in ch: nessun count-up può muovere il layout.
- Nessun corsivo in tutto il sito. Nessun peso 300. Il contrappunto serif di Sharpify (Editorial Old) qui non entra: in una direzione industriale il contrappunto è la monospace, e c'è già.

## Flusso sezioni

- 00 — BARRA DI STATO (fixed, 36px, fondo #3B2413 velo caldo, hairline bassa). Funzione: dichiarare che l'impianto è in funzione, con una data. Tutto in IBM Plex Mono 11px +0.14em. Contenuto: quadrato arancione 6px che pulsa (2s, solo box-shadow) + 'SALES PROCESS DAY · MILANO · 14.11.2026 · 30 POSTI' + piastra arancione 24px 'PRENDI UN POSTO' + X di chiusura a destra. Sotto 860px cade la citta, sotto 430px cade la data. Urgenza datata, mai countdown.
- 01 — NAV STICKY (72px, hairline bassa, trasparente -> #0C0B0A@0.92 + backdrop blur 16px allo scroll, isteresi 48px/12px per non sfarfallare). Funzione: dare al sito una struttura che oggi non ha (hamburger + un CTA su 4.363px). Mark a scalinata 28px + wordmark; 4 voci (Metodo · Risultati · Chi siamo · Eventi) perche i reparti sono 4; a destra piastra arancione 'CANDIDA LA TUA AZIENDA'. Le voci non hanno underline animato: cambiano da bianco@0.72 a bianco pieno e accendono una riga arancione 2px sotto, 160ms.
- 02 — HERO / IL MURO (colonne 1-8 il testo, 9-12 la targa dati, altezza tale che 88px del nastro di prova restino visibili a 1440x900: la prova entra prima della piega). Funzione: una sola promessa, in caratteri murali. Eyebrow mono: '■ 04 REPARTI · UN SOLO TETTO · DAL 2020'. H1 su 3 righe: 'NON TI PORTIAMO I CLIENTI. TI COSTRUIAMO IL REPARTO CHE LI CHIUDE.' con CHIUDE in #FF8200. Deck 20px bianco@0.72, 46ch: 'Pubblicita, marketing a risposta diretta, reclutamento e formazione della rete vendita. Quattro reparti sotto lo stesso tetto e un numero solo da guardare: il tuo fatturato.' Piastra primaria 'CANDIDA LA TUA AZIENDA' + sotto-label mono 'FATTURATO 1-5 M€ · NO START-UP · RISPOSTA IN 48 ORE LAVORATIVE'; piastra secondaria fantasma 'VEDI COME FUNZIONA IL 4 IN 1'. A destra la TARGA DI IDENTIFICAZIONE (vedi spec) e, tagliata a filo delle colonne, la foto mano-che-tiene-la-penna in duotone nero/#FF8200.
- 03 — NASTRO DI PROVA (schede risultato, 460px, dentro l'hero, scroll orizzontale automatico 60px/s delta-time, afferrabile, pausa su hover/focus). Funzione: la prova prima dell'offerta, e la prova nominale che l'imprenditore italiano cerca (chi, dove, quanto, in quanto tempo). Ogni scheda: foto duotone + logo cliente + numero Red Hat 900 + label Archivo caps + riga mono di contesto. Esempi: 'DA 1,4 A 3,1 M€ IN 11 MESI · IMPIANTISTICA', '12 VENDITORI RECLUTATI IN 90 GIORNI · SERRAMENTI', '+180% APPUNTAMENTI IN 4 MESI · SERVIZI B2B'. Correzione al difetto di Sharpify: la scala di prossimita e invertita nel loro codice (card centrale 0,841, laterali 1,06); qui s = 0.84 + 0.22t con opacity 0.55->1 e blur(1.2px) sui bordi = profondita di campo reale.
- 04 — STATEMENT DI POSIZIONAMENTO (403px, colonne 2-11, 128px di padding inferiore: il respiro piu grande della pagina). Funzione: chi siamo in una frase, e l'unico elemento scrubbato del sito. Testo display2: 'Non ti vendiamo pubblicita. Ti consegniamo un reparto che produce fatturato.' Le parole passano da bianco@0.12 a bianco pieno su 720px di scroll; l'ultima parola arriva a #FF8200 e a progress 1 si disegna sotto una riga arancione da 2px.
- 05 — IL CONTRO-ESEMPIO (fondo #0C0B0A, telaio visibile piu marcato). Funzione: creare il problema prima di vendere la soluzione. E il contenuto piu persuasivo disponibile e oggi non esiste sul sito. Testa: 'QUATTRO FORNITORI. TRE ROTTURE.' Diagramma a 4 blocchi in fila con i tre connettori interrotti, tratteggiati in #CC3366 e marcati con un glifo di rottura + mono 'PASSAGGIO PERSO'. Corpo: 'L'agenzia porta i lead. Il consulente forma i venditori. Il recruiter ne trova altri due. Nessuno dei tre risponde del tuo fatturato. Ogni passaggio di consegna che si rompe e un lead che hai pagato due volte.'
- 06 — IL METODO 4 IN 1 (unica scena PINNATA della pagina, end +=280%, solo >=1024px). Funzione: trasformare lo schema in meccanismo. Cartiglio: '[ 06 ] METODO 4 IN 1 — 4 REPARTI, 3 PASSAGGI DI CONSEGNA'. I quattro reparti entrano uno per uno nella propria macro-colonna: 01 PUBBLICITA 'Compriamo attenzione dove il tuo cliente e gia.' -> LEAD GREZZO · SLA 24H; 02 MARKETING A RISPOSTA DIRETTA 'Profiliamo ed educhiamo chi arriva dalla pubblicita.' -> LEAD PROFILATO · SLA 24H; 03 RECLUTAMENTO 'Selezioniamo le figure commerciali che chiudono.' -> VENDITORE IN AULA · SLA 72H; 04 FORMAZIONE RETE VENDITA 'Teniamo alte le performance, ogni settimana.' -> TRATTATIVA CHIUSA. I tre connettori si disegnano in arancio (stroke-dashoffset scrubbato) e alla fine i 4 quadrati del mark si accendono dal basso.
- 07 — I NUMERI (3 targhe, colonne 1-4 / 5-8 / 9-12, gutter 24px). Funzione: prova di scala, ma sempre con la data di aggiornamento accanto, perche in Italia i numeri si confrontano tra pagine. Cartiglio: '[ 07 ] I NUMERI, NON LE PROMESSE'. Targa 1: '150+' / 'IMPRENDITORI SERVITI' / 'in 33 settori, dal 2020'. Targa 2: '750' / 'PROCESSI DI VENDITA REALIZZATI' / 'fonte: archivio interno'. Targa 3: '34' / 'PERSONE NEI 4 REPARTI' / 'in sede a Milano'. Riga mono comune sotto le tre targhe: 'DATI AGGIORNATI AL 09/2026 · UN SOLO NUMERO PER CONCETTO SU TUTTE LE NOSTRE PROPRIETA'.
- 08 — I REPARTI SONO PERSONE (4 macro-colonne, una per reparto, ritratti in duotone a spigolo vivo con targhetta mono). Funzione: qui SalesProcess deve fare l'opposto di Sharpify. Sharpify puo essere un'entita senza volti perche vende software-like; qui il prodotto sono persone che entrano in azienda, e il compratore italiano di PMI compra dalla faccia. Ogni volto e legato al suo reparto: media buyer sotto PUBBLICITA, copywriter sotto MARKETING A RISPOSTA DIRETTA, HR sotto RECLUTAMENTO, sales coach sotto FORMAZIONE. Testa: 'IL REPARTO NON E UNO SCHEMA. SONO QUESTE PERSONE.'
- 09 — NASTRO PAYOFF (full-bleed, 2 righe, hairline sopra e sotto, con pulsante di pausa visibile). Funzione: la firma. Riga 1 in Archivo compressa 800 arancio pieno che scorre a sinistra: 'FATTURARE · FATTURARE · FATTURARE ·'. Riga 2 in contro-direzione, stesso carattere in solo contorno (-webkit-text-stroke 1px rgba(255,255,255,.22), colore trasparente). Quando lo scroll accelera, il nastro accelera e l'asse wdth di Archivo si stringe da 88 a 75: il carattere si comprime quando la macchina va piu veloce.
- 10 — I FASCICOLI (3 casi studio a spigolo vivo, colonne 1-4/5-8/9-12). Funzione: la prova nominale che vale piu di dieci testimonianze. Ogni fascicolo ha un cartiglio proprio: 'FASCICOLO 01 · IMPIANTISTICA · 11 MESI', due colonne mono PRIMA/DOPO con i numeri in Red Hat 900, l'elenco di cosa e stato fatto reparto per reparto, e una citazione con nome, azienda e ruolo. Nessuna testimonianza senza numero e liberatoria: la sezione non esiste finche i testi veri non arrivano (il sito attuale ripete la stessa frase placeholder sotto cinque nomi reali).
- 11 — BANDA CARTA TECNICA (#EAE6DC, circa 200px, unica rottura di valore del sito: 2,5% della pagina). Funzione: prova istituzionale, il vantaggio italiano che Sharpify non ha. Label Archivo caps #8A4300 'CERTIFICATI, ISCRITTI, CITATI'; riga di loghi stampa monocromatici (SVG forniti a monte, non filter:invert) con mask-image che li dissolve al 7% e al 93%; e a destra, in mono nero, il blocco verificabile: 'ISO 9001:2015 · CERT. N. [da cliente] · ENTE IMQ · SCADENZA [da cliente]'.
- 12 — FATTURARE FATTURARE FATTURARE, IL CONTENITORE EDITORIALE. Funzione: dimostrare continuita, cioe l'antidoto al sospetto di agenzia nata ieri. Non si chiama Blog ne Risorse: si chiama come il payoff, perche il payoff e gia un media brand con podcast su Spotify, Apple e YouTube. Tre schede con numero di episodio in mono, durata, ospite e il numero-tesi del caso raccontato. Piastra fantasma: 'ASCOLTA GLI EPISODI'.
- 13 — CHI ENTRA, CHI NO (due colonne, 6-6, divise da una riga verticale hairline). Funzione: rendere vera la selettivita invece di recitarla. Colonna sinistra, quadrato arancione per ogni voce: 'Fatturato tra 1 e 5 milioni', 'Un prodotto o servizio gia validato dal mercato', 'Un titolare che decide, non un comitato', 'Disponibilita a guardare i numeri ogni settimana'. Colonna destra, glifo di esclusione hairline: 'Start-up e progetti pre-fatturato', 'Chi cerca lead senza volere una rete vendita', 'Chi vuole delegare tutto e non vedere piu niente'. Riga di chiusura mono: 'RICEVIAMO PIU CANDIDATURE DI QUANTE POSSIAMO ACCETTARE. LEGGIAMO TUTTO NOI, NON UN SOFTWARE.'
- 14 — IL CAFFE (foto reale dell'ufficio di Via Marco D'Agrate 41 a piena larghezza, testo in overlay a sinistra, form o piastra a destra). Funzione: spostare la conversione da un form a un luogo fisico. E un asset culturale che nessun sito internazionale ha, ma va usato UNA VOLTA SOLA (oggi e incollato identico su home, quiz, eventi e carriera). Testa: 'IL CAFFE LO FACCIAMO IN VIA MARCO D'AGRATE 41.' Piastra: 'CANDIDA LA TUA AZIENDA'. Stato post-invio: 'Candidatura ricevuta. La leggiamo noi, non un software. Ti rispondiamo entro 48 ore lavorative.'
- 15 — FOOTER / CARTIGLIO DI CHIUSURA (4 colonne + riga tecnica finale, tutto mono, tre livelli di grigio come unica gerarchia: titolo colonna bianco@0.38, link bianco@0.50, hover bianco pieno). Funzione: densita di navigazione e controllo di esistenza. Le 4 colonne sono i 4 reparti + AZIENDA / RISORSE / CONTATTI. Riga finale a piena larghezza, hairline sopra: 'SALES PROCESS [ragione sociale] · P.IVA [da cliente] · SEDE LEGALE CAPIAGO INTIMIANO (CO) · SEDE OPERATIVA MILANO, VIA MARCO D'AGRATE 41 · ISO 9001:2015 CERT. N. [da cliente] · REV. 09/2026'. Per un imprenditore italiano il footer con la P.IVA e un proof point, non un obbligo.

## Momenti firma

- 1) IL MURO CHE SI STAMPA (hero, circa 900ms, CSS-only, non gated da JS). Le tre righe dell'H1 stanno ognuna in un wrapper con overflow:clip e salgono da translateY(104%) a 0 in 520ms con cubic-bezier(0.16,1,0.3,1), stagger 70ms. Il colpo in piu, che nessuno fa ancora: nello stesso intervallo ogni riga anima l'asse variabile del carattere. Si dichiara @property --wght { syntax:'<number>'; inherits:false; initial-value:520 } e si applica font-variation-settings:'wght' var(--wght); il keyframe porta --wght da 520 a 900 con la stessa curva. Il testo non entra: si comprime in posizione, come una pressa. Il testo e opaco dal primo frame (opacity 1) e solo la maschera si muove, quindi l'elemento LCP e dipinto subito e non dipende dal bundle. Sequenza completa: eyebrow (fade 200ms) -> riga 1 -> riga 2 -> riga 3 -> deck (fade+18px, 420ms) -> piastra CTA -> le 6 righe della targa dati che appaiono a scatti con steps(1,end) ogni 60ms, come un display che si popola.
- 2) LA COLONNA DI QUOTA (rail fisso a sinistra, 48px, sempre presente da >=1280px). E la traduzione industriale dell'eyebrow tra parentesi quadre di Sharpify e insieme la barra di progresso. Contiene: il numero di sezione corrente in IBM Plex Mono 13px, il nome della sezione ruotato di -90deg (writing-mode: vertical-rl), e i 4 quadrati del mark che indicano quale reparto si sta guardando. La firma sta nel fatto che NON scorre: un solo IntersectionObserver su tutte le sezioni con rootMargin '-50% 0px -50% 0px' cambia l'indice, e l'indicatore SCATTA alla nuova posizione con transform translateY e transition 180ms cubic-bezier(0.85,0,0.15,1). Il numero cambia con un flicker di 90ms (opacity 1 -> 0.2 -> 1, steps(3,end)). Costo: un observer, zero scroll listener. Precisione meccanica invece di fluidita: e la differenza percepita tra uno strumento e un giocattolo.
- 3) LO SCRUB DELLO STATEMENT (unico elemento scrubbato in tutta la pagina). SplitText type:'words', aria:'auto', autoSplit:true; gsap.to(words, { color:'#FFFFFF', stagger:0.1, ease:'none', scrollTrigger:{ trigger:'#statement', start:'top 80%', end:'+=80%', scrub:0.5 } }) partendo da bianco@0.12 ereditato dal contenitore. Range reale a vh 900: 720px di scroll, circa 16,7px per parola, fronte d'onda largo circa 3 parole. Due correzioni al modello Sharpify: (a) l'ultima parola ('fatturato') ha un secondo tween nella stessa timeline verso #FF8200, e questo tween esiste davvero (nel loro codice la seconda passata ha zero target: e codice morto); (b) a progress 1 una riga da 2px sotto la parola si disegna in 280ms con transform: scaleX(0->1) e transform-origin: left. Il testo e leggibile al 12% dall'inizio: l'animazione aggiunge enfasi, non informazione.
- 4) LA CATENA DEI TRE PASSAGGI DI CONSEGNA (unica scena pinnata, solo desktop, dentro gsap.matchMedia('(min-width:1024px) and (prefers-reduced-motion: no-preference)')). ScrollTrigger { trigger:'#metodo', start:'top top', end:'+=280%', pin:true, pinSpacing:true, scrub:0.6, anticipatePin:1, invalidateOnRefresh:true, fastScrollEnd:true }. La timeline ha 4 stati: per ogni reparto, il blocco entra nella propria macro-colonna (yPercent 28 -> 0, ease:'none'), poi il connettore verso il reparto successivo si disegna con stroke-dashoffset da 1 a 0 su un path SVG, e sul connettore appare una chip mono con il dato del passaggio ('LEAD PROFILATO · SLA 24H · CRM'). Allo stato finale i 4 quadrati del mark si accendono dal basso con stagger 60ms e una riga arancione da 2px attraversa tutte e quattro le colonne. Poi si sblocca. Su mobile la stessa cosa diventa uno stack verticale in cui il connettore si disegna con animation-timeline: view() — compositor thread, zero JS, zero pin.
- 5) IL NASTRO-TIMBRO CHE SI COMPRIME (payoff). Due righe in contro-direzione: translateX(0 -> -50%) su contenuto duplicato lato server, 46s linear infinite (34s sotto 760px, perche il tragitto e piu corto e la velocita percepita deve restare costante), mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent). Il momento-firma e il legame con la velocita di scroll: ScrollTrigger.onUpdate legge self.getVelocity(), lo normalizza e (a) porta tl.timeScale() da 1 a 2.4 con lerp 0.08 per frame, (b) porta l'asse wdth di Archivo da 88 a 75 via una custom property animata. Il carattere si stringe quando lo scroll corre e si rilassa quando si ferma. Obbligatorio e non negoziabile: pausa su hover E su focus-within, piu un pulsante di pausa visibile 32x32 con etichetta accessibile ('Metti in pausa il nastro') — SC 2.2.2 Pause/Stop/Hide e livello A e questo nastro ci ricade in pieno.
- 6) LA TARGA CHE SI RIVETTA (i tre numeri). Sequenza di 1.400ms per targa, agganciata allo stesso IntersectionObserver dei reveal (threshold 0.18, once). (a) La riga arancione da 2px sul bordo superiore si disegna da sinistra a destra: scaleX(0->1), 320ms, cubic-bezier(0.85,0,0.15,1). (b) Il numero conta: gsap.to su un oggetto proxy, duration 1.1, ease 'power2.out', snap, onUpdate scrive con new Intl.NumberFormat('it-IT'), e il contenitore ha font-variant-numeric: tabular-nums e min-inline-size: 4ch, quindi CLS resta 0. L'unita e in un elemento separato, IBM Plex Mono 32px arancione, mentre la cifra resta bianca: e il bianco a fare il lavoro di luminanza e l'arancio a fare il lavoro cromatico, perche #FF8200 pesa Y 0.372 contro Y 0.538 del verde di Sharpify (meno 31% di luce) e da solo non illuminerebbe la sezione. (c) La riga del denominatore appare in mono a scatti, steps(1,end) ogni 40ms per carattere. Hover sulla targa: il bordo passa da bianco@0.18 a bianco@0.34 e nel piede compare in 200ms la fonte del dato ('fonte: archivio interno · verificato 09/2026'). Densita informativa in piu, movimento in meno: e esattamente la tesi estetica della sezione.

## Motion

FILOSOFIA: il movimento e texture, non collezione di effetti. Un solo asse, un solo easing di reveal, una sola durata di reveal, imposti come token. Il resto del budget di attenzione viene speso su 6 momenti, uno per volta, mai in concorrenza.

TOKEN (unica fonte di verita)
:root{
  --dur-xs: 120ms;   /* accensioni, flicker, cambio indice */
  --dur-s:  200ms;   /* micro-stato: colore, bordo, comparsa di riga */
  --dur-m:  320ms;   /* righe che si disegnano, chip di dato */
  --dur-reveal: 620ms; /* UNICA durata di ingresso in tutto il sito */
  --dur-l:  900ms;   /* sequenza hero */
  --travel: 28px;    /* UNICA ampiezza di ingresso, UNICO asse: Y */
  --stagger: 70ms;   /* UNICO valore di stagger; catena massima 4 elementi = 280ms */
  --lift: 0px;       /* le card NON si sollevano: cambiano stato */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);    /* expo-out: ingressi, mask reveal */
  --ease-mecc: cubic-bezier(0.85, 0, 0.15, 1);  /* in-out secco: righe, scatti, indicatore */
  --ease-lin: linear;                            /* nastri e scrub (l'easing lo fa lo scroll) */
  --marquee: 46s;
  --stato-nastro: running;
}
Sharpify ha lo stesso gesto in tre durate (0,55 / 0,7 / 1,05s), due easing e quattro stagger diversi: quattro implementazioni della stessa cosa. Qui ce n'e una. E precisamente la differenza tra un sito assemblato e un sito progettato, e si vede anche se nessuno sa spiegare perche.

GERARCHIA A SEI LIVELLI
L0 — NON SI MUOVE MAI (la spina dorsale): display, numeri, cartigli, telaio, hairline, loghi, fotografia. Zero rotazioni, zero scale su testo, zero tilt 3D, zero parallasse su blocchi di lettura.
L1 — MICRO-STATO (200ms): color, border-color, background. Non produce movimento, produce risposta. E la maggioranza netta delle interazioni del sito.
L2 — CAMBIO DI STATO MECCANICO (200ms, --ease-mecc): al posto del lift da 4px, sull'hover di card/targhe/fascicoli il bordo passa da bianco@0.18 a bianco@0.34 e si accende una riga arancione da 2px sul bordo sinistro con scaleY(0->1) e transform-origin: bottom. Unica eccezione con movimento: la piastra CTA, translateY(-2px). Ampiezza massima di hover in tutto il sito: 2px.
L3 — INGRESSO (620ms, one-shot, irreversibile): mask reveal verticale dove c'e testo o immagine (translateY(104%)->0 dentro overflow:clip, che e 100% compositor), fade+28px altrove. Risalendo la pagina non si ri-anima nulla: unobserve + guardia, come Sharpify, piu un failsafe setTimeout(3000) che forza lo stato finale se l'osservatore non scatta.
L4 — LOOP AMBIENT (2s / 46s): il quadrato pulsante della barra di stato (solo box-shadow, mai transform) e i due nastri. Sempre in periferia, mai dentro un blocco di lettura, sempre sospendibili.
L5 — I DUE PICCHI: un solo pin (la catena dei 3 handoff) e un solo scrub (lo statement) in circa 7.800px di pagina. Un evento speciale resta speciale perche non ha concorrenti.

ARCHITETTURA DI IMPLEMENTAZIONE: 70% CSS nativo scroll-driven, 20% GSAP, 10% niente.
- Il 70%: @keyframes + animation-timeline: view() con animation-range: entry 12% cover 42%, che gira sul compositor thread e resta fluido anche col main thread occupato. Sempre dentro @supports, con @supports not (animation-timeline: view()) che porta gli elementi allo stato finale. Fallback per Firefox: un solo IntersectionObserver (threshold 0.18, rootMargin '0px 0px -8% 0px') che aggiunge la classe .in e deriva il ritardo dall'indice — non 26 campi delay in un builder.
- Il 20%: GSAP 3.13 (core + ScrollTrigger + SplitText, circa 41KB gz, tutto gratuito da aprile 2025) per: la scena pinnata, lo scrub dello statement, i tre count-up, il rAF del nastro di prova, il magnetico del CTA. Servito da locale, mai da CDN.
- Zero LENIS, zero ScrollSmoother. Il pubblico (imprenditori PMI, desktop Windows, rotella del mouse) e il profilo peggiore possibile per lo scroll-hijack, e il riferimento scelto dal cliente non lo usa. Lo smoothing si sposta dallo scroll all'animazione: scrub 0.5-0.6 e ease:'none' su tutti i tween scrubbati danno circa il 70% della sensazione premium a zero costo di usabilita e zero KB. scroll-behavior: smooth solo sugli anchor, con override a auto sotto prefers-reduced-motion.

REGOLE DI BUDGET (derivate dai numeri misurati su Sharpify, e piu strette)
- Massimo 3 animazioni concorrenti per viewport. Sopra la piega ne girano 3: il quadrato pulsante e due righe della sequenza hero.
- Un solo elemento scrubbato e un solo pin per pagina. pinSpacing sempre true (disattivarlo e il modo piu rapido di produrre CLS).
- Zero animazioni di proprieta di layout: mai width, height, top, left, margin, padding. Solo transform, opacity, color, e le custom property registrate.
- will-change e un prestito: aggiunto su onStart/pointerenter, rimosso su onComplete/transitionend. Mai permanente (Sharpify ne ha 40 mai rimossi). Sulle scroll-driven native non si dichiara: promuove il browser.
- Nessun backdrop-filter animato e nessun filter: blur() su aree grandi (e il costo GPU piu alto del web). Il glow della piastra CTA e un radial-gradient dipinto, piu un asset pre-sfocato: nessun blur in animazione.
- content-visibility: auto + contain-intrinsic-size: auto 720px su tutte le sezioni sotto la piega, ESCLUSA la sezione pinnata (altera i calcoli di start/end).
- document.fonts.ready.then(() => ScrollTrigger.refresh()) obbligatorio: senza, tutti gli start/end sono calcolati sui line-break del fallback.
- gsap.quickTo (mai gsap.to) nei loop di pointermove, con getBoundingClientRect letto una volta e invalidato su resize. Il layout thrashing dentro un listener e la causa numero uno di INP catastrofico sui siti animati.
- Ogni loop infinito: pausa su hover e focus-within, IntersectionObserver che lo ferma fuori schermo, stop su visibilitychange.
- Nastro di prova a velocita delta-time (pos -= 0.06 * dt), non frame-based: su un 120Hz il nastro di Sharpify va a velocita doppia. Inerzia al rilascio del drag (velocita dell'ultimo pointermove, decadimento 0.94/frame) e velocita lerpata sui cambi di stato (speed += (target-speed)*0.08) invece del booleano secco. Misure di offsetLeft/offsetWidth in cache, invalidate solo su resize debounced a 80ms: nel loro codice si legge il layout dopo averlo scritto, ogni frame.

MOBILE (<1024px), via gsap.matchMedia che CREA e DISTRUGGE le scene invece di lasciarle inerti
- Zero pin, zero scroll orizzontale forzato, zero magnetico, zero cursore custom, zero WebGL.
- La catena dei 4 reparti diventa stack verticale con connettore disegnato in animation-timeline: view().
- --travel 20px, durate x0.7, --marquee 34s, telaio ridotto a 2 macro-colonne, colonna di quota nascosta (torna come barra di progresso 2px sotto la nav).
- Piastra CTA sticky a piena larghezza in basso, 56px, arancio con testo nero: la barra di comando. Con IntersectionObserver che la sopprime quando il form e a schermo.
- Nastro di prova: scroll nativo + scroll-snap-type: x mandatory, scroll-snap-align: center, flex 0 0 78%. Piu veloce, piu accessibile, piu familiare del rAF.

PREFERS-REDUCED-MOTION — fatto con i token, non con un interruttore
Vietato il classico * { animation: none !important }: rompe accordion e dropdown e fa scomparire per sempre ogni elemento con animation-fill-mode: both che parte da opacity 0.
@media (prefers-reduced-motion: reduce){
  :root{ --dur-xs:1ms; --dur-s:100ms; --dur-m:120ms; --dur-reveal:150ms; --dur-l:180ms;
         --travel:0px; --lift:0px; --stato-nastro: paused; }
}
Comportamento per momento: il muro non si stampa, appare (fade 150ms, asse wght fisso a 900); la colonna di quota non scatta, cambia numero senza flicker; lo statement NON viene splittato affatto (elimina anche il rischio a11y sullo screen reader) e si applica gsap.set(colore finale) senza registrare lo ScrollTrigger; la catena non si pinna e diventa lo stack verticale con i connettori gia disegnati; i nastri sono animation-play-state: paused con overflow-x: auto sul contenitore (l'informazione resta raggiungibile a mano); i count-up mostrano subito il valore finale; il magnetico e disattivato e resta il cambio di stato su hover e focus-visible; le View Transitions cross-document diventano navigation: none. Copertura: 100% dei meccanismi. Sharpify ne copre 2 su circa 12.

ALTRI SEGNALI RISPETTATI GRATIS: prefers-reduced-transparency (via il backdrop-filter della nav), prefers-contrast (i bordi decorativi salgono a bianco@0.34), (update: slow) e Save-Data (nastri statici, nessun modulo opzionale caricato).

TEST OBBLIGATORI PRIMA DELLA CONSEGNA: DevTools Rendering con emulazione reduced-motion; navigazione con la sola tastiera durante la scena pinnata (il focus deve restare visibile e dentro il viewport); VoiceOver/NVDA sull'H1 splittato; hardware fisico (un Android di fascia media e un iPhone SE) con throttling 4G; web-vitals v4 in campo con onLCP/onINP/onCLS su endpoint proprio, perche Lighthouse non cattura l'INP.

## Rischi

- FREDDEZZA PERCEPITA. Il brutalismo industriale e un registro che un imprenditore di 55 anni puo leggere come 'non finito' o 'freddo', proprio mentre il brand vuole comunicare che dietro ci sono 34 persone e un caffe in Via Marco D'Agrate. Mitigazione dentro la direzione: fotografia umana grande e a spigolo vivo (mani, volti, ufficio) in tre punti obbligatori, corpo del testo in Red Hat Display e non in monospace, e il registro caldo del nero #0C0B0A. Ma resta il rischio piu serio: va testato su 5 imprenditori reali del target prima dello sviluppo, non dopo.
- MONOSPACE = GERGO AI/CRYPTO. IBM Plex Mono su dati, eyebrow e cartigli e esattamente il segnale visivo che nel 2025-2026 dice 'terminale, dashboard, token'. Il confine tra 'strumento di misura' e 'startup AI' e sottile e passa per tre regole che vanno difese in code review: mai monospace nel corpo del testo, mai monospace nei numeroni (restano Red Hat 900), mai verde o ciano da terminale. Se una di queste tre cade, la direzione scivola nel cliche che il brief chiede di evitare.
- RAGGIO ZERO CONTRO L'ABITUDINE DEL PILL. Abbandonare la pillola per la piastra rettangolare e la decisione piu coraggiosa e la piu attaccabile: il raggio pill e il segnale universale di 'cliccabile' e nel riferimento del cliente ogni CTA e una pillola. Contromisure: dimensione minima 56x220px, fill arancio pieno con testo nero, cursor pointer, hover che scurisce a #E87300 con una riga nera da 2px in inset, focus ring arancione 2px con offset 3px. Se in test il tasso di click cala, la variante pill e un cambio di un solo token (--r-pill) e non richiede rifare nulla.
- TELAIO VISIBILE E CROCINI DI REGISTRO: rischio 'esercizio da studente di disegno tecnico'. Le linee del telaio stanno a bianco@0.055 (1,11:1) proprio per questo, e i crocini arancioni compaiono solo all'angolo alto-sinistro di ogni cartiglio, non alle intersezioni. Se il cliente chiede 'piu grafica' e i crocini si moltiplicano, la pagina diventa rumore in due iterazioni. Va scritto come regola: massimo un crocino per sezione.
- TRE FAMIGLIE DI FONT SU UN SITO CHE DEVE ELIMINARE IL MIX DI QUATTRO. La giustificazione e funzionale (voce, segnaletica, strumentazione) ma il debito e reale: 3 richieste di rete, 2 assi variabili animati, e il rischio FOUT/CLS sul mask reveal delle righe se SplitText gira prima di document.fonts.ready. Mitigazione: Archivo subsettata ai soli caps e cifre (circa 18KB), preload dei soli due font sopra la piega, autoSplit:true, size-adjust sul fallback. Se il budget font sfora i 118KB, il primo a uscire e Archivo e il nastro passa a Red Hat Display 900 con scaleX compresso.
- L'INTERA DIREZIONE E COSTRUITA SUI NUMERI, E I NUMERI OGGI SI CONTRADDICONO. 150 contro +800 imprenditori, +20 contro 30 contro 34 persone, 6 mesi contro 9/12 mesi, +40-100% contro X2-X5. Targhe, fascicoli e schede risultato sono i tre componenti portanti: senza dati riconciliati, con data di aggiornamento e con liberatoria, questa direzione anima il vuoto e la sua sobrieta diventa nudita. E un rischio di progetto, non di design: serve un documento unico di fonte dei numeri, aggiornato trimestralmente dal cliente, come pre-condizione di sviluppo. Fino a quel momento la sezione testimonianze non deve esistere.
- IL DOPPIO REGISTRO PUO SPORCARSI. L'estetica sticker/graffiti del Sales Process Day vive naturalmente in questo angolo, e qui e un pericolo piu che un vantaggio: Archivo compressa in caps e il nastro-timbro sono a un passo dal manifesto d'evento. Se il registro evento esce dal suo inserto a piena campata, il sito perde l'autorevolezza che serve a vendere a un'azienda da 5 milioni. La regola va cablata nei componenti (una sola sezione con quella classe), non lasciata al buon senso.
- CONFORMITA DA PRESIDIARE, NON DA DICHIARARE. Tre punti concreti: sulla banda carta #FF8200 da 2,00:1 e vietato come testo (si usa #8A4300, 5,84:1) e la regola si dimentica al primo aggiornamento di contenuto; #CC3366 a 3,96:1 non e testo normale su nero; il nastro FATTURARE ricade sotto SC 2.2.2 livello A e ha bisogno di un controllo di pausa reale, non solo dell'hover. Serve un test automatico in build che verifichi le due soglie di alpha (>=0,455 per il testo, >=0,340 per i confini UI) invece di affidarsi alla code review.
- COSTO DI ESECUZIONE E TETTO DELLO STACK. Scena pinnata, drag con inerzia, due assi variabili animati e telaio a colonne sono realizzabili in modo pulito su Astro statico piu GSAP (tetto 9,5/10, LCP 1,2-1,8s); su WordPress ed Elementor il tetto reale e circa 7/10 e ogni modifica di layout del cliente puo rompere la scena pinnata. Se il vincolo e restare su Elementor, la direzione va consegnata con le scene agganciate ad attributi data- sui container e con la scena pinnata come primo elemento sacrificabile.

---

« SCALINATA MECCANICA » — SPECIFICA COMPLETA
Direzione di design per il nuovo salesprocess.it · Angolo C: brutalista-industriale, forza tipografica
Rev. 09/2026

---

## 0. I CINQUE PRINCIPI (si risolvono i dubbi con questi, non con il gusto)

1. **La struttura si dichiara.** Sezioni numerate, telaio visibile, dati in monospace, tolleranze scritte. Un'azienda che vende "processo" non puo avere un sito che nasconde il proprio.
2. **Un solo fondo.** Circa il 92% della pagina e `#0C0B0A`. Nessuna alternanza scuro/chiaro, nessun gradiente di sezione, nessun margine tra sezioni: il ritmo lo fa il padding interno. Quattordici fasce si leggono come un documento continuo, e la continuita e la premessa della densita.
3. **L'arancio e segnaletica, non vernice.** Massimo 3% dei pixel per viewport. Se non e cliccabile, non e un numero e non e un passaggio di consegna, e sbagliato.
4. **Niente galleggia.** Le cose scattano in posizione, si bloccano, cambiano stato. Un solo asse (Y), una sola ampiezza (28px), una sola durata di reveal (620ms), un solo easing.
5. **Lo screenshot statico deve funzionare da manifesto.** Se una sezione ha bisogno del motion per essere buona, il problema e la gerarchia, non l'animazione.

---

## 1. TOKEN

```css
:root{
  /* ---------- FONDI (neutri: mai tinti d'arancio) ---------- */
  --nero:            #0C0B0A;                    /* base, near-black CALDO */
  --nero-foto:       #000000;                    /* solo sotto fotografia full-bleed */
  --sup-1:           rgba(255,255,255,0.035);    /* -> #151413  CR 1.07 */
  --sup-2:           rgba(255,255,255,0.060);    /* -> #1B1A19  CR 1.13 */
  --sup-3:           rgba(255,255,255,0.090);    /* -> #222120  CR 1.22 */
  --nav-scrolled:    rgba(12,11,10,0.92);
  --carta:           #EAE6DC;                    /* UNICA banda chiara */
  --velo-caldo:      #3B2413;                    /* superficie calda OPACA, non alpha */

  /* ---------- BORDI: tre ruoli + il telaio ---------- */
  --bordo-telaio:    rgba(255,255,255,0.055);    /* 1,11:1 — si sente, non si guarda */
  --bordo-hair:      rgba(255,255,255,0.10);     /* 1,25:1 — DECORATIVO */
  --bordo-forte:     rgba(255,255,255,0.18);     /* 1,66:1 — riposo delle targhe */
  --bordo-ui:        rgba(255,255,255,0.34);     /* 3,04:1 — OBBLIGATORIO se interattivo (SC 1.4.11) */

  /* ---------- TESTO: quattro step ---------- */
  --t1: #FFFFFF;                                 /* 19,67:1 */
  --t2: rgba(255,255,255,0.72);                  /* 10,24:1 */
  --t3: rgba(255,255,255,0.50);                  /*  5,34:1 */
  --t4: rgba(255,255,255,0.38);                  /*  3,53:1 — SOLO >=24px */
  --t-su-arancio: #000000;                       /* obbligatorio su ogni fill arancio */

  /* ---------- ACCENTO: famiglia a 5 livelli ---------- */
  --ar:        #FF8200;   /* 7,91 su nero · nero sopra 8,45 — IL BRAND */
  --ar-caldo:  #FF9A38;   /* 9,30 — solo hover di link testuali, MAI fill */
  --ar-fondo:  #E87300;   /* 6,45 — hover della piastra piena (l'hover SCENDE) */
  --ar-pivot:  #B85B00;   /* nero 4,53 / bianco 4,63 — punto di pareggio */
  --ar-rugg:   #8A4300;   /* 5,84 su carta — l'unico "arancio testo" nella banda chiara */

  /* ---------- GLOW: nucleo bianco + aureola arancio (un solo uso) ---------- */
  --glow-core: rgba(255,255,255,0.90);
  --glow-halo: rgba(255,130,0,0.30);

  /* ---------- SEMANTICI: hue lontane dal brand ---------- */
  --ok: #4ADE80;  --warn: #FFD84D;  --rottura: #CC3366;  --info: #7AA2FF;

  /* ---------- SPAZIO: base 8, nessun valore accordato a mano ---------- */
  --s1:8px; --s2:16px; --s3:24px; --s4:32px; --s5:48px;
  --s6:64px; --s7:96px; --s8:128px; --s9:160px; --s10:192px;

  /* ---------- RAGGIO: due valori, non undici ---------- */
  --r-0:0px;      /* tutto */
  --r-chip:2px;   /* chip di dato, tag tecnici */
  /* --r-pill:999px NON esiste in questa direzione */

  /* ---------- ELEVAZIONE: nessuna ombra morbida ---------- */
  --e-piatta: none;                              /* le superfici si distinguono per alpha e bordo */
  --e-ombra:  0 24px 80px rgba(0,0,0,0.55);      /* SOLO overlay modali */
  --e-glow:   0 0 12px var(--glow-core), 0 0 44px var(--glow-halo), 0 0 84px var(--glow-halo);
  --e-ambient: radial-gradient(ellipse 70% 44% at 50% 0%, rgba(255,130,0,0.14) 0%, transparent 64%);

  /* ---------- GRANA (statica, mai animata) ---------- */
  --grana: url("data:image/svg+xml,...feTurbulence baseFrequency=0.9 numOctaves=3...");
  /* tile 128x128, opacity 0.03, mix-blend-mode: overlay, pointer-events:none, un solo layer fisso */
}
```

**Le due soglie da mettere in cima al file e in un test automatico di build:** su `#0C0B0A` un bianco alpha e leggibile come testo corpo da **alpha >= 0,455** e un confine UI e conforme da **alpha >= 0,340**. Sono i due numeri che prevengono i due fallimenti sistemici di ogni sistema white-alpha su near-black.

---

## 2. GRIGLIA E TELAIO

**Container e colonne**
| | Desktop >=1280 | Tablet 768-1279 | Mobile <768 |
|---|---|---|---|
| max-width | 1440px | 100% | 100% |
| padding laterale | 48px | 32px | 16px |
| colonne | 12 | 8 | 4 |
| gutter | 24px | 24px | 16px |

A 1440: contenuto utile 1344px, **colonna = 90px**, gutter 24px. Verificato: `12x90 + 11x24 = 1344`.

**Le 4 macro-colonne (la decisione strutturale della direzione).** 3 colonne + 2 gutter = **318px**; quattro macro-colonne con gutter 24 = `4x318 + 3x24 = 1344`. Perfetto. Il telaio visibile e fatto da **5 hairline verticali** a `--bordo-telaio`, in un layer `position: fixed; inset: 0; pointer-events: none; z-index: 1`, agli x (relativi al content box) **0 / 342 / 684 / 1026 / 1344**. Non sono decorazione: sono i quattro reparti. Sotto 1280 diventano 3 linee (2 macro-colonne); sotto 768 il telaio non c'e.

**Container secondari, che si stringono con la densita**
- 1440 — nav, hero, nastri, sezioni a griglia
- 1272 — statement, fascicoli, footer (una macro-colonna di margine ottico)
- 954 — blocchi editoriali (tre macro-colonne)
- 62ch — misura di lettura massima del corpo; 46ch per il deck

**Ritmo verticale.** Sezioni **giuntate a filo, gap 0px**. Padding di sezione: `--s8 128px` sopra e sotto su desktop, `--s7 96px` su tablet, `--s6 64px` su mobile. Eccezioni motivate: hero `padding-top: 96px`, statement `padding-bottom: 160px` (il respiro piu grande della pagina), banda carta `40px/48px`. Tutti i valori verticali sono multipli di 8: nessun 26, nessun 34, nessun 76.

**Il vuoto e concentrato, non distribuito.** Ogni blocco denso (nastro, griglia numeri, catena, fascicoli) e preceduto da una testa di sezione alta 200-280px che contiene un cartiglio, un display e nient'altro. Quella fascia e il reset percettivo che rende possibile la densita dopo.

**Il passo diagonale.** Il mark ha un rise/run di 1:1 su quattro gradini: l'unico angolo del brand e **45 gradi**, e vale per: il glifo di esclusione nella sezione selezione, i tagli delle fasce evento, la direzione delle transizioni di maschera diagonale (usate una volta sola, sull'inserto evento). Nessun altro angolo esiste nel sistema.

---

## 3. IL CARTIGLIO — la formula di testa-sezione, ripetuta 9 volte

E la traduzione industriale dell'eyebrow `[ SEZIONE ]` di Sharpify. La ripetizione compra densita: il lettore impara la sintassi una volta sola.

```
┌─ hairline top (--bordo-hair) ─────────────────────────────────────────────┐
│ ✛  [ 06 ]  METODO 4 IN 1          4 REPARTI, 3 PASSAGGI      AGG. 09/2026 │  40px
└─ hairline bottom (--bordo-hair) ──────────────────────────────────────────┘
        (poi 32px di gap, poi il display della sezione)
```
- Altezza fissa **40px**, `display:grid; grid-template-columns: 16px auto 1fr auto; align-items:center; gap:16px`.
- Crocino di registro `✛` 10x10px in `--ar`, **uno solo per sezione**, allineato al primo hairline verticale del telaio.
- Numero `[ 06 ]` IBM Plex Mono 500 11px +0.14em in `--t1`; parentesi quadre **digitate nel contenuto**, costo zero CSS.
- Nome sezione IBM Plex Mono 500 11px +0.14em uppercase in `--t3`.
- Campo dati a destra (data di aggiornamento, conteggio, SLA) in `--t4`, cade sotto 768px.
- Sotto: display di sezione `--t-display1` (fino a 96px), tracking -0.04em, `--t1`, con **una sola parola** in `--ar`.
- Allineamento: **sempre a sinistra**. Nessun centrato in tutto il sito, tranne la banda carta. Sharpify alterna centro/sinistra in modo incoerente (6 su 8 centrate) e si vede.

---

## 4. COMPONENTI

### 4.1 Barra di stato (`.barra-stato`)
`position:fixed; top:0; height:36px; z-index:9500; background:var(--velo-caldo); border-bottom:1px solid var(--bordo-hair)`. Contenuto centrato, `display:flex; gap:14px`, IBM Plex Mono 500 11px +0.14em.
Ordine: quadrato 6px `--ar` con `animation: battito 2s ease infinite` (solo `box-shadow: 0 0 0 0 rgba(255,130,0,.7) -> 0 0 0 6px rgba(255,130,0,0)`, nessun transform) · testo `SALES PROCESS DAY · MILANO · 14.11.2026` in `--t2` · `30 POSTI` in `--ar` · piastra 24px `PRENDI UN POSTO` (fill `--ar`, testo nero, 11px/700) · `X` a destra in `--t3` -> `--t1`.
Degradazione: `@860px` cade la citta; `@430px` cade la data. `body{padding-top:36px}`; `html.barra-off body{padding-top:0}`.
`prefers-reduced-motion`: il quadrato resta acceso fisso.

### 4.2 Nav (`.nav`)
`position:fixed; top:36px; height:72px; z-index:9000; background:transparent; border-bottom:1px solid transparent; transition: background var(--dur-m), border-color var(--dur-m), backdrop-filter var(--dur-m)`.
Stato scrolled: `background:var(--nav-scrolled); backdrop-filter:saturate(150%) blur(16px); border-bottom-color:var(--bordo-hair)`.
**Isteresi obbligatoria** (Sharpify ha una soglia secca a 30px e sfarfalla su trackpad e rubber-band iOS):
```js
let on=false; const f=()=>{const y=scrollY;
  if(!on && y>48){on=true;  nav.classList.add('is-scrolled');}
  else if(on && y<12){on=false; nav.classList.remove('is-scrolled');}};
addEventListener('scroll', f, {passive:true}); f();
```
Sequenza: mark 28px + wordmark (flex-shrink 0) · 4 voci (`margin-left:40px; gap:4px`) · a destra `margin-left:auto; gap:12px` la piastra CTA.
Voce nav: Red Hat Display 500 16px, `--t2`, padding `10px 14px`, `--r-0`. Hover/`:focus-visible`: colore `--t1` + riga 2px `--ar` in basso, `transform: scaleX(0->1)` con `transform-origin:left`, `--dur-s` `--ease-mecc`. **Nessun lift, nessuno sfondo.**
Voce attiva: riga arancione permanente + `aria-current="page"`.
`@1024px`: le voci vanno a `display:none`, appare il tasto menu (piastra 40x40 con tre hairline), inner `height:56px`, fondo **opaco di default** (`#0C0B0A` + blur 12px): su mobile la trasparenza si rinuncia.
Menu mobile: pannello a piena schermata, fondo `--nero`, voci `--t-display2` 32px con mask reveal stagger 60ms, `focus trap`, chiusura con `Esc`.

### 4.3 Piastra CTA — tre livelli, raggio 0
**Primaria** (`.piastra`, un solo elemento per schermata):
```css
.piastra{
  display:inline-flex; align-items:center; gap:12px;
  height:56px; padding:0 28px; border:none; border-radius:var(--r-0);
  background:var(--ar); color:#000;
  font:800 15px/1 'Red Hat Display'; letter-spacing:.02em; text-transform:uppercase;
  position:relative; isolation:isolate;         /* contiene il mix-blend del glow */
  transition: background var(--dur-s) var(--ease-mecc), transform var(--dur-s) var(--ease-mecc);
}
.piastra::after{ content:''; position:absolute; inset:0; z-index:-1; opacity:0;
  background: radial-gradient(120px 120px at var(--x,50%) var(--y,50%), var(--glow-core) 0%, transparent 60%),
              radial-gradient(220px 220px at var(--x,50%) var(--y,50%), var(--glow-halo) 0%, transparent 78%);
  mix-blend-mode:screen; transition:opacity var(--dur-s); }
.piastra:hover{ background:var(--ar-fondo); transform:translateY(-2px); box-shadow: inset 0 0 0 2px #000; }
.piastra:hover::after{ opacity:1; }
.piastra:active{ transform:translateY(0); background:var(--ar-pivot); color:#fff; } /* oltre il pivot il testo diventa bianco */
.piastra:focus-visible{ outline:2px solid var(--ar); outline-offset:3px; }
.piastra[aria-disabled="true"]{ background:var(--sup-3); color:var(--t3); cursor:not-allowed; }
```
Glifo: una freccia `→` disegnata come due hairline nere da 2px (non un'icona di libreria). Le `--x/--y` si aggiornano con `pointermove` **throttlato in rAF** e solo su `(hover:hover) and (pointer:fine)`: il glow segue il cursore, e l'unica luce dinamica di tutta la pagina.
**Sotto-label obbligatoria** sotto ogni piastra primaria: IBM Plex Mono 400 12px +0.08em `--t3` — `FATTURATO 1-5 M€ · NO START-UP · RISPOSTA IN 48 ORE LAVORATIVE`. Il CTA selettivo senza il criterio accanto e posa; con il criterio e serieta.
**Secondaria fantasma**: `background:transparent; border:1px solid var(--bordo-ui); color:var(--t1)`. Hover: `border-color:var(--ar); color:var(--ar)`. Nessun fill.
**Terziaria testuale**: Red Hat 700 15px `--t1` + riga 1px `--bordo-ui` sotto che a hover diventa `--ar` e cresce a 2px in 200ms.
**Sticky mobile**: barra a piena larghezza in basso, 56px, `--ar`, testo nero, `padding-bottom: env(safe-area-inset-bottom)`, soppressa da un IntersectionObserver quando il form e a schermo.

### 4.4 Targa di identificazione (hero, colonne 9-12)
Il componente che sostituisce la stat card a vetro di Sharpify. E una targhetta di macchina.
```
┌─ 2px --ar in alto ────────────────────────────┐
│ TARGA DI IDENTIFICAZIONE            REV 09/26 │  mono 10px --t4
├───────────────────────────────────────────────┤  hairline
│ IMPRENDITORI SERVITI ................  150+   │  mono 13px --t3 / valore --t1
│ SETTORI SERVITI ....................    33    │
│ PROCESSI DI VENDITA REALIZZATI .....   750    │
│ VENDITORI GESTITI ..................   500+   │
│ PERSONE NEI 4 REPARTI ..............    34    │
│ SEDE OPERATIVA ........  MILANO, M. D'AGRATE  │
└───────────────────────────────────────────────┘
```
`background:var(--sup-2); border:1px solid var(--bordo-forte); border-top:2px solid var(--ar); border-radius:var(--r-0); padding:20px`. Righe `display:grid; grid-template-columns:1fr auto; gap:12px; padding:8px 0; border-bottom:1px solid var(--bordo-telaio)`. I puntini di guida si fanno con un `::after` a `repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 4px)` mascherato, non con caratteri ripetuti. Valori in `font-variant-numeric: tabular-nums`.

### 4.5 Scheda risultato (`.scheda`) + nastro di prova
`width:320px; aspect-ratio:3/4; border-radius:var(--r-0); border:1px solid var(--bordo-forte); background:var(--sup-2); overflow:clip; display:grid; grid-template-rows:1fr auto`.
- Sopra: fotografia del cliente in **duotone nero/#FF8200** (due `background-image` con `mix-blend-mode: multiply` su un layer arancione, oppure asset pre-processati: preferire gli asset), piu un overlay `linear-gradient(180deg, rgba(0,0,0,.25) 0%, rgba(0,0,0,.40) 42%, rgba(0,0,0,.72) 100%)` — scrim a 3 stop: la foto respira in alto, il testo e garantito leggibile in basso. Label in overlay `--t-segnale` (Archivo 800 13px +0.18em) bianco pieno, **senza `text-shadow`**: il bagliore doppio da 2012 che Sharpify mette sulle label impasta i caps sopra fotografia invece di aiutarli.
- Sotto, piede dati su `--nero`, `padding:16px`, hairline superiore: numero `Red Hat 900 38px` `--t1` tabular-nums + unita mono 15px `--ar`; label `--t-meta` `--t3`; riga di contesto `--t4` (`SETTORE: IMPIANTISTICA · 11 MESI`).
- Hover (correzione a Sharpify, dove queste card non hanno alcuna regola `:hover`): bordo -> `--bordo-ui`, riga 2px `--ar` sul bordo sinistro `scaleY(0->1)`, e compare in 200ms una quarta riga di contesto (canale, tempo medio di chiusura). Densita informativa in piu, movimento in meno.
- Nastro: `display:flex; gap:24px; padding:40px 0`, contenuto duplicato, `mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)`.
- Meccanica (rAF, tutte le correzioni ai difetti misurati sul riferimento): `pos -= 0.06 * dt` (delta-time, non per-frame); scala di prossimita **`s = 0.84 + 0.22*t`** (nel riferimento e invertita: la card centrale e il 16% piu piccola delle laterali pur avendo `z-index:2`), con `opacity 0.55 -> 1` e `blur(1.2px) -> 0` legati alla stessa `t` = profondita di campo; `speed += (target - speed) * 0.08` sui cambi di stato; momentum al rilascio del drag con decadimento 0.94/frame; soglia drag 18px con axis-lock (`if(Math.abs(dx) < Math.abs(dy)) return`), `setPointerCapture`, `touchAction` commutato `pan-y <-> none`, click-guard 320ms in capture phase; **`offsetLeft`/`offsetWidth` in cache**, invalidata solo su resize debounced 80ms (nel riferimento si legge il layout dopo averlo scritto, ogni frame: layout thrashing garantito). Pausa su `hover` e `focus-within`, stop fuori schermo e su `visibilitychange`.

### 4.6 Targa numerica (i tre numeri portanti)
`background:var(--sup-2); border:1px solid var(--bordo-forte); border-top:2px solid var(--ar); padding:40px 32px 24px; display:grid; gap:16px`.
Gerarchia interna a 5 livelli — la monumentalita viene dal **contrasto interno**, non dalla dimensione assoluta:
1. Numero `--t-numero` (fino a 128px) `--t1` tabular-nums, con l'unita (`+`, `%`, `M€`) in un `<span>` separato IBM Plex Mono 500 32px `--ar`, `vertical-align: top`. Il bianco fa il lavoro di luminanza, l'arancio quello cromatico.
2. Etichetta `--t-meta` uppercase `--t2`.
3. Denominatore `--t4` 12px — `in 33 settori, dal 2020`. Rapporto 128:12 = **10,7:1** dentro una targa di 320px.
4. Piede hairline con la fonte, rivelata su hover: `fonte: archivio interno · verificato 09/2026`.
5. Gutter tra targhe: 24px (il gutter di griglia, non un valore nuovo).
Sotto le tre targhe, riga a piena larghezza in mono `--t4`: `DATI AGGIORNATI AL 09/2026 · UN SOLO NUMERO PER CONCETTO SU TUTTE LE NOSTRE PROPRIETA`. Meno seducente di "up growing every quarter", infinitamente piu credibile per un imprenditore che apre quattro pagine e confronta.

### 4.7 Blocco reparto e catena dei passaggi
Blocco (una macro-colonna, 318px): numero `01` in Red Hat 900 96px `rgba(255,255,255,0.08)` come filigrana dietro; sopra, i 4 quadrati del mark con l'n-esimo in `--ar` e gli altri a `--bordo-ui`; titolo `--t-titolo1` uppercase; corpo `--t-corpo` `--t2`; in basso una chip dati (`--r-chip`, `border:1px solid var(--bordo-hair)`, mono 11px) con l'output del reparto.
Connettore: `<svg>` con `path` da 2px `stroke: var(--ar)`, `stroke-dasharray/dashoffset` scrubbati; sul punto medio una chip `LEAD PROFILATO · SLA 24H`. Nel contro-esempio gli stessi tre connettori sono `stroke: var(--rottura)`, `stroke-dasharray: 6 6`, interrotti al centro con un glifo di rottura a 45 gradi e la chip `PASSAGGIO PERSO`.

### 4.8 Fascicolo caso studio
`border:1px solid var(--bordo-forte); background:var(--sup-1)`, nessun raggio. In testa un cartiglio proprio (32px, hairline sotto): `FASCICOLO 01 · IMPIANTISTICA · 11 MESI`. Corpo: due colonne mono `PRIMA` / `DOPO` con i numeri in Red Hat 900 44px (il `DOPO` con l'unita in arancio), poi l'elenco degli interventi con il quadrato del mark come bullet (mai un pallino, mai un'icona tonda), poi la citazione in Red Hat 400 20px `--t2` con attribuzione mono `NOME · RUOLO · AZIENDA`. Hover: bordo `--bordo-ui` + riga sinistra `--ar`.
**Vincolo di contenuto:** nessun fascicolo si pubblica senza settore, numero di partenza, numero di arrivo, finestra temporale e liberatoria scritta. Meglio uno vero che cinque vuoti.

### 4.9 Nastro payoff
Due `.nastro__riga` in `width:max-content`, `animation: scorri var(--marquee) linear infinite`, la seconda con `animation-direction: reverse`. Riga 1: `--t-timbro` colore `--ar`. Riga 2: stesso carattere con `color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.22)`. Separatore tra le parole: il quadrato del mark, 12px. Hairline sopra e sotto la fascia. Contenuto duplicato lato server, clone con `aria-hidden="true"`; il nastro intero e `aria-label="Fatturare, fatturare, fatturare"` con `role="img"` per non far leggere 40 ripetizioni allo screen reader.
Controllo di pausa: piastra 32x32 in alto a destra della fascia, hairline, glifo `❚❚`/`▶`, `aria-pressed`, che commuta `--stato-nastro`. **Requisito di legge, non opzione** (WCAG SC 2.2.2, livello A; European Accessibility Act applicabile dal 28.06.2025 — per un'agenzia che vende ad aziende e anche un argomento commerciale).

### 4.10 Banda carta tecnica (unica sezione chiara)
`background:var(--carta); color:var(--nero); padding:40px 0 48px`. Label Archivo 800 13px +0.18em `--ar-rugg` (5,84:1 su carta; `--ar` darebbe 2,00:1 e **non e ammesso come testo qui**), `margin-bottom:40px`. Loghi stampa: SVG **monocromatici forniti a monte**, altezza normalizzata a 26px ma con override manuale per singolo logo (23-38px) perche l'altezza uguale non da peso ottico uguale — e la sola cosa da rubare integralmente al riferimento, ed e direzione artistica vera, non CSS. Vietati `filter:invert(1)`, `mix-blend-mode:multiply` e ogni trucco di sbiancamento: si rompono con qualsiasi logo a colori. A destra, blocco verificabile in mono nero: `ISO 9001:2015 · CERT. N. [DA CLIENTE] · ENTE IMQ · SCADENZA [DA CLIENTE]`.

### 4.11 Colonna di quota (rail)
`position:fixed; left:0; top:108px; bottom:0; width:48px; border-right:1px solid var(--bordo-telaio); z-index:2; pointer-events:none` (i quadrati del mark sono `pointer-events:auto` e portano ai reparti). Contiene: numero di sezione mono 13px `--t1`; nome sezione `writing-mode: vertical-rl; transform: rotate(180deg)`, mono 10px +0.14em `--t4`; i 4 quadrati del mark, 8px, gap 6px, l'attivo in `--ar`; un indicatore 2px x 24px `--ar` che scatta di posizione. Nascosta sotto 1280px (sostituita da una barra di progresso 2px sotto la nav, in CSS `animation-timeline: scroll(root block)`).

### 4.12 Footer
`background:var(--nero); border-top:1px solid var(--bordo-hair); padding:96px 48px 0`. `.footer__top{display:grid; grid-template-columns:1.4fr 1fr 1fr 1fr 1fr; gap:32px; padding-bottom:48px; border-bottom:1px solid var(--bordo-hair)}`. Titolo colonna mono 11px +0.14em `--t4`; link `--t-meta` 13px `--t3` -> `--t1`, con underline wipe a 320ms (`background-size: 100% 1px -> 0% -> 100%`, esce da un lato e rientra dall'altro: il dettaglio che si nota al secondo passaggio). Social: quadrati 32px, `--r-0`, `border:1px solid var(--bordo-ui)`, hover `border-color:var(--ar); color:var(--ar)`.
Riga finale (`cartiglio di chiusura`), mono 11px `--t4`, hairline sopra, `padding:20px 0`: `SALES PROCESS [ragione sociale] · P.IVA [da cliente] · SEDE LEGALE CAPIAGO INTIMIANO (CO) · SEDE OPERATIVA MILANO, VIA MARCO D'AGRATE 41 · ISO 9001:2015 CERT. N. [da cliente] · REV. 09/2026`.

### 4.13 Form di candidatura
Campi a spigolo vivo: `height:52px; background:var(--sup-1); border:1px solid var(--bordo-ui); color:var(--t1); padding:0 16px; font: 400 17px 'Red Hat Display'`. Label sempre visibile sopra il campo in mono 12px `--t3` (mai placeholder come label). Focus: `border-color:var(--ar); outline:2px solid var(--ar); outline-offset:2px`. Errore: `border-color:var(--rottura)` + glifo + testo (`--rottura` a 3,96:1 non e ammesso come testo su nero: il messaggio d'errore e in `--t1` con il glifo colorato). Campo fatturato come `<select>` con le fasce dell'ICP: la selezione e nel form, non solo nel copy.
Stati di sistema (dove si gioca la credibilita, perche nessuno ci fa attenzione):
- Invio riuscito: `Candidatura ricevuta. La leggiamo noi, non un software. Ti rispondiamo entro 48 ore lavorative.`
- Quiz non idoneo: `La tua azienda non rientra nei parametri di questo percorso. Non e un no per sempre: e un no per adesso. Ti mandiamo il podcast e ci riparliamo quando sei sopra il milione.`
- Eventi senza date: `Nessuna serata in programma in questo momento. Le prossime date escono prima sulla newsletter che sul sito.`

---

## 5. COPY DI ESEMPIO (italiano, pronto)

**Hero** — eyebrow `■ 04 REPARTI · UN SOLO TETTO · DAL 2020` · H1 `NON TI PORTIAMO I CLIENTI. TI COSTRUIAMO IL REPARTO CHE LI CHIUDE.` (CHIUDE in arancio) · deck `Pubblicita, marketing a risposta diretta, reclutamento e formazione della rete vendita. Quattro reparti sotto lo stesso tetto e un numero solo da guardare: il tuo fatturato.` · piastra `CANDIDA LA TUA AZIENDA` · secondaria `VEDI COME FUNZIONA IL 4 IN 1`

**Statement** — `Non ti vendiamo pubblicita. Ti consegniamo un reparto che produce fatturato.`

**Contro-esempio** — `QUATTRO FORNITORI. TRE ROTTURE.` / `L'agenzia porta i lead. Il consulente forma i venditori. Il recruiter ne trova altri due. Nessuno dei tre risponde del tuo fatturato. Ogni passaggio di consegna che si rompe e un lead che hai pagato due volte.`

**Metodo** — `[ 06 ] METODO 4 IN 1 — 4 REPARTI, 3 PASSAGGI DI CONSEGNA` / display `UN REPARTO SOLO. QUATTRO FUNZIONI. NESSUN PASSAGGIO PERSO.`
01 `PUBBLICITA` — `Compriamo attenzione dove il tuo cliente e gia.` -> `LEAD GREZZO · SLA 24H`
02 `MARKETING A RISPOSTA DIRETTA` — `Profiliamo ed educhiamo chi arriva dalla pubblicita.` -> `LEAD PROFILATO · SLA 24H`
03 `RECLUTAMENTO` — `Selezioniamo le figure commerciali che chiudono.` -> `VENDITORE IN AULA · SLA 72H`
04 `FORMAZIONE RETE VENDITA` — `Teniamo alte le performance, ogni settimana.` -> `TRATTATIVA CHIUSA`

**Numeri** — `[ 07 ] I NUMERI, NON LE PROMESSE` / display `IL PROCESSO IN 6 MESI O MENO. DA ZERO.` / `150+ IMPRENDITORI SERVITI · in 33 settori, dal 2020` · `750 PROCESSI DI VENDITA REALIZZATI · fonte: archivio interno` · `34 PERSONE NEI 4 REPARTI · in sede a Milano`

**Persone** — `IL REPARTO NON E UNO SCHEMA. SONO QUESTE PERSONE.`
**Selezione** — `CHI ENTRA, CHI NO.` / `RICEVIAMO PIU CANDIDATURE DI QUANTE POSSIAMO ACCETTARE. LEGGIAMO TUTTO NOI, NON UN SOFTWARE.`
**Caffe** — `IL CAFFE LO FACCIAMO IN VIA MARCO D'AGRATE 41.` / `Se la tua azienda rientra nei parametri, il primo passo non e una call: e un caffe. Ti diciamo in faccia se possiamo aiutarti.`
**Editoriale** — `FATTURARE FATTURARE FATTURARE` / `Il podcast in cui gli imprenditori raccontano i numeri, non le storie.`

**Cosa questo brand non scrive mai:** soluzioni innovative, a 360 gradi, digital transformation, growth hacking, brand awareness, storytelling, boost, unlock, seamless, empower, Book a demo, Get started, il simbolo `$`, libertà finanziaria, mindset vincente, rivoluzionario, segreto, trucco, hack, countdown, "solo per oggi", "ultimi 3 posti" quando non e vero. La scarsita si dichiara come **fatto strutturale** (la sala ha 30 sedie, accettiamo N clienti a trimestre), mai come pressione temporale.

---

## 6. STATI — matrice completa
| Componente | Riposo | Hover | Focus-visible | Attivo/premuto | Disabilitato |
|---|---|---|---|---|---|
| Piastra primaria | `--ar` / testo nero | `--ar-fondo` + inset 2px nero + `translateY(-2px)` + glow | outline 2px `--ar`, offset 3px | `--ar-pivot` / testo **bianco** | `--sup-3` / `--t3`, `aria-disabled` |
| Piastra fantasma | bordo `--bordo-ui` | bordo+testo `--ar` | outline 2px `--ar` | `--sup-3` | bordo `--bordo-hair`, `--t4` |
| Voce nav | `--t2` | `--t1` + riga 2px `--ar` scaleX | outline 2px `--ar` offset 2px | riga permanente | — |
| Link testuale | `--t2` + hairline | `--ar-caldo` + underline wipe 320ms | outline 2px `--ar` | — | — |
| Targa / scheda / fascicolo | bordo `--bordo-forte` | bordo `--bordo-ui` + riga 2px `--ar` a sinistra + riga dati rivelata | outline 2px `--ar` (se cliccabile) | `--sup-3` | — |
| Campo form | bordo `--bordo-ui` | bordo `rgba(255,255,255,.45)` | bordo `--ar` + outline 2px | — | `--sup-1`, `--t4`, cursore not-allowed |
| Nastro | in movimento | in pausa | in pausa (`focus-within`) | trascinato: `cursor:grabbing` | pausa da pulsante |
Regole trasversali: **ogni** elemento interattivo ha `--bordo-ui` (3,04:1) o un fill; l'`outline` non e mai `none` senza sostituto; il focus ring e arancione perche `#FF8200` e l'unico colore della palette che soddisfa SC 1.4.11 senza sforzo (7,91:1 su nero, 6,46:1 sulla superficie piu chiara).

---

## 7. IMPLEMENTAZIONE DEL MOTION (i pezzi che servono davvero)

```css
/* --- reveal: 70% del sito, compositor thread, zero JS --- */
@keyframes sali{ from{ opacity:0; translate:0 var(--travel); } to{ opacity:1; translate:0 0; } }
@keyframes stampa{ from{ translate:0 104%; } to{ translate:0 0; } }   /* dentro overflow:clip */
.rivela{ animation: sali var(--dur-reveal) var(--ease-out) both;
         animation-timeline: view(); animation-range: entry 12% cover 42%; }
@supports not (animation-timeline: view()){
  .rivela{ animation:none; opacity:0; translate:0 var(--travel);
           transition: opacity var(--dur-reveal) var(--ease-out), translate var(--dur-reveal) var(--ease-out); }
  .rivela.in{ opacity:1; translate:0 0; }
}
```
```js
/* fallback one-shot con failsafe, un solo osservatore per tutta la pagina */
const io=new IntersectionObserver((es)=>{ for(const e of es){ if(!e.isIntersecting) continue;
  io.unobserve(e.target); const i=+(e.target.dataset.i||0);
  setTimeout(()=>e.target.classList.add('in'), i*70); }},
  {threshold:.18, rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.rivela').forEach(el=>io.observe(el));
setTimeout(()=>document.querySelectorAll('.rivela').forEach(el=>el.classList.add('in')),3000); // failsafe
```
```js
/* hero: peso variabile + mask reveal, CSS-only, non gated da JS (l'LCP e il testo) */
/* @property --wght{ syntax:'<number>'; inherits:false; initial-value:520 } */
```
```js
/* scena pinnata: sola, desktop, distruttibile */
const mm=gsap.matchMedia();
mm.add('(min-width:1024px) and (prefers-reduced-motion: no-preference)',()=>{
  const tl=gsap.timeline({scrollTrigger:{trigger:'#metodo',start:'top top',end:'+=280%',
    pin:true,pinSpacing:true,scrub:.6,anticipatePin:1,invalidateOnRefresh:true,fastScrollEnd:true}});
  /* 4 blocchi + 3 connettori, ease:'none' su tutto */
  return ()=>tl.scrollTrigger.kill(true);
});
ScrollTrigger.config({limitCallbacks:true, ignoreMobileResize:true});
document.fonts.ready.then(()=>ScrollTrigger.refresh());
```
```js
/* magnetico: un solo elemento, moltiplicatore basso, INP-safe */
const fine=matchMedia('(hover:hover) and (pointer:fine)');
if(fine.matches && !matchMedia('(prefers-reduced-motion:reduce)').matches){
  const xTo=gsap.quickTo(cta,'x',{duration:.4,ease:'power3'}), yTo=gsap.quickTo(cta,'y',{duration:.4,ease:'power3'});
  let r=cta.getBoundingClientRect(); addEventListener('resize',()=>r=cta.getBoundingClientRect(),{passive:true});
  cta.addEventListener('pointermove',e=>{ xTo((e.clientX-(r.left+r.width/2))*.28); yTo((e.clientY-(r.top+r.height/2))*.28); });
  cta.addEventListener('pointerleave',()=>{xTo(0);yTo(0);});
}
```

---

## 8. BUDGET DI PERFORMANCE (nel contratto, non nelle buone intenzioni)
| Metrica | Target |
|---|---|
| LCP (mobile 4G, Moto G) | **< 1,8s** — l'elemento LCP e il testo dell'H1, mai un'immagine, mai un canvas |
| INP | **< 100ms** |
| CLS | **0,00** — un sito animato non ha scuse |
| Nodi DOM | **< 1.500** (SplitText su parole, mai su caratteri per paragrafi interi) |
| CSS critico inline | 14KB (1 RTT) · CSS totale 60KB gz |
| JS al primo render | 100KB gz — GSAP core 23 + ScrollTrigger 11 + SplitText 7 = **41KB gz**, zero jQuery |
| Font | <= 118KB (3 woff2 subsettati, preload dei 2 sopra la piega) |
| Animazioni concorrenti sopra la piega | **3** |
| ScrollTrigger totali / pin / scrub | pochi / **1** / **1** |
| `will-change` permanenti | **0** |
| `backdrop-filter` attivi | **1** (la nav) |
Stack raccomandato: **Astro statico + GSAP + Storyblok o Sanity** con content collections tipizzate (la build fallisce se manca un campo, invece di pubblicare una card rotta). Se il vincolo e restare su WordPress ed Elementor: child theme, zero animazioni native del builder, scene agganciate ad attributi `data-scene` sui container e non a classi generate, GSAP da locale, Rocket Loader disattivato, e la scena pinnata come primo elemento sacrificabile. Tetto realistico in quel caso: circa 7/10.

---

## 9. PRE-CONDIZIONI DI CONTENUTO (senza queste, la direzione anima il vuoto)
1. Riconciliazione dei numeri: un solo valore per concetto (clienti paganti / partecipanti eventi / lead), con data di aggiornamento, valido su sito, landing, LinkedIn e podcast.
2. Da 4 a 6 schede risultato documentate: logo, settore, numero di partenza, numero di arrivo, mesi, liberatoria.
3. Tre fascicoli caso studio completi. Fino a quel momento la sezione testimonianze **non esiste** (oggi la stessa frase placeholder compare sotto cinque nomi reali: e la cosa che fa perdere fiducia su tutto il resto della pagina, numeri compresi).
4. Certificazione: norma, ente, numero, scopo, scadenza. E l'asset di credibilita piu sottosfruttato del brand, e la pagina che dovrebbe ospitarlo oggi risponde 404.
5. Dati societari per il cartiglio di chiusura: ragione sociale, P.IVA, forma societaria.
6. Estensione della serie fotografica mano-su-nero-con-oggetto-arancione: cuffie (podcast), telefono (appuntamento), badge (reclutamento), calcolatrice (numeri), chiave (delega). Un oggetto per reparto: **sostituiscono le icone**, che in questo sistema non esistono.
7. Fotografia reale dell'ufficio di Via Marco D'Agrate 41 e delle persone al lavoro (nel luogo, non su fondo bianco).
8. Fonte del claim "-50% rischio di fallimento / -80% esaurire la cassa", oppure si elimina: in una sezione-numeri credibile un dato senza fonte contamina i dati con fonte.
9. Riparazione di `/risorse/` e `/politica-di-qualita/` (404 linkati dal footer) e slug `/team-2/` -> `/team/` con redirect 301.

---

## 10. COSA QUESTA DIREZIONE NON FA MAI
Gradienti arancio->bianco (il difetto centrale del sito attuale: attraversano il pivot di contrasto, quindi qualunque testo sopra fallisce da qualche parte). Superfici tinte d'arancio oltre alpha 0,10 (a 0,18 su nero atterrano su `#402915`: marrone). Testo bianco su fill arancione (2,49:1). Magenta `#CC3366` come colore decorativo. Glassmorphism, blob sfocati, `filter: blur()` in animazione. Card tutte uguali con icona tonda. Ombre morbide. Cursore custom. Scroll orizzontale forzato. Smooth scroll globale. Sequenze di immagini scrubbate. Contatori in loop. Countdown. Testo arancione sotto 15px. Piu di un elemento arancione in competizione nello stesso viewport. Nunito, Montserrat, Roboto, Roboto Slab. E, soprattutto: **nessuna sezione che contenga solo aggettivi**. Ogni fascia deve portare un nome proprio, un numero o un meccanismo — altrimenti non entra in pagina.
