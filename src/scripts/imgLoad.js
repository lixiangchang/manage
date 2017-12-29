(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var photos = document.querySelectorAll('.proof-photo');
    if (!photos.length) return false;
    for (let i = 0; i < photos.length; i++) {
      var element = photos[i];
      var imgPath = element.dataset.src;
      var nImg = document.createElement('img');
      if (!element.dataset.src) continue;
      nImg.src = imgPath;
      nImg.index = i;
      nImg.addEventListener('load', function() {
        var w = this.width;
        var h = this.height;
        var index = this.index;
        photos[index].appendChild(this);
        photos[index].setAttribute('data-width', w);
        photos[index].setAttribute('data-height', h);
        photos[index].classList.add('end');
      });
      element.addEventListener('click', function() {
        if (!this.dataset.width || !this.dataset.height) return false;
        openPhotoSwipe(this.dataset);
      });
    }
  });
})();

function openPhotoSwipe(photo) {
  var pswpElement = document.querySelectorAll('.pswp')[0];
  var items = [{ src: photo.src, w: photo.width, h: photo.height }];

  var options = {
    history: true,
    focus: false,
    showAnimationDuration: 0,
    hideAnimationDuration: 0,
    shareEl: false,
    fullscreenEl: false
  };
  var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();
}
