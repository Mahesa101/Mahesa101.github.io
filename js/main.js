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
sr.reveal(`.services__card, .projects__card`, {
  interval: 100,
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

/*=============== GITHUB ACTIVITY ===============*/
const GITHUB_USERNAME = "Mahesa101";

const githubIconMap = {
  PushEvent: "ri-git-commit-line",
  CreateEvent: "ri-git-branch-line",
  PullRequestEvent: "ri-git-pull-request-line",
  WatchEvent: "ri-star-line",
  ForkEvent: "ri-git-fork-line",
  IssuesEvent: "ri-error-warning-line",
  DeleteEvent: "ri-delete-bin-line",
  default: "ri-code-line",
};

const githubLabelMap = {
  PushEvent: "Pushed to",
  CreateEvent: "Created",
  PullRequestEvent: "Pull request on",
  WatchEvent: "Starred",
  ForkEvent: "Forked",
  IssuesEvent: "Issue on",
  DeleteEvent: "Deleted from",
  default: "Activity on",
};

const timeAgo = (dateStr) => {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const animateNumber = (el, target) => {
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, 30);
};

const fetchGithub = async () => {
  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
      ),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
      ),
    ]);

    const user = await userRes.json();
    const repos = await reposRes.json();
    const events = await eventsRes.json();

    /* ── Stats ── */
    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
    const pushEvents = events.filter((e) => e.type === "PushEvent");
    const totalCommits = pushEvents.reduce(
      (acc, e) => acc + (e.payload.commits?.length || 0),
      0,
    );

    /* streak: hitung hari berturut-turut dari events */
    const activeDays = [
      ...new Set(events.map((e) => new Date(e.created_at).toDateString())),
    ];
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      if (activeDays.includes(d.toDateString())) streak++;
      else break;
    }

    /* ── Activity list (optional element) ── */
    const list = document.getElementById("github-activity-list");
    if (list) {
      list.innerHTML = "";
      const filtered = events.slice(0, 6);

      if (filtered.length === 0) {
        list.innerHTML = `<li class="github__activity-item github__loading">No recent activity found.</li>`;
      } else {
        filtered.forEach((event) => {
          const icon = githubIconMap[event.type] || githubIconMap.default;
          const label = githubLabelMap[event.type] || githubLabelMap.default;
          const repo = event.repo.name.replace(`${GITHUB_USERNAME}/`, "");
          const time = timeAgo(event.created_at);

          const li = document.createElement("li");
          li.classList.add("github__activity-item");
          li.innerHTML = `
            <i class="${icon}"></i>
            <div class="github__activity-meta">
              <span class="github__activity-name">${label} <b>${repo}</b></span>
              <span class="github__activity-time">${time}</span>
            </div>
          `;
          list.appendChild(li);
        });
      }
    }
  } catch (err) {
    const list = document.getElementById("github-activity-list");
    if (list) {
      list.innerHTML = `
        <li class="github__activity-item github__loading">
          Failed to load activity. Check your connection.
        </li>
      `;
    }
  }

  /* ── Stats statis ── */
  const totalProjects = document.querySelectorAll(".tcg__card").length;
  const totalCerts = document.querySelectorAll(".certificate__card").length;

  const elProjects = document.getElementById("stat-projects");
  const elCerts = document.getElementById("stat-certs");
  const elExp = document.getElementById("stat-exp");

  if (elProjects) animateNumber(elProjects, totalProjects);
  if (elCerts) animateNumber(elCerts, totalCerts);
  if (elExp) animateNumber(elExp, 1);
};

fetchGithub();

/*=============== SKILLS SEE MORE ===============*/
const skillsGrid = document.querySelector(".about__skills");
const allSkills = Array.from(skillsGrid.querySelectorAll(".button__skill"));
const maxVisible = 6;

if (allSkills.length > maxVisible) {
  allSkills.forEach((skill, i) => {
    if (i >= maxVisible) skill.style.display = "none";
  });

  const seeMoreBtn = document.createElement("div");
  seeMoreBtn.classList.add("skills__toggle");
  seeMoreBtn.innerHTML = `<span>See More <i class="ri-arrow-down-s-line"></i></span>`;
  skillsGrid.insertAdjacentElement("afterend", seeMoreBtn);

  let expanded = false;

  seeMoreBtn.addEventListener("click", () => {
    expanded = !expanded;

    allSkills.forEach((skill, i) => {
      if (i >= maxVisible) {
        skill.style.display = expanded ? "flex" : "none";
      }
    });

    seeMoreBtn.innerHTML = expanded
      ? `<span>See Less <i class="ri-arrow-up-s-line"></i></span>`
      : `<span>See More <i class="ri-arrow-down-s-line"></i></span>`;
  });
}

/*=============== PROJECT MODAL 3D ===============*/
const projectPortal = document.getElementById("projectPortal");
const projectOverlay = document.getElementById("projectOverlay");
const project3DCard = document.getElementById("project3DCard");
let projectTiltInstance = null;

const openProjectModal = (
  name,
  type,
  category,
  descDetail,
  imgSrc,
  techs,
  githubUrl,
  demoUrl,
  rarity,
) => {
  /* ── TCG Card kiri ── */
  document.getElementById("modal3DName").textContent = name;
  document.getElementById("modal3DType").textContent = type;
  document.getElementById("modal3DImg").src = imgSrc;
  document.getElementById("modal3DImg").alt = name;
  document.getElementById("modal3DCategory").textContent =
    "// " + category.toUpperCase();
  document.getElementById("modal3DRarity").textContent = rarity;

  /* Deskripsi singkat di kartu */
  document.getElementById("modal3DDesc").textContent =
    descDetail.substring(0, 80) + "...";

  /* Tech badges di kartu */
  const statsEl = document.getElementById("modal3DStats");
  statsEl.innerHTML = techs
    .map(
      (t) => `<span class="tcg__stat"><i class="ri-code-line"></i> ${t}</span>`,
    )
    .join("");

  /* ── Panel kanan ── */
  document.getElementById("projectPanelCategory").textContent =
    "// " + category.toUpperCase();
  document.getElementById("projectPanelTitle").textContent = name;
  document.getElementById("projectPanelDesc").textContent = descDetail;

  /* Tech badges di panel */
  const techEl = document.getElementById("projectPanelTech");
  techEl.innerHTML = techs
    .map((t) => `<span class="project-portal__tech-badge">${t}</span>`)
    .join("");

  document.getElementById("projectBtnGithub").href = githubUrl || "#";
  document.getElementById("projectBtnDemo").href = demoUrl || "#";

  /* ── Buka modal ── */
  projectPortal.classList.add("active");
  projectOverlay.classList.add("active");
  document.body.style.overflow = "hidden";

  /* Tunggu animasi entry selesai (600ms), baru init VanillaTilt */
  setTimeout(() => {
    /* Hapus transition agar VanillaTilt bisa gerak bebas */
    project3DCard.classList.add("tilt-ready");

    if (typeof VanillaTilt !== "undefined") {
      /* Destroy dulu jika ada instance sebelumnya */
      if (project3DCard.vanillaTilt) {
        project3DCard.vanillaTilt.destroy();
      }
      VanillaTilt.init(project3DCard, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        perspective: 1000,
        scale: 1.04,
        reset: true,
      });
      projectTiltInstance = project3DCard.vanillaTilt;
    }
  }, 700);
};

const closeProjectModal = () => {
  if (projectTiltInstance) {
    projectTiltInstance.destroy();
    projectTiltInstance = null;
  }
  project3DCard.classList.remove("tilt-ready");
  projectPortal.classList.remove("active");
  projectOverlay.classList.remove("active");
  document.body.style.overflow = "";
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProjectModal();
});

/*=============== CERT 3D MODAL ===============*/
const cert3DPortal = document.getElementById("cert3DPortal");
const cert3DOverlay = document.getElementById("cert3DOverlay");
const cert3DCard = document.getElementById("cert3DCard");
let cert3DTilt = null;

const openCert3DModal = (title, imgSrc, linkUrl, desc) => {
  document.getElementById("cert3DImg").src = imgSrc;
  document.getElementById("cert3DTitle").textContent = title;
  document.getElementById("cert3DDesc").textContent = desc;
  document.getElementById("cert3DLink").href = linkUrl || "#";

  cert3DPortal.classList.add("active");
  cert3DOverlay.classList.add("active");
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    if (typeof VanillaTilt !== "undefined") {
      VanillaTilt.init(cert3DCard, {
        max: 12,
        speed: 800,
        glare: true,
        "max-glare": 0.2,
        perspective: 1200,
        scale: 1.03,
        reset: true,
      });
      cert3DTilt = cert3DCard.vanillaTilt;
    }
  }, 400);
};

const closeCert3DModal = () => {
  if (cert3DTilt) {
    cert3DTilt.destroy();
    cert3DTilt = null;
  }
  cert3DPortal.classList.remove("active");
  cert3DOverlay.classList.remove("active");
  document.body.style.overflow = "";
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeProjectModal();
    closeCert3DModal();
  }
});


/*=============== PROJECTS SEE MORE ===============*/
(() => {
  const container = document.querySelector('.tcg__container');
  if (!container) return;
 
  const cards = Array.from(container.querySelectorAll('.tcg__card'));
  if (cards.length === 0) return;
 
  let expanded = false;
  let btnEl = null;
 
  const getLimit = () => (window.innerWidth >= 900 ? 6 : 3);
 
  const render = () => {
    const limit = getLimit();
    cards.forEach((card, i) => {
      card.style.display = expanded || i < limit ? '' : 'none';
    });
 
    if (btnEl) btnEl.remove();
    if (cards.length <= limit) return;
 
    btnEl = document.createElement('div');
    btnEl.classList.add('see-more__toggle');
    btnEl.innerHTML = expanded
      ? `<span>See Less <i class="ri-arrow-up-s-line"></i></span>`
      : `<span>See More <i class="ri-arrow-down-s-line"></i></span>`;
    container.insertAdjacentElement('afterend', btnEl);
 
    btnEl.addEventListener('click', () => {
      expanded = !expanded;
      render();
      if (!expanded) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };
 
  render();
 
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 150);
  });
})();
 
/*=============== CERTIFICATES SEE MORE ===============*/
(() => {
  const container = document.querySelector('.certificate__container');
  if (!container) return;
 
  const cards = Array.from(container.querySelectorAll('.certificate__card'));
  if (cards.length === 0) return;
 
  let expanded = false;
  let btnEl = null;
  let initialized = false;
 
  const getLimit = () => (window.innerWidth >= 720 ? 6 : 2);
 
  const animateIn = (card, delayMs = 0) => {
    card.style.removeProperty('opacity');
    card.style.removeProperty('transform');
    card.style.removeProperty('visibility');
    card.style.removeProperty('transition');
    card.removeAttribute('data-sr-id');
    card.style.display = 'flex';
    card.classList.remove('cert-revealed');
    card.style.animationDelay = `${delayMs}ms`;
    void card.offsetWidth;
    card.classList.add('cert-revealed');
  };
 
  const render = () => {
    const limit = getLimit();
 
    cards.forEach((card, i) => {
      if (expanded || i < limit) {
        if (card.style.display === 'none') {
          animateIn(card, Math.max(0, (i - limit) * 80));
        } else if (!initialized) {
          animateIn(card, i * 80);
        }
      } else {
        if (card.style.display !== 'none') {
          if (typeof sr !== 'undefined') sr.clean(card);
          card.classList.remove('cert-revealed');
          card.style.animationDelay = '';
          card.style.display = 'none';
        }
      }
    });
 
    initialized = true;
 
    if (btnEl) btnEl.remove();
    if (cards.length <= limit) return;
 
    btnEl = document.createElement('div');
    btnEl.classList.add('see-more__toggle');
    btnEl.innerHTML = expanded
      ? `<span>See Less <i class="ri-arrow-up-s-line"></i></span>`
      : `<span>See More <i class="ri-arrow-down-s-line"></i></span>`;
    container.insertAdjacentElement('afterend', btnEl);
 
    btnEl.addEventListener('click', () => {
      expanded = !expanded;
      render();
      if (!expanded) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };
 
  render();
 
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 150);
  });
})();
 
/*=============== ANIMATION — OBSERVER HELPER ===============*/
const createObserver = (elements, animClass, options = {}) => {
  const config = { threshold: 0.12, rootMargin: "0px 0px -60px 0px", ...options };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animClass);
        observer.unobserve(entry.target);
      }
    });
  }, config);
  elements.forEach((el) => observer.observe(el));
};
 
/*=============== ANIMATION — SERVICES GOTL (DESKTOP) ===============*/
(() => {
  const grid = document.querySelector(".gotl__grid");
  const cards = document.querySelectorAll(".gotl__card");
  if (!grid || !cards.length) return;
 
  const delays = ["0.05s", "0.13s", "0.21s", "0.29s"];
  cards.forEach((card, i) => card.style.setProperty("--anim-delay", delays[i] ?? "0.05s"));
 
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      grid.classList.add("anim-ready");
      cards.forEach((card) => card.classList.add("anim-in"));
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
 
  obs.observe(grid);
})();
 
/*=============== ANIMATION — SERVICES MOBILE ===============*/
(() => {
  const cards = document.querySelectorAll(".services__card");
  if (!cards.length) return;
  createObserver(Array.from(cards), "anim-in", { threshold: 0.1 });
})();
 
/*=============== ANIMATION — TCG PROJECT CARDS ===============*/
(() => {
  const container = document.querySelector(".tcg__container");
  if (!container) return;
 
  const delays = ["0.05s","0.13s","0.21s","0.29s","0.37s","0.45s","0.53s","0.61s","0.69s"];
  const allCards = () => Array.from(container.querySelectorAll(".tcg__card"));
 
  const observeCards = () => {
    const all = allCards();
    const unAnimated = all.filter(c => !c.classList.contains("anim-in"));
 
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("anim-in");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
 
    unAnimated.forEach((card) => {
      const idx = all.indexOf(card);
      card.style.setProperty("--anim-delay", delays[idx] ?? "0.05s");
      obs.observe(card);
    });
  };
 
  observeCards();
 
  new MutationObserver(observeCards).observe(container, {
    subtree: false,
    attributes: true,
    attributeFilter: ["style"],
    childList: false,
  });
})();