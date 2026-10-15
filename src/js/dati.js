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
const LOGHI = [['c-8',467],['c-9',116],['c-10',187],['c-11',163],['c-12',984],['c-13',820],['c-14',141],['c-15',259],['c-16',102],['c-18',379],['c-20',447],['c-23',87],['c-24',120],['c-25',310],['c-27',155],['c-28',820],['c-31',283],['c-32',164],['c-33',202],['c-34',209],['c-35',287],['c-36',249],['c-37',351],['c-38',711],['c-39',85]];
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
  { v:150, lab:'Imprenditori seguiti',           su:'dal 2020',     uno:'un imprenditore',        acceso:'#FF8200',               fonte:'Agg. 09.2026 · gestionale interno', prov:true },
  { v:33,  lab:'Settori differenti',             su:'e continuano', uno:'un settore',             acceso:'rgba(255,255,255,.5)', fonte:'Agg. 09.2026 · gestionale interno', prov:true },
  { v:750, lab:'Processi di vendita realizzati', su:'in sei anni',  uno:'un processo di vendita', acceso:'rgba(255,255,255,.5)', fonte:'Agg. 09.2026 · gestionale interno', prov:true },
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
   NOTA DI RICONCILIAZIONE: le persone elencate sono DODICI, non 34. Il
   numero che si pubblica è questo, perché è quello verificabile.        */
const REP_NOMI = ['Pubblicità', 'Marketing', 'Reclutamento', 'Formazione', 'Direzione'];
const VOLTI = [
  /* z e o: quanto avvicinarsi e dove sta il volto, per le mezze figure */
  { nome: 'Alberto Frisoni',      ruolo: 'CEO',                  rep: 5, f: 'frisoni', z: 1.5, o: '52% 22%' },
  { nome: 'Alfio Bardolla',       ruolo: 'Cofondatore',          rep: 5, f: 'bardolla' },
  { nome: 'Ion Rotaru',           ruolo: 'Direttore operativo',  rep: 5, f: 'rotaru', z: 1.5, o: '55% 23%' },
  { nome: 'Matteo Ratti',         ruolo: 'Media buyer',          rep: 1, f: 'ratti', z: 1.45, o: '53% 25%' },
  /* 15.10: senza ritratto per ora — al posto della foto le iniziali, nello
     stesso riquadro. Con il file (src/assets/team-webp/berrini.webp e
     berrini-400.webp) basta scrivere f: 'berrini'. */
  { nome: 'Andrea Berrini',       ruolo: 'Direttore marketing',  rep: 2, f: null, iniziali: 'AB' },
  { nome: 'Dario Plasmati',       ruolo: 'Copywriter',           rep: 2, f: 'plasmati', z: 1.5, o: '52% 18%' },
  { nome: 'Giovanni Giordano',    ruolo: 'CRM specialist',       rep: 2, f: 'giordano', z: 1.5, o: '50% 14%' },
  { nome: 'Giulia Elicio',        ruolo: 'HR manager',           rep: 3, f: 'elicio', z: 1.6, o: '57% 28%' },
  { nome: 'Giorgia Tocco',        ruolo: 'HR',                   rep: 3, f: 'tocco' },
  { nome: 'Cristian Amodio',      ruolo: 'Sales coach',          rep: 4, f: 'amodio', z: 1.5, o: '50% 24%' },
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
  { n:1, settore:'Impiantistica', geo:'Bergamo', mesi:11, da:1.4, a:3.1, foto:'hand-contract', logo:'c-13',
    dati:['Partenza 1,4 M€','4 venditori reclutati','Meta + telefono'],
    fatto:[
      'Rifatta la struttura di campagna: budget riallocato sui due canali che chiudevano davvero.',
      'Sequenza di qualificazione prima della chiamata: il venditore parla solo con chi è pronto.',
      '96 candidature filtrate, 4 venditori inseriti in 11 mesi.',
      'Script, role play settimanale, numeri sul tavolo del titolare ogni lunedì.',
    ], prov:true },
];

const SETTORI = ['Impiantistica','Serramenti','Edilizia','Automazione','Nautica','Consulenza HR','Consulenza fiscale','Arredamento','Logistica','Meccanica','Elettronica','Energie rinnovabili','Informatica','Sicurezza','Formazione','Immobiliare','Assicurazioni','Odontoiatria','Estetica','Ristorazione','Ottica','Agroalimentare','Packaging','Tessile','Stampa','Trasporti','Manutenzioni','Antincendio','Piscine','Serre','Pavimentazioni','Coperture','Domotica'];

/* ═══ RENDERING ═══════════════════════════════════════════════════════════ */
/* a: attributi facoltativi, es. { 'data-p': 'elicio' } */
const el = (t, c, h, a) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; if (a) for (const k in a) n.setAttribute(k, a[k]); return n; };
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];


/* La scheda è un GRAFICO A UNITÀ: un quadrato del marchio = 100.000 € di
   fatturato annuo. Due torri, prima e dopo, che crescono dal basso come la
   scalinata. Rappresenta i due soli dati dichiarati: nessun valore
   intermedio inventato fra la partenza e l'arrivo.
   La fotografia di sfondo è uscita: le quattro mani ora sono i quattro
   reparti di "Cosa facciamo", dove significano qualcosa.             */
/* La torre è disegnata, non costruita: due elementi (le righe piene e la
   riga parziale) con un motivo a quadrati in CSS, invece di un <i> per
   quadrato — erano settecento nodi in pagina solo per i grafici.      */
const torre = (v, cls) => {
  const n = Math.round(v * 10);
  return `<span class="torre ${cls}" style="--r:${Math.floor(n / 10)};--p:${n % 10}"><i class="torre__resto"></i><i class="torre__pieno"></i></span>`;
};
const logoCliente = (id, cls) => {
  const L = LOGHI.find(x => x[0] === id);
  const [w, h] = L ? misuraLogo(L[1]) : [120, 30];
  return `<img class="${cls}" src="/assets/clients-white/${id}.webp" alt="" width="${w}" height="${h}" loading="lazy" decoding="async">`;
};
/* 15.10: «qui togli provenienza e dato provvisorio» — la riga della fonte
   non c'è più (i numeri vanno comunque confermati: WORKLOG §6). --k è il
   posto nel ventaglio d'ingresso. */
/* 15.10 (Risultati): «togli provenienza e settore, lascia solo il logo» —
   la testa della scheda è il logo del cliente, e basta. */
const scheda = (p, k = 0) => el('article', 'scheda', `
  <div class="scheda__testa">
    ${logoCliente(p.logo, 'scheda__logo')}
  </div>
  <div class="scheda__grafico" aria-hidden="true">
    <span class="scheda__col">${torre(p.da, 'torre--prima')}<span class="scheda__v">${fmt1.format(p.da)}</span></span>
    <span class="scheda__col">${torre(p.a, 'torre--dopo')}<span class="scheda__v">${fmt1.format(p.a)}</span></span>
  </div>
  <p class="scheda__num">da ${fmt1.format(p.da)} a ${fmt1.format(p.a)} <span class="t-unita">M€</span></p>
  <p class="scheda__mesi">Fatturato in ${p.mesi} mesi</p>
  <span class="scheda__extra"><span>${p.extra}</span></span>`, { style: '--k:' + (k % 6) });

/* ── I NUMERI A UNITÀ ─────────────────────────────────────────────────────
   Un quadrato del marchio = un'unità, sulla STESSA griglia per i tre numeri
   (50 colonne, 40 sotto i 700px — erano 25, e il campo dei 750 era alto
   mezzo telefono, audit 15.10): 150 sono tre righe, 33 mezza riga, 750
   quindici righe. L'altezza del campo è la quantità, e nessuna barra è
   disegnata a occhio. Il campo è un SVG con un <pattern> (due rettangoli,
   non 933 nodi): uno strato spento e uno acceso, e l'acceso si scopre
   riga per riga allo scroll (racconto.css).                             */
const colonne = () => matchMedia('(max-width: 700px)').matches ? 40 : 50;
const strato = (n, col, id, colore, cls) => {
  const righe = Math.floor(n / col), resto = n % col, h = righe + (resto ? 1 : 0);
  return `<svg class="ucampo__strato ${cls}" viewBox="0 0 ${col} ${h}" preserveAspectRatio="xMinYMin meet" aria-hidden="true" focusable="false">
    <defs><pattern id="${id}" width="1" height="1" patternUnits="userSpaceOnUse"><rect x=".14" y=".14" width=".72" height=".72" rx=".16" fill="${colore}"/></pattern></defs>
    ${righe ? `<rect width="${col}" height="${righe}" fill="url(#${id})"/>` : ''}${resto ? `<rect y="${righe}" width="${resto}" height="1" fill="url(#${id})"/>` : ''}
  </svg>`;
};
const campo = (x, i) => {
  const col = colonne(), h = Math.ceil(x.v / col);
  return `<div class="ucampo" style="--righe:${h};aspect-ratio:${col} / ${h}">
    ${strato(x.v, col, 'u' + i + 's', 'rgba(255,255,255,.07)', '')}
    ${strato(x.v, col, 'u' + i + 'a', x.acceso, 'ucampo__acceso')}
  </div>`;
};
/* IL NUMERO A RULLO (giro 3 effetti): ogni cifra è una colonna di
   0–9 ripetuti tre volte che scorre fino alla sua cifra, come un
   contatore meccanico; la cifra più a destra fa più giri. Il numero vero
   è nel testo per i lettori di schermo, le colonne sono aria-hidden.
   Movimento ridotto, o senza IntersectionObserver: le cifre sono già
   ferme sul numero.                                                    */
/* Il DM Sans servito non ha cifre tabellari: ogni cifra ha la sua
   larghezza (in em, peso 700, spaziatura -.045em, misurate). La colonna
   prende quella della cifra d'arrivo, così il numero fermo ha la stessa
   spaziatura del numero scritto; le cifre più larghe che passano durante
   il giro sono ritagliate ai lati, centrate. */
const LARGO = [.648, .271, .492, .52, .575, .514, .545, .483, .542, .545];
/* la prima riga è vuota (uno spazio fisso): fermo, il tamburo non mostra
   zeri tagliati; la cifra d'arrivo è quindi a --f = 1 + giri·10 + cifra */
const NASTRO = '\u00A0\n' + '0123456789'.repeat(2).split('').join('\n');
const rullo = (s) => {
  let j = 0;
  return `<span class="sr">${s}</span><span class="rullo" aria-hidden="true">${[...s].map(c => {
    if (!/\d/.test(c)) return `<span class="rullo__x">${c}</span>`;
    const giri = Math.min(1, j), col = j++;
    return `<span class="rullo__c" style="--f:${1 + giri * 10 + +c};--c:${col};--wd:${LARGO[+c]}em"><span class="rullo__s">${NASTRO}</span></span>`;
  }).join('')}</span>`;
};
const voce = (x, i) => {
  const n = el('article', 'u-voce');
  n.style.setProperty('--i', i);
  n.innerHTML = `
    <div class="u-voce__dato">
      <p class="u-voce__num num">${rullo(fmt.format(x.v))}</p>
      <p class="u-voce__lab">${x.lab}, <span class="u-voce__su">${x.su}</span></p>
    </div>
    <div class="u-voce__campo">
      ${campo(x, i)}
      <p class="u-voce__leg"><span class="q q--8" style="background:${x.acceso}" aria-hidden="true"></span> = ${x.uno}</p>
    </div>`;
  return n;
};
/* la griglia cambia colonne a 700px: i campi si ridisegnano, il resto no */
const ridisegnaCampi = () => $$('#numeri-grid .u-voce').forEach((n, i) => {
  const c = $('.ucampo', n); if (c) c.outerHTML = campo(NUMERI[i], i);
});

/* ── COSA FACCIAMO ────────────────────────────────────────────────────────
   I quattro reparti (le prime quattro voci del bento), ognuno con una
   scena di lavoro vera: le campagne sui monitor, le bozze annotate, il
   colloquio, la lavagna della formazione. Giro 4: il megafono, la penna,
   il contratto arrotolato e il tocco erano «troppo simbolici» per il
   cliente. Fotografie generate (assets-src/higgsfield/provenienza.json),
   volti mai riconoscibili. Gli altri otto servizi restano un indice
   tipografico: due livelli di gerarchia invece di dodici card uguali.  */
/* [file, inquadratura]: il punto della scena che resta in vista quando il
   pannello la taglia (le mani al lavoro). Su telefono un taglio a parte,
   già stretto sulle mani (tools/foto.mjs, «stretto»).                    */
const FOTO_REP = {
  target:  ['reparto-pubblicita',   '72% 30%'],
  imbuto:  ['reparto-marketing',    '72% 45%'],
  persone: ['reparto-reclutamento', '94% 35%'],
  salita:  ['reparto-formazione',   '50% 20%'],
};
const pannello = (b, i) => {
  const [f, pos] = FOTO_REP[b.i];
  const n = el('article', 'pannello');
  n.style.setProperty('--i', i);
  n.innerHTML = `
    <div class="pannello__foto"><picture>
      <source media="(max-width: 640px)" srcset="/assets/foto/${f}-stretto-480.webp 480w, /assets/foto/${f}-stretto-800.webp 800w" sizes="40vw">
      <img src="/assets/foto/${f}-800.webp" srcset="/assets/foto/${f}-480.webp 480w, /assets/foto/${f}-800.webp 800w, /assets/foto/${f}-1200.webp 1200w" sizes="(max-width: 1100px) 48vw, 25vw" alt="" width="1200" height="1500" loading="lazy" decoding="async" style="--pos:${pos}">
    </picture></div>
    <div class="pannello__txt">
      <span class="pannello__n" aria-hidden="true">0${i + 1}</span>
      <h3 class="pannello__tit">${b.t}</h3>
      <p class="pannello__desc">${b.d}</p>
    </div>`;
  return n;
};
/* ── LE OTTO INFOGRAFICHE DEI SERVIZI (15.10) ─────────────────────────────
   «Qui vorrei delle icone animate, o almeno delle piccole infografiche».
   Non un'icona da catalogo per servizio: una scena di due secondi che
   racconta cosa fa, su una tela 96×48 con il tratto delle icone (1,6,
   terminali arrotondati). Il soggetto è arancione — la particella del
   marchio, cioè il contatto, la trattativa, il titolare —, il resto è
   grigio. Il disegno qui è lo stato FINALE: le animazioni
   (infografica.css) partono dallo stato iniziale quando la scena entra
   nello schermo e si ripetono al passaggio del mouse; a movimento ridotto
   resta lo stato finale. --d è il ritardo dentro la scena, --du la durata.
   Le forme da tracciare sono <path> con pathLength="1" (sui <rect> e sui
   <circle> pathLength non è supportato ovunque).                        */
const SI = (k, p) => `<svg class="si si--${k}" viewBox="0 0 96 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${p}</svg>`;
const PL = ' pathLength="1"';
const st = (d, du) => ` style="--d:${d}ms${du ? `;--du:${du}ms` : ''}"`;
const rr = (x, y, w, h, r) => `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 -${r} ${r}h-${w - 2 * r}a${r} ${r} 0 0 1 -${r} -${r}v-${h - 2 * r}a${r} ${r} 0 0 1 ${r} -${r}z`;
const cerchio = (cx, cy, r) => `M${cx} ${cy - r}a${r} ${r} 0 1 1 0 ${2 * r}a${r} ${r} 0 1 1 0 -${2 * r}`;
const SCUDO = 'M74 6l14 5v11c0 9.5-6 16-14 20-8-4-14-10.5-14-20V11z';
const INFO = {
  /* il processo si costruisce — tre passaggi e i loro collegamenti —, poi
     un contatto lo attraversa e l'ultimo passaggio si chiude: la firma */
  processo: SI('processo',
    `<path class="t"${PL} d="${rr(3, 17, 20, 14, 3.5)}"${st(0, 380)}/>` +
    `<path class="t fi"${PL} d="M8.5 24h9"${st(260, 240)}/>` +
    `<path class="t"${PL} d="M23 24h15"${st(280, 260)}/>` +
    `<path class="t"${PL} d="${rr(38, 17, 20, 14, 3.5)}"${st(460, 380)}/>` +
    `<path class="t fi"${PL} d="M43.5 24h9"${st(720, 240)}/>` +
    `<path class="t"${PL} d="M58 24h15"${st(740, 260)}/>` +
    `<path class="t"${PL} d="${rr(73, 17, 20, 14, 3.5)}"${st(920, 380)}/>` +
    `<path class="a ap" d="${rr(73, 17, 20, 14, 3.5)}"${st(1960, 260)}/>` +
    `<path class="a t"${PL} d="M78.5 24.5l3 3 6-6.5"${st(2000, 320)}/>` +
    `<rect class="p viaggio" x="80" y="21" width="6" height="6" rx="1.2"/>`),
  /* le colonne della pipeline si riempiono, una trattativa passa
     all'ultima e si accende: un solo posto, un solo numero */
  pipeline: SI('pipeline',
    [4, 29, 54, 79].map((x, c) => `<path class="t fi"${PL} d="M${x} 5h16"${st(c * 60, 300)}/>`).join('') +
    [[4, 4], [29, 3], [54, 2]].map(([x, n], c) => Array.from({ length: n }, (_, r) =>
      `<rect class="g ca" x="${x}" y="${11 + r * 9}" width="16" height="7" rx="2"${st(220 + c * 110 + r * 55, 380)}/>`).join('')).join('') +
    `<rect class="p trattativa" x="79" y="11" width="16" height="7" rx="2"/>` +
    `<rect class="a on" x="79" y="11" width="16" height="7" rx="2" style="--d:1700ms;--du:720ms;--sc:1.6"/>`),
  /* l'obiezione, poi la risposta che si scrive; l'obiezione si fa da parte */
  voce: SI('voce',
    `<g class="dim"${st(1650, 500)}><g class="po vb" style="transform-origin:10px 27px;--d:0ms;--du:440ms">` +
      `<path d="M8 4h28a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H16l-6 5v-5H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"/>` +
      `<path class="t"${PL} d="M19.6 10.4a2.6 2.6 0 1 1 3.6 2.4c-.75.35-1.2.95-1.2 1.75v.45"${st(260, 340)}/>` +
      `<path class="ap punto" d="M22 18.3h.01"${st(560, 160)}/>` +
    `</g></g>` +
    `<g class="po vb" style="transform-origin:84px 45px;--d:720ms;--du:440ms">` +
      `<path class="a" d="M48 20h40a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-4v5l-6-5H48a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4z"/>` +
      `<path class="t ch"${PL} d="M51 27h30"${st(1020, 380)}/>` +
      `<path class="t ch"${PL} d="M51 33h19"${st(1260, 300)}/>` +
    `</g>`),
  /* il cartellino si posa, lo scudo lo difende prima della richiesta di sconto */
  prezzo: SI('prezzo',
    `<g class="dondola vb" style="transform-origin:15.2px 15.2px">` +
      `<path class="t"${PL} d="M24.8 6H7.2A1.2 1.2 0 0 0 6 7.2v17.6a4 4 0 0 0 1.2 2.8l14 14a4 4 0 0 0 5.6 0l13.2-13.2a4 4 0 0 0 0-5.6l-14-14A4 4 0 0 0 24.8 6z"${st(0, 640)}/>` +
      `<path class="ap" d="${cerchio(15.2, 15.2, 3)}"${st(300, 240)}/>` +
    `</g>` +
    `<path class="riemp ap" d="${SCUDO}"${st(1180, 420)}/>` +
    `<path class="a t"${PL} d="${SCUDO}"${st(640, 620)}/>` +
    `<path class="a t"${PL} d="M67.5 23.5l4.5 4.5 8.5-8.5"${st(1180, 320)}/>`),
  /* l'ago cerca la direzione e si ferma sul numero finale */
  bussola: SI('bussola',
    `<path class="t"${PL} d="${cerchio(24, 24, 19)}"${st(0, 560)}/>` +
    `<path class="ap fi" d="M24 8.5v3M39.5 24h-3M24 39.5v-3M8.5 24h3"${st(280, 300)}/>` +
    `<g class="ago vb" style="transform-origin:24px 24px"><path class="coda" d="M24 21 12 24l12 3z"/><path class="p" d="M24 21l12 3-12 3z"/></g>` +
    `<circle class="perno" cx="24" cy="24" r="1.8"/>` +
    `<path class="t ch"${PL} d="M50 38l10-7 8 3 13-14"${st(1080, 520)}/>` +
    `<rect class="p po" x="84" y="11" width="8" height="8" rx="1.6"${st(1520, 380)}/>` +
    `<rect class="a on" x="84" y="11" width="8" height="8" rx="1.6" style="--d:1700ms;--du:720ms;--sc:2.6"/>`),
  /* quattro settimane che si sommano, la linea del mese: chiude o no */
  referto: SI('referto',
    `<path class="t"${PL} d="M4 44h62"${st(0, 320)}/>` +
    `<path class="tr fi" d="M4 14h62" stroke-dasharray="2 3.2"${st(160, 560)}/>` +
    [[8, 35, 9], [22, 27, 17], [36, 19, 25]].map(([x, y, h], k) =>
      `<rect class="g cy" x="${x}" y="${y}" width="9" height="${h}" rx="1.5"${st(300 + k * 120, 520)}/>`).join('') +
    `<rect class="p cy" x="50" y="9" width="9" height="35" rx="1.5"${st(660, 640)}/>` +
    `<path class="t"${PL} d="${cerchio(82, 26, 11)}"${st(1120, 440)}/>` +
    `<path class="a t"${PL} d="M77 26.5l3.5 3.5 6.5-7"${st(1420, 300)}/>`),
  /* i contatti che hai già, spenti; alcuni si risvegliano, uno dopo l'altro */
  ciclo: SI('ciclo', (() => {
    let s = '';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++)
      s += `<rect class="g ap" x="${4 + c * 10}" y="${6 + r * 10}" width="6" height="6" rx="1.2"${st(c * 34 + r * 22, 260)}/>`;
    for (const [c, r, d] of [[1, 1, 620], [4, 0, 860], [3, 3, 1100], [6, 2, 1340], [8, 1, 1580]])
      s += `<rect class="p po" x="${4 + c * 10}" y="${6 + r * 10}" width="6" height="6" rx="1.2"${st(d, 380)}/>` +
           `<rect class="a on" x="${4 + c * 10}" y="${6 + r * 10}" width="6" height="6" rx="1.2" style="--d:${d + 60}ms;--du:760ms;--sc:2.8"/>`;
    return s;
  })()),
  /* la guida sale due gradini con il titolare, poi lui va su da solo */
  libro: SI('libro',
    `<path class="t"${PL} d="M4 44h20V34h20V24h20V14h24"${st(0, 720)}/>` +
    `<rect class="guida" x="46" y="16" width="8" height="8" rx="1.6"/>` +
    `<rect class="p tito" x="76" y="6" width="8" height="8" rx="1.6"/>` +
    `<rect class="a on" x="76" y="6" width="8" height="8" rx="1.6" style="--d:2360ms;--du:760ms;--sc:2.6"/>`),
};
const servizio = (b, i) => {
  const n = el('li', 'servizio');
  n.style.setProperty('--i', i % 4);
  n.innerHTML = `${INFO[b.i] || ''}<h3 class="servizio__tit">${b.t}</h3><p class="servizio__desc">${b.d}</p>`;
  return n;
};

/* ── LA STAFFETTA ─────────────────────────────────────────────────────────
   Quattro reparti, e fra l'uno e l'altro il passaggio di consegna come
   FOTOGRAFIA: lo stesso cubo arancione che nel contro-esempio cade, qui
   passa di mano. Il reparto tiene icona e numero fantasma (decisione
   cliente: niente quadratini); il passaggio dice cosa passa, in quanto
   tempo, con quale strumento. Nessun nome di persona (decisione cliente). */
const REP_ICO = { 1: 'target', 2: 'imbuto', 3: 'persone', 4: 'salita' };
const FOTO_PASSAGGIO = [
  ['passaggio-1', "Una mano passa il cubo arancione all'altra"],
  ['passaggio-2', 'Il cubo arancione viene posato nel palmo aperto della mano che lo riceve'],
  ['passaggio-3', 'Una mano stringe il cubo arancione appena ricevuto'],
];
/* IL PERCORSO (15.10, «vorrei fosse un percorso, con container, chiaro
   alla lettura»): ogni tappa è una card appesa alla linea del percorso,
   con il suo nodo — cerchio il reparto, quadrato il passaggio (il cubo che
   passa di mano), quadrato grande l'arrivo. Il numero fantasma è uno span
   nascosto ai lettori di schermo; il tempo e lo strumento del passaggio
   sono due etichette, ognuna con il suo segno. */
const NODO = (tipo) => `<span class="tappa__nodo${tipo ? ' tappa__nodo--' + tipo : ''}" aria-hidden="true"></span>`;
const ICO_TEMPO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
const ICO_SCHEDA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4.5" width="16" height="15" rx="2.2"/><path d="M8 9.5h8M8 13h5"/></svg>';
/* I numeri di ciò che il reparto consegna contano quando il contatto
   arriva (15.10, «più dinamica»): ogni cifra diventa uno span con il suo
   valore d'arrivo; i giorni no (sono una durata, non un risultato). */
const contatori = (t) => t.replace(/\b(\d{1,3}(?:\.\d{3})+|\d+)\b(?!%?\s*giorni)/g,
  (m) => `<span class="conta" data-a="${m.replace(/\./g, '')}">${m}</span>`);
const stazione = (r) => {
  const n = el('article', 'stazione tappa');
  n.dataset.n = '0' + r.i;
  n.innerHTML = `${NODO('')}
    <div class="stazione__testa"><span class="stazione__n" aria-hidden="true">0${r.i}</span><span class="icoq">${ICO[REP_ICO[r.i]]}</span></div>
    <h3 class="stazione__nome">${r.nome}</h3>
    <p class="stazione__claim">${r.claim}</p>
    <p class="stazione__out">${contatori(r.out)}</p>`;
  return n;
};
const passaggio = (h, i) => {
  const [f, alt] = FOTO_PASSAGGIO[i];
  const n = el('figure', 'passaggio tappa');
  n.innerHTML = `${NODO('consegna')}
    <div class="passaggio__foto"><img src="/assets/foto/${f}-800.webp" srcset="/assets/foto/${f}-480.webp 480w, /assets/foto/${f}-800.webp 800w, /assets/foto/${f}-1200.webp 1200w" sizes="(max-width: 1023px) 92vw, 340px" alt="${alt}" width="1200" height="1500" loading="lazy" decoding="async"></div>
    <figcaption><span class="passaggio__n">Passaggio ${i + 1} di 3</span><b class="passaggio__cosa">${h.cosa}</b><span class="passaggio__det"><span class="passaggio__chip">${ICO_TEMPO}${h.sla}</span><span class="passaggio__chip">${ICO_SCHEDA}${h.tool}</span></span></figcaption>`;
  return n;
};

/* l'avvicinamento delle mezze figure (z, o in VOLTI) */
const zoomVolto = (v) => v.z ? ` style="--z:${v.z};--zo:${v.o}"` : '';
/* chi non ha ancora il ritratto ha le sue iniziali nello stesso riquadro */
const iniziali = (v, cls) => `<span class="${cls}" aria-hidden="true">${v.iniziali || v.nome.split(' ').map(p => p[0]).join('')}</span>`;
const volto = (v) => el('article', 'volto', `
  <div class="volto__ph">
    ${v.f ? `<img src="/assets/team-webp/${v.f}-400.webp" srcset="/assets/team-webp/${v.f}-400.webp 400w, /assets/team-webp/${v.f}.webp 640w" sizes="(max-width: 700px) 46vw, (max-width: 1024px) 31vw, 290px" alt="${v.nome}, ${v.ruolo}" width="640" height="640" loading="lazy" decoding="async"${zoomVolto(v)}>` : iniziali(v, 'volto__mono')}
    <span class="volto__tag${v.rep === 5 ? ' volto__tag--dir' : ''}">${REP_NOMI[v.rep - 1]}</span>
  </div>
  <div>
    <p class="t-t2">${v.nome}</p>
    <p class="t-piccolo" style="color:var(--c-t3)">${v.ruolo}</p>
  </div>`, { 'data-rep': v.rep, ...(v.f ? { 'data-p': v.f } : {}) });

/* La scheda persona dello slider di home. Il ritratto è l'oggetto; il
   nome sta sopra la sfumatura, non dentro una card separata.          */
const persona = (v) => {
  /* Un link, non un article: la scheda portava a niente ed era l'unico
     oggetto del carosello che sembrava cliccabile senza esserlo.     */
  const n = el('a', 'pers');
  n.href = '/team.html';
  n.innerHTML = `
    ${v.f ? `<img src="/assets/team-webp/${v.f}-400.webp" srcset="/assets/team-webp/${v.f}-400.webp 400w, /assets/team-webp/${v.f}.webp 640w" sizes="(max-width: 1100px) 72vw, 272px" alt="${v.nome}, ${v.ruolo}" width="640" height="640" loading="lazy" decoding="async"${zoomVolto(v)}>` : iniziali(v, 'pers__mono')}
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
  a.innerHTML = `
    <p class="t-eyebrow" style="color:var(--c-ar-hot)">Tutte e dodici</p>
    <p class="t-t1" style="max-inline-size:14ch">Conosci il reparto che entra in azienda.</p>
    <p class="t-piccolo" style="color:var(--c-t2)">Ruoli, reparti e i due fondatori.</p>
    <span class="frecc" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
    </span>`;
  return a;
};

/* 15.10 (Risultati): «modifica le immagini, magari lascia solo il logo» —
   il fascicolo apre con il logo del cliente, grande, sulla sua luce; il
   settore, la città e la fonte non ci sono più. */
const fascicolo = (f) => el('article', 'fascicolo rise', `
  <div class="fascicolo__marchio">${logoCliente(f.logo, 'fascicolo__logo')}</div>
  <div class="fascicolo__panel">
    <p class="t-micro">Fascicolo 0${f.n} · ${f.mesi} mesi</p>
    <p class="t-numero" style="font-size:clamp(34px,3.8vw,52px)">da ${fmt1.format(f.da)} a ${fmt1.format(f.a)} <span class="t-unita">M€</span></p>
    <div class="arco" aria-hidden="true" style="--mesi:${f.mesi}">
      <span class="scheda__col">${torre(f.da, 'torre--prima')}<span class="scheda__v">${fmt1.format(f.da)}</span></span>
      <span class="arco__mesi"><span class="arco__fila"></span><span class="arco__fila arco__fila--accesa"></span><span class="scheda__v">${f.mesi} mesi</span></span>
      <span class="scheda__col">${torre(f.a, 'torre--dopo')}<span class="scheda__v">${fmt1.format(f.a)}</span></span>
    </div>
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

/* LE TESTIMONIANZE (15.10, «migliora la sezione delle recensioni»): non più
   una griglia di cinque riquadri uguali ma un LETTORE e la sua SCALETTA. Il
   video scelto è grande; accanto, le cinque testimonianze in fila, con il
   volto e il nome: si sceglie, e il video parte lì. Sempre a FACCIATA:
   cinque iframe al caricamento costerebbero oltre un megabyte e secondi di
   INP, si carica il player solo al clic.                                */
const srcVideo = (tipo, id) => tipo === 'vimeo'
  ? 'https://player.vimeo.com/video/' + id + '?autoplay=1&title=0&byline=0&portrait=0'
  : 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
/* niente aria-label: il nome accessibile è il testo visibile, preceduto da
   un «Guarda la testimonianza di» per i lettori di schermo (audit 15.10) */
const voceVideo = (v, i) => `<li><button class="video__voce${i === 0 ? ' is-on' : ''}" type="button" data-i="${i}" aria-pressed="${i === 0}"><span class="sr">Guarda la testimonianza di </span>
    <span class="video__mini"><img src="/assets/video/${v.id}-400.webp" alt="" width="400" height="225" loading="lazy" decoding="async"></span>
    <span class="video__chi"><span class="t-t2">${v.nome}</span><span class="t-micro">Cliente Sales Process</span></span>
  </button></li>`;
const video = (v, i) => {
  const f = el('figure', 'vidbox');
  f.innerHTML = `
    <button class="vid" type="button" data-id="${v.id}" data-tipo="${v.tipo}"
            aria-label="Guarda la testimonianza di ${v.nome}">
      <img class="vid__ph" src="/assets/video/${v.id}-400.webp" srcset="/assets/video/${v.id}-400.webp 400w, /assets/video/${v.id}.webp 720w" sizes="${i === 0 ? '(max-width: 900px) 92vw, 62vw' : '(max-width: 560px) 92vw, (max-width: 900px) 46vw, 31vw'}" alt="" width="720" height="405" loading="lazy" decoding="async">
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
  { t: 'Il possibile',  d: 'Non esiste qualcosa che non si possa realmente realizzare. Se guidati dalla giusta visione, dalla giusta missione e dai giusti principi, lavoriamo per ottenerlo.' },
  { t: 'Il cliente',    d: 'Rendere il cliente soddisfatto della sua azienda. Il suo obiettivo di azienda è il nostro obiettivo.' },
  { t: 'Il fuoco',      d: "Mantenere alta l'attenzione sul processo di vendita, eliminando ogni distrazione che ci porta ad operare al di fuori di questo." },
  { t: "L'eccellenza",  d: 'Non ci limitiamo ad erogare ciò che è sufficientemente buono. Eroghiamo solo ed esclusivamente ciò che è eccellente.' },
  { t: 'Il lungo termine', d: 'Sacrifichiamo ogni risultato nel breve termine se questo influisce sui grandi successi nel lungo termine. La nostra meta è il lungo termine: per il cliente e per noi.' },
  { t: 'Do more with less', d: 'Siamo alla costante ricerca di fare di più con meno tempo e meno risorse. Automazione, fluidità, velocità.' },
  { t: 'I dati',        d: 'Ogni azione deve essere guidata dai dati. Solo scelte motivate dai dati, non dalle emozioni personali di un dato momento.' },
  { t: 'Gli obiettivi', d: 'Guidati dal lavoro duro e dal portare a termine ogni obiettivo che ci prefiggiamo. Non siamo guidati dal tempo e dalle ore, ma dagli obiettivi.' },
  { t: 'La trasparenza', d: 'Con noi stessi, con i membri del team e con i nostri clienti. La trasparenza viene prima.' },
];

/* LA DOPPIA ELICA (15.10, DNA): coppie di quadrati del marchio legate da un
   filo, ognuna un passo più avanti nella rotazione della precedente; il
   giro lo aggiunge lo scroll (--giro, pagine.css). Serve due volte: il
   filo sotto l'apertura e la spina fra le due colonne dei principi. */
const elica = (n) => Array.from({ length: n }, (_, k) => `<i class="elica__p" style="--k:${k}"><b></b><b></b></i>`).join('');
/* Un principio è una voce d'elenco numerata, non una card: il numero qui
   È informazione (sono "i dieci principi"), quindi resta, in arancio, a
   sinistra; il titolo e il testo a destra.                            */
const comandamento = (c, i) => {
  const n = el('article', 'com');
  n.style.setProperty('--i', i % 2);
  n.innerHTML = `
    <span class="com__n" aria-hidden="true" data-n="${String(i + 1).padStart(2, '0')}">${String(i + 1).padStart(2, '0')}</span>
    <h3 class="com__tit">${c.t}</h3>
    <p class="com__testo">${c.d}</p>`;
  return n;
};

/* ── MONTAGGIO ───────────────────────────────────────────────────────────── */
/* Montaggio IMMEDIATO: dati.js è caricato con defer, quindi quando gira il
   DOM è già completo. Prima era uno script bloccante che montava su
   DOMContentLoaded: bloccava il primo paint e, peggio, montava DOPO che
   motion.js aveva già misurato i caroselli (vuoti).                    */
const monta = () => {

  /* Nastro: contenuto + cloni aria-hidden per il loop senza salti. */
  const pista = $('#nastro-pista');
  if (pista) {
    PROVE.forEach((p, k) => pista.append(scheda(p, k)));
    PROVE.forEach((p, k) => { const c = scheda(p, k); c.setAttribute('aria-hidden', 'true'); pista.append(c); });
  }

  /* Marquee loghi: contenuto duplicato, il keyframe trasla del 50%. Ogni
     logo nasce con le sue dimensioni: la pista ha la lunghezza finale
     prima che arrivi un solo byte d'immagine.                         */
  const lp = $('#loghi-clienti .loghi__pista');
  if (lp) {
    const uno = LOGHI.map(([f]) => logoCliente(f, 'logo')).join('');
    lp.innerHTML = uno + uno.replaceAll('<img ', '<img aria-hidden="true" ');
  }

  const ng = $('#numeri-grid');
  if (ng) {
    ng.append(...NUMERI.map(voce));
    const rulli = $$('.rullo', ng);
    if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rulli.forEach(r => r.classList.add('is-fermo'));
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        const r = e.target, colonne = $$('.rullo__c', r).length;
        r.classList.remove('is-fermo'); r.classList.add('is-gira'); io.unobserve(r);
        setTimeout(() => r.classList.remove('is-gira'), 1650 + colonne * 90);
      }), { rootMargin: '0px 0px -10% 0px', threshold: .6 });
      rulli.forEach(r => io.observe(r));
    }
    matchMedia('(max-width: 700px)').addEventListener('change', ridisegnaCampi);
  }

  const bento = $('#bento');
  if (bento) {
    bento.classList.add('bento--reparti');
    const quattro = el('div', 'reparti4');
    quattro.append(...BENTO.slice(0, 4).map(pannello));
    /* Su telefono gli otto servizi sono una galleria orizzontale (giro 3):
       la galleria è raggiungibile da tastiera e ha un nome. */
    const otto = el('ul', 'servizi', null, { 'aria-label': 'Gli altri servizi' });
    const galleria = matchMedia('(max-width: 640px)');
    const tab = () => galleria.matches ? otto.setAttribute('tabindex', '0') : otto.removeAttribute('tabindex');
    tab(); galleria.addEventListener('change', tab);
    otto.append(...BENTO.slice(4).map(servizio));
    bento.append(quattro, otto);
    /* Le infografiche partono quando sono a schermo (nella galleria del
       telefono, quando la card entra di lato) e si ripetono al passaggio
       del mouse, solo a scena finita. */
    const voci = $$('.servizio', otto);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      voci.forEach(n => n.classList.add('is-in'));
    } else {
      const ioS = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.closest('.servizio').classList.add('is-in'); ioS.unobserve(e.target);
      }), { threshold: .6 });
      voci.forEach(n => { const s = $('.si', n); if (s) ioS.observe(s); else n.classList.add('is-in'); });
      voci.forEach(n => n.addEventListener('pointerenter', (e) => {
        const s = $('.si', n);
        if (e.pointerType !== 'mouse' || !s || !n.classList.contains('is-in')) return;
        /* solo le animazioni della scena: la transizione del colore all'hover non conta */
        if (s.getAnimations({ subtree: true }).some(a => a.animationName && a.playState === 'running')) return;
        n.style.setProperty('--si-t0', '0ms');
        n.classList.remove('is-in'); void n.offsetWidth; n.classList.add('is-in');
      }));
    }
  }
  const sp = $('#staffetta-pista');
  if (sp) {
    const fine = $('.staffetta__fine', sp);
    REPARTI.forEach((r, k) => {
      sp.insertBefore(stazione(r), fine);
      if (HANDOFF[k]) sp.insertBefore(passaggio(HANDOFF[k], k), fine);
    });
    /* l'arrivo è nella pagina: riceve qui il suo nodo, l'ultimo del percorso */
    fine?.insertAdjacentHTML('afterbegin', NODO('arrivo'));
  }
  const vgrid = $('#volti-grid');
  if (vgrid) {
    vgrid.append(...VOLTI.map((v, i) => { const n = volto(v); n.style.setProperty('--c', i % 4); return n; }));
    /* IL REPARTO SI SCEGLIE (15.10, «il team deve essere più wow»): Tutti e i
       cinque gruppi; chi non c'entra si gira via in 3D, chi resta scivola al
       suo posto, chi entra si gira verso di te. Le etichette sono i nomi dei
       reparti già sulle card. */
    const ordine = [5, 1, 2, 3, 4];
    const filtri = el('div', 'tab__filtri volti__filtri',
      ['<button class="chip" type="button" aria-pressed="true" data-r="0">Tutti</button>']
        .concat(ordine.map(r => `<button class="chip" type="button" aria-pressed="false" data-r="${r}">${REP_NOMI[r - 1]}</button>`)).join(''),
      { role: 'group', 'aria-label': 'Filtra per reparto' });
    vgrid.before(filtri);
    const tessere = $$('.volto', vgrid);
    const fermo = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let attivo = 0, occupato = false;
    filtri.addEventListener('click', (e) => {
      const b = e.target.closest('.chip'); if (!b || occupato) return;
      const r = +b.dataset.r; if (r === attivo) return; attivo = r;
      $$('.chip', filtri).forEach(c => c.setAttribute('aria-pressed', String(c === b)));
      const dentro = t => r === 0 || +t.dataset.rep === r;
      const prima = new Map(tessere.filter(t => !t.hidden).map(t => [t, t.getBoundingClientRect()]));
      const escono = tessere.filter(t => !t.hidden && !dentro(t));
      const entrano = tessere.filter(t => t.hidden && dentro(t));
      /* l'altezza della griglia resta ferma mentre le facce si spostano, poi
         scorre alla nuova: la frase sotto e la sezione dopo non saltano sopra
         le facce in viaggio */
      const hPrima = vgrid.getBoundingClientRect().height;
      if (!fermo) vgrid.style.height = hPrima + 'px';
      const posa = () => {
        escono.forEach(t => { t.hidden = true; });
        entrano.forEach(t => { t.hidden = false; });
        if (fermo) return;
        vgrid.style.height = 'auto';
        const hDopo = vgrid.getBoundingClientRect().height;
        vgrid.style.height = hPrima + 'px';
        vgrid.animate([{ height: hPrima + 'px' }, { height: hDopo + 'px' }], { duration: 560, easing: 'cubic-bezier(.16,.84,.24,1)' })
          .finished.then(() => { vgrid.style.height = ''; }, () => { vgrid.style.height = ''; });
        tessere.filter(t => !t.hidden && prima.has(t)).forEach(t => {
          const a = prima.get(t), d = t.getBoundingClientRect(), dx = a.left - d.left, dy = a.top - d.top;
          if (dx || dy) t.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 560, easing: 'cubic-bezier(.16,.84,.24,1)' });
        });
        entrano.forEach((t, k) => t.animate(
          [{ transform: 'perspective(900px) rotateY(-90deg)', opacity: 0 }, { transform: 'perspective(900px) rotateY(0deg)', opacity: 1 }],
          { duration: 560, delay: 40 + k * 45, easing: 'cubic-bezier(.16,.84,.24,1)', fill: 'backwards' }));
      };
      if (fermo) { posa(); return; }
      if (!escono.length) { posa(); return; }
      occupato = true;
      Promise.all(escono.map((t, k) => t.animate(
        [{ transform: 'perspective(900px) rotateY(0deg)', opacity: 1 }, { transform: 'perspective(900px) rotateY(90deg)', opacity: 0 }],
        { duration: 280, delay: k * 35, easing: 'cubic-bezier(.55,0,.8,.16)', fill: 'forwards' }).finished))
        .then(() => { posa(); escono.forEach(t => t.getAnimations().forEach(a => { if (!a.animationName) a.cancel(); })); occupato = false; });
    });
  }

  /* Slider di home: le persone + i cloni per il loop + la porta finale.
     I cloni sono aria-hidden: lo screen reader legge dodici persone una
     volta sola, non ventisei.                                          */
  const vg = $('#video-grid');
  if (vg) {
    vg.classList.add('video--lettore');
    const palco = el('div', 'video__palco');
    palco.append(video(VIDEO[0], 0));
    const lista = el('ol', 'video__lista', VIDEO.map(voceVideo).join(''), { 'aria-label': 'Le testimonianze' });
    vg.append(palco, lista);
  }
  $('#comand')?.append(...COMAND.map(comandamento));
  /* i dieci principi sono le coppie di basi: le due colonne sono i due
     filamenti, la spina fra loro è l'elica (pagine.css) */
  $('#comand')?.insertAdjacentHTML('afterbegin', `<div class="comand__elica" aria-hidden="true">${elica(30)}</div>`);
  const ed = $('#elica-dna'); if (ed) ed.innerHTML = elica(40);

  /* Il player entra solo al clic: prima c'è una locandina da 30KB. Dalla
     scaletta si sceglie e si guarda con un clic solo. */
  const apriVideo = (b) => {
    if (!b || b.dataset.aperto) return;
    b.dataset.aperto = '1';
    const f = document.createElement('iframe');
    f.src = srcVideo(b.dataset.tipo, b.dataset.id); f.title = b.getAttribute('aria-label') || 'Testimonianza';
    f.allow = 'autoplay; fullscreen; picture-in-picture';
    f.allowFullscreen = true;
    b.append(f);
  };
  $('#video-grid')?.addEventListener('click', (e) => {
    const voce = e.target.closest('.video__voce');
    if (voce) {
      const i = +voce.dataset.i, palco = $('.video__palco', vg);
      palco.replaceChildren(video(VIDEO[i], 0));
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
        palco.animate([{ opacity: 0, transform: 'scale(.985)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.16,.84,.24,1)' });
      $$('.video__voce', vg).forEach((n, k) => { n.classList.toggle('is-on', k === i); n.setAttribute('aria-pressed', String(k === i)); });
      apriVideo($('.vid', palco));
      return;
    }
    apriVideo(e.target.closest('.vid'));
  });

  const sq = $('#squadra-pista');
  if (sq) {
    VOLTI.forEach(v => sq.append(persona(v)));
    sq.append(porta());
    VOLTI.forEach(v => { const c = persona(v); c.setAttribute('aria-hidden', 'true'); c.tabIndex = -1; sq.append(c) });
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
  if (sg) sg.innerHTML = SETTORI.map(s => `<li>${s}</li>`).join('');
  /* nel form il settore si scrive o si sceglie fra i trentatré (audit 15.10) */
  if ($('#f-settore')) document.body.append(el('datalist', null, SETTORI.map(s => `<option value="${s}"></option>`).join(''), { id: 'settori-lista' }));

  /* Tabella + filtri */
  const body = $('#tabella-body'), conta = $('#tab-conta');
  if (body) {
    const L = ['Reparto','Cosa riceve','Cosa consegna','SLA','Strumento','Chi risponde'];
    const render = (f) => {
      const rows = f === 'tutti' ? RIGHE : RIGHE.filter(r => r.f === f);
      /* data-primo: la prima riga di ogni reparto (su telefono porta il nome del reparto, le altre no) */
      body.innerHTML = rows.map((r, i) => `<tr${i === 0 || rows[i - 1].rep !== r.rep ? ' data-primo' : ''}>
        <td data-l="${L[0]}">${r.rep}</td><td data-l="${L[1]}">${r.in}</td>
        <td data-l="${L[2]}">${r.out}</td><td data-l="${L[3]}" class="sla">${r.sla}</td>
        <td data-l="${L[4]}">${r.tool}</td><td data-l="${L[5]}">${r.chi}</td></tr>`).join('');
      if (conta) conta.textContent = `${rows.length} righe su ${RIGHE.length}`;
    };
    render('tutti');
    $('#tab-filtri')?.addEventListener('click', (e) => {
      const b = e.target.closest('.chip'); if (!b) return;
      $$('#tab-filtri .chip').forEach(c => c.setAttribute('aria-pressed', String(c === b)));
      /* Le righe del reparto si rimettono in fila, in ordine. Prima qui c'era
         document.startViewTransition: senza un view-transition-name sulla
         tabella riusava la transizione di PAGINA, e ogni clic su un filtro
         rifaceva la scalinata su tutto lo schermo, con le righe vecchie e
         nuove sovrapposte per 700ms (ciclo 1). WAAPI: ogni browser, 320ms. */
      render(b.dataset.f);
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
        $$('#tabella-body tr').forEach((tr, i) => tr.animate(
          [{ opacity: 0, translate: '0 8px' }, { opacity: 1, translate: '0 0' }],
          { duration: 320, delay: i * 35, easing: 'cubic-bezier(.16,.84,.24,1)', fill: 'backwards' }));
    });
  }
};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', monta); else monta();
