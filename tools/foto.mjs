/* Le fotografie generate (Higgsfield, gpt_image_2_5) → varianti web.
     node tools/foto.mjs [prefisso]
   Sorgenti: assets-src/higgsfield/*.png (originali 2k, MAI serviti).
   Uscita:   src/assets/foto/<nome>-<larghezza>.webp

   Il fondo delle foto è un quasi-nero (#0C0A0C) che non coincide con
   nessuna atmosfera del palco: un rettangolo si vedrebbe sempre. L'alfa
   si ricava dalla LUMINANZA: sotto 17 trasparente, sopra 43 pieno, in
   mezzo una rampa. Mani e oggetto restano, il fondo sparisce, e la foto
   galleggia su qualunque atmosfera. Provenienza e prompt di ogni immagine
   in assets-src/higgsfield/provenienza.json.                           */
import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const SRC = join(ROOT, 'assets-src', 'higgsfield'), OUT = join(ROOT, 'src', 'assets', 'foto')
mkdirSync(OUT, { recursive: true })

const ALFA = "format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='clip((0.2126*r(X,Y)+0.7152*g(X,Y)+0.0722*b(X,Y)-17)*255/26,0,255)'"
/* le larghe (16:9) servono a tutta pagina, le verticali (4:5) in colonna */
const LARGHE = ['contro-caduta']

/* ── LE SCENE DEI REPARTI ─────────────────────────────────────────────────
   Giro 4: «più realistiche, meno simboliche» → quattro scene di lavoro.
   Ciclo 1: a colori pieni sembravano foto di repertorio (luce di lampada,
   riflessi verdi dei monitor) accanto alla serie del cliente in bianco e
   nero con un oggetto arancione. Qui le si porta in quella grammatica:
   - VIRAGGIO: grigio con un filo di colore residuo (18%: restano scene vere,
     non grafiche), neri schiacciati; resta pieno solo l'arancio MOLTO
     saturo — pennarello, cartellina, grafici, imbuto — spinto verso
     #FF8200. Pelle e legno, arancioni ma poco saturi, restano grigi.
   - OPACHE: niente alfa, il buio è la stanza.
   - STRETTO: su telefono il pannello è largo 137px e la scena intera
     diventa una macchia; un secondo taglio, 4:5, stringe sulle mani al
     lavoro (box in frazioni dell'originale).                           */
const REPARTI = {
  /* qui i grafici sui monitor sono arancio meno saturo: soglia larga SOLO
     nella zona dei monitor, altrove la mano sotto la lampada diventava arancione */
  'reparto-pubblicita':   { sat: [.70, .86], larga: { sat: [.48, .70], zona: [.10, .06, 1, .40] }, stretto: [.24, .01, .86, .63] },
  'reparto-marketing':    { sat: [.70, .86], stretto: [.31, .16, .93, .78] },
  'reparto-reclutamento': { sat: [.70, .86], stretto: [.14, .09, .76, .71] },
  'reparto-formazione':   { sat: [.70, .86], stretto: [.19, .04, .81, .66] },
}
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
const vira = (px, W, { sat: [s0, s1], larga }) => {
  const o = Buffer.alloc(px.length), RESIDUO = .18
  for (let i = 0; i < px.length; i += 3) {
    const r = px[i] / 255, g = px[i + 1] / 255, b = px[i + 2] / 255
    const mx = Math.max(r, g, b), d = mx - Math.min(r, g, b)
    let h = 0
    if (d > 0) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4
    h = (h * 60 + 360) % 360
    const s = mx ? d / mx : 0
    let [a, b2] = [s0, s1]
    if (larga) { const p = i / 3, fx = (p % W) / W, fy = Math.floor(p / W) / (px.length / 3 / W), z = larga.zona; if (fx >= z[0] && fx <= z[2] && fy >= z[1] && fy <= z[3]) [a, b2] = larga.sat }
    const m = (1 - smooth(12, 22, Math.abs(h - 27))) * smooth(a, b2, s) * smooth(.30, .45, mx)
    const y = .2126 * r + .7152 * g + .0722 * b
    const yc = Math.pow(Math.min(1, Math.max(0, (y - .035) / .93)), 1.12)
    const lum = Math.max(.25, Math.min(1, mx * 1.08))
    const ar = [lum, .51 * lum, 0]
    const gr = [yc + (r - y) * RESIDUO, yc + (g - y) * RESIDUO, yc + (b - y) * RESIDUO]
    for (let k = 0; k < 3; k++) o[i + k] = Math.round(255 * Math.min(1, Math.max(0, gr[k] * (1 - m) + ar[k] * m)))
  }
  return o
}
const webp = (input, w, h, filtro, dst, alfa = false) => execFileSync('ffmpeg', ['-y', '-v', 'error',
  ...(input.raw ? ['-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', `${w}x${h}`, '-i', '-'] : ['-i', input.file]),
  '-vf', filtro, '-c:v', 'libwebp', '-quality', '78', '-pix_fmt', alfa ? 'yuva420p' : 'yuv420p', dst],
  input.raw ? { input: input.raw } : {})

const fatte = []
/* node tools/foto.mjs reparto-  → solo le immagini il cui nome inizia così */
const FILTRO = process.argv[2] || ''
for (const f of readdirSync(SRC).filter(f => f.endsWith('.png') && f.startsWith(FILTRO))) {
  const nome = f.replace('.png', ''), rep = REPARTI[nome]
  const misure = LARGHE.includes(nome) ? [800, 1400, 2000] : [480, 800, 1200]
  if (rep) {
    const [W, H] = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', join(SRC, f)]).toString().trim().split(',').map(Number)
    const raw = vira(execFileSync('ffmpeg', ['-v', 'error', '-i', join(SRC, f), '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], { maxBuffer: W * H * 3 + 1024 }), W, rep)
    for (const w of misure) { webp({ raw }, W, H, `scale=${w}:-2:flags=lanczos`, join(OUT, `${nome}-${w}.webp`)); fatte.push(`${nome}-${w}`) }
    const [x0, y0, x1, y1] = rep.stretto
    const cw = Math.round((x1 - x0) * W / 4) * 4, ch = Math.round(cw * 5 / 4)
    for (const w of [480, 800]) {
      webp({ raw }, W, H, `crop=${cw}:${ch}:${Math.round(x0 * W)}:${Math.round(y0 * H)},scale=${w}:-2:flags=lanczos`, join(OUT, `${nome}-stretto-${w}.webp`))
      fatte.push(`${nome}-stretto-${w}`)
    }
    continue
  }
  for (const w of misure) {
    webp({ file: join(SRC, f) }, 0, 0, `scale=${w}:-2:flags=lanczos,${ALFA}`, join(OUT, `${nome}-${w}.webp`), true)
    fatte.push(`${nome}-${w}`)
  }
}
console.log(fatte.length + ' varianti → src/assets/foto/')
