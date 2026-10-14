/* Contact sheet: N fotogrammi in griglia, ridotti, in un solo JPG.
     node tools/qa/foglio.mjs <out.jpg> <colonne> <scala> img1 img2 …
   Esempio: node tools/qa/foglio.mjs qa/f1/sheet-a.jpg 2 0.5 qa/f1/index-1440-s0{0,1,2,3}.jpg */
import { execFileSync } from 'node:child_process'
const [, , out, colsArg, scalaArg, ...imgs] = process.argv
const cols = Number(colsArg) || 2, scala = Number(scalaArg) || 0.5
const probe = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', imgs[0]]).toString().trim()
const [W, H] = probe.split(',').map(Number)
const w = Math.round(W * scala / 2) * 2, h = Math.round(H * scala / 2) * 2
const scaled = imgs.map((_, i) => `[${i}:v]scale=${w}:${h},pad=${w + 6}:${h + 6}:0:0:color=0x555555[v${i}]`).join(';')
const layout = imgs.map((_, i) => `${(i % cols) * (w + 6)}_${Math.floor(i / cols) * (h + 6)}`).join('|')
const f = imgs.length > 1
  ? `${scaled};${imgs.map((_, i) => `[v${i}]`).join('')}xstack=inputs=${imgs.length}:layout=${layout}:fill=0x555555[o]`
  : `[0:v]scale=${w}:${h}[o]`
execFileSync('ffmpeg', ['-y', '-v', 'error', ...imgs.flatMap(i => ['-i', i]), '-filter_complex', f, '-map', '[o]', '-q:v', '3', out])
console.log('foglio:', out)
