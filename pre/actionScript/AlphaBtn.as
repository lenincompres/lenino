package  {
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	
	public class AlphaBtn extends Sprite{

		public function AlphaBtn() {
			// constructor code
			alpha = .33;
			buttonMode = true;
			addEventListener(MouseEvent.MOUSE_OVER,over);
			addEventListener(MouseEvent.MOUSE_OUT,out);
			addEventListener(MouseEvent.RELEASE_OUTSIDE,out);
			addEventListener(MouseEvent.MOUSE_UP,over);
			addEventListener(MouseEvent.MOUSE_DOWN,down);
		}
		
		function over(e:MouseEvent):void{
			alpha = .66;
		}
		function out(e:MouseEvent):void{
			alpha = .33;
		}
		function down(e:MouseEvent):void{
			alpha = 1;
		}


	}
	
}
