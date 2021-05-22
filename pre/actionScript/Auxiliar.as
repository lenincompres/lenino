package  {
	import flash.events.Event;
	import flash.net.URLRequest;
	import flash.net.URLLoader;
	
	public class Auxiliar {
			
		static var codes:Array = ['2a','80','d5'];

		public function Auxiliar() {
			// constructor code
		}
		
		static function titleCase(s:String):String{
			return s.substr(0,1).toUpperCase()+s.substr(1);
		}
		
		static function stringsFit(s1:String, s2:String):Boolean{
			for(var i:int=0; i<4; i++){
				var c1:String = s1.substr(i,1).toLowerCase();
				var c2:String = s2.substr(i,1).toLowerCase();
				if(c1 != '*' && c2 != '*' && c1 != c2) return false;
			}
			return true;
		}
		
		static function ternToCode(tern:String):String{
			var code:String = '';
			for(var i:int=0; i<3; i++){
				code+= Auxiliar.codes[tern.charAt(i)];
			}
			return code;
		}
		
		static function codeToTern(code:String):String{
			var tern:String = '';
			for(var i:int=0; i<3; i++){
				tern+= Auxiliar.codes.indexOf(code.substr(i*2,2) as String);
			}
			return tern;
		}
		
		static function intToString(n:int,base:int,l:int=0):String{
			var s:String = n.toString(base);
			if(!l) l = base;
			while(s.length<l){
				s='0'+s;
			}
			return s;
		}
		
		static function loadJSON(url:String,func:Function):void{
			var request:URLRequest = new URLRequest(url);
			var loader:URLLoader = new URLLoader();
			loader.addEventListener(Event.COMPLETE, onload);
			loader.load(request);
			function onload(evt:Event):void{
				func(JSON.parse(loader.data));
			}
		}
		
		static function getPercent(a:Number, b:Number):Number {
			a = a > 1 ? a : 1;
			b = b > 1 ? b : 1;
			return Math.round(100 * a / (a+b));
		}

	}
	
}
