function getByClass(oParent,sClass){
   var aEle=oParent.getElementsByTagName('*');
   var aResult=[];
   for(var i=0;i<aEle.length;i++){
	     if(aEle[i].className==sClass){
			   aResult.push(aEle[i]);
			 }
	   }
   return aResult;
}
window.onload=function(){
	alert("a");
	var oDiv =document.getElementById("img");
	var oUl = getByClass(oDiv,'imglist')[0];
	var oUl2 = getByClass(oDiv,'biao')[0];
	var aLi = oUl.getElementsByTagName('li');
	var aLi2 = oUl2.getElementsByTagName('li');
	var nowIndex = 2;
	for(var i=0;i<aLi2.length;i++){
		aLi2[i].index= i;
		aLi2[i].onmouseover = function(){
			alert("ad");
			aLi[this.index].style.zIndex = nowIndex++;
		}
		
	
	function tab(){
				if(now==0){
					startMove(oUl,'left',0);
				}else if(now==aLi.length-1){
					startMove(oUl,'left',-(now-2)*aLi[0].offsetWidth);
				}else{
					startMove(oUl,'left',-(now-1)*aLi[0].offsetWidth);
				}
		}
		
}
