# Sharpify.io — Audit completo del vocabolario di movimento (ispezione DOM/CSSOM/GSAP dal vivo)

## Punti chiave

- Il sito ha UN SOLO ScrollTrigger e ZERO pin (pin-spacer: 0) su una pagina di 8.242px. Sopra la piega girano esattamente 3 animazioni CSS. La parsimonia non e' estetica: e' misurabile.
- Il momento-firma e' un char-by-char scrub reveal via SplitType: 43 elementi .char animati in 'color' da rgba(255,255,255,0.12) a bianco pieno, stagger 0.1, durata timeline 4.5s, scrub 0.5, su un range di scroll di 720px esatti (= 80% del viewport). Fronte d'onda largo ~3 caratteri.
- La decisione piu' importante del sito e' un override CSS: .animated { animation-duration: .7s !important; animation-timing-function: cubic-bezier(0.25,0.46,0.45,0.94) !important } — normalizza TUTTE le 26 entrate Elementor a una curva e una durata. Il movimento diventa texture, non collezione di effetti.
- Un solo gesto (rise+fade da 28-40px sull'asse Y), un solo asse, ampiezze di hover max 2-4px, tutto one-shot (unobserve/disconnect: risalendo non si ri-anima nulla). Nessun scale, rotate, tilt o mask reveal su tutta la pagina.
- DIFETTO SFRUTTABILE: nel carousel hero la scala di prossimita' e' invertita. Misurato dal vivo: card a 3px dal centro = scale(0.841), card a 878px = scale(1.06), mentre la centrale riceve z-index 2. La formula 's = 1.06 - 0.22*t' va letta '0.84 + 0.22*t'. Il momento piu' visto del sito ha una valle dove doveva avere un picco.
- Il carousel e' rAF fatto a mano: velocita' frame-based (pos -= 0.5 per frame = 30px/s a 60Hz, 60px/s a 120Hz), nessuna inerzia al rilascio del drag, pausa/ripresa a booleano secco, e layout sincrono forzato ogni frame (legge offsetLeft/offsetWidth dopo aver scritto track.style.transform).
- prefers-reduced-motion e' coperto al 5%: esistono 2 soli blocchi in tutto il sito (marquee loghi + bolla WhatsApp). Scoperti: lo scrub GSAP, le 36 entrate, il rAF del carousel, spinGlow, i due dot pulsanti, il parallasse motion-fx.
- spinGlow (4s linear infinite su 2 elementi) ruota un conic-gradient con 5 stop dello STESSO colore #006633: animazione infinita a resa visiva nulla. Doveva essere il quinto signature moment.
- Ci sono 3 sistemi di reveal paralleli con 3 durate (0.55s / 0.7s / 1.05s) e 3 easing, piu' 4 valori di stagger diversi (100 / 130 / 260ms + ladder Elementor 0-500ms). Zero token di motion: e' assemblato, non progettato.
- 8 widget count-up del tema sono presenti nel DOM (data-counter 1B/400K/52%/800%/350%/$100M+/100K+/27%) e NESSUNO e' innescato in home: i numeroni delle stat card sono testo statico. E' il guadagno piu' grande a costo piu' basso per un sito nuovo.
- Budget reale: 40 will-change permanenti mai rimossi, 34 backdrop-filter attivi, 36 filter, 51 mix-blend-mode, 64 transform, su 2.069 elementi e 17.057 regole CSS. Zero animazioni di proprieta' di layout. Il budget di motion e' disciplinato, quello di asset no (AOS, typed.js, tilt.js, isotope, masonry x2, compare, clb-slider caricati con ZERO target).

---

> Metodo: ispezione diretta di https://www.sharpify.io/ nel browser — enumerazione di `document.styleSheets` (17.057 regole, 37 `@keyframes`), censimento dei `getComputedStyle` su tutti i 2.069 nodi, lettura di `ScrollTrigger.getAll()` e `gsap.globalTimeline.getChildren()`, estrazione dei 43 blocchi `<style>` inline e dei 52 `<script>` inline, campionamento dei colori dei `.char` a 5 valori di progress, e misurazione runtime delle trasformazioni delle card del carousel. Stack confermato: **GSAP 3.12.5 + ScrollTrigger 3.15.0 + SplitType**, su WordPress/Elementor Pro 4.0.7, tema Ohio. Nessun Lenis/Locomotive, `scroll-behavior: auto` — **scroll nativo**.

---

# 1. Inventario esaustivo delle animazioni

## A. Sistema di ingresso — tre implementazioni parallele

### A1. Elementor `fadeInUp` — 26 elementi (il grosso della pagina)
| | |
|---|---|
| Trigger | soglia, one-shot (Elementor rimuove `.elementor-invisible`, aggiunge `.animated`) |
| Proprieta' | `opacity: 0 → 1`, `transform: translate3d(0, 30px, 0) → none` |
| Durata | **0.7s**, forzata |
| Easing | **`cubic-bezier(0.25, 0.46, 0.45, 0.94)`** (easeOutQuad), forzato |
| Stagger | manuale via campo Elementor `animation_delay` |

L'override che regge tutto il sito:
```css
.animated{
  animation-fill-mode: both !important;
  animation-timing-function: cubic-bezier(0.25,0.46,0.45,0.94) !important;
  animation-duration: 0.7s !important;
  backface-visibility: hidden;
}
```
**Ladder di delay reale** (censita sui `data-settings`): `0ms ×1, 100ms ×6, 200ms ×7, 300ms ×6, 400ms ×11, 500ms ×4`, piu' 47 elementi senza delay. Catena massima: **500ms**.

Fix anti-FOUC notevole — sostituiscono `visibility` con `opacity` perche' la rimozione della classe via JS non produca un flash:
```css
.elementor-invisible{ visibility: visible !important; opacity: 0 !important; will-change: opacity, transform; }
```

### A2. `fadeInUpShort` — 8 elementi
`opacity 0→1` + `translate3d(0, 40px, 0) → none`, **0.7s**, `cubic-bezier(0.25,0.46,0.45,0.94)`, `fill: both`, 1 iterazione. Le varianti `fadeInDownShort` / `fadeInLeftShort` / `fadeInRightShort` (tutte ±40px) esistono in CSS e **non sono usate**: conferma della disciplina mono-asse.

### A3. `doe-visible` — reveal a transizione con IntersectionObserver scritto a mano
Sostituiscono il keyframe Elementor con una transizione, per poter controllare lo stagger:
```css
[data-id="7351a34"] > .animated.fadeInUp,
[data-id="a1dd341"] > .animated.fadeInUp{
  animation: none !important; opacity: 0; transform: translateY(28px);
  transition: opacity .55s ease, transform .55s cubic-bezier(.25,.46,.45,.94);
}
```
```js
var obs = new IntersectionObserver(function(entries){
  if(!entries[0].isIntersecting || fired) return;
  fired = true; obs.disconnect();
  items.forEach(function(el,i){ setTimeout(function(){ el.classList.add('doe-visible'); }, i*staggerMs); });
}, { threshold: 0.12 });
setupRow('7351a34', 130);  // riga loghi 1 – 6 item → catena 650ms
setupRow('a1dd341', 130);  // riga loghi 2 – 6 item
setupRow('ace71f8', 100);  // stat card – 5 item → catena 400ms
```
`threshold 0.12`, guardia `fired` + `disconnect()` → **one-shot irreversibile**. Il commento nel codice lo chiama "left→right rise reveal".

### A4. `premium-reveal` — terzo sistema, 2 elementi
```css
.premium-reveal{ opacity:0; transform:translateY(28px);
  transition: opacity 1.05s cubic-bezier(.22,.61,.36,1), transform 1.05s cubic-bezier(.22,.61,.36,1);
  will-change: opacity, transform; }
.premium-reveal.is-visible{ opacity:1; transform:none; }
```
IO con `threshold: 0.18`, `rootMargin: '0px 0px -8% 0px'`, `unobserve`. Target: `#our-services`, `.elementor-element-6690e8f`. Modalita' row-wise su `.elementor-element-cd8243d` con **`ROW_STAGGER = 260ms`**. Include un **failsafe `setTimeout(3000)`** che forza `is-visible` — garanzia che il contenuto non resti mai invisibile se l'osservatore non scatta.

> **Frammentazione:** lo stesso gesto (rise+fade) esiste in 3 durate — **0.55s / 0.7s / 1.05s** — e 2 easing, con 4 valori di stagger (100 / 130 / 260ms + la ladder 0–500ms).

---

## B. Il momento-firma: char-by-char scrub color reveal

```js
gsap.registerPlugin(ScrollTrigger);
const split = new SplitType(".cool-split h2", { types: "words, chars" });
const tl = gsap.timeline({ scrollTrigger:{
  trigger: ".about", start: "top 80%", end: "+=80%", scrub: 0.5, refreshPriority: -1
}});
tl.to(split.chars, { duration: 0.3, color: "white", stagger: 0.1 }, 0);
tl.to(split.chars.filter(c => c.closest('.sin-tekst')),
      { duration: 0.3, color: "#006633", stagger: 0.1 }, 0);
```

| Parametro | Valore misurato |
|---|---|
| Testo | "We build, run and manage marketing & sales systems." |
| Struttura | SplitType genera wrapper `.word` (evita break a metà parola) + **43 `.char`** con `display: inline-block` |
| Range di scroll | **start 415px → end 1135px = 720px esatti** (= 80% di vh 900) |
| Densita' | **~16,7px di scroll per carattere** |
| Durata timeline | **4,5s** (43 × 0,1 stagger + 0,3 per-char) |
| Proprieta' animata | **solo `color`** |
| Rampa colore | `rgba(255,255,255,0.12)` (ereditato dal contenitore) → `rgb(255,255,255)` |
| Easing | default GSAP = **power1.out** |
| Scrub | **0.5** (lerp di 0,5s: il testo "rincorre" lo scroll) |
| Tipografia target | 56px / 700 / `letter-spacing: -2.24px` (−0,04em) / `line-height: 67.2px` |

Rampa verificata campionando i char 0/8/16/24/32/42 a progress 0 → 1: a p=0.25 i primi due char sono bianchi e il resto a 0.12; a p=0.75 il char 32 e' a `rgba(255,255,255,0.847)`. **Fronte d'onda largo ~3 caratteri** (per-char 0,3s = 6,7% della timeline, stagger 0,1 = 2,2%).

**Codice morto:** la seconda passata (verde `#006633` sui char dentro `.sin-tekst`) ha **0 target** su questa pagina — `.sin-tekst` non esiste. Il commento nel sorgente dice "purple", il valore e' verde: residuo di template. Il reveal bicolore che sarebbe stato il vero colpo di teatro **non e' attivo**.

---

## C. Marquee — tre meccaniche distinte

### C1. `.sf-marquee__row` — loghi "AS FEATURED IN" (fascia crema `#f4f2ec`)
```css
.sf-marquee__row{ display:flex; width:max-content; animation: sf-logos-slide 46s linear infinite; }
@keyframes sf-logos-slide{ from{transform:translateX(0)} to{transform:translateX(-50%)} }
.sf-marquee:hover .sf-marquee__row{ animation-play-state: paused; }
.sf-marquee__row img{ height:30px; padding:0 55px; filter:grayscale(100%); opacity:.85;
  mix-blend-mode:multiply; transition: opacity .2s, filter .2s; }
@media (prefers-reduced-motion: reduce){
  .sf-marquee__row{ animation:none } .sf-marquee{ overflow-x:auto }
}
```
18 figli (contenuto duplicato lato server), `scrollWidth 1980px` → **≈43 px/s**. Override a breakpoint: `animation-duration: 34s`. Il degrado reduced-motion a scroll manuale e' la soluzione corretta.

### C2. `.sa-carousel-track` — sezione About
`animation: sa-scroll 36s linear infinite`, identico `translateX(0 → -50%)`, `width:max-content`, `gap:12px`, pausa su hover. **Nessuna copertura reduced-motion.**

### C3. `.doe-simple-slider` — il nastro delle result card sotto l'hero (rAF scritto a mano, ~4,2KB)
- **Loop infinito per clonazione:** `originals.forEach(node => track.appendChild(node.cloneNode(true)))` → 7 originali diventano **14 card**, `track.scrollWidth = 4064px`, wrap su `scrollWidth/2`.
- **Auto-scroll:** `pos -= speed` con `speed = 0.5` **per frame** → 30 px/s a 60Hz, **60 px/s a 120Hz, 90 a 144Hz**. Non delta-time.
- **`render()` per frame:** `track.style.transform = translate3d(pos,0,0)` + per **ogni** card `transform: scale(s) translateZ(0)` e `zIndex`.
- **Scala di prossimita' al centro:**
```js
const cx = card.offsetLeft + card.offsetWidth/2 + pos;
const t  = Math.max(0, 1 - Math.abs(cx - vpCx)/(vpW*0.45));
const s  = vpW <= 768 ? (1.03 - 0.10*t) : (1.06 - 0.22*t);
card.style.zIndex = t > 0.65 ? '2' : '1';
```
  **Misurato dal vivo (vp 1440px):** card a **3px** dal centro → `scale(0.841)`; card a **288px** → `scale(0.94)`; a **878px** → `scale(1.06)`. La card centrale e' **il 16% piu' piccola** delle laterali, e riceve `z-index: 2`. La logica dello z-index dimostra che l'intento era l'opposto: **la formula e' invertita** (dovrebbe essere `0.84 + 0.22*t`).
- **Drag:** `pointerdown/move/up` + `setPointerCapture`, soglia `DRAG_START_PX = 18`, **axis-lock** (`if(Math.abs(dx) < Math.abs(dy)) return` → lo scroll verticale vince), `touchAction` commutato `pan-y ↔ none`, `cursor: grab/grabbing`, `dragstart` preventDefault contro il ghost nativo.
- **Click-guard:** `SUPPRESS_MS = 320` — dopo un drag reale i click sono soppressi in capture phase con `stopImmediatePropagation`.
- **Nessuna inerzia**: al rilascio `paused = false` e riprende istantaneamente a 0,5px/frame. Pausa su `mouseenter` / ripresa su `mouseleave` a **booleano secco**, senza rampa di velocita'.
- `will-change: transform` su track e su ogni card; `-webkit-mask-image: -webkit-radial-gradient(white, black)` per forzare il clipping del `border-radius: 20px`; `transition: transform 0.12s ease` sulle card (in competizione con le scritture per-frame — funziona come smoothing involontario). Resize debounced a **80ms**.

---

## D. Hover e micro-interazioni

### `.glow-btn` (`#magicBtn`, "Book a demo" nell'hero) — cursor-tracked radial glow
```js
btn.addEventListener("mousemove", (e) => {
  const rect = btn.getBoundingClientRect();
  btn.style.setProperty("--x", e.clientX - rect.left + "px");
  btn.style.setProperty("--y", e.clientY - rect.top  + "px");
});
```
```css
.glow-btn{ --x:50%; --y:50%; border-radius:130px; isolation:isolate; transition: transform .25s ease; }
.glow-btn::before{ inset:-4px; mix-blend-mode:screen; z-index:1; opacity:0; transition:opacity .25s ease;
  background:
    radial-gradient(85px 85px at var(--x) var(--y), rgba(255,255,255,.9) 0%, rgba(255,255,255,.3) 45%, transparent 70%),
    radial-gradient(120px 120px at var(--x) var(--y), rgba(0,153,76,.55) 0%, transparent 75%);
  will-change: transform, background; }
.glow-btn::after{ inset:-12px; z-index:0; filter:blur(22px); opacity:0; transition:opacity .25s ease;
  background: radial-gradient(200px 200px at var(--x) var(--y), rgba(0,153,76,.25) 0%, transparent 80%); }
.glow-btn:hover::before, .glow-btn:hover::after{ opacity:1; }
.glow-btn:hover{ transform: translateY(-2px); }
.glow-btn:focus-visible{ outline:3px solid #CEDC00; outline-offset:3px; }
```
Non e' un magnetic hover: il bottone **non si muove verso il cursore**, si *illumina* dove sei. `isolation: isolate` contiene il blend `screen`. Focus ring accessibile presente. Nessun throttle rAF sul `mousemove`, e cio' che cambia e' la *posizione di un radial-gradient* → repaint, non composite (vedi §5).

### Il resto del vocabolario hover
| Selettore | Transizione | Effetto |
|---|---|---|
| `.sf-svc-card` (bento servizi, 12) | `border-color .25s, background .25s, transform .25s` | `translateY(-4px)` + `border-color: rgba(0,153,76,.42)` + gradiente `160deg` da `rgba(255,255,255,.055)` a `rgba(255,255,255,.08)/rgba(0,102,51,.06)` |
| `.sf-svc-cta-btn`, `.sr-event-btn` | `background .2s, transform .2s, box-shadow .2s` | `#006633 → #00813f`, `translateY(-2px)`, `box-shadow: 0 12px 30px rgba(0,102,51,.55)` |
| `.sf-nav a` (nav) | `color .2s, background .2s` | `color:#fff` + `background: rgba(0,102,51,.35)` — **nessun transform, nessun underline animato** |
| `.sf-cta` (pill in header) | `background .2s` | solo `#006633 → #00813f`, **nessun lift** |
| `.sf-social-link` | `border-color .2s, color .2s, background .2s` | cambio di stato piatto |
| `.sf-links a` (footer, 17 nodi) | `color .2s` | solo colore |
| `.sf-wa-btn` (WhatsApp flottante) | `transform, box-shadow` | `translateY(-2px)`, ombra `0 8px 26px → 0 12px 32px rgba(0,0,0,.42)`; con guardia `@media (prefers-reduced-motion:reduce){transition:none}` |
| `.doe-simple-slider__card` | `transform .12s ease` | **nessuna regola `:hover`** — le card sono trascinabili ma non interrogabili |

**Gerarchia di hover a due livelli, deliberata:** in header solo colore; in-page colore + lift di 2–4px. Ampiezza massima su tutto il sito: **4px**.

### Ereditato dal tema Ohio e mai usato in home
`links` (underline wipe: `background-size 100% .2em → 0% → 100%` che esce da un lato e rientra dall'altro), `iconMove` (freccia che esce a `translateX(1.25rem)` e rientra), `click_animation` (ripple `scale(1)→scale(4)`, `opacity .15→0`), `imageScale` (`scale(1)→1.1`), `slide_up_inner` (**mask reveal**: `translateY(100%)→0` dentro `overflow:hidden`), `mdwFadeInUp` (**clip-path polygon reveal** + `translateY(50px)`), `video_sc` (anello `box-shadow 0 → 0.85rem` pulsante sul play), `Blink` (cursore typed.js), 5 spinner `sk-*`, `.card.-img-scale:hover img{transform:scale3d(1.06,1.06,1)}`, `.card.-img-greyscale:not(:hover){filter:grayscale(1)}`.

---

## E. Loop infiniti "ambient"
| Elemento | Animazione | Dettaglio |
|---|---|---|
| `.sf-announce-dot` (barra annuncio) | `sf-ann-pulse 1.6s ease infinite` | `box-shadow: 0 0 0 0 rgba(255,82,82,.7) → 0 0 0 7px rgba(255,82,82,0) → 0`; dot 8px `#ff5252` |
| badge live (sezione Resources) | `sr-pulse 1.6s ease-in-out infinite` | `opacity 1 → .4`, `transform scale(1) → scale(.7)`; dot 7px `#ff4d4d` |
| `.sticky-cta .elementor-button::before` + 1 container | `spinGlow 4s linear infinite` | `rotate(0 → 360deg)` su `conic-gradient(from 0deg, #006633, #006633, #006633, #006633, #006633)` + `filter: blur(8px)`, `inset:-3px`, `border-radius:999px`, `z-index:-1`, `pointer-events:none` |

**I due dot condividono la stessa durata 1,6s** — coerenza di "battito" cardiaco su tutto il sito. Ma **`spinGlow` ruota un gradiente monocromatico**: tutti e 5 gli stop sono `#006633`, quindi la rotazione e' visivamente un no-op. Due layer di composizione + blur mantenuti all'infinito per nessun effetto percepibile.

---

## F. Stato, navigazione, overlay
**Header** — `position: fixed; top: 44px` (sotto la barra annuncio):
```css
.sf-hdr{ transition: background .3s ease, border-color .3s ease, backdrop-filter .3s ease; }
.sf-hdr.sf-scrolled{ background: rgba(8,8,8,0.88);
  backdrop-filter: saturate(180%) blur(20px); border-bottom-color: rgba(255,255,255,0.08); }
```
```js
var f=function(){ h.classList.toggle('sf-scrolled', (window.scrollY||window.pageYOffset) > 30); };
f(); window.addEventListener('scroll', f, { passive:true });
```
Soglia unica a **30px**, listener passivo, nessuna isteresi.

**Sticky CTA** — gate a due condizioni: jQuery `fadeIn(200)/fadeOut(200)` quando `scrollTop > heroBottom`, piu' un IntersectionObserver (`threshold: 0`, `rootMargin: "0px 0px -1px 0px"`) su `#form` che alza un `hideLock` per sopprimerla sopra il form. `pointer-events: none` sul wrapper, `auto` sul bottone.

**Popup** — asimmetria in/out corretta:
```css
#sharpify-popup-overlay.active{ animation: sp-overlay-in 0.28s ease forwards; }
#sharpify-popup-overlay.closing{ animation: sp-overlay-out 0.22s ease forwards; }
#sharpify-popup-overlay.active #sharpify-popup-box{ animation: sp-box-in 0.35s cubic-bezier(0.22,1,0.36,1) forwards; }
@keyframes sp-box-in{ from{opacity:0; transform:scale(.92) translateY(24px)} to{opacity:1; transform:scale(1) translateY(0)} }
@keyframes sp-box-out{ from{opacity:1; transform:scale(1) translateY(0)} to{opacity:0; transform:scale(.94) translateY(16px)} }
```
`cubic-bezier(0.22, 1, 0.36, 1)` = easeOutQuint. **Entrata 0,35s / uscita 0,22s**: l'uscita e' piu' rapida dell'entrata — pratica corretta.

## G. Parallasse (Elementor Motion FX)
`motion_fx_scale_effect: yes`, `motion_fx_scale_speed: 1`, `motion_fx_scale_range: 0% → 50%`, `motion_fx_scale_direction: "in-out"`, attivo su desktop/laptop/tablet/mobile → 1 elemento misurato a `matrix(1.1, 0, 0, 1.1, 0, 0)`. Piu' `background_motion_fx_motion_fx_scrolling: yes` su una sezione. In totale 4 nodi `.elementor-motion-effects-element`, 3 dei quali a `transform: none`. E' l'unico scroll-linked oltre allo scrub.

## H. Lottie
1 widget `elementor-widget-lottie` presente, `lottie.min.js` caricato. Marginale.

---

# 2. La gerarchia del motion

**Livello 0 — non si muove mai (la spina dorsale).** La tipografia display, i numeroni, gli eyebrow `[ SEZIONE ]`, la griglia, i bordi hairline, i loghi. Nessun titolo che vola, nessuna rotazione, nessuna scala su testo. **`pin-spacer: 0`, `ScrollTrigger.getAll().length === 1`** su una pagina di 8.242px: zero pinning, zero scroll orizzontale forzato, zero card che si impilano.

**Livello 1 — micro-stato (0,18–0,25s).** `color`, `background`, `border-color`. E' la maggioranza netta delle 34 firme di transizione distinte censite. Non produce *movimento*, produce *risposta*.

**Livello 2 — lift tattile (0,2–0,25s).** `translateY(-2px)` sui bottoni, `translateY(-4px)` sulle card, sempre accoppiato a un cambio di bordo o ombra. Ampiezza massima 4px. Zero scale su hover di card, zero tilt 3D (`jquery.tilt.min.js` e' caricato e ha 0 target).

**Livello 3 — ingresso (0,55–1,05s, one-shot).** Rise+fade di 28–40px. Un solo gesto ripetuto 36 volte. Sempre irreversibile (`disconnect()` / `unobserve`): risalendo la pagina **non si ri-anima niente** — niente effetto flipbook.

**Livello 4 — ambient loop (1,6s / 4s / 36–46s).** Due dot pulsanti e due marquee CSS. Sempre in periferia (barra annuncio, badge live, fascia loghi), **mai dentro un blocco di lettura**.

**Livello 5 — l'unica cosa scrubbata.** 720px di scroll, 43 caratteri, una headline in tutta la pagina.

### Perche' questa parsimonia legge "premium" e non "carnevale" — sei meccanismi

1. **Un solo easing, una sola durata, imposti con `!important`.** L'override su `.animated` e' la decisione piu' importante del sito: normalizza *tutte* le entrate Elementor a `cubic-bezier(0.25,0.46,0.45,0.94)` e 0,7s. Il movimento diventa una **texture riconoscibile** invece di una collezione di effetti scelti widget per widget. E' precisamente cio' che manca a un sito Elementor generico, dove ogni sezione ha l'animazione che aveva sotto mano chi l'ha costruita.
2. **Un solo asse.** Tutto entra da sotto. Le varianti Left/Right/Down sono in CSS e non vengono usate. Direzione unica = il cervello smette di tracciare il movimento dopo la seconda sezione e torna a leggere.
3. **Ampiezze sotto la soglia di distrazione.** 28–40px in ingresso, 2–4px in hover. Il movimento **si sente ma non si guarda**.
4. **Il motion e' periferico, il contenuto e' fermo.** L'occhio legge numeri e claim su superfici immobili; il movimento vive sui bordi. Su fondo `#161519` con bordi a `rgba(255,255,255,0.12)` un movimento anche minimo e' molto leggibile: potendo permettersi poco, basta poco.
5. **Un solo picco.** Un unico scrub in 8.242px di pagina. Un evento speciale resta speciale perche' **non ha concorrenti**: il resto della pagina "non si muove tanto" proprio per pagare quel momento. E' un budget di attenzione, non un budget tecnico.
6. **Irreversibilita' sistematica.** Nessun reverse allo scroll indietro elimina la sensazione-giocattolo che affligge i siti costruiti con AOS o con i toggleActions di default di ScrollTrigger.

---

# 3. I quattro signature moments

### 1. Char-scrub sull'headline di posizionamento
"We build, run and manage marketing & sales systems." — 43 caratteri da `rgba(255,255,255,0.12)` a bianco pieno su 720px di scroll, `scrub: 0.5`. Funziona per tre ragioni tecniche precise:
- il testo e' **gia' leggibile al 12%**, quindi non c'e' penalita' di comprensione: l'animazione aggiunge *enfasi*, non *informazione*;
- `scrub: 0.5` lega la rivelazione al polso dell'utente — **e' lui che scrive la frase**, e il lerp di mezzo secondo aggiunge un peso quasi fisico;
- il fronte d'onda di ~3 caratteri, su 56px/700 con `letter-spacing: -0.04em`, produce un bordo netto che si legge come un **evidenziatore**.

E' l'unico punto della pagina dove il motion trasporta significato: la frase che *dice chi sono* e' la frase che *si costruisce sotto gli occhi*.

### 2. Il nastro di prova sociale come oggetto fisico
La fascia di result card sotto l'hero: scorre da sola a 30px/s, ma e' **afferrabile** (`cursor: grab`), trascinabile con soglia 18px e axis-lock, e **si ferma quando ci passi sopra**. E' l'unico elemento del sito che risponde al *possesso* e non al passaggio. La pausa su hover e' il dettaglio decisivo: dichiara che quei numeri sono lì per essere letti, non per fare scena. Un loop infinito di risultati dice "non finiscono mai" senza scriverlo.

### 3. Il CTA con la luce che segue il cursore
`#magicBtn` non si muove verso il mouse: resta fermo e si **illumina nel punto dove sei** — core bianco 85px in `mix-blend-mode: screen` piu' alone verde 200px sfocato 22px, entrambi ancorati a `var(--x)/var(--y)`. Il bottone diventa una superficie riflettente. Su un sito nero con un solo accento e' **l'unica occorrenza di luce dinamica** in tutta la pagina: impatto massimo, un solo elemento.

### 4. La transizione di stato dell'header
Da completamente trasparente a `rgba(8,8,8,.88)` + `saturate(180%) blur(20px)` + hairline `rgba(255,255,255,.08)`, in 0,3s, a 30px di scroll. E' **il primo movimento che l'utente causa**, prima di qualunque altro, e comunica "questo e' un'applicazione, non un documento". Il fatto che sopra la piega girino solo 3 animazioni (un dot + due `fadeInUpShort`) e' esattamente cio' che la rende leggibile.

> **Quasi-firma mancata:** `spinGlow` sullo sticky CTA. Un anello di luce rotante attorno alla pill sarebbe stato il quinto momento — ma il conic-gradient a 5 stop identici lo rende invisibile.

---

# 4. Cosa manca a Sharpify — dove batterlo restando nello stesso linguaggio

Vincoli da rispettare: **un solo scrub-hero, un solo asse, ampiezze ≤40px, un solo colore accento, tutto one-shot.** Le lacune sono di *rifinitura*, non di quantita': aggiungere effetti li' romperebbe cio' che funziona.

**1. Nessun counter — il guadagno maggiore al costo minore.** Il sito monta **8 widget count-up del tema** (`.ohio-widget.counter`, `data-counter` = `1`B, `400`K, `52`%, `800`%, `350`%, `$100`M+, `100`K+, `27`%, `$1.5`) e in home **nessuno e' visibile o innescato**: il testo di tutti e' ancora `0` e i numeroni delle stat card sono testo statico. Un count-up sui 3 numeri-tesi (`$50M / 25 / 2300`), agganciato allo *stesso* IntersectionObserver del reveal (soglia 0.18), 1,2s ease-out, cifre in `font-variant-numeric: tabular-nums` per non far ballare la larghezza. Regola: solo i 3 numeri portanti, una volta sola, mai in loop.

**2. Invertire la scala del carousel.** Card centrale `scale(0.841)` contro `scale(1.06)` ai bordi, con `z-index: 2` sulla centrale. Correggere in `s = 0.84 + 0.22*t` trasforma una valle in un picco nel momento piu' visto del sito. E gia' che si tocca: legare alla stessa `t` anche `opacity` (0,55 → 1) e un `blur(1.5px)` sui bordi = profondita' di campo. Tre righe.

**3. Inerzia sul drag ed ease sui cambi di stato.** Oggi rilasciando si torna istantaneamente a 30px/s e passando col mouse il nastro si ferma di colpo. Servono: velocita' come variabile lerpata (`speed += (target - speed) * 0.08` per frame, `target = 0` in hover e `0.5` fuori) e momentum al rilascio (velocita' dell'ultimo `pointermove`, decadimento 0.94/frame fino a rientrare nell'auto-scroll). Nessun effetto nuovo, sensazione completamente diversa.

**4. Velocita' delta-time invece di frame-based.** `pos -= 0.5` per frame significa che su un 120Hz il nastro va a velocita' doppia e su un device che droppa a 30fps a metà. `pos -= 0.03 * dt` (dt in ms) lo rende identico su ogni schermo — ed e' anche un argomento di vendita.

**5. `prefers-reduced-motion` coperto al 5%.** In tutto il sito ci sono **esattamente due** blocchi reduced-motion: `.sf-marquee__row{animation:none}` + `.sf-marquee{overflow-x:auto}` (soluzione elegante) e le transizioni della bolla WhatsApp. **Non coperti:** lo scrub GSAP a 43 char, le 36 entrate rise+fade, il rAF del carousel, `spinGlow`, `sf-ann-pulse`, `sr-pulse`, il parallasse motion-fx. Un blocco unico che (a) riduce ogni reveal a `opacity` con durata 0,01s, (b) fa `gsap.set(chars,{color:'#fff'})` e non registra lo ScrollTrigger, (c) ferma il rAF lasciando il carousel `overflow-x: auto` scrollabile a mano, (d) azzera i due pulse — e' conformita' WCAG 2.3.3 **e** un differenziale reale, verificabile in 5 secondi da chiunque.

**6. Tre sistemi di reveal → un design system di motion.** Oggi: 0,55s `cb(.25,.46,.45,.94)` per `doe-visible`, 0,7s stessa curva per `.animated`, 1,05s `cb(.22,.61,.36,1)` per `premium-reveal`, piu' stagger a 100 / 130 / 260ms e la ladder Elementor 0–500ms. Quattro implementazioni dello stesso gesto. Sostituirle con 4 token e **un solo** osservatore che deriva il ritardo dall'indice:
```css
:root{ --ease-out: cubic-bezier(.22,.61,.36,1); --dur-micro: 180ms; --dur-reveal: 620ms; --stagger: 70ms; }
```
E' precisamente la differenza tra un sito *assemblato* e un sito *progettato* — e si vede, anche se nessuno sa spiegare perche'.

**7. Nessun mask reveal.** Tutte le entrate sono `opacity + translate`. Il vocabolario adiacente piu' forte e ancora perfettamente coerente col loro linguaggio e' il **clip-path / overflow mask reveal**: `clip-path: inset(100% 0 0 0) → inset(0 0 0 0)` con la stessa curva e 620ms, oppure testo dentro `overflow: hidden` che sale da `translateY(100%)`. Fa sembrare il contenuto **stampato** invece che *fatto apparire*, e **non aggiunge un solo effetto nuovo alla tavolozza percepita** (resta un movimento verticale, un asse, una curva). Ironia: il tema Ohio ha gia' `slide_up_inner` e `mdwFadeInUp` (con `clip-path: polygon(...)`) caricati e mai usati.

**8. Le result card non hanno `:hover`.** Nessuna regola trovata: sono trascinabili ma non interrogabili. Un hover che porta il bordo a `rgba(255,255,255,.24)` e rivela in 200ms una riga di contesto (settore, tempo di chiusura, canale) aggiunge **densita' informativa senza aggiungere movimento** — che e' esattamente la loro tesi estetica.

**9. Recuperare `spinGlow`.** Due elementi ruotano un gradiente uniforme all'infinito. Con due stop reali — `conic-gradient(from 0deg, transparent 0%, #3DDC84 12%, transparent 30%)` — diventa l'anello di luce che gira: il quinto signature moment, a costo zero, con l'infrastruttura gia' cablata.

**10. Nessuna gerarchia sui link testuali.** 17 nodi con solo `transition: color .2s`. Il keyframe `links` del tema (underline `background-size` che esce da un lato e rientra dall'altro) e' caricato e mai usato: un underline wipe a 320ms sui link editoriali e di footer e' il dettaglio che si nota al secondo passaggio, non al primo — cioe' quello che fa dire "questo sito e' curato".

**11. Nessuna orchestrazione dell'above-the-fold.** All'apertura girano 3 animazioni e l'H1 e' statico. Una sequenza d'ingresso unica di ~900ms (eyebrow → headline in mask reveal → CTA, stagger 90ms) darebbe il "primo respiro" che oggi manca, senza toccare nulla del resto della pagina.

**12. Nessuna isteresi sull'header.** `scrollY > 30` con `classList.toggle` secco: intorno ai 30px (trackpad, scroll-bounce iOS, scroll-anchoring) lo stato puo' sfarfallare mentre `backdrop-filter` transiziona per 0,3s. Due soglie — attiva a 48, disattiva a 12 — risolvono.

---

# 5. Il budget di performance implicito

Censimento reale: **2.069 elementi DOM, 17.057 regole CSS, 37 `@keyframes` definiti (4 realmente in uso), pagina 8.242px, viewport 1440×900.**

| Metrica | Valore | Lettura |
|---|---|---|
| Animazioni CSS simultanee **sopra la piega** | **3** (`sf-ann-pulse` + 2× `fadeInUpShort`) | il numero che spiega la sensazione di calma |
| ScrollTrigger totali | **1** | un solo scrubbato in 8.242px |
| `pin-spacer` | **0** | nessun pin → nessuna riscrittura di layout durante lo scroll |
| `will-change` permanenti | **40** (23 `transform`, 17 `opacity, transform`) | mai rimossi dopo l'animazione |
| `backdrop-filter` attivi | **34** | la voce di costo piu' pesante della pagina |
| `filter` attivi | **36** | grayscale loghi, `blur(22px)` CTA, `blur(8px)` spinGlow |
| `mix-blend-mode` ≠ normal | **51** | loghi in `multiply`, pseudo del CTA in `screen` |
| Elementi con `transform` ≠ none | **64** | |

**Proprieta' animate — disciplina quasi perfetta.** Tutto passa per `transform` / `opacity` / `color`. **Nessuna animazione di `width`, `height`, `top`, `left`, `margin`, `padding`** in tutto il sito. `color` (lo scrub) e' un repaint del solo glifo: economico anche su 43 span da 56px, perche' l'area ridipinta e' minuscola e non tocca il layout. Eccezioni: `background` / `border-color` / `box-shadow` nelle transizioni hover (repaint, ma un elemento alla volta) e — la piu' costosa — la **posizione del radial-gradient nel `.glow-btn`**, che a ogni `mousemove` non throttlato ridipinge due pseudo-elementi di cui uno con `blur(22px)`. Sintomatico che sia dichiarato `will-change: transform, background`: `background` non e' compositabile, quindi l'hint e' inefficace quando non controproducente.

**Costo del rAF del carousel.** Per frame: 1 scrittura sulla track + 14 `transform` + 14 `zIndex` = **~29 scritture di stile per frame**. E dentro il loop si leggono `card.offsetLeft`, `card.offsetWidth` e `viewport.offsetWidth` **dopo** aver scritto `track.style.transform` → **layout sincrono forzato ad ogni frame** (classico read-after-write / layout thrashing). Con 14 card passa; e' il tipo di codice che collassa a 30 card o su mobile di fascia media. Correzione banale: misurare `offsetLeft/offsetWidth` una volta in una cache, invalidata solo su `resize` (che e' **gia'** debounced a 80ms). Da notare anche `transition: transform .12s ease` sulle card mentre lo stesso `transform` viene riscritto ogni frame: una transizione in competizione con l'animazione, indeterminata per definizione.

**Il budget di motion e' disciplinato, quello di asset non lo e'.** Librerie caricate con **zero elementi target**: `aos.min.js` (0 `[data-aos]`), `typed.min.js` (0 `.typed-cursor`), `jquery.tilt.min.js` (0 `[data-tilt]`), `isotope.pkgd`, `masonry` + `jquery.masonry`, `imagesloaded`, `jquery.compare` + `jquery.event.move`, `jquery.clb-slider`. Piu' **3 build di FontAwesome, 2 di Bootstrap, 2 di elementor-icons**, e jQuery legacy + migrate **in parallelo a** jQuery 3.6.0. Un sito nuovo che mantiene lo stesso vocabolario su **GSAP + ScrollTrigger + un IntersectionObserver** (~50KB gzip, zero jQuery) ottiene lo stesso risultato con un decimo del peso: e' un vantaggio misurabile su LCP e INP, non un'opinione estetica.

### Regola di budget da adottare, derivata dai loro numeri
- **max 3 animazioni concorrenti per viewport**
- **max 1 elemento scrubbato per pagina**
- **1 easing e 1 durata di reveal per tutto il sito** (2 durate al massimo: micro / reveal)
- **1 asse di ingresso, ampiezza ≤40px; hover ≤4px**
- **0 animazioni di proprieta' di layout**
- **`will-change` applicato solo per la durata dell'animazione e rimosso su `transitionend`**
- **ogni loop infinito confinato in periferia, sospendibile su hover e disattivato in `prefers-reduced-motion`**
- **ogni reveal one-shot** (`unobserve`), con failsafe temporale come il loro `setTimeout(3000)`

Nessun file e' stato scritto: l'analisi e' stata condotta interamente in-browser sulla pagina live.
