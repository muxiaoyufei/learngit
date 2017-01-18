function selecting(){
	var _ul1=$("#ul1");
	var _li=$("#ul1 > li");
	for(var i=0;i<_li.length;i++){
		_li[i].onmouseenter=function(){
			this.children[1].style.display="block";
				
		}
		_li[i].onmouseleave=function(){
			this.children[1].style.display="none";
		}
	}
}
function banner(){
	var i=0;
		var _timer=0;
		function delay(){
			$("#btn span").eq(i).css("background-color","red");
			$("#images a").eq(i).css({
				"display":"none",
				"opacity":0.3
			});
			i++;
			if(i>=$("#images a").size()){
				i=0;
			}
			$("#images a").eq(i).css("display","block");
			$("#btn span").eq(i).css("background-color","#ccc");
			player(true);
		}
		function player(_cmd){
			$("#btn span").eq(i).css("background-color","#ccc");
			$("#images a").eq(i).animate({
				"opacity":1,
			},600,function(){
				if(_cmd){
					window.clearTimeout(_timer);
					_timer=window.setTimeout(delay,2000);
				}else{
					$("#images a").eq(i).stop();
					window.clearTimeout(_timer);
				}
			});
		}
		player(true);
		
		function eventHandle(_current){
			$("#images a").eq(i).finish();
			$("#images a").css({
				"display":"none",
				"opacity":0.3
			});
			$("#btn span").css({
				"background-color":"red"
			});
			$(_current).css({
				"background-color":"#ccc"
			});
			i=$(_current).index();
			$("#images a").eq(i).css({
				"display":"block"
			});
			window.clearTimeout(_timer);
			player(false);
		}
		$("#main").mouseenter(function(){
			window.clearTimeout(_timer);
			$("#images a").eq(i).stop();
		});
		$("#main").mouseleave(function(){
			player(true);
		});
		$("#btn span").mouseenter(function(){
			eventHandle(this);
		});
		$("#arrow span.left").click(function(){
			eventHandle($("#btn span").eq(--i)[0]);
		});
		$("#arrow span.right").click(function(){
			eventHandle($("#btn span").eq(++i)[0]);
		});
}
window.onload=function(){
	selecting();
	banner();
}
