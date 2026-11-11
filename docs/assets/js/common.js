// Fungsi bersama untuk halaman interaktif nlptoba.org.
(function () {
  var script = document.currentScript;
  // Akar situs dihitung dari lokasi berkas ini (assets/js/common.js),
  // sehingga tetap benar pada halaman Indonesia maupun Inggris.
  var root = new URL("../../", script.src);

  function dataUrl(name) {
    return new URL("assets/data/" + name, root).href;
  }

  function lang() {
    var l = (document.documentElement.lang || "id").toLowerCase();
    return l.indexOf("en") === 0 ? "en" : "id";
  }

  // Pengurai CSV sesuai RFC 4180: tanda kutip ganda, koma dan baris baru di dalam sel.
  function parseCsv(text) {
    if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
    var rows = [], row = [], cell = "", quoted = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (quoted) {
        if (c === '"') {
          if (text[i + 1] === '"') { cell += '"'; i++; }
          else quoted = false;
        } else cell += c;
      } else if (c === '"') quoted = true;
      else if (c === ",") { row.push(cell); cell = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(cell); rows.push(row); row = []; cell = "";
      } else cell += c;
    }
    if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
    var head = rows.shift();
    return rows.filter(function (r) { return r.length === head.length; }).map(function (r) {
      var o = {};
      head.forEach(function (h, k) { o[h] = r[k]; });
      return o;
    });
  }

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }

  // Aksesibilitas: area yang dapat digulir ke samping harus bisa dijangkau papan ketik,
  // dan kotak dialog pencarian milik tema perlu nama.
  var A = {
    id: { table: "Tabel {n}, dapat digulir ke samping", search: "Pencarian" },
    en: { table: "Table {n}, scrollable horizontally", search: "Search" }
  }[lang()];

  function markScrollable() {
    document.querySelectorAll(".md-typeset__scrollwrap").forEach(function (w, i) {
      if (w.scrollWidth > w.clientWidth + 1) {
        w.setAttribute("tabindex", "0");
        w.setAttribute("role", "region");
        // Nomor urut membuat setiap area bernama unik bagi pembaca layar.
        w.setAttribute("aria-label", A.table.replace("{n}", i + 1));
      } else {
        w.removeAttribute("tabindex");
        w.removeAttribute("role");
        w.removeAttribute("aria-label");
      }
    });
  }

  // Kotak "Versi data di situs ini" di halaman Kabar, dibaca dari sumber.json hasil build.
  function sumber() {
    var box = document.getElementById("nt-sumber");
    if (!box) return;
    var S = {
      id: { guide: "Versi pedoman", v2: "Commit batak-toba-corpus-v2", korpus: "Commit batak-toba-korpus",
            built: "Situs dibangun", fail: "Data versi tidak dapat dimuat." },
      en: { guide: "Guideline version", v2: "batak-toba-corpus-v2 commit", korpus: "batak-toba-korpus commit",
            built: "Site built", fail: "Version data could not be loaded." }
    }[lang()];
    fetch(dataUrl("sumber.json"))
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) {
        function commit(repo, sha) {
          return sha ? el("a", { href: "https://github.com/FeliksMakarios/" + repo + "/commit/" + sha },
            [el("code", { text: sha.slice(0, 7) })]) : el("span", { text: "-" });
        }
        var rows = [
          [S.guide, el("span", { text: d.versi_pedoman || "-" })],
          [S.v2, commit("batak-toba-corpus-v2", d["batak-toba-corpus-v2"])],
          [S.korpus, commit("batak-toba-korpus", d["batak-toba-korpus"])]
        ];
        if (d.tanggal_build) rows.push([S.built, el("span", { text: d.tanggal_build })]);
        box.appendChild(el("dl", { class: "nt-facts" }, [].concat.apply([], rows.map(function (r) {
          return [el("dt", { text: r[0] }), el("dd", {}, [r[1]])];
        }))));
      })
      .catch(function () { box.textContent = S.fail; });
  }

  // Peta jalan di layar sempit: tahun yang belum berjalan dilipat, dan tab tahun menjadi
  // tombol untuk membukanya. Di layar lebar semua tahun terbuka tanpa tombol.
  function roadmap() {
    var years = document.querySelectorAll(".nt-roadmap .nt-year");
    if (!years.length) return;
    var narrow = window.matchMedia("(max-width: 59.984375em)");
    function apply() {
      years.forEach(function (y, i) {
        var tab = y.querySelector(".nt-year-tab"), body = y.querySelector(".nt-year-body");
        var btn = tab.querySelector("button");
        if (narrow.matches && !btn) {
          body.id = body.id || "nt-tahun-" + (i + 1);
          btn = el("button", { type: "button", class: "nt-year-toggle", "aria-controls": body.id, text: tab.textContent });
          tab.textContent = "";
          tab.appendChild(btn);
          var open = y.classList.contains("is-current");
          btn.setAttribute("aria-expanded", String(open));
          y.classList.toggle("is-folded", !open);
          btn.addEventListener("click", function () {
            var now = btn.getAttribute("aria-expanded") !== "true";
            btn.setAttribute("aria-expanded", String(now));
            y.classList.toggle("is-folded", !now);
          });
        } else if (!narrow.matches && btn) {
          tab.textContent = btn.textContent;
          y.classList.remove("is-folded");
        }
      });
    }
    apply();
    if (narrow.addEventListener) narrow.addEventListener("change", apply);
  }

  function init() {
    sumber();
    roadmap();
    var search = document.querySelector(".md-search");
    if (search && !search.getAttribute("aria-label")) search.setAttribute("aria-label", A.search);
    markScrollable();
    var t;
    window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(markScrollable, 200); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.NlpToba = { dataUrl: dataUrl, lang: lang, parseCsv: parseCsv, el: el };
})();
