# Product

<!-- impeccable:product-schema 1 -->

> Fatti **dedotti** da `HANDOFF.md`, dalla spec e dai dossier in `docs/research/`, non da un'intervista:
> il committente ha chiesto di lavorare senza domande. Ogni voce marcata *(dedotto)* va confermata.

## Platform

web

## Users

Titolari e direttori commerciali di PMI italiane con fatturato fra 1 e 5 M€, prodotto già validato,
una rete vendita che rende poco o nessuna rete. Valutano un fornitore che entra in azienda: leggono
da desktop Windows in ufficio (rotella del mouse) e da telefono fra un appuntamento e l'altro.
*(dedotto da HANDOFF §4 e dalla spec)*

## Product Purpose

Sales Process Italia è un'agenzia "4 in 1": pubblicità, marketing a risposta diretta, reclutamento e
formazione della rete vendita, sotto lo stesso tetto e allineati su un numero solo, il fatturato del
cliente. Il sito deve portare l'imprenditore idoneo a **candidare la sua azienda** (o a prenotare il
Sales Process Day) e far uscire chi non rientra nel filtro senza bruciarlo.

## Positioning

Non vende contatti e non è un insieme di fornitori: consegna il reparto vendita intero e risponde del
numero finale. L'argomento che i concorrenti non usano: il fatturato si perde nei **tre passaggi di
consegna** fra i reparti, non nei reparti.

## Operating Context

Sito statico (HTML/CSS/JS + GSAP), costruito da `tools/build.mjs` a partire da `pages/`. Produzione
oggi su WordPress + Elementor: lo stack definitivo è una decisione aperta con il cliente.

## Capabilities and Constraints

- Form di candidatura con squalifica in tempo reale (sotto 1 M€), form di prenotazione evento.
- Video e mappa a facciata: si caricano solo al click (cookie e peso).
- Numero verde, ragione sociale, P.IVA, dati ISO: **da fornire**, non si inventano.
- Schede-risultato e fascicoli: provvisori (`prov: true` in `dati.js`) finché non arrivano le liberatorie.

## Brand Commitments

- Logo vero del cliente (mark a cinque quadrati in scalinata + wordmark), mai ridisegnato.
- Arancio `#FF8200` come unico accento; mai testo bianco su arancio.
- Pelle allineata a sharpify.io, richiesta dal cliente: fondo near-black, DM Sans peso 500 al display,
  raggi 2/8/12/999px. (Instrument Serif italic, contrappunto del riferimento, è stato ritirato nel
  giro 2 di verifica del restyling: il sito è tutto DM Sans.)
- Decisioni già chiuse col cliente: niente parentesi quadre negli occhielli, mai IBM Plex Mono, nessun
  nome di persona nella sezione metodo, niente quadratini arancioni sulle card team e reparti,
  Francesco Piergianni rimosso, fascia ISO/P.IVA rimossa, muro FATTURARE centrato.
- Voce: italiano diretto, frasi brevi, numeri con fonte e data.

## Evidence on Hand

- Fotografie del cliente: mani nere con oggetto arancione (`src/assets/webp/hand-*.webp`), i due pugni
  (`extra-1` PIÙ CLIENTI, `extra-2` banconote).
- 12 ritratti reali del team, 25 loghi clienti (PNG bianchi), 5 video-testimonianza reali con locandina.
- I dieci principi della pagina `/dna/` del cliente, parola per parola.
- **Assenti, da non inventare:** numero verde, liberatorie firmate, i tre passaggi di consegna reali,
  copertine e titoli dei libri, feed del podcast, durata media del rapporto.

## Product Principles

1. Ogni numero ha fonte e data, o non si pubblica.
2. Il filtro prima del bottone: la selettività è il motivo per cui "Candida la tua azienda" è credibile.
3. Il problema (i passaggi che cadono) si mostra prima della soluzione.
4. Le persone hanno una faccia: il compratore italiano di PMI compra dalle persone.

## Accessibility & Inclusion

WCAG 2.2 AA: contrasti verificati sui token, focus visibile, pausa reale su ogni movimento automatico,
`prefers-reduced-motion` gestito a token, target ≥ 44px su mobile (richiesta del committente).
