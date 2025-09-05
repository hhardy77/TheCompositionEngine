// @ts-check
import { EXCERPTS } from "./data.js";

const $ = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  const genreSet = new Set();
  const authorSet = new Set();
  const rawTagSet = new Set();

  EXCERPTS.forEach(item => {
    (item.genres || []).forEach(g => genreSet.add(g));
    authorSet.add(item.author);
    (item.tags || []).forEach(t => rawTagSet.add(t));
  });

  const genres  = Array.from(genreSet).sort((a, b) => a.localeCompare(b));
  const authors = Array.from(authorSet).sort((a, b) => a.localeCompare(b));
  const tags    = Array.from(rawTagSet).filter(
    t => !genreSet.has(t.toLowerCase())
  ).sort((a, b) => a.localeCompare(b));

  // Genres
  const genreList = $("genreList");
  if (genreList) {
    genreList.innerHTML = "";
    genres.forEach(g => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="index.html?genre=${encodeURIComponent(g)}">${g}</a>`;
      genreList.appendChild(li);
    });
  }

  // Authors
  const alphaBar = $("authorAlpha");
  const authorList = $("authorList");
  if (alphaBar && authorList) {
    /** @type {Record<string, string[]>} */
    const buckets = {};
    authors.forEach(name => {
      const L = (name?.[0] || "#").toUpperCase();
      (buckets[L] ||= []).push(name);
    });

    const letters = Object.keys(buckets).sort();

    alphaBar.innerHTML = "";
    letters.forEach(L => {
      const a = document.createElement("a");
      a.href = `#sec-${L}`;
      a.textContent = L;
      alphaBar.appendChild(a);
    });

    authorList.innerHTML = "";
    letters.forEach(L => {
      const anchor = document.createElement("li");
      anchor.id = `sec-${L}`;
      anchor.innerHTML = `<strong>${L}</strong>`;
      authorList.appendChild(anchor);

      buckets[L].sort((a, b) => a.localeCompare(b)).forEach(name => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="index.html?author=${encodeURIComponent(name)}">${name}</a>`;
        authorList.appendChild(li);
      });
    });
  }

  // Tags
  const tagList = $("tagList");
  if (tagList) {
    tagList.innerHTML = "";
    tags.forEach(t => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="index.html?tags=${encodeURIComponent(t)}">${t}</a>`;
      tagList.appendChild(li);
    });
  }

  // Combos (genres × common eras)
  const comboList = $("comboList");
  if (comboList) {
    comboList.innerHTML = "";
    const eras = ["19th-century", "20th-century", "21st-century"].filter(e =>
      rawTagSet.has(e)
    );
    genres.forEach(g => {
      eras.forEach(e => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="index.html?genre=${encodeURIComponent(
          g
        )}&tags=${encodeURIComponent(e)}">${g} + ${e}</a>`;
        comboList.appendChild(li);
      });
    });
  }
});
