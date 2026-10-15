/* L'immagine di condivisione e l'icona di iPhone, da assets-src/og/*.html.
     playwright-cli --raw run-code --filename=tools/og.js
   (percorsi assoluti: playwright-cli gira dalla sua cartella) */
async page => {
  const R = 'C:/Users/UTENTE/Desktop/Nuovo sito spit/';
  const ctx = await page.context().browser().newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  await p.goto('file:///' + R + 'assets-src/og/og.html'); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: R + 'src/assets/brand/og.jpg', type: 'jpeg', quality: 86 });
  await p.setViewportSize({ width: 180, height: 180 });
  await p.goto('file:///' + R + 'assets-src/og/icona.html'); await p.waitForTimeout(200);
  await p.screenshot({ path: R + 'src/assets/brand/apple-touch-icon.png' });
  await ctx.close();
  return 'ok';
}
