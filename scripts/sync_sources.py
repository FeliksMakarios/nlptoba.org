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

PEDOMAN_MD = "anotasi-ud/pedoman/pedoman-anotasi-ud-v1.0.md"
PEDOMAN_DOCX = "anotasi-ud/pedoman/Pedoman_Anotasi_UD_BatakToba_v1.0.docx"
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

    pedoman = (args.v2 / PEDOMAN_MD).read_text(encoding="utf-8")
    (ud / "pedoman.md").write_text(pedoman, encoding="utf-8")
    shutil.copy2(args.v2 / PEDOMAN_DOCX, ud / Path(PEDOMAN_DOCX).name)
    shutil.copy2(args.v2 / PILOT_CSV, data / "kalimat-pilot.csv")
    shutil.copy2(args.v2 / PILOT_TEMPLATE, data / "templat-pilot.conllu")
    (data / "contoh-pedoman.conllu").write_text(examples_to_conllu(pedoman), encoding="utf-8")

    sumber = {
        "batak-toba-corpus-v2": commit_of(args.v2),
        "batak-toba-korpus": commit_of(args.korpus),
    }
    (data / "sumber.json").write_text(json.dumps(sumber, indent=2) + "\n", encoding="utf-8")
    print("Sumber disalin:", json.dumps(sumber))


if __name__ == "__main__":
    main()
