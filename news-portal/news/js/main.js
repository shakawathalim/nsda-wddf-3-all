/* The Daily Horizon - main.js (jQuery) */
$(function () {
  "use strict";

  /* ---------- Data ---------- */
  var COLORS = { National: ["#0b3d5c", "#2e86ab"], Politics: ["#4a1c40", "#a23b72"], Sports: ["#0b5d2e", "#3fb950"], Education: ["#7a4a0b", "#e8a33d"], Entertainment: ["#5b1a1a", "#e4572e"] };
  var CATS = ["National", "Politics", "Sports", "Education", "Entertainment"];
  var RAW = {
    National: [["Government announces new flood-protection plan for coastal districts", 0], ["Capital's metro line extension approved after months of review", 2], ["Rural electrification reaches 500 more villages this year", 3], ["Railway adds night services on three major routes", 5], ["National health survey shows fall in child mortality", 6], ["Digital ID rollout begins in four divisions", 8]],
    Politics: [["Parliament debates revised budget proposals", 0], ["Parties agree on a calendar for local elections", 1], ["Opposition calls for a review of the new trade policy", 3], ["Cabinet reshuffle expected next week, sources say", 4], ["Committee presents report on public transport reform", 6], ["Mayors meet to discuss urban housing support", 7]],
    Sports: [["Home side wins the league opener with a late goal", 1], ["National cricket squad announced for the upcoming tour", 2], ["Young sprinter breaks the junior national record", 4], ["Women's football team qualifies for regional finals", 5], ["Badminton federation opens new training academy", 7], ["Chess prodigy earns a national title at fourteen", 9]],
    Education: [["Board announces exam timetable for the coming term", 0], ["Universities launch joint scholarship for rural students", 3], ["New curriculum to include coding from grade six", 4], ["Teachers' training programme expands to all districts", 6], ["Library network gives free digital access to 200 schools", 8], ["Admission test dates published by public universities", 10]],
    Entertainment: [["Independent film wins audience award at the national festival", 1], ["Folk music festival returns with a three-day lineup", 2], ["Popular drama series renewed for a third season", 5], ["Book fair adds a children's storytelling corner", 7], ["Theatre group stages classic play in the open air", 9], ["Young painters showcase works at the city gallery", 11]]
  };
  var AUTHORS = ["Shirin Sultana", "Anwar Hossain", "Mizanur Rahman", "Tania Islam", "Rubel Mia", "Nasrin Akter", "Kamal Uddin"];
  var NEWS = [];
  CATS.forEach(function (c, ci) {
    RAW[c].forEach(function (r, k) { NEWS.push({ cat: c, t: r[0], d: r[1], a: AUTHORS[(ci + k) % AUTHORS.length], id: NEWS.length }); });
  });
  var SORTED = NEWS.slice().sort(function (a, b) { return a.d - b.d || a.id - b.id; });

  /* ---------- Helpers ---------- */
  function art(n) {
    var c = COLORS[n.cat], s = n.id * 37 % 300;
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='" + c[0] + "'/><stop offset='1' stop-color='" + c[1] + "'/></linearGradient></defs><rect width='800' height='500' fill='url(#g)'/><g fill='#fff' opacity='.13'><circle cx='" + (150 + s) + "' cy='140' r='150'/><circle cx='" + (700 - s / 2) + "' cy='400' r='200'/></g><g fill='#fff' opacity='.22'><rect x='60' y='330' width='120' height='170'/><rect x='200' y='270' width='90' height='230'/><rect x='310' y='360' width='140' height='140'/></g><text x='40' y='70' font-family='Georgia,serif' font-size='36' font-weight='700' fill='#fff' opacity='.9'>" + n.cat.toUpperCase() + "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function portrait(i) {
    var c = COLORS[CATS[i % 5]];
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='" + c[1] + "'/><circle cx='100' cy='78' r='38' fill='#fff' opacity='.92'/><path d='M30 200c0-48 32-76 70-76s70 28 70 76z' fill='#fff' opacity='.92'/></svg>");
  }
  function esc(s) { return $("<div>").text(s).html(); }
  function when(d) { return new Date(Date.now() - d * 864e5).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }); }
  function link(n) { return "category.html?cat=" + encodeURIComponent(n.cat); }
  function card(n, cls) {
    return "<div class='" + cls + "'><article class='card news-card h-100'><img class='card-img-top' src='" + art(n) + "' alt='" + esc(n.cat) + " news illustration' loading='lazy'><div class='card-body'><span class='badge cat-badge'>" + n.cat + "</span><h3 class='h6 mt-2'><a href='" + link(n) + "'>" + esc(n.t) + "</a></h3><p class='small text-secondary mb-0'>" + when(n.d) + " &middot; By " + n.a + "</p></div></article></div>";
  }
  function people(list, startIdx) {
    return list.map(function (p, i) {
      return "<div class='col-sm-6 col-lg-3'><div class='card person h-100'><img src='" + portrait(startIdx + i) + "' alt='Photo of " + esc(p[0]) + "'><div class='card-body'><h3 class='h5 mb-0'>" + esc(p[0]) + "</h3><p class='text-secondary mb-0'>" + esc(p[1]) + "</p></div></div></div>";
    }).join("");
  }

  /* ---------- Date and time ---------- */
  function tick() {
    $("#dateTime").text(new Date().toLocaleString("en-GB", { weekday: "long", day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  }
  tick(); setInterval(tick, 1000);
  $("#year").text(new Date().getFullYear());

  /* ---------- Newsletter (footer, every page) ---------- */
  $("#newsForm").on("submit", function (e) {
    e.preventDefault();
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($.trim($("#newsEmail").val()));
    $("#newsMsg").text(ok ? "Thanks, you are subscribed." : "Enter a valid email address.");
    if (ok) { this.reset(); }
  });

  var page = $("body").data("page");

  /* ---------- Home ---------- */
  if (page === "home") {
    $("#tickerList").newsTicker({ speed: 600, pause: 3000 });   // jQuery news ticker plugin

    var lead = SORTED[0], sel = SORTED.slice(1, 5);
    $("#leadNews").html("<a href='" + link(lead) + "' class='text-decoration-none'><div class='lead-box' id='zoomBox'><img id='zoomImg' src='" + art(lead) + "' alt='" + esc(lead.t) + "'><div class='lead-cap'><span class='badge cat-badge mb-2'>" + lead.cat + "</span><h2>" + esc(lead.t) + "</h2><div class='small'>" + when(lead.d) + " &middot; By " + lead.a + "</div></div></div></a>");
    $("#selectedNews").html(sel.map(function (n) {
      return "<div class='side-item'><img src='" + art(n) + "' alt=''><div><span class='small text-danger fw-semibold'>" + n.cat + "</span><h3><a href='" + link(n) + "'>" + esc(n.t) + "</a></h3><div class='small text-secondary'>" + when(n.d) + "</div></div></div>";
    }).join(""));

    /* image zoom (CSS transform + jQuery mouse tracking) on the lead news image */
    var $box = $("#zoomBox"), $img = $("#zoomImg");
    $box.on("mouseenter", function () { $img.css("transform", "scale(1.8)"); })
        .on("mousemove", function (e) {
          var off = $box.offset(), x = (e.pageX - off.left) / $box.width() * 100, y = (e.pageY - off.top) / $box.height() * 100;
          $img.css("transform-origin", x + "% " + y + "%");
        })
        .on("mouseleave", function () { $img.css("transform", "scale(1)"); });

    $("#latestNews").html(SORTED.slice(5, 9).map(function (n) { return card(n, "col-sm-6 col-lg-3"); }).join(""));
    $("#nationalNews").html(NEWS.filter(function (n) { return n.cat === "National"; }).slice(0, 4).map(function (n) { return card(n, "col-sm-6 col-lg-3"); }).join(""));
    $("#educationNews").html(NEWS.filter(function (n) { return n.cat === "Education"; }).slice(0, 4).map(function (n) { return card(n, "col-sm-6 col-lg-3"); }).join(""));
  }

  /* ---------- Category page ---------- */
  if (page === "category") {
    var cat = new URLSearchParams(location.search).get("cat");
    if (CATS.indexOf(cat) < 0) { cat = "National"; }
    var items = NEWS.filter(function (n) { return n.cat === cat; }).sort(function (a, b) { return a.d - b.d; });
    var PER = 4, pages = Math.ceil(items.length / PER), cur = 1;
    $("#catName").text(cat); $("#catTitle").text(cat + " News"); $("#catHead").text(cat + " News");
    document.title = cat + " News | The Daily Horizon";

    var render = function () {
      var part = items.slice((cur - 1) * PER, cur * PER);
      $("#catA").html(part.slice(0, 2).map(function (n) { return card(n, "col-md-6"); }).join(""));
      $("#catB").html(part.slice(2).map(function (n) { return card(n, "col-md-6"); }).join(""));
      $("#catBWrap").toggle(part.length > 2);
      var h = "<li class='page-item" + (cur === 1 ? " disabled" : "") + "'><button class='page-link' data-pg='" + (cur - 1) + "'>Previous</button></li>";
      for (var k = 1; k <= pages; k++) { h += "<li class='page-item" + (k === cur ? " active" : "") + "'><button class='page-link' data-pg='" + k + "'>" + k + "</button></li>"; }
      h += "<li class='page-item" + (cur === pages ? " disabled" : "") + "'><button class='page-link' data-pg='" + (cur + 1) + "'>Next</button></li>";
      $("#pager").html(h);
    };
    $("#pager").on("click", "[data-pg]", function () { cur = +$(this).data("pg"); render(); $("html,body").animate({ scrollTop: $("#catTop").offset().top - 80 }, 300); });
    render();
  }

  /* ---------- About page ---------- */
  if (page === "about") {
    $("#staff").html(people([["Abdul Matin", "Managing Editor"], ["Rokeya Khatun", "Administrative Officer"], ["Salman Farsi", "Advertising Manager"], ["Jahid Hasan", "IT Manager"]], 0));
  }

  /* ---------- Author page ---------- */
  if (page === "author") {
    $("#senior").html(people([["Shirin Sultana", "Senior Reporter, Politics"], ["Anwar Hossain", "Senior Reporter, National"], ["Mizanur Rahman", "Senior Reporter, Sports"]], 1).replace(/col-lg-3/g, "col-lg-4"));
    $("#general").html(people([["Tania Islam", "Education reporter"], ["Rubel Mia", "Crime and courts reporter"], ["Nasrin Akter", "Entertainment reporter"], ["Kamal Uddin", "District correspondent"]], 4));
  }

  /* ---------- Contact page ---------- */
  if (page === "contact") {
    $("#contactForm").on("submit", function (e) {
      e.preventDefault();
      this.classList.add("was-validated");
      if (!this.checkValidity()) { return; }
      $("#sentMsg").removeClass("d-none").text("Thank you, " + $.trim($("#cName").val()) + ". Your message has been sent. We will reply soon.");
      this.reset(); this.classList.remove("was-validated");
    });
  }

  /* ---------- Login page: confirmation popup on submit ---------- */
  if (page === "login") {
    $("#loginForm").on("submit", function (e) {
      e.preventDefault();
      this.classList.add("was-validated");
      if (!this.checkValidity()) { return; }
      $("#loginText").text("Welcome, " + $.trim($("#userName").val()) + ". Your login request was submitted successfully.");
      new bootstrap.Modal($("#loginModal")[0]).show();
      this.reset(); this.classList.remove("was-validated");
    });
  }
});
