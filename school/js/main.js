/* Bright Future High School - main.js (jQuery) */
$(function () {
  "use strict";

  /* ---------- Data (sample) ---------- */
  var PAL = [["#14377d", "#4f86e8"], ["#0b5d4a", "#3fb68b"], ["#6b2d8a", "#c26be0"], ["#8a4a0b", "#f0a93d"]];
  var TEACHERS = {
    Math: [["Abdul Karim", "Senior Teacher, M.Sc. Mathematics"], ["Farida Yasmin", "Assistant Teacher, B.Sc. Mathematics"], ["Shafiqul Islam", "Assistant Teacher, M.Sc. Statistics"]],
    English: [["Rubina Akter", "Senior Teacher, M.A. English"], ["Tanvir Hossain", "Assistant Teacher, B.A. English"], ["Sharmin Nahar", "Assistant Teacher, M.A. English Literature"]],
    Bangla: [["Habibur Rahman", "Senior Teacher, M.A. Bangla"], ["Nasima Begum", "Assistant Teacher, B.A. Bangla"], ["Anisul Haque", "Assistant Teacher, M.A. Bangla"]]
  };
  // [id, name, department, class, roll, GPA]
  var STUDENTS = [
    ["2501001", "Arif Hasan", "Science", 10, 1, 5.00], ["2501002", "Tasnim Akter", "Science", 10, 2, 5.00], ["2501003", "Rahim Uddin", "Science", 10, 3, 4.83], ["2501004", "Sumaiya Islam", "Science", 10, 4, 4.50],
    ["2502001", "Nabila Rahman", "Humanities", 10, 1, 5.00], ["2502002", "Imran Hossain", "Humanities", 10, 2, 4.67], ["2502003", "Mitu Barua", "Humanities", 10, 3, 4.17], ["2502004", "Sajib Das", "Humanities", 10, 4, 3.83],
    ["2503001", "Farhan Ahmed", "Business Studies", 10, 1, 4.92], ["2503002", "Lamia Sultana", "Business Studies", 10, 2, 4.58], ["2503003", "Rakib Chowdhury", "Business Studies", 10, 3, 4.00], ["2503004", "Jui Paul", "Business Studies", 10, 4, 3.67]
  ].map(function (r) { return { id: r[0], name: r[1], dept: r[2], cls: r[3], roll: r[4], gpa: r[5] }; });
  var DEPTS = ["Science", "Humanities", "Business Studies"];
  var LAST = { Science: [120, 118, 46], Humanities: [95, 90, 18], "Business Studies": [85, 83, 22] };   // appeared, passed, GPA 5
  var NOTICES = [
    ["Admission test for the new session will be held on the first Friday of December.", 1, true],
    ["Annual examination routine for classes six to nine is now available at the office.", 3, true],
    ["School will remain closed on 16 December for Victory Day.", 5, false],
    ["Parents' meeting for class ten will take place next Saturday at 10:00 AM.", 8, false],
    ["Scholarship applications for meritorious students are open until the end of the month.", 11, false],
    ["Annual sports day registration begins this week. Contact your class teacher.", 15, false]
  ];
  var CAL = [["January", "New session begins. Book distribution."], ["February", "International Mother Language Day programme (21 Feb)."], ["March", "Independence Day celebration (26 Mar). Class tests."], ["April", "Half-yearly examination."], ["June", "Summer break."], ["July", "Parent-teacher meeting. Result of half-yearly exam."], ["August", "Annual sports day and cultural week."], ["September", "Pre-test examination for class ten."], ["November", "Annual examination."], ["December", "Victory Day (16 Dec). Result publication. Winter break."]];

  /* ---------- Helpers ---------- */
  function esc(s) { return $("<div>").text(s).html(); }
  function grade(g) { return g >= 5 ? "A+" : g >= 4 ? "A" : g >= 3.5 ? "A-" : g >= 3 ? "B" : g >= 2 ? "C" : "D"; }
  function portrait(i) {
    var c = PAL[i % PAL.length];
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='" + c[1] + "'/><circle cx='100' cy='78' r='38' fill='#fff' opacity='.92'/><path d='M30 200c0-48 32-76 70-76s70 28 70 76z' fill='#fff' opacity='.92'/></svg>");
  }
  function scene(i, w, h) {
    var c = PAL[i % PAL.length];
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 " + w + " " + h + "'><defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='" + c[0] + "'/><stop offset='1' stop-color='" + c[1] + "'/></linearGradient></defs><rect width='" + w + "' height='" + h + "' fill='url(#g)'/><circle cx='" + (w * .82) + "' cy='" + (h * .22) + "' r='" + (h * .1) + "' fill='#ffc533' opacity='.9'/>" +
      "<g fill='#fff' opacity='.92'><rect x='" + (w * .38) + "' y='" + (h * .42) + "' width='" + (w * .3) + "' height='" + (h * .46) + "'/><rect x='" + (w * .3) + "' y='" + (h * .58) + "' width='" + (w * .09) + "' height='" + (h * .3) + "'/><rect x='" + (w * .67) + "' y='" + (h * .58) + "' width='" + (w * .09) + "' height='" + (h * .3) + "'/><path d='M" + (w * .36) + " " + (h * .42) + "L" + (w * .53) + " " + (h * .24) + "L" + (w * .7) + " " + (h * .42) + "Z'/></g>" +
      "<g fill='" + c[0] + "'><rect x='" + (w * .5) + "' y='" + (h * .7) + "' width='" + (w * .06) + "' height='" + (h * .18) + "'/><rect x='" + (w * .42) + "' y='" + (h * .52) + "' width='" + (w * .05) + "' height='" + (h * .08) + "'/><rect x='" + (w * .6) + "' y='" + (h * .52) + "' width='" + (w * .05) + "' height='" + (h * .08) + "'/></g>" +
      "<rect y='" + (h * .88) + "' width='" + w + "' height='" + (h * .12) + "' fill='#000' opacity='.25'/></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function people(list, start, cls) {
    return list.map(function (p, i) {
      return "<div class='" + (cls || "col-sm-6 col-lg-3") + "'><div class='card person lift h-100'><img src='" + portrait(start + i) + "' alt='Photo of " + esc(p[0]) + "'><div class='card-body'><h3 class='h5 mb-1'>" + esc(p[0]) + "</h3><p class='text-secondary small mb-0'>" + esc(p[1]) + "</p></div></div></div>";
    }).join("");
  }

  /* ---------- Every page ---------- */
  function tick() {
    $("#dateTime").text(new Date().toLocaleString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  }
  tick(); setInterval(tick, 1000);
  $("#year").text(new Date().getFullYear());

  var page = $("body").data("page");

  /* ---------- Home ---------- */
  if (page === "home") {
    $("[data-slide]").each(function () { $(this).attr("src", scene(+$(this).data("slide"), 1600, 600)); });
    $("#histImg").attr("src", scene(0, 800, 600));

    /* image zoom: CSS transform + jQuery mouse tracking */
    var $box = $("#histBox"), $img = $("#histImg");
    $box.on("mouseenter", function () { $img.css("transform", "scale(2)"); })
        .on("mousemove", function (e) {
          var o = $box.offset();
          $img.css("transform-origin", ((e.pageX - o.left) / $box.width() * 100) + "% " + ((e.pageY - o.top) / $box.height() * 100) + "%");
        })
        .on("mouseleave", function () { $img.css("transform", "scale(1)"); });

    $("#homeTeachers").html(people([TEACHERS.Math[0], TEACHERS.English[0], TEACHERS.Bangla[0], TEACHERS.Math[1]], 0));
    $("#noticeList").html(NOTICES.map(function (n) {
      var d = new Date(Date.now() - n[1] * 864e5);
      return "<li class='list-group-item d-flex gap-3 align-items-start'><div class='notice-date'><b>" + d.getDate() + "</b>" + d.toLocaleString("en-GB", { month: "short" }) + "</div><div>" + esc(n[0]) + (n[2] ? " <span class='badge text-bg-danger'>New</span>" : "") + "</div></li>";
    }).join(""));
  }

  /* ---------- About ---------- */
  if (page === "about") {
    $("#staff").html(people([["Nurul Amin", "Assistant Head Master"], ["Salma Khatun", "Office Superintendent"], ["Delwar Hossain", "Librarian"], ["Rehana Parvin", "Accountant"]], 1));
  }

  /* ---------- Teacher ---------- */
  if (page === "teacher") {
    $("#mathT").html(people(TEACHERS.Math, 0, "col-md-4"));
    $("#englishT").html(people(TEACHERS.English, 1, "col-md-4"));
    $("#banglaT").html(people(TEACHERS.Bangla, 2, "col-md-4"));
  }

  /* ---------- Student ---------- */
  if (page === "student") {
    var best = STUDENTS.slice().sort(function (a, b) { return b.gpa - a.gpa || a.id.localeCompare(b.id); }).slice(0, 5);
    $("#bestBody").html(best.map(function (s, i) { return "<tr><th scope='row'>" + (i + 1) + "</th><td>" + esc(s.name) + "</td><td>" + s.dept + "</td><td>" + s.gpa.toFixed(2) + "</td><td>" + grade(s.gpa) + "</td></tr>"; }).join(""));
    $("#studentList").html(STUDENTS.slice(0, 8).map(function (s, i) {
      return "<div class='col-sm-6 col-lg-3'><div class='card person lift h-100'><img src='" + portrait(i + 2) + "' alt='Photo of " + esc(s.name) + "'><div class='card-body'><h3 class='h5 mb-1'>" + esc(s.name) + "</h3><p class='text-secondary small mb-0'>Class " + s.cls + ", Roll " + s.roll + "<br>" + s.dept + "</p></div></div></div>";
    }).join(""));
  }

  /* ---------- Result ---------- */
  if (page === "result") {
    $("#deptSel").append(DEPTS.map(function (d) { return "<option>" + d + "</option>"; }).join(""));
    $("#deptForm").on("submit", function (e) {
      e.preventDefault();
      var d = $("#deptSel").val(); if (!d) { $("#deptSel").addClass("is-invalid"); return; }
      $("#deptSel").removeClass("is-invalid");
      var list = STUDENTS.filter(function (s) { return s.dept === d; }).sort(function (a, b) { return b.gpa - a.gpa; });
      $("#deptOut").html("<h3 class='h6 mt-4'>" + d + ": " + list.length + " students</h3><div class='table-responsive'><table class='table table-striped'><thead><tr><th>ID</th><th>Name</th><th>Class</th><th>GPA</th><th>Grade</th></tr></thead><tbody>" +
        list.map(function (s) { return "<tr><td>" + s.id + "</td><td>" + esc(s.name) + "</td><td>" + s.cls + "</td><td>" + s.gpa.toFixed(2) + "</td><td>" + grade(s.gpa) + "</td></tr>"; }).join("") + "</tbody></table></div>");
    });
    $("#idForm").on("submit", function (e) {
      e.preventDefault();
      this.classList.add("was-validated");
      if (!this.checkValidity()) { return; }
      var id = $.trim($("#sid").val()), s = STUDENTS.filter(function (x) { return x.id === id; })[0];
      $("#idOut").html(s ? "<div class='card mt-4'><div class='card-body'><h3 class='h5'>" + esc(s.name) + "</h3><dl class='row mb-0'><dt class='col-5 col-md-3'>Student ID</dt><dd class='col-7 col-md-9'>" + s.id + "</dd><dt class='col-5 col-md-3'>Department</dt><dd class='col-7 col-md-9'>" + s.dept + "</dd><dt class='col-5 col-md-3'>Class and roll</dt><dd class='col-7 col-md-9'>" + s.cls + ", " + s.roll + "</dd><dt class='col-5 col-md-3'>GPA</dt><dd class='col-7 col-md-9'>" + s.gpa.toFixed(2) + " (" + grade(s.gpa) + ")</dd><dt class='col-5 col-md-3'>Status</dt><dd class='col-7 col-md-9 text-success fw-semibold'>Passed</dd></dl></div></div>" : "<div class='alert alert-warning mt-4'>No result found for ID " + esc(id) + ". Check the number and try again.</div>");
    });
    var yr = new Date().getFullYear() - 1;
    $("#lastYear").text(yr);
    $("#lastBody").html(DEPTS.map(function (d) {
      var r = LAST[d], rate = Math.round(r[1] / r[0] * 100);
      return "<tr><th scope='row'>" + d + "</th><td>" + r[0] + "</td><td>" + r[1] + "</td><td>" + r[2] + "</td><td style='min-width:150px'><div class='d-flex align-items-center gap-2'><div class='bar-bg flex-fill' role='img' aria-label='Pass rate " + rate + " percent'><div class='bar-fill' style='width:" + rate + "%'></div></div>" + rate + "%</div></td></tr>";
    }).join(""));
  }

  /* ---------- Academic ---------- */
  if (page === "academic") {
    var INFO = { "Science": ["bi-flask", "Physics, Chemistry, Biology, Higher Mathematics, ICT", "Laboratory-based learning with a fully equipped science lab."], "Humanities": ["bi-book", "History, Geography, Civics, Economics, Bangla literature", "Focus on reading, writing and public speaking."], "Business Studies": ["bi-graph-up", "Accounting, Finance, Business Entrepreneurship, Statistics", "Practical learning with case studies and mock markets."] };
    $("#deptCards").html(DEPTS.map(function (d, i) {
      return "<div class='col-md-4'><div class='card lift h-100'><div class='card-body'><div class='icon-box'><i class='bi " + INFO[d][0] + "'></i></div><h3 class='h5'>" + d + " Department</h3><p class='small text-secondary'>" + INFO[d][2] + "</p><p class='small mb-1'><b>Subjects:</b> " + INFO[d][1] + "</p><p class='small mb-0'><b>Classes:</b> IX to X &nbsp; <b>Students:</b> " + LAST[d][0] + "</p></div></div></div>";
    }).join(""));
    $("#calBody").html(CAL.map(function (c) { return "<tr><th scope='row'>" + c[0] + "</th><td>" + esc(c[1]) + "</td></tr>"; }).join(""));
  }

  /* ---------- Login: confirmation popup ---------- */
  if (page === "login") {
    $("#loginForm").on("submit", function (e) {
      e.preventDefault();
      this.classList.add("was-validated");
      if (!this.checkValidity()) { return; }
      $("#loginText").text("Welcome, " + $.trim($("#userName").val()) + ". Your login was submitted successfully.");
      new bootstrap.Modal($("#loginModal")[0]).show();
      this.reset(); this.classList.remove("was-validated");
    });
  }
});
