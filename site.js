(function () {
  "use strict";

  var catalog = window.ChannelCrateCatalog || {};
  var plugins = catalog.marketplacePluginDefs || catalog.pluginDefs || [];
  var themes = catalog.marketplaceThemeDefs || catalog.themeDefs || [];
  var installedPluginIds = catalog.installedPluginIds || (catalog.pluginDefs || []).map(function (plugin) { return plugin.id; });
  var installedThemeIds = catalog.installedThemeIds || (catalog.themeDefs || []).map(function (theme) { return theme.id; });
  var crateTypes = catalog.crateTypes || [];
  var activeFilter = "all";
  var search = "";

  var themePalettes = {
    classic: ["#8bd35f", "#c8f36c", "#f2b84b", "#73d6d2", "#e16aa9"],
    neon: ["#50e36f", "#e4ff5f", "#ff9f4c", "#57e5ff", "#ff74d1"],
    ice: ["#a9e0ff", "#dff8ff", "#6fc8ff", "#f1c76a", "#ff86b2"],
    amber: ["#d7d36a", "#ffe06a", "#ffb347", "#ff7a3d", "#82dac7"],
    midnight: ["#77d887", "#bbef68", "#f7c15d", "#67d9ff", "#d68cff"],
    citrus: ["#9ce15c", "#eaff61", "#ffd052", "#ff9255", "#67d8c1"],
    graphite: ["#89d68b", "#d6ed78", "#eec56f", "#86d6dc", "#98b6ee"],
    arcade: ["#71ff93", "#e9ff65", "#ffc857", "#54ebff", "#ff6bce"],
    candy: ["#9ee78c", "#e2f875", "#ffd07f", "#8de8ef", "#ff8ad1"],
    matrix: ["#5cff79", "#caff6a", "#d7c75a", "#70e2a8", "#7da8e8"],
    sunset: ["#b8db72", "#f2ef6e", "#ffc15a", "#ff765b", "#75d5d1"],
    ocean: ["#7fe1b5", "#d2f47b", "#f2cb68", "#63e3f2", "#7bb5ff"],
    berry: ["#8ee087", "#ddef78", "#f1c56a", "#f07bc6", "#9c9cff"],
    vapor: ["#80f0b0", "#dffb75", "#ffd166", "#75e4ff", "#ff7bd5"],
    terminal: ["#72e087", "#bdf26d", "#cfc66a", "#78d8c3", "#8da7d8"],
    blueprint: ["#8ce0a0", "#d6ee7b", "#e9c96d", "#77ddf7", "#7fb8ff"],
    blossom: ["#9be18b", "#e7ef81", "#f5ca75", "#f69bbe", "#99b8ff"],
    lava: ["#bacf67", "#f2de64", "#ffba4e", "#ff6b42", "#7bd0c8"],
    frost: ["#9ee8b5", "#e7f79b", "#f2d27c", "#9aebf5", "#a8c7ff"],
    mint: ["#8df0a5", "#d8f779", "#f0cf70", "#81e8d7", "#93b6f5"],
    ultraviolet: ["#8fe38f", "#dff26c", "#f8c564", "#7cddf5", "#d985ff"],
    noir: ["#8ad47e", "#cfe875", "#e8c36d", "#80d2d0", "#90aee8"],
    solar: ["#a9db68", "#f0ef68", "#ffc85b", "#7dd7c7", "#86a9ef"],
    lagoon: ["#82e39e", "#d8f578", "#efca68", "#5be5dd", "#77b2f4"],
    rosewire: ["#93df88", "#dfee72", "#f4c467", "#83dae1", "#ff82b8"],
    cockpit: ["#8de077", "#d7f26f", "#f3cf5e", "#73dde7", "#7fa9f5"],
    chrome: ["#8dd994", "#d6ef78", "#ecc56d", "#8bdce4", "#9bb9f4"],
    plasma: ["#85ed99", "#e5fb67", "#ffc95a", "#71e7ff", "#ff74d0"],
    mono: ["#91d691", "#d8ea81", "#d8c27b", "#91d7cf", "#a4b3d6"],
    cratewood: ["#9ed077", "#dce46f", "#f0b85d", "#78cfc4", "#829fe4"]
  };

  var els = {
    marketGrid: document.getElementById("marketGrid"),
    crateGrid: document.getElementById("crateGrid"),
    search: document.getElementById("marketSearch"),
    pluginCount: document.getElementById("pluginCount"),
    themeCount: document.getElementById("themeCount")
  };

  if (els.pluginCount) els.pluginCount.textContent = String(plugins.length);
  if (els.themeCount) els.themeCount.textContent = String(themes.length);

  document.querySelectorAll("[data-market-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      activeFilter = button.getAttribute("data-market-filter") || "all";
      document.querySelectorAll("[data-market-filter]").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      renderMarket();
    });
  });

  if (els.search) {
    els.search.addEventListener("input", function () {
      search = els.search.value.trim().toLowerCase();
      renderMarket();
    });
  }

  function renderMarket() {
    if (!els.marketGrid) return;
    var rows = [];
    if (activeFilter === "all" || activeFilter === "plugin") {
      plugins.forEach(function (plugin) {
        var included = installedPluginIds.indexOf(plugin.id) >= 0;
        rows.push({
          type: "plugin",
          title: plugin.name,
          tag: included ? "Included" : "Free add-on",
          detail: (plugin.category || "Plugin") + " / " + plugin.short + " engine: " + (plugin.engine || plugin.id),
          sort: plugin.name
        });
      });
    }
    if (activeFilter === "all" || activeFilter === "theme") {
      themes.forEach(function (theme) {
        var included = installedThemeIds.indexOf(theme.id) >= 0;
        rows.push({
          type: "theme",
          id: theme.id,
          title: theme.name,
          tag: included ? "Included" : "Store theme",
          detail: included ? "Ships with the app" : "Installed from Crate Market",
          sort: theme.name
        });
      });
    }
    rows = rows.filter(function (row) {
      if (!search) return true;
      return [row.title, row.tag, row.detail].join(" ").toLowerCase().indexOf(search) !== -1;
    }).sort(function (a, b) {
      return a.sort.localeCompare(b.sort);
    });
    els.marketGrid.innerHTML = rows.map(renderMarketCard).join("");
  }

  function renderMarketCard(row) {
    var swatch = "";
    if (row.type === "theme") {
      var colors = themePalettes[row.id] || themePalettes.classic;
      swatch = '<div class="theme-swatch" aria-hidden="true">' + colors.map(function (color) {
        return '<span style="background:' + escapeHtml(color) + '"></span>';
      }).join("") + "</div>";
    }
    return [
      '<article class="market-card ' + escapeHtml(row.type) + '">',
      "<header>",
      "<strong>" + escapeHtml(row.title) + "</strong>",
      '<span class="tag">' + escapeHtml(row.type) + "</span>",
      "</header>",
      "<small>" + escapeHtml(row.detail) + "</small>",
      swatch || '<span class="tag">' + escapeHtml(row.tag) + "</span>",
      "</article>"
    ].join("");
  }

  function renderCrates() {
    if (!els.crateGrid) return;
    els.crateGrid.innerHTML = crateTypes.map(function (type) {
      return [
        '<article class="crate-card ' + (type.exportable === false ? "not-exportable" : "") + '">',
        '<img src="' + escapeHtml(type.icon) + '" alt="">',
        "<strong>" + escapeHtml(type.label) + "</strong>",
        "<small>" + escapeHtml(type.detail) + "</small>",
        '<span class="tag">' + (type.exportable === false ? "Store only" : "Exportable") + "</span>",
        "</article>"
      ].join("");
    }).join("");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char];
    });
  }

  renderMarket();
  renderCrates();
})();
