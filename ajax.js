// JavaScript Document
/*
  nav()导航获取
  subnav()二级栏目的获取
  messageList()文章列表的获取
  messageInfor()文章内容的获取
  
  pictures()图片获取
  Scroll()滚动图片获取
  move()图片滚动效果
  
  news()新闻列表获取
  source()资源列表获取
  
  homePageTeacher()老师首页全部信息获取
  teacherInfor()老师介绍
  teacherPics()全部图片的获取
  message() 留言及回复获取
  
*/

var arr=[
			'http://localhost/project/dldz/templates/home.html',
			'http://localhost/project/dldz/templates/couseIntroduction.html',
			'http://localhost/project/dldz/templates/teachingTeam.html',
			'http://localhost/project/dldz/templates/teachingContent.html',
			'http://localhost/project/dldz/templates/teachingFeature.html',
			'http://localhost/project/dldz/templates/teachingCondition.html',
			'http://localhost/project/dldz/templates/teachingEvaluation.html',
			'http://localhost/project/dldz/templates/teachingExperiment.html',
			'http://localhost/project/dldz/templates/teachingAnalyse.html'
		]
//图片
function move(){
 var oDiv=document.getElementById('RY_play');
 var oUl=document.getElementById('scroll');
 var aLi=oUl.getElementsByTagName('li');
 oUl.innerHTML=oUl.innerHTML+oUl.innerHTML;
 oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
 var speed=3;
 var timer=null;
 function move(){
	   if(oUl.offsetLeft>0){
		   oUl.style.left=-oUl.offsetWidth/2+'px';
		   }
	    oUl.style.left=oUl.offsetLeft+speed+'px';
	 }
  timer=setInterval(move,30);
  oDiv.onmouseover=function(){
	   clearInterval(timer)
	  }

  oDiv.onmouseout=function(){
	  timer=setInterval(move,30)
	  }
}
//导航的获取以及二级栏目的获取
function nav(){
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/menu",
			"type":"post",
			"cache":false,
			"data":"",
			"dataType":"json",
			"success":function(result){
				
				var str = "";
				var url1 = new Array();
				var arr=[
				'http://localhost/project/dldz/templates/home.html',
				'http://localhost/project/dldz/templates/couseIntroduction.html',
				'http://localhost/project/dldz/templates/teachingTeam.html',
				'http://localhost/project/dldz/templates/teachingContent.html',
				'http://localhost/project/dldz/templates/teachingFeature.html',
				'http://localhost/project/dldz/templates/teachingCondition.html',
				'http://localhost/project/dldz/templates/teachingEvaluation.html',
				'http://localhost/project/dldz/templates/teachingExperiment.html',
				'http://localhost/project/dldz/templates/teachingAnalyse.html']
				for(var i=0;i<result.menuList.length;i++){
					
				 str += '<li><a href='+arr[i]+'>'+
				 result.menuList[i].menu_name+'</a></li>';
				}
				str+='<li><a href="message.html">留言板</li>'
				$("#nav").html(str);
			},
			"error":function(){
				alert(12);
			}
		})
	}
//二级栏目的获取：
function subnav(id){
	    var ID=id;
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/menu",
			"type":"post",
			"cache":false,
			"data":{'menuID':ID},
			"dataType":"json",
			"success":function(result){
				var str = "";
				var str1='';
			
				   str1+="<h3>"+result.menuList[0].menu_name+"</h3>"
                       messageList(result.menuList[0].Bmenu[0].classid,0);
                     
				   for(var i=0;i<result.menuList[0].Bmenu.length;i++){	
				    result.menuList[0].Bmenu[i].index=i;
				    if(id==3){
				    	if(result.menuList[0].Bmenu[i].menu_name=='师资团队'){str += '<li><a href="http://localhost/project/dldz/templates/teacher-pic.html">'
					   +result.menuList[0].Bmenu[i].menu_name+'</a></li>';}else{
                        str += '<li><a href="http://localhost/project/dldz/templates/teachingTeam.html" onclick="messageList('+result.menuList[0].Bmenu[i].classid+',0)">'
					   +result.menuList[0].Bmenu[i].menu_name+'</a></li>';}
				    }else{
				      str += '<li><a href="javascript:;" onclick="messageList('+result.menuList[0].Bmenu[i].classid+',0)">'
					   +result.menuList[0].Bmenu[i].menu_name+'</a></li>';
					}
		             
				  }
	             
				$("#subnav").html(str);
				$("#title").html(str1);
			},
			"error":function(){
				alert(12);
			}
		})
	}
//文章列表的获取
function messageList(id,start){
		var ID = id;
		//alert(ID);
		var start = start;
		var count = 2;
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/newsList",
			"type":"post",
			"cache":false,
			"data":{'catID':ID,'recStart':start,'recCount':count},
			//"data":{catID:+ID+,recStart:+start},
			"dataType":"json",
			"success":function(result){
				var id = result.newsCatList.newsList[0].id;
				messageInfor(id);
				
			},
			"error":function(){
				//alert(123);
			}
			
		})
	}
//文章信息获取
function messageInfor(id){
	$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/news/"+id,
			"type":"post",
			"cache":false,
			"data":"",
			"dataType":"json",
			"success":function(result){
				var str = "";
				
					str += '<li><h4>'+result.newsContent.title+'</h4>'+'<p class="time">'+result.newsContent.time+'</p>'
					+'</li>'+'<li><p>'+result.newsContent.content+'</p></li>';
				$("#message").html(str);
			},
			"error":function(){
				alert(12);
			}
		})
	
	
	}
//新闻列表的获取
function news(start){
		var ID = -1;
		var start = 0;
		var count = 9;
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/newsList",
			"type":"post",
			"cache":false,
			"data":{'catID':ID,'recStart':start,'recCount':count},
			//"data":{catID:+ID+,recStart:+start},
			"dataType":"json",
			"success":function(result){
				var str = "";
				for(var i=0;i<result.newsCatList.length;i++){
					str += '<li>'+'<a href="http://localhost/project/dldz/templates/children.html#id='+result.newsCatList[i].id+'">'+result.newsCatList[i].title
					+'</a>'+'<span>'+result.newsCatList[i].time+'</span>'+'</li>';
				}
				$("#news").html(str);
			},
			"error":function(){
				alert(12);
			}
		})
	}
function newsList(start){
		var ID = -1;
		var count = 2;
		//alert(start);
		var sum;
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/newscount",
		    	"type":"post",
		    	"cache":false,
		    	"data":"",
		    	"dateType":"json",
		    	"success":function(result){
		    		sum = result;
		    	}
		})
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/newsList",
			"type":"post",
			"cache":false,
			"data":{'catID':ID,'recStart':start,'recCount':count},
			//"data":{catID:+ID+,recStart:+start},
			"dataType":"json",
			"success":function(result){
				var str = "";
				var str1='';
				if(sum<count){
					str1='<p class="pList"><span>共有'+sum+'条记录</span><span>每页'+result.newsCatList.length+'条</span><span>当前是第'+1+'页</span>'+
				'<a href="javascript:;">首页</a><a href="javascript:;">上一页</a><span><a href="javascript:;">下一页</a></span><span><a href="javascript:;">尾页</a></span>'+'</p>'
					 for(var i=0;i<result.newsCatList.length;i++){
					str += '<li>'+'<a href="http://localhost/project/dldz/templates/children.html#id='+result.newsCatList[i].id+'">'+result.newsCatList[i].title
					+'</a>'+'<span>'+result.newsCatList[i].time+'</span>'+'</li>';
				     }
					
					}else{
						if(sum%count){
						    var page=parseInt(sum/count)+1;
						}else{
							var page=sum/count;
							}
							var currentpage = parseInt(start/count)+1;
						last=(page-1)*count;
						if(start-count < 0){
							previous = 0;
						}
						else
							previous = start-count;  
						if(start>=(sum-count))
							next = (page-1)*count;
						else
							next = start + count; 
							 
						 for(var i=0;i<result.newsCatList.length;i++){
					      str += '<li>'+'<a href="http://localhost/project/dldz/templates/children.html#id='+result.newsCatList[i].id+'">'+result.newsCatList[i].title
					      +'</a>'+'<span>'+result.newsCatList[i].time+'</span>'+'</li>';
						 	//alert(result.newsCatList[i].title)
					      }
						  str1='<p class="pList"><span>共有'+sum+'条记录</span><span>每页'+count+'条</span><span>当前是第'+currentpage+'页</span>'+
				'<a href="javascript:;"onclick="newsList(0)">首页</a><a href="javascript:;"onclick="newsList('+previous+')">上一页</a><span><a href="javascript:;"onclick="newsList('+next+')">下一页</a></span><span><a href="javascript:;" onclick="newsList('+last+')">尾页</a></span>'+'</p>'
					     
						}
				
				
				$("#news").html(str);
				$('#page').html(str1)
			},
			"error":function(){
				alert(12);
			}
		})
	}

//首页文章信息获取
function book(){
		var ID = 0;
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/newsList",
			"type":"post",
			"cache":false,
			"data":{'catID':ID},
			//"data":{catID:+ID+,recStart:+start},
			"dataType":"json",
			"success":function(result){
				var str = "";
				
					str += '<p>'+result.newsCatList.content+'</p>';
				
				$("#bookInfo").html(str);
			},
			"error":function(){
				alert(12);
			}
		})
	}

//课程图片,news图片
function pictures(id,place){
		var ID = id;
		var start = 1;
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/picture",
			"type":"post",
			"cache":false,
			"data":{'catID':ID,'recStart':start},
			//"data":{catID:+ID+,recStart:+start},
			"dataType":"json",
			"success":function(result){
				var str = "";
				for(var i=0;i<result.picList.length;i++){
					str += '<img src='+result.picList[i].imageUrl+' class="book" />';
				}
				$(place).html(str);
			},
			"error":function(){
				alert('12');
			}
		})
	}
//滚动的图片
function Scroll(id,place){
		var ID = id;
		var start = 1;
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/picture",
			"type":"post",
			"cache":false,
			"data":{'catID':ID,'recStart':start},
			//"data":{catID:+ID+,recStart:+start},
			"dataType":"json",
			"success":function(result){
				var str = "";
				for(var i=0;i<result.picList.length;i++){
					str += '<li>'+'<img src='+result.picList[i].imageUrl+' />'
					+'</li>';
				}
				$(place).html(str);
				move();
			},
			"error":function(){
				alert('12');
			}
		})
	}
//source首页列表获取
function source(){
		var ID = 0;
		var start = 0;
		var count = 7;
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/resource",
			"type":"post",
			"cache":false,
			"data":{'catID':ID,'recStart':start,'recCount':count},
			//"data":{catID:+ID+,recStart:+start},
			"dataType":"json",
			"success":function(result){
				var str = "";
				for(var i=0;i<result.resourceList.length;i++){
					str += '<li>'+'<a href="'+result.resourceList[i].downloadUrl+'">'+result.resourceList[i].title
					+'</a>'+'<span>'+result.resourceList[i].time+'</span>'+'</li>';
				}
				$("#source").html(str);
			},
			"error":function(){
				alert('12');
			}
		})
}
//全部资源的获取
function sourceLoad(){
		var ID = 1;
		var start = 1;
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/resource",
			"type":"post",
			"cache":false,
			"data":{'catID':ID,'recStart':start},
			//"data":{catID:+ID+,recStart:+start},
			"dataType":"json",
			"success":function(result){
                var str1 = "";
				var str2='';
				for(var i=0;i<result.resourceList.length;i++){
					k = i+1;
					//alert(i);
					if(k%2){
						 str1 += '<h3>'+result.resourceList[i].title
					      	 +'</h3>';
					 if(result.resourceList[i].resourceCatList.length){
					     for(var j=0;j<result.resourceList[i].resourceCatList.length;j++){
						   //alert(j);
						   str1+='<li><a href="'+result.resourceList[i].resourceCatList[j].downloadUrl+'">'+
						   result.resourceList[i].resourceCatList[j].title+'</a><span>'+
							result.resourceList[i].resourceCatList[j].time+'</span></li>';
						  } 
					    }
								 
					 }else{	
					     str2 += '<h3>'+result.resourceList[i].title
					      	 +'</h3>';
						if(result.resourceList[i].resourceCatList.length){			  
						   for(var j=0;j<result.resourceList[i].resourceCatList.length;j++){
							  	//alert(j);
							    str2+='<li><a href="'+result.resourceList[i].resourceCatList[j].downloadUrl+'">'+
				            	result.resourceList[i].resourceCatList[j].title+'</a><span>'+
					            result.resourceList[i].resourceCatList[j].time+'</span></li>';
							  }	 
						   }
						 }
					//alert(str1);
				}
				$("#part1").html(str1);
				$("#part2").html(str2);
				
			},
			"error":function(){
				alert('12');
			}
		})
}
//老师首页信息获取
function homePageTeacher(){
		var ID = 1;
		var start = 1;
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/teacher",
			"type":"post",
			"cache":false,
			"data":{'catID':ID,'recStart':start},
			//"data":{catID:+ID+,recStart:+start},
			"dataType":"json",
			"success":function(result){
				var str = "";
				for(var i=0;i<result.teacherList.length;i++){
					str += '<li><p id="teacherPic"><a href="http://localhost/project/dldz/templates/teacher.html#id='+result.teacherList[i].id+'">'+'<img src='+result.teacherList[i].picUrl+' class="teacher-pic" />'+'</a></p></li>'
					+'<li>'+'姓名：'+'<span>'+result.teacherList[i].teachername+'</span>'+'</li>'+
					'<li>'+'职称：'+'<span>'+result.teacherList[i].title+'</span>'+'</li>'+
					'<li>'+'学位：'+'<span>'+result.teacherList[i].edu+'</span>'+'</li>'+
					'<li>'+'研究方向：'+'<span>'+result.teacherList[i].research+'</span>'+'</li>';
				}
				$("#teacher").html(str);
			},
			"error":function(){
				alert('12');
			}
		})
}
//老师全部图片获取
function teacherPics(){
		var ID = 0;
		var start = 1;
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/teacher",
			"type":"post",
			"cache":false,
			"data":{'catID':ID,'recStart':start},
			//"data":{catID:+ID+,recStart:+start},
			"dataType":"json",
			"success":function(result){
				var str = "";
				for(var i=0;i<result.teacherList.length;i++){
		str += '<li>'+'<a href="http://localhost/project/dldz/templates/teacher.html#id='+result.teacherList[i].id+'">'+'<img src='+result.teacherList[i].picUrl+' class="teacher-pic" />'+'</a>'
		+'<p>'+'<span>'+result.teacherList[i].teachername+'</span>'+'('+'<span>'+result.teacherList[i].title+'</span>'+')'+'</p>'+
		'</li>';
				}
				$("#pics").html(str);
			},
			"error":function(){
				alert('12');
			}
		})
}
//教师介绍
function teacherInfor(id){
		
		var ID = 1;
		var start = 1;
		var url = "http://localhost/project/dldz/index.php/interfaces/teacherintro/"+id;
		$.ajax({
			"url":url,
			"type":"post",
			"cache":false,
			"data":{'catID':ID,'recStart':start},
			//"data":{catID:+ID+,recStart:+start},
			"dataType":"json",
			"success":function(result){
				var str = "";
				str += '<li><p id="introduction">'+'<img src='+result.teacherInfo.picUrl+' class="teacher-pic" />'+'</p></li>'
				+'<li>'+'姓名：'+'<span>'+result.teacherInfo.name+'</span>'+'</li>'
				+'<li>'+'职称：'+'<span>'+result.teacherInfo.title+'</span>'+'</li>'
				+'<li>'+'学历：'+'<span>'+result.teacherInfo.edu+'</span>'+'</li>'
				+'<li>'+'单位：'+'<span>'+result.teacherInfo.units+'</span>'+'</li>'
				+'<li>'+'方向：'+'<span>'+result.teacherInfo.research+'</span>'+'</li>'
				+'<li>'+'电话：'+'<span>'+result.teacherInfo.phone+'</span>'+'</li>'
				+'<li>'+'信箱：'+'<span>'+result.teacherInfo.email+'</span>'+'</li>'
                +'<li>'+'教师简介：'+'<p>'+result.teacherInfo.introduction+'</p>'+'</li>';
				
				$("#teacherInformation").html(str);
			},
			"error":function(){
				alert('12');
			}
		})
}

function clogin(){
	var Opinion=document.getElementById('opinion');
	var aSpan = Opinion.getElementsByTagName('span');
	$.ajax({
		"url":"http://localhost/project/dldz/index.php/interfaces/clogin",
		"type":"get",
		"cache":false,
		"data":"",
		"dataType":"",
		"success":function(result){
			if(result == 1){
				for(var i=0;i<aSpan.length;i++)
				{
					aSpan[i].style.display="block";
				}
			}
		},
		"error":function(){
			alert(12);
		}
	})
}

function message(){
	
	$.ajax({
		"url":"http://localhost/project/dldz/index.php/interfaces/messageobtain",
		"type":"post",
		"cache":false,
		"data":"",
		"dataType":"json",
		"success":function(result){
			var str = "";
			for(var i=0;i<result.messageObtain.length;i++)
			{
				str += ' <li class="opinionLi"><b class="pdl60">'+result.messageObtain[i].name+'</b><b class="Btime">'+result.messageObtain[i].create_time+'</b><p>'+result.messageObtain[i].comment+'</p><span><label>回复</label><em>删除</em><input type="hidden" value="'+result.messageObtain[i].id+'"/></span><div class="replay"><textarea id="Lreply"></textarea><button>发表</button></div>';
				
				if(result.messageObtain[i].reply != ""){
					str += '<ul>'+'<li><b class="pdl60">管理员</b><b class="Btime">'+result.messageObtain[i].update_time+'</b><p>'+result.messageObtain[i].reply+'</p></li>'+'</ul>';
				}
				str += '</li>';
			}
			$("#opinion").html(str);
		    ry.app.opinion();
			Ldelete();
			clogin();
		},
		"error":function(){
			alert(12);
		}
	})	
}



function Lsubmit()
{
	var s1 = null;
	var s2 = null;
	var s3 = null;
	$('#fabiao').click(function(){
	   var username = $('#uname').val();
	   var email = $('#box').val();
	   var message = $('#Lmessage').val();
	   if(username == ""){
		alert("用户名不能为空");
			s1 = false;
	   }else{
			s1 = true;
	   }
	   var search_str = /\w{3,16}@\w{1,64}.\w{2,5}/;
	   if(email == "" || !search_str.test(email)){
		alert("邮箱为空或格式不正确");
		s2 = false;
	   }else{
			s2 = true;
	   }
	   if(message == ""){
		alert("留言不能为空");
		s3 = false;
	   }else{
		s3 = true;
	   }
	   if(s1 && s2 && s3){
		$.ajax({
			"url":"http://localhost/project/dldz/index.php/interfaces/messageadd",
			"type":"post",
			"cache":false,
			"data":{'username':username,'email':email,'message':message},
			"dataType":"json",
			"success":function(result){
				if(result == 1){
					window.location.reload();
				}else{
					alert('发表失败！');
				}
			},
			"error":function(){
				alert(11);
			}
		})
	   }
	})
	
}

function Ldelete(){
    var emLength=$('#opinion em');
	var inputLength=$('#opinion input');
	//alert(emLength.length);
	for(var i=0;i<emLength.length;i++){
	   	  emLength[i].index=i;
		  emLength[i].onclick=function(){
			    //alert(inputLength[this.index].value);
				$.ajax({
						"url":"http://localhost/project/dldz/index.php/interfaces/messagedelete",
						"type":"post",
						"cache":false,
						"data":{'id':inputLength[this.index].value},
						"dateType":"json",
						"success":function(result){
							if(result == 1){
								window.location.reload();
							}else{
								alert('删除失败！');
							}
						},
						"error":function(){
							alert(11);
						}
				})
			  }
	}

}

function Lreply(ID,message){
	$.ajax({
						"url":"http://localhost/project/dldz/index.php/interfaces/messagereply",
						"type":"post",
						"cache":false,
						"data":{'id':ID,'reply':message},
						"dateType":"json",
						"success":function(result){
							if(result == 1){
								window.location.reload();
							}else{
								alert('回复失败！');
							}
						},
						"error":function(){
							alert(11);
						}
				})
}

function logout(){
	$('#logout').click(function(){
		$.ajax({
						"url":"http://localhost/project/dldz/index.php/interfaces/messagereply",
						"type":"post",
						"cache":false,
						"data":{'id':ID,'reply':message},
						"dateType":"json",
						"success":function(result){
							if(result == 1){
								window.location.reload();
							}else{
								alert('回复失败！');
							}
						},
						"error":function(){
							alert(11);
						}
				})
	})
}
