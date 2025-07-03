
// Mobile Menu Toggle
const hamburgerBtn = document.getElementById("hamburger-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenuBtn = document.getElementById("close-menu-btn");
const mobileMenuLinks = mobileMenu.querySelectorAll("a");

function toggleMobileMenu() {
    mobileMenu.classList.toggle("hidden");
    document.body.style.overflow = mobileMenu.classList.contains("hidden") ? "" : "hidden";
}

hamburgerBtn.addEventListener("click", toggleMobileMenu);
closeMenuBtn.addEventListener("click", toggleMobileMenu);
mobileMenuLinks.forEach(link => {
    link.addEventListener("click", toggleMobileMenu);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!mobileMenu.classList.contains('hidden') && 
        !mobileMenu.contains(event.target) && 
        event.target !== hamburgerBtn) {
        toggleMobileMenu();
    }
});

// Active nav link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('#mobile-menu a');

function updateActiveNavLink() {
    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSectionId) {
            link.classList.add('active');
        }
    });
    
    mobileNavLinks.forEach(link => {
        link.classList.remove('text-red-600');
        if (link.getAttribute('href').slice(1) === currentSectionId) {
            link.classList.add('text-red-600');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update URL without page jump
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
const messageSent = document.getElementById('message-sent');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Simulate form submission
        setTimeout(() => {
            messageSent.classList.remove('hidden');
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                messageSent.classList.add('hidden');
            }, 5000);
        }, 1000);
    });
}

// Popup handling
const termsLink = document.getElementById("terms-link");
const privacyLink = document.getElementById("privacy-link");
const termsPopup = document.getElementById("terms-popup");
const privacyPopup = document.getElementById("privacy-popup");
const popupOverlay = document.getElementById("popup-overlay");
const closePopupButtons = document.querySelectorAll(".close-popup");

function showPopup(popup) {
    popup.style.display = "block";
    popupOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
}

function hidePopups() {
    termsPopup.style.display = "none";
    privacyPopup.style.display = "none";
    popupOverlay.style.display = "none";
    document.body.style.overflow = "";
}

termsLink.addEventListener("click", (event) => {
    event.preventDefault();
    showPopup(termsPopup);
});

privacyLink.addEventListener("click", (event) => {
    event.preventDefault();
    showPopup(privacyPopup);
});

closePopupButtons.forEach(button => {
    button.addEventListener("click", hidePopups);
});

popupOverlay.addEventListener("click", hidePopups);

// Close popup with ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        hidePopups();
    }
});
