// Variables
var lastId,
    docTitle = document.title;
    topMenu = $("#top-menu"),
  // Tous les liens du Menu
    menuItems = topMenu.find("a"),
  // Ancres correspondants aux liens du menu
    scrollItems = menuItems.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

// Gestion des clics sur liens menu
// Pour une animation du scroll
menuItems.click(function(e) {
  var href = $(this).attr("href"),
    offsetTop = href === "#" ? 0 : $(href).offset().top + 10;
  $('html, body').stop().animate({
    scrollTop: offsetTop
  }, 600);
  e.preventDefault();
});

// Lier au scrollage
$(window).scroll(function() {


  if ($(this).scrollTop()>250)
     {
        $('.container-arrow').css( "opacity", "0" );
     }
    else
     {
      $('.container-arrow').css( "opacity", "1" );
     }

  // Obtenir la position scroll
  var fromTop = $(this).scrollTop();

  // Get id of current scroll item
  var cur = scrollItems.map(function() {
    if ($(this).offset().top < fromTop)
      return this;
  });

  // Obtenir l'ID de l'élement Actif 
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;

    // Ajouter / Supprimer la class Active
    menuItems
      .parent().removeClass("active")
      .end().filter("[href='#" + id + "']").parent().addClass("active");

      console.log(id);
      if(history.pushState) {
          history.pushState(null, null, '#' + id);
      }
      else {
          location.hash = '#' + id;
      }
      
  }
});

$('.section-content').scroll(function() {


  if ($(this).scrollTop()>20)
     {
        $('.container-arrow').css( "opacity", "0" );
     }
    else
     {
      $('.container-arrow').css( "opacity", "1" );
     }

});


/* Afficher / Cacher le contenu secondaire
  -----------------------------------*/

/* -----------------------------------
  AJOUTER CHARGEMENT AJAX DU CONTENU
  ----------------------------------- */

var   ylwbtn = $("#ylw-btn"),
      main = $("#main"),
      btntxt = $("#btn-txt"),
      actu_link = $(".actu_link"),
      thankyou = $(".thankyou"),
      tl = new TimelineLite({
          paused: true
      });


  // Etapes Timeline
  tl
    .to(main, 0.6, {
      xPercent: -100,
      autoRound: false,
      ease: Power4.easeIn
    })
    .to(thankyou, 0.5, {
      xPercent: -100,
      opacity: 1,
      ease: Power4.easeOut
    })
  
    .progress(1).progress(0);

  actu_link.on('click', function() {
    tl.play();
    $('.container-arrow').css( "opacity", "1" );
    $('body').addClass('active_second');
    link = actu_link.attr('data-target');
    if(history.pushState) {
          history.pushState(null, null, '#actualites/' + link);
      }
    else {
          location.hash = '#actualites/' + link;
    }
    document.title = docTitle + ' | ' + $('.actu_link').attr('value');
  });

  $('.close').on('click', function() {
    tl.reverse();
    $('.container-arrow').css( "opacity", "0" );
    $('body').removeClass('active_second');
        if(history.pushState) {
          history.pushState(null, null, '#actualites');
      }
    else {
          location.hash = '#actualites';
    }
    document.title = docTitle;
  });


  // MISE EN PLACE DU CAROUSEL ACTU
$('.multiple-items').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  dots: true,
  infinite: true,
  responsive: [
  {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});