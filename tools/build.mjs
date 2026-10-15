/* Build statico: prende i frammenti in pages/, li avvolge con head, nav e
   footer condivisi, e scrive HTML completo in src/.
   Nav e footer finiscono nel markup servito (non iniettati da JS) perché
   l'LCP e l'indicizzazione non devono dipendere dal bundle. */
import { readFile, writeFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { createHash } from 'node:crypto'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const PAGES = join(ROOT, 'pages')
const OUT = join(ROOT, 'src')

/* Il logo è l'ASSET ORIGINALE del cliente (4118×1001). Un logo non si
   ridisegna: si usa. Ritocchi del 15.10 («metti il logo corretto»): la
   variante senza payoff era stata ottenuta TAGLIANDO il file in altezza, e
   il taglio mozzava l'ultimo quadrato del marchio. Ora ovunque il lockup
   intero — marchio completo, nome e payoff — come nell'intestazione del
   sito ufficiale. Variante a misura (tools/immagini.mjs): il PNG da 4118px
   mostrato alto 40px pesava come una fotografia.
   presto: nella nav è sopra la piega, non si rimanda.                  */
const LOGO = (h, presto = false) => `<img class="marchio__img" src="/assets/brand/logo-full-h112.webp" alt="Sales Process" style="height:${h}px" width="461" height="112"${presto ? '' : ' loading="lazy"'} decoding="async">`

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
/* Due involucri per la stessa parola. La MASCHERA (data-split): la parola
   sale dentro un ritaglio. L'ACCESA (data-accendi, giro 3 effetti): la
   parola resta ferma e si accende, grigia → bianca, quando la linea di
   lettura la raggiunge; il contenitore riceve il totale (--n) per
   distribuire le accensioni sulla frase.                               */
const MASCHERA = (k, p) => `<span class="w" style="--w:${k}"><span>${p}</span></span>`
const ACCESA = (k, p) => `<span class="acc" style="--k:${k}">${p}</span>`
function parole(inner, avvolgi = MASCHERA) {
  const tok = inner.match(/<[^>]+>|\s+|[^<\s]+/g) || []
  let out = '', parola = '', pila = [], k = 0
  const emetti = () => {
    if (!parola) return
    out += VUOTO.test(parola) ? parola : avvolgi(k++, parola)
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
function spezza(html, attr = 'data-split', avvolgi = MASCHERA) {
  const apre = new RegExp(`<(\\w+)\\b[^>]*\\s${attr}\\b[^>]*>`, 'g')
  let out = '', da = 0, m
  while ((m = apre.exec(html))) {
    const nome = m[1], dentro = apre.lastIndex
    const tag = new RegExp(`<(/?)${nome}\\b[^>]*>`, 'g'); tag.lastIndex = dentro
    let livello = 1, t
    while ((t = tag.exec(html))) { livello += t[1] ? -1 : 1; if (!livello) break }
    if (!t) break
    const corpo = parole(html.slice(dentro, t.index), avvolgi)
    let apertura = m[0]
    if (avvolgi === ACCESA) {
      const n = (corpo.match(/class="acc"/g) || []).length
      apertura = /\sstyle="/.test(apertura) ? apertura.replace(/\sstyle="([^"]*)"/, ` style="$1;--n:${n}"`) : apertura.replace(/>$/, ` style="--n:${n}">`)
    }
    out += html.slice(da, m.index) + apertura + corpo
    da = t.index; apre.lastIndex = t.index
  }
  return out + html.slice(da)
}

/* ── IL PALCO ─────────────────────────────────────────────────────────────
   Il fondo fisso di tutto il sito, con le sette atmosfere in dissolvenza
   incrociata (sfondi.css). motion.js accende quella della sezione al
   centro del viewport; l'html nasce già su "nero", il palco dell'apertura. */
const ATMO = ['nero', 'brace', 'alba', 'radente', 'notte', 'pozzo', 'fuoco']

/* ── LA FOTO CHE PASSA DI MANO (giro 3 effetti) ───────────────────────────
   Dal menu, la fotografia della pagina sotto il cursore VOLA al suo posto
   nell'apertura della pagina nuova (View Transitions fra documenti, con un
   nome dato al volo: motion.js nella pagina che parte, pagereveal qui nel
   <head> in quella che arriva). Il nome va dato prima del primo
   fotogramma, quindi il primo fotogramma aspetta che l'elemento sia stato
   letto: <link rel="expect" blocking="render">.                         */
const ATTESA = { metodo: 'foto-pagina', risultati: 'foto-pagina', dna: 'foto-pagina', eventi: 'foto-pagina', fatturare: 'foto-pagina', candidatura: 'foto-pagina', team: 'scala-volti' }
/* LA POLVERE (ritocchi del 15.10, «effetti di sfondo leggeri»): pochi
   quadrati del marchio, minuscoli e quasi spenti, sospesi nel palco su due
   piani. Posizioni deterministiche (stesso risultato a ogni build). */
const polvere = (() => {
  let s = 11; const r = () => (s = (s * 9301 + 49297) % 233280) / 233280
  const strato = (n, cls, [s0, s1], [o0, o1], [d0, d1], arancio) => `<div class="palco__polvere ${cls}">${Array.from({ length: n }, (_, i) => {
    const x = (r() * 94 + 3).toFixed(1), y = (r() * 160 - 30).toFixed(1), z = (s0 + r() * (s1 - s0)).toFixed(1)
    const o = (o0 + r() * (o1 - o0)).toFixed(2), d = Math.round(d0 + r() * (d1 - d0))
    return `<i${arancio.includes(i) ? ' class="ar"' : ''} style="--x:${x}vw;--y:${y}vh;--s:${z}px;--o:${o};--d:${d}vh"></i>`
  }).join('')}</div>`
  return strato(6, 'palco__polvere--lontana', [3.5, 5], [.05, .09], [16, 40], [2]) +
         strato(6, 'palco__polvere--vicina', [5, 7.5], [.06, .11], [45, 95], [1, 4])
})()
const palco = () => `<div class="palco" aria-hidden="true">${ATMO.map(a => `<i data-a="${a}"></i>`).join('')}${polvere}<b class="palco__torcia"></b></div>`

/* IL SIPARIO (ritocchi del 15.10, «preloader e transizioni fra le
   pagine»): quattro gradini scuri e il logo. Alla prima pagina della
   sessione fa da preloader (il logo, il filo che si carica, poi i gradini
   salgono uno per uno); nei browser senza View Transitions fra documenti
   fa da passaggio fra le pagine (motion.js lo chiude, la pagina nuova lo
   riapre). Lo governa uno script nel <head>, prima del primo fotogramma.
   Finché copre intercetta i clic (un clic, un tasto o la rotella lo fanno
   salire subito: niente clic a vuoto sui bottoni nascosti sotto); dura
   ~0,7s, mai sulla candidatura, e non esiste a movimento ridotto.     */
const sipario = () => `<div class="sipario" aria-hidden="true"><i style="--k:0"></i><i style="--k:1"></i><i style="--k:2"></i><i style="--k:3"></i><span class="sipario__marchio"><img src="/assets/brand/logo-full-h112.webp" alt="" width="461" height="112" decoding="async"></span><span class="sipario__filo"></span></div>`

/* La fascia è UN link: prima il bersaglio era la sola pill, che sotto i
   560px si riduceva a un ovale nero di 20×26px.                        */
const barra = () => `
<div class="barra" id="barra">
  <a class="barra__link" href="/candidatura.html">
    <span class="barra__dot" aria-hidden="true"></span>
    <span>Vuoi collaborare con noi?</span>
    <span class="barra__invito"><span>Candida la tua azienda</span>${ICO_FRECCIA}</span>
  </a>
  <button class="barra__x" id="barra-x" aria-label="Chiudi l'annuncio">
    <svg width="12" height="12" viewBox="0 0 11 11" aria-hidden="true"><path d="M1 1l9 9M10 1l-9 9" stroke="currentColor" stroke-width="1.6"/></svg>
  </button>
</div>`

const corrente = (href, slug) => href === '/' + slug + '.html' ? ' aria-current="page"' : ''

/* ── IL MENU A CARD GIGANTE (giro 4) ──────────────────────────────────────
   «Il menu con effetto wow, soprattutto da desktop, magari a card
   gigante». L'header resta essenziale (logo, candidatura, Menu) e il
   menu è una CARD quasi a tutto schermo che si apre dall'angolo del
   bottone: le pagine a corpo da titolo e, su desktop, al passaggio su
   ogni voce la fotografia di quella pagina. Le foto si caricano solo
   alla prima apertura (data-src).                                     */
const VOCI_MENU = [
  /* 15.10: «nel menu togli le didascalie» — restano solo i nomi delle pagine */
  { href: '/metodo.html',      label: 'Metodo',      foto: 'metodo-scalinata' },
  { href: '/risultati.html',   label: 'Risultati',   foto: 'risultati-scontrino' },
  { href: '/dna.html',         label: 'DNA',         foto: 'dna-bussola' },
  { href: '/team.html',        label: 'Team',        foto: 'team' },
  { href: '/eventi.html',      label: 'Eventi',      foto: 'eventi-biglietto' },
  { href: '/fatturare.html',   label: 'Fatturare³',  foto: 'fatturare-microfono' },
  { href: '/candidatura.html', label: 'Candidatura', foto: 'candidatura-caffe' },
]
/* Il Team non ha un oggetto: nell'anteprima, come nella sua apertura, i
   cinque volti disposti come i cinque quadrati del marchio.            */
const VOLTI_MENU = [['frisoni', 23.6, 0, 30.4], ['bardolla', 0, 30.4, 25.2], ['ratti', 21.4, 53.8, 21], ['elicio', 40.6, 72.6, 17.4], ['amodio', 29.4, 85.8, 14.2]]
const anteprima = (v) => v.foto === 'team'
  ? `<div class="menu__ant menu__ant--volti" data-foto="team">${VOLTI_MENU.map(([f, x, y, l]) => `<img data-src="/assets/team-webp/${f}-400.webp" alt="" width="400" height="400" style="--x:${x};--y:${y};--l:${l}">`).join('')}</div>`
  : `<img class="menu__ant" data-foto="${v.foto}" data-src="/assets/foto/${v.foto}-800.webp" alt="" width="1200" height="1500">`

const nav = (slug) => `
<header class="nav" id="nav">
  <div class="wrap wrap--nav nav__in">
    <a class="marchio" href="/" aria-label="Sales Process, home">
      ${LOGO(40, true)}
    </a>
    <!-- Il capitolo in cui sei (motion.js, dalle sezioni con data-cap):
         solo orientamento, i lettori di schermo hanno già i titoli. -->
    <p class="nav__cap" id="nav-cap" aria-hidden="true"><span class="nav__cap-n"></span><span class="nav__cap-nome"></span></p>
    <div class="nav__dx">
      ${telHref ? `<a class="nav__login" href="${telHref}">Chiama</a>` : ''}
      <a class="cta cta--ar cta--luce cta--nav" href="/candidatura.html">Candida la tua azienda</a>
      <button class="menu-btn" id="burger" type="button" aria-label="Apri il menu" aria-expanded="false" aria-controls="menu">
        <span class="menu-btn__txt">Menu</span><span class="menu-btn__ico" aria-hidden="true"><span></span></span>
      </button>
    </div>
  </div>
</header>

<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
  <div class="menu__card">
    <div class="menu__testa">
      <a class="marchio" href="/" aria-label="Sales Process, home">${LOGO(40)}</a>
      <button class="menu-btn menu-btn--chiudi" id="menu-chiudi" type="button" aria-label="Chiudi il menu">
        <span class="menu-btn__txt">Chiudi</span><span class="menu-btn__ico is-x" aria-hidden="true"><span></span></span>
      </button>
    </div>
    <nav class="menu__voci" aria-label="Principale">
      ${VOCI_MENU.map((v, i) => `<a href="${v.href}" data-foto="${v.foto}" style="--i:${i}"${corrente(v.href, slug)}><span class="menu__nome">${v.label}</span></a>`).join('\n      ')}
    </nav>
    <div class="menu__anteprime" aria-hidden="true">
      <img class="menu__ant menu__ant--casa" data-foto="casa" data-src="/assets/foto/finale-trofeo-800.webp" alt="" width="1200" height="1500">
      ${VOCI_MENU.map(anteprima).join('\n      ')}
    </div>
    <div class="menu__piede">
      <a class="cta cta--ar" href="/candidatura.html">Candida la tua azienda</a>
      <a class="menu__link" href="mailto:${MAIL}">${MAIL}</a>
      <p class="menu__dove">Via Marco D'Agrate 41, Milano · quarto piano</p>
      <div class="menu__social">${socialHtml()}</div>
    </div>
  </div>
</div>`

const footer = () => `
<footer class="footer">
  <div class="wrap wrap--piena">
    <div class="footer__grid">
      <div>
        <a class="marchio" href="/" aria-label="Sales Process, home">${LOGO(54)}</a>
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
        <li><span class="todo footer__todo">Certificazione</span></li>
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
        <p class="t-piccolo footer__sedi"><b>Uffici di rappresentanza</b><br>Via Marco D'Agrate 41, 20139 Milano (MI)</p>
        <p class="t-piccolo footer__sedi"><b>Sede legale</b><br>Piazza IV Novembre 1, 22070 Capiago Intimiano (CO)</p>
      </div>
    </div>
    <div class="footer__legale">
      <span>© 2026 Sales Process S.r.l.</span>
      <span>P.IVA e C.F. 03924340130</span>
      <span>REA CO-407061</span>
      <span>Capitale sociale € 30.000,00</span>
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
<!-- L'adesione ai passaggi fra le pagine (View Transitions) è QUI, in
     linea, e non nel foglio: Chrome decide se fare il passaggio prima di
     aver riconvalidato sito.css, e con il foglio non in cache il passaggio
     (e il volo della foto dal menu) saltava a ogni navigazione in avanti
     (QA del giro 3). Movimento ridotto: nessun passaggio. -->
<style>@view-transition{navigation:auto}@media (prefers-reduced-motion:reduce){@view-transition{navigation:none}}</style>
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#161519">
<link rel="icon" href="/assets/brand/favicon.svg">
<!-- Il passaggio a scalinata fra le pagine (motion.css, @view-transition).
     Per catturare la pagina vecchia il browser deve disegnarne un
     fotogramma: in una scheda nascosta o sotto automazione non succede, e la
     navigazione resterebbe ferma fino al timeout di 4 secondi. Lì il
     passaggio si SALTA subito. Le promesse rifiutate si consumano qui, prima
     del primo paint, così la console resta pulita. -->
${ATTESA[slug] ? `<link rel="expect" href="#${ATTESA[slug]}" blocking="render">\n` : ''}<script>(function(){function n(){}function p(v){['ready','finished','updateCallbackDone'].forEach(function(k){if(v[k]&&v[k].catch)v[k].catch(n)})}addEventListener('pageswap',function(e){var v=e.viewTransition;if(!v)return;p(v);if(document.visibilityState!=='visible'||navigator.webdriver)v.skipTransition()});addEventListener('pagereveal',function(e){var v=e.viewTransition,k=null,c=null,m=null,d=document,nn=[];try{k=sessionStorage.getItem('vt-foto');c=sessionStorage.getItem('vt-cta');m=sessionStorage.getItem('vt-menu');sessionStorage.removeItem('vt-foto');sessionStorage.removeItem('vt-cta');sessionStorage.removeItem('vt-menu')}catch(x){}if(!v)return;p(v);if(c){var s=d.querySelector('.testa-pag');if(s){s.style.viewTransitionName='cta-pagina';if(v.types){v.types.add('dal-cta');v.types.add(c==='bianco'?'cta-bianco':'cta-ar')}v.finished.then(function(){s.style.viewTransitionName=''},n)}return}if(m&&v.types)v.types.add('dal-menu');if(!k)return;if(k==='team'){d.querySelectorAll('#scala-volti img').forEach(function(i){var m=(i.getAttribute('src')||'').split('/').pop().split('-')[0];if(m){i.style.viewTransitionName='volto-'+m;i.style.viewTransitionClass='volto';nn.push(i)}})}else{var f=d.getElementById('foto-pagina');if(f&&(f.getAttribute('src')||'').indexOf('/'+k+'-')>0){f.style.viewTransitionName='foto-pagina';nn.push(f)}}if(!nn.length)return;d.documentElement.classList.add('vt-arrivo');v.finished.then(function(){nn.forEach(function(i){i.style.viewTransitionName='';i.style.viewTransitionClass=''})},n)});addEventListener('unhandledrejection',function(e){var r=e.reason;if(r&&r.name==='InvalidStateError'&&/Transition was aborted|ViewTransition/.test(r.message))e.preventDefault()})})()</script>
${slug === 'home' ? `<!-- Il 3D dell'hero è solo per desktop con puntatore fine e senza
     reduced-motion. Il segnale va messo PRIMA del primo paint: altrimenti il
     marchio DOM si monterebbe e poi sparirebbe nei cubi della scena 3D. -->
<script>try{if(matchMedia('(min-width:1024px) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches&&!(navigator.connection&&navigator.connection.saveData))document.documentElement.classList.add('vuole-3d')}catch(e){}</script>` : ''}
<!-- Il sipario: preloader alla prima pagina della sessione, passaggio fra
     le pagine dove non ci sono le View Transitions (vedi sipario() sopra). -->
<script>(function(){var d=document.documentElement,v,p;try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;v=sessionStorage.getItem('visto');p=sessionStorage.getItem('sipario');sessionStorage.setItem('visto','1');sessionStorage.removeItem('sipario')}catch(e){return}if((v&&!p)||location.pathname==='/candidatura.html')return;var primo=!v,c=d.classList,t1,t2,fine=function(){c.remove('sipario-su','sipario-primo','sipario-via')},via=function(dopo){clearTimeout(t1);clearTimeout(t2);c.add('sipario-via');t2=setTimeout(fine,dopo)},salta=function(){if(!c.contains('sipario-via')&&c.contains('sipario-su'))via(620)};c.add('sipario-su');if(primo)c.add('sipario-primo');t1=setTimeout(function(){via(650)},primo?450:120);['pointerdown','keydown','wheel','touchstart'].forEach(function(t){addEventListener(t,salta,{passive:true,once:true})});addEventListener('pagereveal',function(e){if(e.viewTransition){clearTimeout(t1);clearTimeout(t2);fine()}});addEventListener('pageshow',function(e){if(e.persisted)c.remove('sipario-su','sipario-primo','sipario-via','sipario-giu')})})()</script>

<link rel="preload" href="/assets/fonts/dm-sans-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
<!-- La pagina sotto il cursore si scarica prima del clic (Speculation Rules,
     Chrome: «moderate» = dopo 200ms sopra un link, o al tocco). Solo il
     prefetch dell'HTML, mai il prerender: niente script eseguiti in anticipo.
     Con il passaggio a gradini e la foto che vola, il cambio di pagina
     parte senza attesa di rete. -->
<script type="speculationrules">{"prefetch":[{"where":{"or":[{"href_matches":"/*.html"},{"href_matches":"/"}]},"eagerness":"moderate"}]}</script>
<link rel="stylesheet" href="/css/sito.css?v=${VERSIONE}">
</head>
<body data-pagina="${slug}">
${sipario()}
${palco()}
<a class="skip" href="#main">Salta al contenuto</a>
${barra()}
${nav(slug)}
<div class="avanza" aria-hidden="true"></div>

<main id="main">
${body}
</main>
${footer()}

<!-- Ordine voluto: i defer girano nell'ordine del documento, e dati.js
     (i contenuti) non deve aspettare il CDN di GSAP. -->
<script src="/js/dati.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js" defer></script>
<script src="/js/motion.js" defer></script>
</body>
</html>
`

/* ── UN SOLO FOGLIO DI STILE ──────────────────────────────────────────────
   I dieci fogli sorgente restano separati e commentati (si modificano
   quelli); il build li concatena NELL'ORDINE DI CASCATA in src/css/sito.css,
   togliendo commenti e spazi. Prima erano nove richieste bloccanti più il
   foglio di Google Fonts: su mobile in 4G lento valevano 1,6 s di render
   bloccato. Il parametro ?v= è l'impronta del contenuto: cambia solo se
   cambia il CSS.                                                        */
const FOGLI = ['font', 'tokens', 'type', 'base', 'chrome', 'sfondi', 'sections', 'infografica', 'racconto', 'pagine', 'motion', 'interazioni']
const sorgenti = await Promise.all(FOGLI.map(n => readFile(join(OUT, 'css', n + '.css'), 'utf8')))
const css = sorgenti.map(c => c
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s*\n\s*/g, '\n').replace(/\n+/g, '\n').trim()).join('\n')
await writeFile(join(OUT, 'css', 'sito.css'), css)
const VERSIONE = createHash('sha1').update(css).digest('hex').slice(0, 10)
console.log('→ src/css/sito.css  (' + css.length + ' byte, v=' + VERSIONE + ')')

/* ── IL LOGO DEL PODCAST ──────────────────────────────────────────────────
   È un file del cliente e non si ridisegna. Se esiste in
   src/assets/podcast/fatturare-logo.(svg|webp|png) va al posto del
   segnaposto <!--LOGO-PODCAST-->; finché manca, il nome resta scritto
   nella pill. Basta copiare il file e ricostruire.                      */
const LOGO_PODCAST = ['svg', 'webp', 'png'].map(e => 'fatturare-logo.' + e)
  .find(n => existsSync(join(OUT, 'assets', 'podcast', n)))
const logoPodcast = () => LOGO_PODCAST
  ? `<img class="podcast__logo" src="/assets/podcast/${LOGO_PODCAST}" alt="Fatturare Fatturare Fatturare, il podcast" width="300" height="300" loading="lazy" decoding="async">`
  : ''   /* niente occhiello al posto del logo: il nome è nella nota sotto il CTA */
if (!LOGO_PODCAST) console.log('⚠ logo del podcast assente: src/assets/podcast/fatturare-logo.(svg|webp|png)')

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
    body: spezza(spezza(raw.slice(m ? m[0].length : 0)), 'data-accendi', ACCESA)
      .replaceAll('<!--LOGO-PODCAST-->', logoPodcast())
      /* dove il nome è già nel titolo (Fatturare³): il logo o niente */
      .replaceAll('<!--LOGO-PODCAST-SOLO-->', LOGO_PODCAST ? logoPodcast() : ''),
  }))
  await writeFile(join(OUT, f), out)
  console.log('→ src/' + f + '  (' + out.length + ' byte)')
}
