// Runs inside each example website

// The responsive stylesheet starts with media="not all" (turned off).
// If the page address ends in ?responsive=1, switch it on so its media queries can run.
const pageAddress = new URLSearchParams(window.location.search);
const responsiveStylesheet = document.getElementById("responsive-css");

if (pageAddress.get("responsive") === "1" && responsiveStylesheet) {
  responsiveStylesheet.media = "all";
}

// Same idea for ?wireframe=1: gray for what users see, light red for the invisible containers
const wireframeStylesheet = document.getElementById("wireframe-css");

if (pageAddress.get("wireframe") === "1" && wireframeStylesheet) {
  wireframeStylesheet.media = "all";
}

// The example site's links are pretend, so stop them from going anywhere
document.addEventListener("click", function (event) {
  if (event.target.closest("a")) {
    event.preventDefault();
  }
});
