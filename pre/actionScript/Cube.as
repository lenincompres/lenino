package  {
	
	import flash.display.MovieClip;
	import flash.external.*;
	import flash.net.URLRequest;
	import flash.net.URLLoader;
	import flash.display3D.IndexBuffer3D;
	import flash.utils.Timer;
	import flash.events.TimerEvent;
	import flash.events.MouseEvent;
	import flash.events.Event;
	import flash.ui.Mouse;
	import flash.display.Sprite;
	import flash.display.SpreadMethod;
	
	public class Cube extends MovieClip {
		
		var stateCode:String, centerCode:String;
		var lang:String, mbti:String;
		var results:String, daily:String, tone:String;
		var cube:Boolean, stay:Boolean;
		var includes:Array;
		var EXPANDED:String = 'expanded';
		var COMPACTED:String = 'compacted';
		var expansions:Array = ['r','b','g','e'];
		var nextExpansion:int = 0, endExpansion:int;
		var states:Object;
		var vicinity:Array = ['011','101','110','111','112','121','211'];
		var rBtn:AlphaBtn, gBtn:AlphaBtn, bBtn:AlphaBtn, cBtn:AlphaBtn, eBtn:AlphaBtn;
		var resultsBtn:ImgBox, dailyBtn:ImgBox, toneBtn:ImgBox;
		var mbtiBoard:MbtiBoard;
		var timer:Timer = new Timer(3000);
		
		public function Cube() {
			lang = stage.loaderInfo.parameters.lang;
			cube = !stage.loaderInfo.parameters.vicinity;
			mbti = stage.loaderInfo.parameters.mbti;
			stateCode = stage.loaderInfo.parameters.state;
			centerCode = stage.loaderInfo.parameters.center;
			results = stage.loaderInfo.parameters.results;
			daily = stage.loaderInfo.parameters.daily;
			tone = stage.loaderInfo.parameters.tone;
			stay = !stage.loaderInfo.parameters.dance;
			
			if(!lang) lang='en';
			if(!centerCode) centerCode = stateCode ? stateCode : Auxiliar.ternToCode('111');
			if(!cube) stateCode=null;
			
			var includeStr:String = stage.loaderInfo.parameters.includes;
			includes = includeStr?includeStr.split(','):new Array();
			
			states = ExternalInterface.call('getStates');
			if(states) load();
			else {
				Auxiliar.loadJSON("http://www.3dpsyche.com/states.json",load);
				//makes testing here
				stay=false;
				results='1A65DE';
				daily='76aa34';
				tone='d58080';
			}
			
			addEventListener(EXPANDED,expanded);
			addEventListener(COMPACTED,compacted);
			timer.addEventListener(TimerEvent.TIMER,move);
		}

		function load(data:Object=null):void{
			if(data) states = data;
			var box:State;
			var centerTern:String = Auxiliar.codeToTern(centerCode);
			for(var i:int = 0; i < 27; i++) {
				var boxTern:String = Auxiliar.intToString(i,3);
				box = this['box'+boxTern] as State;
				box.visible = false;
				if(!stateCode && (cube || vicinity.indexOf(boxTern)>-1)){ //check that its in vicinity if vicinity is needed
					var boxCode:String = Auxiliar.ternToCode(push(boxTern,centerTern));
					if(!includes.length || includes.indexOf(boxCode)>-1) {
						var state:Object = states[boxCode];
						if(mbti) box.scaleX = box.scaleY = 1 - state.mbti.split('*').length * .12;
						if(!mbti || Auxiliar.stringsFit(mbti,state.mbti)){
							box.load(state,lang);
							box.visible = true;
						}
					}
				}
			} 
			if(stateCode){
				box = this['box000'] as State;
				box.load(states[stateCode],lang);
				box.visible = true;
			}
			if(!stay){
				endExpansion = nextExpansion = 0;
				activateButtons();
				compacted();
			} else {
				gotoAndStop(0);
			}
			if(results){
				resultsBtn = new ImgBox(results,'<b><font color="#'+results+'">Test Result</font></b></br>RGB: #'+results); 
				resultsBtn.y = -105;
				resultsBtn.x = -305;
				resultsBtn.addEventListener(MouseEvent.CLICK,showResults);
				addChild(resultsBtn);
				if(daily){
					dailyBtn = new ImgBox(daily,'<b><font color="#'+daily+'">Daily Life</font></b></br>RGB: #'+daily);
					dailyBtn.y = resultsBtn.y;
					dailyBtn.x = resultsBtn.x + 28;
					dailyBtn.scaleX = dailyBtn.scaleY = .66;
					dailyBtn.addEventListener(MouseEvent.CLICK,showDaily);
					addChild(dailyBtn);
				}/*
				if(tone){
					toneBtn = new ImgBox(tone,'Favorite Color</br>#'+tone);
					toneBtn.y = dailyBtn.y;
					toneBtn.x = resultsBtn.x + 48;
					toneBtn.scaleX = toneBtn.scaleY = .4;
					toneBtn.addEventListener(MouseEvent.CLICK,showTone);
					addChild(toneBtn);
				}*/
				mbtiBoard = new MbtiBoard(results, lang);
				mbtiBoard.x = -289;
				mbtiBoard.y = 110;
				addChild(mbtiBoard);
				showResults();
			}
		}
		
		//movement functions
		
		function compacted(e:Event=null):void{
			if(endExpansion<0){
				nextFrame();
			} else {
				if(!stay) endExpansion = nextExpansion++;
				if(nextExpansion>=expansions.length) nextExpansion=0;
				gotoAndPlay(expansions[endExpansion]);
			}
		}
		function expanded(e:Event):void{
			stop();
			timer.stop();
			if(!stay) {
				timer.start();
			}
		}
		function move(e:Event):void{
			timer.stop();
			play();
		}
		function activateButtons():void{
			rBtn = new AlphaBtn;
			gBtn = new AlphaBtn;
			bBtn = new AlphaBtn;
			cBtn = new AlphaBtn;
			eBtn = new AlphaBtn;
			rBtn.y = gBtn.y = bBtn.y = cBtn.y = eBtn.y =-105;
			eBtn.x = 310;
			rBtn.scaleX=-1;
			gBtn.x = eBtn.x - 26;
			bBtn.x = gBtn.x - 26;
			rBtn.x = bBtn.x - 26;
			cBtn.x = rBtn.x - 26;
			rBtn.addChild(new ImgPlanes1());
			gBtn.addChild(new ImgPlanes2());
			bBtn.addChild(new ImgPlanes1());
			cBtn.addChild(new ImgCube());
			eBtn.addChild(new ImgCenter());
			addChild(rBtn);
			addChild(gBtn);
			addChild(bBtn);
			addChild(cBtn);
			addChild(eBtn);
			rBtn.addEventListener(MouseEvent.CLICK,gotoR);
			gBtn.addEventListener(MouseEvent.CLICK,gotoG);
			bBtn.addEventListener(MouseEvent.CLICK,gotoB);
			cBtn.addEventListener(MouseEvent.CLICK,gotoC);
			eBtn.addEventListener(MouseEvent.CLICK,gotoE);
		}
		function gotoR(e:MouseEvent):void{
			goto(expansions.indexOf('r'));
		}
		function gotoG(e:MouseEvent):void{
			goto(expansions.indexOf('g'));
		}
		function gotoB(e:MouseEvent):void{
			goto(expansions.indexOf('b'));
		}
		function gotoC(e:MouseEvent):void{
			goto(expansions.indexOf('c'));
		}
		function gotoE(e:MouseEvent):void{
			goto(expansions.indexOf('e'));
		}
		function goto(n:int):void{
			endExpansion = n;
			stay = true;
			play();
		}
		
		//Results function
		
		function showResults(e:MouseEvent=null):void{
			rgbSwitch(results);
		}
		function showDaily(e:MouseEvent):void{
			rgbSwitch(daily);
		}/*
		function showTone(e:MouseEvent):void{
			rgbSwitch(tone);
		}*/
		function rgbSwitch(rgb:String):void{
			for(var i:int = 0; i < 27; i++) {
				var boxTern:String = Auxiliar.intToString(i,3);
				var box:State = this['box'+boxTern] as State;
				box.setRef(rgb);
			}
			mbtiBoard.update(rgb,this['box111'].value);
		}
		
		function push(base:String,center:String):String{
			var v:Array = [0,1,2,0,1,2,0], r:String = '';
			for(var i:int=0; i < 3; i++){
				var c:String = center.charAt(i);
				r+= c=='1' ? base.charAt(i) : v[int(base.charAt(i))+int(c)+2];
			}
			return r;
		}
	}
	
}
