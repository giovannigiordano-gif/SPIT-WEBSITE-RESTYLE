import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync, brotliCompressSync, constants } from 'node:zlib'

const ROOT = fileURLToPath(new URL('../src/', import.meta.url))
const PORT = Number(process.env.PORT || 4321)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
}
/* Il testo viaggia compresso, come farà in produzione (qualsiasi CDN o
   hosting statico comprime): misurare Lighthouse su file non compressi
   darebbe numeri peggiori di quelli reali. Le immagini e i font sono già
   compressi nel loro formato.                                          */
const TESTO = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg'])
/* no-cache, non no-store: il browser rivalida a ogni richiesta (sviluppo:
   vedi sempre l'ultimo build) ma la pagina può entrare nella bfcache.  */
const CACHE = 'no-cache'

createServer(async (req, res) => {
  try {
    const url = decodeURIComponent(req.url.split('?')[0])
    let path = join(ROOT, normalize(url).replace(/^(\.\.[/\\])+/, ''))
    let s = await stat(path).catch(() => null)
    if (s?.isDirectory()) path = join(path, 'index.html')
    if (!s || s.isDirectory()) s = await stat(path).catch(() => null)
    if (!s) {
      res.writeHead(404, { 'content-type': 'text/plain' })
      return res.end('404')
    }
    let body = await readFile(path)
    const ext = extname(path)
    const headers = { 'content-type': MIME[ext] || 'application/octet-stream', 'cache-control': CACHE, vary: 'accept-encoding' }
    const accetta = String(req.headers['accept-encoding'] || '')
    if (TESTO.has(ext) && body.length > 1024) {
      if (/\bbr\b/.test(accetta)) { body = brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 9 } }); headers['content-encoding'] = 'br' }
      else if (/\bgzip\b/.test(accetta)) { body = gzipSync(body, { level: 9 }); headers['content-encoding'] = 'gzip' }
    }
    res.writeHead(200, headers)
    res.end(body)
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain' })
    res.end(String(err))
  }
}).listen(PORT, () => console.log(`serving src/ on http://localhost:${PORT}`))
