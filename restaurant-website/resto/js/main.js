/* Saffron Table Restaurant - main.js (jQuery) */
$(function () {
  "use strict";

  /* ---------- Data ---------- */
  var CATS = ["Starters", "Main Course", "Desserts", "Drinks"];
  var CC = { "Starters": ["#2d4a22", "#8fbf4a"], "Main Course": ["#5a1a14", "#d9622b"], "Desserts": ["#5a1f3d", "#e98ab5"], "Drinks": ["#7a4a08", "#f4a81d"] };
  // [category, name, price, short description, ingredients, kcal, protein g, carbs g, fat g]
  var RAW = [
    ["Starters", "Chicken Samosa Platter", 180, "Six crisp samosas filled with spiced chicken, served with tamarind chutney.", ["Chicken", "Onion", "Cumin", "Coriander", "Flour"], 420, 22, 38, 20],
    ["Starters", "Crispy Fish Fingers", 320, "Golden fried fish strips with a lemon and herb dip.", ["White fish", "Breadcrumbs", "Lemon", "Parsley", "Egg"], 380, 26, 24, 19],
    ["Starters", "Vegetable Spring Rolls", 220, "Thin rolls packed with cabbage, carrot and glass noodles.", ["Cabbage", "Carrot", "Glass noodles", "Soy sauce", "Ginger"], 290, 7, 41, 11],
    ["Starters", "Tomato Basil Soup", 200, "Slow-simmered tomato soup finished with fresh basil and cream.", ["Tomato", "Basil", "Garlic", "Cream", "Olive oil"], 160, 4, 18, 8],
    ["Main Course", "Kacchi Biryani", 450, "Fragrant basmati rice layered with marinated mutton and slow-cooked in a sealed pot.", ["Mutton", "Basmati rice", "Yoghurt", "Saffron", "Fried onion", "Potato"], 780, 38, 82, 31],
    ["Main Course", "Beef Bhuna with Paratha", 420, "Dry-spiced beef cooked down until rich, served with two flaky parathas.", ["Beef", "Onion", "Garlic", "Chilli", "Flour", "Ghee"], 720, 41, 55, 36],
    ["Main Course", "Grilled Chicken Steak", 520, "Herb-marinated chicken breast with mushroom sauce, mash and vegetables.", ["Chicken breast", "Mushroom", "Potato", "Butter", "Rosemary"], 560, 48, 30, 26],
    ["Main Course", "Prawn Malai Curry", 580, "Large prawns in a coconut milk gravy with mild spices, served with steamed rice.", ["Prawn", "Coconut milk", "Onion", "Turmeric", "Rice"], 610, 34, 58, 25],
    ["Desserts", "Rasmalai", 150, "Soft cheese dumplings soaked in chilled cardamom milk.", ["Milk", "Cottage cheese", "Cardamom", "Pistachio", "Sugar"], 260, 9, 34, 10],
    ["Desserts", "Chocolate Lava Cake", 280, "Warm chocolate cake with a molten centre and vanilla ice cream.", ["Dark chocolate", "Butter", "Egg", "Flour", "Vanilla ice cream"], 480, 7, 52, 28],
    ["Desserts", "Firni", 130, "Creamy ground-rice pudding set in a clay bowl, topped with nuts.", ["Milk", "Rice", "Sugar", "Cardamom", "Almond"], 230, 6, 33, 8],
    ["Desserts", "Mango Cheesecake", 300, "Baked cheesecake on a biscuit base with fresh mango topping.", ["Cream cheese", "Mango", "Biscuit", "Butter", "Sugar"], 420, 8, 45, 24],
    ["Drinks", "Mango Lassi", 140, "Thick chilled yoghurt drink blended with ripe mango.", ["Yoghurt", "Mango", "Sugar", "Cardamom"], 210, 6, 38, 4],
    ["Drinks", "Fresh Lime Soda", 100, "Fresh lime juice with soda, served sweet, salted or mixed.", ["Lime", "Soda water", "Sugar", "Salt", "Mint"], 90, 0, 23, 0],
    ["Drinks", "Masala Tea", 60, "Strong milk tea brewed with ginger, cardamom and cloves.", ["Tea leaves", "Milk", "Ginger", "Cardamom", "Clove"], 80, 3, 11, 3],
    ["Drinks", "Cold Coffee", 180, "Iced coffee blended with milk and a scoop of vanilla ice cream.", ["Coffee", "Milk", "Ice cream", "Sugar"], 250, 7, 33, 10]
  ];
  var DISHES = RAW.map(function (r, i) {
    return { id: i, cat: r[0], name: r[1], price: r[2], desc: r[3], ing: r[4], kcal: r[5], pro: r[6], carb: r[7], fat: r[8] };
  });
  var PER_PAGE = 6;

  /* ---------- Helpers ---------- */
  function esc(s) { return $("<div>").text(s).html(); }
  function tk(n) { return "\u09F3" + n.toLocaleString("en-US"); }
  function art(d, wide) {
    var c = CC[d.cat], s = d.id * 53 % 90, w = wide ? 1600 : 800, h = wide ? 600 : 600, cx = wide ? 1150 : 400, cy = 300;
    var food = "";
    if (d.cat === "Drinks") {
      food = "<path d='M" + (cx - 90) + " " + (cy - 150) + "h180l-24 270a30 30 0 0 1-30 28h-72a30 30 0 0 1-30-28z' fill='#fff' opacity='.9'/><path d='M" + (cx - 74) + " " + (cy - 40) + "h148l-14 150a20 20 0 0 1-20 18h-80a20 20 0 0 1-20-18z' fill='" + c[1] + "'/><rect x='" + (cx + 20) + "' y='" + (cy - 210) + "' width='12' height='140' rx='6' fill='#fff' transform='rotate(14 " + (cx + 26) + " " + (cy - 140) + ")'/>";
    } else {
      food = "<circle cx='" + cx + "' cy='" + cy + "' r='230' fill='#fff' opacity='.95'/><circle cx='" + cx + "' cy='" + cy + "' r='185' fill='#efe9e1'/>" +
        "<circle cx='" + (cx - 50 + s / 3) + "' cy='" + (cy - 20) + "' r='90' fill='" + c[1] + "'/><circle cx='" + (cx + 60) + "' cy='" + (cy + 50) + "' r='60' fill='" + c[0] + "' opacity='.85'/><circle cx='" + (cx - 80) + "' cy='" + (cy + 70) + "' r='36' fill='" + c[1] + "' opacity='.7'/><circle cx='" + (cx + 50) + "' cy='" + (cy - 80) + "' r='24' fill='#fff' opacity='.7'/>";
    }
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + w + " " + h + "'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='" + c[0] + "'/><stop offset='1' stop-color='#1d1412'/></linearGradient></defs><rect width='" + w + "' height='" + h + "' fill='url(#g)'/><g fill='#fff' opacity='.07'><circle cx='" + (120 + s) + "' cy='120' r='170'/></g>" + food + (wide ? "" : "<text x='400' y='572' text-anchor='middle' font-family='Georgia,serif' font-size='30' fill='#fff' opacity='.9'>" + d.name.replace(/&/g, "&amp;") + "</text>") + "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function link(d) { return "dish-detail.html?id=" + d.id; }
  function card(d, cls) {
    return "<div class='" + cls + "'><article class='card dish-card h-100'><img class='card-img-top' src='" + art(d) + "' alt='" + esc(d.name) + "' loading='lazy'>" +
      "<div class='card-body d-flex flex-column'><span class='badge cat-badge align-self-start mb-2'>" + d.cat + "</span><h3 class='h5'><a href='" + link(d) + "'>" + esc(d.name) + "</a></h3><p class='small text-secondary'>" + esc(d.desc) + "</p>" +
      "<div class='d-flex justify-content-between align-items-center mt-auto'><span class='price'>" + tk(d.price) + "</span><button type='button' class='btn btn-wine btn-sm' data-order='" + d.id + "'>Order Now</button></div></div></article></div>";
  }
  function toast(msg) {
    $("#toastBody").text(msg);
    bootstrap.Toast.getOrCreateInstance($("#orderToast")[0], { delay: 2800 }).show();
  }

  /* ---------- Every page ---------- */
  function tick() {
    $("#dateTime").text(new Date().toLocaleString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  }
  tick(); setInterval(tick, 1000);
  $("#year").text(new Date().getFullYear());

  $(document).on("click", "[data-order]", function () {
    var d = DISHES[+$(this).data("order")];
    toast(d.name + " added to your order.");
  });

  $("#newsForm").on("submit", function (e) {
    e.preventDefault();
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($.trim($("#newsEmail").val()));
    $("#newsMsg").text(ok ? "Thank you. You are on the list." : "Enter a valid email address.");
    if (ok) { this.reset(); }
  });

  var page = $("body").data("page");

  /* ---------- Home ---------- */
  if (page === "home") {
    $("[data-slide]").each(function () { $(this).attr("src", art(DISHES[+$(this).data("slide")], true)); });
    $("#specials").html([4, 7, 9, 12].map(function (i) { return card(DISHES[i], "col-sm-6 col-lg-3"); }).join(""));
    $("#chefs").html([5, 10, 1].map(function (i) {
      var d = DISHES[i];
      return "<div class='col-lg-4'><div class='chef'><img src='" + art(d) + "' alt='" + esc(d.name) + "'><div><h3 class='h5'><a href='" + link(d) + "'>" + esc(d.name) + "</a></h3><p class='small text-secondary mb-2'>" + esc(d.desc) + "</p><span class='price'>" + tk(d.price) + "</span></div></div></div>";
    }).join(""));
  }

  /* ---------- Menu ---------- */
  if (page === "menu") {
    var cat = "", cur = 1;
    $("#catAcc").html(CATS.map(function (c, i) {
      var list = DISHES.filter(function (d) { return d.cat === c; });
      return "<div class='accordion-item'><h3 class='accordion-header'><button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#c" + i + "' aria-expanded='false' aria-controls='c" + i + "' data-cat='" + c + "'>" + c + " <span class='badge text-bg-secondary ms-2'>" + list.length + "</span></button></h3>" +
        "<div id='c" + i + "' class='accordion-collapse collapse' data-bs-parent='#catAcc'><div class='accordion-body p-0'><ul class='list-group list-group-flush'>" + list.map(function (d) { return "<li class='list-group-item'><a href='" + link(d) + "'>" + esc(d.name) + "</a> <span class='float-end text-secondary'>" + tk(d.price) + "</span></li>"; }).join("") + "</ul></div></div></div>";
    }).join(""));

    var render = function () {
      var list = DISHES.filter(function (d) { return !cat || d.cat === cat; });
      var pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
      if (cur > pages) { cur = pages; }
      $("#menuTitle").text(cat || "All dishes");
      $("#menuGrid").html(list.slice((cur - 1) * PER_PAGE, cur * PER_PAGE).map(function (d) { return card(d, "col-md-6 col-xl-4"); }).join(""));
      var h = "<li class='page-item" + (cur === 1 ? " disabled" : "") + "'><button class='page-link' data-pg='" + (cur - 1) + "'>Previous</button></li>";
      for (var k = 1; k <= pages; k++) { h += "<li class='page-item" + (k === cur ? " active" : "") + "'><button class='page-link' data-pg='" + k + "'>" + k + "</button></li>"; }
      h += "<li class='page-item" + (cur === pages ? " disabled" : "") + "'><button class='page-link' data-pg='" + (cur + 1) + "'>Next</button></li>";
      $("#pager").html(h).toggle(pages > 1);
    };
    $("#catAcc").on("show.bs.collapse", function (e) { cat = $(e.target).prev().find("[data-cat]").data("cat"); cur = 1; render(); });
    $("#showAll").on("click", function () { cat = ""; cur = 1; $("#catAcc .collapse.show").each(function () { bootstrap.Collapse.getOrCreateInstance(this).hide(); }); render(); });
    $("#pager").on("click", "[data-pg]", function () { cur = +$(this).data("pg"); render(); $("html,body").animate({ scrollTop: $("#menuTop").offset().top - 80 }, 300); });
    render();
  }

  /* ---------- Dish detail ---------- */
  if (page === "detail") {
    var id = parseInt(new URLSearchParams(location.search).get("id"), 10);
    var d = DISHES[id] || DISHES[0];
    document.title = d.name + " | Saffron Table";
    $("#crumbTitle, #crumbLast").text(d.name);

    /* image zoom: CSS transform + jQuery mouse tracking */
    var $box = $("#zoomBox"), $img = $("#zoomImg").attr({ src: art(d), alt: d.name });
    $box.on("mouseenter", function () { $img.css("transform", "scale(2.2)"); })
        .on("mousemove", function (e) {
          var o = $box.offset();
          $img.css("transform-origin", ((e.pageX - o.left) / $box.width() * 100) + "% " + ((e.pageY - o.top) / $box.height() * 100) + "%");
        })
        .on("mouseleave", function () { $img.css("transform", "scale(1)"); });
    $("#zoomBtn").on("click", function () {
      var on = $img.data("on"); $img.data("on", !on).css({ "transform-origin": "center", transform: on ? "scale(1)" : "scale(2.2)" });
    });

    $("#dName").text(d.name); $("#dCat").text(d.cat); $("#dPrice").text(tk(d.price)); $("#dShort").text(d.desc);
    $("#dIng").html(d.ing.map(function (x) { return "<span class='badge text-bg-light border me-1 mb-1'>" + esc(x) + "</span>"; }).join(""));
    $("#dLong").text(d.desc + " Every dish is prepared fresh to order by our kitchen team, using ingredients sourced daily from local suppliers. Please tell your server about any allergies before ordering.");
    $("#nutri").html("<tr><th scope='row'>Energy</th><td>" + d.kcal + " kcal</td></tr><tr><th scope='row'>Protein</th><td>" + d.pro + " g</td></tr><tr><th scope='row'>Carbohydrates</th><td>" + d.carb + " g</td></tr><tr><th scope='row'>Fat</th><td>" + d.fat + " g</td></tr>");

    var q = function (v) { var n = Math.min(20, Math.max(1, v || 1)); $("#qty").val(n); return n; };
    $("#qMinus").on("click", function () { q(+$("#qty").val() - 1); });
    $("#qPlus").on("click", function () { q(+$("#qty").val() + 1); });
    $("#qty").on("change", function () { q(+this.value); });
    $("#orderNow").on("click", function () { var n = q(+$("#qty").val()); toast(n + " x " + d.name + " added. Total " + tk(n * d.price) + "."); });

    var rel = DISHES.filter(function (x) { return x.id !== d.id; }).sort(function (a, b) { return (b.cat === d.cat) - (a.cat === d.cat) || a.id - b.id; }).slice(0, 4);
    $("#related").html(rel.map(function (x) { return card(x, "col-sm-6 col-lg-3"); }).join(""));
  }

  /* ---------- Reservation ---------- */
  if (page === "reservation") {
    var today = new Date(), iso = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
    $("#rDate").attr("min", iso);
    var t = "<option value=''>Select time</option>";
    for (var hr = 12; hr <= 22; hr++) { ["00", "30"].forEach(function (m) { if (!(hr === 22 && m === "30")) { var lab = (hr > 12 ? hr - 12 : hr) + ":" + m + (hr >= 12 ? " PM" : " AM"); t += "<option>" + lab + "</option>"; } }); }
    $("#rTime").html(t);
    var g = "<option value=''>Select guests</option>"; for (var n = 1; n <= 12; n++) { g += "<option value='" + n + "'>" + n + (n === 1 ? " guest" : " guests") + "</option>"; }
    $("#rGuests").html(g);

    $("#resForm").on("submit", function (e) {
      e.preventDefault();
      this.classList.add("was-validated");
      if (!this.checkValidity()) { return; }
      var dt = new Date($("#rDate").val() + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      var rows = [["Reference", "RES-" + (10000 + Math.floor(Math.random() * 89999))], ["Name", $.trim($("#rName").val())], ["Email", $.trim($("#rEmail").val())], ["Phone", $.trim($("#rPhone").val())], ["Guests", $("#rGuests").val()], ["Date", dt], ["Time", $("#rTime").val()], ["Special request", $.trim($("#rNote").val()) || "None"]];
      $("#sumBody").html(rows.map(function (r) { return "<tr><th scope='row' class='w-40'>" + r[0] + "</th><td>" + esc(r[1]) + "</td></tr>"; }).join(""));
      new bootstrap.Modal($("#resModal")[0]).show();
      this.reset(); this.classList.remove("was-validated");
    });
  }

  /* ---------- Signup ---------- */
  if (page === "signup") {
    $("#signForm").on("submit", function (e) {
      e.preventDefault();
      this.classList.add("was-validated");
      if (!this.checkValidity()) { return; }
      $("#signMsg").removeClass("d-none").text("Welcome, " + $.trim($("#sFirst").val()) + ". Your account request was submitted. (Demo only: nothing is stored.)");
      this.reset(); this.classList.remove("was-validated");
    });
  }

  /* ---------- Login: confirmation popup ---------- */
  if (page === "login") {
    $("#loginForm").on("submit", function (e) {
      e.preventDefault();
      this.classList.add("was-validated");
      if (!this.checkValidity()) { return; }
      $("#loginText").text("Welcome back, " + $.trim($("#lUser").val()) + ". Your login was submitted successfully.");
      new bootstrap.Modal($("#loginModal")[0]).show();
      this.reset(); this.classList.remove("was-validated");
    });
  }
});
