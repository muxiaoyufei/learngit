/*
		接口地址：api/checkUser.php
		请求接口时需要一个SQL查询条件：
		"condition": "user='" + this.value + "'"
		
		作用：校验用户输入的用户名|手机号|邮箱账号是否已经存在
		如果存在接口响应的内容：1，反之：0
		*/
        function main(){
            var _reg={
                "account":/^\w{6,12}$/g,//验证用户账号的长度够不够，并且限制只能字母数字下横线
                "mobile":/^1[345678]\d{9}$/g,//验证手机号
                "mail":/^\w+@([a-z0-9-]+\.)+[a-z]+$/gi,//验证邮箱
                "secret":/^.{6,20}$/g //验证密码
            }
            document.getElementById("userName").onblur=function(){
				_reg.account.lastIndex=0;
                if(_reg.account.test(this.value)) {
                    var _self=this;
                    $.post("api/checkUser.php", {"condition": "user='" + this.value + "'"}, function (data,textStatus) {
                        if (textStatus=="success" && parseInt(data) > 0) {
                        	_self.parentNode.children[2].style.background="url(img/tu1.gif) no-repeat -708px -262px";
                            _self.parentNode.children[2].innerHTML = "该用户名已存在";
                        }else{
							_self.parentNode.children[2].innerHTML = "<img src='img/input.jpg'>";
						}
                    });
                }else{
                	this.parentNode.children[2].style.background="url(img/input1.gif) no-repeat left center";
                	this.parentNode.children[2].style.paddingLeft=23+"px";
                    this.parentNode.children[2].innerHTML = "请输入6-16个字符(包括小写字母、数字、下划线)！";
                }
            }
            document.getElementById("mail").onblur=function(){
				_reg.mail.lastIndex=0;
                if(_reg.mail.test(this.value)) {
                    var _self=this;
                    $.post("api/checkUser.php", {"condition": "mail='" + this.value + "'"}, function (data, textStatus) {
                        if (textStatus=="success" && parseInt(data) > 0) {
                            _self.parentNode.children[2].innerHTML = "*该邮箱账号已被占用，请重新输入！！";
                        } else {
                            _self.parentNode.children[2].innerHTML = "<img src='img/input.jpg'>";
                        }
                    });
                }else{
                    this.parentNode.children[2].innerHTML = "*邮箱格式不正确！！";
                }
            }
            /*验证密码是否符合要求*/
        	document.getElementById("password").onblur=function(){
        		_reg.secret.lastIndex=0;
        		this.value=document.getElementById("password").value;
        		var pwd_f=document.getElementById("password").value;
        		if(_reg.secret.test(this.value)){
        			var _self=this;
        			$.post("api/checkUser.php", {"condition": "secret='" + this.value + "'"}, function (data, textStatus) {
                        if (textStatus=="success" && (pwd_f.length>5 &&pwd_f.length<17)){
                        	_self.parentNode.children[2].innerHTML ="<img src='img/input.jpg'>";  
                        } 
                    });
        		}else{
        			  this.parentNode.children[2].innerHTML ="密码长度错误";
        		}
        	}
          	/*两次输入密码是否一致*/
        	document.getElementById("rPassword").onblur=function(){
        		_reg.secret.lastIndex=0;
        		var pwd_f=document.getElementById("password").value;
                var pwd_s=document.getElementById("rPassword").value;
                if(pwd_f==pwd_s){
                	this.parentNode.children[2].innerHTML ="<img src='img/input.jpg'>"; 
                }
                else{
                    document.getElementById("comment").innerHTML="两次输入的密码不匹配，请重新输入";
                }
        	}
        /*点击判断注册是否完成*/
        	document.getElementById("regClick").onclick=function(){
                var pwd_f=document.getElementById("password").value;
                var pwd_s=document.getElementById("rPassword").value;
                var spanValue = document.getElementById("code1");
				var inputValue = document.getElementById("check").value;
				var str =spanValue.innerHTML;
				var num=0;
				var _params={
                        "user":document.getElementById("userName").value,
                        "mail":document.getElementById("mail").value,
                        "secret":document.getElementById("password").value
                    };
					_reg.account.lastIndex=0;	
					_reg.mail.lastIndex=0;
					_reg.secret.lastIndex=0;
				for (var i=0; i<str.length; i++){
						if (inputValue.charCodeAt(i) == str.charCodeAt(i) || inputValue.charCodeAt(i) == str.charCodeAt(i)+32) {
							if (num%3==0 && num!=0){
			                    if(_reg.account.test(_params.user) && _reg.mail.test(_params.mail) && _reg.secret.test(_params.secret)){
			                        $.post("api/registerUser.php", _params, function (data,textStatus) {
			                        	console.log(data)
			                            if (textStatus=="success" && parseInt(data)>0) {
			                                alert("您已顺利成为会员！！！");
			                            } else {
			                                alert("尊敬的用户您好，您注册会员操作失败，请重试，或者联系管理员！！！");
			                            }
			                        });
			                    }else{
			                        alert("尊敬的用户您好，您的基本信息不完整，为了安全请完善！！");
			                    }
			                }else{
			                	num++;
			                }
			                
                		}else{
                			alert("验证失败！")
                			return;
                	}
            	}
        	}
    	}
        function Yan(){
			var _self=this;
			console.log(this);
			this.spanValue = document.getElementById("code1");
			this.span = document.getElementById("code2");
			this.inputValue = document.getElementById("check");
			this.span.onclick=function(){
				var str="";
				for (var i=0; i<4; i++) {
					str+=_self.pan();
					console.log(_self)
					_self.spanValue.innerHTML=str;
				}
				
			}
			this.pan=function(){
				var n=Math.floor(Math.random()*91);
				while(!((n>=48 && n<=57) || (n>=65 && n<=90))){
					n=Math.floor(Math.random()*91);
				}
				return String.fromCharCode(n);
			}
		}
        
        window.onload=function(){
        	var _yan=new Yan();
        	main();
        }
        










