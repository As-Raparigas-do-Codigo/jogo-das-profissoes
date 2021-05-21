$(document).ready(function() {
  
    var getslideHeight = $('.slide.active').height();
  
    $('.slides').css({
      height: getslideHeight
    });
  
    function calcslideHeight() {
      getslideHeight = $('.slide.active').height();
  
      $('.slides').css({
        height: getslideHeight
      });
    }
 

    /*
    function animateContentColor() {
      var getslideColor = $('.slide.active').attr('slide-color');
  
      $('body').css({
        background: getslideColor
      });
  
      $('.title').css({
        color: getslideColor
      });
  
      $('.btn').css({
        color: getslideColor
      });
    }
  */

    function animateContentColor() {
      var getslideColor = $('.slide.active').attr('slide-color');
  
      
      $('body').css({
        background: getslideColor
      });
      
  
      $('.title').css({
        color: getslideColor
      });
  
      $('.btn').css({
        color: getslideColor
      });
    }
  

    var slideItem = $('.slide'),
      slideCurrentItem = slideItem.filter('.active');
  
    $('#next').on('click', function(e) {
      e.preventDefault();
  
      var nextItem = slideCurrentItem.next();
  
      slideCurrentItem.removeClass('active');
  
      if (nextItem.length) {
  
        slideCurrentItem = nextItem.addClass('active');
      } else {
        slideCurrentItem = slideItem.first().addClass('active');
      }
  
      calcslideHeight();
      animateContentColor();
    });
  
    $('#prev').on('click', function(e) {
      e.preventDefault();
  
      var prevItem = slideCurrentItem.prev();
  
      slideCurrentItem.removeClass('active');
  
      if (prevItem.length) {
        slideCurrentItem = prevItem.addClass('active');
      } else {
        slideCurrentItem = slideItem.last().addClass('active');
      }
  
      calcslideHeight();
      animateContentColor();
    });
  
    // Ripple
    $('[ripple]').on('click', function(e) {
      var rippleDiv = $('<div class="ripple" />'),
        rippleSize = 60,
        rippleOffset = $(this).offset(),
        rippleY = e.pageY - rippleOffset.top,
        rippleX = e.pageX - rippleOffset.left,
        ripple = $('.ripple');
  
      rippleDiv.css({
        top: rippleY - (rippleSize / 2),
        left: rippleX - (rippleSize / 2),
        background: $(this).attr("ripple-color")
      }).appendTo($(this));
  
      window.setTimeout(function() {
        rippleDiv.remove();
      }, 1900);
    });
  });