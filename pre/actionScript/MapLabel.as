package  {
	
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.geom.ColorTransform;
	import flash.external.*;
	
	public class MapLabel extends MovieClip {
		
		var state:Object;
		var lang:String;
		var hint:String;
		
		public function MapLabel() {
			// constructor code
		}
		
		public function load(state,lang){
			this.lang = lang;
			this.state = state;
			buttonMode = true
			
			this['label'].text = lang=='es' ? state.localidad : state.location;
			this['label'].width = label.textWidth + 6;
			this['label'].x = -label.width/2;
			
			var n:int = parseInt(Auxiliar.codeToTern(state.code),3);
			this['icon'].gotoAndStop(n+2);
			
			var r:Number = parseInt(state.code.substr(0,2),16)/255;
			var g:Number = parseInt(state.code.substr(2,2),16)/255;
			var b:Number = parseInt(state.code.substr(4,2),16)/255;
			this['icon'].transform.colorTransform = new ColorTransform(r,g,b,1,0,0,0,0);
			
			addEventListener(MouseEvent.CLICK,launchState);
			addEventListener(MouseEvent.MOUSE_OVER,showHint);
			addEventListener(MouseEvent.MOUSE_OUT,hideHint);
			
			hint = '<b><font color="' + state.code + '">';
			if(lang=='es'){
				hint+= 'Estado ';
				hint+= Auxiliar.titleCase(state.articulo);
				hint+= '</font></b></br>';
				hint+= lang=='es' ? state.mapa : state.map;
			} else {
				hint+= Auxiliar.titleCase(state.article);
				hint+= ' State</font></b></br>';
				hint+= lang=='es' ? state.mapa : state.map;
			}
		}
		
		private function launchState(e:MouseEvent):void{
			ExternalInterface.call("launchState('"+ state.code +"')");
		}
		private function showHint(e:MouseEvent):void{
			ExternalInterface.call("hint('"+ hint + "')");
		}
		private function hideHint(e:MouseEvent):void{
			ExternalInterface.call("hint(null)");
		}
		
	}
	
}
