/* Liberation War Archive - main.js (jQuery) */
$(function () {
  "use strict";

  /* ---------- Data (sample: edit here) ---------- */
  var DOCS = [
    { t: "Six-Point Programme", type: "Declaration", date: "1966-02-05", rel: 4, src: "Presented by Sheikh Mujibur Rahman at the opposition conference, Lahore", d: "A six-point charter for regional autonomy in Pakistan, covering federal structure, currency, taxation, trade and defence. It became the political base of the Bengali movement." },
    { t: "Speech of 7 March", type: "Speech", date: "1971-03-07", rel: 5, src: "Ramna Race Course, Dhaka", d: "Sheikh Mujibur Rahman's address to a vast public gathering, which called on people to prepare for struggle. It is widely seen as a turning point." },
    { t: "Declaration of Independence", type: "Declaration", date: "1971-03-26", rel: 5, src: "Transmitted by wireless from Dhaka and Chattogram", d: "The announcement of Bangladesh's independence, relayed across the country as the military crackdown began." },
    { t: "Proclamation of Independence", type: "Proclamation", date: "1971-04-10", rel: 5, src: "Issued by the elected representatives, Mujibnagar", d: "The founding document of the provisional government, setting out the legal basis of the new state and its aims of equality, human dignity and social justice." },
    { t: "Oath-taking of the Mujibnagar Government", type: "Official correspondence", date: "1971-04-17", rel: 4, src: "Baidyanathtala, Meherpur (Mujibnagar)", d: "Record of the ceremony at which the provisional government's cabinet took office, in the presence of national and international press." },
    { t: "Instrument of Surrender", type: "Treaty", date: "1971-12-16", rel: 5, src: "Signed at Ramna Race Course, Dhaka", d: "The document by which Pakistani forces in the east surrendered to the joint Bangladesh-India command, ending the war." },
    { t: "Treaty of Friendship, Cooperation and Peace", type: "Treaty", date: "1972-03-19", rel: 3, src: "Signed in Dhaka by Bangladesh and India", d: "A 25-year treaty between the two countries on cooperation, consultation and peace after independence." }
  ];
  var IVS = [
    { n: "Rahela Begum", role: "Nurse and relief volunteer", b: "Born 1948 in Mymensingh. Worked in a field clinic near the border during 1971.", s: "Describes setting up a small clinic in a school building, treating wounded fighters and refugees, and moving supplies at night." },
    { n: "Abdul Karim", role: "Freedom fighter, Sector 2", b: "Born 1950 in Comilla. Joined a local guerrilla unit as a student.", s: "Recalls training in a camp across the border, small unit operations, and how villagers fed and sheltered the fighters." },
    { n: "Shamima Akter", role: "Teacher and eyewitness", b: "Born 1945 in Dhaka. Taught at a girls' school in the capital.", s: "Speaks about the first nights of the crackdown, families leaving the city, and neighbours hiding one another." }
  ];
  var PHS = [
    { t: "Gathering at the rally ground", loc: "Dhaka", c: ["#0b4a3a", "#c8102e"] },
    { t: "Fighters on the march", loc: "Rural Bengal", c: ["#26413a", "#e0a526"] },
    { t: "Refugee camp at the border", loc: "Border region", c: ["#33443f", "#9aa9a1"] },
    { t: "Radio broadcast station", loc: "Mujibnagar", c: ["#12372c", "#c8102e"] },
    { t: "Freedom fighter portrait", loc: "Sector headquarters", c: ["#4a2d2d", "#e8ece6"] },
    { t: "Victory day crowd", loc: "Dhaka", c: ["#0b4a3a", "#f6f8f4"] }
  ];
  var MAX_FILE = 5 * 1024 * 1024;

  /* ---------- Helpers ---------- */
  function esc(s) { return $("<div>").text(s).html(); }
  function fmt(d) { var m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], p = d.split("-"); return +p[2] + " " + m[+p[1] - 1] + " " + p[0]; }
  function stars(n) { return "<span class='stars' aria-label='Relevance " + n + " of 5'>" + "\u2605".repeat(n) + "\u2606".repeat(5 - n) + "</span>"; }
  function svgPhoto(p, i) {
    var s = "<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='1200' viewBox='0 0 1600 1200'><rect width='1600' height='1200' fill='" + p.c[0] + "'/><circle cx='" + (400 + i * 170) + "' cy='420' r='210' fill='" + p.c[1] + "' opacity='.9'/><path d='M0 900 Q400 760 800 880 T1600 820 V1200 H0Z' fill='#000' opacity='.35'/><g fill='#fff' opacity='.85'>" +
      [0, 1, 2, 3, 4, 5, 6].map(function (k) { return "<circle cx='" + (250 + k * 190) + "' cy='" + (930 + (k % 2) * 30) + "' r='38'/><rect x='" + (214 + k * 190) + "' y='" + (968 + (k % 2) * 30) + "' width='72' height='150' rx='20'/>"; }).join("") +
      "</g><text x='60' y='100' font-family='Georgia,serif' font-size='54' fill='#fff' opacity='.9'>" + p.t + "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
  }
  PHS.forEach(function (p, i) { p.src = svgPhoto(p, i); });
  function toneWav(freq) {   // short generated sample sound so the player works without files
    var sr = 8000, n = sr * 4, b = new ArrayBuffer(44 + n * 2), v = new DataView(b), i;
    function w(o, s) { for (var k = 0; k < s.length; k++) { v.setUint8(o + k, s.charCodeAt(k)); } }
    w(0, "RIFF"); v.setUint32(4, 36 + n * 2, true); w(8, "WAVEfmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, "data"); v.setUint32(40, n * 2, true);
    for (i = 0; i < n; i++) { v.setInt16(44 + i * 2, Math.sin(2 * Math.PI * freq * i / sr) * 3000 * Math.min(1, (n - i) / 2000), true); }
    return URL.createObjectURL(new Blob([b], { type: "audio/wav" }));
  }
  function docCard(d, i, cls) {
    return "<div class='" + cls + "'><article class='card lift h-100'><div class='card-body d-flex flex-column'><span class='badge tag align-self-start mb-2'>" + esc(d.type) + "</span><h3 class='h5'>" + esc(d.t) + "</h3><p class='small text-secondary mb-3'>" + fmt(d.date) + " &nbsp; " + stars(d.rel) + "</p><button type='button' class='btn btn-green btn-sm mt-auto align-self-start' data-doc='" + i + "'>View details</button></div></article></div>";
  }
  function ivCard(p, i, cls, media) {
    return "<div class='" + cls + "'><article class='card lift h-100'><div class='card-body'><div class='d-flex gap-3 align-items-center mb-3'><div class='avatar' aria-hidden='true'>" + p.n.charAt(0) + "</div><div><h3 class='h5 mb-0'>" + esc(p.n) + "</h3><div class='small text-secondary'>" + esc(p.role) + "</div></div></div>" +
      "<p class='mb-2'><b>Background.</b> " + esc(p.b) + "</p><p><b>Testimony summary.</b> " + esc(p.s) + "</p>" +
      (media ? "<audio controls preload='none' data-f='" + (220 + i * 60) + "' aria-label='Interview with " + esc(p.n) + "'></audio>" : "<a href='interviews.html' class='btn btn-outline-green btn-sm'>Listen to interview</a>") + "</div></article></div>";
  }
  function phCard(p, i, cls) {
    return "<div class='" + cls + "'><div class='card lift ph h-100'><img class='card-img-top' src='" + p.src + "' alt='" + esc(p.t) + "' loading='lazy' tabindex='0' data-ph='" + i + "'><div class='card-body'><h3 class='h6 mb-1'>" + esc(p.t) + "</h3><div class='small text-secondary'>" + esc(p.loc) + "</div></div></div></div>";
  }

  /* ---------- Modal (Bootstrap) ---------- */
  var modal = new bootstrap.Modal($("#modal")[0]);
  function openModal(title, html) { $("#mTitle").text(title); $("#mBody").html(html); modal.show(); }
  function showDoc(i) {
    var d = DOCS[i];
    openModal(d.t, "<span class='badge tag mb-2'>" + esc(d.type) + "</span><p>" + esc(d.d) + "</p><dl class='row small mb-0'><dt class='col-sm-4'>Publication date</dt><dd class='col-sm-8'>" + fmt(d.date) + "</dd><dt class='col-sm-4'>Source</dt><dd class='col-sm-8'>" + esc(d.src) + "</dd><dt class='col-sm-4'>Category</dt><dd class='col-sm-8'>" + esc(d.type) + "</dd><dt class='col-sm-4'>Relevance</dt><dd class='col-sm-8'>" + stars(d.rel) + "</dd></dl>");
  }
  function showPhoto(i) {
    var p = PHS[i], fn = p.t.replace(/[^a-z0-9]+/gi, "-").toLowerCase() + ".svg";
    openModal(p.t, "<p class='small text-secondary'>" + esc(p.loc) + "</p><div class='zoom-box' id='zBox'><img id='zImg' src='" + p.src + "' alt='" + esc(p.t) + "'></div>" +
      "<div class='d-flex flex-wrap align-items-center gap-3 mt-3'><label for='zr' class='form-label mb-0'>Zoom</label><input type='range' class='form-range' id='zr' min='100' max='400' step='10' value='100' style='width:200px'><span id='zv' class='small'>100%</span><button type='button' class='btn btn-outline-green btn-sm' id='zReset'>Reset</button><a class='btn btn-green btn-sm ms-auto' href='" + p.src + "' download='" + fn + "'><i class='bi bi-download'></i> Download image</a></div>");
    var $img = $("#zImg"), $box = $("#zBox");
    function z(v) { $img.css("transform", "scale(" + v / 100 + ")"); $("#zr").val(v); $("#zv").text(v + "%"); }
    $("#zr").on("input", function () { z(+this.value); });
    $("#zReset").on("click", function () { $img.css("transform-origin", "center"); z(100); });
    $box.on("mousemove", function (e) { var o = $box.offset(); $img.css("transform-origin", ((e.pageX - o.left) / $box.width() * 100) + "% " + ((e.pageY - o.top) / $box.height() * 100) + "%"); })
        .on("click", function () { z(Math.min(400, +$("#zr").val() + 50)); });
  }
  $(document).on("click", "[data-doc]", function () { showDoc(+$(this).data("doc")); });
  $(document).on("click", "[data-ph]", function () { showPhoto(+$(this).data("ph")); });
  $(document).on("keydown", "[data-ph]", function (e) { if (e.key === "Enter") { showPhoto(+$(this).data("ph")); } });

  /* ---------- Every page ---------- */
  function tick() {
    $("#dateTime").text(new Date().toLocaleString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  }
  tick(); setInterval(tick, 1000);
  $("#year").text(new Date().getFullYear());

  var page = $("body").data("page");

  /* ---------- Home ---------- */
  if (page === "home") {
    $("#cDoc").text(DOCS.length); $("#cInt").text(IVS.length); $("#cPho").text(PHS.length);
    $("#fDocs").html([1, 3, 5].map(function (i) { return docCard(DOCS[i], i, "col-md-4"); }).join(""));
    $("#fInts").html([0, 1].map(function (i) { return ivCard(IVS[i], i, "col-md-6", false); }).join(""));
    $("#fPhotos").html([0, 3, 5].map(function (i) { return phCard(PHS[i], i, "col-sm-6 col-lg-4"); }).join(""));
  }

  /* ---------- Documents ---------- */
  if (page === "documents") {
    var types = [];
    DOCS.forEach(function (d) { if (types.indexOf(d.type) < 0) { types.push(d.type); } });
    $("#fType").append(types.map(function (t) { return "<option>" + t + "</option>"; }).join(""));
    var render = function () {
      var ty = $("#fType").val(), rel = +$("#fRel").val(), so = $("#fSort").val(), q = $.trim($("#fSearch").val()).toLowerCase();
      var list = DOCS.map(function (d, i) { return { d: d, i: i }; }).filter(function (o) {
        return (!ty || o.d.type === ty) && (!rel || o.d.rel === rel) && (!q || (o.d.t + " " + o.d.d).toLowerCase().indexOf(q) > -1);
      });
      list.sort(function (a, b) { return so === "rel" ? b.d.rel - a.d.rel || a.d.date.localeCompare(b.d.date) : so === "dateDesc" ? b.d.date.localeCompare(a.d.date) : a.d.date.localeCompare(b.d.date); });
      $("#docCount").text(list.length + (list.length === 1 ? " document" : " documents"));
      $("#docGrid").html(list.length ? list.map(function (o) { return docCard(o.d, o.i, "col-md-6 col-lg-4"); }).join("") : "<div class='col-12'><div class='alert alert-secondary'>No documents match. Clear the search or choose another filter.</div></div>");
    };
    $("#fType, #fRel, #fSort").on("change", render); $("#fSearch").on("input", render);
    render();
  }

  /* ---------- Interviews ---------- */
  if (page === "interviews") {
    $("#ivGrid").html(IVS.map(function (p, i) { return ivCard(p, i, "col-md-6 col-lg-4", true); }).join(""));
    $("#ivGrid audio").each(function () { this.src = toneWav(+$(this).data("f")); });
  }

  /* ---------- Photographs ---------- */
  if (page === "photographs") {
    $("#phGrid").html(PHS.map(function (p, i) { return phCard(p, i, "col-sm-6 col-lg-4"); }).join(""));
  }

  /* ---------- Contact: validation + confirmation popup ---------- */
  if (page === "contact") {
    $("#cFile").on("change", function () {
      var f = this.files[0];
      this.setCustomValidity(f && f.size > MAX_FILE ? "too big" : "");
    });
    $("#contactForm").on("submit", function (e) {
      e.preventDefault();
      this.classList.add("was-validated");
      if (!this.checkValidity()) { return; }
      var f = $("#cFile")[0].files[0];
      $("#okText").html("<p>Thank you, " + esc($.trim($("#cName").val())) + ". Your message has been recorded.</p><dl class='row small mb-0'><dt class='col-4'>Email</dt><dd class='col-8'>" + esc($.trim($("#cEmail").val())) + "</dd><dt class='col-4'>Subject</dt><dd class='col-8'>" + esc($.trim($("#cSubject").val())) + "</dd><dt class='col-4'>File</dt><dd class='col-8'>" + (f ? esc(f.name) : "None") + "</dd></dl>");
      new bootstrap.Modal($("#okModal")[0]).show();
      this.reset(); this.classList.remove("was-validated");
    });
  }
});
