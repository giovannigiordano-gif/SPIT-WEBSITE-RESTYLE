/* Fotogrammi "dopo" per il confronto prima/dopo (playwright-cli run-code).
   Stato REALE di scroll: palco, scene GSAP e 3D come li vede chi visita.
   __OUT__ viene sostituito da prima-dopo.mjs.                            */
async page => {
  const OUT = '__OUT__';
  const scatto = async (w, h, url, nome, prepara) => {
    const ctx = await page.context().browser().newContext({ viewport: { width: w, height: h }, isMobile: w < 800, hasTouch: w < 800 });
    const p = await ctx.newPage();
    await p.goto('http://localhost:4321' + url, { waitUntil: 'networkidle' });
    await p.waitForTimeout(w >= 1024 && url === '/' ? 3200 : 1400);
    if (prepara) await prepara(p);
    await p.screenshot({ path: `${OUT}/${nome}.jpg`, type: 'jpeg', quality: 86 });
    await ctx.close();
  };
  /* scorre a piccoli passi fino a portare `sel` (bordo alto) a `y` px dal
     bordo alto del viewport: le timeline di scroll devono VEDERE scorrere */
  const vai = (sel, y = 0) => async (p) => {
    const dest = await p.evaluate(([s, y]) => Math.max(0, document.querySelector(s).getBoundingClientRect().top + scrollY - y), [sel, y]);
    for (let i = 1; i <= 10; i++) { await p.evaluate((v) => scrollTo(0, v), dest * i / 10); await p.waitForTimeout(60); }
    await p.waitForTimeout(1500);
  };
  await scatto(1440, 900, '/', 'hero-1440', async (p) => { await p.mouse.move(980, 420, { steps: 6 }); await p.waitForTimeout(700); });
  await scatto(1440, 900, '/', 'hero-1440-scroll', async (p) => { for (let y = 60; y <= 420; y += 60) { await p.mouse.wheel(0, 60); await p.waitForTimeout(90); } await p.waitForTimeout(1600); });
  await scatto(1440, 900, '/', 'cosa-1440', vai('#cosa', 40));
  await scatto(1440, 900, '/', 'numeri-1440', vai('#numeri', 20));
  await scatto(1440, 900, '/', 'giuntura-1440', async (p) => { await vai('#cosa', 450)(p); });
  await scatto(1440, 900, '/', 'macchina-1440', async (p) => {
    const top = await p.evaluate(() => document.querySelector('#metodo').getBoundingClientRect().top + scrollY);
    for (let i = 1; i <= 14; i++) { await p.evaluate((v) => scrollTo(0, v), (top + 900) * i / 14); await p.waitForTimeout(70); }
    await p.waitForTimeout(1500);
  });
  await scatto(390, 800, '/', 'hero-390');
  await scatto(1440, 900, '/eventi.html', 'programma-1440', vai('#programma', 20));
  return 'ok';
}
