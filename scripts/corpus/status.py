"""Report extraction and reading independently. Never infer reading from OCR."""
import json
from pathlib import Path
ledger=json.loads(Path('docs/reading/page-ledger.json').read_text())
inventory=json.loads(Path('local-corpus/inventory.json').read_text())
for book in sorted((x for x in inventory if 'book' in x),key=lambda x:x['book']):
 records=[json.loads(p.read_text()) for p in (Path('local-corpus/pages')/book['book']).glob('*.json')]
 indexed=sum(not r.get('needsOCR',True) for r in records)
 read=ledger['books'].get(book['book'],{}).get('pages',[])
 print(f"{book['book']}: extracted/OCR {indexed}/{book['pages']}; read {len(read)}/{book['pages']}; proofread {sum(p.get('proofread',False) for p in read)}")
