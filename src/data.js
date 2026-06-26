// ── O myších a zimě — Datový soubor ─────────────────────────────────────────
// Zde jsou všechna herní data: rysy, akce, budovy, události, lokace, výpravy,
// příběhy, zimní fáze, pohodlí, počasí.
// Edituj tento soubor pro přidávání nebo úpravu herního obsahu.
// Po editaci App.jsx importuje vše automaticky.
// ─────────────────────────────────────────────────────────────────────────────

// ── Data: Rysy, Akce, Politiky ────────────────────────────────────────────────
export const MOUSE_NAMES = ["Lopuch","Jetel","Ostružina","Kopřiva","Sítina","Žaluď","Kapradí","Bodlák","Mech","Líska","Rákos","Šťovík","Střízlík","Cvrček","Dlažba","Žár","Popel","Křemen","Hloh","Řebříček","Jalovec","Oříšek","Bodlínek","Rákosník","Kamínek","Janovec","Rosa","Len","Kaštan"];
export const TRAITS = [
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
export const ACTIONS = [
  {id:"forage", label:"Sbírat jídlo",  glyph:"⁂", desc:"Shánět jídlo. Zelená tlapka a Rozená sběračka vynikají."},
  {id:"haul",   label:"Nosit dřevo",   glyph:"⊞", desc:"Shánět dřevo. Robustní myši toho unesou víc."},
  {id:"gather", label:"Shánět zásoby", glyph:"◈", desc:"Sbírat drobný materiál z okrajů zahrady."},
  {id:"build",  label:"Stavět",        glyph:"⌂", desc:"Pracovat na zařazené stavbě."},
  {id:"explore",label:"Průzkum",       glyph:"◎", desc:"Stopovat svět. Odhaluje hexagonální mapu."},
  {id:"rest",   label:"Odpočívat",     glyph:"☽", desc:"Obnovit morálku a léčit zranění."},
  {id:"watch",  label:"Noční hlídka",  glyph:"◉", desc:"Snížit hrozbu."},
  {id:"craft",  label:"Vyrábět",       glyph:"⚒", desc:"Vyžaduje Proutěnou dílnu. Přeměňuje zásoby na jídlo a dřevo."},
];
export const POLICIES = [
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

// ── Výpravy ───────────────────────────────────────────────────────────────────
export const EXPEDITIONS = [
  {id:"exp01", name:"Starý mlýn",           icon:"⚙",
   mice:2, turns:3, cost:{food:3,wood:0,mats:0},
   reward:{food:22,wood:10,mats:4,morale:10,comfort:0,threat:0},
   risk:0.25,
   lore:"Mlýn stojí na severním okraji zahrady déle než si kdokoli pamatuje — déle než Hlošina, déle než zeď. Kola se nepohybují a mlynářský kámen je pokryt mechem tak hustým, že vypadá jako záměrná výzdoba. Ale sklep pod ním zůstal suchý. Vždy suchý. Průzkumníci sestoupili po schodech tak úzkých, že museli jít bokem, s lucernou napřed a dechem zadržovaným skoro automaticky. Uvnitř: police. Polička za poličkou, každá označená písmem, které nikdo z nich nedokáže přečíst, ale jehož pečlivost mluví za sebe. Kdo to sem uložil, plánoval se vrátit. Plánoval to s takovou jistotou, že ani nepomyslel na možnost, že by se nevrátil. Zásoby čekaly. Tiše, trpělivě, v dokonalém suchu.",
   result_lore:"Přišli domů s brašnami tak plnými, že Ostružina šla poslední kus po čtyřech. Nikdo neřekl nahlas, komu to bylo původně určeno. Ale každý o tom myslel."},

  {id:"exp02", name:"Za severní zeď",        icon:"🧭",
   mice:3, turns:5, cost:{food:6,wood:0,mats:2},
   reward:{food:8,wood:6,mats:8,morale:22,comfort:12,threat:0},
   risk:0.3,
   lore:"Za severní zdí zahrady jsou jiné zahrady. To průzkumníci věděli. Co nevěděli: jak jiné. Přelezli zeď za soumraku — kus uvolněné malty, výklenek v omítce, padající list jako kryt — a sestoupili na druhou stranu do ticha, které nepatřilo jim. Louka bez hranic. Tráva jiné výšky, jiné vůně, jiná textura pod nohama. Starý strom, jehož kořeny sahaly pod obě zahrady zároveň. A v těch kořenech nora — opuštěná, ale ne davno. Uvnitř výzdoba ze sušených kvítků a kamínků uspořádaných do vzoru, který žádný z průzkumníků nedokázal pojmenovat, ale o kterém každý z nich věděl, že něco znamená. Seděli tam hodinu. Nepovídali. Pak šli domů. Nora se od té doby zdá jinak.",
   result_lore:"Přinesli pár kvítků a tři kamínky z cizí vzory. A pocit — který se nedá vysvětlit, jen unést — že domov je místo o němž jsi rozhodl, ne místo kde ses ocitl."},

  {id:"exp03", name:"Noční cesta ke hřbitovu", icon:"🌙",
   mice:2, turns:2, cost:{food:0,wood:0,mats:0},
   reward:{food:0,wood:0,mats:6,morale:14,comfort:0,threat:-5},
   risk:0.2,
   lore:"Malý hřbitov u zdi zahrady. Lidé sem chodí jednou za rok, vždy ve stejný den, vždy přinášejí stejné věci. Myši sem nechodí — nebo chodily kdysi, ale přestaly a nikdo si nepamatuje proč. Průzkumníci šli v noci, kdy tma je zbraň a svíčky lidí jsou daleko. Hřbitov je tichý jinak než les nebo zahrada. Tišší. Predátoři se mu vyhýbají obloukem tak samozřejmě, jako by to bylo přirozené — jako by místo samo vydávalo zvuk, který jen oni slyší. Průzkumníci si toho všimli. Prošli celý obvod, zmapovali vchody, zjistili že pod jedním náhrobkem je přirozená dutina ideální jako úkryt. Pak odešli stejnou cestou, tiše, beze spěchu.",
   result_lore:"Vrátili se mlčky, s malým kamenem každý — vzatým ne jako krádež, ale jako připomínka. Ráno bylo v noře ticho, které nebylo špatné. Jen hluboké. Přesně správné."},

  {id:"exp04", name:"Lidský sklep",           icon:"🪣",
   mice:3, turns:4, cost:{food:4,wood:0,mats:3},
   reward:{food:28,wood:12,mats:10,morale:6,comfort:0,threat:0},
   risk:0.35,
   lore:"Sklep pod starým domem na konci zahrady. Lidé ho otevírají jednou za sezónu — na jaře aby zkontrolovali, na podzim aby uložili. Myši ho znají jako legendu: místo kde zásoby přezimují lépe než kdekoli jinde, kde je sucho a chlad a police od podlahy ke stropu. Vchod je skulina za starou vodotrubkou, přesně dost velká pro dospělou myš s prázdnou brašnou. Zpátky s plnou je to jiné. Průzkumníci se proplétali regály s pokorou lidí v knihovně — každou věc otočili, přičichli, posoudili. Brali s rozvahou, ne s chamtivostí. Jablka, ořechy, kořeny, sušené houby, jeden věnec z česneku tak velký jako domeček. Vzali co unesli. Zbytek nechali přesně tam kde byl. Dvůr byl tichý. Pes spal.",
   result_lore:"Zásoby jsou těžké a výtečné a voní po místech, která myši normálně nenavštěvují. Jeden průzkumník měl na srsti skvrnu od džemu ještě tři dny. Nikdo se neptal jak přesně vznikla."},

  {id:"exp05", name:"Potoční rokle",           icon:"💧",
   mice:2, turns:3, cost:{food:2,wood:0,mats:2},
   reward:{food:12,wood:8,mats:14,morale:10,comfort:0,threat:-2},
   risk:0.2,
   lore:"Potok za zahradní zdí teče hlubší roklí než by kdokoli hádal z povrchu — jako by se země rozhodla jít do sebe. Myši ji znají jen z vyprávění: starší říkají, že tam roste co jinde neexistuje, že voda dole chutná jinak, že kdo ji jednou pil nikdy nepil nic lepšího. Průzkumníci sestoupili po kořenech jako po žebříku — krok za krokem, každý kořen testován tlapou před přenesením váhy. Dno: vlhké, mrazivě klidné, s světlem přicházejícím zboku jako v kostele. Kapradiny které nerostou jinde. Mechovité kameny hladké jako záměrně opracované. A hlína podél břehu bohatá tmavě hnědou barvou, která říká: tady roste vše. Pracovali dvě hodiny. Nikdo nemluvil víc než musel.",
   result_lore:"Rokle je skutečná a je tam víc než v legendách. Cesta zpět je strmá a ruce plné. Jeden průzkumník si vzal kámen z dna. Položil ho na práh nory. Řekl, že přináší štěstí. Nikdo se nehádal."},

  {id:"exp06", name:"Opuštěná zahradní chata", icon:"🏚",
   mice:2, turns:3, cost:{food:0,wood:0,mats:4},
   reward:{food:14,wood:20,mats:12,morale:8,comfort:5,threat:0},
   risk:0.25,
   lore:"Dřevěná chata na konci zahrady, kam lidé chodili v létě a přestali — nebo přestanou, nebo se schyluje k přestání. Okno chybí, dveře visí na jednom pantu, podlaha v jednom rohu prohnilá. Ale zbytek stojí. Průzkumníci vstoupili opatrně a okamžitě přestali být opatrní, protože uvnitř bylo to, co se uvnitř opuštěných chat vždy je: věci lidí, kteří plánovali vrátit se. Nástroje seřazené na hřebíčcích. Zásoby v plechových nádobách. Kus látky přeložený s pečlivostí, která naznačuje, že patřil někomu konkrétnímu. Průzkumníci prošli chatu jako detektivové — systematicky, bez spěchu, každou věc posoudili. Přinesli co mohli unést. Zbytek nechali přesně tam kde byl. Přesně tak.",
   result_lore:"Chata je velkorysá k těm, kdo přijdou s respektem. Dřevo z kůlny za chatou je staré a suché a vydrží celou zimu. To je dar, který ani nedali záměrně."},

  {id:"exp07", name:"Stará jabloň",             icon:"🍎",
   mice:2, turns:2, cost:{food:0,wood:0,mats:0},
   reward:{food:18,wood:0,mats:4,morale:16,comfort:0,threat:0},
   risk:0.15,
   lore:"Jabloň stojí uprostřed zahrady jako by ji zahrada postavila kolem sebe — ne naopak. Je starší než zeď, starší než dům, starší než kdo ví co. Průzkumníci přišli brzy ráno, kdy rosa drží jablka při zemi a vzduch voní způsobem, pro který myší jazyk nemá přesné slovo. Jablka jsou obrovská z myší perspektivy — každé jako balvan, voňavé a těžké a oranžovočervené barvou, která říká: jsem přesně to, čím mám být. Rozkrojit je kamenem. Nést po kouscích. Pracovat tiše a rychle a dobře, protože ráno má jen určitý počet hodin a pak přijdou ptáci a pak přijdou lidé a pak je pozdě.",
   result_lore:"Jablka voní celou cestu domů a celý první den v noře. Ten den nikdo nemluvil o zimě. Nebylo proč."},

  {id:"exp08", name:"Kompost — hlubinný průzkum", icon:"🌱",
   mice:2, turns:2, cost:{food:0,wood:0,mats:2},
   reward:{food:14,wood:6,mats:8,morale:6,comfort:3,threat:0},
   risk:0.1,
   lore:"Kompost za kůlnou. Myši ho znají zvenku: velký, teplý, vonící po rozkladu a transformaci. Průzkumníci šli dovnitř — opravdu dovnitř, do jeho vrstev. Kompost má vlastní geografii jako miniaturní kontinent: na povrchu vrstva suchých listů, čistá a chladná. Pod tím vrstva teplá a aktivní kde probíhají věci, o kterých je lepší nepřemýšlet. Pod tím vrstva starého dřeva v různých stadiích návratu k hlíně. A úplně dole — teplejší než kdekoli jinde v zahradě, teplejší než si mysl dokáže vysvětlit — tmavá hnědočerná hmota voňavá a hustá a bohatá způsobem, který příroda vynalezla sama bez pomoci. Průzkumníci sbírali vrstvu po vrstvě. Přišli domů vonět po zemi.",
   result_lore:"Zásoby z kompostu jsou podivné a výtečné a vydají dvojnásobek co jiné. Jeden průzkumník přinesl hroudu teplé hlíny jako suvenýr. Stojí u vchodu do nory a ještě týden voní. Jetel ho každé ráno přičichne."},

  {id:"exp09", name:"Vrabčí rada",              icon:"🐦",
   mice:3, turns:3, cost:{food:6,wood:0,mats:0},
   reward:{food:6,wood:4,mats:12,morale:18,comfort:0,threat:-4},
   risk:0.2,
   lore:"Vrabci a myši sdílejí zahradu v neutralitě, která trvá déle než si kdokoli pamatuje — ne přátelství, ale respekt vzdálenosti a uznání, že každý má v zahradě své místo. Průzkumníci přišli s dary připravenými podle tradice, kterou Lopuch znal z dětství a ostatní nevěděli že existuje: hrst prosa, kus čistého plátna, malá nádoba vody. Složili je u vrabčího stromu a čekali. Vrabci čekali taky. Pak přilétl nejstarší — šedý jako kamení, oči jako semínka — a začal mluvit jazykem pohybů a zvuků, který průzkumníci chápali pouze napůl. Ale napůl stačilo. Pohyby kočky. Poloha krysích doupat. Tři trasy přes zahradu kde v zimě není nebezpečno. Informace které se nedají koupit, jen získat.",
   result_lore:"Vrabci nezpívají pro myši. Ale tuto zimu zpívají trochu blíže a jednou nebo dvakrát, v mrazivém ránu, jeden z nich sedí na kameni u vchodu do nory a dívá se dovnitř. Jen tak."},

  {id:"exp10", name:"Ruiny staré fontány",       icon:"⛲",
   mice:2, turns:3, cost:{food:0,wood:2,mats:2},
   reward:{food:8,wood:6,mats:18,morale:10,comfort:6,threat:0},
   risk:0.2,
   lore:"Fontána uprostřed zahrady nefunguje třicet let — nebo čtyřicet, nebo déle. Kameníci ji začali opravovat a pak odešli a nikdo jiný nepřišel. Co zbylo: kamenná mísa plná listí a dešťové vody, potrubí ucpané bahnem, a výzdoba která nedává smysl pro zahradní fontánu — andělé s myšími výrazy, ryby s krídly, jedna postava která drží v rukou semínko a dívá se dolů s výrazem, jenž průzkumníci nedokážou přečíst ale přesto rozumějí. Průzkumníci sbírali odlomené kusy výzdoby jako artefakty starší civilizace. Mosazné šrouby z potrubí. Kus kamenné lišty hladký jako záměrně opracovaný. Věci, které byly krásné a teď jsou jen přesné.",
   result_lore:"Jeden průzkumník přinesl kamenný rybí ocas z výzdoby. Je v noře jako důkaz, že někdo v tomhle světě bral věci vážněji než bylo nutné. To je vzácné. To stojí za uchování."},

  {id:"exp11", name:"Noc na střeše kůlny",      icon:"⭐",
   mice:2, turns:2, cost:{food:2,wood:0,mats:0},
   reward:{food:0,wood:0,mats:4,morale:24,comfort:8,threat:-2},
   risk:0.15,
   lore:"Střecha kůlny je plochá a teplá od slunce ještě hodinu po západu slunce — teplo uložené celý den v šedé břidlici, vydávané pomalu do noci jako pomalé dýchání. Průzkumníci tam šli bez konkrétního plánu, jen s vědomím, že někdy je účel výpravy sám výstup — vzdálit se dost daleko, aby bylo vidět zpátky. Z výšky střechy je zahrada jiná. Menší. Přehledná. Zeď která vypadá obrovská ze země je odtud jen čára. Hlošina — nora, kouř z komína, svit lucerny ve vchodě — je odtud tečka. Malá, útlá, teplá. Průzkumníci leželi na teplé břidlici a dívali se na hvězdy a mysleli na věci, o kterých se doma nemluví. Vrátili se před svítáním.",
   result_lore:"Střecha není výprava v normálním smyslu. Ale průzkumníci říkají — všichni, nezávisle, aniž by se domluvili — že to bylo to nejpotřebnější co za poslední dobu udělali."},

  {id:"exp12", name:"Výprava pro léčivé byliny", icon:"🌿",
   mice:2, turns:3, cost:{food:0,wood:0,mats:3},
   reward:{food:10,wood:0,mats:8,morale:12,comfort:6,threat:0},
   risk:0.1,
   lore:"Jetel má seznam. Psaný na kousku kůry, doplňovaný roky, každá položka s poznámkou kdy sbírat a odkud a jak. Máta od severní zdi — jen listy, ne stonek, jen ráno, jen před rozkvetením. Levandule z jižního záhonu — jen vrcholky, rukou ne nástrojem, jen v poledne kdy vůně je nejsilnější. Šípková matka — co to je, Jetel odmítá vysvětlit, ale říká, že to poznáš podle zápachu a pokud váháš jestli to je ona, není. Průzkumníci šli se seznamem a s porozuměním, že Jetel je ten kdo ví a oni jsou jen ruce které jdou tam kam ona nemůže.",
   result_lore:"Vrátili se s brašnami vonícími jako koncentrované léto. Jetel zkontrolovala každou bylinu zvlášť, nic neřekla, ale složila věci do zásobárny s péčí která prozrazovala víc než slova."},

  {id:"exp13", name:"Tajná krysí stezka",        icon:"⚠",
   mice:3, turns:4, cost:{food:0,wood:0,mats:5},
   reward:{food:4,wood:4,mats:6,morale:8,comfort:0,threat:-8},
   risk:0.4,
   lore:"Krysy mají stezky. Myši to vědí — vždy věděly — ale nikdy je neprozkoumaly, protože prozkoumávat krysy znamená jít tam kde krysy jsou, v čase kdy krysy jsou tam, a to je přesně opak toho, co myší instinkt říká dělat. Průzkumníci šli v trojici, ve tmě noci kdy bylo zamračeno, s jasným příkazem: pozorovat, zaznamenávat, neinteragovat. Stezky vedou kolem zahrady jako síť — každá označená pachovými značkami ve výšce krysí hlavy, každá s vlastním rytmem pohybu. Průzkumníci sledovali tři hodiny. Zaznamenali vše. Vrátili se s mapou, která neexistovala před touto nocí.",
   result_lore:"Mapa krysích stezek je nejcennější věc, která v posledním čase přišla do Hlošinau. Ne proto, co na ní je — ale proto, co díky ní víte, kudy nechodit."},

  {id:"exp14", name:"Liščí nora — průzkum",      icon:"🦊",
   mice:3, turns:5, cost:{food:4,wood:0,mats:4},
   reward:{food:6,wood:6,mats:6,morale:14,comfort:0,threat:-7},
   risk:0.45,
   lore:"Liščí nora je na jihu zahrady, za starým ostružiním, označená pachem který myši poznají ze dvou metrů a který říká: tady bydlí něco většího a chytřejšího než ty. Průzkumníci věděli, že liška je pryč — sledovali ji odcházet brzy ráno, směrem který napovídal, že se nevrátí před večerem. Šli rychle a tiše, bez zbytečných slov. Nora je větší než čekali. Chodby se větvily do tmy a průzkumníci prošli jen první pětinu — dost daleko aby věděli kde je, jak velká je, co v ní je, a jak daleko sahají ty části, do kterých nešli. Prošli zpátky přesně svými stopami. Vchod byl stále prázdný.",
   result_lore:"Liška se vrátí. Ale teď víte o ní víc než ona neví o vás — a to je situace, která se stává jen jednou, a průzkumníci to vědí, a nikdo z nich to neřekl nahlas, ale všichni o tom celou cestu domů přemýšleli."},

  {id:"exp15", name:"Potoční zdroj",             icon:"🏔",
   mice:2, turns:4, cost:{food:4,wood:0,mats:0},
   reward:{food:16,wood:4,mats:10,morale:14,comfort:6,threat:0},
   risk:0.25,
   lore:"Potok začíná někde výše — průzkumníci to vždy věděli, ale nikdy nešli hledat kde. Je to druh vědomosti, která čeká na správný čas: vědět, ale nešel. Tentokrát šli. Sledovali vodu proti proudu hodinu, dvě, přes kameny a kořeny a jedno místo kde potok zmizel pod zemí a průzkumníci ho hledali dalších dvacet minut po zvuku. Zdroj je pramen v kořenech starého javoru — tichý, jasný, tak čistý že dno je vidět na metr hloubky přes vodu průzračnou jako vzduch. Průzkumníci si klekli a pili přímo ze zdroje. Voda chutná jinak. Chutná jako začátek věcí.",
   result_lore:"Přinesli plné nádoby a zásoby z okolí pramene — rostliny které jinde nerostou, kameny které nosí vodu jinak. A vzpomínku na to, jak chutná voda než se smíchá se světem."},

  {id:"exp16", name:"Včelí louka",               icon:"🌸",
   mice:2, turns:3, cost:{food:0,wood:0,mats:2},
   reward:{food:18,wood:0,mats:6,morale:16,comfort:4,threat:0},
   risk:0.2,
   lore:"Za zahradní branou je louka, na které průzkumníci nikdy nebyli a o které věděli jen to, že je tam a je velká. Velká je podhodnocení. Z myší perspektivy je to kontinent — tráva po pás, cizí pachy z každé strany, barvy, které zahrada nemá: žluté a modré a fialové a jedná bílá tak hustá, že vypadá jako sníh v létě. A včely. Tisíce včel, pohybujících se vzory tak pravidelnými, že průzkumníci chvíli stáli bez pohnutí jen aby viděli. Pak se pohybovali mezi nimi — tiše, pomalu, v jejich rytmu — a včely je ignorovaly jako kameny nebo trávu nebo jiné věci, které jsou prostě tam.",
   result_lore:"Med ze včelí louky je tmavý a hustý a chutná jinak než med z úlů — koncentrovaněji, hlouběji, jako by v sobě měl celou louku najednou. Průzkumníci přinesli co mohli unést. Nestačilo."},

  {id:"exp17", name:"Zimní výprava za zásobami", icon:"❄",
   mice:3, turns:3, cost:{food:6,wood:3,mats:0},
   reward:{food:24,wood:14,mats:10,morale:6,comfort:0,threat:0},
   risk:0.35,
   lore:"Zima mění zahradu v jiné místo — tiché, bílé, nebezpečné jinými způsoby než podzim. Ale také velkorysé jinými způsoby. Zmrzlá zahrada vydá co skrývala: zásoby jiných tvorů uložené a zapomenuté, věci zanechané před zimou v místech která jsou teď přístupná protože vegetace zmizela, přirozené zásobárny v kořenech a dutinách stromů kde je zima paradoxně teplo. Průzkumníci věděli co dělají — tato výprava byla plánovaná, připravená, se zásobami na cestu, s mapou, s jasným rozpisem kdo jde kam. Vrátili se zmrzlí a obtěžkaní a trochu pyšní způsobem, který nelze pojmenovat ale lze poznat.",
   result_lore:"Zima je nepřítel a zásobárna zároveň, pro ty kdo ji berou vážně a ne jen jako čas přežívání. Průzkumníci to věděli před výpravou. Teď to vědí v těle."},

  {id:"exp18", name:"Setkání s cizí vesnicí",    icon:"🏘",
   mice:3, turns:5, cost:{food:8,wood:0,mats:4},
   reward:{food:12,wood:10,mats:10,morale:24,comfort:8,threat:-3},
   risk:0.3,
   lore:"Zprávy o jiné myší vesnici na jihu zahrady přicházejí nepravidelně — jednou od průzkumníka, jednou od potulné myši, jednou z vyprávění, která si nikdo není jistý odkud pochází. Průzkumníci šli s dary: semena zimní odrůdy, kus čistého plátna, malá nádoba starého medu. Vesnice se jmenuje Kořen — nebo tak jim to průzkumníci přeložili, protože původní jméno je zvuk, který myší hrdlo dělá obtížně. Je menší než Hlošina a starší a jiná v každém smyslu: jiné budovy, jiné zvyky, jiný způsob sdílení zásoby. Seděli celý odpoledne. Vyměňovali příběhy. Přijali reciproční dary. Odešli jako jiní než přišli.",
   result_lore:"Kořen existuje. Jsou tam myši, které přežívají, které mají tradice, které znají věci, které Hlošina nezná. To je vzácnější a cennější než jakékoli zásoby — vědomí, že nejste sami."},

  {id:"exp19", name:"Skleník za zahradou",       icon:"🌿",
   mice:2, turns:3, cost:{food:0,wood:2,mats:4},
   reward:{food:20,wood:10,mats:14,morale:8,comfort:0,threat:0},
   risk:0.2,
   lore:"Skleník za zahradní zdí — ne ten v zahradě, jiný, větší, patřící sousedním lidem kteří ho používají méně než by měli. Sklo je z části rozbité, z části opravené plexisklem, z části jen díry zakryté plastovou fólií. Teplota uvnitř je vyšší než venku o celých deset stupňů. Průzkumníci to věděli z dálky — ze způsobu jak nad ním v zimě stoupá pára. Vstoupili skulinou v základech, prošli celý prostor systematicky a v tichu. Rajčata ve třech vývojových stádiích. Tykve tak velké, že průzkumníci je nemohou odnést celé — jen kousky, odříznuté kamenem. Zásoby kovů z kovové kostry. Plné tři hodiny práce.",
   result_lore:"Skleník je štědrý k těm, kdo přijdou s časem a trpělivostí a bez chamtivosti. Průzkumníci vzali co mohli unést. Zbytek nechali. Skleník bude stát i příští sezónu."},

  {id:"exp20", name:"Noční mapování zahrady",    icon:"🗺",
   mice:2, turns:4, cost:{food:2,wood:0,mats:3},
   reward:{food:4,wood:4,mats:6,morale:12,comfort:0,threat:-8},
   risk:0.2,
   lore:"Zahrada v noci je jiné místo než zahrada ve dne — jinak vonící, jinak zvučící, jinak nebezpečná a jinak bezpečná zároveň. Průzkumníci šli s jedinou svíčkou ve skleněné nádobce, s zápisníkem z kůry a kouskem uhlí, a s instrukcí od Kopřivy: zaznamenat vše, ne jen co vidíte. Co slyšíte. Co cítíte. Co chybí oproti dni. Pracovali čtyři hodiny. Noc se proměnila třikrát — v jednu byla tichá, ve tři přišel vítr, před svítáním bylo ticho jiné než ve dvě. Zaznamenali pohyby, stezky, pachové linie, místa kde se tma hromadí a místa kde se tma vyhýbá. Vrátili se s mapou, která neexistovala před touto nocí.",
   result_lore:"Mapa noci visí v noře vedle mapy dne. Průzkumníci se na ní dívají ráno a připomínají si, co zahrada dělá když si myslí, že ji nikdo nevidí. Mapa říká: my jsme viděli."},
];



// ── Stárnutí myší ─────────────────────────────────────────────────────────────
export const AGING_PERKS = [
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
// ── Přídomky myší ─────────────────────────────────────────────────────────────
export const EPITHETS = {
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
// ── Počasí ────────────────────────────────────────────────────────────────────
export const WEATHER_TYPES = [
  {id:"sunny",      label:"Slunečno",     icon:"☀",duration:[2,4],foodMod:0.5, woodMod:0,  matsMod:0.5,moraleMod:0.3, threatMod:-0.3,desc:"Teplé světlo. Sběrači se vrátí dřív.",         lore:"Svět ve slunci vypadá zvladatelně."},
  {id:"cloudy",     label:"Zataženo",     icon:"☁",duration:[1,3],foodMod:0,   woodMod:0,  matsMod:0,  moraleMod:0,   threatMod:0,   desc:"Šedé nebe. Nic zvláštního.",                   lore:"Dny bez charakteru. Myši pracují stejně."},
  {id:"rainy",      label:"Déšť",         icon:"⛆",duration:[1,3],foodMod:-1,  woodMod:1,  matsMod:0,  moraleMod:-0.5,threatMod:-0.5,desc:"Sběr -1, dřevo +1. Predátoři se schovají.",   lore:"Déšť voní po zemi. Kočky nemají rády déšť."},
  {id:"windy",      label:"Větrno",       icon:"≋",duration:[1,2],foodMod:-0.5,woodMod:0,  matsMod:1,  moraleMod:-0.3,threatMod:0.3, desc:"Zásoby +1. Hluk maskuje pohyb predátorů.",     lore:"Vítr nosí zvuky odjinud. A maže stopy."},
  {id:"foggy",      label:"Mlha",         icon:"░",duration:[1,2],foodMod:0,   woodMod:0,  matsMod:0,  moraleMod:-0.5,threatMod:1,   desc:"Hrozba +1. V mlze nikdo nevidí nic.",          lore:"Mlha je rovná příležitost — pro myši i predátory."},
  {id:"frosty",     label:"Mrazivé ráno", icon:"❄",duration:[1,2],foodMod:-1,  woodMod:0,  matsMod:0,  moraleMod:-1,  threatMod:0.5, desc:"Jídlo -1. Zásoby tuhnou.",                     lore:"Tráva křupe. Dech viditelný. Vzduch bolí."},
  {id:"warm_spell", label:"Teplý závan",  icon:"✦",duration:[2,3],foodMod:1,   woodMod:0,  matsMod:0,  moraleMod:1,   threatMod:-0.5,desc:"Jídlo +1, morálka +1. Dar mimo sezónu.",       lore:"Jako by zima zaváhala. Každý to cítí."},
  {id:"storm",      label:"Bouřka",       icon:"⚡",duration:[1,2],foodMod:-2,  woodMod:2,  matsMod:0,  moraleMod:-2,  threatMod:-1,  desc:"Sběr -2, dřevo +2. Predátoři doma.",           lore:"Hrom. Déšť silný jako zeď. Potom ticho."},
];
// ── Data: Budovy ──────────────────────────────────────────────────────────────
export const STATIC_BUILDINGS = [
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
  {id:"expedition_base", name:"Průzkumnická základna", icon:"⛺", cost:{wood:8,mats:8}, desc:"Odemkne záložku Výpravy", flavor:"Tři kameny na sobě, kus plátna jako střecha. Ale mapy na stěně a zásoby na cestu.", lore:"Lopuch říká, že základna není místo kde končíš výpravu. Je to místo kde ji začínáš. Průzkumníci se sem vrací jiní než odešli.", effect_type:"unlock_expeditions",effect_value:1,built:false},
];

// ── Pohodlí ───────────────────────────────────────────────────────────────────
export const COMFORT_LEVELS = [
  {level:0, name:"Holá nora",    icon:"○", desc:"Jen holé stěny a chlad.",              moraleFloor:0,  foodBonus:0,   woodBonus:0, threatBonus:0},
  {level:1, name:"Skromná nora", icon:"◑", desc:"Pár útržků tkaniny. Trochu tepleji.",  moraleFloor:15, foodBonus:0.5, woodBonus:0, threatBonus:0},
  {level:2, name:"Útulná nora",  icon:"●", desc:"Svíčky, deky, vůně pryskyřice.",       moraleFloor:25, foodBonus:1,   woodBonus:0, threatBonus:-1},
  {level:3, name:"Hřejivá nora", icon:"★", desc:"Domov. Každá myš to cítí při návratu.",moraleFloor:35, foodBonus:1,   woodBonus:1, threatBonus:-1},
];
export const COMFORT_THRESHOLDS = [0,10,25,50];
export const CRAFT_ITEMS = [
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
export const STATIC_EVENTS = [
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

export const THREAT_EVENTS = [
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
export const STORY_EVENTS = [
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

// ── Data: Lokace ──────────────────────────────────────────────────────────────
export const STATIC_LOCATIONS = [
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
    desc:"Obrovská zahradní pumpa, zrezivělá na nachově. Páka se stále pohybuje, ale vydává jen sípání. Pod ní mokrá hlína — voda tudy teče dál, jen ne nahoru. Myši sem chodily pro vodu ještě předtím, než Hlošina věděl o prameni.",
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
    desc:"Dvě stará kola opřená o sebe u kůlny. Pneumatiky shnilé, rámy rezavé, ale řetězy stále namazané — někdo je mazal ještě nedávno, pak přestal. Myším z Hlošinau připomínají trosky něčeho velkého a zaniklého.",
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
    desc:"Na jihu zahrady, za přerostlým šeříkem, je část, kam slunce nedosahuje ani v létě. Vlhko. Mech po kotníky. Zvuky, které nedávají smysl. Myši z Hlošinau sem chodí výjimečně a nikdy samy.",
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

export const LOC_HEXES = {"E7":{c:6,r:4},"D3":{c:5,r:3},"G7":{c:8,r:5},"J7":{c:9,r:6},"A3":{c:3,r:2},"A7":{c:3,r:4},"C5":{c:4,r:5},"H7":{c:9,r:3},"D7":{c:5,r:6},"FL1":{c:7,r:2},"FL2":{c:10,r:4},"FL3":{c:2,r:6},"FL4":{c:4,r:7},"FL5":{c:8,r:3},"B4":{c:3,r:6},"B7":{c:6,r:7},"C3":{c:7,r:6},"NL01":{c:2,r:1}, "NL02":{c:2,r:2}, "NL03":{c:2,r:3}, "NL04":{c:2,r:7},
  "NL05":{c:3,r:1}, "NL06":{c:3,r:3}, "NL07":{c:3,r:5}, "NL08":{c:4,r:2},
  "NL09":{c:4,r:4}, "NL10":{c:4,r:6}, "NL11":{c:5,r:1}, "NL12":{c:5,r:2},
  "NL13":{c:5,r:4}, "NL14":{c:5,r:7}, "NL15":{c:6,r:1}, "NL16":{c:6,r:3},
  "NL17":{c:6,r:6}, "NL18":{c:7,r:1}, "NL19":{c:7,r:3}, "NL20":{c:7,r:4},
  "NL21":{c:8,r:1}, "NL22":{c:8,r:2}, "NL23":{c:8,r:4}, "NL24":{c:8,r:7},
  "NL25":{c:9,r:1}, "NL26":{c:9,r:2}, "NL27":{c:9,r:5}, "NL28":{c:9,r:7},
  "NL29":{c:10,r:1}, "NL30":{c:10,r:2}, "NL31":{c:10,r:3}, "NL32":{c:10,r:5},
  "NL33":{c:10,r:6}, "NL34":{c:10,r:7},};

export const TERRAIN_LORE = {
  water:  ["Voda stojí nehybně mezi kořeny. Na hladině se zrcadlí nebe.","Kalná mělčina — ani ryby, ani chyba. Jen mokrá zem a vůně bahna."],
  dense:  ["Houštiny tak husté, že denní světlo dopadá jako přes plátno.","Trní a kopřivy. Průchod možný, ale ne příjemný."],
  meadow: ["Otevřená plocha, tráva po kolena. Krásné místo zemřít, říkají průzkumníci.","Suché stébla šustí. Semena ještě visí — pozdní sklizeň."],
  forest: ["Kořeny starého dubu sahají tak hluboko, že tudy vedou přirozené tunely.","Mech tlumí každý krok. Světlo sem přichází zeleně."],
  village:["Willowroot. Domov."],
};
// ── Zimní fáze ────────────────────────────────────────────────────────────────
export const WINTER_PHASES = [
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
// ── Sny myší ─────────────────────────────────────────────────────────────────
// Každý rys má pool snů. Sen = tři věty z první osoby, surreální, intimní.
export const MOUSE_DREAMS = {
  brave: [
    "Stojím na hraně něčeho obrovského a nejsem si jistá jestli je to zeď nebo obloha. Podívám se dolů a vidím zahradu — ale malou, jako by ji někdo nakreslil. Vím, že kdybych skočila, přistála bych přesně tam kde mám být.",
    "Běžím a za mnou není nic, ale cítím jak se vzduch zavírá. Pak se zastavím a otočím. Nic tam není. Jen stopa mých kroků a ticho, které se tváří jako omluva.",
    "Jdu tunelem tak úzkým, že musím vydechnout aby se vešlo tělo. Na konci je světlo. Vstoupím do místnosti plné myší, které jsem nikdy neviděla, a všechny se tváří jako by mě znaly.",
  ],
  green: [
    "Sedím v semínku. Vím, že jsem uvnitř semínka, a je mi tam dobře — tmavě, vlhko, ticho. Pak začnu růst a nevím jestli rostou stěny nebo já, ale najednou jsem venku a zahrada voní způsobem, pro který nemám slovo.",
    "Přede mnou jsou dva záhony a já vím, že jeden z nich je naše nora a druhý je jaro. Nevím jak to vím. Kopám v tom druhém a ruce mi voní po hlíně, která ještě nikdy nebyla zimou.",
    "Každé semínko co jsem kdy zasadila mi říká děkuji zároveň. Není to hlasité. Je to jako když vítr pohne trávou — neslyšitelné, ale cítitelné v celém těle.",
  ],
  stocky: [
    "Nesu něco tak těžkého, že nevím co to je — jen cítím váhu a vím, že ji musím donést. Cesta je strmá a dlouhá a chodidla mi bolí ale ruce pevně drží. Pak přijdu a položím to. Nikdo se neptá co to bylo. Všichni vědí.",
    "Stavím zeď z kamenů, které nejsou kameny — jsou to dny, nebo slova, nebo věci co jsem řekla a měla mlčet. Ale zeď stojí. A drží.",
    "Jsem hlouběji v zemi než jsem kdy byla. Je tam ticho jiné než ticho. Dýchám hlínu a nepřekáží mi to. Vím, že jsem přesně tam kde mám být.",
  ],
  clever: [
    "Vidím zahradu shora jako mapu a každá věc v ní vydává zvuk — zásoby cinkají, hrozba vrčí, morálka zpívá něco co neznám ale chci slyšet víc. Snažím se zapamatovat melodii, ale ráno mi zbyde jen pocit.",
    "Mám v rukou zápisník a každá stránka je jiný den který ještě nenastal. Čtu je zpátky. Nevím proč zpátky. Ale zpátky dávají smysl.",
    "Sedím u stolu a přede mnou je problém. Nevím jaký. Ale vím, že ho vyřeším, protože vidím jak si věci navzájem odpovídají — jako uzlíky na niti, každý drží ten druhý.",
  ],
  nervous: [
    "Každý krok zanechává stopu a každá stopa vede zpátky ke mně. Snažím se jít jinak, ale stopy jsou rychlejší. Pak si sednu a čekám. Nakonec přijde tišina a sedne si vedle mě. Nic neříká. Ale je mi lépe.",
    "Slyším zvuk, který přichází odevšad. Pak zjistím, že jsem ten zvuk já — že vydávám tón, který ostatní neslyší, ale který je pořád tam. Zkusím přestat. Nejde to. Pak zjistím, že nechci.",
    "Schovala jsem se na místě tak malém, že se tam vlezla jen já. Je mi tam dobře. Pak zjistím, že místo je moje srdce a vždy tam byl prostor jen pro jednu.",
  ],
  cheerful: [
    "Zpívám píseň, kterou neznám, a ostatní ji znají celou. Zpíváme spolu a zahrada se mění — tráva roste, kameny se teplé, voda teče rychleji. Pak píseň skončí. Ale tráva zůstane.",
    "Probudím se ve snu a vím, že jsem ve snu, a rozhodnu se že to nevadí. Jdu do zahrady a je tam všechno co kdy bylo dobré — najednou, ve stejný čas. Neudivuje mě to. Tak to prostě je.",
    "Smích je v tomhle snu věc — má tvar, má váhu, lze ho nést. Nesu smích domů v náruči jako dřevo. Složím ho u ohně. Hoří celou noc.",
  ],
  greedy: [
    "Zásobárna je tak plná, že nemohu zavřít dveře. Přidám víc a stěny se prohnou. Přidám ještě víc a střecha odletí. Pak zásobárna zmizí a já stojím venku s prázdnýma rukama a je mi lehce.",
    "Jím něco co nemá chuť, ale nemohu přestat. Pak zjistím, že jím čas — každé sousto je hodina kterou jsem strávila počítáním místo žití. Odložím to. Je toho víc než jsem si myslela.",
    "Hledám zásoby ve snu a nacházím je — stále víc, stále hlouběji. Pak narazím na zásoby, které jsou příliš velké na odnesení. Sedím vedle nich. Ráno si pamatuji jen jak jsem seděla.",
  ],
  careful: [
    "Kontroluji každý roh nory a vše je přesně tam kde má být. Pak zkontroluji znovu. A pak znovu. Pak zjistím, že kontroluji prázdno a prázdno je v pořádku. To mě překvapí víc než cokoliv jiného.",
    "Skládám věci do správného pořadí a pořadí se mění pokaždé co ho dokončím. Pak pochopím, že správné pořadí se mění protože se mění co je důležité. Přestanu skládat. Sedím s nepořádkem. Je to v pořádku.",
    "Mám seznam všeho co se může pokazit a postupně škrtám položky. Na konci zbyde jedna, ale nemá jméno. Sedím s tou poslední položkou a vím, že ji nikdy nepřiřadím. A je mi dobře.",
  ],
  swift: [
    "Běžím tak rychle, že čas za mnou nestíhá. Pak se zastavím a čas mě dožene — ale přinese věci které jsem minula. Prohlížím je. Jsou lepší než to co jsem viděla.",
    "Jsem na dvou místech najednou a obě místa jsou správná. Pak jsem na třech. Pak na tolika, že přestanu počítat. Všude jsem já, ale každá já ví něco jiného.",
    "Pohybuji se mezi kapkami deště a žádná se mě nedotkne. Pak záměrně stoupnu do jedné. Je studená a přesná a přesně správná.",
  ],
  forager: [
    "Zahrada mi říká kde jsou zásoby — ne slovy, ale tlakem pod chodidly. Krok doprava kde je sladko. Krok doleva kde je sytě. Jdu bez přemýšlení a nacházím přesně to co Hlošina potřebuje.",
    "Čichám ke vzduchu a vzduch je plný informací — co přijde, co odešlo, co čeká. Přede mnou se rozkládá mapa vůní a já ji čtu jako text. Ráno si pamatuji jen první řádek.",
    "Semínko mi řekne celý svůj příběh — kde rostlo, kdo je nosil, kolik zim přežilo. Držím ho dlouho. Pak ho zasadím. Vím, že vyroste dobře.",
  ],
  // Aging perky
  veteran_scout: [
    "Jdu stezkou, kterou jsem šla stokrát, a je pokaždé jiná. Dnes je zlatá. Zítra bude modrá. Stezka ví víc než já ale chodí přede mnou.",
    "Vidím ve tmě — ne oči, ale tělem. Každý stín mi říká co v něm je. Prošla jsem tolika stíny, že jsme starí přátelé.",
  ],
  calm_presence: [
    "Sedím v srdci nory a nora dýchá. Já dýchám s ní. Nevím kde já končím a nora začíná. Možná to nikdy nebylo důležité.",
    "Ostatní spí a já jsem bdělá ale ne proto, že nespím — proto, že jsem tišina ve které spí.",
  ],
  old_bones: [
    "Moje kosti pamatují každou zimu. V snu ke mně přijdou všechny najednou a sedíme spolu. Jsou starší než já ale tváří se jako děti.",
    "Pohybuji se pomalu a svět se pohybuje kolem mě. Vidím věci které rychlí míjejí. Je toho víc, než bych čekala.",
  ],
};

// ── Narativní počasí ──────────────────────────────────────────────────────────
// Každý typ počasí má pool vět — zobrazí se pod season barem.
export const WEATHER_NARRATIVE = {
  sunny: [
    "Slunce leží na záhonu jako kočka — teplé, líné, přesně tam kde má být.",
    "Vzduch je dnes tak čirý, že slyšíme zahradu dýchat.",
    "Světlo je zlaté a staré. Takové světlo si pamatuje léto.",
    "Ve slunci vypadá zahrada jako příslib. Jetel říká, že to nestačí. Ale pomáhá.",
    "První slunečný den po dešti. Každá kapka na listu je zrcadlo.",
  ],
  cloudy: [
    "Nebe je šedé způsobem, který není smutný — jen tichý.",
    "Mraky jsou husté ale nízko. Zahrada to ignoruje.",
    "Takové nebe nemá náladu. Ani špatnou, ani dobrou. Jen je.",
    "Zataženo. Myši pracují stejně. Zahrada čeká.",
  ],
  rainy: [
    "Déšť bubnuje na kořeny jako někdo, kdo ví co dělá.",
    "Kočky jsou uvnitř. Průzkumníci to vědí a pohybují se volněji.",
    "Déšť voní po místech, která ještě nenavštívili.",
    "Třetí deštivý den. Zásoby dřeva přibývají. Nálada klesá. Tak to chodí.",
    "Déšť padá svisle. Žádný vítr. Zahrada přijímá.",
  ],
  windy: [
    "Vítr dnes nese zprávy odjinud. Nikdo neví odkud.",
    "Ve větru se pohybuje něco co tam není když vítr přestane.",
    "Hluk větru maskuje kroky — naše i cizí. Rovná příležitost.",
    "Listí letí ze severu. Lopuch sleduje odkud. Jetel ho sleduje jak sleduje.",
  ],
  foggy: [
    "Mlha dělá ze zahrady jiné místo. Tišší. Záhadnější. Ne nutně nebezpečnější.",
    "V mlze vidíme na tři kroky. To stačí. Nebo nestačí. Záleží na tom co je ve čtvrtém.",
    "Mlha přišla v noci a ráno ještě byla tady. Jako host, který nechce odejít.",
    "Predátoři v mlze tápu stejně jako my. Trochu.",
  ],
  frosty: [
    "Tráva dnes ráno křupala. Ostružina to slyšela první.",
    "První mráz přišel dřív než loni. Nebo stejně. Nikdo si přesně nepamatuje.",
    "Vzduch voní ostře a čistě. Jako varování, které je také krásné.",
    "Mrazivé ráno. Dech viditelný. Svíčka hoří déle než v létě.",
  ],
  warm_spell: [
    "Teplý závan v říjnu. Zahrada si ho pamatuje jako omylem zaslaný dopis.",
    "Dnes je tepleji než by mělo být. Myši se moc neptají proč.",
    "Teplý vítr ze severu. Nevíme odkud přichází. Přijímáme ho.",
    "Jako by zima zaváhala. Každý si bere tu pauzu jak chce.",
  ],
  storm: [
    "Bouřka přišla ve tři ráno a Kopřiva ji slyšela první.",
    "Hrom. Pak déšť silný jako zeď. Pak ticho, které je jiné než před bouřkou.",
    "Bouřka v zahradě trvá jinak než bouřka venku. Tady je osobnější.",
    "Po bouřce je vzduch tak čistý, že bolí dýchat. Ale bolí dobře.",
  ],
};

// ── Výpravové vzpomínky ───────────────────────────────────────────────────────
// Co myš řekne po návratu z výpravy — jednou za ~5 tahů.
export const EXPEDITION_MEMORIES = {
  exp01: ["Lopuch říká, že mlýnský sklep voněl po mouče a po mlčení.", "Někdo tam žil a dobře se měl a pak přestal. To zůstane.", "V tom sklepě byly police tak staré, že dřevo bylo měkké jako látka."],
  exp02: ["Za severní zdí je strom, říká Ostružina, který roste jinak než naše stromy. Jako by věděl víc.", "Nora za zdí byla prázdná ale ne opuštěná. To je rozdíl.", "Jetel přinesla kamínek. Řekla, že ho vzala z cizí nory. Neřekla proč. Leží u ohně."],
  exp03: ["Hřbitov v noci je tiché jinak než les. Kopřiva to nedokáže vysvětlit ale ví to.", "Predátoři se tomu místu vyhýbají. Myši by se měly ptát proč.", "Chodili jsme mezi kameny a četli jména. Ne svá. Ale mohla být."],
  exp04: ["Lidský sklep voní po věcech, které si lidé schovalí a zapomněli.", "Lopuch říká, že polička s džemem byla označená rukou dítěte. Vzal trochu.", "Sklep je tak velký, že jsme tam strávili hodiny a viděli jen část."],
  exp05: ["Rokle má dno a na dně je jiný svět. Menší. Vlhčí. Pravdivější.", "Voda na dně rokle chutná jinak než naše voda. Jetel říká, že je starší.", "Kořeny na stěnách rokle jsou tak staré, že jsou jako kameny."],
  exp06: ["Chata čekala. Tak říká Ostružina. Jako by věděla, že přijdeme.", "Lidé tam zanechali nástroje přesně seřazené. Vzali jsme je. Bylo nám trochu trapně.", "Okno chaty trčí jen na jednom závěsu. Při větru se houpá a skřípe."],
  exp07: ["Jabloň je starší než zahrada. Kopřiva to ví. Neví jak to ví.", "Jablka padala celou noc. Ráno jich bylo víc než večer. Zahrada je velkorysá.", "Pod jabloní je ticho jiné než jinde. Jako by strom ticho pěstoval."],
  exp08: ["Kompost má uvnitř teplo, říká Jetel, jako by ho někdo rozdělal.", "Ve spodní vrstvě kompostu je hlína tak tmavá, že vypadá jako noc.", "Věci se v kompostu mění. To víme. Ale jak? Jetel přemýšlí."],
  exp09: ["Vrabci nás sledují jinak než dřív. Lopuch to cítí. Není to špatné.", "Nejstarší vrabec má oči jako semínka. Říká Ostružina. Smysluplné.", "Po setkání s vrabci zpívají ptáci ráno trochu blíže k noře."],
  exp10: ["Fontána má výzdobu, která nedává smysl pro zahradu. Kopřiva přinesla rybí ocas.", "Kameníci ji začali opravovat a odešli. Jejich nástroje jsou stále vedle.", "Voda v míse fontány je čistá. Prší do ní a čistí ji. Funguje bez pomoci."],
  exp11: ["Ze střechy kůlny vidíme Hlošina jako tečku. Malou, teplou tečku.", "Hvězdy jsou jiné z výšky. Nebo jsme jiní my. Ostružina neví.", "Noc na střeše byla tichá. Ten druh ticha, který se hledá celý rok."],
  exp12: ["Byliny, říká Jetel, mají paměť. Vědí kde rostly. To poznáme po chuti.", "Levandule z jižního záhonu voní jinak než ta od severní zdi. Jetel trvá na tom.", "Přinesli jsme léto ve svazku. Visí u vchodu. Každý přichází domů přes vůni."],
  exp13: ["Krysí stezky obcházejí noru ze tří stran. Teď to víme. Je to lepší vědět.", "Krysy pochodují pravidelně. Jako vojáci. Nebo jako řemeslníci.", "Mapa krysích stezek říká víc o zahradě než naše mapa. Lopuch ji studuje."],
  exp14: ["Liščí nora sahá hlouběji než jsme čekali. Lopuch říká: respekt.", "Šli jsme tam a vrátili jsme se. To stačí. Víc říct nemusíme.", "Liška v noře má pohodlí. Podlahy hladké. Stěny rovné. Pracuje na sobě."],
  exp15: ["Pramen chutná jinak. Jako začátek věcí. Jetel ho přinesla domů.", "Javorové kořeny u pramene jsou tak propletené, že vypadají jako záměr.", "Voda z pramene voní po kamení a po vzdálenosti zároveň."],
  exp16: ["Včely nás ignorovaly. Kopřiva říká, že to je forma respektu.", "Med ze včelí louky je tmavší. Koncentrovanější. Jako celé léto najednou.", "Louka za branou je tak velká, že jsme šli hodinu a viděli jen část."],
  exp17: ["Zmrzlá zahrada vydá co skrývá. Je velkorysá jinak než teplá.", "Sníh konzervuje. Pod ním jsou věci čerstvé jako v den kdy se schovaly.", "Vrátili jsme se zmrzlí a obtěžkaní a trochu pyšní. To je správná kombinace."],
  exp18: ["Kořen existuje. Jsou tam myši, které přežívají a pamatují si. Víc nepotřebujeme.", "Vyměňovali jsme příběhy. Vzali jsme si jejich. Dali jsme jim naše.", "Cizí vesnice má jiné zvyky. Jetel si zapamatovala tři. Naučí nás je."],
  exp19: ["Skleník je štědrý. Rajčata tam rostou jako by věděla, že jsou vítána.", "Kovová kostra skleníku v dešti vydává zvuk jako vzdálené zvony.", "Vrátili jsme se pozdě a obtěžkaní. Lopuch řekl: dobře."],
  exp20: ["Zahrada v noci dělá věci, které ve dne nedělá. Teď víme které.", "Mapa noci a mapa dne jsou různé mapy. Obě jsou pravdivé.", "Sledovali jsme stopu predátora celou noc. Nechytil nic. Odešel před svítáním."],
};
