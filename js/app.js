/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
let navbarList = document.getElementById("navbar__list");
let menuLinks = [];
let allSections = document.getElementsByTagName("section");
let currSection = localStorage.getItem("curr-section") || "section1";
/**
 * End Global Variables
 */

/**
 * Begin Main Functions
 */

// build the nav
for (const section of allSections) {
  // create a anchor
  let listLink = document.createElement("a");

  // put the textContent of anchor
  listLink.textContent = section.dataset.nav;
  listLink.dataset.link = section.getAttribute("id");

  // add navbar__list class
  listLink.classList.add("menu__link");

  // add active class to link
  if (listLink.dataset.link == currSection) {
    const el = document.getElementById(listLink.dataset.link);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    addActiveClass(el, listLink);
  }

  // add to menu array to push them into the navbar menu
  menuLinks.push(listLink);
}

// function to add an active class
function addActiveClass(...elements) {
  for (const element of elements) {
    element.classList.add("active");
  }
}

// function to remove an active class from all section
function removeActiveClass() {
  for (const section of allSections) {
    section.classList.remove("active");
  }
  for (const link of menuLinks) {
    link.classList.remove("active");
  }
}

/**
 * End Main Functions
 * Begin Events
 */

// Build menu
for (const menu of menuLinks) {
  // create a listItem
  let listItem = document.createElement("li");
  listItem.appendChild(menu);
  navbarList.appendChild(listItem);
}

// Scroll to section on link click
menuLinks.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    removeActiveClass();
    const el = document.getElementById(item.dataset.link);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    addActiveClass(el, item);
    localStorage.setItem("curr-section", item.dataset.link);
  });
});

/**
 * End Events
 */

window.onscroll = () => {
  for (const section of allSections) {
    let top = window.scrollY;
    let offset = section.offsetTop - 150;
    let height = section.offsetHeight;
    let id = section.getAttribute("id");

    if (top >= offset && top <= offset + height) {
      removeActiveClass();
      section.classList.add("active");
      menuLinks.forEach((item) => {
        if (item.dataset.link == id) {
          item.classList.add("active");
        }
      });
    }
  }
};
