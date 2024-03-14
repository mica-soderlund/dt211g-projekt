document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("mobile-menu-icon");
    const mobileMenu = document.getElementById("mobile-menu");
  
    menuIcon.addEventListener("click", function() {
      mobileMenu.style.transform = mobileMenu.style.transform === "translateX(100%)" ? "translateX(0)" : "translateX(100%)";
    });
  });
  