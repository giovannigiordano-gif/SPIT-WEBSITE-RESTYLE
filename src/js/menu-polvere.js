/* ═══════════════════════════════════════════════════════════════════════════
   SALESPROCESS · menu-polvere.js — le particelle del menu (16.10)
   ---------------------------------------------------------------------------
   «Anche nel menu inserisci effetti particellari e animati.» La polvere del
   palco, portata nella card del menu: i quadrati del marchio (raggio 22%),
   per lo più bianco caldo, uno su cinque arancione, a tre profondità
   (più vicini = più grandi, più chiari, più veloci).
     · APERTURA  esplodono dal bottone Menu, da dove nasce la card, e si
                 spargono frenando; poi salgono piano, ondeggiando.
     · CURSORE   si scostano dal puntatore (solo con puntatore fine).
     · VOCE      passando su una voce quelle arancioni le volano attorno,
                 e dal suo quadratino ne parte un piccolo sbuffo.
     · CLIC      la voce scelta scoppia.
     · CHIUSURA  si spengono in 250ms e il ciclo si ferma.
   Una tela sola, 2D, dietro le voci; gira solo a menu aperto. Caricato alla
   prima apertura (motion.js), mai a movimento ridotto.
   ═══════════════════════════════════════════════════════════════════════════ */

const BIANCO = '255,238,222', ARANCIO = '255,130,0';

export function avvia(card) {
  const tela = document.createElement('canvas');
  tela.className = 'menu__polvere';
  tela.setAttribute('aria-hidden', 'true');
  card.prepend(tela);
  const ctx = tela.getContext('2d');
  const fine = matchMedia('(pointer: fine)').matches;
  let W = 0, H = 0, dpr = 1, raf = 0, ultimo = 0, t = 0, aperto = false, alfa = 0;
  let calamita = null;
  const mouse = { x: -1e4, y: -1e4, dentro: false };
  const polvere = [], sbuffi = [];

  const nuova = (x, y) => {
    const z = Math.random() ** 1.6;               /* i più sono lontani */
    return {
      x, y, z, vx: 0, vy: 0,
      s: 2 + z * 7,
      a: .14 + z * .56,
      ar: Math.random() < .26,
      sale: 7 + z * 20,                             /* px/s verso l'alto */
      f: .25 + Math.random() * .5, ph: Math.random() * 6.28, sway: 4 + z * 10,
      rot: Math.random() * 6.28, vr: (Math.random() - .5) * (.4 + z),
    };
  };
  const misura = () => {
    W = card.clientWidth; H = card.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, W < 700 ? 1.5 : 2);
    tela.width = Math.max(1, Math.round(W * dpr)); tela.height = Math.max(1, Math.round(H * dpr));
    tela.style.width = W + 'px'; tela.style.height = H + 'px';
    const n = Math.round(Math.min(150, Math.max(50, W * H / 11000)));
    while (polvere.length < n) polvere.push(nuova(Math.random() * W, Math.random() * H));
    polvere.length = n;
  };

  /* un quadrato di polvere; il rettangolo arrotondato dove c'è */
  const quadrato = (x, y, s, rot) => {
    const c = Math.cos(rot) * dpr, si = Math.sin(rot) * dpr;
    ctx.setTransform(c, si, -si, c, x * dpr, y * dpr);
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(-s / 2, -s / 2, s, s, s * .22); else ctx.rect(-s / 2, -s / 2, s, s);
    ctx.fill();
  };

  const passo = (ora) => {
    raf = requestAnimationFrame(passo);
    const dt = Math.min(.05, (ora - (ultimo || ora)) / 1000); ultimo = ora; t += dt;
    alfa += ((aperto ? 1 : 0) - alfa) * Math.min(1, dt * (aperto ? 4 : 9));
    if (!aperto && alfa < .02) { cancelAnimationFrame(raf); raf = 0; ultimo = 0; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, tela.width, tela.height); return; }
    const frena = Math.min(1, dt * 1.7), R = 120;
    for (const p of polvere) {
      p.vx += (Math.sin(t * p.f + p.ph) * p.sway - p.vx) * frena;
      p.vy += (-p.sale - p.vy) * frena;
      if (mouse.dentro) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < R * R) { const d = Math.sqrt(d2) || 1, k = (1 - d / R) * 1100 * (.4 + p.z) * dt; p.vx += dx / d * k; p.vy += dy / d * k; }
      }
      /* le arancioni vengono alla voce da tutta la card e le girano attorno */
      if (calamita && p.ar) {
        const dx = calamita.x - p.x, dy = calamita.y - p.y, d = Math.hypot(dx, dy) || 1;
        const k = (.35 + .65 * Math.max(0, 1 - d / 1400)) * 640 * dt;
        p.vx += dx / d * k; p.vy += dy / d * k;
        if (d < 150) { const g = (1 - d / 150) * 420 * dt; p.vx += -dy / d * g; p.vy += dx / d * g; }
      }
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; p.vx = p.vy = 0; }
      else if (p.y > H + 40) p.y = -10;
      if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
    }
    for (let i = sbuffi.length - 1; i >= 0; i--) {
      const q = sbuffi[i]; q.vita -= dt;
      if (q.vita <= 0) { sbuffi.splice(i, 1); continue; }
      q.vx *= 1 - Math.min(1, dt * 2.6); q.vy *= 1 - Math.min(1, dt * 2.6); q.vy -= 30 * dt;
      q.x += q.vx * dt; q.y += q.vy * dt; q.rot += q.vr * dt;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, tela.width, tela.height);
    for (const p of polvere) {
      ctx.fillStyle = `rgba(${p.ar ? ARANCIO : BIANCO},${(p.a * (p.ar ? 1.15 : .85) * alfa).toFixed(3)})`;
      quadrato(p.x, p.y, p.s, p.rot);
    }
    for (const q of sbuffi) {
      ctx.fillStyle = `rgba(${ARANCIO},${(Math.min(1, q.vita / q.durata * 1.4) * .95 * alfa).toFixed(3)})`;
      quadrato(q.x, q.y, q.s, q.rot);
    }
  };
  const gira = () => { if (!raf) { ultimo = 0; raf = requestAnimationFrame(passo); } };

  /* il quadratino davanti alla voce (.menu__nome::before), nella tela */
  const segno = (a) => {
    const n = a.querySelector('.menu__nome'); if (!n) return null;
    const r = n.getBoundingClientRect(), c = card.getBoundingClientRect(), em = parseFloat(getComputedStyle(n).fontSize) || 40;
    return { x: r.left - c.left + em * .1, y: r.top - c.top + em * .455 };
  };
  const sbuffo = (x, y, quanti, forza) => {
    for (let i = 0; i < quanti; i++) {
      const ang = Math.random() * 6.28, v = forza * (.35 + Math.random() * .65);
      sbuffi.push({ x, y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, s: 2.4 + Math.random() * 4.2, rot: ang, vr: (Math.random() - .5) * 8, vita: .7 + Math.random() * .5, durata: 1.2 });
    }
  };

  new ResizeObserver(() => { if (aperto) misura(); }).observe(card);
  if (fine) {
    card.addEventListener('pointermove', (e) => { const c = card.getBoundingClientRect(); mouse.x = e.clientX - c.left; mouse.y = e.clientY - c.top; mouse.dentro = true; }, { passive: true });
    card.addEventListener('pointerleave', () => { mouse.dentro = false; });
  }

  return {
    /* esplodono dal bottone (il suo centro, in coordinate di viewport) */
    apri(da) {
      misura();
      const c = card.getBoundingClientRect();
      const ox = da ? da.x - c.left : W - 60, oy = da ? da.y - c.top : 30;
      for (const p of polvere) {
        p.x = ox + (Math.random() - .5) * 20; p.y = oy + (Math.random() - .5) * 12;
        const ang = Math.PI * (.5 + Math.random() * 1.05), v = 260 + Math.random() * 980 * (.5 + p.z);
        p.vx = Math.cos(ang) * v; p.vy = Math.abs(Math.sin(ang)) * v * .9 + 40;
      }
      aperto = true; calamita = null; gira();
    },
    chiudi() { aperto = false; calamita = null; mouse.dentro = false; },
    /* la voce sotto il cursore (o col fuoco): le arancioni le volano attorno */
    voce(a) {
      const s = a && segno(a);
      if (s && (!calamita || calamita.a !== a)) sbuffo(s.x, s.y, 8, 260);
      calamita = s ? { ...s, a } : null;
    },
    /* la voce scelta scoppia */
    scoppio(a) { const s = segno(a); if (s) sbuffo(s.x, s.y, 22, 520); },
  };
}
