// Penjelajah 250 kalimat pilot anotasi UD.
(function () {
  var box = document.getElementById("pilot-explorer");
  if (!box) return;
  var T = window.NlpToba;
  var L = {
    id: {
      genre: "Genre", batch: "Batch", cons: "Konstruksi", search: "Cari kata",
      all: "Semua", shown: "kalimat ditampilkan dari", toba: "Batak Toba",
      trans: "Terjemahan Indonesia", words: "Kata", loading: "Memuat data...",
      fail: "Data gagal dimuat.", sentences: "Kalimat", docs: "Dokumen",
      total: "Total", dist: "Sebaran per genre"
    },
    en: {
      genre: "Genre", batch: "Batch", cons: "Construction", search: "Search",
      all: "All", shown: "sentences shown out of", toba: "Batak Toba",
      trans: "Indonesian translation", words: "Words", loading: "Loading data...",
      fail: "Failed to load data.", sentences: "Sentences", docs: "Documents",
      total: "Total", dist: "Distribution by genre"
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
    var cons = [];
    rows.forEach(function (r) { cons = cons.concat(r.indikasi_konstruksi.split(", ")); });

    var fGenre = select(L.genre, uniq(rows.map(function (r) { return r.genre; })));
    var fBatch = select(L.batch, uniq(rows.map(function (r) { return r.batch; })));
    var fCons = select(L.cons, uniq(cons));
    var fText = T.el("label", {}, [
      T.el("span", { text: L.search }),
      T.el("input", { type: "search", "aria-label": L.search })
    ]);
    var count = T.el("p", { class: "pilot-count", "aria-live": "polite" });
    var list = T.el("div", { class: "pilot-list" });

    box.appendChild(distribution(rows));
    box.appendChild(T.el("div", { class: "pilot-filters" }, [fGenre, fBatch, fCons, fText]));
    box.appendChild(count);
    box.appendChild(list);

    function update() {
      var g = fGenre.querySelector("select").value;
      var b = fBatch.querySelector("select").value;
      var c = fCons.querySelector("select").value;
      var q = fText.querySelector("input").value.trim().toLowerCase();
      var hit = rows.filter(function (r) {
        return (!g || r.genre === g) && (!b || r.batch === b) &&
          (!c || r.indikasi_konstruksi.split(", ").indexOf(c) >= 0) &&
          (!q || (r.kalimat_toba + " " + r.terjemahan_indonesia).toLowerCase().indexOf(q) >= 0);
      });
      count.textContent = hit.length + " " + L.shown + " " + rows.length;
      list.textContent = "";
      hit.forEach(function (r) {
        list.appendChild(T.el("article", { class: "pilot-item" }, [
          T.el("div", { class: "pilot-meta" }, [
            T.el("code", { text: r.pilot_id }),
            T.el("span", { text: r.genre + " / " + r.sub_genre }),
            T.el("span", { text: L.batch + " " + r.batch + " · " + r.jumlah_kata + " " + L.words.toLowerCase() })
          ]),
          T.el("p", { class: "pilot-toba", lang: "bbc", text: r.kalimat_toba }),
          T.el("p", { class: "pilot-trans", lang: "id", text: r.terjemahan_indonesia }),
          T.el("div", { class: "pilot-tags" }, r.indikasi_konstruksi.split(", ").map(function (t) {
            return T.el("span", { text: t });
          }))
        ]));
      });
    }

    [fGenre, fBatch, fCons].forEach(function (f) {
      f.querySelector("select").addEventListener("change", update);
    });
    fText.querySelector("input").addEventListener("input", update);
    update();
  }
})();
