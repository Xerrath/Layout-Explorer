// Home page: one card per style, built from shared/js/data.js

function buildCard(type, item, detail) {
  const card = document.createElement("a");
  card.className = "example-card";
  card.href = "./pages/" + type + "/" + item.id + "/";

  const image = document.createElement("img");
  image.className = "example-card-image";
  image.src = "./assets/images/thumbs/" + type + "-" + item.id + ".jpg";
  image.alt = "";
  image.loading = "lazy";
  // New pages may not have a thumbnail yet
  image.addEventListener("error", function () {
    image.remove();
  });

  const body = document.createElement("div");
  body.className = "example-card-body";

  const title = document.createElement("h3");
  title.className = "example-card-title";
  title.textContent = item.name;

  const text = document.createElement("p");
  text.className = "example-card-text";
  text.textContent = detail;

  body.appendChild(title);
  body.appendChild(text);
  card.appendChild(image);
  card.appendChild(body);
  return card;
}

const styleCards = document.getElementById("style-cards");
for (let index = 0; index < styles.length; index++) {
  styleCards.appendChild(buildCard("styles", styles[index], styles[index].description));
}
