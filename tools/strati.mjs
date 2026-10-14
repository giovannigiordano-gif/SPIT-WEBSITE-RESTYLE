/* La foto del contro-esempio in TRE STRATI: mano sinistra, mano destra, cubo.
     node tools/strati.mjs
   Sorgente: assets-src/higgsfield/contro-caduta.png (2688×1520).
   Uscita:   src/assets/foto/caduta-{sx,dx,cubo}-<larghezza>.webp
             e, a console, la posizione di ogni strato in % del fotogramma
             (va copiata negli style della <figure class="caduta">).

   Perché: allo scroll le due mani si allontanano e il cubo cade fra loro.
   Con un'immagine sola si può solo spostare tutto insieme.

   Come si separano: l'alfa viene dalla luminanza, come in foto.mjs. Le
   componenti connesse (calcolate a 1/4 di risoluzione) dicono cosa è mano e
   cosa no; dentro il rettangolo del cubo va al cubo tutto ciò che NON è una
   mano, scie del movimento comprese. Fuori, il lato decide la mano. Gli
   strati ricomposti alla loro posizione ridanno la foto identica, ed è
   così che la vede chi ha il movimento ridotto.                         */
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const SRC = join(ROOT, 'assets-src', 'higgsfield', 'contro-caduta.png')
const OUT = join(ROOT, 'src', 'assets', 'foto')
const W = 2688, H = 1520, Q = 4, w = W / Q, h = H / Q
/* il fotogramma intero si serve a 800/1400/2000: ogni strato in proporzione */
const FOTOGRAMMI = [800, 1400, 2000]
/* il rettangolo dove cade il cubo, in frazioni del fotogramma */
/* largo: il mosso del cubo sborda a destra e in alto; le dita che ci
   cadono dentro restano alle mani grazie alle etichette */
const CUBO = { x0: .37, x1: .63, y0: .42, y1: .90 }

const ALFA = "format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='clip((0.2126*r(X,Y)+0.7152*g(X,Y)+0.0722*b(X,Y)-17)*255/26,0,255)'"
const px = execFileSync('ffmpeg', ['-v', 'error', '-i', SRC, '-vf', ALFA, '-f', 'rawvideo', '-pix_fmt', 'rgba', '-'], { maxBuffer: W * H * 4 + 1024 })
if (px.length !== W * H * 4) throw new Error(`atteso ${W}×${H}, letti ${px.length} byte`)

/* 1 · componenti connesse a 1/4 */
const luma = new Uint8Array(w * h)
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const i = ((y * Q) * W + x * Q) * 4
  luma[y * w + x] = Math.round(.2126 * px[i] + .7152 * px[i + 1] + .0722 * px[i + 2])
}
const lab = new Int32Array(w * h), comp = [0]
for (let s = 0; s < w * h; s++) {
  if (luma[s] <= 24 || lab[s]) continue
  const id = comp.length, c = { n: 0, x0: w, x1: 0, y0: h, y1: 0 }, st = [s]
  lab[s] = id
  while (st.length) {
    const k = st.pop(), x = k % w, y = (k / w) | 0
    c.n++; c.x0 = Math.min(c.x0, x); c.x1 = Math.max(c.x1, x); c.y0 = Math.min(c.y0, y); c.y1 = Math.max(c.y1, y)
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const X = x + dx, Y = y + dy
      if (X < 0 || Y < 0 || X >= w || Y >= h) continue
      const j = Y * w + X
      if (luma[j] > 24 && !lab[j]) { lab[j] = id; st.push(j) }
    }
  }
  comp.push(c)
}
/* è mano una componente grande che sta tutta da una parte e fuori dal cubo */
const dentroCubo = (c) => c.x0 / w >= CUBO.x0 - .01 && c.x1 / w <= CUBO.x1 + .01 && c.y0 / h >= CUBO.y0 - .06
const mano = comp.map((c, id) => id > 0 && c.n > 20 && !dentroCubo(c))
/* una cella è «di mano» se lo è lei o una vicina: i bordi tenui delle dita
   (sotto la soglia delle componenti) non devono partire col cubo */
const diMano = new Uint8Array(w * h)
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  let m = 0
  for (let dy = -1; dy <= 1 && !m; dy++) for (let dx = -1; dx <= 1 && !m; dx++) {
    const X = x + dx, Y = y + dy
    if (X >= 0 && Y >= 0 && X < w && Y < h && mano[lab[Y * w + X]]) m = 1
  }
  diMano[y * w + x] = m
}

/* 2 · tre buffer a fotogramma pieno */
const strati = { sx: Buffer.alloc(W * H * 4), dx: Buffer.alloc(W * H * 4), cubo: Buffer.alloc(W * H * 4) }
const bb = { sx: [W, 0, H, 0], dx: [W, 0, H, 0], cubo: [W, 0, H, 0] }
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = (y * W + x) * 4
  if (px[i + 3] === 0) continue
  const fx = x / W, fy = y / H
  const nelCubo = fx >= CUBO.x0 && fx <= CUBO.x1 && fy >= CUBO.y0 && fy <= CUBO.y1
  const k = nelCubo && !diMano[((y / Q) | 0) * w + ((x / Q) | 0)] ? 'cubo' : fx < .5 ? 'sx' : 'dx'
  px.copy(strati[k], i, i, i + 4)
  const b = bb[k]
  if (px[i + 3] > 32) { b[0] = Math.min(b[0], x); b[1] = Math.max(b[1], x); b[2] = Math.min(b[2], y); b[3] = Math.max(b[3], y) }
}

/* 3 · ritaglio con 8px di margine, varianti webp, posizione in % */
const pct = (v, t) => +(v / t * 100).toFixed(2)
for (const k of Object.keys(strati)) {
  let [x0, x1, y0, y1] = bb[k]
  x0 = Math.max(0, x0 - 8); y0 = Math.max(0, y0 - 8); x1 = Math.min(W - 1, x1 + 8); y1 = Math.min(H - 1, y1 + 8)
  const cw = x1 - x0 + 1, ch = y1 - y0 + 1, buf = Buffer.alloc(cw * ch * 4)
  for (let y = 0; y < ch; y++) strati[k].copy(buf, y * cw * 4, ((y0 + y) * W + x0) * 4, ((y0 + y) * W + x0 + cw) * 4)
  for (const F of FOTOGRAMMI) {
    const lw = Math.round(cw * F / W / 2) * 2
    execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${cw}x${ch}`, '-i', '-',
      '-vf', `scale=${lw}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', F > 1000 ? '76' : '80', '-pix_fmt', 'yuva420p',
      join(OUT, `caduta-${k}-${F}.webp`)], { input: buf })
  }
  console.log(`${k}: --x:${pct(x0, W)}%;--y:${pct(y0, H)}%;--w:${pct(cw, W)}%  (${cw}×${ch}px, rapporto ${(cw / ch).toFixed(4)})`)
}
