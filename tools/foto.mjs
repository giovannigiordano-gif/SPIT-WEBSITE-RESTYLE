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
/* Le scene di lavoro dei quattro reparti (giro 4: «più realistiche, meno
   simboliche») sono fotografie intere dentro un pannello: niente alfa, il
   loro buio è la stanza, non il fondo da togliere.                     */
const OPACHE = (nome) => nome.startsWith('reparto-')
const fatte = []
/* node tools/foto.mjs reparto-  → solo le immagini il cui nome inizia così */
const FILTRO = process.argv[2] || ''
for (const f of readdirSync(SRC).filter(f => f.endsWith('.png') && f.startsWith(FILTRO))) {
  const nome = f.replace('.png', '')
  const misure = LARGHE.includes(nome) ? [800, 1400, 2000] : [480, 800, 1200]
  for (const w of misure) {
    const dst = join(OUT, `${nome}-${w}.webp`)
    execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', join(SRC, f),
      '-vf', OPACHE(nome) ? `scale=${w}:-2:flags=lanczos` : `scale=${w}:-2:flags=lanczos,${ALFA}`,
      '-c:v', 'libwebp', '-quality', w > 1000 ? '76' : '80', '-pix_fmt', OPACHE(nome) ? 'yuv420p' : 'yuva420p', dst])
    fatte.push(`${nome}-${w}.webp`)
  }
}
console.log(fatte.length + ' varianti → src/assets/foto/')
