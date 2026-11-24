/* Blooming Oasis - main.js (vanilla JavaScript) */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
  function tk(n) { return "\u09F3" + Math.round(n).toLocaleString("en-US"); }
  function load(k, fallback) { try { var v = JSON.parse(localStorage.getItem(k)); return v === null ? fallback : v; } catch (e) { return fallback; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }

  /* ---------- Data (sample prices in BDT) ---------- */
  // sun: light levels the plant copes with. care: 1 easy, 2 moderate, 3 needs attention. pet: true = safe for cats and dogs.
  var PLANTS = [
    { n: "Monstera Deliciosa", sci: "Monstera deliciosa", type: "round", sun: ["medium", "bright"], care: 2, pet: false, price: 1450, light: "Bright, indirect light. It tolerates medium light but grows slower, with fewer splits.", water: "Water when the top 2-3 inches of soil are dry, about every 1-2 weeks. Water less in winter.", tox: "Toxic to cats and dogs if chewed (calcium oxalate crystals). Keep out of reach.", repot: "Every 1-2 years in spring, into a pot about 2 inches wider with drainage holes." },
    { n: "Snake Plant", sci: "Dracaena trifasciata", type: "blades", sun: ["low", "medium", "bright"], care: 1, pet: false, price: 850, light: "Copes with low light up to bright indirect light.", water: "Every 2-3 weeks. Let the soil dry out fully; overwatering causes rot.", tox: "Mildly toxic to cats and dogs. Can cause drooling and an upset stomach.", repot: "Every 2-3 years. It likes to be snug in its pot." },
    { n: "Golden Pothos", sci: "Epipremnum aureum", type: "trail", sun: ["low", "medium"], care: 1, pet: false, price: 550, light: "Low to bright indirect light. Variegation is stronger in brighter light.", water: "When the top inch of soil is dry. Leaves droop when thirsty.", tox: "Toxic to cats and dogs if eaten.", repot: "Every 1-2 years, or when roots fill the pot." },
    { n: "Spider Plant", sci: "Chlorophytum comosum", type: "fern", sun: ["medium", "bright"], care: 1, pet: true, price: 600, light: "Medium to bright indirect light.", water: "Keep soil lightly moist. Use filtered water if leaf tips turn brown.", tox: "Non-toxic to cats and dogs.", repot: "Every 1-2 years. Thick roots fill the pot quickly." },
    { n: "Peace Lily", sci: "Spathiphyllum", type: "round", sun: ["low", "medium"], care: 2, pet: false, price: 900, light: "Low to medium indirect light.", water: "Keep soil evenly moist. It droops clearly when thirsty.", tox: "Toxic to cats and dogs if chewed (oxalates).", repot: "Every 1-2 years in spring." },
    { n: "ZZ Plant", sci: "Zamioculcas zamiifolia", type: "round", sun: ["low", "medium"], care: 1, pet: false, price: 1100, light: "Low to bright indirect light.", water: "Every 2-3 weeks. Thick rhizomes store water, so err on the dry side.", tox: "Toxic to cats and dogs if eaten. The sap can irritate skin.", repot: "Every 2-3 years." },
    { n: "Parlor Palm", sci: "Chamaedorea elegans", type: "fern", sun: ["low", "medium"], care: 1, pet: true, price: 1200, light: "Low to medium indirect light.", water: "Water when the top inch of soil is dry.", tox: "Non-toxic to cats and dogs.", repot: "Every 2-3 years. It prefers to be slightly root-bound." },
    { n: "Boston Fern", sci: "Nephrolepis exaltata", type: "fern", sun: ["medium", "bright"], care: 3, pet: true, price: 950, light: "Medium to bright indirect light. Needs humidity.", water: "Keep soil evenly moist. Group with other plants or mist for humidity.", tox: "Non-toxic to cats and dogs.", repot: "Every year in spring." },
    { n: "Calathea Orbifolia", sci: "Goeppertia orbifolia", type: "round", sun: ["medium"], care: 3, pet: true, price: 1600, light: "Medium indirect light. Direct sun scorches the leaves.", water: "Keep soil lightly moist with filtered water. Needs high humidity.", tox: "Non-toxic to cats and dogs.", repot: "Every 1-2 years in spring." },
    { n: "Peperomia", sci: "Peperomia obtusifolia", type: "rosette", sun: ["medium", "bright"], care: 1, pet: true, price: 700, light: "Medium to bright indirect light.", water: "When the top 2 inches are dry. The leaves store water.", tox: "Non-toxic to cats and dogs.", repot: "Every 2 years. It has a small root system." },
    { n: "Cast Iron Plant", sci: "Aspidistra elatior", type: "blades", sun: ["low"], care: 1, pet: true, price: 1000, light: "Low to medium light. Very tolerant of dim rooms.", water: "Every 1-2 weeks, letting the top inch dry.", tox: "Non-toxic to cats and dogs.", repot: "Every 3-4 years. It dislikes root disturbance." },
    { n: "Haworthia", sci: "Haworthiopsis attenuata", type: "rosette", sun: ["medium", "bright"], care: 1, pet: true, price: 500, light: "Bright indirect light. Tolerates some morning sun.", water: "Every 2-3 weeks. Let the soil dry out fully.", tox: "Non-toxic to cats and dogs.", repot: "Every 2-3 years, into a shallow pot with gritty soil." },
    { n: "Fiddle Leaf Fig", sci: "Ficus lyrata", type: "round", sun: ["bright"], care: 3, pet: false, price: 2200, light: "Bright, indirect light. Dislikes being moved.", water: "When the top 2 inches are dry. Sensitive to overwatering.", tox: "Toxic to cats and dogs if eaten.", repot: "Every 1-2 years in spring." }
  ];
  var SIZES = [["Small", "about 30 cm tall", 1], ["Medium", "about 60 cm tall", 1.7], ["Large", "about 90 cm tall", 2.6]];
  var POTS = [["No pot", 0], ["Terracotta pot", 250], ["Glazed ceramic pot", 450], ["Self-watering pot", 600]];
  var STANDS = [["No stand", 0], ["Wooden plant stand", 700], ["Metal tripod stand", 550]];
  var SETS = [
    { n: "Pet-Safe Pals", d: "Three plants that are non-toxic to cats and dogs.", ids: [3, 6, 9] },
    { n: "Low-Light Legends", d: "Tough plants for dim rooms and shaded corners.", ids: [1, 5, 10] },
    { n: "Bright Window Trio", d: "For a sunny sill with plenty of indirect light.", ids: [0, 11, 9] },
    { n: "Desk Starter Pack", d: "Small, easy plants that fit beside a laptop.", ids: [11, 9, 2] }
  ];
  var GUIDES = [
    ["bi-droplet", "Watering", "Push a finger 2-3 inches into the soil. If it feels dry, water until it drains from the bottom, then empty the saucer. Soggy soil is the most common cause of houseplant trouble."],
    ["bi-brightness-high", "Light", "Bright indirect light means a spot near a window where the sun does not hit the leaves directly. Low-light plants cope further from windows but grow more slowly."],
    ["bi-flower1", "Repotting", "Repot when roots circle the pot or poke out of the drainage holes, usually every 1-2 years. Choose a pot about 2 inches wider, and repot in spring."],
    ["bi-bug", "Pests and humidity", "Check under leaves every week. Wipe off pests with soapy water or a cotton swab with alcohol. Group humidity-loving plants together to raise the moisture around them."]
  ];
  var TEAM = [
    ["Nusrat Jahan", "Co-founder and Head of Plants", "Nusrat grew her first monstera from a single cutting on a Chattogram balcony. She now chooses every plant we sell and writes our care guides."],
    ["Tahmid Rahman", "Co-founder and Sourcing Lead", "Tahmid works directly with partner nurseries and designs our plastic-free packaging. He believes a plant should arrive healthier than it left."],
    ["Imtiaz Karim", "Head Grower", "Imtiaz has fifteen years of nursery experience and keeps our stock hardened to indoor conditions before it ships."],
    ["Sadia Noor", "Plant Specialist", "Sadia answers your plant questions, from yellow leaves to repotting, and hosts our weekend care workshops."]
  ];

  /* ---------- Generated plant illustrations ---------- */
  var BGS = ["#d9efdc", "#fbe7d9", "#e3ecf8", "#f6eed2", "#ece0f3", "#dff1ee"];
  var GREENS = ["#2f8f5a", "#1f6f4a", "#46a36b", "#17583b"];
  function plantArt(type, i) {
    var s = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='600' height='600' fill='" + BGS[i % BGS.length] + "'/>", k, a, len, x, y, h;
    var potc = ["#c8553d", "#f2ede4", "#4a4f57", "#d9a35b"][i % 4];
    if (type === "round") {
      for (k = 0; k < 7; k++) { a = (-70 + k * 23) * Math.PI / 180; len = 150 + (k % 3) * 30; x = 300 + Math.sin(a) * len * 0.9; y = 430 - Math.cos(a) * len;
        s += "<path d='M300 430 Q" + (300 + Math.sin(a) * len * 0.3) + " " + (430 - Math.cos(a) * len * 0.6) + " " + x + " " + y + "' stroke='" + GREENS[3] + "' stroke-width='7' fill='none'/><ellipse cx='" + x + "' cy='" + y + "' rx='46' ry='62' transform='rotate(" + (a * 180 / Math.PI * 1.2) + " " + x + " " + y + ")' fill='" + GREENS[k % 3] + "'/>"; }
    } else if (type === "blades") {
      for (k = 0; k < 8; k++) { x = 240 + k * 17; h = 160 + ((k * 37) % 120);
        s += "<path d='M" + x + " 440 Q" + (x - 26) + " " + (440 - h / 2) + " " + (x + (k - 4) * 8) + " " + (440 - h) + " Q" + (x + 26) + " " + (440 - h / 2) + " " + x + " 440Z' fill='" + GREENS[k % 3] + "'/>"; }
    } else if (type === "fern") {
      for (k = 0; k < 8; k++) { a = (-78 + k * 22) * Math.PI / 180; x = 300 + Math.sin(a) * 230; y = 430 - Math.cos(a) * 200;
        s += "<path d='M300 430 Q" + (300 + Math.sin(a) * 120) + " " + (430 - Math.cos(a) * 230) + " " + x + " " + y + "' stroke='" + GREENS[k % 3] + "' stroke-width='6' fill='none'/><path d='M300 430 Q" + (300 + Math.sin(a) * 120) + " " + (430 - Math.cos(a) * 230) + " " + x + " " + y + "' stroke='" + GREENS[(k + 1) % 3] + "' stroke-width='26' stroke-linecap='round' stroke-dasharray='12 9' fill='none'/>"; }
    } else if (type === "rosette") {
      for (var r = 0; r < 2; r++) { for (k = 0; k < 10; k++) { a = (k * 36 + r * 18) * Math.PI / 180; var rr = r ? 40 : 75;
        s += "<ellipse cx='" + (300 + Math.sin(a) * rr) + "' cy='" + (390 - Math.cos(a) * rr * 0.5) + "' rx='" + (r ? 26 : 34) + "' ry='" + (r ? 50 : 70) + "' transform='rotate(" + (k * 36 + r * 18) + " " + (300 + Math.sin(a) * rr) + " " + (390 - Math.cos(a) * rr * 0.5) + ")' fill='" + GREENS[(k + r) % 3] + "'/>"; } }
    } else {  // trail
      for (k = 0; k < 6; k++) { x = 230 + k * 28; var ex = x + (k - 2.5) * 26, ey = 540 - (k % 3) * 40;
        s += "<path d='M" + x + " 440 Q" + (x + (k - 2.5) * 40) + " 520 " + ex + " " + ey + "' stroke='" + GREENS[3] + "' stroke-width='5' fill='none'/>";
        for (var j = 1; j <= 4; j++) { s += "<circle cx='" + (x + (ex - x) * j / 4) + "' cy='" + (440 + (ey - 440) * j / 4) + "' r='17' fill='" + GREENS[(k + j) % 3] + "'/>"; } }
    }
    s += "<path d='M210 440h180l-22 120h-136z' fill='" + potc + "'/><rect x='200' y='425' width='200' height='24' rx='6' fill='" + potc + "'/></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
  }
  function portrait(i) {
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='" + GREENS[i % 3] + "'/><circle cx='100' cy='78' r='38' fill='#fff' opacity='.92'/><path d='M30 200c0-48 32-76 70-76s70 28 70 76z' fill='#fff' opacity='.92'/></svg>");
  }
  function sunLabel(p) { return p.sun.length === 3 ? "Low to bright light" : p.sun[0] === p.sun[p.sun.length - 1] ? p.sun[0][0].toUpperCase() + p.sun[0].slice(1) + " light" : p.sun[0][0].toUpperCase() + p.sun[0].slice(1) + " to " + p.sun[p.sun.length - 1] + " light"; }
  function careLabel(p) { return ["", "Easy care", "Moderate care", "Needs attention"][p.care]; }
  function badges(p) {
    return "<span class='badge text-bg-light border'>" + sunLabel(p) + "</span> <span class='badge text-bg-light border'>" + careLabel(p) + "</span> <span class='badge " + (p.pet ? "text-bg-success" : "text-bg-warning") + "'>" + (p.pet ? "Pet-safe" : "Not pet-safe") + "</span>";
  }
  function plantCard(i, cls) {
    var p = PLANTS[i];
    return "<div class='" + cls + "'><article class='card lift h-100'><img class='card-img-top' src='" + plantArt(p.type, i) + "' alt='Illustration of " + esc(p.n) + "' loading='lazy' width='300' height='300'><div class='card-body d-flex flex-column'><h3 class='h5'>" + esc(p.n) + "</h3><p class='small mb-3'>" + badges(p) + "</p><div class='d-flex justify-content-between align-items-center mt-auto'><span class='price'>From " + tk(p.price) + "</span><a class='btn btn-leaf btn-sm' href='product.html?plant=" + i + "'>View details</a></div></div></article></div>";
  }

  /* ---------- Toast ---------- */
  function toast(msg) {
    $("#toastBody").textContent = msg;
    bootstrap.Toast.getOrCreateInstance($("#appToast"), { delay: 3200 }).show();
  }

  /* ---------- Cart (saved in this browser) ---------- */
  function cart() { return load("bo_cart", []); }
  function renderCart() {
    var c = cart(), n = c.reduce(function (a, i) { return a + i.qty; }, 0), total = c.reduce(function (a, i) { return a + i.total; }, 0);
    $("#cartCount").textContent = n;
    $("#cartBody").innerHTML = c.length ? c.map(function (it, k) {
      return "<div class='border-bottom py-2 d-flex justify-content-between gap-2'><div><b>" + esc(it.name) + "</b> x " + it.qty + "<div class='small text-secondary'>" + esc(it.size) + ", " + esc(it.pot) + ", " + esc(it.stand) + "</div></div><div class='text-end'><div>" + tk(it.total) + "</div><button type='button' class='btn btn-link btn-sm p-0' data-rm='" + k + "'>Remove</button></div></div>";
    }).join("") : "<p class='text-secondary'>Your cart is empty.</p>";
    $("#cartTotal").textContent = tk(total);
  }

  /* ---------- Every page ---------- */
  function tick() {
    $("#dateTime").textContent = new Date().toLocaleString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }
  tick(); setInterval(tick, 1000);
  $("#year").textContent = new Date().getFullYear();
  renderCart();
  $("#cartBody").addEventListener("click", function (e) {
    var b = e.target.closest("[data-rm]"); if (!b) { return; }
    var c = cart(); c.splice(+b.dataset.rm, 1); save("bo_cart", c); renderCart();
  });
  $("#cartClear").addEventListener("click", function () { save("bo_cart", []); renderCart(); });
  $("#checkoutBtn").addEventListener("click", function () { toast("Demo only: checkout is not connected."); });

  var page = document.body.dataset.page;

  /* ---------- Home ---------- */
  if (page === "home") {
    // collage
    var tiles = [["round", 0, "big"], ["blades", 1, ""], ["fern", 2, "tall"], ["rosette", 3, ""], ["trail", 4, "wide"], ["round", 5, ""], ["fern", 6, ""], ["blades", 7, "wide"]];
    $("#collage").innerHTML = tiles.map(function (t) { return "<div class='tile " + t[2] + "'><img src='" + plantArt(t[0], t[1]) + "' alt='Illustration of lush houseplants in pots' loading='lazy'></div>"; }).join("");

    // Plant Matchmaker quiz
    $("#quizForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var pick = function (n) { return document.querySelector("input[name=" + n + "]:checked").value; };
      var sun = pick("sun"), care = +pick("care"), pet = pick("pet");
      var ok = PLANTS.map(function (p, i) { return { p: p, i: i }; }).filter(function (o) {
        return o.p.sun.indexOf(sun) > -1 && o.p.care <= care && (pet !== "safe" || o.p.pet);
      });
      var out = $("#quizOut");
      if (!ok.length) { out.innerHTML = "<div class='alert alert-warning'>No exact match. Try a brighter spot or a higher care level.</div>"; return; }
      ok.sort(function (a, b) { return b.p.care - a.p.care || a.i - b.i; });   // prefer the most rewarding plant within the chosen care level
      out.innerHTML = "<h3 class='h5 mb-3'>Your top matches (" + ok.length + " found)</h3><div class='row g-4'>" + ok.slice(0, 3).map(function (o) { return plantCard(o.i, "col-md-4"); }).join("") + "</div>";
      out.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    // popular + collections + guides
    $("#popular").innerHTML = [0, 1, 2, 3].map(function (i) { return plantCard(i, "col-sm-6 col-lg-3"); }).join("");
    $("#sets").innerHTML = SETS.map(function (s) {
      var sum = s.ids.reduce(function (a, i) { return a + PLANTS[i].price; }, 0), bundle = Math.round(sum * 0.9 / 10) * 10;
      return "<div class='col-md-6 col-lg-3'><div class='card lift h-100'><div class='card-body d-flex flex-column'><div class='d-flex mb-3'>" + s.ids.map(function (i) { return "<img src='" + plantArt(PLANTS[i].type, i) + "' alt='' width='64' height='64' class='rounded-circle border border-2 border-white' style='margin-right:-14px'>"; }).join("") + "</div><h3 class='h5'>" + esc(s.n) + "</h3><p class='small text-secondary'>" + esc(s.d) + "</p><p class='small mb-2'>" + s.ids.map(function (i) { return esc(PLANTS[i].n); }).join(", ") + "</p><div class='mt-auto'><div class='price mb-2'>" + tk(bundle) + " <small class='text-secondary text-decoration-line-through fw-normal'>" + tk(sum) + "</small></div><a class='btn btn-outline-leaf btn-sm' href='product.html?plant=" + s.ids[0] + "'>Shop the set</a></div></div></div></div>";
    }).join("");
    $("#guides").innerHTML = GUIDES.map(function (g) { return "<div class='col-md-6 col-lg-3'><div class='card h-100'><div class='card-body'><div class='icon-box'><i class='bi " + g[0] + "'></i></div><h3 class='h5'>" + g[1] + "</h3><p class='small text-secondary mb-0'>" + g[2] + "</p></div></div></div>"; }).join("");

    // collapsible membership section (CSS + JavaScript)
    var mBtn = $("#memberBtn"), mPanel = $("#memberPanel");
    mBtn.addEventListener("click", function () {
      var open = mBtn.getAttribute("aria-expanded") === "true";
      mBtn.setAttribute("aria-expanded", String(!open));
      mPanel.classList.toggle("open", !open);
      mPanel.setAttribute("aria-hidden", String(open));
    });
    $("#joinBtn").addEventListener("click", function () { toast("Thank you. Membership sign-up is a demo and nothing was saved."); });
  }

  /* ---------- Product ---------- */
  if (page === "product") {
    var id = parseInt(new URLSearchParams(location.search).get("plant"), 10);
    if (isNaN(id) || !PLANTS[id]) { id = 0; }
    var p = PLANTS[id];
    document.title = p.n + " | Blooming Oasis";
    $("#crumbLast").textContent = p.n;
    $("#pImg").src = plantArt(p.type, id); $("#pImg").alt = "Illustration of " + p.n;
    $("#pName").textContent = p.n; $("#pSci").textContent = p.sci; $("#pBadges").innerHTML = badges(p);

    var tox = p.pet ? ["Non-toxic", "success"] : /^Mildly/.test(p.tox) ? ["Mildly toxic", "warning"] : ["Toxic to pets", "danger"];
    $("#careBody").innerHTML = "<tr><th scope='row'>Plant size options</th><td>" + SIZES.map(function (s) { return s[0] + " (" + s[1] + ")"; }).join(", ") + "</td></tr>" +
      "<tr><th scope='row'>Light requirements</th><td>" + esc(p.light) + "</td></tr>" +
      "<tr><th scope='row'>Watering requirements</th><td>" + esc(p.water) + "</td></tr>" +
      "<tr><th scope='row'>Toxicity level</th><td><span class='badge text-bg-" + tox[1] + " me-2'>" + tox[0] + "</span>" + esc(p.tox) + "</td></tr>" +
      "<tr><th scope='row'>Repotting recommendation</th><td>" + esc(p.repot) + "</td></tr>";

    $("#sizes").innerHTML = SIZES.map(function (s, i) { return "<div class='col-4'><input type='radio' class='btn-check' name='size' id='sz" + i + "' value='" + i + "'" + (i === 0 ? " checked" : "") + "><label class='size-opt' for='sz" + i + "'><b>" + s[0] + "</b><br><small class='text-secondary'>" + s[1] + "</small></label></div>"; }).join("");
    $("#potSel").innerHTML = POTS.map(function (o, i) { return "<option value='" + i + "'>" + o[0] + (o[1] ? " (+" + tk(o[1]) + ")" : "") + "</option>"; }).join("");
    $("#standSel").innerHTML = STANDS.map(function (o, i) { return "<option value='" + i + "'>" + o[0] + (o[1] ? " (+" + tk(o[1]) + ")" : "") + "</option>"; }).join("");

    var calc = function () {
      var si = +document.querySelector("input[name=size]:checked").value, qty = Math.min(10, Math.max(1, +$("#qty").value || 1));
      var unit = Math.round(p.price * SIZES[si][2] / 10) * 10 + POTS[+$("#potSel").value][1] + STANDS[+$("#standSel").value][1];
      $("#unitPrice").textContent = tk(unit); $("#lineTotal").textContent = tk(unit * qty);
      return { si: si, qty: qty, total: unit * qty };
    };
    $("#buyForm").addEventListener("input", calc); $("#buyForm").addEventListener("change", calc); calc();
    $("#addCart").addEventListener("click", function () {
      var c = calc(), items = cart();
      items.push({ name: p.n, size: SIZES[c.si][0], pot: POTS[+$("#potSel").value][0], stand: STANDS[+$("#standSel").value][0], qty: c.qty, total: c.total });
      save("bo_cart", items); renderCart();
      toast(c.qty + " x " + p.n + " added to your cart.");
    });

    // video (Monstera only)
    var isMon = id === 0;
    $("#videoWrap").hidden = !isMon; $("#videoNote").hidden = isMon;

    // Plant Parent Tips
    var tips = load("bo_tips", [
      { name: "Farhana", plant: "Monstera Deliciosa", text: "I moved mine closer to an east window and it started putting out split leaves within two months. A moss pole made a big difference too.", img: null },
      { name: "Imran", plant: "Snake Plant", text: "My biggest lesson: water far less than you think. Once a month in winter is plenty for mine.", img: null }
    ]);
    $("#tipPlant").innerHTML = PLANTS.map(function (x) { return "<option>" + esc(x.n) + "</option>"; }).join("");
    $("#tipPlant").value = p.n;
    var renderTips = function () {
      $("#tipList").innerHTML = tips.map(function (t) {
        return "<div class='card mb-3'><div class='card-body'><div class='d-flex justify-content-between'><b>" + esc(t.name) + "</b><span class='badge text-bg-light border'>" + esc(t.plant) + "</span></div><p class='mb-0 mt-2'>" + esc(t.text) + "</p>" + (t.img ? "<img class='tip-img' src='" + t.img + "' alt='Photo shared by " + esc(t.name) + "' loading='lazy'>" : "") + "</div></div>";
      }).join("");
    };
    renderTips();
    function resizeImage(file, max, cb) {   // shrink uploaded photos so they stay light
      var fr = new FileReader();
      fr.onload = function () {
        var im = new Image();
        im.onload = function () { var r = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement("canvas"); c.width = Math.round(im.width * r); c.height = Math.round(im.height * r); c.getContext("2d").drawImage(im, 0, 0, c.width, c.height); cb(c.toDataURL("image/jpeg", 0.8)); };
        im.onerror = function () { cb(null); };
        im.src = fr.result;
      };
      fr.readAsDataURL(file);
    }
    $("#tipPhoto").addEventListener("change", function () {
      var f = this.files[0]; this.setCustomValidity(f && (f.size > 5 * 1024 * 1024 || f.type.indexOf("image/") !== 0) ? "bad" : "");
    });
    $("#tipForm").addEventListener("submit", function (e) {
      e.preventDefault();
      this.classList.add("was-validated");
      if (!this.checkValidity()) { return; }
      var form = this, f = $("#tipPhoto").files[0];
      var done = function (img) {
        tips.unshift({ name: $("#tipName").value.trim(), plant: $("#tipPlant").value, text: $("#tipText").value.trim(), img: img });
        if (!save("bo_tips", tips)) { toast("Tip posted, but it is too large to keep after you leave this page."); } else { toast("Thanks for sharing your tip!"); }
        renderTips(); form.reset(); form.classList.remove("was-validated"); $("#tipPlant").value = p.n;
      };
      if (f) { resizeImage(f, 640, done); } else { done(null); }
    });
  }

  /* ---------- About ---------- */
  if (page === "about") {
    $("#team").innerHTML = TEAM.map(function (m, i) { return "<div class='col-sm-6 col-lg-3'><div class='card person lift h-100 text-center'><img src='" + portrait(i) + "' alt='Photo of " + esc(m[0]) + "' width='130' height='130'><div class='card-body'><h3 class='h5 mb-0'>" + esc(m[0]) + "</h3><p class='small text-secondary fw-semibold'>" + esc(m[1]) + "</p><p class='small mb-0'>" + esc(m[2]) + "</p></div></div></div>"; }).join("");
  }

  /* ---------- Contact ---------- */
  if (page === "contact") {
    // Plant Specialist chat (automated demo replies)
    var KB = [
      [/yellow/, "Yellow leaves are most often a watering issue, usually too much. Check whether the soil stays wet for days and that the pot drains. One or two old lower leaves yellowing is normal."],
      [/brown|crisp/, "Brown, crispy tips usually mean dry air, uneven watering, or minerals in tap water. Water more evenly, and use filtered water for sensitive plants like calathea and spider plant."],
      [/water|thirst|droop/, "Push a finger 2-3 inches into the soil. If it is dry, water until it drains from the bottom, then empty the saucer. Succulents and snake plants like to dry out more. Which plant do you have?"],
      [/light|sun|window|dark|shade/, "Bright indirect light means near a window but out of the direct sun beam. ZZ plant, cast iron plant and snake plant cope in dimmer corners, but every plant needs some daylight."],
      [/pet|cat|dog|toxic|safe/, "Pet-safe picks include spider plant, parlor palm, peperomia, Boston fern, calathea and haworthia. Monstera, pothos, snake plant and peace lily are toxic if chewed. If your pet eats a plant, call your vet."],
      [/repot|root|pot size/, "Repot when roots circle the pot or grow from the drainage holes, usually every 1-2 years in spring. Go up one size, about 2 inches wider."],
      [/bug|pest|gnat|mealy|mite|fungus/, "Look under leaves and along stems. For gnats, let the top soil dry out. For mealybugs, dab with a cotton swab dipped in isopropyl alcohol, and keep the plant apart from others."],
      [/humid|mist/, "Many tropical houseplants like humidity above 40-50%. Group plants together or use a pebble tray. Misting helps only for a short time."],
      [/monstera/, "Monsteras like bright indirect light, water when the top 2-3 inches are dry, and a moss pole to climb. They are toxic to pets if chewed."],
      [/thank/, "You are welcome! Send us a photo through the contact form if you would like a closer look."],
      [/^(hi|hello|hey)/, "Hello! What would you like to know about your plant?"]
    ];
    var log = $("#chatLog");
    var add = function (cls, text) { var d = document.createElement("div"); d.className = "msg " + cls; d.textContent = text; log.appendChild(d); log.scrollTop = log.scrollHeight; return d; };
    add("bot", "Hi, I'm Mira, your plant specialist. Tell me the plant's name and what you are seeing, or tap a question below.");
    var ask = function (q) {
      add("me", q);
      var typing = add("bot", "Mira is typing...");
      setTimeout(function () {
        var low = q.toLowerCase(), ans = "Could you tell me the plant's name, where it sits at home, and how often you water it? Then I can be more specific.";
        for (var i = 0; i < KB.length; i++) { if (KB[i][0].test(low)) { ans = KB[i][1]; break; } }
        typing.textContent = ans; log.scrollTop = log.scrollHeight;
      }, 800);
    };
    $("#chatForm").addEventListener("submit", function (e) { e.preventDefault(); var v = $("#chatInput").value.trim(); if (v) { ask(v); this.reset(); } });
    $$("[data-q]").forEach(function (b) { b.addEventListener("click", function () { ask(b.dataset.q); }); });

    // contact form + confirmation popup
    $("#contactForm").addEventListener("submit", function (e) {
      e.preventDefault();
      this.classList.add("was-validated");
      if (!this.checkValidity()) { return; }
      $("#okText").innerHTML = "<p>Thank you, " + esc($("#cName").value.trim()) + ". We have received your message and will reply to <b>" + esc($("#cEmail").value.trim()) + "</b> within one working day.</p><p class='mb-0 small text-secondary'>Subject: " + esc($("#cSubject").value.trim()) + "</p>";
      new bootstrap.Modal($("#okModal")).show();
      this.reset(); this.classList.remove("was-validated");
    });
  }
})();
