"""Periksa bahwa setiap tautan internal di hasil build menunjuk berkas yang ada.

Tautan ke luar situs tidak diperiksa. Jangkar (#bagian) diperiksa terhadap atribut
id di halaman tujuan. Skrip keluar dengan kode 1 bila ada tautan bermasalah.

Pemakaian:
    python scripts/cek_tautan.py site
"""

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse


class _Halaman(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tautan, self.ids = [], set()

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        for k in ("href", "src"):
            if a.get(k):
                self.tautan.append(a[k])


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "site").resolve()
    halaman = {}
    for f in root.rglob("*.html"):
        p = _Halaman()
        p.feed(f.read_text(encoding="utf-8"))
        halaman[f] = p
    jumlah = salah = 0
    for f, p in halaman.items():
        for t in p.tautan:
            u = urlparse(t)
            if u.scheme or t.startswith("//"):
                continue
            jumlah += 1
            path = unquote(u.path)
            if not path:
                tujuan = f
            elif path.startswith("/"):
                tujuan = (root / path.lstrip("/")).resolve()
            else:
                tujuan = (f.parent / path).resolve()
            if tujuan.is_dir():
                tujuan = tujuan / "index.html"
            if not tujuan.exists():
                print(f"HILANG   {f.relative_to(root)} -> {t}")
                salah += 1
            elif u.fragment and tujuan.suffix == ".html" and u.fragment not in halaman[tujuan].ids:
                print(f"JANGKAR  {f.relative_to(root)} -> {t}")
                salah += 1
    print(f"{jumlah} tautan internal diperiksa, {salah} bermasalah")
    return 1 if salah else 0


if __name__ == "__main__":
    sys.exit(main())
