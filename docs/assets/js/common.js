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

  window.NlpToba = { dataUrl: dataUrl, lang: lang, parseCsv: parseCsv, el: el };
})();
