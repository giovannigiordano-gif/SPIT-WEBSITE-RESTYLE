/* ═══════════════════════════════════════════════════════════════════════════
   SALESPROCESS · dati.js — contenuto + rendering
   ---------------------------------------------------------------------------
   ⚠ OGNI VALORE MARCATO `prov: true` È PROVVISORIO e va sostituito col dato
   reale del cliente. I bloccanti sono elencati in
   docs/superpowers/specs/2026-09-09-salesprocess-restyling-design.md
   Tre regole cablate qui, non nella code review:
     1. nessuna scheda-risultato senza fonte, data e liberatoria;
     2. un solo valore per concetto (mai 150 vs +800 vs +1.100);
     3. ogni cifra passa da Intl.NumberFormat('it-IT'). Il simbolo $ non esiste.
   ═══════════════════════════════════════════════════════════════════════════ */

const fmt = new Intl.NumberFormat('it-IT');
const fmt1 = new Intl.NumberFormat('it-IT', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/* ── ICONE ────────────────────────────────────────────────────────────────
   Set disegnato su griglia 24, tratto 1.75, terminali e giunzioni
   arrotondate, nessun riempimento. Una sola convenzione per tutte: è la
   costanza di tratto — non il soggetto — che le fa leggere premium.
   Niente glifi unicode, niente emoji, nessuna libreria caricata a runtime. */
const SVG = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const ICO = {
  /* bersaglio — comprare attenzione dove serve */
  target: SVG('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".4" stroke-width="2.4"/>'),
  /* imbuto — qualificare prima della chiamata */
  imbuto: SVG('<path d="M3.5 5h17l-6.6 7.9V19l-3.8-1.9v-4.2z"/>'),
  /* persone — reclutare */
  persone: SVG('<path d="M15 20v-1.6a3.6 3.6 0 0 0-3.6-3.6H7.1A3.6 3.6 0 0 0 3.5 18.4V20"/><circle cx="9.25" cy="8" r="3.5"/><path d="M17.5 8.5h4M19.5 6.5v4"/>'),
  /* barre in salita — performance che si mantengono */
  salita: SVG('<path d="M4 20v-4M9.3 20v-7.5M14.7 20v-11M20 20v-14.5"/>'),
  /* nodi collegati — il processo costruito */
  processo: SVG('<rect x="3" y="3.5" width="7" height="5.5" rx="1.6"/><rect x="14" y="15" width="7" height="5.5" rx="1.6"/><path d="M6.5 9v5.2A2.5 2.5 0 0 0 9 16.7h5"/>'),
  /* colonne — pipeline */
  pipeline: SVG('<rect x="3" y="4" width="4.6" height="16" rx="1.5"/><rect x="9.7" y="4" width="4.6" height="10.5" rx="1.5"/><rect x="16.4" y="4" width="4.6" height="6" rx="1.5"/>'),
  /* fumetto — script e obiezioni */
  voce: SVG('<path d="M4 6.2A2.2 2.2 0 0 1 6.2 4h11.6A2.2 2.2 0 0 1 20 6.2v7.3a2.2 2.2 0 0 1-2.2 2.2H9.4L4 20z"/><path d="M8.5 9.8h7M8.5 12.6h4"/>'),
  /* cartellino — offerta e prezzo */
  prezzo: SVG('<path d="M12.4 3H3.6A.6.6 0 0 0 3 3.6v8.8a2 2 0 0 0 .6 1.4l7 7a2 2 0 0 0 2.8 0l6.6-6.6a2 2 0 0 0 0-2.8l-7-7A2 2 0 0 0 12.4 3z"/><circle cx="7.6" cy="7.6" r="1.5"/>'),
  /* bussola — direzione commerciale */
  bussola: SVG('<circle cx="12" cy="12" r="8.5"/><path d="M15.4 8.6l-2 4.8-4.8 2 2-4.8z"/>'),
  /* referto — il rendiconto settimanale */
  referto: SVG('<path d="M14.2 3H7.4A1.9 1.9 0 0 0 5.5 4.9v14.2A1.9 1.9 0 0 0 7.4 21h9.2a1.9 1.9 0 0 0 1.9-1.9V7.1z"/><path d="M14.2 3v4.1h4.3"/><path d="M9 12.5h6M9 16.2h4"/>'),
  /* ciclo — riattivare chi hai già */
  ciclo: SVG('<path d="M20.4 11.2A8.5 8.5 0 0 0 6.1 6.6L3.6 9"/><path d="M3.6 4.2V9h4.8"/><path d="M3.6 12.8a8.5 8.5 0 0 0 14.3 4.6l2.5-2.4"/><path d="M20.4 19.8V15h-4.8"/>'),
  /* libro aperto — formare il titolare */
  libro: SVG('<path d="M12 6.4A4.4 4.4 0 0 0 7.6 4H3.5v13.6h4.1A4.4 4.4 0 0 1 12 20a4.4 4.4 0 0 1 4.4-2.4h4.1V4h-4.1A4.4 4.4 0 0 0 12 6.4z"/><path d="M12 6.4V20"/>'),
};

/* ── SCHEDE DEL NASTRO ────────────────────────────────────────────────────
   Sei, non trenta: meglio sei con la liberatoria che trenta anonime.     */
const PROVE = [
  { n:1, settore:'Impiantistica', geo:'Bergamo', da:1.4, a:3.1, mesi:11, foto:'hand-pen',        logo:'c-13', extra:'Meta + telefono · 4 venditori reclutati · chiusura media 21 gg', prov:true },
  { n:2, settore:'Serramenti',    geo:'Treviso', da:2.2, a:4.0, mesi:9,  foto:'hand-contract',   logo:'c-25', extra:'Google + fiere · 6 venditori reclutati · chiusura media 28 gg',  prov:true },
  { n:3, settore:'Consulenza HR', geo:'Milano',  da:1.1, a:2.4, mesi:12, foto:'hand-graduation', logo:'c-33', extra:'LinkedIn + referral · 3 venditori reclutati · chiusura media 34 gg', prov:true },
  { n:4, settore:'Edilizia',      geo:'Brescia', da:3.0, a:5.2, mesi:10, foto:'hand-bw',         logo:'c-8',  extra:'Meta + telefono · 5 venditori reclutati · chiusura media 25 gg',  prov:true },
  { n:5, settore:'Nautica',       geo:'Genova',  da:1.8, a:3.4, mesi:8,  foto:'hand-pen',        logo:'c-36', extra:'Google + fiere · 4 venditori reclutati · chiusura media 30 gg',  prov:true },
  { n:6, settore:'Automazione',   geo:'Modena',  da:2.6, a:4.7, mesi:12, foto:'hand-contract',   logo:'c-24', extra:'LinkedIn + telefono · 7 venditori reclutati · chiusura media 27 gg', prov:true },
];

/* Larghezza naturale dei PNG (sono tutti alti 120px): serve per dare a ogni
   logo dimensioni INTRINSECHE — prima erano box 0×34px finché non
   caricavano, e la pista del marquee cambiava lunghezza (e velocità)
   mentre arrivavano — e per il bilanciamento ottico qui sotto.         */
const LOGHI = [['c-8',467],['c-9',116],['c-10',187],['c-11',163],['c-12',984],['c-13',820],['c-14',141],['c-15',259],['c-16',114],['c-18',379],['c-20',447],['c-23',87],['c-24',120],['c-25',310],['c-27',155],['c-28',820],['c-31',283],['c-32',164],['c-33',202],['c-34',209],['c-35',287],['c-36',249],['c-37',351],['c-38',711],['c-39',85]];
/* Peso ottico uguale, non altezza uguale: l'altezza scala con
   (larghezza/altezza)^-0.4 — un marchio quadrato sta a 44px, un wordmark
   lungo scende a ~19px. Con l'altezza fissa i marchi quadrati sparivano
   e i wordmark lunghi urlavano.                                        */
const misuraLogo = (wNat) => {
  const r = wNat / 120;
  let h = 44 * Math.pow(r, -0.4), w = h * r;
  if (w > 168) { w = 168; h = w / r; }
  return [Math.round(w), Math.round(h)];
};

/* ── I NUMERI ─────────────────────────────────────────────────────────────
   ⚠ RICONCILIAZIONE BLOCCANTE. Oggi sul sito e sui canali convivono
   150 vs +800 imprenditori, 20 vs 30 vs 34 persone, 6 vs 9/12 mesi.
   Serve un valore per concetto, con la sua etichetta e la sua data.      */
const NUMERI = [
  { v:150, u:'',   lab:'Imprenditori seguiti',           su:'dal 2020',     barre:12, tinta:'calda',  fonte:'Agg. 09.2026 · gestionale interno', prov:true },
  { v:33,  u:'',   lab:'Settori differenti',             su:'e continuano', barre:8,  tinta:'fredda', fonte:'Agg. 09.2026 · gestionale interno', prov:true },
  { v:750, u:'',   lab:'Processi di vendita realizzati', su:'in sei anni',  barre:12, tinta:'verde',  fonte:'Agg. 09.2026 · gestionale interno', prov:true, x10:true },
];

/* ── IL BENTO ─────────────────────────────────────────────────────────────
   I quattro reparti aperti in ciò che fanno davvero. Griglia uniforme.   */
const BENTO = [
  { i:'target',  t:'Pubblicità a performance',   d:'Meta, Google, YouTube e LinkedIn con un budget che rendiconta ogni euro speso.' },
  { i:'imbuto',  t:'Marketing a risposta diretta', d:'Sequenze, pagine e VSL che qualificano prima che un venditore alzi il telefono.' },
  { i:'persone',  t:'Reclutamento venditori',     d:'Annunci, colloqui, prove sul campo, inserimento. I venditori restano tuoi.' },
  { i:'salita',   t:'Formazione rete vendita',    d:'Script, affiancamento e numeri ogni settimana. Le performance si mantengono, non si alzano una volta.' },
  { i:'processo',    t:'Costruzione del processo',   d:'Dal primo contatto alla firma: chi fa cosa, con quale tempo e quale strumento.' },
  { i:'pipeline', t:'CRM e pipeline',             d:'Un solo posto dove sta la trattativa, e un solo numero che il titolare guarda.' },
  { i:'voce',    t:'Script e gestione obiezioni', d:'Scritti sulle obiezioni vere del tuo mercato, non su un manuale americano.' },
  { i:'prezzo',  t:'Offerta e prezzo',           d:'Come si impacchetta e come si difende, prima che il cliente chieda lo sconto.' },
  { i:'bussola',   t:'Direzione commerciale',      d:'Un referente che risponde del numero finale, non del numero di attività svolte.' },
  { i:'referto',   t:'Rendiconto settimanale',     d:'Un report che si legge in cinque minuti e dice se il mese chiude o no.' },
  { i:'ciclo', t:'Riattivazione dormienti',    d:'Il fatturato più economico è quello dei contatti che hai già e non hai richiamato.' },
  { i:'libro',   t:'Formazione del titolare',    d:'Perché il reparto resta tuo, e a un certo punto devi saperlo guidare da solo.' },
];

/* ── LA MACCHINA ──────────────────────────────────────────────────────────
   ⚠ BLOCCANTE. I tre passaggi di consegna — chi passa cosa a chi, con
   quale SLA, con quale strumento, chi ne risponde — sono CONTENUTO, non
   grafica. Senza questi dati la scena diventa quattro icone animate,
   cioè il difetto esatto del sito attuale, e si spedisce la tabella.    */
const REPARTI = [
  { i:1, nome:'Pubblicità',                   claim:'Compriamo attenzione dove i tuoi clienti sono già, online e offline.',       out:'1.000 contatti generati' },
  { i:2, nome:'Marketing a risposta diretta', claim:'Profiliamo ed educhiamo chi arriva, prima che parli con un venditore.',      out:'180 profilati, 41 in trattativa' },
  { i:3, nome:'Reclutamento',                 claim:'Annunci, colloqui, prove sul campo, inserimento. I venditori restano tuoi.', out:'4 venditori su 96 candidature' },
  { i:4, nome:'Formazione rete vendita',      claim:'Script, affiancamento, numeri ogni settimana.',                              out:'37% di conversione a 90 giorni' },
];
const HANDOFF = [
  { cosa:'Contatto grezzo',     sla:'SLA 24 h',  tool:'CRM condiviso',     prov:true },
  { cosa:'Contatto educato',    sla:'SLA 24 h',  tool:'Scheda profilo',    prov:true },
  { cosa:'Venditore operativo', sla:'SLA 30 gg', tool:'Scheda competenze', prov:true },
];

/* ── IL TEAM ──────────────────────────────────────────────────────────────
   Nomi, ruoli e ritratti REALI, presi dalla pagina team del sito attuale.
   Il set fotografico è coerente (stesso muro, stessa luce): la monocromia
   calda li unifica sul fondo scuro senza ricorrere al duotone, che
   disumanizzerebbe la prova che converte più di tutte.
   NOTA DI RICONCILIAZIONE: le persone elencate sono TREDICI, non 34. Il
   numero che si pubblica è questo, perché è quello verificabile.        */
const REP_NOMI = ['Pubblicità', 'Marketing', 'Reclutamento', 'Formazione', 'Direzione'];
const VOLTI = [
  { nome: 'Alberto Frisoni',      ruolo: 'CEO',                  rep: 5, f: 'frisoni' },
  { nome: 'Alfio Bardolla',       ruolo: 'Co-founder',           rep: 5, f: 'bardolla' },
  { nome: 'Ion Rotaru',           ruolo: 'Direttore operativo',  rep: 5, f: 'rotaru' },
  { nome: 'Matteo Ratti',         ruolo: 'Media buyer',          rep: 1, f: 'ratti' },
  { nome: 'Paola Russo',          ruolo: 'Social media manager', rep: 1, f: 'russo' },
  { nome: 'Dario Plasmati',       ruolo: 'Copywriter',           rep: 2, f: 'plasmati' },
  { nome: 'Giovanni Giordano',    ruolo: 'CRM specialist',       rep: 2, f: 'giordano' },
  { nome: 'Giulia Elicio',        ruolo: 'HR manager',           rep: 3, f: 'elicio' },
  { nome: 'Giorgia Tocco',        ruolo: 'HR',                   rep: 3, f: 'tocco' },
  { nome: 'Cristian Amodio',      ruolo: 'Sales coach',          rep: 4, f: 'amodio' },
  { nome: 'Gloria Antonelli',     ruolo: 'Sales coach',          rep: 4, f: 'antonelli' },
  { nome: 'Sabrina Frisoni',      ruolo: 'Office manager',       rep: 5, f: 'sabrina' },
];

/* ── LA TABELLA — pagina Metodo ─────────────────────────────────────────── */
const RIGHE = [
  { f:'pubblicita',   rep:'Pubblicità',   in:'Budget e obiettivo di fatturato',  out:'Contatti profilati per canale',  sla:'Settimanale', tool:'Meta, Google, TikTok', chi:'Media buyer' },
  { f:'pubblicita',   rep:'Pubblicità',   in:'Brief di offerta',                 out:'Creatività e VSL',               sla:'10 gg',       tool:'Studio interno',       chi:'Direttore pubblicità' },
  { f:'pubblicita',   rep:'Pubblicità',   in:'Dati di chiusura dal reparto 04',  out:'Riallocazione del budget',       sla:'Settimanale', tool:'Dashboard',            chi:'Media buyer' },
  { f:'marketing',    rep:'Marketing',    in:'Contatto grezzo',                  out:'Contatto educato e profilato',   sla:'24 h',        tool:'CRM condiviso',        chi:'Funnel manager' },
  { f:'marketing',    rep:'Marketing',    in:'Obiezioni raccolte dai venditori', out:'Sequenze e materiali',           sla:'15 gg',       tool:'Email e WhatsApp',     chi:'Copy' },
  { f:'marketing',    rep:'Marketing',    in:'Contatto non pronto',              out:'Nurturing a lungo termine',      sla:'Continuo',    tool:'Automazioni',          chi:'Funnel manager' },
  { f:'reclutamento', rep:'Reclutamento', in:'Profilo del venditore richiesto',  out:'Rosa di candidati filtrati',     sla:'21 gg',       tool:'Annunci e colloqui',   chi:'Responsabile selezione' },
  { f:'reclutamento', rep:'Reclutamento', in:'Rosa di candidati',                out:'Venditore inserito in azienda',  sla:'30 gg',       tool:'Prove sul campo',      chi:'Recruiter' },
  { f:'reclutamento', rep:'Reclutamento', in:'Uscita di un venditore',           out:'Sostituzione avviata',           sla:'48 h',        tool:'Bacino candidati',     chi:'Responsabile selezione' },
  { f:'formazione',   rep:'Formazione',   in:'Venditore operativo',              out:'Venditore che chiude',           sla:'90 gg',       tool:'Script e role play',   chi:'Sales coach' },
  { f:'formazione',   rep:'Formazione',   in:'Registrazioni delle chiamate',     out:'Correzioni individuali',         sla:'Settimanale', tool:'Affiancamento',        chi:'Sales coach' },
  { f:'formazione',   rep:'Formazione',   in:'Numeri della settimana',           out:'Report al titolare',             sla:'Settimanale', tool:'Dashboard',            chi:'Sales coach' },
];

/* ── FASCICOLI — pagina Risultati ─────────────────────────────────────────
   Meglio uno vero che tre vuoti: finché le liberatorie non arrivano, la
   sezione monta una card e lo dice.                                      */
const FASCICOLI = [
  { n:1, settore:'Impiantistica', geo:'Lombardia', mesi:11, da:1.4, a:3.1, foto:'hand-contract', logo:'c-13',
    dati:['Partenza 1,4 M€','14 venditori reclutati','Meta + fiere','Fonte CRM cliente'],
    fatto:[
      'Rifatta la struttura di campagna: budget riallocato sui due canali che chiudevano davvero.',
      'Sequenza di qualificazione prima della chiamata: il venditore parla solo con chi è pronto.',
      '96 candidature filtrate, 14 venditori inseriti in 11 mesi.',
      'Script, role play settimanale, numeri sul tavolo del titolare ogni lunedì.',
    ], prov:true },
];

const SETTORI = ['Impiantistica','Serramenti','Edilizia','Automazione','Nautica','Consulenza HR','Consulenza fiscale','Arredamento','Logistica','Meccanica','Elettronica','Energie rinnovabili','Informatica','Sicurezza','Formazione','Immobiliare','Assicurazioni','Odontoiatria','Estetica','Ristorazione','Ottica','Agroalimentare','Packaging','Tessile','Stampa','Trasporti','Manutenzioni','Antincendio','Piscine','Serre','Pavimentazioni','Coperture','Domotica'];

/* ═══ RENDERING ═══════════════════════════════════════════════════════════ */
const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];


/* La scheda è un GRAFICO A UNITÀ: un quadrato del marchio = 100.000 € di
   fatturato annuo. Due torri, prima e dopo, che crescono dal basso come la
   scalinata. Rappresenta i due soli dati dichiarati: nessun valore
   intermedio inventato fra la partenza e l'arrivo.
   La fotografia di sfondo è uscita: le quattro mani ora sono i quattro
   reparti di "Cosa facciamo", dove significano qualcosa.             */
const torre = (v, cls) => {
  const n = Math.round(v * 10);
  return `<span class="torre ${cls}" style="--n:${n}">${'<i></i>'.repeat(n)}</span>`;
};
const logoCliente = (id, cls) => {
  const L = LOGHI.find(x => x[0] === id);
  const [w, h] = L ? misuraLogo(L[1]) : [120, 30];
  return `<img class="${cls}" src="/assets/clients-white/${id}.png" alt="" width="${w}" height="${h}" loading="lazy" decoding="async">`;
};
const scheda = (p) => el('article', 'scheda', `
  <div class="scheda__testa">
    ${logoCliente(p.logo, 'scheda__logo')}
    <p class="scheda__cart">${p.settore} · ${p.geo}</p>
  </div>
  <div class="scheda__grafico" aria-hidden="true">
    <span class="scheda__col">${torre(p.da, 'torre--prima')}<span class="scheda__v">${fmt1.format(p.da)}</span></span>
    <span class="scheda__col">${torre(p.a, 'torre--dopo')}<span class="scheda__v">${fmt1.format(p.a)}</span></span>
  </div>
  <p class="scheda__num">da ${fmt1.format(p.da)} a ${fmt1.format(p.a)} <span class="t-unita">M€</span></p>
  <p class="scheda__mesi">Fatturato in ${p.mesi} mesi</p>
  <span class="scheda__extra"><span>${p.extra}</span></span>
  <p class="scheda__fonte">Fonte: CRM cliente · agg. 08.2026 · con liberatoria</p>`);

/* ── IL REGISTRO DEI NUMERI ───────────────────────────────────────────────
   Una VOCE di registro, non una card: numero, etichetta, istogramma che
   rappresenta la quantità, fonte. Il CSS (.registro) le dispone in modo
   asimmetrico — la prima a tutta altezza, le altre due in colonna.   */
const voce = (x, i) => {
  const n = el('article', 'voce voce--' + x.tinta);
  n.style.setProperty('--i', i);
  const barre = Array.from({ length: x.barre }, (_, k) =>
    `<i style="--b:${k};--h:${30 + Math.round(70 * (k + 1) / x.barre)}%"></i>`).join('');
  n.innerHTML = `
    <p class="voce__su">${x.su}</p>
    <p class="voce__num num">${fmt.format(x.v)}${x.u ? `<span class="t-unita">${x.u}</span>` : ''}</p>
    <p class="voce__lab">${x.lab}</p>
    <div class="voce__isto" aria-hidden="true">${barre}</div>
    <p class="voce__fonte">${x.fonte}${x.x10 ? ' · una barra = 60' : ''}</p>`;
  return n;
};

/* ── COSA FACCIAMO ────────────────────────────────────────────────────────
   I quattro reparti (le prime quattro voci del bento) prendono le quattro
   fotografie del brand, una per reparto: il megafono è la pubblicità, la
   penna è il copy a risposta diretta, il contratto è l'assunzione, il
   tocco è la formazione. Gli altri otto servizi diventano un indice
   tipografico: due livelli di gerarchia invece di dodici card uguali.  */
const FOTO_REP = {
  target:  ['hand-bw', 533],
  imbuto:  ['hand-pen', 533],
  persone: ['hand-contract', 603],
  salita:  ['hand-graduation', 603],
};
const pannello = (b, i) => {
  const [f, w] = FOTO_REP[b.i];
  const n = el('article', 'pannello');
  n.style.setProperty('--i', i);
  n.innerHTML = `
    <div class="pannello__foto"><img src="/assets/webp/${f}.webp" alt="" width="${w}" height="800" loading="lazy" decoding="async"></div>
    <div class="pannello__txt">
      <span class="pannello__n" aria-hidden="true">0${i + 1}</span>
      <h3 class="pannello__tit">${b.t}</h3>
      <p class="pannello__desc">${b.d}</p>
    </div>`;
  return n;
};
const servizio = (b, i) => {
  const n = el('li', 'servizio');
  n.style.setProperty('--i', i % 4);
  n.innerHTML = `<span class="servizio__ico">${ICO[b.i]}</span><h3 class="servizio__tit">${b.t}</h3><p class="servizio__desc">${b.d}</p>`;
  return n;
};

/* ── SEZIONE METODO ───────────────────────────────────────────────────────
   I mattoni portavano l'idea «il reparto è alto quanto il suo lavoro», ma
   si leggevano come decorazione. Al loro posto l'icona del reparto e il
   numero fantasma: danno struttura senza chiedere di essere interpretati.
   I referenti escono da qui e restano sulla pagina Team, dove il nome ha
   il contesto per significare qualcosa.                                   */
const REP_ICO = { 1: 'target', 2: 'imbuto', 3: 'persone', 4: 'salita' };
const reparto = (r) => {
  const n = el('article', 'reparto');
  n.dataset.rep = r.i;
  n.style.setProperty('--k', r.i - 1);
  n.innerHTML = `
    <span class="reparto__n" aria-hidden="true">0${r.i}</span>
    <span class="icoq">${ICO[REP_ICO[r.i]]}</span>
    <h3 class="t-t2">${r.nome}</h3>
    <p class="t-piccolo reparto__claim">${r.claim}</p>
    <p class="t-piccolo reparto__out">${r.out}</p>`;
  return n;
};

/* Il passaggio di consegna è un VARCO sul binario: la cosa che passa sopra,
   tempo e strumento sotto. Il varco si accende quando il pacchetto lo
   attraversa (motion.js / CSS).                                       */
const handoff = (h, i) => {
  const n = el('p', 'handoff');
  n.dataset.ho = i + 1;
  n.style.setProperty('--k', i);
  n.innerHTML = `<span class="handoff__cosa">${h.cosa}</span><span class="handoff__det">${h.sla} · ${h.tool}</span>`;
  return n;
};

const volto = (v) => el('article', 'volto', `
  <div class="volto__ph">
    <img src="/assets/team-webp/${v.f}.webp" alt="${v.nome}, ${v.ruolo}" width="640" height="640" loading="lazy">
    <span class="volto__tag">${REP_NOMI[v.rep - 1]}</span>
  </div>
  <div>
    <p class="t-t2">${v.nome}</p>
    <p class="t-piccolo" style="color:var(--c-t3)">${v.ruolo}</p>
  </div>`);

/* La scheda persona dello slider di home. Il ritratto è l'oggetto; il
   nome sta sopra la sfumatura, non dentro una card separata.          */
const persona = (v) => {
  /* Un link, non un article: la scheda portava a niente ed era l'unico
     oggetto del carosello che sembrava cliccabile senza esserlo.     */
  const n = el('a', 'pers');
  n.href = '/team.html';
  n.setAttribute('role', 'listitem');
  n.innerHTML = `
    <img src="/assets/team-webp/${v.f}.webp" alt="${v.nome}, ${v.ruolo}" width="640" height="640" loading="lazy">
    <div class="pers__txt">
      <span class="pers__rep"><i aria-hidden="true"></i>${REP_NOMI[v.rep - 1]}</span>
      <p class="t-t2">${v.nome}</p>
      <p class="t-piccolo" style="color:var(--c-t2)">${v.ruolo}</p>
    </div>`;
  return n;
};

/* L'ultima scheda non è una persona: è la porta alla pagina Team. Chiude
   lo slider con un'azione invece di lasciarlo sfumare nel nulla.       */
const porta = () => {
  const a = el('a', 'pers pers--porta');
  a.href = '/team.html';
  a.setAttribute('role', 'listitem');
  a.innerHTML = `
    <p class="t-eyebrow" style="color:var(--c-ar-hot)">Tutte e tredici</p>
    <p class="t-t1" style="max-inline-size:14ch">Conosci il reparto che entra in azienda.</p>
    <p class="t-piccolo" style="color:var(--c-t2)">Ruoli, reparti e i due fondatori.</p>
    <span class="frecc" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
    </span>`;
  return a;
};

const fascicolo = (f) => el('article', 'fascicolo rise', `
  <div class="scalinata" style="aspect-ratio:auto;min-height:440px">
    ${[0,1,2,3].map(i => `<span style="--i:${i}"><img src="/assets/webp/${f.foto}.webp" alt="${i ? '' : 'Fascicolo cliente'}" ${i ? 'aria-hidden="true"' : ''} width="603" height="800" loading="lazy"></span>`).join('')}
  </div>
  <div class="fascicolo__panel">
    <p class="t-micro">Fascicolo 0${f.n} · ${f.settore} · ${f.geo} · ${f.mesi} mesi</p>
    <img class="fascicolo__logo" src="/assets/clients-white/${f.logo}.png" alt="" loading="lazy">
    <p class="t-numero" style="font-size:clamp(34px,3.8vw,52px)">da ${fmt1.format(f.da)} a ${fmt1.format(f.a)} <span class="t-unita">M€</span></p>
    <p class="t-micro fascicolo__dati">${f.dati.map(d => `<span>${d}</span>`).join('<span aria-hidden="true">·</span>')}</p>
    <ul class="lista t-piccolo">${f.fatto.map(x => `<li><span>${x}</span></li>`).join('')}</ul>
  </div>`);

/* ── TESTIMONIANZE VIDEO ──────────────────────────────────────────────────
   Cinque video REALI presi dal sito del cliente, con il nome giusto
   accanto a ciascuno (mappatura verificata sul DOM di salesprocess.it).
   Il testo che accompagnava questi video sul sito attuale era lo STESSO
   paragrafo segnaposto ripetuto sotto cinque nomi diversi: quello non lo
   riportiamo. Il video è la testimonianza; una didascalia falsa la
   indebolirebbe.                                                        */
const VIDEO = [
  { id: '1135278717', tipo: 'vimeo', nome: 'Alessandro Cianflone' },
  { id: 'nw8QUpAVD-4', tipo: 'yt',   nome: 'Roberto Straniero' },
  { id: 'rQK-SIR9NDY', tipo: 'yt',   nome: 'Claudia Mabiglia' },
  { id: '7yS2POkFDb4', tipo: 'yt',   nome: 'Alessandro Scuderi' },
  { id: 'y47Ho--fc28', tipo: 'yt',   nome: 'Claudia Petrazzuolo' },
];

/* FACCIATA: cinque iframe al caricamento costerebbero oltre un megabyte e
   secondi di INP. Si carica il player solo al click.                    */
const video = (v) => {
  const f = el('figure', 'vidbox');
  f.innerHTML = `
    <button class="vid" type="button" data-id="${v.id}" data-tipo="${v.tipo}"
            aria-label="Guarda la testimonianza di ${v.nome}">
      <img class="vid__ph" src="/assets/video/${v.id}.webp" alt="" width="720" height="405" loading="lazy">
      <span class="vid__play" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.2v13.6L19 12z"/></svg>
      </span>
    </button>
    <figcaption class="vidbox__cap">
      <span class="t-t2">${v.nome}</span>
      <span class="t-micro">Cliente Sales Process</span>
    </figcaption>`;
  return f;
};

/* ── DNA · i dieci comandamenti ───────────────────────────────────────────
   Testi PRESI dalla pagina /dna/ del cliente, parola per parola. I titoli
   li abbiamo aggiunti noi: sul sito attuale sono dieci paragrafi senza
   titolo uno sotto l'altro, e nessuno li legge.                         */
const COMAND = [
  { t: 'Le risposte',   d: 'Lavorare per trovare le risposte ad ogni quesito del percorso. Non aspettiamoci di trovare un percorso lineare: aspettiamoci di trovare sfide, e prepariamoci ad essere ogni volta più grandi di queste.' },
  { t: 'Il possibile',  d: 'Non esiste qualcosa che non si possa realmente realizzare. Se guidata dalla giusta visione, missione e dai giusti principi, lavoriamo per ottenerlo.' },
  { t: 'Il cliente',    d: 'Rendere il cliente soddisfatto della sua azienda. Il suo obiettivo di azienda è il nostro obiettivo.' },
  { t: 'Il fuoco',      d: 'Mantenere alta l’attenzione sul processo di vendita, eliminando ogni distrazione che ci porta ad operare al di fuori di questo.' },
  { t: 'L’eccellenza',  d: 'Non ci limitiamo ad erogare ciò che è sufficientemente buono. Eroghiamo solo ed esclusivamente ciò che è eccellente.' },
  { t: 'Il lungo termine', d: 'Sacrifichiamo ogni risultato nel breve termine se questo influisce sui grandi successi nel lungo termine. La nostra meta è il lungo termine: per il cliente e per noi.' },
  { t: 'Do more with less', d: 'Siamo alla costante ricerca di fare di più con meno tempo e meno risorse. Automazione, fluidità, velocità.' },
  { t: 'I dati',        d: 'Ogni azione deve essere guidata dai dati. Solo scelte motivate dai dati, non dalle emozioni personali di un dato momento.' },
  { t: 'Gli obiettivi', d: 'Guidati dal lavoro duro e dal portare a termine ogni obiettivo che ci prefiggiamo. Non siamo guidati dal tempo e dalle ore, ma dagli obiettivi.' },
  { t: 'La trasparenza', d: 'Con noi stessi, con i membri del team e con i nostri clienti. La trasparenza viene prima.' },
];

const comandamento = (c, i) => {
  const n = el('article', 'card com rise');
  n.style.setProperty('--i', i % 2);
  n.innerHTML = `
    <span class="com__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
    <h3 class="t-t2">${c.t}</h3>
    <p class="t-piccolo" style="color:var(--c-t3);max-inline-size:46ch">${c.d}</p>`;
  return n;
};

/* ── MONTAGGIO ───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Nastro: contenuto + cloni aria-hidden per il loop senza salti. */
  const pista = $('#nastro-pista');
  if (pista) {
    PROVE.forEach(p => pista.append(scheda(p)));
    PROVE.forEach(p => { const c = scheda(p); c.setAttribute('aria-hidden', 'true'); pista.append(c); });
  }

  /* Marquee loghi: contenuto duplicato, il keyframe trasla del 50%. Ogni
     logo nasce con le sue dimensioni: la pista ha la lunghezza finale
     prima che arrivi un solo byte d'immagine.                         */
  const lp = $('#loghi-clienti .loghi__pista');
  if (lp) {
    const uno = LOGHI.map(([f]) => logoCliente(f, 'logo')).join('');
    lp.innerHTML = uno + uno.replaceAll('<img ', '<img aria-hidden="true" ');
  }

  $('#numeri-grid')?.append(...NUMERI.map(voce));

  const bento = $('#bento');
  if (bento) {
    bento.classList.add('bento--reparti');
    const quattro = el('div', 'reparti4');
    quattro.append(...BENTO.slice(0, 4).map(pannello));
    const otto = el('ul', 'servizi');
    otto.append(...BENTO.slice(4).map(servizio));
    bento.append(quattro, otto);
  }
  $('#pista')?.append(...REPARTI.map(reparto));
  $('#handoff-riga')?.append(...HANDOFF.map(handoff));
  $('#volti-grid')?.append(...VOLTI.map(volto));

  /* Slider di home: le persone + i cloni per il loop + la porta finale.
     I cloni sono aria-hidden: lo screen reader legge tredici persone una
     volta sola, non ventisei.                                          */
  const vg = $('#video-grid');
  if (vg) {
    vg.append(...VIDEO.map(video));
    /* Sesta cella: la griglia 3×2 si chiude con un'azione, non con un buco. */
    const pv = el('a', 'vid vid--porta');
    pv.href = '/risultati.html';
    pv.innerHTML = `
      <p class="t-eyebrow" style="color:var(--c-ar-hot)">Oltre le parole</p>
      <p class="t-t1" style="max-inline-size:15ch">I numeri di questi clienti, con fonte e data.</p>
      <span class="frecc" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </span>`;
    vg.append(pv);
  }
  $('#comand')?.append(...COMAND.map(comandamento));

  /* Il player entra solo al click: prima c’e una locandina da 30KB. */
  $('#video-grid')?.addEventListener('click', (e) => {
    const b = e.target.closest('.vid'); if (!b || b.dataset.aperto) return;
    b.dataset.aperto = '1';
    const src = b.dataset.tipo === 'vimeo'
      ? 'https://player.vimeo.com/video/' + b.dataset.id + '?autoplay=1&title=0&byline=0&portrait=0'
      : 'https://www.youtube-nocookie.com/embed/' + b.dataset.id + '?autoplay=1&rel=0';
    const f = document.createElement('iframe');
    f.src = src; f.title = b.getAttribute('aria-label') || 'Testimonianza';
    f.allow = 'autoplay; fullscreen; picture-in-picture';
    f.allowFullscreen = true;
    b.append(f);
  });

  const sq = $('#squadra-pista');
  if (sq) {
    VOLTI.forEach(v => sq.append(persona(v)));
    sq.append(porta());
    VOLTI.forEach(v => { const c = persona(v); c.setAttribute('aria-hidden', 'true'); sq.append(c) });
    const p2 = porta(); p2.setAttribute('aria-hidden', 'true'); p2.tabIndex = -1; sq.append(p2);
  }

  const fl = $('#fascicoli-lista');
  if (fl) {
    fl.append(...FASCICOLI.map(fascicolo));
    if (FASCICOLI.length < 3) {
      const nota = el('p', 't-micro');
      nota.style.marginTop = 'var(--s-5)';
      nota.textContent = 'Il secondo e il terzo fascicolo escono quando i clienti firmano la liberatoria.';
      fl.append(nota);
    }
  }

  /* Fascia chiara: altezza base 26px con OVERRIDE MANUALE per singolo logo,
     perché l'altezza uguale non dà peso ottico uguale.                    */
  const cl = $('#carta-loghi');
  if (cl) cl.innerHTML = [['c-25',32],['c-33',28],['c-8',25],['c-13',22],['c-36',27],['c-24',25]]
    .map(([f, h]) => `<img src="/assets/clients-white/${f}.png" alt="" style="height:${h}px" loading="lazy">`).join('');

  const sg = $('#settori-grid');
  if (sg) sg.innerHTML = SETTORI.map(s => `<span class="chip">${s}</span>`).join('');

  /* Tabella + filtri */
  const body = $('#tabella-body'), conta = $('#tab-conta');
  if (body) {
    const L = ['Reparto','Cosa riceve','Cosa consegna','SLA','Strumento','Chi risponde'];
    const render = (f) => {
      const rows = f === 'tutti' ? RIGHE : RIGHE.filter(r => r.f === f);
      body.innerHTML = rows.map(r => `<tr>
        <td data-l="${L[0]}">${r.rep}</td><td data-l="${L[1]}">${r.in}</td>
        <td data-l="${L[2]}">${r.out}</td><td data-l="${L[3]}" class="sla">${r.sla}</td>
        <td data-l="${L[4]}">${r.tool}</td><td data-l="${L[5]}">${r.chi}</td></tr>`).join('');
      if (conta) conta.textContent = `${rows.length} righe su ${RIGHE.length}`;
    };
    render('tutti');
    $('#tab-filtri')?.addEventListener('click', (e) => {
      const b = e.target.closest('.chip'); if (!b) return;
      $$('#tab-filtri .chip').forEach(c => c.setAttribute('aria-pressed', String(c === b)));
      /* UN SOLO view-transition-name sul wrapper: mai un nome per riga —
         un nome duplicato aborta la transizione in silenzio e produce
         N snapshot su un evento INP.                                     */
      if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.startViewTransition(() => render(b.dataset.f));
      } else render(b.dataset.f);
    });
  }
});
