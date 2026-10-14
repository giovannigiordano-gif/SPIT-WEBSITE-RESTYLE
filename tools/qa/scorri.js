/* Passeggiata a scroll per `playwright-cli run-code --filename=…`.
   Al contrario di audit.js NON forza lo stato finale: scorre la pagina a
   passi di ~0,85 viewport, aspetta che il palco e le animazioni si
   assestino, e fotografa il viewport. È così che si vedono le giunture
   fra le sezioni, le dissolvenze del palco e le scene a scroll.
   Sostituiti da run-scorri.sh: __WIDTH__ __OUT__ __PAGE__ __STEP__ __WAIT__ */
async page => {
  const W = __WIDTH__, OUT = '__OUT__', PAGINA = '__PAGE__', PASSO = __STEP__, ATTESA = __WAIT__;
  const mobile = W < 800;
  const ctx = await page.context().browser().newContext({
    viewport: { width: W, height: mobile ? 800 : 900 }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile,
  });
  const p = await ctx.newPage();
  const log = [];
  p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') log.push(m.type() + ': ' + m.text().slice(0, 200)); });
  p.on('pageerror', e => log.push('pageerror: ' + String(e).slice(0, 200)));
  await p.goto('http://localhost:4321/' + (PAGINA === 'index' ? '' : PAGINA + '.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(1600);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  const vh = mobile ? 800 : 900;
  const tappe = [];
  for (let y = 0, k = 0; y < H - vh * 0.4; y += Math.round(vh * PASSO), k++) {
    /* scroll a piccoli passi, come una rotella: le timeline scroll-driven e
       gli scrub di GSAP devono vedere uno scorrimento, non un salto */
    await p.evaluate(async (dest) => {
      const da = scrollY, n = 8;
      for (let i = 1; i <= n; i++) { scrollTo(0, da + (dest - da) * i / n); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); }
    }, y);
    await p.waitForTimeout(ATTESA);
    const atmo = await p.evaluate(() => document.documentElement.dataset.atmo);
    const f = `${OUT}/${PAGINA}-${W}-s${String(k).padStart(2, '0')}.jpg`;
    await p.screenshot({ path: f, type: 'jpeg', quality: 78 });
    tappe.push({ k, y, atmo });
  }
  await ctx.close();
  return JSON.stringify({ H, tappe, log });
}
