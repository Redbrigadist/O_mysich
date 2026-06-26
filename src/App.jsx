import React, { useState, useEffect } from "react";

// ── Téma ──────────────────────────────────────────────────────────────────────
const C = {
  parchment:"#f5f0e8", parchmentDark:"#e8e0cc",
  ink:"#1a1410",       inkLight:"#3d3228",
  inkFaded:"#6b5a48",  inkGhost:"#a89880",
  stain:"#d4c9a8",     red:"#7a2020",
  green:"#1a4a2a",     gold:"#8a6a10",
};
const inkFont  = "'Georgia','Times New Roman',serif";
const sansInk  = "'Courier New','Lucida Console',monospace";

// ── Persistence ───────────────────────────────────────────────────────────────
const SAVE_KEY = "omysichaozime_v2";
const saveGame   = st => { try { window.storage.set(SAVE_KEY, JSON.stringify(st)); } catch(e) {} };
const deleteSave = async () => { try { await window.storage.delete(SAVE_KEY); } catch(e) {} };

// ── Lore generátor ────────────────────────────────────────────────────────────
const PRIJMENI  = ["Zrnko","Podkůvka","Ostružina","Chvostík","Březinka","Šišák","Pýřek","Hlízka","Stébélko","Kořínek","Lupínek","Klásek","Trnůvka","Žaludík","Bobulka","Mecháček","Větvička","Ořešník","Semenec","Plísněnka","Hřibůvka","Slamník"];
const POVOLANI  = ["Sběrač žaludů","Strážce tunelů","Tesař nor","Ranhojič","Průzkumník z povrchu","Pletař z chemlonu","Nosič zásobnic","Rozeznávač jedlých hub","Mapovač kořenů","Stopař pachových stezek"];
const MOTIVACE  = ["strach z blížících se mrazů","ztráta rodinných zásob po povodni","touha dokázat svou odvahu","snaha zabezpečit svou rodinu","dluh vůči staré myši, která ji zachránila","sen o vlastní zásobárně hluboko v zemi","přísaha složená na hrob sourozence","prostá potřeba dokázat si, že na to má"];
const POVAHA    = ["nezdravě zvědavá","vždy opatrná a podezřívavá","lehkomyslně odvážná","věčně mrzutá, ale obětavá","posedlá čistotou svých fousů","tichá a pozorná, téměř neviditelná","překvapivě vtipná v nejtěžších chvílích","přehnaně pečlivá v detailech"];
const SLABOST   = ["panický strach ze stínů dravých ptáků","neschopnost odolat vůni starého sýra v pastech","špatný sluch na vysoké tóny","sklon kýchat v nejméně vhodnou chvíli","přehnaná důvěřivost vůči neznámým myším","hrůza z otevřeného prostranství bez úkrytu","neschopnost jít spát dokud není vše srovnané","tendence mluvit nahlas, když má být ticho"];
const PREDMET   = ["zrezivělý zavírací špendlík","helma z půlky žaludové skořápky","stará poštovní známka jako plášť","kousek křemene, který ve tmě světélkuje","lidský knoflík s kotvou jako medaile","provázek uzlíků sloužící jako zápisník","sušený list máty přivázaný k ocasu","zlomená jehla z lidského šití jako meč"];
const ZRUCNOST  = ["rychlý běh ve vysoké trávě","stopování hmyzu","hledání skrytých spíží","oprava děravých nor","předpovídání počasí podle revmatismu v ocase","tichý pohyb po kamenných površích","rozpoznávání jedovatých plodů čichem","slyšení vzdálených kroků dávno před ostatními"];
const SABLONY   = [
  v=>`${v.prijmeni} má pověst spolehlivého ${v.povolani}. Hlavním motorem je ${v.motivace}. Jde o osobnost, která je ${v.povaha}, což týmu pomáhá — překážkou však bývá ${v.slabost}. Na cestách se spoléhá na ${v.predmet} a vyniká v ${v.zrucnost}.`,
  v=>`Život, který žije ${v.prijmeni}, provází ${v.motivace}. Jako bývalý ${v.povolani} zná drsnou realitu podzimu. Vyčnívá tím, že je ${v.povaha} — maska skrývající fakt, že největší démon je ${v.slabost}. Jedinou připomínkou domova je ${v.predmet}. Hlavní předností je ${v.zrucnost}.`,
  v=>`Pokud kolonie hledá někoho pro riskantní úkoly, ${v.prijmeni} je jasná volba. Tento ${v.povolani} nezná strach — slabinou je snad jen ${v.slabost}. Proslulost pochází z ${v.zrucnost} a povahy, která je ${v.povaha}. Symbolem úspěchu je ${v.predmet}.`,
];
function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function generateLore(name) {
  const prijmeni = rnd(PRIJMENI);
  const vals = { prijmeni, povolani:rnd(POVOLANI), motivace:rnd(MOTIVACE), povaha:rnd(POVAHA), slabost:rnd(SLABOST), predmet:rnd(PREDMET), zrucnost:rnd(ZRUCNOST) };
  return { prijmeni, fullName:`${name} ${prijmeni}`, text:rnd(SABLONY)(vals) };
}
const STARTER_LORE = {
  Lopuch:   { prijmeni:"Zrnko",    fullName:"Lopuch Zrnko",    text:"Lopuch Zrnko je nejstarší ze čtyř a to všichni vědí — stačí se podívat na jizvu přes levé ucho. Jako statečný průzkumník prošel část zahrady, o které ostatní jen šeptají. Hnacím motorem je prostá věc: dokud on stojí na hlídce, ostatní spí." },
  Jetel:    { prijmeni:"Březinka", fullName:"Jetel Březinka",  text:"Jetel Březinka se o sebe nikdy příliš nestaral — zato o zahradu ano. Zelená tlapka není přezdívka, je to diagnóza: každé semínko, každý výhonek jsou součástí systému, který ostatní nechápou, ale jehož výsledky jedí." },
  Ostružina:{ prijmeni:"Šišák",   fullName:"Ostružina Šišák", text:"Ostružina Šišák se k práci tesaře nor dostala ne proto, že by to chtěla, ale proto, že jednoho dne sebrala padlou větev a začala. Robustní stavba těla je vnějším odrazem povahy: věčně mrzutá, ale obětavá." },
  Kopřiva:  { prijmeni:"Lupínek", fullName:"Kopřiva Lupínek", text:"Kopřiva Lupínek se usmívá způsobem, který ostatní uklidňuje — i v okamžicích, kdy uklidňovat není důvod. Veselá povaha je z části dar, z části volba: kolonie potřebuje někoho, kdo ráno vstane první." },
};

function migrateMice(mice) {
  return (mice||[]).map(m => {
    if (m.fullName && m.lore) return m;
    const ld = STARTER_LORE[m.name] ?? generateLore(m.name);
    return { ...m, fullName:ld.fullName??m.name, lore:ld.text??"", agingPerk:m.agingPerk??null, actionTurns:m.actionTurns??0, epithet:m.epithet??null, onExpedition:m.onExpedition??false};
  });
}
const loadGame = async () => {
  try {
    const r = await window.storage.get(SAVE_KEY);
    if (r?.value) { const d = JSON.parse(r.value); return { ...d, mice:migrateMice(d.mice) }; }
  } catch(e) {}
  return null;
};

// ── Import herních dat ───────────────────────────────────────────────────────
import {
  MOUSE_NAMES, TRAITS, ACTIONS, POLICIES,
  EXPEDITIONS, AGING_PERKS, EPITHETS, WEATHER_TYPES,
  STATIC_BUILDINGS, COMFORT_LEVELS, COMFORT_THRESHOLDS,
  CRAFT_ITEMS, STATIC_EVENTS, THREAT_EVENTS, STORY_EVENTS,
  STATIC_LOCATIONS, LOC_HEXES, TERRAIN_LORE, WINTER_PHASES,
  MOUSE_DREAMS, WEATHER_NARRATIVE, EXPEDITION_MEMORIES
} from './data.js';

function getWinterPhase(turn){return WINTER_PHASES.find(p=>p.turn===turn)||null;}
function getActiveWinter(turn){
  let active=null;
  for(const ph of WINTER_PHASES){if(turn>=ph.turn)active=ph;}
  return active;
}

function effectSummary(o){
  const p=[];if(o.food>0)p.push(`+${o.food} jídla`);if(o.food<0)p.push(`${o.food} jídla`);if(o.wood>0)p.push(`+${o.wood} dřeva`);if(o.wood<0)p.push(`${o.wood} dřeva`);if(o.mats>0)p.push(`+${o.mats} zásob`);if(o.mats<0)p.push(`${o.mats} zásob`);if(o.morale>0)p.push(`morálka +${o.morale}`);if(o.morale<0)p.push(`morálka ${o.morale}`);if(o.threat>0)p.push(`hrozba +${o.threat}`);if(o.threat<0)p.push(`hrozba ${o.threat}`);if(o.special==="injure")p.push("jedna myš zraněna");if(o.special==="add_mouse")p.push("myš se přidá");
  return p.length?p.join(", "):"Žádný herní efekt.";
}
function pickBlockedMouse(mice){const e=mice.filter(m=>!m.lost);if(!e.length)return null;return pick(e).id;}

function initState(){
  const mice=[mkMouse("Lopuch"),mkMouse("Jetel"),mkMouse("Ostružina"),mkMouse("Kopřiva")];
  mice[0].trait="brave";mice[1].trait="green";mice[2].trait="stocky";mice[3].trait="cheerful";
  return{turn:1,maxTurns:50,phase:"assign",mice,assignments:{},food:20,foodCap:40,wood:10,woodCap:30,mats:6,matsCap:25,morale:60,threat:0,buildings:STATIC_BUILDINGS.map(b=>({...b})),extraBuildings:[],policies:[],buildQueue:null,pendingEvent:null,pendingExplore:null,pendingResult:null,pendingThreatEvent:null,policyChoices:[],curfew:0,blockedTurns:0,builderBlocked:0,blockedMouse:null,usedThreatEvents:[],usedGoodEvents:[],usedBadEvents:[],exploredLocs:[],hexMap:initHexMap(),comfortPts:0,craftedItems:[],craftQueue:null,winterPhase:null,warmthTurns:0,rationTurns:0,pendingStory:null,storyPage:null,usedStories:[],weather:null,weatherTurnsLeft:0,activeExpeditions:[],expeditionChoices:[],lastDreamTurn:0,lastMemoryTurn:0,log:[{t:0,msg:"Hlošina se probouzí — první studený vítr zašumí dubem.",good:true,title:"Hlošina se probouzí",lore:"Nora voní starým dřevem a vlhkou zemí. Čtyři myši sedí v příšeří tukové svíčky. Venku je svět obrovský a je mu jedno."}]};
}
function initHexMap(){const rev=new Set();rev.add(`${VH.c},${VH.r}`);hneighbours(VH.c,VH.r).forEach(h=>rev.add(`${h.c},${h.r}`));return{revealed:[...rev],generation:0,dynamicLocs:{}};}

// Vygeneruje náhodné rozmístění lokací pro nové kolo průzkumu
function generateDynamicLocs(generation){
  // Všechny hexe mimo vesnici a její okolí
  const forbidden=new Set([`${VH.c},${VH.r}`]);
  hneighbours(VH.c,VH.r).forEach(h=>forbidden.add(`${h.c},${h.r}`));
  const allHexes=[];
  for(let c=0;c<HCOLS;c++)for(let r=0;r<HROWS;r++){
    const k=`${c},${r}`;if(!forbidden.has(k))allHexes.push(k);
  }
  // Zamíchej deterministicky dle generace (pseudo-náhodné ale opakovatelné)
  const seeded=[...allHexes].sort((a,b)=>{
    const ha=a.split(",").reduce((s,v,i)=>s+(parseInt(v)+1)*(i?13:7)*generation,0)%997;
    const hb=b.split(",").reduce((s,v,i)=>s+(parseInt(v)+1)*(i?13:7)*generation,0)%997;
    return ha-hb;
  });
  // Přiřaď lokace na nové hexe
  const result={};
  STATIC_LOCATIONS.forEach((loc,i)=>{
    if(i<seeded.length)result[seeded[i]]=loc.id;
  });
  return result;
}

function resetHexMap(hexMap){
  const rev=new Set();
  rev.add(`${VH.c},${VH.r}`);
  hneighbours(VH.c,VH.r).forEach(h=>rev.add(`${h.c},${h.r}`));
  const gen=(hexMap.generation||0)+1;
  return{revealed:[...rev],generation:gen,dynamicLocs:generateDynamicLocs(gen)};
}

function checkNextPhase(ns){
  // Zkontroluj nastupující zimní fázi
  const newPhase=getWinterPhase(ns.turn);
  if(newPhase&&ns.winterPhase!==newPhase.id){
    return{...ns,winterPhase:newPhase.id,pendingWinter:newPhase,phase:"winter_phase"};
  }
  // Příběhová meziahra každý 10. tah
  const storyEv=getStoryEvent(ns.turn);
  if(storyEv&&!(ns.usedStories||[]).includes(storyEv.id)){
    return{...ns,pendingStory:storyEv,storyPage:storyEv.pages[0],usedStories:[...(ns.usedStories||[]),storyEv.id],phase:"story"};
  }
  if(ns.threat>=10){const av=THREAT_EVENTS.filter(e=>!(ns.usedThreatEvents||[]).includes(e.id));if(av.length>0){const ev=pick(av);return{...ns,pendingThreatEvent:ev,usedThreatEvents:[...(ns.usedThreatEvents||[]),ev.id],phase:"threat_event"};}ns={...ns,threat:9};}
  // Událost každé 3. kolo (garantovaná), jinak pravděpodobnostní
  const season=getSeason(ns.turn);
  const guaranteedEvent=ns.turn%3===0;
  const roll=Math.random();
  const triggerEvent=guaranteedEvent||(roll<(0.12+season.ebc*0.5));
  if(triggerEvent){
    const isGood=guaranteedEvent?(Math.random()<0.55):(roll<0.12);
    const allPool=STATIC_EVENTS.filter(e=>e.type===(isGood?"good":"bad"));
    const usedKey=isGood?"usedGoodEvents":"usedBadEvents";
    const used=ns[usedKey]||[];
    let avail=allPool.filter(e=>!used.includes(e.title));
    if(avail.length===0){avail=allPool;ns={...ns,[usedKey]:[]};}
    const ev=pick(avail);
    ns={...ns,pendingEvent:ev,[usedKey]:[...(ns[usedKey]||[]),ev.title]};
    ns.phase="event";
  }
  else if(ns.turn%10===1&&ns.turn>1){ns.policyChoices=POLICIES.filter(p=>!ns.policies.includes(p.id)).sort(()=>Math.random()-0.5).slice(0,3);ns.phase="policy";}
  else if(ns.turn>ns.maxTurns)ns.phase="gameover";
  else ns.phase="assign";
  return ns;
}
function applyPolicyImmediate(s,pol){
  if(pol.id==="harvest_fest")return Effects.compose(Effects.morale(15),Effects.food(-5))(s);
  if(pol.id==="strict_ration")return Effects.morale(-10)(s);
  if(pol.id==="communal")return Effects.morale(5)(s);
  return s;
}
function processTurn(s){
  let ns={...s,assignments:{}};
  const a=s.assignments,p=s.policies,season=getSeason(ns.turn),allB=getAllBuildings(ns);
  const counts={};ACTIONS.forEach(x=>{counts[x.id]=0;});
  const outdoorBlocked=ns.blockedTurns>ns.turn,curfewActive=ns.curfew>ns.turn,buildBlocked=ns.builderBlocked>ns.turn;
  s.mice.forEach(m=>{if(!a[m.id]||m.lost)return;const act=a[m.id];if(outdoorBlocked&&["forage","haul","gather","explore","watch"].includes(act))return;if(curfewActive&&act==="explore")return;if(buildBlocked&&act==="build")return;counts[act]=(counts[act]||0)+1;});
  // Zimní modifikátory
  const activeWinter=getActiveWinter(ns.turn);
  const forageMulti=activeWinter?activeWinter.forageMulti:1;
  const winterBuildBlocked=activeWinter&&activeWinter.buildPenalty>=99;
  const winterBuildPenalty=activeWinter&&activeWinter.buildPenalty===1;
  // Počasí
  const weather=ns.weather;
  const wFoodMod=weather?weather.foodMod:0;
  const wMatsMod=weather?weather.matsMod:0;
  const wWoodMod=weather?weather.woodMod:0;
  // Aktualizovat počasí
  if(ns.weatherTurnsLeft<=0){const nw=pickWeather();ns.weather=nw;ns.weatherTurnsLeft=newWeatherDuration(nw);}
  else ns.weatherTurnsLeft=ns.weatherTurnsLeft-1;
  // Aging: počítat aktivní tahy per myš
  ns.mice=ns.mice.map(m=>{
    if(m.lost||!a[m.id])return m;
    const newTurns=(m.actionTurns||0)+1;
    // Získat aging perk po 15 aktivních tazích (jen jednou)
    if(newTurns>=15&&!m.agingPerk){
      const perk=getRandomAgingPerk(m.trait);
      const perkLabel=AGING_PERKS.find(p=>p.id===perk.id)?.label||perk.label;
      const ep=getEpithet(perk.id);
      const newFullName=ep&&!m.epithet?`${m.name} ${ep}`:(m.fullName??m.name);
      ns.log=[...ns.log,{t:ns.turn,msg:`${newFullName} získala rys: ${perkLabel}.`,good:perk.type==="good",title:`${newFullName}: ${perkLabel}`,lore:perk.lore+(ep&&!m.epithet?` Vesnice ji začala říkat ${newFullName}.`:"")}];
      return{...m,actionTurns:newTurns,agingPerk:perk.id,epithet:m.epithet||(ep||null),fullName:newFullName,history:[...(m.history||[]),`Získala rys: ${perkLabel}${ep&&!m.epithet?`, přídomek: ${ep}`:""}`]};
    }
    return{...m,actionTurns:newTurns};
  });
  const fc=s.mice.filter(m=>a[m.id]==="forage"&&!m.lost&&!outdoorBlocked).length;
  let fb=2.5+(allB.find(b=>b.id==="seedlib"&&b.built)?1:0)+(p.includes("forager_guild")?1:0);
  if(fc>=4)fb=Math.max(1,fb-0.5*(fc-3));
  fb=fb*forageMulti;
  s.mice.forEach(m=>{if(a[m.id]==="forage"&&!m.lost&&!outdoorBlocked)ns.food=clamp(ns.food+(fb+agingBonus(m.agingPerk,"forage"))*forageMulti+traitBonus(m.trait,"forage")*forageMulti+wFoodMod,0,ns.foodCap);});
  s.mice.forEach(m=>{if(a[m.id]==="haul"&&!m.lost&&!outdoorBlocked)ns.wood=clamp(ns.wood+2+traitBonus(m.trait,"haul")+wWoodMod,0,ns.woodCap);});
  s.mice.forEach(m=>{if(a[m.id]==="gather"&&!m.lost&&!outdoorBlocked)ns.mats=clamp(ns.mats+2+(p.includes("deep_roots")?1:0)+wMatsMod,0,ns.matsCap);});
  if(ns.buildQueue&&counts["build"]>0&&!p.includes("deep_roots")&&!buildBlocked&&!winterBuildBlocked){const allBNow=getAllBuildings(ns),bldg=allBNow.find(b=>b.id===ns.buildQueue);if(bldg&&!bldg.built&&ns.wood>=bldg.cost.wood&&ns.mats>=bldg.cost.mats){ns.wood-=bldg.cost.wood;ns.mats-=bldg.cost.mats;const mark=b=>b.id===ns.buildQueue?{...b,built:true}:b;ns.buildings=ns.buildings.map(mark);ns.extraBuildings=(ns.extraBuildings||[]).map(mark);if(bldg.effect_type==="food_cap")ns.foodCap+=bldg.effect_value;if(bldg.effect_type==="wood_cap")ns.woodCap+=bldg.effect_value;const builtCount=getAllBuildings(ns).filter(b=>b.built).length;
      // Přídomek za první stavbu
      if(builtCount===1){
        const builders=s.mice.filter(m=>a[m.id]==="build"&&!m.lost&&!m.epithet);
        if(builders.length){const hero=builders[0];const ep=getEpithet("first_builder");if(ep){const nf=`${hero.name} ${ep}`;ns.mice=ns.mice.map(m=>m.id===hero.id?{...m,epithet:ep,fullName:nf,history:[...(m.history||[]),`Přídomek za stavbu: ${ep}`]}:m);}}
      }
      ns.log=[...ns.log,{t:ns.turn,msg:`${bldg.name} je dokončena!`,good:true,title:`${bldg.name} dokončena`,lore:bldg.lore||bldg.flavor}];ns.buildQueue=null;}}
  const explorers=s.mice.filter(m=>a[m.id]==="explore"&&!m.lost&&!outdoorBlocked&&!curfewActive);
  if(explorers.length>0){const braveCount=explorers.filter(m=>m.trait==="brave"||m.trait==="swift").length;ns.threat=Math.max(0,ns.threat-braveCount*(p.includes("scouts")?2:1));
  // Pokud je mapa celá odkrytá — resetuj ji (nová "část zahrady")
  const totalHexes=HCOLS*HROWS;
  const revealedCount=(ns.hexMap.revealed||[]).length;
  if(revealedCount>=totalHexes){
    ns.hexMap=resetHexMap(ns.hexMap);
    ns.exploredLocs=[];
    const gen=ns.hexMap.generation;
    ns.log=[...ns.log,{t:ns.turn,msg:`Průzkumníci objevili novou část zahrady. (Oblast ${gen})`,good:true,title:"Nová oblast zahrady",lore:"Zahrada je větší než mapa. Vždy je co objevit — stačí jít trochu dál, trochu jiným směrem. Průzkumníci přišli domů s prázdnýma rukama a plnýma očima."}];
  }
  const target=nearestUnrevealedHex(ns.hexMap);
  const exploreTarget=target||(()=>{const rev=(ns.hexMap.revealed||[]).filter(k=>k!==`${VH.c},${VH.r}`);if(!rev.length)return null;const rk=rev[Math.floor(Math.random()*rev.length)];const [rc,rr]=rk.split(",").map(Number);return{c:rc,r:rr};})();
  if(exploreTarget){if(target){const revSet=new Set(ns.hexMap.revealed||[]);revSet.add(`${target.c},${target.r}`);hneighbours(target.c,target.r).forEach(h=>revSet.add(`${h.c},${h.r}`));ns.hexMap={...ns.hexMap,revealed:[...revSet]};}
    // Lokace: v generaci 0 použij statické LOC_HEXES, v dalších dynamicLocs
    const locByHex={};
    const dynLocs=ns.hexMap.dynamicLocs||{};
    const gen=ns.hexMap.generation||0;
    if(gen===0){
      STATIC_LOCATIONS.forEach(loc=>{const pos=LOC_HEXES[loc.id];if(pos)locByHex[`${pos.c},${pos.r}`]=loc;});
    } else {
      Object.entries(dynLocs).forEach(([hexKey,locId])=>{const loc=STATIC_LOCATIONS.find(l=>l.id===locId);if(loc)locByHex[hexKey]=loc;});
    }
    const locAtHex=locByHex[`${exploreTarget.c},${exploreTarget.r}`];if(locAtHex&&target){ns.pendingExplore={loc:locAtHex,hex:exploreTarget};}else{const tv=(exploreTarget.c*7+exploreTarget.r*13)%17;const terr=tv<3?"water":tv<6?"dense":tv<9?"meadow":"forest";const terrainLore=getTerrainLore(terr);const terrLabel={water:"Voda",dense:"Houštiny",meadow:"Louka",forest:"Les"};
const TERRAIN_OUTCOMES={
  forest:[
    {food:2,wood:1,mats:0,morale:0,threat:0,type:"good",title:"Les — bohatý podrost",lore:"Pod starými duby přirozené tunely kořenů. Průzkumníci se vrátili s plnými brašnami a nadrženýma nohama."},
    {food:1,wood:2,mats:0,morale:0,threat:0,type:"good",title:"Les — padlé kmeny",lore:"Starý buk padl v zimní bouři — a nechal za sebou zásobu suchého dřeva přesně v dosahu."},
    {food:0,wood:0,mats:0,morale:3,threat:-1,type:"good",title:"Les — hluboké ticho",lore:"Tak daleko od zdi, že nic neloví. Průzkumníci si na chvíli sedli a oddechli."},
    {food:-1,wood:0,mats:0,morale:-3,threat:1,type:"bad",title:"Les — cizí pachové značky",lore:"Někdo jiný označil tento les jako svůj. Průzkumníci se stáhli opatrně."},
  ],
  meadow:[
    {food:3,wood:0,mats:0,morale:0,threat:0,type:"good",title:"Louka — pozdní sklizeň",lore:"Suchá stébla stále plná semen. Průzkumníci sklízeli, dokud jim neselhávaly nohy."},
    {food:2,wood:0,mats:1,morale:0,threat:0,type:"good",title:"Louka — otevřený terén",lore:"Bez úkrytu, ale plná možností. Průzkumníci se pohybovali rychle a vrátili se s plnými torbami."},
    {food:0,wood:0,mats:0,morale:0,threat:2,type:"bad",title:"Louka — příliš otevřeno",lore:"Na otevřeném prostranství se cítí každá myš jako terč. Průzkumníci spěchali."},
    {food:1,wood:0,mats:0,morale:5,threat:0,type:"good",title:"Louka — slunce na srsti",lore:"Poprvé za dlouho teplé světlo bez stínu. Průzkumníci se vraceli zpěvem."},
  ],
  water:[
    {food:2,wood:0,mats:0,morale:0,threat:0,type:"good",title:"Voda — rybí zásoby",lore:"Mělčina plná drobných rybiček. Průzkumníci si namočili tlapy a vrátili se s výlovem."},
    {food:0,wood:0,mats:3,morale:0,threat:0,type:"good",title:"Voda — říční náplavy",lore:"Na břehu lidské předměty odplavené deštěm. Průzkumníci brali, co se dalo."},
    {food:0,wood:0,mats:0,morale:-4,threat:0,type:"bad",title:"Voda — rozvodněno",lore:"Příliš hluboko, příliš rychle. Průzkumníci se vrátili mokří a mrzutí."},
    {food:1,wood:0,mats:1,morale:2,threat:0,type:"good",title:"Voda — tiché jezírko",lore:"Klidná hladina, čiré dno. Průzkumníci si napili a nasbírali oblázky jako závaží."},
  ],
  dense:[
    {food:0,wood:3,mats:0,morale:0,threat:0,type:"good",title:"Houštiny — větve a proutí",lore:"Houštiny plné popadaných větví přesně správné tloušťky. Průzkumníci nosili, dokud jim vydržely záda."},
    {food:1,wood:0,mats:2,morale:0,threat:0,type:"good",title:"Houštiny — skrytá skrýš",lore:"Uprostřed houštiny dutý kmen — a v něm zásoby, které tu někdo zapomněl."},
    {food:0,wood:0,mats:0,morale:-2,threat:2,type:"bad",title:"Houštiny — cosi v keřích",lore:"Praskání bez viditelné příčiny. Průzkumníci se nevraceli pomalu."},
    {food:0,wood:1,mats:1,morale:0,threat:-1,type:"good",title:"Houštiny — přirozený kryt",lore:"Neprostupné pro větší tvory. Průzkumníci si uvědomili, že tady jsou v bezpečí."},
  ],
};
const winterNow=getActiveWinter(ns.turn);
const pool=winterNow&&winterNow.explores?.length
  ?winterNow.explores
  :(TERRAIN_OUTCOMES[terr]||TERRAIN_OUTCOMES.forest);
const terrainEffect=pool[Math.floor(Math.random()*pool.length)];
ns=Effects.fromData(terrainEffect)(ns);
const terrainOutcome={...terrainEffect,title:`${terrLabel[terr]||"Les"} — ${terrainEffect.title.split(" — ")[1]||terrainEffect.title}`,lore:terrainEffect.lore||terrainLore};
ns.pendingResult={locName:terrLabel[terr]||"Neznámý terén",outcome:terrainOutcome,retreated:false,isTerrain:true};ns.phase="result";
ns.log=[...ns.log,{t:ns.turn,msg:`Průzkum — ${terrainOutcome.title}`,good:terrainEffect.type==="good",title:terrainOutcome.title,lore:terrainOutcome.lore}];}}}
  // Přídomek za průzkumnictví — první myš co dosáhne 8 průzkumů
  if((ns.exploredLocs||[]).length>=8){
    const explorers=s.mice.filter(m=>a[m.id]==="explore"&&!m.lost&&!m.epithet);
    if(explorers.length){
      const hero=explorers[0];
      const ep=getEpithet("many_explores");
      if(ep){const newFull=`${hero.name} ${ep}`;ns.mice=ns.mice.map(m=>m.id===hero.id?{...m,epithet:ep,fullName:newFull,history:[...(m.history||[]),`Přídomek za průzkum: ${ep}`]}:m);ns.log=[...ns.log,{t:ns.turn,msg:`${newFull} — průzkumnice zahrady.`,good:true,title:newFull,lore:"Tolik hexů, tolik příběhů. Vesnice ji začala nazývat jinak."}];}
    }
  }
  ns.mice=ns.mice.map(m=>{if(a[m.id]==="rest"&&m.injured)return{...m,injured:false};if(m.lost){const rem=m.lostTurns-(counts["rest"]>0?2:1);if(rem<=0)return{...m,lost:false,lostTurns:0,lostReason:"",history:[...(m.history||[]),`Vrátila se z: ${m.lostReason}`]};return{...m,lostTurns:Math.max(0,rem)};}return m;});
  // Výpravy — odpočítávat a vyhodnocovat návrat
  const returningExpeditions=(ns.activeExpeditions||[]).filter(e=>e.turnsLeft<=1);
  const stillActive=(ns.activeExpeditions||[]).filter(e=>e.turnsLeft>1).map(e=>({...e,turnsLeft:e.turnsLeft-1}));
  ns.activeExpeditions=stillActive;
  returningExpeditions.forEach(exp=>{
    const expDef=EXPEDITIONS.find(e=>e.id===exp.expId);if(!expDef)return;
    // Aplikuj odměnu
    ns.food=clamp(ns.food+(expDef.reward.food||0),0,ns.foodCap);
    ns.wood=clamp(ns.wood+(expDef.reward.wood||0),0,ns.woodCap);
    ns.mats=clamp(ns.mats+(expDef.reward.mats||0),0,ns.matsCap);
    ns.morale=clamp(ns.morale+(expDef.reward.morale||0),0,100);
    ns.threat=clamp(ns.threat+(expDef.reward.threat||0),0,10);
    if(expDef.reward.comfort)ns.comfortPts=(ns.comfortPts||0)+expDef.reward.comfort;
    // Uvolni myši, případně zraň jednu
    ns.mice=ns.mice.map(m=>exp.mouseIds.includes(m.id)?{...m,onExpedition:false}:m);
    if(Math.random()<expDef.risk){
      const expMice=ns.mice.filter(m=>exp.mouseIds.includes(m.id)&&!m.injured);
      if(expMice.length){const hurt=expMice[Math.floor(Math.random()*expMice.length)];ns.mice=ns.mice.map(m=>m.id===hurt.id?{...m,injured:true,history:[...(m.history||[]),"Zraněna při výpravě"]}:m);}
    }
    ns.log=[...ns.log,{t:ns.turn,good:true,title:`Výprava: ${expDef.name}`,msg:`Výprava "${expDef.name}" se vrátila.`,lore:expDef.result_lore}];
    // Uložit vzpomínky pro pozdější zobrazení
    if(EXPEDITION_MEMORIES[exp.expId]){
      const returnedMouse = ns.mice.find(m=>exp.mouseIds.includes(m.id));
      if(returnedMouse){
        const memPool = EXPEDITION_MEMORIES[exp.expId];
        ns.mice = ns.mice.map(m=>m.id===returnedMouse.id?{...m,
          expeditionMemories:[...(m.expeditionMemories||[]),{expId:exp.expId,text:memPool[Math.floor(Math.random()*memPool.length)]}]
        }:m);
      }
    }
  });
  // Nabídnout nové výpravy každých 5 tahů pokud je postavena základna a žádné nejsou nabídnuty
  // Výpravové vzpomínky — každých 5 tahů
  if(ns.turn%(5)===0&&ns.turn-(ns.lastMemoryTurn||0)>=5){
    const miceWithMem = ns.mice.filter(m=>(m.expeditionMemories||[]).length>0&&!m.lost&&!m.onExpedition);
    if(miceWithMem.length){
      const teller = miceWithMem[Math.floor(Math.random()*miceWithMem.length)];
      const mem = teller.expeditionMemories[Math.floor(Math.random()*teller.expeditionMemories.length)];
      ns.lastMemoryTurn = ns.turn;
      ns.log=[...ns.log,{t:ns.turn,good:true,fluff:true,
        title:`${teller.fullName??teller.name} říká:`,
        msg:`${teller.name} sdílí vzpomínku.`,
        lore:mem.text}];
    }
  }
  if(hasBldg(ns,"expedition_base")&&ns.turn%5===0&&!(ns.expeditionChoices?.length)){
    const used=(ns.activeExpeditions||[]).map(e=>e.expId);
    const avail=EXPEDITIONS.filter(e=>!used.includes(e.id));
    ns.expeditionChoices=avail.sort(()=>Math.random()-0.5).slice(0,3);
  }
  const returned=ns.mice.filter(m=>!m.lost&&s.mice.find(sm=>sm.id===m.id)?.lost);returned.forEach(m=>{
    const b=p.includes("harvest_moon")?8:5;ns.morale=clamp(ns.morale+b,0,100);
    // Přídomek za návrat ze ztráty (jen pokud ho ještě nemá)
    if(!m.epithet){
      const ep=getEpithet("returned_lost");
      if(ep){const newFull=`${m.name} ${ep}`;ns.mice=ns.mice.map(x=>x.id===m.id?{...x,epithet:ep,fullName:newFull,history:[...(x.history||[]),`Přídomek za návrat: ${ep}`]}:x);}
    }
    const displayName=ns.mice.find(x=>x.id===m.id)?.fullName??m.name;
    ns.log=[...ns.log,{t:ns.turn,msg:`${displayName} se vrátila domů. Morálka +${b}.`,good:true,title:`${displayName} se vrátila`,lore:"Přišla zpátky pozměněná malými způsoby, které se těžko pojmenovávají. Ale přišla zpátky."}];
  });
  if(counts["rest"]>0)ns.morale=clamp(ns.morale+counts["rest"]*4,0,100);
  const wb=allB.find(b=>b.id==="watchpost"&&b.built)?3:1.5;
  if(counts["watch"]>0&&!outdoorBlocked)ns.threat=Math.max(0,ns.threat-counts["watch"]*wb);
  // Crafting předmětů — má přednost před starým craftingem
  if(ns.craftQueue&&counts["craft"]>0){
    const item=CRAFT_ITEMS.find(i=>i.id===ns.craftQueue);
    const hasReq=!item?.req||hasBldg(ns,item.req);
    if(item&&hasReq&&ns.food>=item.cost.food&&ns.wood>=item.cost.wood&&ns.mats>=item.cost.mats){
      ns.food=clamp(ns.food-item.cost.food,0,ns.foodCap);
      ns.wood=clamp(ns.wood-item.cost.wood,0,ns.woodCap);
      ns.mats=clamp(ns.mats-item.cost.mats,0,ns.matsCap);
      const prevPts=ns.comfortPts||0;
      ns.comfortPts=(ns.comfortPts||0)+item.comfort;
      if(item.morale)ns.morale=clamp(ns.morale+item.morale,0,100);
      ns.craftedItems=[...(ns.craftedItems||[]),item.id];
      const prevLevel=getComfortLevel(prevPts);
      const newLevel=getComfortLevel(ns.comfortPts);
      const levelMsg=newLevel.level>prevLevel.level?` Nora postoupila na: ${newLevel.name}!`:"";
      ns.log=[...ns.log,{t:ns.turn,msg:`${item.icon} ${item.name} dokončena. +${item.comfort} pohodlí.${levelMsg}`,good:true,title:item.name,lore:item.flavor}];
      ns.craftQueue=null;
    }
  } else if(counts["craft"]>0&&hasBldg(ns,"workshop")){
    // Starý crafting (zásoby→jídlo+dřevo) — jen pokud není zařazen předmět
    const u=Math.min(ns.mats,counts["craft"]*2);ns.mats-=u;ns.wood=clamp(ns.wood+Math.floor(u/2),0,ns.woodCap);ns.food=clamp(ns.food+Math.floor(u/2),0,ns.foodCap);
  }
  const active=ns.mice.filter(m=>!m.lost).length;const eat=active-(p.includes("strict_ration")?2:0)-(p.includes("communal")?1:0);const dry=allB.find(b=>b.id==="dryroom"&&b.built)?1:0;ns.food=clamp(ns.food-eat+dry,0,ns.foodCap);
  s.mice.forEach(m=>{if(m.trait==="cheerful"&&!m.lost)ns.morale=clamp(ns.morale+0.5,0,100);});
  // Sny — každých 8 tahů náhodná myš dostane sen
  if(ns.turn - (ns.lastDreamTurn||0) >= 8){
    const dreamMice = ns.mice.filter(m=>!m.lost&&!m.onExpedition);
    if(dreamMice.length){
      const dreamer = dreamMice[Math.floor(Math.random()*dreamMice.length)];
      const perkKey = dreamer.agingPerk || dreamer.trait;
      const pool = MOUSE_DREAMS[perkKey] || MOUSE_DREAMS.brave;
      const dream = pool[Math.floor(Math.random()*pool.length)];
      ns.lastDreamTurn = ns.turn;
      ns.log=[...ns.log,{t:ns.turn,good:true,fluff:true,
        title:`Sen: ${dreamer.fullName??dreamer.name}`,
        msg:`${dreamer.name} měla sen.`,
        lore:dream}];
    }
  }
  // Aging perk pasivní efekty
  s.mice.forEach(m=>{
    if(m.lost)return;
    if(m.agingPerk==="calm_presence")ns.morale=clamp(ns.morale+1,0,100);
    if(m.agingPerk==="iron_stomach")ns.food=clamp(ns.food+0.5,0,ns.foodCap);
    if(m.agingPerk==="keeper_of_lore")ns.morale=clamp(ns.morale+ns.policies.length*0.5,0,100);
    if(m.agingPerk==="loud_joints"&&a[m.id]==="explore")ns.threat=clamp(ns.threat+0.5,0,10);
    // Forgetful: 1x za 5 tahů přiřazená akce selže
    if(m.agingPerk==="forgetful"&&ns.turn%5===0&&a[m.id]){
      ns.log=[...ns.log,{t:ns.turn,msg:`${m.name} zapomněla co měla dělat.`,good:false,title:"Zapomnětlivost",lore:"Stojí uprostřed nory s prázdnýma rukama a neví proč tam stojí."}];
    }
  });
  // Počasí pasivní
  if(weather){
    ns.morale=clamp(ns.morale+weather.moraleMod,0,100);
    ns.threat=clamp(ns.threat+weather.threatMod,0,10);
  }s.mice.forEach(m=>{if(m.trait==="greedy"&&!m.lost)ns.food=clamp(ns.food-0.5*(p.includes("communal")?2:1),0,ns.foodCap);});
  if(ns.food<=0){ns.morale=clamp(ns.morale-8,0,100);ns.log=[...ns.log,{t:ns.turn,msg:"Prázdné zásoby — všichni hladoví.",good:false,title:"Hladová noc",lore:"Večeře byla řídká polévka a ticho."}];}
  if(hasBldg(ns,"hearthstone"))ns.morale=Math.max(20,ns.morale);if(hasBldg(ns,"thornwall"))ns.threat=Math.max(0,ns.threat-1);
  // Pohodlí — pasivní bonusy
  const comfort=getComfortLevel(ns.comfortPts||0);
  if(comfort.foodBonus>0)ns.food=clamp(ns.food+comfort.foodBonus,0,ns.foodCap);
  if(comfort.woodBonus>0)ns.wood=clamp(ns.wood+comfort.woodBonus,0,ns.woodCap);
  if(comfort.moraleFloor>0)ns.morale=Math.max(comfort.moraleFloor,ns.morale);
  if(comfort.threatBonus<0)ns.threat=Math.max(0,ns.threat+comfort.threatBonus);
  // Pohodlí — léčení bonusu (level 2+): zraněná myš na odpočinku se léčí o tah dřív
  if(comfort.level>=2){ns.mice=ns.mice.map(m=>{if(m.injured&&a[m.id]==="rest")return{...m,injured:false};return m;});}
  // Zimní pasivní efekty
  if(activeWinter){
    if(activeWinter.foodDrain>0)ns.food=clamp(ns.food-activeWinter.foodDrain,0,ns.foodCap);
    if(activeWinter.id==="freeze"&&ns.warmthTurns<ns.turn)ns.morale=clamp(ns.morale-5,0,100);
    if(ns.rationTurns>ns.turn)ns.food=clamp(ns.food+2,0,ns.foodCap); // úsporná opatření bonus
  }
  if(ns.threat>=4){const foragers=ns.mice.filter(m=>a[m.id]==="forage"&&!m.lost).length;if(foragers>0)ns.food=clamp(ns.food-0.5*foragers,0,ns.foodCap);}
  if(ns.threat>=6){ns.morale=clamp(ns.morale-3,0,100);if(ns.buildQueue&&!buildBlocked)ns.builderBlocked=ns.turn+1;}
  if(ns.threat>=8){ns.food=clamp(ns.food-2,0,ns.foodCap);ns.blockedMouse=pickBlockedMouse(ns.mice);if(ns.blockedMouse){const bm=ns.mice.find(m=>m.id===ns.blockedMouse);ns.log=[...ns.log,{t:ns.turn,msg:`${bm?.name??"Myš"} je paralyzována strachem — příští tah nemůže pracovat.`,good:false,title:"Paralýza strachu",lore:"Přílišná hrozba drtí nejmíň připravenou myš."}];}}else ns.blockedMouse=null;
  ns.threat=clamp(ns.threat+season.tg+(p.includes("open_burrow")?1:0)-(p.includes("night_watch")?2:0)+(p.includes("harvest_moon")?0.5:0),0,10);
  const arrBonus=hasBldg(ns,"burrowinn")?0.2:0;
  if(ns.turn%5===0&&Math.random()<(p.includes("open_burrow")?0.7:0.5)+arrBonus&&ns.mice.length<8){const nm=mkMouse();const tObj=TRAITS.find(t=>t.id===nm.trait)||{label:"Neznámá"};ns.mice=[...ns.mice,nm];ns.morale=clamp(ns.morale+5,0,100);ns.log=[...ns.log,{t:ns.turn,msg:`${nm.fullName??nm.name} (${tObj.label}) se připojila k vesnici!`,good:true,title:`${nm.fullName??nm.name} přichází`,lore:"Přišla za soumraku s opotřebovanou torbou a opatrným úsměvem."}];}
  ns.turn=ns.turn+1;if(ns.pendingExplore){ns.phase="explore";return ns;}if(ns.pendingResult){return ns;}return checkNextPhase(ns);
}

// ── UI Primitives ─────────────────────────────────────────────────────────────

// ── Secesní ornamentální rámečky ─────────────────────────────────────────────

// SVG jako string — žádný JSX, funguje bez Babel
function cornerSVG(col, fx, fy){
  const tx = fx ? 36 : 0, ty = fy ? 36 : 0;
  const sx = fx ? -1 : 1,  sy = fy ? -1 : 1;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" style="display:block;flex-shrink:0">
    <g transform="translate(${tx},${ty}) scale(${sx},${sy})">
      <path d="M2 2 C2 2 12 2 18 8 C24 14 24 26 16 30 C8 34 2 28 2 20 C2 12 10 10 16 16 C20 20 18 28 12 28"
            stroke="${col}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M2 8 C0 13 4 22 11 19 C17 16 14 7 8 5 C5 4 2 8 2 8Z" fill="${col}" opacity="0.75"/>
      <path d="M8 2 C13 0 22 4 19 11 C16 17 7 14 5 8 C4 5 8 2 8 2Z" fill="${col}" opacity="0.75"/>
      <circle cx="8" cy="8" r="2.5" fill="${col}"/>
    </g>
  </svg>`;
}

function cardCornerSVG(col, fx, fy){
  const tx = fx ? 14 : 0, ty = fy ? 14 : 0;
  const sx = fx ? -1 : 1,  sy = fy ? -1 : 1;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" style="display:block">
    <g transform="translate(${tx},${ty}) scale(${sx},${sy})">
      <circle cx="4" cy="4" r="2.5" fill="${col}" opacity="0.8"/>
      <path d="M4 7 C2 9 2 12 6 11" stroke="${col}" stroke-width="1" fill="none" stroke-linecap="round"/>
      <path d="M7 4 C9 2 12 2 11 6" stroke="${col}" stroke-width="1" fill="none" stroke-linecap="round"/>
    </g>
  </svg>`;
}

// Absolutně pozicovaný rohový div s SVG
function ArtCornerDiv({fx, fy, col}){
  const pos = {
    position:"absolute", pointerEvents:"none",
    top: fy ? undefined : 0,
    bottom: fy ? 0 : undefined,
    left: fx ? undefined : 0,
    right: fx ? 0 : undefined,
  };
  return React.createElement("div", {
    style: pos,
    dangerouslySetInnerHTML: {__html: cornerSVG(col, fx, fy)}
  });
}

// Rohové tečky pro ArtCard
function ArtCardCornerDiv({fx, fy, col}){
  const pos = {
    position:"absolute", pointerEvents:"none",
    top: fy ? undefined : 0,
    bottom: fy ? 0 : undefined,
    left: fx ? undefined : 0,
    right: fx ? 0 : undefined,
  };
  return React.createElement("div", {
    style: pos,
    dangerouslySetInnerHTML: {__html: cardCornerSVG(col, fx, fy)}
  });
}

// Hlavní wrapper — Secesní rámeček
function ArtFrame({children, variant="gold", style={}}){
  const isDark  = variant==="dark";
  const isGreen = variant==="green";
  const bg    = isDark ? C.ink   : isGreen ? "#e8f0e0" : C.parchment;
  const col   = isDark ? C.red   : isGreen ? C.green   : C.gold;
  const outer = isDark ? C.red   : isGreen ? C.green   : C.inkLight;
  return(
    <div style={{position:"relative", background:bg, border:`2px solid ${outer}`, ...style}}>
      <div style={{position:"absolute",inset:5,border:`0.8px solid ${col}`,opacity:0.5,pointerEvents:"none"}}/>
      <ArtCornerDiv fx={false} fy={false} col={col}/>
      <ArtCornerDiv fx={true}  fy={false} col={col}/>
      <ArtCornerDiv fx={false} fy={true}  col={col}/>
      <ArtCornerDiv fx={true}  fy={true}  col={col}/>
      <div style={{padding:"32px 24px 24px"}}>
        {children}
      </div>
    </div>
  );
}

// Modální rámeček
function ArtModal({children, wide=false, variant="gold"}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(26,20,16,0.82)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,zIndex:100}}>
      <div style={{maxWidth:wide?580:480,width:"100%",maxHeight:"90vh",overflowY:"auto"}}>
        <ArtFrame variant={variant}>{children}</ArtFrame>
      </div>
    </div>
  );
}

// Malý rámeček pro kartu myši / budovy
function ArtCard({children, style={}, variant="gold"}){
  const col   = variant==="green" ? C.green : variant==="dark" ? C.red : C.gold;
  const outer = variant==="green" ? C.green : variant==="dark" ? C.red : C.inkLight;
  const bg    = variant==="green" ? "#e8f0e0" : variant==="dark" ? "#f0e0e0" : C.parchment;
  return(
    <div style={{position:"relative", background:bg, border:`1.5px solid ${outer}`, ...style}}>
      <div style={{position:"absolute",inset:4,border:`0.6px solid ${col}`,opacity:0.45,pointerEvents:"none"}}/>
      <ArtCardCornerDiv fx={false} fy={false} col={col}/>
      <ArtCardCornerDiv fx={true}  fy={false} col={col}/>
      <ArtCardCornerDiv fx={false} fy={true}  col={col}/>
      <ArtCardCornerDiv fx={true}  fy={true}  col={col}/>
      <div style={{padding:"14px 16px"}}>
        {children}
      </div>
    </div>
  );
}

function InkBox({children,style={},fill=C.parchment}){return<div style={{background:fill,border:`2.5px solid ${C.ink}`,boxShadow:`3px 3px 0 ${C.ink}`,padding:"11px 15px",position:"relative",...style}}>{children}</div>;}
function InkBtn({children,onClick,disabled,active,style={}}){return<button onClick={onClick} disabled={disabled} style={{fontFamily:sansInk,fontSize:13,fontWeight:"bold",letterSpacing:"0.04em",background:active?C.ink:C.parchment,color:active?C.parchment:C.ink,border:`2px solid ${C.ink}`,padding:"7px 13px",cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.4:1,boxShadow:active?`inset 1px 1px 0 ${C.inkLight}`:`2px 2px 0 ${C.ink}`,...style}}>{children}</button>;}
function Title({children,size=17,style={}}){return<div style={{fontFamily:inkFont,fontSize:size,fontStyle:"italic",color:C.ink,fontWeight:"bold",lineHeight:1.2,...style}}>{children}</div>;}
function Label({children,style={}}){return<div style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",color:C.inkFaded,...style}}>{children}</div>;}
function Body({children,style={}}){return<div style={{fontFamily:inkFont,fontSize:14,fontStyle:"italic",color:C.inkLight,lineHeight:1.85,...style}}>{children}</div>;}
function MouseSVG({injured,lost}){return<svg width="36" height="36" viewBox="0 0 34 34"><ellipse cx="17" cy="21" rx="11" ry="8" fill={C.parchment} stroke={C.ink} strokeWidth="1.5"/><circle cx="17" cy="13" r="7" fill={C.parchment} stroke={C.ink} strokeWidth="1.5"/><ellipse cx="10" cy="8" rx="3.5" ry="6" fill={C.parchment} stroke={C.ink} strokeWidth="1.2" transform="rotate(-18 10 8)"/><ellipse cx="24" cy="8" rx="3.5" ry="6" fill={C.parchment} stroke={C.ink} strokeWidth="1.2" transform="rotate(18 24 8)"/><circle cx="14.5" cy="13" r="1.2" fill={C.ink}/><circle cx="19.5" cy="13" r="1.2" fill={C.ink}/><path d="M14.5 17 Q17 19 19.5 17" fill="none" stroke={C.ink} strokeWidth="1.2"/>{injured&&<path d="M5 5 L29 29 M29 5 L5 29" stroke={C.red} strokeWidth="1.5" opacity="0.45"/>}{lost&&<path d="M17 5 L17 29 M5 17 L29 17" stroke={C.gold} strokeWidth="1.5" opacity="0.55"/>}</svg>;}

// ── Hex Map ───────────────────────────────────────────────────────────────────
function hcenter(c,r){return{x:HS*1.75*c+36,y:HS*Math.sqrt(3)*(r+(c%2)*0.5)+36};}
function hcorners(cx,cy,r=HS){return Array.from({length:6},(_,i)=>{const a=Math.PI/180*(60*i);return`${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;}).join(" ");}
function hterrain(c,r){const v=(c*7+r*13)%17;if(v<3)return"water";if(v<6)return"dense";if(v<9)return"meadow";return"forest";}
const TF={fog:"#2C2C2A",water:"#d8e8f0",dense:"#c8d4b8",meadow:"#e8e4c8",forest:"#c0cca8",village:"#f5f0e8"};
const TS={fog:"#3d3228",water:"#8aa8b8",dense:"#6b7a58",meadow:"#a89860",forest:"#5a7040",village:"#1a1410"};

function HexMap({s,onHexClick}){
  const odhaleno=new Set(s.hexMap?.revealed||[]);
  const svgW=HS*1.75*HCOLS+70,svgH=HS*Math.sqrt(3)*(HROWS+0.5)+60;
  const locByHex={};
  const gen=s.hexMap?.generation||0;
  if(gen===0){
    STATIC_LOCATIONS.forEach(loc=>{const pos=LOC_HEXES[loc.id];if(pos)locByHex[`${pos.c},${pos.r}`]=loc;});
  } else {
    const dynLocs=s.hexMap?.dynamicLocs||{};
    Object.entries(dynLocs).forEach(([hexKey,locId])=>{const loc=STATIC_LOCATIONS.find(l=>l.id===locId);if(loc)locByHex[hexKey]=loc;});
  }
  const hexes=[];for(let c=0;c<HCOLS;c++)for(let r=0;r<HROWS;r++){const key=`${c},${r}`,isRev=odhaleno.has(key),isV=c===VH.c&&r===VH.r;const terrain=isV?"village":hterrain(c,r);const loc=locByHex[key],{x,y}=hcenter(c,r);const visited=loc&&(s.exploredLocs||[]).includes(loc.id);hexes.push({key,c,r,x,y,isRev,isV,terrain,loc,visited});}
  return(
    <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{display:"block"}}>
      <defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#3d3228" strokeWidth="0.8" opacity="0.4"/></pattern></defs>
      {hexes.map(h=>{const fill=h.isRev?TF[h.terrain]:TF.fog,stroke=h.isRev?TS[h.terrain]:TS.fog,corners=hcorners(h.x,h.y);return(
        <g key={h.key} onClick={()=>h.isRev&&!h.isV&&onHexClick(h)} style={{cursor:h.isRev&&!h.isV?"pointer":"default"}}>
          <polygon points={corners} fill={fill} stroke={stroke} strokeWidth={h.isV?"2":"0.8"}/>
          {!h.isRev&&<polygon points={corners} fill="url(#hatch)" stroke="none"/>}
          {h.isV&&h.isRev&&<><circle cx={h.x} cy={h.y} r="7" fill={C.ink} opacity="0.9"/><text x={h.x} y={h.y+4} textAnchor="middle" fontSize="8" fill={C.parchment} fontWeight="bold" fontFamily={sansInk}>V</text></>}
          {h.isRev&&h.loc&&!h.isV&&<><circle cx={h.x} cy={h.y-2} r="5" fill={h.loc.fluff?C.stain:h.loc.danger?C.red:C.green} stroke={C.ink} strokeWidth="0.8" opacity="0.9"/><text x={h.x} y={h.y+1} textAnchor="middle" fontSize="6" fill={C.parchment} fontWeight="bold" fontFamily={sansInk}>{h.loc.fluff?"~":h.loc.danger?"!":"◎"}</text>{h.visited&&<text x={h.x} y={h.y+12} textAnchor="middle" fontSize="6" fill={C.inkFaded} fontFamily={sansInk}>{h.loc.name.slice(0,9)}</text>}</>}
          {!h.isRev&&<text x={h.x} y={h.y+4} textAnchor="middle" fontSize="9" fill="#5a4a38" opacity="0.5" fontFamily={sansInk}>?</text>}
        </g>);})}
      {[["V",C.ink,"Vesnice"],["◎",C.green,"Lokace"],["!",C.red,"Nebezpečí"],["~",C.stain,"Atmosféra"]].map(([sym,col,lbl],i)=>(
        <g key={lbl} transform={`translate(${8+i*65},${svgH-18})`}>
          <circle cx="6" cy="6" r="5" fill={col} stroke={C.ink} strokeWidth="0.5" opacity="0.9"/>
          <text x="6" y="9.5" textAnchor="middle" fontSize="6" fill={C.parchment} fontWeight="bold" fontFamily={sansInk}>{sym}</text>
          <text x="14" y="10" fontSize="8" fill={C.inkFaded} fontFamily={sansInk}>{lbl}</text>
        </g>))}
    </svg>);
}

// ── Resource & Status ─────────────────────────────────────────────────────────
function ResourceBar({s}){
  const season=getSeason(s.turn);
  const items=[{label:"JÍDLO",val:s.food,cap:s.foodCap,sym:"⁂"},{label:"DŘEVO",val:s.wood,cap:s.woodCap,sym:"⊞"},{label:"ZÁSOBY",val:s.mats,cap:s.matsCap,sym:"◈"},{label:"MORÁLKA",val:s.morale,cap:100,sym:"♡"},{label:"HROZBA",val:s.threat,cap:10,sym:"!",danger:true}];
  return(
    <div style={{marginBottom:10}}>
      <Label style={{fontSize:13,color:s.turn<=15?C.green:s.turn<=30?C.gold:C.red,marginBottom:5}}>{season.label.toUpperCase()}</Label>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
        {items.map(({label,val,cap,sym,danger})=>(
          <InkBox key={label} style={{padding:"8px 10px",textAlign:"center"}} fill={danger&&val>=7?C.parchmentDark:C.parchment}>
            <div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:danger&&val>=7?C.red:C.inkFaded,marginBottom:2}}>{sym} {label}</div>
            <div style={{fontFamily:inkFont,fontSize:19,fontWeight:"bold",color:danger&&val>=7?C.red:C.ink}}>{Math.floor(val)}<span style={{fontSize:12,color:C.inkGhost}}>/{cap}</span></div>
            <div style={{marginTop:4,height:4,background:C.stain}}><div style={{height:"100%",width:`${Math.min(100,val/cap*100)}%`,background:danger?(val>=7?C.red:C.inkFaded):C.inkLight}}/></div>
          </InkBox>))}
      </div>
    </div>);
}
function WinterCheck({s}){return(<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>{[{label:"Jídlo",val:s.food,req:30,sym:"⁂"},{label:"Dřevo",val:s.wood,req:20,sym:"⊞"},{label:"Zásoby",val:s.mats,req:15,sym:"◈"},{label:"Morálka",val:s.morale,req:30,sym:"♡"}].map(r=>(<div key={r.label} style={{textAlign:"center",padding:"8px 4px",border:`2px solid ${r.val>=r.req?C.green:C.red}`,background:C.parchment,boxShadow:`2px 2px 0 ${r.val>=r.req?C.green:C.red}`}}><Label style={{fontSize:11}}>{r.sym} {r.label}</Label><div style={{fontFamily:inkFont,fontSize:17,fontWeight:"bold",color:r.val>=r.req?C.green:C.red}}>{Math.floor(r.val)}<span style={{fontSize:11,opacity:0.7}}>/{r.req}</span></div></div>))}</div>);}

// ── Tabs ──────────────────────────────────────────────────────────────────────
function getActionYield(act,mouse,s){
  const p=s.policies,allB=getAllBuildings(s);const fc=s.mice.filter(m=>s.assignments[m.id]==="forage"&&!m.lost).length;
  if(act.id==="forage"){let base=2.5+(allB.find(b=>b.id==="seedlib"&&b.built)?1:0)+(p.includes("forager_guild")?1:0);if(fc>=4)base=Math.max(1,base-0.5*(fc-3));const b=traitBonus(mouse.trait,"forage");return[`+${(base+b).toFixed(1)} jídla`,b>0?`(+${b} ${TRAITS.find(t=>t.id===mouse.trait)?.label})`:b<0?`(${b})`:""].join(" ").trim();}
  if(act.id==="haul"){const b=traitBonus(mouse.trait,"haul");return`+${2+b} dřeva${b>0?` (+${b})`:""}`;}
  if(act.id==="gather")return`+${2+(s.policies.includes("deep_roots")?1:0)} zásoby`;
  if(act.id==="rest")return mouse.injured?"léčí zranění":"+4 morálka";
  if(act.id==="watch")return`−${allB.find(b=>b.id==="watchpost"&&b.built)?3:1.5} hrozby`;
  if(act.id==="craft")return hasBldg(s,"workshop")?"zásoby→jídlo+dřevo":"potřebuje dílnu";
  if(act.id==="build")return s.buildQueue?`→ ${getAllBuildings(s).find(b=>b.id===s.buildQueue)?.name||"?"}`:"nejdříve zařaď stavbu";
  if(act.id==="explore"){const b=traitBonus(mouse.trait,"explore");return b>0?`průzkum + hrozba −${1+b}`:b<0?"průzkum (riskantní)":"odhalí lokaci";}
  return"";
}


function WeatherWidget({s}){
  const w=s.weather;
  if(!w)return null;
  const positive=w.foodMod>0||w.woodMod>0||w.matsMod>0||w.moraleMod>0||w.threatMod<0;
  const negative=w.foodMod<0||w.woodMod<0||w.matsMod<0||w.moraleMod<0||w.threatMod>0;
  const bg=positive&&!negative?"#e8f0e0":negative&&!positive?"#f0e0e0":"#f0ecdc";
  const bc=positive&&!negative?C.green:negative&&!positive?C.red:C.gold;
  // Narativní věta — deterministicky vybraná dle tahu (ne náhodně při každém renderu)
  const narrativePool=WEATHER_NARRATIVE[w.id]||[];
  const narrative=narrativePool.length?narrativePool[s.turn%narrativePool.length]:"";
  return(
    <div style={{padding:"8px 12px",background:bg,border:`2px solid ${bc}`,marginBottom:10}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:narrative?6:0}}>
        <span style={{fontSize:20}}>{w.icon}</span>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Label style={{fontSize:12,color:bc}}>{w.label.toUpperCase()}</Label>
            <Label style={{fontSize:10,color:C.inkGhost}}>ještě {s.weatherTurnsLeft} {s.weatherTurnsLeft===1?"tah":"tahy"}</Label>
          </div>
          <div style={{fontFamily:sansInk,fontSize:10,color:C.inkFaded,marginTop:2}}>{w.desc}</div>
        </div>
      </div>
      {narrative&&<div style={{fontFamily:inkFont,fontSize:13,fontStyle:"italic",color:C.inkLight,paddingTop:6,borderTop:`1px solid ${bc}33`}}>{narrative}</div>}
    </div>
  );
}

function VillageOverviewTab({s}){
  const allB=getAllBuildings(s);
  const builtB=allB.filter(b=>b.built);
  const comfort=getComfortLevel(s.comfortPts||0);
  const activeWinter=getActiveWinter(s.turn);
  const season=getSeason(s.turn);

  return(<div style={{display:"flex",flexDirection:"column",gap:10}}>

    {/* Počasí */}
    <div>
      <Label style={{marginBottom:6,letterSpacing:"0.06em"}}>POČASÍ</Label>
      <WeatherWidget s={s}/>
    </div>

    {/* Stav vesnice */}
    <ArtFrame variant="gold" style={{marginBottom:10}}>
      <Label style={{marginBottom:8,letterSpacing:"0.06em"}}>STAV VRBNÍKU</Label>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div>
          <Label style={{fontSize:10,marginBottom:3}}>SEZÓNA</Label>
          <Body style={{fontSize:13}}>{season.label}</Body>
        </div>
        <div>
          <Label style={{fontSize:10,marginBottom:3}}>TAH</Label>
          <Body style={{fontSize:13}}>{s.turn} / {s.maxTurns}</Body>
        </div>
        <div>
          <Label style={{fontSize:10,marginBottom:3}}>POHODLÍ NORY</Label>
          <Body style={{fontSize:13}}>{comfort.icon} {comfort.name} ({s.comfortPts||0} bodů)</Body>
        </div>
        <div>
          <Label style={{fontSize:10,marginBottom:3}}>MYŠÍ</Label>
          <Body style={{fontSize:13}}>{s.mice.filter(m=>!m.lost).length} aktivních / {s.mice.length} celkem</Body>
        </div>
      </div>
      {activeWinter&&(
        <div style={{marginTop:10,padding:"6px 10px",background:activeWinter.bgColor,border:`1.5px solid ${activeWinter.color}`}}>
          <Label style={{fontSize:11,color:activeWinter.color}}>{activeWinter.icon} {activeWinter.name.toUpperCase()} — {activeWinter.effects}</Label>
        </div>
      )}
    </ArtFrame>

    {/* Aktivní politiky */}
    {s.policies.length>0&&(
      <InkBox>
        <Label style={{marginBottom:8,letterSpacing:"0.06em"}}>AKTIVNÍ NAŘÍZENÍ ({s.policies.length})</Label>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {s.policies.map(pid=>{
            const pol=POLICIES.find(p=>p.id===pid);if(!pol)return null;
            return(
              <div key={pid} style={{padding:"8px 10px",background:C.parchmentDark,border:`1.5px solid ${C.stain}`}}>
                <div style={{fontFamily:inkFont,fontSize:14,fontWeight:"bold",fontStyle:"italic",marginBottom:3}}>{pol.name}</div>
                <Body style={{fontSize:12}}>{pol.flavor}</Body>
                <div style={{display:"flex",gap:12,marginTop:4,fontFamily:sansInk,fontSize:11,fontWeight:"bold"}}>
                  <span style={{color:C.green}}>+ {pol.pos}</span>
                  <span style={{color:C.red}}>– {pol.neg}</span>
                </div>
              </div>
            );
          })}
        </div>
      </InkBox>
    )}

    {/* Postavené budovy */}
    {builtB.length>0&&(
      <InkBox>
        <Label style={{marginBottom:8,letterSpacing:"0.06em"}}>POSTAVENÉ BUDOVY ({builtB.length})</Label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {builtB.map(b=>(
            <div key={b.id} style={{padding:"7px 10px",background:"#e8f0e0",border:`1.5px solid ${C.green}`,display:"flex",gap:7,alignItems:"center"}}>
              <span style={{fontFamily:sansInk,fontSize:16}}>{b.icon}</span>
              <div>
                <div style={{fontFamily:inkFont,fontSize:13,fontWeight:"bold",fontStyle:"italic"}}>{b.name}</div>
                <Label style={{fontSize:10,color:C.green}}>{b.desc}</Label>
              </div>
            </div>
          ))}
        </div>
      </InkBox>
    )}

    {/* Zkušenostní rysy myší */}
    {s.mice.some(m=>m.agingPerk)&&(
      <InkBox>
        <Label style={{marginBottom:8,letterSpacing:"0.06em"}}>ZKUŠENOSTNÍ RYSY</Label>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {s.mice.filter(m=>m.agingPerk).map(m=>{
            const perk=AGING_PERKS.find(p=>p.id===m.agingPerk);if(!perk)return null;
            return(
              <div key={m.id} style={{display:"flex",gap:8,alignItems:"flex-start",padding:"7px 10px",background:perk.type==="good"?"#e8f0e0":"#f0e0e0",border:`1.5px solid ${perk.type==="good"?C.green:C.red}`}}>
                <span style={{fontFamily:sansInk,fontSize:14,fontWeight:"bold",color:perk.type==="good"?C.green:C.red}}>{perk.glyph}</span>
                <div>
                  <div style={{fontFamily:inkFont,fontSize:13,fontWeight:"bold",fontStyle:"italic"}}>{m.name}: {perk.label}</div>
                  <Label style={{fontSize:11,color:perk.type==="good"?C.green:C.red}}>{perk.desc}</Label>
                </div>
              </div>
            );
          })}
        </div>
      </InkBox>
    )}

    {/* Posledních 5 kronikových záznamů */}
    <InkBox>
      <Label style={{marginBottom:8,letterSpacing:"0.06em"}}>POSLEDNÍ ZÁZNAMY</Label>
      <div style={{display:"flex",flexDirection:"column",gap:4}}>
        {[...s.log].reverse().slice(0,5).map((e,i)=>{
          const bc=e.fluff?C.stain:e.good?C.green:C.red;
          return(
            <div key={i} style={{padding:"6px 10px",background:e.fluff?"#f0ece0":e.good?"#e8f0e0":"#f0e0e0",border:`1.5px solid ${bc}`}}>
              <Label style={{fontSize:10,color:bc}}>T{e.t} — {e.title||e.msg}</Label>
              {e.lore&&<Body style={{fontSize:11,marginTop:2}}>{e.lore.slice(0,100)}{e.lore.length>100?"…":""}</Body>}
            </div>
          );
        })}
      </div>
    </InkBox>

  </div>);
}

function VillageTab({s,availActions,assign}){
  const[exp,setExp]=useState(null);
  return(<div>
    <Label style={{marginBottom:10}}>Přidělte každé myši úkol. Klikněte na kartu pro příběh a detaily.</Label>
    {s.mice.filter(m=>!m.lost&&!m.onExpedition).map(m=>{
      const trait=TRAITS.find(t=>t.id===m.trait)||{label:"?",glyph:"?",desc:""};
      const isE=exp===m.id;const isBlocked=s.blockedMouse===m.id;const displayName=m.fullName??m.name;
      return(<ArtCard key={m.id} variant={isBlocked?"dark":m.injured?"gold":"gold"} style={{marginBottom:9}}>
        {/* Hlavička — kliknutí rozbalí/sbalí */}
        <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8,cursor:"pointer"}} onClick={()=>setExp(isE?null:m.id)}>
          <MouseSVG injured={m.injured} lost={false}/>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginBottom:4}}>
              <Title size={16}>{displayName}</Title>
              <span style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",padding:"2px 8px",border:`2px solid ${C.ink}`,color:C.inkLight}}>{trait.glyph} {trait.label}</span>
              {m.agingPerk&&(()=>{const pk=AGING_PERKS.find(p=>p.id===m.agingPerk);return pk?(<span style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",padding:"2px 8px",border:`2px solid ${pk.type==="good"?C.green:C.red}`,color:pk.type==="good"?C.green:C.red}}>{pk.glyph} {pk.label}</span>):null;})()}
              {m.injured&&<span style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",padding:"2px 8px",border:`2px solid ${C.red}`,color:C.red}}>✗ zraněna</span>}
              {isBlocked&&<span style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",padding:"2px 8px",border:`2px solid ${C.red}`,color:C.red,background:"#fde8e8"}}>~ paralyzována</span>}
              <span style={{fontFamily:sansInk,fontSize:11,color:C.inkGhost,marginLeft:"auto"}}>{isE?"▲":"▼"}</span>
            </div>
            <Label style={{fontSize:12}}>{trait.desc}</Label>
          </div>
        </div>

        {/* Rozbalený obsah: lore + výnosy + historie */}
        {isE&&(<div style={{marginBottom:10}}>
          {/* Lore příběh — vždy na prvním místě */}
          {m.lore&&(<div style={{marginBottom:12,padding:"13px 15px",background:"#f8f4ec",border:`2px solid ${C.stain}`,borderLeft:`5px solid ${C.inkFaded}`}}>
            <Label style={{marginBottom:7,fontSize:11,letterSpacing:"0.08em"}}>✦ PŘÍBĚH</Label>
            <Body style={{fontSize:14,lineHeight:2.0}}>{m.lore}</Body>
          </div>)}

          {/* Výnosy akcí */}
          <div style={{padding:"10px 12px",background:C.parchmentDark,border:`1.5px solid ${C.stain}`,marginBottom:m.history?.length?10:0}}>
            <Label style={{marginBottom:7,fontSize:11}}>VÝNOSY AKCÍ TENTO TAH</Label>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
              {availActions.filter(ac=>!(m.injured&&ac.id!=="rest")).map(act=>(<div key={act.id} style={{fontFamily:sansInk,fontSize:12,color:C.inkLight}}><span style={{fontWeight:"bold"}}>{act.glyph} {act.label}:</span>{" "}<span style={{color:C.inkFaded}}>{getActionYield(act,m,s)}</span></div>))}
            </div>
          </div>

          {/* Historie */}
          {(m.history||[]).length>0&&(<div style={{padding:"10px 12px",background:C.parchmentDark,border:`1.5px solid ${C.stain}`,borderTop:"none"}}>
            <Label style={{marginBottom:5,fontSize:11}}>HISTORIE</Label>
            {m.history.map((h,i)=><Body key={i} style={{fontSize:13}}>· {h}</Body>)}
          </div>)}
        </div>)}

        {/* Akce tlačítka */}
        <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
          {availActions.map(act=>(<InkBtn key={act.id} active={s.assignments[m.id]===act.id} disabled={(m.injured&&act.id!=="rest")||isBlocked} onClick={()=>assign(m.id,act.id)} style={{fontSize:12,padding:"6px 10px"}}>{act.glyph} {act.label}</InkBtn>))}
        </div>
      </ArtCard>);})}
    {s.mice.filter(m=>m.onExpedition).map(m=>{
      const ae=(s.activeExpeditions||[]).find(e=>e.mouseIds.includes(m.id));
      const expDef=ae?EXPEDITIONS.find(e=>e.id===ae.expId):null;
      return(<ArtCard key={m.id} style={{marginBottom:9,opacity:0.7}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <MouseSVG injured={false} lost={false}/>
          <div>
            <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:3}}>
              <Title size={15}>{m.fullName??m.name}</Title>
              <span style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",color:C.gold,padding:"2px 8px",border:`2px solid ${C.gold}`}}>⛺ na výpravě</span>
            </div>
            <Label style={{fontSize:12}}>{expDef?expDef.name:""} — vrátí se za {ae?.turnsLeft??0} {ae?.turnsLeft===1?"tah":ae?.turnsLeft<5?"tahy":"tahů"}</Label>
          </div>
        </div>
      </ArtCard>);})}
    {s.mice.filter(m=>m.lost).map(m=>(<ArtCard key={m.id} style={{marginBottom:9,opacity:0.65}}><div style={{display:"flex",alignItems:"center",gap:10}}><MouseSVG injured={false} lost={true}/><div><div style={{display:"flex",gap:7,alignItems:"center",marginBottom:3}}><Title size={15}>{m.name}</Title><span style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",color:C.gold,padding:"2px 8px",border:`2px solid ${C.gold}`}}>pryč</span></div><Label style={{fontSize:12}}>{m.lostReason} — vrátí se za ~{m.lostTurns} {m.lostTurns===1?"tah":m.lostTurns<5?"tahy":"tahů"}</Label></div></div></ArtCard>))}
  </div>);}

function BuildTab({s,onQueue,onQueueCraft}){
  const allB=getAllBuildings(s);const[expanded,setExpanded]=useState(null);
  return(<div>
    <Label style={{marginBottom:10}}>BUDOVY & ZAŘÍZENÍ — klikněte na název pro lore</Label>
    {allB.map(b=>{const can=s.wood>=b.cost.wood&&s.mats>=b.cost.mats,queued=s.buildQueue===b.id,isExp=expanded===b.id;return(
      <ArtCard key={b.id} variant={b.built?"green":"gold"} style={{marginBottom:8,opacity:b.built?0.75:1}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:10}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
              <span style={{fontFamily:sansInk,fontSize:20}}>{b.icon}</span>
              <span onClick={()=>setExpanded(isExp?null:b.id)} style={{fontFamily:inkFont,fontSize:16,fontWeight:"bold",fontStyle:"italic",color:C.ink,cursor:"pointer",borderBottom:`1.5px dotted ${C.inkFaded}`,lineHeight:1.3}}>{b.name}</span>
              {b.built&&<span style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",color:C.green}}>✓ postaveno</span>}
              <span onClick={()=>setExpanded(isExp?null:b.id)} style={{fontFamily:sansInk,fontSize:11,color:C.inkGhost,cursor:"pointer"}}>{isExp?"▲":"▼"}</span>
            </div>
            <Label style={{fontSize:12}}>{b.desc} · ⊞{b.cost.wood} ◈{b.cost.mats}</Label>
            <Body style={{fontSize:13,marginTop:3}}>{b.flavor}</Body>
          </div>
          {!b.built&&<InkBtn onClick={()=>onQueue(b.id)} disabled={!can} active={queued} style={{fontSize:11,whiteSpace:"nowrap",flexShrink:0,marginTop:2}}>{queued?"zařazeno":"zařadit"}</InkBtn>}
        </div>
        {isExp&&b.lore&&(<div style={{marginTop:12,paddingTop:12,borderTop:`1.5px solid ${C.stain}`}}><Body style={{fontSize:14}}>{b.lore}</Body></div>)}
      </ArtCard>);})}

    {/* Pohodlí a výroba — sloučeno do záložky Stavby */}
    <div style={{marginTop:18,paddingTop:14,borderTop:`3px solid ${C.stain}`}}>
      {(()=>{
        const comfort=getComfortLevel(s.comfortPts||0);
        const next=getNextComfortThreshold(s.comfortPts||0);
        const pct=next?Math.min(100,((s.comfortPts||0)-COMFORT_THRESHOLDS[comfort.level])/(next.threshold-COMFORT_THRESHOLDS[comfort.level])*100):100;
        const hasWorkshop=hasBldg(s,"workshop");
        return(<>
          {/* Stav nory */}
          <InkBox fill="#faf6ee" style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <span style={{fontSize:24}}>{comfort.icon}</span>
              <div style={{flex:1}}>
                <Title size={16}>{comfort.name}</Title>
                <Label style={{fontSize:12,marginTop:2}}>{comfort.desc}</Label>
              </div>
              <div style={{textAlign:"right"}}>
                <Label style={{fontSize:11}}>POHODLÍ</Label>
                <div style={{fontFamily:inkFont,fontSize:20,fontWeight:"bold",color:C.gold}}>{s.comfortPts||0}</div>
              </div>
            </div>
            {next&&(<div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><Label style={{fontSize:11}}>→ {next.level.name}</Label><Label style={{fontSize:11}}>{s.comfortPts||0}/{next.threshold}</Label></div>
              <div style={{height:7,background:C.stain,border:`1.5px solid ${C.ink}`}}><div style={{height:"100%",width:`${pct}%`,background:C.gold}}/></div>
            </div>)}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,marginTop:8}}>
              {comfort.moraleFloor>0&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>♡ Morálka min. {comfort.moraleFloor}</div>}
              {comfort.foodBonus>0&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>⁂ +{comfort.foodBonus} jídla/tah</div>}
              {comfort.woodBonus>0&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>⊞ +{comfort.woodBonus} dřeva/tah</div>}
              {comfort.threatBonus<0&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>! Hrozba {comfort.threatBonus}/tah</div>}
              {comfort.level>=2&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>☽ Léčení rychleji</div>}
            </div>
          </InkBox>
          {/* Výroba předmětů */}
          <Label style={{marginBottom:8,fontSize:11,letterSpacing:"0.06em"}}>VÝROBA PŘEDMĚTŮ — myš musí mít akci Vyrábět</Label>
          {CRAFT_ITEMS.map(item=>{
            const canAfford=s.food>=item.cost.food&&s.wood>=item.cost.wood&&s.mats>=item.cost.mats;
            const reqOk=!item.req||hasWorkshop;const made=(s.craftedItems||[]).includes(item.id);const queued=s.craftQueue===item.id;const canCraft=canAfford&&reqOk&&!made;
            return(<ArtCard key={item.id} variant={made?"green":"gold"} style={{marginBottom:7,opacity:made?0.6:1}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    <span style={{fontSize:16}}>{item.icon}</span>
                    <span style={{fontFamily:inkFont,fontSize:14,fontWeight:"bold",fontStyle:"italic"}}>{item.name}</span>
                    {made&&<span style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.gold}}>✓ vyrobeno</span>}
                    {item.req&&!hasWorkshop&&<span style={{fontFamily:sansInk,fontSize:10,color:C.red}}>nutná dílna</span>}
                  </div>
                  <Label style={{fontSize:11,color:C.gold,marginBottom:3}}>{item.desc}</Label>
                  <div style={{fontFamily:sansInk,fontSize:11,color:C.inkFaded,marginBottom:3}}>
                    {item.cost.food>0&&<span style={{marginRight:8}}>⁂{item.cost.food}</span>}
                    {item.cost.wood>0&&<span style={{marginRight:8}}>⊞{item.cost.wood}</span>}
                    {item.cost.mats>0&&<span>◈{item.cost.mats}</span>}
                  </div>
                  <Body style={{fontSize:12}}>{item.flavor}</Body>
                </div>
                {!made&&<InkBtn onClick={()=>onQueueCraft(item.id)} disabled={!canCraft} active={queued} style={{fontSize:11,whiteSpace:"nowrap",flexShrink:0}}>{queued?"zařazeno":"zařadit"}</InkBtn>}
              </div>
            </ArtCard>);
          })}
        </>);
      })()}
    </div>
  </div>);}

function MapTab({s,selectedHex,setSelectedHex}){return(<div>
  <Label style={{marginBottom:8}}>Průzkum odkrývá nejbližší neznámé území. Klikněte na hex pro popis.<span style={{marginLeft:8,color:C.gold}}>{(s.hexMap?.revealed||[]).length}/{HCOLS*HROWS} odhaleno</span></Label>
  <InkBox style={{padding:"6px",overflow:"hidden"}}><HexMap s={s} onHexClick={setSelectedHex}/></InkBox>
  {selectedHex&&(()=>{const loc=selectedHex.loc,terrain=selectedHex.terrain,loreText=loc?(loc.desc||""):getTerrainLore(terrain),terrainLabel={water:"Voda",dense:"Houštiny",meadow:"Louka",forest:"Les",village:"Vesnice"};return(
    <InkBox style={{marginTop:9}} fill={C.parchmentDark}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:6,flexWrap:"wrap"}}>
            {loc?(<><Title size={15}>{loc.name}</Title>{loc.danger&&<span style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",padding:"2px 8px",border:`2px solid ${C.red}`,color:C.red}}>NEBEZPEČÍ</span>}{loc.fluff&&<span style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",padding:"2px 8px",border:`2px solid ${C.stain}`,color:C.inkFaded}}>ATMOSFÉRA</span>}</>):(<Title size={15} style={{color:C.inkFaded}}>{terrainLabel[terrain]||"Terén"}</Title>)}
          </div>
          {loc&&(s.exploredLocs||[]).includes(loc.id)&&(<Label style={{marginBottom:7,fontSize:12,color:C.green}}>✓ navštíveno</Label>)}
          <Body style={{fontSize:13,lineHeight:1.9}}>{loreText}</Body>
        </div>
        <button onClick={()=>setSelectedHex(null)} style={{background:"none",border:"none",color:C.inkFaded,cursor:"pointer",fontSize:20,padding:"0 0 0 10px",lineHeight:1}}>×</button>
      </div>
    </InkBox>);})()} 
</div>);}

function LogTab({log}){
  const[open,setOpen]=useState(null);
  return(<div style={{display:"flex",flexDirection:"column",gap:5,maxHeight:400,overflowY:"auto"}}>
    {[...log].reverse().map((e,i)=>{const isO=open===i,isF=e.fluff;const bg=isF?"#f0ece0":e.good?"#e8f0e0":"#f0e0e0",bc=isF?C.stain:e.good?C.green:C.red;return(
      <div key={i} onClick={()=>setOpen(isO?null:i)} style={{fontFamily:sansInk,fontSize:13,fontWeight:"bold",padding:"8px 11px",background:bg,border:`2px solid ${bc}`,color:isF?C.inkFaded:bc,cursor:"pointer",userSelect:"none",boxShadow:`1px 1px 0 ${bc}`}}>
        <div style={{display:"flex",justifyContent:"space-between",gap:6}}><span><span style={{opacity:0.55,marginRight:7}}>T{e.t}</span>{e.msg}</span><span style={{flexShrink:0}}>{isO?"▲":"▼"}</span></div>
        {isO&&(<div style={{marginTop:9,paddingTop:9,borderTop:`1.5px solid ${bc}`}}>{e.title&&<Title size={15} style={{marginBottom:5,color:isF?C.inkFaded:e.good?C.inkLight:C.inkFaded}}>{e.title}</Title>}<Body style={{fontSize:14,color:isF?C.inkFaded:e.good?C.inkLight:C.inkFaded}}>{e.lore||"Den plynul tak, jak dny plynou."}</Body></div>)}
      </div>);})}
  </div>);}

function ComfortTab({s,onQueueCraft}){
  const comfort=getComfortLevel(s.comfortPts||0);
  const next=getNextComfortThreshold(s.comfortPts||0);
  const pct=next?Math.min(100,((s.comfortPts||0)-COMFORT_THRESHOLDS[comfort.level])/(next.threshold-COMFORT_THRESHOLDS[comfort.level])*100):100;
  const hasWorkshop=hasBldg(s,"workshop");
  return(<div>
    {/* Aktuální stav nory */}
    <InkBox fill="#f8f4ec" style={{marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
        <span style={{fontSize:28}}>{comfort.icon}</span>
        <div>
          <Title size={18}>{comfort.name}</Title>
          <Label style={{fontSize:12,marginTop:2}}>{comfort.desc}</Label>
        </div>
        <div style={{marginLeft:"auto",textAlign:"right"}}>
          <Label style={{fontSize:11}}>POHODLÍ</Label>
          <div style={{fontFamily:inkFont,fontSize:22,fontWeight:"bold",color:C.gold}}>{s.comfortPts||0}</div>
        </div>
      </div>
      {/* Progress bar k dalšímu stupni */}
      {next&&(<div style={{marginBottom:8}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
          <Label style={{fontSize:11}}>→ {next.level.name}</Label>
          <Label style={{fontSize:11}}>{s.comfortPts||0}/{next.threshold}</Label>
        </div>
        <div style={{height:8,background:C.stain,border:`1.5px solid ${C.ink}`}}>
          <div style={{height:"100%",width:`${pct}%`,background:C.gold,transition:"width 0.5s"}}/>
        </div>
      </div>)}
      {/* Aktivní boony */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginTop:8}}>
        {comfort.moraleFloor>0&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>♡ Morálka min. {comfort.moraleFloor}</div>}
        {comfort.foodBonus>0&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>⁂ +{comfort.foodBonus} jídla/tah</div>}
        {comfort.woodBonus>0&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>⊞ +{comfort.woodBonus} dřeva/tah</div>}
        {comfort.threatBonus<0&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>! Hrozba {comfort.threatBonus}/tah</div>}
        {comfort.level>=2&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>☽ Léčení rychleji</div>}
      </div>
    </InkBox>

    {/* Přehled stupňů */}
    <Label style={{marginBottom:8,fontSize:11,letterSpacing:"0.06em"}}>STUPNĚ POHODLÍ</Label>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14}}>
      {COMFORT_LEVELS.map(cl=>{
        const achieved=( s.comfortPts||0)>=COMFORT_THRESHOLDS[cl.level];
        return(<div key={cl.level} style={{padding:"8px 10px",border:`2px solid ${achieved?C.gold:C.stain}`,background:achieved?"#fdf8ec":C.parchmentDark,opacity:achieved?1:0.6}}>
          <div style={{fontFamily:sansInk,fontSize:13,fontWeight:"bold",color:achieved?C.gold:C.inkFaded}}>{cl.icon} {cl.name}</div>
          <div style={{fontFamily:sansInk,fontSize:10,color:C.inkFaded,marginTop:2}}>{COMFORT_THRESHOLDS[cl.level]} bodů</div>
          <div style={{fontFamily:inkFont,fontSize:12,fontStyle:"italic",color:C.inkLight,marginTop:3}}>{cl.desc}</div>
        </div>);})}
    </div>

    {/* Craftovatelné předměty */}
    <Label style={{marginBottom:8,fontSize:11,letterSpacing:"0.06em"}}>VÝROBA PŘEDMĚTŮ — myš musí mít akci Vyrábět</Label>
    {CRAFT_ITEMS.map(item=>{
      const canAfford=s.food>=item.cost.food&&s.wood>=item.cost.wood&&s.mats>=item.cost.mats;
      const reqOk=!item.req||hasWorkshop;
      const made=(s.craftedItems||[]).includes(item.id);
      const queued=s.craftQueue===item.id;
      const canCraft=canAfford&&reqOk&&!made;
      return(<InkBox key={item.id} style={{marginBottom:7,opacity:made?0.5:1}} fill={queued?"#f8f8ec":C.parchment}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
              <span style={{fontSize:18}}>{item.icon}</span>
              <span style={{fontFamily:inkFont,fontSize:15,fontWeight:"bold",fontStyle:"italic"}}>{item.name}</span>
              {made&&<span style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.gold}}>✓ vyrobeno</span>}
              {item.req&&!hasWorkshop&&<span style={{fontFamily:sansInk,fontSize:10,color:C.red}}>nutná dílna</span>}
            </div>
            <Label style={{fontSize:11,color:C.gold,marginBottom:3}}>{item.desc}</Label>
            <div style={{fontFamily:sansInk,fontSize:11,color:C.inkFaded,marginBottom:4}}>
              {item.cost.food>0&&<span style={{marginRight:8}}>⁂{item.cost.food}</span>}
              {item.cost.wood>0&&<span style={{marginRight:8}}>⊞{item.cost.wood}</span>}
              {item.cost.mats>0&&<span>◈{item.cost.mats}</span>}
            </div>
            <Body style={{fontSize:12}}>{item.flavor}</Body>
          </div>
          {!made&&<InkBtn onClick={()=>onQueueCraft(item.id)} disabled={!canCraft} active={queued} style={{fontSize:11,whiteSpace:"nowrap",flexShrink:0}}>{queued?"zařazeno":"zařadit"}</InkBtn>}
        </div>
      </InkBox>);})}
  </div>);}


function ExpeditionTab({s,onSendExpedition,onDismissChoices}){
  const[selectedMice,setSelectedMice]=useState([]);
  const[selectedExp,setSelectedExp]=useState(null);
  const activeMice=s.mice.filter(m=>!m.lost&&!m.onExpedition&&!m.injured);
  const onExpedition=s.mice.filter(m=>m.onExpedition);
  const hasBase=hasBldg(s,"expedition_base");

  if(!hasBase)return(
    <div style={{padding:"24px 0",textAlign:"center"}}>
      <div style={{fontSize:36,marginBottom:12}}>⛺</div>
      <Title size={18} style={{marginBottom:8,textAlign:"center"}}>Průzkumnická základna</Title>
      <Body style={{marginBottom:16}}>Pro organizaci výprav potřebuješ postavit Průzkumnickou základnu (⊞8 ◈8).</Body>
    </div>
  );

  return(<div>
    {/* Aktivní výpravy */}
    {onExpedition.length>0&&(
      <InkBox style={{marginBottom:12}} fill="#f8f4ec">
        <Label style={{marginBottom:8,letterSpacing:"0.06em"}}>AKTIVNÍ VÝPRAVY</Label>
        {(s.activeExpeditions||[]).map(ae=>{
          const def=EXPEDITIONS.find(e=>e.id===ae.expId);if(!def)return null;
          const members=s.mice.filter(m=>ae.mouseIds.includes(m.id));
          return(<div key={ae.expId} style={{marginBottom:8,padding:"10px 12px",background:"#fdf8ec",border:`1.5px solid ${C.gold}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span style={{fontFamily:inkFont,fontSize:15,fontWeight:"bold",fontStyle:"italic"}}>{def.icon} {def.name}</span>
              <span style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",color:C.gold}}>vrátí se za {ae.turnsLeft} {ae.turnsLeft===1?"tah":ae.turnsLeft<5?"tahy":"tahů"}</span>
            </div>
            <Label style={{fontSize:11}}>{members.map(m=>m.fullName??m.name).join(", ")}</Label>
          </div>);
        })}
      </InkBox>
    )}

    {/* Nabídka výprav */}
    {(s.expeditionChoices||[]).length>0&&(<>
      <Label style={{marginBottom:8,letterSpacing:"0.06em"}}>DOSTUPNÉ VÝPRAVY — vyber jednu</Label>
      {s.expeditionChoices.map(exp=>{
        const isSelected=selectedExp?.id===exp.id;
        const canAfford=s.food>=exp.cost.food&&s.wood>=exp.cost.wood&&s.mats>=exp.cost.mats;
        const canStaff=activeMice.length>=exp.mice;
        return(<ArtCard key={exp.id} variant={isSelected?"green":"gold"} style={{marginBottom:10,cursor:"pointer"}} >
          <div onClick={()=>setSelectedExp(isSelected?null:exp)}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <span style={{fontSize:22}}>{exp.icon}</span>
              <div style={{flex:1}}>
                <Title size={16}>{exp.name}</Title>
                <div style={{display:"flex",gap:12,marginTop:3,flexWrap:"wrap"}}>
                  <Label style={{fontSize:11}}>👤 {exp.mice} myši</Label>
                  <Label style={{fontSize:11}}>⏱ {exp.turns} tahů</Label>
                  {exp.cost.food>0&&<Label style={{fontSize:11,color:canAfford?C.inkFaded:C.red}}>⁂ {exp.cost.food}</Label>}
                  {exp.cost.wood>0&&<Label style={{fontSize:11,color:canAfford?C.inkFaded:C.red}}>⊞ {exp.cost.wood}</Label>}
                  {exp.cost.mats>0&&<Label style={{fontSize:11,color:canAfford?C.inkFaded:C.red}}>◈ {exp.cost.mats}</Label>}
                </div>
              </div>
            </div>
            {/* Odměna */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
              {exp.reward.food>0&&<span style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>+{exp.reward.food} jídla</span>}
              {exp.reward.wood>0&&<span style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>+{exp.reward.wood} dřeva</span>}
              {exp.reward.mats>0&&<span style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>+{exp.reward.mats} zásob</span>}
              {exp.reward.morale>0&&<span style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>mor +{exp.reward.morale}</span>}
              {exp.reward.comfort>0&&<span style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.gold}}>✦ +{exp.reward.comfort} pohodlí</span>}
              {exp.reward.threat<0&&<span style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.green}}>hrozba {exp.reward.threat}</span>}
            </div>
            {/* Lore */}
            {isSelected&&<Body style={{fontSize:13,marginBottom:10,padding:"10px 12px",background:"#faf6ee",border:`1px solid ${C.stain}`,lineHeight:1.9}}>{exp.lore}</Body>}
          </div>
          {/* Výběr myší */}
          {isSelected&&(<>
            <Label style={{marginBottom:6,fontSize:11}}>VYBER {exp.mice} MYŠI:</Label>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:8}}>
              {activeMice.map(m=>{
                const isSel=selectedMice.includes(m.id);
                return(<InkBtn key={m.id} active={isSel}
                  onClick={()=>setSelectedMice(prev=>isSel?prev.filter(id=>id!==m.id):[...prev,m.id].slice(0,exp.mice))}
                  style={{fontSize:12}}>{m.fullName??m.name}</InkBtn>);
              })}
            </div>
            <InkBtn
              disabled={selectedMice.length!==exp.mice||!canAfford||!canStaff}
              onClick={()=>{onSendExpedition(exp,selectedMice);setSelectedExp(null);setSelectedMice([]);}}
              style={{width:"100%",padding:"12px",fontSize:13}}>
              {selectedMice.length===exp.mice?"⛺ Vyslat výpravu":`Vyber ${exp.mice-selectedMice.length} ${exp.mice-selectedMice.length===1?"myš":"myši"}`}
            </InkBtn>
            {!canAfford&&<Label style={{marginTop:6,fontSize:11,color:C.red}}>Nedostatek zásob na cestu.</Label>}
          </>)}
        </ArtCard>);
      })}
      <InkBtn onClick={onDismissChoices} style={{width:"100%",marginTop:4,fontSize:12,background:C.parchmentDark}}>— přeskočit —</InkBtn>
    </>)}

    {!(s.expeditionChoices||[]).length&&(
      <Body style={{textAlign:"center",marginTop:24}}>Nové výpravy se nabídnou každých 5 tahů.</Body>
    )}
  </div>);
}


function HelpModal({onClose}){
  const[open,setOpen]=useState(null);
  const secs=[
    {id:"goal",title:"Cíl hry",body:"Přežijte 50 tahů a na zimu se zásobte: 30 jídla, 20 dřeva, 15 zásob, 30 morálky."},
    {id:"world",title:"Svět",body:"Náš svět ze tří centimetrů výšky. Kapesní nože jsou starověké meče. Kočky jsou bohové. Sovy jsou starší než bohové. Krysy jsou rivalové."},
    {id:"threat",title:"Hrozba",body:"≥4: sběrači přinášejí méně. ≥6: klesá morálka, zpomaluje stavba. ≥8: ubývá jídlo, paralýza. 10: krize s volbou."},
    {id:"weather",title:"Počasí",body:"Každých 1–4 tahů se mění počasí — slunečno, déšť, mlha, bouřka a další. Každé mírně ovlivňuje výnosy sběru a morálku."},
    {id:"aging",title:"Stárnutí myší",body:"Po 15 aktivních tazích dostane myš zkušenostní rys — pozitivní nebo negativní. Za výjimečné okamžiky získá přídomek jako součást jména."},
    {id:"act",title:"Akce",items:ACTIONS.map(a=>[`${a.glyph} ${a.label}`,a.desc])},
  ];
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(26,20,16,0.8)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:C.parchment,border:`3px solid ${C.ink}`,boxShadow:`5px 5px 0 ${C.ink}`,padding:24,maxWidth:500,width:"100%",maxHeight:"85vh",overflowY:"auto",position:"relative"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:12,borderBottom:`2px solid ${C.stain}`}}>
          <Title size={18}>Nápověda</Title>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:24,cursor:"pointer",color:C.inkFaded,lineHeight:1}}>×</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {secs.map((sec,i)=>{const isO=open===i;return(
            <InkBox key={sec.id} style={{padding:"10px 14px"}}>
              <div onClick={()=>setOpen(isO?null:i)} style={{display:"flex",justifyContent:"space-between",cursor:"pointer",userSelect:"none"}}>
                <Title size={14}>{sec.title}</Title>
                <span style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",color:C.inkFaded}}>{isO?"▲":"▼"}</span>
              </div>
              {isO&&(<div style={{marginTop:10,borderTop:`1.5px solid ${C.stain}`,paddingTop:10}}>
                {sec.body&&<Label style={{lineHeight:1.75,fontSize:13}}>{sec.body}</Label>}
                {sec.items&&(<div style={{display:"flex",flexDirection:"column",gap:8}}>{sec.items.map(([lbl,desc])=>(<div key={lbl} style={{display:"flex",gap:10}}><span style={{fontFamily:sansInk,fontSize:13,fontWeight:"bold",color:C.ink,minWidth:130,flexShrink:0}}>{lbl}</span><Label style={{fontSize:12,lineHeight:1.65}}>{desc}</Label></div>))}</div>)}
              </div>)}
            </InkBox>
          );})}
        </div>
      </div>
    </div>
  );
}

function HelpTab(){
  const[open,setOpen]=useState(null);
  const secs=[{id:"goal",title:"Cíl hry",body:"Přežijte 50 tahů a na zimu se zásobte: 30 jídla, 20 dřeva, 15 zásob, 30 morálky. Svět se stává těžším jak se blíží zima."},{id:"world",title:"Svět",body:"Náš svět, viděný ze tří centimetrů výšky. Kapesní nože jsou starověké meče. Kočky jsou bohové. Sovy jsou starší než bohové. Krysy jsou rivalové. Žáby jsou občas spojenci."},{id:"season",title:"Tlak sezóny",items:[["Tahy 1–15","Začátek podzimu — klidný, hrozba roste pomalu."],["Tahy 16–30","Konec podzimu — tlak roste."],["Tahy 31–50","Předzimí — hrozba narůstá rychle. Zásobte se včas."]]},{id:"threat",title:"Hrozba",body:"Při hrozbě ≥4 sběrači přinášejí méně. Při ≥6 klesá morálka a zpomaluje se stavba. Při ≥8 jídlo ubývá a jedna myš je paralyzována. Při 10 nastává krize s volbou."},{id:"act",title:"Akce",items:ACTIONS.map(a=>[`${a.glyph} ${a.label}`,a.desc])}];
  return(<div style={{display:"flex",flexDirection:"column",gap:8}}>
    {secs.map((sec,i)=>{const isO=open===i;return(<InkBox key={sec.id} style={{padding:"10px 14px"}}>
      <div onClick={()=>setOpen(isO?null:i)} style={{display:"flex",justifyContent:"space-between",cursor:"pointer",userSelect:"none"}}><Title size={15}>{sec.title}</Title><span style={{fontFamily:sansInk,fontSize:13,fontWeight:"bold",color:C.inkFaded}}>{isO?"▲":"▼"}</span></div>
      {isO&&(<div style={{marginTop:10,borderTop:`1.5px solid ${C.stain}`,paddingTop:10}}>
        {sec.body&&<Label style={{lineHeight:1.75,fontSize:13}}>{sec.body}</Label>}
        {sec.items&&(<div style={{display:"flex",flexDirection:"column",gap:8}}>{sec.items.map(([lbl,desc])=>(<div key={lbl} style={{display:"flex",gap:10}}><span style={{fontFamily:sansInk,fontSize:13,fontWeight:"bold",color:C.ink,minWidth:130,flexShrink:0}}>{lbl}</span><Label style={{fontSize:12,lineHeight:1.65}}>{desc}</Label></div>))}</div>)}
      </div>)}
    </InkBox>);})}
  </div>);}

// ── Modals ────────────────────────────────────────────────────────────────────
function Modal({children,wide=false}){return(<ArtModal wide={wide} variant="gold">{children}</ArtModal>);}

function OutcomePreview({outcomes,s}){
  const pool=Array.isArray(outcomes)?outcomes:(outcomes?.calm||[]);if(!pool.length)return null;
  const good=pool.filter(o=>o.type==="good"||o.type==="fluff"),bad=pool.filter(o=>o.type==="bad");
  const tot=pool.reduce((a,o)=>a+(typeof o.w==="function"?o.w(s):o.w),0);
  const gPct=Math.round(good.reduce((a,o)=>a+(typeof o.w==="function"?o.w(s):o.w),0)/tot*100);
  return(<div style={{marginBottom:13,padding:"9px 12px",background:C.parchmentDark,border:`2px solid ${C.stain}`}}><Label style={{marginBottom:7,fontSize:11}}>MOŽNÉ VÝSLEDKY — {gPct}% příznivých</Label><div style={{display:"flex",flexDirection:"column",gap:4}}>{good.map((o,i)=><div key={i} style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",color:o.type==="fluff"?C.inkFaded:C.green}}>{o.type==="fluff"?"◦":"✓"} {o.title}</div>)}{bad.map((o,i)=><div key={i} style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",color:C.red}}>✗ {o.title}</div>)}</div></div>);}

function ExploreModal({pendingExplore,onEnter,onRetreat,s}){
  const{loc}=pendingExplore;const desc=typeof loc.desc==="string"?loc.desc:(loc.desc?.calm||"");const safe=typeof loc.safe==="string"?loc.safe:(loc.safe?.calm||"Vaši průzkumníci se bezpečně stáhli.");
  return(<Modal wide><Label style={{marginBottom:5,letterSpacing:"0.1em"}}>— ZPRÁVA ZVĚDŮ —</Label><div style={{display:"flex",alignItems:"center",gap:9,marginBottom:10,flexWrap:"wrap"}}><Title size={20}>{loc.name}</Title>{loc.danger&&<span style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",padding:"3px 9px",border:`2px solid ${C.red}`,color:C.red}}>NEBEZPEČNÉ</span>}{loc.fluff&&<span style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",padding:"3px 9px",border:`2px solid ${C.stain}`,color:C.inkFaded}}>ATMOSFÉRA</span>}</div><Body style={{marginBottom:14,paddingBottom:14,borderBottom:`1.5px solid ${C.stain}`}}>{desc}</Body>{loc.outcomes&&<OutcomePreview outcomes={loc.outcomes} s={s}/>}<Label style={{marginBottom:14}}>Bezpečný ústup: {safe}</Label><div style={{display:"flex",gap:10}}><InkBtn onClick={onEnter} style={{flex:1,padding:"13px 8px",fontSize:13,textAlign:"center"}}>◎ Proniknout hlouběji</InkBtn><InkBtn onClick={onRetreat} style={{flex:1,padding:"13px 8px",fontSize:13,textAlign:"center",background:C.parchmentDark}}>☽ Bezpečně ustoupit</InkBtn></div></Modal>);}

function ExploreResultModal({pendingResult,onContinue}){
  const{locName,outcome,retreated,isTerrain}=pendingResult;const isFluff=outcome.type==="fluff",isGood=outcome.type==="good";const borderCol=isFluff?C.stain:isGood?C.green:C.red;const bgCol=isFluff?"#f5f0e8":isGood?"#e8f0e0":"#f0e0e0";const label=isTerrain?"— PRŮZKUM TERÉNU —":retreated?"— ZVĚDOVÉ SE VRÁTILI —":isFluff?"— OBJEV —":isGood?"— ŠTĚSTÍ —":"— ZLÉ ZNAMENÍ —";const sym=retreated?"☽":isFluff?"◦":isGood?"✓":"✗";const summary=retreated?outcome.lore:effectSummary(outcome);const hasEffect=!retreated&&summary!=="Žádný herní efekt.";
  return(<Modal wide><Label style={{marginBottom:5,letterSpacing:"0.1em"}}>{label}</Label><div style={{display:"flex",alignItems:"center",gap:9,marginBottom:11,flexWrap:"wrap"}}><Title size={20}>{retreated?"Bezpečný ústup":outcome.title}</Title><span style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",color:C.inkFaded}}>@ {locName}</span></div>{hasEffect&&(<div style={{marginBottom:15,padding:"10px 14px",background:bgCol,border:`2px solid ${borderCol}`}}><span style={{fontFamily:sansInk,fontSize:14,fontWeight:"bold",color:borderCol}}>{sym} {summary}</span></div>)}<Body style={{marginBottom:20}}>{outcome.lore}</Body><InkBtn onClick={onContinue} style={{width:"100%",padding:"13px",fontSize:14}}>{retreated?"— Zpět do nory —":"— Dál —"}</InkBtn></Modal>);}



function StoryModal({s,onChoice,onNext}){
  const story=s.pendingStory;
  const page=s.storyPage;
  if(!story||!page)return null;

  const isEnd=page.id==="end_page";
  const C_STORY="#2a1a0a";
  const C_GOLD_WARM="#8a6a10";

  return(
    <Modal wide>
      {/* Záhlaví */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,paddingBottom:12,borderBottom:`2px solid ${C.stain}`}}>
        <div style={{fontFamily:sansInk,fontSize:9,fontWeight:"bold",letterSpacing:"0.2em",color:C.inkGhost}}>
          {story.source==="character"?"— PŘÍBĚH Z NORY —":"— PŘÍBĚH ZE SVĚTA —"}
        </div>
        <div style={{fontFamily:inkFont,fontSize:20,fontWeight:"bold",fontStyle:"italic",color:C_STORY,flex:1,textAlign:"center"}}>{story.title}</div>
      </div>

      {/* Tělo stránky */}
      <div style={{
        fontFamily:inkFont,fontSize:15,color:C.inkLight,lineHeight:2.1,
        fontStyle:"italic",marginBottom:20,
        padding:"16px 18px",
        background:"#faf6ee",
        border:`1.5px solid ${C.stain}`,
        borderLeft:`5px solid ${C_GOLD_WARM}`,
        whiteSpace:"pre-line",
      }}>
        {page.text||story.opening}
      </div>

      {/* Otázka */}
      {page.question&&(
        <div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.inkFaded,letterSpacing:"0.08em",marginBottom:12}}>
          {page.question}
        </div>
      )}

      {/* Volby */}
      {page.choices&&(
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {page.choices.map(ch=>(
            <div key={ch.id} onClick={()=>onChoice(ch)}
              style={{
                border:`2px solid ${C.ink}`,padding:"13px 16px",
                cursor:"pointer",background:C.parchment,
                boxShadow:`2px 2px 0 ${C.ink}`,
                transition:"background 0.15s",
              }}
              onMouseEnter={e=>e.currentTarget.style.background=C.parchmentDark}
              onMouseLeave={e=>e.currentTarget.style.background=C.parchment}
            >
              <div style={{fontFamily:inkFont,fontSize:15,fontWeight:"bold",fontStyle:"italic",color:C.ink,marginBottom:5}}>
                {ch.label}
              </div>
              <div style={{fontFamily:sansInk,fontSize:11,color:C.inkFaded}}>{ch.desc}</div>
            </div>
          ))}
        </div>
      )}

      {/* Pokračovat (pokud není volba) */}
      {!page.choices&&(
        <InkBtn onClick={onNext} style={{width:"100%",padding:"13px",fontSize:14}}>
          — pokračovat —
        </InkBtn>
      )}
    </Modal>
  );
}

function WinterPhaseModal({phase,s,onChoice}){
  const C_BLUE=phase.color;const C_BG=phase.bgColor;
  return(<Modal wide>
    <div style={{textAlign:"center",marginBottom:16}}>
      <div style={{fontSize:52,marginBottom:8,filter:`drop-shadow(0 2px 4px ${C_BLUE}44)`}}>{phase.icon}</div>
      <div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",letterSpacing:"0.15em",color:C_BLUE,marginBottom:6}}>— NOVÁ ZIMNÍ FÁZE —</div>
      <Title size={24} style={{color:C_BLUE,marginBottom:4}}>{phase.name}</Title>
    </div>
    <div style={{padding:"14px 16px",background:C_BG,border:`2px solid ${C_BLUE}`,marginBottom:14}}>
      <Body style={{fontSize:15,lineHeight:2.0,color:"#2a3a5a"}}>{phase.intro}</Body>
    </div>
    <div style={{padding:"10px 14px",background:"#1a3a6a11",border:`1.5px solid ${C_BLUE}66`,marginBottom:16}}>
      <Label style={{marginBottom:6,fontSize:11,color:C_BLUE}}>NOVÉ PODMÍNKY</Label>
      <Label style={{fontSize:12,lineHeight:1.8,color:"#2a3a5a"}}>{phase.effects}</Label>
    </div>
    <Label style={{marginBottom:10,fontSize:11,letterSpacing:"0.06em"}}>CO TEĎ?</Label>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {phase.choices.map((ch,i)=>(<div key={i} onClick={()=>onChoice(ch)}
        style={{border:`2.5px solid ${C_BLUE}`,padding:"12px 15px",cursor:"pointer",background:C.parchment,boxShadow:`2px 2px 0 ${C_BLUE}`}}
        onMouseEnter={e=>e.currentTarget.style.background=C_BG}
        onMouseLeave={e=>e.currentTarget.style.background=C.parchment}>
        <div style={{fontFamily:sansInk,fontSize:13,fontWeight:"bold",color:C_BLUE,marginBottom:4}}>{ch.label}</div>
        <div style={{fontFamily:inkFont,fontSize:13,fontStyle:"italic",color:C.inkFaded}}>{ch.desc}</div>
      </div>))}
    </div>
  </Modal>);
}

function ThreatEventModal({event:ev,onChoice}){return(<Modal><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}><div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",padding:"3px 10px",background:C.red,color:C.parchment,letterSpacing:"0.08em"}}>— KRIZE —</div><div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:C.red}}>HROZBA 10</div></div><Title size={22} style={{marginBottom:14,color:C.red}}>{ev.title}</Title><Body style={{marginBottom:18,whiteSpace:"pre-line"}}>{ev.body}</Body><div style={{display:"flex",flexDirection:"column",gap:10}}>{ev.choices.map((ch,i)=>(<div key={i} onClick={()=>onChoice(ch)} style={{border:`2.5px solid ${C.red}`,padding:"12px 15px",cursor:"pointer",background:C.parchment,boxShadow:`2px 2px 0 ${C.red}`}} onMouseEnter={e=>e.currentTarget.style.background=C.parchmentDark} onMouseLeave={e=>e.currentTarget.style.background=C.parchment}><div style={{fontFamily:sansInk,fontSize:13,fontWeight:"bold",color:C.red,marginBottom:4}}>{ch.label}</div><div style={{fontFamily:inkFont,fontSize:13,fontStyle:"italic",color:C.inkFaded}}>{ch.desc}</div></div>))}</div></Modal>);}

// ── Intro Screen ──────────────────────────────────────────────────────────────
function IntroScreen({onContinue}){
  const[page,setPage]=useState(0);
  const total=6;
  const isLast=page===total-1;

  return(
    <div style={{
      position:"fixed",inset:0,background:"#0a0806",
      display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",
      zIndex:1000,
    }}>
      {/* Obrázek */}
      <div style={{position:"relative",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img
          key={page}
          src={`/intro/${page+1}.jpg`}
          alt={`Intro ${page+1}`}
          style={{
            maxWidth:"100%",maxHeight:"100%",
            objectFit:"contain",
            display:"block",
          }}
        />

        {/* Navigace — překryv přes obrázek */}
        <div style={{
          position:"absolute",bottom:0,left:0,right:0,
          padding:"20px 32px",
          background:"linear-gradient(transparent, rgba(10,8,6,0.85))",
          display:"flex",justifyContent:"space-between",alignItems:"center",
        }}>
          {/* Zpět */}
          {page>0
            ?<button onClick={()=>setPage(p=>p-1)} style={{
                fontFamily:sansInk,fontSize:14,fontWeight:"bold",
                background:"rgba(245,240,232,0.15)",
                border:"1.5px solid rgba(245,240,232,0.4)",
                color:"#f5f0e8",padding:"10px 22px",cursor:"pointer",
                backdropFilter:"blur(4px)",
              }}>← zpět</button>
            :<div style={{width:100}}/>
          }

          {/* Tečky */}
          <div style={{display:"flex",gap:8}}>
            {Array.from({length:total}).map((_,i)=>(
              <div key={i} onClick={()=>setPage(i)} style={{
                width:i===page?24:8,height:8,
                background:i===page?"#f5f0e8":"rgba(245,240,232,0.35)",
                cursor:"pointer",transition:"all 0.3s",
              }}/>
            ))}
          </div>

          {/* Dál / Vstoupit */}
          <button
            onClick={isLast?onContinue:()=>setPage(p=>p+1)}
            style={{
              fontFamily:sansInk,fontSize:14,fontWeight:"bold",
              background:isLast?"#8a6a10":"rgba(245,240,232,0.15)",
              border:`1.5px solid ${isLast?"#8a6a10":"rgba(245,240,232,0.4)"}`,
              color:"#f5f0e8",padding:"10px 22px",cursor:"pointer",
              backdropFilter:"blur(4px)",
            }}>
            {isLast?"❧ Vstoupit do Hlošinau":"pokračovat →"}
          </button>
        </div>

        {/* Přeskočit */}
        {!isLast&&(
          <button onClick={onContinue} style={{
            position:"absolute",top:16,right:20,
            fontFamily:sansInk,fontSize:12,fontWeight:"bold",
            background:"none",border:"none",
            color:"rgba(245,240,232,0.4)",cursor:"pointer",
          }}>přeskočit ×</button>
        )}
      </div>
    </div>
  );
}

function HeaderSVG(){return(<svg width="100%" viewBox="0 0 680 84" style={{display:"block",marginBottom:4}}><rect width="680" height="84" fill={C.parchment}/><rect x="6" y="6" width="668" height="72" fill="none" stroke={C.ink} strokeWidth="2.5"/><rect x="12" y="12" width="656" height="60" fill="none" stroke={C.ink} strokeWidth="1"/>{[38,58,78,98,582,602,622,642].map((x,i)=>(<g key={i}><line x1={x} y1="6" x2={x} y2="22" stroke={C.ink} strokeWidth="2"/><line x1={x} y1="62" x2={x} y2="78" stroke={C.ink} strokeWidth="2"/></g>))}<text x="340" y="45" textAnchor="middle" fontFamily={inkFont} fontSize="25" fontWeight="bold" fontStyle="italic" fill={C.ink}>O myších a zimě</text><text x="340" y="63" textAnchor="middle" fontFamily={sansInk} fontSize="11" letterSpacing="4" fill={C.inkFaded}>PŘÍBĚH VRBNÍKU</text></svg>);}

function SavePreview(){
  const[info,setInfo]=useState(null);useEffect(()=>{loadGame().then(d=>{if(d)setInfo(d);});},[]);if(!info)return null;
  const season=getSeason(info.turn);
  return(<InkBox style={{maxWidth:360,margin:"0 auto",padding:"14px 16px",textAlign:"left"}}><Label style={{marginBottom:6}}>ULOŽENÁ VES</Label><Title size={15} style={{marginBottom:4}}>Hlošina — Tah {info.turn} z {info.maxTurns}</Title><Label style={{fontSize:12,color:info.turn<=15?C.green:info.turn<=30?C.gold:C.red,marginBottom:10}}>{season.name.toUpperCase()}</Label><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:8}}>{[["⁂",Math.floor(info.food),info.foodCap],["⊞",Math.floor(info.wood),info.woodCap],["◈",Math.floor(info.mats),info.matsCap],["♡",Math.floor(info.morale),100]].map(([sym,val,cap])=>(<div key={sym} style={{fontFamily:sansInk,fontSize:13,fontWeight:"bold",color:C.inkFaded}}>{sym} {val}<span style={{opacity:0.5}}>/{cap}</span></div>))}</div><Label style={{fontSize:12}}>{(info.mice||[]).filter(m=>!m.lost).map(m=>m.name).join(", ")}</Label></InkBox>);}

function GameOver({s,onRestart}){
  const pass=s.food>=30&&s.wood>=20&&s.mats>=15&&s.morale>=30;
  // Všechny myši co přežily zimu dostanou přídomek (pokud ho nemají)
  const winterSurvivors=s.mice.filter(m=>!m.lost&&!m.epithet);
  return(<div style={{background:C.parchment,padding:"2rem",textAlign:"center"}}><div style={{fontSize:50,marginBottom:14}}>{pass?"🌾":"❄"}</div><Title size={26} style={{marginBottom:10,textAlign:"center"}}>{pass?"Hlošina přežívá":"Dlouhé mrazení"}</Title><p style={{fontFamily:sansInk,fontSize:14,fontWeight:"bold",color:C.inkFaded,lineHeight:1.8,maxWidth:440,margin:"0 auto 18px"}}>{pass?"Zásoby vydržely. Myši se tulily v teple a když přišlo první tání, stále tu byly — zpívaly, hádaly se a plánovaly jaro.":"Navzdory jejich statečnosti přišel mráz příliš brzy. Ale někde pod kořeny začínají malé tlapky znovu hýbat..."}</p><WinterCheck s={s}/><div style={{marginTop:18,marginBottom:18}}><Label style={{marginBottom:8}}>PŘÍBĚHY MYŠÍ</Label>{s.mice.filter(m=>(m.history||[]).length>0).map(m=>(<div key={m.id} style={{fontFamily:sansInk,fontSize:13,color:C.inkFaded,marginBottom:4}}><strong>{m.name}:</strong> {m.history.join(" · ")}</div>))}</div><InkBtn onClick={onRestart} style={{marginTop:4,padding:"13px 34px",fontSize:15}}>Začít znovu</InkBtn></div>);}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App(){
  const[s,setS]=useState(()=>initState());const[tab,setTab]=useState("overview");const[screen,setScreen]=useState("loading");const[hasSave,setHasSave]=useState(false);const[saveStatus,setSaveStatus]=useState("");const[selectedHex,setSelectedHex]=useState(null);
  const[showHelp,setShowHelp]=useState(false);

  useEffect(()=>{let cancelled=false;loadGame().then(d=>{if(!cancelled){setHasSave(!!d);setScreen(prev=>prev==="loading"?"menu":prev);}}).catch(()=>{if(!cancelled)setScreen(prev=>prev==="loading"?"menu":prev);});const fb=setTimeout(()=>{if(!cancelled)setScreen(prev=>prev==="loading"?"menu":prev);},3000);return()=>{cancelled=true;clearTimeout(fb);};},[]);
  useEffect(()=>{if(screen!=="game")return;saveGame(s);setSaveStatus("uloženo");const t=setTimeout(()=>setSaveStatus(""),2200);return()=>clearTimeout(t);},[s,screen]);

  function startNew(){deleteSave();setS(initState());setHasSave(false);setTab("overview");setSelectedHex(null);setScreen("intro");}
  function continueGame(){loadGame().then(d=>{if(d){setS(d);setSaveStatus("načteno");setScreen("game");}});}
  function returnToMenu(){setScreen("menu");setHasSave(true);}

  const availActions=ACTIONS.filter(a=>!(a.id==="craft"&&!hasBldg(s,"workshop")));
  const mouseOnExpeditionIds=new Set(s.mice.filter(m=>m.onExpedition).map(m=>m.id));

  function assign(mid,act){if(s.phase!=="assign")return;const m=s.mice.find(x=>x.id===mid);if(!m)return;if(m.injured&&act!=="rest")return;if(s.blockedMouse===mid)return;setS(p=>({...p,assignments:{...p.assignments,[mid]:act}}));}
  function setQueue(id){setS(p=>({...p,buildQueue:id}));}
  function setCraftQueue(id){setS(p=>({...p,craftQueue:p.craftQueue===id?null:id}));}
  function sendExpedition(exp,mouseIds){setS(p=>{
    let ns={...p};
    // Strhni zásoby
    ns.food=clamp(ns.food-exp.cost.food,0,ns.foodCap);
    ns.wood=clamp(ns.wood-exp.cost.wood,0,ns.woodCap);
    ns.mats=clamp(ns.mats-exp.cost.mats,0,ns.matsCap);
    // Označ myši jako na výpravě
    ns.mice=ns.mice.map(m=>mouseIds.includes(m.id)?{...m,onExpedition:true}:m);
    // Přidej aktivní výpravu
    ns.activeExpeditions=[...(ns.activeExpeditions||[]),{expId:exp.id,mouseIds,turnsLeft:exp.turns}];
    ns.expeditionChoices=[];
    ns.log=[...ns.log,{t:ns.turn,good:true,title:`Výprava: ${exp.name}`,msg:`Výprava "${exp.name}" vyslána. Vrátí se za ${exp.turns} tahů.`,lore:exp.lore}];
    return ns;
  });}
  function endTurn(){if(s.phase==="assign")setS(p=>processTurn(p));}

  function resolveStory(choice){
    setS(p=>{
      const story=p.pendingStory;
      if(!story)return p;
      // Najdi cílovou stránku
      const nextPageId=choice.next;
      if(nextPageId==="end"){
        // Aplikuj efekt a zavři
        let ns=choice.effect?choice.effect({...p}):p;
        ns={...ns,pendingStory:null,storyPage:null,phase:"assign"};
        return checkNextPhase(ns);
      }
      // Přejdi na další stránku
      const nextPage=story.pages.find(pg=>pg.id===nextPageId);
      if(!nextPage)return checkNextPhase({...p,pendingStory:null,storyPage:null,phase:"assign"});
      return{...p,storyPage:nextPage};
    });
  }
  function resolveWinterPhase(choice){setS(p=>{
    const phase=p.pendingWinter;
    let ns=choice.effect({...p,pendingWinter:null,phase:"assign"});
    // Zimní pohodlí drain
    if(phase?.comfortDrain){ns={...ns,comfortPts:Math.max(0,(ns.comfortPts||0)-phase.comfortDrain)};}
    ns.log=[...ns.log,{t:p.turn,good:false,title:phase?.name??"Zima",msg:choice.label,lore:choice.lore||""}];
    return checkNextPhase(ns);
  });}
  function resolveThreatEvent(choice){setS(p=>{const ns=choice.effect({...p,pendingThreatEvent:null,phase:"assign"});const lore=choice.lore||"";return checkNextPhase({...ns,log:[...ns.log,{t:p.turn,good:ns.threat<p.threat,title:p.pendingThreatEvent?.title??"Hrozba",msg:choice.label,lore}]});});}

  function resolveExplore(enter){setS(p=>{let ns={...p};const{loc}=ns.pendingExplore;ns.exploredLocs=[...new Set([...(ns.exploredLocs||[]),loc.id])];let resultOutcome,retreated=false;if(enter){const outcomes=Array.isArray(loc.outcomes)?loc.outcomes:(loc.outcomes?.calm||[]);if(outcomes.length){const out=pickWeighted(outcomes,ns);ns=applyOutcome(ns,out);const isFluff=out.type==="fluff";ns.log=[...ns.log,{t:p.turn-1,msg:`${loc.name}: ${out.title}`,good:!isFluff&&out.type==="good",fluff:isFluff,title:out.title,lore:out.lore}];resultOutcome=out;}}else{retreated=true;const safeText=(typeof loc.safe==="string"?loc.safe:loc.safe?.calm)||"Vaši průzkumníci se bezpečně stáhli.";ns.log=[...ns.log,{t:p.turn-1,msg:`Zvědové se stáhli z ${loc.name}.`,good:true,title:`Ústup: ${loc.name}`,lore:safeText}];resultOutcome={type:"good",title:`Ústup: ${loc.name}`,lore:safeText,food:0,wood:0,mats:0,morale:0,threat:0};}ns.pendingExplore=null;ns.pendingResult={locName:loc.name,outcome:resultOutcome,retreated};ns.phase="result";return ns;});}
  function dismissResult(){setS(p=>checkNextPhase({...p,pendingResult:null}));}

  function resolveEvent(){setS(p=>{let ns=p.pendingEvent?Effects.fromData(p.pendingEvent)({...p}):{...p};if(p.pendingEvent){if(p.pendingEvent.special==="injure")ns=injureRandom(ns);if(p.pendingEvent.special==="comfort"&&p.pendingEvent.comfortBonus){const prev=ns.comfortPts||0;ns={...ns,comfortPts:prev+(p.pendingEvent.comfortBonus||0)};const newLvl=getComfortLevel(ns.comfortPts);const prevLvl=getComfortLevel(prev);if(newLvl.level>prevLvl.level){ns.log=[...ns.log,{t:p.turn-1,msg:`Nora postoupila: ${newLvl.name}!`,good:true,title:newLvl.name,lore:newLvl.desc}];}}ns.log=[...ns.log,{t:p.turn-1,msg:p.pendingEvent.short,good:p.pendingEvent.type==="good",title:p.pendingEvent.title,lore:p.pendingEvent.lore}];}ns.pendingEvent=null;if(ns.turn%10===1&&ns.turn>1){ns.policyChoices=POLICIES.filter(pl=>!ns.policies.includes(pl.id)).sort(()=>Math.random()-0.5).slice(0,3);ns.phase="policy";}else if(ns.turn>ns.maxTurns)ns.phase="gameover";else ns.phase="assign";return ns;});}

  function choosePolicy(pol){setS(p=>{let ns=applyPolicyImmediate({...p,policies:[...p.policies,pol.id],phase:"assign",policyChoices:[]},pol);ns.log=[...ns.log,{t:ns.turn,msg:`Politika: "${pol.name}"`,good:true,title:pol.name,lore:pol.flavor}];return ns;});}

  if(screen==="loading")return<div style={{background:C.parchment,minHeight:300,display:"flex",alignItems:"center",justifyContent:"center"}}><Label style={{fontSize:14}}>Kontrola nory...</Label></div>;
  if(screen==="intro")return<IntroScreen onContinue={()=>setScreen("game")}/>;
  if(screen==="menu")return(<div style={{background:C.parchment,minHeight:400}}><HeaderSVG/><div style={{padding:"1.5rem 1rem",textAlign:"center"}}><Body style={{fontSize:16,marginBottom:26,lineHeight:2.0}}>Svět je obrovský a na myše mu nezáleží.<br/>Ale myším na sobě záleží.</Body><div style={{display:"flex",flexDirection:"column",gap:11,maxWidth:340,margin:"0 auto 22px"}}>{hasSave&&<InkBtn onClick={continueGame} style={{padding:"15px",fontSize:15,width:"100%",boxShadow:`3px 3px 0 ${C.ink}`}}>❧ Pokračovat v uložené hře</InkBtn>}<InkBtn onClick={startNew} style={{padding:"15px",fontSize:15,width:"100%",background:hasSave?C.parchmentDark:C.parchment,boxShadow:`3px 3px 0 ${C.ink}`}}>{hasSave?"⊞ Nová hra (přepíše uloženou)":"⊞ Začít — Nová vesnice"}</InkBtn></div>{hasSave&&<SavePreview/>}<Label style={{marginTop:22,fontSize:11,color:C.inkGhost}}>Pokrok se automaticky ukládá každý tah.</Label></div></div>);
  if(s.phase==="gameover")return<div style={{background:C.parchment,minHeight:400}}><GameOver s={s} onRestart={()=>{deleteSave();setHasSave(false);setScreen("menu");setS(initState());}}/></div>;

  return(<div style={{background:C.parchment,padding:"0 0 1.5rem",color:C.ink}}>
    <HeaderSVG/>
    <div style={{padding:"0 12px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
        <button onClick={returnToMenu} style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",background:"none",border:"none",color:C.inkFaded,cursor:"pointer",padding:0}}>← Nabídka</button>
        <div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:saveStatus==="uloženo"?C.green:saveStatus==="načteno"?C.gold:"transparent",transition:"color 0.4s"}}>{saveStatus==="uloženo"?"✓ uloženo":saveStatus==="načteno"?"✓ načteno":"-"}</div>
      </div>
      <div style={{marginBottom:11,padding:"10px 14px",background:C.parchmentDark,border:`2.5px solid ${C.ink}`,boxShadow:`3px 3px 0 ${C.ink}`}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><Label>POSTUP SEZÓNY</Label><Label>TAH {s.turn} / {s.maxTurns}</Label></div>
        <div style={{height:10,background:C.stain,border:`1.5px solid ${C.ink}`,position:"relative"}}>
          <div style={{position:"absolute",top:0,left:0,height:"100%",width:`${(s.turn-1)/s.maxTurns*100}%`,background:s.turn<=15?C.green:s.turn<=30?C.gold:C.red,transition:"width 0.5s"}}/>
          <div style={{position:"absolute",top:"50%",left:"30%",width:"1.5px",height:"100%",background:C.inkFaded,opacity:0.4,transform:"translateY(-50%)"}}/>
          <div style={{position:"absolute",top:"50%",left:"60%",width:"1.5px",height:"100%",background:C.inkFaded,opacity:0.4,transform:"translateY(-50%)"}}/>
          <div style={{position:"absolute",top:"-5px",right:-2,fontFamily:sansInk,fontSize:18}}>❄</div>
        </div>
      </div>
      {/* Zimní fáze banner */}
      {(()=>{const aw=getActiveWinter(s.turn);if(!aw)return null;return(<div style={{marginBottom:8,padding:"8px 14px",background:aw.bgColor,border:`2px solid ${aw.color}`,display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:20}}>{aw.icon}</span>
        <div style={{flex:1}}>
          <div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",color:aw.color,letterSpacing:"0.08em"}}>{aw.name.toUpperCase()}</div>
          <div style={{fontFamily:sansInk,fontSize:10,color:"#2a3a5a",marginTop:2}}>
            {aw.forageMulti<1&&<span style={{marginRight:10}}>⁂ sběr ×{aw.forageMulti}</span>}
            {aw.buildPenalty>=99&&<span style={{marginRight:10}}>⌂ stavba blokována</span>}
            {aw.foodDrain>0&&<span style={{marginRight:10}}>−{aw.foodDrain} jídla/tah</span>}
            {aw.id==="freeze"&&s.warmthTurns<s.turn&&<span>morálka −5/tah</span>}
          </div>
        </div>
      </div>);})()}
      {/* Počasí */}
      <WeatherWidget s={s}/>
      {/* Pohodlí indikátor */}
      {(()=>{const cl=getComfortLevel(s.comfortPts||0);const next=getNextComfortThreshold(s.comfortPts||0);const pct=next?Math.min(100,((s.comfortPts||0)-COMFORT_THRESHOLDS[cl.level])/(next.threshold-COMFORT_THRESHOLDS[cl.level])*100):100;return(<div style={{marginBottom:8,padding:"7px 12px",background:cl.level>0?"#fdf8ec":C.parchmentDark,border:`2px solid ${cl.level>0?C.gold:C.stain}`,display:"flex",alignItems:"center",gap:10,cursor:"default"}}><span style={{fontSize:16}}>{cl.icon}</span><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><Label style={{fontSize:11,color:cl.level>0?C.gold:C.inkFaded}}>{cl.name.toUpperCase()}</Label><Label style={{fontSize:11}}>{s.comfortPts||0}{next?`/${next.threshold}`:""} ✦</Label></div><div style={{height:5,background:C.stain}}><div style={{height:"100%",width:`${pct}%`,background:cl.level>0?C.gold:C.inkFaded,transition:"width 0.5s"}}/></div></div></div>);})()}
      <ResourceBar s={s}/>
      {(s.blockedTurns>s.turn||s.curfew>s.turn||s.builderBlocked>s.turn||s.blockedMouse)&&(<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        {s.blockedTurns>s.turn&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",padding:"4px 10px",background:C.red,color:C.parchment}}>⊠ ZAZDĚNO — ven nelze ({s.blockedTurns-s.turn} tahů)</div>}
        {s.curfew>s.turn&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",padding:"4px 10px",background:C.inkFaded,color:C.parchment}}>☽ ZÁKAZ VYCHÁZENÍ ({s.curfew-s.turn} tahů)</div>}
        {s.builderBlocked>s.turn&&<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",padding:"4px 10px",background:C.gold,color:C.ink}}>⌂ STAVBA ZPOŽDĚNA ({s.builderBlocked-s.turn} tahů)</div>}
        {s.blockedMouse&&(()=>{const bm=s.mice.find(m=>m.id===s.blockedMouse);return bm?(<div style={{fontFamily:sansInk,fontSize:11,fontWeight:"bold",padding:"4px 10px",background:C.parchmentDark,color:C.red,border:`1.5px solid ${C.red}`}}>~ {bm.name} paralyzována strachem</div>):null;})()}
      </div>)}
      <div style={{marginBottom:12}}><Label style={{marginBottom:6}}>PŘIPRAVENOST NA ZIMU</Label><WinterCheck s={s}/></div>
      <div style={{display:"flex",gap:5,marginBottom:11,alignItems:"center"}}>
        {[["overview","Vesnice"],["mice","Myši"],["build","Stavby"],["expeditions","Výpravy"],["map","Mapa"]].map(([id,lbl])=>(<InkBtn key={id} active={tab===id} onClick={()=>setTab(id)} style={{fontSize:12,flex:1,textAlign:"center",padding:"8px 2px"}}>{lbl}</InkBtn>))}
        <button onClick={()=>setShowHelp(true)} style={{fontFamily:sansInk,fontSize:14,fontWeight:"bold",background:C.parchmentDark,border:`2px solid ${C.ink}`,boxShadow:`2px 2px 0 ${C.ink}`,width:38,height:38,cursor:"pointer",flexShrink:0,color:C.inkFaded}}>?</button>
      </div>
      {tab==="overview"&&<VillageOverviewTab s={s}/>}
      {tab==="mice" &&<VillageTab s={s} availActions={availActions} assign={assign}/>}
      {tab==="build"&&<BuildTab   s={s} onQueue={setQueue} onQueueCraft={setCraftQueue}/>}
      {tab==="expeditions"&&<ExpeditionTab s={s} onSendExpedition={sendExpedition} onDismissChoices={()=>setS(p=>({...p,expeditionChoices:[]}))}/>}
      {tab==="map"  &&<MapTab     s={s} selectedHex={selectedHex} setSelectedHex={setSelectedHex}/>}
      {showHelp&&<HelpModal onClose={()=>setShowHelp(false)}/>}
      {s.phase==="assign"&&(<InkBtn onClick={endTurn} style={{width:"100%",marginTop:12,padding:"14px",fontSize:14,boxShadow:`4px 4px 0 ${C.ink}`}}>❧ Ukončit tah {s.turn} — nechte sezónu plynout ❧</InkBtn>)}
    </div>
    {s.phase==="story"&&s.pendingStory&&(
      s.storyPage?.choices
        ?<StoryModal s={s} onChoice={resolveStory} onNext={()=>{}}/>
        :<ArtModal wide>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16,paddingBottom:12,borderBottom:`2px solid ${C.stain}`}}>
            <div style={{fontFamily:sansInk,fontSize:9,fontWeight:"bold",letterSpacing:"0.2em",color:C.inkGhost}}>{s.pendingStory.source==="character"?"— PŘÍBĚH Z NORY —":"— PŘÍBĚH ZE SVĚTA —"}</div>
            <div style={{fontFamily:inkFont,fontSize:20,fontWeight:"bold",fontStyle:"italic",color:C.ink,flex:1,textAlign:"center"}}>{s.pendingStory.title}</div>
          </div>
          <div style={{fontFamily:inkFont,fontSize:15,color:C.inkLight,lineHeight:2.1,fontStyle:"italic",marginBottom:20,padding:"16px 18px",background:"#faf6ee",border:`1.5px solid ${C.stain}`,borderLeft:`5px solid ${C.gold}`,whiteSpace:"pre-line"}}>{s.pendingStory.opening}</div>
          <InkBtn onClick={()=>setS(p=>({...p,storyPage:p.pendingStory.pages[0]}))} style={{width:"100%",padding:"13px",fontSize:14}}>— číst dál —</InkBtn>
        </ArtModal>
    )}
    {s.phase==="winter_phase"&&s.pendingWinter&&<WinterPhaseModal phase={s.pendingWinter} s={s} onChoice={resolveWinterPhase}/>}
    {s.phase==="threat_event"&&s.pendingThreatEvent&&<ThreatEventModal event={s.pendingThreatEvent} onChoice={resolveThreatEvent}/>}
    {s.phase==="explore"&&s.pendingExplore&&<ExploreModal pendingExplore={s.pendingExplore} onEnter={()=>resolveExplore(true)} onRetreat={()=>resolveExplore(false)} s={s}/>}
    {s.phase==="result"&&s.pendingResult&&<ExploreResultModal pendingResult={s.pendingResult} onContinue={dismissResult}/>}
    {s.phase==="event"&&s.pendingEvent&&(<Modal><Label style={{marginBottom:6}}>{s.pendingEvent.type==="good"?"— ŠTĚSTÍ —":"— ZLÉ ZNAMENÍ —"}</Label><Title size={20} style={{marginBottom:12}}>{s.pendingEvent.title}</Title><div style={{marginBottom:14,padding:"10px 14px",background:s.pendingEvent.type==="good"?"#e8f0e0":"#f0e0e0",border:`2px solid ${s.pendingEvent.type==="good"?C.green:C.red}`}}><span style={{fontFamily:sansInk,fontSize:15,fontWeight:"bold",color:s.pendingEvent.type==="good"?C.green:C.red}}>{s.pendingEvent.type==="good"?"✓":"✗"} {s.pendingEvent.short}</span></div><Body style={{marginBottom:20}}>{s.pendingEvent.lore}</Body><InkBtn onClick={resolveEvent} style={{width:"100%",padding:"13px",fontSize:14}}>— Tak to chodí —</InkBtn></Modal>)}
    {s.phase==="policy"&&(<Modal><Label style={{marginBottom:5}}>— RADA VESNICE —</Label><Title size={20} style={{marginBottom:7}}>Zvolte opatření</Title><Body style={{marginBottom:16}}>Starší se shromáždí pod velkým kořenem. Na mech jsou položeny tři návrhy.</Body><div style={{display:"flex",flexDirection:"column",gap:10}}>{s.policyChoices.map(pol=>(<div key={pol.id} onClick={()=>choosePolicy(pol)} style={{border:`2.5px solid ${C.ink}`,padding:"13px 15px",cursor:"pointer",background:C.parchment,boxShadow:`2px 2px 0 ${C.ink}`}} onMouseEnter={e=>e.currentTarget.style.background=C.parchmentDark} onMouseLeave={e=>e.currentTarget.style.background=C.parchment}><Title size={16} style={{marginBottom:5}}>{pol.name}</Title><Body style={{marginBottom:8,fontSize:13}}>{pol.flavor}</Body><div style={{display:"flex",gap:14,fontFamily:sansInk,fontSize:13,fontWeight:"bold",flexWrap:"wrap"}}><span style={{color:C.green}}>+ {pol.pos}</span><span style={{color:C.red}}>– {pol.neg}</span></div></div>))}</div></Modal>)}
  </div>);}