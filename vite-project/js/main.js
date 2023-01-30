import "/style.css";
import { Dom } from "./dom.js";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    if (response.status < 200 || response.status > 299) {
      throw new error(response);
    } else {
      const data = await response.json();

      Dom.container.insertAdjacentHTML(
        "afterbegin",
        `  <div class="card">
     <h2 class="name">${
       data.name.charAt(0).toUpperCase() + data.name.slice(1)
     }</h2>
     <img src="${data.sprites.front_default}" alt="Front of ${
          data.name
        }" class="image">
       <h3 class="list">Pokemon Type:</h3>
       <ul class="types"></ul>
    </div>`
      );
      data.types.forEach((t) =>
        document
          .querySelector(".types")
          .insertAdjacentHTML(
            "afterbegin",
            `<li class="list-item">${
              t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
            }</li>`
          )
      );
    }
  } catch (error) {
    console.log(error);
    Dom.container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="error">Sorry, please try again</h1>`
    );
  }
}
function clear() {
  Dom.name.value = "";
  Dom.container.innerHTML = "";
}
Dom.form.addEventListener("submit", function () {
  event.preventDefault();
  let pokemon = Dom.name.value.toLowerCase();
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  getData(URL);
  clear();
});
