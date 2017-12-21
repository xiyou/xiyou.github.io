//  最热排行榜
//  获取类名为img、h、span的标签
	var imgS = document.querySelectorAll('.ptoto-load'),
		 h4S = document.querySelectorAll('.title'),
		 spanS = document.querySelectorAll('._learner');

	var xhrHttp = new XMLHttpRequest();
	xhrHttp.onreadystatechange = function(){
		if (xhrHttp.readyState == 4){
			if ((xhrHttp.status >= 200 && xhrHttp.status <300) || xhrHttp.status == 304){
			
			var toObj = JSON.parse(xhrHttp.responseText);
			var filter = JSON.stringify(toObj,["bigPhotoUrl","name","learnerCount"],4);
			var backme = JSON.parse(filter);
			backme.sort(randomsort);
			loadDate(backme);

			// setInterval(function(){	
			// var toObj = JSON.parse(xhrHttp.responseText);
			// var filter = JSON.stringify(toObj,["bigPhotoUrl","name","learnerCount"],4);
			// var backme = JSON.parse(filter);
			// backme.sort(randomsort);
			// console.log(backme[0]);
			// loadDate(backme);}
			// ,5000);
		
			} else {
				alert("Requset unsuccessful " + xhrHttp.status);
			}
		}
	}
	xhrHttp.open("GET","http://study.163.com/webDev/hotcouresByCategory.htm",false);
	xhrHttp.send(null);
	//实现了随机要求
	function randomsort(a, b) {
   		return Math.random()>.5 ? -1 : 1;
	}
	function loadDate(arr){
		var i = 0;
		for(i=0; i < 20; i++){
		imgS[i].src = arr[i].bigPhotoUrl;//循环可行吗
		h4S[i].innerHTML = arr[i].name;
		spanS[i].innerHTML = arr[i].learnerCount;	
		}
	}
	
	var desigin = document.getElementById('product_design'),
		program = document.getElementById('program');
	desigin.addEventListener('click',function(){
		desigin.className = 'change_Tab';
		program.className = "";
		getAjax(url1);
	},false);
	program.addEventListener('click',function(){
		program.className = 'change_Tab';
		desigin.className = "";
		getAjax(url2);
	},false);

	//最热排行榜的更新
		var px = -69;
	    var list = document.querySelector('.list');
	    setInterval(function(){
	    	list.style.top = px +"px";//是一直在执行这个
	    	px += -69;
	    	if (px == -690){
	    		list.style.top= 0 +"px";
	    		px = -69;
	    	}
	    },5000)
