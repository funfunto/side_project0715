var info = [];
var title = document.querySelector('.selectedRegion');
var area = '三民區';
var pageNum = 1;

// 導入JSON並且初始化頁面
var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null);
xhr.onload = function() {
	var data = JSON.parse(xhr.responseText);
	info = data.result.records;
	listInfo();
}

// 下拉選擇
var select = document.getElementById('selectRegion');
select.addEventListener('change',function chooseBySelect(e) {
	area = e.target.value;
	if (area == 'none'){return}
	listInfo();
});
// 按鈕選擇
var btns = document.querySelectorAll('.regionBtn');
for (var i=0; i<btns.length; i++) {
	btns[i].addEventListener('click',function chooseByBtn(e) {
		area = e.target.value;
		listInfo();
	});
}
//頁碼選擇
var page = document.querySelector(".pages");
page.addEventListener('click',function(e) {
	if(e.target.nodeName !== 'A'){return}
	pageNum = parseInt(e.target.textContent);
	listInfo();
});

//上下頁
var pnBtn = document.querySelector('.choosePage');
pnBtn.addEventListener('click',function(e){
	var check = e.target.attributes[1].value
	if(check !== 'next' && check !== 'prev'){return};
	if(check == 'next') {
		pageNum++;
		listInfo();
	} else if(check == 'prev') {
		pageNum--;
		listInfo();
	}
})

function listInfo() {
	var list = document.querySelector('.list');
	var cardStr = '';
	var pageStr = '';
	var count = 0;
	var tempArray = [];

	//建立字串，放入臨時array
	for(var i=0; i<info.length; i++) {
		if(info[i].Zone == area) {
			count++;
			card = `
			<div class="regionCard">
				<div class="cover picture${i}" style="background-image: url(${info[i].Picture1});">
					<p class="location">${info[i].Name}</p>
					<p class="regionName">${area}</p>
				</div>
				<div class="info">
					<p class="bh">${info[i].Opentime}</p>
					<p class="address">${info[i].Add}</p>
					<p class="phone">${info[i].Tel}</p>
					<p class="tag">${info[i].Ticketinfo}</p>
				</div>
			</div>`;
			tempArray.push(card);
		}
	}

	// 透過頁碼與資料數量的關係判斷該放入幾筆資料
	var n = parseInt((pageNum*10)-tempArray.length);
	if(n<0) {
		for(var i=((pageNum-1)*10), j=(i+10); i<j; i++) {
			cardStr+= tempArray[i];
		}
	} 
	else {
		var k = (tempArray.length)%10;
		for(var i=0; i<k; i++) {
			cardStr+= tempArray[parseInt((pageNum-1)+i)];
		}
	}
	title.textContent = area;
	list.innerHTML = cardStr;

	//藉由資料數建立頁數
	var pages = Math.ceil(count/10);
	var target = document.querySelector('.pages');
	for(var i=0; i<pages; i++) {
		pageStr+=`<a href="#" class="pageNum">${(i+1)}</a>`
	}
	target.innerHTML = pageStr;

	//改變頁碼顏色
	var targets = document.querySelectorAll('.pages a');
	for(var i=0; i<targets.length; i++) {
		if(targets[i].classList.contains('selected')) {
			targets[i].classList.remove('selected');
		}
		if((i+1) == pageNum) {
			targets[i].classList.add('selected');
		}
	}

	//改變上下頁按鈕顏色
	var prev = document.querySelector('.prev').classList;
	var next = document.querySelector('.next').classList;

	if(prev.contains('disable')) {
		prev.remove('disable');
	} else if(next.contains('disable')) {
		next.remove('disable');
	}

	if(pageNum == 1) {
		prev.add('disable');
	} else if(pageNum > (tempArray.length/10)) {
		next.add('disable');
	}
}