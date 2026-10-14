/* Audit visivo per `playwright-cli run-code --filename=tools/qa/audit.js`.
   Una funzione sola (vincolo di run-code: niente import, niente process).
   Parametri passati via window-less trucco: si edita CFG qui sotto oppure si
   usa la variante generata da tools/qa/run-audit.sh, che sostituisce
   __WIDTH__ e __OUT__ prima di lanciare.

   Per ogni pagina, alla larghezza data:
     1. screenshot della PIEGA nello stato reale (animazioni d'apertura finite)
     2. screenshot FULL-PAGE nello stato COMPOSTO: le animazioni scroll-driven
        portate al fotogramma finale, le scene GSAP chiuse. Senza questo
        passaggio tutto ciò che sta sotto la piega esce invisibile, perché
        una view() timeline fuori dal viewport resta al fotogramma 0.
     3. metriche: overflow orizzontale reale, target tattili < 44px,
        testo < 12px, immagini senza alt, errori di console e di rete.     */
async page => {
  const CFG = { width: __WIDTH__, out: '__OUT__', base: 'http://localhost:4321', pages: __PAGES__ };
  const mobile = CFG.width < 800;
  const browser = page.context().browser();
  const ctx = await browser.newContext({
    viewport: { width: CFG.width, height: mobile ? 800 : 900 },
    deviceScaleFactor: 1,
    isMobile: mobile,
    hasTouch: mobile,
  });
  const p = await ctx.newPage();
  const log = [];
  p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') log.push({ t: m.type(), x: m.text().slice(0, 240), u: p.url() }); });
  p.on('pageerror', e => log.push({ t: 'pageerror', x: String(e).slice(0, 240), u: p.url() }));
  p.on('response', r => { if (r.status() >= 400) log.push({ t: 'http' + r.status(), x: r.url(), u: p.url() }); });
  p.on('requestfailed', r => log.push({ t: 'reqfail', x: r.url() + ' ' + (r.failure()?.errorText || ''), u: p.url() }));

  const FINALE = `*,*::before,*::after{animation-delay:-60s!important;animation-play-state:paused!important;animation-timeline:auto!important;transition:none!important;scroll-behavior:auto!important}`;
  const report = [];

  for (const nome of CFG.pages) {
    const url = CFG.base + '/' + (nome === 'index' ? '' : nome + '.html');
    await p.goto(url, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(2200);
    await p.screenshot({ path: `${CFG.out}/${nome}-${CFG.width}-piega.jpg`, type: 'jpeg', quality: 82 });

    /* Le immagini lazy non partono in uno screenshot full-page (il viewport
       non scorre): si forzano eager e si aspetta che arrivino. */
    await p.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
      await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 5000); })));
    });
    await p.addStyleTag({ content: FINALE });
    await p.evaluate(() => {
      /* kill(true, true): toglie il pin-spacer (altrimenti resta un buco di
         2.000px) ma lascia viva l'animazione, che si porta alla fine. */
      if (window.ScrollTrigger) ScrollTrigger.getAll().forEach(t => { const a = t.animation; t.kill(true, true); if (a) a.progress(1); });
      document.querySelectorAll('.is-off').forEach(n => n.classList.remove('is-off'));
    });
    await p.waitForTimeout(400);

    const m = await p.evaluate((mob) => {
      const vw = document.documentElement.clientWidth;
      scrollTo(600, 0); const sx = scrollX; scrollTo(0, 0);
      const vis = (n) => { const r = n.getBoundingClientRect(); const cs = getComputedStyle(n); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && n.closest('[aria-hidden="true"]') === null; };
      const sporge = [];
      document.querySelectorAll('main *, header *, footer *').forEach(n => {
        const r = n.getBoundingClientRect();
        if (r.width && (r.right > vw + 1 || r.left < -1)) {
          let a = n.parentElement, clipped = false;
          while (a && a !== document.body) { const o = getComputedStyle(a); if (/(hidden|clip|auto|scroll)/.test(o.overflowX)) { clipped = true; break; } a = a.parentElement; }
          if (!clipped) sporge.push((n.className && typeof n.className === 'string' ? '.' + n.className.split(' ').join('.') : n.tagName) + ' r=' + Math.round(r.right));
        }
      });
      const piccoli = [];
      if (mob) document.querySelectorAll('a, button, input, select, textarea, [role="button"]').forEach(n => {
        if (!vis(n)) return;
        const r = n.getBoundingClientRect();
        const inline = n.tagName === 'A' && getComputedStyle(n).display === 'inline' && n.parentElement && /^(P|LI|SPAN|EM|STRONG)$/.test(n.parentElement.tagName);
        if ((r.width < 44 || r.height < 44) && !inline) piccoli.push(`${n.tagName.toLowerCase()}${n.className ? '.' + String(n.className).split(' ')[0] : ''} "${(n.textContent || n.getAttribute('aria-label') || '').trim().slice(0, 28)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
      });
      const minuti = new Set();
      document.querySelectorAll('main *, footer *').forEach(n => {
        if (!n.childNodes.length || ![...n.childNodes].some(c => c.nodeType === 3 && c.textContent.trim())) return;
        if (!vis(n)) return;
        const fs = parseFloat(getComputedStyle(n).fontSize);
        if (fs < 12) minuti.add(`${fs}px "${n.textContent.trim().slice(0, 30)}"`);
      });
      const senzaAlt = [...document.images].filter(i => !i.hasAttribute('alt')).map(i => i.src.split('/').pop());
      const sezioni = [...document.querySelectorAll('main > section, main > div, footer')].map(s => ({
        id: s.id || s.className.split(' ')[0], y: Math.round(s.getBoundingClientRect().top + scrollY), h: Math.round(s.offsetHeight),
      }));
      const fonts = [...new Set([...document.querySelectorAll('body *')].slice(0, 4000).map(n => getComputedStyle(n).fontFamily.split(',')[0].trim()))];
      return { vw, scrollX: sx, altezza: document.documentElement.scrollHeight, sporge: [...new Set(sporge)].slice(0, 25), piccoli: [...new Set(piccoli)].slice(0, 40), minuti: [...minuti].slice(0, 25), senzaAlt, sezioni, fonts };
    }, mobile);

    /* Chrome taglia gli screenshot oltre 16.384px e ricomincia da capo: le
       pagine lunghe si catturano a tranche da 8.000px (-p1, -p2…). */
    const TR = 8000;
    if (m.altezza <= 16000) {
      await p.screenshot({ path: `${CFG.out}/${nome}-${CFG.width}-full.jpg`, type: 'jpeg', quality: 80, fullPage: true });
    } else {
      for (let y = 0, k = 1; y < m.altezza; y += TR, k++) {
        await p.screenshot({ path: `${CFG.out}/${nome}-${CFG.width}-full-p${k}.jpg`, type: 'jpeg', quality: 80, fullPage: true,
          clip: { x: 0, y, width: m.vw, height: Math.min(TR, m.altezza - y) } });
      }
    }
    report.push({ pagina: nome, ...m });
  }
  await ctx.close();
  return JSON.stringify({ width: CFG.width, report, log }, null, 1);
}
