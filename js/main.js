/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById("header");
  // BUG FIX: ganti "this.scrollY" → "window.scrollY"
  window.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", shadowHeader);

/*=============== EMAIL JS ===============*/
// ============================================================
// GANTI: serviceID, templateID, dan publicKey
// Dapet dari dashboard EmailJS: https://dashboard.emailjs.com/
// ============================================================
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      "service_101hesa3", // <-- GANTI dengan Service ID kamu
      "template_2t9grc8", // <-- GANTI dengan Template ID kamu
      "#contact-form",
      "Kx9ItM64ue9u2n66G", // <-- GANTI dengan Public Key kamu
    )
    .then(
      () => {
        contactMessage.textContent = "Message sent successfully ✅";
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);
        contactForm.reset();
      },
      () => {
        contactMessage.textContent = "Message not sent (service error) ❌";
      },
    );
};

contactForm.addEventListener("submit", sendEmail);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // BUG FIX: ganti "this.scrollY" → "window.scrollY"
  window.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const id = section.id,
      top = section.offsetTop - 50,
      height = section.offsetHeight,
      link = document.querySelector(".nav__menu a[href*=" + id + "]");

    if (!link) return;

    link.classList.toggle(
      "active-link",
      scrollY > top && scrollY <= top + height,
    );
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme,
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme,
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
/*=============== THEME BUTTON ROTATE ===============*/
themeButton.addEventListener("click", () => {
  themeButton.classList.add("rotate");
  setTimeout(() => {
    themeButton.classList.remove("rotate");
  }, 400);
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
});

sr.reveal(`.home__perfil, .about__image, .contact__mail`, { origin: "right" });
sr.reveal(
  `.home__name, .home__info, .about__container, .section__title-1, .about__info, .contact__social, .contact__data`,
  { origin: "left" },
);
sr.reveal(`.services__card, .projects__card, .certificate__card`, {
  interval: 100,
});

/*=============== CERTIFICATE MODAL ===============*/
const certModal = document.getElementById("cert-modal");
const certOverlay = document.getElementById("cert-modal-overlay");
const certModalImg = document.getElementById("cert-modal-img");
const certModalClose = document.getElementById("cert-modal-close");
const certModalPrev = document.getElementById("cert-modal-prev");
const certModalNext = document.getElementById("cert-modal-next");

const certImages = Array.from(document.querySelectorAll(".certificate__img"));
let currentCertIndex = 0;

const openCertModal = (index) => {
  currentCertIndex = index;
  certModalImg.src = certImages[currentCertIndex].src;
  certModalImg.alt = certImages[currentCertIndex].alt;
  certModal.classList.add("active");
  certOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  updateNavButtons();
};

const closeCertModal = () => {
  certModal.classList.remove("active");
  certOverlay.classList.remove("active");
  document.body.style.overflow = "";
};

const updateNavButtons = () => {
  certModalPrev.classList.toggle(
    "hidden",
    certImages.length <= 1 || currentCertIndex === 0,
  );
  certModalNext.classList.toggle(
    "hidden",
    certImages.length <= 1 || currentCertIndex === certImages.length - 1,
  );
};

document.querySelectorAll(".certificate__card").forEach((card, i) => {
  card.style.cursor = "zoom-in";
  card.addEventListener("click", (e) => {
    e.preventDefault();
    openCertModal(i);
  });
});
certModalClose.addEventListener("click", closeCertModal);
certOverlay.addEventListener("click", closeCertModal);

certModalPrev.addEventListener("click", () => {
  if (currentCertIndex > 0) {
    currentCertIndex--;
    certModalImg.src = certImages[currentCertIndex].src;
    certModalImg.alt = certImages[currentCertIndex].alt;
    updateNavButtons();
  }
});

certModalNext.addEventListener("click", () => {
  if (currentCertIndex < certImages.length - 1) {
    currentCertIndex++;
    certModalImg.src = certImages[currentCertIndex].src;
    certModalImg.alt = certImages[currentCertIndex].alt;
    updateNavButtons();
  }
});

document.addEventListener("keydown", (e) => {
  if (!certModal.classList.contains("active")) return;
  if (e.key === "Escape") closeCertModal();
  if (e.key === "ArrowLeft") certModalPrev.click();
  if (e.key === "ArrowRight") certModalNext.click();
});

/*=============== TYPING ANIMATION ===============*/
const typingTexts = [
  "Aspiring Back-end Developer",
  "JavaScript Enthusiast",
  "System & Data Oriented",
  "Always Learning",
];

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typing-text");

const typeEffect = () => {
  const current = typingTexts[typingIndex];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => {
      isDeleting = true;
    }, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typingIndex = (typingIndex + 1) % typingTexts.length;
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
};

typeEffect();

/*=============== LOADER ===============*/
const loader = document.getElementById("loader");
const loaderTyping = document.getElementById("loader-typing");

const loaderTexts = [
  "Initializing...",
  "Loading portfolio...",
  "Almost ready...",
];

let loaderCharIndex = 0;
let loaderTextIndex = 0;

const typeLoader = () => {
  const current = loaderTexts[loaderTextIndex];

  if (loaderCharIndex <= current.length) {
    loaderTyping.textContent = current.substring(0, loaderCharIndex);
    loaderCharIndex++;
    setTimeout(typeLoader, 60);
  } else if (loaderTextIndex < loaderTexts.length - 1) {
    setTimeout(() => {
      loaderCharIndex = 0;
      loaderTextIndex++;
      typeLoader();
    }, 400);
  }
};

typeLoader();

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 2800);
});
