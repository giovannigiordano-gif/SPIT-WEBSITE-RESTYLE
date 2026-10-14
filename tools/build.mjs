/* Build statico: prende i frammenti in pages/, li avvolge con head, nav e
   footer condivisi, e scrive HTML completo in src/.
   Nav e footer finiscono nel markup servito (non iniettati da JS) perché
   l'LCP e l'indicizzazione non devono dipendere dal bundle. */
import { readFile, writeFile, readdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const PAGES = join(ROOT, 'pages')
const OUT = join(ROOT, 'src')

const NAV = [
  { href: '/metodo.html',    label: 'Metodo' },
  { href: '/risultati.html', label: 'Risultati' },
  { href: '/dna.html',       label: 'DNA' },
  { href: '/team.html',      label: 'Team' },
  { href: '/eventi.html',    label: 'Eventi' },
]
/* Fatturare³ resta nel menu mobile e nel footer: sei voci nella barra
   desktop la fanno sfondare a 1200px.                                 */
const NAV_EXTRA = [{ href: '/fatturare.html', label: 'Fatturare³' }]

/* Il logo è l'ASSET ORIGINALE del cliente (4118×1001). Un logo non si
   ridisegna: si usa. Due varianti tagliate dallo stesso file:
     logo.webp       mark + wordmark, per la nav
     logo-full.webp  lockup completo con il payoff, per il footer        */
const LOGO = (h, full = false) => {
  const f = full ? 'logo-full' : 'logo'
  const nh = full ? 1001 : 846
  return `<img class="marchio__img" src="/assets/brand/${f}.webp" alt="Sales Process" style="height:${h}px" width="4118" height="${nh}">`
}

/* Icone social disegnate, stessa convenzione del resto del sito: nessun
   glifo, nessuna webfont di icone.                                      */
const SOC = {
  fb: '<path d="M14.5 8.5h2.2V5.6h-2.4c-2.5 0-4 1.6-4 4.1v2.1H8.2v2.9h2.1V21h3.1v-6.3h2.3l.4-2.9h-2.7v-1.7c0-.9.4-1.6 1.1-1.6z"/>',
  ig: '<rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.6" fill="none" stroke="currentColor" stroke-width="1.75"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.75"/><circle cx="17" cy="7" r="1.2"/>',
  li: '<path d="M4.2 9.4h3v11.4h-3z"/><circle cx="5.7" cy="5.6" r="1.9"/><path d="M14.6 9.1c-1.5 0-2.6.7-3.1 1.6V9.4h-3v11.4h3v-6c0-1.5.7-2.4 1.9-2.4 1.1 0 1.7.8 1.7 2.4v6h3v-6.5c0-3.2-1.5-5.2-3.5-5.2z"/>',
  yt: '<path d="M21.1 8.3a2.6 2.6 0 0 0-1.8-1.8C17.7 6 12 6 12 6s-5.7 0-7.3.5A2.6 2.6 0 0 0 2.9 8.3C2.5 9.9 2.5 12 2.5 12s0 2.1.4 3.7a2.6 2.6 0 0 0 1.8 1.8C6.3 18 12 18 12 18s5.7 0 7.3-.5a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-3.7.4-3.7s0-2.1-.4-3.7z"/><path d="M10.2 15.1V8.9l5.2 3.1z" fill="#080706"/>',
};
const SOCIAL = [
  { k: 'li', n: 'LinkedIn',  u: 'https://www.linkedin.com/company/insider-crew/' },
  { k: 'ig', n: 'Instagram', u: 'https://www.instagram.com/salesprocessit/' },
  { k: 'yt', n: 'YouTube',   u: 'https://www.youtube.com/channel/UCEGb8y5mF0-CqjJ6-ktxqOw' },
  { k: 'fb', n: 'Facebook',  u: 'https://www.facebook.com/salesprocessitalia' },
];
const socialHtml = () => SOCIAL.map(s =>
  `<a href="${s.u}" target="_blank" rel="noopener" aria-label="${s.n}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${SOC[s.k]}</svg></a>`).join('')


/* ⚠ NUMERO VERDE DA FORNIRE. Non è pubblicato da nessuna parte su
   salesprocess.it e nell'immagine ricevuta le cifre non sono leggibili:
   un numero di telefono sbagliato è un danno reale, quindi resta un
   segnaposto dichiarato. Cambiare QUI e ricostruire.                    */
const TEL = { num: null, label: 'Numero verde da fornire' }
const telHref = TEL.num ? 'tel:' + TEL.num.replace(/\s/g, '') : null
const MAIL = 'amministrazione@salesprocess.it'

/* ── LE FRECCE DISEGNATE ───────────────────────────────────────────────────
   "→" e "↓" in coda al testo di un link diventano un'icona SVG: un glifo
   unicode cambia disegno a ogni font di fallback e lo screen reader lo
   legge ad alta voce ("freccia destra"). L'icona è aria-hidden e fa un
   passo nella sua direzione al passaggio (base.css, .freccia).          */
const ICO_FRECCIA = '<svg class="freccia" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 12h14.5M13.5 6.5 19 12l-5.5 5.5"/></svg>'
const ICO_GIU = '<svg class="freccia freccia--giu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4.5V19M6.5 13.5 12 19l5.5-5.5"/></svg>'
const ICO_PAUSA = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8.5 5.5v13M15.5 5.5v13"/></svg>'
const frecce = (html) => html
  .replace(/>❚❚</g, '>' + ICO_PAUSA + '<')
  .replace(/<span aria-hidden="true">→<\/span>/g, ICO_FRECCIA)
  .replace(/\s?→(?=\s*<\/(?:a|span|button)>)/g, ICO_FRECCIA)
  .replace(/\s?↓(?=\s*<\/(?:a|span|button)>)/g, ICO_GIU)

/* ── IL TESTO CHE SI COMPONE ───────────────────────────────────────────────
   Gli elementi con `data-split` escono dal build con ogni parola dentro una
   maschera: <span class="w" style="--w:N"><span>parola</span></span>.
   Lo split avviene QUI e non a runtime: niente SplitText che distrugge e
   ricrea i nodi quando arriva il webfont (il bug che affligge il
   riferimento), niente CLS, e il testo è già nel markup servito.
   I tag inline che attraversano più parole (<span class="ar">cadono per
   terra</span>) vengono chiusi e riaperti a ogni spazio, così l'annidamento
   resta valido e ogni parola tiene il suo colore.                        */
const VUOTO = /^(?:<[^>]+>)*$/
function parole(inner) {
  const tok = inner.match(/<[^>]+>|\s+|[^<\s]+/g) || []
  let out = '', parola = '', pila = [], k = 0
  const emetti = () => {
    if (!parola) return
    out += VUOTO.test(parola) ? parola : `<span class="w" style="--w:${k++}"><span>${parola}</span></span>`
    parola = ''
  }
  for (const t of tok) {
    if (/^\s+$/.test(t)) {
      parola += pila.slice().reverse().map(p => `</${p.nome}>`).join('')
      emetti(); out += ' '
      parola = pila.map(p => p.apre).join('')
    } else if (/^<br\b/i.test(t)) {
      parola += pila.slice().reverse().map(p => `</${p.nome}>`).join('')
      emetti(); out += t
      parola = pila.map(p => p.apre).join('')
    } else if (t.startsWith('</')) { pila.pop(); parola += t }
    else if (t.startsWith('<')) { pila.push({ nome: t.match(/^<(\w+)/)[1], apre: t }); parola += t }
    else parola += t
  }
  emetti()
  return out
}
function spezza(html) {
  const apre = /<(\w+)\b[^>]*\sdata-split\b[^>]*>/g
  let out = '', da = 0, m
  while ((m = apre.exec(html))) {
    const nome = m[1], dentro = apre.lastIndex
    const tag = new RegExp(`<(/?)${nome}\\b[^>]*>`, 'g'); tag.lastIndex = dentro
    let livello = 1, t
    while ((t = tag.exec(html))) { livello += t[1] ? -1 : 1; if (!livello) break }
    if (!t) break
    out += html.slice(da, dentro) + parole(html.slice(dentro, t.index))
    da = t.index; apre.lastIndex = t.index
  }
  return out + html.slice(da)
}

/* ── IL PALCO ─────────────────────────────────────────────────────────────
   Il fondo fisso di tutto il sito, con le sette atmosfere in dissolvenza
   incrociata (sfondi.css). motion.js accende quella della sezione al
   centro del viewport; l'html nasce già su "nero", il palco dell'apertura. */
const ATMO = ['nero', 'brace', 'alba', 'radente', 'notte', 'pozzo', 'fuoco']
const palco = () => `<div class="palco" aria-hidden="true">${ATMO.map(a => `<i data-a="${a}"></i>`).join('')}</div>`

/* La fascia è UN link: prima il bersaglio era la sola pill, che sotto i
   560px si riduceva a un ovale nero di 20×26px.                        */
const barra = () => `
<div class="barra" id="barra">
  <a class="barra__link" href="/eventi.html">
    <span class="barra__dot" aria-hidden="true"></span>
    <span>Sales Process Day 2026</span>
    <span class="barra__sep barra__data" aria-hidden="true">·</span>
    <span class="barra__data">14 ottobre · Milano</span>
    <span class="barra__slot barra__sep" aria-hidden="true">·</span>
    <span class="barra__slot">30 posti in sala</span>
    <span class="barra__pill"><span>Prendi il tuo posto</span>${ICO_FRECCIA}</span>
  </a>
  <button class="barra__x" id="barra-x" aria-label="Chiudi l'annuncio">
    <svg width="12" height="12" viewBox="0 0 11 11" aria-hidden="true"><path d="M1 1l9 9M10 1l-9 9" stroke="currentColor" stroke-width="1.6"/></svg>
  </button>
</div>`

const corrente = (href, slug) => href === '/' + slug + '.html' ? ' aria-current="page"' : ''

const nav = (slug) => `
<header class="nav" id="nav">
  <div class="wrap wrap--nav nav__in">
    <a class="marchio" href="/" aria-label="Sales Process, home">
      ${LOGO(30)}
    </a>
    <nav class="nav__voci" aria-label="Principale">
      ${NAV.map(v => `<a href="${v.href}"${corrente(v.href, slug)}>${v.label}</a>`).join('\n      ')}
    </nav>
    <div class="nav__dx">
      ${telHref
        ? `<div class="gruppo" aria-label="Contatti rapidi"><a class="is-on" href="${telHref}">Chiama</a><a href="mailto:${MAIL}">Scrivi</a></div>`
        : `<a class="nav__login" href="mailto:${MAIL}">Scrivici</a>`}
      <a class="nav__login" href="/fatturare.html">Podcast</a>
      <a class="cta cta--ar cta--luce cta--nav" href="/candidatura.html">Candida la tua azienda</a>
      <button class="burger" id="burger" aria-label="Apri il menu" aria-expanded="false" aria-controls="menu"><span></span></button>
    </div>
  </div>
</header>

<div class="menu" id="menu">
  ${[...NAV, ...NAV_EXTRA, { href: '/candidatura.html', label: 'Candidatura' }]
    .map((v, i) => `<a href="${v.href}" style="--i:${i}"${corrente(v.href, slug)}>${v.label}${ICO_FRECCIA}</a>`).join('\n  ')}
  <a class="cta cta--ar" href="/candidatura.html" style="--i:7">Candida la tua azienda</a>
  <div class="menu__contatti">
    <a href="mailto:${MAIL}" style="--i:8">${MAIL}</a>
  </div>
</div>`

const footer = () => `
<footer class="footer">
  <div class="wrap wrap--piena">
    <div class="footer__grid">
      <div>
        <a class="marchio" href="/" aria-label="Sales Process, home">${LOGO(54, true)}</a>
        <p class="t-piccolo" style="margin-top:var(--s-4);max-inline-size:30ch;color:var(--c-t3)">Quattro reparti sotto lo stesso tetto. Un numero solo da guardare: il tuo fatturato.</p>
        <div class="footer__social">${socialHtml()}</div>
      </div>
      <div><h2 class="footer__h">Metodo</h2><ul>
        <li><a href="/metodo.html">Il 4 in 1</a></li>
        <li><a href="/metodo.html#tabella">Cosa entra, cosa esce</a></li>
        <li><a href="/metodo.html#contro">Perché non quattro fornitori</a></li>
        <li><a href="/candidatura.html#filtro">Chi entra, chi no</a></li>
      </ul></div>
      <div><h2 class="footer__h">Risultati</h2><ul>
        <li><a href="/risultati.html">I fascicoli</a></li>
        <li><a href="/risultati.html#numeri">I numeri</a></li>
        <li><a href="/risultati.html#settori">I 33 settori</a></li>
        <li><a href="/risultati.html#carta">Certificazione</a></li>
      </ul></div>
      <div><h2 class="footer__h">Fatturare³</h2><ul>
        <li><a href="/fatturare.html">Il podcast</a></li>
        <li><a href="/fatturare.html#articoli">Gli articoli</a></li>
        <li><a href="/eventi.html">Sales Process Day</a></li>
        <li><a href="/fatturare.html#libri">I due libri</a></li>
      </ul></div>
      <div><h2 class="footer__h">Azienda</h2><ul>
        <li><a href="/dna.html">Il nostro DNA</a></li>
        <li><a href="/team.html">Il team</a></li>
        <li><a href="/team.html#lavora">Lavora con noi</a></li>
        <li><a href="/candidatura.html">Candidatura</a></li>
        <li><a href="mailto:amministrazione@salesprocess.it">Contatti</a></li>
      </ul>
      </div>
      <div class="footer__contatti">
        <h2 class="footer__h">Contatti</h2>
        <${telHref ? 'a' : 'div'} class="verde"${telHref ? ` href="${telHref}" aria-label="Chiama il numero verde"` : ''}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 3.5c.8 0 1.5.5 1.8 1.2l1 2.5c.3.7.1 1.5-.5 2l-1.1.9a11 11 0 0 0 4.9 4.9l.9-1.1c.5-.6 1.3-.8 2-.5l2.5 1a1.9 1.9 0 0 1 1.2 1.8v2.2c0 1.1-.9 2-2 2A16.6 16.6 0 0 1 4.4 5.5c0-1.1.9-2 2-2z"/></svg>
          <span><em>Numero Verde</em><b class="verde__n">${TEL.num || TEL.label}</b></span>
        </${telHref ? 'a' : 'div'}>
        <a class="footer__mail link-wipe" href="mailto:amministrazione@salesprocess.it">amministrazione@<wbr>salesprocess.it</a>
        <p class="t-piccolo footer__sedi"><b>Uffici di rappresentanza</b><br>Via Marco D’Agrate 41, Milano (MI) 20139</p>
        <p class="t-piccolo footer__sedi"><b>Sede legale</b><br>Piazza IV Novembre, Capiago Intimiano (CO) 22070</p>
      </div>
    </div>
    <div class="footer__legale">
      <span><em>[Ragione sociale]</em></span>
      <span>P.IVA <em>[da cliente]</em></span>
      <span>ISO 9001:2015 n. <em>[da cliente]</em></span>
      <a href="https://www.iubenda.com/privacy-policy/61378305" target="_blank" rel="noopener" class="link-wipe">Privacy Policy</a>
      <a href="https://www.iubenda.com/privacy-policy/61378305/cookie-policy" target="_blank" rel="noopener" class="link-wipe">Cookie Policy</a>
      <span>Dati aggiornati al 09.09.2026</span>
    </div>
    <div class="footer__chiusa" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
  </div>
</footer>

<div class="piastra is-off" id="piastra">
  <a class="cta cta--ar" href="/candidatura.html">Candida la tua azienda</a>
</div>

<div class="grana" aria-hidden="true"></div>`

const shell = ({ title, desc, slug, body }) => `<!doctype html>
<html lang="it" data-atmo="nero">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#161519">
<link rel="icon" href="/assets/brand/favicon.svg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Instrument+Serif:ital@1&display=swap">

<link rel="stylesheet" href="/css/tokens.css">
<link rel="stylesheet" href="/css/type.css">
<link rel="stylesheet" href="/css/base.css">
<link rel="stylesheet" href="/css/chrome.css">
<link rel="stylesheet" href="/css/sfondi.css">
<link rel="stylesheet" href="/css/sections.css">
<link rel="stylesheet" href="/css/infografica.css">
<link rel="stylesheet" href="/css/motion.css">
<link rel="stylesheet" href="/css/interazioni.css">
</head>
<body data-pagina="${slug}">
${palco()}
<a class="skip" href="#main">Salta al contenuto</a>
${barra()}
${nav(slug)}
<div class="avanza" aria-hidden="true"></div>

<main id="main">
${body}
</main>
${footer()}

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js" defer></script>
<script src="/js/dati.js"></script>
<script src="/js/motion.js" defer></script>
</body>
</html>
`

const files = (await readdir(PAGES)).filter(f => f.endsWith('.html'))
for (const f of files) {
  const raw = await readFile(join(PAGES, f), 'utf8')
  const m = raw.match(/^<!--\s*([\s\S]*?)-->\s*/)
  const meta = {}
  if (m) for (const line of m[1].split('\n')) {
    const kv = line.match(/^\s*(\w+):\s*(.*?)\s*$/)
    if (kv) meta[kv[1]] = kv[2]
  }
  const slug = f.replace(/\.html$/, '')
  const out = frecce(shell({
    title: meta.title || 'Sales Process',
    desc: meta.desc || '',
    slug: slug === 'index' ? 'home' : slug,
    body: spezza(raw.slice(m ? m[0].length : 0)),
  }))
  await writeFile(join(OUT, f), out)
  console.log('→ src/' + f + '  (' + out.length + ' byte)')
}
