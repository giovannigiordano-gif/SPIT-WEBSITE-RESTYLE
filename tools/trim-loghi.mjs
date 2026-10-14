/* Ritaglia ogni logo cliente al bounding box reale del suo canale alpha e lo
   ricolora bianco. I PNG originali sono 300x300 con margini trasparenti
   enormi: senza questo passaggio un logo alto 30px rende il glifo a ~10px. */
import { execFileSync } from 'node:child_process'
import { readdirSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const IN = 'src/assets/clients', OUT = 'src/assets/clients-white'
mkdirSync(OUT, { recursive: true })
const N = 100   // griglia di campionamento

for (const f of readdirSync(IN).filter(x => x.endsWith('.png'))) {
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-i', join(IN, f),
    '-vf', `scale=${N}:${N}`, '-f', 'rawvideo', '-pix_fmt', 'rgba', '-'],
    { maxBuffer: 1 << 26 })
  let x0 = N, x1 = -1, y0 = N, y1 = -1
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (raw[(y * N + x) * 4 + 3] > 24) {
      if (x < x0) x0 = x; if (x > x1) x1 = x
      if (y < y0) y0 = y; if (y > y1) y1 = y
    }
  }
  if (x1 < 0) { console.log(f + ': vuoto, salto'); continue }
  // margine di 1 cella per non tagliare l'antialiasing
  const pad = 1
  const fx = Math.max(0, (x0 - pad) / N), fy = Math.max(0, (y0 - pad) / N)
  const fw = Math.min(1 - fx, (x1 - x0 + 1 + 2 * pad) / N)
  const fh = Math.min(1 - fy, (y1 - y0 + 1 + 2 * pad) / N)
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', join(IN, f), '-vf',
    `format=rgba,lutrgb=r=255:g=255:b=255,crop=iw*${fw.toFixed(4)}:ih*${fh.toFixed(4)}:iw*${fx.toFixed(4)}:ih*${fy.toFixed(4)},scale=-1:120`,
    join(OUT, f)])
  console.log(`${f}  ${(fw * 100).toFixed(0)}% x ${(fh * 100).toFixed(0)}% del quadro`)
}
