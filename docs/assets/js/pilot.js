// Penjelajah 250 kalimat pilot anotasi UD.
(function () {
  var box = document.getElementById("pilot-explorer");
  if (!box) return;
  var T = window.NlpToba;
  var PER_PAGE = 25;
  var L = {
    id: {
      genre: "Genre", batch: "Batch", cons: "Konstruksi", search: "Cari kata",
      all: "Semua", shown: "kalimat cocok dari", toba: "Batak Toba",
      trans: "Terjemahan Indonesia", words: "Kata", loading: "Memuat data...",
      fail: "Data gagal dimuat.", sentences: "Kalimat", docs: "Dokumen",
      total: "Total", dist: "Sebaran per genre", reset: "Atur ulang",
      prev: "Sebelumnya", next: "Berikutnya", page: "Halaman", of: "dari",
      none: "Tidak ada kalimat yang cocok. Coba kurangi filter.",
      pager: "Navigasi halaman kalimat"
    },
    en: {
      genre: "Genre", batch: "Batch", cons: "Construction", search: "Search",
      all: "All", shown: "matching sentences out of", toba: "Batak Toba",
      trans: "Indonesian translation", words: "Words", loading: "Loading data...",
      fail: "Failed to load data.", sentences: "Sentences", docs: "Documents",
      total: "Total", dist: "Distribution by genre", reset: "Reset",
      prev: "Previous", next: "Next", page: "Page", of: "of",
      none: "No sentences match. Try removing a filter.",
      pager: "Sentence pages"
    }
  }[T.lang()];

  box.textContent = L.loading;

  fetch(T.dataUrl("kalimat-pilot.csv"))
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(function (text) { render(T.parseCsv(text)); })
    .catch(function () { box.textContent = L.fail; });

  function uniq(list) {
    return list.filter(function (v, i) { return v && list.indexOf(v) === i; }).sort();
  }

  function select(label, values) {
    var s = T.el("select", { "aria-label": label });
    s.appendChild(T.el("option", { value: "", text: L.all }));
    values.forEach(function (v) { s.appendChild(T.el("option", { value: v, text: v })); });
    return T.el("label", {}, [T.el("span", { text: label }), s]);
  }

  // Teks dengan kata yang dicari ditandai <mark>, tanpa innerHTML.
  function highlighted(tag, attrs, text, q) {
    var e = T.el(tag, attrs);
    if (!q) { e.textContent = text; return e; }
    var low = text.toLowerCase(), i = 0, j;
    while ((j = low.indexOf(q, i)) >= 0) {
      if (j > i) e.appendChild(document.createTextNode(text.slice(i, j)));
      e.appendChild(T.el("mark", { text: text.slice(j, j + q.length) }));
      i = j + q.length;
    }
    if (i < text.length) e.appendChild(document.createTextNode(text.slice(i)));
    return e;
  }

  function distribution(rows) {
    var by = {};
    rows.forEach(function (r) {
      var g = by[r.genre] = by[r.genre] || { n: 0, docs: {} };
      g.n++; g.docs[r.doc_id] = 1;
    });
    var tbody = T.el("tbody");
    var allDocs = {};
    Object.keys(by).sort().forEach(function (g) {
      Object.keys(by[g].docs).forEach(function (d) { allDocs[d] = 1; });
      tbody.appendChild(T.el("tr", {}, [
        T.el("td", { text: g }),
        T.el("td", { text: String(by[g].n) }),
        T.el("td", { text: String(Object.keys(by[g].docs).length) })
      ]));
    });
    tbody.appendChild(T.el("tr", { class: "total" }, [
      T.el("td", { text: L.total }),
      T.el("td", { text: String(rows.length) }),
      T.el("td", { text: String(Object.keys(allDocs).length) })
    ]));
    return T.el("details", { class: "pilot-dist" }, [
      T.el("summary", { text: L.dist }),
      T.el("table", {}, [
        T.el("thead", {}, [T.el("tr", {}, [
          T.el("th", { text: L.genre }), T.el("th", { text: L.sentences }), T.el("th", { text: L.docs })
        ])]),
        tbody
      ])
    ]);
  }

  function render(rows) {
    box.textContent = "";
    // Data pilot masih memakai label lama "Historical/ Traditional". Spasi setelah
    // garis miring dirapikan agar sama dengan label di halaman korpus.
    rows.forEach(function (r) { r.genre = r.genre.replace(/\s*\/\s*/g, "/"); });
    var cons = [];
    rows.forEach(function (r) { cons = cons.concat(r.indikasi_konstruksi.split(", ")); });

    var fGenre = select(L.genre, uniq(rows.map(function (r) { return r.genre; })));
    var fBatch = select(L.batch, uniq(rows.map(function (r) { return r.batch; })));
    var fCons = select(L.cons, uniq(cons));
    var fText = T.el("label", {}, [
      T.el("span", { text: L.search }),
      T.el("input", { type: "search", "aria-label": L.search })
    ]);
    var sg = fGenre.querySelector("select"), sb = fBatch.querySelector("select");
    var sc = fCons.querySelector("select"), qi = fText.querySelector("input");
    var reset = T.el("button", { type: "button", class: "md-button pilot-reset", text: L.reset });
    var count = T.el("p", { class: "pilot-count", "aria-live": "polite" });
    var list = T.el("div", { class: "pilot-list" });
    var pager = T.el("nav", { class: "pilot-pager", "aria-label": L.pager });
    var page = 1;

    box.appendChild(distribution(rows));
    box.appendChild(T.el("div", { class: "pilot-filters" }, [fGenre, fBatch, fCons, fText]));
    box.appendChild(T.el("div", { class: "pilot-bar" }, [count, reset]));
    box.appendChild(list);
    box.appendChild(pager);

    // Filter dan halaman disimpan di alamat, sehingga hasilnya bisa dibagikan.
    var params = new URLSearchParams(location.search);
    function setIf(sel, v) {
      if (v && [].some.call(sel.options, function (o) { return o.value === v; })) sel.value = v;
    }
    setIf(sg, params.get("genre"));
    setIf(sb, params.get("batch"));
    setIf(sc, params.get("konstruksi"));
    qi.value = params.get("q") || "";
    page = Math.max(1, parseInt(params.get("hal"), 10) || 1);

    function saveUrl() {
      var p = new URLSearchParams();
      if (sg.value) p.set("genre", sg.value);
      if (sb.value) p.set("batch", sb.value);
      if (sc.value) p.set("konstruksi", sc.value);
      if (qi.value.trim()) p.set("q", qi.value.trim());
      if (page > 1) p.set("hal", String(page));
      var s = p.toString();
      history.replaceState(null, "", location.pathname + (s ? "?" + s : "") + location.hash);
    }

    function pagerButton(text, target, disabled) {
      var b = T.el("button", { type: "button", class: "md-button", text: text });
      if (disabled) b.disabled = true;
      b.addEventListener("click", function () {
        page = target;
        update(true);
      });
      return b;
    }

    function update(scroll) {
      var g = sg.value, b = sb.value, c = sc.value;
      var q = qi.value.trim().toLowerCase();
      var hit = rows.filter(function (r) {
        return (!g || r.genre === g) && (!b || r.batch === b) &&
          (!c || r.indikasi_konstruksi.split(", ").indexOf(c) >= 0) &&
          (!q || (r.kalimat_toba + " " + r.terjemahan_indonesia).toLowerCase().indexOf(q) >= 0);
      });
      var pages = Math.max(1, Math.ceil(hit.length / PER_PAGE));
      page = Math.min(page, pages);
      reset.hidden = !(g || b || c || q);
      count.textContent = hit.length + " " + L.shown + " " + rows.length;
      list.textContent = "";
      if (!hit.length) list.appendChild(T.el("p", { class: "pilot-none", text: L.none }));
      hit.slice((page - 1) * PER_PAGE, page * PER_PAGE).forEach(function (r) {
        list.appendChild(T.el("article", { class: "pilot-item" }, [
          T.el("div", { class: "pilot-meta" }, [
            T.el("code", { text: r.pilot_id }),
            T.el("span", { text: r.genre + " / " + r.sub_genre }),
            T.el("span", { text: L.batch + " " + r.batch + " · " + r.jumlah_kata + " " + L.words.toLowerCase() })
          ]),
          highlighted("p", { class: "pilot-toba", lang: "bbc" }, r.kalimat_toba, q),
          highlighted("p", { class: "pilot-trans", lang: "id" }, r.terjemahan_indonesia, q),
          T.el("div", { class: "pilot-tags" }, r.indikasi_konstruksi.split(", ").map(function (t) {
            return T.el("span", { text: t });
          }))
        ]));
      });
      pager.textContent = "";
      if (pages > 1) {
        pager.appendChild(pagerButton(L.prev, page - 1, page === 1));
        pager.appendChild(T.el("span", { text: L.page + " " + page + " " + L.of + " " + pages }));
        pager.appendChild(pagerButton(L.next, page + 1, page === pages));
      }
      saveUrl();
      if (scroll) count.scrollIntoView({ block: "start", behavior: "smooth" });
    }

    function refilter() { page = 1; update(false); }
    [sg, sb, sc].forEach(function (s) { s.addEventListener("change", refilter); });
    qi.addEventListener("input", refilter);
    reset.addEventListener("click", function () {
      sg.value = sb.value = sc.value = qi.value = "";
      refilter();
    });
    update(false);
  }
})();
