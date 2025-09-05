import { EXCERPTS } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const indexContainer = document.getElementById("index");
  const resultsContainer = document.getElementById("results");
  const params = new URLSearchParams(window.location.search);
  const genre = params.get("genre");

  const genres = [...new Set(EXCERPTS.flatMap(e => e.genres))].sort();
  indexContainer.innerHTML =
    `<ul>` +
    genres.map(g => `<li><a href="genres.html?genre=${encodeURIComponent(g)}">${g}</a></li>`).join("") +
    `</ul>`;

  function renderExcerpts(excerpts) {
    resultsContainer.innerHTML = "";
    if (!excerpts.length) {
      resultsContainer.innerHTML = "<p class='muted'>No excerpts in this genre.</p>";
      return;
    }
    excerpts.forEach(excerpt => {
      const div = document.createElement("div");
      div.classList.add("excerpt");
      div.innerHTML = `
        <h2>
          <a href="authors.html?author=${encodeURIComponent(excerpt.author)}">${excerpt.title}</a> –
          <a href="authors.html?author=${encodeURIComponent(excerpt.author)}">${excerpt.author}</a>
        </h2>
        <p>${excerpt.text}</p>
        <div class="tags">
          ${excerpt.genres.map(g => `<a class="tag" href="genres.html?genre=${encodeURIComponent(g)}">${g}</a>`).join(" ")}
          ${excerpt.tags.map(t => `<a class="tag" href="tags.html?tag=${encodeURIComponent(t)}">${t}</a>`).join(" ")}
          <a class="tag" href="regions.html?region=${encodeURIComponent(excerpt.region)}">${excerpt.region}</a>
          <span class="links">
            ${
              excerpt.freeLink
                ? `<a href="${excerpt.freeLink}" target="_blank">Read Free Online</a>`
                : `<a href="${excerpt.paidLink}" target="_blank">Purchase Online</a>`
            }
          </span>
        </div>
      `;
      resultsContainer.appendChild(div);
    });
  }

  if (genre) {
    const filtered = EXCERPTS.filter(e =>
      e.genres.map(g => g.toLowerCase()).includes(genre.toLowerCase())
    );
    renderExcerpts(filtered);
  }
});
