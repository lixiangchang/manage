export default (function format() {
  document.addEventListener('DOMContentLoaded', function() {
    var elements = document.querySelectorAll('input[type="tel"]');
    var max, digit, decimal, regexp;
    if (!elements.length) return false;
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.addEventListener('input', function() {
        var value = this.value;
        max = this.dataset.max;
        digit = this.dataset.digit;
        decimal = this.dataset.decimal;

        // if (value == '') return false;
        value = value.replace(/^0+/, '0');
        regexp = !!decimal
          ? new RegExp('\\d+\\.?\\d{0,' + decimal + '}')
          : !!digit ? new RegExp('\\d{0,' + digit + '}') : new RegExp('\\d+');
        value = !value ? value : value.match(regexp);
        value = !!max ? (+value >= max ? max : value) : value;

        this.value = value;
      });
    }
  });
})();
