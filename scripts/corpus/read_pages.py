"""Display complete page texts for human/model reading; this does not mark them read."""
import argparse, json, unicodedata
from pathlib import Path
p=argparse.ArgumentParser()
p.add_argument('book')
p.add_argument('start',type=int)
p.add_argument('end',type=int)
a=p.parse_args()
for number in range(a.start,a.end+1):
 path=Path('local-corpus/pages')/a.book/f'{number:04}.json'
 item=json.loads(path.read_text())
 if item.get('needsOCR'):raise RuntimeError(f'{a.book} page {number} awaits OCR')
 item["text"] = unicodedata.normalize("NFKC", item["text"])
 print(f'\n=== {a.book} PDF PAGE {number} ({item["method"]}) ===\n{item["text"]}')
