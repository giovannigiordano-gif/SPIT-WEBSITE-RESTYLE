# Motion engineering 2026 per il rebuild di salesprocess.it — consulenza tecnica frontend

## Punti chiave

- Il livello di sharpify.io è raggiungibile con GSAP 3.13 (oggi 100% gratuito, SplitText/ScrollSmoother/ScrambleText inclusi): il loro DOM mostra UN solo ScrollTrigger scrubbato — non è potenza di calcolo, è direzione artistica. Il gap con salesprocess.it è tipografia, nero e disciplina, non libreria.
- Architettura motion consigliata: 70% CSS nativo scroll-driven (animation-timeline: view() — compositor thread, zero JS), 20% GSAP ScrollTrigger per 2-3 scene forti con pin+scrub, 10% (o 0%) WebGL. Non il contrario.
- Verdetto LENIS: NO come smooth scroll globale su questo progetto. Il pubblico (imprenditori PMI, desktop Windows, rotella del mouse) è il peggiore per lo scroll-hijack. Si ottiene il 70% della sensazione premium con scrub: 0.5-1 su ScrollTrigger, che smussa l'animazione senza toccare l'input dell'utente — esattamente quello che fa sharpify.io.
- Percorso raccomandato: Astro statico + GSAP + Storyblok o Sanity (visual editing). WordPress+Elementor ha un tetto reale di ~7/10 e un LCP mobile che raramente scende sotto 2,2-2,8s; Next.js non aggiunge nulla di visivo e costa ~90KB gz di hydration in più. Astro dà lo stesso tetto qualitativo di Next a un terzo della complessità.
- Bug di accessibilità/brand da correggere subito: #FF8200 con testo bianco dà 2,49:1 di contrasto (fallisce WCAG AA). Il CTA arancione deve avere testo NERO (#0C0D0E su #FF8200 = 7,83:1). Lo stesso arancione su nero è 7,83:1 e passa AAA — motivo tecnico per andare dark-first.
- prefers-reduced-motion va fatto con token di durata e travel (--dur, --travel a 0), non con il classico `* { animation: none !important }` che rompe gli accordion e fa scomparire per sempre gli elementi con fill-mode: both. E il marquee 'FATTURARE, FATTURARE, FATTURARE' ricade sotto WCAG 2.2.2 Pause/Stop/Hide (livello A, obbligatorio): serve un controllo di pausa reale.
- La leva di conversione più grande non è motion: le testimonianze attuali hanno testo placeholder identico ripetuto e non c'è un solo numero quantificato. Sharpify riempie un marquee di result-card (25K EUR DEAL VALUE / 9 CLOSED DEALS IN 2 WEEKS). Prima di scrivere una riga di GSAP va raccolto quel dataset dai clienti reali.
- Non copiare la 'pelle' di Sharpify (eyebrow tra parentesi quadre, verde #3DDC84, DM Sans): si otterrebbe un clone riconoscibile. Rubare il livello e i meccanismi — bianco a scala di opacità, bordi hairline a 1px rgba(255,255,255,.08), tracking negativo -0.04em sul display, un solo accento, CTA pill — reinterpretati su Red Hat Display + #FF8200 + il mark a scalinata già esistente.

---

# Motion engineering 2026 — consulenza tecnica per il rebuild di salesprocess.it

## 0. Lettura preliminare: dove sta davvero il gap

Prima dei pattern, tre osservazioni che cambiano il preventivo.

**Il gap con sharpify.io non è tecnologico.** Il loro DOM contiene **un solo ScrollTrigger scrubbato** (`scrub: 0.5`, `start: "top 80%"`, `end: "+=80%"`, stagger 0.1 sul colore delle parole) più quattro animazioni CSS (`fadeInUpShort 0.7s`, marquee loghi 46s, pulse 1.6s sulla barra annuncio). È **Elementor 4.0.7 + GSAP 3.12.5**, cioè lo stesso stack che potreste avere domani mattina. Ciò che li separa da salesprocess.it è: un nero di base coerente (#161519 su 2077 nodi), il bianco usato come **scala di opacità** invece di una tavolozza di grigi, il tracking negativo aggressivo (-2,24px su 56px = -0,04em), un solo font (DM Sans su 1853 nodi contro le vostre 5 famiglie), un solo accento, e la disciplina di non animare quasi niente. **Motion non è il problema di salesprocess.it: il problema è che 110 section Elementor con gradienti arancio→bianco non hanno un sistema.**

**Il vero difetto non è visivo, è argomentativo.** Le testimonianze attuali hanno testo placeholder identico ripetuto, non c'è un singolo numero quantificato, e i 30 ritratti clienti 300×300 sono prova sociale muta. Sharpify apre invece con un marquee di *result-card* (logo cliente + numero grande + label caps: 25K EUR DEAL VALUE / 9 CLOSED DEALS IN 2 WEEKS). Per un'agenzia che vende "AUMENTARE IL FATTURATO", l'assenza di numeri è il buco più costoso del sito. **Prima di scrivere GSAP, va raccolto il dataset: +X% fatturato in Y mesi, N commerciali assunti, N appuntamenti/mese, per 8-12 clienti nominali.** Senza quello, ogni pattern qui sotto anima il vuoto.

**Un bug di contrasto da correggere subito.** Calcolo WCAG sulla vostra palette:

| coppia | contrasto | esito |
|---|---|---|
| `#FF8200` su `#0C0D0E` | **7,83 : 1** | passa AA e AAA |
| `#0C0D0E` su `#FF8200` | **7,83 : 1** | passa AA e AAA |
| `#FFFFFF` su `#FF8200` | **2,49 : 1** | **fallisce anche AA large** |

Quindi: il CTA arancione deve avere **testo nero**, non bianco. E l'arancione come testo funziona **solo su fondo scuro** — che è la giustificazione tecnica, non estetica, per andare dark-first e abbandonare i gradienti arancio→bianco (dove l'arancione perde leggibilità mentre il gradiente schiarisce). I gradienti radiali bianco→arancio rilevati nel DOM sono contemporaneamente il segnale "Elementor 2019" e un problema di accessibilità. Vanno via entrambi per lo stesso motivo.

---

## 1. I 12 pattern di motion che nel 2026 fanno WOW senza sembrare datati

Legenda costo: **compositor** = gira fuori dal main thread, praticamente gratis / **main-thread leggero** = <1ms/frame / **main-thread pesante** = va misurato / **GPU persistente** = consuma batteria finché è visibile.

---

### P1 — Scroll-driven animations native CSS (il layer di base)

**Cosa fa.** Lega il progresso di una `@keyframes` alla posizione di scroll (`scroll()`) o alla visibilità dell'elemento nel viewport (`view()`), senza una riga di JavaScript.

**Quando usarlo.** Per **tutto** il reveal ordinario: entrata delle sezioni, barra di progresso lettura, parallasse leggera, opacità/scala delle card. Deve coprire il 70% delle animazioni della pagina.

**Implementazione.**

```css
@keyframes rise {
  from { opacity: 0; translate: 0 24px; }
  to   { opacity: 1; translate: 0 0; }
}
.reveal {
  animation: rise linear both;
  animation-timeline: view();          /* timeline di visibilità dell'elemento */
  animation-range: entry 15% cover 40%;
}
/* barra di progresso legata allo scroll del documento */
.progress {
  animation: grow linear both;
  animation-timeline: scroll(root block);
}
/* fallback obbligatorio */
@supports not (animation-timeline: view()) {
  .reveal { opacity: 1; translate: none; }
}
```

API rilevanti: `animation-timeline`, `scroll(<scroller> <axis>)`, `view(<axis> <inset>)`, `animation-range` / `animation-range-start` / `-end` con i keyword `cover | contain | entry | exit | entry-crossing | exit-crossing`, e per il caso in cui il timeline vive su un altro elemento: `scroll-timeline-name` / `view-timeline-name` + `timeline-scope`.

**Supporto (settembre 2026).** Chromium 115+ (luglio 2023) senza flag; Safari 26+ (settembre 2025), con scroll-driven threaded in 26.4; Firefox ancora parziale/dietro flag in stable. Copertura globale ~82-85%. Va quindi trattato come **progressive enhancement puro** con `@supports`, mai come dipendenza.

**Costo.** Compositor thread. Il main thread non è coinvolto, quindi resta fluido anche se il JS è occupato — vantaggio strutturale che nessuna libreria può replicare. Vale però solo per proprietà compositor-friendly: `transform`, `translate`, `scale`, `rotate`, `opacity`, `filter`. Animare `width`, `height`, `padding`, `margin` riporta tutto in layout e annulla il beneficio.

**Rischio cliché.** Basso, perché è invisibile in quanto tecnica. Il cliché è il *contenuto* dell'animazione: se ogni sezione fa "fade + 24px su" siete nel 2018. Variabile da usare: `animation-range` diversi per elementi adiacenti, così l'entrata diventa una coreografia e non un'ondata uniforme.

---

### P2 — Pin + scrub scene (GSAP ScrollTrigger)

**Cosa fa.** Blocca una sezione a schermo e trasforma i pixel di scroll in progresso di una timeline: l'utente "scorre dentro" un'idea invece di scorrere oltre.

**Quando usarlo.** Una, massimo due volte per pagina, e **solo nel punto in cui il motion aiuta l'argomento**. Per salesprocess.it il punto è ovvio: il **Metodo 4-in-1 / "4 reparti costantemente allineati"** (Reclutamento, Formazione, Marketing, Vendita). Quattro stati, quattro reparti che si allineano mentre l'utente scorre: il movimento *è* il concetto.

**Implementazione.**

```js
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#metodo",
    start: "top top",
    end: "+=280%",          // durata della scena in pixel di scroll
    pin: true,
    pinSpacing: true,        // default: NON disattivarlo, causa CLS
    scrub: 0.6,              // il numero è lo smoothing (in secondi) → look "costoso"
    anticipatePin: 1,        // evita il flash di pin su scroll veloce
    invalidateOnRefresh: true,
    fastScrollEnd: true
  }
});
tl.from(".reparto-1", { yPercent: 40, opacity: 0, ease: "none" })
  .from(".reparto-2", { yPercent: 40, opacity: 0, ease: "none" }, "+=0.2");

// obbligatorio: i font cambiano i line-break e quindi start/end
document.fonts.ready.then(() => ScrollTrigger.refresh());
```

**Costo.** Main-thread leggero *per frame*, ma **costoso al refresh**: ogni `pin` inserisce un `.pin-spacer` nel DOM e ogni `ScrollTrigger.refresh()` ricalcola tutti gli start/end (reflow completo). 60 ScrollTrigger normali costano poco (precalcolano le posizioni, non osservano gli elementi); 60 pin costano molto. `ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true })` riduce il rumore.

**Rischio cliché.** Medio-alto. Il pin è passato dall'essere impressionante all'essere invasivo: se l'utente scorre 4000px e la pagina non avanza, la sensazione è di ostaggio, non di magia. Regole: `end` non oltre `+=200/300%`, mai due pin consecutivi, **zero pin sotto 1024px** (via `gsap.matchMedia()`), e la scena deve essere comprensibile anche in screenshot statico.

---

### P3 — Reveal tipografico con SplitText (riga / parola / carattere)

**Cosa fa.** Spezza il testo in wrapper per riga, parola o carattere e li anima in stagger. È il pattern che oggi separa un sito "fatto bene" da un sito "assemblato", perché lavora sull'asset più forte di un sito B2B: il titolo.

**Quando usarlo.** Tre volte per pagina, non venti: hero, statement di posizionamento, CTA finale. **Righe** per i paragrafi, **parole** per i display medi, **caratteri** solo per testo brevissimo (il payoff, il logo-type).

**Implementazione.** SplitText è **gratuito da GSAP 3.13** (Webflow ha acquisito GreenSock e da aprile 2025 tutti gli ex-plugin Club — SplitText, ScrollSmoother, MorphSVG, ScrambleText, DrawSVG, Inertia — sono liberi anche commercialmente). La riscrittura di SplitText ha dimezzato il peso e aggiunto due opzioni decisive:

```js
gsap.registerPlugin(SplitText, ScrollTrigger);

const split = SplitText.create("#hero h1", {
  type: "lines,words",
  mask: "lines",        // avvolge ogni riga in un wrapper con clip → reveal senza CSS extra
  autoSplit: true,      // ri-splitta al font-load e al resize (addio reflow sbagliato)
  aria: "auto",         // aria-label sul parent, aria-hidden sugli span → screen reader ok
  linesClass: "line++",
  onSplit(self) {       // ri-eseguito ad ogni re-split, con time-sync
    return gsap.from(self.lines, {
      yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.08
    });
  }
});
// su teardown: split.revert();
```

E la **firma di Sharpify**, il word-by-word colour scrub, che vale la pena rubare (cambiando il colore di arrivo — da `#69727D` a `#FFFFFF`, con l'ultima parola in `#FF8200`):

```js
const s = SplitText.create("#manifesto", { type: "words", aria: "auto" });
gsap.to(s.words, {
  color: "#FFFFFF", stagger: 0.1, ease: "none",
  scrollTrigger: { trigger: "#manifesto", start: "top 80%", end: "+=80%", scrub: 0.5 }
});
```

**Costo.** Esplosione del DOM: un paragrafo di 40 parole in `chars` diventa 200+ nodi. Con Lighthouse che avvisa oltre ~1400 nodi totali e Sharpify già a 2077, questo è il vincolo reale. Inoltre `type: "lines"` **deve** attendere il font (`document.fonts.ready` o `autoSplit: true`), altrimenti le righe vengono spezzate sui line-break del fallback e al font-swap salta tutto → CLS. `@font-face` con `size-adjust` / `ascent-override` sul fallback azzera lo shift.

**Rischio cliché.** Basso se per righe con maschera, **alto** per carattere con stagger lineare: il "char-by-char da 0.02s" è il tic più riconoscibile del template Framer/Webflow. Se lo usate sui caratteri, rendetelo non-lineare (stagger `{ each: 0.02, from: "random" }` o `"center"`) e su una sola parola.

---

### P4 — Mask e clip-path reveal

**Cosa fa.** Il contenuto non appare: viene **scoperto**. È la differenza percettiva tra "un elemento è comparso" e "qualcuno ha alzato una tenda" — ed è la ragione per cui i siti Exo Ape sembrano costosi.

**Quando usarlo.** Su immagini (avete asset fotografici forti e mal sfruttati: mani con oggetti arancioni su nero), su righe di testo, sui bordi delle card, sulla transizione tra due sezioni.

**Implementazione.** Tre livelli, dal più economico al più costoso:

```css
/* 1) MIGLIORE: transform dentro un wrapper con clip → 100% compositor */
.mask { overflow: clip; display: block; }
.mask > * { will-change: transform; }         /* rimuovere a fine animazione */
/* animare translateY del figlio da 110% a 0 */

/* 2) clip-path interpolabile via @property */
@property --wipe { syntax: '<percentage>'; inherits: false; initial-value: 100%; }
.wipe { clip-path: inset(0 var(--wipe) 0 0); transition: --wipe .9s cubic-bezier(.22,1,.36,1); }
.wipe.is-in { --wipe: 0%; }

/* 3) mask-image con gradiente animato → il più bello, il più costoso */
.soft { mask-image: linear-gradient(to bottom, #000 var(--m), transparent calc(var(--m) + 18%)); }
```

**Costo.** Opzione 1: compositor, gratis. Opzione 2: `clip-path` non è accelerato in modo garantito su tutti i motori — comporta re-raster dell'elemento a ogni frame; accettabile su 1-2 elementi, non su 20. Opzione 3: `mask-image` animata è la più esosa (raster + composite per frame): mai durante uno scrub, solo su transizioni brevi e discrete.

**Rischio cliché.** Molto basso. È il pattern con il miglior rapporto tra effetto percepito e rischio di sembrare datato, perché non ha una "forma" riconoscibile. **È il pattern su cui investirei più tempo per salesprocess.it.**

---

### P5 — Marquee infinito

**Cosa fa.** Un nastro che scorre in loop. Funziona perché il movimento continuo attira l'occhio periferico e perché comunica quantità ("ce ne sono tanti") senza occupare spazio verticale.

**Quando usarlo.** Due volte, con due funzioni diverse:
1. **Result-card marquee** (rubato a Sharpify, ed è la mossa migliore del loro sito): logo cliente + numero grande + label caps. Trasforma la prova sociale da elenco statico in flusso.
2. **Il payoff.** `FATTURARE, FATTURARE, FATTURARE` in caps arancio su nero, letterspaced, **è un marquee nato**: tre parole ripetute che scorrono. Costa 8 righe di CSS e diventa la cosa che la gente ricorda del sito.

**Implementazione.** CSS puro, niente librerie:

```css
.marquee { overflow: clip; }
.marquee__track {
  display: flex; width: max-content; gap: 3rem;
  animation: slide 46s linear infinite;   /* 46s è il valore che usa Sharpify sui loghi */
}
@keyframes slide { to { transform: translate3d(-50%, 0, 0); } }  /* contenuto duplicato 1×, clone aria-hidden */
.marquee:hover .marquee__track,
.marquee:focus-within .marquee__track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
  .marquee { overflow-x: auto; }          /* l'informazione resta raggiungibile */
}
```

Variante che vale il JS: **velocità legata allo scroll** (il nastro accelera e inverte con la direzione di scroll) — via helper `horizontalLoop` di GSAP + `ScrollTrigger.onUpdate` con `self.getVelocity()` e `tl.timeScale()`.

**Costo.** Compositor, ma **animazione infinita**: tiene la GPU sveglia e consuma batteria anche fuori schermo. Obbligatorio metterla in pausa con IntersectionObserver (`animation-play-state`) e su `visibilitychange`.

**Vincolo normativo, non stilistico.** WCAG 2.2 **SC 2.2.2 Pause, Stop, Hide è livello A**: qualsiasi movimento automatico che duri oltre 5 secondi deve avere un modo per fermarlo. Pausa su hover/focus + rispetto di `prefers-reduced-motion` (tecnica W3C C39) è la via accettata. Con l'European Accessibility Act in vigore dal 28 giugno 2025, per un cliente che vende a aziende questo è anche un argomento commerciale.

**Rischio cliché.** **Altissimo** se è un nastro di loghi. Il marquee di loghi grigi è l'elemento più saturo del web B2B 2024-2026. Sharpify se ne salva perché ci mette dentro *numeri di risultato*, non loghi. Copiate quello, non il nastro di loghi.

---

### P6 — Sticky stacking cards

**Cosa fa.** Le card si sovrappongono impilandosi mentre si scorre, con la precedente che scala/scurisce sotto la successiva.

**Quando usarlo.** Per 3-5 elementi sequenziali con pari dignità. Nel vostro caso: i 4 reparti, oppure le fasi dei "6 mesi o meno".

**Implementazione.** Preferire CSS puro + scroll-driven, non GSAP:

```css
.stack { --n: 4; }
.stack__card {
  position: sticky;
  top: calc(12vh + var(--i) * 1.25rem);
  border: 1px solid rgb(255 255 255 / .08);
  border-radius: 12px;
  animation: shrink linear both;
  animation-timeline: view();
  animation-range: exit -10% exit 60%;
}
@keyframes shrink { to { scale: .94; filter: brightness(.55); } }
```

**Costo.** Bassissimo se CSS. `position: sticky` è nativo e non richiede pin-spacer. Se lo fate con ScrollTrigger + `pin` su ogni card, moltiplicate i costi di refresh per niente.

**Rischio cliché.** **Alto.** È il pattern 2023-2024 per eccellenza, ormai preset in ogni template. Differenziatori possibili: rotazioni leggere e alternate (`rotate: calc(var(--i) * -0.4deg)`), bordi hairline invece di ombre, e soprattutto un **motivo di contenuto** — le 4 card si impilano perché i 4 reparti *si sommano*, non perché è carino. Se non c'è il motivo, saltatelo.

---

### P7 — Horizontal scroll section

**Cosa fa.** Lo scroll verticale muove una track orizzontalmente. Rompe l'aspettativa e per questo è memorabile.

**Quando usarlo.** 4-8 elementi omogenei che beneficiano di un confronto laterale: case study, fasi di processo, prima/dopo.

**Implementazione.**

```js
const track = document.querySelector(".h-track");
const dist  = () => track.scrollWidth - innerWidth;

const master = gsap.to(track, {
  x: () => -dist(), ease: "none",
  scrollTrigger: {
    trigger: ".h-wrap", pin: true, scrub: 1,
    end: () => "+=" + dist(),
    invalidateOnRefresh: true
  }
});

// animazioni annidate: usare containerAnimation, NON un nuovo ScrollTrigger
gsap.from(".h-card", {
  y: 60, opacity: 0, stagger: 0.1,
  scrollTrigger: { trigger: ".h-card", containerAnimation: master, start: "left 85%", scrub: true }
});
```

`containerAnimation` è l'API precisa da conoscere: permette di triggerare animazioni sulla posizione *orizzontale* dentro il carosello, e richiede `ease: "none"` sull'animazione contenitore.

**Costo.** Pin + distanza di scroll lunga + potenzialmente molti layer promossi contemporaneamente. È il pattern più facile da rendere lento.

**Su mobile: non farlo.** Sostituire con scroll nativo + snap, che è più veloce, più accessibile e più familiare:

```css
@media (max-width: 1023px) {
  .h-track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory;
             overscroll-behavior-x: contain; scrollbar-width: none; }
  .h-card  { scroll-snap-align: center; flex: 0 0 82%; }
}
```

**Rischio cliché.** Medio. Non è datato, ma è **spesso ostile**: confonde l'utente sulla lunghezza della pagina, rompe la scroll-bar come indicatore di progresso, e su trackpad può innescare navigazioni "indietro" accidentali del browser. Per un pubblico di imprenditori PMI su desktop Windows: **lo sconsiglio**.

---

### P8 — Counter animati

**Cosa fa.** Un numero conta fino al valore finale quando entra in viewport.

**Quando usarlo.** Sui 3 KPI principali. Sharpify li usa così ($50M / 25 COUNTRIES / 2300 CLIENTS con micro-label "up growing every quarter" e glow radiale colorato per card).

**Implementazione.**

```js
const state = { v: 0 };
gsap.to(state, {
  v: 2300, duration: 2, ease: "power2.out", snap: { v: 1 },
  onUpdate() { el.textContent = new Intl.NumberFormat("it-IT").format(state.v); },
  scrollTrigger: { trigger: el, start: "top 85%", once: true }
});
```

Alternativa senza JS, con CSS puro (`@property` + `counter-reset` interpolato) — funziona, ma la formattazione italiana con separatore delle migliaia è più fragile: preferisco `Intl.NumberFormat`.

**Costo.** Trascurabile per frame, ma **`onUpdate` che scrive `textContent` forza layout a ogni frame**. Antidoto obbligatorio contro il CLS:

```css
.kpi { font-variant-numeric: tabular-nums; min-inline-size: 5ch; display: inline-block; }
```

**Rischio cliché.** **Molto alto.** Il count-up è l'animazione più imitata del web marketing e vale zero da sola. La verità: il WOW non sta nel contare, sta nella **scala tipografica**. Un `50M` statico a 180px con l'unità separata (`$` a 44px, `M` a 44px, come fa Sharpify) è più impressionante di un count-up a 32px. Se lo fate: numero grandissimo + count-up brevissimo (0,9-1,2s, non 3s) + `once: true` + una micro-label che dia contesto ("su 340 aziende seguite dal 2019"), perché un numero senza denominatore non convince un imprenditore.

---

### P9 — Magnetic / elastic hover

**Cosa fa.** L'elemento inseguе il puntatore con inerzia entro un raggio, e torna con elasticità all'uscita. Comunica "questa cosa è viva e vuole essere cliccata".

**Quando usarlo.** **Su un solo elemento**: il CTA primario. Per voi `CANDIDA LA TUA AZIENDA` — che è già un CTA forte perché è selettivo (candidatura, non "richiedi demo"), e merita di essere l'unico oggetto magnetico della pagina.

**Implementazione.** La parte critica è **non creare un tween per evento**:

```js
const fine = matchMedia("(hover: hover) and (pointer: fine)");
if (fine.matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
  const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });
  let r = btn.getBoundingClientRect();                       // cache: mai dentro il listener
  addEventListener("resize", () => { r = btn.getBoundingClientRect(); }, { passive: true });

  btn.addEventListener("pointermove", (e) => {
    xTo((e.clientX - (r.left + r.width / 2)) * 0.32);
    yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
  });
  btn.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
}
```

`gsap.quickTo` (e `gsap.quickSetter` per il caso senza easing) è l'API che rende questo pattern INP-safe: riusa lo stesso tween invece di istanziarne uno per `pointermove`. Con `gsap.to` dentro `pointermove` create 60+ tween al secondo — è il modo più comune di distruggere l'INP su un sito "animato".

**Costo.** `pointermove` gira sul main thread. Con `quickTo` + rect cachato: <0,2ms per evento. Con `getBoundingClientRect()` dentro il listener: layout thrashing e INP oltre i 200ms.

**Rischio cliché.** **Alto** — è il marchio di fabbrica di Cuberto e di mille cloni. Prendete la *meccanica*, non l'*estetica*: niente cursore-blob viola, niente magnetismo su 15 elementi. Uno, con moltiplicatore basso (0,25-0,35, non 0,8) e ritorno rapido.

---

### P10 — Cursore custom

**Cosa fa.** Sostituisce o affianca il cursore di sistema con un elemento che cambia stato al contesto.

**Quando usarlo.** Onestamente: **quasi mai nel 2026**, e per salesprocess.it **no**. Ha senso solo se porta informazione che non può stare altrove — per esempio la parola `CANDIDATI →` che segue il puntatore dentro l'area del CTA, o `GUARDA` sopra un video di testimonianza.

**Implementazione (se proprio).**

```js
const cur = document.querySelector(".cursor");
const xTo = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3" });
const yTo = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3" });
addEventListener("pointermove", e => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
document.querySelectorAll("[data-cursor]").forEach(el => {
  el.addEventListener("pointerenter", () => cur.dataset.state = el.dataset.cursor);
  el.addEventListener("pointerleave", () => cur.dataset.state = "");
});
```

```css
.cursor { position: fixed; inset-block-start: 0; inset-inline-start: 0; pointer-events: none;
          z-index: 9999; mix-blend-mode: difference; }  /* il trucco dell'inversione */
@media (hover: none), (prefers-reduced-motion: reduce) { .cursor { display: none; } }
```

**Regole non negoziabili.** Mai `cursor: none` su `input`, `textarea`, `select` e link (serve la caret e serve il feedback di sistema); mai su touch; disattivato con reduced-motion; e il focus da tastiera non deve mai dipendere dal cursore.

**Costo.** Un `pointermove` + una trasformazione composita. Basso. Ma `mix-blend-mode: difference` su un elemento fisso costringe il browser a un composite layer che copre lo schermo: su GPU integrate vecchie si vede.

**Rischio cliché.** **Il più alto della lista.** È l'elemento che datava i siti al 2019-2021 e oggi legge come "portfolio di studente". Lo escluderei dal progetto.

---

### P11 — Transizioni di pagina con View Transitions API

**Cosa fa.** Anima la transizione tra due stati del DOM — o tra **due documenti diversi**, cioè tra due pagine di un sito multipagina, senza SPA, senza router, senza JavaScript.

**Quando usarlo.** Sempre, appena il sito ha più di una pagina. Per voi: home → `/quiz/`, home → `/team/`, home → case study. È l'upgrade con il miglior rapporto effetto/costo dell'intero elenco.

**Implementazione cross-document (MPA):**

```css
@view-transition { navigation: auto; }

::view-transition-old(root) { animation: 220ms cubic-bezier(.4,0,1,1) both fade-out; }
::view-transition-new(root) { animation: 320ms cubic-bezier(0,0,.2,1) both fade-in; }

/* elementi che devono "volare" da una pagina all'altra: stesso nome sui due documenti */
.hero-title  { view-transition-name: page-title; }
.brand-mark  { view-transition-name: brand; }
.card-media  { view-transition-class: media; }   /* per stilare gruppi */
```

Same-document (per filtri, tab, cambio lista):

```js
if (document.startViewTransition) document.startViewTransition(() => updateDOM());
else updateDOM();
```

Pseudo-elementi e selettori utili: `::view-transition-group()`, `::view-transition-image-pair()`, `::view-transition-old()`, `::view-transition-new()`, la pseudo-classe `:active-view-transition`, e `view-transition-class` per applicare regole a famiglie di elementi.

**Supporto.** Same-document: cross-browser. Cross-document: Chromium 126+, Safari 18.2+, Firefox in arrivo. **Ed è irrilevante**: la regola `@view-transition` viene semplicemente ignorata dove non è supportata, la navigazione funziona normalmente. È l'API più progressive-enhancement-friendly degli ultimi anni.

**Costo.** Il browser rasterizza uno snapshot dei due stati. Su elementi enormi (una hero full-bleed con immagine 4K) lo snapshot costa memoria e può far scattare un frame. Ogni `view-transition-name` deve essere **unico nel documento** al momento della cattura, altrimenti la transizione viene abortita silenziosamente — è il bug numero uno di questa API (tipico con liste di card che condividono un nome).

**Reduced motion:**

```css
@media (prefers-reduced-motion: reduce) {
  @view-transition { navigation: none; }
}
```

**Rischio cliché.** Nullo. È infrastruttura, non decorazione. Il cliché sarebbe fare la stessa cosa con una SPA e Barba.js nel 2026: peso enorme, SEO più fragile, gestione focus da riscrivere, per ottenere meno.

---

### P12 — Canvas/WebGL leggero: shader gradient, particelle, distorsione su hover

**Cosa fa.** Una superficie generativa che non si può fare in CSS: un gradiente che respira con noise fBm, una distorsione RGB su un'immagine al passaggio del mouse, un campo di particelle.

**Quando usarlo.** Quando la marca *è* tecnologia, o quando serve un unico momento di spettacolo puro. **Per salesprocess.it: no, o al massimo un glow generativo dietro la hero.** Il pubblico non compra "wow tecnico", compra credibilità e velocità.

**Implementazione, in ordine di costo crescente.**

*Livello 0 — l'alternativa che ottiene l'80% dell'effetto a costo zero.* Un `radial-gradient` arancione sfocato in un PNG/WebP pre-blurrato, sopra `#0C0D0E`, più un tile di grana SVG (`feTurbulence` renderizzato **una volta** in un data-URI, non animato) a 3-4% di opacità, più `background-blend-mode: screen`. Su OLED, a colpo d'occhio, è indistinguibile da uno shader. È esattamente il trucco delle stat-card con glow di Sharpify (loro usano glow radiali distinti: rosso, verde, blu). **Nota: non fatelo con `filter: blur(120px)` animato** — il blur su aree grandi è il costo GPU più alto del web moderno.

*Livello 1 — shader gradient reale.* **OGL** (~10KB gz), non three.js (~150KB gz per il core). Un singolo quad fullscreen, noise fBm nel fragment shader, `uTime` a velocità 0,15. Vincoli operativi:

```js
const renderer = new Renderer({ dpr: Math.min(devicePixelRatio, 1.5), alpha: true });
// render a metà risoluzione e upscale via CSS: risparmio ~4× di fill-rate
```

*Livello 2 — distorsione immagine su hover.* Plane con displacement map da texture di noise, `uHover` interpolato. Bello sui vostri ritratti clienti, ma richiede WebGL sempre attivo per un effetto che il 60% degli utenti non vedrà mai (mobile).

*Livello 3 — particelle.* Punti istanziati, movimento **nel vertex shader** (nessun loop JS per particella), tetto a 2-5k punti.

**Gating obbligatorio prima di importare il modulo:**

```js
const capable =
  matchMedia("(min-width: 1024px)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches &&
  (navigator.hardwareConcurrency ?? 4) > 4 &&
  (navigator.deviceMemory ?? 4) >= 4 &&
  !navigator.connection?.saveData &&
  ["4g", undefined].includes(navigator.connection?.effectiveType);

if (capable) requestIdleCallback(() => import("./gl/gradient.js").then(m => m.init()));
```

Più: `IntersectionObserver` → `renderer.setAnimationLoop(null)` fuori schermo, e `document.visibilitychange` → stop. Un canvas WebGL che gira in un tab in background è un bug, non una feature.

**Costo.** `import()` + compilazione shader = 150-300ms di TBT (da spostare dopo l'LCP, sempre); poi **GPU persistente**: batteria, ventole, e su mobile rischio di tab reload per pressione di memoria.

**Rischio cliché.** **Alto e specifico**: lo shader-blob viola/blu è diventato il timbro visivo "startup AI 2024-2025". La distorsione immagine su hover è Awwwards 2019. Se lo fate, che sia con **il vostro** arancione e con una forma che deriva dal logo (la scalinata di quadrati ascendenti), non con un blob generico.

---

### Fuori classifica — due pattern da conoscere e (quasi sempre) rifiutare

**13. Testo che si deforma o si ricompone.** Le tecniche vive nel 2026 sono due. (a) **Variable font axis animation**: `@property --wght { syntax: '<number>' }` + `font-variation-settings: 'wght' var(--wght)`, guidato da `animation-timeline: view()` o dalla velocità di scroll. È fresco, costa poco (un solo file WOFF2 variabile), e nessuno lo fa ancora — ma richiede un font variabile: **Red Hat Display esiste in variabile**, quindi è disponibile per voi. (b) **ScrambleTextPlugin** (ora gratuito): `gsap.to(el, { duration: 1.1, scrambleText: { text: "FATTURARE", chars: "upperCase", speed: 0.4, revealDelay: 0.3 } })` — visivamente "decodifica" la parola. Oggi è associato al gergo AI/crypto, quindi **una sola istanza**: sul payoff, dove il senso è letteralmente "la parola che conta". Da evitare invece: skew su velocità di scroll (2020), e `feDisplacementMap` SVG su testo durante lo scroll (filtro SVG = raster sul main thread, uccide il framerate).

**14. Sequenze di immagini scrubbate.** Il pattern Apple: 120-240 frame ridisegnati su canvas mentre si scorre. **Costo brutale**: 120 frame × 80KB WebP ≈ 10MB, più il preload, più la memoria delle `ImageBitmap`. Alternativa moderna: **un video AV1/WebM codificato all-intra** (`-g 1`, tutti keyframe, così il seek è istantaneo) scrubbato con `video.currentTime` + `requestVideoFrameCallback` → 1-2MB per 4 secondi. Resta il problema che Safari iOS throttla il seeking e richiede `playsinline` + interazione. **Verdetto per voi: saltare.** I vostri asset (mani con oggetti arancioni su nero, foto evento Sales Process Day) rendono molto meglio in una scena pinned a 3-5 cross-fade con maschera — costo 300KB invece di 10MB, effetto simile.

---

### Selezione operativa: cosa spedire davvero su salesprocess.it

| # | Pattern | Dove | Priorità |
|---|---|---|---|
| P1 | CSS `view()` reveal su tutte le sezioni | globale | **must** |
| P4 | Mask/clip reveal su immagini e righe | hero, foto clienti, evento | **must** |
| P3 | SplitText `mask:"lines"` | 3 display headline | **must** |
| P3b | Word-by-word colour scrub | statement di posizionamento | **must** — è il pattern-firma |
| P5 | Marquee result-card + marquee payoff | prova sociale + FATTURARE×3 | **must** (dipende dai dati) |
| P2 | Una scena pinned | Metodo 4-in-1 / 4 reparti | **must** — l'unico pin |
| P8 | 3 counter + numeri giganti | KPI | should |
| P9 | Magnetic sul solo CTA | CANDIDA LA TUA AZIENDA | should |
| P11 | View Transitions cross-document | home ↔ quiz ↔ team | should — costa 15 righe |
| P6 | Sticky stacking | solo se serve al contenuto | could |
| P12 | Glow generativo (livello 0, non WebGL) | hero | could |
| P7, P10, P13b, P14 | horizontal scroll, cursore custom, scramble, image sequence | — | **non fare** |

Motion token da fissare prima di animare qualsiasi cosa:

```css
:root {
  --dur-xs: 120ms; --dur-s: 200ms; --dur-m: 420ms; --dur-l: 900ms;
  --ease-out:  cubic-bezier(.22, 1, .36, 1);      /* expo.out — l'ease "costoso" */
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
  --travel: 24px; --stagger: 80ms; --parallax: 1;
}
```

---

## 2. Verdetto su LENIS / smooth scroll

### Cosa fa bene, e perché è vinto sul mercato

Lenis (darkroom.engineering, ~3KB gz) ha sostituito Locomotive Scroll per una ragione architetturale precisa: le librerie di vecchia generazione **traducevano un wrapper con `transform`**, lasciando la posizione di scroll reale del browser ferma. Questo rompeva `position: sticky`, gli anchor link, la barra di scorrimento nativa, il find-in-page (Ctrl+F), la navigazione da tastiera e gli screen reader, e aumentava il carico GPU. Lenis interpola invece la **posizione di scroll nativa**: la pagina scorre davvero, gli anchor funzionano, sticky funziona, la scrollbar è vera.

Il beneficio più sottovalutato è tecnico, non estetico: **filtrando passa-basso il delta di scroll, Lenis riduce il jitter percepito delle scene scrubbate**. È il motivo per cui i siti da Awwwards sembrano fluidi anche mentre fanno lavoro pesante.

### I contro, senza sconti

1. **Cambia il contratto input → pixel.** Su trackpad e rotella si introducono 100-300ms di latenza percepita. I designer lo trovano elegante; una quota rilevante di utenti lo trova rotto, e non lo sa articolare — dice solo "il sito è strano".
2. **Litiga con lo scroll-snap nativo.** Conflitto documentato con `scroll-snap-type`; interferisce anche con `scroll-behavior: smooth`, `scrollIntoView()`, il salto del find-in-page e il rubber-band di macOS.
3. **Su touch va lasciato spento.** `syncTouch` è disattivato di default per un buon motivo: il momentum di iOS è tarato fisicamente e Lenis lo peggiora; attivandolo si rischia anche di rompere il collasso della barra URL.
4. **Occupa il requestAnimationFrame.** Con GSAP va integrato correttamente o si ottiene un desync a doppio rAF, visibile come micro-stutter degli elementi pinnati.
5. **Accessibilità.** PageDown/Space funzionano, ma l'arrivo è ritardato e **il focus può trovarsi fuori dal viewport durante l'ease**: chi naviga da tastiera perde il segno. Va azzerato sotto `prefers-reduced-motion`.
6. **INP.** Non tocca LCP né CLS, ma aggiunge lavoro sul main thread durante lo scroll: un click che arriva mentre l'ease è in volo si mette in coda.

### Se lo si usa, la configurazione corretta

```js
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reduce = matchMedia("(prefers-reduced-motion: reduce)");
let lenis;

if (!reduce.matches) {
  lenis = new Lenis({ autoRaf: false, lerp: 0.1, wheelMultiplier: 1, syncTouch: false, anchors: true });
  lenis.on("scroll", ScrollTrigger.update);          // 1. sincronizza ScrollTrigger
  gsap.ticker.add((t) => lenis.raf(t * 1000));       // 2. un solo rAF, quello di GSAP
  gsap.ticker.lagSmoothing(0);                       // 3. niente lag smoothing durante lo scrub
}
reduce.addEventListener("change", () => { lenis?.destroy(); location.reload(); });
```

### Nota su ScrollSmoother

Ora gratuito con GSAP, e regala i parallax dichiarativi (`data-speed`, `data-lag`) senza scrivere codice. **Ma trasforma un wrapper** (`#smooth-wrapper` / `#smooth-content`) e quindi reintroduce esattamente i problemi di sticky e anchor che Lenis aveva risolto. Se serve smooth scroll: **Lenis > ScrollSmoother**, a meno che il valore stia tutto nei parallax `data-speed`.

### Quando è un errore

- Siti di **consultazione e densità informativa**: documentazione, blog, e-commerce, listini, tabelle comparative.
- Qualsiasi pagina con `scroll-snap`.
- Qualsiasi applicazione o dashboard.
- Quando il pubblico è **enterprise/over-40, desktop Windows, rotella del mouse**.
- Ogni volta che si mette "perché lo fanno tutti", senza scene scrubbate da smussare. Se non c'è nulla da smussare, Lenis è solo latenza aggiunta.

### Verdetto per salesprocess.it: NO

Il pubblico target — imprenditori di PMI italiane, in gran parte su desktop, che devono leggere un'offerta e candidare l'azienda — è il profilo peggiore possibile per lo scroll-hijack. E il riferimento che il cliente stesso ha scelto, **sharpify.io, non usa smooth scroll**: nel loro DOM c'è un `ScrollTrigger` con `scrub: 0.5` e nient'altro.

**La strategia corretta è spostare lo smoothing dallo scroll all'animazione:**

1. Nessun smooth scroll globale.
2. `scroll-behavior: smooth` nativo solo per gli anchor, con `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto } }`.
3. `scrub: 0.5` – `1` su ogni ScrollTrigger: il numero è il tempo (in secondi) che l'animazione impiega a raggiungere il progresso dello scroll. **Rende l'animazione fluida senza rendere lo scroll lento.** Si ottiene circa il 70% della sensazione "costosa" a zero costo di usabilità e zero KB.
4. `ease: "none"` su tutti i tween scrubbati (l'easing lo fa già lo scroll).

Questo è, secondo me, il singolo consiglio più importante di tutto il documento: **la sensazione premium dei siti da Awwwards viene dallo smoothing dell'animazione, non dal sequestro dello scroll — e i due si confondono continuamente.**

---

## 3. Come si fa un sito animato che resta VELOCE

### 3.1 Budget, scritti nel contratto

**Core Web Vitals** (valutati al 75° percentile del traffico reale, soglie identiche desktop e mobile):

| metrica | "good" | target progetto | note |
|---|---|---|---|
| LCP | < 2,5s | **< 1,8s** | mobile 4G throttled, Moto G |
| INP | < 200ms | **< 100ms** | è la metrica che i siti animati sbagliano |
| CLS | < 0,1 | **0,00** | un sito animato non ha scuse: ogni shift è un bug |
| TTFB | < 800ms | < 200ms | statico su CDN: 30-80ms |
| TBT (lab) | — | < 200ms | proxy di laboratorio per l'INP |

**Budget di peso:**

| risorsa | tetto |
|---|---|
| HTML | 40KB gz |
| CSS critico inline | **14KB** (1 RTT) |
| CSS totale | 60KB gz |
| JS al primo render | **100KB gz** |
| font | 120KB (2 pesi variabili WOFF2, subset latin) |
| immagine hero | 180KB AVIF |
| nodi DOM | **< 1500** (Lighthouse avvisa oltre ~1400) |

Il budget JS è più generoso di quanto sembri: GSAP core ≈ 23KB gz + ScrollTrigger ≈ 11KB + SplitText ≈ 7KB ≈ **41KB gz** per l'intero motion stack. Resta spazio. Per confronto: una pagina Elementor tipica aggiunge 200-400KB di asset frontend (3-5× il block editor), e Elementor porta oltre 21MB di codice non compresso nell'installazione.

Sul **budget di nodi** siete già fuori: 110 `section` Elementor significa quasi certamente oltre 3000 nodi. Sharpify è a 2077 nodi solo per il colore di base. SplitText su `chars` peggiora tutto. Questo vincolo, da solo, orienta la scelta di stack.

**Budget di frame:** 16,6ms a 60Hz, **8,3ms a 120Hz** (e i display a 120Hz sono ormai la norma su mobile di fascia media-alta). Ogni scena scrubbata deve costare **< 2ms di JS per frame**.

### 3.2 LCP: la regola che nessuno rispetta

**La prima schermata non contiene animazioni gated da JavaScript.** Punto.

Il meccanismo: il browser considera l'elemento LCP dipinto solo quando è effettivamente visibile. Un hero reveal che parte da `opacity: 0` e viene attivato da un `gsap.from()` dopo il caricamento del bundle sposta l'LCP di 300-800ms. È il modo più comune di distruggere le Core Web Vitals con "un po' di motion".

Cosa fare invece:
- L'elemento LCP è **testo** (il display `<h1>`), non un'immagine né un canvas. Il testo è l'LCP più rapido possibile.
- Font: `<link rel="preload" as="font" type="font/woff2" crossorigin>`, `font-display: swap`, e sul `@font-face` di fallback `size-adjust` / `ascent-override` / `descent-override` per azzerare lo shift al swap.
- Il reveal della hero è **CSS-only e parte al parse**, non a caricamento JS completato: `animation: rise var(--dur-l) var(--ease-out) both;` con durata ≤ 700ms e un `translate`/`clip-path` su un wrapper, **mentre il testo è già opaco**. Il testo è dipinto; è la maschera che si muove.
- Se c'è un'immagine hero: `fetchpriority="high"`, AVIF, `width`/`height` espliciti. Tutto il resto: `loading="lazy" decoding="async"`.
- Preconnect solo verso ciò che serve davvero al primo render.

### 3.3 INP: le cinque regole

1. **Mai `getBoundingClientRect()`, `offsetTop`, `scrollHeight` dentro un listener** di `pointermove`/`scroll`/`resize`. Leggere una volta, cachare, invalidare su resize e su `ScrollTrigger.refresh()`. Il layout thrashing è la causa numero uno di INP catastrofico sui siti animati.
2. **`gsap.quickTo` / `gsap.quickSetter`** nei loop di puntatore, mai `gsap.to`.
3. **Spezzare l'init.** Qualsiasi blocco di inizializzazione oltre 50ms va frammentato con `await scheduler.yield()` (dove disponibile) o `requestIdleCallback` per tutto ciò che non è visibile.
4. **`{ passive: true }`** su tutti i listener di `scroll`, `touchstart`, `wheel`, `pointermove` che non chiamano `preventDefault()`.
5. **Terze parti.** Ogni pixel di tracking, ogni tag manager, ogni chat widget è INP. Caricarli dopo l'interazione o dopo `load`, e valutare Partytown per spostarli in un web worker. Su un sito di direct-response marketing questa è la voce più pesante e la più politicamente difficile da tagliare: portatela come dato, non come opinione.

### 3.4 CLS: zero, non "basso"

- `aspect-ratio` su **ogni** media.
- `min-height` su ogni sezione che si popola in JS.
- `font-variant-numeric: tabular-nums` + `min-inline-size` in `ch` su ogni counter.
- `pinSpacing: true` (default) su ogni pin — disattivarlo è il modo più rapido di produrre CLS.
- `invalidateOnRefresh: true` su ogni ScrollTrigger con valori funzione.
- **`document.fonts.ready.then(() => ScrollTrigger.refresh())`** — senza questo, tutti gli `start`/`end` sono calcolati sui line-break del font di fallback.
- Nav sticky con altezza riservata, mai un `position: fixed` che compare.

### 3.5 Lazy-init delle animazioni

Un solo pattern, applicato a tutto:

```js
const io = new IntersectionObserver(async (entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    io.unobserve(e.target);
    const { init } = await import(`./scenes/${e.target.dataset.scene}.js`);
    init(e.target);
  }
}, { rootMargin: "300px 0px" });          // pre-carica poco prima che serva

document.querySelectorAll("[data-scene]").forEach(el => io.observe(el));
```

Ogni scena è un chunk. Il codice della scena "metodo 4-in-1" non esiste nel bundle iniziale. E in pausa quando non è visibile:

```js
const pause = new IntersectionObserver(([e]) => e.isIntersecting ? tl.play() : tl.pause());
document.addEventListener("visibilitychange", () =>
  document.hidden ? gsap.globalTimeline.pause() : gsap.globalTimeline.resume());
```

### 3.6 IntersectionObserver vs ScrollTrigger vs CSS scroll-driven — matrice di decisione

| esigenza | strumento corretto | perché |
|---|---|---|
| "entra in viewport → play una volta" | **CSS `animation-timeline: view()`** o **IntersectionObserver + classe** | 0 JS / 5 righe. ScrollTrigger qui è overkill: paghi 11KB e main thread per niente |
| progresso continuo su `transform`/`opacity`, dichiarativo | **CSS `scroll()` / `view()`** | gira sul **compositor thread**: resta fluido anche col main thread bloccato |
| progresso continuo con logica, callback, timeline complessa, `snap` | **ScrollTrigger** | nessun equivalente dichiarativo |
| **pin** con spacing automatico su durata arbitraria | **solo ScrollTrigger** | `position: sticky` non pinna con pin-spacer |
| scroll orizzontale con animazioni annidate | **ScrollTrigger + `containerAnimation`** | API dedicata |
| lazy-loading di moduli e media | **IntersectionObserver** | è il suo lavoro |

Due precisazioni tecniche che risolvono le discussioni ricorrenti:

- **IntersectionObserver non serve per lo scrub.** È asincrono e `intersectionRatio` è campionato (dipende dai `threshold` dichiarati), non continuo. Usarlo per il progresso produce animazioni a scatti.
- **ScrollTrigger non osserva gli elementi.** Precalcola start/end sul flusso del documento e aggiorna in `requestAnimationFrame` — quindi 60 ScrollTrigger costano poco, ma 60 `pin` costano molto (60 pin-spacer + 60 ricalcoli a ogni `refresh()`).

**Regola operativa: 70% CSS, 20% ScrollTrigger su 2-3 scene forti, 10% o 0% WebGL.**

### 3.7 GPU layers, contenimento, e i costi nascosti

- Animare **solo** `transform` / `translate` / `scale` / `rotate` / `opacity`. Mai `top`, `left`, `width`, `height`, `margin` (layout). Attenzione anche a `box-shadow` e `border-radius` animati (paint costoso).
- **`will-change` è un prestito, non un regalo.** Aggiungerlo su `pointerenter` / `onStart` e **rimuoverlo su `onComplete`**. Un `will-change: transform` permanente su 40 card = 40 texture in VRAM; su mobile porta a ricariche del tab per pressione di memoria. Tetto pratico: ~10 layer promossi contemporaneamente, nessuno più grande dello schermo. Nota: per le scroll-driven animations native il browser promuove da sé — **non anticipare con `will-change`**.
- **`contain: layout paint`** sulle sezioni indipendenti.
- **`content-visibility: auto` + `contain-intrinsic-size: auto 800px`** sulle sezioni sotto la piega: su pagine da 4000px (la vostra) e 8000px (Sharpify) taglia drasticamente il costo di layout e paint. Due avvertenze: la `contain-intrinsic-size` deve essere realistica o si genera CLS, e **va esclusa dalle sezioni pinnate**, perché altera i calcoli di start/end di ScrollTrigger.
- **Il blur è il costo GPU più alto del web.** `filter: blur()` e `backdrop-filter` su aree grandi vanno evitati in animazione. I glow radiali (le stat-card di Sharpify) si fanno con `radial-gradient` — dipinto una volta — o con un asset pre-sfocato.
- **Verifica, non fede.** DevTools → Rendering → *Paint flashing*, *Layer borders*, *Frame rendering stats*; Performance panel con CPU 4× throttle; `chrome://tracing` per i casi patologici.

### 3.8 Riduzione su mobile

Il meccanismo giusto è `gsap.matchMedia()`, che **crea e distrugge** le scene ai breakpoint invece di lasciarle inerti a consumare memoria:

```js
const mm = gsap.matchMedia();

mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
  const pin = buildPinnedScene();          // pin, orizzontale, magnetic, eventuale WebGL
  return () => pin.kill();                 // cleanup automatico all'uscita dal match
});

mm.add("(max-width: 1023px)", () => {
  const light = buildRevealsOnly();        // solo reveal + marquee rallentato
  return () => light.kill();
});
```

Su mobile: **zero pin, zero scroll orizzontale, zero cursore, zero WebGL**, marquee a velocità ridotta, durate × 0,7, `dpr` limitato a 1,5.

**Misurare sul campo, non in laboratorio.** Il pacchetto `web-vitals` (v4+) con `onLCP`, `onINP`, `onCLS` inviati a un endpoint o a GA4. I punteggi Lighthouse **non catturano l'INP** (che dipende da interazioni reali) e non catturano il device reale. Test obbligatori su hardware fisico: un Android di fascia media (Moto G Power o simile) e un iPhone SE, con throttling 4G.

---

## 4. `prefers-reduced-motion` fatto bene, non come alibi

### Il principio

`reduce` **non significa "spegni tutto"**. Significa: elimina il movimento vestibolare — parallasse, scale grandi, spostamenti superiori a ~20% del viewport, rotazioni, auto-play continuo, scroll-jacking — e **conserva il feedback**: dissolvenze, cambi di colore, cambi di bordo, durate 100-200ms. Una modale che dissolve invece di volare dal basso comunica lo stesso cambio di stato senza innescare nausea.

### L'anti-pattern da non usare

```css
/* SBAGLIATO */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

Rompe accordion e dropdown che dipendono dalle transizioni per essere usabili, e — problema più grave — **fa scomparire per sempre** ogni elemento con `animation-fill-mode: both` che parte da `opacity: 0`: il contenuto diventa irraggiungibile. Se proprio si vuole una rete di sicurezza globale, la forma corretta usa durate minime, non `none`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
```

### L'architettura corretta: token, non interruttori

```css
:root {
  --dur-xs: 120ms; --dur-s: 200ms; --dur-m: 420ms; --dur-l: 900ms;
  --travel: 24px;
  --parallax: 1;
  --marquee-state: running;
}
@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-xs: 1ms; --dur-s: 100ms; --dur-m: 140ms; --dur-l: 180ms;
    --travel: 0px;                /* il movimento va a zero, il fade resta */
    --parallax: 0;
    --marquee-state: paused;
  }
}
```

Ogni componente continua a funzionare: il travel diventa 0, la dissolvenza sopravvive, gli stati sono raggiungibili. Questa è la differenza tra accessibilità progettata e accessibilità aggiunta.

### Lato JavaScript

```js
const mm = gsap.matchMedia();
mm.add("(prefers-reduced-motion: no-preference)", () => { /* versione completa */ });
mm.add("(prefers-reduced-motion: reduce)",        () => { /* versione ridotta  */ });
```

`gsap.matchMedia()` crea internamente un `gsap.context()` e gestisce il teardown quando la media query cambia a runtime (l'utente può cambiare l'impostazione di sistema con la pagina aperta): è il posto corretto per la variante, e rende superfluo gestire `context()` a mano.

### Cosa fare, pattern per pattern

| pattern | comportamento con `reduce` |
|---|---|
| pin + scrub | niente pin, niente scroll-jacking: reveal a fade una volta, `toggleActions: "play none none none"` |
| SplitText | **non splittare affatto** — elimina anche il rischio a11y sugli screen reader |
| marquee | `animation-play-state: paused` + `overflow-x: auto` sul contenitore, così l'informazione resta scorrevole a mano |
| counter | mostrare subito il valore finale |
| magnetic hover | disattivato, resta il cambio di stato su `:hover`/`:focus-visible` |
| cursore custom | disattivato, cursore di sistema ripristinato |
| View Transitions | `@view-transition { navigation: none }` oppure `::view-transition-group(*) { animation-duration: 1ms }` |
| WebGL / shader | **non importare il modulo**; sostituire con il gradiente statico |
| Lenis | `lenis.destroy()` |

### Il quadro normativo (utile in fase di vendita)

- **WCAG 2.2 SC 2.2.2 — Pause, Stop, Hide — livello A, obbligatorio.** Qualsiasi movimento automatico oltre 5 secondi deve poter essere fermato. Il vostro marquee ricade esattamente qui: serve pausa su hover **e** focus, e il rispetto di `prefers-reduced-motion` (tecnica W3C **C39**) è la via riconosciuta.
- **SC 2.3.3 — Animation from Interactions — livello AAA.** È la ragione per cui `prefers-reduced-motion` esiste: ridurre o sostituire il movimento non essenziale attivato dalle azioni utente.
- **SC 2.3.1 — Three Flashes — livello A.** Nessun flash oltre 3 al secondo (rilevante se si usa il `pulse` sulla barra annuncio).
- **European Accessibility Act, applicabile dal 28 giugno 2025.** Per un'agenzia che vende a aziende, l'accessibilità è diventata argomento commerciale e requisito di gara, non solo etica.

Segnali adiacenti da rispettare gratis: `prefers-reduced-transparency`, `prefers-contrast`, `(update: slow)`, `Save-Data`.

### Test

DevTools → Rendering → *Emulate CSS prefers-reduced-motion*; macOS Accessibilità → Riduci movimento; Windows → Effetti visivi → animazioni off. Poi: navigazione da **sola tastiera** (il focus deve restare visibile e nel viewport durante ogni scena pinnata) e un passaggio con VoiceOver/NVDA su un `<h1>` splittato (verificare che `aria: "auto"` produca un `aria-label` leggibile e non 47 caratteri letti uno per uno).

### Il punto onesto da dire al cliente

Reduced-motion non è un alibi per fare meno: è **il livello base, che deve comunque essere bello**. Test decisivo: uno screenshot statico di ogni sezione deve funzionare come manifesto. Se la pagina senza motion è brutta, il motion sta coprendo un problema di design, non aggiungendo valore — e state pagando animazioni per nascondere una gerarchia debole. È esattamente il caso del sito attuale: 110 section Elementor non diventano un buon sito aggiungendo GSAP.

---

## 5. Tre percorsi di implementazione, confrontati

### Quadro sinottico

| | **(a) WordPress + Elementor + GSAP** | **(b) Astro statico (o HTML/CSS/JS) + GSAP** | **(c) Next.js + GSAP** |
|---|---|---|---|
| Tetto di qualità | **~7 / 10** | **9,5 / 10** | **9,5 / 10** |
| LCP mobile realistico | 2,2 – 2,8s ottimizzato | **1,2 – 1,8s** | 1,6 – 2,2s |
| JS di base | jQuery + Elementor + GSAP | **~41KB gz (solo GSAP)** | ~90KB gz React/hydration + GSAP |
| Nodi DOM | 2500 – 4000 | **800 – 1400** | 900 – 1500 |
| Controllo del markup | nessuno | **totale** | totale |
| Chi mantiene | cliente (contenuti) + dev (motion) | dev + cliente via CMS | dev + cliente via CMS |
| Tempo di sviluppo | **3 – 5 settimane** | 6 – 10 settimane | 8 – 12 settimane |
| Costo ricorrente | hosting esistente + Elementor Pro | 0 – 20€/mese + CMS | 20$/utente/mese Vercel + CMS |
| Rischio principale | update Elementor rompono le scene | migrazione SEO e form | complessità inutile |

### (a) Restare su WordPress + Elementor con codice custom e GSAP

**Tetto realistico: circa 7/10.** Si vince un CSSDA Website of the Day, non un Awwwards Site of the Day. E va detto con onestà: **sharpify.io è esattamente questo** — Elementor 4.0.7 + GSAP 3.12.5 — e prova che si può *sembrare* premium. Ma si paga in DOM (2077 nodi), CSS globale del builder, jQuery, e un LCP mobile che difficilmente scende sotto 2,2-2,8s senza lavoro chirurgico. I dati di settore parlano di LCP mediano mobile 3,8-5,2s pre-ottimizzazione, portabile a 2,0-2,8s con critical CSS, JS differito e DOM ridotto: un miglioramento del 50-70% dell'impatto, non la sua eliminazione.

**Come si fa nel modo meno peggiore.** Child theme. Elementor → Settings → Features: attivare *Optimized DOM Output*, *Improved Asset Loading*, *Improved CSS Loading*, *Inline Font Icons*; disattivare Font Awesome ed eicons; `wp_dequeue_style()` su tutto il superfluo; disabilitare emoji, `wp-embed`, e il CSS dei blocchi Gutenberg. **Zero animazioni native Elementor** (le *Entrance Animations* sono jQuery e mediocri): tutto il motion in un unico `main.js` registrato con `wp_enqueue_script(..., ['strategy' => 'defer'])` (WP 6.3+), GSAP servito **da locale** e non da CDN. Gli hook per le scene si dichiarano come **attributi custom sui container Elementor** (`data-scene="metodo"`, `data-split="lines"`), non come selettori sulle classi generate — così l'editor resta usabile e le scene sopravvivono a una modifica di layout. Font self-hosted con `wp_preload_resources()`. Cache: LiteSpeed o WP Rocket + Cloudflare, con **Rocket Loader disattivato** (rompe GSAP), critical CSS generato.

**Chi lo mantiene.** Il cliente per i contenuti, e questo è il vantaggio reale. Ma **ogni volta che il cliente tocca il layout può rompere le scene**. Serve un accordo operativo: le sezioni animate sono template bloccati, i ruoli editor sono limitati, e c'è una checklist di regressione dopo ogni update di Elementor (il passaggio 3.x → 4.x ha già cambiato il DOM una volta).

**Cosa si perde.** Il tetto di performance con contenuto reale; la semantica e l'accessibilità (ostaggio del builder); le page transition; il code splitting per scena; il controllo dei font; e — il punto che conta per un'agenzia B2B — **la sensazione che il sito sia costruito e non assemblato**, che è precisamente il segnale che un compratore percepisce senza saperlo nominare. Vendete "reparto vendita organizzato": un sito che sembra un template comunica il contrario.

**Quando sceglierlo comunque:** budget sotto i 15k, urgenza sotto le 5 settimane, o nessuna disponibilità a cambiare processo di aggiornamento.

### (b) Sito statico custom — Astro (raccomandato)

**Tetto: 9,5/10.** È dove vive la gran parte dei siti d'agenzia premiati.

**Perché Astro e non HTML puro.** `output: 'static'`, **zero JavaScript di framework per default**, islands (`client:visible`, `client:idle`) solo dove serve interattività, `astro:transitions` che incapsula la View Transitions API, `astro:assets` con AVIF/WebP responsive automatici, Vite per il code splitting delle scene. E soprattutto le **content collections con schema Zod**: i 30 ritratti clienti, le testimonianze nominali (Cianflone, Petrazzuolo, Straniero, Mabiglia, Scuderi), i case study e i KPI diventano contenuto tipizzato — **la build fallisce se manca un campo**, invece di pubblicare una card rotta. L'output è HTML statico su CDN: TTFB 30-80ms su Cloudflare Pages o Netlify. I dati di settore parlano di 40-90% di JavaScript in meno rispetto a un framework React.

Il caso è particolarmente favorevole perché **il vostro sito è essenzialmente un long-form più due pagine più un quiz**. Non c'è complessità applicativa che giustifichi altro.

**Chi lo mantiene.** Uno sviluppatore per il codice; il cliente per i contenuti via CMS (§ 5b). Il costo di manutenzione è **strutturalmente più basso** di (a), perché non ci sono plugin che si aggiornano da soli e rompono.

**Costo.** 6-10 settimane con il design. Hosting 0-20€/mese.

**Cosa si perde.** Il "faccio da solo" su strutture *nuove*: un tipo di sezione mai visto richiede uno sviluppatore, non 20 minuti in Elementor. Perdete l'ecosistema di plugin: il form va su un endpoint serverless + Resend/Brevo (o Formspree), il **quiz va riscritto** (e sarà migliore), il banner GDPR va integrato. E va gestita la **migrazione SEO**: mappa di redirect 1:1 per `/`, `/quiz/`, `/team-2/` e ogni URL indicizzato, sitemap, dati strutturati, e monitoraggio Search Console per 60 giorni.

### (c) Next.js

**Tetto: 9,5/10 — identico a (b).** Questo è il punto che va detto chiaramente: **non esiste nessuna animazione che Next.js possa fare e Astro no.** GSAP, ScrollTrigger, SplitText, WebGL, View Transitions funzionano in entrambi.

**Quando ha senso davvero.** Area riservata clienti; un configuratore; una dashboard; un **quiz con logica ramificata, persistenza e scoring server-side** (questo è un argomento reale, dato che il quiz è già un vostro asset di lead generation); personalizzazione o **A/B test server-side** — cosa non banale per un'agenzia di marketing a risposta diretta che vive di test; oppure un team futuro che è React.

**Il costo nascosto.** L'App Router: React Server Components + `"use client"` + `useEffect`, e Strict Mode che monta due volte in dev. Le scene GSAP vanno registrate in `useGSAP()` di `@gsap/react` — che è un rimpiazzo di `useLayoutEffect` con cleanup automatico e SSR-safe — altrimenti si duplicano ScrollTrigger e si ottengono bug intermittenti difficili da diagnosticare. Più: ~90KB gz di React e hydration prima di aver animato qualcosa, che sull'INP mobile è uno svantaggio di partenza.

**Verdetto: non necessario oggi.** Se domani serve l'area riservata, si aggiunge come sottodominio Next e il marketing site resta Astro. È l'architettura che usa la maggior parte delle agenzie serie, ed è anche la più economica da far evolvere.

### (d) Il compromesso: Astro davanti, WordPress headless dietro

Merita di essere sul tavolo perché è la scelta più venduta nel 2026 a clienti che vengono da WordPress. Frontend Astro, contenuti in **wp-admin** via **ACF Pro** (Flexible Content = i vostri blocchi) esposti con **WPGraphQL**. Il cliente resta nell'interfaccia che conosce; voi avete controllo totale del markup.

**L'avvertenza tecnica decisiva:** i contenuti Elementor sono **HTML serializzato dentro il meta `_elementor_data`** — praticamente non riutilizzabili headless. La migrazione richiede di rimodellare tutto in CPT + ACF. Quindi questo percorso **non** risparmia il lavoro di modellazione: risparmia solo il cambio di strumento per il cliente. Valutatelo su questa base, non sul risparmio presunto.

---

## 5b. Se si sceglie il custom: come si consegna comunque l'editabilità

Il principio: **non si consegna "un sito", si consegna un sistema di sezioni.** Il cliente non deve poter cambiare il layout — deve poter cambiare il contenuto dentro layout progettati per resistere.

**1. Modellare per blocchi vincolati, non per pagine.** Ogni sezione diventa un blocco tipizzato con campi limitati:

```
hero            { eyebrow (max 28 char), title (max 60), cta_label (max 24), cta_url }
result_marquee  { items[4..16] { client_logo, value, unit (enum), label (max 32) } }
stat_cards      { items[3..3] { number, unit, label, sublabel } }   // esattamente 3, non 2 né 5
metodo_pin      { steps[4..4] { nome_reparto, claim (max 80), icona (enum) } }
testimonial     { autore, azienda, settore, quote (80..260 char), kpi_before, kpi_after }
```

I vincoli (lunghezze massime, enum, min/max items) **sono il prodotto**. È esattamente ciò che manca in Elementor, dove tutto è possibile e quindi tutto degrada: il vostro sito attuale, con 110 section e testimonianze placeholder identiche, è la prova empirica di questa dinamica.

**2. CMS con visual editing.** Nel 2026 l'editing in-context è lo standard: l'editor vede la pagina reale, clicca su un titolo, lo modifica in place, vede il cambiamento, pubblica.

| CMS | quando scegliermelo | costo | integrazione |
|---|---|---|---|
| **Storyblok** | il migliore per un cliente marketing non tecnico: editor visuale realmente eccellente, blocchi componibili | ~35-90€/mese | `@storyblok/astro` + `storyblokEditable()` |
| **Sanity** | contenuti relazionali (case study ↔ cliente ↔ settore ↔ KPI), Studio personalizzabile, free tier generoso | 0 → a consumo | Presentation tool + `@sanity/visual-editing` (stega) |
| **Payload 3** | solo se si scegliesse Next: self-host, TypeScript, live preview | 0 (self-host) | embedded nell'app |
| **Decap / TinaCMS** | budget zero, contenuti nel repo git | 0 | Tina ha visual editing, Decap no |
| **WordPress headless** | se la familiarità con wp-admin è il vincolo dominante | hosting esistente | ACF Pro + WPGraphQL |

Per salesprocess.it, la mia scelta: **Storyblok** se il cliente vuole autonomia totale e non è tecnico; **Sanity** se contano di più la modellazione dei case study e il costo. Se l'attaccamento a wp-admin è insuperabile: WordPress headless con ACF.

**3. Rebuild automatico.** Webhook CMS → build hook (Cloudflare Pages / Netlify): pubblicazione in 30-90s. Se serve istantaneo: Astro in SSR su Cloudflare Workers con purge per cache-tag → sotto i 3 secondi.

**4. Anteprima e approvazione.** Deploy preview per ogni draft, su URL dedicato. Il cliente approva prima del live. È una cosa che WordPress **non** fa bene e che diventa un argomento di vendita a vostro favore.

**5. Guard-rail tecnici.** Validazione di schema (Zod nelle content collections: la build fallisce, non il sito). Immagini processate in build con `astro:assets` → il cliente **non può** mandare online un JPEG da 8MB. Nessun rich text nei titoli. Nessun HTML arbitrario.

**6. Consegna umana.** Un Loom di 10-15 minuti per ruolo ("come cambio il payoff", "come aggiungo una testimonianza con i suoi KPI", "come pubblico"), un documento di due pagine, 30-60 giorni di supporto incluso. **Questa parte è ciò che determina se dopo sei mesi il cliente è contento o è tornato su Elementor.** Non è un extra: è parte del deliverable.

**7. Cosa NON dare in mano al cliente.** I parametri di motion, i colori, la tipografia, l'ordine delle sezioni, il numero di CTA per pagina. Se glieli date, in tre mesi il sito è di nuovo generico — e sarà colpa vostra per averglielo permesso. Se serve flessibilità, esponetela come **varianti preimpostate** (`variant: "dark" | "light" | "accent"`), non come campi liberi.

---

## 6. Otto siti reali da studiare, e cosa rubare da ognuno

**1. https://basement.studio** — Next.js + GSAP + React Three Fiber.
Da rubare: la gestione del **nero come tela** e non come "dark mode"; il grain/rumore usato come texture di marca (non come effetto); il modo in cui presentano i case study come *prodotti* con numeri in evidenza; la disciplina di un solo accento. Guardate anche come l'intro non costa LCP: il contenuto è già dietro.

**2. https://darkroom.engineering** — gli autori di Lenis.
Da rubare: il **benchmark di "quanto smooth è troppo"** (se mai decidessimo di usarlo, questo è il riferimento); l'uso di tipografia enorme e bordi hairline; e il fatto che ogni scelta sia dimostrativa. Avvertenza: è deliberatamente più artistico di quanto serva a voi — studiate la meccanica, non l'attitudine.

**3. https://clay.global** — agenzia B2B che vende servizi a compratori enterprise: **il vostro stesso problema**, risolto bene (Awwwards, FWA, Webby).
Da rubare: la **struttura commerciale** (posizionamento → prova numerica → servizi → case study → processo → CTA); il motion usato per guidare l'occhio e non per fare spettacolo; e come si gestisce molta prova sociale senza che diventi un elenco. È il riferimento più utile della lista per la conversione, non per l'estetica.

**4. https://linear.app** — non è un'agenzia, ed è la migliore scuola esistente di "superficie scura premium".
Da rubare, letteralmente: il **bianco a scala di opacità** come sistema di colore (0.85 / 0.7 / 0.6 / 0.4 / 0.12 — esattamente ciò che Sharpify ha copiato da qui); i bordi hairline `1px solid rgb(255 255 255 / .08)`; i glow radiali dietro le card; il tracking negativo sui display. E la lezione più importante: **è animato ed è velocissimo**, perché è CSS-first e usa contenimento.

**5. https://www.exoape.com** — studio olandese.
Da rubare: il **mask reveal su immagine + tipografia** fatto meglio di chiunque (il pattern P4 al suo apice); il ritmo tra sezioni piene e vuote; le transizioni di pagina. Rilevante in modo specifico per voi: avete asset fotografici forti — mani con oggetti arancioni su nero, l'evento Sales Process Day con i graffiti "FATTURARE" — che oggi sono usati male. Exo Ape insegna a farli respirare.

**6. https://cuberto.com**
Da rubare: **la meccanica** del magnetic hover, del cursore contestuale, delle micro-interazioni sui bottoni, curate al millimetro. Da rubare **con moderazione**: è anche il sito più imitato del mondo, quindi prendete `quickTo` e l'inerzia, non l'estetica — o si legge immediatamente come derivativo.

**7. https://www.igloo.inc** — Awwwards Site of the Year 2024.
Da guardare come **limite superiore e controesempio**: mostra il tetto di ciò che WebGL può fare in una narrazione scrollata, e serve a capire **dove fermarsi**. Quel livello di peso non è compatibile con una landing che deve convertire imprenditori su 4G. Utile in riunione, quando qualcuno chiede "possiamo fare come quello lì".

**8. https://www.attio.com** (alternativa: https://ramp.com) — B2B SaaS con motion sobrio ma costoso.
Da rubare: **come si animano i dati**. Numeri, tabelle, pipeline, dashboard che sembrano vive. È la risposta diretta al vostro problema più difficile: rendere visivo il "Metodo 4-in-1" e i "4 reparti costantemente allineati", che oggi sono solo testo su una section Elementor. Un reparto che si allinea agli altri è animabile; un bullet point non lo è.

**Dove continuare a guardare, non i singoli siti:** `awwwards.com/websites/design-agencies/`, `godly.website`, `refs.gallery`, `hoverstat.es`, `land-book.com`. E per l'analisi competitiva tecnica: WebPageTest e HTTP Archive per confrontare i vostri numeri reali con quelli di sharpify.io — sono dati pubblici e sono un ottimo argomento in fase di approvazione del budget.

---

## Nota finale sulla direzione, non sull'esecuzione

Il cliente ha indicato Sharpify come riferimento. Il rischio del brief è consegnare un clone riconoscibile — l'eyebrow tra parentesi quadre `[ SEZIONE ]`, il verde `#3DDC84`, DM Sans, la nomenclatura marchiata con il trademark. **Va rubato il livello, non la pelle.**

Cosa prendere: la superficie scurissima, il bianco a scala di opacità, i bordi hairline, il tracking negativo sul display e positivo sulle eyebrow, un solo accento, la densità informativa alta su superfici sobrie, i CTA sempre pill, una sola sezione chiara per creare respiro, i numeri enormi con l'unità separata.

Cosa reinterpretare con materiale che è già vostro:
- L'eyebrow di sezione non sono le parentesi quadre, ma **il mark a scalinata** (quattro-cinque quadrati arancioni in salita diagonale — che è un asset di motion già pronto: si costruisce blocco per blocco, `stagger: 0.06`, `ease: "expo.out"`, `transform-origin: bottom`, ed è l'unica animazione di logo che vale la pena fare), o un indice numerico `01 —`.
- L'accento è `#FF8200`, uno solo. Fuori `#CC3366`, fuori tutti i gradienti arancio↔bianco.
- Il fondo è `#0C0D0E`, che è già nella vostra palette e va preferito al nero puro (su OLED il `#000` fa collassare i bordi e appiattisce la profondità).
- La tipografia è **Red Hat Display**, che è già di marca, è geometrica e regge bene il tracking negativo. Va usata a due estremi: display 64-120px / weight 700-800 / `letter-spacing: -0.04em`, ed eyebrow 11px / 700 / `+0.12em` / uppercase. **Fuori Nunito, Montserrat, Roboto e Roboto Slab**: quattro famiglie inutili sono quattro richieste di rete e zero identità.
- `FATTURARE, FATTURARE, FATTURARE` è la cosa migliore che avete e oggi è una riga di testo arancione. È un marquee nato, ed è ciò che la gente ricorderà.

E la lacuna strutturale da colmare prima di tutto: **il sito non ha una navigazione vera** (hamburger più un CTA). Sharpify ha barra annuncio, nav sticky con logo, tre voci, switch lingua, Log In e pill CTA. Non è un dettaglio estetico: è il motivo per cui una pagina da 4363px con un solo punto di ingresso converte meno di quanto potrebbe.

---

### Fonti

- [CSS scroll-driven animations — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations)
- [Scroll-Driven Animations e View Transitions: CSS nativo — Mintec](https://mintec.co/blog/scroll-driven-view-transitions-css-2026/)
- [Native CSS Scroll-Driven Animations in 2026 — Mintec](https://mintec.co/blog/css-scroll-driven-animacion/)
- [The Complete Browser Rendering Guide for 2026 — Abdallah Zakzouk](https://abdallahzakzouk.com/blog/browser-rendering-performance-guide)
- [Webflow makes GSAP 100% free — Webflow Blog](https://webflow.com/blog/gsap-becomes-free)
- [GSAP 3.13 release notes](https://gsap.com/blog/3-13/)
- [GSAP SplitText — docs](https://gsap.com/docs/v3/Plugins/SplitText/)
- [GSAP ScrollTrigger — docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [gsap.matchMedia() — docs](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)
- [GSAP ScrambleTextPlugin — docs](https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/)
- [@gsap/react — useGSAP()](https://github.com/greensock/react)
- [Lenis — repo ufficiale](https://github.com/darkroomengineering/lenis)
- [Lenis — Thoughtworks Technology Radar](https://www.thoughtworks.com/radar/languages-and-frameworks/lenis)
- [Why Lenis broke my scroll-snap](https://raoulcoutard.com/posts/2026-02-03-lenis-scrollsnap-conflict-en/)
- [The Impact of Smooth Scrolling on Accessibility — The Admin Bar](https://theadminbar.com/accessibility-weekly/watch-out-for-smooth-scroll/)
- [Cross-Document View Transitions: The Gotchas Nobody Mentions — CSS-Tricks](https://css-tricks.com/cross-document-view-transitions-part-1/)
- [The View Transitions API in 2026 — Brainstorms and Raves](https://brainstormsandraves.com/css/view-transitions-2026/)
- [What Are the Core Web Vitals? LCP, INP & CLS (2026)](https://www.corewebvitals.io/core-web-vitals)
- [Core Web Vitals for WordPress: Optimization Guide (2026)](https://www.corewebvitals.io/core-web-vitals/wordpress-guide)
- [Elementor Performance: 15 Tips (2026)](https://plugintheme.net/blog/elementor-performance-optimization)
- [prefers-reduced-motion — MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
- [W3C WCAG Technique C39 — prefers-reduced-motion](https://www.w3.org/WAI/WCAG21/Techniques/css/C39)
- [Design accessible animation and movement — Pope Tech](https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/)
- [prefers-reduced-motion, explained (and how to test it) — MotionSpec](https://motionspec.dev/blog/prefers-reduced-motion)
- [Astro vs Next.js for Marketing Websites — Agnite](https://agnitestudio.com/blog/astro-vs-nextjs/)
- [Astro vs Next.js in 2026 — Cosmic](https://www.cosmicjs.com/blog/nextjs-vs-astro-choosing-the-right-framework-for-your-project)
- [Visual editing headless CMS in 2026: the state of the art — Bedrock Labs](https://bedrocklabs.co/blog/visual-editing-headless-cms-2026-state-of-the-art)
- [Best Headless CMS 2026 — Sanity vs Contentful vs Storyblok](https://www.luckymedia.dev/insights/headless-cms)
- [GSAP vs Motion — confronto ufficiale](https://motion.dev/docs/gsap-vs-motion)
- [Awwwards — Best Web Agencies Websites](https://www.awwwards.com/websites/design-agencies/)
- [Top 15 best agency websites 2026 — Refs.Gallery](https://refs.gallery/margins/best-agency-websites-2026)
- [From SplitText to MorphSVG: 5 demos con i plugin GSAP gratuiti — Codrops](https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/)
