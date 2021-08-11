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
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
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

  // add to menu array to push them into the navbar menu
  menuLinks.push(listLink);
}

// Add class 'active' to section when near top of viewport
// function to add an active class
function addActiveClass(el) {
  el.classList.add("active-section");
}
// function to remove an active class from all section
function removeActiveClass() {
  for (const section of allSections) {
    section.classList.remove("active-section");
  }
  for (const link of menuLinks) {
    link.parentElement.classList.remove("active-section");
  }
}

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
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
    addActiveClass(item.parentElement);
    addActiveClass(el);
  });
});

// Set sections as active
