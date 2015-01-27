function menu(){
	$.ajax({
		"url":"http://localhost/gjxy/index.php/interfaces/menu",
		"type":"post",
		"cache":false,
		"dataType":"json",
		"data":"",
		"success":function(result){
			/*var result = eval(result);*/
			var str="";
			for(var i=0;i<result.length;i++){
				str+='<li><a herf="#">'+result[i].menu_name+'</a></li>'
			}
			$("#navde").html(str);
		},
		"error":function(){
				alert(12);
		}
	})
}