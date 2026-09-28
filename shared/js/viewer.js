// Example page viewer: Phone / Tablet / Desktop frame and the "Make it responsive" switch

const screenButtonsBox = document.getElementById("screen-buttons");
const responsiveToggle = document.getElementById("responsive-toggle");
const deviceStage = document.getElementById("device-stage");
const device = document.getElementById("device");
const demoFrame = document.getElementById("demo-frame");
const readoutWidth = document.getElementById("readout-width");
const readoutQuery = document.getElementById("readout-query");
// Only the layout pages have the wireframe switch
const wireframeToggle = document.getElementById("wireframe-toggle");
const wireframeLegend = document.getElementById("wireframe-legend");

const settingsKey = "layoutExplorerViewer";
let currentScreen = screens[2];

// Settings are remembered so the same screen size stays picked while moving between pages
function loadSettings() {
  try {
    const saved = localStorage.getItem(settingsKey);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    return {};
  }
  return {};
}

function saveSettings() {
  try {
    const saved = loadSettings();
    saved.screen = currentScreen.id;
    saved.responsive = responsiveToggle.checked;
    if (wireframeToggle) {
      saved.wireframe = wireframeToggle.checked;
    }
    localStorage.setItem(settingsKey, JSON.stringify(saved));
  } catch (error) {
    // Storage blocked: the page still works, it just won't remember
  }
}

function findScreen(id) {
  for (let index = 0; index < screens.length; index++) {
    if (screens[index].id === id) {
      return screens[index];
    }
  }
  return screens[2];
}

function buildScreenButtons() {
  for (let index = 0; index < screens.length; index++) {
    const screen = screens[index];

    const button = document.createElement("button");
    button.type = "button";
    button.className = "screen-button";
    button.dataset.screen = screen.id;

    const name = document.createElement("span");
    name.className = "screen-name";
    name.textContent = screen.name + " (" + screen.width + "px)";

    const query = document.createElement("code");
    query.className = "screen-query";
    query.textContent = screen.query;

    button.appendChild(name);
    button.appendChild(query);
    button.addEventListener("click", function () {
      setScreen(screen.id);
    });

    screenButtonsBox.appendChild(button);
  }
}

// Load the example in the frame. ?responsive=1 turns on its media queries, ?wireframe=1 turns on the wireframe view
function loadDemo() {
  const options = [];
  if (responsiveToggle.checked) {
    options.push("responsive=1");
  }
  if (wireframeToggle && wireframeToggle.checked) {
    options.push("wireframe=1");
  }

  let source = "demo.html";
  if (options.length > 0) {
    source = "demo.html?" + options.join("&");
  }
  demoFrame.src = source;

  if (wireframeLegend && wireframeToggle) {
    wireframeLegend.hidden = !wireframeToggle.checked;
  }
}

function setScreen(screenId) {
  currentScreen = findScreen(screenId);

  const buttons = screenButtonsBox.querySelectorAll(".screen-button");
  for (let index = 0; index < buttons.length; index++) {
    const isActive = buttons[index].dataset.screen === currentScreen.id;
    buttons[index].classList.toggle("is-active", isActive);
    buttons[index].setAttribute("aria-pressed", String(isActive));
  }

  // The frame inside is exactly the screen width; the extra 24px is the dark bezel
  device.className = "device device-" + currentScreen.id;
  device.style.width = currentScreen.width + 24 + "px";
  device.style.height = currentScreen.height + 24 + "px";

  fitDevice();
  updateReadout();
  saveSettings();
}

// Shrink the device to fit the page when the real screen is smaller than the device
function fitDevice() {
  const bezel = 24;
  const available = deviceStage.clientWidth;
  const fullWidth = currentScreen.width + bezel;
  let scale = 1;

  if (available < fullWidth) {
    scale = available / fullWidth;
  }

  device.style.transform = "scale(" + scale + ")";
  deviceStage.style.height = (currentScreen.height + bezel) * scale + "px";
}

function showRunningQuery(query) {
  readoutQuery.textContent = "Running: ";
  const code = document.createElement("code");
  code.className = "readout-code";
  code.textContent = query;
  readoutQuery.appendChild(code);
}

function updateReadout() {
  readoutWidth.textContent = currentScreen.width + "px wide";

  if (!responsiveToggle.checked) {
    readoutQuery.textContent = "Responsive is OFF. No media queries are running, so every screen gets the desktop layout.";
    return;
  }

  // Mobile first: the phone layout needs no media query, and each min-width query adds on top of the last
  if (currentScreen.id === "phone") {
    readoutQuery.textContent = "No media query runs. Mobile first: the phone layout is the base CSS.";
  } else if (currentScreen.id === "tablet") {
    showRunningQuery("@media (min-width: 600px)");
  } else {
    showRunningQuery("@media (min-width: 600px)");
    readoutQuery.appendChild(document.createTextNode(" and "));
    const desktopCode = document.createElement("code");
    desktopCode.className = "readout-code";
    desktopCode.textContent = "@media (min-width: 1024px)";
    readoutQuery.appendChild(desktopCode);
  }
}

responsiveToggle.addEventListener("change", function () {
  loadDemo();
  updateReadout();
  saveSettings();
});

if (wireframeToggle) {
  wireframeToggle.addEventListener("change", function () {
    loadDemo();
    saveSettings();
  });
}

window.addEventListener("resize", fitDevice);

// Start up
const settings = loadSettings();
responsiveToggle.checked = settings.responsive === true;
if (wireframeToggle) {
  wireframeToggle.checked = settings.wireframe === true;
}
buildScreenButtons();
setScreen(settings.screen || "desktop");
loadDemo();
