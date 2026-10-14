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
      : n.matches('.muro, .cand') ? 'alba' : 'base');
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

  /* ── MENU MOBILE ──────────────────────────────────────────────────────── */
  const burger = $('#burger'), menu = $('#menu');
  if (burger && menu) {
    const chiudi = () => {
      menu.classList.remove('is-on');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    burger.addEventListener('click', () => {
      const apri = !menu.classList.contains('is-on');
      menu.classList.toggle('is-on', apri);
      burger.setAttribute('aria-expanded', String(apri));
      burger.setAttribute('aria-label', apri ? 'Chiudi il menu' : 'Apri il menu');
      document.body.style.overflow = apri ? 'hidden' : '';
      /* Il fuoco entra nel pannello: con la tastiera il menu aperto non
         deve restare dietro al burger.                                  */
      if (apri) menu.querySelector('a')?.focus({ preventScroll: true });
    });
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) chiudi(); });
    addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-on')) { chiudi(); burger.focus(); }
    });
  }

  /* ── FALLBACK @supports · un solo IntersectionObserver ──────────────────
     Serve solo dove `animation-timeline` non esiste (Safari ≤17, Firefox).
     Failsafe: se l'observer non scatta, lo stato finale viene forzato.   */
  if (!CSS.supports('animation-timeline: view()')) {
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: .18 });
    const tgt = $$('.rise, .scalinata, .muro');
    tgt.forEach(n => io.observe(n));
    setTimeout(() => tgt.forEach(n => n.classList.add('is-in')), 3000);
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
    wrap.addEventListener('focusin',  () => { target = 0; });
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
    fat.addEventListener('change', () => {
      const fuori = fat.value === 'sotto1';
      form.classList.toggle('is-squalificato', fuori);
      etichetta.textContent = fuori ? 'Iscriviti al podcast' : 'Invia la candidatura';
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
    const SUP = '.card, .lente, .sede, .rottura__b';
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
        tl.from('#tetto-payoff', { opacity: 0, y: 30, ease: 'none', duration: .30 }, .70);

        return () => tl.kill();
      });
    }

    /* ── LA MACCHINA · l'unico pin del sito ───────────────────────────────
       Il movimento È il concetto: i tre passaggi che cadono e poi tengono.
       POLIZZA: la versione statica è già scritta in CSS, quindi degradare
       a costo zero è possibile in qualsiasi momento.                    */
    /* ── LA MACCHINA · il binario ─────────────────────────────────────────
       Il pacchetto (lo stesso quadrato che nel contro-esempio cade) corre
       sul binario mentre la scena è pinnata: --p va da 0 a 1 con lo
       scroll, e ogni stazione, varco e passaggio si accende quando il
       pacchetto lo raggiunge. La stazione k è a p = k/3, il varco k a
       (k + ½)/3. Senza questa scena (mobile, reduced-motion, niente JS) la
       macchina resta nel suo stato statico, tutta accesa.
       MAI .set({display:'none'}) dentro una timeline pinnata: è una
       mutazione di layout che disallinea start/end in silenzio.        */
    if ($('#macchina')) {
      mm.add('(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)', () => {
        const sc = $('#macchina');
        const reparti = $$('.reparto', sc), varchi = $$('.binario__varco', sc);
        const hoff = $$('.handoff', sc), chiusa = $('#macchina-chiusa');
        const stato = (p) => {
          reparti.forEach((r, k) => r.classList.toggle('is-on', p >= k / 3 - .002));
          varchi.forEach((v, k) => v.classList.toggle('is-on', p >= (k + .5) / 3));
          hoff.forEach((h, k) => h.classList.toggle('is-on', p >= (k + .5) / 3));
          chiusa?.classList.toggle('is-on', p >= .985);
        };
        const o = { p: 0 };
        sc.classList.add('is-scena');
        sc.style.setProperty('--p', '0');
        stato(0);

        const tl = gsap.timeline({ scrollTrigger: {
          trigger: '#metodo', start: 'top top', end: '+=190%',
          pin: true, pinSpacing: true, anticipatePin: 1, scrub: .6,
          invalidateOnRefresh: true, fastScrollEnd: true,
        }});
        /* Un respiro all'inizio e alla fine: il pacchetto parte quando la
           scena è ferma e arriva prima che il pin si sciolga.           */
        tl.to(o, { p: 1, ease: 'none', duration: 1,
          onUpdate: () => { sc.style.setProperty('--p', o.p.toFixed(4)); stato(o.p); } }, .08);
        tl.to({}, { duration: .1 });

        return () => {
          tl.kill();
          sc.classList.remove('is-scena');
          sc.style.removeProperty('--p');
          [...reparti, ...varchi, ...hoff, chiusa].forEach(n => n?.classList.remove('is-on'));
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
