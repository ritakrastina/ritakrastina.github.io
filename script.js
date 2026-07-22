// Set current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Set email
const user = "rita.krastina";
const domain = "gmail.com";
const emailLinks = document.querySelectorAll(".email-link");

emailLinks.forEach((link) => {
  link.href = `mailto:${user}@${domain}`;
});

// Project gallery
document.querySelectorAll(".project").forEach((project) => {
  const heroBtn = project.querySelector(".project-hero");
  const heroImg = project.querySelector(".project-hero-img");
  const thumbs = [...project.querySelectorAll(".project-thumbnail")];
  const gallery = project.querySelector(".gallery");
  const closeBtn = project.querySelector(".gallery-close");
  const prevBtn = project.querySelector(".gallery-prev");
  const nextBtn = project.querySelector(".gallery-next");
  const scroller = project.querySelector(".gallery-scroller");
  const slides = [...project.querySelectorAll(".gallery-slide")];

  let activeIndex = 0;

  function setActive(index) {
    activeIndex = index;
    thumbs.forEach((t, i) => {
      t.classList.toggle("is-active", i === index);
      t.setAttribute("aria-current", i === index ? "true" : "false");
    });
    heroImg.src = thumbs[index].dataset.src;
  }

  function updateNavButtons() {
    const firstSlide = scroller.scrollLeft <= 2;
    const lastSlide =
      scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 2;

    if (firstSlide && document.activeElement === prevBtn) {
      nextBtn.focus();
    }
    if (lastSlide && document.activeElement === nextBtn) {
      prevBtn.focus();
    }

    prevBtn.disabled = firstSlide;
    nextBtn.disabled = lastSlide;
  }

  // Thumbnail clicks
  thumbs.forEach((thumb, i) =>
    thumb.addEventListener("click", () => setActive(i)),
  );

  // Hero opens gallery
  heroBtn.addEventListener("click", () => {
    gallery.showModal();
    slides[activeIndex].scrollIntoView({
      inline: "start",
      behavior: "instant",
    });
    updateNavButtons();
    closeBtn.focus();
  });

  // Close on button
  closeBtn.addEventListener("click", () => gallery.close());

  // Close on backdrop
  gallery.addEventListener("click", (e) => {
    const isClickableContent = e.target.closest("img, button");
    if (!isClickableContent) gallery.close();
  });

  // Prev / Next button navigation
  [prevBtn, nextBtn].forEach((btn) => {
    btn.addEventListener("click", () => {
      scroller.scrollBy({
        left: scroller.clientWidth * Number(btn.dataset.dir),
        behavior: "smooth",
      });
    });
  });

  // Keyboard arrow navigation
  gallery.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroller.scrollBy({
        left: -scroller.clientWidth,
        behavior: "smooth",
      });
      prevBtn.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scroller.scrollBy({
        left: scroller.clientWidth,
        behavior: "smooth",
      });
      nextBtn.focus();
    }
  });

  // Update navigation buttons on scroll
  scroller.addEventListener("scroll", () => updateNavButtons());
});
