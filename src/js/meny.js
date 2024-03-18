document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("mobile-menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeButton = document.getElementById("close-menu"); 

  menuIcon.addEventListener("click", () => {
    // Kontrollerar menyns nuvarande display-värde och växlar 
    if (mobileMenu.style.display === "none" || mobileMenu.style.display === "") {
      mobileMenu.style.display = "block"; // Visar menyn
    } else {
      mobileMenu.style.display = "none"; // Döljer menyn 
    }
  });

  closeButton.addEventListener("click", () => {
    mobileMenu.style.display = "none"; // Döljer menyn
  });
});
