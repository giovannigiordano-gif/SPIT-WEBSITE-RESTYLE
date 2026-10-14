/* Confronti prima/dopo per la consegna: docs/prima-dopo/*.jpg
     node tools/qa/prima-dopo.mjs
   PRIMA = ritagli dell'audit iniziale (qa/audit-prima, sito all'handoff).
   DOPO  = fotogrammi reali catturati ora con tools/qa/dopo.js.           */
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const ROOT = fileURLToPath(new URL('../../', import.meta.url))
const Q = join(ROOT, 'qa', 'prima-dopo'), D = join(ROOT, 'docs', 'prima-dopo'), P = join(ROOT, 'qa', 'audit-prima')
mkdirSync(Q, { recursive: true }); mkdirSync(D, { recursive: true })
const win = (p) => p.replace(/\\/g, '/')

// 1 · i fotogrammi "dopo"
const script = readFileSync(join(ROOT, 'tools/qa/dopo.js'), 'utf8').replaceAll('__OUT__', win(Q))
// fuori dal progetto: il percorso «Nuovo sito spit» ha spazi e playwright-cli.cmd passa per la shell
const tmp = join(tmpdir(), 'sp-dopo.js'); writeFileSync(tmp, script)
execFileSync('playwright-cli', ['--raw', 'run-code', '--filename=' + win(tmp)], { stdio: 'inherit', shell: true })
rmSync(tmp)

// 2 · i ritagli "prima" (coordinate dalle sezioni di qa/audit-prima/report-1440.json)
const ff = (args) => execFileSync('ffmpeg', ['-y', '-v', 'error', ...args])
const taglia = (src, y, h, out) => ff(['-i', join(P, src), '-vf', `crop=iw:${h}:0:${y}`, '-q:v', '3', join(Q, out)])
taglia('index-1440-full.jpg', 4065, 900, 'p-cosa-1440.jpg')
taglia('index-1440-full.jpg', 3210, 900, 'p-numeri-1440.jpg')
taglia('index-1440-full.jpg', 3615, 900, 'p-giuntura-1440.jpg')
taglia('index-1440-full.jpg', 7256, 900, 'p-macchina-1440.jpg')
taglia('eventi-1440-full.jpg', 1131, 900, 'p-programma-1440.jpg')
// il «prima» del primo scroll è la stessa pagina scesa degli stessi 420px del «dopo»
taglia('index-1440-full.jpg', 420, 900, 'p-hero-1440-scroll.jpg')

// 3 · affiancati con le etichette
const FONT = 'C\\:/Windows/Fonts/arialbd.ttf'
const coppia = (prima, dopo, nome, larg = 960) => {
  const et = (txt) => `drawbox=x=0:y=0:w=iw:h=44:color=0x0b0a0c@1:t=fill,drawtext=fontfile='${FONT}':text='${txt}':x=20:y=13:fontsize=20:fontcolor=0xFF9A38`
  ff(['-i', join(Q, prima), '-i', join(Q, dopo), '-filter_complex',
    `[0:v]scale=${larg}:-2,pad=iw:ih+44:0:44:color=0x0b0a0c,${et('PRIMA (handoff)')}[a];` +
    `[1:v]scale=${larg}:-2,pad=iw:ih+44:0:44:color=0x0b0a0c,${et('DOPO (restyling-wow)')}[b];` +
    `[a][b]hstack=inputs=2:shortest=0[o]`, '-map', '[o]', '-q:v', '4', join(D, nome)])
  console.log('→ docs/prima-dopo/' + nome)
}
ff(['-i', join(P, 'index-1440-piega.jpg'), '-q:v', '3', join(Q, 'p-hero-1440.jpg')])
ff(['-i', join(P, 'index-390-piega.jpg'), '-q:v', '3', join(Q, 'p-hero-390.jpg')])
coppia('p-hero-1440.jpg', 'hero-1440.jpg', '01-hero-desktop.jpg')
coppia('p-hero-1440-scroll.jpg', 'hero-1440-scroll.jpg', '02-hero-primo-scroll.jpg')
coppia('p-giuntura-1440.jpg', 'giuntura-1440.jpg', '03-giuntura-fra-sezioni.jpg')
coppia('p-numeri-1440.jpg', 'numeri-1440.jpg', '04-numeri.jpg')
coppia('p-cosa-1440.jpg', 'cosa-1440.jpg', '05-cosa-facciamo.jpg')
coppia('p-macchina-1440.jpg', 'macchina-1440.jpg', '06-macchina.jpg')
coppia('p-programma-1440.jpg', 'programma-1440.jpg', '07-eventi-programma.jpg')
coppia('p-hero-390.jpg', 'hero-390.jpg', '08-hero-mobile.jpg', 390)
