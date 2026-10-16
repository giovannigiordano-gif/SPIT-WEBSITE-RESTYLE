/* ═══════════════════════════════════════════════════════════════════════════
   SALESPROCESS · cubi3d.js — i cubotti dell'hero lungo la home (16.10)
   ---------------------------------------------------------------------------
   «I cubotti della hero li amo: riprendi effetti 3D simili per tutta la
   homepage, senza esagerare.» Nell'hero i cubi sono i CONTATTI. Qui non
   tornano a caso (gli «elementi fluttuanti senza casa» il cliente li ha già
   bocciati): tornano dove il racconto della home ha bisogno di loro, tre
   volte, e ogni volta fanno quello che dice la frase accanto.
     · CADONO    (01, il problema) accanto a «sono tre passaggi che cadono
                 per terra»: alcuni contatti galleggiano, poi scorrendo cadono
                 uno dopo l'altro rotolando e passano dietro le mani della
                 foto; l'arancione per ultimo.
     · CRESCONO  (04, i risultati, solo desktop) accanto a «i numeri dei
                 clienti»: cinque blocchi scendono e si posano in una
                 scalinata che sale, dal grafite all'arancio come i grafici a
                 unità delle schede sotto (prima grigio, dopo arancio).
     · ARRIVANO  (il finale, il contatto diventato fatturato): i contatti
                 arancioni volano al cubo alzato come un trofeo e ci entrano,
                 subito prima che la luce lasci il cubo e vada al CTA.
   Gli stessi blocchi dell'hero (il quadrato del marchio estruso), la stessa
   luce, la stessa build di three.js. Una tela sola, fissa, DIETRO il
   contenuto: i cubi passano dietro le foto e il testo, mai sopra. La camera
   sta all'altezza degli occhi (il mondo è in pixel, origine al centro dello
   schermo), quindi ogni momento ha la sua prospettiva vera. Lo scroll dà il
   punto d'arrivo, i cubi lo inseguono con un po' di inerzia (una rotella a
   scatti non li fa saltare). Si disegna solo quando uno dei tre momenti è
   vicino. Caricato da motion.js quando il primo si avvicina, solo dove c'è
   html.vuole-3d (mai a movimento ridotto).
   ═══════════════════════════════════════════════════════════════════════════ */

const THREE_URL = '/js/vendor/three-sp.min.js';
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
function mulberry32(a) {
  return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

export async function avvia() {
  const ancore = [...document.querySelectorAll('[data-cubi]')];
  if (!ancore.length) return null;
  const THREE = await import(THREE_URL);

  const canvas = document.createElement('canvas');
  canvas.className = 'cubi3d';
  canvas.setAttribute('aria-hidden', 'true');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;
  const stretto = () => innerWidth <= 900;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, stretto() ? 1.4 : 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 10, 20000);
  /* la luce dell'hero: chiave calda dall'alto a sinistra, controluce
     arancione. In più un riempimento frontale debole: qui il fondo non è il
     nero dell'hero ma le atmosfere calde, e il grafite senza riempimento ci
     si legge come un buco invece che come un blocco. */
  scene.add(new THREE.HemisphereLight(0x3d3843, 0x050505, 1.1));
  const chiave = new THREE.DirectionalLight(0xfff0e0, 2.2); chiave.position.set(-9, 13, 16); scene.add(chiave);
  const controluce = new THREE.DirectionalLight(0xff8200, 2.2); controluce.position.set(11, -5, -12); scene.add(controluce);
  const riempe = new THREE.DirectionalLight(0xffe2c8, .55); riempe.position.set(2, 1, 10); scene.add(riempe);

  /* il blocco dell'hero: il quadrato del marchio estruso, smusso dentro il profilo */
  const blocco = (lato, profondita) => {
    const r = lato * .22, h = lato / 2, s = new THREE.Shape();
    s.moveTo(-h + r, -h); s.lineTo(h - r, -h); s.absarc(h - r, -h + r, r, -Math.PI / 2, 0);
    s.lineTo(h, h - r); s.absarc(h - r, h - r, r, 0, Math.PI / 2);
    s.lineTo(-h + r, h); s.absarc(-h + r, h - r, r, Math.PI / 2, Math.PI);
    s.lineTo(-h, -h + r); s.absarc(-h + r, -h + r, r, Math.PI, Math.PI * 1.5);
    const g = new THREE.ExtrudeGeometry(s, { depth: profondita - lato * .12, curveSegments: 5, bevelEnabled: true, bevelThickness: lato * .06, bevelSize: lato * .05, bevelOffset: -lato * .05, bevelSegments: 3 });
    g.center(); return g;
  };
  const geo = blocco(1, .92);
  const matGrafite = new THREE.MeshStandardMaterial({ color: 0x2b2830, roughness: .52, metalness: .28 });
  const matArancio = new THREE.MeshStandardMaterial({ color: 0xff9412, roughness: .4, metalness: .02, emissive: 0xff7a00, emissiveIntensity: .08 });
  const cubo = (arancio) => { const m = new THREE.Mesh(geo, arancio ? matArancio : matGrafite); scene.add(m); return m; };

  /* lo schermo in coordinate del mondo: origine al centro, y in su, 1 = 1px */
  let vw = innerWidth, vh = innerHeight;
  const W = (sx, sy, z, out) => out.set(sx - vw / 2, vh / 2 - sy, z);
  const rnd = mulberry32(2026);
  /* l'inerzia: ogni cubo insegue il suo punto (0→1) dato dallo scroll */
  const insegui = (q, meta, k) => { q.c += (meta - q.c) * k; if (Math.abs(meta - q.c) < .0005) q.c = meta; return q.c; };

  /* ── I TRE MOMENTI ──────────────────────────────────────────────────── */
  const crea = {
    /* CADONO: il gruppo sta nel vuoto a destra del titolo su desktop, nella
       fascia fra il sommario e le mani sul telefono (lì la foto è larga una
       volta e mezza lo schermo: il gruppo si misura sullo schermo) */
    cadono(el) {
      const tel = stretto();
      const posti = tel
        ? [[.14, .34, .80], [.58, .16, 1], [.36, .70, .72], [.84, .52, .92, 1]]
        : [[.16, .30, .72], [.50, .14, .96], [.84, .34, .64], [.28, .66, .86], [.70, .70, .76], [.52, .46, 1.04, 1]];
      const S = tel ? 40 : 58;
      const pezzi = posti.map(([x, y, s, ar], k) => ({
        m: cubo(!!ar), x, y, s: s * S, c: 0, z: (rnd() - .5) * 160, rx: rnd() * 6, ry: rnd() * 6, rz: rnd() * 6, f: .5 + rnd() * .5, ph: rnd() * 6.28,
        parte: (tel ? .40 : .40) + k * (tel ? .075 : .055) + (ar ? .04 : 0), deriva: (rnd() - .5) * (tel ? 60 : 140), giri: 3 + rnd() * 4,
      }));
      const v = new THREE.Vector3();
      return {
        pezzi,
        rect() {
          const r = el.getBoundingClientRect();
          if (!tel) return { left: r.left + r.width * .62, top: r.top - Math.min(460, vh * .5), width: r.width * .34, height: Math.min(460, vh * .5) + r.height * .3 };
          /* sopra c'è il sommario: il gruppo parte appena sotto e scende
             fra le mani (che lo coprono in parte: la tela sta dietro) */
          return { left: vw * .08, top: r.top - 30, width: vw * .84, height: r.height * .5 + 30 };
        },
        aggiorna(r, t, k, subito) {
          const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
          for (const q of pezzi) {
            const meta = clamp((p - q.parte) / .24, 0, 1);
            const c = subito ? (q.c = meta) : insegui(q, meta, k), c2 = c * c;
            const galla = 1 - c;
            const sx = r.left + q.x * r.width + q.deriva * c;
            const sy = r.top + q.y * r.height + Math.sin(t * q.f + q.ph) * 6 * galla + c2 * vh * 1.25;
            W(sx, sy, q.z - c2 * 520, v);
            q.m.position.copy(v);
            q.m.rotation.set(q.rx + t * .12 * galla + c * q.giri, q.ry + t * .09 * galla + c * q.giri * .6, q.rz + c * q.giri * .3);
            q.m.scale.setScalar(q.s * (1 - c2 * .35));
            q.m.visible = c < .995;
          }
        },
      };
    },
    /* CRESCONO: una scalinata che sale, nello spazio fra la fine del titolo
       dei numeri e il bottone di pausa (misurato sull'ultima riga del
       titolo: a 1024 il titolo è più lungo e lo spazio più corto) */
    crescono(el) {
      /* sul telefono il titolo prende la riga intera: niente scalinata */
      if (stretto()) return null;
      const titolo = el.querySelector('h2, h3'), pausa = el.querySelector('.pausa');
      const rng = document.createRange();
      if (titolo) rng.selectNodeContents(titolo);
      const pezzi = [];
      for (let k = 0; k < 5; k++) pezzi.push({ m: cubo(k >= 2), k, c: 0, rx: (rnd() - .5) * 3, ry: (rnd() - .5) * 3, rz: (rnd() - .5) * 2, z: (rnd() - .5) * 40 });
      const v = new THREE.Vector3();
      return {
        pezzi,
        rect() {
          const r = el.getBoundingClientRect();
          const righe = titolo ? rng.getClientRects() : [], ult = righe[righe.length - 1];
          const da = (ult ? ult.right : r.left + r.width * .56) + 36;
          /* sotto i 1100px la pausa è nascosta (scroll-snap): conta il bordo */
          const pr = pausa && pausa.getBoundingClientRect();
          const a = (pr && pr.width ? pr.left : r.right) - 28;
          const base = ult ? ult.bottom : r.bottom;
          return { left: da, top: base - 170, width: a - da, height: 170 };
        },
        aggiorna(r, t, k, subito) {
          /* il lato si adatta allo spazio; se lo spazio non basta, niente */
          const S = Math.min(42, r.width / (4 * 1.16 + 1));
          if (stretto() || S < 24) { pezzi.forEach(q => { q.m.visible = false; }); return; }
          const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
          for (const q of pezzi) {
            const meta = clamp((p - (.30 + q.k * .055)) / .16, 0, 1);
            const c = easeOut(subito ? (q.c = meta) : insegui(q, meta, k));
            /* il posto: gradini di un lato e un po', ognuno 0,72 lati più su */
            const sx = r.left + S * .5 + q.k * S * 1.16;
            const sy = r.top + r.height - S * .62 - q.k * S * .72 - (1 - c) * 260;
            W(sx, sy, q.z * (1 - c), v);
            q.m.position.copy(v);
            q.m.rotation.set(q.rx * (1 - c) - .18 * c, q.ry * (1 - c) + .32 * c, q.rz * (1 - c));
            q.m.scale.setScalar(S * (.4 + .6 * c));
            q.m.visible = c > .002;
          }
        },
      };
    },
    /* ARRIVANO: i contatti arancioni volano al cubo alzato nel finale e ci
       entrano: la tela sta dietro la foto, quindi l'ultimo tratto sparisce
       davvero nel cubo. Entrano dai bordi liberi dello schermo: su desktop
       da destra e dal fondo ai lati del braccio (dietro al braccio non si
       vedrebbero); sul telefono sotto la foto ci sono le righe giganti del
       payoff, quindi tutti dal bordo sinistro, nel vuoto accanto al braccio. */
    arrivano(el) {
      const tel = stretto();
      /* [da dove, posizione lungo quel bordo (in altezze o larghezze della
         foto rispetto al cubo), verso della curva: quelli dal fondo curvano
         VERSO L'ESTERNO, altrimenti passerebbero dietro al braccio] */
      const piano = tel
        ? [['sx', .3, 1], ['sx', .46, -1], ['sx', .04, 1]]
        : [['dx', .2, 1], ['giu', .3, 1], ['dx', .62, -1], ['giu', -.32, -1]];
      const pezzi = piano.map(([bordo, lungo, verso], k) => ({ m: cubo(true), k, bordo, lungo, verso, c: 0, s: (tel ? 30 : 50) * (.85 + rnd() * .3), rx: rnd() * 6, ry: rnd() * 6, rz: rnd() * 6 }));
      const sez = el.closest('section');
      /* lo stesso cancello del finale fermo in racconto.css */
      const mqFermo = matchMedia('(prefers-reduced-motion: no-preference) and (min-width: 1024px) and (min-height: 680px)');
      const vt = CSS.supports('animation-timeline: view()');
      const v = new THREE.Vector3();
      /* dove sta il cubo nella foto (49%, 35% dell'immagine), con il
         contain dell'immagine: la scatola può essere più larga della foto */
      const bersaglio = (r) => {
        const a = 1200 / 1500;
        let w = r.width, h = r.width / a, ox = 0, oy = r.height - h;
        if (h > r.height) { h = r.height; w = h * a; ox = (r.width - w) / 2; oy = 0; }
        return { x: r.left + ox + w * .49, y: r.top + oy + h * .35, w, h, fondo: r.top + oy + h };
      };
      return {
        pezzi,
        rect() { return el.getBoundingClientRect(); },
        aggiorna(r, t, k, subito) {
          /* desktop: la scena è fissata; la luce lascia il cubo a metà del
             fermo (racconto.css, contain 44%): i contatti arrivano prima.
             Altrove conta la foto che attraversa lo schermo. */
          const fermo = vt && mqFermo.matches;
          let p, a0, passo, dur;
          if (fermo) { const s = sez.getBoundingClientRect(); p = clamp(-s.top / (s.height - vh), 0, 1); a0 = .02; passo = .07; dur = .26; }
          else { p = clamp((vh - r.top) / (vh + r.height), 0, 1); a0 = .14; passo = .08; dur = .28; }
          const b = bersaglio(r);
          for (const q of pezzi) {
            const meta = clamp((p - (a0 + q.k * passo)) / dur, 0, 1);
            const c = subito ? (q.c = meta) : insegui(q, meta, k), e = easeInOut(c), u = 1 - e;
            /* la partenza, appena fuori dal bordo */
            const x0 = q.bordo === 'sx' ? -q.s * 1.4 : q.bordo === 'dx' ? vw + q.s * 1.4 : b.x + q.lungo * b.w;
            const y0 = q.bordo === 'giu' ? Math.max(b.fondo, vh) + q.s * 1.4 : b.y + q.lungo * b.h;
            /* curva di Bézier: il punto di controllo è a metà strada,
               spostato di lato del 22% della distanza */
            const mx = (x0 + b.x) / 2, my = (y0 + b.y) / 2, ddx = b.x - x0, ddy = b.y - y0;
            const x1 = mx - ddy * .22 * q.verso, y1 = my + ddx * .22 * q.verso;
            const sx = u * u * x0 + 2 * u * e * x1 + e * e * b.x;
            const sy = u * u * y0 + 2 * u * e * y1 + e * e * b.y;
            W(sx, sy, 30 * Math.sin(e * Math.PI), v);
            q.m.position.copy(v);
            q.m.rotation.set(q.rx + e * 3.2 + t * .15 * u, q.ry + e * 2.4, q.rz * u);
            /* entra nel cubo: rimpicciolisce nell'ultimo quarto */
            q.m.scale.setScalar(q.s * (e < .72 ? 1 : Math.max(.001, 1 - (e - .72) / .28)));
            q.m.visible = c > .002 && c < .995;
          }
        },
      };
    },
  };
  const momenti = ancore.map(el => { const f = crea[el.dataset.cubi], m = f && f(el); return m ? { el, ...m, visto: false, fresco: true } : null; }).filter(Boolean);
  if (!momenti.length) return null;
  const nascondi = (m) => m.pezzi.forEach(q => { q.m.visible = false; });
  momenti.forEach(nascondi);

  /* ── MISURE E CICLO ─────────────────────────────────────────────────── */
  const misura = () => {
    vw = innerWidth; vh = innerHeight;
    renderer.setSize(vw, vh, false);
    camera.aspect = vw / vh;
    camera.position.set(0, 0, (vh / 2) / Math.tan(THREE.MathUtils.degToRad(15)));
    camera.updateProjectionMatrix();
  };
  let raf = 0, t0 = performance.now(), prima = 0, pronto = false, vuota = false;
  const attivi = () => momenti.filter(m => m.visto);
  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const t = (now - t0) / 1000, dt = Math.min(.05, prima ? (now - prima) / 1000 : 1 / 60);
    prima = now;
    /* inerzia: metà della distanza in ~0,1 s */
    const k = 1 - Math.exp(-dt * 7);
    let quanti = 0;
    for (const m of momenti) {
      if (!m.visto) { nascondi(m); m.fresco = true; continue; }
      /* appena torna vicino (anche dopo un salto con un'ancora) il momento
         parte già al suo punto, senza rigiocare i voli */
      m.aggiorna(m.rect(), t, k, m.fresco); m.fresco = false;
      for (const q of m.pezzi) if (q.m.visible) quanti++;
    }
    /* niente cubi in scena: si pulisce una volta e non si ridisegna */
    if (!quanti) { if (!vuota) { renderer.clear(); vuota = true; } return; }
    vuota = false;
    renderer.render(scene, camera);
  };
  const sottoMenu = () => document.documentElement.classList.contains('menu-aperto');
  const avviaCiclo = () => { if (pronto && !raf && attivi().length && !document.hidden && !sottoMenu()) { prima = 0; raf = requestAnimationFrame(frame); } };
  const ferma = () => { cancelAnimationFrame(raf); raf = 0; renderer.clear(); vuota = true; };

  const palco = document.querySelector('.palco');
  if (palco) palco.after(canvas); else document.body.prepend(canvas);
  misura();
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(misura, 120); }, { passive: true });
  /* un momento è attivo quando è vicino allo schermo (il suo gruppo può
     stare un po' fuori dall'ancora: margine largo) */
  const io = new IntersectionObserver((es) => {
    for (const e of es) { const m = momenti.find(x => x.el === e.target); if (m) m.visto = e.isIntersecting; }
    if (attivi().length) avviaCiclo(); else ferma();
  }, { rootMargin: '60% 0px' });
  momenti.forEach(m => io.observe(m.el));
  document.addEventListener('visibilitychange', () => { document.hidden ? ferma() : avviaCiclo(); });
  new MutationObserver(() => { sottoMenu() ? ferma() : avviaCiclo(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  /* i programmi WebGL si compilano prima, in parallelo (come nell'hero) */
  momenti.forEach(m => m.pezzi.forEach(q => { q.m.visible = true; }));
  try { await renderer.compileAsync(scene, camera); } catch (e) { /* al primo fotogramma */ }
  momenti.forEach(nascondi);
  pronto = true;
  avviaCiclo();
  return { renderer, scene, camera };
}
