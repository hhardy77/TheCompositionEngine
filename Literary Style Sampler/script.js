import { EXCERPTS } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const clearButton = document.getElementById("clearButton");
  const resultsContainer = document.getElementById("results");

  function renderExcerpts(excerpts) {
    resultsContainer.innerHTML = "";
    if (!excerpts.length) {
      resultsContainer.innerHTML = "<p class='muted'>No excerpts match your search.</p>";
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

  function searchExcerpts(query) {
    const lower = query.toLowerCase();
    return EXCERPTS.filter(e =>
      e.title.toLowerCase().includes(lower) ||
      e.author.toLowerCase().includes(lower) ||
      e.text.toLowerCase().includes(lower) ||
      e.genres.some(g => g.toLowerCase().includes(lower)) ||
      e.tags.some(t => t.toLowerCase().includes(lower)) ||
      e.region.toLowerCase().includes(lower)
    );
  }

  searchButton.addEventListener("click", () => {
    // @ts-ignore
    const query = searchInput.value.trim();
    if (query) {
      const filtered = searchExcerpts(query);
      renderExcerpts(filtered);
    }
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      // @ts-ignore
      const query = searchInput.value.trim();
      if (query) {
        const filtered = searchExcerpts(query);
        renderExcerpts(filtered);
      }
    }
  });

  clearButton.addEventListener("click", () => {
    // @ts-ignore
    searchInput.value = "";
    resultsContainer.innerHTML = "";
  });
});
