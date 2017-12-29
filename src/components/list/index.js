window.addEventListener('DOMContentLoaded', function() {
  var goods = document.querySelector('.order-swiper')
  if (!goods) return false
  var container = goods.querySelector('.swiper-container .swiper-wrapper')
  var length = container.children.length
  // if (length < 5) return false

  return false

  var mySwiper = new Swiper('.order-swiper .swiper-container', {
    slidesPerView: 'auto',
    centeredSlides: false,
    spaceBetween: 0
  })
})
