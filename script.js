const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const profilePhoto = document.querySelector(".profile-photo");
const heroPhoto = document.querySelector(".hero-photo");

profilePhoto?.addEventListener("error", () => {
  profilePhoto.remove();
});

profilePhoto?.addEventListener("load", () => {
  profilePhoto.classList.add("loaded");
});

if (cursorDot && cursorRing && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    cursorRing.style.transform = `translate(${event.clientX - 18}px, ${event.clientY - 18}px)`;
  });
}

heroPhoto?.addEventListener("load", () => heroPhoto.classList.add("loaded"));
heroPhoto?.addEventListener("error", () => heroPhoto.remove());

const revealItems = document.querySelectorAll(
  ".about-section, .skills-band, .work-section, .experience-section, .contact-section, .section-heading, .about-content, .skill-list, .project-card, .experience-card, .contact-inner",
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  { threshold: 0.12 },
);

revealItems.forEach((item) => {
  item.classList.add("scroll-reveal");
  revealObserver.observe(item);
});

document.querySelectorAll(".magnetic").forEach((element) => {
  element.addEventListener("pointermove", (event) => {
    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.18;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.18;
    element.style.transform = `translate(${x}px, ${y}px)`;
  });
  element.addEventListener("pointerleave", () => {
    element.style.transform = "";
  });
});

const showcase = document.querySelector(".project-showcase");
const showcaseCards = [...document.querySelectorAll(".project-rail .project-card")];
const previews = [...document.querySelectorAll(".project-preview")];
const showcaseCount = document.querySelector(".showcase-count");

function setShowcaseProject(index) {
  const activeIndex = Math.max(0, Math.min(index, previews.length - 1));
  showcaseCards.forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === activeIndex);
  });
  previews.forEach((preview, previewIndex) => {
    preview.classList.toggle("is-current", previewIndex === activeIndex);
  });
  if (showcaseCount) {
    showcaseCount.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(previews.length).padStart(2, "0")}`;
  }
}

if (showcase && showcaseCards.length && previews.length) {
  showcaseCards.forEach((card) => {
    card.addEventListener("mouseenter", () => setShowcaseProject(Number(card.dataset.project)));
    card.addEventListener("focus", () => setShowcaseProject(Number(card.dataset.project)));
  });

  const showcaseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const cardIndex = showcaseCards.indexOf(entry.target);
        if (cardIndex !== -1) setShowcaseProject(cardIndex);
      });
    },
    { rootMargin: "-35% 0px -45% 0px", threshold: 0 },
  );

  showcaseCards.forEach((card) => showcaseObserver.observe(card));
  setShowcaseProject(0);
}
