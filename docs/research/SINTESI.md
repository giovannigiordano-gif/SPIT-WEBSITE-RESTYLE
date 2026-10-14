# SINTESI — SCALINATA VIVA — edizione definitiva

> Il sito non è una sequenza di sezioni: è un solo oggetto che sale — il quadrato del vostro marchio — e i tre quadrati che passano da un reparto all'altro sono letteralmente i tre passaggi di consegna su cui le aziende perdono fatturato.

## Executive summary

Il nuovo salesprocess.it nasce da una sola idea, e l'idea è già vostra: il marchio a scalinata. Quel quadrato diventa la particella elementare di tutto il sito — il segno delle liste, l'indicatore dei quattro reparti, la barra di avanzamento nel logo, il gradino che scopre le fotografie, la transizione fra le pagine. Il momento più spettacolare del sito non è un effetto: è il metodo 4 in 1 che si costruisce sotto gli occhi, con tre quadrati che passano da un reparto all'altro e, all'inizio, cadono nei vuoti — perché è esattamente quello che succede quando i quattro reparti sono quattro fornitori diversi. Il movimento porta l'argomento di vendita, non se stesso.

Dal riferimento indicato (Sharpify) prendiamo il rigore: un solo fondo nero caldo, gerarchia costruita con la luce e non con una tavolozza, densità informativa alta, un solo accento. Non prendiamo la pelle: l'arancio #FF8200 torna a essere segnale — meno del 3% dei pixel — il nero diventa il fondo nativo delle vostre fotografie (le mani con l'oggetto arancione smettono di essere ritagli e diventano pagina), e il payoff FATTURARE FATTURARE FATTURARE chiude il sito come titolo, a 152px, non come decorazione.

Tre cose sono non negoziabili perché il sito regga: i numeri riconciliati con una data, sei schede-risultato con liberatoria, e i tre passaggi di consegna scritti nero su bianco. Senza quei dati il sito resta bello e vuoto — e con questa direzione il vuoto si nota.

## Token

```css
/* ═══════════════════════════════════════════════════════════════════════════
   SCALINATA VIVA · tokens.css — UNICA FONTE DI VERITÀ
   ---------------------------------------------------------------------------
   DUE SOGLIE, da cablare in un test automatico di build (non in code review).
   Su --c-base #0C0B0A:
     α ≥ .455  perché un bianco trasparente sia TESTO corpo legale (4,5:1)
     α ≥ .340  perché un bordo sia un CONFINE UI legale (3:1, WCAG SC 1.4.11)
   Sotto quelle soglie non esiste alcun token.
   ---------------------------------------------------------------------------
   QUATTRO DIVIETI ASSOLUTI (il test di build li verifica):
     1. MAI animare font-variation-settings / font-weight / font-size:
        non sono compositabili → relayout + reraster dei glifi per frame.
     2. MAI testo bianco su fill arancione: #FFF su #FF8200 = 2,49:1.
        Ogni fill arancione porta testo #0C0B0A (8,45:1).
     3. MAI superfici tinte d'arancio oltre α .10: #FF8200@.18 su base
        collassa a #382008, cioè MARRONE (chroma .185 → .047).
     4. MAI gradienti arancio↔bianco: attraversano il pivot di contrasto.
   ---------------------------------------------------------------------------
   NOTA GAMUT: #FF8200 ha B=0 e R clippato a 255 → headroom ZERO. Non esiste
   un arancio "più brillante" per l'hover. Il modello di interazione è
   INVERTITO: l'hover scurisce il fill (#E87300) e allarga il glow.
   ═══════════════════════════════════════════════════════════════════════════ */

:root{

  /* ── GEOMETRIA DEL BRAND ───────────────────────────────────────────────
     Tutto deriva da DUE INTERI. Se la misurazione sul vettoriale originale
     dà una pendenza diversa, si cambiano questi due numeri e la scalinata,
     la maschera, il percorso degli handoff e il wipe si rigenerano.        */
  --passo-rise: 1;
  --passo-run:  2;
  --angolo: 26.57deg;        /* atan(1/2). UNICO angolo del sito.
                                Usato SOLO su: mark, maschera a gradini,
                                percorso degli handoff, wipe di pagina.    */
  --q:      12px;            /* la particella */
  --q-r:    2px;             /* raggio della particella */
  --q-gap:  4px;

  /* ── FONDI E SUPERFICI — neutre, mai tinte d'arancio ─────────────────── */
  --c-base:      #0C0B0A;    /* near-black CALDO (R12 > B10): un fondo caldo
                                smorza l'arancio invece di eccitarlo.
                                ~92% della pagina. Bianco sopra 19,67:1     */
  --c-base-deep: #080706;    /* footer, inserti */
  --c-foto:      #000000;    /* SOLO dentro le fotografie full-bleed.
                                Mai come fondo di sezione (su OLED i bordi
                                hairline collassano)                        */
  --c-sup-1: rgba(255,255,255,.035);   /* → #151413 · 1,07:1 · fascia      */
  --c-sup-2: rgba(255,255,255,.060);   /* → #1B1A19 · 1,13:1 · card        */
  --c-sup-3: rgba(255,255,255,.090);   /* → #222120 · 1,22:1 · card:hover  */
  --c-sup-nav: rgba(10,9,8,.94);       /* unico backdrop-filter del sito   */
  --c-velo:  #3B2413;        /* superficie calda OPACA, non alpha: così
                                nessuno la scala e nessuno genera fango.
                                Arancio sopra = 5,82:1                     */
  --c-carta: #EAE6DE;        /* UNICA rottura di valore · ≤2,5% dei pixel  */
  --c-inchiostro:   #14120F; /* su carta 15,02:1 */
  --c-inchiostro-2: #6A6762; /* su carta  4,52:1 — gradino minimo lì       */

  /* ── BORDI — tre step per RUOLO, non sei per abitudine ───────────────── */
  --c-filo:      rgba(255,255,255,.10);  /* → #242323 1,25:1  DECORATIVO   */
  --c-filo-forte:rgba(255,255,255,.18);  /* → #383736 1,66:1  DECORATIVO   */
  --c-bordo-ui:  rgba(255,255,255,.34);  /* → #5F5E5D 3,04:1  ✓ SC 1.4.11
                                            OBBLIGATORIO su ogni elemento
                                            interattivo                    */
  --c-bordo-attivo: rgba(255,130,0,.42);

  /* ── TESTO — quattro gradini, non diciotto ──────────────────────────── */
  --c-t1: #FFFFFF;                     /* 19,67:1 */
  --c-t2: rgba(255,255,255,.72);       /* → #BBBBBA 10,24:1 */
  --c-t3: rgba(255,255,255,.50);       /* → #868585  5,34:1 */
  --c-t4: rgba(255,255,255,.38);       /* → #686867  3,53:1 · SOLO ≥24px  */
  --c-t-su-arancio: #0C0B0A;           /* obbligatorio su ogni fill        */

  /* ── ARANCIO — famiglia a cinque livelli per luminanza ───────────────── */
  --c-ar-hot:   #FF9A38;   /* 9,30:1 · SOLO hover di link testuali. È già
                              desaturato e vira al giallo: mai come fill.  */
  --c-ar:       #FF8200;   /* 7,91:1 su base · nero sopra 8,45:1 · IL BRAND */
  --c-ar-fill:  #E87300;   /* 6,45:1 · hover/active dei fill (verso il basso) */
  --c-ar-pivot: #B85B00;   /* pareggio nero 4,53 / bianco 4,63             */
  --c-ar-deep:  #8A4300;   /* 2,70:1 su base → MAI testo su nero.
                              5,84:1 su carta → l'accento della banda chiara.
                              Bianco sopra 7,28:1 → fill con testo bianco. */

  /* ── LUCE — nucleo BIANCO + aureola arancione ────────────────────────── */
  --glow-core:  rgba(255,255,255,.90);
  --glow-halo:  rgba(255,130,0,.28);
  --glow-halo-f:rgba(255,130,0,.50);
  --e-glow: 0 0 10px var(--glow-core), 0 0 34px var(--glow-halo),
            0 0 72px var(--glow-halo);
  --e-glow-testo: 0 0 12px rgba(255,255,255,.55), 0 0 40px var(--glow-halo),
                  0 0 75px var(--glow-halo);   /* UNICO text-glow del sito */
  --e-ambient: radial-gradient(ellipse 72% 46% at 50% 8%,
               rgba(255,130,0,.14) 0%, transparent 64%);

  /* ── OMBRE NEUTRE — profondità, separata dall'importanza ─────────────── */
  --e-1: 0 1px 12px rgba(0,0,0,.30);
  --e-2: 0 12px 32px rgba(0,0,0,.44);
  --e-3: 0 24px 72px rgba(0,0,0,.56);

  /* ── SEMANTICI — hue lontane dal brand ──────────────────────────────── */
  --c-ok:      #4ADE80;   /* 11,29:1 */
  --c-warn:    #FFD84D;   /* giallo PURO, non ambra: l'ambra collide       */
  --c-rottura: #CC3366;   /* 3,96:1 → solo bordi/glifi ≥24px o fill con
                             testo bianco. È il colore della PERDITA:
                             compare solo sui passaggi che si rompono.     */
  --c-info:    #7AA2FF;   /* 7,90:1 */
  --c-errore-testo: #FF9AB8;  /* testo d'errore su base: 7,4:1            */

  /* ── TIPOGRAFIA ─────────────────────────────────────────────────────── */
  --f-display: 'Red Hat Display', 'Segoe UI', system-ui, sans-serif;
  --f-testo:   'Red Hat Text', 'Segoe UI', system-ui, sans-serif;
  --f-mono:    'IBM Plex Mono', ui-monospace, 'Cascadia Mono', monospace;
  --f-voce:    'Instrument Serif', Georgia, 'Times New Roman', serif;

  /* legge del tracking: tre plateau, inversione di segno fra 15 e 17px    */
  --tr-muro:    -.045em;   /* ≥112px                                       */
  --tr-display: -.040em;   /* 32–111px · PLATEAU PIATTO, un solo token     */
  --tr-titolo:  -.020em;   /* 22–31px                                      */
  --tr-corpo:   -.010em;   /* 17–21px                                      */
  --tr-piccolo: +.020em;   /* 15–16px                                      */
  --tr-meta:    +.040em;   /* 13–14px                                      */
  --tr-eyebrow: +.140em;   /* ≤12px UPPERCASE                              */
  --tr-micro:   +.100em;   /* 11px mono, righe fonte/data                  */

  /* ── SPAZIO — scala vera, tutto multiplo di 4 ───────────────────────── */
  --s-1:4px;  --s-2:8px;  --s-3:12px; --s-4:16px; --s-5:24px; --s-6:32px;
  --s-7:48px; --s-8:64px; --s-9:96px; --s-10:128px; --s-11:168px;

  /* ── CONTENITORI — si stringono al crescere della densità di lettura ── */
  --w-nav:1440px; --w-piena:1320px; --w-griglia:1200px;
  --w-editoriale:1120px; --w-statement:1040px; --w-lettura:68ch;
  --gutter:18px; --margine:40px;

  /* ── RAGGI — quattro, non undici ────────────────────────────────────── */
  --r-hard:2px;    /* particella, chip mono, celle, campi form            */
  --r-card:12px;
  --r-panel:20px;
  --r-pill:999px;  /* SOLO i CTA. Nessuna eccezione.                      */

  /* ── MOTION ─────────────────────────────────────────────────────────── */
  --t-tap:      120ms;   /* feedback tattile                              */
  --t-micro:    200ms;   /* micro-stato: color, background, border-color   */
  --t-stato:    320ms;   /* cambi di stato di pannello, underline wipe     */
  --t-reveal:   620ms;   /* UNICA durata d'ingresso della materia          */
  --t-maschera: 760ms;   /* mask reveal delle righe display                */
  --t-apertura: 940ms;   /* la sola sequenza di apertura                   */
  --stagger:      70ms;
  --stagger-riga:140ms;
  --ease-salita: cubic-bezier(.16,.84,.24,1);  /* LA curva: ogni ingresso  */
  --ease-scatto: cubic-bezier(.62,0,.20,1);    /* scambi bidirezionali     */
  --ease-quadro: steps(4,end);                 /* progress e wipe: 4 step  */
  /* scrub e loop: SEMPRE linear / ease:'none' — l'easing lo fa lo scroll  */

  --travel: 20px;                              /* componente VERTICALE     */
  --dy: var(--travel);                         /* +20px                    */
  --dx: calc(var(--travel) * -.45);            /* -9px: una CITAZIONE della
                                                  diagonale, non la diagonale.
                                                  Il testo non la usa mai. */
  --lift-btn: 2px;  --lift-card: 3px;          /* ampiezza max di hover    */
  --nastro-v: .030;                            /* px/ms → 30px/s DELTA-TIME */
  --nastro-stato: running;
  --z-grana:60; --z-nav:9000; --z-barra:9500; --z-overlay:9800;
}

/* ── REDUCED MOTION: token, non interruttore ──────────────────────────────
   MAI `*{animation:none!important}`: rompe accordion e dropdown e fa
   scomparire per sempre ogni elemento con fill-mode:both che parte da
   opacity 0. Qui il travel va a zero, la dissolvenza sopravvive, ogni
   stato resta raggiungibile.                                             */
@media (prefers-reduced-motion: reduce){
  :root{
    --t-tap:1ms; --t-micro:100ms; --t-stato:140ms;
    --t-reveal:180ms; --t-maschera:180ms; --t-apertura:200ms;
    --travel:0px; --dx:0px; --dy:0px;
    --nastro-stato:paused;
  }
  html{ scroll-behavior:auto }
}

/* ── PREFERENZE ADIACENTI, rispettate gratis ─────────────────────────── */
@media (prefers-contrast: more){
  :root{ --c-filo:rgba(255,255,255,.22); --c-filo-forte:rgba(255,255,255,.34);
         --c-t3:rgba(255,255,255,.62); --c-t4:rgba(255,255,255,.50) }
}
@media (prefers-reduced-transparency: reduce){
  .nav.is-fissa{ background:#0C0B0A; backdrop-filter:none }
}
```

## Sezioni

- 00 · BARRA CRITERIO — fixed, top 0, h 40px, z 9500, background #0C0B0A, border-bottom 1px var(--c-filo), body{padding-top:40px}. FUNZIONE: legittimare il CTA selettivo dal primo pixel di ogni schermata. È l'elemento con il miglior rapporto conversione/pixel del sito, e per questo NON si spende sull'evento. LAYOUT: flex, gap 12px, padding 0 44px 0 20px, IBM Plex Mono 500 11px +.14em uppercase --c-t2, con i valori numerici in --c-t1. Quadrato 8px --c-ar, STATICO (nessun pulse: SC 2.3.1 e budget di movimento). X di chiusura a destra, --c-t3 → --c-t1, che scrive html.barra-off e persiste in localStorage. COPY: «■ CANDIDATURE APERTE · FATTURATO 1–5 M€ · NO START-UP · 9 SLOT NEL TRIMESTRE, 4 ASSEGNATI · RISPOSTA IN 48 ORE». DEGRADAZIONE dichiarata: @860px cade «9 SLOT NEL TRIMESTRE, 4 ASSEGNATI»; @480px resta «■ FATTURATO 1–5 M€ · RISPOSTA IN 48 ORE». MOTION: nessuno. Entra con la pagina.
- 01 · NAV STICKY — fixed, top 40px, h 72px (56px <1024), z 9000, background transparent → var(--c-sup-nav) + backdrop-filter saturate(150%) blur(18px) + border-bottom var(--c-filo), transition 320ms var(--ease-scatto). FUNZIONE: dire che questo è un sito costruito, non una landing (oggi: hamburger + un CTA su 4.363px). ISTERESI OBBLIGATORIA a due soglie — attiva a 48px, disattiva a 12px — altrimenti il backdrop-filter sfarfalla su trackpad e rubber-band: `let on=false;const f=()=>{const y=scrollY;if(!on&&y>48){on=true;nav.classList.add('is-fissa')}else if(on&&y<12){on=false;nav.classList.remove('is-fissa')}};addEventListener('scroll',f,{passive:true});f()`. LAYOUT: mark 34px (con i 4 quadrati che fanno da barra di avanzamento) + wordmark → voci margin-left 26px gap 2px → destra margin-left auto gap 12px. Voci: Red Hat Text 500 15px, --c-t2 → --c-t1, padding 8px 14px, radius 8px, hover background var(--c-sup-2) + underline wipe 320ms. NESSUN transform in header (gerarchia di hover a due livelli: in header solo colore, in pagina colore + lift). Pill CTA normalizzata a forza: height 40px, radius 999px, font 700 14px/1 var(--f-testo), padding-block 0 — è il singolo intervento che fa sembrare la nav disegnata. COPY: «Metodo · Risultati · Chi siamo · Eventi» + pill «Candida la tua azienda». @1024px: voci display:none, burger 44×44 con --c-bordo-ui, fondo OPACO di default (su mobile la trasparenza si rinuncia). MOTION: i 4 quadrati del mark si accendono in arancio uno per uno con animation-timeline: scroll(root block) ed --ease-quadro (steps(4,end)) — compositor thread, zero JS, il marchio fa un lavoro invece di stare fermo.
- 02 · HERO — min-height 100svh, padding-top 168px (copre 40+72=112px di chrome + 56 di aria), --e-ambient dietro il titolo, contenitore 1320px, griglia 12 col: testo col 1-7, fotografia col 8-12. FUNZIONE: una sola promessa che NEGA l'alternativa che il prospect ha già in testa (comprare contatti, o quattro fornitori), più il criterio d'accesso. COPY — eyebrow: «■ 01 — AGENZIA 4 IN 1 · DAL 2020 · MILANO». H1 su due righe: «Non ti vendiamo contatti. Ti consegniamo il reparto che FATTURA.» con FATTURA in --c-ar (vincolo CMS: H1 max 60 caratteri, i break scritti in markup). Deck: «Pubblicità, marketing a risposta diretta, reclutamento e formazione della rete vendita: quattro reparti sotto lo stesso tetto, allineati su un numero solo. Il tuo.» CTA primario pill «Candida la tua azienda» + sotto-label mono OBBLIGATORIA «FATTURATO 1–5 M€ · NO START-UP · RISPOSTA IN 48 ORE LAVORATIVE». Secondario outline «Guarda come funziona il 4 in 1 →» (anchor alla scena del metodo). Voce narrante in Instrument Serif Italic 26px/1.35 --c-t2, max 34ch, preceduta da un filetto 24px, sotto la fotografia: «Il primo oggetto che consegniamo è un contratto firmato da qualcun altro.» — è il primo dei due soli usi del serif, e porta il calore nei primi 1.000px. LAYOUT fotografia: mano-su-nero con la penna arancione, aspect-ratio 4/5, scoperta dalla MASCHERA A SCALINATA a 4 colonne (momento-firma 2). MOTION: la sequenza di apertura in 940ms, CSS al parse, non gated da JS (momento-firma 1).
- 03 · NASTRO DELLE PROVE — h 470px, giuntato a filo con l'hero: a 900px di viewport i primi ~260px delle schede sono SOPRA la piega, quindi lo scroll parte per curiosità e non per dovere. FUNZIONE: la prova entra prima dell'offerta, con nomi, settore, provincia, finestra temporale, fonte e data. COPY — eyebrow: «■ 02 — I NUMERI DEI CLIENTI, NON LE PROMESSE». Scheda: header mono «SCHEDA 03 / 06» + «IMPIANTISTICA · BERGAMO»; numerone bianco «DA 1,4 A 3,1 M€»; label mono «FATTURATO IN 11 MESI»; sparkline 246×40 stroke 1,5px --c-ar con vector-effect non-scaling-stroke e asse in --c-ar-deep (è l'unico lavoro di LINEA del sito: l'arancio come traccia, non come area); piede micro «FONTE: CRM CLIENTE · AGG. 08.2026 · CON LIBERATORIA». Hover (che a Sharpify manca del tutto): bordo → --c-bordo-ui e in 200ms sale dal basso una terza riga «CANALE: META + TELEFONO · 4 VENDITORI RECLUTATI · CHIUSURA MEDIA 21 GG» — densità informativa in più, movimento in più zero. Riga sotto il nastro, mono --c-t3: «6 schede su 150 clienti: le altre non hanno liberatoria, non un risultato peggiore.» — una riga che disinnesca «avete scelto i migliori» meglio di tre testimonianze. Bottone reale «❚❚ FERMA IL NASTRO», 40×40, --c-bordo-ui, aria-pressed. LAYOUT: schede 274×366 (aspect 3/4), radius --r-panel, gap 18px, fotografia reale del cliente + scrim a 4 stop linear-gradient(180deg, rgba(0,0,0,.28) 0%, rgba(0,0,0,.38) 40%, rgba(0,0,0,.60) 75%, rgba(0,0,0,.74) 100%); chip di vetro 246×60 con background rgba(0,0,0,.28), backdrop-filter blur(2px), border 1px rgba(255,255,255,.55), radius 2px — e NIENTE text-shadow: il chip ha già vetro e bordo. Track con mask-image linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent). MOTION: momento-firma 3.
- 04 · I VOLTI — h ~760px, contenitore 1200px, griglia 4 colonne (una per reparto) × 2 righe, gap 18px. FUNZIONE: qui facciamo l'OPPOSTO di Sharpify, che può essere un'entità senza facce perché vende software-like. Noi vendiamo persone che entrano in azienda, e il compratore italiano di PMI compra dalla faccia — per questo la fascia sta a ~1.500px e non dopo il pin. COPY — eyebrow «■ 03 — IL METODO HA UNA FACCIA»; H2 «Il reparto che ti consegniamo ha nomi e cognomi.»; deck «Trentaquattro persone, quattro reparti, un ufficio in Via Marco D'Agrate 41 a Milano. Queste otto lavorano sulla tua azienda.» Ogni ritratto porta il tag del reparto in mono 11px su --c-velo: «REPARTO 03 / 04 · RECLUTAMENTO», poi nome in Red Hat Text 700 19px e ruolo in mono 13px --c-t3. Riga fattuale sotto la griglia: «Alberto Frisoni, fondatore · 750 processi di vendita realizzati · oltre 500 venditori gestiti · due libri · il podcast dal 2023.» Seconda riga, una sola, senza patrimoni personali: «Co-founder: Alfio Bardolla — gruppo quotato su Euronext Growth Milan, oltre 100 dipendenti.» LAYOUT ritratti: 1/1, radius 12px, monocromia calda al 92% → 100% in hover, un solo oggetto arancione per scatto. VIETATO il duotone nero/arancio: disumanizza esattamente la prova che converte di più. MOTION: reveal L3 (rise diagonale 20px/-9px) con animation-timeline: view(), stagger derivato da --i via animation-range-start (l'animation-delay NON si applica alle timeline scroll-driven).
- 05 · IL CONTRO-ESEMPIO — h ~340px, testa a sinistra su 8 colonne con 404px vuoti a destra, fondo --c-base, giunzione a filo. FUNZIONE: costruire il problema PRIMA di vendere la soluzione, in una fascia statica e leggibile a motion spento — il contro-esempio non si affida a un frame di scrub né a un interruttore che nessuno premerà. COPY — eyebrow «■ 04 — PRIMA DI PARLARE DEL METODO»; H2 «Quattro fornitori diversi non sono un reparto. Sono tre passaggi che cadono per terra.»; deck «L'agenzia che compra la pubblicità non parla con chi scrive le mail. Chi scrive le mail non sa chi hai assunto. Chi hai assunto non l'ha formato nessuno. Tu paghi quattro volte lo stesso contatto, e nessuno risponde del numero finale.» LAYOUT: sotto il deck, quattro blocchi in fila con i tre connettori interrotti — SVG path stroke 2px --c-rottura, stroke-dasharray 6 6, spezzati al centro con un glifo di rottura a 26,57°, e su ciascuno una chip mono «PASSAGGIO PERSO». MOTION: nessuno oltre al reveal L3. I connettori sono disegnati, non animati: questa fascia deve funzionare come screenshot.
- 06 · LO STATEMENT — h ~480px, contenitore 1040px, padding-bottom 128px (il respiro più grande della pagina), l'unico blocco davvero vuoto. FUNZIONE: l'identità in una frase, ed è l'UNICO elemento scrubbato di tutti i 7.400px. COPY — eyebrow «■ 05 — CHI SIAMO»; statement (Red Hat Display 800, clamp(28px,3.4vw,50px), lh 1.18, ls -.035em, max 18ch per riga, allineato a sinistra): «Quattro reparti sotto lo stesso tetto. Un numero solo da guardare: il tuo fatturato.» Le ultime tre parole — «il tuo fatturato» — arrivano a --c-ar. LAYOUT: nessuna card, nessun bordo, solo testo. MOTION: momento-firma 4 (SplitText su PAROLE, mai su caratteri).
- 07 · IL METODO 4 IN 1 — l'UNICA scena pinnata del sito, 900px di viewport + 240% di corsa (2.160px), solo ≥1024px. FUNZIONE: il movimento È il concetto. Sposta l'argomento dai quattro reparti ai TRE PASSAGGI DI CONSEGNA, che è la cosa che nessun competitor italiano sta dicendo. COPY — eyebrow «■ 06 — IL METODO 4 IN 1»; H2 «Il fatturato non si perde nei reparti. Si perde nei passaggi fra i reparti.» Colonne: «REPARTO 01 / 04 · PUBBLICITÀ — Compriamo attenzione dove i tuoi clienti sono già, online e offline, con un budget che rendiconta ogni euro.» / «REPARTO 02 / 04 · MARKETING A RISPOSTA DIRETTA — Profiliamo ed educhiamo chi arriva, prima che parli con un venditore.» / «REPARTO 03 / 04 · RECLUTAMENTO — Annunci, colloqui, prove sul campo, inserimento. I venditori restano tuoi.» / «REPARTO 04 / 04 · FORMAZIONE RETE VENDITA — Script, affiancamento, numeri ogni settimana. Le performance non si alzano una volta: si mantengono.» Handoff (pill mono su --c-velo che NASCE dal quadrato in viaggio): «1 CONTATTO GREZZO → SLA 24 H · CRM CONDIVISO», «1 CONTATTO EDUCATO → SLA 24 H · SCHEDA PROFILO», «1 VENDITORE OPERATIVO → SLA 30 GG · SCHEDA COMPETENZE». Uscita: «LA TRATTATIVA — Il contatto educato incontra il venditore formato. È l'unico punto in cui nasce il fatturato.» Ogni stazione porta il nome e il ritratto 44px della persona che la presidia. Primo elemento focusabile della sezione: skip-link «Salta la scena del metodo →». LAYOUT: 4 colonne da 280px, ognuna con indice mono, nome, 7 mattoni da 16px in salita (gap 4px), claim max 80 caratteri, persona. MOTION: momento-firma 5. Sotto 1024px il pin non esiste: 4 blocchi sticky + 3 blocchi handoff con animation-timeline: view().
- 08 · COSA ENTRA, COSA ESCE — tabella reale e filtrabile, padding-block 128px, larghezza 1320px. FUNZIONE: rendere la prova ISPEZIONABILE invece di descriverla — ed è lo stesso artefatto che fa da versione reduced-motion, screen-reader, stampabile, indicizzabile da Google e da fallback desktop del pin. Un solo blocco, cinque lavori. COPY — eyebrow «■ 07 — COSA ENTRA, COSA ESCE»; H2 «Ogni reparto ha un input, un output, un tempo e un nome.» Colonne (200/300/300/120/240/200): «REPARTO · COSA RICEVE · COSA CONSEGNA · SLA · STRUMENTO · CHI RISPONDE». Sopra la tabella cinque chip di filtro REALI (<button aria-pressed> in un role=group aria-label='Filtra per reparto'): «TUTTI · PUBBLICITÀ · MARKETING · RECLUTAMENTO · FORMAZIONE» con contatore vivo «12 righe su 28». LAYOUT: thead mono 12px/600 +.10em uppercase --c-t3, h 44px, background var(--c-sup-1), border-bottom var(--c-filo-forte); td mono 15px ls 0 (tracciare le cifre fa oscillare le colonne) tabular-nums --c-t2, h 56px; prima colonna --c-t1 500 e position:sticky left 0. Chip selezionato: background var(--c-velo), border-color var(--c-bordo-attivo), color var(--c-ar). @760px la tabella CAMBIA FORMA in card <dl>, non scorre in orizzontale. MOTION: al click del filtro, document.startViewTransition() con UN SOLO view-transition-name sul wrapper (mai 28 nomi per riga: nome duplicato = transizione abortita in silenzio + 28 snapshot su un evento INP). Fallback: righe uscenti opacity 1→0 in 120ms, entranti opacity + translateY(8px) in 200ms, stagger 24ms, max 12 righe animate.
- 09 · I NUMERI — h ~440px, tre card 377×350, gap 30px, offset a scalinata calc(var(--i) * -12px). FUNZIONE: prova di scala, ma sempre con la data, la fonte e un nome proprio nella stessa schermata — davanti a un numero grande e anonimo l'imprenditore italiano pensa «gonfiato». COPY — eyebrow «■ 08 — DAL 2020, SENZA ARROTONDARE»; H2 «I numeri, con la loro data e la loro fonte.» Card: «150 IMPRENDITORI SEGUITI» / «33 SETTORI DIFFERENTI» / «750 PROCESSI DI VENDITA REALIZZATI». Micro-label mono su ogni card: «AGG. 09.2026 · FONTE: GESTIONALE INTERNO». Link terziario: «Vedi i 33 settori, uno per uno →» (la granularità batte la grandezza). Riga con nome proprio nella stessa schermata: «L'ultimo entrato: Evergreen Life, impiantistica, ingresso a 1,4 M€.» LAYOUT card a lente: wrapper radius 12px, overflow hidden, padding 2px (la feritoia), background rgba(59,36,19,.32); dentro .blob 250×280 border-radius 50% filter blur(40px) background #8A4300 z-index -1; .inner backdrop-filter blur(80px), background rgba(20,14,10,.62), border 2px rgba(255,130,0,.28), radius 12px, padding 44px 30px. Il bagliore esce dai 2px e viene diffuso dal vetro: non è un box-shadow, è una lente — e il nucleo resta bianco, perché arancio@.30 diretto su nero dà #552F07, marrone. Gerarchia interna a 5 livelli: colonna di quadrati → numero Red Hat Display 800 clamp(56px,7.4vw,112px) BIANCO tabular-nums con min-inline-size in ch → unità (M€, +, %) in span separato 36px --c-ar → etichetta 16px/600 caps --c-t2 → micro-label mono --c-t3. Rapporto 112:11 dentro 350px: la monumentalità viene dal contrasto interno. MOTION: ZERO count-up (vedi YAGNI). Il numero appare già finito — CLS 0 per costruzione, leggibile al primo frame. Accanto, una colonna di N quadrati (max 12, poi il moltiplicatore mono «×10») si impila dal basso con animation-timeline: view(), animation-range: entry 20% cover 45%, stagger via animation-range-start derivato da --i, e SOLO l'ultimo quadrato è arancione.
- 10 · I TRE FASCICOLI — tre card full-width 1120px, radius 20px, padding-block 128px. FUNZIONE: la prova nominale, l'unica che l'imprenditore italiano accetta davvero. COPY — eyebrow «■ 09 — TRE FASCICOLI»; H2 «Prima e dopo, con i mesi in mezzo.» Card: cartiglio mono «FASCICOLO 01 · IMPIANTISTICA · LOMBARDIA · 11 MESI»; logo cliente h 28px monocromatico al 60% → 100% in hover (SVG monocromatici chiesti a monte: mai filter:invert(1) + mix-blend-mode, si rompono con qualsiasi logo a colori); numero «DA 1,4 A 3,1 M€» Red Hat Display 800 56px con l'unità in arancio; riga dati mono su quattro voci «FATTURATO DI PARTENZA 1,4 M€ · 14 VENDITORI RECLUTATI · CANALE META + FIERE · FONTE CRM CLIENTE»; elenco di cosa è stato fatto reparto per reparto, con il quadrato del mark come segno di lista (mai un pallino, mai un'icona tonda); citazione in Instrument Serif Italic 26px/1.35 — è il SECONDO e ultimo uso del serif in tutta la pagina — con attribuzione mono «NOME COGNOME · RUOLO · AZIENDA». LAYOUT: griglia 1.1fr 1fr, fotografia a sinistra con maschera a scalinata (max 2 per viewport), pannello --c-sup-2 padding 48px a destra. VINCOLO DI CONTENUTO: nessun fascicolo si pubblica senza settore, numero di partenza, numero di arrivo, finestra temporale, fonte e liberatoria scritta. Meglio uno vero che tre vuoti — e finché non arrivano, la sezione monta 1 card e la riga «Il secondo e il terzo fascicolo escono quando i clienti firmano la liberatoria.» MOTION: reveal L3 + maschera a scalinata all'ingresso, one-shot.
- 11 · CHI ENTRA, CHI NO — due colonne 1/1 divise da una regola verticale --c-filo, padding-block 128px. FUNZIONE: rendere VERIFICABILE la selettività, che è l'unica cosa che giustifica «Candida la tua azienda». Senza criterio è posa; con criterio e contatore è serietà. COPY — eyebrow «■ 10 — CHI ENTRA, CHI NO»; H2 «Non lavoriamo con tutti. Il filtro è scritto prima, non dopo.» Colonna A «ENTRI SE» (quadrato arancione per voce): «Fatturi tra 1 e 5 milioni.» / «Hai un prodotto o un servizio già validato dal mercato, anche se vende male.» / «Hai un margine che regge un reparto.» / «Sei un titolare che decide, non un comitato.» / «Sei disposto a guardare i numeri ogni settimana.» Colonna B «NON ENTRI SE» (glifo di esclusione a 26,57° in --c-rottura): «Fatturi meno di un milione.» / «Sei una start-up senza storico.» / «Cerchi contatti da rivendere.» / «Vuoi delegare tutto e non vedere più niente.» Piede mono su tutta la larghezza: «Q4 2026 · 31 CANDIDATURE RICEVUTE · 9 SLOT · 4 ASSEGNATI · AGG. 09.09.2026». Nessun countdown: la scarsità si dichiara come fatto strutturale, mai come pressione temporale. MOTION: reveal L3, stagger 70ms, catena massima 5 elementi.
- 12 · LA CARTA — UNICA rottura di valore del sito, h ~200px (2,4% della pagina), fondo #EAE6DE, inchiostro #14120F, accento #8A4300 (perché #FF8200 su carta dà 2,00:1 ed è VIETATO come testo lì), giunzione a filo. FUNZIONE: la prova istituzionale, che in Italia pesa più di dieci testimonianze auto-pubblicate — ed è il proof point che Sharpify non ha. Arriva dopo ~6.000px di nero, quindi colpisce come un flash. COPY — label mono 12px +.18em #6A6762, margin-bottom 56px: «QUELLO CHE PUOI VERIFICARE PRIMA DI PARLARCI». A sinistra la riga di loghi stampa; a destra il blocco verificabile in mono nero: «ISO 9001:2015 · ENTE [da cliente] · CERTIFICATO N. [da cliente] · SCADENZA [da cliente]» con link al PDF, e sotto «[Ragione sociale] · P.IVA [da cliente] · Sede legale Capiago Intimiano (CO) · Sede operativa Via Marco D'Agrate 41, Milano». LAYOUT loghi: altezza base 26px con OVERRIDE MANUALE per singolo logo (23–42px), perché l'altezza uguale non dà peso ottico uguale — sono sei righe di CSS e sono direzione artistica vera; filter grayscale(1), opacity .85 → 1 in hover; mask-image linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent). Focus ring qui: outline 2px solid #14120F. VIETATI mix-blend-mode:multiply e filter:invert(1). MOTION: marquee 52s linear se i loghi sono più di sei, con pausa su hover E focus-within e un bottone di pausa reale; sotto reduced-motion animation:none + overflow-x:auto.
- 13 · CARTELLO FINALE FATTURARE ×3 — h ~700px, contenitore 1320px, i quattro segni di taglio hairline agli angoli. FUNZIONE: il payoff arriva alla FINE come titolo del film, non al 5% della pagina come decorazione — così i primi 3.000px restano a disposizione della prova. COPY: tre righe a scalinata, indent 0 / 5.5ch / 11ch (il passo del mark), Red Hat Display 900, clamp(56px,10.4vw,152px), lh .92, ls -.045em: FATTURARE / FATTURARE / FATTURARE — la terza in --c-ar e con il --e-glow-testo, che è l'UNICO text-glow di tutta la pagina. Le virgole del payoff cadono nello stack verticale; il punto esclamativo non esiste. Sotto, mono 13px --c-t3: «È l'unica cosa che misuriamo. Ed è anche il nome del nostro podcast, dal 2023.» CTA terziario con underline wipe: «Ascolta l'ultimo episodio →». Questa sezione è anche il contenitore editoriale del sito: la pagina risorse non si chiama Blog, si chiama Fatturare Fatturare Fatturare. MOTION: momento-firma 6 — zero JS.
- 14 · LA CANDIDATURA E IL CAFFÈ — h ~720px, fotografia vera dell'ufficio di Via Marco D'Agrate a piena larghezza come fondo con scrim, form su --c-sup-2 a destra. FUNZIONE: chiudere VALUTANDO, non implorando, e spostare la conversione da un form a un luogo fisico. UNA VOLTA SOLA in tutto il sito (oggi il blocco caffè è incollato identico su home, quiz, eventi e carriera). COPY — H2 «Candida la tua azienda. Oppure vieni a prendere un caffè.»; deck «Via Marco D'Agrate 41, Milano, quarto piano. Il caffè lo facciamo noi. Se preferisci partire da una chiamata, va bene uguale.» Tre criteri a quadrati accesi: «■ Fatturato tra 1 e 5 milioni» / «■ Un prodotto o un servizio già validato» / «■ Nessuna start-up». Cinque campi: azienda, fatturato annuo (select a fasce: sotto 1 M€ / 1–2 / 2–3 / 3–5 / oltre 5), settore, nome e ruolo, telefono. Bottone «Invia la candidatura». Micro-copy di sistema: «La leggiamo noi, non un software. Ti rispondiamo entro 48 ore lavorative.» SQUALIFICA IN TEMPO REALE: selezionando «sotto 1 M€» il bottone diventa «Iscriviti alla newsletter» e compare, senza attendere l'invio, «Non è un no per sempre: è un no per adesso. Ti mandiamo il podcast e ci riparliamo quando sei sopra il milione.» — il quiz viene assorbito dal form (zero passi aggiuntivi, meno candidature da leggere a mano, lead non idoneo parcheggiato invece che bruciato) e /quiz/ va in 301 su questa sezione. LAYOUT campi: height 56px, background var(--c-sup-2), border 1px var(--c-bordo-ui), radius 2px, 17px var(--f-testo), label SEMPRE visibile sopra il campo in mono 12px caps --c-t3 (mai il placeholder come label). Focus: border-color var(--c-ar) + box-shadow 0 0 0 3px rgba(255,130,0,.18). Errore: bordo --c-rottura + glifo + testo in --c-errore-testo + aria-live=polite — mai il solo colore. Successo: il form collassa e i quattro quadrati si impilano una volta sola. MOTION: reveal L3. Su mobile, la piastra CTA sticky in basso viene SOPPRESSA da un IntersectionObserver quando questa sezione è a schermo.
- 15 · FOOTER — background #080706, padding 72px 40px 0, border-top var(--c-filo). FUNZIONE: densità di navigazione e controllo di esistenza: per l'imprenditore italiano il footer con la P.IVA è una verifica, non un obbligo. LAYOUT: grid 1.5fr 1fr 1fr 1.05fr 1fr, gap 36px, padding-bottom 60px, border-bottom var(--c-filo). Colonne: SALESPROCESS / METODO / RISULTATI / FATTURARE ×3 / CONTATTI. Titoli colonna mono 11px/700 +.10em --c-t4; link Red Hat Text 15px --c-t3 → --c-t1 con underline wipe 320ms (background-size 0 1px → 100% 1px), gap 10px; social 36×36 radius 8px border 1px var(--c-bordo-ui), hover border-color var(--c-ar) + background var(--c-velo). Tre livelli di grigio come unica gerarchia, UN SOLO link colorato in tutto il footer. Barra inferiore mono 12px --c-t4: ragione sociale, P.IVA, sede legale, sede operativa, numero di certificato ISO, privacy, cookie, e la riga di protocollo «Dati aggiornati al 09.09.2026 — un solo numero per concetto su sito, LinkedIn e podcast». Ultima riga: i quattro quadrati del mark, tutti accesi. MOTION: solo L1 (colore).
- GRANA DI PELLICOLA (layer globale) — position:fixed, inset 0, pointer-events:none, z-index 60, opacity .03, background-image un tile 128×128 generato UNA VOLTA da feTurbulence baseFrequency=.9 numOctaves=3 e salvato come PNG in data-URI (~2,4KB). Nessuna animazione, nessun mix-blend-mode, nessun filter: costa un solo paint iniziale. @media (min-resolution: 2dppx) scende a opacity .02, perché su DPR alti sporca il corpo da 15px. Limite d'uso duro scritto nel design system: sopra .04 è sporco, non texture.

## Momenti firma

- 1 · L'APERTURA IN 940ms — CSS al parse, zero JS, LCP intoccabile. LIBRERIA: nessuna. È una sola timeline CSS con animation-delay, che parte al parse e non attende il bundle: l'elemento LCP è il testo dell'H1 e non deve MAI dipendere da JavaScript. SEQUENZA a cinque battute: 0ms i quattro segni di taglio agli angoli del frame si disegnano (scaleX/scaleY 0→1, transform-origin agli angoli, 240ms, --ease-salita); 120ms l'eyebrow entra in mask reveal da translateY(100%) dentro un wrapper overflow:clip; 220ms e 320ms le due righe dell'H1 salgono da translateY(104%) in wrapper overflow:clip (--t-maschera 760ms, stagger 100ms) — IL TESTO È OPACO DAL PRIMO FRAME, si muove solo la maschera; 540ms il deck fa rise+fade (translate var(--dx) var(--dy) → 0, --t-reveal 620ms); 640ms i due CTA con stagger 70ms; 700ms la fotografia si scopre con la maschera a scalinata. In parallelo, dentro il mark della nav, i quattro quadrati si accendono con stagger 90ms, transform-origin:bottom left — è l'unica animazione di logo che vale la pena fare. PROPRIETÀ ANIMATE: solo transform/translate e opacity. Nessun elemento parte da opacity 0 gated da JS. TOTALE 940ms, poi la pagina è FERMA. FALLBACK MOBILE: durate × 0,7, --travel 16px, il frame passa da 4/5 a 1/1. REDUCED-MOTION: --travel 0, --t-maschera 180ms → resta una dissolvenza di 180ms, tutto a posto. COSA NON FACCIAMO E PERCHÉ: niente GSAP Flip con reparenting dei quadrati verso nav/eyebrow/CTA. Il backdrop-filter sulla nav stabilisce un containing block per i discendenti posizionati, quindi un Flip.from({absolute:true}) che atterra dentro la nav calcola gli offset contro la nav e non contro il viewport — i quadrati volano nel posto sbagliato, e solo quando la nav è in stato scrollato. Inoltre sarebbe gated dal bundle: su 4G la pagina è già leggibile e quattro quadrati che la attraversano 1,5s dopo il primo paint leggono come un errore di rendering, non come una firma.
- 2 · LA MASCHERA A SCALINATA — riscritta in versione 100% compositor. È il pattern con il miglior rapporto effetto/rischio del progetto, e nessuno può copiarlo perché nessuno ha questo logo: le fotografie non compaiono, vengono SCOPERTE da un bordo a quattro gradini che sale da sinistra a destra. IMPLEMENTAZIONE (nessuna clip-path animata, nessun raster per frame): quattro colonne, ognuna overflow:clip, ognuna contenente la stessa immagine larga 400% e traslata di -100%·i; l'immagine interna sale da translateY(101%) a 0 con stagger. Markup: <figure class="scalinata"><span style="--i:0"><img src=… alt=…></span> × 4</figure>. CSS: .scalinata{display:grid;grid-template-columns:repeat(4,1fr);aspect-ratio:4/5;overflow:clip} .scalinata span{position:relative;overflow:clip} .scalinata img{position:absolute;inset-block:0;width:400%;left:calc(var(--i) * -100%);height:100%;object-fit:cover;translate:0 101%;animation:sali-scalino var(--t-maschera) var(--ease-salita) both;animation-timeline:view();animation-range-start:entry calc(8% + var(--i) * 7%);animation-range-end:cover 42%} @keyframes sali-scalino{to{translate:0 0}}. ATTENZIONE, dettaglio che costa mezza giornata a chi non lo sa: sulle timeline scroll-driven `animation-delay` NON si applica — lo stagger si fa spostando `animation-range-start`, come sopra. FALLBACK @supports not (animation-timeline: view()): .scalinata img{translate:0 0} e un solo IntersectionObserver (threshold .18, unobserve, failsafe setTimeout 3000) che aggiunge .is-in. FALLBACK MOBILE: identico, è già economico (4 transform compositi). REDUCED-MOTION: --travel 0 e --t-maschera 180ms → l'immagine fa una dissolvenza. BUDGET: la clip-path animata via @property --scalino resta ammessa su UN SOLO elemento in tutta la pagina (la fotografia dell'hero, se in review la scalinata a 4 colonne non basta), e mai su mobile: interpolare un polygon a 4 gradini su una foto da 1120px è un raster per frame.
- 3 · IL NASTRO DELLE PROVE AFFERRABILE — rAF scritto a mano, ~5KB, con i quattro difetti misurati sul riferimento corretti. (a) VELOCITÀ IN DELTA-TIME: pos -= var(--nastro-v) * dt con --nastro-v .030 → 30px/s identici su 60, 120 e 144Hz, mentre un `pos -= 0.5` per frame raddoppia su un 120Hz. (b) SCALA DI PROSSIMITÀ CORRETTA: t = Math.max(0, 1 - Math.abs(cx - vpCx)/(vpW*0.45)); s = 0.94 + 0.12*t; opacity = 0.62 + 0.38*t; zIndex = t > .65 ? 2 : 1 — la card centrale è il PICCO (1,06) e le laterali il minimo (0,94). Nel riferimento la formula è invertita e misurata dal vivo: 0,841 al centro contro 1,06 ai bordi, cioè il momento più visto del sito ha una valle dove doveva avere un picco. (c) NESSUN BLUR PER FRAME: scale e opacity sulla stessa t bastano; se in review la profondità di campo resta un requisito, il blur si QUANTIZZA a tre gradini (0 / .7px / 1.4px) così la stringa del filtro cambia tre volte per card invece di sessanta volte al secondo e il browser riusa la rasterizzazione. (d) ZERO LAYOUT THRASHING: offsetLeft/offsetWidth di tutte le card letti UNA volta in una cache invalidata solo su resize debounced 80ms — mai dopo aver scritto il transform della track. INERZIA: speed += (target - speed) * 0.08 per frame, target 0 su hover/focus-within e .030 fuori; al rilascio del drag, velocità dell'ultimo pointermove con decadimento 0.94/frame fino a rientrare nell'auto-scroll. DRAG: pointerdown/move/up + setPointerCapture, soglia 18px, axis-lock (if (Math.abs(dx) < Math.abs(dy)) return → vince lo scroll verticale), touch-action commutato pan-y ↔ none, click-guard 320ms in capture phase con stopImmediatePropagation. LOOP: contenuto duplicato lato server, clone aria-hidden, wrap su scrollWidth/2. SOSPENSIONE: IntersectionObserver fuori schermo, visibilitychange, hover, focus-within. CONTROLLO DI PAUSA REALE 40×40 con aria-pressed: SC 2.2.2 Pause/Stop/Hide è livello A, non è una gentilezza. FALLBACK MOBILE (<1024px) e REDUCED-MOTION: il rAF non parte affatto; il contenitore diventa overflow-x:auto; scroll-snap-type:x mandatory con .scheda{scroll-snap-align:center;flex:0 0 82%} e overscroll-behavior-x:contain. Più veloce, più accessibile, più familiare.
- 4 · LO STATEMENT CHE LO SCROLL SCRIVE — l'UNICO elemento scrubbato dei 7.400px. Un evento speciale resta speciale perché non ha concorrenti. LIBRERIA: GSAP 3.13 core + ScrollTrigger + SplitText (tutti gratuiti da aprile 2025), serviti da locale, 41KB gz. CODICE: gsap.registerPlugin(ScrollTrigger, SplitText); const mm = gsap.matchMedia(); mm.add('(prefers-reduced-motion: no-preference)', () => { const s = SplitText.create('#statement .frase', { type:'words', aria:'auto', autoSplit:true }); const tl = gsap.timeline({ scrollTrigger:{ trigger:'#statement', start:'top 78%', end:'+=80%', scrub:.55, invalidateOnRefresh:true, refreshPriority:-1 }}); tl.to(s.words, { color:'#FFFFFF', stagger:.09, duration:.3, ease:'none' }, 0) .to(s.words.filter(w => w.closest('.chiave')), { color:'#FF8200', stagger:.09, duration:.3, ease:'none' }, 0); return () => { tl.kill(); s.revert(); }; }); mm.add('(prefers-reduced-motion: reduce)', () => { gsap.set('#statement .frase', {color:'#FFFFFF'}); gsap.set('#statement .chiave', {color:'#FF8200'}); }); document.fonts.ready.then(() => ScrollTrigger.refresh()); PROPRIETÀ ANIMATA: solo `color` — è un repaint del solo glifo, area minuscola, zero layout. NUMERI: 14 parole su 720px di corsa (80% di un viewport 900) = ~51px di scroll per parola, fronte d'onda largo ~3 parole, che legge come un evidenziatore. Le parole partono da rgba(255,255,255,.14) EREDITATO dal contenitore: il testo è leggibile al 14% dal primo istante, quindi l'animazione aggiunge enfasi, non informazione. SPLIT SU PAROLE, MAI SU CARATTERI: in italiano le parole sono lunghe e i glifi accentati, il char-by-char le spezza in modo illeggibile, gonfia il DOM da 14 a 78 nodi ed è la firma tipografica più imitata dai template. FALLBACK MOBILE: la scena resta (è economica), scrub .5, end '+=70%'. REDUCED-MOTION: SplitText NON viene eseguito affatto — elimina anche il rischio a11y sugli screen reader.
- 5 · LA MACCHINA — il metodo 4 in 1, l'UNICO pin del sito. È il centro del film e il miglior argomento di vendita del brand: i tre quadrati che passano di colonna in colonna SONO i tre passaggi di consegna. SCROLLTRIGGER: gsap.matchMedia().add('(min-width:1024px) and (prefers-reduced-motion: no-preference)', () => { const tl = gsap.timeline({ scrollTrigger:{ trigger:'#metodo', start:'top top', end:'+=240%', pin:true, pinSpacing:true, anticipatePin:1, scrub:.6, invalidateOnRefresh:true, fastScrollEnd:true }}); … return () => tl.kill(); }); SETTE STATI su 2.160px = ~308px per stato, tutti con ease:'none' (l'easing lo fa lo scroll). BEAT 0 (p 0–.12) IL CONTRO-ESEMPIO DENTRO LA SCENA: le quattro colonne sono separate da vuoti e i tre quadrati di handoff provano a passare e CADONO — gsap.to('.handoff',{y:'+=200', rotate:-8, opacity:0, stagger:.05, ease:'power1.in'}). Mette il problema nella stessa scena della soluzione, senza chiedere il click su un interruttore che nessuno premerà. BEAT 1 (.12–.20): le colonne si agganciano con uno scatto secco (translateX che collassa a gap 18px) e i vuoti si chiudono con scaleX 1→0 e transform-origin center — MAI .set({display:'none'}) dentro una timeline pinnata: è una mutazione di layout che disallinea start/end senza produrre un solo errore in console. BEAT 2–5: ogni reparto si impila (7 mattoni, stagger .06, yPercent 120→0) mentre l'etichetta entra in mask reveal, e fra due colonne il quadrato di handoff percorre il binario con offset-path: path('…') + offset-distance 0%→100% legato allo scrub — in Chromium offset-distance risolve a una transform, quindi è compositor-friendly e costa 0KB di JS in più rispetto a MotionPathPlugin. Il tratto già percorso si colora da rgba(255,255,255,.18) a #FF8200 via stroke-dashoffset su un path da 2px con pathLength="1" (nessuna misura JS della lunghezza). Arrivato a destinazione, il quadrato si TRASFORMA nella pill «1 CONTATTO EDUCATO → SLA 24 H · SCHEDA PROFILO». BEAT 6 (.86–1): dalla quarta colonna esce il quadrato arancione che diventa LA TRATTATIVA, con la fotografia del contratto firmato in maschera a scalinata. VINCOLO DI PROGETTO: ogni singolo frame deve funzionare come screenshot statico. FALLBACK MOBILE: matchMedia DISTRUGGE il pin (non lo lascia inerte in memoria) e la scena diventa 4 blocchi sticky + 3 blocchi handoff con animation-timeline: view() — zero JS, zero hijack. POLIZZA ASSICURATIVA (e questa è la ragione per cui questa direzione è consegnabile): la versione sticky si scrive PRIMA del pin, insieme alla tabella statica della sezione 08; il pin si prototipa isolato e si misura su un portatile Windows con GPU integrata a 1080p@125% a cinque valori di progress. Se scende sotto i 50fps, o se lo scroll-depth mostra che il 40% abbandona dentro il pin, si degrada alla versione sticky anche su desktop A COSTO ZERO, perché è già scritta. A11Y: skip-link «Salta la scena del metodo →» come primo elemento focusabile, focus sempre visibile e dentro il viewport durante il pin, e l'equivalente statico in <table> nella sezione successiva. REDUCED-MOTION: il pin non viene registrato; resta la versione sticky con i connettori già disegnati. IGIENE: content-visibility:auto è ESCLUSO da questa sezione (altera i calcoli di start/end); ScrollTrigger.config({limitCallbacks:true, ignoreMobileResize:true}); document.fonts.ready.then(()=>ScrollTrigger.refresh()); snapshot visivo automatico in CI a cinque valori di progress, perché è l'unico punto dove una regressione da copy più lungo o da immagine senza aspect-ratio non produce errori in console.
- 6 · IL CARTELLO FINALE FATTURARE ×3 — il payoff smette di essere una riga di testo arancione e diventa il titolo del film. Zero JS, compositor thread. LIBRERIA: nessuna. Tre righe, ognuna in un wrapper overflow:clip, indentate col passo del mark (0 / 5.5ch / 11ch), Red Hat Display 900 clamp(56px,10.4vw,152px)/.92 con ls -.045em; salgono da translateY(105%) in --t-maschera 760ms con --ease-salita e stagger 140ms, innescate UNA SOLA VOLTA da animation-timeline: view() con animation-range 'entry 20% cover 45%' e stagger via animation-range-start. La terza riga arriva a #FF8200 e porta il --e-glow-testo (nucleo bianco 12px + aureola arancione 40/75px): è l'unico text-glow di tutta la pagina. PESO STATICO 900. Per ottenere la sensazione di «pressa» senza toccare le metriche del carattere si anima scaleY(1.04)→1 sul wrapper — composite, zero relayout. COSA NON FACCIAMO E PERCHÉ: non animiamo l'asse variabile wght. font-variation-settings non è compositabile: portare il peso da 400 a 900 su tre righe da 152px significa relayout e reraster dei glifi a ogni frame sull'elemento più grande della pagina, e poiché la larghezza dei glifi cresce col peso, una riga vicina al punto di wrap può rifloware a metà animazione producendo CLS. Su un portatile Windows con GPU integrata sono 8–15ms per frame. La regola va scritta in cima al file dei token: MAI animare font-variation-settings, in nessun punto del sito. FALLBACK @supports not (animation-timeline: view()): stato finale visibile, più un IntersectionObserver che aggiunge .is-in. FALLBACK MOBILE: clamp porta le righe a 56px, indent 0 / 3ch / 6ch. REDUCED-MOTION: le tre righe sono già a posto, resta un fade di 180ms.
- 7 · MICRO-FIRMA · LA LUCE CHE SEGUE IL CURSORE SUL CTA — un solo elemento in tutta la pagina. Il bottone non si muove verso il cursore: resta fermo e si illumina dove sei. Il nucleo BIANCO è ciò che impedisce all'arancio di diventare fango (arancio@.30 diretto su base atterra su #552F07, marrone; sopra un nucleo bianco@.55 resta caldo e luminoso). IMPLEMENTAZIONE: due pseudo-elementi ancorati a --x/--y aggiornate su pointermove THROTTLATO in requestAnimationFrame (mai una scrittura di stile per evento). .cta{isolation:isolate} è OBBLIGATORIO, o il blend screen sfonda sul fondo pagina. .cta::before{inset:-4px;mix-blend-mode:screen;opacity:0;transition:opacity var(--t-micro);background:radial-gradient(88px 88px at var(--x) var(--y), rgba(255,255,255,.92) 0%, rgba(255,255,255,.32) 45%, transparent 70%), radial-gradient(130px 130px at var(--x) var(--y), rgba(255,130,0,.50) 0%, transparent 75%)} .cta::after{inset:-12px;filter:blur(22px);opacity:0;background:radial-gradient(210px 210px at var(--x) var(--y), rgba(255,130,0,.28), transparent 80%)} — il blur è DIPINTO, non animato. STATI: hover translateY(-2px) + fill #FF8200 → #E87300 (l'interazione va verso il basso: non esiste un arancio più brillante); dentro il bottone, a destra, un quadrato 8px che al hover scatta di un gradino lungo la diagonale (translate 3px -2px) — vale più di un'icona freccia; active translateY(0) scale(.985); focus-visible outline 2px solid #FF8200 offset 3px (l'arancio è l'unico colore della palette che soddisfa SC 1.4.11 senza sforzo, mentre i bordi bianchi arrivano a 1,66:1); disabled background var(--c-sup-3) color var(--c-t3) aria-disabled; loading label sostituita da «INVIO IN CORSO…» in mono con larghezza bloccata e nessuno spinner rotante. GATE: attivo solo con @media (hover:hover) and (pointer:fine) e con prefers-reduced-motion: no-preference. COSA NON FACCIAMO: nessun magnetic hover che sposta il bottone verso il cursore. È il cliché più riconoscibile del web 2019–2021 e contraddice la regola di sistema (ampiezza massima di hover 3px).

## Domande aperte

- IL FILE VETTORIALE ORIGINALE DEL LOGO (bloccante, Fase 0). Esiste solo un PNG 293×68. Serve l'SVG o l'AI/EPS per misurare la pendenza reale della scalinata: tutto il sistema geometrico deriva da due interi (--passo-rise / --passo-run) e la spec assume provvisoriamente 1:2 → 26,57°. Se non esiste il vettoriale, lo ricostruiamo noi e la ratio misurata diventa canonica nel design system — ma va approvata prima della prima comp, non dopo.
- I TRE PASSAGGI DI CONSEGNA, in dettaglio (bloccante per la scena centrale). Per ognuno dei tre handoff: chi passa cosa a chi, con quale SLA in ore o giorni, con quale strumento, e con quale persona che ne risponde. È contenuto, non grafica, e va costruito in un workshop di due ore con Alberto Frisoni. Senza questi dati la scena pinnata diventa quattro icone animate — cioè esattamente il difetto del sito attuale — e si spedisce la versione statica in tabella.
- RICONCILIAZIONE DEI NUMERI, con etichette distinte (bloccante). Oggi convivono 150 vs +800 imprenditori vs +1.100 partecipanti; 20 vs 30 vs 34 persone; 6 mesi vs 9/12 mesi; +40-100% vs X2-X5. Servono tre etichette separate e coerenti (clienti paganti del 4 in 1 / partecipanti agli eventi / lead), un solo valore per concetto valido su sito, LinkedIn e podcast, e una data di aggiornamento visibile. Più: quante persone sono INTERNE e quante collaboratori — per un cliente da 3 M€, «34 persone interne» è l'argomento di vendita più forte del sito.
- DA 4 A 6 SCHEDE-RISULTATO DOCUMENTABILI, con liberatoria firmata (bloccante per la fascia prove). Per ognuna: azienda, settore, provincia, fatturato di partenza, fatturato di arrivo, mesi, canale, venditori reclutati, tempo medio di chiusura, fonte del dato (estratto CRM del cliente?), e liberatoria scritta per nome, logo e numero. In particolare per i cinque nomi già sul sito (Straniero, Mabiglia, Scuderi, Cianflone, Petrazzuolo): dati reali oppure rimozione. Le testimonianze con la stessa frase placeholder ripetuta sotto cinque nomi veri vanno giù SUBITO, non al lancio.
- RETENTION / DURATA MEDIA DEL RAPPORTO IN MESI. È il numero che manca completamente e che discrimina un'agenzia da un venditore di corsi. Se è buono, va per primo nella fascia numeri, prima di 150 / 33 / 750.
- CANDIDATURE RICEVUTE VS ACCETTATE AL TRIMESTRE, e numero reale di slot. La spec usa «31 candidature ricevute · 9 slot · 4 assegnati» come esempio: servono i valori veri, e va deciso chi li aggiorna e con quale cadenza. È il dato che trasforma «Candida la tua azienda» da postura a fatto, ed è il proof point più economico dell'intero progetto.
- CERTIFICAZIONE, dati esatti. Norma precisa (ISO 9001:2015?), ente (IMQ? CSQ?), numero di certificato, scopo certificato, data di rilascio e scadenza, più il PDF. È l'asset di credibilità più sottosfruttato del brand — e la pagina che dovrebbe ospitarlo oggi risponde 404 mentre è linkata dal footer: si ripara prima del restyling.
- DATI SOCIETARI PER IL FOOTER E LA BANDA CARTA. Ragione sociale completa, P.IVA, forma societaria reale (LinkedIn dichiara «società di persone» e «2-10 dipendenti» mentre ne elencate 34), anno di costituzione, indirizzo di sede legale e operativa. Per l'imprenditore italiano il footer con la P.IVA è un controllo di esistenza.
- PRODUZIONE FOTOGRAFICA (bloccante per l'identità visiva). (a) Sei nuovi scatti mano-su-nero-con-oggetto-arancione secondo la mappa un oggetto = un concetto: cuffie = podcast, telefono = appuntamento fissato, badge = reclutamento, calcolatrice = numeri, chiave = delega, contratto firmato = trattativa chiusa. Sostituiscono le icone, che in questo sistema non esistono. (b) L'ufficio di Via Marco D'Agrate 41 con le persone al lavoro, non su fondo bianco. (c) Otto ritratti del team a risoluzione piena. (d) Ritratti clienti a ≥1200px: gli attuali sono 300×300 e sono inservibili — meglio sei grandi che trenta microscopici.
- LA CITAZIONE CLIENTE REALE. Instrument Serif Italic entra nel progetto solo per due usi: la didascalia sotto la fotografia d'apertura e UNA citazione cliente vera, con nome, ruolo e azienda, fra 80 e 260 caratteri. Se non arriva, il font esce dal budget (−14KB) e la citazione passa a Red Hat Text.
- FONTE DEL CLAIM «−50% rischio di fallimento / −80% esaurire la cassa». Lo studio citabile, oppure il claim esce. In una pagina costruita sulla verificabilità, un dato senza fonte contamina tutti i dati con fonte.
- EVERGREEN LIFE: cliente o ospite del podcast? Il caso «da 140.000 a oltre 20 milioni» citato nel podcast, se è un cliente, è il fascicolo più forte che avete e non è sul sito. Se è un ospite, va detto e non usato come prova.
- APPROVAZIONE DEL POSIZIONAMENTO DI ALFIO BARDOLLA. La spec lo mette in una riga fattuale nella fascia volti («Co-founder: gruppo quotato su Euronext Growth Milan, oltre 100 dipendenti»), senza cifre di patrimonio personale e senza foto in home. Serve conferma: è l'asset di solidità societaria più pesante che avete, ed è anche la figura che, usata come icona aspirazionale, sposta SalesProcess dal territorio agenzia al territorio formazione e riattiva l'allergia del pubblico.
- IL RITUALE DI AGGIORNAMENTO, con un responsabile nominato. Le date sono scritte in pagina («AGG. 09.2026»): è la scelta che rende credibili i numeri, e la stessa che li rende una bomba a orologeria. Serve l'impegno formale a un aggiornamento trimestrale del documento unico di fonte. Senza quello, in sei mesi il sito nuovo ha esattamente il problema del vecchio, con l'aggravante che qui le date si vedono.
- VINCOLO DI STACK: si può lasciare WordPress + Elementor? La spec raccomanda Astro statico + GSAP + Storyblok (o Sanity) e su quello sono calcolati i budget di performance e di nodi DOM. Su Elementor il tetto reale è ~7/10, l'LCP mobile raramente scende sotto 2,2s, e la scena pinnata diventa il primo elemento sacrificabile. È un cambio di processo di aggiornamento, non solo un restyling, e va deciso prima della Fase 1.
- L'ELENCO NOMINALE DEI 33 SETTORI, e il calendario 2026-2027 del Sales Process Day. Il primo serve alla fascia numeri (la granularità batte la grandezza: 33 nomi battono 2.300 clienti senza nomi); il secondo serve alla pagina Eventi, dove spostiamo l'inserto evento oggi previsto in home.

---

# SCALINATA VIVA — edizione definitiva

**Specifica di design per il nuovo salesprocess.it.**
Rev. 09.09.2026 · viewport di riferimento 1440×900 · pagina home ~7.400px.
Tutti i rapporti di contrasto sono **calcolati** (formula WCAG 2.x su luminanza relativa sRGB, con compositing alpha nello spazio 8-bit non lineare come fa il browser), non stimati.

---

## 0. LA LEGGE FONDAMENTALE — cinque righe che risolvono ogni dubbio senza chiamare il designer

1. **Una particella.** Il quadrato del marchio, modulo base 12px, radius 2px. È il segno delle liste, il glifo delle eyebrow, la barra di avanzamento nel logo, il mattone delle colonne dei reparti, l'istogramma dei numeri, il gradino delle maschere fotografiche, il wipe fra le pagine.
2. **Un angolo.** 26,57° (rise 1 : run 2), e nessun altro esiste nel sistema. Governa **solo quattro cose**: la geometria del mark, la maschera a gradini, il percorso degli handoff, il wipe di pagina.
3. **Due assi con una regola semantica.** La **materia** (quadrati, card, superfici, immagini) entra con una *citazione* della diagonale: `translate: -9px 20px → 0`. Il **testo** entra in verticale dentro una maschera (`translateY(101%) → 0`), perché si legge in orizzontale e non si sposta lateralmente. Non esiste una terza direzione. Zero rotate, zero scale su testo, zero tilt 3D, zero skew da velocità di scroll.
4. **Un accento, come segnale.** `#FF8200` su ≤3% dei pixel di ogni viewport, un solo oggetto arancione dominante per schermata. Se l'arancio non è cliccabile, non è un numero e non è il quadrato acceso, **è sbagliato**.
5. **Il nero non è dark mode: è il fondo nativo delle vostre fotografie.** Le foto mano-su-nero-con-oggetto-arancione smettono di essere ritagli incollati e diventano pagina. È il guadagno più grande del progetto e costa zero. Corollario: `#000000` esiste **solo dentro** le foto full-bleed, mai come fondo di sezione (su OLED i bordi hairline collassano).

**Sesta legge, di verifica.** Screenshot statico, motion spento, reduced-motion attivo: ogni fascia deve funzionare come manifesto e ogni numero deve essere leggibile con la sua fonte. Se una sezione è bella solo in movimento, il motion sta coprendo una gerarchia debole — ed è esattamente la diagnosi del sito attuale, dove 110 section Elementor non diventano un buon sito aggiungendo GSAP.

---

## 1. FASE 0 — la misurazione che precede ogni pixel (bloccante, mezza giornata)

Il sistema poggia su una pendenza, e oggi del marchio esiste **un solo PNG 293×68**. Tre letture diverse dello stesso logo sono state proposte in fase di ricerca (45°, 31,72°, 26,57°). Questa spec la risolve in modo che l'esito della misurazione **non possa rompere il progetto**:

- tutta la geometria deriva da **due interi** — `--passo-rise` e `--passo-run` — dichiarati in cima al file dei token;
- `--angolo` è calcolato da quei due interi ed è usato **solo** su mark, maschera, handoff, wipe;
- **gli ingressi non usano l'angolo del brand**: `--dx` è fissato a `calc(var(--travel) * -.45)`, cioè 9px di deriva laterale su 20px di salita. È una citazione della diagonale, non la diagonale. Questo elimina in un colpo (a) il rischio che un blocco di testo largo «scivoli», (b) il rischio di overflow orizzontale del body nel percorso di fallback `@supports`, (c) la dipendenza dell'intero sistema di reveal dall'esito della misurazione.

**Cosa serve:** il file vettoriale originale del logo. Se non esiste, si ricostruisce misurando il PNG a 800% e si dichiara la ratio scelta come canonica nel design system. Il valore provvisorio di questa spec è **1 : 2 → 26,57°**.

---

## 2. COLORE — token e contrasti calcolati

Il blocco completo e copiabile è nel campo `tokens`. Qui le decisioni e i numeri che le impongono.

### 2.1 Il sistema

Un solo fondo caldo `#0C0B0A` su ~92% della pagina; la gerarchia è fatta con **l'opacità del bianco** (4 gradini di testo, 3 di superficie, 3 di bordo), non con una palette. L'arancio non partecipa alla gerarchia: partecipa alla luce.

Il fondo è **caldo per scelta** (R12 > B10), deliberatamente opposto al near-black freddo del riferimento: un fondo freddo sotto un accento caldo massimizza il contrasto simultaneo ed *eccita* l'arancio producendo l'alone da energy-drink; un fondo caldo lo **smorza**.

### 2.2 Le sette leggi dell'arancio

| # | Legge | Il numero che la impone |
|---|---|---|
| 1 | Ogni fill arancione porta testo `#0C0B0A` | bianco su `#FF8200` = **2,49:1**, fallisce anche AA large. Nero sopra: **8,45:1** |
| 2 | Nessuna superficie tinta d'arancio oltre α .10 | arancio@.18 su base → **`#382008`**, marrone (chroma .185 → .047) |
| 3 | Nessun gradiente arancio↔bianco | attraversa il pivot di contrasto: qualunque testo sopra fallisce da qualche parte |
| 4 | Sulla banda carta l'accento è `#8A4300` | `#FF8200` su `#EAE6DE` = **2,00:1** |
| 5 | Nessun arancio sotto 15px né sotto peso 500 | canale B = 0 → aberrazione cromatica, alone che divora le aste. **Unica eccezione legale:** testo arancione a 15px sopra `--c-velo #3B2413`, dove il rapporto è 5,82:1 (è il posto dei chip-delta) |
| 6 | L'arancio non è mai un colore di stato | è il brand, non un semaforo. Warning al giallo puro `#FFD84D`, perdita al magenta `#CC3366` |
| 7 | ≤3% dei pixel per viewport, un oggetto arancione dominante per schermata | è la parsimonia che legge premium, non il colore |

### 2.3 Compensazione di luminanza (perché i numeri restano bianchi)

L'arancio pesa **Y = 0,372** contro **Y = 0,538** del verde del riferimento: **−31% di luce**. Nel loro sistema l'accento *illumina*; nel nostro *scalda*. Quindi: i numeri delle statistiche restano **bianco puro** (19,67:1) e l'arancio prende solo l'unità (M€, +, %) e il glow sottostante. **Il bianco fa il lavoro di luminanza, l'arancio quello cromatico.** È anche il motivo per cui ogni glow ha un **nucleo bianco**: arancio@.30 diretto sul fondo dà `#552F07` (marrone); arancio@.30 sopra un nucleo bianco@.55 resta caldo e luminoso.

### 2.4 Le due soglie da cablare in un test automatico

Su `#0C0B0A`: **α ≥ .455** perché un bianco trasparente sia testo corpo legale (4,5:1); **α ≥ .340** perché un bordo sia un confine UI legale (3:1, SC 1.4.11). Vanno in cima al file dei token **e in un test di build**, insieme al controllo «nessun hover arancione più chiaro di `#FF8200`»: non si prevengono in code review, perché il primo designer che entra nel progetto senza saperlo inventerà un `#FFA040` per un hover e una superficie arancio@.18 che su nero collassa in marrone, e il sistema si sporca in tre schermate.

---

## 3. TIPOGRAFIA

### 3.1 Casting: tre famiglie, quattro ruoli

| Ruolo | Famiglia | Uso e limite d'uso |
|---|---|---|
| **Cartello** | **Red Hat Display** variable (Google Fonts) | **solo pesi 800 e 900, solo ≥22px, solo display e numeri.** È già il font del brand (164 nodi nel DOM attuale): tenerlo è capitale di riconoscibilità. Geometrico-industriale, regge il tracking negativo estremo |
| **Testo** | **Red Hat Text** variable 400/500/700 | tutto il corpo, i deck, la nav, i bottoni, gli h3 delle card. Fratello di famiglia, migliore del taglio Display a 17px. **Un display cut usato come corpo è l'unico errore tipografico che si vede a occhio nudo** |
| **Dato** | **IBM Plex Mono** 500 | eyebrow, indici di sezione, SLA, timestamp, unità, celle di tabella, righe fonte/data, footer legale. Solo maiuscole, cifre e sei segni. ≤15% dei glifi, **mai corpo di lettura, mai oltre 3 righe consecutive, mai sui numeroni** |
| **Voce** | **Instrument Serif** *Italic* | **massimo 2 istanze per pagina**, con due funzioni dichiarate: la didascalia sotto la fotografia d'apertura e la citazione cliente. **Mai su un titolo**: oltre due istanze o su un H2 il brand vira in «moda/matrimonio» |

**Perché IBM Plex Mono e non Red Hat Mono** (che manterrebbe la purezza della superfamiglia): il mono porta l'intera voce contabile del sito, che è il DNA vero, e a 11px caps con +.14em di tracking Red Hat Mono risulta esangue. Plex nasce per contesti tecnico-istituzionali: legge «strumentazione», non «terminale crypto». Il mono non è usato per il corpo, quindi l'armonia metrica conta poco. Se il cliente preferisce la purezza di famiglia, è **uno swap di token**.

**Budget font reale:** Red Hat Display var latin ~34KB + Red Hat Text var latin ~30KB + IBM Plex Mono subsettato a `A-Z 0-9 . · : / – % € + ■ →` ~15KB + Instrument Serif Italic subsettato ai soli glifi usati ~14KB = **~93KB WOFF2**, dentro il budget di 120KB. `font-display: swap`, `preload` **solo** su Display e Text, `@font-face` di fallback con `size-adjust` / `ascent-override` / `descent-override` calibrati su Segoe UI e Arial per **CLS 0**. Se il budget sfora, **il primo a uscire è Instrument Serif**, e la voce narrante passa a Red Hat Text 400 italic con il filetto arancione a fare il lavoro.

### 3.2 Scala

| Token | Specifica |
|---|---|
| `--t-muro` (cartello finale) | Red Hat Display **900** · `clamp(56px, 10.4vw, 152px)` · lh .92 · **-.045em** |
| `--t-d1` (H1 hero) | RHD **800** · `clamp(40px, 6.6vw, 92px)` · lh 1.00 · **-.042em** |
| `--t-d2` (H2 di sezione) | RHD **800** · `clamp(32px, 4.4vw, 60px)` · lh 1.06 · **-.040em** |
| `--t-d3` (statement scrubbato) | RHD **800** · `clamp(28px, 3.4vw, 50px)` · lh 1.18 · **-.035em** |
| `--t-numero` | RHD **800** · `clamp(56px, 7.4vw, 112px)` · lh .90 · **-.045em** · `tabular-nums` · `min-inline-size:5ch` |
| `--t-unita` | RHD 800 · 36px · `#FF8200` · span separato, subordinato alla cifra |
| `--t-t1` | RHD 800 · `clamp(22px, 2.2vw, 28px)` · lh 1.22 · **-.020em** |
| `--t-t2` (h3 card) | Red Hat **Text** 700 · 19px · lh 1.30 · **-.012em** |
| `--t-deck` | RHT 400 · `clamp(17px, 1.4vw, 20px)` · lh 1.60 · **-.010em** · max **62ch** · `--c-t2` |
| `--t-corpo` | RHT 400 · 17px · lh 1.62 · **-.010em** · max **68ch** · `--c-t2` |
| `--t-piccolo` | RHT 400 · 15px · lh 1.56 · **+.020em** |
| `--t-meta` | Plex Mono 500 · 13px · lh 1.45 · **+.040em** |
| `--t-dato` | Plex Mono 500 · 15px · **ls 0** · `tabular-nums` |
| `--t-eyebrow` | Plex Mono 500 · 11px · lh 1.20 · **+.140em** · uppercase · `--c-t3` |
| `--t-micro` (fonte/data) | Plex Mono 500 · 11px · **+.100em** · uppercase · `--c-t3` (5,34:1, legale a 11px) |
| `--t-voce` | Instrument Serif **Italic** 400 · 26px · lh 1.35 · ls 0 · max 34ch · `--c-t2` |

### 3.3 La legge del tracking: tre plateau, inversione di segno fra 15 e 17px

Sette token e basta: `-.045em` (≥112px) · `-.040em` (32–111px) · `-.020em` (22–31px) · `-.010em` (17–21px) · `+.020em` (15–16px) · `+.040em` (13–14px) · `+.140em` (≤12px UPPERCASE).

**Il plateau del display è PIATTO**: un solo token da 32px a 111px, non una funzione continua — molti sistemi inseguono una curva che non esiste. Il rapporto cartello:corpo è **152 : 15 = 10,1 : 1**: è quell'ampiezza a permettere che l'11px del mono resti davvero 11px senza competere.

**Sul mono le cifre hanno `letter-spacing: 0`**: tracciare i numeri fa oscillare le colonne. Il tracking positivo si applica solo alle label maiuscole. Ogni cifra del sito ha `font-variant-numeric: tabular-nums`; ogni valore ha `min-inline-size` in `ch`. Formattazione sempre `Intl.NumberFormat('it-IT')`: migliaia con il punto (1.284), decimali con la virgola (18,4%), valuta in euro. **Il simbolo `$` non esiste nel sito.**

---

## 4. GRIGLIA, SPAZIO, RITMO VERTICALE

**Contenitori che si stringono al crescere della densità di lettura:** 1440 (nav) → 1320 (sezioni piene, tabella) → 1200 (griglie) → 1120 (editoriale, case) → 1040 (statement) → 68ch (misura di lettura).

**Griglia:** 12 colonne desktop / 6 tablet / 4 mobile, gutter **18px**, margini 40 / 24 / 18px. Breakpoint: 1440 · 1200 · 1024 · 768 · 480. Griglie di card `repeat(4,1fr)` → 3 → 2 → 1 a 1200/1024/768, **zero varianza di span**: il bento è una griglia uniforme, ed è il costo di scansione azzerato che permette densità alta senza affollamento.

**Scala di spaziatura vera** (nessun valore accordato a mano): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 168`.

**Sezioni giuntate a filo: gap inter-sezione 0px su tutte le fasce.** Il ritmo verticale esiste **solo** come padding interno. È la decisione strutturale più importante: senza confini il cervello non conta le sezioni, e sedici blocchi si leggono come **un documento continuo**. È la premessa di tutta la densità.

Padding di sezione: **128px** default · **168px** su hero-top · **128px** di padding-bottom sullo statement (il respiro più grande) · **64px** sulle fasce dense (carta) · **72px** sul footer.

**Pattern testa-respiro / corpo-denso, otto volte.** Ogni blocco denso è preceduto da una fascia di 270–430px che contiene due o tre righe di testo e nient'altro: è il reset percettivo che rende possibile la densità dopo.

**Una sola formula di testa-sezione, ripetuta otto volte, TUTTE allineate a sinistra, nessuna eccezione:**

```
■ 04 — PRIMA DI PARLARE DEL METODO          ← eyebrow: quadrato 12px + indice + nome
        ↓ 20px
Quattro fornitori diversi non sono…          ← H2 --t-d2, una sola parola in arancio
        ↓ 24px
L'agenzia che compra la pubblicità…          ← deck opzionale, max 62ch
        ↓ 64px
[corpo della sezione]
```

L'eyebrow porta **l'indice senza denominatore** (`■ 04 —`, non `■ 04 / 13`): così tagliare una fascia non obbliga a rinumerare tutto il sito. La prevedibilità della formula è ciò che si compra la densità: il lettore la impara al primo colpo.

**La scalinata come sistema di layout:** le tre stat card salgono di `calc(var(--i) * -12px)`; le tre righe del cartello finale indentano di `0 / 5.5ch / 11ch`; i divisori diagonali usano un solo angolo, 26,57°.

---

## 5. IL SISTEMA DELLA PARTICELLA (e la regola che lo salva)

| Uso | Misura | Regola |
|---|---|---|
| Segno di lista | 8px, r2px, `--c-ar` | sostituisce il pallino in **tutto** il sito |
| Glifo di eyebrow | 12px, r2px, `--c-t3` (arancio solo sulla sezione attiva) | `■ 04 — NOME` |
| Avanzamento nel mark (nav) | 4 quadrati 7px, gap 3px, in salita | `animation-timeline: scroll(root block)` + `steps(4,end)` |
| Mattone di colonna (metodo) | 16px, gap 4px, max 7 per colonna | il reparto è alto quanto il suo lavoro |
| Istogramma dei numeri | 14px, gap 4px, max 12 poi `×10` in mono | solo l'ultimo è arancione |
| Gradino di maschera | 4 colonne | vedi momento-firma 2 |
| Wipe di pagina | 4 step | `steps(4, end)`, 380ms |
| Indicatore di reparto | 4 quadrati, l'n-esimo acceso | nella scena pinnata e sui tag dei volti |

**Tetto di nodi: massimo 28 particelle-nodo per scena.** Dove servono di più, un solo `<rect>` in `<symbol>` richiamato con `<use>`, oppure un pattern ripetuto in `background-image`.

**LA REGOLA DI TAGLIO, da applicare in ogni review e scritta nel design system:** se un quadrato non **conta** qualcosa, non **nomina** qualcosa o non **scopre** qualcosa, esce. Il concept ha un solo modo di fallire, ed è la ripetizione: dal quinto uso «tutto è lo stesso oggetto» diventa «ho capito, sono quadrati».

---

## 6. MOTION — sistema, gerarchia, budget

### 6.1 Principio

Il movimento è **texture**, non collezione di effetti. Una curva d'ingresso, due durate di reveal, un asse, ampiezze sotto la soglia di distrazione, **un solo pin e un solo elemento scrubbato** in 7.400px. Il budget non è tecnico, è **di attenzione**: un momento speciale resta speciale perché non ha concorrenti.

### 6.2 Gerarchia a sei livelli

- **L0 — non si muove mai:** display, numeri, eyebrow, griglia, hairline, loghi, fotografia, i segni di taglio dopo l'apertura, la grana. È la spina dorsale.
- **L1 — micro-stato 120–200ms:** `color`, `background`, `border-color`. Non produce movimento, produce risposta. È la maggioranza netta delle transizioni.
- **L2 — lift tattile 200ms:** bottoni `translateY(-2px)`, card `translate(-2px,-3px)`. Ampiezza **massima 3px**, sempre accoppiata a un cambio di bordo o di superficie. Gerarchia deliberata a due livelli: in header e footer **solo colore**, in pagina colore + lift.
- **L3 — ingresso 620ms one-shot e IRREVERSIBILE:** rise diagonale (materia) o mask reveal 760ms (testo). Sempre `unobserve`/`fill-mode: both`: risalendo non si ri-anima nulla — è ciò che elimina l'effetto flipbook dei siti costruiti con AOS. **Failsafe `setTimeout(3000)`** che forza lo stato visibile: il contenuto non può restare invisibile.
- **L4 — ambient loop:** **due in tutto il sito** — il nastro delle prove (30px/s) e, solo se i loghi stampa sono più di sei, il marquee della banda carta (52s). Sempre in periferia, mai dentro un blocco di lettura, sospesi fuori schermo, su hover, su focus-within e su `visibilitychange`, con **bottone di pausa reale**. Nessun dot pulsante, nessun anello rotante: il quadrato del mark è statico.
- **L5 — i due picchi:** un pin (il metodo, `+=240%`) e uno scrub (lo statement, 720px), a 1.500px di distanza l'uno dall'altro.

### 6.3 Architettura: 70% CSS nativo, 25% GSAP, 5% niente

- **70% CSS scroll-driven:** `animation-timeline: view()`, `animation-range: entry 12% cover 40%`, sempre dentro `@supports`, con `@supports not (animation-timeline: view())` che porta gli elementi allo **stato finale visibile** più un unico IntersectionObserver (threshold .18, `rootMargin: '0px 0px -8% 0px'`) che deriva il ritardo dall'indice. Gira sul **compositor thread**: resta fluido anche col main thread occupato, cosa che nessuna libreria può replicare.
  **Dettaglio non ovvio:** sulle timeline scroll-driven `animation-delay` **non si applica** — lo stagger si fa spostando `animation-range-start`.
- **25% GSAP 3.13** (core 23KB + ScrollTrigger 11KB + SplitText 7KB = **41KB gz**, tutti i plugin gratuiti da aprile 2025), servito **da locale**, per: il pin, lo scrub, il rAF del nastro, la luce sul CTA.
- **0% WebGL.** Il glow è un `radial-gradient` dipinto una volta; la grana è un PNG `feTurbulence` in data-URI al 3%, statica.

### 6.4 Nessuno smooth scroll globale: NO Lenis, NO ScrollSmoother

Il pubblico — imprenditori di PMI italiane, in gran parte su desktop Windows con la rotella — è il profilo **peggiore possibile** per lo scroll-hijack, e il riferimento scelto dal cliente non lo usa. Lo smoothing si sposta dallo scroll all'**animazione**: `scrub: .55–.6` sulle due scene, che è un lerp di 550–600ms fra scroll e animazione, con `ease: 'none'` su ogni tween scrubbato. Si ottiene circa il 70% della sensazione «costosa» a **zero costo di usabilità, zero KB e zero latenza sull'input**. `scroll-behavior: smooth` solo sugli anchor, azzerato in reduced-motion.

### 6.5 Regole di budget, da scrivere nel contratto

max **3** animazioni concorrenti per viewport · max **1** pin per pagina · max **1** elemento scrubbato · max **2** clip-path animate per viewport · max **10** layer promossi contemporaneamente · **1** easing d'ingresso e **2** durate di reveal per tutto il sito · **1** asse, ampiezza ≤20px in ingresso e ≤3px in hover · **0** animazioni di proprietà di layout (mai `width`, `height`, `top`, `left`, `margin`, `padding`) · **0** animazioni di `blur`/`backdrop-filter` · **0** animazioni di `font-variation-settings` · `will-change` aggiunto in `onStart`/`pointerenter` e **RIMOSSO** in `onComplete`/`transitionend`, mai permanente · nessun `getBoundingClientRect()` dentro un listener di `pointermove`/`scroll`: misure in cache, invalidate su resize debounced 80ms e su `refresh()` · `gsap.quickTo`, mai `gsap.to`, nei loop di puntatore · `{passive:true}` su tutti i listener di scroll/pointer · `document.fonts.ready.then(() => ScrollTrigger.refresh())` **obbligatorio** · `ScrollTrigger.config({limitCallbacks:true, ignoreMobileResize:true})` · `contain: layout paint` sulle scene indipendenti · `content-visibility: auto` + `contain-intrinsic-size: auto 800px` sotto la piega, **ESCLUSA la scena pinnata** · ogni scena è un chunk caricato da IntersectionObserver con `rootMargin: '300px 0px'` · `gsap.globalTimeline.pause()` su `visibilitychange`.

### 6.6 Mobile (<1024px), via `gsap.matchMedia()` che **crea e distrugge** le scene

Zero pin, zero scroll orizzontale forzato, zero luce sul cursore, zero cursore custom, zero WebGL. Il metodo diventa 4 blocchi sticky + 3 blocchi handoff in `view()`. Il nastro passa a `overflow-x:auto` + `scroll-snap-type: x mandatory`. Durate × 0,7, `--travel` 16px, `--dx` -6px. Il frame 4/5 dell'hero diventa 1/1. **Piastra CTA sticky a piena larghezza in basso**, 56px, fill `#FF8200`, testo `#0C0B0A`, `padding-bottom: env(safe-area-inset-bottom)`, soppressa da un IntersectionObserver quando la sezione candidatura è a schermo: su una pagina di 7.400px con traffico in maggioranza mobile è la differenza fra un sito e una brochure.

### 6.7 Reduced-motion: token, non interruttore

Vietato `*{animation:none!important}`: rompe accordion e dropdown e fa **scomparire per sempre** ogni elemento con `fill-mode: both` che parte da `opacity 0`. Si ridefiniscono i token alla radice (vedi blocco tokens): il travel va a zero, la dissolvenza sopravvive, **ogni stato resta raggiungibile**. Lato JS, due rami in `gsap.matchMedia`: nessun pin, nessuno scrub, **SplitText non viene eseguito** (`gsap.set` sui colori finali), il rAF del nastro non parte e il contenitore diventa scorribile a mano, `@view-transition { navigation: none }`. **Copertura dichiarata: 100% dei meccanismi**, verificabile in cinque secondi da chiunque con DevTools → Rendering → Emulate `prefers-reduced-motion`. È anche un argomento commerciale, con lo European Accessibility Act applicabile dal 28.06.2025.

### 6.8 Transizioni di pagina

15 righe, zero SPA, zero router, degrada a nulla dove non è supportato:

```css
@view-transition { navigation: auto }
::view-transition-old(root){ animation: 220ms cubic-bezier(.4,0,1,1) both dissolvi-out }
::view-transition-new(root){ animation: 380ms steps(4,end) both scalinata-in }
.mark { view-transition-name: marchio }   /* unico per documento */
```

Il wipe di root non è un fade: è una scalinata a **quattro step**, come i quattro reparti. Il mark **non si ricarica: si sposta**. Ogni `view-transition-name` deve essere unico nel documento al momento della cattura, o la transizione viene abortita in silenzio — è il bug numero uno di questa API, e per questo sulla tabella filtrabile si usa **un solo nome sul wrapper**, non 28 nomi per riga.

---

## 7. COMPONENTI — misure e stati completi

### 7.1 CTA — tre livelli, tutti pill

```css
.cta{ display:inline-flex; align-items:center; gap:10px;
  height:56px; padding:0 34px; border:0; border-radius:var(--r-pill);
  background:var(--c-ar); color:var(--c-t-su-arancio);
  font:700 17px/1 var(--f-testo); isolation:isolate;
  box-shadow:var(--e-glow);
  transition: background var(--t-micro) var(--ease-salita),
              transform  var(--t-micro) var(--ease-salita),
              box-shadow var(--t-micro) var(--ease-salita) }
.cta:hover { background:var(--c-ar-fill); transform:translateY(-2px) }
.cta:active{ transform:translateY(0) scale(.985) }
.cta:focus-visible{ outline:2px solid var(--c-ar); outline-offset:3px }
```

**La sotto-label mono è una PROPRIETÀ del componente, non un'opzione:** `FATTURATO 1–5 M€ · NO START-UP · RISPOSTA IN 48 ORE LAVORATIVE`, Plex Mono 12px `--c-t3`, `margin-top:12px`. Così **non si può pubblicare un CTA selettivo senza il criterio accanto**. Il CTA selettivo senza criterio è posa; con il criterio è serietà.

**Secondario outline:** `border:1px solid var(--c-bordo-ui)` (3,04:1, non le hairline decorative), fondo trasparente, `color:var(--c-t1)`, hover `background:var(--c-sup-2)`.
**Terziario testuale:** `color:var(--c-ar)` con underline wipe — `background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat`, hover `background-size:100% 1px`, 320ms `--ease-scatto`, colore hover `--c-ar-hot`. È il dettaglio che si nota al secondo passaggio, non al primo.

**Test A/B a un solo token.** La pill è l'unico punto in cui somigliamo al riferimento. La variante «piastra» (raggio 0, rettangolo arancione pieno con testo nero) si ottiene cambiando `--r-pill: 0px` e non richiede di rifare nulla: si misura il tasso di click e si decide con i dati, non in riunione.

### 7.2 Scheda risultato (nastro) — § sezione 03 per le misure

Quattro strati: fotografia reale del cliente → scrim a 4 stop → contenuto `z-index:1` → due chip di vetro. **Niente `text-shadow`**: il chip ha già vetro e bordo al 55%, il bagliore impasterebbe i caps sopra fotografia. **Hover che rivela una terza riga di contesto** (canale, venditori, tempo medio di chiusura): densità informativa in più, movimento in più zero.

### 7.3 Chip-delta

`background: var(--c-velo)` (opaco), `color: var(--c-ar)`, Plex Mono 600 15px, padding 4px 8px, radius 2px, glifo `▲` + testo. **È l'unico posto della pagina dove testo arancione può stare a 15px** (5,82:1), perché sta su una superficie calda e non su nero.

### 7.4 Stat card a lente — § sezione 09

### 7.5 Tabella — § sezione 08. Prima colonna sticky, `@760px` cambia forma in card `<dl>`: **se non entra, cambia forma**; non scorre in orizzontale e non è una tabella finta.

### 7.6 Form — § sezione 14, con la squalifica in tempo reale.

### 7.7 Stati di sistema — dove si gioca la credibilità perché nessuno ci guarda

- **Invio riuscito:** «Candidatura ricevuta. La leggiamo noi, non un software. Ti rispondiamo entro 48 ore lavorative.»
- **Fascia sotto 1 M€:** «Non è un no per sempre: è un no per adesso. Ti mandiamo il podcast e ci riparliamo quando sei sopra il milione.»
- **Eventi senza date:** «Nessuna serata in programma in questo momento. Le prossime date escono prima sulla newsletter che sul sito.»
- **Slot esauriti:** «Q4 2026: 9 slot su 9 assegnati. Le candidature restano aperte per il Q1 2027.» Nessun countdown.
- **404:** «Questa pagina non c'è. Il processo di vendita, invece, lo costruiamo. →»
- **Errore di campo:** glifo + testo in `--c-errore-testo` + `aria-describedby` + `aria-live="polite"`. **Mai il solo colore** (SC 1.4.1).

### 7.8 Tre regole di governance, cablate nel CMS e non nella code review

1. **Fonte e data obbligatorie a schema** su ogni blocco numerico: la build **fallisce** se manca `fonte` o `data_aggiornamento`, invece di pubblicare una card rotta.
2. **Nessun controllo decorativo.** I cinque chip filtrano davvero, il bottone di pausa ferma davvero il nastro. Ciò che non può essere reale è inquadrato come **stampato**: didascalia mono `ESTRATTO`, bordo hairline, nessuna affordance. Zero finte sidebar, zero finte app.
3. **Ogni blocco dati ha una faccia accanto.** I quattro reparti sono quattro persone con nome e ritratto; le stazioni hanno un responsabile; gli aggregati stanno nella stessa schermata di un nome proprio.

---

## 8. LA VOCE — regole non negoziabili

**Tu sempre, ma da pari.** Indicativo presente, prima persona plurale, verbi di azione (reclutiamo, profiliamo, consegniamo, misuriamo). Frasi brevi. **Numeri prima degli aggettivi.** Concretezza fisica: reparto, tetto, tavolo, caffè, sedie, ufficio.

**Massimo una parola in caps per blocco di testo**, e solo dal lessico core: `ZERO`, `FATTURARE`, `4 IN 1`.

**Lessico ammesso:** fatturato, cassa, margine, processo, reparto, rete vendita, venditori, candidatura, numeri, appuntamenti, trattative, conversione, delega.

**Vietati:** soluzioni innovative, sinergie, eccellenza, a 360 gradi, digital transformation, growth hacking, brand awareness, storytelling, funnel, boost, unlock, seamless, scalare il business, «Book a demo», «Get started», il simbolo `$`, «crediamo che», «la nostra passione», «garantiamo il risultato» senza condizioni scritte, libertà finanziaria, mindset, rivoluzionario, segreto, trucco, hack, countdown, «solo per oggi», «ultimi 3 posti» quando non è vero.

**La scarsità si dichiara come fatto strutturale** (la sala ha 30 sedie, accettiamo 9 aziende a trimestre), **mai come pressione temporale**.

---

## 9. ACCESSIBILITÀ — dove diventiamo il fratello maggiore del riferimento

| Difetto misurato nel riferimento | Cosa facciamo |
|---|---|
| bordi a white@.07–.14 → **1,19–1,51:1**, e sono l'unico confine delle card | tre bordi per ruolo; `--c-bordo-ui` a **3,04:1** obbligatorio sull'interattivo; nessuna card dipende dal bordo (ha anche un delta di superficie) |
| `color: rgba(255,255,255,.30)` usato 6 volte → **2,69:1** | il gradino più basso è `--c-t4` a **3,53:1**, e il token dichiara «SOLO ≥24px». Sotto .38 non esiste token |
| 18 alpha di testo, 11 raggi | **4 gradini di testo, 4 raggi, 3 superfici, 3 bordi** |
| reduced-motion coperto al 5% (2 blocchi su ~36 meccanismi) | **100%**, via token di durata e travel |
| marquee senza controllo di pausa persistente | bottone di pausa reale (**SC 2.2.2, livello A**) + hover + focus-within + `localStorage` |
| testo splittato senza cura per gli screen reader | `SplitText.create(…, {aria:'auto'})` → `aria-label` sul parent, `aria-hidden` sugli span; in reduced-motion non si splitta affatto |
| — | skip-link «Salta al contenuto» e «Salta la scena del metodo»; focus **sempre visibile e dentro il viewport** durante il pin; nessuno stato comunicato dal solo colore; `prefers-reduced-transparency` spegne i `backdrop-filter`; `prefers-contrast: more` alza i bordi decorativi; equivalente statico in `<table>` del diagramma pinnato; test obbligatori con sola tastiera, VoiceOver e NVDA |

Focus ring: `outline: 2px solid #FF8200; outline-offset: 3px` — l'arancio è l'unico colore della palette che soddisfa SC 1.4.11 senza sforzo (7,91:1 su base, 6,46:1 sulla superficie più chiara). Sulla banda carta diventa `outline: 2px solid #14120F`.

---

## 10. PERFORMANCE — budget contrattuali

| Metrica | Target |
|---|---|
| LCP (75° perc., 4G throttled, Moto G) | **< 1,8s** — l'elemento LCP è il **testo dell'H1**, e **nessuna animazione sopra la piega è gated da JavaScript** |
| INP | **< 100ms** |
| CLS | **0,00** — un sito animato non ha scuse: ogni shift è un bug |
| TTFB | < 200ms (statico su CDN: 30–80ms) |
| TBT | < 200ms |
| Nodi DOM | **< 1400** |
| JS al primo render | ≤ 100KB gz, di cui **41KB** per tutto il motion stack, **zero jQuery** |
| CSS critico inline | 14KB (1 RTT) · CSS totale 60KB gz |
| Font | **~93KB** WOFF2 |
| Hero AVIF | ≤ 180KB, `fetchpriority="high"`, width/height espliciti |
| Frame budget nelle scene scrubbate | **< 2ms di JS per frame** (8,3ms totali a 120Hz) |
| `will-change` permanenti / `backdrop-filter` attivi | **0** / **1** (la nav) |
| ScrollTrigger totali / pin / scrubbati | ≤ 3 / **1** / **1** |

Misurazione **sul campo**, non in laboratorio: `web-vitals` v4 con `onLCP/onINP/onCLS` verso un endpoint proprio. Lighthouse non cattura l'INP. Test obbligatori su hardware fisico: un Android di fascia media, un iPhone SE, e **un portatile Windows con GPU integrata a 1080p@125%** — che è l'hardware reale del pubblico e il posto dove le scene scrubbate si rompono.

---

## 11. STACK

**Astro statico (`output:'static'`) + GSAP 3.13 da locale + Storyblok** (o Sanity, se contano più la modellazione dei fascicoli e il costo).

Perché: output HTML su CDN, TTFB 30–80ms, zero JS di framework per default, `astro:assets` per AVIF/WebP responsive (il cliente **non può** mandare online un JPEG da 8MB), content collections con schema **Zod** — la build fallisce se manca un campo. Next.js non aggiungerebbe **nessuna** animazione in più e costerebbe ~90KB gz di hydration prima di aver animato qualcosa. WordPress + Elementor ha un tetto reale intorno a 7/10 e non regge né il budget di nodi né le View Transitions cross-document.

**Contenuto tipizzato, con i vincoli come prodotto:**

```
hero            { eyebrow ≤28ch, h1 ≤60ch (break in markup), deck ≤240ch,
                  cta_label ≤24ch, sotto_label ≤72ch, voce ≤120ch }
scheda_prova    { settore, provincia, valore, unita(enum), label ≤32ch,
                  contesto ≤64ch, serie[12], fonte*, data_aggiornamento*,
                  liberatoria(bool)* }
numeri          { items[3..3] { valore, unita(enum), label, contesto,
                  fonte*, data_aggiornamento* } }
metodo          { reparti[4..4] { nome, claim ≤80ch, persona→persona },
                  handoff[3..3] { cosa_passa, sla, strumento, chi_risponde } }
fascicolo       { settore, regione, fatturato_prima, fatturato_dopo, mesi,
                  interventi[], quote 80..260ch, attribuzione, liberatoria* }
persona         { nome, ruolo, reparto(enum 01..04), ritratto ≥1200px, interno(bool) }
```

**Cosa NON si dà in mano al cliente:** parametri di motion, colori, tipografia, ordine delle sezioni, numero di CTA per pagina, tetto dell'arancio. Se glieli diamo, in tre mesi il sito è di nuovo generico e sarà colpa nostra. Se serve flessibilità, si espone come **varianti preimpostate**.

**Se il vincolo è restare su Elementor:** child theme, zero animazioni native del builder, scene agganciate ad attributi `data-scene` sui container e **mai** a classi generate, GSAP da locale, Rocket Loader disattivato, Optimized DOM Output attivo. Tetto realistico ~7/10, e **la scena pinnata è il primo elemento sacrificabile** (la versione sticky è già scritta).

---

## 12. PIANO DI CONSEGNA

**Fase 0 — misurazione e bonifica (1 settimana).** Misurazione del marchio sul vettoriale. Workshop di due ore con Frisoni sui tre passaggi di consegna (chi passa cosa a chi, con quale SLA, con quale strumento, con quale responsabile). Riconciliazione dei numeri con un documento unico di fonte e un responsabile nominato. Rimozione **immediata** delle cinque testimonianze con testo placeholder identico. Riparazione dei 404 su `/risorse/` e `/politica-di-qualita/`, slug `/team-2/` → `/team/` con 301, bonifica dello slug LinkedIn `insider-crew` e del «2-10 dipendenti».

**Fase 1 — design system + due comp complete (2 settimane).** Hero e scena del metodo, **con la fascia volti già dentro la prima comp**, non promessa per la seconda. Test con cinque imprenditori reali del target (1–5 M€, desktop Windows, rotella) sul prototipo della sola hero: devono capire l'offerta in 20 secondi e trovare il criterio di candidatura senza cercarlo. **Prima di scrivere una riga di GSAP.**

**Fase 2 — l'equivalente statico prima della scena (1 settimana).** Si costruisce per prima la `<table>` «Cosa entra, cosa esce» e la versione sticky del metodo. Un solo artefatto che fa cinque lavori: reduced-motion, screen reader, stampa, indicizzazione, **e fallback desktop del pin**. Poi si prototipa il pin isolato e si misura su hardware reale a cinque valori di progress.

**Fase 3 — build (4–5 settimane).** Nell'ordine: apertura, nastro, statement, cartello finale (i quattro momenti che **non dipendono** né dai dati né dal pin, cioè il wow che si consegna comunque), poi il pin, poi le fasce di prova.

**Fase 4 — migrazione SEO (1 settimana + 60 giorni di monitoraggio).** Redirect 1:1 su ogni URL indicizzato, `/quiz/` → sezione candidatura, sitemap, dati strutturati, Search Console.

**Fase 5 — consegna umana.** Un Loom di 10-15 minuti per ruolo, un documento di due pagine, 30–60 giorni di supporto. È la parte che determina se dopo sei mesi il cliente è contento o è tornato su Elementor: non è un extra, è parte del deliverable.

---

## 13. COME REGGE PRIMA CHE I DATI ARRIVINO

Questa è la domanda onesta, e la risposta è progettata, non improvvisata.

- **Le fasce che non dipendono da nulla** e si consegnano comunque: hero, statement, contro-esempio, volti (i ritratti esistono, vanno solo ri-scattati), cartello finale, candidatura, carta, footer. Sono **~60% della pagina** e contengono cinque dei sette momenti-firma.
- **Il nastro delle prove si dimensiona sul numero di schede REALI.** Con sei schede si fanno sei card e la riga «6 schede su 150 clienti: le altre non hanno liberatoria, non un risultato peggiore» diventa un punto di forza invece di una scusa. Con **zero** schede la fascia **non si costruisce** e al suo posto va la tabella «Cosa entra, cosa esce», che è contenuto strutturale e non richiede liberatorie.
- **I fascicoli**: la sezione monta da 1 a 3 card. Con uno solo, la riga è «Il secondo e il terzo fascicolo escono quando i clienti firmano la liberatoria.» Mai cinque card vuote.
- **La scena pinnata è l'unica cosa davvero bloccata dai dati.** Senza i tre passaggi dichiarati diventerebbe quattro icone animate, cioè esattamente ciò che critichiamo nel sito attuale, e avremmo speso il 35% del budget di motion per una decorazione. Per questo la versione sticky + tabella si scrive **prima**: se al workshop i dati non arrivano, si spedisce quella e il pin si aggiunge dopo, senza rifare niente.
- **I numeri**: la fascia si costruisce con tre valori e la loro data. Se un valore non è riconciliato, **esce quel valore**, non la fascia — e la riga «AGG. 09.2026 · FONTE: GESTIONALE INTERNO» è il vincolo che rende impossibile pubblicare un dato orfano.
- **La certificazione**: il blocco della banda carta ha placeholder espliciti `[da cliente]` che **la build rifiuta di pubblicare**. Meglio una banda carta con la sola P.IVA e la sede che una con un numero di certificato inventato.

---

## 14. COSA NON FAREMO, E PERCHÉ (YAGNI)

- **Nessun count-up sui numeri.** Il numerone appare già finito, bianco, `tabular-nums` con `min-inline-size` in `ch`: CLS 0 per costruzione, leggibile al primo frame, e la monumentalità viene dalla scala tipografica (rapporto 112:11 dentro 350px), non dal contare. Il count-up è l'animazione più imitata del web marketing e vale zero da sola. L'«animazione» dei numeri è la colonna di quadrati che si impila.
- **Nessuna animazione di `font-variation-settings`.** Non è compositabile: relayout + reraster dei glifi per frame sull'elemento più grande della pagina, più rischio di riflow a metà animazione. È il difetto fatale di due delle direzioni valutate.
- **Nessun reparenting con GSAP Flip in apertura.** Il `backdrop-filter` sulla nav crea un containing block per i discendenti posizionati; il momento sarebbe gated dal bundle e su 4G leggerebbe come un errore di rendering.
- **Nessun timecode fittizio, nessun rAF permanente in `position:fixed`.** Uno strumento finto in una pagina la cui tesi è la verificabilità costa credibilità e INP e non porta un solo dato. L'indice di sezione vive nell'eyebrow; l'avanzamento vive nei quattro quadrati del mark, guidati da `scroll(root block)`, zero JS.
- **Nessuna colonna di quota fissa con il nome di sezione ruotato.** Due indicatori di avanzamento sono uno di troppo, e la meta-grafica costa attenzione che serve alla prova.
- **Nessun reticolo a carta millimetrata.** Su DPR frazionari (1,25 / 1,5 / 2,75) — cioè l'hardware esatto del pubblico — le linee da 1px producono moiré geometrico che non si risolve abbassando l'opacità; e mono + reticolo + arancio su nero è il confine con l'estetica terminale crypto/AI che il brief vieta.
- **Nessun blur per frame** nel nastro, nessun `filter: blur()` o `backdrop-filter` in animazione: è il costo GPU più alto del web moderno.
- **Nessun smooth scroll globale** (§6.4).
- **Nessun secondo pin, nessun secondo elemento scrubbato, nessun scroll orizzontale forzato.**
- **Nessun cursore custom, nessun magnetic hover, nessuno scramble text, nessuna sequenza di immagini scrubbata, nessun WebGL.** Sono i quattro cliché con la data di nascita più leggibile del web.
- **Nessun duotone sui ritratti**: disumanizza la prova che, per questo pubblico, converte più di tutte.
- **Nessuna seconda rottura di sistema.** Una sola banda chiara in tutta la pagina, spesa sulla prova istituzionale. **L'inserto Sales Process Day si sposta sulla pagina Eventi**: nel momento in cui l'utente è più caldo, una seconda offerta compete con la candidatura.
- **Nessun blocco «caffè» duplicato su quattro pagine.** Una volta sola, fuso con la candidatura.
- **Nessun gradiente arancio↔bianco, nessun magenta decorativo, nessun Nunito/Montserrat/Roboto/Roboto Slab.**
- **Nessuna sezione che contenga solo aggettivi.** Ogni fascia porta un nome proprio, un numero o un meccanismo, altrimenti non entra in pagina.
- **Nessun countdown, nessuna scarsità inventata, nessun pop-up all'ingresso, nessun prezzo barrato, nessuna foto stock di handshake.**

---

## 15. DEFINITION OF DONE (QA prima del lancio)

- [ ] `ScrollTrigger.getAll().length ≤ 3` e `document.querySelectorAll('.pin-spacer').length === 1`
- [ ] Sopra la piega girano ≤ 3 animazioni; l'elemento LCP è **testo** e non è gated da JS
- [ ] LCP < 1,8s / INP < 100ms / **CLS 0,00** misurati con `web-vitals` sul campo, su Moto G + 4G e su portatile Windows con GPU integrata
- [ ] `document.querySelectorAll('*').length < 1400`
- [ ] Zero `will-change` residui a riposo; zero `backdrop-filter` animati; zero animazioni di proprietà di layout; zero animazioni di `font-variation-settings`
- [ ] Test automatico dei token: nessun testo bianco sotto α .455, nessun bordo UI sotto α .340, nessun hover arancione più chiaro di `#FF8200`, nessuna superficie arancio oltre α .10
- [ ] Reduced-motion: nessuno scrub, nessun pin, nessun rAF, nastri scorribili a mano, ogni stato raggiungibile
- [ ] Sola tastiera: pagina intera navigabile, focus sempre visibile, pin attraversabile, entrambi gli skip-link funzionanti
- [ ] Snapshot visivo in CI a cinque valori di progress della scena pinnata
- [ ] Nessun blocco numerico pubblicato senza `fonte` e `data_aggiornamento` (la build lo rifiuta)
- [ ] Nessun testo arancione sotto 15px; nessun arancio come testo sulla banda carta; nessun `$` in tutto il sito
- [ ] Massimo 2 istanze di Instrument Serif, entrambe nelle due funzioni dichiarate
- [ ] **Test dello screenshot**: ogni fascia, immobile, funziona come manifesto
- [ ] Cinque imprenditori del target capiscono l'offerta in 20 secondi e trovano il criterio di candidatura senza cercarlo

---

## 16. CRITERI DI SUCCESSO (a 90 giorni dal lancio)

1. Candidature **qualificate** al mese (fatturato dichiarato 1–5 M€) vs candidature totali: il rapporto deve **salire**, non il volume assoluto — il sito deve filtrare meglio, non urlare più forte.
2. Scroll-depth: ≥60% degli utenti desktop supera la scena del metodo. Se il 40% abbandona **dentro** il pin, si degrada alla versione sticky (già scritta, costo zero).
3. Core Web Vitals nel verde al 75° percentile su traffico reale.
4. Tempo medio sulla fascia «Cosa entra, cosa esce» e uso reale dei chip di filtro: misura se la prova ispezionabile viene ispezionata.
5. Zero segnalazioni di accessibilità e nessun numero contraddittorio fra sito, LinkedIn e podcast al primo audit trimestrale.
