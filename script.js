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
