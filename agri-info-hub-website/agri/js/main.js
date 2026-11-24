/* Agricultural Information Hub - main.js (vanilla JavaScript) */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

  /* ---------- Farming guides (sample content: check with local extension advice) ---------- */
  var SEASONS = ["Rabi (Winter)", "Kharif-1 (Pre-monsoon)", "Kharif-2 (Monsoon)", "Year-round"];
  var GUIDES = [
    { t: "Growing Boro Rice from Seedbed to Harvest", crop: "Grains", season: "Rabi (Winter)", method: "Conventional", sum: "A season plan for the irrigated, dry-season rice crop.",
      steps: ["Choose a cold-tolerant, high-yielding Boro variety recommended for your area, and use clean, certified seed.", "In December, prepare a seedbed and sow pre-germinated seed. Protect seedlings from cold, for example with a plastic cover at night.", "Plough and puddle the main field, level it well, and transplant in January to early February, with 2-3 seedlings per hill.", "Apply fertiliser according to a soil test or your local extension recommendation, splitting nitrogen across crop stages.", "Keep a shallow layer of water during tillering and flowering, and weed 2-3 times in the first 40-45 days.", "Drain the field about 10 days before harvest. Harvest when 80-85% of grains turn golden, then dry grain to about 14% moisture."],
      tips: ["Transplant on time. Seedlings older than about 50 days usually give a lower yield.", "Alternate wetting and drying can save irrigation water in many fields.", "Scout weekly for stem borer and blast."] },
    { t: "Wheat in the Rabi Season", crop: "Grains", season: "Rabi (Winter)", method: "Conventional", sum: "Line sowing, irrigation timing and harvest for a winter wheat crop.",
      steps: ["Pick a well-drained field and prepare a fine, firm seedbed with 2-3 ploughings.", "Treat seed against seed-borne disease, then sow in the second half of November in lines about 20 cm apart.", "Apply basal fertiliser based on soil test, and top-dress nitrogen in split doses.", "Irrigate lightly at key stages: crown root initiation (about 17-21 days after sowing), flowering and grain filling.", "Weed within the first 30-35 days and scout for leaf diseases and aphids.", "Harvest when the crop turns golden-yellow and grains are hard, then dry and store."],
      tips: ["Late sowing in December usually lowers yield because heat arrives during grain filling.", "Wheat blast is a risk in Bangladesh. Sow in the recommended window and use varieties advised by BARI."] },
    { t: "Raised-Bed Tomato with Staking", crop: "Vegetables", season: "Rabi (Winter)", method: "Raised-bed", sum: "Better drainage and cleaner fruit with raised beds and supports.",
      steps: ["Raise seedlings in a nursery bed or tray under fine insect net for 25-30 days.", "Make raised beds about 1 m wide and 15-20 cm high with drainage channels between them, and mix in well-rotted compost.", "Transplant in the evening about 60 cm apart and water straight away.", "Stake or trellis plants early, and remove side shoots on indeterminate types.", "Water evenly and mulch the bed. Irregular watering causes fruit cracking and blossom-end rot.", "Pick at the colour-turning stage if fruit must travel, or fully red for local sale."],
      tips: ["Rotate with non-solanaceous crops to reduce wilt and blight.", "Water at the base, not over the leaves, to reduce leaf diseases."] },
    { t: "Organic Brinjal Production", crop: "Vegetables", season: "Year-round", method: "Organic", sum: "Grow brinjal with compost, traps and plant-based sprays.",
      steps: ["Start with healthy seedlings 4-5 weeks old from a clean nursery. Choose varieties tolerant to wilt and borer where available.", "Prepare the field with compost or well-rotted cow dung. Trichoderma-enriched compost can help suppress soil diseases.", "Transplant 60-75 cm apart and mulch with straw or rice husk.", "Install pheromone traps for the shoot and fruit borer, and remove and destroy wilting shoots and bored fruits every few days.", "Use neem-based products or soap solution on soft-bodied pests only when scouting shows a problem.", "Harvest every 3-4 days while fruits are glossy and before seeds harden."],
      tips: ["Removing infested shoots early is the most effective borer control.", "Rotate away from tomato, potato and chilli to cut disease build-up."] },
    { t: "Establishing a Mango Orchard", crop: "Fruits", season: "Kharif-2 (Monsoon)", method: "Conventional", sum: "Site, planting and early care for grafted mango trees.",
      steps: ["Choose a site with deep, well-drained soil and full sun, and buy grafted plants of a variety suited to your area.", "Dig pits about 1 m wide and deep a month before planting, and refill with topsoil mixed with compost.", "Plant during the monsoon, 8-10 m apart. Stake and water young trees through the first dry season.", "Prune lightly to shape young trees, and remove flower buds in the first 2-3 years so the tree builds a strong frame.", "Manage hoppers and powdery mildew around flowering, following local extension advice.", "Harvest with a short stalk attached to reduce sap burn, and handle fruit gently."],
      tips: ["Intercrop with short vegetables or legumes while trees are young.", "Collect and destroy fallen fruit to reduce fruit fly."] },
    { t: "Drip Irrigation and Mulching for Vegetables", crop: "Vegetables", season: "Kharif-1 (Pre-monsoon)", method: "Water-saving", sum: "Save water and weeding time during the hot, dry months.",
      steps: ["Check your water source and choose a drip kit sized for your plot.", "Filter the water to prevent clogging, then lay drip lines along the beds with one dripper near each plant.", "Cover the soil with 5-7 cm of straw or rice husk mulch, or use plastic film.", "Water for short, frequent periods, early in the morning, and check soil moisture by hand.", "Flush the lines every month and check for leaks and blocked drippers."],
      tips: ["Drip irrigation can cut water use compared with flooding, depending on the crop and soil.", "Mulch also suppresses weeds and keeps soil cooler."] },
    { t: "Jute: Sowing to Retting", crop: "Cash crops", season: "Kharif-1 (Pre-monsoon)", method: "Conventional", sum: "From a fine seedbed to clean, bright fibre.",
      steps: ["Prepare a fine seedbed after the first spring rains. Jute seed is very small.", "Sow from March to May, in lines or by broadcasting, and thin so plants are spaced a few centimetres apart.", "Weed and thin within 3-4 weeks, and weed again later if needed.", "Harvest at about 100-120 days, at the small-pod stage, by cutting at the base.", "Bundle the stalks, let them shed leaves for 2-3 days, then immerse them in clean, slow-moving water for about 10-20 days until the fibre separates.", "Strip the fibre, wash it in clean water, and dry it in the sun for 2-3 days."],
      tips: ["Clean water gives brighter fibre. Avoid retting in polluted ponds.", "Ask the Bangladesh Jute Research Institute about newer retting methods that use less water."] },
    { t: "Hydroponic Leafy Greens at Home", crop: "Vegetables", season: "Year-round", method: "Hydroponics", sum: "Grow salad and leafy greens without soil on a roof or balcony.",
      steps: ["Choose a simple system, such as a covered tank with floating foam rafts.", "Germinate seeds in rockwool or coco-peat plugs.", "Mix a hydroponic nutrient solution and keep the pH around 5.5-6.5.", "Place seedlings with their roots in the solution, and give the leaves 6 or more hours of light. Use shade net in hot months.", "Top up water weekly and replace the solution every 1-2 weeks.", "Harvest outer leaves from about 3-5 weeks."],
      tips: ["Cover the tank to stop algae.", "Keep the solution cool. Warm water holds less oxygen and encourages root rot."] },
    { t: "Making Compost on the Farm", crop: "All crops", season: "Year-round", method: "Organic", sum: "Turn crop waste and manure into free, high-quality soil food.",
      steps: ["Collect green material (vegetable waste, fresh grass, manure) and brown material (dry leaves, straw, husk). Aim for about 2 parts brown to 1 part green by volume.", "Build a pile or pit about 1 m wide and 1 m high, layering the materials and wetting each layer until it feels like a wrung-out sponge.", "Turn the pile every 1-2 weeks to add air, and keep it damp.", "Compost is ready in about 2-3 months when it is dark, crumbly and smells earthy.", "Mix 2-3 kg per square metre into beds before planting."],
      tips: ["Avoid adding diseased plants, meat or oily food.", "Cover the pile in the monsoon to stop nutrients washing out."] }
  ];

  /* ---------- Crops (sample content: confirm current varieties with BRRI, BARI or your Upazila agriculture office) ---------- */
  var CROPS = [
    { n: "Rice", cat: "Grains", kind: "rice", season: "Aus, Aman and Boro seasons", var: ["BRRI dhan28 (Boro)", "BRRI dhan29 (Boro)", "BRRI dhan49 (Aman)"], method: "Mostly puddled and transplanted, with some direct seeding. Keep about 3-5 cm of water during growth.", soil: "Clay to clay-loam soils that hold water. pH about 5.5-7.", harvest: "Harvest when 80-85% of grains are golden. Thresh promptly and dry to about 14% moisture.", nu: [360, 6.6, 80, 0.6, 1.3], note: "Raw milled white rice, per 100 g.", uses: ["Staple food as boiled rice", "Flattened and puffed rice, flour for pitha", "Bran oil and animal feed", "Straw for fodder and thatch"] },
    { n: "Wheat", cat: "Grains", kind: "wheat", season: "Rabi (sow mid to late November)", var: ["BARI Gom 21 (Shatabdi)", "BARI Gom 26", "BARI Gom 33"], method: "Sown in lines about 20 cm apart with 3-4 light irrigations at key growth stages.", soil: "Well-drained loam or clay loam. pH 6-7.5.", harvest: "Cut when plants turn golden-yellow and grains are hard. Dry to about 12-14% moisture.", nu: [340, 13, 72, 2.5, 11], note: "Whole-grain wheat flour, per 100 g.", uses: ["Atta for roti and flatbread", "Flour for bread, biscuits and noodles", "Semolina (suji)", "Straw for animal feed"] },
    { n: "Maize", cat: "Grains", kind: "maize", season: "Rabi and Kharif", var: ["Hybrids released by BARI", "Private-sector hybrids (check yield trial data)", "Open-pollinated composites for low-input farming"], method: "Sown in rows about 60 cm apart and 20-25 cm between plants. Irrigate at knee-high, tasselling and grain filling.", soil: "Well-drained loam. pH 5.8-7. Does not tolerate waterlogging.", harvest: "Harvest when husks dry and kernels harden. Shell and dry to 13-14% moisture.", nu: [365, 9.4, 74, 4.7, 7.3], note: "Dry maize grain, per 100 g.", uses: ["Poultry and fish feed, a major use in Bangladesh", "Cornflour, cornmeal and starch", "Green cobs, roasted or boiled", "Stover for fodder"] },
    { n: "Mango", cat: "Fruits", kind: "mango", season: "Harvest May to August", var: ["Himsagar", "Langra", "Amrapali"], method: "Grafted plants set 8-10 m apart in the monsoon. Care around flowering and pest control are key.", soil: "Deep, well-drained loam. pH 5.5-7.5.", harvest: "Pick mature fruit with a short stalk, handle gently, and avoid sap burn.", nu: [60, 0.8, 15, 0.4, 1.6], note: "Raw mango flesh, per 100 g. Also about 36 mg vitamin C.", uses: ["Eaten fresh and as juice", "Pickles (achar) and green mango chutney", "Dried mango pulp (aamsotto) and jam"] },
    { n: "Banana", cat: "Fruits", kind: "banana", season: "Year-round, harvest 9-12 months after planting", var: ["Sabri", "Amritasagar", "Champa"], method: "Planted from tissue-culture plantlets or healthy suckers, about 2 x 2 m apart. Remove extra suckers and support heavy bunches.", soil: "Rich, well-drained loam. pH 6-7.5. Needs steady moisture but not waterlogging.", harvest: "Cut bunches when the fingers are plump and ridges rounded, using a clean knife.", nu: [89, 1.1, 23, 0.3, 2.6], note: "Raw banana, per 100 g.", uses: ["Fresh fruit", "Green banana as a vegetable", "Chips and flour", "Leaves for serving and wrapping food"] },
    { n: "Guava", cat: "Fruits", kind: "guava", season: "Main harvest in the rainy season, with some varieties fruiting twice", var: ["Kazi Piara", "Mukundapuri", "Thai guava types"], method: "Propagated by grafting or air-layering, 4-5 m apart. Prune after harvest and bag fruit against fruit fly.", soil: "Adaptable, well-drained. pH 5-7.5.", harvest: "Pick when the skin changes from dark green to lighter green or yellow and the fruit gives slightly.", nu: [68, 2.6, 14, 1, 5.4], note: "Raw guava, per 100 g. Very rich in vitamin C, about 228 mg.", uses: ["Eaten fresh", "Juice, jelly and jam", "Leaves used in traditional teas"] },
    { n: "Tomato", cat: "Vegetables", kind: "tomato", season: "Mainly Rabi, with heat-tolerant types for summer", var: ["BARI Tomato-14", "BARI hybrid tomato lines", "Local winter varieties"], method: "Seedlings 25-30 days old are transplanted onto raised beds with stakes, mulch and even watering.", soil: "Well-drained sandy loam to loam, rich in organic matter. pH 6-6.8.", harvest: "Pick every 3-5 days. Use the colour-turning stage for transport and fully red for local sale.", nu: [18, 0.9, 3.9, 0.2, 1.2], note: "Raw tomato, per 100 g.", uses: ["Salad and curries", "Sauce, paste and ketchup", "Dried tomato and juice"] },
    { n: "Brinjal (Eggplant)", cat: "Vegetables", kind: "brinjal", season: "Year-round", var: ["BARI Begun-1 (Uttara)", "BARI Begun-4 (Kajla)", "BARI Begun-5 (Nayantara)"], method: "Seedlings 4-5 weeks old are transplanted 60-75 cm apart. The shoot and fruit borer is the main pest.", soil: "Loam to silty loam with good drainage. pH 5.5-6.8.", harvest: "Pick every 3-5 days while fruits are glossy and tender, before seeds harden.", nu: [25, 1, 5.9, 0.2, 3], note: "Raw brinjal, per 100 g.", uses: ["Bhorta and curries", "Fried slices (begun bhaja)", "Pickles"] },
    { n: "Potato", cat: "Vegetables", kind: "potato", season: "Rabi (plant in November)", var: ["Diamant", "Cardinal", "Granola"], method: "Seed tubers planted in ridges about 60 cm apart with 25 cm between tubers. Earth up and watch for late blight.", soil: "Loose, well-drained sandy loam to loam. pH 5-6.5.", harvest: "Harvest at 80-100 days when vines yellow and dry. Cure in shade and store cool and ventilated.", nu: [77, 2, 17, 0.1, 2.2], note: "Raw potato, per 100 g.", uses: ["Vegetable and curries", "Chips, fries and mash", "Starch and seed tubers"] },
    { n: "Cabbage", cat: "Vegetables", kind: "cabbage", season: "Winter", var: ["Hybrids with firm heads suited to winter", "Early-maturing types for November planting", "Open-pollinated local types"], method: "Seedlings about 4 weeks old are planted 45-60 cm apart. Give frequent light irrigation and watch for diamondback moth.", soil: "Fertile, moisture-retentive loam. pH 6-7.", harvest: "Cut at the base when heads are firm and full size, about 60-90 days after transplanting.", nu: [25, 1.3, 5.8, 0.1, 2.5], note: "Raw cabbage, per 100 g.", uses: ["Curries and stir-fries", "Salad", "Pickled and fermented dishes"] },
    { n: "Jute", cat: "Cash Crops", kind: "stalks", c: "#6f9a3a", season: "Sow March to May, harvest July to August", var: ["White jute (Corchorus capsularis)", "Tossa jute (Corchorus olitorius)", "High-yielding varieties from BJRI"], method: "Sown in lines or broadcast on a fine seedbed. Thin and weed at 3-4 weeks. Stalks are retted in water.", soil: "Alluvial sandy loam to clay loam. pH 6-7.5, with enough moisture.", harvest: "Cut at the small-pod stage, ret in clean slow-moving water for 10-20 days, strip, wash and sun-dry the fibre.", nu: null, note: "A fibre crop, so nutrition values do not apply. Tender jute leaves are eaten as a vegetable in some places.", uses: ["Sacks, hessian and twine", "Carpets, geotextiles and eco-friendly packaging", "Paper pulp and composite boards", "Stalks as fuel and fencing"] },
    { n: "Sugarcane", cat: "Cash Crops", kind: "stalks", c: "#7b4b8a", season: "Plant October to February, harvest after 10-14 months", var: ["Varieties from the Bangladesh Sugarcrop Research Institute (BSRI)", "Early, mid and late-maturing types", "Ratoon-friendly varieties"], method: "Planted as 2-3 budded setts in furrows. Earth up and use trash mulch. Ratoon crops are possible.", soil: "Deep, well-drained loam to clay loam. pH about 6-7.5.", harvest: "Cut at ground level when ripe and deliver to the mill quickly to reduce sugar loss.", nu: [387, 0, 100, 0, 0], note: "Refined sugar, the main product, per 100 g.", uses: ["Sugar and jaggery (gur)", "Fresh cane juice", "Molasses and ethanol", "Bagasse as fuel and for paper"] },
    { n: "Tea", cat: "Cash Crops", kind: "tea", season: "Plucked in rounds every 7-10 days in the growing season", var: ["Clones from the Bangladesh Tea Research Institute (BTRI)", "Assam-type varieties", "Older seed-grown plantations"], method: "A perennial shrub grown on well-drained slopes, such as the estates of Sylhet and Chattogram. Pruned on a cycle and grown under shade trees.", soil: "Deep, well-drained, acidic soil. pH 4.5-5.5.", harvest: "Pluck two leaves and a bud, then process soon after plucking: wither, roll, oxidise and dry.", nu: null, note: "Brewed tea has almost no calories, about 1 kcal per 100 ml, and contains caffeine.", uses: ["Black and green tea", "Iced and instant tea", "Spent leaves as compost"] }
  ];
  var CROP_CATS = ["Grains", "Fruits", "Vegetables", "Cash Crops"];

  /* ---------- Generated crop illustrations ---------- */
  function cropArt(c, i) {
    var bg = [["#dff0d0", "#bcd9a3"], ["#fbe9c6", "#f1cf86"], ["#dcebf7", "#b5d3ec"], ["#f3dccd", "#e8b99c"]][i % 4], k = c.kind, s = "", j, x;
    var E = function (cx, cy, rx, ry, rot, fill) { return "<ellipse cx='" + cx + "' cy='" + cy + "' rx='" + rx + "' ry='" + ry + "' transform='rotate(" + rot + " " + cx + " " + cy + ")' fill='" + fill + "'/>"; };
    if (k === "rice" || k === "wheat") {
      for (var st = -1; st <= 1; st++) {
        var bx = 300 + st * 100, tx = bx + st * 45 + (k === "rice" ? 40 : 0), ty = 100;
        s += "<path d='M" + bx + " 380 Q" + bx + " 220 " + tx + " " + ty + "' stroke='#6e9a2f' stroke-width='6' fill='none'/>";
        for (j = 0; j < 10; j++) { var gx = tx + (j % 2 ? 11 : -11) + (k === "rice" ? j * 4 : 0), gy = ty + 14 + j * 17;
          s += E(gx, gy, 8, 15, (j % 2 ? 22 : -22) + (k === "rice" ? 20 : 0), k === "rice" ? "#e9d77f" : "#d9a441"); }
      }
    } else if (k === "maize") {
      s += E(300, 220, 70, 150, 0, "#f2c230");
      for (j = 0; j < 40; j++) { s += "<circle cx='" + (262 + (j % 5) * 19) + "' cy='" + (110 + Math.floor(j / 5) * 30) + "' r='7' fill='#fbe18a'/>"; }
      s += "<path d='M300 380 Q210 300 225 130 Q270 260 300 380Z' fill='#5f9a3a'/><path d='M300 380 Q390 300 375 130 Q330 260 300 380Z' fill='#4c8530'/>";
    } else if (k === "mango") {
      s += "<path d='M330 130 Q350 90 380 80' stroke='#5a7a2a' stroke-width='8' fill='none'/>" + E(400, 100, 60, 22, -30, "#4c8530") + E(300, 260, 120, 85, -22, "#f0a21f") + E(270, 240, 70, 40, -22, "#f6c553");
    } else if (k === "banana") {
      for (j = 0; j < 5; j++) { s += "<path d='M" + (180 + j * 38) + " 120 Q" + (150 + j * 50) + " 260 " + (240 + j * 40) + " 360' stroke='#f2cf3a' stroke-width='34' stroke-linecap='round' fill='none'/>"; }
      s += "<path d='M200 110 L360 110' stroke='#6e8a2a' stroke-width='16' stroke-linecap='round'/>";
    } else if (k === "guava" || k === "tomato") {
      var col = k === "tomato" ? "#d8392b" : "#b9d36a";
      s += "<circle cx='300' cy='240' r='125' fill='" + col + "'/><ellipse cx='255' cy='200' rx='34' ry='20' fill='#fff' opacity='.25' transform='rotate(-30 255 200)'/>";
      s += k === "tomato" ? "<path d='M300 130 L318 160 L352 150 L335 178 L360 200 L322 198 L300 225 L278 198 L240 200 L265 178 L248 150 L282 160Z' fill='#4c8530'/>" : E(350, 130, 45, 20, -25, "#4c8530") + "<circle cx='300' cy='240' r='60' fill='#f4a6a0' opacity='.55'/>";
    } else if (k === "brinjal") {
      s += "<path d='M230 150 Q330 150 370 330' stroke='#5a2a6e' stroke-width='96' stroke-linecap='round' fill='none'/><path d='M230 150 Q330 150 370 330' stroke='#7a3d90' stroke-width='30' stroke-linecap='round' fill='none' opacity='.5' transform='translate(-18 -6)'/><path d='M190 130 L260 120 L250 175 L195 180Z' fill='#4c8530'/>";
    } else if (k === "potato") {
      s += E(230, 270, 85, 60, -15, "#c79a63") + E(370, 250, 95, 65, 20, "#b98a54") + E(300, 330, 70, 45, 5, "#d1a873");
      for (j = 0; j < 9; j++) { s += "<circle cx='" + (190 + (j * 37) % 200) + "' cy='" + (240 + (j * 23) % 100) + "' r='4' fill='#7a5530'/>"; }
    } else if (k === "cabbage") {
      s += "<circle cx='300' cy='240' r='135' fill='#7fb356'/><circle cx='300' cy='240' r='100' fill='#9fcb77'/><circle cx='300' cy='240' r='62' fill='#c3e29e'/><path d='M300 110 Q290 240 300 370 M300 240 Q200 200 175 150 M300 240 Q400 200 425 150' stroke='#e8f5d6' stroke-width='5' fill='none' opacity='.8'/>";
    } else if (k === "stalks") {
      var th = c.c === "#7b4b8a" ? 26 : 10;
      for (j = 0; j < 5; j++) { x = 150 + j * 75;
        s += "<line x1='" + x + "' y1='370' x2='" + (x + (j - 2) * 12) + "' y2='80' stroke='" + c.c + "' stroke-width='" + th + "' stroke-linecap='round'/>";
        for (var n = 1; n < 6; n++) { s += "<line x1='" + (x + (j - 2) * 12 * (1 - n / 5.5) - th / 2) + "' y1='" + (370 - n * 50) + "' x2='" + (x + (j - 2) * 12 * (1 - n / 5.5) + th / 2) + "' y2='" + (370 - n * 50) + "' stroke='#3d5a1a' stroke-width='2'/>"; }
        s += E(x + 30, 130 + j * 8, 55, 12, -35, "#5f9a3a") + E(x - 30, 170 + j * 6, 55, 12, 35, "#4c8530"); }
    } else {  // tea
      for (j = 0; j < 5; j++) { s += "<path d='M300 380 Q" + (170 + j * 65) + " 260 " + (110 + j * 95) + " " + (110 + (j % 2) * 40) + "' stroke='#5a7a2a' stroke-width='6' fill='none'/>" + E(110 + j * 95, 110 + (j % 2) * 40, 52, 22, -50 + j * 25, "#3f8a3a") + E(130 + j * 90, 150 + (j % 2) * 35, 46, 20, 40 - j * 20, "#58a64a"); }
      s += "<ellipse cx='300' cy='95' rx='14' ry='30' fill='#a6d472'/>";
    }
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 450'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='" + bg[0] + "'/><stop offset='1' stop-color='" + bg[1] + "'/></linearGradient></defs><rect width='600' height='450' fill='url(#g)'/>" + s + "<rect y='385' width='600' height='65' fill='#6b4a32' opacity='.85'/></svg>");
  }

  /* ---------- Season helper ---------- */
  function currentSeason() {
    var m = new Date().getMonth() + 1;
    return m >= 11 || m <= 2 ? "Rabi (Winter)" : m <= 6 ? "Kharif-1 (Pre-monsoon)" : "Kharif-2 (Monsoon)";
  }

  /* ---------- Cards + modals ---------- */
  function guideCard(g, i, cls) {
    return "<div class='" + cls + "'><article class='card lift h-100'><div class='card-body d-flex flex-column'><div class='mb-2'><span class='badge text-bg-success tag'>" + esc(g.crop) + "</span> <span class='badge text-bg-warning tag'>" + esc(g.season) + "</span> <span class='badge text-bg-light border tag'>" + esc(g.method) + "</span></div><h3 class='h5'>" + esc(g.t) + "</h3><p class='small text-secondary'>" + esc(g.sum) + "</p><button type='button' class='btn btn-field btn-sm mt-auto align-self-start' data-guide='" + i + "'>Read the guide</button></div></article></div>";
  }
  function cropCard(c, i, cls) {
    return "<div class='" + cls + "'><article class='card lift h-100'><img class='card-img-top' src='" + cropArt(c, i) + "' alt='Illustration of " + esc(c.n) + "' loading='lazy' width='300' height='225'><div class='card-body d-flex flex-column'><span class='badge text-bg-success tag align-self-start mb-2'>" + esc(c.cat) + "</span><h3 class='h5'>" + esc(c.n) + "</h3><p class='small text-secondary mb-1'><b>Season:</b> " + esc(c.season) + "</p><p class='small text-secondary'><b>Soil:</b> " + esc(c.soil) + "</p><button type='button' class='btn btn-field btn-sm mt-auto align-self-start' data-crop='" + i + "'>Full profile</button></div></article></div>";
  }
  var modal = new bootstrap.Modal($("#modal"));
  function openModal(title, html) { $("#mTitle").textContent = title; $("#mBody").innerHTML = html; modal.show(); }
  function showGuide(i) {
    var g = GUIDES[i];
    openModal(g.t, "<p><span class='badge text-bg-success tag'>" + esc(g.crop) + "</span> <span class='badge text-bg-warning tag'>" + esc(g.season) + "</span> <span class='badge text-bg-light border tag'>" + esc(g.method) + "</span></p><p>" + esc(g.sum) + "</p><h3 class='h5'>Step by step</h3><ol class='mb-4'>" + g.steps.map(function (s) { return "<li class='mb-2'>" + esc(s) + "</li>"; }).join("") + "</ol><h3 class='h5'>Tips and best practices</h3><ul class='check-list mb-3'>" + g.tips.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul><p class='small text-secondary mb-0'>General guidance. Doses and dates vary by location. Confirm with your local agriculture office.</p>");
  }
  function showCrop(i) {
    var c = CROPS[i], n = c.nu;
    openModal(c.n, "<div class='row g-4'><div class='col-md-5'><img class='img-fluid rounded' src='" + cropArt(c, i) + "' alt='Illustration of " + esc(c.n) + "' width='450' height='338'><h3 class='h6 mt-3'>Varieties</h3><ul class='mb-0'>" + c.var.map(function (v) { return "<li>" + esc(v) + "</li>"; }).join("") + "</ul></div>" +
      "<div class='col-md-7'><dl class='mb-3'><dt>Cultivation methods</dt><dd>" + esc(c.method) + "</dd><dt>Soil requirements</dt><dd>" + esc(c.soil) + "</dd><dt>Harvesting techniques</dt><dd>" + esc(c.harvest) + "</dd></dl>" +
      "<h3 class='h6'>Nutritional values (approximate)</h3>" + (n ? "<table class='table table-sm nutri'><tbody><tr><th scope='row'>Energy</th><td>" + n[0] + " kcal</td></tr><tr><th scope='row'>Protein</th><td>" + n[1] + " g</td></tr><tr><th scope='row'>Carbohydrate</th><td>" + n[2] + " g</td></tr><tr><th scope='row'>Fat</th><td>" + n[3] + " g</td></tr><tr><th scope='row'>Fibre</th><td>" + n[4] + " g</td></tr></tbody></table>" : "") + "<p class='small text-secondary'>" + esc(c.note) + "</p>" +
      "<h3 class='h6'>Potential uses</h3><ul class='check-list'>" + c.uses.map(function (u) { return "<li>" + esc(u) + "</li>"; }).join("") + "</ul></div></div><p class='small text-secondary mt-3 mb-0'>Variety names are examples. Confirm current recommendations with BRRI, BARI or your Upazila agriculture office.</p>");
  }
  document.addEventListener("click", function (e) {
    var g = e.target.closest("[data-guide]"), c = e.target.closest("[data-crop]");
    if (g) { showGuide(+g.dataset.guide); } else if (c) { showCrop(+c.dataset.crop); }
  });

  /* ---------- Every page ---------- */
  function tick() {
    $("#dateTime").textContent = new Date().toLocaleString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }
  tick(); setInterval(tick, 1000);
  $("#year").textContent = new Date().getFullYear();

  var page = document.body.dataset.page;

  /* ---------- Home ---------- */
  if (page === "home") {
    var cs = currentSeason();
    $("#seasonName").textContent = cs;
    $("#seasonLink").href = "guides.html?season=" + encodeURIComponent(cs);
    $("#fGuides").innerHTML = [0, 2, 3].map(function (i) { return guideCard(GUIDES[i], i, "col-md-4"); }).join("");
    $("#fCrops").innerHTML = [0, 3, 7, 11].map(function (i) { return cropCard(CROPS[i], i, "col-sm-6 col-lg-3"); }).join("");
  }

  /* ---------- Guides ---------- */
  if (page === "guides") {
    var opts = function (id, list) { $(id).insertAdjacentHTML("beforeend", list.map(function (x) { return "<option>" + esc(x) + "</option>"; }).join("")); };
    var uniq = function (key) { var r = []; GUIDES.forEach(function (g) { if (r.indexOf(g[key]) < 0) { r.push(g[key]); } }); return r; };
    opts("#fCrop", uniq("crop")); opts("#fSeason", SEASONS); opts("#fMethod", uniq("method"));
    var qs = new URLSearchParams(location.search).get("season");
    if (qs && SEASONS.indexOf(qs) > -1) { $("#fSeason").value = qs; }
    var renderGuides = function () {
      var c = $("#fCrop").value, s = $("#fSeason").value, m = $("#fMethod").value, q = $("#fSearch").value.trim().toLowerCase();
      var list = GUIDES.map(function (g, i) { return { g: g, i: i }; }).filter(function (o) {
        return (!c || o.g.crop === c) && (!s || o.g.season === s) && (!m || o.g.method === m) && (!q || (o.g.t + " " + o.g.sum).toLowerCase().indexOf(q) > -1);
      });
      $("#guideCount").textContent = list.length + (list.length === 1 ? " guide" : " guides");
      $("#guideGrid").innerHTML = list.length ? list.map(function (o) { return guideCard(o.g, o.i, "col-md-6 col-lg-4"); }).join("") : "<div class='col-12'><div class='alert alert-secondary'>No guides match. Clear a filter to see more.</div></div>";
    };
    ["#fCrop", "#fSeason", "#fMethod"].forEach(function (id) { $(id).addEventListener("change", renderGuides); });
    $("#fSearch").addEventListener("input", renderGuides);
    $("#fReset").addEventListener("click", function () { $("#fCrop").value = ""; $("#fSeason").value = ""; $("#fMethod").value = ""; $("#fSearch").value = ""; renderGuides(); });
    renderGuides();
  }

  /* ---------- Crops ---------- */
  if (page === "crops") {
    $("#cropSections").innerHTML = CROP_CATS.map(function (cat) {
      var items = CROPS.map(function (c, i) { return { c: c, i: i }; }).filter(function (o) { return o.c.cat === cat; });
      return "<section class='mb-5' data-cat='" + cat + "' id='" + cat.replace(/\s/g, "").toLowerCase() + "'><h2 class='h3 mb-3 border-bottom pb-2'>" + cat + "</h2><div class='row g-4'>" + items.map(function (o) { return cropCard(o.c, o.i, "col-sm-6 col-lg-4"); }).join("") + "</div></section>";
    }).join("");
    $$("#catPills button").forEach(function (b) {
      b.addEventListener("click", function () {
        var cat = b.dataset.cat;
        $$("#catPills button").forEach(function (x) { x.classList.toggle("active", x === b); });
        $$("#cropSections section").forEach(function (s) { s.hidden = !!cat && s.dataset.cat !== cat; });
      });
    });
  }

  /* ---------- Pest control: search the quick guide ---------- */
  if (page === "pests") {
    $("#pestSearch").addEventListener("input", function () {
      var q = this.value.trim().toLowerCase(), n = 0;
      $$("#pestBody tr").forEach(function (r) { var show = !q || r.textContent.toLowerCase().indexOf(q) > -1; r.hidden = !show; if (show) { n++; } });
      $("#pestNone").hidden = n > 0;
    });
  }

  /* ---------- Contact ---------- */
  if (page === "contact") {
    var MAX = 5 * 1024 * 1024;
    $("#cFile").addEventListener("change", function () {
      var f = this.files[0];
      this.setCustomValidity(f && f.size > MAX ? "too big" : "");
    });
    $("#contactForm").addEventListener("submit", function (e) {
      e.preventDefault();
      this.classList.add("was-validated");
      if (!this.checkValidity()) { return; }
      var f = $("#cFile").files[0], ref = "AH-" + (10000 + Math.floor(Math.random() * 89999));
      $("#okText").innerHTML = "<p>Thank you, " + esc($("#cName").value.trim()) + ". Your inquiry has been recorded.</p><dl class='row small mb-0'><dt class='col-4'>Reference</dt><dd class='col-8'>" + ref + "</dd><dt class='col-4'>Topic</dt><dd class='col-8'>" + esc($("#cTopic").value) + "</dd><dt class='col-4'>Reply to</dt><dd class='col-8'>" + esc($("#cEmail").value.trim()) + "</dd><dt class='col-4'>Attachment</dt><dd class='col-8'>" + (f ? esc(f.name) : "None") + "</dd></dl>";
      new bootstrap.Modal($("#okModal")).show();
      this.reset(); this.classList.remove("was-validated");
    });
  }
})();
