const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const filterButtons = document.querySelectorAll("[data-filter]");
const activityCards = document.querySelectorAll("[data-category]");

function setHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
}

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  header?.classList.toggle("is-open", Boolean(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Mbyll menune" : "Hap menune");
  navToggle.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;
  window.lucide?.createIcons();
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    header?.classList.remove("is-open");
    navToggle?.setAttribute("aria-label", "Hap menune");
    if (navToggle) {
      navToggle.innerHTML = '<i data-lucide="menu"></i>';
      window.lucide?.createIcons();
    }
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter ?? "all";

    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    activityCards.forEach((card) => {
      const categories = card.dataset.category?.split(" ") ?? [];
      card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("load", () => {
  setHeaderState();
  window.lucide?.createIcons();
});
