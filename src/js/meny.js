//MOBILMENY hamburger 
document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.getElementById("mobile-menu-icon");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeButton = document.getElementById("close-menu"); // Hämta "Stäng"-knappen
  
    menuIcon.addEventListener("click", () => {
      mobileMenu.style.transform = "translateX(0)"; // Öppnar 
    });
  
    closeButton.addEventListener("click", () => {
      mobileMenu.style.transform = "translateX(100%)"; // Stänger 
    });
  });
  