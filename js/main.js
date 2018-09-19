// Cache selectors
var lastId,
  topMenu = $("#top-menu"),
  topMenuHeight = topMenu.outerHeight() + 15,
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e) {
  var href = $(this).attr("href"),
    offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
  $('html, body').stop().animate({
    scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function() {
  // Get container scroll position
  var fromTop = $(this).scrollTop() + topMenuHeight;

  // Get id of current scroll item
  var cur = scrollItems.map(function() {
    if ($(this).offset().top < fromTop)
      return this;
  });



  // Get the id of the current element
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    // Set/remove active class
    menuItems
      .parent().removeClass("active")
      .end().filter("[href='#" + id + "']").parent().addClass("active");
      console.log(id);
      // Change Hash URL 
      window.location.hash = id;
  }
});


var   ylwbtn = $("#ylw-btn"),
      main = $("#main"),
      btntxt = $("#btn-txt"),
      btnbox = $("#btn-box"),
      thankyou = $(".thankyou"),
      tl = new TimelineLite({
          paused: true
      });


  // Controlling Timeline Playback
  tl
    .to(btntxt, 0.1, {
      autoAlpha: 0,
      ease: Power1.easeOut
    })
    .to(main, 0.4, {
      xPercent: -100,
      autoRound: false,
      ease: Power4.easeOut
    })
    .to(thankyou, 0.3, {
      xPercent: -100,
      opacity: 1,
      ease: Power4.easeOut
    })
  
    .progress(1).progress(0);

  $('#ylw-btn').on('click', function() {
    tl.play();
    $('body').addClass('active_second');
  });

  $('.close').on('click', function() {
    tl.reverse();
    $('body').removeClass('active_second');
  });