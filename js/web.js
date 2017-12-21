	//标签变成字符串
	var templete ='<div class="mask">\
		<div class="from">\
			<div class="cancel"></div>\
			<from class="c-from">\
				<legend>登陆网易云课堂</legend>\
				<input type="text" placeholder = "亲的账号" class="user"/>\
				<input type="password" placeholder="亲的密码" class="password"> \
				<button class="login">登录</button>\
			</from>\
		</div>\
			<div></div>\
		</div>';
		//节点的生成
			function htmlNode(str){
				var container = document.createElement('div');
				container.innerHTML = str;
				return container.children[0];
			}

		function Login(){
			this.container = this._Node.cloneNode(true);
			this._initEvent();
		}

		//可以吸收A or B or C对象的属性
		function extend(o1,o2){
			for(var i in o2){
				if (o1[i] === undefined){
					o1[i] = o2[i];
				}
			}
			return o1;
		}

		extend(Login.prototype,{
			_Node: htmlNode(templete),
			show: function(){
				document.body.appendChild(this.container);
			},
			hide: function(){
				document.body.removeChild(this.container);
			},
			addEvent: function(classN,type,handler){
				this.container.querySelector(classN).addEventListener(type,handler,false);
			},
			_initEvent: function(){
				this.addEvent('.cancel','click',this._Cancel.bind(this));
				this.addEvent('.login','click',function(){
					alert("请完整输入");
				})
			},
			_Cancel: function(){
				this.hide();
			}
		})

		var login = new Login();

		// document.querySelector('.change').addEventListener('click',function(){
		// 	login.show();
		// },false)

		var attention = document.querySelector('.attention');
		attention.addEventListener('click',function(){
			login.show();
		},false);
