package  {
	
    import flash.external.*;
	import flash.display.Sprite;
	import flash.text.TextField;
	import flash.geom.ColorTransform;
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	
	public class State extends Sprite {
		
		var label:TextField;
		var base:Sprite;
		var top:Sprite;
		var icon:MovieClip;
		var article:String;
		var rgb:String;
		public var value:int;
		
		public function State(state:Object=null, lang:String='en') {
			label = this['_label'] as TextField;
			base = this['_base'] as Sprite;
			top = this['_top'] as Sprite;
			icon = this['_icon'] as MovieClip;
			buttonMode = true;
			top.addEventListener(MouseEvent.CLICK,launchState);
			top.addEventListener(MouseEvent.MOUSE_OVER,showHint);
			top.addEventListener(MouseEvent.MOUSE_OUT,hideHint);
			if(state) load(state,lang);
		}
		
		public function load(state:Object, lang:String='en'):void{
			rgb=state.code;
			var n:int = parseInt(Auxiliar.codeToTern(rgb),3);
			icon.gotoAndStop(n+2);
			article = lang=='es'?state.articulo:state.article;
			
			var r:Number = parseInt(rgb.substr(0,2),16)/255;
			var g:Number = parseInt(rgb.substr(2,2),16)/255;
			var b:Number = parseInt(rgb.substr(4,2),16)/255;
			top.transform.colorTransform = new ColorTransform(r,g,b,.5,0,0,0,0);
			icon.transform.colorTransform = new ColorTransform(r,g,b,1,0,0,0,0);
			base.transform.colorTransform = new ColorTransform(r,g,b,.75,0,0,0,0);
			
			label.width = 200;
			label.text = Auxiliar.titleCase(article);
			label.width = label.textWidth + 6;
			label.x = -label.width/2;
		}
		
		private function launchState(e:MouseEvent):void{
			ExternalInterface.call("launchState('"+ rgb +"')");
		}
		private function showHint(e:MouseEvent):void{
			ExternalInterface.call("hint('"+ Auxiliar.titleCase(article) +"')");
		}
		private function hideHint(e:MouseEvent):void{
			ExternalInterface.call("hint(null)");
		}
		
		public function setRef(rgbRef:String):void{
			var distFactor:Number = 1.05444; // normalized the center cuz E it's off from the perioherals .5/getDistance('2a80d5','808080');
			var value:Number = 1 - distFactor*getDistance(rgbRef, rgb, true);
			var eValue:Number = 1 - distFactor*getDistance(rgbRef, rgb);
			label.alpha = value;
			icon.alpha = base.alpha = Math.pow(value,3);
			top.alpha = base.alpha>>1;
			this.value = Math.round(100*value);
			label.text = !isNaN(value) ? (eValue < value ? "*" : "") + this.value + "%" : '';
		}
		
		//3d functions
		
		function getDistance(rgb1:String, rgb2:String, closer:Boolean=false):Number {
			var base:int = 255;
			var p1:Array = [parseInt(rgb1.substr(0,2),16)/base,parseInt(rgb1.substr(2,2),16)/base,parseInt(rgb1.substr(4,2),16)/base];
			var p2:Array = [parseInt(rgb2.substr(0,2),16)/base,parseInt(rgb2.substr(2,2),16)/base,parseInt(rgb2.substr(4,2),16)/base];
			if(closer){
				p1[0] = cicle(p1[0], p2[0]);
				p1[1] = cicle(p1[1], p2[1]);
				p1[2] = cicle(p1[2], p2[2]);
			}
			return Math.sqrt(Math.pow(p2[0]-p1[0], 2)+Math.pow(p2[1]-p1[1], 2)+Math.pow(p2[2]-p1[2], 2));
		};
		function cicle(in1:Number, in2:Number):Number {
			if (Math.abs(in1-in2)<=.5) return in1;
			var in1a:Number = in1+1;
			var in1b:Number = in1-1;
			return Math.abs(in1a-in2)<Math.abs(in1b-in2) ? in1a : in1b;
		};
	}
	
}
