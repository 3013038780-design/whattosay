"""Record explicit reading notes after reading complete pages, never from OCR counts."""
import argparse, json
from pathlib import Path
p=argparse.ArgumentParser()
p.add_argument('book'); p.add_argument('start',type=int);p.add_argument('end',type=int);p.add_argument('notes',type=Path)
a=p.parse_args()
notes=a.notes.read_text().splitlines()
assert len(notes)==a.end-a.start+1, 'Note count must match explicit page range'
assert notes and all(n.strip() for n in notes),'Every page needs an explicit note'
ledger=Path('docs/reading/page-ledger.json')
data=json.loads(ledger.read_text())
inv=next(x for x in json.loads(Path('local-corpus/inventory.json').read_text()) if x.get('book')==a.book)
b=data['books'].setdefault(a.book,{'title':inv['filename'].split(' (')[0], 'totalPages':inv['pages'],'pages':[]})
existing={x['pdfPage'] for x in b['pages']}
for i,note in enumerate(notes,a.start):
 assert 1<=i<=inv['pages'] and i not in existing,f'Duplicate or invalid page: {i}'
 page=json.loads((Path('local-corpus/pages')/a.book/f'{i:04}.json').read_text())
 assert page.get('needsOCR') is False,f'Page {i} still awaits OCR'
 b['pages'].append({'pdfPage':i,'status':'read','note':note,'proofread':False})
b['pages'].sort(key=lambda x:x['pdfPage'])
ledger.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print(f'{a.book}: recorded {a.start}—{a.start+len(notes)-1}; total {len(b["pages"])}/{inv["pages"]}')
