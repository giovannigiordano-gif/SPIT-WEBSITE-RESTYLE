/* Riassunto dei report di audit (tools/qa/run-audit.sh).
     node tools/qa/riassunto.mjs qa/audit-r2
   Per ogni larghezza e pagina: overflow orizzontale reale, elementi che
   sporgono, bersagli touch sotto i 44px (solo < 800px), testo sotto i 12px,
   immagini senza alt, e il log di console / rete.                        */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const dir = process.argv[2] || 'qa/audit'
const file = readdirSync(dir).filter(f => /^report-\d+\.json$/.test(f)).sort((a, b) => parseInt(b.slice(7)) - parseInt(a.slice(7)))
let problemi = 0
for (const f of file) {
  let raw = readFileSync(join(dir, f), 'utf8').trim()
  /* playwright-cli --raw restituisce la stringa JSON fra virgolette */
  if (raw.startsWith('"')) raw = JSON.parse(raw)
  const { width, report, log } = JSON.parse(raw)
  const righe = []
  for (const r of report) {
    const note = []
    if (r.scrollX > 0) note.push(`OVERFLOW scrollX=${r.scrollX}`)
    if (r.sporge?.length) note.push(`sporge: ${r.sporge.slice(0, 4).join(', ')}`)
    if (width < 800 && r.piccoli?.length) note.push(`tap<44: ${r.piccoli.slice(0, 4).join(' | ')}${r.piccoli.length > 4 ? ` (+${r.piccoli.length - 4})` : ''}`)
    if (r.minuti?.length) note.push(`testo<12: ${r.minuti.slice(0, 3).join(' | ')}`)
    if (r.senzaAlt?.length) note.push(`senza alt: ${r.senzaAlt.length}`)
    if (note.length) { problemi += note.length; righe.push(`  ${r.pagina}: ${note.join(' · ')}`) }
  }
  /* ERR_ABORTED = richiesta annullata dal browser perché l'audit è già
     passato alla pagina dopo (tipicamente un'immagine lazy): non è un
     errore del sito, si conta a parte */
  const annullate = (log || []).filter(l => l.t === 'reqfail' && /ERR_ABORTED/.test(l.x))
  const errori = (log || []).filter(l => l.t !== 'warning' && !annullate.includes(l))
  if (errori.length) { problemi += errori.length; righe.push(`  log: ${errori.slice(0, 5).map(l => `${l.t} ${l.x.slice(0, 90)}`).join(' | ')}`) }
  if (annullate.length) righe.push(`  (${annullate.length} richieste annullate al cambio pagina, non contate)`)
  console.log(`${width}px — ${report.length} pagine${righe.length ? '' : ' · pulito'}`)
  righe.forEach(r => console.log(r))
}
console.log(problemi ? `\n${problemi} rilievi` : '\nnessun rilievo')
