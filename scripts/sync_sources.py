"""Salin berkas sumber dari repo penelitian ke folder docs/ sebelum build.

Situs tidak menyimpan salinan data sendiri. Setiap build mengambil berkas
terbaru dari repo penelitian, sehingga repo penelitian tetap menjadi satu-satunya
sumber kebenaran.

Pemakaian:
    python scripts/sync_sources.py --v2 sumber/batak-toba-corpus-v2 \
        --korpus sumber/batak-toba-korpus --docs docs
"""

import argparse
import json
import re
import shutil
import subprocess
from pathlib import Path

PEDOMAN_DIR = "anotasi-ud/pedoman"
PEDOMAN_REPO = "https://github.com/FeliksMakarios/batak-toba-corpus-v2/tree/main/anotasi-ud/pedoman/"
PILOT_CSV = "anotasi-ud/pilot/daftar-250-kalimat-pilot.csv"
PILOT_TEMPLATE = "anotasi-ud/pilot/btk_pilot_250_template.conllu"


def commit_of(repo: Path) -> str:
    try:
        out = subprocess.run(
            ["git", "-C", str(repo), "rev-parse", "HEAD"],
            capture_output=True, text=True, check=True,
        )
        return out.stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return ""


def latest_pedoman(v2: Path):
    """Cari pedoman versi tertinggi di folder pedoman (bukan di subfolder arsip)."""
    found = []
    for md in (v2 / PEDOMAN_DIR).glob("pedoman-anotasi-ud-v*.md"):
        m = re.fullmatch(r"pedoman-anotasi-ud-v(\d+(?:\.\d+)*)\.md", md.name)
        if m:
            found.append((tuple(int(x) for x in m.group(1).split(".")), m.group(1), md))
    if not found:
        raise SystemExit("Pedoman tidak ditemukan di " + PEDOMAN_DIR)
    _, version, md = max(found)
    docx = md.with_name(f"Pedoman_Anotasi_UD_BatakToba_v{version}.docx")
    return version, md, docx


def absolutize_links(text: str, keep: str) -> str:
    """Tautan relatif selain berkas Word diarahkan ke GitHub agar tetap berlaku di situs."""
    def fix(m):
        target = m.group(2)
        if target.startswith(("http:", "https:", "#", "mailto:")) or target == keep:
            return m.group(0)
        return f"{m.group(1)}({PEDOMAN_REPO}{target})"
    return re.sub(r"(\[[^\]]*\])\(([^)\s]+)\)", fix, text)


def unescape_cell(cell: str) -> str:
    cell = cell.strip().replace("\\|", "|").replace("\\[", "[").replace("\\]", "]")
    return cell.replace("\\_", "_").strip("*") or "_"


def split_row(line: str) -> list:
    # Pisahkan sel pada | yang tidak didahului garis miring terbalik.
    cells = re.split(r"(?<!\\)\|", line.strip().strip("|"))
    return [unescape_cell(c) for c in cells]


def examples_to_conllu(pedoman: str) -> str:
    """Ubah tabel Bagian 8 pedoman menjadi CoNLL-U untuk penampil pohon."""
    start = pedoman.find("## 8.")
    end = pedoman.find("\n## 9.", start)
    if start < 0 or end < 0:
        raise SystemExit("Bagian 8 pedoman tidak ditemukan. Periksa format pedoman.")
    lines = pedoman[start:end].splitlines()

    out = ["# newdoc id = contoh_pedoman_v1.0"]
    title = text = gloss = None
    rows = []

    def flush():
        if not rows:
            return
        n = len([b for b in out if b.startswith("# sent_id")]) + 1
        out.append(f"# sent_id = contoh-{n:02d}")
        if title:
            out.append(f"# judul = {title}")
        if text:
            out.append(f"# text = {text}")
        if gloss:
            out.append(f"# text_id = {gloss}")
        for r in rows:
            out.append("\t".join(r))
        out.append("")

    for line in lines:
        m = re.match(r"^\*\*(Contoh \d+\..*)\*\*$", line.strip())
        if m:
            flush()
            title, text, gloss, rows = m.group(1), None, None, []
            continue
        m = re.match(r"^\*(.+?)\*\s+‘(.+)’$", line.strip())
        if m and title:
            text, gloss = m.group(1), m.group(2)
            continue
        if line.startswith("|") and not line.startswith("|--"):
            cells = split_row(line)
            if cells[0] in ("ID", "_") or not cells[0].isdigit():
                continue
            ident, form, lemma, upos, feats, head, deprel, misc = cells[:8]
            rows.append([ident, form, lemma, upos, "_", feats, head, deprel, "_", misc])
    flush()
    return "\n".join(out) + "\n"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--v2", required=True, type=Path)
    ap.add_argument("--korpus", required=True, type=Path)
    ap.add_argument("--docs", required=True, type=Path)
    args = ap.parse_args()

    data = args.docs / "assets" / "data"
    data.mkdir(parents=True, exist_ok=True)
    ud = args.docs / "anotasi-ud"

    version, pedoman_md, pedoman_docx = latest_pedoman(args.v2)
    pedoman = pedoman_md.read_text(encoding="utf-8")
    (ud / "pedoman.md").write_text(absolutize_links(pedoman, pedoman_docx.name), encoding="utf-8")
    for old in ud.glob("Pedoman_Anotasi_UD_BatakToba_v*.docx"):
        old.unlink()
    shutil.copy2(pedoman_docx, ud / pedoman_docx.name)
    shutil.copy2(args.v2 / PILOT_CSV, data / "kalimat-pilot.csv")
    shutil.copy2(args.v2 / PILOT_TEMPLATE, data / "templat-pilot.conllu")
    (data / "contoh-pedoman.conllu").write_text(examples_to_conllu(pedoman), encoding="utf-8")

    sumber = {
        "versi_pedoman": version,
        "batak-toba-corpus-v2": commit_of(args.v2),
        "batak-toba-korpus": commit_of(args.korpus),
    }
    (data / "sumber.json").write_text(json.dumps(sumber, indent=2) + "\n", encoding="utf-8")
    print("Sumber disalin:", json.dumps(sumber))


if __name__ == "__main__":
    main()
