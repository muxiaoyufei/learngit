function main() {
            $("#regClick").click(function () {
                var user=$("#userName").val();
                var pwd_f = $("#password").val();
                var _params = {
                    "user": user,
                    "password": pwd_f
                };
                console.log(user);
                console.log(pwd_f);
                $.post("api/login.php", _params, function (data,textStatus) {
                	console.log(data);
                    try{
						if(data=="0"){
							$("#top").html("<a href=\"login.html\">login</a>");
						}else{
							alert("欢迎:"+data+" 光顾!!");
							window.location.href="index.html";
						}
                    }catch (e){
                        alert("忘记密码了吗?");
                    }
                });
            });
        }
        $(function(){
			main();
		})