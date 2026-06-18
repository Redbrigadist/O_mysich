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
    return { ...m, fullName:ld.fullName??m.name, lore:ld.text??"", agingPerk:m.agingPerk??null, actionTurns:m.actionTurns??0, epithet:m.epithet??null};
  });
}
const loadGame = async () => {
  try {
    const r = await window.storage.get(SAVE_KEY);
    if (r?.value) { const d = JSON.parse(r.value); return { ...d, mice:migrateMice(d.mice) }; }
  } catch(e) {}
  return null;
};

// ── Data: Rysy, Akce, Politiky ────────────────────────────────────────────────
const MOUSE_NAMES = ["Lopuch","Jetel","Ostružina","Kopřiva","Sítina","Žaluď","Kapradí","Bodlák","Mech","Líska","Rákos","Šťovík","Střízlík","Cvrček","Dlažba","Žár","Popel","Křemen","Hloh","Řebříček","Jalovec","Oříšek","Bodlínek","Rákosník","Kamínek","Janovec","Rosa","Len","Kaštan"];
const TRAITS = [
  {id:"brave",   label:"Statečná",      glyph:"⚔", desc:"Snižuje hrozbu při průzkumu."},
  {id:"green",   label:"Zelená tlapka", glyph:"☘", desc:"Sběrači přinášejí +1 jídlo/tah."},
  {id:"stocky",  label:"Robustní",      glyph:"⚒", desc:"Nosiči přinášejí +1 dřevo/tah."},
  {id:"clever",  label:"Chytrá",        glyph:"✦", desc:"Staví rychleji."},
  {id:"nervous", label:"Ustrašená",     glyph:"~", desc:"Postih při průzkumu."},
  {id:"cheerful",label:"Veselá",        glyph:"♪", desc:"Morálka +0.5 pasivně každý tah."},
  {id:"greedy",  label:"Hladová",       glyph:"$", desc:"Spotřebuje více jídla."},
  {id:"careful", label:"Pečlivá",       glyph:"◎", desc:"Spolehlivá stavařka."},
  {id:"swift",   label:"Hbitá",         glyph:"→", desc:"Snížení hrozby při průzkumu zdvojnásobeno."},
  {id:"forager", label:"Rozená sběračka",glyph:"⁂",desc:"Sběr přináší +1.5 jídla/tah."},
];
const ACTIONS = [
  {id:"forage", label:"Sbírat jídlo",  glyph:"⁂", desc:"Shánět jídlo. Zelená tlapka a Rozená sběračka vynikají."},
  {id:"haul",   label:"Nosit dřevo",   glyph:"⊞", desc:"Shánět dřevo. Robustní myši toho unesou víc."},
  {id:"gather", label:"Shánět zásoby", glyph:"◈", desc:"Sbírat drobný materiál z okrajů zahrady."},
  {id:"build",  label:"Stavět",        glyph:"⌂", desc:"Pracovat na zařazené stavbě."},
  {id:"explore",label:"Průzkum",       glyph:"◎", desc:"Stopovat svět. Odhaluje hexagonální mapu."},
  {id:"rest",   label:"Odpočívat",     glyph:"☽", desc:"Obnovit morálku a léčit zranění."},
  {id:"watch",  label:"Noční hlídka",  glyph:"◉", desc:"Snížit hrozbu."},
  {id:"craft",  label:"Vyrábět",       glyph:"⚒", desc:"Vyžaduje Proutěnou dílnu. Přeměňuje zásoby na jídlo a dřevo."},
];
const POLICIES = [
  {id:"harvest_fest", name:"Sklizňový svátek",       pos:"Morálka +15, sběrači +1",              neg:"Stojí 5 jídla",                  flavor:"Celá vesnice tančí kolem hromady žaludů až do svítání."},
  {id:"strict_ration",name:"Přídělové hospodářství", pos:"Spotřeba jídla -2/tah",                neg:"Morálka -10",                     flavor:"Půl semínka k večeři. Každý počítá dny."},
  {id:"forager_guild",name:"Cech sběračů",           pos:"Sběrači +1 výstup",                    neg:"Stavitelé -1",                    flavor:"Červená žaludová čepička označuje ty, kdo se vydávají za kořeny."},
  {id:"night_watch",  name:"Výnos noční hlídky",     pos:"Hrozba -2/tah",                        neg:"Jedna myš vždy na hlídce",        flavor:"Dva malé oči ve tmě střeží zahradní zeď."},
  {id:"open_burrow",  name:"Otevřená nora",           pos:"Morálka +10, více příchozích",         neg:"Hrozba +1/tah",                   flavor:"Nech dveře pootevřené. Tam venku jsou ještě jiní."},
  {id:"deep_roots",   name:"Hluboké kořeny",          pos:"Zásoby +1/tah, kapacita skladu +10",   neg:"Žádné nové budovy",               flavor:"Kopej hlouběji, než začneš stavět výš."},
  {id:"communal",     name:"Společná spíž",           pos:"Spotřeba jídla -1/tah, morálka +5",   neg:"Hladové myši jsou postiženy",     flavor:"Starý Mech křídou zaznamenává každé semínko."},
  {id:"scouts",       name:"Udatní průzkumníci",      pos:"Bonus hrozby při průzkumu zdvojnásoben",neg:"Průzkumníci riskují 10% zranění", flavor:"Vydávají se sami, jen s náprstkovitou čapkou a statečným srdcem."},
  {id:"stone_law",    name:"Kamenný zákon",           pos:"Žádná zraněná myš nepracuje",         neg:"Morálka -5 při každém zranění",   flavor:"Tři rýhy v kameni: zraněná myš nepracuje."},
  {id:"harvest_moon", name:"Vigílie žňového měsíce",  pos:"Morálka +8 při návratu myši",         neg:"Hrozba +0.5/tah",                 flavor:"Každý návrat je hlasitě slavený — a přitahuje pozornost."},
];

// ── Stárnutí myší ─────────────────────────────────────────────────────────────
const AGING_PERKS = [
  {id:"veteran_scout",  label:"Zkušená průzkumnice",  glyph:"◎",type:"good",  desc:"Průzkum snižuje hrozbu o 1 navíc.",            lore:"Pamatuje si každou stopu. Každý stín. Ví, kdy ustoupit."},
  {id:"master_forager", label:"Mistryně sběru",        glyph:"⁂",type:"good",  desc:"Sběr jídla +1.5 nad normál.",                  lore:"Ví, kde roste co, i když tam ještě nebyla. Nos ji nezklame."},
  {id:"steady_builder", label:"Spolehlivá stavitelka", glyph:"⌂",type:"good",  desc:"Dokončení stavby +4 morálky navíc.",           lore:"Stavěla tolik, že ruce dělají správné věci automaticky."},
  {id:"calm_presence",  label:"Klidná přítomnost",    glyph:"♡",type:"good",  desc:"Pasivně +1 morálky/tah pro celou vesnici.",   lore:"Nikdo si nepamatuje, kdy přestala být nová."},
  {id:"iron_stomach",   label:"Železný žaludek",      glyph:"⊞",type:"good",  desc:"Spotřeba jídla -0.5 za tah.",                  lore:"Léta skromnosti ji naučila hospodařit s tím, co má."},
  {id:"night_eyes",     label:"Noční oči",             glyph:"◉",type:"good",  desc:"Noční hlídka snižuje hrozbu o 1 navíc.",      lore:"Vidí ve tmě to, co jiní neslyší ani přes den."},
  {id:"keeper_of_lore", label:"Strážkyně příběhů",    glyph:"✦",type:"good",  desc:"Každá aktivní politika dává +0.5 morálky/tah.",lore:"Pamatuje si každé rozhodnutí. Každou zimu."},
  {id:"old_bones",      label:"Staré kosti",           glyph:"~",type:"bad",   desc:"Při zranění léčení trvá o 1 tah déle.",       lore:"Rány se hojí. Jen pomaleji než dřív."},
  {id:"set_in_ways",    label:"Zvyklá na své",         glyph:"$",type:"bad",   desc:"Průzkum: -0.5 výnosu.",                        lore:"Zahrada je jiná každý rok. Ona méně."},
  {id:"heavy_sleeper",  label:"Tvrdý spánek",          glyph:"☽",type:"bad",   desc:"Odpočinek léčí pomalejší — potřebuje 2 tahy.",lore:"Spí jako kámen. Vstává jako kámen."},
  {id:"loud_joints",    label:"Hlučné klouby",         glyph:"!",type:"bad",   desc:"Průzkum přidá +0.5 hrozby.",                   lore:"Skřípání ve tmě. Předátoři slyší co slyší."},
  {id:"forgetful",      label:"Zapomnětlivá",          glyph:"?",type:"bad",   desc:"Jednou za 5 tahů přiřazená akce selže.",      lore:"Víš, že sis něco pamatovala. Jen ne co."},
];
function getRandomAgingPerk(existingTrait){const available=AGING_PERKS.filter(p=>p.id!==existingTrait);return available[Math.floor(Math.random()*available.length)];}

// ── Přídomky myší ─────────────────────────────────────────────────────────────
const EPITHETS = {
  veteran_scout:   ["Tichá Tlapka","Která Viděla Vše","Nočního Oka","Stezky Znalá","Přes Stín"],
  master_forager:  ["Plné Brašny","Zem Cítící","Nositelka Úrody","Kořenů Znalá","Semínek Pastýřka"],
  steady_builder:  ["Pevné Ruky","Kamene Duch","Která Staví","Nezdolná","Zdi Stavitelka"],
  calm_presence:   ["Tichého Ohně","Srdce Nory","Usmiřující","Klidu Hlas","Která Koliduje"],
  iron_stomach:    ["Hladovou Noc","Mrazivé Zimy","Skromná","Která Nevzdá","Odolná"],
  night_eyes:      ["Noční Hlídka","Ve Tmě Vidoucí","Bdělá","Stínů Strážkyně","Noci Hlídačka"],
  keeper_of_lore:  ["Příběhů Strážkyně","Paměti Nory","Která Pamatuje","Moudrá","Dávných Dob"],
  old_bones:       ["Starých Kostí","Pomalu Kráčející","Která Vytrvá","Unavená Ale Věrná","Stará Zkušenost"],
  set_in_ways:     ["Svých Cest","Neměnná","Starého Řádu","Která Zůstala","Zvyklostí Vězneň"],
  heavy_sleeper:   ["Snů Plná","Hluboce Spící","Která Sní","Pomalého Úsvitu","Měkkého Lůžka"],
  loud_joints:     ["Skřípající","Která Prozradí","Hlasitá Ve Tmě","Veselé Klouby","Jara Zvuk"],
  forgetful:       ["Zapomnětlivá","Myšlenky Ztracené","Která Hledá","Kde To Bylo","Lehká Hlavy"],
  survived_cat:    ["Která Přežila Kočku","Stínu Unikla","Kočce Navzdory","Rychlonožka","Velké Kočky Přemazaná"],
  survived_siege:  ["Obležení Přeživší","Za Zdí Zkušená","Která Vydržela","Pevná Ve Víře","Krysy Nezvratná"],
  survived_owl:    ["Sovy Unikla","Pod Křídly Přežila","Měsíce Dítě","Stín Přečkala","Noční Krizí Otužená"],
  survived_fox:    ["Lišce Navzdory","Chytrost Přemohla","Úskoky Kalená","Vychytralá","Rudé Lišky Přemazaná"],
  survived_injury: ["Zjizvená","Hojení Znalá","Která Se Vrátila","Bolem Kalená","Jizvy Nesoucí"],
  returned_lost:   ["Která Se Vrátila","Ztracená A Nalezená","Cest Znalá","Věrná","Ze Stínu Vzešlá"],
  many_explores:   ["Dálky Znalá","Zahrady Průzkumnice","Obzoru Hledačka","Stezek Mistrová","Za Horizont"],
  first_builder:   ["Která Postavila","Nositelka Stavby","Počátků Tvůrkyně","První Dláto","Základu Kladkyně"],
  winter_survival: ["Zimy Přeživší","Ledu Kalená","Mrazů Vítězka","Která Vydržela Zimu","Sněhu Odolná"],
};
function getEpithet(occasion){const pool=EPITHETS[occasion];if(!pool)return null;return pool[Math.floor(Math.random()*pool.length)];}
function awardEpithet(mice,mouseId,occasion){return mice.map(m=>{if(m.id!==mouseId||m.epithet)return m;const ep=getEpithet(occasion);if(!ep)return m;return{...m,epithet:ep,fullName:`${m.name} ${ep}`,history:[...(m.history||[]),`Přídomek: ${ep}`]};});}

// ── Počasí ────────────────────────────────────────────────────────────────────
const WEATHER_TYPES = [
  {id:"sunny",      label:"Slunečno",     icon:"☀",duration:[2,4],foodMod:0.5, woodMod:0,  matsMod:0.5,moraleMod:0.3, threatMod:-0.3,desc:"Teplé světlo. Sběrači se vrátí dřív.",         lore:"Svět ve slunci vypadá zvladatelně."},
  {id:"cloudy",     label:"Zataženo",     icon:"☁",duration:[1,3],foodMod:0,   woodMod:0,  matsMod:0,  moraleMod:0,   threatMod:0,   desc:"Šedé nebe. Nic zvláštního.",                   lore:"Dny bez charakteru. Myši pracují stejně."},
  {id:"rainy",      label:"Déšť",         icon:"⛆",duration:[1,3],foodMod:-1,  woodMod:1,  matsMod:0,  moraleMod:-0.5,threatMod:-0.5,desc:"Sběr -1, dřevo +1. Predátoři se schovají.",   lore:"Déšť voní po zemi. Kočky nemají rády déšť."},
  {id:"windy",      label:"Větrno",       icon:"≋",duration:[1,2],foodMod:-0.5,woodMod:0,  matsMod:1,  moraleMod:-0.3,threatMod:0.3, desc:"Zásoby +1. Hluk maskuje pohyb predátorů.",     lore:"Vítr nosí zvuky odjinud. A maže stopy."},
  {id:"foggy",      label:"Mlha",         icon:"░",duration:[1,2],foodMod:0,   woodMod:0,  matsMod:0,  moraleMod:-0.5,threatMod:1,   desc:"Hrozba +1. V mlze nikdo nevidí nic.",          lore:"Mlha je rovná příležitost — pro myši i predátory."},
  {id:"frosty",     label:"Mrazivé ráno", icon:"❄",duration:[1,2],foodMod:-1,  woodMod:0,  matsMod:0,  moraleMod:-1,  threatMod:0.5, desc:"Jídlo -1. Zásoby tuhnou.",                     lore:"Tráva křupe. Dech viditelný. Vzduch bolí."},
  {id:"warm_spell", label:"Teplý závan",  icon:"✦",duration:[2,3],foodMod:1,   woodMod:0,  matsMod:0,  moraleMod:1,   threatMod:-0.5,desc:"Jídlo +1, morálka +1. Dar mimo sezónu.",       lore:"Jako by zima zaváhala. Každý to cítí."},
  {id:"storm",      label:"Bouřka",       icon:"⚡",duration:[1,2],foodMod:-2,  woodMod:2,  matsMod:0,  moraleMod:-2,  threatMod:-1,  desc:"Sběr -2, dřevo +2. Predátoři doma.",           lore:"Hrom. Déšť silný jako zeď. Potom ticho."},
];
function pickWeather(){return WEATHER_TYPES[Math.floor(Math.random()*WEATHER_TYPES.length)];}
function newWeatherDuration(w){const[mn,mx]=w.duration;return mn+Math.floor(Math.random()*(mx-mn+1));}

// ── Data: Budovy ──────────────────────────────────────────────────────────────
const STATIC_BUILDINGS = [
  {id:"granary",    name:"Kořenový sklep",    icon:"▣", cost:{wood:6,mats:4},  desc:"Kapacita jídla +30",             flavor:"Vyřezané myší dveřičky a lojová svíčka uvnitř.",                lore:"Dveře velikosti zápalné krabičky, vyřezané se spirálovým motivem. Uvnitř police z ubité hlíny, každá popsaná úhledným písmem. Pahýl loje hoří v uzávěru od láhve.", effect_type:"food_cap",   effect_value:30, built:false},
  {id:"workshop",   name:"Proutěná dílna",    icon:"⚒", cost:{wood:8,mats:6},  desc:"Odemkne akci Vyrábět",           flavor:"Piliny a vůně pryskyřice.",                                     lore:"Tři stěny z naskládaných větviček, podlaha pokrytá jemným prachem vonícím pryskyřicí. Hřebík s nástroji, každý obkreslený uhlím — takže na první pohled vidíte, co chybí.", effect_type:"unlock_craft",effect_value:1,  built:false},
  {id:"thornwall",  name:"Trnitá zeď",        icon:"⋈", cost:{wood:4,mats:8},  desc:"Hrozba -1 každý tah",            flavor:"Hloh a ostružiník, pevně proplétané.",                          lore:"Tkané dohromady po tři dny myšmi, jejichž tlapky krvácely ještě před koncem prvního. Krysy to nezkoušely. Liška prošla podél dvakrát a odešla.", effect_type:"threat_passive",effect_value:1, built:false},
  {id:"seedlib",    name:"Semenná knihovna",  icon:"▤", cost:{wood:6,mats:6},  desc:"Sběrači +1 jídlo každý",         flavor:"Drobné poličky, každé semínko popsáno pečlivým písmem.",        lore:"Dvanáct polic rozdělených do přihrádek ne větších než žaludová čepička. Každá odrůda popsána: jméno, sezóna nálezu, odhadovaná životaschopnost.", effect_type:"forage_bonus", effect_value:1, built:false},
  {id:"hearthstone",name:"Ohništní kámen",    icon:"△", cost:{wood:6,mats:4},  desc:"Morálka neklesne pod 20",        flavor:"Plochý teplý kámen v srdci nory.",                              lore:"Plochý kus dlažební kostky nesený domů dva dny čtyřmi myšmi. Sedí v srdci nory a drží teplo hodiny po zhasnutí svíčky.", effect_type:"morale_floor",effect_value:20, built:false},
  {id:"watchpost",  name:"Havraní hlídka",    icon:"◉", cost:{wood:8,mats:5},  desc:"Hlídka dává -3 hrozbu",          flavor:"Korková plošina ve vidlici stromu, slaněno lanem dolů.",        lore:"Z plošiny jasný výhled na zeď, odpadní rouru, krysí koutek a zahradní bránu. Myš na hlídce sedí s dekou a zazvoní malým zvonkem.", effect_type:"watch_bonus",effect_value:1.5,built:false},
  {id:"dryroom",    name:"Sušárna",           icon:"≋", cost:{wood:5,mats:7},  desc:"Kazení jídla -1/tah",            flavor:"Byliny visí na niti, vzduch vždy trochu teplý.",                lore:"Úzká komora vždy o něco teplejší, od podlahy po strop zavěšená nitěmi, z nichž visí houby, bobule a proužky zeleniny.", effect_type:"food_preserve",effect_value:1,built:false},
  {id:"burrowinn",  name:"Poutníkův koutek",  icon:"⌂", cost:{wood:7,mats:5},  desc:"Šance příchodu +20 %",           flavor:"Malý výklenek s čerstvě tkanou rohožkou a pahýlem svíčky.",    lore:"Dává najevo — beze slov — že někdo myslel na okamžik, kdy se unavená myš vrátí domů, a připravil se na něj.", effect_type:"arrival_bonus",effect_value:0.2,built:false},
  {id:"runepath",   name:"Runová stezka",     icon:"ᚱ", cost:{wood:4,mats:9},  desc:"Výsledky průzkumu o 10 % příznivější", flavor:"Kameny poškrábané starými znaky, od vchodu nory ven.", lore:"Zda fungují, je předmětem debaty. Průzkumníci sledující stezku hlásí, že se subjektivně cítí méně náchylní k chybám.", effect_type:"explore_luck",effect_value:0.1,built:false},
  {id:"icebox",     name:"Zimní úkryt",       icon:"❅", cost:{wood:9,mats:6},  desc:"Kapacita dřeva +20",             flavor:"Hluboká chladná komora obložená kůrou a mechem.",               lore:"Komora o dva stupně chladnější než zbytek nory. Dveře jsou kus plochého kamene na koženém závěsu. Vydávají zvuk jako zadržený dech.", effect_type:"wood_cap",effect_value:20,built:false},
];

// ── Pohodlí ───────────────────────────────────────────────────────────────────
const COMFORT_LEVELS = [
  {level:0, name:"Holá nora",    icon:"○", desc:"Jen holé stěny a chlad.",              moraleFloor:0,  foodBonus:0,   woodBonus:0, threatBonus:0},
  {level:1, name:"Skromná nora", icon:"◑", desc:"Pár útržků tkaniny. Trochu tepleji.",  moraleFloor:15, foodBonus:0.5, woodBonus:0, threatBonus:0},
  {level:2, name:"Útulná nora",  icon:"●", desc:"Svíčky, deky, vůně pryskyřice.",       moraleFloor:25, foodBonus:1,   woodBonus:0, threatBonus:-1},
  {level:3, name:"Hřejivá nora", icon:"★", desc:"Domov. Každá myš to cítí při návratu.",moraleFloor:35, foodBonus:1,   woodBonus:1, threatBonus:-1},
];
const COMFORT_THRESHOLDS = [0,10,25,50];
function getComfortLevel(pts){for(let i=COMFORT_THRESHOLDS.length-1;i>=0;i--){if(pts>=COMFORT_THRESHOLDS[i])return COMFORT_LEVELS[i];}return COMFORT_LEVELS[0];}
function getNextComfortThreshold(pts){for(let i=0;i<COMFORT_THRESHOLDS.length;i++){if(pts<COMFORT_THRESHOLDS[i])return{threshold:COMFORT_THRESHOLDS[i],level:COMFORT_LEVELS[i]};}return null;}

const CRAFT_ITEMS = [
  {id:"tallow_candle",  name:"Lojová svíčka",    icon:"🕯",comfort:3, cost:{food:0,wood:4,mats:6},  desc:"+3 pohodlí",          flavor:"Knot z nitě, lůj z kůže. Hoří čtyři hodiny a voní skoro jako domov.", req:null},
  {id:"scrap_blanket",  name:"Deka z útržků",    icon:"▦",comfort:5, cost:{food:0,wood:2,mats:10}, desc:"+5 pohodlí",          flavor:"Každý kousek jiné barvy. Dohromady teplé jako vzpomínka.", req:null},
  {id:"moss_cushion",   name:"Mechový polštář",  icon:"◉",comfort:4, cost:{food:0,wood:3,mats:8},  desc:"+4 pohodlí",          flavor:"Suchý mech sbíraný tři tahy. Při dotyku voní po lese.", req:null},
  {id:"herb_bundle",    name:"Svazek bylinek",   icon:"✿",comfort:3, cost:{food:4,wood:0,mats:5},  desc:"+3 pohodlí, mor +5",  flavor:"Levandule a máta svázané nití. Pověšené u vchodu.", req:null, morale:5},
  {id:"cork_lantern",   name:"Korková lucerna",  icon:"◈",comfort:6, cost:{food:0,wood:8,mats:8},  desc:"+6 pohodlí",          flavor:"Korkový váleček, kus průsvitné slídy, knot. Háže vzory na strop.", req:"workshop"},
  {id:"woven_mat",      name:"Tkaná rohožka",    icon:"▤",comfort:4, cost:{food:0,wood:5,mats:7},  desc:"+4 pohodlí",          flavor:"Průzkumníci přinesli zvlášť pěkné stéblo. Trvalo to týden.", req:null},
  {id:"acorn_bell",     name:"Žaludový zvoneček",icon:"◇",comfort:5, cost:{food:0,wood:6,mats:9},  desc:"+5 pohodlí, mor +8",  flavor:"Tři žaludy na niti. Zvoní, když jde vítr. Každá myš zná jeho hlas.", req:null, morale:8},
  {id:"pressed_flowers",name:"Lisované kvítí",   icon:"✦",comfort:4, cost:{food:3,wood:2,mats:6},  desc:"+4 pohodlí, mor +5",  flavor:"Přitlačené mezi dvě kůry. Barvu si drží lépe, než by kdokoli čekal.", req:null, morale:5},
  {id:"story_stone",    name:"Příběhový kámen",  icon:"⬡",comfort:7, cost:{food:0,wood:4,mats:12}, desc:"+7 pohodlí, mor +12", flavor:"Hladký oblázek popsaný tlapkou. Každý večer ho někdo vezme a začne vyprávět.", req:"workshop", morale:12},
  {id:"warm_nest",      name:"Teplé hnízdo",     icon:"⌂",comfort:8, cost:{food:5,wood:8,mats:10}, desc:"+8 pohodlí",          flavor:"Nejlepší materiály ze čtyř výprav. Kdo v něm jednou spal, nemůže spát jinak.", req:"workshop"},
];

// ── Data: Události ────────────────────────────────────────────────────────────
const STATIC_EVENTS = [
  {type:"good",title:"Převržená zavařenina",    short:"+12 jídla.",             lore:"Do rána sběrači vylízali každou kapku a přišli domů vonící jahodami.",food:12,wood:0,mats:0,morale:0,threat:0},
  {type:"good",title:"Slunečnicový dar",         short:"+8 jídla, +3 zásoby.",  lore:"Velká žlutá hlava dopadla jako vzdálený hrom.",food:8,wood:0,mats:3,morale:0,threat:0},
  {type:"good",title:"Klubko vlny",              short:"+6 dřeva, morálka +5.", lore:"Ostružina tvrdila, že to není krádež. Nora potřebovala izolaci víc.",food:0,wood:6,mats:0,morale:5,threat:0},
  {type:"good",title:"Teplý slunečný den",       short:"Morálka +10.",          lore:"Na jedno odpoledne si každá myš našla teplý pruh světla. Žaluď usnala na plochém kameni.",food:0,wood:0,mats:0,morale:10,threat:0},
  {type:"good",title:"Houbový kruh",             short:"+10 jídla.",            lore:"Rostou v dokonalém kruhu, jemuž starší říkají Čarodějnicin stůl. Uvnitř kruhu se nespí.",food:10,wood:0,mats:0,morale:0,threat:0},
  {type:"good",title:"Ztracená sbírka knoflíků", short:"+6 zásob, morálka +3.",lore:"Díra v soklu, nacpaná knoflíky a jednou čočkou, která celý svět zezlatila.",food:0,wood:0,mats:6,morale:3,threat:0},
  {type:"good",title:"Nález korku",              short:"+5 dřeva, +3 zásoby.", lore:"Vinná zátka se zastavila u vchodu do nory. Hustá a velká jako malá kůlna.",food:0,wood:5,mats:3,morale:0,threat:0},
  {type:"good",title:"Potulný kramář",           short:"+4 jídla, +4 zásoby.", lore:"Myš s vozíkem plným pozoruhodných věcí. Obchodovala férově a odešla dřív, než se kdokoli stihl zeptat.",food:4,wood:0,mats:4,morale:5,threat:0},
  {type:"good",title:"Déšť po suchu",            short:"+6 jídla, morálka +6.",lore:"Louka zezelenala přes noc. Sběrači se vrátili tak obtížení, že sotva šli.",food:6,wood:0,mats:0,morale:6,threat:0},
  {type:"good",title:"Spící kočka",              short:"Hrozba -3, morálka +4.",lore:"Velký predátor spí na slunci. Průzkumníci se volně pohybovali celé hodiny.",food:0,wood:0,mats:0,morale:4,threat:-3},
  {type:"good",title:"Přátelská žába",           short:"Hrozba -2, morálka +6.",lore:"Přišla za soumraku v kabátě z plstěného mechu a mluvila starým způsobem.",food:0,wood:0,mats:0,morale:6,threat:-2},
  {type:"good",title:"Žaludová lavina",          short:"+9 jídla.",             lore:"Veverka výše vyrušila svůj zimní zásobník. Myši níže se neptaly.",food:9,wood:0,mats:0,morale:3,threat:0},
  {type:"good",title:"Dlouhý klid",              short:"Morálka +8, hrozba -1.",lore:"Tři dny bylo v zahradě ticho. Cokoli zde loví, si dalo pauzu.",food:0,wood:0,mats:0,morale:8,threat:-1},
  {type:"good",title:"Starší vyprávějí příběhy", short:"Morálka +12.",          lore:"V tichý večer si nejstarší myš sedla u ohništního kamene a vyprávěla příběhy.",food:0,wood:0,mats:0,morale:12,threat:0},
  {type:"good",title:"Ježek prochází",           short:"Hrozba -3, morálka +5.",lore:"Prošel zahradou za soumraku s klidnou autoritou tvora bez přirozených nepřátel.",food:0,wood:0,mats:0,morale:5,threat:-3},
  {type:"good",title:"Hojný spad semen",         short:"+9 jídla.",             lore:"Krmítko pro ptáky výše prasklo. Semena všude. Ptáci byli zmatení. Myši ne.",food:9,wood:0,mats:0,morale:2,threat:0},
  {type:"bad", title:"Spatření kočky",          short:"Morálka -12, hrozba +3.",lore:"Ani se na ně nepodívala. Ale nikdo po zbytek dne nemluvil víc než šeptem.",food:0,wood:0,mats:0,morale:-12,threat:3},
  {type:"bad", title:"Plíseň v zásobách",       short:"Jídlo -8.",              lore:"Zelená a šedá, vonící starým deštěm. Jetel trochu plakala. Nikdo ji nevinil.",food:-8,wood:0,mats:0,morale:0,threat:0},
  {type:"bad", title:"Záplava deštěm",          short:"Zásoby -5, dřevo -3.",   lore:"Chladná tmavá voda před úsvitem. Zachránili, co mohli, při světle lucerny.",food:0,wood:-3,mats:-5,morale:0,threat:0},
  {type:"bad", title:"Stín sovy",               short:"Morálka -8, hrozba +2.", lore:"Chvíli byl měsíc jasný. Pak — tma a zvuk jako obrovských pomalých křídel.",food:0,wood:0,mats:0,morale:-8,threat:2},
  {type:"bad", title:"Krysí průzkumníci",       short:"Hrozba +3, morálka -5.", lore:"Sedm krys se záseky v uších podél zdi. Vchod nenašly. Ale přišly blízko.",food:0,wood:0,mats:0,morale:-5,threat:3},
  {type:"bad", title:"Houba ve dřevu",          short:"Dřevo -5, morálka -3.",  lore:"Zásoby dřeva napadeny. Bílá vlákna prorůstají pečlivě naskládanými poleny.",food:0,wood:-5,mats:0,morale:-3,threat:0},
  {type:"bad", title:"Liška u zdi",             short:"Hrozba +4, morálka -8.", lore:"Lišky jsou inteligentní způsobem, který myše hluboce znepokojuje.",food:0,wood:0,mats:0,morale:-8,threat:4},
  {type:"bad", title:"Náhlý mráz",              short:"Jídlo -4, morálka -5.",  lore:"Tři dny chladu, který přišel příliš brzy. Sběrači našli málo.",food:-4,wood:0,mats:0,morale:-5,threat:0},
  {type:"bad", title:"Vrána",                   short:"Hrozba +3, morálka -8.", lore:"Jedna vrána je nebezpečnější než pět krys. Je chytrá a viděla vchod do nory.",food:0,wood:0,mats:0,morale:-8,threat:3},
  {type:"bad", title:"Brouci loupí",            short:"Jídlo -6, zásoby -2.",   lore:"Přišli v noci v spořádaném sloupu, který prozrazoval mrazivý profesionalismus.",food:-6,wood:0,mats:-2,morale:0,threat:0},
  {type:"bad", title:"Zranění",                 short:"Jedna myš zraněna.",     lore:"Krátké zakvičení, pak ticho. Někdo přinesl náprstek se šípkovou mastičkou.",food:0,wood:0,mats:0,morale:-5,threat:0,special:"injure"},
  {type:"good",title:"Nález teplých kůží",      short:"Pohodlí +4, morálka +5.", lore:"Sbalené lidské ponožky za topením. Několik nocí velmi pohodlných.",food:0,wood:0,mats:0,morale:5,threat:0,special:"comfort",comfortBonus:4},
  {type:"good",title:"Nalezená svíčka",          short:"Pohodlí +3.",             lore:"Celá! Jen trochu ohnutá. Voní po medu a parafínu.",food:0,wood:0,mats:0,morale:3,threat:0,special:"comfort",comfortBonus:3},
  {type:"good",title:"Potulný řemeslník",        short:"Pohodlí +5, morálka +8.", lore:"Přišel s jehličkou a zbytky látky a za jeden den udělal z nory jiné místo.",food:0,wood:0,mats:0,morale:8,threat:0,special:"comfort",comfortBonus:5},
];

// ── Data: Krize (hrozba = 10) ─────────────────────────────────────────────────
const clamp = (v,mn,mx) => Math.min(mx,Math.max(mn,v));
const Effects = {
  food:   n=>s=>({...s,food:  clamp(s.food  +n,0,s.foodCap)}),
  wood:   n=>s=>({...s,wood:  clamp(s.wood  +n,0,s.woodCap)}),
  mats:   n=>s=>({...s,mats:  clamp(s.mats  +n,0,s.matsCap)}),
  morale: n=>s=>({...s,morale:clamp(s.morale+n,0,100)}),
  threat: n=>s=>({...s,threat:clamp(s.threat+n,0,10)}),
  compose:(...fns)=>s=>fns.reduce((a,f)=>f(a),s),
  fromData:d=>s=>{let ns=s;if(d.food)ns=Effects.food(d.food)(ns);if(d.wood)ns=Effects.wood(d.wood)(ns);if(d.mats)ns=Effects.mats(d.mats)(ns);if(d.morale)ns=Effects.morale(d.morale)(ns);if(d.threat)ns=Effects.threat(d.threat)(ns);return ns;},
};

function injureRandom(s, severity="minor") {
  const ok=s.mice.filter(m=>!m.injured&&!m.lost);if(!ok.length)return s;
  const t=ok[Math.floor(Math.random()*ok.length)];
  const pen=severity==="serious"?10:5;
  const injuryCount=(t.history||[]).filter(h=>h.includes("zranění")||h.includes("Zraněna")).length;
  // Po 2. zranění dostane přídomek "Zjizvená" pokud ho ještě nemá
  let mice=s.mice.map(m=>m.id===t.id?{...m,injured:true,history:[...(m.history||[]),severity==="serious"?"Těžce zraněna":"Utrpěla zranění"]}:m);
  if(injuryCount>=1&&!t.epithet){
    const ep=getEpithet("survived_injury");
    if(ep){const newFull=`${t.name} ${ep}`;mice=mice.map(m=>m.id===t.id?{...m,epithet:ep,fullName:newFull}:m);}
  }
  return{...s,mice,morale:Math.max(0,s.morale-pen)};
}

const THREAT_EVENTS = [
  {id:"cat_knows",title:"Kočka zná vchod",body:"Velká kočka sedí u vchodu do nory třetí noc v řadě. Nepohybuje se. Jen čeká. Ví přesně, kde jste.",choices:[
    {label:"Odlákat — stojí 15 jídla",     desc:"Rozhodit jídlo daleko od nory.",        effect:s=>({...Effects.food(-15)(s),threat:5}),  lore:"Fungovalo to. Tentokrát."},
    {label:"Zazdít vchod — 2 tahy uvěznění",desc:"Nikdo nevchází ani nevychází.",         effect:s=>({...injureRandom(s,"serious"),threat:5,blockedTurns:s.turn+2}), lore:"Tma a hlína. Ale bezpečno."},
    {label:"Čekat a doufat",               desc:"Možná odejde sama.",                    effect:s=>({...Effects.morale(-20)(s)}),          lore:"Neodešla."},
  ]},
  {id:"rat_siege",title:"Obležení",body:"Dvanáct krys. Organizovaných. Se záseky v uších a trpělivostí, která naznačuje, že přišly zůstat.",choices:[
    {label:"Vyjednávat — 10 jídla + 5 zásob",desc:"Odejdou. Ale teď vědí, že lze vyjednávat.",effect:s=>({...Effects.compose(Effects.food(-10),Effects.mats(-5))(s),threat:5}),lore:"Vyjednávání fungovalo. Bude příště dražší."},
    {label:"Zapálit odpad u zdi — dřevo −8",  desc:"Kouř je rozežene.",                       effect:s=>({...Effects.wood(-8)(s),threat:5}),                                  lore:"Krysy nemají rády kouř."},
    {label:"Evakuovat zásobárnu — zásoby −6", desc:"Schovej zásoby, nech je vzít prázdnou místnost.",effect:s=>({...Effects.mats(-6)(s),threat:5}),                           lore:"Vzaly to, co našly. Nezůstaly."},
  ]},
  {id:"owl_shadow",title:"Sova nad zahradou",body:"Nejdřív jen stín. Pak zmizela výprava. Pak bylo ticho, které trvá příliš dlouho.",choices:[
    {label:"Vyhlásit zákaz nočního vycházení",desc:"Morálka −10, ale sběrači jsou v bezpečí. Platí 5 tahů.",effect:s=>({...Effects.morale(-10)(s),threat:5,curfew:s.turn+5}),lore:"Noci jsou dlouhé, ale nora je celá."},
    {label:"Poslat nejrychlejší myš jako návnadu",desc:"60 % šance, že sova odletí.",effect:s=>{if(Math.random()<0.6)return{...s,threat:3};return{...injureRandom(s,"serious"),threat:5};},lore:"Rychlost je jediná ochrana."},
    {label:"Přemístit zásobárnu hlouběji",desc:"Zásoby v bezpečí. Stavař zablokován 3 tahy.",effect:s=>({...s,threat:5,builderBlocked:s.turn+3}),lore:"Hluboko v zemi. Sova ji nenajde."},
  ]},
  {id:"fox_watches",title:"Liška se vrátila",body:"Značky podél zdi jsou čerstvé. Obchází noru každou noc. Je chytrá způsobem, který působí osobně.",choices:[
    {label:"Vybudovat klamnou noru — zásoby −8",desc:"Prázdná nora jinde. Soustředí pozornost na ni.",effect:s=>({...Effects.mats(-8)(s),threat:5}),lore:"Tři dny ji zkoumala. Pak přestala chodit."},
    {label:"Počkat na dešťovou noc a přemístit se",desc:"Déšť maže stopy. Riziko 40 %.",effect:s=>{const b={...Effects.morale(-5)(s),threat:5};return Math.random()<0.4?injureRandom(b,"minor"):b;},lore:"Déšť byl milosrdný."},
    {label:"Zůstat a přežít to — morálka −15",desc:"Zásoby nedotčeny.",effect:s=>({...Effects.morale(-15)(s),threat:5}),lore:"Nakonec odešla sama. Trvalo to příliš dlouho."},
  ]},
];


// ── Příběhové mezihry (každý 10. tah) ────────────────────────────────────────
const STORY_EVENTS = [
  {
    id: "story_10",
    turn: 10,
    title: "Věc pod kamenem",
    source: "world",
    opening: "Ostružina přijde za soumraku s tím, že potřebuje říct něco soukromě. Sedí na bobku u vchodu do nory, tlapky sepnuté, a dívá se na zem. Říká: 'Našla jsem něco. Nevím, jestli to máme říct ostatním.' Vyloží před tebe malý plochý kámen s vyrytými znaky — ne lišejník, ne příroda. Záměrné. Pečlivé. Neznámé.",
    pages: [
      {
        id: "p1",
        text: "Znaky jsou staré, ale hluboce vyryté. Ostružina je otřela tlapkou — pod nimi je vrstva starší. Někdo je sem přidal nedávno. Přes starší vrstvu. Jako by odpovídal na zprávu.\n\nOstružina říká tiše: 'Bála jsem se, že to není pro nás. Ale pak jsem si uvědomila — kdo jiný by sem chodil?'",
        question: "Co s kamenem uděláte?",
        choices: [
          { id: "c1a", label: "Nechat kámen na místě a sledovat", desc: "Vrátit ho přesně tam kde byl. Kdo píše, ten se vrátí.", next: "p2a" },
          { id: "c1b", label: "Vzít kámen do nory", desc: "Prozkoumat znaky v klidu. Možná je někdo z myší rozumí.", next: "p2b" },
        ]
      },
      {
        id: "p2a",
        text: "Kámen vrátíte přesně tam, kde byl. Ostružina ho tlapkou otočí — tak, jak byl. Pak se schováte a čekáte.\n\nNic nepřijde. Ale druhý den ráno jsou na kameni nové znaky. Přidané v noci. Tři linie. Pauza. Pak dvě.\n\nOstružina říká: 'To je číslo. Pět. Nebo datum. Nebo vzdálenost.' Nikdo neví. Ale všichni se cítí — sledováni. Ne nepřátelsky. Jen... pozorováni.",
        question: "Jak na to budete reagovat?",
        choices: [
          { id: "c2a1", label: "Odpovědět vlastními znaky", desc: "Dát najevo, že jste viděli. Že jste tady. Že nasloucháte.", next: "end", effect: s => ({...s, morale: Math.min(100, s.morale + 8), log: [...s.log, {t: s.turn, msg: "Odpověděli jste na záhadné znaky.", good: true, title: "Věc pod kamenem", lore: "Nakreslili jste tři linie. Pauzu. Pak čtyři. Nevíte proč čtyři. Zdálo se to správné. Kámen zůstal. Zpráva se ztratila ve světě."}]}) },
          { id: "c2a2", label: "Přestat chodit kolem kamene", desc: "Někdy je moudrost v tom nevědět.", next: "end", effect: s => ({...s, threat: Math.max(0, s.threat - 1), log: [...s.log, {t: s.turn, msg: "Kámen jste nechali být.", good: true, title: "Věc pod kamenem", lore: "Moudrost je někdy v tom nepokračovat. Ostružina se jednou za čas podívá tím směrem. Jen tak."}]}) },
        ]
      },
      {
        id: "p2b",
        text: "Kámen přinesete do nory. Jetel ho drží u svíčky hodinu. Pak řekne: 'To není naše abeceda. Ale je tu vzor. Opakování. Jako jméno, nebo jako varování.'\n\nKopřiva navrhuje, že to může být mapa. Lopuch říká, že mapy nevypadají takhle. Ostružina mlčí a dívá se na znaky s výrazem, který těžko pojmenovat.\n\nTe noci se jí zdá sen o místě, které nikdy neviděla. Ráno ho nedokáže popsat. Jen říká: 'Bylo tam teplo.'",
        question: "Co uděláte se znalostí, že to není vaše?",
        choices: [
          { id: "c2b1", label: "Schovat kámen — je vaším tajemstvím", desc: "Co nevíte, to vám neublíží. Co víte, uchovejte.", next: "end", effect: s => ({...s, comfortPts: (s.comfortPts||0) + 3, log: [...s.log, {t: s.turn, msg: "Záhadný kámen uložen do nory.", good: true, title: "Věc pod kamenem", lore: "Kámen leží za ohništním kamenem. Někdy na něj někdo položí tlapu ve tmě. Nevědí proč. Ale pomáhá to."}]}) },
          { id: "c2b2", label: "Vrátit kámen — není pro vás", desc: "Co nepatří vám, vraťte. Je to tak jednoduché.", next: "end", effect: s => ({...s, morale: Math.min(100, s.morale + 6), threat: Math.max(0, s.threat - 1), log: [...s.log, {t: s.turn, msg: "Záhadný kámen vrácen na místo.", good: true, title: "Věc pod kamenem", lore: "Ostružina ho položila přesně tam, kde byl. Otřela ho suchým mechem. Udělala to s péčí, která překvapila i ji samu."}]}) },
        ]
      }
    ]
  },

  {
    id: "story_20",
    turn: 20,
    title: "Cizí myš na hranici",
    source: "world",
    opening: "Hlídka v noci. Lopuch stojí u vchodu, deka přes ramena, tlapy studené. Kolem půlnoci zaslechne pohyb — ne ohrožující, ale záměrný. Z houštiny vyjde myš, kterou nikdy neviděl. Starší. Kulhá na levou. Má u sebe pouze malý váček. Zastaví se ve vzdálenosti, která říká: 'Vím, že jsi tam. Nechci tě překvapit.' Pak počká.",
    pages: [
      {
        id: "p1",
        text: "Lopuch čeká. Cizí myš čeká. Takto stojí dlouho.\n\nNakonec cizí myš řekne — hlasem jako suché listí: 'Hledám místo přenocovat. Ne víc. Ráno odejdu a neuslyšíte mě.' Ukáže na váček. 'Mám semena. Mohu platit.'\n\nLopuch si uvědomí, že myš nekouká na vchod do nory. Kouká na zem před ním. Jako by věděla, kde je, ale záměrně se nedívá. Aby mu dala možnost říct ne.",
        question: "Co Lopuch udělá?",
        choices: [
          { id: "c1a", label: "Přivítat ji dovnitř", desc: "Noc je studená. Myš je stará. Je to tak jednoduché.", next: "p2a" },
          { id: "c1b", label: "Nabídnout přenocování venku — poskytnout deku", desc: "Přátelsky, ale opatrně. Nora zůstane jejich.", next: "p2b" },
        ]
      },
      {
        id: "p2a",
        text: "Uvnitř, u ohně, se stará myš jmenuje Vrátka. Říká to jako by to bylo přezdívka, ne jméno. Neupřesní.\n\nVypráví o zahradě severně odtud — větší, s lidmi kteří přišli zpátky po zimě. O třech vesnicích, které se rozpadly. O jedné, která se nějak drží. Mluví pomalu, vybírá slova. Jako někdo, kdo ví, že informace mají cenu.\n\nPřed svítáním vezme ze váčku hrst semen — kvalitních, zimní odrůda — a položí je na ohništní kámen. 'Za teplo,' řekne. Pak odejde dřív, než vstane slunce.",
        question: "Co si z toho odnesete?",
        choices: [
          { id: "c2a1", label: "Informace o dalších vesnicích — varování", desc: "Tři vesnice se rozpadly. Jedna se drží. Co víte o rozdílu?", next: "end", effect: s => ({...s, food: Math.min(s.foodCap, s.food + 8), morale: Math.min(100, s.morale + 10), log: [...s.log, {t: s.turn, msg: "Vrátka odešla před svítáním. Zanechala semena a příběh.", good: true, title: "Cizí myš na hranici", lore: "Semena jsou kvalitní — zimní odrůda, tvrdá slupka. A příběh o vesnici která přežila protože se rozhodla nepřijímat cizince. Nebo protože je přijímala. Vrátka neřekla, která."}]}) },
          { id: "c2a2", label: "Pocit, že svět je větší než vaše zahrada", desc: "Někdy to stačí.", next: "end", effect: s => ({...s, food: Math.min(s.foodCap, s.food + 8), morale: Math.min(100, s.morale + 15), log: [...s.log, {t: s.turn, msg: "Vrátka odešla. Zanechala semena a ticho.", good: true, title: "Cizí myš na hranici", lore: "Semena jsou dobrá. Ale to co zůstalo je větší — pocit, že někde venku jsou ještě jiné příběhy. Jiné nory. Jiné hlídky v noci."}]}) },
        ]
      },
      {
        id: "p2b",
        text: "Přinesete deku a hrnek teplé vody s bylinkou. Stará myš to přijme bez komentáře. Usadí se pod převisem — znal místo, jako by tam už byl. Možná byl.\n\nRáno, když Lopuch přijde zkontrolovat, je pryč. Deka složená přesně. Hrnek obrácený dnem vzhůru — starý způsob jak říct děkuji, aniž byste museli čekat. Ze váčku chybí hrst semen, složená na dece.\n\nLopuch stojí chvíli a dívá se na to. Pak vezme semena a jde dovnitř. Nikomu neřekne, jak se cítí. Ale každý to vidí.",
        question: "Co uděláte se semeny?",
        choices: [
          { id: "c2b1", label: "Zasadit je hned — jsou vzácná", desc: "Zimní odrůda. Každý den se počítá.", next: "end", effect: s => ({...s, food: Math.min(s.foodCap, s.food + 6), morale: Math.min(100, s.morale + 12), log: [...s.log, {t: s.turn, msg: "Semena od cizí myši zasazena.", good: true, title: "Cizí myš na hranici", lore: "Jetel je zasadila s neobvyklou péčí. Řekla, že semena od cizích myší rostou jinak. Nikdo se neptal jak to ví."}]}) },
          { id: "c2b2", label: "Uložit jako zásobu — pro nejhorší časy", desc: "Semena nevyklíčí, pokud je zasadíte ve strachu.", next: "end", effect: s => ({...s, food: Math.min(s.foodCap, s.food + 4), morale: Math.min(100, s.morale + 8), log: [...s.log, {t: s.turn, msg: "Semena od cizí myši uložena pro nejhorší čas.", good: true, title: "Cizí myš na hranici", lore: "Leží v malé schránce z kůry za ohništním kamenem. Každý ví, že tam jsou. Nikdo je nechce použít zbytečně."}]}) },
        ]
      }
    ]
  },

  {
    id: "story_30",
    turn: 30,
    title: "Noc kdy Jetel nespala",
    source: "character",
    opening: "Je pozdě. Většina nory spí. Ty sedíš u slábnoucí svíčky a kontroluješ zásoby — jak to děláš každou noc. Jetel přijde a sedne si naproti. Nesnaží se být tichá. Jen si sedne.\n\nChvíli mlčí. Pak řekne: 'Myslím pořád na jaro.' Pauza. 'Jako by bylo jistota. A pak si uvědomím, že není.'",
    pages: [
      {
        id: "p1",
        text: "Jetel mluví pomalu. Ne jako někdo kdo potřebuje odpověď — jako někdo kdo potřebuje říct věci nahlas, aby zjistil, co si o nich myslí.\n\n'Pamatuji si na minulou zimu. Bylyjsme čtyři. Teď nás je víc. A přesto...' Zastaví se. 'Přesto se bojím víc. Čím víc nás je, tím víc je co ztratit.'\n\nSvíčka plápolá. Někde v noře někdo ve spánku změní polohu.",
        question: "Co jí řeknete?",
        choices: [
          { id: "c1a", label: "\"Strach je správná odpověď. Znamená, že ti na tom záleží.\"", desc: "Upřímnost místo utěšování.", next: "p2a" },
          { id: "c1b", label: "\"Přežili jsme dosud. Přežijeme znovu.\"", desc: "Jistota, i když ji nemáte.", next: "p2b" },
        ]
      },
      {
        id: "p2a",
        text: "Jetel se na vás podívá. Dlouho. Pak řekne: 'Ano. Přesně tak.'\n\nSedíte ještě hodinu. Většinu v tichu. Ona říká věci — o konkrétních myších, o konkrétních obavách. Vy nasloucháte. Občas řeknete něco malého. Ne rady. Jen přítomnost.\n\nPřed tím, než odejde spát, udělá něco neobvyklého — dotkne se vaší tlapy. Rychle. Pak odejde. Ráno je v práci jako vždy, ale je v ní jiná kvalita ticha. Spokojenější.",
        question: "Co si z té noci odnesete?",
        choices: [
          { id: "c2a1", label: "Jetel je silnější, než vypadá — a ví to", desc: "To byl bod obratu. Uznání strachu jako síly.", next: "end", effect: s => ({...s, morale: Math.min(100, s.morale + 14), mice: s.mice.map(m => m.name === "Jetel" ? {...m, history: [...(m.history||[]), "Promluvila o strachu. A zůstala."]} : m), log: [...s.log, {t: s.turn, msg: "Jetel a vy jste seděli u svíčky do noci.", good: true, title: "Noc kdy Jetel nesp", lore: "Nic se nevyřešilo. Jaro stále není jistota. Ale Jetel spí lépe. A vy také."}]}) },
          { id: "c2a2", label: "Vesnice je více než zásoby", desc: "Tyhle chvíle jsou důvod proč vydržet.", next: "end", effect: s => ({...s, morale: Math.min(100, s.morale + 12), comfortPts: (s.comfortPts||0) + 4, log: [...s.log, {t: s.turn, msg: "Noc u svíčky s Jetelem.", good: true, title: "Noc kdy Jetel nesp", lore: "Zásoby jsou důvod přežít zimu. Tenhle rozhovor je důvod proč chtít přežít zimu."}]}) },
        ]
      },
      {
        id: "p2b",
        text: "Jetel se usmívá — ale ne tak, jak jste chtěli. Trochu smutněji. 'Ty tomu věříš?' ptá se. Tiše. Ne jako výzva. Jako skutečná otázka.\n\nZůstanete u odpovědi. Rozvinete ji — o konkrétních věcech, co jste udělali, co máte, co víte. Jetel poslouchá. Někde uprostřed přestane vypadat smutně a začne vypadat zamyšleně.\n\nNakonec řekne: 'Možná máš pravdu. Nebo možná potřebuji tě slyšet říkat to.' Vstane. 'Dobrou noc.' Odejde.",
        question: "Bylo to dost?",
        choices: [
          { id: "c2b1", label: "Ano. Někdy stačí říct věci nahlas.", desc: "Ne každý rozhovor potřebuje hloubku.", next: "end", effect: s => ({...s, morale: Math.min(100, s.morale + 10), log: [...s.log, {t: s.turn, msg: "Jistota sdílená s Jetelem v noci.", good: true, title: "Noc kdy Jetel nesp", lore: "Ráno pracuje jako vždy. Možná trochu rychleji. Možná to bylo dost."}]}) },
          { id: "c2b2", label: "Možná ne. Ale byl to začátek.", desc: "Věci se řeší postupně.", next: "end", effect: s => ({...s, morale: Math.min(100, s.morale + 8), mice: s.mice.map(m => m.name === "Jetel" ? {...m, history: [...(m.history||[]), "Mluvila o jaru v noci"]} : m), log: [...s.log, {t: s.turn, msg: "Rozhovor s Jetelem — nedokončený, ale pravdivý.", good: true, title: "Noc kdy Jetel nesp", lore: "Začátky jsou podceňované. Tenhle byl dobrý začátek."}]}) },
        ]
      }
    ]
  },

  {
    id: "story_40",
    turn: 40,
    title: "Ten, kdo přišel ze severu",
    source: "world",
    opening: "Průzkumníci se vrátí s něčím neobvyklým — ne věcí, ale informací. Na severním okraji zahrady potkali myš, která šla na jih. Sama. V zimě. Byl unavený způsobem, který není fyzický.\n\nPrůzkumníci ho přivedli. Sedí u vchodu do nory, nepožádal o vstup. Jen čeká. Jmenuje se Střela — nebo tak říká, že se jmenuje. Vy vyjdete ven.",
    pages: [
      {
        id: "p1",
        text: "Střela mluví přímo. 'Přišel jsem z vesnice tři dny na sever. Není tam nic. Nepřišla zima — přišli krysy.' Pauza. 'Organizované. Se strategií. Viděl jsem to poprvé a doufám, že naposledy.'\n\nDívá se na vás. 'Nevím, jestli jdou tímto směrem. Ale šel jsem tímto směrem, protože zde jsem viděl dým z ohně. Myslel jsem, že byste měli vědět.'\n\nNenabízí se zůstat. Nenabízí nic. Jen informaci.",
        question: "Co uděláte?",
        choices: [
          { id: "c1a", label: "Požádat ho o detaily — co přesně viděl", desc: "Informace mají cenu. Čím více víte, tím lépe.", next: "p2a" },
          { id: "c1b", label: "Pozvat ho dál — v zimě se neodhání ti, kdo varují", desc: "Zpráva i posel jsou součástí stejné věci.", next: "p2b" },
        ]
      },
      {
        id: "p2a",
        text: "Střela mluví hodinu. Konkrétně. Počty — kolik krys viděl. Chování — jak koordinovaly pohyb. Cíle — nejprve zásoby, pak nora sama. 'Nevím, kdo je vedl. Ale někdo je vedl.'\n\nNakonec vstane. 'Víc nevím.' Podívá se na sever — reflexivně, jako někdo kdo kontroluje, jestli není sledován. Pak na vás. 'Mějte se.' Odejde na jih.\n\nZůstanete s informací, která je přesná, neověřitelná a velmi znepokojující.",
        question: "Jak připravíte vesnici?",
        choices: [
          { id: "c2a1", label: "Zvýšit hlídky ihned — bezpečnost před zásobami", desc: "Než přijde hrozba, buďte připraveni.", next: "end", effect: s => ({...s, threat: Math.max(0, s.threat - 2), morale: Math.min(100, s.morale - 5), log: [...s.log, {t: s.turn, msg: "Střelova varování bereme vážně. Hlídky posíleny.", good: true, title: "Ten kdo přišel ze severu", lore: "Myši jsou unavenější. Ale dívají se jinak na stíny u zdi. Jinak — a přesněji."}]}) },
          { id: "c2a2", label: "Říct ostatním pravdu — nic nezjednodušovat", desc: "Vesnice má právo vědět. A umí to unést.", next: "end", effect: s => ({...s, threat: Math.max(0, s.threat - 1), morale: Math.min(100, s.morale + 5), log: [...s.log, {t: s.turn, msg: "Střelova varování sdělena celé vesnici.", good: true, title: "Ten kdo přišel ze severu", lore: "Kopřiva řekla: 'Dobře, že víme.' Pak se vrátila k práci. Takhle to funguje."}]}) },
        ]
      },
      {
        id: "p2b",
        text: "Střela vstoupí. Okamžitě si sedne ke zdi — zády ke zdi, výhledem na vchod. Starý zvyk.\n\nJe a pije. Mluví málo. Odpovídá na otázky přesně. Nic nepřidává. Kopřiva ho sleduje s výrazem který říká, že si ho pamatuje — ale ani ona nevíme odkud.\n\nPřed spaním řekne: 'Budu pryč ráno. Ale mohu zůstat na hlídce dnes v noci. Jestli chcete.' Není to nabídka pomoci. Je to nabídka výměny — bezpečí za bezpečí.",
        question: "Přijmete nabídku?",
        choices: [
          { id: "c2b1", label: "Ano — extra pár očí v noci je vždy dobrý", desc: "Důvěra se buduje v malých krocích.", next: "end", effect: s => ({...s, threat: Math.max(0, s.threat - 3), log: [...s.log, {t: s.turn, msg: "Střela strávil noc na hlídce. Ráno byl pryč.", good: true, title: "Ten kdo přišel ze severu", lore: "Ráno zůstaly jen jeho stopy ve sněhu a pocit, že noc proběhla dobře. Kopřiva říká, že ho poznává. Stále neřekne odkud."}]}) },
          { id: "c2b2", label: "Ne — hlídku si pohlídáme sami", desc: "Přátelský, ale vaše. Vaše nora, vaše hlídka.", next: "end", effect: s => ({...s, threat: Math.max(0, s.threat - 1), morale: Math.min(100, s.morale + 7), log: [...s.log, {t: s.turn, msg: "Střela přijal odpověď bez komentáře. Odešel ráno.", good: true, title: "Ten kdo přišel ze severu", lore: "Přikývl a šel spát. Ráno ho nikdo nevzbudil — vstal sám, před svítáním, a odešel. Zanechal u vchodu malou větvičku ohnutou do kruhu. Starý znak pro: 'Byl jsem tady a bylo to v pořádku.'"}]}) },
        ]
      }
    ]
  },

  {
    id: "story_50",
    turn: 50,
    title: "Poslední noc před zimou",
    source: "character",
    opening: "Je noc před tím, než to přijde. Vy to cítíte — v kostech, ve vzduchu, v tom jak ostatní mluví pomaleji a pracují rychleji. Zima není pověst. Je za zdí.\n\nLopuch přijde a řekne: 'Chci, abychom si dnes večer sedli všichni dohromady. Ne kvůli práci. Jen — spolu.' Kouká se na vás. 'Jestli souhlasíš.'",
    pages: [
      {
        id: "p1",
        text: "Sedíte u ohně. Všichni kdo jsou. Jetel drží hrnek obě tlapama. Ostružina opravuje něco co nepotřebuje opravovat — jen potřebuje mít ruce zaměstnané. Kopřiva se usmívá způsobem, který říká, že se nebojí, i když se bojí.\n\nNikdo nezačíná. Pak Lopuch řekne: 'Chci říct nahlas, co si myslím.' Pauza. 'Myslím, že jsme udělali dost. Nevím, jestli to stačí. Ale udělali jsme dost.'",
        question: "Co k tomu dodáte?",
        choices: [
          { id: "c1a", label: "\"Lopuch má pravdu. A chtěl bych říct, proč si to myslím.\"", desc: "Konkrétně. Věci co fungují. Rozhodnutí co stála za to.", next: "p2a" },
          { id: "c1b", label: "Nic — nechat prostor ostatním", desc: "Někdy nejlepší co vůdce udělá je ustoupit.", next: "p2b" },
        ]
      },
      {
        id: "p2a",
        text: "Mluvíte. O konkrétních věcech — o rozhodnutích, o myších, o momentech, které si pamatujete. Ostatní poslouchají. Pak začínají sami — Jetel o semínku které zasadila třetí tah a které stále roste. Ostružina o zdi, která jí trvala tři tahy a padla za půl hodiny a musela ji postavit znovu. Kopřiva o noci kdy se bála nejvíc a co ji dostalo přes ni.\n\nNikdo nemluví o zimě. Mluví o věcech před zimou. Oheň hoří. Je pozdě. Nikdo nespěchá.",
        question: "Jak to skončí?",
        choices: [
          { id: "c2a1", label: "Zásobami — připraveni fyzicky", desc: "Projít zásoby. Vědět co máte. Jít spát s čísly.", next: "end", effect: s => ({...s, morale: Math.min(100, s.morale + 18), food: Math.min(s.foodCap, s.food + 3), log: [...s.log, {t: s.turn, msg: "Poslední noc před zimou — příběhy u ohně.", good: true, title: "Poslední noc před zimou", lore: "Zásoby jsou dobré. Nebo dost dobré. Nebo tak dobré, jak jsou. Ráno přijde zima a vy budete připraveni — ne proto, že nemáte strach, ale proto, že jste se nebáli spolu sedět."}]}) },
          { id: "c2a2", label: "Spánkem — připraveni jinak", desc: "Nejlepší co teď uděláte je odpočinout si.", next: "end", effect: s => ({...s, morale: Math.min(100, s.morale + 20), mice: s.mice.map(m => m.injured ? {...m, injured: false, history: [...(m.history||[]), "Vyléčena před velkou zimou"]} : m), log: [...s.log, {t: s.turn, msg: "Poslední noc před zimou — ticho a spánek.", good: true, title: "Poslední noc před zimou", lore: "Zhasíte svíčku. Všichni jdou spát. V noře je tma a teplo a zvuky spícíc myší. Venku se začíná sněžit."}]}) },
        ]
      },
      {
        id: "p2b",
        text: "Neuděláte nic. Sedíte a nasloucháte.\n\nA pak se stane zajímavá věc — ostatní začnou mluvit sami. Jetel první, pak Ostružina, pak Kopřiva. Každá jinak, každá o jiné věci. Ale je to stejná věc — o tom co bylo, o tom co se nebáí ztratit, o tom proč je tady.\n\nLopuch vás jednou podívá přes oheň. Vy přikývnete. On přikývne. To stačí.\n\nPozdě v noci, když ostatní usínají jeden po druhém, zůstanete vy a Lopuch. 'Dobrý večer,' řekne. Myslí tím víc než večer.",
        question: "Co odpovíte?",
        choices: [
          { id: "c2b1", label: "\"Dobrá vesnice.\"", desc: "Dva slova. Správná dvě slova.", next: "end", effect: s => ({...s, morale: Math.min(100, s.morale + 22), log: [...s.log, {t: s.turn, msg: "Poslední noc před zimou. Dobrá vesnice.", good: true, title: "Poslední noc před zimou", lore: "Lopuch se usmál. Pak zhasil svíčku. Venku začíná padat sníh."}]}) },
          { id: "c2b2", label: "\"Dobrý večer, Lopuchu.\"", desc: "Vrátit to zpátky. Jednoduše.", next: "end", effect: s => ({...s, morale: Math.min(100, s.morale + 18), comfortPts: (s.comfortPts||0) + 5, log: [...s.log, {t: s.turn, msg: "Poslední noc před zimou. Dobrou noc, Lopuchu.", good: true, title: "Poslední noc před zimou", lore: "On přikývl. Odešel spát. Vy zůstali ještě chvíli u slábnoucího ohně a mysleli na nic konkrétního. Bylo to dobré."}]}) },
        ]
      }
    ]
  }
];

function getStoryEvent(turn) { return STORY_EVENTS.find(e => e.turn === turn) || null; }

// ── Data: Lokace ──────────────────────────────────────────────────────────────
const STATIC_LOCATIONS = [
  {id:"E7",name:"Pavučí království",      danger:true, fluff:false,desc:"Jemné sítě jsou téměř neviditelné. Pavouk je trpělivý a vychytralý.",safe:"Vaši průzkumníci vycítí sítě a čistě ustoupí.",outcomes:[{w:2,type:"good",title:"Pavučí hedvábí sklizeno",lore:"Opuštěné části sítě — neuvěřitelně pevné na svou váhu.",food:0,wood:0,mats:6,morale:0,threat:0},{w:2,type:"good",title:"Bezpečná stezka",lore:"Je tu cesta, kterou pavouk zjevně shledává nezajímavou.",food:0,wood:0,mats:0,morale:0,threat:-2},{w:1,type:"bad",title:"Uvěznění v síti",lore:"Pavouk trpělivě sledoval, než ostatní uvázlou vyřízli.",food:0,wood:0,mats:0,morale:-5,threat:0,special:"injure"}]},
  {id:"D3",name:"Obrovské mraveniště",    danger:true, fluff:false,desc:"Země pulzuje životem. Mravenci pochodují v nekonečných proudech.",safe:"Vaši průzkumníci pozorují z bezpečné vzdálenosti.",outcomes:[{w:3,type:"good",title:"Feromonová výměna",lore:"Kapka ovocné šťávy. Mravenci odpověděli zbytky jídla.",food:9,wood:0,mats:0,morale:0,threat:0},{w:1,type:"good",title:"Tajná stezka",lore:"Mravenci nechali průzkumníky projít tunelovým systémem.",food:0,wood:0,mats:3,morale:5,threat:-1},{w:1,type:"bad",title:"Kolonie zaútočila",lore:"Něco se pokazilo. Vlna se mobilizovala.",food:0,wood:0,mats:0,morale:-8,threat:2}]},
  {id:"G7",name:"Myší oltář",             danger:false,fluff:false,desc:"Malý kamenný oltář s obětinami. Někdo se o něj stará.",safe:"Vaši průzkumníci zanechají malé semínko.",outcomes:[{w:3,type:"good",title:"Požehnání oltáře",lore:"Ticho tady je jiné než jiná ticha. Myši se vrátí lehčí.",food:0,wood:0,mats:0,morale:12,threat:0},{w:1,type:"good",title:"Darované zásoby",lore:"Stará strážkyně nechala za oltářem pytlík semínek.",food:5,wood:0,mats:0,morale:3,threat:0},{w:1,type:"bad",title:"Obětina sražena",lore:"Náhodou. Atmosféra se okamžitě změnila.",food:0,wood:0,mats:0,morale:-5,threat:0}]},
  {id:"J7",name:"Opuštěná osada",         danger:true, fluff:false,desc:"Zbytky hnízd svědčí o náhlém odchodu. Jídlo na stolech. Ohně nezhasnuté.",safe:"Vaši průzkumníci procházejí prázdnými ulicemi v tichu.",outcomes:[{w:2,type:"good",title:"Plná sklizeň",lore:"Zásoby stále plné. Zimní přípravy cizích myší se staly vašimi.",food:10,wood:5,mats:6,morale:0,threat:0},{w:1,type:"good",title:"Přeživší nalezen",lore:"Jedna myš schovaná v náprstku. Přidá se k vesnici.",food:0,wood:0,mats:0,morale:8,threat:0,special:"add_mouse"},{w:1,type:"bad",title:"Proč odešli",lore:"Průzkumníci to zjistili na vlastní kůži.",food:0,wood:0,mats:0,morale:-10,threat:4}]},
  {id:"A3",name:"Kořenové jeskyně",       danger:false,fluff:false,desc:"Úzké tunely pod kořeny, vonící mokrou zemí.",safe:"Průzkumníci mapují vnější tunely.",outcomes:[{w:3,type:"good",title:"Starý zásobník",lore:"Semínka, houby, nit. Zanechané někým, kdo se nikdy nevrátil.",food:8,wood:0,mats:3,morale:0,threat:0},{w:1,type:"bad",title:"Náhlá záplava",lore:"Voda stoupla bez varování. Všichni vyvázli — ale těsně.",food:0,wood:0,mats:0,morale:0,threat:0,special:"injure"}]},
  {id:"A7",name:"Opuštěná zeď statku",    danger:false,fluff:false,desc:"Cihly plné myších vchodů. Uvnitř: chodby a hnízda.",safe:"Průzkumníci opatrně nahlížejí skrz vchody.",outcomes:[{w:3,type:"good",title:"Zásobník ve zdi",lore:"Knoflíky, měděný drát, jehla velikosti meče.",food:0,wood:4,mats:7,morale:0,threat:0},{w:1,type:"bad",title:"Obsazeno",lore:"Není opuštěné. Průzkumníci ustoupili tiše a rychle.",food:0,wood:0,mats:0,morale:-8,threat:3}]},
  {id:"C5",name:"Vosí hnízdo",            danger:true, fluff:false,desc:"Dutý strom hostí obrovské vosí hnízdo. Bzukot slyšitelný zdaleka.",safe:"Vaši průzkumníci udělají velký oblouk.",outcomes:[{w:1,type:"good",title:"Bezpečný průchod",lore:"Je tu cesta, kterou vosy shledávají nezajímavou.",food:0,wood:0,mats:0,morale:0,threat:-2},{w:1,type:"good",title:"Starý plástev",lore:"Tmavý a hustý jako jantarová pryskyřice, sladký jinak než čerstvý med.",food:5,wood:0,mats:0,morale:10,threat:0},{w:2,type:"bad",title:"Bodnutí",lore:"Jedno bodnutí. Jeden průzkumník. Cesta domů byla pomalá.",food:0,wood:0,mats:0,morale:-8,threat:0,special:"injure"}]},
  {id:"H7",name:"Starý úl",               danger:false,fluff:false,desc:"Opuštěný úl. Med je starý, ale cenný.",safe:"Průzkumníci kontrolují z dálky. Žádné včely.",outcomes:[{w:2,type:"good",title:"Starý med",lore:"Tmavý, hustý, bohatý a složitý. Chutná jako vzpomínky.",food:8,wood:0,mats:0,morale:7,threat:0},{w:2,type:"good",title:"Vosk a plást",lore:"Včelí vosk neshniví. Průzkumníci vzali vše, co unesli.",food:0,wood:0,mats:7,morale:0,threat:0},{w:1,type:"bad",title:"Není opuštěný",lore:"Tři včely. Jedno bodnutí. Jeden průzkumník.",food:0,wood:0,mats:0,morale:0,threat:0,special:"injure"}]},
  {id:"D7",name:"Zahrabaný vůz",          danger:false,fluff:false,desc:"Napůl potopený lidský vůz. Přirozené komory mezi prkny.",safe:"Průzkumníci opatrně obcházejí.",outcomes:[{w:3,type:"good",title:"Bohatá sklizeň",lore:"Lana, železné hřebíky, plátno. Průzkumníci pracovali ve dvojicích.",food:0,wood:4,mats:8,morale:0,threat:0},{w:1,type:"bad",title:"Shnilá podlaha",lore:"Horní paluba vypadala pevně. Průzkumník, který šel první, to zjistil nohou, náhle.",food:0,wood:0,mats:0,morale:0,threat:0,special:"injure"}]},
  {id:"B4",name:"Střežený pramen",        danger:true, fluff:false,desc:"Křišťálová voda tryská ze skály. Místní myši ji střeží s fanatickým zápalem.",safe:"Vaši průzkumníci sledují z kapradin.",outcomes:[{w:2,type:"good",title:"Výměna u pramene",lore:"Šest semen za náprstek. Tu noc všichni dobře spali.",food:3,wood:0,mats:0,morale:10,threat:0},{w:1,type:"bad",title:"Odmítnuti",lore:"Ne hrubě. Jen: ne. Žádné vysvětlení.",food:0,wood:0,mats:0,morale:-4,threat:0}]},
  {id:"B7",name:"Lanové cesty v korunách",danger:false,fluff:false,desc:"Síť lan udržovaných hlídkovými myšmi.",safe:"Vaši průzkumníci zdola posílají pozdravné gesto.",outcomes:[{w:3,type:"good",title:"Hlídkové zpravodajství",lore:"Časy kočičích hlídek, poloha krysích doupat, tři bezpečné trasy.",food:0,wood:0,mats:0,morale:0,threat:-3},{w:1,type:"bad",title:"Nečekaný pád",lore:"Vítr přišel odnikud. Kotník se obrátil.",food:0,wood:0,mats:0,morale:0,threat:0,special:"injure"}]},
  {id:"C3",name:"Balvan na mýtině",       danger:false,fluff:false,desc:"Obrovský lišejníkový balvan s popsaným povrchem. V noci se tu shromažďují světlušky.",safe:"Vaši průzkumníci skicují vzory lišejníkových značek.",outcomes:[{w:2,type:"good",title:"Lišejníková mapa rozluštěna",lore:"Tři dříve neznámé polohy zásobníků.",food:0,wood:0,mats:5,morale:0,threat:-2},{w:2,type:"good",title:"Světlušičí vedení",lore:"Jedna světluška se zastavila nad trhlinou. Uvnitř semínka — chladná, suchá, dokonale zachovaná.",food:7,wood:0,mats:0,morale:0,threat:0},{w:1,type:"bad",title:"Rituál přerušen",lore:"Šest myší v šedých pláštích. Průzkumníci odešli.",food:0,wood:0,mats:0,morale:-6,threat:2}]},
  {id:"FL1",name:"Rozbitý květináč",      danger:false,fluff:true, desc:"Terakotový hrnec leží na boku, čistě rozlomený. Na vnitřní stěně je vyškrábána malá mapka.",safe:"Průzkumníci si chvíli sedí uvnitř chladného stínu.",outcomes:[{w:3,type:"fluff",title:"Tichý oběd",lore:"Průzkumníci jedli semínka uvnitř chladného oblouku hrnce a sledovali brouka procházet. Nic se nestalo. A přesto to bylo přesně to, co bylo třeba.",food:0,wood:0,mats:0,morale:3,threat:0},{w:1,type:"fluff",title:"Mapa na stěně",lore:"Jeden průzkumník dlouho sledoval vyškrábané linie. Udělal kopii. Neodpovídá žádnému místu, které kdokoli zná.",food:0,wood:0,mats:0,morale:2,threat:0}]},
  {id:"FL2",name:"Zrezivělý kompas",      danger:false,fluff:true, desc:"Napůl zahrabaný pod zahradní zdí, obrovský a rudý stářím. Jehla se stále chvěje.",safe:"Průzkumníci chvíli sledují chvějící se jehlu.",outcomes:[{w:2,type:"fluff",title:"Jehla ukazuje",lore:"Kamkoli ho otočíte, jehla najde sever. Průzkumníci debatovali, zda je sever důležitý.",food:0,wood:0,mats:0,morale:4,threat:-1},{w:2,type:"fluff",title:"Jeho váha",lore:"Jeden průzkumník se pokusil zvednout roh. Dala do toho celá záda a kompas se nepohnul. Seděly kolem něj a přemýšlely o měřítku věcí.",food:0,wood:0,mats:0,morale:5,threat:0}]},
  {id:"FL3",name:"Zahrada skleněných kuliček",danger:false,fluff:true,desc:"Někdo roztroušil skleněné kuličky po zahradní cestě. Z myší výšky je to jako stát v katedrále.",safe:"Vaši průzkumníci procházejí kolem kuliček a přicházejí domů mluvit o světle.",outcomes:[{w:3,type:"fluff",title:"Světlo katedrály",lore:"Světlo prošlo kuličkami a rozlomilo se do barev. Průzkumníci stáli v barevných stínech bez mluvení déle, než kdokoli z nich poté přiznal.",food:0,wood:0,mats:0,morale:6,threat:0},{w:1,type:"fluff",title:"Jedna kulička přinesena domů",lore:"Teď sedí v malém výklenku u vchodu do nory. Každá myš, která prochází kolem, se na ni podívá.",food:0,wood:0,mats:1,morale:3,threat:0}]},
  {id:"FL4",name:"Hřbitov bot",           danger:false,fluff:true, desc:"Tři obrovské boty leží pohozené u kůlny. Uvnitř té největší je opuštěné hnízdo.",safe:"Vaši průzkumníci opatrně prozkoumávají zvenku.",outcomes:[{w:2,type:"fluff",title:"Prázdné hnízdo",lore:"Hnízdo postavené s péčí. Průzkumníci seděli uvnitř kožené vůně v tichu prostoru vytvořeného pro pohodlí, jež v sobě nikoho nemá.",food:0,wood:0,mats:0,morale:4,threat:0},{w:2,type:"fluff",title:"Tunel tkanicí",lore:"Průzkumníci šli celou délku tkaničky v řadě jako průzkumníci obrovských vzdáleností.",food:0,wood:0,mats:0,morale:5,threat:-1}]},
  {id:"FL5",name:"Zpívající drát",        danger:false,fluff:true, desc:"Kus drátu se ve větru chvěje a vydává slabý tón. Myši, které u něj sedí, si začnou pobrukovat.",safe:"Vaši průzkumníci chvíli sedí u drátu a poslouchají.",outcomes:[{w:3,type:"fluff",title:"Píseň drátu",lore:"Tři průzkumníci seděli vedle drátu celé odpoledne. Než přišli domů, složili mezi sebou malou melodii. Do rána ji znala celá nora.",food:0,wood:0,mats:0,morale:8,threat:0},{w:1,type:"fluff",title:"Frekvence",lore:"Chytrá myš zjistila, že dotyk drátu v přesně správném místě způsobí, že brouci se zastaví. Pečlivě o tom přemýšlí.",food:0,wood:0,mats:0,morale:3,threat:-1}]},

  // ── Nové lokace ──────────────────────────────────────────────────────────────
  {
    id:"NL01", name:"Rezavá pumpa", danger:false, fluff:false,
    desc:"Obrovská zahradní pumpa, zrezivělá na nachově. Páka se stále pohybuje, ale vydává jen sípání. Pod ní mokrá hlína — voda tudy teče dál, jen ne nahoru. Myši sem chodily pro vodu ještě předtím, než Vrbník věděl o prameni.",
    safe:"Průzkumníci obejdou pumpu a zkontrolují okolní hlínu.",
    outcomes:[
      {w:3,type:"good",title:"Podzemní tok nalezen",lore:"Vlhká hlína pod pumpou prozradila víc než samotná pumpa. Kopřiva strávila odpoledne kopáním a přišla domů celá od bláta, ale se znalostí — voda teče jiným tunelem, blíže k povrchu, než si kdo myslel. Je přístupná v suchých měsících.",food:0,wood:0,mats:4,morale:5,threat:0},
      {w:2,type:"good",title:"Pumpový mechanismus rozebrán",lore:"Jetel přišla s nástrojem a trpělivostí. Pumpa nevydala vodu, ale vydala části — měděné dráty, kožené těsnění, kovové prstence. Suroviny staré a kvalitní, z dob kdy se věci stavěly aby vydržely.",food:0,wood:2,mats:7,morale:0,threat:0},
      {w:1,type:"bad",title:"Past na nohách",lore:"V bahně za pumpou byl drát — ne jako past, ale dost jako past. Jeden průzkumník kopl do správného místa ve špatný čas. Bude chodit za týden.",food:0,wood:0,mats:0,morale:-3,threat:0,special:"injure"},
    ]
  },
  {
    id:"NL02", name:"Skleník bez skla", danger:false, fluff:false,
    desc:"Kovová kostra skleníku stojí jako žebra něčeho obřího. Sklo zmizelo — rozbité, odnesené nebo prostě pryč — a zůstaly jen trubky a drátěné spoje. Uvnitř roste co chce: tráva, kopřivy, jeden překvapivě zdravý rajčatový keř. Myši tu stráví hodiny a není jim jasné, jestli se cítí bezpečně nebo ne.",
    safe:"Průzkumníci projdou kostrou a vrátí se s popisem.",
    outcomes:[
      {w:2,type:"good",title:"Rajčatový keř — pozdní plody",lore:"Oranžovočervené, velikosti myší hlavy. Průzkumníci jich nasbírali tolik, kolik unesli, a ještě se vrátili. Rajčata jsou kyselá a vodnatá a chutnají jako pozdní léto, které nechce skončit.",food:10,wood:0,mats:0,morale:6,threat:0},
      {w:2,type:"good",title:"Kovové trubky — stavební materiál",lore:"Část trubek povolila při dotyku — koroze dělá svou práci pomalu ale jistě. Průzkumníci odnesli tři kusy přesné délky. V noře z nich bude výztuha nad hlavní chodbou.",food:0,wood:5,mats:3,morale:0,threat:0},
      {w:1,type:"bad",title:"Kuní hnízdo uvnitř",lore:"Ne kuna sama, ale znaky, které kuna nechala. Parfém, polosnědené kořisti, nová vrstva slámy. Průzkumníci se otočili tiše a odešli rychle. Kuna se vrátí.",food:0,wood:0,mats:0,morale:-5,threat:2},
    ]
  },
  {
    id:"NL03", name:"Zatopená konev", danger:false, fluff:true,
    desc:"Velká zalévací konev leží na boku, napůl pohřbená v trávě. Voda, která v ní zbyla po poslední dešti, se proměnila ve vlastní ekosystém — larvy, kapradí, jeden neidentifikovatelný červ. Z myší perspektivy je to jako jezero. Velmi malé jezero. Ale jezero.",
    safe:"Průzkumníci obejdou konev a pijí z kaluže vedle.",
    outcomes:[
      {w:3,type:"fluff",title:"Jezero v konvi",lore:"Průzkumníci seděli na okraji konve a dívali se dolů na vodu. Bylo tam vlastně docela příjemno. Červ připlul k povrchu, podíval se na ně jedním koncem těla — nebo druhým, těžko říct — a zase odplaval. Přišli domů s pocitem, že viděli něco co by klidně viděli znovu.",food:0,wood:0,mats:0,morale:5,threat:0},
      {w:1,type:"fluff",title:"Kapradinová záhrada",lore:"Uvnitř konve roste kapradina, která si nečetla instrukce pro kapradiny. Je dvakrát větší než by měla být, tmavě zelená, sebevědomá. Průzkumníci ji obdivují. Jeden si utrhne malý lístek a vezme ho domů. Proč, sám neví.",food:0,wood:0,mats:1,morale:3,threat:0},
    ]
  },
  {
    id:"NL04", name:"Pár zapomenutých rukavic", danger:false, fluff:true,
    desc:"U plotu leží pár zahradních rukavic — velké, kožené, od hlíny. Jeden prst pravé rukavice je odtržen. V levé někdo zanechal semena — úmyslně nebo ne, to není jasné. Myši sem chodí jako poutníci k něčemu, co neumí pojmenovat.",
    safe:"Průzkumníci se posadí na rukavice a snědí oběd.",
    outcomes:[
      {w:2,type:"fluff",title:"Zásoby v rukavici",lore:"Semena v rukavici jsou dobrá — suchá, tvrdá, zimní odrůda. Kdo je tam dal, ten věděl co dělá. Průzkumníci je vzali pečlivě a nesli domů jako by nesli dluh, který nevzali dobrovolně.",food:5,wood:0,mats:0,morale:4,threat:0},
      {w:2,type:"fluff",title:"Kůže na záplaty",lore:"Kožená rukavice je poklad pro myš, která umí šít. Lopuch řekl, že neumí. Pak strávil večer učením se. Záplata na jeho zimní plášti je tlustá a nerovná a drží perfektně.",food:0,wood:0,mats:3,morale:3,threat:0},
    ]
  },
  {
    id:"NL05", name:"Stará studna", danger:true, fluff:false,
    desc:"Studna ze starých kamenů, hluboká a tmavá. Poklop je pryč. Uvnitř je slyšet voda, ale daleko — příliš daleko na to, aby se k ní dostalo bez lana. Kolem studny je suchá hlína a starý zápach vlhka. Nikomu se sem nechce jít moc blízko.",
    safe:"Průzkumníci si lhnou na kraj a poslechnou si zvuk vody.",
    outcomes:[
      {w:2,type:"good",title:"Studniční zásoby",lore:"Na jedné straně studny je výklenek, který kdysi sloužil jako odkládací místo pro vědro. V něm — zabalené v plátně, stále použitelné — lano a hák. Kdo je tam dal, počítal s tím, že je někdo najde. Vděčnost pro neznámého.",food:0,wood:3,mats:5,morale:3,threat:0},
      {w:1,type:"good",title:"Zásobárna hub podél zdi",lore:"Vlhko a tma dělají studnu nepoužitelnou pro studnu. Ale pro houby jsou ideální podmínky. Podél vnitřní zdi roste kolonie hlívy, tichá a produktivní. Průzkumníci se spustili na laně a vrátili se obtěžkaní.",food:8,wood:0,mats:0,morale:2,threat:0},
      {w:2,type:"bad",title:"Pádem dovnitř",lore:"Půda u okraje nebyla tak pevná jak vypadala. Nikdo nepadl celý — jen noha, pak záchrana rukama, pak hodina třesení. Ale je to dost na to, aby se o studnu nikdo nechtěl starat.",food:0,wood:0,mats:0,morale:-6,threat:0,special:"injure"},
    ]
  },
  {
    id:"NL06", name:"Hromada kompostu", danger:false, fluff:false,
    desc:"Lidský kompost — pět vrstev organické hmoty v různých stadiích rozkladu. Z myší perspektivy je to sopka, hora a ekosystém v jednom. Uvnitř teplo. Vždy teplo. V zimě sem chodí myši z okolí jen pro teplo.",
    safe:"Průzkumníci si přičichnou a vrátí se s popisem.",
    outcomes:[
      {w:3,type:"good",title:"Zimní záhřev a zásoby",lore:"Uvnitř kompostu je tepleji o čtyři stupně než venku. To samo o sobě stojí za cestu. Ale průzkumníci přišli také s jídlem — zbytky zeleniny ve stadiích rozkladu, ale stále jedlé, stále výživné. Zásobárna, která se obnovuje sama.",food:7,wood:0,mats:2,morale:4,threat:0},
      {w:2,type:"good",title:"Materiály k stavbě",lore:"Kompost obsahuje vrstvu dřevních štěpků — přidané pro strukturu, teď suché a pevné. Průzkumníci je odnesli v brašnách. Jsou lehčí než dřevo a drží tvar stejně dobře.",food:0,wood:4,mats:0,morale:0,threat:0},
      {w:1,type:"bad",title:"Plynný výbuch",lore:"Kompost fermentuje. Průzkumníci o tom věděli. Nevěděli, jak rychle a jak konkrétně. Výsledek byl hlasitý, aromatický a zanechal jednoho průzkumníka s popálenými fousky a ztracenou důstojností.",food:0,wood:0,mats:0,morale:-4,threat:0,special:"injure"},
    ]
  },
  {
    id:"NL07", name:"Drátěné pletivo", danger:false, fluff:false,
    desc:"Část starého drátěného plotu leží srolovaná u zdi — odřezaná, opuštěná, zarůstající. Z jedné strany připomíná labyrint, z druhé poklad. Dráty jsou pevné, mírně zrezivělé, ale stále funkční. Myši sem chodí pro materiál a vycházejí s nápady.",
    safe:"Průzkumníci obejdou pletivo a odnesou co lze bez nástroje.",
    outcomes:[
      {w:3,type:"good",title:"Drát pro stavbu a nástroje",lore:"Drátěné pletivo je jako zásobárna kovů pro myš s fantazií. Lopuch strávil odpoledne odřezáváním správných délek. Vrátil se s kusy pro záchytné háky, pro zpevnění nor, pro výrobu nástrojů. Řekl, že nikdy neviděl tak užitečnou věc, která je tak ošklivá.",food:0,wood:2,mats:8,morale:0,threat:0},
      {w:1,type:"bad",title:"Zaklesnutí",lore:"Pletivo má tu vlastnost, že čím víc se snažíte vyprostit, tím hůř je. Jeden průzkumník to zjistil osobně. Ostatní ho vyprošťovali půl hodiny. Přišli domů pozdě, unavení, s prázdnýma rukama.",food:0,wood:0,mats:0,morale:-4,threat:0,special:"injure"},
    ]
  },
  {
    id:"NL08", name:"Rozbitá terasa", danger:false, fluff:false,
    desc:"Betonová terasa praskla podél starých spár a nakloněná strana se odlomila. Mezi trhliny roste tráva a mech. Pod odlomenou deskou je přirozená jeskyně — chladná, suchá, s kamennou podlahou. Ideální pro zásobárnu, pokud nebojíte se sklonu.",
    safe:"Průzkumníci zkontrolují přístup a udělají si mapu.",
    outcomes:[
      {w:3,type:"good",title:"Přirozená zásobárna pod deskou",lore:"Prostor pod odlomenou deskou je větší, než vypadá. Suchý, konstantní teplota, přirozená ventilace trhlinou na severní straně. Průzkumníci přišli s plánem využití — záloha pro zásoby, skrytá před výhledy z zahradní brány.",food:4,wood:0,mats:6,morale:5,threat:-1},
      {w:2,type:"good",title:"Pozůstatky lidského piknik",lore:"Pod desku se dostalo něco z poslední doby, kdy terasa sloužila jako terasa. Zbytky svačiny — věci pro myše exotické a zajímavé. Průzkumníci je vzali jako antropologové, ne jako hladovci. Ale snědli je.",food:6,wood:0,mats:1,morale:3,threat:0},
      {w:1,type:"bad",title:"Deska se pohnula",lore:"Beton prasknutý podél spár nedrží tak pevně jak vypadá. Průzkumníci to zjistili, když se deska posunula o centimetr ve špatnou chvíli. Nikdo nebyl zasažen přímo. Ale nikdo se tam vrátí brzy.",food:0,wood:0,mats:0,morale:-5,threat:1},
    ]
  },
  {
    id:"NL09", name:"Vraky dvou kol", danger:false, fluff:false,
    desc:"Dvě stará kola opřená o sebe u kůlny. Pneumatiky shnilé, rámy rezavé, ale řetězy stále namazané — někdo je mazal ještě nedávno, pak přestal. Myším z Vrbníku připomínají trosky něčeho velkého a zaniklého.",
    safe:"Průzkumníci zkontrolují okolí a vrátí se.",
    outcomes:[
      {w:2,type:"good",title:"Řetězy a kovy",lore:"Kola nevydrží rok, ale kovové části — řetězy, šrouby, ráfky — to je jiná věc. Průzkumníci rozebrali část jednoho kola a přinesli zásoby kovů, které budou sloužit roky. Šrouby ve velikosti myší pěsti. Řetězové oko jako kroužek.",food:0,wood:1,mats:9,morale:2,threat:0},
      {w:2,type:"good",title:"Duše jako materiál",lore:"Gumová duše — i shnilá — je stále elastická. Průzkumníci odřezali pruhy a přinesli domů. Jetel z nich udělala těsnění pro zásobárnu na jídlo. Lepší než mech. Lepší než hlína.",food:0,wood:0,mats:5,morale:3,threat:0},
      {w:1,type:"bad",title:"Kolo se překotilo",lore:"Fyzika. Nic osobního. Jedno kolo se překotilo přesně ve chvíli, kdy byl průzkumník ve špatném místě. Výsledek byl hlasitý a bolestivý.",food:0,wood:0,mats:0,morale:-3,threat:0,special:"injure"},
    ]
  },
  {
    id:"NL10", name:"Keř ostružiní", danger:false, fluff:false,
    desc:"Hustý keř ostružiní u zdi — starý, rozvětvený, s trny tak ostrými, že vypadají zlomyslně. Na konci léta je plný ovoce. Teď — na podzim — jsou poslední bobule tmavé a sladké a trochu kvašené. Myši sem chodí jako na výlet a vrací se s fialovou tlapou.",
    safe:"Průzkumníci si natrhají co mohou z okraje.",
    outcomes:[
      {w:3,type:"good",title:"Pozdní ostružiny",lore:"Tmavé, těžké, s koncentrovanou sladkostí pozdního léta. Průzkumníci jich snědli víc, než přinesli — ale co přinesli, to bylo dost. Kopřiva řekla, že ostružiny jsou nejblíže k letní bouři, jak se dá přijít v říjnu.",food:9,wood:0,mats:0,morale:8,threat:0},
      {w:1,type:"good",title:"Podzimní kvašení",lore:"Přezrálé ostružiny v teplém místě kvasí přirozeně. Průzkumníci přinesli nádobku zahuštěné šťávy — ne víno přesně, ale ne daleko. V noře provonělo vzduch a výjimečně bylo ticho bez ticha.",food:4,wood:0,mats:0,morale:12,threat:0},
      {w:1,type:"bad",title:"Trny si vybraly daň",lore:"Ostružiní neberou vždy rádi. Jeden průzkumník se zamotat příliš hluboko a výstup byl bolestivý. Vrátil se s jahodami, trhlinami v plášti a důstojností napůl.",food:3,wood:0,mats:0,morale:-3,threat:0,special:"injure"},
    ]
  },
  {
    id:"NL11", name:"Lidské schodiště", danger:false, fluff:true,
    desc:"Tři betonové schodky vedou nikam — dveře, ke kterým vedly, jsou dávno pryč. Zbyl pouze základ a schody. Z myší perspektivy jsou schodky jako platformy, amfiteátr, vyhlídka. Myši sem lezou nahoru jen proto, aby byly výše.",
    safe:"Průzkumníci vylezou na nejvyšší schod a rozhlédnou se.",
    outcomes:[
      {w:3,type:"fluff",title:"Vyhlídka na zahradu",lore:"Z nejvyššího schodu je vidět přes trávu. Průzkumníci stáli nahoře a dívali se — na zeď, na kompost, na místo kde by mohla být jiná nora. Lopuch řekl, že svět je jiný z výšky. Ostružina řekla, že tři schody nejsou výška. Oba měli pravdu.",food:0,wood:0,mats:0,morale:4,threat:0},
      {w:1,type:"fluff",title:"Pod schody zásobárna",lore:"Pod posledním schůdkem je mezera — přesně tak velká, aby se tam schovala jedna brašna. Průzkumníci si to zapamatují jako záložní ukrývací místo. Ne velké. Ale suché.",food:0,wood:0,mats:2,morale:2,threat:0},
    ]
  },
  {
    id:"NL12", name:"Spadlý dřevěný plot", danger:false, fluff:false,
    desc:"Starý dřevěný plot padl celý — ne po kouscích, ale najednou, jako když se někdo rozhodne lehnout si. Leží v trávě a hnijí. Nebo ne úplně hnijí — části jsou stále dobré. Myši chodí pro dřevo a vrací se s víc než čekaly.",
    safe:"Průzkumníci zkontrolují stav dřeva.",
    outcomes:[
      {w:3,type:"good",title:"Stavební dřevo",lore:"Padlý plot je jiný než stojící plot. Stojící plot má majitele. Padlý plot má zájemce. Průzkumníci vzali nejlepší kusy — suché, pevné, bez plísně — a přinesli zásobu, která vydrží sezónu staveb.",food:0,wood:8,mats:2,morale:0,threat:0},
      {w:1,type:"good",title:"Hmyz pod plotem",lore:"Pod plotem v hlíně je komunita hmyzu — brouci, červi, larvy. Průzkumníci to nejedí normálně. Ale tady, po dlouhé výpravě, snědli hrst a žádnému nebylo líto.",food:4,wood:2,mats:0,morale:0,threat:0},
      {w:1,type:"bad",title:"Příliš shnilé",lore:"Co vypadalo pevně, bylo dutý. Průzkumník se opřel — ruka prošla. Dřevo měkké jako mech. Celá ta cesta pro nic.",food:0,wood:0,mats:0,morale:-4,threat:0},
    ]
  },
  {
    id:"NL13", name:"Opuštěné ptačí krmítko", danger:false, fluff:false,
    desc:"Dřevěné krmítko na tyči — lidé přestali doplňovat, ptáci přestali přicházet. Co zbylo, zbylo. Z myší výšky je krmítko jako věž. Přístupy jsou složité. Ale uvnitř — semena a sušené bobule, zapomenuté a netknuté.",
    safe:"Průzkumníci obkrouží tyč a odhadnou zásoby.",
    outcomes:[
      {w:2,type:"good",title:"Ptačí zásoby — semena",lore:"Krmítko bylo naposledy doplněno pozdě v létě. Směs semen určená pro ptáky je pro myš pokladem — slunečnice, proso, konopí. Průzkumníci strávili hodinu vynášením. Ptáci se nevrátili. Myši ano.",food:11,wood:0,mats:0,morale:3,threat:0},
      {w:1,type:"good",title:"Sušené bobule",lore:"Spolu se semeny hrstka sušených bobulek — brusinky nebo jeřabiny, těžko říct. Tvrdé, kyselé a výborné. Průzkumníci je snědli na místě a neomlouvali se.",food:5,wood:0,mats:0,morale:7,threat:0},
      {w:1,type:"bad",title:"Krahujec na hlídce",lore:"Krmítko opuštěné ptáky neznamená opuštěné dravci. Krahujec seděl na tyči tak klidně, jak sedí věci, které se ničeho nebojí. Průzkumníci se otočili velmi pomalu a odešli velmi tiše.",food:0,wood:0,mats:0,morale:-8,threat:2},
    ]
  },
  {
    id:"NL14", name:"Betonový obrubník", danger:false, fluff:true,
    desc:"Řada obrubníků vymezuje starý záhon — záhon je dávno pryč, ale obrubníky zůstaly jako hranice čehosi, co přestalo existovat. Myši chodí po obrubníku jako po vyvýšené stezce. Je to absurdní a přitom velmi uspokojivé.",
    safe:"Průzkumníci projdou celou řadu a vrátí se.",
    outcomes:[
      {w:3,type:"fluff",title:"Procházka po obrubníku",lore:"Ostružina šla po obrubníku celou délku — dvanáct kroků, rovnováha jako na laně — a na druhém konci se otočila. Přišla zpět stejnou cestou. Pak šla znovu. Průzkumníci čekali. Nebylo jim to nepříjemné. Má své místo, tahle věc, říká Ostružina.",food:0,wood:0,mats:0,morale:4,threat:0},
      {w:1,type:"fluff",title:"Starý záhon pod obrubníkem",lore:"Pod obrubníkem — v prostoru kde byl záhon — zůstala vynikající kypřená hlína. Jetel ji vzala hrst a přičichla. Řekla, že v ní ještě cítí léto. Přinesla domů trochu jako vzpomínku.",food:0,wood:0,mats:1,morale:3,threat:0},
    ]
  },
  {
    id:"NL15", name:"Hnízdiště čmelíků", danger:true, fluff:false,
    desc:"V kořenech starého keře je čmelí hnízdo — ne velké jako vosí, ale hustě obsazené. Čmeláci jsou pomalejší a mírumilovnější než vosy, ale rozhodně ne přátelé. Na podzim jsou nervózní — chystají se na zimu a neberou narušení lehce.",
    safe:"Průzkumníci sledují čmeláky ze vzdálenosti a vrátí se.",
    outcomes:[
      {w:1,type:"good",title:"Pozdní pylovník",lore:"Na kraji hnízda visí pylovník — zásobárna pylu pro larvy. Průzkumníci ho sebrali z vnější strany, velmi tiše, velmi pomalu. Pyl ve velké koncentraci je výživný a lepivý a voní jako celé léto najednou.",food:6,wood:0,mats:0,morale:5,threat:0},
      {w:1,type:"good",title:"Čmelí vosk",lore:"Malá vosková buňka odpadla z okraje hnízda — přirozená ztráta, ne krádež. Průzkumníci ji vzali. Čmelí vosk je jiný než včelí — měkčí, tmavší, voní po zemi. Jetel z něj udělá těsnění pro zimní zásobárnu.",food:0,wood:0,mats:4,morale:2,threat:0},
      {w:3,type:"bad",title:"Mobilizace hnízda",lore:"Čmeláci neútočí snadno. Ale útočí. Průzkumníci se dostali příliš blízko a hnízdo reagovalo. Útěk trval déle, než byl příjemný. Jeden průzkumník dostal tři vpichy — čmelák je větší než vosa, bodnutí tomu odpovídá.",food:0,wood:0,mats:0,morale:-7,threat:1,special:"injure"},
    ]
  },
  {
    id:"NL16", name:"Starý dětský vláček", danger:false, fluff:true,
    desc:"Plastový vláček leží v trávě — vagon, lokomotiva a jeden kus koleje, jinak vše chybí. Plast vybledlý, uvnitř vozu zaschlé bahno a semínko, které vyklíčilo. Z myší perspektivy je lokomotiva jako budova. Vagon jako dům.",
    safe:"Průzkumníci prohlédnou oba kusy a vrátí se.",
    outcomes:[
      {w:2,type:"fluff",title:"Dům ve vagonu",lore:"Uvnitř vozu je prostor pro tři myši, stín, relativní sucho a akustika, která způsobuje, že šepot zní jako zpěv. Průzkumníci tam seděli dlouho. Mluvili tiše. Přišli domů s pocitem, že navštívili jiné místo než místo.",food:0,wood:0,mats:0,morale:6,threat:0},
      {w:1,type:"fluff",title:"Semínko v lokomotivě",lore:"Uvnitř lokomotivy, v místě kde byl motor, roste bylinná rostlinka. Kořeny prorazily dno. Roste správně a bez omluvy uprostřed plastové věci. Průzkumníci ji obdivují. Jeden jí dá hrst hlíny navíc.",food:0,wood:0,mats:0,morale:4,threat:-1},
    ]
  },
  {
    id:"NL17", name:"Rozlitý terpentýn", danger:true, fluff:false,
    desc:"U kůlny je skvrna na zemi — terpentýn nebo lak, rozlitý dávno, teď zaschlý do tvrdé vrstvičky. Voní silně i roky poté. Hmyz se mu vyhýbá. Jiní predátoři ho neznají. Myši to vědí a používají jako zábranu — ale opatrně.",
    safe:"Průzkumníci dají od skvrny dostatečný odstup.",
    outcomes:[
      {w:2,type:"good",title:"Přirozená bariéra využita",lore:"Zaschlá skvrna tvoří přirozenou hranici, přes kterou hmyz neprojde. Průzkumníci zmapují její obvod a přinesou zprávu — tudy krysy nechodí, tudy mravenci odmítají. Informace stará za zlato.",food:0,wood:0,mats:0,morale:0,threat:-3},
      {w:1,type:"good",title:"Zbytky laků a pryskyřic",lore:"Na okraji skvrny jsou zbytky materiálu — zaschlé, ale stále elastické. Průzkumníci odnesou kousky jako těsnění a izolaci. Voní silně. Kopřiva otevřela okno.",food:0,wood:0,mats:5,morale:0,threat:0},
      {w:2,type:"bad",title:"Výpary",lore:"Větrný den roznesl výpary přesně špatným směrem. Průzkumníci dostali závratě a vrátili se domů přímou cestou, sedli si k zemi a čekali, až přejdou. Přešly. Ale byl to nepříjemný odpoledne.",food:0,wood:0,mats:0,morale:-5,threat:0,special:"injure"},
    ]
  },
  {
    id:"NL18", name:"Kopec z vykopaného hlíny", danger:false, fluff:false,
    desc:"Někdo kopal velkou díru a hlínu vyhodil do kopce. Díra je zarostlá — kopec zůstal. Pro myše je to hora. Výhled z vrcholu je nejlepší v zahradě, ale stoupání trvá. A sestup je rychlý různými způsoby.",
    safe:"Průzkumníci vyšplhají na vrchol, rozhlédnou se a sestoupí.",
    outcomes:[
      {w:2,type:"good",title:"Výhled — zpravodajství",lore:"Z vrcholu hlíněného kopce je vidět přes většinu zahrady — zeď, brána, kompost, skleník, místo kde je krysí doupě. Průzkumníci si zakreslili polohy a přinesli přesnější mapu okolí.",food:0,wood:0,mats:0,morale:3,threat:-2},
      {w:2,type:"good",title:"Hlína v kopci",lore:"Kypřená hlína v čerstvém kopci je jako zásobárna stavebního materiálu. Průzkumníci přinesli plné brašny. Nepaří ani nehoří, prostě hlína. Ale dobrá hlína.",food:0,wood:2,mats:4,morale:0,threat:0},
      {w:1,type:"bad",title:"Skluz z vrcholu",lore:"Hlína po dešti klouže jinak než před deštěm. Jeden průzkumník to zjistil nepříjemnou cestou. Odpoledne trvalo hodinu, aby se vysvlékl z bláta a začal vypadat jako myš a ne jako hlíněný váleček.",food:0,wood:0,mats:0,morale:-3,threat:0,special:"injure"},
    ]
  },
  {
    id:"NL19", name:"Zahradní socha — žába", danger:false, fluff:true,
    desc:"Betonová žába velikosti malé místnosti sedí v trávě s úsměvem, který pociťují myši jako podezřelý. Je to umělec's dílo nebo sériová výroba — těžko říct. Ale je tu. A bude tu déle než zahrada.",
    safe:"Průzkumníci ji obkrouží a vrátí se.",
    outcomes:[
      {w:2,type:"fluff",title:"Pod žábou sucho",lore:"Beton žáby zahřívá slunce a pod ní je malá suchá ploška. Průzkumníci si tam sedli. Ticho žáby bylo útěšné. Nebo aspoň neutrální. Ostružina říká, že žáby přinášejí štěstí. Nikdo se neptá, jak to ví.",food:0,wood:0,mats:0,morale:5,threat:-1},
      {w:2,type:"fluff",title:"Žábiny oči jsou orientační bod",lore:"Z žábiny polohy jde odvodit sever, přibližná vzdálenost k zdi a výška slunce v poledne. Průzkumníci to zjistili experimentálně. Kopřiva řekla, že tohle je nejužitečnější betonová žába, jakou kdy viděla.",food:0,wood:0,mats:0,morale:4,threat:0},
    ]
  },
  {
    id:"NL20", name:"Přetečená nádrž na vodu", danger:false, fluff:false,
    desc:"Plastová nádrž na zachytávání dešťovky — plná, přetékající, mírně zazelená. Voda je technicky pitná, prakticky načervenalá od rzi armatury. Kolem nádrže mokrá hlína a bujná vegetace. Myši sem chodí pro materiál, ne pro vodu.",
    safe:"Průzkumníci si přičichnou a přijdou s plánem.",
    outcomes:[
      {w:2,type:"good",title:"Vodní rostliny a materiál",lore:"Kolem nádrže bujná vegetace — vodní trávy, kapradiny, lekníny v miniaturním měřítku. Průzkumníci odnesli stonky a listy jako stavební a izolační materiál. Vodní rostliny jsou pevnější, než vypadají.",food:0,wood:3,mats:5,morale:2,threat:0},
      {w:2,type:"good",title:"Hmyz u vody",lore:"Kde je stojatá voda, je hmyz. Kde je hmyz, je jídlo. Průzkumníci to věděli a přišli připraveni. Přinesli víc, než čekali.",food:7,wood:0,mats:0,morale:0,threat:0},
      {w:1,type:"bad",title:"Kluzká hlína",lore:"Mokrá hlína kolem nádrže je hezká a zrádná. Průzkumník se sklouzl přímo do kaluže. Voda je studená. Hlína je všude. Cesta domů trvala déle než normálně.",food:0,wood:0,mats:0,morale:-4,threat:0,special:"injure"},
    ]
  },
  {
    id:"NL21", name:"Skládka lahví", danger:false, fluff:false,
    desc:"Za kůlnou hromada lahví — skleněné, plastové, jedna keramická. Nikdo je nevyhazoval aktivně, spíš je odkládal. Teď je tam tolik, že tvoří architekturu. Průchody, stíny, akustické jevy. Myši to znají jako tichý labyrint.",
    safe:"Průzkumníci projdou labyrintem a vrátí se.",
    outcomes:[
      {w:2,type:"good",title:"Lahev jako zásobník",lore:"Plastová láhev s víčkem je zásobník, který nepotřebuje opravy. Průzkumníci přinesli tři — dostatečně malé na transport, dostatečně velké na zásoby jedlé věci. Kopřiva je vyložila u vchodu do nory jako dekoraci i funkci.",food:0,wood:0,mats:6,morale:3,threat:0},
      {w:2,type:"good",title:"Zbytky v lahvích",lore:"V části lahví zůstaly zbytky — med zatuhlý do kamene, olej oxidovaný, ocet přítomný jako vzpomínka. Průzkumníci prozkoumali každou. Med vzali. Ocet nechali. Olej zkusili — chyba.",food:5,wood:0,mats:2,morale:4,threat:0},
      {w:1,type:"bad",title:"Skleněné střepy",lore:"Jedna lahev praskla dávno a střepy se rozptýlily. V houstnoucím šeru průzkumník nastoupil na jeden. Kůže na tlapce je tenká.",food:0,wood:0,mats:0,morale:-3,threat:0,special:"injure"},
    ]
  },
  {
    id:"NL22", name:"Hnízdo sýkorky", danger:false, fluff:true,
    desc:"V dutině staré jabloně je sýkorčí hnízdo — opuštěné na zimu, ale zachovalé. Tráva, mech, trochu peří. Z myší perspektivy je to hotelový pokoj, který patří někomu jinému.",
    safe:"Průzkumníci nahlédnou dovnitř a vrátí se.",
    outcomes:[
      {w:2,type:"fluff",title:"Architekt tu byl přede mnou",lore:"Hnízdo je postaveno s precizností, která zahanbuje. Každé vlákno na správném místě, každá vrstva s funkcí. Průzkumníci to studují jako studenti. Jeden si kreslí nákres. Říká, že příští nora bude jiná.",food:0,wood:0,mats:0,morale:5,threat:0},
      {w:1,type:"fluff",title:"Peří z hnízda",lore:"Hrstka peří — malá, měkká, světle žlutá. Průzkumníci je vzali. V noře z nich bude polštáření pro nejmenší spací místo. Sýkorka se vrátí na jaře a bude muset začít znovu. Je to trochu smutné. Trochu.",food:0,wood:0,mats:2,morale:4,threat:0},
    ]
  },
  {
    id:"NL23", name:"Dřevěná pergola", danger:false, fluff:false,
    desc:"Zahradní pergola — klenuté dřevo obrostlé popínavou rostlinou. Větší část popínavé rostliny odumřela, ale dřevěná kostra stojí. Je tu teplo i za deště. Myši z okolních vesnic sem chodí jako na místo setkání.",
    safe:"Průzkumníci se posadí pod pergolon a odpočinou.",
    outcomes:[
      {w:2,type:"good",title:"Dřevo pergoly",lore:"Části pergoly jsou staré ale pevné — dub nebo kaštan, nevadí. Průzkumníci odnesli co šlo uvolnit bez nástroje. Přinesli zásobu stavebního dřeva, která vydrží sezónu. A pod pergolon je stále co zbyde.",food:0,wood:7,mats:2,morale:0,threat:0},
      {w:2,type:"good",title:"Setkání s okolními myšmi",lore:"Pod pergolon seděly tři myši z jiné vesnice — chladné, trochu hladové, ale přátelské. Sdílely co věděly o zahradě. Průzkumníci se vrátili s informací o dvou bezpečných trasách a poloze zásobárny u severní zdi.",food:2,wood:0,mats:0,morale:8,threat:-1},
      {w:1,type:"bad",title:"Pergola skřípe",lore:"Stará dřeva. Přílišná váha průzkumníků na jednom místě. Skřípnutí. Pak pád malé části. Nikdo nebyl zasažen, ale nikdo nechtěl zůstat.",food:0,wood:0,mats:0,morale:-3,threat:1},
    ]
  },
  {
    id:"NL24", name:"Hlubší část zahrady — tmavá", danger:true, fluff:false,
    desc:"Na jihu zahrady, za přerostlým šeříkem, je část, kam slunce nedosahuje ani v létě. Vlhko. Mech po kotníky. Zvuky, které nedávají smysl. Myši z Vrbníku sem chodí výjimečně a nikdy samy.",
    safe:"Průzkumníci se zastaví na hranici a vrátí se.",
    outcomes:[
      {w:1,type:"good",title:"Zásoby ve tmě",lore:"Co neroste ve světle, roste ve tmě. Houby, mechy, kapradiny — celé ekosystémy bez slunce. Průzkumníci vzali opatrně a přesně. Přinesli zásoby, které v noře voní po místech kde světlo nevydrželo.",food:5,wood:0,mats:5,morale:0,threat:0},
      {w:2,type:"bad",title:"Ztracení v tmavé části",lore:"Orientace bez slunce je jiná dovednost. Průzkumníci ji neměli. Strávili hodinu hledáním cesty ven z přerostlého šeříku. Vrátili se pozdě, mokří a s méně odvahou než s jakou odešli.",food:0,wood:0,mats:0,morale:-8,threat:0,special:"injure"},
      {w:2,type:"bad",title:"Něco žije ve tmě",lore:"Ne krysa. Ne kuna. Něco jiného — větší, pomalejší, ale přítomné. Průzkumníci viděli pohyb bez zdroje a uslyšeli dech bez těla. Vrátili se rychle a mlčeli o tom hodinu.",food:0,wood:0,mats:0,morale:-10,threat:3},
    ]
  },
  {
    id:"NL25", name:"Kovová vana v trávě", danger:false, fluff:false,
    desc:"Stará smaltovaná vana leží v trávě — přinesena ze starého domu, zapomenuta v zahradě, osídlena přírodou. Uvnitř malý rybníček s žabincem. Venku po okrajích rez a smalt. Z myší výšky je vana jako malé město.",
    safe:"Průzkumníci obejdou vanu a zkontrolují okraje.",
    outcomes:[
      {w:2,type:"good",title:"Rybníček ve vaně",lore:"Žabinec v uvnitř vany žije. Pulci možná. Malé ryby určitě. Průzkumníci se dívali přes okraj dolů jako průzkumníci nad propastí — s úžasem, ne strachem. Přinesli zásoby z okrajů rybníčku.",food:6,wood:0,mats:2,morale:5,threat:0},
      {w:2,type:"good",title:"Smaltové střepy",lore:"Rez a praskající smalt na okrajích vany je materiál. Průzkumníci vzali větší kusy — rovné, tvrdé, ostré jako nůž. Jetel z nich udělá škrabky a nástroje.",food:0,wood:0,mats:6,morale:0,threat:0},
      {w:1,type:"bad",title:"Kluzký okraj",lore:"Smalt je kluzký. Průzkumník to zjistil v okamžiku, který byl příliš krátký na pochopení. Pád do vany nebyl vysoký. Ale vana je hluboká a výstup není jednoduchý.",food:0,wood:0,mats:0,morale:-4,threat:0,special:"injure"},
    ]
  },
  {
    id:"NL26", name:"Starý náhrobek mazlíčka", danger:false, fluff:true,
    desc:"Malý kamenný náhrobek u zdi — lidé pohřbili svého mazlíčka a označili místo. Jméno a data. Myši nečtou, ale cítí, že toto místo je jiné. Ticho zde je záměrné.",
    safe:"Průzkumníci se zastaví a ticho stráví chvíli v tichosti.",
    outcomes:[
      {w:3,type:"fluff",title:"Záměrné ticho",lore:"Je tu specifický druh klidu — ne prázdno, ale klid po rozhodnutí. Průzkumníci seděli u náhrobku a mlčeli. Nikdo navrhl odejít. Když odcházeli, Kopřiva řekla: 'Přijdeme znovu.' Neprozradila proč. Ale každý rozuměl.",food:0,wood:0,mats:0,morale:6,threat:-1},
      {w:1,type:"fluff",title:"Kytice u náhrobku",lore:"Kdo sem chodí přikládat kytice? Čerstvé — ne starší než den. Průzkumníci se na ně podívali a tiše odešli. Některé věci patří lidem.",food:0,wood:0,mats:0,morale:4,threat:0},
    ]
  },
  {
    id:"NL27", name:"Odpadkový koš bez dna", danger:false, fluff:false,
    desc:"Plný odpadkový koš — ale dno mu vyhnilo a obsah se prosypává. Co bylo uvnitř, teď leží pod košem. Myši to znají jako místo, které se obnovuje samo. Trochu jako magie, trochu jako smetiště.",
    safe:"Průzkumníci prohledají pod košem.",
    outcomes:[
      {w:3,type:"good",title:"Pod košem zásoby",lore:"Co lidé vyhazují. Co myši najdou. Průzkumníci prošli obsah systematicky — odložili co nehledat, vzali co použitelné. Suché chlebové kůrky. Zaschlý sýr. Zábalová fólie jako materiál. Přišli domů obtěžkáni.",food:8,wood:0,mats:4,morale:2,threat:0},
      {w:1,type:"good",title:"Zásobní nalezení",lore:"Tentokrát pod košem bylo méně jídla, ale víc materiálu — plastové víčka, provázky, kousek hliníkové fólie. Jetel jásala nad fólií. Sluší se, říká.",food:2,wood:0,mats:6,morale:3,threat:0},
      {w:1,type:"bad",title:"Nejedlé nebo jedové",lore:"Ne vše co voní jako jídlo je jídlo. Průzkumník ochutnal nesprávnou věc. Hodina odpočinku, trochu vody, trochu studu. Přišli domů s prázdnýma rukama.",food:0,wood:0,mats:0,morale:-5,threat:0},
    ]
  },
  {
    id:"NL28", name:"Potápivý chrobák", danger:false, fluff:true,
    desc:"V kaluži za plotem žije potápivý brouk — viditelný jen za jasných dní, pohybující se s přesností, která vypadá roboticky. Myši ho nazývají Kapitánem. Nikdy nevěděly proč. Prostě vypadá jako Kapitán.",
    safe:"Průzkumníci sedí u kaluže a pozorují.",
    outcomes:[
      {w:3,type:"fluff",title:"Kapitánova hodina",lore:"Brouk se pohyboval přesně, jako vždy. Průzkumníci sledovali hodinu bez pohnutí. Pak Lopuch řekl: 'Nezná nás.' A Kopřiva odpověděla: 'Je to lepší.' A bylo to přesně tak.",food:0,wood:0,mats:0,morale:5,threat:0},
      {w:1,type:"fluff",title:"Kaluž jako zásobník vody",lore:"Kde žije Kapitán, tam je čistá voda. Průzkumníci si napili a odnesli zásobu. Brouk si jich nevšiml. Nebo si jich nevšímal záměrně.",food:3,wood:0,mats:0,morale:3,threat:0},
    ]
  },
  {
    id:"NL29", name:"Nalezená fotografie", danger:false, fluff:true,
    desc:"U plotu leží fotografie — zmáčená, napůl ztrouchnivělá, ale stále rozpoznatelná. Myši nechápou, co je na obrázku. Ale cítí, že to bylo důležité pro někoho. To stačí.",
    safe:"Průzkumníci ji přinesou zpátky nebo nechají být.",
    outcomes:[
      {w:2,type:"fluff",title:"Vzpomínka neznámého",lore:"Průzkumníci přinesli fotografii domů. Sedí v noře u ohně a dívají se na ni. Lidské obličeje, místo, světlo, které neznají. Kopřiva říká, že na ní vidí radost — konkrétní, jmenovanou. Ostatní souhlasí. Připnuli ji ke stěně.",food:0,wood:0,mats:0,morale:7,threat:0},
      {w:1,type:"fluff",title:"Zanechat na místě",lore:"Průzkumníci ji nechali být. Není jejich. Ale na chvíli seděli vedle ní a mysleli na to, jak jsou věci spojené — fotografie, počasí, zahrada, myši, jaro.",food:0,wood:0,mats:0,morale:4,threat:-1},
    ]
  },
  {
    id:"NL30", name:"Kamenná zeď se skulinou", danger:false, fluff:false,
    desc:"Stará kamenná zeď — ne zahradní, ale hraniční, starší než zahrada. V ní skulina dost velká pro myš, dost tmavá pro tajemství. Na druhé straně zahrady, o které nevíte nic.",
    safe:"Průzkumníci si přiloží ucho ke skulině a naslouchají.",
    outcomes:[
      {w:2,type:"good",title:"Průchod na druhou stranu",lore:"Za skulinou je jiná zahrada — menší, divočejší, bez znaků lidské péče. A zásoby — přirozeně rostoucí, bez konkurence. Průzkumníci se protáhli skulinou a vrátili se obtěžkaní. Cestu si zapamatují.",food:9,wood:2,mats:3,morale:5,threat:0},
      {w:1,type:"good",title:"Skulina jako únikový tunel",lore:"Průzkumníci neprošli skulinou tentokrát — ale zapamatují si ji. Úniková cesta. Kdyby bylo nutné, je tu.",food:0,wood:0,mats:0,morale:4,threat:-2},
      {w:2,type:"bad",title:"Za zdí je pes",lore:"Psi jsou jiný druh nebezpečí než kočky — hlasitější, méně přesní, ale více vytrvalí. Za skulinou bylo štěkání. Průzkumníci se odtáhli od zdi velmi rychle. Pes nepřeleze zeď. Ale byl blíže, než bylo příjemné.",food:0,wood:0,mats:0,morale:-7,threat:2},
    ]
  },
  {
    id:"NL31", name:"Slimáčí dálnice", danger:false, fluff:true,
    desc:"Slizká stopa podél kůlny — slimáčí dálnice, aktivní v noci, viditelná ráno. Průzkumníci ji nazývají dálnicí protože je tak konzistentní. Každý den ve stejnou hodinu ve stejném směru. Slimáci jsou zvykloví.",
    safe:"Průzkumníci sledují stopu a vrátí se.",
    outcomes:[
      {w:2,type:"fluff",title:"Konzistentní jako příroda",lore:"Slimáčí stopa vede vždy ze stejného bodu do stejného bodu. Průzkumníci ji sledují ráno a uvědomí si, že příroda je zvyková stejně jako myši. Nebo myši jsou přírodní stejně jako slimáci. Kopřiva říká: 'To je uklidňující.' Nikdo neví proč. Ale souhlasí.",food:0,wood:0,mats:0,morale:4,threat:0},
      {w:1,type:"fluff",title:"Slizká stopa jako materiál",lore:"Slimáčí sliz je lepidlo. Průzkumníci to věděli, ale zapomněli, až to znovu zjistili. Sbírají ho opatrně — málo potřeba, hodně funkce. Jetel ho použije pro záplaty.",food:0,wood:0,mats:2,morale:2,threat:0},
    ]
  },
  {
    id:"NL32", name:"Zvonek u branky", danger:false, fluff:false,
    desc:"Malý zvonek visí u zahradní branky — mosazný, se srdcovitým jazyčkem. Zvoní když vítr fouká správným směrem. Myši ho slyší jako varování. Nebo jako hudbu. Záleží na větru.",
    safe:"Průzkumníci se zastaví a naslouchají.",
    outcomes:[
      {w:2,type:"good",title:"Varovný systém",lore:"Zvonek zvoní když vítr přichází od jihu — stejný vítr, který přináší kočku od jihu. Průzkumníci to zapamatují a zakreslí do své mapy větrů. Bude to užitečné.",food:0,wood:0,mats:0,morale:3,threat:-2},
      {w:2,type:"good",title:"Mosazný materiál",lore:"Část řetězu zvonku je volná — pohybuje se při větru a časem oslabila spoj. Průzkumníci opatrně uvolní jeden článek. Mosaz je kov na nástroje. Zvonek bude stále zvonit — jen trochu jinak.",food:0,wood:0,mats:4,morale:1,threat:0},
      {w:1,type:"bad",title:"Zvonek přivolá pozornost",lore:"Vítr zazvonit ve chvíli, kdy průzkumníci stáli přímo vedle. Zvuk byl hlasitý. Lidé v domě se podívali oknem. Průzkumníci se schovali za trávou a čekali. Dlouho.",food:0,wood:0,mats:0,morale:-4,threat:1},
    ]
  },
  {
    id:"NL33", name:"Zarostlá fontána", danger:false, fluff:false,
    desc:"Kamenná fontána — čerpadlo nefunguje, ale voda z dešťů zůstala. Kolem ní lekníny a vodní rostliny, uvnitř malá ekosystém. Z myší výšky je to jezero a les a zahrada najednou.",
    safe:"Průzkumníci obejdou fontánu a zkontrolují okraje.",
    outcomes:[
      {w:2,type:"good",title:"Fontánový ekosystém",lore:"Kolem fontány je hustý vodní svět — lekníny, kapradiny, vodní trávy. Průzkumníci vzali z každého něco. Přišli domů s rukama plnýma zelené hmoty voňavé po vodě a biologické aktivitě.",food:4,wood:2,mats:5,morale:5,threat:0},
      {w:2,type:"good",title:"Skrytá zásobárna pod fontánou",lore:"Pod kamenem fontány je dutina — ne přírodní, ale záměrná. Kdo ji tam udělal? Průzkumníci nenašli odpověď. Ale dutina je suchá a perfektní jako zásobárna.",food:3,wood:0,mats:4,morale:3,threat:0},
      {w:1,type:"bad",title:"Žáby v obraně",lore:"Fontánové žáby jsou větší než zahradní žáby a mají jiný temperament. Průzkumníci narušili teritorium špatnou cestou. Výsledek nebyl fyzicky nebezpečný, ale byl hlasitý a mokrý.",food:0,wood:0,mats:0,morale:-5,threat:0},
    ]
  },
  {
    id:"NL34", name:"Starý záhon levandule", danger:false, fluff:true,
    desc:"Záhon levandule — ne pěstovaný, ale přerostlý, rozrostlý za hranice záhonu, volný. Na podzim suchý a vonící koncentrovanou silou celého léta. Myši sem chodí a vracejí se voňavé.",
    safe:"Průzkumníci procházejí záhonem a vrátí se.",
    outcomes:[
      {w:3,type:"fluff",title:"Vůně léta na podzim",lore:"Suchá levandule na podzim voní jinak než živá v létě — koncentrovaněji, hloubkověji, jako vzpomínka na teplo. Průzkumníci seděli uvnitř záhonu a nemluvili. Přišli domů s vůní ve srsti, která vydržela dny. V noře to cítili všichni.",food:0,wood:0,mats:0,morale:8,threat:0},
      {w:1,type:"fluff",title:"Levandulové stonky",lore:"Suché stonky levandule jsou pevné a voňavé. Průzkumníci přinesli hrst — do nory, do spácích míst, do zásobárny jako odpuzovač hmyzu. Plíseň a hmyz nesnáší levanduli. Myši ji milují.",food:0,wood:0,mats:3,morale:5,threat:-1},
    ]
  },

];

const LOC_HEXES = {"E7":{c:4,r:3},"D3":{c:3,r:2},"G7":{c:6,r:4},"J7":{c:7,r:5},"A3":{c:1,r:1},"A7":{c:1,r:3},"C5":{c:2,r:4},"H7":{c:7,r:2},"D7":{c:3,r:5},"FL1":{c:5,r:1},"FL2":{c:8,r:3},"FL3":{c:0,r:5},"FL4":{c:2,r:6},"FL5":{c:6,r:2},"B4":{c:1,r:5},"B7":{c:4,r:6},"C3":{c:5,r:5},"NL01":{c:0,r:0}, "NL02":{c:0,r:1}, "NL03":{c:0,r:2}, "NL04":{c:0,r:6},
  "NL05":{c:1,r:0}, "NL06":{c:1,r:2}, "NL07":{c:1,r:4}, "NL08":{c:2,r:1},
  "NL09":{c:2,r:3}, "NL10":{c:2,r:5}, "NL11":{c:3,r:0}, "NL12":{c:3,r:1},
  "NL13":{c:3,r:3}, "NL14":{c:3,r:6}, "NL15":{c:4,r:0}, "NL16":{c:4,r:2},
  "NL17":{c:4,r:5}, "NL18":{c:5,r:0}, "NL19":{c:5,r:2}, "NL20":{c:5,r:3},
  "NL21":{c:6,r:0}, "NL22":{c:6,r:1}, "NL23":{c:6,r:3}, "NL24":{c:6,r:6},
  "NL25":{c:7,r:0}, "NL26":{c:7,r:1}, "NL27":{c:7,r:4}, "NL28":{c:7,r:6},
  "NL29":{c:8,r:0}, "NL30":{c:8,r:1}, "NL31":{c:8,r:2}, "NL32":{c:8,r:4},
  "NL33":{c:8,r:5}, "NL34":{c:8,r:6},};

const TERRAIN_LORE = {
  water:  ["Voda stojí nehybně mezi kořeny. Na hladině se zrcadlí nebe.","Kalná mělčina — ani ryby, ani chyba. Jen mokrá zem a vůně bahna."],
  dense:  ["Houštiny tak husté, že denní světlo dopadá jako přes plátno.","Trní a kopřivy. Průchod možný, ale ne příjemný."],
  meadow: ["Otevřená plocha, tráva po kolena. Krásné místo zemřít, říkají průzkumníci.","Suché stébla šustí. Semena ještě visí — pozdní sklizeň."],
  forest: ["Kořeny starého dubu sahají tak hluboko, že tudy vedou přirozené tunely.","Mech tlumí každý krok. Světlo sem přichází zeleně."],
  village:["Willowroot. Domov."],
};
function getTerrainLore(terrain) { const p=TERRAIN_LORE[terrain]||TERRAIN_LORE.forest; return p[Math.floor(Math.random()*p.length)]; }

// ── Engine ────────────────────────────────────────────────────────────────────
const HS=26, HCOLS=9, HROWS=7;
const VH={c:4,r:3};

function hneighbours(c,r) {
  const e=c%2===0;
  return [{c:c-1,r:e?r-1:r},{c:c-1,r:e?r:r+1},{c,r:r-1},{c,r:r+1},{c:c+1,r:e?r-1:r},{c:c+1,r:e?r:r+1}].filter(h=>h.c>=0&&h.r>=0&&h.c<HCOLS&&h.r<HROWS);
}
function revealAround(hexMap,locId) {
  const pos=LOC_HEXES[locId];if(!pos)return hexMap;
  const s=new Set(hexMap.revealed||[]);
  s.add(`${pos.c},${pos.r}`);hneighbours(pos.c,pos.r).forEach(h=>s.add(`${h.c},${h.r}`));
  return{...hexMap,revealed:[...s]};
}
function nearestUnrevealedHex(hexMap) {
  const revealed=new Set(hexMap.revealed||[]),visited=new Set(),queue=[{c:VH.c,r:VH.r}];
  visited.add(`${VH.c},${VH.r}`);
  while(queue.length){const{c,r}=queue.shift(),key=`${c},${r}`;if(!revealed.has(key))return{c,r};for(const nb of hneighbours(c,r)){const nk=`${nb.c},${nb.r}`;if(!visited.has(nk)){visited.add(nk);queue.push(nb);}}}
  return null;
}

function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
function mkMouse(fixedName) {
  const name=fixedName||pick(MOUSE_NAMES);
  const ld=STARTER_LORE[name]??generateLore(name);
  return{id:Math.random().toString(36).slice(2),name,fullName:ld.fullName,lore:ld.text,trait:pick(TRAITS).id,agingPerk:null,epithet:null,actionTurns:0,injured:false,lost:false,lostTurns:0,lostReason:"",history:[]};
}
function traitBonus(trait,action){
  if(action==="forage"&&trait==="green")return 1;if(action==="forage"&&trait==="forager")return 1.5;if(action==="forage"&&trait==="greedy")return -0.5;
  if(action==="explore"&&trait==="brave")return 1;if(action==="explore"&&trait==="swift")return 2;if(action==="explore"&&trait==="nervous")return -1;
  if(action==="haul"&&trait==="stocky")return 1;return 0;
}
function agingBonus(perk,action){
  if(!perk)return 0;
  if(perk==="veteran_scout"&&action==="explore")return 1;
  if(perk==="master_forager"&&action==="forage")return 1.5;
  if(perk==="night_eyes"&&action==="watch")return 1;
  if(perk==="set_in_ways"&&action==="explore")return -0.5;
  if(perk==="loud_joints"&&action==="explore")return -0.5; // threat penalty handled elsewhere
  return 0;
}
function pickWeighted(outcomes,s){
  const res=outcomes.map(o=>({...o,wv:typeof o.w==="function"?o.w(s):o.w}));
  const tot=res.reduce((a,o)=>a+o.wv,0);if(tot<=0)return res[0];
  let r=Math.random()*tot;for(const o of res){r-=o.wv;if(r<=0)return o;}return res[res.length-1];
}
function getAllBuildings(s){return[...s.buildings,...(s.extraBuildings||[])];}
function hasBldg(s,id){return getAllBuildings(s).find(b=>b.id===id)?.built;}
function applyOutcome(s,outcome){
  let ns=Effects.fromData(outcome)(s);
  if(outcome.special==="injure")ns=injureRandom(ns,"minor");
  if(outcome.special==="add_mouse"&&s.mice.length<8){const nm=mkMouse();ns={...ns,mice:[...ns.mice,nm]};}
  return ns;
}
function getSeason(t){
  if(t<=15)return{name:"Začátek podzimu",tg:0.8,ebc:0.18,label:"Začátek podzimu — dny jsou ještě teplé"};
  if(t<=30)return{name:"Konec podzimu",tg:1.2,ebc:0.25,label:"Konec podzimu — noci chladnou"};
  if(t<=39)return{name:"Předzimí",tg:1.8,ebc:0.35,label:"Předzimí — mráz na kořenech"};
  if(t<=44)return{name:"První mráz",tg:1.5,ebc:0.3,label:"První mráz — tráva křupe pod nohama"};
  if(t<=49)return{name:"Sněžení",tg:1.2,ebc:0.25,label:"Sněžení — vchod je napůl zaválen"};
  return{name:"Velké zamrznutí",tg:1.0,ebc:0.2,label:"Velké zamrznutí — toto je ta zima"};
}

// ── Zimní fáze ────────────────────────────────────────────────────────────────
const WINTER_PHASES = [
  {
    id:"frost", turn:40, name:"První mráz", icon:"❄",
    color:"#4a7aaa", bgColor:"#e8f0f8",
    intro:"Ráno přineslo první mráz. Tráva pod nohama křupí. Vzduch voní jinak — ostřeji, čistěji. Jetel říká, že to bude brzy. Všichni vědí, co myslí.",
    effects:"Sběr jídla: −30 %. Stavba: každá stavba trvá o 1 tah déle. Pohodlí: −3 body (mráz proniká štěrbinami).",
    forageMulti:0.7, buildPenalty:1, comfortDrain:3, foodDrain:0,
    choices:[
      {label:"Zateplit noru — stojí 5 dřeva",  desc:"Ucpat štěrbiny kůrou a mechem.",    effect:s=>({...Effects.wood(-5)(s),comfortPts:Math.max(0,(s.comfortPts||0)-1)}), lore:"Ruce krvácely od kůry. Ale průvan zmizel."},
      {label:"Vydržet bez příprav",             desc:"Zásoby zůstanou, ale bude chladno.", effect:s=>s, lore:"Mráz zůstal. Myši si zvykly. Trochu."},
    ],
    explores:[
      {type:"good",title:"Zmrzlý plástev",    lore:"Led konzervoval vše co v úlu zůstalo. Průzkumníci roztáli med u ohně.",food:6,wood:0,mats:2,morale:4,threat:0},
      {type:"good",title:"Stopy ve sněhu",    lore:"Čerstvé stopy vedly k zapomenutému zásobníku veverky.",food:8,wood:0,mats:0,morale:0,threat:0},
      {type:"good",title:"Mrznoucí ticho",    lore:"Predátoři se schovali. Průzkumníci se pohybovali svobodně.",food:0,wood:3,mats:3,morale:5,threat:-2},
      {type:"bad", title:"Zmrzlé prsty",      lore:"Příliš dlouho venku. Příliš málo pohybu.",food:0,wood:0,mats:0,morale:-6,threat:0,special:"injure"},
      {type:"bad", title:"Krysy se stahují",  lore:"Mráz žene krysy blíž k lidskému teplu — a k vašemu vchodu.",food:0,wood:0,mats:0,morale:-4,threat:3},
      {type:"good",title:"Zmrzlý potok",      lore:"Průzkumníci přešli potok po ledu. Za ním zásoby, o kterých nevěděli.",food:5,wood:2,mats:0,morale:3,threat:0},
    ],
  },
  {
    id:"snow", turn:45, name:"Sněžení", icon:"❆",
    color:"#2a5a8a", bgColor:"#dce8f5",
    intro:"Sníh padá od rána. Ticho je jiné než jiné ticho — hlubší, těžší. Vchod do nory je napůl zaválen. Ostružina říká, že v dětství tenhle zvuk milovala. Nikdo se nesmál.",
    effects:"Sběr jídla: −55 %. Stavba: zablokována. Pohodlí: −6 bodů celkem (průvan, vlhkost). Jídlo pasivně −1/tah.",
    forageMulti:0.45, buildPenalty:99, comfortDrain:3, foodDrain:1,
    choices:[
      {label:"Vyslat nouzové sběrače — riziko zranění", desc:"60 % šance na extra jídlo, 30 % zranění.",  effect:s=>{const r=Math.random();if(r<0.6)return Effects.food(6)(s);if(r<0.9)return injureRandom(Effects.food(3)(s),"minor");return injureRandom(s,"serious");}, lore:"Sníh byl po kolena. Vrátili se s čímkoli, co šlo."},
      {label:"Otevřít zimní zásoby — −8 jídla",         desc:"Dát každému víc. Morálka +10.",              effect:s=>({...Effects.compose(Effects.food(-8),Effects.morale(10))(s)}), lore:"Na chvíli to bylo jako podzim. Pak zásoby došly."},
      {label:"Přežít jen s tím co je",                  desc:"Morálka −8, zásoby nedotčeny.",               effect:s=>Effects.morale(-8)(s), lore:"Každý věděl, že to přejde. Pomohlo to jen trochu."},
    ],
    explores:[
      {type:"good",title:"Pod sněhem",          lore:"Tenká vrstva sněhu skrývá, ale také konzervuje. Průzkumníci odkryli zásoby.",food:7,wood:0,mats:4,morale:0,threat:0},
      {type:"good",title:"Sněhová tišina",      lore:"Sníh pohltil všechny zvuky. Průzkumníci se pohybovali zcela neslyšně.",food:0,wood:0,mats:0,morale:6,threat:-3},
      {type:"good",title:"Opuštěné ptačí hnízdo",lore:"Stará slaměná stavba plná peří a zapomenutých semen.",food:4,wood:2,mats:5,morale:3,threat:0},
      {type:"bad", title:"Sněhová bouře",        lore:"Průzkumníci se ztratili na hodinu. Vrátili se promrzlí a vyčerpaní.",food:0,wood:0,mats:0,morale:-8,threat:0,special:"injure"},
      {type:"bad", title:"Lišča stopa",          lore:"Čerstvá. Vedla přímo k vašemu vchodu a zpět. Liška zkoumá.",food:0,wood:0,mats:0,morale:-5,threat:4},
      {type:"good",title:"Zmrzlý strom — zásoby",lore:"Doupě v dutém stromě, zaváté sněhem, ale suché uvnitř.",food:3,wood:5,mats:2,morale:2,threat:0},
    ],
  },
  {
    id:"freeze", turn:50, name:"Velké zamrznutí", icon:"✦",
    color:"#1a3a6a", bgColor:"#d0dff0",
    intro:"Přišlo v noci. Ráno bylo vše jiné. Voda v zásobách zmrzlá. Vchod zazděný ledem. Svíčky hoří napolovic. Kopřiva seděla u ohniště a nedívala se na nic. Ví to. Všichni to vědí. Toto je ta zima.",
    effects:"Sběr jídla: −80 %. Stavba: zablokována. Pohodlí: −5 bodů navíc. Jídlo pasivně −2/tah. Morálka −5/tah.",
    forageMulti:0.2, buildPenalty:99, comfortDrain:5, foodDrain:2,
    choices:[
      {label:"Spálit zásoby dřeva pro teplo — −10 dřeva", desc:"Morálka +15, zastaví odliv morálky na 3 tahy.", effect:s=>({...Effects.compose(Effects.wood(-10),Effects.morale(15))(s),warmthTurns:(s.turn||0)+3}), lore:"Oheň hořel celou noc. Bylo to marnotratné a bylo to nutné."},
      {label:"Svolat shromáždění — příběhy u ohně",        desc:"Morálka +12, žádné zásoby.",                  effect:s=>Effects.morale(12)(s), lore:"Lopuch vyprávěl o prvním průzkumu. Jetel o tom, jak našla zahradu. Bylo pozdě, než si to uvědomili."},
      {label:"Přísná úsporná opatření",                    desc:"Spotřeba jídla −2/tah na 5 tahů, morálka −10.", effect:s=>({...Effects.morale(-10)(s),rationTurns:(s.turn||0)+5}), lore:"Každý dostal přesně dost. Nikdo se nesmál."},
    ],
    explores:[
      {type:"good",title:"Ledová krápníková komora",lore:"Průzkumníci našli přirozenou kryptu. Uvnitř zásoby jiné vesnice — opuštěné.",food:10,wood:0,mats:5,morale:0,threat:0},
      {type:"good",title:"Přežívající myš",         lore:"Sama, v dutém kořeni. Přidá se — pokud ji vezmete.",food:0,wood:0,mats:0,morale:10,threat:0,special:"add_mouse"},
      {type:"bad", title:"Zima bez dna",            lore:"Příliš daleko. Příliš zima. Průzkumníci se vrátili s prázdnýma rukama a prázdnýma očima.",food:0,wood:0,mats:0,morale:-12,threat:0,special:"injure"},
      {type:"bad", title:"Vlčí stopa",              lore:"Větší než liška. Starší než zahrada. Průzkumníci se vrátili velmi tiše a nezůstali venku.",food:0,wood:0,mats:0,morale:-10,threat:5},
      {type:"good",title:"Záchranná sáňka",         lore:"Lidský předmět, napůl pohřbený. Uvnitř — jako by pro vás.",food:6,wood:4,mats:6,morale:5,threat:0},
      {type:"good",title:"Ticho po bouři",          lore:"Nic nežije, nic neloví. Průzkumníci si vzali čas.",food:0,wood:0,mats:8,morale:8,threat:-2},
    ],
  },
];
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
  return{turn:1,maxTurns:50,phase:"assign",mice,assignments:{},food:20,foodCap:40,wood:10,woodCap:30,mats:6,matsCap:25,morale:60,threat:0,buildings:STATIC_BUILDINGS.map(b=>({...b})),extraBuildings:[],policies:[],buildQueue:null,pendingEvent:null,pendingExplore:null,pendingResult:null,pendingThreatEvent:null,policyChoices:[],curfew:0,blockedTurns:0,builderBlocked:0,blockedMouse:null,usedThreatEvents:[],usedGoodEvents:[],usedBadEvents:[],exploredLocs:[],hexMap:initHexMap(),comfortPts:0,craftedItems:[],craftQueue:null,winterPhase:null,warmthTurns:0,rationTurns:0,pendingStory:null,storyPage:null,usedStories:[],weather:null,weatherTurnsLeft:0,log:[{t:0,msg:"Vrbník se probouzí — první studený vítr zašumí dubem.",good:true,title:"Vrbník se probouzí",lore:"Nora voní starým dřevem a vlhkou zemí. Čtyři myši sedí v příšeří tukové svíčky. Venku je svět obrovský a je mu jedno."}]};
}
function initHexMap(){const rev=new Set();rev.add(`${VH.c},${VH.r}`);hneighbours(VH.c,VH.r).forEach(h=>rev.add(`${h.c},${h.r}`));return{revealed:[...rev]};}

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
  const season=getSeason(ns.turn),roll=Math.random();
  if(roll<(0.18+season.ebc)){
    const isGood=roll<0.18;
    const allPool=STATIC_EVENTS.filter(e=>e.type===(isGood?"good":"bad"));
    const usedKey=isGood?"usedGoodEvents":"usedBadEvents";
    const used=ns[usedKey]||[];
    // Vyfiltruj již použité — pokud jsou všechny použité, resetuj pool
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
  if(explorers.length>0){const braveCount=explorers.filter(m=>m.trait==="brave"||m.trait==="swift").length;ns.threat=Math.max(0,ns.threat-braveCount*(p.includes("scouts")?2:1));const target=nearestUnrevealedHex(ns.hexMap);if(target){const revSet=new Set(ns.hexMap.revealed||[]);revSet.add(`${target.c},${target.r}`);hneighbours(target.c,target.r).forEach(h=>revSet.add(`${h.c},${h.r}`));ns.hexMap={...ns.hexMap,revealed:[...revSet]};const locByHex={};STATIC_LOCATIONS.forEach(loc=>{const pos=LOC_HEXES[loc.id];if(pos)locByHex[`${pos.c},${pos.r}`]=loc;});const locAtHex=locByHex[`${target.c},${target.r}`];if(locAtHex){ns.pendingExplore={loc:locAtHex,hex:target};}else{const tv=(target.c*7+target.r*13)%17;const terr=tv<3?"water":tv<6?"dense":tv<9?"meadow":"forest";const terrainLore=getTerrainLore(terr);const terrLabel={water:"Voda",dense:"Houštiny",meadow:"Louka",forest:"Les"};
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
  // Starý crafting (zásoby→jídlo+dřevo)
  if(counts["craft"]>0&&hasBldg(ns,"workshop")){const u=Math.min(ns.mats,counts["craft"]*2);ns.mats-=u;ns.wood=clamp(ns.wood+Math.floor(u/2),0,ns.woodCap);ns.food=clamp(ns.food+Math.floor(u/2),0,ns.foodCap);}
  // Nový crafting předmětů
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
      // Zkontroluj upgrade pohodlí
      const prevLevel=getComfortLevel(prevPts);
      const newLevel=getComfortLevel(ns.comfortPts);
      const levelMsg=newLevel.level>prevLevel.level
        ?` Nora postoupila na: ${newLevel.name}!`:"";
      ns.log=[...ns.log,{t:ns.turn,msg:`${item.icon} ${item.name} dokončena. +${item.comfort} pohodlí.${levelMsg}`,good:true,title:item.name,lore:item.flavor}];
      ns.craftQueue=null;
    }
  }
  const active=ns.mice.filter(m=>!m.lost).length;const eat=active-(p.includes("strict_ration")?2:0)-(p.includes("communal")?1:0);const dry=allB.find(b=>b.id==="dryroom"&&b.built)?1:0;ns.food=clamp(ns.food-eat+dry,0,ns.foodCap);
  s.mice.forEach(m=>{if(m.trait==="cheerful"&&!m.lost)ns.morale=clamp(ns.morale+0.5,0,100);});
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
  const locByHex={};STATIC_LOCATIONS.forEach(loc=>{const pos=LOC_HEXES[loc.id];if(pos)locByHex[`${pos.c},${pos.r}`]=loc;});
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
  return(
    <div style={{padding:"8px 12px",background:bg,border:`2px solid ${bc}`,marginBottom:10,display:"flex",alignItems:"center",gap:10}}>
      <span style={{fontSize:20}}>{w.icon}</span>
      <div style={{flex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <Label style={{fontSize:12,color:bc}}>{w.label.toUpperCase()}</Label>
          <Label style={{fontSize:10,color:C.inkGhost}}>ještě {s.weatherTurnsLeft} {s.weatherTurnsLeft===1?"tah":"tahy"}</Label>
        </div>
        <div style={{fontFamily:sansInk,fontSize:10,color:C.inkFaded,marginTop:2}}>{w.desc}</div>
      </div>
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
    {s.mice.filter(m=>!m.lost).map(m=>{
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
  const pages=[
    {body:"Svět je velmi velký.\n\nVždy jste to věděli — tak, jak to myš vždy ví: v kostech, ve vousech, v té zvláštní kvalitě ticha, jež přichází těsně před útěkem.\n\nSvět je velmi velký a většině z něj je jedno, zda vůbec jste."},
    {body:"Postavili to Staří obři. Nikdo si je přesně nepamatuje — ale jejich trosky jsou všude. Rozsáhlé plochy šedého kamene, věže rezavého kovu, jeskyně ze skla a drátů.\n\nOdešli. Nebo se změnili v něco jiného. Nebo jsou stále tady a jednoduše vás nevidí.\n\nVychází to nastejno."},
    {body:"V tomto světě jsou věci, které loví.\n\nKočka, která se pohybuje s trpělivostí boha, jenž nemá co dokazovat.\n\nSova, která je starší než kočka, starší než zahrada.\n\nLiška, která je chytrá zákeřně osobním způsobem.\n\nNaučili jste se žít mezi nimi. Většinu sezón to stačí."},
    {body:"Ale léto je pryč.\n\nPocítili jste to nejprve ráno — jistá kvalita světla, ostrost ve vzduchu. Listí začíná padat. Noci trvají déle.\n\nZima už není pověst. Je to jistota, která se blíží."},
    {body:"Vaše vesnice se jmenuje Vrbník.\n\nJsou to čtyři myši v noře pod severní zdí zahrady, pahýl lojové svíčky, seznam zásob kratší, než byste si přáli, a ta zvláštní tvrdohlavá vřelost malých tvorů, kteří se rozhodli přežít.\n\nNení to mnoho.\n\nJe to dost pro začátek."},
    {heading:"Vrbník",body:"Svět je velmi velký.\n\nAle vy jste tady.\nA zimu lze přežít.\nA to je, když se nad tím pečlivě zamyslíte, celkem hodně."},
  ];
  const cur=pages[page];const isLast=page===pages.length-1;
  return(<div style={{background:C.parchment,minHeight:420,display:"flex",flexDirection:"column"}}><HeaderSVG/><div style={{flex:1,padding:"1.5rem 1.25rem",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
    <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:20}}>{pages.map((_,i)=>(<div key={i} style={{width:i===page?20:8,height:8,background:i===page?C.ink:C.stain,transition:"all 0.3s"}}/>))}</div>
    <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
      {cur.heading&&<div style={{fontFamily:inkFont,fontSize:32,fontWeight:"bold",fontStyle:"italic",color:C.ink,textAlign:"center",marginBottom:20}}>{cur.heading}</div>}
      <div style={{fontFamily:inkFont,fontSize:17,fontStyle:"italic",color:C.inkLight,lineHeight:2.0,textAlign:"center",maxWidth:500,margin:"0 auto",whiteSpace:"pre-line"}}>{cur.body}</div>
    </div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:24}}>
      {page>0?<InkBtn onClick={()=>setPage(p=>p-1)} style={{fontSize:13}}>← zpět</InkBtn>:<div/>}
      <InkBtn onClick={()=>isLast?onContinue():setPage(p=>p+1)} style={{fontSize:14,padding:"11px 24px",boxShadow:`3px 3px 0 ${C.ink}`}}>{isLast?"❧ Vstoupit do Vrbníku":"pokračovat →"}</InkBtn>
    </div>
    {!isLast&&<div style={{textAlign:"center",marginTop:12}}><button onClick={onContinue} style={{fontFamily:sansInk,fontSize:12,fontWeight:"bold",background:"none",border:"none",color:C.inkGhost,cursor:"pointer"}}>přeskočit úvod</button></div>}
  </div></div>);}

// ── Header & Menu Helpers ─────────────────────────────────────────────────────
function HeaderSVG(){return(<svg width="100%" viewBox="0 0 680 84" style={{display:"block",marginBottom:4}}><rect width="680" height="84" fill={C.parchment}/><rect x="6" y="6" width="668" height="72" fill="none" stroke={C.ink} strokeWidth="2.5"/><rect x="12" y="12" width="656" height="60" fill="none" stroke={C.ink} strokeWidth="1"/>{[38,58,78,98,582,602,622,642].map((x,i)=>(<g key={i}><line x1={x} y1="6" x2={x} y2="22" stroke={C.ink} strokeWidth="2"/><line x1={x} y1="62" x2={x} y2="78" stroke={C.ink} strokeWidth="2"/></g>))}<text x="340" y="45" textAnchor="middle" fontFamily={inkFont} fontSize="25" fontWeight="bold" fontStyle="italic" fill={C.ink}>O myších a zimě</text><text x="340" y="63" textAnchor="middle" fontFamily={sansInk} fontSize="11" letterSpacing="4" fill={C.inkFaded}>PŘÍBĚH VRBNÍKU</text></svg>);}

function SavePreview(){
  const[info,setInfo]=useState(null);useEffect(()=>{loadGame().then(d=>{if(d)setInfo(d);});},[]);if(!info)return null;
  const season=getSeason(info.turn);
  return(<InkBox style={{maxWidth:360,margin:"0 auto",padding:"14px 16px",textAlign:"left"}}><Label style={{marginBottom:6}}>ULOŽENÁ VES</Label><Title size={15} style={{marginBottom:4}}>Vrbník — Tah {info.turn} z {info.maxTurns}</Title><Label style={{fontSize:12,color:info.turn<=15?C.green:info.turn<=30?C.gold:C.red,marginBottom:10}}>{season.name.toUpperCase()}</Label><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:8}}>{[["⁂",Math.floor(info.food),info.foodCap],["⊞",Math.floor(info.wood),info.woodCap],["◈",Math.floor(info.mats),info.matsCap],["♡",Math.floor(info.morale),100]].map(([sym,val,cap])=>(<div key={sym} style={{fontFamily:sansInk,fontSize:13,fontWeight:"bold",color:C.inkFaded}}>{sym} {val}<span style={{opacity:0.5}}>/{cap}</span></div>))}</div><Label style={{fontSize:12}}>{(info.mice||[]).filter(m=>!m.lost).map(m=>m.name).join(", ")}</Label></InkBox>);}

function GameOver({s,onRestart}){
  const pass=s.food>=30&&s.wood>=20&&s.mats>=15&&s.morale>=30;
  // Všechny myši co přežily zimu dostanou přídomek (pokud ho nemají)
  const winterSurvivors=s.mice.filter(m=>!m.lost&&!m.epithet);
  return(<div style={{background:C.parchment,padding:"2rem",textAlign:"center"}}><div style={{fontSize:50,marginBottom:14}}>{pass?"🌾":"❄"}</div><Title size={26} style={{marginBottom:10,textAlign:"center"}}>{pass?"Vrbník přežívá":"Dlouhé mrazení"}</Title><p style={{fontFamily:sansInk,fontSize:14,fontWeight:"bold",color:C.inkFaded,lineHeight:1.8,maxWidth:440,margin:"0 auto 18px"}}>{pass?"Zásoby vydržely. Myši se tulily v teple a když přišlo první tání, stále tu byly — zpívaly, hádaly se a plánovaly jaro.":"Navzdory jejich statečnosti přišel mráz příliš brzy. Ale někde pod kořeny začínají malé tlapky znovu hýbat..."}</p><WinterCheck s={s}/><div style={{marginTop:18,marginBottom:18}}><Label style={{marginBottom:8}}>PŘÍBĚHY MYŠÍ</Label>{s.mice.filter(m=>(m.history||[]).length>0).map(m=>(<div key={m.id} style={{fontFamily:sansInk,fontSize:13,color:C.inkFaded,marginBottom:4}}><strong>{m.name}:</strong> {m.history.join(" · ")}</div>))}</div><InkBtn onClick={onRestart} style={{marginTop:4,padding:"13px 34px",fontSize:15}}>Začít znovu</InkBtn></div>);}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App(){
  const[s,setS]=useState(()=>initState());const[tab,setTab]=useState("overview");const[screen,setScreen]=useState("loading");const[hasSave,setHasSave]=useState(false);const[saveStatus,setSaveStatus]=useState("");const[selectedHex,setSelectedHex]=useState(null);
  const[showHelp,setShowHelp]=useState(false);

  useEffect(()=>{let cancelled=false;loadGame().then(d=>{if(!cancelled){setHasSave(!!d);setScreen("menu");}}).catch(()=>{if(!cancelled)setScreen("menu");});const fb=setTimeout(()=>{if(!cancelled)setScreen("menu");},3000);return()=>{cancelled=true;clearTimeout(fb);};},[]);
  useEffect(()=>{if(screen!=="game")return;saveGame(s);setSaveStatus("uloženo");const t=setTimeout(()=>setSaveStatus(""),2200);return()=>clearTimeout(t);},[s,screen]);

  function startNew(){deleteSave();setS(initState());setHasSave(false);setTab("mice");setSelectedHex(null);setScreen("intro");}
  function continueGame(){loadGame().then(d=>{if(d){setS(d);setSaveStatus("načteno");setScreen("game");}});}
  function returnToMenu(){setScreen("menu");setHasSave(true);}

  const availActions=ACTIONS.filter(a=>!(a.id==="craft"&&!hasBldg(s,"workshop")));

  function assign(mid,act){if(s.phase!=="assign")return;const m=s.mice.find(x=>x.id===mid);if(!m)return;if(m.injured&&act!=="rest")return;if(s.blockedMouse===mid)return;setS(p=>({...p,assignments:{...p.assignments,[mid]:act}}));}
  function setQueue(id){setS(p=>({...p,buildQueue:id}));}
  function setCraftQueue(id){setS(p=>({...p,craftQueue:p.craftQueue===id?null:id}));}
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
        {[["overview","Vesnice"],["mice","Myši"],["build","Stavby"],["map","Mapa"]].map(([id,lbl])=>(<InkBtn key={id} active={tab===id} onClick={()=>setTab(id)} style={{fontSize:12,flex:1,textAlign:"center",padding:"8px 2px"}}>{lbl}</InkBtn>))}
        <button onClick={()=>setShowHelp(true)} style={{fontFamily:sansInk,fontSize:14,fontWeight:"bold",background:C.parchmentDark,border:`2px solid ${C.ink}`,boxShadow:`2px 2px 0 ${C.ink}`,width:38,height:38,cursor:"pointer",flexShrink:0,color:C.inkFaded}}>?</button>
      </div>
      {tab==="overview"&&<VillageOverviewTab s={s}/>}
      {tab==="mice" &&<VillageTab s={s} availActions={availActions} assign={assign}/>}
      {tab==="build"&&<BuildTab   s={s} onQueue={setQueue} onQueueCraft={setCraftQueue}/>}
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
