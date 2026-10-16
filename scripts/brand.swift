// Reproducible native rendering of our vector/text brand assets; no third-party artwork.
import AppKit
import Foundation
func color(_ r:CGFloat,_ g:CGFloat,_ b:CGFloat)->NSColor {NSColor(srgbRed:r/255,green:g/255,blue:b/255,alpha:1)}
let paper=color(245,240,231),red=color(169,67,52),ink=color(44,66,54),cream=color(255,253,247)
func text(_ value:String,_ rect:NSRect,_ size:CGFloat,_ c:NSColor,_ align:NSTextAlignment = .left) {
 let p=NSMutableParagraphStyle();p.alignment=align
 let font=NSFont(name:"Songti SC",size:size) ?? NSFont.systemFont(ofSize:size)
 (value as NSString).draw(in:rect,withAttributes:[.font:font,.foregroundColor:c,.paragraphStyle:p])
}
func render(_ width:Int,_ height:Int,_ path:String,_ draw:()->Void) throws {
 let rep=NSBitmapImageRep(bitmapDataPlanes:nil,pixelsWide:width,pixelsHigh:height,bitsPerSample:8,samplesPerPixel:4,hasAlpha:true,isPlanar:false,colorSpaceName:.deviceRGB,bytesPerRow:0,bitsPerPixel:0)!
 NSGraphicsContext.saveGraphicsState();NSGraphicsContext.current=NSGraphicsContext(bitmapImageRep:rep);draw();NSGraphicsContext.restoreGraphicsState()
 try rep.representation(using:.png,properties:[:])!.write(to:URL(fileURLWithPath:path))
}
try render(1024,1024,"assets/app-icon.png") {
 paper.setFill();NSBezierPath(rect:NSRect(x:0,y:0,width:1024,height:1024)).fill()
 red.setFill();NSBezierPath(roundedRect:NSRect(x:160,y:180,width:704,height:704),xRadius:58,yRadius:58).fill()
 let tail=NSBezierPath();tail.move(to:NSPoint(x:620,y:210));tail.line(to:NSPoint(x:864,y:210));tail.line(to:NSPoint(x:864,y:104));tail.close();tail.fill()
 let font=NSFont(name:"Songti SC",size:480) ?? NSFont.systemFont(ofSize:480)
 let attrs:[NSAttributedString.Key:Any]=[.font:font,.foregroundColor:cream]
 let size=("言" as NSString).size(withAttributes:attrs)
 ("言" as NSString).draw(at:NSPoint(x:512-size.width/2,y:532-size.height/2),withAttributes:attrs)
}
try render(1000,800,"assets/share-cover.png") {
 paper.setFill();NSBezierPath(rect:NSRect(x:0,y:0,width:1000,height:800)).fill()
 text("席 间 有 话",NSRect(x:84,y:630,width:800,height:60),34,ink)
 text("轮到我了。",NSRect(x:80,y:420,width:850,height:160),112,ink)
 text("一杯有心意，一席有好词。",NSRect(x:86,y:332,width:830,height:72),48,red)
 let line=NSBezierPath();line.move(to:NSPoint(x:86,y:284));line.line(to:NSPoint(x:914,y:284));color(216,210,196).setStroke();line.lineWidth=2;line.stroke()
 text("诗词有出处 · 说话有分寸",NSRect(x:86,y:180,width:830,height:58),36,ink)
 text("临场找词 / 朋友分享",NSRect(x:86,y:100,width:830,height:48),28,color(117,119,107))
}
print("Rendered app icon and 5:4 share cover.")
