"""Pisahkan indeks pencarian per bahasa.

Plugin i18n menulis satu indeks berisi halaman Indonesia dan Inggris sekaligus,
sehingga pencarian di situs Inggris ikut menampilkan halaman Indonesia. Hook ini
menulis search/search_index.id.json dan search/search_index.en.json, lalu skrip di
overrides/main.html mengarahkan tema ke indeks yang sesuai bahasa halaman.

Entri yang hanya ada dalam bahasa Indonesia tetap dimasukkan ke indeks Inggris,
karena sebagian isi (misalnya pedoman) memang hanya tersedia dalam bahasa Indonesia.
"""

import json
from pathlib import Path

from mkdocs.plugins import event_priority


def _page(location: str) -> str:
    return location.split("#", 1)[0]


# Prioritas lebih rendah dari plugin i18n (-100), agar berjalan setelah indeks gabungan ditulis.
@event_priority(-200)
def on_post_build(config, **kwargs):
    path = Path(config["site_dir"]) / "search" / "search_index.json"
    if not path.exists():
        return
    data = json.loads(path.read_text(encoding="utf-8"))
    docs = data["docs"]
    en = [d for d in docs if d["location"].startswith("en/")]
    idn = [d for d in docs if not d["location"].startswith("en/")]
    # Plugin i18n membuang entri Inggris yang isinya sama dengan versi Indonesia
    # (misalnya bagian pedoman). Entri itu dikembalikan ke indeks Inggris, diarahkan
    # ke halaman Inggris bila ada, atau ke halaman Indonesia bila tidak ada.
    en_locs = {d["location"][3:] for d in en}
    en_pages = {_page(loc) for loc in en_locs}
    for d in idn:
        if d["location"] in en_locs:
            continue
        loc = "en/" + d["location"] if _page(d["location"]) in en_pages else d["location"]
        en.append(dict(d, location=loc))
    for lang, entries, langs in (("id", idn, ["id"]), ("en", en, ["en"])):
        out = dict(data, docs=entries, config=dict(data["config"], lang=langs))
        (path.parent / f"search_index.{lang}.json").write_text(
            json.dumps(out, ensure_ascii=False, separators=(",", ":")), encoding="utf-8"
        )
