
"use strict";

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });
}

// Highlight the currently visible section
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navItems.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") ===
                            "#" + entry.target.id;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    document.querySelectorAll("main section[id]").forEach((section) => {
        observer.observe(section);
    });
}

// Automatically update the footer year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Contact form: open an email draft
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document
            .getElementById("contact-name")
            .value.trim();

        const email = document
            .getElementById("contact-email")
            .value.trim();

        const message = document
            .getElementById("contact-message")
            .value.trim();

        if (!name || !email || !message) {
            formStatus.textContent =
                "Please complete all fields.";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            formStatus.textContent =
                "Please enter a valid email address.";
            return;
        }

        const subject = encodeURIComponent(
            "Portfolio contact from " + name
        );

        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        const recipient = "sanketmali191@gmail.com";

        formStatus.textContent =
            "Opening your email application. Review the draft before sending.";

        window.location.href =
            "mailto:" + recipient +
            "?subject=" + subject +
            "&body=" + body;
    });
}
