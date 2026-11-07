document.addEventListener("DOMContentLoaded", () => {
  // Add the active style to the current page's navigation link.
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  // Show a simple confirmation when the placeholder form is submitted.
  const submitButtons = document.querySelectorAll("form button[type='submit']");
  submitButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      button.textContent = "Sent!";
    });
  });

  // The rest of this code only runs on the home page.
  const homePage = document.querySelector("body.home-page");
  if (!homePage) {
    return;
  }

  const scrollStage = homePage.querySelector(".scroll-stage");
  const homeFox = homePage.querySelector(".home-fox");
  let animationTimer;
  let stopTimer;
  let frame = 1;

  // Put the fox back into its sitting position after scrolling stops.
  const stopFox = () => {
    clearInterval(animationTimer);
    homeFox.src = "img/fox_sit.png";
    homeFox.alt = "Fox sitting";
    frame = 1;
  };

  // Change the ground's texture position to match horizontal scrolling.
  scrollStage.addEventListener("scroll", () => {
    homePage.style.setProperty(
      "--ground-offset",
      `${-scrollStage.scrollLeft}px`
    );
    clearTimeout(stopTimer);

    // Start the walking animation the first time scrolling begins.
    if (!animationTimer) {
      homeFox.src = "img/fox_w1.png";
      homeFox.alt = "Fox walking";
      animationTimer = setInterval(() => {
        frame = frame === 1 ? 2 : 1;
        homeFox.src = `img/fox_w${frame}.png`;
      }, 500);
    }

    // Wait briefly so small scroll events do not stop the animation too soon.
    stopTimer = setTimeout(() => {
      stopFox();
      animationTimer = undefined;
    }, 500);
  });
});
