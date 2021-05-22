package  {
	
    import flash.external.*;
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.geom.ColorTransform;
	
	public class ImgBox extends MovieClip {
		
		var rgb:String;
		var hint:String;
		
		public function ImgBox(rgb:String,hint:String) {
			this.rgb = rgb;
			this.hint = hint;
			buttonMode = true;
			
			var r:Number = parseInt(rgb.substr(0,2),16)/255;
			var g:Number = parseInt(rgb.substr(2,2),16)/255;
			var b:Number = parseInt(rgb.substr(4,2),16)/255;
			transform.colorTransform = new ColorTransform(r,g,b,.33,0,0,0,0);
			
			addEventListener(MouseEvent.MOUSE_OVER,showHint);
			addEventListener(MouseEvent.MOUSE_OUT,hideHint);
			addEventListener(MouseEvent.RELEASE_OUTSIDE,hideHint);
			addEventListener(MouseEvent.MOUSE_DOWN,down);
		}
		private function showHint(e:MouseEvent):void{
			alpha=.33;
			ExternalInterface.call("hint('"+ hint +"')");
		}
		private function hideHint(e:MouseEvent):void{
			alpha=.5;
			ExternalInterface.call("hint(null)");
		}
		private function down(e:MouseEvent):void{
			alpha=1;
		}
	}
	
}
