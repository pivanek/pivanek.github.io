(() => {
  const D = window.PORTFOLIO;
  const VIEW_W = 1280; // šířka "monitoru", ve které se web v náhledu vykreslí
  const VIEW_H = 800;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  // Bez uložené volby podle preferovaných jazyků prohlížeče (stejný seznam,
  // ze kterého prohlížeč skládá hlavičku Accept-Language); první cs/sk/en vyhrává.
  function browserLang() {
    for (const l of navigator.languages?.length ? navigator.languages : [navigator.language || ""]) {
      if (/^(cs|sk)\b/i.test(l)) return "cs";
      if (/^en\b/i.test(l)) return "en";
    }
    return "en";
  }

  let lang = store.get("lang") || browserLang();

  // Texty, které se mění při přepnutí jazyka: [element, {cs, en} | klíč z ui]
  const bindings = [];
  const t = (v) => (v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.cs);
  const ui = (key) => D.ui[lang][key] ?? key;

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k === "text") bindings.push([node, v]);
      else if (k === "uiText") bindings.push([node, { ui: v }]);
      else node.setAttribute(k, v);
    }
    node.append(...children.filter(Boolean));
    return node;
  }

  function applyLang() {
    document.documentElement.lang = lang;
    for (const [node, v] of bindings) node.textContent = v.ui ? ui(v.ui) : t(v);
    document.querySelectorAll("[data-i18n]").forEach((n) => (n.textContent = ui(n.dataset.i18n)));
    document.querySelectorAll("[data-i18n-label]").forEach((n) => {
      n.setAttribute("aria-label", ui(n.dataset.i18nLabel));
      n.title = ui(n.dataset.i18nLabel);
    });
  }

  const hostOf = (url) => new URL(url).hostname.replace(/^www\./, "");

  function tagList(tags) {
    if (!tags?.length) return null;
    return el("ul", { class: "tags" }, ...tags.map((tag) => el("li", {}, tag)));
  }

  // ---- Weby: živý náhled v iframe ----
  const WRENCH_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>';

  function siteTile(site) {
    const host = hostOf(site.url);
    const view = el("div", { class: "site__view" });

    if (site.embed === false) {
      view.classList.add("site__view--blocked");
      view.append(el("span", { class: "site__host mono" }, host), el("span", { uiText: "noEmbed" }));
    } else {
      const frame = el("iframe", {
        src: site.url,
        title: host,
        loading: "lazy",
        tabindex: "-1",
        "aria-hidden": "true",
        scrolling: "no",
        referrerpolicy: "no-referrer",
        sandbox: "allow-scripts allow-same-origin",
        width: VIEW_W,
        height: VIEW_H,
      });
      frame.addEventListener("load", () => view.classList.add("is-loaded"));
      view.append(el("div", { class: "site__loader" }), frame);
      scaler.observe(view);
    }

    if (site.wip) {
      const badge = el("span", { class: "site__wip" }, el("span", { uiText: "wip" }));
      badge.insertAdjacentHTML("afterbegin", WRENCH_SVG);
      view.append(badge);
    }

    return el("article", { class: "site" },
      el("a", { class: "site__frame", href: site.url, target: "_blank", rel: "noopener" },
        el("div", { class: "site__bar" },
          el("span", { class: "dots" }, el("i"), el("i"), el("i")),
          el("span", { class: "site__url mono" }, host),
          el("span", { class: "site__open", uiText: "openSite" }),
        ),
        view,
      ),
      el("div", { class: "site__body" },
        el("h3", { text: site.title }),
        el("p", { text: site.desc }),
        tagList(site.tags),
      ),
    );
  }

  // iframe má pevnou velikost VIEW_W × VIEW_H a zmenší se na šířku dlaždice
  const scaler = new ResizeObserver((entries) => {
    for (const { target, contentRect } of entries) {
      target.style.setProperty("--scale", contentRect.width / VIEW_W);
    }
  });

  // ---- Ostatní projekty ----
  const statusKey = { dev: "statusDev", done: "statusDone", planned: "statusPlanned" };

  function terminal(lines, title) {
    const pre = el("pre", { class: "term__body mono" });
    for (const line of lines || []) {
      const isCmd = line.startsWith("$ ");
      pre.append(isCmd
        ? el("span", { class: "term__cmd" }, el("span", { class: "term__prompt" }, "$ "), line.slice(2))
        : el("span", { class: "term__out" }, line));
      pre.append("\n");
    }
    return el("div", { class: "term", "aria-hidden": "true" },
      el("div", { class: "term__bar" }, el("span", { class: "dots" }, el("i"), el("i"), el("i")), el("span", { class: "mono", text: title })),
      pre,
    );
  }

  function projectCard(p) {
    const highlights = p.highlights
      ? el("ul", { class: "proj__highlights" }, ...p.highlights.cs.map((_, i) =>
          el("li", { text: { cs: p.highlights.cs[i], en: p.highlights.en[i] } })))
      : null;
    const links = p.links?.length
      ? el("div", { class: "proj__links" }, ...p.links.map((l) =>
          el("a", { class: "btn btn--small", href: l.url, target: "_blank", rel: "noopener", text: l.label })))
      : null;

    return el("article", { class: `proj${p.featured ? " proj--featured" : ""}` },
      terminal(p.terminal, p.title),
      el("div", { class: "proj__body" },
        el("div", { class: "proj__meta" },
          el("span", { class: "proj__kind mono", text: p.kind }),
          el("span", { class: `status status--${p.status}`, uiText: statusKey[p.status] }),
        ),
        el("h3", { text: p.title }),
        el("p", { text: p.desc }),
        highlights,
        tagList(p.tags),
        links,
      ),
    );
  }

  // ---- Dovednosti ----
  function skillGroup(g) {
    return el("div", { class: "skills__group" },
      el("h3", { class: "mono", text: g.group }),
      el("ul", { class: "chips" }, ...g.items.map((s) =>
        el("li", { class: `chip${s.level ? ` chip--${s.level}` : ""}`, text: s.name }))),
    );
  }

  // ---- Sestavení stránky ----
  document.getElementById("sites").append(...D.websites.map(siteTile));
  document.getElementById("project-list").append(...D.projects.map(projectCard));
  document.getElementById("skill-list").append(...D.skills.map(skillGroup));

  const email = document.getElementById("email-link");
  email.href = `mailto:${D.email}`;
  email.textContent = D.email;
  document.getElementById("github-link").href = D.github;
  const cv = document.getElementById("cv-link");
  if (D.cv) cv.href = D.cv; else cv.hidden = true;
  document.getElementById("year").textContent = new Date().getFullYear();

  applyLang();

  document.getElementById("lang-toggle").addEventListener("click", () => {
    lang = lang === "cs" ? "en" : "cs";
    store.set("lang", lang);
    applyLang();
  });

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const root = document.documentElement;
    const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    root.dataset.theme = current === "dark" ? "light" : "dark";
    store.set("theme", root.dataset.theme);
  });
})();
