/* NexaCode Solutions - main.js (shared by every page) */
(function () {
  "use strict";

  var Q = function (s, r) { return (r || document).querySelector(s); };
  var QA = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

  var CO = {
    name: "NexaCode Solutions",
    email: "info@nexacode.example",
    phone: "+880 1700-000000",
    address: "Agrabad Commercial Area, Chattogram, Bangladesh"
  };

  /* ---------- DATA ---------- */
  var PAL = [["#0d2b45", "#1d6fa5"], ["#4a1d6b", "#c2417b"], ["#0b5d4a", "#3fb68b"], ["#7a2e0e", "#f4a100"], ["#1b2a6b", "#4f7cff"], ["#2f3b46", "#7a8793"]];

  var SERVICES = [
    { icon: "bi-globe", title: "Web Development", short: "Fast, secure and responsive websites and web apps.",
      full: "We design and build business websites, e-commerce stores and custom web applications. Every project starts with requirements and wireframes, then moves through agile sprints with regular demos so you see progress early.",
      features: ["Responsive front-end with Bootstrap, React or Vue", "Laravel and Node.js back-ends", "SEO-friendly, accessible markup", "Maintenance and support plans"] },
    { icon: "bi-phone", title: "Mobile App Development", short: "Android and iOS apps from one codebase.",
      full: "Our team ships cross-platform mobile apps with Flutter and React Native. We handle design, development, store submission and updates, with a focus on speed and a smooth experience on low-end devices.",
      features: ["Flutter and React Native", "Push notifications and offline mode", "Payment and map integration", "Play Store and App Store release"] },
    { icon: "bi-palette", title: "UI/UX Design", short: "Interfaces people understand at first glance.",
      full: "We research your users, sketch flows, and produce clickable prototypes before any code is written. Design systems keep your product consistent as it grows.",
      features: ["User research and personas", "Wireframes and prototypes in Figma", "Design systems", "Usability testing"] },
    { icon: "bi-code-slash", title: "Custom Software", short: "ERP, CRM and tools built around your workflow.",
      full: "When off-the-shelf software does not fit, we build systems for inventory, HR, billing, hospitals, schools and more. We integrate with the tools you already use.",
      features: ["ERP, CRM and HRM systems", "Reports and dashboards", "Role-based access control", "Data migration"] },
    { icon: "bi-cloud", title: "Cloud and DevOps", short: "Reliable hosting, deployment and monitoring.",
      full: "We set up automated deployments, backups and monitoring so releases are routine rather than stressful. We work with major cloud providers and with self-hosted servers.",
      features: ["CI/CD pipelines", "Docker and server setup", "Backups and monitoring", "Security hardening"] },
    { icon: "bi-headset", title: "IT Consulting and Support", short: "Clear advice and quick help when you need it.",
      full: "From choosing a technology stack to reviewing existing code, our consultants help you make decisions with fewer surprises. Support packages include response-time guarantees.",
      features: ["Architecture and code review", "Technology selection", "Project rescue", "Monthly support packages"] }
  ];

  var PROJECTS = [
    { t: "Shop Smart E-commerce Platform", cat: "Web Apps", client: "Shop Smart Ltd", tech: ["Laravel", "MySQL", "React"], d: "A multi-vendor online store with order tracking and mobile payments." },
    { t: "City Hospital Management System", cat: "Web Apps", client: "City Care Hospital", tech: ["PHP", "MySQL", "Bootstrap"], d: "Appointments, patient records, billing and pharmacy in one system." },
    { t: "FleetTrack Mobile App", cat: "Mobile Apps", client: "FleetTrack Logistics", tech: ["Flutter", "Node.js", "Firebase"], d: "Live vehicle tracking and delivery status for drivers and dispatchers." },
    { t: "PayEasy Wallet App", cat: "Mobile Apps", client: "PayEasy Fintech", tech: ["React Native", "Node.js", "MongoDB"], d: "A digital wallet for bill payment and peer-to-peer transfers." },
    { t: "EduLearn LMS Portal", cat: "Web Apps", client: "EduLearn Academy", tech: ["Laravel", "Vue.js", "MySQL"], d: "Online courses, quizzes and certificates for 20,000 learners." },
    { t: "FoodHub App Redesign", cat: "UI/UX", client: "FoodHub", tech: ["Figma", "Prototyping"], d: "A simplified ordering flow that cut checkout steps from seven to three." },
    { t: "BankNova Dashboard UI", cat: "UI/UX", client: "BankNova", tech: ["Figma", "Design Systems"], d: "A clear analytics dashboard and component library for a retail bank." },
    { t: "AgroConnect Marketplace", cat: "Web Apps", client: "AgroConnect BD", tech: ["Node.js", "React", "MongoDB"], d: "A marketplace connecting farmers directly with buyers." },
    { t: "HealthTrack Fitness App", cat: "Mobile Apps", client: "HealthTrack", tech: ["Flutter", "Firebase"], d: "Workout plans, step counting and progress charts." },
    { t: "TravelMate Booking UI", cat: "UI/UX", client: "TravelMate", tech: ["Figma", "User Research"], d: "A booking interface tested with 40 travellers across three countries." },
    { t: "HR Pulse Payroll System", cat: "Web Apps", client: "Pulse Group", tech: ["Laravel", "MySQL"], d: "Attendance, leave and payroll for 800 employees." },
    { t: "SmartHome Control App", cat: "Mobile Apps", client: "HomeLink", tech: ["React Native", "MQTT"], d: "Control lights, fans and sensors from one app." }
  ];
  var CATS = ["Web Apps", "Mobile Apps", "UI/UX"];
  var PER_PAGE = 6;

  var TEAM = [
    { n: "Tanvir Ahmed", r: "Founder and CEO" },
    { n: "Nusrat Jahan", r: "Lead Developer" },
    { n: "Sabbir Hossain", r: "UI/UX Designer" },
    { n: "Farzana Akter", r: "Project Manager" }
  ];

  var JOBS = [
    { t: "Junior Laravel Developer", m: "Full-time, Chattogram", d: "1 year of PHP and MySQL experience." },
    { t: "Flutter Developer", m: "Full-time, Remote", d: "Published at least one app on the Play Store." },
    { t: "UI/UX Design Intern", m: "Internship, Chattogram", d: "Figma portfolio with two or more projects." }
  ];

  /* ---------- generated images (no external files needed) ---------- */
  function art(title, i, mode) {
    var c = PAL[i % PAL.length], s;
    if (mode === "bg") {
      s = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='" + c[0] + "'/><stop offset='1' stop-color='" + c[1] + "'/></linearGradient></defs><rect width='1600' height='600' fill='url(#g)'/><g fill='#fff' opacity='.1'><circle cx='1250' cy='200' r='300'/><circle cx='1450' cy='520' r='160'/><circle cx='900' cy='620' r='200'/></g><g stroke='#fff' opacity='.18' fill='none' stroke-width='3'><path d='M900 150h300M900 200h220M900 250h360M900 300h180'/></g></svg>";
    } else {
      s = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='" + c[0] + "'/><stop offset='1' stop-color='" + c[1] + "'/></linearGradient></defs><rect width='800' height='500' fill='url(#g)'/><g fill='#fff' opacity='.12'><circle cx='650' cy='120' r='170'/><circle cx='140' cy='440' r='120'/></g><rect x='110' y='110' width='580' height='280' rx='14' fill='#fff'/><rect x='110' y='110' width='580' height='36' rx='14' fill='#e9eef3'/><circle cx='134' cy='128' r='6' fill='#ff5f57'/><circle cx='154' cy='128' r='6' fill='#febc2e'/><circle cx='174' cy='128' r='6' fill='#28c840'/><rect x='140' y='176' width='160' height='190' rx='8' fill='" + c[1] + "' opacity='.25'/><rect x='320' y='176' width='340' height='28' rx='6' fill='" + c[0] + "' opacity='.8'/><rect x='320' y='222' width='260' height='14' rx='6' fill='#9aa9b8'/><rect x='320' y='248' width='300' height='14' rx='6' fill='#9aa9b8'/><rect x='320' y='300' width='110' height='40' rx='8' fill='#f4a100'/><text x='400' y='440' text-anchor='middle' font-family='Arial,sans-serif' font-size='26' font-weight='700' fill='#fff'>" + title.replace(/&/g, "&amp;") + "</text></svg>";
    }
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
  }
  function portrait(i) {
    var c = PAL[i % PAL.length];
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='" + c[1] + "'/><circle cx='100' cy='78' r='38' fill='#fff' opacity='.92'/><path d='M30 200c0-48 32-76 70-76s70 28 70 76z' fill='#fff' opacity='.92'/></svg>");
  }

  /* ---------- shared layout: header, breadcrumb, footer ---------- */
  function buildLayout() {
    var b = document.body, page = b.dataset.page, title = b.dataset.title || "";
    var nav = [["home", "index.html", "Home"], ["services", "services.html", "Services"], ["projects", "projects.html", "Projects"], ["about", "about.html", "About Us"], ["contact", "contact.html", "Contact"]];
    var active = page === "detail" ? "projects" : page;

    var h = "<div class='topbar small'><div class='container d-flex flex-wrap justify-content-between align-items-center gap-2 py-1'>" +
      "<div class='d-flex flex-wrap gap-3'><a href='mailto:" + CO.email + "'><i class='bi bi-envelope'></i> " + CO.email + "</a><a href='tel:" + CO.phone.replace(/[^+\d]/g, "") + "'><i class='bi bi-telephone'></i> " + CO.phone + "</a></div>" +
      "<div class='d-flex flex-wrap align-items-center gap-3'><span><i class='bi bi-clock'></i> <span id='dateTime'></span></span>" +
      "<a href='#' aria-label='Facebook'><i class='bi bi-facebook'></i></a><a href='#' aria-label='X'><i class='bi bi-twitter-x'></i></a><a href='#' aria-label='YouTube'><i class='bi bi-youtube'></i></a>" +
      "<a href='#' data-bs-toggle='modal' data-bs-target='#authModal'><i class='bi bi-person'></i> Login/Register</a></div></div></div>" +
      "<nav class='navbar navbar-expand-lg main-nav sticky-top' aria-label='Main'><div class='container'>" +
      "<a class='navbar-brand' href='index.html'><span class='logo-mark'>N</span> NexaCode</a>" +
      "<button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#mainNav' aria-controls='mainNav' aria-expanded='false' aria-label='Toggle navigation'><span class='navbar-toggler-icon'></span></button>" +
      "<div class='collapse navbar-collapse' id='mainNav'><ul class='navbar-nav nav-fill w-100'>" +
      nav.map(function (n) { return "<li class='nav-item'><a class='nav-link" + (n[0] === active ? " active" : "") + "' href='" + n[1] + "'" + (n[0] === active ? " aria-current='page'" : "") + ">" + n[2] + "</a></li>"; }).join("") +
      "<li class='nav-item'><a class='nav-link' href='#' data-bs-toggle='modal' data-bs-target='#authModal'>Login / Register</a></li></ul></div></div></nav>";

    if (page !== "home") {
      h += "<section class='crumb'><div class='container'><h1>" + esc(title) + "</h1><nav aria-label='breadcrumb'><ol class='breadcrumb'><li class='breadcrumb-item'><a href='index.html'>Home</a></li>" +
        (page === "detail" ? "<li class='breadcrumb-item'><a href='projects.html'>Projects</a></li>" : "") +
        "<li class='breadcrumb-item active' aria-current='page' id='crumbLast'>" + esc(title) + "</li></ol></nav></div></section>";
    }
    Q("#site-header").innerHTML = h;

    var f = "<footer class='big-footer'><div class='container'><div class='row g-4'>" +
      "<div class='col-lg-4'><h5>" + CO.name + "</h5><p>We design and build websites, mobile apps and custom software for growing businesses.</p><p class='mb-1'><i class='bi bi-geo-alt'></i> " + CO.address + "</p><p class='mb-1'><i class='bi bi-telephone'></i> " + CO.phone + "</p><p><i class='bi bi-envelope'></i> " + CO.email + "</p></div>" +
      "<div class='col-6 col-lg-2'><h5>Quick Links</h5><ul>" + nav.map(function (n) { return "<li><a href='" + n[1] + "'>" + n[2] + "</a></li>"; }).join("") + "</ul></div>" +
      "<div class='col-6 col-lg-2'><h5>Services</h5><ul><li><a href='services.html'>Web Development</a></li><li><a href='services.html'>Mobile Apps</a></li><li><a href='services.html'>UI/UX Design</a></li><li><a href='services.html'>Cloud and DevOps</a></li></ul></div>" +
      "<div class='col-lg-4'><h5>Newsletter</h5><p>Get product news and tech tips once a month.</p>" +
      "<form id='newsForm' class='input-group mb-2' novalidate><input type='email' class='form-control' id='newsEmail' placeholder='Your email' aria-label='Email for newsletter' required><button class='btn btn-accent' type='submit'>Subscribe</button></form><div id='newsMsg' class='small mb-3' role='status'></div>" +
      "<h5>Follow us</h5><div class='social'><a href='#' aria-label='Facebook'><i class='bi bi-facebook'></i></a><a href='#' aria-label='X'><i class='bi bi-twitter-x'></i></a><a href='#' aria-label='YouTube'><i class='bi bi-youtube'></i></a><a href='#' aria-label='LinkedIn'><i class='bi bi-linkedin'></i></a></div></div>" +
      "</div></div></footer><div class='footer-bar'>&copy; <span id='year'></span> " + CO.name + ". All rights reserved.</div>" +
      "<div class='modal fade' id='authModal' tabindex='-1' aria-labelledby='authTitle' aria-hidden='true'><div class='modal-dialog modal-dialog-centered'><div class='modal-content'>" +
      "<div class='modal-header'><h2 class='modal-title h5' id='authTitle'>Welcome</h2><button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button></div><div class='modal-body'>" +
      "<ul class='nav nav-pills mb-3'><li class='nav-item'><button class='nav-link active' data-bs-toggle='pill' data-bs-target='#tabLogin' type='button'>Login</button></li><li class='nav-item'><button class='nav-link' data-bs-toggle='pill' data-bs-target='#tabReg' type='button'>Register</button></li></ul>" +
      "<div class='tab-content'><div class='tab-pane fade show active' id='tabLogin'><form class='authForm'><div class='mb-3'><label class='form-label' for='lEmail'>Email</label><input class='form-control' id='lEmail' type='email' required></div><div class='mb-3'><label class='form-label' for='lPass'>Password</label><input class='form-control' id='lPass' type='password' required></div><button class='btn btn-navy w-100' type='submit'>Login</button></form></div>" +
      "<div class='tab-pane fade' id='tabReg'><form class='authForm'><div class='mb-3'><label class='form-label' for='rName'>Full name</label><input class='form-control' id='rName' required></div><div class='mb-3'><label class='form-label' for='rEmail'>Email</label><input class='form-control' id='rEmail' type='email' required></div><div class='mb-3'><label class='form-label' for='rPass'>Password</label><input class='form-control' id='rPass' type='password' minlength='6' required></div><button class='btn btn-navy w-100' type='submit'>Create account</button></form></div></div>" +
      "<div id='authMsg' class='small mt-3 text-success' role='status'></div></div></div></div></div>";
    Q("#site-footer").innerHTML = f;
  }

  /* ---------- date and time ---------- */
  function tick() {
    var el = Q("#dateTime");
    if (el) el.textContent = new Date().toLocaleString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  /* ---------- reusable renderers ---------- */
  function projectCard(p, i, cls) {
    return "<div class='" + (cls || "col-md-6 col-xl-4") + "'><div class='card lift h-100'><img class='card-img-top' src='" + art(p.t, i, "") + "' alt='" + esc(p.t) + " preview' loading='lazy'>" +
      "<div class='card-body d-flex flex-column'><span class='badge text-bg-warning align-self-start mb-2'>" + esc(p.cat) + "</span><h3 class='h5'>" + esc(p.t) + "</h3><p class='text-secondary small'>" + esc(p.d) + "</p>" +
      "<a class='btn btn-navy btn-sm mt-auto align-self-start' href='project-detail.html?id=" + i + "'>View details</a></div></div></div>";
  }

  /* ---------- home ---------- */
  function initHome() {
    QA("[data-slide]").forEach(function (im) { im.src = art("", +im.dataset.slide, "bg"); });
    var box = Q("#featuredProjects");
    if (box) box.innerHTML = [0, 2, 4].map(function (i) { return projectCard(PROJECTS[i], i, "col-md-4"); }).join("");
  }

  /* ---------- services ---------- */
  function initServices() {
    var acc = Q("#svcAcc"), det = Q("#svcDetail");
    function show(i) {
      var s = SERVICES[i];
      det.innerHTML = "<div class='icon-box'><i class='bi " + s.icon + "'></i></div><h2 class='h4'>" + esc(s.title) + "</h2><p>" + esc(s.full) + "</p><h3 class='h6'>What is included</h3><ul>" + s.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul><a class='btn btn-accent' href='contact.html'>Request a quote</a>";
    }
    acc.innerHTML = SERVICES.map(function (s, i) {
      return "<div class='accordion-item'><h3 class='accordion-header'><button class='accordion-button" + (i ? " collapsed" : "") + "' type='button' data-bs-toggle='collapse' data-bs-target='#s" + i + "' aria-expanded='" + (i ? "false" : "true") + "' aria-controls='s" + i + "'><i class='bi " + s.icon + " me-2'></i> " + esc(s.title) + "</button></h3>" +
        "<div id='s" + i + "' class='accordion-collapse collapse" + (i ? "" : " show") + "' data-bs-parent='#svcAcc' data-i='" + i + "'><div class='accordion-body'>" + esc(s.short) + "</div></div></div>";
    }).join("");
    QA(".accordion-collapse", acc).forEach(function (c) { c.addEventListener("show.bs.collapse", function () { show(+c.dataset.i); }); });
    show(0);
  }

  /* ---------- projects list ---------- */
  function initProjects() {
    var cat = "", page = 1, filt = Q("#catFilter"), grid = Q("#projGrid"), pag = Q("#projPager");
    function render() {
      var list = PROJECTS.map(function (p, i) { return { p: p, i: i }; }).filter(function (o) { return !cat || o.p.cat === cat; });
      var pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
      if (page > pages) page = pages;
      grid.innerHTML = list.slice((page - 1) * PER_PAGE, page * PER_PAGE).map(function (o) { return projectCard(o.p, o.i); }).join("");
      var h = "<li class='page-item" + (page === 1 ? " disabled" : "") + "'><button class='page-link' data-pg='" + (page - 1) + "'>Previous</button></li>";
      for (var k = 1; k <= pages; k++) h += "<li class='page-item" + (k === page ? " active" : "") + "'><button class='page-link' data-pg='" + k + "'>" + k + "</button></li>";
      h += "<li class='page-item" + (page === pages ? " disabled" : "") + "'><button class='page-link' data-pg='" + (page + 1) + "'>Next</button></li>";
      pag.innerHTML = h;
      QA("button", filt).forEach(function (b) { b.classList.toggle("active", b.dataset.cat === cat); });
    }
    filt.innerHTML = ["", ].concat(CATS).map(function (c) {
      var n = c ? PROJECTS.filter(function (p) { return p.cat === c; }).length : PROJECTS.length;
      return "<button type='button' class='list-group-item list-group-item-action d-flex justify-content-between' data-cat='" + c + "'>" + (c || "All projects") + "<span class='badge text-bg-secondary'>" + n + "</span></button>";
    }).join("");
    filt.addEventListener("click", function (e) { var b = e.target.closest("[data-cat]"); if (b) { cat = b.dataset.cat; page = 1; render(); } });
    pag.addEventListener("click", function (e) { var b = e.target.closest("[data-pg]"); if (b) { page = +b.dataset.pg; render(); Q("#projects-top").scrollIntoView({ behavior: "smooth" }); } });
    render();
  }

  /* ---------- project detail ---------- */
  function initDetail() {
    var id = parseInt(new URLSearchParams(location.search).get("id"), 10);
    if (isNaN(id) || !PROJECTS[id]) id = 0;
    var p = PROJECTS[id];
    document.title = p.t + " | " + CO.name;
    Q("#crumbLast").textContent = p.t;
    var views = ["Home screen", "Dashboard", "Mobile view"];
    var main = Q("#zoomImg"), box = Q("#zoomBox");
    main.src = art(p.t, id, ""); main.alt = p.t;
    Q("#thumbs").innerHTML = views.map(function (v, k) { return "<div class='col-4'><button type='button' class='thumb w-100" + (k ? "" : " on") + "' data-k='" + k + "' aria-label='Show " + v + "'><img src='" + art(v + " - " + p.t, id + k, "") + "' alt=''></button></div>"; }).join("");
    Q("#thumbs").addEventListener("click", function (e) {
      var b = e.target.closest("[data-k]"); if (!b) return;
      var k = +b.dataset.k;
      main.src = art(k ? views[k] + " - " + p.t : p.t, id + k, "");
      QA(".thumb").forEach(function (t) { t.classList.toggle("on", t === b); });
    });
    var zoomed = false;
    function zoom(on) { zoomed = on; main.style.transform = on ? "scale(2.2)" : "scale(1)"; box.style.cursor = on ? "zoom-out" : "zoom-in"; }
    box.addEventListener("mouseenter", function () { zoom(true); });
    box.addEventListener("mouseleave", function () { zoom(false); });
    box.addEventListener("mousemove", function (e) { var r = box.getBoundingClientRect(); main.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + "% " + ((e.clientY - r.top) / r.height * 100) + "%"; });
    box.addEventListener("click", function () { zoom(!zoomed); });

    Q("#pTitle").textContent = p.t;
    Q("#pCat").textContent = p.cat;
    Q("#pDesc").textContent = p.d + " The project was delivered in agile sprints with weekly demos, followed by a support period after launch.";
    Q("#pClient").textContent = p.client;
    Q("#pTech").innerHTML = p.tech.map(function (t) { return "<span class='badge text-bg-secondary me-1'>" + esc(t) + "</span>"; }).join("");
    var rel = PROJECTS.map(function (q, i) { return { q: q, i: i }; }).filter(function (o) { return o.i !== id; });
    rel.sort(function (a, b) { return (b.q.cat === p.cat) - (a.q.cat === p.cat); });
    Q("#related").innerHTML = rel.slice(0, 3).map(function (o) { return projectCard(o.q, o.i, "col-md-4"); }).join("");
  }

  /* ---------- about ---------- */
  function initAbout() {
    Q("#team").innerHTML = TEAM.map(function (m, i) {
      return "<div class='col-sm-6 col-lg-3'><div class='card lift h-100 text-center p-3'><img class='team-img' src='" + portrait(i) + "' alt='Photo of " + esc(m.n) + "'><h3 class='h5 mb-0'>" + esc(m.n) + "</h3><p class='text-secondary'>" + esc(m.r) + "</p><div class='social'><a href='#' aria-label='LinkedIn'><i class='bi bi-linkedin'></i></a><a href='#' aria-label='X'><i class='bi bi-twitter-x'></i></a><a href='#' aria-label='Facebook'><i class='bi bi-facebook'></i></a></div></div></div>";
    }).join("");
    Q("#jobs").innerHTML = JOBS.map(function (j) {
      return "<div class='list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2 py-3'><div><h3 class='h6 mb-1'>" + esc(j.t) + "</h3><div class='small text-secondary'>" + esc(j.m) + ". " + esc(j.d) + "</div></div><a class='btn btn-accent btn-sm' href='mailto:careers@nexacode.example?subject=" + encodeURIComponent("Application: " + j.t) + "'>Apply now</a></div>";
    }).join("");
  }

  /* ---------- contact form + confirmation popup ---------- */
  function initContact() {
    var form = Q("#contactForm");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.classList.add("was-validated");
      if (!form.checkValidity()) return;
      Q("#okText").textContent = "Thank you, " + Q("#cName").value.trim() + ". Your message has been sent. We will reply to " + Q("#cEmail").value.trim() + " within one working day.";
      new bootstrap.Modal(Q("#okModal")).show();
      form.reset(); form.classList.remove("was-validated");
    });
  }

  /* ---------- start ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    buildLayout();
    tick(); setInterval(tick, 1000);
    var y = Q("#year"); if (y) y.textContent = new Date().getFullYear();

    var nf = Q("#newsForm");
    nf.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Q("#newsEmail").value.trim());
      Q("#newsMsg").textContent = ok ? "Thanks, you are subscribed." : "Enter a valid email address.";
      if (ok) nf.reset();
    });
    QA(".authForm").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!f.checkValidity()) { f.reportValidity(); return; }
        Q("#authMsg").textContent = "Demo only: no account system is connected to this site.";
        f.reset();
      });
    });

    var page = document.body.dataset.page;
    if (page === "home") initHome();
    if (page === "services") initServices();
    if (page === "projects") initProjects();
    if (page === "detail") initDetail();
    if (page === "about") initAbout();
    if (page === "contact") initContact();
  });
})();
