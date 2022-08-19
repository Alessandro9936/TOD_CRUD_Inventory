const linkContainers = document.querySelectorAll(".links__container");

linkContainers.forEach((container) => {
  container.addEventListener("click", () => {
    container.querySelector(".hidden-links").classList.toggle("hidden");
  });
});
