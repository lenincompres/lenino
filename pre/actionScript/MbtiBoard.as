package  {
	
    import flash.external.*;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.geom.ColorTransform;
	import flash.net.URLRequest;
	import flash.net.navigateToURL;
	
	public class MbtiBoard extends Sprite {
		
		var color:ColorTransform;
		var lang:String;
		var baseScale:Number;
		var baseAlpha:Number;
		var hint:String;
		
		public function MbtiBoard(rgb:String, lang:String) {
			this.lang = lang;
			baseScale = .4;
			baseAlpha=.68;
			hint = lang == "es"? "Equivalente MBTI" : "MBTI Equivalent";
			buttonMode = true;
			
			addEventListener(MouseEvent.MOUSE_OVER,over);
			addEventListener(MouseEvent.MOUSE_OUT,out);
			addEventListener(MouseEvent.RELEASE_OUTSIDE,out);
			addEventListener(MouseEvent.CLICK,click);
			
			out();
		}
		
		//--------------------------- update function ---------------------------------
		function update(rgb:String, e:int):void {
			var r:Number = parseInt(rgb.substr(0,2),16);
			var g:Number = parseInt(rgb.substr(2,2),16);
			var b:Number = parseInt(rgb.substr(4,2),16);

			var i:Number = 100 - e;
			var s:Number = 100*firmOn(r);
			var t:Number = 100*firmOn(g);
			var f:Number = 100*firmOn(b);
			var n:Number = Math.round((t + f) / 2);
			var j:int = Math.round((t + f + s) / 3);
			var p:int = 100 - j;
			
			n = Auxiliar.getPercent(n, s);
			s = 100-n;
			f= Auxiliar.getPercent(f, t);
			t = 100-f;
			
			this['displayI'].text = i + "%:" + e + "%";
			this['displayN'].text = n+"%";
			this['displayS'].text = s+"%";
			this['displayF'].text = f+"%";
			this['displayT'].text = t+"%";
			this['displayJ'].text = j + "%:" + p + "%";
			
			this['display'].text = i > e ? "I" : i < e ? "E" : "-";
			this['display'].text += s > n ? "S" : n > s ? "N" : "-";
			this['display'].text += f > t ? "F" : t > f ? "T" : "-";
			this['display'].text += p > j ? "P" : p < j ? "J" : "-";
			
			var m:Number = 2 * j - 50;
			light.transform.colorTransform = new ColorTransform(m,m,m,1,0,0,0,0);
			shade.alpha = .75 * e / 100;

			indicator.target.x = (n - s) * .45;
			indicator.target.y = (f - t) * .45;
			indicator.line.graphics.clear();
			indicator.line.graphics.lineStyle(0,0xFFFFFF,.5);
			indicator.line.graphics.moveTo(0, 0);
			indicator.line.graphics.lineTo(indicator.target.x, indicator.target.y);

		}
		
		function over(e:MouseEvent):void {
			scaleX = scaleY = 1;
			alpha=1;
			this['displayI'].visible = this['displayN'].visible = this['displayS'].visible = this['labelI'].visible = true;
			this['displayT'].visible =  this['displayF'].visible =  this['displayJ'].visible = this['labelJ'].visible = true
			ExternalInterface.call("hint('"+ hint +"')");
		};
		function out(e:MouseEvent=null):void {
			scaleX = scaleY = baseScale;
			alpha=baseAlpha;
			this['displayI'].visible = this['displayN'].visible = this['displayS'].visible = this['labelI'].visible = false;
			this['displayT'].visible =  this['displayF'].visible =  this['displayJ'].visible = this['labelJ'].visible = false
			ExternalInterface.call("hint(null)");
		};
		function click(e:MouseEvent):void {
			var letters = this['display'].text.toLowerCase();
			if (letters.lastIndexOf("-") < 0) navigateToURL(new URLRequest("http://www.typelogic.com/" + letters + ".html"),"_blank");
			else navigateToURL(new URLRequest("http://www.typelogic.com/"),"_blank");
		};
		function firmOn(n:Number):Number {
			var base:Number = 255;
			var a:Number = base / 6;
			var b:Number = base - a;
			if (n >= a && n <= b) {
				return (n - a) / (b - a);
			} else {
				if (n < a) {
					n = base + n;
				}
				return 1 - (n - b) / (base + a - b);
			}
		}
	}
	
}
