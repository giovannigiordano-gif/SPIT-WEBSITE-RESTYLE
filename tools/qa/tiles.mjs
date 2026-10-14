/* Taglia uno screenshot full-page in "fogli" leggibili.
     node tools/qa/tiles.mjs <img> [altezzaStriscia] [colonne]
   Desktop: colonne=1 → un file per striscia (img-t01.jpg, img-t02.jpg…)
   Mobile:  colonne=4 → le strisce affiancate, così un telefono intero si
            legge in due o tre fogli invece che in venti.               */
import { execFileSync } from 'node:child_process'
import { dirname, basename, join } from 'node:path'

const [, , img, hArg, cArg] = process.argv
if (!img) { console.error('uso: node tools/qa/tiles.mjs <img> [h] [colonne]'); process.exit(1) }
const probe = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', img]).toString().trim()
const [W, H] = probe.split(',').map(Number)
const h = Number(hArg) || (W > 800 ? 1600 : 1500)
const cols = Number(cArg) || (W > 800 ? 1 : 4)
const n = Math.ceil(H / h)
const base = join(dirname(img), 'fogli', basename(img).replace(/\.\w+$/, ''))
execFileSync('node', ['-e', `require('fs').mkdirSync(${JSON.stringify(dirname(base))},{recursive:true})`])

const out = []
for (let s = 0; s < n; s += cols) {
  const k = Math.min(cols, n - s)
  const parts = [], labels = []
  for (let j = 0; j < k; j++) {
    const y = (s + j) * h
    const hh = Math.min(h, H - y)
    // ogni striscia viene portata a h con pad nero, poi un filetto di 6px fra le colonne
    parts.push(`[0:v]crop=${W}:${hh}:0:${y},pad=${W + (cols > 1 ? 6 : 0)}:${h}:0:0:color=0x333333[s${j}]`)
    labels.push(`[s${j}]`)
  }
  const f = k > 1 ? `${parts.join(';')};${labels.join('')}hstack=inputs=${k}[o]` : `${parts[0].replace(`[s0]`, '[o]')}`
  const file = `${base}-f${String(s / cols + 1).padStart(2, '0')}.jpg`
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', img, '-filter_complex', f, '-map', '[o]', '-q:v', '3', file])
  out.push(file)
}
console.log(`${basename(img)} ${W}x${H} → ${out.length} fogli (${h}px × ${cols} col)`)
