/* Genera le varianti ridotte delle immagini servite (ffmpeg, libwebp).
     node tools/immagini.mjs
   Gli originali restano dove sono e restano la sorgente: le varianti si
   rigenerano quando il cliente manda asset nuovi. Lighthouse segnalava
   ~260 KB di immagini più grandi del necessario su mobile: il logo da
   4118px mostrato alto 30px, i ritratti da 640px mostrati a 270px, i loghi
   clienti in PNG.                                                       */
import { execFileSync } from 'node:child_process'
import { readdirSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const A = fileURLToPath(new URL('../src/assets/', import.meta.url))
const ff = (args) => execFileSync('ffmpeg', ['-y', '-v', 'error', ...args])
const kb = (p) => Math.round(statSync(p).size / 1024) + 'K'

/* larghezza fissa, altezza proporzionale */
const larga = (src, dst, w, q = 80) => { ff(['-i', src, '-vf', `scale=${w}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', String(q), dst]); return dst }
/* altezza fissa, per i loghi (bianchi su trasparente: lossless, niente
   frange sul canale alpha) */
const alta = (src, dst, h) => { ff(['-i', src, '-vf', `scale=-2:${h}:flags=lanczos`, '-c:v', 'libwebp', '-lossless', '1', '-pix_fmt', 'yuva420p', dst]); return dst }

const fatti = []
// marchio: nav (30px), titolo del tetto (~76px), footer (54px)
fatti.push(alta(join(A, 'brand/logo.webp'), join(A, 'brand/logo-h64.webp'), 64))
fatti.push(alta(join(A, 'brand/logo.webp'), join(A, 'brand/logo-h160.webp'), 160))
fatti.push(alta(join(A, 'brand/logo-full.webp'), join(A, 'brand/logo-full-h112.webp'), 112))
// loghi clienti: mostrati al massimo a 44px d'altezza → 90px copre il 2x
for (const f of readdirSync(join(A, 'clients-white')).filter(f => f.endsWith('.png')))
  fatti.push(alta(join(A, 'clients-white', f), join(A, 'clients-white', f.replace('.png', '.webp')), 90))
// ritratti: 272px a schermo → 400 per l'1,5x; l'originale da 640 resta per il 2x
for (const f of readdirSync(join(A, 'team-webp')).filter(f => f.endsWith('.webp') && !f.includes('-400')))
  fatti.push(larga(join(A, 'team-webp', f), join(A, 'team-webp', f.replace('.webp', '-400.webp')), 400, 78))
// mani e pugni: su mobile occupano ~140–200px di larghezza
for (const f of ['hand-bw', 'hand-pen', 'hand-contract', 'hand-graduation', 'extra-1', 'extra-2'])
  fatti.push(larga(join(A, 'webp', f + '.webp'), join(A, 'webp', f + '-320.webp'), 320, 80))
// locandine video: 720 → 400 per le celle piccole
for (const f of readdirSync(join(A, 'video')).filter(f => f.endsWith('.webp') && !f.includes('-400')))
  fatti.push(larga(join(A, 'video', f), join(A, 'video', f.replace('.webp', '-400.webp')), 400, 78))

for (const p of fatti) if (existsSync(p)) console.log('→', p.replace(A, ''), kb(p))
