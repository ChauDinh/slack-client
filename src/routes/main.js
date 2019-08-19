const menuButtonNavBar = document.getElementById("menu-button");
const menuListNavBar = document.querySelector(".active");

menuButtonNavBar.addEventListener("click", e => {
  menuListNavBar.classList.remove("active");
  menuListNavBar.classList.toggle("active-toggle");
  menuListNavBar.classList.add("active");
});
