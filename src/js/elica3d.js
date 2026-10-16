/* ═══════════════════════════════════════════════════════════════════════════
   SALESPROCESS · elica3d.js — la doppia elica del DNA in WebGL (15.10)
   ---------------------------------------------------------------------------
   «L'elica del DNA molto più di impatto, un effetto 3D dei punti»: la stessa
   doppia elica della versione CSS, costruita con i blocchi del marchio (il
   rettangolo arrotondato estruso dell'hero) e illuminata come l'hero: luce
   chiave calda dall'alto a sinistra, controluce arancione da dietro.
   Un filamento arancione, uno perla; ogni piolo è una coppia di basi in due
   colori, come i suoi due blocchi. Due istanze:
     · LA FASCIA sotto l'apertura: orizzontale, a tutta larghezza, inclinata
       verso chi guarda (l'estremo sinistro viene avanti). La prima volta
       che entra a schermo si SCRIVE da sinistra a destra: i filamenti si
       disegnano, i blocchi arrivano e si agganciano, i pioli si tendono.
       Poi gira con lo scroll e, piano, da sola.
     · LA SPINA dei dieci principi, verticale, fra le due colonne. Si scrive
       mentre leggi: arriva fino alla linea di lettura, e i pioli che ci
       passano si accendono. Gira con lo scroll, mai da sola (sta accanto
       al testo).
   La tela è una FINESTRA: la camera sta all'altezza degli occhi (il centro
   dello schermo) e inquadra solo il rettangolo della tela, quindi l'elica
   si vede un poco da sopra quando è in basso e da sotto quando sale.
   Unità del mondo: pixel CSS. Caricato SOLO dove c'è html.vuole-3d
   (desktop, puntatore fine, niente reduced-motion), dopo il load e in idle;
   altrove, e finché non arriva, resta la versione CSS.
   ═══════════════════════════════════════════════════════════════════════════ */

/* three.js r170 ridotto alle classi che servono (tools/three-sp.entry.js), servito dal sito */
const THREE_URL = '/js/vendor/three-sp.min.js';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
/* PRNG deterministico: la scena è la stessa a ogni caricamento */
function mulberry32(a) {
  return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

export async function avvia({ fascia, spina } = {}) {
  const THREE = await import(THREE_URL);
  const fatte = [];
  if (fascia) fatte.push(elica(THREE, fascia, 'o'));
  if (spina) fatte.push(elica(THREE, spina, 'v'));
  return fatte;
}

function elica(THREE, host, verso) {
  const ORIZ = verso === 'o';
  const canvas = document.createElement('canvas');
  canvas.className = 'elica3d';
  canvas.setAttribute('aria-hidden', 'true');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;
  let dpr = Math.min(window.devicePixelRatio || 1, ORIZ ? 1.6 : 1.5);
  renderer.setPixelRatio(dpr);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(ORIZ ? 38 : 30, 1, 10, 9000);

  /* ── LUCE: quella dell'hero ─────────────────────────────────────────── */
  scene.add(new THREE.HemisphereLight(0x3d3843, 0x050505, 1.15));
  const chiave = new THREE.DirectionalLight(0xfff0e0, 2.3); chiave.position.set(-.55, .8, .9); scene.add(chiave);
  const controluce = new THREE.DirectionalLight(0xff8200, 2.5); controluce.position.set(.75, -.35, -.8); scene.add(controluce);

  /* ── GEOMETRIE ────────────────────────────────────────────────────────
     Il blocco è il quadrato del marchio portato in volume (raggio 22% del
     lato, smusso dentro il profilo), lo stesso dei cubi dell'hero.      */
  const blocco = (lato, profondita) => {
    const r = lato * .22, h = lato / 2;
    const s = new THREE.Shape();
    s.moveTo(-h + r, -h); s.lineTo(h - r, -h); s.absarc(h - r, -h + r, r, -Math.PI / 2, 0);
    s.lineTo(h, h - r); s.absarc(h - r, h - r, r, 0, Math.PI / 2);
    s.lineTo(-h + r, h); s.absarc(-h + r, h - r, r, Math.PI / 2, Math.PI);
    s.lineTo(-h, -h + r); s.absarc(-h + r, -h + r, r, Math.PI, Math.PI * 1.5);
    const g = new THREE.ExtrudeGeometry(s, {
      depth: profondita - lato * .12, curveSegments: 5,
      bevelEnabled: true, bevelThickness: lato * .06, bevelSize: lato * .05, bevelOffset: -lato * .05, bevelSegments: 3,
    });
    g.center();
    return g;
  };
  const geoBlocco = blocco(1, .92);
  const geoPiolo = new THREE.CylinderGeometry(1, 1, 1, 10, 1);

  /* L'arancio è spinto di un filo verso il giallo (come nell'hero) perché
     il risultato a schermo, dopo luce e tone mapping, legga #FF8200.   */
  const matArancio = new THREE.MeshStandardMaterial({ color: 0xff9412, roughness: .38, metalness: .02, emissive: 0xff7a00, emissiveIntensity: .14 });
  const matPerla = new THREE.MeshStandardMaterial({ color: 0xece7df, roughness: .4, metalness: .04, emissive: 0x2a2622, emissiveIntensity: .3 });
  const matFiloA = new THREE.MeshStandardMaterial({ color: 0xff8a1a, roughness: .5, metalness: 0, emissive: 0xff6a00, emissiveIntensity: .22 });
  const matFiloB = new THREE.MeshStandardMaterial({ color: 0x9a949e, roughness: .55, metalness: .1, emissive: 0x1c1a1f, emissiveIntensity: .4 });
  /* i pioli non hanno bisogno di luce: sono fili; il colore per istanza
     (spento → acceso alla linea di lettura) è il loro unico stato     */
  const matPiolo = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });

  /* ── LA STRUTTURA ─────────────────────────────────────────────────────
     inclina (fissa: l'elica di traverso verso chi guarda)
       └ gira (il giro attorno all'asse: scroll e, nella fascia, il tempo)
           └ blocchi, pioli, filamenti                                    */
  const inclina = new THREE.Group(), gira = new THREE.Group();
  inclina.add(gira); scene.add(inclina);
  if (ORIZ) inclina.rotation.set(0, .36, -.07);

  const rnd = mulberry32(ORIZ ? 1953 : 2003);
  let N = 0, R = 1, S = 1, L = 1, passo = 1, u0 = 0;
  let bloccoA = null, bloccoB = null, pioloA = null, pioloB = null, filoA = null, filoB = null;
  let coppie = [];
  const Y = new THREE.Vector3(0, 1, 0);
  const dir = new THREE.Vector3(), pos = new THREE.Vector3(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), m4 = new THREE.Matrix4();
  const e = new THREE.Euler();

  /* un punto dell'elica: u lungo l'asse, ang attorno, r dal centro */
  const punto = (u, ang, r, out) => ORIZ
    ? out.set(u, r * Math.cos(ang), r * Math.sin(ang))
    : out.set(r * Math.cos(ang), -u, r * Math.sin(ang));
  /* la direzione radiale (dall'asse verso il punto) */
  const radiale = (ang, out) => ORIZ ? out.set(0, Math.cos(ang), Math.sin(ang)) : out.set(Math.cos(ang), 0, Math.sin(ang));
  /* un giro ogni dieci coppie, come il DNA vero (10,5) */
  const TORSIONE = Math.PI * 2 / 10;

  class Filamento extends THREE.Curve {
    constructor(fase) { super(); this.fase = fase; }
    getPoint(t, out = new THREE.Vector3()) {
      const u = u0 - passo * .5 + t * (N * passo);
      const k = (u - u0) / passo;
      return punto(u, k * TORSIONE + this.fase, R, out);
    }
  }

  const svuota = () => {
    [bloccoA, bloccoB, pioloA, pioloB, filoA, filoB].forEach(o => { if (o) { gira.remove(o); if (o.isMesh && !o.isInstancedMesh) o.geometry.dispose(); o.dispose?.(); } });
  };

  /* ── MISURE: la tela in pixel; l'elica si costruisce a misura ────────── */
  let W = 1, H = 1, pronta = false;
  const costruisci = () => {
    svuota();
    if (ORIZ) {
      /* il raggio dalla tela; la lunghezza oltre i bordi (inclinata si
         accorcia e l'estremo vicino non deve finire fuori campo) */
      R = clamp(H * .26, 54, 160);
      L = W * 1.22;
      passo = R * .44;
      S = R * .3;
      N = Math.round(L / passo);
      u0 = -(N - 1) * passo / 2;
    } else {
      /* la tela è larga quanto lo spazio fra le colonne più 120px */
      R = clamp((W - 120) * .36, 30, 68);
      passo = R * .5;
      S = R * .34;
      N = Math.max(4, Math.floor((H - S * 2) / passo));
      u0 = S * 1.4;
    }
    bloccoA = new THREE.InstancedMesh(geoBlocco, matArancio, N);
    bloccoB = new THREE.InstancedMesh(geoBlocco, matPerla, N);
    pioloA = new THREE.InstancedMesh(geoPiolo, matPiolo, N);
    pioloB = new THREE.InstancedMesh(geoPiolo, matPiolo, N);
    [bloccoA, bloccoB, pioloA, pioloB].forEach(im => { im.instanceMatrix.setUsage(THREE.DynamicDrawUsage); im.frustumCulled = false; gira.add(im); });
    const SEG = Math.max(60, N * 12), RAD = 10;
    filoA = new THREE.Mesh(new THREE.TubeGeometry(new Filamento(0), SEG, S * .13, RAD, false), matFiloA);
    filoB = new THREE.Mesh(new THREE.TubeGeometry(new Filamento(Math.PI), SEG, S * .13, RAD, false), matFiloB);
    [filoA, filoB].forEach(f => { f.frustumCulled = false; f.userData.seg = SEG; f.userData.rad = RAD; gira.add(f); });
    coppie = Array.from({ length: N }, (_, k) => {
      const u = u0 + k * passo, ang = k * TORSIONE;
      const a = punto(u, ang, R, new THREE.Vector3()), b = punto(u, ang + Math.PI, R, new THREE.Vector3());
      /* da dove arrivano: sparsi attorno al loro posto, un poco verso chi guarda */
      const sparso = (v) => v.clone().add(new THREE.Vector3((rnd() - .5) * R * 3.2, (rnd() - .5) * R * 3.2, (rnd() * .9 + .1) * R * 2.4));
      return {
        k, u, ang, a, b, da: sparso(a), db: sparso(b),
        ra: new THREE.Euler(rnd() * 6, rnd() * 6, rnd() * 6), rb: new THREE.Euler(rnd() * 6, rnd() * 6, rnd() * 6),
        t: N > 1 ? k / (N - 1) : 0, luce: 0,
      };
    });
    pronta = true;
    posa(true);
  };

  /* ── LO STATO DELLE COPPIE ────────────────────────────────────────────
     fronte: fin dove l'elica è scritta (fascia: 0..1 lungo l'asse, nel
     tempo; spina: in pixel dall'alto, dallo scroll). Davanti al fronte
     non c'è niente; sul fronte i blocchi arrivano e si agganciano.     */
  let fronte = 0, rigaLuce = -1e6;
  const colA = new THREE.Color(), colB = new THREE.Color();
  const SPENTO_A = new THREE.Color(0x7a4a1c), SPENTO_B = new THREE.Color(0x5a5660);
  const ACCESO_A = new THREE.Color(0xffa040), ACCESO_B = new THREE.Color(0xfff1e0);
  const quota = (c) => ORIZ
    ? clamp((fronte - c.t) / .16, 0, 1)
    : clamp((fronte - c.u) / (passo * 3.2), 0, 1);
  const posa = (forza) => {
    if (!pronta) return;
    let cambiato = !!forza;
    for (const c of coppie) {
      const qq = quota(c);
      if (!forza && qq === c.q && (ORIZ || Math.abs(c.luceV - c.luce) < .004)) continue;
      cambiato = true; c.q = qq;
      const qb = easeOut(clamp(qq * 1.25, 0, 1)), qp = easeOut(clamp((qq - .45) / .55, 0, 1));
      /* i due blocchi: dal loro sparso al loro posto, girando */
      for (const [p, da, rot, im, fase] of [[c.a, c.da, c.ra, bloccoA, 0], [c.b, c.db, c.rb, bloccoB, Math.PI]]) {
        pos.lerpVectors(da, p, qb);
        const ang = c.ang + fase;
        e.set(ORIZ ? ang + rot.x * (1 - qb) : rot.x * (1 - qb), ORIZ ? rot.y * (1 - qb) : -ang + rot.y * (1 - qb), rot.z * (1 - qb));
        q.setFromEuler(e);
        const s = S * Math.max(.0001, Math.pow(qb, .7));
        sc.set(s, s, s);
        m4.compose(pos, q, sc);
        im.setMatrixAt(c.k, m4);
      }
      /* i pioli: due metà, dal centro verso ciascun blocco, si tendono dopo */
      /* non scritto: niente, nemmeno il disco del piolo (raggio a zero) */
      const lungo = Math.max(.0001, (R - S * .5) * qp), raggio = Math.max(.0001, S * .075 * Math.min(1, qp * 4));
      for (const [im, fase] of [[pioloA, 0], [pioloB, Math.PI]]) {
        radiale(c.ang + fase, dir);
        punto(c.u, c.ang + fase, lungo / 2, pos);
        q.setFromUnitVectors(Y, dir);
        sc.set(raggio, lungo, raggio);
        m4.compose(pos, q, sc);
        im.setMatrixAt(c.k, m4);
      }
      c.luceV = c.luce;
      colA.copy(SPENTO_A).lerp(ACCESO_A, c.luce); colB.copy(SPENTO_B).lerp(ACCESO_B, c.luce);
      pioloA.setColorAt(c.k, colA); pioloB.setColorAt(c.k, colB);
    }
    if (!cambiato) return false;
    [bloccoA, bloccoB, pioloA, pioloB].forEach(im => { im.instanceMatrix.needsUpdate = true; });
    pioloA.instanceColor.needsUpdate = true; pioloB.instanceColor.needsUpdate = true;
    /* i filamenti si disegnano fino al fronte */
    for (const f of [filoA, filoB]) {
      const quanti = ORIZ ? clamp(fronte + .04, 0, 1) : clamp((fronte - u0 + passo * .5) / (N * passo), 0, 1);
      f.geometry.setDrawRange(0, Math.round(quanti * f.userData.seg) * f.userData.rad * 6);
    }
    return true;
  };

  /* ── LA FINESTRA ──────────────────────────────────────────────────────
     Il mondo ha l'origine al centro dello schermo (y in su); la camera sta
     davanti, all'altezza degli occhi, e setViewOffset inquadra solo il
     rettangolo della tela. L'elica sta al centro della tela.            */
  let D = 1, vw = 1, vh = 1;
  const misura = () => {
    const r = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
    const nuova = w !== W || h !== H;
    W = w; H = h;
    renderer.setSize(W, H, false);
    vw = innerWidth; vh = innerHeight;
    D = (vh / 2) / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    camera.position.set(0, 0, D);
    camera.near = Math.max(10, D * .2); camera.far = D * 4;
    camera.aspect = vw / vh;
    scene.fog = ORIZ ? new THREE.Fog(0x0d0c10, D * .9, D * 1.62) : null;
    if (nuova || !pronta) costruisci();
  };
  const inquadra = (r) => {
    camera.setViewOffset(vw, vh, r.left, r.top, W, H);
    /* l'elica al centro della tela, in coordinate mondo */
    const cx = r.left + W / 2 - vw / 2, cy = vh / 2 - (r.top + H / 2);
    if (ORIZ) inclina.position.set(cx, cy, 0);
    else inclina.position.set(cx, cy + H / 2, 0);   /* la spina parte dal bordo alto */
  };

  /* ── IL CICLO ─────────────────────────────────────────────────────────
     Fascia: si scrive in 2,4 s la prima volta che entra a schermo, poi gira
     con lo scroll (1,1 giri da quando entra a quando esce) e da sola
     (un giro ogni ~50 s). Spina: fronte e luce dalla linea di lettura,
     giro dallo scroll; si ridisegna solo quando qualcosa cambia.       */
  let visibile = false, raf = 0, ultimo = 0, giroL = 0, tempo = 0, scritta = -1, campioni = 0, somma = 0;
  let ultimaChiave = '';
  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(64, now - (ultimo || now)); ultimo = now;
    if (campioni < 90) { somma += dt; campioni++; if (campioni === 90 && somma / 90 > 22 && dpr > 1) { dpr = 1; renderer.setPixelRatio(1); renderer.setSize(W, H, false); } }
    const r = canvas.getBoundingClientRect();
    if (r.width < 2) return;
    inquadra(r);
    let giro, mosso = false;
    if (ORIZ) {
      /* il progresso della fascia nello schermo: 0 entra dal basso, 1 esce in alto */
      const p = clamp((vh - r.top) / (vh + H), 0, 1);
      if (scritta < 0 && p > .15) scritta = now;
      const ts = scritta < 0 ? 0 : (now - scritta) / 2400;
      const f = scritta < 0 ? 0 : easeInOut(clamp(ts, 0, 1)) * 1.2;
      if (f !== fronte) { fronte = f; mosso = true; }
      tempo += dt / 1000;
      const bersaglio = p * Math.PI * 2 * 1.1;
      giroL += (bersaglio - giroL) * (1 - Math.pow(.002, dt / 1000));
      giro = giroL + tempo * .12;
    } else {
      /* la linea di lettura: poco sotto il centro dello schermo. Quello
         che hai letto resta scritto: il fronte avanza e non torna indietro */
      const lettura = Math.max(fronte, vh * .56 - r.top);
      if (lettura !== fronte) { fronte = lettura; mosso = true; }
      const centro = vh * .5 - r.top;
      for (const c of coppie) c.luce = Math.exp(-Math.pow((c.u - centro) / (passo * 2.2), 2));
      const bersaglio = -r.top * .0042;
      giroL += (bersaglio - giroL) * (1 - Math.pow(.0005, dt / 1000));
      giro = giroL;
    }
    if (ORIZ) gira.rotation.x = giro; else gira.rotation.y = giro;
    const cambiato = posa(false) || mosso;
    const chiave = Math.round(r.top) + ':' + giro.toFixed(4) + ':' + W + 'x' + H;
    if (!cambiato && chiave === ultimaChiave) return;
    ultimaChiave = chiave;
    renderer.render(scene, camera);
  };
  const sottoMenu = () => document.documentElement.classList.contains('menu-aperto');
  const avviaCiclo = () => { if (!raf && visibile && !document.hidden && !sottoMenu()) { ultimo = 0; raf = requestAnimationFrame(frame); } };
  const ferma = () => { cancelAnimationFrame(raf); raf = 0; };

  host.append(canvas);
  misura();
  new ResizeObserver(() => { misura(); ultimaChiave = ''; }).observe(host);
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { misura(); ultimaChiave = ''; }, 120); }, { passive: true });
  new IntersectionObserver(([en]) => { visibile = en.isIntersecting; visibile ? avviaCiclo() : ferma(); }, { rootMargin: '160px 0px' }).observe(host);
  document.addEventListener('visibilitychange', () => { document.hidden ? ferma() : avviaCiclo(); });
  new MutationObserver(() => { sottoMenu() ? ferma() : avviaCiclo(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  /* il primo fotogramma è pronto: la versione CSS può dissolversi */
  requestAnimationFrame(() => requestAnimationFrame(() => host.classList.add('is-3d')));
  return { renderer, scene, camera, misura };
}
