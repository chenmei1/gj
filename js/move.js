window.onload = function(){
	var oDiv1  = document.getElementById('div1');
	var oDiv2 =document.getElementById('div2');
	var oDiv3 = document.getElementById('div3');
	var oDiv4 = document.getElementById('div4');
	var oDiv5 = document.getElementById('div5');
	oDiv1.onmouseover = function(){
		startMove(this,'width',300);
	}
	oDiv1.onmouseout = function(){
		startMove(this,'width',200);
	}
	oDiv2.onmouseover = function(){
		startMove(this,'height',400)
	}
	oDiv2.onmouseout = function(){
		startMove(this,'height',200)
	}
	oDiv3.onmouseover = function(){
		startMove(this,'fontSize',30)
	}
	oDiv3.onmouseout = function(){
		startMove(this,'fontSize',16)
	}
	oDiv4.onmouseover = function(){
		startMove(this,'opacity',100)
	}
	oDiv4.onmouseout = function(){
		startMove(this,'opacity',30)
	}
	oDiv5.onmouseover = function(){
		startMove(this,'borderWidth',20)
	}
	oDiv5.onmouseout = function(){
		startMove(this,'borderWidth',5)
	}
}
var timer=null;
function startMove(obj,attr,iTarget){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var cur=0;
		if(attr=='opacity'){
			cur = Math.round(parseFloat(getStyle(obj,attr))*100);
		}else{
			cur = parseInt(getStyle(obj,attr));
		}
		var speed = (iTarget-cur)/6;
		speed = speed>0?Math.ceil(speed):Math.floor(speed);
		if(cur==iTarget){
			clearInterval(obj.timer);
		}else{
			if(attr=='opacity'){
				obj.style.filter = 'alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity = (cur+speed)/100;
			}else{
				obj.style[attr] = cur + speed+'px';
			}
		}
	},30);
}
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
	
}