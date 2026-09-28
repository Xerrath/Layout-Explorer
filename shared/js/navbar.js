// Builds the site header (with the Layouts and Styles dropdown menus) and the previous / next links

// data-root on <body> is the path back to the site root, like "../../../"
const siteRoot = document.body.dataset.root || "./";
const pageType = document.body.dataset.type || "";
const pageId = document.body.dataset.id || "";

function pageLink(type, id) {
  return siteRoot + "pages/" + type + "/" + id + "/";
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

// One dropdown menu. items are layouts or styles; grouped items get a small heading per group
function buildDropdown(label, type, items) {
  const listItem = createElement("li", "nav-item nav-dropdown");

  const toggle = createElement("button", "nav-link nav-dropdown-toggle", label);
  toggle.type = "button";
  toggle.setAttribute("aria-expanded", "false");
  listItem.appendChild(toggle);

  const menu = createElement("div", "dropdown-menu");
  let currentGroup = null;
  let groupList = null;

  for (let index = 0; index < items.length; index++) {
    const item = items[index];

    if (item.group !== currentGroup || groupList === null) {
      currentGroup = item.group;
      if (currentGroup) {
        menu.appendChild(createElement("p", "dropdown-group", currentGroup));
      }
      groupList = createElement("ul", "dropdown-list");
      menu.appendChild(groupList);
    }

    const linkItem = document.createElement("li");
    const link = createElement("a", "dropdown-link", item.name);
    link.href = pageLink(type, item.id);
    if (type === pageType && item.id === pageId) {
      link.setAttribute("aria-current", "page");
      toggle.classList.add("is-current");
    }
    linkItem.appendChild(link);
    groupList.appendChild(linkItem);
  }

  listItem.appendChild(menu);

  toggle.addEventListener("click", function () {
    const isOpen = listItem.classList.contains("is-open");
    closeAllDropdowns();
    if (!isOpen) {
      listItem.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });

  return listItem;
}

function closeAllDropdowns() {
  const openItems = document.querySelectorAll(".nav-dropdown.is-open");
  for (let index = 0; index < openItems.length; index++) {
    openItems[index].classList.remove("is-open");
    openItems[index].querySelector(".nav-dropdown-toggle").setAttribute("aria-expanded", "false");
  }
}

function buildHeader() {
  const header = document.getElementById("site-header");
  if (!header) {
    return;
  }

  const inner = createElement("div", "header-inner");

  const brand = createElement("a", "brand");
  brand.href = siteRoot;
  const logo = document.createElement("img");
  logo.className = "brand-logo";
  logo.src = siteRoot + "assets/images/coding-logo.png";
  logo.alt = "West-MEC Coding";
  brand.appendChild(logo);
  brand.appendChild(createElement("span", "brand-name", "Layout Explorer"));
  inner.appendChild(brand);

  const nav = createElement("nav", "main-nav");
  nav.setAttribute("aria-label", "Main");
  const list = createElement("ul", "nav-list");

  const homeItem = createElement("li", "nav-item");
  const homeLink = createElement("a", "nav-link", "Home");
  homeLink.href = siteRoot;
  if (pageType === "") {
    homeLink.setAttribute("aria-current", "page");
  }
  homeItem.appendChild(homeLink);
  list.appendChild(homeItem);

  list.appendChild(buildDropdown("Layouts", "layouts", layouts));
  list.appendChild(buildDropdown("Styles", "styles", styles));

  const mdnItem = createElement("li", "nav-item");
  const mdnLink = createElement("a", "nav-link", "MDN Article");
  mdnLink.href = "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Design_and_accessibility/Common_web_layouts";
  mdnLink.target = "_blank";
  mdnLink.rel = "noopener";
  mdnItem.appendChild(mdnLink);
  list.appendChild(mdnItem);

  nav.appendChild(list);
  inner.appendChild(nav);
  header.appendChild(inner);
}

// Previous / next links so students can walk through every page in order
function buildPager() {
  const pager = document.getElementById("pager");
  if (!pager) {
    return;
  }

  let items = layouts;
  if (pageType === "styles") {
    items = styles;
  }

  let currentIndex = 0;
  for (let index = 0; index < items.length; index++) {
    if (items[index].id === pageId) {
      currentIndex = index;
    }
  }

  const previousIndex = (currentIndex - 1 + items.length) % items.length;
  const nextIndex = (currentIndex + 1) % items.length;

  const previousLink = createElement("a", "pager-link pager-previous");
  previousLink.href = pageLink(pageType, items[previousIndex].id);
  previousLink.appendChild(createElement("span", "pager-label", "Previous"));
  previousLink.appendChild(createElement("span", "pager-name", items[previousIndex].name));

  const nextLink = createElement("a", "pager-link pager-next");
  nextLink.href = pageLink(pageType, items[nextIndex].id);
  nextLink.appendChild(createElement("span", "pager-label", "Next"));
  nextLink.appendChild(createElement("span", "pager-name", items[nextIndex].name));

  pager.appendChild(previousLink);
  pager.appendChild(nextLink);
}

// Close menus when clicking somewhere else or pressing Escape
document.addEventListener("click", function (event) {
  if (!event.target.closest(".nav-dropdown")) {
    closeAllDropdowns();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeAllDropdowns();
  }
});

buildHeader();
buildPager();
