# Restyling salesprocess.it — Design

**Data:** 2026-09-09
**Direzione approvata:** SCALINATA VIVA (edizione definitiva)
**Riferimento richiesto dal cliente:** sharpify.io — se ne prende il *rigore*, non la pelle.

---

## Come si e arrivati qui

1. **Audit dal vivo** di salesprocess.it e sharpify.io via ispezione DOM/CSSOM/GSAP (non a occhio):
   token di colore, scala tipografica reale, raggi, ScrollTrigger registrati, animazioni CSS attive.
2. **5 recon in parallelo** — DNA di brand SalesProcess, design system Sharpify, architettura delle
   sezioni, audit del vocabolario di movimento, motion engineering 2026 + fattibilita di stack.
   Report integrali in `docs/research/recon-*.md`.
3. **5 direzioni creative** da angoli deliberatamente opposti (cinematografica, proof-first,
   brutalista-industriale, motion-first, + una quinta recuperata dalla prima sessione).
   Integrali in `docs/research/direzione-*.md`.
4. **3 giurie comparative** con lenti diverse — brand/gusto, conversione/UX, fattibilita/wow.
   Integrali in `docs/research/giuria-*.md`.

   | Direzione | Punteggio aggregato |
   |---|---|
   | Scalinata Viva | 239 |
   | Piano Sequenza | 232 |
   | Sala Macchine | 226 |
   | Scalinata Meccanica | 208 |

   Gara serrata e giurie divergenti: brand/gusto ha premiato Scalinata Viva (84),
   conversione ha premiato Sala Macchine (87). La sintesi parte dalla vincente e innesta
   la stratificazione della prova di Sala Macchine, i segni di taglio e la grana di
   Piano Sequenza, il cartiglio tecnico e la tipografia murale di Scalinata Meccanica.
5. **Sintesi** — elimina i difetti fatali segnalati dalle giurie e riscrive in versione
   realizzabile i momenti-firma bocciati come non implementabili.

## La spec

La specifica completa e operativa — token copiabili, 16 sezioni con copy italiano reale,
7 momenti-firma con ricetta tecnica, componenti, accessibilita, budget di performance,
stack, piano di consegna, YAGNI, definition of done — e in:

**[docs/research/SINTESI.md](../../research/SINTESI.md)**

Quel file e la fonte di verita. Questo documento registra il processo e la decisione.

## Il nucleo, in cinque righe

1. **Una particella** — il quadrato del marchio, 12px, radius 2px. E il segno delle liste, il
   glifo delle eyebrow, la barra di avanzamento nel logo, il mattone dei reparti, l'istogramma
   dei numeri, il gradino delle maschere fotografiche, il wipe fra le pagine.
2. **Un angolo** — 26,57 gradi (rise 1 : run 2). Governa solo mark, maschera a gradini,
   percorso degli handoff, wipe di pagina.
3. **Due assi con regola semantica** — la materia entra in diagonale citata (-9px, +20px);
   il testo entra in verticale dentro una maschera, perche si legge in orizzontale.
   Zero rotate, zero scale su testo, zero tilt 3D.
4. **Un accento come segnale** — #FF8200 su meno del 3% dei pixel. Se l'arancio non e
   cliccabile, non e un numero e non e il quadrato acceso, e sbagliato.
5. **Il nero non e dark mode: e il fondo nativo delle fotografie del brand.** Le mani su nero
   con l'oggetto arancione smettono di essere ritagli incollati e diventano pagina.

**Sesta legge, di verifica.** A motion spento ogni fascia deve funzionare come manifesto.
Se una sezione e bella solo in movimento, il motion sta coprendo una gerarchia debole — che e
esattamente la diagnosi del sito attuale.

## Vincoli bloccanti

Elencati per esteso in `docs/research/SINTESI.md`, sezione "Domande aperte". I tre che fermano
la consegna se non arrivano:

- **Il vettoriale del logo.** Esiste solo un PNG 293x68. Ricostruito provvisoriamente in
  `src/assets/brand/mark.svg` su griglia 3x5, pendenza assunta 1:2. Va approvata come canonica.
- **I tre passaggi di consegna** (chi passa cosa a chi, con che SLA, con che strumento, chi
  ne risponde). Sono il contenuto della scena centrale. Senza, la scena diventa quattro icone
  animate — il difetto del sito attuale — e si spedisce la versione statica in tabella.
- **Riconciliazione dei numeri.** Oggi convivono 150 vs +800 imprenditori, 20 vs 30 vs 34
  persone, 6 vs 9/12 mesi. Serve un valore per concetto, con etichetta e data.

## Decisione di stack

Sito statico custom (HTML/CSS/JS + GSAP), servito da `tools/serve.mjs` in sviluppo. Portabile
verso Astro per la messa in produzione. Su WordPress + Elementor il tetto di qualita reale e
~7/10 e la scena pinnata e il primo elemento sacrificabile: e una decisione da prendere con il
cliente prima della fase di build definitiva.
