// Penampil pohon dependensi dari berkas CoNLL-U, digambar sebagai diagram busur SVG.
//
// Atribut pada <div class="conllu-tree">:
//   data-src       nama berkas di assets/data/ (wajib)
//   data-sentence  indeks kalimat (mulai 0). Bila ada, hanya kalimat itu yang
//                  digambar, tanpa pilihan kalimat, tabel, dan keterangan relasi.
(function () {
  var boxes = document.querySelectorAll(".conllu-tree[data-src]");
  if (!boxes.length) return;
  var T = window.NlpToba;
  var SVG = "http://www.w3.org/2000/svg";
  var L = {
    id: {
      pick: "Pilih kalimat", fail: "Data gagal dimuat.", table: "Lihat tabel CoNLL-U",
      loading: "Memuat data...", scroll: "Diagram pohon dependensi, dapat digulir ke samping",
      prev: "Sebelumnya", next: "Berikutnya", hint: "Geser ke samping untuk melihat seluruh pohon.",
      tap: "Sentuh atau pilih sebuah kata untuk menyorot relasinya.",
      rels: "Relasi dalam kalimat ini", download: "Unduh gambar (SVG)", word: "kata"
    },
    en: {
      pick: "Choose a sentence", fail: "Failed to load data.", table: "Show CoNLL-U table",
      loading: "Loading data...", scroll: "Dependency tree diagram, scrollable horizontally",
      prev: "Previous", next: "Next", hint: "Scroll sideways to see the whole tree.",
      tap: "Tap or select a word to highlight its relations.",
      rels: "Relations in this sentence", download: "Download image (SVG)", word: "word"
    }
  }[T.lang()];

  // Arti singkat relasi mengikuti Lampiran A pedoman anotasi.
  var REL = {
    root: ["akar kalimat", "root of the sentence"],
    nsubj: ["subjek nominal", "nominal subject"],
    csubj: ["subjek klausa", "clausal subject"],
    obj: ["objek verba aktif", "object of an active verb"],
    "obj:agent": ["aktor pasif tak bertanda", "unmarked passive actor"],
    obl: ["argumen atau keterangan bertanda", "marked argument or adjunct"],
    "obl:agent": ["aktor pasif bertanda ni", "passive actor marked by ni"],
    xcomp: ["pelengkap terkendali", "controlled complement"],
    ccomp: ["klausa pelengkap", "clausal complement"],
    advcl: ["klausa keterangan", "adverbial clause"],
    advmod: ["adverbia, negasi", "adverb, negation"],
    aux: ["auxiliari modal", "modal auxiliary"],
    discourse: ["partikel modal, interjeksi", "modal particle, interjection"],
    vocative: ["sapaan", "vocative"],
    fixed: ["ungkapan beku", "fixed expression"],
    punct: ["tanda baca", "punctuation"],
    amod: ["pewatas adjektiva", "adjectival modifier"],
    nummod: ["pewatas numeralia", "numeric modifier"],
    det: ["determiner", "determiner"],
    nmod: ["pewatas nomina", "nominal modifier"],
    "nmod:poss": ["pemilik dengan ni", "possessor with ni"],
    "acl:relcl": ["klausa relatif na", "relative clause with na"],
    "case": ["preposisi", "preposition"],
    mark: ["penanda klausa dan na", "clause marker and na"],
    cc: ["konektor koordinasi", "coordinating connector"],
    conj: ["unsur koordinasi", "conjunct"],
    parataxis: ["klausa berjajar", "parataxis"],
    flat: ["nama majemuk", "multiword name"],
    compound: ["nomina majemuk", "nominal compound"],
    appos: ["aposisi", "apposition"],
    goeswith: ["bagian kata terpisah", "part of a split word"],
    dep: ["tidak tergolongkan", "unspecified dependency"]
  };
  var LI = T.lang() === "en" ? 1 : 0;

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

  var uid = 0;

  function draw(sent) {
    var toks = sent.tokens;
    var ctx = document.createElement("canvas").getContext("2d");
    var family = getComputedStyle(document.body).fontFamily;
    ctx.font = "15px " + family;
    var gap = 22, pad = 16;
    var widths = toks.map(function (t) {
      return Math.max(ctx.measureText(t.form).width, ctx.measureText(t.upos).width * 0.9, 26);
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
    ctx.font = "600 12px " + family;
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
    var arrow = "dep-arrow-" + (++uid);

    var svg = svgEl("svg", {
      class: "dep-svg", width: width, height: height, viewBox: "0 0 " + width + " " + height,
      role: "group", "aria-label": sent.meta.text || ""
    });
    var defs = svgEl("defs", {});
    var marker = svgEl("marker", { id: arrow, viewBox: "0 0 10 10", refX: "5", refY: "9", markerWidth: "7", markerHeight: "7", orient: "auto" });
    marker.appendChild(svgEl("path", { d: "M0,0 L5,9 L10,0", class: "dep-head" }));
    defs.appendChild(marker);
    svg.appendChild(defs);

    arcs.forEach(function (a) {
      var head = a.t.head, dir = cx[head] < cx[a.t.id] ? 1 : -1;
      // Busur dari kata induk yang sama berangkat dari titik berbeda sesuai tingkatnya.
      var off = dir * Math.min(5 + (a.level - 1) * 4, Math.max(half[head] - 3, 5));
      var x1 = cx[head] + off, x2 = cx[a.t.id], y = base - 6, h = base - a.level * step;
      var d = "M" + x1 + "," + y + " C" + x1 + "," + h + " " + x2 + "," + h + " " + x2 + "," + (y - 4);
      var link = { "data-a": a.t.id, "data-h": head };
      svg.appendChild(svgEl("path", Object.assign({ d: d, class: "dep-arc", "marker-end": "url(#" + arrow + ")" }, link)));
      // Puncak kurva Bezier dengan kedua titik kendali setinggi h berada pada 3/4 jarak menuju h.
      var lx = (x1 + x2) / 2, ly = y + (h - y) * 0.75 - 4;
      svg.appendChild(svgEl("text", Object.assign({ x: lx, y: ly, class: "dep-label", "text-anchor": "middle" }, link), a.t.deprel));
    });

    toks.forEach(function (t) {
      if (t.head === "0") {
        var link = { "data-a": t.id, "data-h": "0" };
        svg.appendChild(svgEl("line", Object.assign({ x1: cx[t.id], y1: 8, x2: cx[t.id], y2: base - 10, class: "dep-arc", "marker-end": "url(#" + arrow + ")" }, link)));
        svg.appendChild(svgEl("text", Object.assign({ x: cx[t.id] + 6, y: 18, class: "dep-label" }, link), "root"));
      }
      var g = svgEl("g", {
        class: "dep-tok", "data-id": t.id, tabindex: "0", role: "button",
        "aria-label": t.form + ", " + t.upos + ", " + t.deprel
      });
      var w = half[t.id] * 2 + 8;
      g.appendChild(svgEl("rect", { x: cx[t.id] - w / 2, y: base - 2, width: w, height: 44, rx: 4, class: "dep-hit" }));
      g.appendChild(svgEl("text", { x: cx[t.id], y: base + 14, class: "dep-form", "text-anchor": "middle" }, t.form));
      g.appendChild(svgEl("text", { x: cx[t.id], y: base + 34, class: "dep-upos", "text-anchor": "middle" }, t.upos));
      svg.appendChild(g);
    });

    // Sorot relasi kata yang dipilih: busur masuk, busur keluar, dan kata di ujungnya.
    var current = null;
    function focus(id) {
      current = current === id ? null : id;
      svg.classList.toggle("is-focus", current !== null);
      svg.querySelectorAll("[data-a]").forEach(function (e) {
        var on = current !== null && (e.getAttribute("data-a") === current || e.getAttribute("data-h") === current);
        e.classList.toggle("is-on", on);
      });
      var near = {};
      if (current !== null) {
        near[current] = 1;
        svg.querySelectorAll(".dep-arc.is-on").forEach(function (e) {
          near[e.getAttribute("data-a")] = 1; near[e.getAttribute("data-h")] = 1;
        });
      }
      svg.querySelectorAll(".dep-tok").forEach(function (e) {
        e.classList.toggle("is-on", !!near[e.getAttribute("data-id")]);
        e.setAttribute("aria-pressed", e.getAttribute("data-id") === current ? "true" : "false");
      });
    }
    svg.querySelectorAll(".dep-tok").forEach(function (g) {
      g.addEventListener("click", function () { focus(g.getAttribute("data-id")); });
      g.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); focus(g.getAttribute("data-id")); }
        if (ev.key === "Escape" && current !== null) focus(current);
      });
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
      T.el("div", { class: "dep-table-wrap", tabindex: "0", role: "region", "aria-label": L.table }, [T.el("table", {}, [
        T.el("thead", {}, [T.el("tr", {}, cols.map(function (c) { return T.el("th", { text: c }); }))]),
        tbody
      ])])
    ]);
  }

  function legend(sent) {
    var seen = [];
    sent.tokens.forEach(function (t) { if (seen.indexOf(t.deprel) < 0) seen.push(t.deprel); });
    return T.el("div", { class: "dep-legend" }, [
      T.el("p", { class: "dep-legend-title", text: L.rels }),
      T.el("dl", {}, [].concat.apply([], seen.map(function (r) {
        var base = REL[r] ? r : r.split(":")[0];
        return [T.el("dt", {}, [T.el("code", { text: r })]), T.el("dd", { text: REL[base] ? REL[base][LI] : "" })];
      })))
    ]);
  }

  // Salin warna hasil CSS ke atribut agar berkas SVG terbaca di luar situs.
  function download(svg, name) {
    var copy = svg.cloneNode(true);
    var src = svg.querySelectorAll("*"), dst = copy.querySelectorAll("*");
    for (var i = 0; i < src.length; i++) {
      var cs = getComputedStyle(src[i]);
      dst[i].setAttribute("style", "fill:" + cs.fill + ";stroke:" + cs.stroke + ";stroke-width:" + cs.strokeWidth +
        ";opacity:" + cs.opacity + ";font:" + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily +
        ";paint-order:" + cs.paintOrder + ";stroke-linejoin:" + cs.strokeLinejoin + ";letter-spacing:" + cs.letterSpacing);
    }
    copy.querySelectorAll(".dep-hit").forEach(function (e) { e.remove(); });
    var bg = svgEl("rect", { width: "100%", height: "100%", fill: getComputedStyle(svg.parentNode).backgroundColor });
    copy.insertBefore(bg, copy.firstChild);
    copy.setAttribute("xmlns", SVG);
    var blob = new Blob([new XMLSerializer().serializeToString(copy)], { type: "image/svg+xml" });
    var a = T.el("a", { href: URL.createObjectURL(blob), download: name + ".svg" });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  function scrollHint(scroller, hint) {
    function check() { hint.hidden = scroller.scrollWidth <= scroller.clientWidth + 1; }
    check();
    window.addEventListener("resize", check);
  }

  boxes.forEach(function (box) {
    box.textContent = L.loading;
    fetch(T.dataUrl(box.getAttribute("data-src")))
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (text) {
        var sents = parse(text);
        box.textContent = "";

        var only = box.getAttribute("data-sentence");
        if (only !== null) {
          var s0 = sents[+only] || sents[0];
          box.appendChild(T.el("div", { class: "dep-scroll dep-scroll--plain", tabindex: "0", role: "region", "aria-label": L.scroll }, [draw(s0)]));
          return;
        }

        var sel = T.el("select", { "aria-label": L.pick });
        sents.forEach(function (s, i) {
          sel.appendChild(T.el("option", { value: String(i), text: s.meta.judul || s.meta.sent_id }));
        });
        var prev = T.el("button", { type: "button", class: "md-button", text: L.prev });
        var next = T.el("button", { type: "button", class: "md-button", text: L.next });
        var view = T.el("div", { class: "dep-view" });
        box.appendChild(T.el("div", { class: "dep-controls" }, [
          T.el("label", { class: "dep-pick" }, [T.el("span", { text: L.pick }), sel]),
          T.el("div", { class: "dep-nav" }, [prev, next])
        ]));
        box.appendChild(view);

        function show() {
          var i = +sel.value, s = sents[i];
          prev.disabled = i === 0;
          next.disabled = i === sents.length - 1;
          view.textContent = "";
          view.appendChild(T.el("p", { class: "dep-text", lang: "bbc", text: s.meta.text || "" }));
          if (s.meta.text_id) view.appendChild(T.el("p", { class: "dep-gloss", lang: "id", text: "‘" + s.meta.text_id + "’" }));
          var svg = draw(s);
          var scroller = T.el("div", { class: "dep-scroll", tabindex: "0", role: "region", "aria-label": L.scroll }, [svg]);
          var hint = T.el("p", { class: "dep-hint", text: L.hint });
          var dl = T.el("button", { type: "button", class: "md-button dep-download", text: L.download });
          dl.addEventListener("click", function () { download(svg, s.meta.sent_id || "pohon"); });
          view.appendChild(T.el("p", { class: "dep-tip", text: L.tap }));
          view.appendChild(scroller);
          view.appendChild(hint);
          view.appendChild(legend(s));
          view.appendChild(T.el("div", { class: "dep-actions" }, [dl]));
          view.appendChild(table(s));
          scrollHint(scroller, hint);
        }
        function go(d) { sel.value = String(+sel.value + d); show(); }
        sel.addEventListener("change", show);
        prev.addEventListener("click", function () { go(-1); });
        next.addEventListener("click", function () { go(1); });
        show();
      })
      .catch(function () { box.textContent = L.fail; });
  });
})();
