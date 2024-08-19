const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-link');


navLinks.forEach(link => {
  if (link.href.endsWith(currentPath))   
 {
    link.classList.add('-active');
  }
});