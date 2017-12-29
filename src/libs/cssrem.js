(function(window, document) {
  var cssrem = {
    maxWidth: 640,
    fontSize: 20,
    currentfontSize: 20,
    basisWidth: 375
  };
  cssrem.isClient = function() {
    var uAgent = window.navigator.userAgent;
    this.isIOS = uAgent.match(/iphone/i);
    this.isAndroid = uAgent.match(/android/i);
    if (this.isIOS) {
      document.documentElement.classList.add('IOS');
    } else if (this.isAndroid) {
      document.documentElement.classList.add('Android');
    }
  };
  cssrem.mresize = function() {
    var htmlWidth, fontSize;
    htmlWidth = window.innerWidth || document.documentElement.clientWidth;
    htmlWidth = htmlWidth <= this.maxWidth ? htmlWidth : this.maxWidth;
    fontSize = htmlWidth / this.basisWidth * this.fontSize;
    this.currentfontSize = fontSize;
    document.documentElement.style.fontSize = fontSize + 'px';
  };
  cssrem.load = function() {
    var self = this;
    self.mresize();
    cssrem.isClient();
    window.addEventListener(
      'resize',
      function() {
        clearTimeout(self.time);
        self.time = setTimeout(self.mresize.bind(self), 100);
      },
      false
    );
    window.addEventListener('load', self.mresize.bind(self), false);
    setTimeout(self.mresize.bind(self), 222);
  };
  window.cssrem = cssrem;
  cssrem.load();
})(window, document);
