export default (function() {
  document.addEventListener('DOMContentLoaded', function() {
    var updateInput = document.querySelector('#updatePhoto');
    if (!updateInput) return false;
    var Img = document.querySelector('.photoShow img');
    updateInput.addEventListener('change', function() {
      var file = this.files[0];
      if (!file) return false;
      readFile(file, Img);
    });
  });
})();

function readFile(file, Img) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener('load', function(oFREvent) {
    var base64 = oFREvent.target.result;
    Img.src = base64;
  });
}
