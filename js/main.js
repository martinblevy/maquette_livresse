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
    body = $("body"),
    main = $("#main"),
    menu = $("#menu"),
    btntxt = $("#btn-txt"),
    actu_link = $(".actu_link"),
    menu_opener = $("#menu_opener"),
    thankyou = $(".thankyou")
    hashtag = window.location.hash.replace('#','');


    var homeState = function () {
      // thankyou.empty();
      console.log( "Etat : One page" );
      setTimeout(function () {$("#loading-logo").css('opacity' , 0);}, 0); 
      setTimeout(function () {main.removeClass('main_onload');}, 200); 
      setTimeout(function () {menu.removeClass('menu_onload');}, 100); 
      setTimeout(function () {$(".container-arrow").css('opacity' , 1);}, 200);
      setTimeout(function () {$("#credits").css('opacity' , 1);}, 250);
      main.removeClass('second_open');
      thankyou.removeClass('second_open');
      $('.container-arrow').css( "opacity", "0" );
      body.removeClass('active_second');
      document.title = docTitle;
    };

    var actuState = function () {
      console.log( "Etat : Actu solo" );
      setTimeout(function () {$("#loading-logo").css('opacity' , 0);}, 0); 
      setTimeout(function () {main.removeClass('main_onload');}, 200); 
      setTimeout(function () {menu.removeClass('menu_onload');}, 100);
      main.addClass('second_open');
      body.addClass('active_second');
      setTimeout(function () {thankyou.addClass('second_open');}, 200);
      setTimeout(function () {$(".container-arrow").css('opacity' , 1);}, 200);
      setTimeout(function () {$("#credits").css('opacity' , 1);}, 250);
      thankyou.addClass('second_open');
      $('.container-arrow').css( "opacity", "1" );
    };
  
    var ajaxLoadPage = function (url) {
        console.log('Chargement du contenu de : ' + url);
        container.load( url + ".thankyou > *", function(){
          document.title = docTitle + " | " + data_target;
          setTimeout(function () { 
            $('#zone').css({
                  'opacity' : '1',
                  'transform': 'translateY(0em)'
            });
            var video = $("#video");
            $(window).scroll(function() {
              var scroll = $(window).scrollTop();
              var docHeight = $(document).height();
              var winHeight = $(window).height();
              var scrollPercent = (scroll) / (docHeight - winHeight);
              var scrollPercentRounded = Math.round(scrollPercent*100);
                if (scrollPercentRounded >= 35) {
                    video.removeClass('video_hide').addClass('video_show');
                } else {
                    video.removeClass('video_show').addClass('video_hide');
                }
            });  

            $('#show').cycle({
              fx: 'fade',
              speed: 500,
              next: '#show',
              timeout: 0,
              pager: '#show_nav'
            });
            }, 400);
          setTimeout(function () {$('#title').css('opacity','1');}, 800);
          setTimeout(function () {$('#short').css('opacity','1');}, 1200);
        });    
        return false;
      };



  /* ONLOAD suivant l'URL entrée
  -----------------------------------*/

    if( (window.location.hash.indexOf("#actualites/") === 0) && (window.location.hash.length > 11) ) { //si HASHTAG présent
        $(window).load(function() {
          // ajaxLoadPage(hashtag);
          actuState();
       });
    } else {
        $(window).load(function() {
          homeState();
       });
    }

  /* History POPSTATE suivant l'URL
  -----------------------------------*/

    $(window).bind('popstate', function(){
      var hashtag = window.location.hash.replace('#','');
      if( (window.location.hash.indexOf("#actualites/") === 0) && (window.location.hash.length > 11) ) { //si HASHTAG présent
        console.log( "Changement vers Actu" );
        // ajaxLoadPage(hashtag);
        actuState();
      } else {
        console.log( "Changement vers Home" );
        homeState();
      }
    });


/* Gestion des clics sur liens menu
   & animation du scroll
  -----------------------------------*/

menuItems.click(function(e) {
  var href = $(this).attr("href"),
    offsetTop = href === "#" ? 0 : $(href).offset().top + 10;
  
  if(window.innerHeight > window.innerWidth){
    
        if (thankyou.hasClass('second_open')) {

          thankyou.removeClass('second_open');
          main.removeClass('second_open');
          menu.removeClass('menu_open');
          main.removeClass('menu_open');
          body.removeClass('active_second');
          $('html, body').stop().animate({
            scrollTop: offsetTop
          }, 600);

        } else {

          menu.removeClass('menu_open');
          main.removeClass('menu_open');
          $('html, body').stop().animate({
            scrollTop: offsetTop
          }, 600);

        }

  } else {

          if (thankyou.hasClass('second_open')) {

          thankyou.removeClass('second_open');
          main.removeClass('second_open');
          body.removeClass('active_second');
          $('html, body').stop().animate({
            scrollTop: offsetTop
          }, 600);

        } else {

          $('html, body').stop().animate({
            scrollTop: offsetTop
          }, 600);

        }
  
  }

  e.preventDefault();
});

/* Gestion du Scroll sur les liens
    du menu
  -----------------------------------*/

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

/* Flêche Guide pour Scroll
  -----------------------------------*/

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

/* Bouton MENU en mode portrait
  -----------------------------------*/
menu_opener.on('click', function(e) {
  
  if (menu.hasClass('menu_open'))
  {
    menu.removeClass('menu_open');
    main.removeClass('menu_open');
    thankyou.removeClass('menu_open');
  } 
  else 
  {
    menu.addClass('menu_open');
    main.addClass('menu_open');
    thankyou.addClass('menu_open');
  }
e.preventDefault();
});

/* MISE EN PLACE DU CAROUSEL ACTU
  -----------------------------------*/

$('.multiple-items').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  dots: true,
  infinite: true,
  responsive: [
  {
      breakpoint: 1023,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 700,
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


/* Afficher / Cacher le contenu secondaire
  -----------------------------------*/

/* -----------------------------------
  AJOUTER CHARGEMENT AJAX DU CONTENU
  ----------------------------------- */

actu_link.on('click', function() {

    data_target = actu_link.attr('data-target'); // CIBLE A CHARGER
    history.pushState({page:data_target}, null, '#actualites/' + data_target);
    actuState();
    // ajaxLoadPage(data_target);
    // document.title = docTitle + ' | ' + $('.actu_link').attr('value');
});

$('.close').on('click', function() {
    homeState();
    history.pushState(null, null, '#actualites');
});

