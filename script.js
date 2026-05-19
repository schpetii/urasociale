const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const filterButtons = document.querySelectorAll("[data-filter]");
const activityCards = document.querySelectorAll("[data-category]");
const brandLogos = document.querySelectorAll(".brand-logo");
const heroRotators = document.querySelectorAll("[data-hero-rotator]");
const rotatingImages = document.querySelectorAll("[data-rotating-images]");
const slideshows = document.querySelectorAll("[data-slideshow]");
const isEnglish = document.documentElement.lang === "en";
const openMenuLabel = isEnglish ? "Open menu" : "Hap menune";
const closeMenuLabel = isEnglish ? "Close menu" : "Mbyll menune";
const defaultHeroImages = [
  "assets/images/activities/ballinabackground.jpg",
  "assets/images/activities/ballinabackground2.jpg",
  "assets/images/activities/ballinabackground3.jpg",
  "assets/images/activities/ballinabackground4.jpg",
  "assets/images/activities/ballinabackground5.jpg",
  "assets/images/activities/ballinabackground6.jpg",
  "assets/images/activities/ballinabackground7.jpg",
];

function setHeaderState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
}

function showLogoFallback(logo) {
  const fallback = logo.nextElementSibling;
  logo.style.display = "none";
  if (fallback instanceof HTMLElement) {
    fallback.style.display = "grid";
  }
}

function shuffleImages(images) {
  const shuffled = [...images];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

brandLogos.forEach((logo) => {
  logo.addEventListener("error", () => showLogoFallback(logo));

  if (logo.complete && logo.naturalWidth === 0) {
    showLogoFallback(logo);
  }
});

heroRotators.forEach((rotator) => {
  const configuredImages = (rotator.dataset.heroImages ?? "")
    .split("|")
    .map((image) => image.trim())
    .filter(Boolean);
  const images = shuffleImages([...new Set([...configuredImages, ...defaultHeroImages])]);
  const layers = Array.from(rotator.querySelectorAll(".hero-bg-layer"));
  let imageIndex = 0;
  let activeLayerIndex = 0;
  let timer;

  if (images.length === 0 || layers.length < 2) {
    return;
  }

  images.forEach((image) => {
    const preload = new Image();
    preload.src = image;
  });

  function setLayerImage(layer, image) {
    layer.style.backgroundImage = `url("${image}")`;
  }

  setLayerImage(layers[0], images[0]);
  setLayerImage(layers[1], images[1] ?? images[0]);
  layers[0].classList.add("is-active");
  layers[1].classList.remove("is-active");

  if (images.length === 1) {
    return;
  }

  function nextDelay() {
    return 5200 + Math.floor(Math.random() * 3600);
  }

  function scheduleNextSwap() {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      swapHeroImage();
      scheduleNextSwap();
    }, nextDelay());
  }

  function swapHeroImage() {
    const nextLayerIndex = activeLayerIndex === 0 ? 1 : 0;
    imageIndex = (imageIndex + 1) % images.length;

    if (imageIndex === 0) {
      images.splice(0, images.length, ...shuffleImages(images));
    }

    setLayerImage(layers[nextLayerIndex], images[imageIndex]);
    layers[nextLayerIndex].classList.add("is-active");
    layers[activeLayerIndex].classList.remove("is-active");
    activeLayerIndex = nextLayerIndex;
  }

  scheduleNextSwap();
});

rotatingImages.forEach((image) => {
  const images = [
    ...new Set(
      (image.dataset.rotatingImages ?? "")
        .split("|")
        .map((imagePath) => imagePath.trim())
        .filter(Boolean),
    ),
  ];
  const configuredInterval = Number(image.dataset.rotatingInterval);
  const interval = Number.isFinite(configuredInterval) && configuredInterval >= 1500 ? configuredInterval : 5200;
  let imageIndex = images.indexOf(image.getAttribute("src") ?? "");

  if (images.length <= 1) {
    return;
  }

  if (imageIndex < 0) {
    imageIndex = 0;
    image.src = images[0];
  }

  const frame = document.createElement("div");
  const nextImage = document.createElement("img");

  frame.className = "activity-image-rotator";
  image.parentNode?.insertBefore(frame, image);
  frame.append(image, nextImage);

  image.classList.add("is-active");
  nextImage.alt = "";
  nextImage.setAttribute("aria-hidden", "true");
  nextImage.src = images[(imageIndex + 1) % images.length];

  images.forEach((imagePath) => {
    const preload = new Image();
    preload.src = imagePath;
  });

  window.setInterval(() => {
    const currentImage = frame.querySelector("img.is-active");
    const incomingImage = currentImage === image ? nextImage : image;

    imageIndex = (imageIndex + 1) % images.length;
    incomingImage.src = images[imageIndex];
    incomingImage.classList.add("is-active");
    currentImage?.classList.remove("is-active");
  }, interval);
});

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  header?.classList.toggle("is-open", Boolean(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? closeMenuLabel : openMenuLabel);
  navToggle.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;
  window.lucide?.createIcons();
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    header?.classList.remove("is-open");
    navToggle?.setAttribute("aria-label", openMenuLabel);
    if (navToggle) {
      navToggle.innerHTML = '<i data-lucide="menu"></i>';
      window.lucide?.createIcons();
    }
  }
});

function applyActivityFilter(filter) {
  filterButtons.forEach((item) => item.classList.toggle("active", item.dataset.filter === filter));
  activityCards.forEach((card) => {
    const categories = card.dataset.category?.split(" ") ?? [];
    card.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyActivityFilter(button.dataset.filter ?? "all");
  });
});

if (filterButtons.length > 0) {
  const requestedFilter = new URLSearchParams(window.location.search).get("filter") ?? "all";
  const filterExists = Array.from(filterButtons).some((button) => button.dataset.filter === requestedFilter);
  applyActivityFilter(filterExists ? requestedFilter : "all");
}

slideshows.forEach((slideshow) => {
  const slides = Array.from(slideshow.querySelectorAll("[data-slide]"));
  const dots = Array.from(slideshow.querySelectorAll("[data-slide-dot]"));
  const previousButton = slideshow.querySelector("[data-slide-prev]");
  const nextButton = slideshow.querySelector("[data-slide-next]");
  let activeIndex = 0;
  let timer;

  if (slides.length <= 1) {
    return;
  }

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === activeIndex);
    });
  }

  function startSlideshow() {
    window.clearInterval(timer);
    timer = window.setInterval(() => {
      showSlide(activeIndex + 1);
    }, 7000);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slideDot ?? 0));
      startSlideshow();
    });
  });

  previousButton?.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    startSlideshow();
  });

  nextButton?.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    startSlideshow();
  });

  showSlide(0);
  startSlideshow();
});

window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("load", () => {
  setHeaderState();
  window.lucide?.createIcons();
});
