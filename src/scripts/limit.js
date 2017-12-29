export default (function limit() {
  document.addEventListener('DOMContentLoaded', function() {
    var Element = document.querySelector('[data-limit]');
    if (!Element) return false;
    var limit = +Element.dataset.limit;
    var tipsEle = Element.nextElementSibling;
    tipsEle.textContent = `0/${limit}`;
    Element.addEventListener('input', function() {
      var text = this.value;
      var textLen = text.length;
      if (textLen > limit) {
        Element.value = this.value.slice(0, limit);
        tipsEle.textContent = `${limit}/${limit}`;
        return;
      }
      tipsEle.textContent = `${textLen}/${limit}`;
    });
  });
})();
