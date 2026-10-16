// Local macOS Vision OCR. Each page is checkpointed; restarting resumes safely.
import Foundation
import PDFKit
import Vision
import AppKit
let args = CommandLine.arguments
guard args.count == 4 else { fatalError("Usage: ocr <PDF> <book ID> <local corpus directory>") }
guard let doc = PDFDocument(url: URL(fileURLWithPath: args[1])) else { fatalError("Cannot open PDF") }
let book = args[2]
let dest = URL(fileURLWithPath: args[3]).appendingPathComponent("pages/\(book)")
try FileManager.default.createDirectory(at: dest, withIntermediateDirectories:true)
for index in 0..<doc.pageCount {
 try autoreleasepool {
  let number = index+1
  let output = dest.appendingPathComponent(String(format:"%04d.json",number))
  if let data=try? Data(contentsOf:output),
     let item=(try? JSONSerialization.jsonObject(with:data)) as? [String:Any],
     item["needsOCR"] as? Bool == false { return }
  guard let page=doc.page(at:index) else { throw NSError(domain:"PDF",code:number) }
  let bounds=page.bounds(for:.mediaBox)
  let img=page.thumbnail(of:NSSize(width:2000,height:2000*bounds.height/bounds.width),for:.mediaBox)
  var rect=CGRect(origin:.zero,size:img.size)
  guard let cg=img.cgImage(forProposedRect:&rect,context:nil,hints:nil) else { throw NSError(domain:"Render",code:number) }
  let request=VNRecognizeTextRequest()
  request.recognitionLevel = .accurate
  request.recognitionLanguages=["zh-Hans","zh-Hant","en-US"]
  request.usesLanguageCorrection=true
  try VNImageRequestHandler(cgImage:cg,options:[:]).perform([request])
  let lines=(request.results ?? []).compactMap { $0.topCandidates(1).first }
  let item:[String:Any] = ["book":book,"pdfPage":number,"method":"vision-ocr",
    "text":lines.map{$0.string}.joined(separator:"\n"),"needsOCR":false,"proofread":false,
    "meanConfidence":lines.isEmpty ? 0 : lines.map{Double($0.confidence)}.reduce(0,+)/Double(lines.count)]
  let data=try JSONSerialization.data(withJSONObject:item,options:[.prettyPrinted,.sortedKeys,.withoutEscapingSlashes])
  try data.write(to:output,options:.atomic)
 }
 if (index+1)%10 == 0 || index+1 == doc.pageCount {
  print("\(book) page \(index+1)/\(doc.pageCount) indexed")
  fflush(stdout)
 }
}
