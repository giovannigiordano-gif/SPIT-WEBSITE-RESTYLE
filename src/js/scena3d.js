/* ═══════════════════════════════════════════════════════════════════════════
   SALESPROCESS · scena3d.js — l'hero in WebGL: dai contatti al reparto
   ---------------------------------------------------------------------------
   Ricostruzione procedurale del marchio (metodo img2threejs, eseguito a mano:
   gli script Python della skill non girano su questa macchina):
     · ASSESSMENT  logo piano, classe "simple"; la terza dimensione è una
                   STILIZZAZIONE dichiarata: i quadrati diventano blocchi.
     · IDENTITÀ    cinque quadrati in progressione 0,83 (30,4 → 14,2 su una
                   griglia 60×100), scalinata a zig-zag, raggio 22% del lato,
                   arancio #FF8200. Queste quattro cose devono restare vere da
                   ogni angolo; tutto il resto è libero.
     · PASSI       blockout (box nelle posizioni del marchio) → forma (rettangoli
                   arrotondati estrusi, smusso sui bordi) → materiale → luce →
                   interazione (montaggio allo scroll, luce che segue il
                   cursore) → ottimizzazione (contatti istanziati, render solo
                   quando l'hero è visibile).
     · VERIFICA    render di confronto con src/assets/brand/mark.webp via
                   Playwright (tools/qa) — vedi WORKLOG.
   Ogni blocco è un pivot indirizzabile (marchio.children[i], i = data-i dello
   SVG) così la scena può montarli uno per uno.

   Il racconto: al caricamento centinaia di cubi grafite — i CONTATTI che la
   frase "non ti vendiamo contatti" rifiuta di vendere — fluttuano in
   profondità; la luce arancione li trova dove passa il cursore. Al primo
   scroll convergono a spirale, quelli grigi vengono assorbiti e cinque
   arancioni si montano nella scalinata del marchio: il reparto che fattura.
   Caricato SOLO su desktop con puntatore fine, senza reduced-motion, dopo il
   load e in idle: mobile e low-power hanno la versione DOM, zero byte di 3D.
   ═══════════════════════════════════════════════════════════════════════════ */

const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js';

/* Il marchio, misurato sul PNG originale (src/assets/brand/mark.svg). */
const MARCHIO = [
  { x: 23.6, y: 0,    l: 30.4 },
  { x: 0,    y: 30.4, l: 25.2 },
  { x: 21.4, y: 53.8, l: 21.0 },
  { x: 40.6, y: 72.6, l: 17.4 },
  { x: 29.4, y: 85.8, l: 14.2 },
];

/* PRNG deterministico: la scena è identica a ogni caricamento e in ogni
   screenshot di verifica.                                               */
function mulberry32(a) {
  return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeInOut = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

export async function avvia(host, { hero = host.closest('.hero') } = {}) {
  const THREE = await import(THREE_URL);

  /* ── RENDERER ─────────────────────────────────────────────────────────── */
  const canvas = document.createElement('canvas');
  canvas.className = 'hero__canvas';
  canvas.setAttribute('aria-hidden', 'true');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;   /* preserva la tinta dell'arancio */
  renderer.toneMappingExposure = 1.05;
  let dpr = Math.min(window.devicePixelRatio || 1, 1.6);
  renderer.setPixelRatio(dpr);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x020202, 34, 72);
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 140);
  const CAM_Z = 40;
  camera.position.set(0, 0, CAM_Z);

  /* ── LUCE ─────────────────────────────────────────────────────────────────
     Chiave calda dall'alto a sinistra (la stessa direzione dell'alone del
     sito), controluce arancione da dietro a destra che disegna il bordo dei
     cubi grafite, e la luce del cursore.                                  */
  scene.add(new THREE.HemisphereLight(0x3d3843, 0x050505, 1.1));
  const chiave = new THREE.DirectionalLight(0xfff0e0, 2.2); chiave.position.set(-9, 13, 16); scene.add(chiave);
  const controluce = new THREE.DirectionalLight(0xff8200, 2.2); controluce.position.set(11, -5, -12); scene.add(controluce);
  const torcia = new THREE.PointLight(0xff9a38, 0, 0, 1.6); torcia.position.set(0, 0, 8); scene.add(torcia);

  /* ── GEOMETRIA: il rettangolo arrotondato estruso ─────────────────────────
     Raggio 22% del lato in XY (come il logo), smusso 6% sui bordi in Z: è
     la forma del marchio portata in volume, non un cubo generico.       */
  const blocco = (lato, profondita) => {
    const r = lato * .22, h = lato / 2;
    const s = new THREE.Shape();
    s.moveTo(-h + r, -h); s.lineTo(h - r, -h); s.absarc(h - r, -h + r, r, -Math.PI / 2, 0);
    s.lineTo(h, h - r); s.absarc(h - r, h - r, r, 0, Math.PI / 2);
    s.lineTo(-h + r, h); s.absarc(-h + r, h - r, r, Math.PI / 2, Math.PI);
    s.lineTo(-h, -h + r); s.absarc(-h + r, -h + r, r, Math.PI, Math.PI * 1.5);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: profondita - lato * .12, curveSegments: 5,
      /* bevelOffset negativo: lo smusso lavora DENTRO il profilo, così la
         sagoma vista di fronte resta quella del logo (verifica img2threejs:
         con lo smusso esterno ogni blocco cresceva del 5% per lato e gli
         angoli che si toccano si sovrapponevano più che nel marchio). */
      bevelEnabled: true, bevelThickness: lato * .06, bevelSize: lato * .05, bevelOffset: -lato * .05, bevelSegments: 3,
    });
    g.center();
    return g;
  };

  const matGrafite = new THREE.MeshStandardMaterial({ color: 0x2b2830, roughness: .52, metalness: .28 });
  /* L'arancio sotto la luce calda e il tone mapping tende al salmone: il
     colore base è spinto di un filo verso il giallo perché il RISULTATO a
     schermo legga #FF8200, non il valore nel codice. */
  const matArancio = new THREE.MeshStandardMaterial({ color: 0xff9412, roughness: .4, metalness: .02, emissive: 0xff7a00, emissiveIntensity: .08 });
  const matMarchio = matArancio.clone();

  /* ── IL MARCHIO: cinque pivot ─────────────────────────────────────────── */
  const marchio = new THREE.Group();
  scene.add(marchio);
  const pezzi = MARCHIO.map((m, i) => {
    const pivot = new THREE.Group();
    pivot.name = 'blocco-' + i;
    const mesh = new THREE.Mesh(blocco(m.l, m.l * .92), matMarchio);
    pivot.add(mesh);
    marchio.add(pivot);
    return { m, pivot, da: new THREE.Vector3(), a: new THREE.Vector3(), rotDa: new THREE.Euler(), sDa: .02, k: 1, ritardo: .12 + (4 - i) * .07 };
  });

  /* Il bagliore dietro il marchio: un gradiente radiale dipinto una volta in
     una CanvasTexture, in additive. Sale quando il marchio è montato.    */
  const tex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const g = c.getContext('2d'), gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    gr.addColorStop(0, 'rgba(255,140,30,.9)'); gr.addColorStop(.35, 'rgba(255,110,0,.32)'); gr.addColorStop(1, 'rgba(255,90,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();
  const bagliore = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
  scene.add(bagliore);

  /* ── I CONTATTI: due InstancedMesh (grafite e arancio) ────────────────── */
  const rnd = mulberry32(20200);
  const pochi = (navigator.hardwareConcurrency || 8) <= 4;
  const N = pochi ? 170 : 300;
  const geoContatto = blocco(1, .92);
  const nArancio = Math.round(N * .13);
  const grigi = new THREE.InstancedMesh(geoContatto, matGrafite, N - nArancio);
  const arancio = new THREE.InstancedMesh(geoContatto, matArancio, nArancio);
  [grigi, arancio].forEach(im => { im.instanceMatrix.setUsage(THREE.DynamicDrawUsage); im.frustumCulled = false; scene.add(im); });
  const contatti = Array.from({ length: N }, (_, i) => ({
    im: i < N - nArancio ? grigi : arancio, k: i < N - nArancio ? i : i - (N - nArancio),
    f: new THREE.Vector3(), t: new THREE.Vector3(),
    s: .3 + rnd() * .55, rx: rnd() * 6.28, ry: rnd() * 6.28, rz: rnd() * 6.28,
    vr: (rnd() - .5) * .5, fq: .25 + rnd() * .5, fase: rnd() * 6.28, amp: .15 + rnd() * .45,
    verso: rnd() < .5 ? -1 : 1, ritardo: rnd() * .42,
  }));

  /* ── MISURE: la scena vive in pixel CSS convertiti in unità mondo ────────
     upp = unità per pixel sul piano z = 0. Il marchio sta al centro del
     bordo inferiore dell'hero, per un quarto oltre: la tela sborda sotto
     l'hero apposta.                                                    */
  let W = 1, H = 1, upp = 1, heroH = 1, fuori = 0;
  const centroMarchio = new THREE.Vector3();
  const misura = () => {
    const r = canvas.getBoundingClientRect();
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    heroH = hero.offsetHeight; fuori = H - heroH;
    renderer.setSize(W, H, false);
    camera.aspect = W / H; camera.updateProjectionMatrix();
    upp = 2 * CAM_Z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / H;
    const altPx = clamp(innerHeight * .31, 230, 340);
    const k = altPx * upp / 100;
    const cyPx = heroH + (.26 - .5) * altPx;
    centroMarchio.set(0, (H / 2 - cyPx) * upp, 0);
    pezzi.forEach(p => {
      const cx = (p.m.x + p.m.l / 2 - 30) * k, cy = (50 - (p.m.y + p.m.l / 2)) * k;
      p.a.set(cx, cy, 0).add(centroMarchio);
      p.k = k;
    });
    bagliore.position.copy(centroMarchio).add(new THREE.Vector3(0, 0, -6));
    bagliore.scale.setScalar(altPx * upp * 2.6);
    semina();
  };

  /* Semina i contatti nel volume dell'hero, fuori dall'ellisse del titolo
     (in coordinate schermo): il testo resta su nero, i cubi lo incorniciano. */
  const v = new THREE.Vector3();
  const semina = () => {
    camera.position.set(0, 0, CAM_Z); camera.lookAt(0, 0, 0); camera.updateMatrixWorld();
    const rr = mulberry32(73);
    const yTitolo = 1 - 2 * (heroH * .47 / H);
    /* l'ellisse copre il blocco del titolo (circa 1000×460px a 1440) e la
       fascia della nav in alto: lì i cubi non entrano mai. */
    const yNav = 1 - 2 * (88 / H);
    const occupato = (p) => { v.copy(p).project(camera); const dx = v.x / .74, dy = (v.y - yTitolo) / .44; return dx * dx + dy * dy < 1 || v.y > yNav; };
    for (const c of contatti) {
      for (let tent = 0; tent < 24; tent++) {
        const z = -24 + rr() * 27;
        const scala = (CAM_Z - z) / CAM_Z;
        c.f.set((rr() - .5) * W * upp * 1.1 * scala, (H / 2 - rr() * heroH) * upp * scala, z);
        if (!occupato(c.f)) break;
      }
      const a = rr() * 6.28, d = rr() * 1.4;
      c.t.set(centroMarchio.x + Math.cos(a) * d, centroMarchio.y + Math.sin(a) * d * .8, -2 - rr() * 3);
    }
    /* I cinque blocchi partono come cinque contatti arancioni qualunque. */
    pezzi.forEach((p, i) => {
      const c = contatti[N - 1 - i * 3];
      c.blocco = true;                       /* l'istanza sparisce: ora è il blocco */
      p.da.copy(c.f);
      p.sDa = c.s * 1.25 / p.m.l;           /* parte grande quanto un contatto     */
      p.rotDa.set(rr() * 3, rr() * 3, rr() * 3);
    });
  };

  /* ── INPUT: scroll (progresso del montaggio) e cursore ────────────────── */
  let pScroll = 0, pLiscio = 0, mx = 0, my = 0, mxL = 0, myL = 0, luce = 0, luceT = 0;
  const leggiScroll = () => { pScroll = clamp(scrollY / (heroH * .55), 0, 1); };
  addEventListener('scroll', leggiScroll, { passive: true });
  hero.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width * 2 - 1;
    my = -((e.clientY - r.top) / r.height * 2 - 1);
    luceT = 1;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { luceT = 0; });

  /* ── IL CICLO ─────────────────────────────────────────────────────────────
     Render solo quando l'hero è a schermo e la scheda è visibile. Qualità
     adattiva: se i primi 90 fotogrammi superano i 22ms di media, la
     risoluzione scende a 1x.                                          */
  const dummy = new THREE.Object3D();
  let visibile = true, raf = 0, t0 = performance.now(), campioni = 0, somma = 0, ultimo = t0;
  const qAt = (t, ritardo, durata = .58) => clamp((t - ritardo) / durata, 0, 1);

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(64, now - ultimo); ultimo = now;
    if (campioni < 90) { somma += dt; campioni++; if (campioni === 90 && somma / 90 > 22 && dpr > 1) { dpr = 1; renderer.setPixelRatio(1); misura(); } }
    const t = (now - t0) / 1000;
    pLiscio += (pScroll - pLiscio) * (1 - Math.pow(.001, dt / 1000 * .9));
    mxL += (mx - mxL) * .06; myL += (my - myL) * .06; luce += (luceT - luce) * .05;

    /* camera: parallasse leggera col cursore, il marchio resta il fuoco */
    camera.position.x = mxL * 1.3; camera.position.y = myL * .8;
    camera.lookAt(0, myL * .2, 0);

    /* la torcia: il cursore riportato nel mondo, davanti ai cubi */
    v.set(mxL, myL, .5).unproject(camera).sub(camera.position).normalize();
    const dist = (8 - camera.position.z) / v.z;
    torcia.position.copy(camera.position).addScaledVector(v, dist);
    torcia.intensity = 260 * luce * (1 - pLiscio * .6);

    for (const c of contatti) {
      const q = easeInOut(qAt(pLiscio, c.ritardo));
      const calma = 1 - q;
      const ox = Math.sin(t * c.fq + c.fase) * c.amp * calma, oy = Math.cos(t * c.fq * .8 + c.fase) * c.amp * calma;
      /* spirale: il vettore verso il bersaglio ruota mentre si accorcia */
      const ang = q * 1.5 * c.verso, rx = c.f.x - c.t.x, ry = c.f.y - c.t.y;
      const ca = Math.cos(ang), sa = Math.sin(ang), acc = 1 - q;
      dummy.position.set(c.t.x + (rx * ca - ry * sa) * acc + ox, c.t.y + (rx * sa + ry * ca) * acc + oy, c.f.z + (c.t.z - c.f.z) * q);
      dummy.rotation.set(c.rx + t * c.vr, c.ry + t * c.vr * .7, c.rz);
      dummy.scale.setScalar(c.blocco ? .0001 : Math.max(.0001, c.s * Math.pow(1 - q, 1.6)));
      dummy.updateMatrix();
      c.im.setMatrixAt(c.k, dummy.matrix);
    }
    grigi.instanceMatrix.needsUpdate = true; arancio.instanceMatrix.needsUpdate = true;

    /* i cinque blocchi: dal campo alla scalinata, dal più piccolo al più
       grande, senza rimbalzo (fisica "rigida", come tutto ciò che è
       scalinata nel sito)                                              */
    let montato = 1;
    pezzi.forEach((p, i) => {
      const q = easeOut(qAt(pLiscio, p.ritardo, .5));
      montato = Math.min(montato, q);
      p.pivot.position.lerpVectors(p.da, p.a, q);
      p.pivot.scale.setScalar(p.sDa + (p.k - p.sDa) * q);
      p.pivot.rotation.set(p.rotDa.x * (1 - q) + Math.sin(t * .6 + i) * .05 * (1 - q), p.rotDa.y * (1 - q) + mxL * .18 * q, p.rotDa.z * (1 - q));
    });
    /* a montaggio fatto il marchio "respira" e segue di un filo il cursore */
    marchio.rotation.y = 0; marchio.position.y = Math.sin(t * .9) * .04 * montato;
    matMarchio.emissiveIntensity = .1 + montato * .42;
    bagliore.material.opacity = montato * .85;

    renderer.render(scene, camera);
  };
  const avviaCiclo = () => { if (!raf && visibile && !document.hidden) { ultimo = performance.now(); raf = requestAnimationFrame(frame); } };
  const ferma = () => { cancelAnimationFrame(raf); raf = 0; };

  host.append(canvas);
  misura(); leggiScroll(); pLiscio = pScroll;
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(misura, 120); }, { passive: true });
  new IntersectionObserver(([e]) => { visibile = e.isIntersecting; visibile ? avviaCiclo() : ferma(); }, { rootMargin: '120px' }).observe(host);
  document.addEventListener('visibilitychange', () => { document.hidden ? ferma() : avviaCiclo(); });
  avviaCiclo();
  /* Il primo fotogramma è pronto: la versione DOM può dissolversi. */
  requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-3d')));
  return { renderer, scene, camera, marchio, misura };
}
