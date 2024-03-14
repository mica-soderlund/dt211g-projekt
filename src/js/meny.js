//HAMBURGARE-MENY MOBIL
document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('.burger-button');
    const mobileMenu = document.querySelector('.mobile-menu-items');

    function toggleMenu() {
        burgerButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        // Lägger till eller tar bort eventlyssnare baserat på om menyn är aktiv eller inte
        if (mobileMenu.classList.contains('active')) {
            document.addEventListener('click', closeMenuOnClickOutside);
        } else {
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    }

    function closeMenuOnClickOutside(event) {
        // Kontrollerar om klicket är utanför menyn och knappen
        if (!burgerButton.contains(event.target) && !mobileMenu.contains(event.target)) {
            burgerButton.classList.remove('active');
            mobileMenu.classList.remove('active');
            // Tar bort eventlyssnaren eftersom menyn nu är stängd
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    }

    if (burgerButton && mobileMenu) {
        burgerButton.addEventListener('click', function(event) {
            // Förhindrar att dokumentets click-event omedelbart stänger menyn
            event.stopPropagation();
            toggleMenu();
        });
    } else {
        console.error("Mobile meny was not found.");
    }
});

