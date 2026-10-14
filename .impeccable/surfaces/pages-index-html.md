---
version: 1
slug: "pages-index-html"
primary_target: "pages/index.html"
related_targets: []
---

# Surface brief — home e pagine interne di salesprocess.it

Scope: tutte le otto pagine (home per prima). Visitor mode: **Persuade**.
Audience: titolari di PMI 1–5 M€, desktop Windows e telefono. Job: capire che Sales Process consegna il
reparto vendita intero e risponde del fatturato. Action: candidare l'azienda (o prenotare il Sales
Process Day). Proof: schede-risultato con fonte, 5 video reali, 12 volti, 25 loghi, i dieci principi.
Constraints: brand e copy invariati (HANDOFF §6), nessun dato inventato, Lighthouse mobile ≥ 90,
WCAG AA, target ≥ 44px su mobile, reduced-motion.

## Direction contract

THESIS: Dal buio dei contatti alla luce del fatturato. Un palco scuro unico su cui si muove una sola luce
arancione; la particella del marchio porta la storia per tutta la pagina. Rifiuta la pila di blocchi con
la stessa dissolvenza su ogni sezione e le card tutte uguali.

OWN-WORLD: nero palco #020202 e base #161519 come un unico fondo continuo, arancio #FF8200 come luce
(alone, bordo acceso, numero), quadrato 12px raggio 2 come modulo di tutto (liste, grafici a unità,
transizioni a gradini), mani nere con oggetto arancione come fotografia (la serie del cliente, estesa nel giro 3 con
foto generate della stessa grammatica e fondo trasparente), il cubo arancione come oggetto-filo, DM Sans 500/700 (Instrument
Serif italic ritirato nel giro 2 di verifica: una sola famiglia), filetti al 12% di bianco, pill per le azioni.

STORY: il titolare vede i contatti sparsi diventare una scalinata (il processo), capisce che il
fatturato si perde nei passaggi fra reparti (il cubo che cade fra due mani), vede lo stesso cubo
passare di mano attraverso i quattro reparti, verifica facce, numeri e video, e candida l'azienda sapendo già se rientra nel filtro.

FIRST VIEWPORT: pill d'identità ("Agenzia 4 in 1 · dal 2020 · Milano") sopra il titolo centrato a
tutta forza ("Ti consegniamo il reparto che fattura." 132px max), su un campo 3D di cubi grafite in
profondità, luce arancione che segue il cursore; CTA bianco + outline sotto il deck, il filtro 1–5 M€
subito dopo; la scalinata 3D si monta al primo scroll e sborda nei loghi dei clienti. Nav fissa 76px
(marchio, capitolo corrente, candidatura, bottone Menu), barra evento in cima.

STRUCTURE (giro 4): copertina (hero, loghi) → sei capitoli in ordine di racconto, ciascuno con
segnacapitolo `.capo` (numero, nome, filo), un h2 e le sue sezioni h3 a metà respiro → chiusura (dove,
finale). 01 Il problema (contro) · 02 La soluzione (tetto, reparti) · 03 Il metodo (staffetta) · 04 I
risultati (cartelli, schede, numeri, video) · 05 Le persone · 06 Il podcast. Una luce del palco per
capitolo. Il menu è una card quasi a tutto schermo che nasce dal bottone, con anteprima fotografica
della pagina sotto il cursore.

FORM: mondo esistente esteso (new-work §3 "Extend an existing surface" / established world): nessun
concept-seed, la pelle è vincolata dal cliente. Firma: hero 3D che si monta in scalinata, staffetta
pinnata orizzontale col contatto fermo che accende i reparti, finale con la mano che alza il cubo.
Giro 3 (riscontro del cliente): titoli senza occhiello e leggibili, fregio rimosso, numeri a unità,
contro-esempio fotografico, aperture fotografiche delle pagine interne.
Giro 4: hero a pillola, home a capitoli, contro-esempio in una scena (foto in tre strati che si muove
allo scroll + conto 4 → 3 → 0), capitolo del podcast con il canale YouTube, menu a card gigante.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Momento memorabile
I cubi-contatto che si montano nella scalinata del logo al primo scroll.

## Decisioni aperte
Stack di produzione (statico vs WordPress), dati del cliente in HANDOFF §7, logo del podcast (file del
cliente da salvare in src/assets/podcast/).
