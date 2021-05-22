package  {
	
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.external.*;
	import flash.events.MouseEvent;
	
	public class Map extends MovieClip {
		
		var lang:String;
		var states:Object;
		
		public function Map() {
			lang = stage.loaderInfo.parameters.lang;
			states = ExternalInterface.call('getStates');
			if(states) load();
			else Auxiliar.loadJSON("http://www.3dpsyche.com/states.json",load);
		}
		
		function load(data:Object=null){
			if(data) states=data;
			var stateName:String;
			for(stateName in states){
				var state:Object = states[stateName];
				this['label'+state.code].load(state,lang);
			}
			this['label808080'].addEventListener(MouseEvent.MOUSE_OVER,hideTopLevel);
			this['label808080'].addEventListener(MouseEvent.MOUSE_OUT,showTopLevel);
			this['labelx808080'].load(states['808080'],lang);
		}
		
		function hideTopLevel(e:MouseEvent):void{
			this['labeld5d5d5'].alpha = this['label80d5d5'].alpha = this['labeld580d5'].alpha = this['labeld5d580'].alpha = 0;
			this['label2ad5d5'].alpha = this['labeld52ad5'].alpha = this['labeld5d52a'].alpha = this['lvl2'].alpha = 0;
		}
		function showTopLevel(e:MouseEvent):void{
			this['labeld5d5d5'].alpha = this['label80d5d5'].alpha =  this['labeld580d5'].alpha =  this['labeld5d580'].alpha = 1;
			this['label2ad5d5'].alpha = this['labeld52ad5'].alpha = this['labeld5d52a'].alpha = this['lvl2'].alpha = 1;
		}
	}
	
}
