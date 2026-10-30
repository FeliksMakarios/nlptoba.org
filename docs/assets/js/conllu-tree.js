// Penampil pohon dependensi dari berkas CoNLL-U, digambar sebagai diagram busur SVG.
(function () {
  var boxes = document.querySelectorAll(".conllu-tree[data-src]");
  if (!boxes.length) return;
  var T = window.NlpToba;
  var SVG = "http://www.w3.org/2000/svg";
  var L = {
    id: { pick: "Pilih kalimat", fail: "Data gagal dimuat.", table: "Lihat tabel CoNLL-U", loading: "Memuat data..." },
    en: { pick: "Choose a sentence", fail: "Failed to load data.", table: "Show CoNLL-U table", loading: "Loading data..." }
  }[T.lang()];

  function parse(text) {
    var out = [], cur = null;
    text.split(/\r?\n/).forEach(function (line) {
      if (!line.trim()) { if (cur && cur.tokens.length) out.push(cur); cur = null; return; }
      cur = cur || { meta: {}, tokens: [] };
      if (line[0] === "#") {
        var m = line.match(/^#\s*([^=]+?)\s*=\s*(.*)$/);
        if (m) cur.meta[m[1]] = m[2];
        return;
      }
      var c = line.split("\t");
      if (!/^\d+$/.test(c[0])) return; // lewati token rentang dan simpul kosong
      cur.tokens.push({ id: +c[0], form: c[1], lemma: c[2], upos: c[3], feats: c[5], head: c[6], deprel: c[7], misc: c[9] });
    });
    if (cur && cur.tokens.length) out.push(cur);
    return out;
  }

  function svgEl(tag, attrs, text) {
    var e = document.createElementNS(SVG, tag);
    Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    return e;
  }

  function draw(sent) {
    var toks = sent.tokens;
    var ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "15px " + getComputedStyle(document.body).fontFamily;
    var gap = 22, pad = 16;
    var widths = toks.map(function (t) {
      return Math.max(ctx.measureText(t.form).width, ctx.measureText(t.upos).width * 0.85, 26);
    });
    // gaps[i] adalah jarak antara token ke-i dan token ke-(i+1).
    var gaps = toks.map(function () { return gap; });

    // Tingkat busur: busur yang lebih panjang ditempatkan di atas busur yang dikandungnya.
    var arcs = toks.filter(function (t) { return /^\d+$/.test(t.head) && +t.head > 0; })
      .map(function (t) { var a = +t.head, b = t.id; return { t: t, lo: Math.min(a, b), hi: Math.max(a, b), level: 1 }; })
      .sort(function (p, q) { return (p.hi - p.lo) - (q.hi - q.lo); });
    arcs.forEach(function (a, i) {
      for (var j = 0; j < i; j++) {
        var b = arcs[j];
        if (b.lo >= a.lo && b.hi <= a.hi) a.level = Math.max(a.level, b.level + 1);
      }
    });

    // Lebarkan jarak antartoken bila label relasi tidak muat di antara kedua ujung busur.
    ctx.font = "600 12px " + getComputedStyle(document.body).fontFamily;
    arcs.forEach(function (a) {
      var lo = a.lo - 1, hi = a.hi - 1, span = 0;
      for (var i = lo; i < hi; i++) span += gaps[i] + (i > lo ? widths[i] : widths[i] / 2);
      span += widths[hi] / 2;
      var need = ctx.measureText(a.t.deprel).width + 14 - span;
      if (need > 0) for (var k = lo; k < hi; k++) gaps[k] += need / (hi - lo);
    });

    var x = pad, cx = {};
    toks.forEach(function (t, i) {
      cx[t.id] = x + widths[i] / 2;
      x += widths[i] + gaps[i];
    });
    var width = x - gaps[toks.length - 1] + pad;
    var half = {};
    toks.forEach(function (t, i) { half[t.id] = widths[i] / 2; });

    var maxLevel = arcs.reduce(function (m, a) { return Math.max(m, a.level); }, 0);
    var step = 30, top = 28, base = top + (maxLevel + 1) * step;
    var height = base + 46;

    var svg = svgEl("svg", {
      class: "dep-svg", width: width, height: height, viewBox: "0 0 " + width + " " + height,
      role: "img", "aria-label": sent.meta.text || ""
    });
    var defs = svgEl("defs", {});
    var marker = svgEl("marker", { id: "dep-arrow", viewBox: "0 0 10 10", refX: "5", refY: "9", markerWidth: "7", markerHeight: "7", orient: "auto" });
    marker.appendChild(svgEl("path", { d: "M0,0 L5,9 L10,0", class: "dep-head" }));
    defs.appendChild(marker);
    svg.appendChild(defs);

    arcs.forEach(function (a) {
      var head = a.t.head, dir = cx[head] < cx[a.t.id] ? 1 : -1;
      // Busur dari kata induk yang sama berangkat dari titik berbeda sesuai tingkatnya.
      var off = dir * Math.min(5 + (a.level - 1) * 4, Math.max(half[head] - 3, 5));
      var x1 = cx[head] + off, x2 = cx[a.t.id], y = base - 6, h = base - a.level * step;
      var d = "M" + x1 + "," + y + " C" + x1 + "," + h + " " + x2 + "," + h + " " + x2 + "," + (y - 4);
      svg.appendChild(svgEl("path", { d: d, class: "dep-arc", "marker-end": "url(#dep-arrow)" }));
      // Puncak kurva Bezier dengan kedua titik kendali setinggi h berada pada 3/4 jarak menuju h.
      var lx = (x1 + x2) / 2, ly = y + (h - y) * 0.75 - 4;
      svg.appendChild(svgEl("text", { x: lx, y: ly, class: "dep-label", "text-anchor": "middle" }, a.t.deprel));
    });

    toks.forEach(function (t) {
      if (t.head === "0") {
        svg.appendChild(svgEl("line", { x1: cx[t.id], y1: 8, x2: cx[t.id], y2: base - 10, class: "dep-arc", "marker-end": "url(#dep-arrow)" }));
        svg.appendChild(svgEl("text", { x: cx[t.id] + 6, y: 18, class: "dep-label" }, "root"));
      }
      svg.appendChild(svgEl("text", { x: cx[t.id], y: base + 14, class: "dep-form", "text-anchor": "middle" }, t.form));
      svg.appendChild(svgEl("text", { x: cx[t.id], y: base + 34, class: "dep-upos", "text-anchor": "middle" }, t.upos));
    });
    return svg;
  }

  function table(sent) {
    var cols = ["ID", "FORM", "LEMMA", "UPOS", "FEATS", "HEAD", "DEPREL", "MISC"];
    var keys = ["id", "form", "lemma", "upos", "feats", "head", "deprel", "misc"];
    var tbody = T.el("tbody", {}, sent.tokens.map(function (t) {
      return T.el("tr", {}, keys.map(function (k) { return T.el("td", { text: String(t[k]) }); }));
    }));
    return T.el("details", { class: "dep-table" }, [
      T.el("summary", { text: L.table }),
      T.el("div", { class: "dep-table-wrap" }, [T.el("table", {}, [
        T.el("thead", {}, [T.el("tr", {}, cols.map(function (c) { return T.el("th", { text: c }); }))]),
        tbody
      ])])
    ]);
  }

  boxes.forEach(function (box) {
    box.textContent = L.loading;
    fetch(T.dataUrl(box.getAttribute("data-src")))
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (text) {
        var sents = parse(text);
        box.textContent = "";
        var sel = T.el("select", { "aria-label": L.pick });
        sents.forEach(function (s, i) {
          sel.appendChild(T.el("option", { value: String(i), text: s.meta.judul || s.meta.sent_id }));
        });
        var view = T.el("div", { class: "dep-view" });
        box.appendChild(T.el("label", { class: "dep-pick" }, [T.el("span", { text: L.pick }), sel]));
        box.appendChild(view);
        function show() {
          var s = sents[+sel.value];
          view.textContent = "";
          view.appendChild(T.el("p", { class: "dep-text", lang: "bbc", text: s.meta.text || "" }));
          if (s.meta.text_id) view.appendChild(T.el("p", { class: "dep-gloss", lang: "id", text: "‘" + s.meta.text_id + "’" }));
          view.appendChild(T.el("div", { class: "dep-scroll" }, [draw(s)]));
          view.appendChild(table(s));
        }
        sel.addEventListener("change", show);
        show();
      })
      .catch(function () { box.textContent = L.fail; });
  });
})();
