import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

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
    const body = await readFile(path)
    res.writeHead(200, {
      'content-type': MIME[extname(path)] || 'application/octet-stream',
      'cache-control': 'no-store',
    })
    res.end(body)
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain' })
    res.end(String(err))
  }
}).listen(PORT, () => console.log(`serving src/ on http://localhost:${PORT}`))
