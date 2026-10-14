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
  try { if (localStorage.getItem('barra') === 'off') document.documentElement.classList.add('barra-off'); } catch {}
  $('#barra-x')?.addEventListener('click', () => {
    document.documentElement.classList.add('barra-off');
    try { localStorage.setItem('barra', 'off'); } catch {}
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

    const apri = () => {
      if (aperto) return; aperto = true; clearTimeout(tNascondi);
      riparti();
      carica(); mostra(base());
      menu.hidden = false;
      origine();
      radice.classList.add('menu-aperto'); inerte(true);
      burger.setAttribute('aria-expanded', 'true');
      /* due fotogrammi: il primo applica --da con la card ancora chiusa */
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-on')));
      (chiudiBtn || fuocabili()[0])?.focus({ preventScroll: true });
    };
    const chiudi = (torna = true) => {
      if (!aperto) return; aperto = false;
      origine();
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
      const k = () => mostra(a.dataset.foto);
      a.addEventListener('pointerenter', k); a.addEventListener('focus', k);
    });
    $('.menu__voci', menu)?.addEventListener('pointerleave', () => mostra(base()));
    /* Tornando indietro dalla cache del browser il menu non resta aperto. */
    addEventListener('pageshow', (e) => {
      if (!e.persisted) return;
      riparti();
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
        c.n.style.setProperty('--s', (0.95 + 0.08 * k).toFixed(3));
        c.n.style.setProperty('--o', (0.72 + 0.28 * k).toFixed(3));
        c.n.style.zIndex = k > .65 ? 2 : 1;
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
  carosello({ wrap: $('#squadra-wrap'), pista: $('#squadra-pista'), cards: '.pers',
              pausa: '#squadra-pausa', prev: '#sq-prev', next: '#sq-next', v: .024 });

  /* ── PIASTRA CTA MOBILE ─────────────────────────────────────────────────
     Visibile SOLO nella terra di mezzo: mai sopra l'hero (che ha già il suo
     CTA) e mai sopra la conversione. Due CTA identici nello stesso viewport
     sono un difetto, non una ridondanza utile.                          */
  const piastra = $('#piastra');
  if (piastra) {
    const alto = $('#hero') || $('.testa-pag');
    const basso = $('#candidatura') || $('#muro');
    let dentroAlto = !!alto, dentroBasso = false;
    const calcola = () => piastra.classList.toggle('is-off', dentroAlto || dentroBasso);
    if (alto)  new IntersectionObserver(([e]) => { dentroAlto = e.isIntersecting; calcola(); }, { threshold: 0 }).observe(alto);
    if (basso) new IntersectionObserver(([e]) => { dentroBasso = e.isIntersecting; calcola(); }, { threshold: .12 }).observe(basso);
    calcola();
  }

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

  /* ── LA MAPPA A FACCIATA ────────────────────────────────────────────────
     L'embed di Google scarica oltre un megabyte e scrive cookie di
     profilazione al primo byte. Con una cookie policy attiva caricarlo
     senza che l'utente lo chieda è un problema legale, non solo di
     performance: si carica al click, e chi non clicca ha comunque
     indirizzo, sede legale e link diretto.                             */
  const mappa = $('#mappa');
  mappa?.querySelector('.mappa__btn')?.addEventListener('click', () => {
    if (mappa.dataset.aperto) return;
    mappa.dataset.aperto = '1';
    const q = mappa.dataset.q || '';
    const z = mappa.dataset.z || '16';
    const f = document.createElement('iframe');
    f.src = 'https://maps.google.com/maps?q=' + q + '&t=m&z=' + z + '&output=embed&iwloc=near';
    f.title = 'Mappa: Via Marco D\u2019Agrate 41, Milano';
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    mappa.append(f);
    mappa.classList.add('is-on');
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
    binario.append(cubo); pistaCol.append(binario);
    const misura = () => {
      if (!primo || !fine) return;
      const r = pistaCol.getBoundingClientRect(), f = fine.getBoundingClientRect();
      const y0 = primo.getBoundingClientRect().top - r.top, y1 = f.top + f.height / 2 - r.top;
      binario.style.setProperty('--b0', y0.toFixed(1) + 'px');
      binario.style.setProperty('--bh', Math.max(0, y1 - y0).toFixed(1) + 'px');
    };
    let rq = 0;
    const stato = () => {
      rq = 0;
      if (!primo || !fine || sc.classList.contains('is-scena')) return;
      const linea = innerHeight * .6, f = fine.getBoundingClientRect();
      cubo.classList.toggle('is-fermo', primo.getBoundingClientRect().top > linea);
      cubo.classList.toggle('is-posato', f.top + f.height / 2 <= linea + 1);
    };
    const chiedi = () => { if (!rq) rq = requestAnimationFrame(stato); };
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
    if ($('#staffetta:not(.staffetta--colonna)')) {
      mm.add('(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)', () => {
        const sc = $('#staffetta'), pista = $('#staffetta-pista');
        const tappe = $$('.stazione, .passaggio, .staffetta__fine', pista);
        sc.classList.add('is-scena');
        /* quanto deve scorrere: finché l'atterraggio non è al centro */
        const fine = $('.staffetta__fine', pista);
        const dist = () => Math.max(0, fine.offsetLeft + fine.offsetWidth / 2 - innerWidth / 2);
        const accendi = () => {
          const x = innerWidth * .62;
          tappe.forEach(t => t.classList.toggle('is-on', t.getBoundingClientRect().left < x));
        };
        const tw = gsap.to(pista, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: {
            trigger: '#metodo', start: 'top top', end: () => '+=' + dist(),
            pin: true, pinSpacing: true, anticipatePin: 1, scrub: .6,
            invalidateOnRefresh: true, fastScrollEnd: true,
            onUpdate: accendi, onRefresh: accendi,
          },
        });
        accendi();
        return () => {
          tw.scrollTrigger?.kill(); tw.kill();
          sc.classList.remove('is-scena');
          gsap.set(pista, { clearProps: 'transform' });
          tappe.forEach(t => t.classList.remove('is-on'));
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
