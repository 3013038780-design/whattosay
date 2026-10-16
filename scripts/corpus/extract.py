"""Create a local, page-addressable corpus; do not publish copyrighted source text."""
import argparse, hashlib, json
from pathlib import Path
from pypdf import PdfReader

BOOKS = {
    'B01': '我们爱说话.1', 'B02': '祝酒辞全书', 'B03': '中国品酒诗话',
    'B04': '中國酒文化', 'B05': '一杯酒醉尽盛唐', 'B06': '诗酒风流赋华章',
}
p = argparse.ArgumentParser()
p.add_argument('source', type=Path)
p.add_argument('--output', type=Path, default=Path('local-corpus'))
a = p.parse_args()
seen = {}
inventory = []
for path in sorted(a.source.glob('*.pdf')):
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    if digest in seen:
        inventory.append({'filename': path.name, 'sha256': digest, 'duplicateOf': seen[digest]})
        continue
    book = next((k for k, prefix in BOOKS.items() if path.name.startswith(prefix)), None)
    if not book:
        raise ValueError(f'Unknown book: {path.name}')
    seen[digest] = book
    reader = PdfReader(path)
    dest = a.output / 'pages' / book
    dest.mkdir(parents=True, exist_ok=True)
    ready = 0
    for number, page in enumerate(reader.pages, 1):
        output = dest / f'{number:04}.json'
        if output.exists():
            continue
        content = page.extract_text() or ''
        sufficient = len(''.join(content.split())) >= 80
        record = {'book': book, 'pdfPage': number, 'method': 'pdf-text',
                  'text': content, 'needsOCR': not sufficient, 'proofread': False}
        output.write_text(json.dumps(record, ensure_ascii=False, indent=2))
        ready += sufficient
    inventory.append({'book': book, 'filename': path.name, 'sha256': digest,
                      'pages': len(reader.pages), 'path': str(path.resolve())})
    print(f'{book}: {len(reader.pages)} pages indexed; text extraction complete', flush=True)
a.output.mkdir(parents=True, exist_ok=True)
(a.output / 'inventory.json').write_text(json.dumps(inventory, ensure_ascii=False, indent=2))
