document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".main-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  const submitButtons = document.querySelectorAll("form button[type='submit']");
  submitButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      button.textContent = "Sent!";
    });
  });
});

