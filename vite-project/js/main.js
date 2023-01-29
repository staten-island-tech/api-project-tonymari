import "/style.css";
import { DOM } from "../js/DOMSelectors.js";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    if (response.status < 200 || response.status > 299) {
      throw new error(response);
    } else {
      const data = await response.json();

      DOM.container.insertAdjacentHTML(
        "afterbegin",
        `  <div class="card">
      <h2 class="name">${
        data.name.charAt(0).toUpperCase() + data.name.slice(1)
      }</h2>
      <img src="${data.sprites.front_default}" alt="Front of ${
          data.name
        }" class="image">
      <h3 class="list">Abilities</h3>
      <ul class="abilities"></ul>
      <h3 class="list">Type(s)</h3>
      <ul class="types"></ul>
    </div>`
      );
      data.abilities.forEach((a) =>
        document
          .querySelector(".abilities")
          .insertAdjacentHTML(
            "afterbegin",
            `<li class="list-item">${
              a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)
            }</li>`
          )
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
    DOM.container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="error">(._.) ermm what the heck</h1>`
    );
  }
}

function clear() {
  DOM.name.value = "";
  DOM.container.innerHTML = "";
}

DOM.form.addEventListener("submit", function () {
  event.preventDefault();
  let pokemon = DOM.name.value.toLowerCase();
  const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  getData(URL);
  clear();
});
