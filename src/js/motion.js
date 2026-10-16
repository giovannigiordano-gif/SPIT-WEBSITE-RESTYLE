/* ═══════════════════════════════════════════════════════════════════════════
   SALESPROCESS · motion.js — il 25% che il CSS non può fare
   ---------------------------------------------------------------------------
   NESSUNO SMOOTH SCROLL GLOBALE: no Lenis, no ScrollSmoother. Lo smoothing
   va sull'ANIMAZIONE (scrub .5–.6), non sull'input dell'utente. Il pubblico
   — titolari di PMI su desktop Windows con la rotella del mouse — è il
   profilo peggiore possibile per lo scroll-hijack, e il riferimento stesso
   non lo usa.
   ═══════════════════════════════════════════════════════════════════════════ */
(() => {
  'use strict';
  const RM = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* Icone dei comandi di pausa: disegnate, non glifi unicode (❚❚ e ▶
     cambiano forma a ogni font di fallback).                           */
  const ICO_PAUSA = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M8.5 5.5v13M15.5 5.5v13"/></svg>';
  const ICO_PLAY  = '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 5.6v12.8a.6.6 0 0 0 .9.5l10-6.4a.6.6 0 0 0 0-1L8.9 5.1a.6.6 0 0 0-.9.5z"/></svg>';

  /* ── BARRA ANNUNCIO ───────────────────────────────────────────────────── */
  /* la chiave è nuova (15.10): chi aveva chiuso l'annuncio dell'evento
     vede l'invito a collaborare, che è un altro messaggio */
  try { if (localStorage.getItem('barra-collabora') === 'off') document.documentElement.classList.add('barra-off'); } catch {}
  $('#barra-x')?.addEventListener('click', () => {
    document.documentElement.classList.add('barra-off');
    try { localStorage.setItem('barra-collabora', 'off'); } catch {}
  });

  /* ── IL PALCO · quale luce è accesa ─────────────────────────────────────
     Ogni sezione dichiara la sua atmosfera (classe sf--* o data-atmo);
     quella che attraversa la linea mediana del viewport accende il suo
     livello sul palco fisso. Il resto è CSS: dissolvenza di opacità,
     compositor, nessun gradiente ridipinto.                            */
  const atmoDi = (n) => n.dataset.atmo
    || (n.className.match(/\bsf--(\w+)/) || [])[1]
    || (n.matches('.hero, .testa-pag, .cartelli, .footer') ? 'nero'
      : n.matches('.sez--deep') ? 'pozzo'
      : n.matches('.finale, .cand') ? 'alba' : 'base');
  const sezioni = $$('main > section, main > div, .footer');
  if (sezioni.length && 'IntersectionObserver' in window) {
    const root = document.documentElement;
    const ioAtmo = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) root.dataset.atmo = atmoDi(e.target);
    }, { rootMargin: '-49% 0px -49% 0px' });
    sezioni.forEach(s => ioAtmo.observe(s));
  }

  /* ── NAV · ISTERESI A DUE SOGLIE ────────────────────────────────────────
     Attiva a 48px, disattiva a 12px. Senza isteresi il backdrop-filter
     sfarfalla su trackpad e in rubber-band, perché transiziona in 320ms. */
  const nav = $('#nav');
  if (nav) {
    let on = false;
    const f = () => {
      const y = scrollY;
      if (!on && y > 48) { on = true; nav.classList.add('is-fissa'); }
      else if (on && y < 12) { on = false; nav.classList.remove('is-fissa'); }
    };
    addEventListener('scroll', f, { passive: true }); f();
  }

  /* ── IL CAPITOLO IN NAV ─────────────────────────────────────────────────
     Le sezioni di un capitolo portano data-cap; il nome viene dal suo
     segnacapitolo (.capo). Quella che attraversa la linea mediana decide;
     fuori dai capitoli (copertina, chiusura) l'etichetta si spegne.     */
  const navCap = $('#nav-cap');
  if (navCap && $('[data-cap]') && 'IntersectionObserver' in window) {
    const nomi = {};
    $$('.capo').forEach(c => {
      const k = c.closest('[data-cap]')?.dataset.cap;
      if (k) nomi[k] = [$('.capo__n', c)?.textContent.trim() || '', $('.capo__nome', c)?.textContent.trim() || ''];
    });
    const nN = $('.nav__cap-n', navCap), nNome = $('.nav__cap-nome', navCap);
    let ora = null;
    const metti = (k) => {
      if (k === ora) return; ora = k;
      if (!k || !nomi[k]) { navCap.classList.remove('is-on'); return; }
      [nN.textContent, nNome.textContent] = nomi[k];
      navCap.classList.add('is-on');
      if (!RM()) navCap.animate([{ opacity: 0, translate: '0 8px' }, { opacity: 1, translate: '0 0' }],
        { duration: 360, easing: 'cubic-bezier(.16,.84,.24,1)' });
    };
    const ioCap = new IntersectionObserver((es) => {
      for (const e of es) if (e.isIntersecting) metti(e.target.dataset.cap || null);
    }, { rootMargin: '-49% 0px -49% 0px' });
    $$('main > section, main > div').forEach(s => ioCap.observe(s));
  }

  /* ── LA SCENA 3D DELL'HERO ──────────────────────────────────────────────
     Solo dove il <head> ha acceso html.vuole-3d (desktop, puntatore fine,
     niente reduced-motion, niente save-data). Si scarica DOPO il load e in
     idle: three.js non tocca mai il percorso critico. Se qualcosa va
     storto (niente WebGL, CDN irraggiungibile) la classe si spegne e torna
     la versione DOM, che è già in pagina.                              */
  const radice = document.documentElement, scena = $('#hero-scena');
  if (scena && radice.classList.contains('vuole-3d')) {
    const torna = () => { if (!$('.hero.is-3d')) radice.classList.remove('vuole-3d'); };
    const parti = () => import('/js/scena3d.js')
      .then(m => m.avvia(scena))
      .then(() => radice.classList.add('vuole-3d'))
      .catch(() => radice.classList.remove('vuole-3d'));
    const quandoLibero = () => ('requestIdleCallback' in window ? requestIdleCallback(parti, { timeout: 1200 }) : setTimeout(parti, 250));
    if (document.readyState === 'complete') quandoLibero(); else addEventListener('load', quandoLibero, { once: true });
    setTimeout(torna, 6000);
  }

  /* ── L'ELICA 3D DEL DNA (15.10) ─────────────────────────────────────────
     Stesso cancello dell'hero (html.vuole-3d), stesso momento (dopo il
     load, in idle). La fascia sotto l'apertura sempre; la spina dei
     principi solo dove le colonne sono due. Se qualcosa va storto resta
     la versione CSS, che è già in pagina.                              */
  const fasciaDna = $('.elica-fascia'), spinaDna = $('#comand');
  if (fasciaDna && radice.classList.contains('vuole-3d')) {
    const parti = () => import('/js/elica3d.js')
      .then(m => m.avvia({ fascia: fasciaDna, spina: spinaDna && matchMedia('(min-width: 861px)').matches ? spinaDna : null }))
      .catch(() => { fasciaDna.classList.remove('is-3d'); spinaDna?.classList.remove('is-3d'); });
    const quandoLibero = () => ('requestIdleCallback' in window ? requestIdleCallback(parti, { timeout: 1200 }) : setTimeout(parti, 250));
    if (document.readyState === 'complete') quandoLibero(); else addEventListener('load', quandoLibero, { once: true });
  }

  /* ── I CUBI DELLA HOME (16.10) ─────────────────────────────────────────
     I contatti dell'hero tornano tre volte lungo la home (cubi3d.js):
     cadono accanto al problema, salgono a scalinata accanto ai numeri,
     arrivano al trofeo del finale. Stesso cancello dell'hero; il modulo
     si scarica quando il primo dei tre momenti è a meno di uno schermo. */
  const ancoreCubi = document.querySelectorAll('[data-cubi]');
  if (ancoreCubi.length && radice.classList.contains('vuole-3d')) {
    const vicino = new IntersectionObserver((es) => {
      if (!es.some(e => e.isIntersecting)) return;
      vicino.disconnect();
      const parti = () => { if (radice.classList.contains('vuole-3d')) import('/js/cubi3d.js').then(m => m.avvia()).catch(() => {}); };
      'requestIdleCallback' in window ? requestIdleCallback(parti, { timeout: 800 }) : setTimeout(parti, 100);
    }, { rootMargin: '70% 0px' });
    const osserva = () => ancoreCubi.forEach(a => vicino.observe(a));
    if (document.readyState === 'complete') osserva(); else addEventListener('load', osserva, { once: true });
  }

  /* ── IL MENU A CARD GIGANTE ─────────────────────────────────────────────
     Un dialogo vero. Apre togliendo [hidden] e accendendo .is-on al
     fotogramma dopo, così la transizione parte; chiude al contrario e
     rimette [hidden] solo a transizione finita. La card nasce DAL bottone
     Menu: il suo rettangolo, misurato qui, è il ritaglio di partenza
     (--da). Il fuoco resta nella card (Tab gira), Esc, «Chiudi» o un clic
     sul velo chiudono, e il fuoco torna al bottone. Le anteprime si
     scaricano alla prima apertura, non al caricamento della pagina.     */
  const burger = $('#burger'), menu = $('#menu');
  if (burger && menu) {
    const card = $('.menu__card', menu), chiudiBtn = $('#menu-chiudi');
    const ant = $$('.menu__ant', menu), voci = $$('.menu__voci a', menu);
    const base = () => voci.find(a => a.hasAttribute('aria-current'))?.dataset.foto || 'casa';
    const mostra = (k) => ant.forEach(n => n.classList.toggle('is-on', n.dataset.foto === k));
    let aperto = false, caricato = false, tNascondi = 0;

    const origine = () => {
      const b = burger.getBoundingClientRect(), c = card.getBoundingClientRect();
      if (!b.width || !c.width) return;
      const r = Math.round(b.height / 2);
      card.style.setProperty('--da', `inset(${b.top - c.top}px ${c.right - b.right}px ${c.bottom - b.bottom}px ${b.left - c.left}px round ${r}px)`);
    };
    const carica = () => {
      if (caricato) return; caricato = true;
      $$('[data-src]', menu).forEach(i => { i.decoding = 'async'; i.src = i.dataset.src; i.removeAttribute('data-src'); });
    };
    const fuocabili = () => $$('a[href], button:not([disabled])', card).filter(n => n.getClientRects().length);
    /* Con il menu aperto il resto della pagina è INERTE: Safari col Tab
       usciva dalla card verso i bottoni dietro (QA giro 3). E Esc chiude
       anche se il fuoco è caduto sul <body> (un clic su testo o foto). */
    const inerte = (si) => [...document.body.children].forEach(n => { if (n !== menu && n.tagName !== 'SCRIPT') n.inert = si; });
    document.addEventListener('keydown', (e) => { if (aperto && e.key === 'Escape') { e.preventDefault(); chiudi(); } });
    /* LA POLVERE (16.10, «nel menu effetti particellari e animati»): i
       quadrati del marchio su una tela dietro le voci (menu-polvere.js).
       Il modulo arriva alla prima apertura, mai a movimento ridotto. */
    let polvere = null, polvereInArrivo = null;
    const conPolvere = (fn) => {
      if (RM()) return;
      if (polvere) { fn(polvere); return; }
      polvereInArrivo ||= import('/js/menu-polvere.js').then(m => (polvere = m.avvia(card))).catch(() => null);
      polvereInArrivo.then(p => { if (p) fn(p); });
    };

    const apri = () => {
      if (aperto) return; aperto = true; clearTimeout(tNascondi);
      riparti();
      carica(); mostra(base());
      menu.hidden = false;
      origine();
      /* la polvere esplode dal bottone, da dove nasce la card */
      const bb = burger.getBoundingClientRect();
      conPolvere(p => { if (aperto) p.apri({ x: bb.left + bb.width / 2, y: bb.top + bb.height / 2 }); });
      radice.classList.add('menu-aperto'); inerte(true);
      burger.setAttribute('aria-expanded', 'true');
      /* due fotogrammi: il primo applica --da con la card ancora chiusa */
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-on')));
      (chiudiBtn || fuocabili()[0])?.focus({ preventScroll: true });
    };
    const chiudi = (torna = true) => {
      if (!aperto) return; aperto = false;
      origine();
      polvere?.chiudi();
      menu.classList.remove('is-on');
      radice.classList.remove('menu-aperto'); inerte(false);
      burger.setAttribute('aria-expanded', 'false');
      tNascondi = setTimeout(() => { menu.hidden = true; }, RM() ? 0 : 440);
      if (torna) burger.focus({ preventScroll: true });
    };

    /* LA FOTO CHE PASSA DI MANO (giro 3 effetti). Verso un'altra pagina il
       menu NON si chiude: la pagina vecchia viene fotografata così com'è,
       e l'anteprima accesa riceve il nome che la pagina nuova darà alla
       sua fotografia d'apertura (pagereveal, nel <head>). Prima il box
       dell'anteprima si stringe sulla foto (è in object-fit: contain in un
       riquadro più largo): il volo parte dalla foto, non dal riquadro.
       Senza View Transitions fra documenti si naviga e basta.          */
    const senzaNomi = () => ant.forEach(n => [n, ...$$('img', n)].forEach(i => { i.style.viewTransitionName = ''; i.style.viewTransitionClass = ''; }));
    /* una partenza interrotta (Esc durante un caricamento lento, Indietro
       dalla cache) non deve lasciare il menu spento al prossimo giro */
    const riparti = () => {
      senzaNomi(); card.style.viewTransitionName = '';
      menu.classList.remove('is-parte'); voci.forEach(v => v.classList.remove('is-scelta'));
      ant.forEach(n => ['inset', 'left', 'top', 'width', 'height'].forEach(k => n.style.removeProperty(k)));
    };
    const stringi = (img) => {
      const b = img.getBoundingClientRect(), box = img.offsetParent?.getBoundingClientRect();
      if (!box || !img.naturalWidth) return;
      const ar = img.naturalWidth / img.naturalHeight;
      let w = b.width, h = w / ar; if (h > b.height) { h = b.height; w = h * ar; }
      Object.assign(img.style, { inset: 'auto', left: `${b.left - box.left + (b.width - w) / 2}px`, top: `${b.top - box.top + b.height - h}px`, width: `${w}px`, height: `${h}px` });
    };
    const vola = (a) => {
      if (!('onpagereveal' in window) || RM() || a.origin !== location.origin || a.pathname === location.pathname) return false;
      senzaNomi();
      const p = ant.find(n => n.dataset.foto === a.dataset.foto && n.classList.contains('is-on') && n.getClientRects().length);
      if (p?.tagName === 'IMG') { stringi(p); p.style.viewTransitionName = 'foto-pagina'; }
      else if (p) $$('img', p).forEach(i => { i.style.viewTransitionName = 'volto-' + (i.getAttribute('src') || '').split('/').pop().split('-')[0]; i.style.viewTransitionClass = 'volto'; });
      /* vt-menu sempre (anche su telefono, dove non ci sono anteprime: la
         pagina vecchia non deve restare sotto alla nuova); vt-foto se vola */
      try { sessionStorage.setItem('vt-menu', '1'); if (p) sessionStorage.setItem('vt-foto', a.dataset.foto); } catch (x) { /* niente volo */ }
      /* la card ha un nome suo: si dissolve in fretta (con il suo «Chiudi»)
         invece di restare sotto la pagina nuova mentre sale a gradini */
      card.style.viewTransitionName = 'menu-card';
      menu.classList.add('is-parte'); a.classList.add('is-scelta');
      return true;
    };

    burger.addEventListener('click', apri);
    chiudiBtn?.addEventListener('click', () => chiudi());
    menu.addEventListener('click', (e) => {
      if (!card.contains(e.target)) { chiudi(); return; }
      const a = e.target.closest('a'); if (!a) return;
      /* ctrl/⌘/maiuscolo/clic centrale: nuova scheda, la pagina resta qui */
      if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.closest('.menu__voci')) polvere?.scoppio(a);
      if (a.dataset.foto && vola(a)) return;
      chiudi(false);
    });
    menu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const f = fuocabili(); if (!f.length) return;
      const primo = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primo) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primo.focus(); }
    });
    /* L'anteprima segue il cursore e la tastiera; uscendo dall'elenco
       torna quella della pagina in cui si è.                            */
    voci.forEach(a => {
      const k = () => { mostra(a.dataset.foto); polvere?.voce(a); };
      a.addEventListener('pointerenter', k); a.addEventListener('focus', k);
    });
    $('.menu__voci', menu)?.addEventListener('pointerleave', () => { mostra(base()); polvere?.voce(null); });
    /* Tornando indietro dalla cache del browser il menu non resta aperto. */
    addEventListener('pageshow', (e) => {
      if (!e.persisted) return;
      riparti(); polvere?.chiudi();
      aperto = false; menu.classList.remove('is-on'); menu.hidden = true;
      radice.classList.remove('menu-aperto'); inerte(false); burger.setAttribute('aria-expanded', 'false');
    });
  }

  /* ── FALLBACK @supports · un solo IntersectionObserver ──────────────────
     Serve solo dove `animation-timeline` non esiste (Safari ≤17, Firefox).
     Failsafe: se l'observer non scatta, lo stato finale viene forzato.   */
  if (!CSS.supports('animation-timeline: view()')) {
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: .18 });
    const tgt = $$('.rise, .scalinata, .finale, .arco');
    tgt.forEach(n => io.observe(n));
    setTimeout(() => tgt.forEach(n => n.classList.add('is-in')), 3000);
    /* il principio che stai leggendo (DNA): stessa linea di lettura del CSS */
    const ioL = new IntersectionObserver((es) => es.forEach(e => e.target.classList.toggle('is-letto', e.isIntersecting)),
      { rootMargin: '-40% 0px -45% 0px' });
    $$('.com').forEach(n => ioL.observe(n));
  }

  /* ═══ CAROSELLO AFFERRABILE ═══════════════════════════════════════════════
     Una sola implementazione per due tracce (le prove e la squadra), con i
     quattro difetti misurati sul riferimento corretti:
       · velocità in DELTA-TIME, non per frame;
       · scala di prossimità NON invertita — il centro è il picco;
       · zero blur per frame;
       · zero layout thrashing: le letture sono in cache.
     Sotto 1100px e in reduced-motion non parte affatto: il contenitore
     diventa uno scroll-snap nativo, più veloce e più familiare.         */
  function carosello({ wrap, pista, cards, pausa, prev, next, v = .03 }) {
    if (!wrap || !pista || RM() || !matchMedia('(min-width: 1101px)').matches) return;

    let pos = 0, speed = v, target = v, last = 0, raf = 0, visibile = true, bloccato = false;
    let cache = [], meta = 0;

    const misura = () => {
      cache = $$(cards, pista).map(n => ({ n, l: n.offsetLeft, w: n.offsetWidth }));
      meta = pista.scrollWidth / 2;
    };
    misura();

    const avvolgi = () => { if (-pos >= meta) pos += meta; if (pos > 0) pos -= meta; };

    const tick = (t) => {
      const dt = Math.min(48, last ? t - last : 16); last = t;
      speed += (target - speed) * .08;
      pos -= speed * dt;
      avvolgi();
      pista.style.transform = `translate3d(${pos.toFixed(2)}px,0,0)`;

      const vpC = innerWidth / 2, soglia = innerWidth * .45;
      for (const c of cache) {
        const cx = c.l + pos + c.w / 2;
        /* Il centro è il PICCO. Sul riferimento la formula è invertita —
           misurata dal vivo: 0,841 al centro contro 1,06 ai bordi, cioè
           una valle dove doveva esserci un picco.                      */
        const k = Math.max(0, 1 - Math.abs(cx - vpC) / soglia);
        /* PIÙ 3D (15.10): a ventaglio — le card ai lati guardano il centro e
           arretrano (rotateY e translateZ, sections.css) */
        const d = Math.max(-1, Math.min(1, (cx - vpC) / soglia));
        c.n.style.setProperty('--ry', (-d * 26).toFixed(2) + 'deg');
        c.n.style.setProperty('--tz', (-Math.abs(d) * 110).toFixed(1) + 'px');
        c.n.style.setProperty('--s', (0.95 + 0.08 * k).toFixed(3));
        c.n.style.setProperty('--o', (0.72 + 0.28 * k).toFixed(3));
        c.n.style.zIndex = k > .65 ? 2 : 1;
        /* la scheda al centro si accende (sections.css, .is-centro) */
        c.n.classList.toggle('is-centro', k > .8);
      }
      raf = requestAnimationFrame(tick);
    };
    const avvia = () => { if (!raf && visibile) { last = 0; raf = requestAnimationFrame(tick); } };
    const ferma = () => { cancelAnimationFrame(raf); raf = 0; };
    avvia();

    wrap.addEventListener('pointerenter', () => { target = 0; });
    wrap.addEventListener('pointerleave', () => { if (!bloccato) target = v; });
    /* Con la tastiera la scheda che riceve il fuoco viene portata al centro:
       la pista è traslata via transform, quindi il browser non può farla
       scorrere in vista da solo e il fuoco finirebbe fuori schermo.    */
    wrap.addEventListener('focusin', (e) => {
      target = 0;
      const c = cache.find(x => x.n === e.target.closest(cards));
      if (c) { pos = innerWidth / 2 - (c.l + c.w / 2); avvolgi(); }
    });
    wrap.addEventListener('focusout', () => { if (!bloccato) target = v; });

    /* SC 2.2.2 Pause/Stop/Hide è livello A: il controllo è reale. */
    const btn = pausa && $(pausa);
    btn?.addEventListener('click', () => {
      bloccato = !bloccato;
      target = bloccato ? 0 : v;
      btn.setAttribute('aria-pressed', String(bloccato));
      btn.innerHTML = bloccato ? ICO_PLAY : ICO_PAUSA;
      btn.setAttribute('aria-label', bloccato ? 'Riavvia lo scorrimento' : 'Ferma lo scorrimento');
    });

    /* Frecce: un passo = una scheda + il suo gap, animato dal rAF stesso
       tramite un offset che decade. Nessuna libreria, nessun scroll-behavior. */
    const passo = (dir) => {
      const larghezza = cache.length ? cache[0].w + 16 : 280;
      const da = pos, a = pos - dir * larghezza, t0 = performance.now();
      bloccato = true; target = 0;
      if (btn) { btn.setAttribute('aria-pressed', 'true'); btn.innerHTML = ICO_PLAY; btn.setAttribute('aria-label', 'Riavvia lo scorrimento'); }
      const anima = (t) => {
        const p = Math.min(1, (t - t0) / 460);
        const e = 1 - Math.pow(1 - p, 3);          /* cubic-out */
        pos = da + (a - da) * e;
        avvolgi();
        if (p < 1) requestAnimationFrame(anima);
      };
      requestAnimationFrame(anima);
    };
    if (prev) $(prev)?.addEventListener('click', () => passo(-1));
    if (next) $(next)?.addEventListener('click', () => passo(1));

    /* DRAG con axis-lock: se il gesto è più verticale che orizzontale
       vince lo scroll della pagina.                                    */
    let giu = false, x0 = 0, y0 = 0, p0 = 0, mosso = false;
    pista.addEventListener('pointerdown', (e) => {
      giu = true; mosso = false; x0 = e.clientX; y0 = e.clientY; p0 = pos;
      pista.setPointerCapture(e.pointerId);
    });
    pista.addEventListener('pointermove', (e) => {
      if (!giu) return;
      const dx = e.clientX - x0, dy = e.clientY - y0;
      if (!mosso) {
        if (Math.abs(dx) < 18 && Math.abs(dy) < 18) return;
        if (Math.abs(dx) < Math.abs(dy)) { giu = false; return; }
        mosso = true; target = 0; wrap.style.touchAction = 'none';
      }
      pos = p0 + dx; avvolgi();
    });
    const su = (e) => {
      if (!giu) return; giu = false; wrap.style.touchAction = '';
      if (mosso) {
        /* click-guard: dopo un drag il click non deve seguire il link. */
        const guard = (ev) => { ev.preventDefault(); ev.stopImmediatePropagation(); };
        pista.addEventListener('click', guard, { capture: true, once: true });
        setTimeout(() => pista.removeEventListener('click', guard, { capture: true }), 320);
      }
      if (!bloccato) target = v;
      try { pista.releasePointerCapture(e.pointerId); } catch {}
    };
    pista.addEventListener('pointerup', su);
    pista.addEventListener('pointercancel', su);

    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(misura, 80); }, { passive: true });
    document.addEventListener('visibilitychange', () => { visibile = !document.hidden; visibile ? avvia() : ferma(); });
    new IntersectionObserver(([e]) => { visibile = e.isIntersecting; visibile ? avvia() : ferma(); }, { threshold: 0 }).observe(wrap);
  }

  carosello({ wrap: $('#nastro-wrap'), pista: $('#nastro-pista'), cards: '.scheda', pausa: '#nastro-pausa' });
  /* Dove il nastro è uno scorrimento nativo (telefono, tablet), la scheda
     che passa al centro della fascia si accende lo stesso. */
  const nwrap = $('#nastro-wrap');
  if (nwrap && (!matchMedia('(min-width: 1101px)').matches || RM()) && 'IntersectionObserver' in window) {
    const ioC = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('is-centro', e.isIntersecting)),
      { root: nwrap, rootMargin: '0px -42% 0px -42%', threshold: 0 });
    $$('.scheda', nwrap).forEach(n => ioC.observe(n));
  }
  carosello({ wrap: $('#squadra-wrap'), pista: $('#squadra-pista'), cards: '.pers',
              pausa: '#squadra-pausa', prev: '#sq-prev', next: '#sq-next', v: .024 });

  /* IL NASTRO DEI LOGHI fuori schermo si ferma (16.10, «ottimizza per
     mobile»): un'animazione infinita che gira dove nessuno guarda è solo
     batteria consumata. */
  if ('IntersectionObserver' in window) {
    const ioLoghi = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('is-fuori', !e.isIntersecting)));
    $$('.loghi').forEach(n => ioLoghi.observe(n));
  }

  /* ── PIASTRA CTA MOBILE ─────────────────────────────────────────────────
     Visibile SOLO nella terra di mezzo: mai sopra l'hero (che ha già il suo
     CTA) e mai sopra la conversione. Due CTA identici nello stesso viewport
     sono un difetto, non una ridondanza utile.                          */
  /* UN SOLO ARANCIONE PER SCHERMO (audit 15.10): il CTA della nav e la
     piastra ci sono sempre; quando nello schermo c'è già un invito arancione
     della pagina (una chiusa, il finale, il form, la sala) la nav lo abbassa
     a contorno (html.cta-gemello) e la piastra scende. Prima la piastra
     sapeva solo di #candidatura e #muro: in Metodo, DNA, Eventi e Fatturare
     restava sopra la chiusa. */
  const piastra = $('#piastra'), radiceC = document.documentElement;
  const alto = $('#hero') || $('.testa-pag');
  const inviti = $$('main .cta--ar').filter(a => !a.closest('.nav, .menu, .piastra'));
  const conversioni = $$('#candidatura, #muro, #posti, .chiusa');
  const visti = new Set();
  let dentroAlto = !!alto;
  const calcolaC = () => {
    const doppio = visti.size > 0;
    radiceC.classList.toggle('cta-gemello', doppio);
    piastra?.classList.toggle('is-off', dentroAlto || doppio);
  };
  if ('IntersectionObserver' in window) {
    const tieni = es => { es.forEach(e => e.isIntersecting ? visti.add(e.target) : visti.delete(e.target)); calcolaC(); };
    const ioInv = new IntersectionObserver(tieni, { threshold: .5 }), ioConv = new IntersectionObserver(tieni, { threshold: .12 });
    inviti.forEach(n => ioInv.observe(n)); conversioni.forEach(n => ioConv.observe(n));
    /* sui telefoni la barra in cima lascia lo schermo quando l'apertura è
       passata (html.barra-via, solo sotto i 620px): barra, nav e piastra
       insieme mangiavano un quarto dello schermo */
    if (alto) new IntersectionObserver(([e]) => {
      dentroAlto = e.isIntersecting; radiceC.classList.toggle('barra-via', !e.isIntersecting); calcolaC();
    }, { threshold: 0 }).observe(alto);
  }
  calcolaC();

  /* ── FORM · SQUALIFICA IN TEMPO REALE ───────────────────────────────────
     Il quiz viene assorbito dal form: zero passi aggiuntivi, meno
     candidature da leggere a mano, e il lead non idoneo viene PARCHEGGIATO
     invece che bruciato.                                                */
  const form = $('#form'), fat = $('#f-fatturato'), sub = $('#form-submit');
  if (form && fat && sub) {
    const etichetta = $('.cta__label', sub) || sub;
    /* l'etichetta di partenza è quella della pagina («Invia la candidatura»,
       «Prenota il posto»): prima tornava sempre «Invia la candidatura» */
    const originale = etichetta.textContent;
    fat.addEventListener('change', () => {
      const fuori = fat.value === 'sotto1';
      form.classList.toggle('is-squalificato', fuori);
      etichetta.textContent = fuori ? 'Iscriviti al podcast' : originale;
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      /* audit 15.10: sotto il milione il bottone dice «Iscriviti al podcast»
         e porta al podcast, non manda la candidatura dell'azienda */
      if (form.classList.contains('is-squalificato')) { location.href = 'https://www.youtube.com/channel/UCaB0Zuz1IO5pTSJ5qZPv8IA'; return; }
      /* prima si controlla: un campo vuoto si segna, con il messaggio del
         browser sotto, e il fuoco ci va sopra (prima un form vuoto «partiva») */
      let primo = null;
      $$('input, select', form).forEach(c => {
        const campo = c.closest('.campo'); if (!campo) return;
        let m = $('.campo__errore', campo);
        if (c.checkValidity()) { c.removeAttribute('aria-invalid'); campo.classList.remove('campo--errore'); m?.remove(); return; }
        c.setAttribute('aria-invalid', 'true'); campo.classList.add('campo--errore');
        if (!m) { m = document.createElement('p'); m.className = 'campo__errore'; m.id = c.id + '-errore'; campo.append(m); c.setAttribute('aria-describedby', ((c.getAttribute('aria-describedby') || '') + ' ' + m.id).trim()); }
        m.textContent = c.validationMessage;
        primo ||= c;
      });
      if (primo) { primo.focus(); return; }
      sub.style.minWidth = sub.offsetWidth + 'px';   /* larghezza bloccata */
      etichetta.textContent = 'Invio in corso…';     /* nessuno spinner rotante */
      sub.disabled = true;
    });
  }

  /* ── LA LUCE CHE SEGUE IL CURSORE ───────────────────────────────────────
     Il bottone non si muove VERSO il cursore: resta fermo e si illumina
     dove sei. Mai una scrittura di stile per evento: throttle in rAF.
     Niente magnetic hover — è il cliché più riconoscibile del 2019-2021. */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !RM()) {
    let pend = null, raf = 0;
    const scrivi = () => {
      raf = 0; if (!pend) return;
      pend.n.style.setProperty('--x', pend.x + 'px');
      pend.n.style.setProperty('--y', pend.y + 'px');
      pend = null;
    };
    $$('.cta--luce').forEach(n => n.addEventListener('pointermove', (e) => {
      const r = n.getBoundingClientRect();
      pend = { n, x: e.clientX - r.left, y: e.clientY - r.top };
      if (!raf) raf = requestAnimationFrame(scrivi);
    }));
  }

  /* ── LA LUCE SULLE SUPERFICI ────────────────────────────────────────────
     Un solo handler DELEGATO su document per tutte le card del sito, con
     la scrittura throttlata in rAF: un listener per card sarebbe stato un
     listener per elemento su un centinaio di elementi.
     Scriviamo solo due custom property; il gradiente lo dipinge il CSS. */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !RM()) {
    const SUP = '.card, .sede';
    let pend = null, rafLuce = 0;
    const scriviLuce = () => {
      rafLuce = 0; if (!pend) return;
      pend.n.style.setProperty('--mx', pend.x + 'px');
      pend.n.style.setProperty('--my', pend.y + 'px');
      pend = null;
    };
    document.addEventListener('pointermove', (e) => {
      const n = e.target.closest(SUP); if (!n) return;
      const r = n.getBoundingClientRect();
      pend = { n, x: Math.round(e.clientX - r.left), y: Math.round(e.clientY - r.top) };
      if (!rafLuce) rafLuce = requestAnimationFrame(scriviLuce);
    }, { passive: true });
  }

  /* ── LA TORCIA, LA PROFONDITÀ, LA LUCE SULLE LETTERE ────────────────────
     Tre effetti di cursore, un solo linguaggio: la luce arancione che si
     sposta. Solo con il mouse e senza reduced-motion; ognuno scrive solo
     transform o due custom property, in rAF, mai per evento.          */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !RM()) {
    /* 1 · la torcia sul palco: segue il cursore con un filo di ritardo
       (lerp), e il ciclo si ferma da solo quando ha raggiunto il punto. */
    const torcia = $('.palco__torcia');
    if (torcia) {
      let tx = innerWidth / 2, ty = innerHeight * .4, cx = tx, cy = ty, rafT = 0;
      const segui = () => {
        cx += (tx - cx) * .14; cy += (ty - cy) * .14;
        torcia.style.translate = `${cx.toFixed(1)}px ${cy.toFixed(1)}px`;
        rafT = Math.abs(tx - cx) + Math.abs(ty - cy) > .5 ? requestAnimationFrame(segui) : 0;
      };
      addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        tx = e.clientX; ty = e.clientY;
        radice.classList.add('ha-cursore');
        if (!rafT) rafT = requestAnimationFrame(segui);
      }, { passive: true });
      document.addEventListener('pointerleave', () => radice.classList.remove('ha-cursore'));
    }

    /* 2 · la profondità nei pannelli dei reparti: la fotografia scivola di
       pochi pixel in senso opposto al cursore, il testo resta fermo. È la
       parallasse fra due piani, non un tilt della card.                */
    let pend = null, rafP = 0;
    const scriviP = () => { rafP = 0; if (!pend) return;
      pend.n.style.setProperty('--fx', pend.x + 'px'); pend.n.style.setProperty('--fy', pend.y + 'px'); pend = null; };
    document.addEventListener('pointermove', (e) => {
      const n = e.target.closest?.('.pannello'); if (!n) return;
      const r = n.getBoundingClientRect();
      pend = { n, x: (((e.clientX - r.left) / r.width) - .5) * -14, y: (((e.clientY - r.top) / r.height) - .5) * -10 };
      if (!rafP) rafP = requestAnimationFrame(scriviP);
    }, { passive: true });
    $$('.pannello').forEach(n => n.addEventListener('pointerleave', () => { n.style.setProperty('--fx', '0px'); n.style.setProperty('--fy', '0px'); }));

  }

  /* ── L'ANELLO DEL CURSORE (ritocchi del 15.10: «effetti mouse») ─────────
     Il cursore del sistema resta sempre visibile (terzo passaggio della
     regia: nasconderlo toglieva il cursore di testo e, nei momenti lenti,
     lasciava lo schermo senza cursore). Un anello a quadrato arrotondato lo
     segue con un filo di ritardo: sui bottoni ne prende la forma e li
     abbraccia (il bottone resta fermo: niente magnetic), sui link si
     accende, sulle fotografie si allarga; sparisce nei campi di testo e
     sopra i video incorporati. Solo mouse, senza reduced-motion e senza
     contrasto elevato; scrive transform e misure in rAF, e il ciclo si
     ferma quando l'anello è arrivato.                                    */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !RM() && !matchMedia('(prefers-contrast: more), (forced-colors: active)').matches) {
    const anello = document.createElement('div');
    anello.className = 'cursore-anello'; anello.setAttribute('aria-hidden', 'true');
    document.body.append(anello);
    const BOTTONI = '.cta, .menu-btn, .frecc, .pausa, .barra__x, .chip, .vid__play, .menu__social a, .footer__social a';
    const LINK = 'a, button, [role="button"], label, summary, select';
    const FOTO = 'figure img, .pannello, .vid, .scala-volti img, .volto, .caduta, .pers';
    const CAMPI = 'input, textarea';
    let mx = -200, my = -200, ax = -200, ay = -200, aw = 34, ah = 34, ar = 10, tw = 34, th = 34, tr = 10;
    let abbr = null, rafC = 0;
    const ciclo = () => {
      let gx = mx, gy = my;
      if (abbr) {
        const b = abbr.n.getBoundingClientRect();
        gx = b.left + b.width / 2; gy = b.top + b.height / 2; tw = b.width + 12; th = b.height + 12; tr = abbr.r;
      }
      ax += (gx - ax) * .24; ay += (gy - ay) * .24;
      aw += (tw - aw) * .24; ah += (th - ah) * .24; ar += (tr - ar) * .24;
      anello.style.transform = `translate3d(${(ax - aw / 2).toFixed(1)}px, ${(ay - ah / 2).toFixed(1)}px, 0)`;
      anello.style.width = aw.toFixed(1) + 'px'; anello.style.height = ah.toFixed(1) + 'px';
      anello.style.borderRadius = ar.toFixed(1) + 'px';
      const resto = Math.abs(gx - ax) + Math.abs(gy - ay) + Math.abs(tw - aw) + Math.abs(th - ah);
      rafC = resto > .3 ? requestAnimationFrame(ciclo) : 0;
    };
    const via = () => { if (!rafC) rafC = requestAnimationFrame(ciclo); };
    const stato = (cls) => ['cursore-link', 'cursore-abbraccia', 'cursore-foto', 'cursore-campo'].forEach(k => radice.classList.toggle(k, k === cls));
    addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') { radice.classList.remove('cursore-dentro'); return; }
      mx = e.clientX; my = e.clientY;
      radice.classList.add('cursore-dentro');
      via();
    }, { passive: true });
    document.addEventListener('pointerover', (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      /* sopra un video incorporato i movimenti li riceve l'iframe: l'anello
         resterebbe fermo sul bordo */
      if (t.tagName === 'IFRAME') { radice.classList.remove('cursore-dentro'); return; }
      if (t.closest(CAMPI)) { abbr = null; tw = th = 34; tr = 10; stato('cursore-campo'); return; }
      const b = t.closest(BOTTONI);
      if (b) {
        const r = parseFloat(getComputedStyle(b).borderTopLeftRadius) || 8;
        abbr = { n: b, r: Math.min((b.offsetHeight + 12) / 2, r + 6) }; stato('cursore-abbraccia'); via(); return;
      }
      abbr = null;
      if (t.closest(LINK)) { tw = th = 54; tr = 16; stato('cursore-link'); }
      else if (t.closest(FOTO)) { tw = th = 86; tr = 24; stato('cursore-foto'); }
      else { tw = th = 34; tr = 10; stato(null); }
      via();
    }, { passive: true });
    addEventListener('pointerdown', () => radice.classList.add('cursore-premuto'), { passive: true });
    addEventListener('pointerup', () => radice.classList.remove('cursore-premuto'), { passive: true });
    document.documentElement.addEventListener('mouseleave', () => radice.classList.remove('cursore-dentro'));
    addEventListener('scroll', () => { if (abbr) via(); }, { passive: true });
    addEventListener('blur', () => radice.classList.remove('cursore-dentro'));

    /* LA PROFONDITÀ: le fotografie (e la polvere del palco) scivolano di
       pochi pixel in senso opposto al cursore, ognuna alla sua distanza;
       il testo resta fermo. transform, non translate: le animazioni di
       scroll di quelle stesse figure lavorano su translate, e i due si
       sommano invece di pestarsi. Si aggiornano solo quelle in vista.    */
    const PROF = [['.testa-pag__foto', 12], ['.finale__foto', 16], ['.podcast__foto', 14], ['.cartelli__f', 10],
      ['.caduta__s--sx', 6], ['.caduta__s--dx', 6], ['.caduta__s--cubo', 22], ['.passaggio__foto img', 8],
      ['.staffetta__foto img', 8], ['.scala-volti', 10], ['.libri__foto', 10], ['.palco__polvere--lontana', 8], ['.palco__polvere--vicina', 24]];
    const prof = [];
    PROF.forEach(([s, k]) => $$(s).forEach(n => prof.push({ n, k, vis: s.startsWith('.palco') })));
    if (prof.length) {
      const ioP = new IntersectionObserver(es => es.forEach(e => { const p = prof.find(q => q.n === e.target); if (p) p.vis = e.isIntersecting; }));
      prof.forEach(p => { if (!p.n.closest('.palco')) ioP.observe(p.n); });
      let px = 0, py = 0, qx = 0, qy = 0, rafD = 0;
      const muovi = () => {
        qx += (px - qx) * .08; qy += (py - qy) * .08;
        for (const p of prof) if (p.vis) p.n.style.transform = `translate3d(${(-qx * p.k).toFixed(2)}px, ${(-qy * p.k * .7).toFixed(2)}px, 0)`;
        rafD = Math.abs(px - qx) + Math.abs(py - qy) > .002 ? requestAnimationFrame(muovi) : 0;
      };
      addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        px = e.clientX / innerWidth * 2 - 1; py = e.clientY / innerHeight * 2 - 1;
        if (!rafD) rafD = requestAnimationFrame(muovi);
      }, { passive: true });
    }
  }

  /* ── IL SIPARIO FRA LE PAGINE, DOVE NON CI SONO LE VIEW TRANSITIONS ──────
     Firefox (e i Safari senza passaggi fra documenti): al clic su un link
     interno i quattro gradini salgono a coprire la pagina, poi si naviga;
     la pagina nuova nasce coperta (script nel <head>) e si scopre. Dove le
     View Transitions ci sono, il passaggio lo fanno loro (motion.css).  */
  if (!('onpagereveal' in window) && !RM()) document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname === location.pathname) return;
    if (!/(\.html|\/)$/.test(u.pathname)) return;
    e.preventDefault();
    try { sessionStorage.setItem('sipario', '1'); } catch (x) { /* senza sessione si naviga e basta */ }
    radice.classList.add('sipario-su', 'sipario-giu');
    setTimeout(() => { location.href = u.href; }, 220);
  });

  /* ── IL BOTTONE DIVENTA LA PAGINA (giro 3 effetti) ─────────────────────
     «Candida la tua azienda» (nav, hero, piastra del telefono, finale): il
     bottone cliccato riceve il nome che la candidatura dà alla sua
     apertura (pagereveal nel <head>), e l'arancio del bottone si allarga
     fino a diventare la pagina (motion.css). Non dal menu: lì la card si
     sta chiudendo.                                                      */
  if ('onpagereveal' in window) document.addEventListener('click', (e) => {
    const a = e.target.closest('a.cta[href="/candidatura.html"]');
    if (!a || a.closest('.menu') || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (RM() || location.pathname === '/candidatura.html') return;
    a.style.viewTransitionName = 'cta-pagina';
    /* il colore da cui parte l'apertura è quello del bottone: bianco nell'hero, arancio altrove */
    try { sessionStorage.setItem('vt-cta', a.classList.contains('cta--bianco') ? 'bianco' : 'ar'); } catch (x) { /* niente apertura */ }
  });
  addEventListener('pageshow', (e) => { if (e.persisted) $$('a.cta').forEach(a => { a.style.viewTransitionName = ''; }); });

  /* ── IL CUBO SUL FILO (giro 3 effetti) ──────────────────────────────────
     Dove la staffetta è una colonna (Metodo; home sotto i 1024px) il filo
     arancione scende alla linea di lettura (60% dello schermo): un cubo del
     marchio ne cavalca la punta dal primo reparto alla trattativa, dove si
     posa. Solo dove il filo esiste (view() e movimento pieno). Il cubo è
     sticky dentro un binario (racconto.css): qui si misurano gli estremi
     del binario al ridimensionamento, e allo scroll si cambiano solo due
     stati (fermo prima del primo reparto, posato sulla trattativa).    */
  const pistaCol = $('#staffetta-pista');
  if (pistaCol && CSS.supports('animation-timeline: view()') && !RM()) {
    const sc = $('#staffetta'), fine = $('.staffetta__fine', pistaCol), primo = $('.stazione', pistaCol);
    const binario = document.createElement('div'), cubo = document.createElement('i');
    binario.className = 'staffetta__binario'; binario.setAttribute('aria-hidden', 'true');
    cubo.className = 'staffetta__cubo is-fermo';
    cubo.innerHTML = '<i class="cubo3d-vista"><i class="cubo3d"><i></i><i></i><i></i><i></i><i></i><i></i></i></i>';
    binario.append(cubo); pistaCol.append(binario);
    /* il percorso va dal nodo del primo reparto al nodo dell'arrivo (15.10) */
    const nodoY = () => parseFloat(getComputedStyle(sc).getPropertyValue('--nodo-y')) || 32;
    const misura = () => {
      if (!primo || !fine) return;
      const r = pistaCol.getBoundingClientRect(), f = fine.getBoundingClientRect(), ny = nodoY();
      const y0 = primo.getBoundingClientRect().top + ny - r.top, y1 = f.top + ny - r.top;
      binario.style.setProperty('--b0', y0.toFixed(1) + 'px');
      binario.style.setProperty('--bh', Math.max(0, y1 - y0).toFixed(1) + 'px');
    };
    let rq = 0;
    const stato = () => {
      rq = 0;
      if (!primo || !fine || sc.classList.contains('is-scena')) return;
      const linea = innerHeight * .6, ny = nodoY();
      cubo.classList.toggle('is-fermo', primo.getBoundingClientRect().top + ny > linea);
      cubo.classList.toggle('is-posato', fine.getBoundingClientRect().top + ny <= linea + 1);
    };
    const chiedi = () => { if (!rq) rq = requestAnimationFrame(stato); };
    /* PIÙ DINAMICA (15.10): in colonna i numeri della tappa contano quando
       la tappa passa la linea di lettura, una volta */
    /* il punto delle migliaia sempre, come nel testo («1.000»): l'italiano
       di Intl non lo mette sotto le cinque cifre */
    const fmtC = { format: (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.') };
    const ioConta = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting || sc.classList.contains('is-scena')) return;
      ioConta.unobserve(e.target);
      $$('.conta', e.target).forEach(n => {
        const a = +n.dataset.a, t0 = performance.now();
        const passo = (ora) => { const u = Math.min(1, (ora - t0) / 1100); n.textContent = fmtC.format(Math.round(a * (1 - Math.pow(1 - u, 3)))); if (u < 1) requestAnimationFrame(passo); };
        requestAnimationFrame(passo);
      });
    }), { rootMargin: '0px 0px -40% 0px' });
    $$('.stazione', pistaCol).forEach(n => ioConta.observe(n));
    new ResizeObserver(() => { misura(); chiedi(); }).observe(pistaCol);
    document.fonts?.ready.then(misura);
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { addEventListener('scroll', chiedi, { passive: true }); chiedi(); }
      else removeEventListener('scroll', chiedi);
    }).observe(pistaCol);
  }

  /* ── GSAP: due sole scene in tutta la pagina ──────────────────────────── */
  const avviaGsap = () => {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
    const mm = gsap.matchMedia();

    /* ── IL TETTO ─────────────────────────────────────────────────────────
       Il momento della pagina. I quattro reparti entrano SPARSI e
       convergono in riga; poi il tetto si disegna da sinistra; poi il
       payoff sale. La frase non è raccontata: è mostrata.
       Lo stato finale è quello che il CSS descrive, quindi a motion spento
       o senza JS la scena è già leggibile e composta — sesta legge.
       Solo transform e opacity: nessun layout, nessun repaint di area.  */
    if ($('#tetto-scena')) {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rep = $$('#tetto-reparti li');
        /* Dispersione iniziale deterministica: nessun Math.random, così la
           scena è identica a ogni caricamento e in ogni screenshot.    */
        const sparsi = [[-190, -54, -7], [-72, 40, 4], [78, -40, -4], [196, 52, 7]];

        const tl = gsap.timeline({ scrollTrigger: {
          trigger: '#statement', start: 'top 82%', end: '+=68%',
          scrub: .6, invalidateOnRefresh: true, refreshPriority: -1,
        }});

        /* 1 · il tetto si posa: la trave si disegna da sinistra. */
        tl.from('#tetto-linea', { scaleX: 0, ease: 'none', duration: .30 }, 0);
        /* 2 · i quattro reparti arrivano SPARSI e convergono in griglia. */
        tl.from(rep, {
          x: (i) => sparsi[i][0], y: (i) => sparsi[i][1], rotate: (i) => sparsi[i][2],
          opacity: 0, ease: 'none', duration: .46, stagger: .05,
        }, .22);
        /* 3 · i tiranti scendono a agganciarli al tetto: e qui la frase
               «sotto lo stesso tetto» smette di essere una metafora.   */
        tl.from('.tetto__tir', { scaleY: 0, ease: 'none', duration: .20, stagger: .05 }, .52);
        /* 4 · il numero solo. */
        tl.from('#tetto-payoff', { opacity: 0, y: 30, ease: 'none', duration: .26 }, .56);

        return () => tl.kill();
      });
    }

    /* ── LA MACCHINA · l'unico pin del sito ───────────────────────────────
       Il movimento È il concetto: i tre passaggi che cadono e poi tengono.
       POLIZZA: la versione statica è già scritta in CSS, quindi degradare
       a costo zero è possibile in qualsiasi momento.                    */
    /* ── LA STAFFETTA ────────────────────────────────────────────────────
       La sezione si ferma e lo scroll fa scorrere i fotogrammi in
       orizzontale; ognuno si accende quando entra nei due terzi sinistri
       dello schermo, e la corsa finisce con l'atterraggio (il cubo sul
       contratto) al centro. Sotto i 1024px, sotto i 680px di altezza, a
       motion ridotto e nella pagina Metodo (variante in colonna) resta
       una colonna, tutta accesa (CSS).
       MAI .set({display:'none'}) dentro una timeline pinnata: è una
       mutazione di layout che disallinea start/end in silenzio.        */
    /* 15.10, IL PERCORSO: le tappe sono card appese a una linea sola. Lo
       scroll fa scorrere la pista, accende la linea dietro il cubo e porta
       il cubo da un nodo all'altro; la tappa si accende quando il cubo
       arriva al suo nodo, e le card si srotolano dalla linea mentre
       entrano da destra. Tutto sulla stessa timeline, quindi sempre in
       sincrono anche con lo scrub. */
    if ($('#staffetta:not(.staffetta--colonna)')) {
      mm.add('(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)', () => {
        const sc = $('#staffetta'), pista = $('#staffetta-pista');
        const tappe = $$('.tappa', pista);
        const fine = $('.staffetta__fine', pista);
        sc.classList.add('is-scena');
        const perc = document.createElement('div');
        perc.className = 'percorso'; perc.setAttribute('aria-hidden', 'true');
        perc.innerHTML = '<i class="percorso__linea"></i><i class="percorso__fill"></i>' +
          tappe.map(t => `<i class="percorso__nodo${t.classList.contains('passaggio') ? ' percorso__nodo--consegna' : t === fine ? ' percorso__nodo--arrivo' : ''}"></i>`).join('') +
          '<i class="percorso__cubo"><i class="cubo3d-vista"><i class="cubo3d"><i></i><i></i><i></i><i></i><i></i><i></i></i></i></i>';
        pista.append(perc);
        /* PIÙ DINAMICA (15.10): la scia dietro il cubo e i quadrati dell'arrivo */
        perc.insertAdjacentHTML('beforeend', '<i class="percorso__scoppio">' +
          Array.from({ length: 12 }, (_, k) => `<i style="--ang:${k * 30 + (k % 2) * 12}deg;--d:${46 + (k % 3) * 16}px"></i>`).join('') + '</i>');
        const nodi = $$('.percorso__nodo', perc), fill = $('.percorso__fill', perc), cubo = $('.percorso__cubo', perc), cubo3d = $('.cubo3d', perc);
        cubo.insertAdjacentHTML('afterbegin', '<i class="percorso__scia"></i>');
        const scia = $('.percorso__scia', cubo), scoppio = $('.percorso__scoppio', perc);
        /* il pavimento del palco: punti in prospettiva che scorrono con la
           pista, e una pozza di luce che segue il cubo */
        const pav = document.createElement('div');
        pav.className = 'staffetta__pavimento'; pav.setAttribute('aria-hidden', 'true');
        pav.innerHTML = '<i class="staffetta__griglia"></i><i class="staffetta__pozza"></i>';
        sc.append(pav);
        const griglia = $('.staffetta__griglia', pav), pozza = $('.staffetta__pozza', pav);
        /* le misure: nodi relativi all'inizio della linea (il bordo sinistro della prima card) */
        let xs = [], corsa = 0, ps = [], percL = 0;
        const misura = () => {
          const nx = parseFloat(getComputedStyle(sc).getPropertyValue('--nodo-x')) || 26;
          const x0 = tappe[0].offsetLeft;
          xs = tappe.map(t => t.offsetLeft + nx - x0);
          corsa = xs[xs.length - 1] - xs[0];
          /* il momento (progresso della scena) in cui il cubo è su ogni nodo */
          ps = xs.map(x => corsa ? (x - xs[0]) / corsa : 0);
          percL = x0;
          perc.style.cssText = `left:${x0}px;top:${tappe[0].offsetTop - 1}px;width:${fine.offsetLeft + fine.offsetWidth - x0}px`;
          perc.style.setProperty('--f0', xs[0] + 'px');
          perc.style.setProperty('--fw', corsa + 'px');
          nodi.forEach((n, k) => { n.style.left = xs[k] + 'px'; });
          scoppio.style.left = xs[xs.length - 1] + 'px';
        };
        misura();
        /* IL CUBO SI FERMA ALLE TAPPE: fra due nodi accelera e frena (curva
           a S), la pista intanto scorre lineare; sul nodo arriva nello stesso
           momento di prima, ma ci resta mentre la tappa si legge */
        const morbido = u => u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
        const cuboX = (p) => {
          if (!corsa || p <= 0) return 0;
          if (p >= 1) return corsa;
          let k = 0; while (k < ps.length - 2 && p > ps[k + 1]) k++;
          const u = Math.min(1, Math.max(0, (p - ps[k]) / Math.max(1e-6, ps[k + 1] - ps[k])));
          return xs[k] - xs[0] + (xs[k + 1] - xs[k]) * morbido(u);
        };
        const posaCubo = gsap.quickSetter(cubo, 'x', 'px'), posaFill = gsap.quickSetter(fill, 'scaleX');
        const giraX = gsap.quickSetter(cubo3d, 'rotationX', 'deg'), giraY = gsap.quickSetter(cubo3d, 'rotationY', 'deg');
        /* I NUMERI CONTANO quando il cubo arriva alla tappa, una volta */
        const contati = new Set(), fmtIt = { format: (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.') };
        const conta = (t) => {
          if (contati.has(t)) return; contati.add(t);
          $$('.conta', t).forEach(n => {
            const a = +n.dataset.a, t0 = performance.now();
            const passo = (ora) => { const u = Math.min(1, (ora - t0) / 1100); n.textContent = fmtIt.format(Math.round(a * (1 - Math.pow(1 - u, 3)))); if (u < 1) requestAnimationFrame(passo); };
            requestAnimationFrame(passo);
          });
        };
        /* LE CARD DONDOLANO: sono appese alla linea per il bordo alto; quando
           la linea corre si inclinano contro il moto e, quando si ferma,
           oscillano un poco e tornano dritte (una molla per card, ognuna con
           la sua rigidità). Massimo 7°, mai a riposo. */
        const molle = tappe.map((t, i) => ({ t, a: 0, v: 0, k: 120 + (i % 3) * 30, c: 9 + (i % 2) * 3 }));
        let cx = 0, rafF = 0, tPrec = 0, pxPrec = 0, vPista = 0, cxPrec = 0, vCubo = 0, lungo = 0;
        const fisica = (ora) => {
          const dt = tPrec ? Math.min(.05, (ora - tPrec) / 1000) : .016; tPrec = ora;
          const px = gsap.getProperty(pista, 'x');
          vPista += ((px - pxPrec) / dt - vPista) * .3; pxPrec = px;
          vCubo += ((cx - cxPrec) / dt - vCubo) * .3; cxPrec = cx;
          const bersaglio = Math.max(-7, Math.min(7, vPista * .0042));
          let vivo = Math.abs(vPista) > 3 || Math.abs(vCubo) > 3;
          for (const m of molle) {
            m.v += (-m.k * (m.a - bersaglio) - m.c * m.v) * dt; m.a += m.v * dt;
            if (Math.abs(m.a) > .03 || Math.abs(m.v) > .05) vivo = true;
            m.t.style.rotate = m.a.toFixed(3) + 'deg';
          }
          /* la scia: lunga quanto è veloce il cubo, e si ritira quando si ferma */
          lungo += (Math.min(170, Math.abs(vCubo) * .16) - lungo) * .22;
          scia.style.width = lungo.toFixed(1) + 'px';
          if (lungo > .4) vivo = true;
          /* il pavimento scorre con la pista; la luce sta sotto il cubo */
          griglia.style.transform = `rotateX(74deg) translate3d(${(px % 36).toFixed(1)}px, 0, 0)`;
          pozza.style.transform = `translate3d(${(percL + xs[0] + cx + px).toFixed(1)}px, 0, 0)`;
          if (vivo) rafF = requestAnimationFrame(fisica);
          else { rafF = 0; tPrec = 0; }
        };
        const spingi = () => { if (!rafF) { pxPrec = gsap.getProperty(pista, 'x'); cxPrec = cx; tPrec = 0; rafF = requestAnimationFrame(fisica); } };
        /* quanto deve scorrere: finché l'arrivo non tocca il margine destro
           del contenuto (lo stesso del sinistro). Centrato, lasciava mezzo
           schermo vuoto a destra quando la scena si sbloccava (audit 15.10). */
        const dist = () => {
          const m = parseFloat(getComputedStyle(pista).paddingLeft) || 0;
          return Math.max(0, fine.offsetLeft + fine.offsetWidth - (innerWidth - m));
        };
        /* tl esiste solo dopo la creazione: ScrollTrigger può chiamare
           onRefresh mentre la crea */
        let qui = -2, tl = null, arrivato = false;
        const accendi = () => {
          cx = cuboX(tl ? tl.progress() : 0);
          posaCubo(cx); posaFill(corsa ? cx / corsa : 0);
          /* mentre viaggia il cubo rotola: un quarto di giro ogni 120px, e un poco d'imbardata */
          giraX(cx / 120 * 90); giraY(cx / 420 * 90);
          const ax = xs[0] + cx;
          let k = -1;
          xs.forEach((x, i) => {
            const on = ax >= x - 1;
            tappe[i].classList.toggle('is-on', on); nodi[i].classList.toggle('is-on', on);
            if (on) { k = i; if (tl?.scrollTrigger?.isActive && tappe[i].classList.contains('stazione')) conta(tappe[i]); }
          });
          if (k !== qui) { tappe.forEach((t, i) => t.classList.toggle('is-qui', i === k)); qui = k; }
          /* L'ARRIVO: il cubo si posa sulla trattativa, i quadrati esplodono
             dal nodo e la card si accende; tornando indietro si riarma */
          const giunto = k === xs.length - 1;
          if (giunto !== arrivato) {
            arrivato = giunto;
            perc.classList.toggle('is-arrivato', giunto); fine.classList.toggle('is-arrivo', giunto);
          }
          spingi();
        };
        tl = gsap.timeline({
          defaults: { ease: 'none' }, onUpdate: accendi,
          scrollTrigger: {
            trigger: '#metodo', start: 'top top', end: () => '+=' + dist(),
            pin: true, pinSpacing: true, anticipatePin: 1, scrub: .6,
            invalidateOnRefresh: true, fastScrollEnd: true,
            onRefreshInit: misura, onRefresh: () => { misura(); accendi(); },
          },
        });
        /* la timeline muove solo la pista: cubo, linea, rotolamento, molle e
           pavimento li calcola accendi() dal suo progresso */
        tl.to(pista, { x: () => -dist() }, 0);
        /* le card che arrivano da destra si srotolano dalla linea; quelle
           già a schermo all'inizio sono già aperte */
        const entrate = tappe.filter(t => t.offsetLeft > innerWidth * .88).map(t => gsap.fromTo(t,
          { clipPath: 'inset(-2% -12% 100% -12%)' },
          { clipPath: 'inset(-2% -12% -30% -12%)', ease: 'none',
            scrollTrigger: { trigger: t, containerAnimation: tl, start: 'left 88%', end: 'left 64%', scrub: true } }));
        /* LE FOTO DEI PASSAGGI IN PARALLASSE: dentro la cornice l'immagine
           scorre più piano della card, come dietro una finestra */
        const parallassi = $$('.passaggio__foto img, .staffetta__foto img', pista).map(img => gsap.fromTo(img,
          { '--px': '4%' }, { '--px': '-4%', ease: 'none',
            scrollTrigger: { trigger: img.closest('.tappa'), containerAnimation: tl, start: 'left right', end: 'right left', scrub: true } }));
        accendi();
        return () => {
          entrate.forEach(e => { e.scrollTrigger?.kill(); e.kill(); });
          parallassi.forEach(e => { e.scrollTrigger?.kill(); e.kill(); });
          cancelAnimationFrame(rafF); rafF = 0;
          tappe.forEach(t => { t.style.rotate = ''; });
          $$('.passaggio__foto img, .staffetta__foto img', pista).forEach(i => i.style.removeProperty('--px'));
          fine.classList.remove('is-arrivo');
          tl.scrollTrigger?.kill(); tl.kill();
          perc.remove(); pav.remove();
          sc.classList.remove('is-scena');
          gsap.set(pista, { clearProps: 'transform' });
          gsap.set(tappe, { clearProps: 'clipPath' });
          tappe.forEach(t => t.classList.remove('is-on', 'is-qui'));
        };
      });
    }

    /* Obbligatorio: senza, gli start/end sono calcolati sulle metriche del
       fallback e le scene si disallineano appena il webfont atterra.    */
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  };

  if (document.readyState !== 'loading') setTimeout(avviaGsap, 0);
  else addEventListener('DOMContentLoaded', () => setTimeout(avviaGsap, 0));
})();
