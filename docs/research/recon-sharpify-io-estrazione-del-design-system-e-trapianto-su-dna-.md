# Sharpify.io: estrazione del design system e trapianto su DNA arancio/nero per Salesprocess

## Punti chiave

- Sharpify non usa grigi opachi: costruisce superfici e testo con BIANCO A OPACITÀ VARIABILE su near-black #161519. È un sistema a un solo canale (alpha) che garantisce coerenza automatica ma nasconde un fallimento WCAG: i bordi hairline a white@0.07-0.14 danno 1.19-1.51:1, contro i 3.0:1 richiesti da SC 1.4.11. Serve alpha ≥ 0.335 perché un bordo bianco sia legale su quel fondo.
- Il verde di Sharpify non è un colore, è una FAMIGLIA a due livelli, e i token lo dichiarano: --glow-color rgba(0,153,76,0.25), --glow-color-strong rgba(0,153,76,0.55), --glow-core rgba(255,255,255,0.9). Il glow ha un NUCLEO BIANCO e un'aureola colorata (box-shadow: 0 0 10/20/30px #fff, poi 0 0 40/50/75px #006633). Questo è esattamente il meccanismo che salva l'arancio dal fango.
- Scoperta tecnica decisiva: #FF8200 ha ZERO headroom di gamut. In OKLCH è L=0.735 C=0.185 h=53.8 con il canale B a 0 e R clippato a 255; già a L+0.02 esce da sRGB. Il verde #3DDC84 (L=0.793 C=0.180 h=154.0) ha +0.05/+0.08 L disponibili (#53ED94, #5FF79D). Conseguenza: NON si può costruire uno stato hover 'più brillante' partendo da #FF8200 senza desaturare e virare al giallo. Il modello di interazione va invertito: hover verso il basso (deep) o verso il glow, mai verso l'alto.
- Contrasti reali: #FF8200 su #161519 = 7.31:1 e su #000000 = 8.45:1 (AAA, l'arancio come INCHIOSTRO è ottimo). Ma bianco su #FF8200 = 2.49:1 → fallisce. Regola non negoziabile: ogni pill arancione piena porta testo NERO. Il punto di pivot è #B85B00 (nero 4.53 / bianco 4.63): sopra si usa nero, sotto si usa bianco.
- Il rischio 'energy-drink' è quantificabile come problema di FANGO, non di aggressività: arancio@0.18 su near-black collassa a #402915 con chroma da 0.185 a 0.047 e hue in deriva 53.8→60.6, cioè marrone. Il verde nella stessa posizione dà #12241E, che legge come neutro scuro. Quindi le superfici tinte-accento, che in Sharpify funzionano, sull'arancio vanno VIETATE: superfici neutre in white-alpha, arancio solo come inchiostro, hairline, pill piccola e glow a nucleo bianco.
- La legge tracking/size di Sharpify non è una curva ma tre PLATEAU con inversione di segno tra 15px e 17px: micro-caps 10-12px a +0.12em, corpo 17px a -0.01em, display 38-56px stabile a -0.04em (-1.98px/44px = -0.045em; -2.24px/56px = -0.040em). Trasferibile così com'è, indipendente dal font.
- L'accento arancione divora lo slot semantico 'warning': #FFC53D è troppo vicino a #FF8200 in hue. Va spinto il warning al giallo puro e il danger verso il magenta-rosso (#CC3366, già presente per caso nel DOM Salesprocess, da legittimare) per non collidere col brand.
- Sharpify è coerente esteticamente ma indisciplinato a livello di token: 18 alpha di testo distinti (da 0.30 a 0.92), 11 raggi distinti (2/4/5/8/10/12/14/16/18/20/99px). Il 'fratello maggiore' deve collassare tutto a 4 step di testo, 3 superfici, 3 bordi, 4 raggi. È lì che si guadagna la percezione di sistema superiore, non nel colore.

---

> **Metodo.** Ho scaricato l'HTML live di `https://www.sharpify.io/` (489.058 byte) e ho estratto per conteggio i valori reali di colore, tipografia, raggio, bordo, ombra e motion. Tutti i rapporti di contrasto e le conversioni OKLCH qui riportati sono **calcolati**, non stimati: formula WCAG 2.x su luminanza relativa sRGB, con compositing alpha eseguito nello spazio 8-bit non lineare (come fa il browser). Script di verifica in `C:/Users/UTENTE/AppData/Local/Temp/wcag.js`, `ok.js`, `glow.js`, `final.js`, `warm.js`, `dz.js`; sorgente in `C:/Users/UTENTE/AppData/Local/Temp/sharpify.html`.

---

# 1. La palette Sharpify con ruoli semantici

## 1.1 Perché il bianco-a-opacità e non i grigi opachi

Il dato più rilevante dell'estrazione è la **distribuzione**: nell'HTML ci sono 98 occorrenze di `#fff` e una lunga scala di `rgba(255,255,255,α)` — e praticamente nessun grigio opaco intermedio. Sharpify non ha una palette di grigi. Ha **un near-black e un canale alpha**.

Ecco cosa si ottiene realmente sovrapponendo bianco al fondo `#161519`:

| Ruolo | Valore autore | Hex effettivo | CR vs base | Verdetto |
|---|---|---|---|---|
| text/primary | `#FFFFFF` | `#FFFFFF` | 18.99 | AAA |
| text/primary-soft | `white@0.92` | `#ECECED` | **15.39** | AAA |
| text/secondary | `white@0.85` | `#DCDCDD` | **13.26** | AAA |
| text/secondary-low | `white@0.70` | `#B9B9BA` | **9.27** | AAA |
| text/tertiary | `white@0.60` | `#A2A1A3` | **7.07** | AAA |
| text/tertiary-low | `white@0.50` | `#8B8A8C` | **5.29** | AA |
| text/quiet | `white@0.45` | `#7F7E81` | **4.50** | AA (al pelo) |
| — soglia — | `white@0.42` | `#78777A` | **4.08** | ✗ corpo |
| text/faint | `white@0.40` | `#737375` | **3.84** | solo ≥24px |
| text/faint | `white@0.35` | `#68676A` | **3.23** | solo ≥24px |
| ⚠️ usato 6 volte | `white@0.30` | `#5C5B5E` | **2.69** | **FALLISCE sempre** |

| Ruolo superficie | Valore autore | Hex effettivo | CR vs base |
|---|---|---|---|
| surface/1 | `white@0.04` | `#1F1E22` | 1.10 |
| surface/2 | `white@0.06` (5×, il più usato) | `#242327` | 1.16 |
| surface/3 | `white@0.08` | `#29282B` | 1.24 |
| border/hairline | `white@0.07` (8×) | `#262529` | **1.19** |
| border/hairline-2 | `white@0.08` (6×) | `#29282B` | **1.24** |
| border/strong | `white@0.14` (5×) | `#373639` | **1.51** |

**Perché lo fa (i vantaggi reali).**

1. **Coerenza automatica sotto composizione.** Una card `white@0.06` dentro una sezione `white@0.04` produce da sola la gerarchia corretta (0.06 + 0.04·0.94 ≈ 0.098 effettivo). Con grigi opachi ogni annidamento va ricalcolato a mano; con alpha l'elevazione è *emergente*.
2. **Un solo asse di decisione.** Il designer non scegle "quale grigio" ma "quanto forte". Riduce lo spazio delle scelte da N colori a un numero.
3. **Sopravvive al cambio di fondo.** Le stesse card funzionano su `#161519`, su `#020202` e sopra un'immagine o un glow radiale, perché la superficie è *relativa*. Sharpify lo sfrutta: ha glow radiali colorati sotto le stat card, e le card restano leggibili perché non hanno un fondo assoluto.
4. **Il bordo hairline diventa gratis.** `1px solid white@0.07` è lo stesso sistema del fondo, un gradino più su. Non serve una palette di bordi separata.

**Cosa comporta (i costi reali, tutti verificati).**

1. **Fallimento WCAG 1.4.11 sui bordi.** I bordi a `0.07`–`0.14` danno **1.19–1.51:1**. Il requisito per un confine di componente non testuale è **3.0:1**. Ho calcolato la soglia esatta: su `#161519` serve **α ≥ 0.335** (`#646366`, 3.00:1); per testo AA serve **α ≥ 0.450** (`#7F7E81`). I bordi di Sharpify sono circa **4× troppo tenui** per essere legali. Quando la hairline è *l'unico* confine di una card cliccabile, è un difetto, non una scelta.
2. **Deriva dei token.** Ho contato **18 alpha di testo distinti** (0.30, 0.35, 0.40, 0.42, 0.45, 0.50, 0.52, 0.55, 0.60, 0.65, 0.70, 0.75, 0.78, 0.80, 0.82, 0.85, 0.86, 0.92) e **11 raggi distinti** (2, 4, 5, 8, 10, 12, 14, 16, 18, 20, 99px). Sette valori terziari quasi indistinguibili tra 0.40 e 0.60: l'occhio non li separa, ma il codice li moltiplica. Il sistema *sembra* rigoroso e non lo è.
3. **Il testo tenue è irrecuperabile.** `white@0.30` è usato 6 volte come `color`. A 2.69:1 non passa nemmeno la soglia per testo grande. Con l'alpha è troppo facile scendere sotto la soglia senza accorgersene, perché "0.30" non *suona* illeggibile come suonerebbe `#5C5B5E`.
4. **Costo di rendering e subpixel.** Testo con alpha < 1 su fondo scuro perde l'antialiasing subpixel e crea layer di composizione. Su display non-retina il corpo a `white@0.72` è visibilmente più fragile di un grigio opaco equivalente.

## 1.2 L'accento non è un colore: è una famiglia a due livelli

Questa è la scoperta che ribalta il brief. Il verde di Sharpify non è "#3DDC84 usato con parsimonia". Sono **quattro verdi con quattro mestieri diversi**, e il più frequente non è quello brillante:

| Token | Hex | Occorrenze | OKLCH | CR su #161519 | Mestiere |
|---|---|---|---|---|---|
| accent/deep | `#006633` | **65** (il più usato in assoluto) | L .447 C .116 h 152.7 | **2.55** ✗ | glow, ombre, fill grandi, tint |
| accent/mid | `#00994C` | in `--glow-color` | — | — | seme del glow |
| accent/solid | `#00813F` | 13 | L — | **3.65** | fill di bottone |
| accent/ink | `#3DDC84` | 2 | L .793 C .180 h 154.0 | **10.19** AAA | inchiostro, micro-accenti |
| accent/hot | `#00FF88` | 3 | — | **13.55** AAA | neon, hover |

Il verde profondo `#006633` **fallisce** il contrasto testo (2.55:1) e infatti non viene mai usato come testo: fa il glow e le superfici. Il verde brillante `#3DDC84` passa AAA e infatti fa solo inchiostro. **La separazione dei ruoli per luminanza è già nel sistema sorgente.** Non è una contromisura che inventiamo per l'arancio: è come funziona Sharpify.

## 1.3 Elevazione = glow d'accento, non ombra neutra

Sharpify dichiara i token di glow letteralmente nel CSS:

```
--glow-color:        rgba(0,153,76,0.25)
--glow-color-strong: rgba(0,153,76,0.55)
--glow-core:         rgba(255,255,255,0.9)
```

E il neon layered, verbatim dal sorgente:

```
box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff,
            0 0 40px #006633, 0 0 50px #006633, 0 0 75px #006633;
```

**Il nucleo è bianco, l'aureola è colorata.** I raggi stretti (10/20/30px) sono bianchi; il colore entra solo a 40px e oltre. Questo è il meccanismo tecnico più importante da portare via, e per l'arancio è la differenza tra "premium" e "fango" (§3.3).

La scala di elevazione reale, estratta:
- accent-tinted: `0 0 3px rgba(0,102,51,.22)` → `0 0 16px …0.4` → `0 0 28px …0.4` → `0 0 36px …0.45` → `0 10px 32px …0.18` → `0 14px 44px …0.20/0.30` → `0 16px 48px …0.22`
- neutral: `0 10px 30px rgba(0,0,0,.28)` → `0 12px 32px rgba(0,0,0,.42)` → `0 14px 34px rgba(0,0,0,.55)` → `0 24px 80px rgba(0,0,0,.55)`
- glow radiali: `radial-gradient(ellipse 80% 50% at 50% 10%, rgba(0,153,76,0.38) 0%, transparent 65%)` e varianti a `0.15 / 0.18 / 0.25` con `transparent 68-70%`

Due sistemi paralleli: **ombra neutra per la profondità, glow d'accento per l'importanza.**

## 1.4 Raggi, bordi, superfici opache

Raggi per frequenza reale: `12px` (16×, la card), `99px`/`100px`/`999px` (20× totali, la pill), `18px` (9×), `50%` (8×, avatar), `8px` (6×), `2px` (3×, il taglio tecnico). Le sezioni chiare: `#F4F2EC` (crema "AS FEATURED IN"), `#F4F6F7`, `#F7F6F8`. Fondi scuri opachi: `#161519`, `#111111`, `#0A0A0A`, `#000000`, `rgba(8,8,8,0.94)` per la nav sticky con `backdrop-filter: saturate(180%) blur(20px)`.

## 1.5 Motion (per completezza del sistema)

Durate: `.18s`, `.2s`, `.22s`, `.28s`, `.35s`, `.5s`, `.6s`, `.8s`. Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (expo-out, l'entrata) e `cubic-bezier(.645,.045,.355,1)` (in-out-cubic). Marquee: `36s` e `46s` linear infinite. Pulse annuncio: `1.6s`. ScrollTrigger unico: `scrub: 0.5`, `start: "top 80%"`, `end: "+=80%"`, `stagger: 0.1`. **`prefers-reduced-motion: reduce` è gestito** (3 blocchi, `animation: none`) — merito da replicare.

---

# 2. Scala tipografica e la legge tracking/size in em

Font caricato: `DM Sans` ai pesi **400, 500, 600, 700, 800**; usati per frequenza: 700 (46×), 600 (15×), 500 (13×), 400 (6×). Contrappunto serif `Editorial Old` (4 occorrenze — usato come firma, non come sistema).

## 2.1 La legge non è una curva: sono tre plateau

Ho estratto le coppie `font-size` + `letter-spacing` **co-localizzate nella stessa regola**, che è l'unico modo di leggere l'intenzione. Il risultato:

| Size | Caps? | Tracking autore | **Tracking in em** | Plateau |
|---|---|---|---|---|
| 10px | UPPER | `0.12em` / `1px` | **+0.120** / +0.100 | micro-caps |
| 11px | UPPER | `0.12em` | **+0.120** | micro-caps |
| 12px | UPPER | `0.12em` | **+0.120** | micro-caps |
| 12px | no | `0.08em` | **+0.080** | meta |
| 13px/700 | no | `.04em` | **+0.040** | meta |
| 15px | no | `.02em` | **+0.020** | transizione |
| **17px** | no | `-.01em` | **−0.010** | ← **inversione di segno** |
| 22px | no | `0.01em` | +0.010 | statement (eccezione) |
| 38px | no | ~`-1.5px` | ≈ **−0.040** | display |
| 44px | no | `-1.98px` | **−0.045** | display |
| 56px | no | `-2.24px` | **−0.040** | display |

**La legge trasferibile, indipendente dal font:**

```
tracking(em) =
  +0.120   se size ≤ 12px  AND text-transform: uppercase   (eyebrow / label / kicker)
  +0.080   se size ≤ 12px  lowercase                        (meta, timestamp)
  +0.040   se size 13-14px                                  (nav, badge, bottone piccolo)
  +0.020   se size 15-16px                                  (corpo denso, banda di transizione)
  -0.010   se size 17-24px                                  (corpo largo, sub-headline)
  -0.040   se size ≥ 32px                                    (display, plateau piatto)
```

Due osservazioni che rendono la legge utile:

- **Il plateau del display è piatto.** Da 38px a 56px il tracking in em non cresce: resta a −0.040/−0.045. In px cresce (−1.5 → −2.24) solo perché la size cresce. Quindi si implementa come **un solo token** (`--tracking-display: -0.04em`) su tutta la fascia display, non come funzione continua. Molti sistemi sbagliano qui e inseguono una curva che non esiste.
- **L'inversione di segno cade tra 15px e 17px.** Il valore `17px / -.01em` trovato nel sorgente è la prova: sotto quella soglia il tracking apre, sopra chiude. Coincide con la soglia ottica classica (~16px) in cui la spaziatura di default del font passa da "troppo stretta per leggere piccolo" a "troppo larga per leggere grande".

## 2.2 Line-height per fascia (frequenze reali)

`1.2em` (12×) e `1` (11×) dominano il display; `1.15 / 1.22 / 1.25 / 1.3 / 1.35` la fascia titolo; `1.45 / 1.5 / 1.55 / 1.6 / 1.65` il corpo. Sistema pulito: **display 1.0–1.2, titolo 1.25, corpo 1.55–1.65.**

## 2.3 La firma tipografica in una riga

**Tracking negativo aggressivo sul display + tracking positivo esagerato sulle micro-caps + niente nel mezzo.** È un contrasto di *spaziatura*, non di dimensione: la eyebrow a `10px/700/+0.12em` e il display a `56px/700/−0.04em` hanno lo stesso peso (700) e lo stesso font. Tutta la differenza percepita viene da scala e tracking. Questo è replicabile con qualunque font geometrico — incluso **Red Hat Display**, che Salesprocess già usa su 164 nodi.

---

# 3. Il trapianto: cosa succede sostituendo #3DDC84 con #FF8200

## 3.1 I numeri di partenza

| | `#3DDC84` (verde Sharpify) | `#FF8200` (arancio Salesprocess) |
|---|---|---|
| OKLCH | L **0.793** · C **0.180** · h **154.0°** | L **0.735** · C **0.185** · h **53.8°** |
| Luminanza WCAG (Y) | **0.538** | **0.372** |
| Canali RGB | 61 / 220 / 132 | 255 / 130 / **0** |
| CR su `#161519` | **10.19** AAA | **7.31** AAA |
| CR su `#000000` | **11.77** AAA | **8.45** AAA |
| Nero sopra | **11.77** ✓ | **8.45** ✓ |
| Bianco sopra | 1.78 ✗ | **2.49 ✗** |

La buona notizia: **la chroma è quasi identica** (0.180 vs 0.185) e la lightness percettiva è vicina (0.793 vs 0.735). Il trapianto è cromaticamente plausibile: l'arancio non è "più saturo" del verde. La cattiva notizia sta tutta altrove.

## 3.2 Rischio #1 — headroom di gamut ZERO (il vincolo strutturale)

Questo è il problema che nessuno vede prima di implementare. Tenendo chroma e hue costanti e alzando la lightness:

| | +0.02 L | +0.05 L | +0.08 L | +0.12 L |
|---|---|---|---|---|
| verde `#3DDC84` | `#46E38A` **in gamut** | `#53ED94` **in gamut** | `#5FF79D` **in gamut** | fuori |
| arancio `#FF8200` | **FUORI GAMUT** | fuori | fuori | fuori |

`#FF8200` ha R clippato a 255 e B a 0: sta **sul bordo del gamut sRGB**. Già a +0.02 L clippa e la hue vira al giallo.

**Conseguenza per il design system:** il pattern hover standard "l'accento si accende" — che Sharpify può permettersi (`#3DDC84 → #53ED94`, +0.05 L a chroma costante) — **è impossibile con #FF8200**. Ogni tentativo di "arancio più brillante" produce `#FF9228`/`#FF9C37`, cioè arancio *desaturato e virato al giallo*: sembra un altro brand, non uno stato.

**Contromisura obbligata — inversione del modello di interazione:**
- Lo stato di riposo **è già il massimo**. `#FF8200` è il tetto.
- L'hover non alza la luminanza dell'accento: alza il **glow** (`0 0 24px` → `0 0 36px`), alza la **superficie sotto** (`white@0.06` → `white@0.09`), o **scurisce il fill** (`#FF8200` → `#E87300`).
- Se si vuole comunque un accento "più caldo", si accetta la desaturazione e si dichiara come token separato: `accent/hot #FF9A38` (L 0.80 C 0.150) — **9.30:1** su base, nero sopra **9.93:1**. Usarlo solo per hover di testo-link, mai per fill.

## 3.3 Rischio #2 — il fango bruno (dove il sistema Sharpify si rompe davvero)

Sharpify usa moltissimo le superfici tinte d'accento: `rgba(0,102,51, 0.08 / 0.12 / 0.15 / 0.18 / 0.20 / 0.25 / 0.32 / 0.35 / 0.40)`. Cosa producono i due accenti nella stessa posizione:

| | risultato @ α 0.18 | risultato @ α 0.35 | chroma finale | deriva hue |
|---|---|---|---|---|
| verde `#006633` | `#12241E` — **verde-slate scuro, legge neutro** | `#0E3122` | 0.027 → 0.049 | 152.7° → 170.8° |
| arancio `#FF8200` | `#402915` — **MARRONE** | `#683B10` — **cuoio/ruggine** | 0.047 → 0.084 | 53.8° → 60.6° |

Paradosso utile: l'arancio **deriva meno in hue** del verde (+6.8° contro +18°). Il problema non è la deriva, è **dove atterra**. Un verde scuro desaturato è un colore che il cervello archivia come "grigio-verde tecnico". Un arancio scuro desaturato è **marrone**, e il marrone è l'unico colore che nessun brand B2B vuole: legge come vecchio, sporco, anni '70.

Ho verificato che **non è un problema di blend mode**: su fondo così scuro, `alpha-blend` (`#402915`), `screen` (`#402A19`) e `plus-lighter` (`#442C19`) sono praticamente identici. Cambiare il modo di fusione non salva nulla.

**Contromisure:**
1. **Vietare le superfici tinte d'accento oltre α 0.10.** Le superfici restano **neutre in white-alpha**. È l'unica deviazione strutturale dal sistema sorgente, e va scritta come regola dura.
2. **Il glow adotta il nucleo bianco di Sharpify** (`--glow-core`). Verificato: arancio@0.30 diretto su base → `#542E08` (marrone). Arancio@0.30 **sopra un nucleo bianco@0.55** → `#B28D66`: resta cromatico, caldo, non fangoso. Il token `--glow-core: rgba(255,255,255,0.9)` di Sharpify non è un vezzo: è ciò che tiene il glow *luminoso* invece che *sporco*.
3. Se serve una superficie calda, si usa un `accent/veil` **dichiarato come colore opaco** (`#3B2413`, CR 1.36 su base) invece di un alpha, così è ispezionabile e nessuno lo scala per sbaglio.

## 3.4 Rischio #3 — perché l'arancio "vibra" su nero

Tre cause fisiche distinte, tutte con la stessa conseguenza:

1. **Canale blu a zero.** `#FF8200` ha B = 0. Nessuna energia a onda corta. L'aberrazione cromatica longitudinale dell'occhio è massima agli estremi dello spettro: un bordo rosso-arancio saturo contro nero puro non mette a fuoco sullo stesso piano del testo bianco adiacente, e il bordo *sembra* muoversi. Il verde `#3DDC84` (B = 132) sta invece vicino al picco di efficienza luminosa fotopica (~555 nm): l'occhio lo risolve nitidamente.
2. **Y basso, chroma alto.** Y = 0.372 con C = 0.185: l'arancio porta molto *colore* e relativamente poca *luce*. Su fondo near-black questo massimizza il contrasto cromatico rispetto a quello di luminanza — la condizione esatta in cui compare l'alone percettivo.
3. **Clipping sul bordo del gamut.** Essendo già al limite, ogni antialiasing, ogni compressione JPEG/WebP, ogni scala di rendering produce banding e frange visibili sui bordi delle glifi arancioni.

**Contromisure operative:**
- **Mai testo arancione sotto 15px.** L'alone divora le aste sottili. Il micro-caps eyebrow arancione a 10px è precisamente l'uso peggiore possibile: farlo in `text/tertiary` e riservare l'arancio alla parola-chiave nel display.
- **Mai arancio su nero puro `#000000` per grandi aree.** Il fondo `#0C0B0A` (leggermente caldo, R > B) riduce la distanza cromatica e smorza l'alone; il nero puro la massimizza.
- **Peso minimo 500 per il testo arancione**, e mai italic/light.
- **Budget d'area rigido: l'accento occupa ≤ 3% dei pixel di ogni viewport.** In Sharpify il verde ha 65+13+2+3 = 83 occorrenze su ~490 KB di markup, quasi tutte in glow e ombre, non in fill. È questa parsimonia che rende il sistema premium — non il colore scelto.

## 3.5 Rischio #4 — il conflitto semantico (facile da dimenticare)

Con un accento arancione **si perde lo slot "warning"**. Verificato: `#FFC53D` dà 12.46:1 sulla base, tecnicamente perfetto, ma è a ~20° di hue dal brand: l'utente non distingue "avviso" da "marchio". Analogamente `#FF6B6B` (danger) è a ~28° dall'arancio.

**Contromisura:** spingere il warning al **giallo puro** (`#FFD84D`, hue ~90°) e il danger al **magenta-rosso**. Nota felice: nel DOM di Salesprocess esiste già un `#CC3366` "accidentale" — va **legittimato come hue di danger/alert** invece che rimosso. Success al verde `#4ADE80` (11.29:1), info al blu `#7AA2FF` (7.90:1). E in ogni caso: **nessuno stato solo-colore** — sempre colore + icona + testo (WCAG 1.4.1).

---

# 4. Token set proposto — "fratello maggiore di Sharpify, DNA arancio/nero"

Base scelta: **`#0C0B0A`** — near-black *caldo* (R 12 > B 10). Scelta deliberata e opposta a Sharpify (`#161519` è freddo, B 25 > R 22): un fondo freddo sotto un accento caldo massimizza il contrasto simultaneo e *eccita* l'arancio; un fondo caldo lo **smorza**. Dato che il rischio è "energy-drink", si smorza.

Tutti i valori sotto sono **calcolati su `#0C0B0A`**.

## 4.1 Colore

```css
:root {
  /* ---- BASE & SUPERFICI (neutre, white-alpha — non tingere d'arancio) ---- */
  --c-base:              #0C0B0A;              /* fondo canonico, warm near-black   */
  --c-base-deep:         #000000;              /* solo hero fotografico full-bleed  */
  --c-surface-1:  rgba(255,255,255,0.035);     /* → #151413   CR 1.07  sezione      */
  --c-surface-2:  rgba(255,255,255,0.060);     /* → #1B1A19   CR 1.13  card         */
  --c-surface-3:  rgba(255,255,255,0.090);     /* → #222120   CR 1.22  card:hover   */
  --c-surface-sticky: rgba(10,9,8,0.94);       /* nav, con backdrop-filter          */
  --c-surface-invert:   #F4F2EC;               /* unica sezione crema, come Sharpify*/

  /* ---- BORDI (3 step, non 6) ---- */
  --c-border-hairline: rgba(255,255,255,0.10); /* → #242323  CR 1.25  DECORATIVO    */
  --c-border-strong:   rgba(255,255,255,0.18); /* → #383736  CR 1.66  DECORATIVO    */
  --c-border-ui:       rgba(255,255,255,0.34); /* → #5F5E5D  CR 3.04  ✓ SC 1.4.11   */

  /* ---- TESTO (4 step, non 18) ---- */
  --c-text-1:            #FFFFFF;              /* CR 19.67  AAA                     */
  --c-text-2:     rgba(255,255,255,0.72);      /* → #BBBBBA  CR 10.24  AAA          */
  --c-text-3:     rgba(255,255,255,0.50);      /* → #868585  CR  5.34  AA           */
  --c-text-4:     rgba(255,255,255,0.38);      /* → #686867  CR  3.53  SOLO ≥24px   */
  --c-text-on-accent:    #000000;              /* obbligatorio su ogni fill arancio */

  /* ---- ACCENTO: famiglia a 5 livelli, come il verde di Sharpify ---- */
  --c-accent-hot:        #FF9A38;  /* L.80 C.150 — CR 9.30 · nero 9.93 · hover link */
  --c-accent-ink:        #FF8200;  /* L.735 C.185 — CR 7.91 · nero 8.45 · IL BRAND  */
  --c-accent-mid:        #E87300;  /* L.68 C.175 — CR 6.45 · nero 6.88 · fill:hover */
  --c-accent-pivot:      #B85B00;  /* nero 4.53 / bianco 4.63 — punto di pareggio   */
  --c-accent-deep:       #8A4300;  /* CR 2.70 — NON testo · bianco sopra 7.28 ✓     */
  --c-accent-veil:       #3B2413;  /* CR 1.36 — superficie calda, opaca non alpha   */

  /* ---- GLOW: nucleo bianco + aureola arancione (pattern Sharpify) ---- */
  --glow-core:    rgba(255,255,255,0.90);
  --glow-halo:    rgba(255,130,0,0.28);
  --glow-halo-strong: rgba(255,130,0,0.50);

  /* ---- SEMANTICI: hue separate dal brand ---- */
  --c-success:           #4ADE80;              /* CR 11.29 · nero 12.05             */
  --c-warning:           #FFD84D;              /* giallo puro, NON ambra            */
  --c-danger:            #CC3366;              /* magenta-rosso (dal DOM esistente) */
  --c-info:              #7AA2FF;              /* CR  7.90 · nero  8.44             */
}
```

## 4.2 Tipografia

```css
:root {
  --font-display: 'Red Hat Display', 'DM Sans', system-ui, sans-serif;
  --font-body:    'Red Hat Display', 'DM Sans', system-ui, sans-serif;
  --font-accent:  'Editorial Old', 'Red Hat Display', Georgia, serif; /* contrappunto, ≤2 usi */

  /* scala — clamp con plateau di tracking */
  --t-display-1: 700 clamp(40px, 7vw, 76px)/1.02  var(--font-display);
  --t-display-2: 700 clamp(34px, 5vw, 56px)/1.06  var(--font-display);
  --t-display-3: 600 clamp(28px, 4vw, 44px)/1.10  var(--font-display);
  --t-title-1:   700 clamp(24px, 3vw, 32px)/1.22  var(--font-display);
  --t-title-2:   600 22px/1.32   var(--font-display);
  --t-body-lg:   400 19px/1.62   var(--font-body);
  --t-body:      400 17px/1.62   var(--font-body);
  --t-body-sm:   400 15px/1.58   var(--font-body);
  --t-meta:      500 13px/1.45   var(--font-body);
  --t-eyebrow:   700 11px/1.20   var(--font-body);   /* + uppercase */

  /* i 6 token di tracking — l'intera legge del §2.1 */
  --tr-display:  -0.040em;   /* ≥32px, plateau piatto     */
  --tr-title:    -0.020em;   /* 24-31px                   */
  --tr-body:     -0.010em;   /* 17-23px, sotto zero        */
  --tr-body-sm:  +0.020em;   /* 15-16px, banda di inversione */
  --tr-meta:     +0.040em;   /* 13-14px                   */
  --tr-eyebrow:  +0.120em;   /* ≤12px UPPERCASE           */
}
```

## 4.3 Superficie, raggio, elevazione, motion

```css
:root {
  /* RAGGI — 4 valori, non 11 */
  --r-hard:   2px;    /* tag tecnici, code, il "taglio" di Sharpify */
  --r-card:  12px;    /* il default, come Sharpify (16 occorrenze)  */
  --r-panel: 20px;    /* bento e sezioni grandi                    */
  --r-pill:  999px;   /* ogni CTA                                  */

  /* ELEVAZIONE — due sistemi paralleli, come il sorgente */
  --e-1: 0 1px 14px rgba(0,0,0,0.28);
  --e-2: 0 12px 32px rgba(0,0,0,0.42);
  --e-3: 0 24px 80px rgba(0,0,0,0.55);
  /* glow d'accento: nucleo bianco stretto + aureola arancione larga */
  --e-glow:        0 0 12px var(--glow-core), 0 0 40px var(--glow-halo),
                   0 0 75px var(--glow-halo);
  --e-glow-strong: 0 0 12px var(--glow-core), 0 0 40px var(--glow-halo-strong),
                   0 0 90px var(--glow-halo);
  --e-ambient: radial-gradient(ellipse 80% 50% at 50% 10%,
                 rgba(255,130,0,0.16) 0%, transparent 66%);

  /* MOTION */
  --d-instant: 120ms;  --d-fast: 200ms;  --d-base: 350ms;
  --d-slow: 600ms;     --d-marquee: 46s;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-io:  cubic-bezier(0.645, 0.045, 0.355, 1);
}
@media (prefers-reduced-motion: reduce) {
  :root { --d-instant:0ms; --d-fast:0ms; --d-base:0ms; --d-slow:0ms; }
  * { animation: none !important; transition: none !important; }
}
```

## 4.4 Le regole d'uso dell'arancio (la parte che fa la differenza)

**Dove l'arancio è obbligatorio** — sono i suoi punti di forza matematici:
- **Focus ring.** `#FF8200` su base = **7.91:1**, contro i bordi bianchi che arrivano a 1.25–1.66. È l'**unico** colore della palette che soddisfa SC 1.4.11 senza sforzo. `outline: 2px solid var(--c-accent-ink); outline-offset: 3px`.
- **Inchiostro: 1–3 parole per viewport.** La parola-chiave dentro un display (`FATTURARE`), l'unità di una statistica (`€` o `M` accanto al numero, mentre il numero resta bianco), la freccia di un link.
- **Hairline d'accento** su un solo elemento per sezione, a segnare l'elemento attivo.
- **Il logo mark.** Già arancione, già una scalinata: resta l'unico oggetto pieno legittimo.

**Dove l'arancio è vietato** — regole dure, non preferenze:
1. **Mai testo bianco su fill arancione.** `bianco/#FF8200 = 2.49:1`. Ogni pill arancione ha `color: #000`. Il pivot è `#B85B00`: **sopra si usa nero, sotto si usa bianco**, e nulla si usa senza aver controllato.
2. **Mai gradiente arancio → bianco.** È il difetto centrale del sito attuale. Un gradiente attraversa la fascia `#FF8200 → #FFA158 → #FFB985 → #FFDBC0`, cioè quattro token che il sistema non possiede, e in mezzo passa dal pivot di contrasto: qualunque testo sopra fallisce da qualche parte. **Sostituzione:** `--e-ambient` (glow radiale arancio 0.16 che sfuma in `transparent`, non in bianco).
3. **Mai superfici tinte arancio oltre α 0.10** (§3.3, il fango).
4. **Mai arancio sotto 15px** e mai sotto peso 500 (§3.4, l'alone).
5. **Mai due elementi arancioni nello stesso viewport in competizione.** Uno per schermata è il target; due è il massimo tollerato.
6. **Mai arancio come colore di stato** — è il brand, non un semaforo (§3.5).
7. **Budget: ≤ 3% dei pixel.**

**Il divario di luminanza da compensare.** L'arancio pesa **Y = 0.372** contro **Y = 0.538** del verde: −31% di luce. Nel sistema originale l'accento *illumina* la pagina; nel nostro *scalda* soltanto. Compensazione: alzare `--c-surface-1` a `0.035` (Sharpify sta a `0.04` ma su fondo più chiaro) e **usare il bianco puro dove Sharpify usa il verde brillante** — i numeri delle statistiche restano bianchi `#FFFFFF` (19.67:1) con l'arancio solo sull'unità e sul glow sottostante. Così il glow arancione fa il lavoro cromatico e il bianco fa il lavoro di luminanza. È anche il motivo per cui il pattern `--glow-core` bianco è indispensabile e non decorativo.

---

# 5. Cosa correggere rispetto al sorgente (dove si guadagna il "fratello maggiore")

Sharpify è esteticamente coeso e **tecnicamente indisciplinato**. Il salto di qualità non sta nel colore, sta qui:

| Difetto verificato in Sharpify | Correzione nel nostro sistema |
|---|---|
| Bordi a `white@0.07–0.14` → **1.19–1.51:1**, sotto i 3.0:1 di SC 1.4.11, e sono l'unico confine delle card | Tre bordi dichiarati per ruolo; `--c-border-ui` a `white@0.34` = **3.04:1** obbligatorio su tutto ciò che è interattivo. Le hairline restano ma sono marcate **decorative**: nessuna card dipende dal bordo, ogni card ha anche un delta di superficie. |
| `color: rgba(255,255,255,0.30)` usato 6 volte → **2.69:1**, fallisce anche per testo grande | Il gradino più basso è `--c-text-4` a 0.38 → **3.53:1**, e il token stesso dichiara `SOLO ≥24px`. Sotto 0.38 non esiste alcun token. |
| **18** alpha di testo distinti (0.30 → 0.92) | **4** step. |
| **11** raggi distinti (2/4/5/8/10/12/14/16/18/20/99) | **4** raggi. |
| Nessuna variabile CSS per colore o tipografia: tutto inline in stili per-widget Elementor | Token set completo in `:root`, unica fonte di verità. |
| Nomenclatura proprietaria forte (`SharpOS™`, `Sharpify App™`, metodo VILKM) come veicolo di credibilità | Trasferibile: Salesprocess ha già il **Metodo 4-in-1** e i "4 Reparti" (Reclutamento, Formazione, Marketing, Vendita) — vanno marcati e resi token del contenuto, non solo copy. |
| Struttura eyebrow `[ SEZIONE ]` in parentesi quadre | Da mantenere come firma strutturale: è ciò che dà densità informativa senza rumore, ed è esattamente ciò che mancava alle 110 section generiche di Elementor. |
| ✓ `prefers-reduced-motion` gestito (3 blocchi) | Da replicare, con i token di durata azzerati alla radice. |

**Nota di conformità sull'intero impianto.** Un sistema white-alpha su near-black è a rischio di due fallimenti sistemici e ricorrenti: il testo tenue e il bordo tenue. Entrambi si prevengono alla radice **cablando la soglia nel token**, non nella code review — su base `#0C0B0A` la soglia è **α ≥ 0.455 per testo corpo** e **α ≥ 0.340 per confini UI**. Sono i due numeri da mettere in cima al file dei token e in un test automatico.
