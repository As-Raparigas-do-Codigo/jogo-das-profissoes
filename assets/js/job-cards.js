$(document).ready(function () {
  let getslideHeight = $('.slide.active').height()

  $('.slides').css({
    height: getslideHeight
  })

  function calcslideHeight () {
    getslideHeight = $('.slide.active').height()

    $('.slides').css({
      height: getslideHeight
    })
  }

  function animateContentColor () {
    const getslideColor = $('.slide.active').attr('slide-color')

    $('body').css({
      background: getslideColor
    })

    $('.title').css({
      color: getslideColor
    })

    $('.btn').css({
      color: getslideColor
    })
  }

  const slideItem = $('.slide')
  let slideCurrentItem = slideItem.filter('.active')

  $('#next').on('click', function (e) {
    e.preventDefault()

    const nextItem = slideCurrentItem.next()

    slideCurrentItem.removeClass('active')

    if (nextItem.length) {
      slideCurrentItem = nextItem.addClass('active')
    } else {
      slideCurrentItem = slideItem.first().addClass('active')
    }

    calcslideHeight()
    animateContentColor()
  })

  $('#prev').on('click', function (e) {
    e.preventDefault()

    const prevItem = slideCurrentItem.prev()

    slideCurrentItem.removeClass('active')

    if (prevItem.length) {
      slideCurrentItem = prevItem.addClass('active')
    } else {
      slideCurrentItem = slideItem.last().addClass('active')
    }

    calcslideHeight()
    animateContentColor()
  })

  // Ripple
  $('[ripple]').on('click', function (e) {
    const rippleDiv = $('<div class="ripple" />')
    const rippleSize = 60
    const rippleOffset = $(this).offset()
    const rippleY = e.pageY - rippleOffset.top
    const rippleX = e.pageX - rippleOffset.left

    rippleDiv.css({
      top: rippleY - (rippleSize / 2),
      left: rippleX - (rippleSize / 2),
      background: $(this).attr('ripple-color')
    }).appendTo($(this))

    window.setTimeout(function () {
      rippleDiv.remove()
    }, 1900)
  })
})
