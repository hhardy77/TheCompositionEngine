import { EXCERPTS } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const indexContainer = document.getElementById("index");
  const resultsContainer = document.getElementById("results");
  const params = new URLSearchParams(window.location.search);
  const tag = params.get("tag");

  const tags = [...new Set(EXCERPTS.flatMap(e => e.tags))].sort();
  indexContainer.innerHTML =
    `<ul>` +
    tags.map(t => `<li><a href="tags.html?tag=${encodeURIComponent(t)}">${t}</a></li>`).join("") +
    `</ul>`;

  function renderExcerpts(excerpts) {
    resultsContainer.innerHTML = "";
    if (!excerpts.length) {
      resultsContainer.innerHTML = "<p class='muted'>No excerpts for this tag.</p>";
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

  if (tag) {
    const filtered = EXCERPTS.filter(e =>
      e.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
    );
    renderExcerpts(filtered);
  }
});
