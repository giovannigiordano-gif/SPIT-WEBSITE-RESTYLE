/* Test funzionali per `playwright-cli run-code --filename=tools/qa/funzioni.js`.
   Verifica che il restyling non abbia rotto niente di ciò che il sito FA:
   form con squalifica, filtri della tabella, facciate di video e mappa,
   comandi dei caroselli, chiusura della barra, link interni.            */
async page => {
  const B = 'http://localhost:4321';
  const esiti = [];
  const ok = (nome, cond, info = '') => esiti.push((cond ? 'OK   ' : 'FAIL ') + nome + (info ? ' · ' + info : ''));
  const ctx = await page.context().browser().newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const errori = [];
  p.on('pageerror', e => errori.push(String(e).slice(0, 160)));
  p.on('console', m => { if (m.type() === 'error') errori.push(m.text().slice(0, 160)); });

  /* 1 · candidatura: squalifica in tempo reale e invio */
  await p.goto(B + '/candidatura.html', { waitUntil: 'networkidle' });
  await p.selectOption('#f-fatturato', 'sotto1');
  ok('candidatura: squalifica visibile sotto 1 M€', await p.isVisible('#squalifica'));
  ok('candidatura: etichetta → podcast', (await p.textContent('#form-submit .cta__label')).includes('podcast'));
  await p.selectOption('#f-fatturato', '2-3');
  ok('candidatura: squalifica nascosta a 2–3 M€', !(await p.isVisible('#squalifica')));
  await p.fill('#f-azienda', 'Prova Srl'); await p.fill('#f-settore', 'Test'); await p.fill('#f-nome', 'Test, titolare'); await p.fill('#f-tel', '0000000');
  await p.click('#form-submit');
  ok('candidatura: invio blocca il bottone', await p.isDisabled('#form-submit'), await p.textContent('#form-submit'));

  /* 2 · eventi: lo stesso form di prenotazione */
  await p.goto(B + '/eventi.html', { waitUntil: 'networkidle' });
  await p.selectOption('#f-fatturato', 'sotto1');
  ok('eventi: squalifica visibile', await p.isVisible('#squalifica'));

  /* 3 · metodo: filtri della tabella */
  await p.goto(B + '/metodo.html', { waitUntil: 'networkidle' });
  const righe0 = await p.locator('#tabella-body tr').count();
  await p.click('#tab-filtri .chip[data-f="marketing"]');
  await p.waitForTimeout(400);
  const righe1 = await p.locator('#tabella-body tr').count();
  ok('metodo: filtro Marketing', righe0 === 12 && righe1 === 3, `${righe0} → ${righe1} · "${await p.textContent('#tab-conta')}"`);
  ok('metodo: aria-pressed sul filtro', (await p.getAttribute('#tab-filtri .chip[data-f="marketing"]', 'aria-pressed')) === 'true');

  /* 4 · home: video a facciata, mappa a facciata, pausa, barra */
  await p.goto(B + '/', { waitUntil: 'networkidle' });
  ok('home: nessun iframe al caricamento', (await p.locator('iframe').count()) === 0);
  await p.locator('.vid').first().scrollIntoViewIfNeeded();
  await p.locator('.vid').first().click();
  await p.waitForTimeout(300);
  ok('home: il video entra al click', (await p.locator('.vid iframe').count()) === 1, await p.locator('.vid iframe').first().getAttribute('src').catch(() => ''));
  await p.locator('.mappa__btn').scrollIntoViewIfNeeded();
  await p.click('.mappa__btn');
  ok('home: la mappa entra al click', (await p.locator('#mappa iframe').count()) === 1);
  await p.locator('#nastro-pausa').scrollIntoViewIfNeeded();
  await p.click('#nastro-pausa');
  ok('home: pausa del nastro', (await p.getAttribute('#nastro-pausa', 'aria-pressed')) === 'true', await p.getAttribute('#nastro-pausa', 'aria-label'));
  await p.locator('#sq-next').scrollIntoViewIfNeeded();
  const t0 = await p.evaluate(() => getComputedStyle(document.querySelector('#squadra-pista')).transform);
  await p.click('#sq-next'); await p.waitForTimeout(600);
  const t1 = await p.evaluate(() => getComputedStyle(document.querySelector('#squadra-pista')).transform);
  ok('home: freccia della squadra sposta la pista', t0 !== t1);
  await p.evaluate(() => scrollTo(0, 0));
  await p.click('#barra-x');
  ok('home: chiusura barra', await p.evaluate(() => document.documentElement.classList.contains('barra-off') && localStorage.getItem('barra') === 'off'));

  /* 5 · tutti i link interni rispondono 200 */
  const link = new Set();
  for (const pg of ['/', '/metodo.html', '/risultati.html', '/dna.html', '/team.html', '/eventi.html', '/fatturare.html', '/candidatura.html']) {
    await p.goto(B + pg, { waitUntil: 'domcontentloaded' });
    for (const h of await p.$$eval('a[href^="/"]', as => as.map(a => a.getAttribute('href')))) link.add(h);
    for (const id of await p.$$eval('a[href^="#"]', as => as.map(a => a.getAttribute('href')))) {
      if (id.length > 1) ok(`ancora ${pg}${id}`, await p.$(id) !== null);
    }
  }
  const rotti = [];
  for (const h of link) {
    const [url, hash] = h.split('#');
    const r = await p.request.get(B + url);
    if (r.status() !== 200) rotti.push(h + ' → ' + r.status());
    if (hash) { await p.goto(B + url, { waitUntil: 'domcontentloaded' }); if (!(await p.$('#' + hash))) rotti.push(h + ' → ancora mancante'); }
  }
  ok(`link interni (${link.size})`, rotti.length === 0, rotti.join(', '));
  ok('nessun errore JS durante i test', errori.length === 0, errori.slice(0, 2).join(' | '));
  await ctx.close();
  return esiti.join('\n');
}
