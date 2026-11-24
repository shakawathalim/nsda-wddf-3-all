/*
 * jQuery News Ticker plugin (small, dependency-free apart from jQuery)
 * Usage: $("#ticker").newsTicker({ speed: 600, pause: 3000 });
 * Markup: <div class="ticker-viewport"><ul id="ticker"><li>..</li><li>..</li></ul></div>
 * The viewport must have a fixed height; each <li> takes the same height.
 */
(function ($) {
  "use strict";
  $.fn.newsTicker = function (options) {
    var o = $.extend({ speed: 600, pause: 3000 }, options);
    return this.each(function () {
      var $list = $(this), $view = $list.parent(), $items = $list.children("li");
      if ($items.length < 2) { return; }
      var h = $view.height(), total, i = 0, timer = null;
      $list.append($items.first().clone());      // clone first item so the loop restarts seamlessly
      total = $list.children("li").length;

      function next() {
        i += 1;
        $list.animate({ marginTop: -h * i }, o.speed, function () {
          if (i === total - 1) { i = 0; $list.css("marginTop", 0); }
        });
      }
      function start() { if (!timer) { timer = setInterval(next, o.pause); } }
      function stop() { clearInterval(timer); timer = null; }

      $view.on("mouseenter focusin", stop).on("mouseleave focusout", start);
      start();
    });
  };
})(jQuery);
