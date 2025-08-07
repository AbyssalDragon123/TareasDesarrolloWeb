document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    var dropdown = document.querySelector('.dropdown');
    var timeout;

    if (dropdown) {
      dropdown.addEventListener('mouseenter', function() {
        clearTimeout(timeout);
        dropdown.classList.add('show');
      });

      dropdown.addEventListener('mouseleave', function() {
        timeout = setTimeout(function() {
          dropdown.classList.remove('show');
        }, 400);
      });

      var dropdownContent = dropdown.querySelector('.dropdown-content');
      if (dropdownContent) {
        dropdownContent.addEventListener('mouseenter', function() {
          clearTimeout(timeout);
          dropdown.classList.add('show');
        });
        dropdownContent.addEventListener('mouseleave', function() {
          timeout = setTimeout(function() {
            dropdown.classList.remove('show');
          }, 400);
        });
      }
    }
  }, 200);
});
