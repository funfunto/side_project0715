var btn = document.getElementById('btnCalculate');
var btnStatus = 0;
var height = document.querySelector('.height');
var weight = document.querySelector('.weight');
var list = document.querySelector('.list');
var array = [];

height.onfocus = function(e) {focus(e)};
height.onblur = function(e) {blur(e)};
weight.onfocus = function(e) {focus(e)};
weight.onblur = function(e) {blur(e)};
btn.addEventListener('click',pressBtn);
// document.onkeydown = (e) => {
// 	if(e.keyCode = 13) {
// 		pressBtn();
// 	}
// }

getRecord();

function pressBtn() {
	if(btnStatus == 0) {
		BMI();
		btnStatus = 1;
	}
	else if(btnStatus == 1) {
		reset();
		btnStatus = 0;
	}
}

// 優化操作體驗
function focus(e) {
	e.target.value = '';
}
function blur(e) {
	if(!e.target.value) {
		var className = e.target.className;
		switch (className) {
			case 'height':
				e.target.value = '請輸入身高';
				break;
			case 'weight':
				e.target.value = '請輸入體重';
				break;
		}
	}
}

//以下為主要功能
function getRecord() {
	var el = localStorage.getItem('recordBMI');
	if(!el || el == []){return};
	array = JSON.parse(el);
	updateList();
}

function updateList() {
	var str = "";
	for(var i=0; i<array.length; i++){
		str +=`
		<li>
			<span class="lightBar ${array[i].lightBar}"></span>
			<span class="status">${array[i].status}</span>
			<span class="cell">
				<span class="BMI sTitle">BMI</span>
				<span class="value">${array[i].BMI}</span>
			</span>
			<span class="cell">
				<span class="weight sTitle">Weight</span>
				<span class="value">${array[i].weight}kg</span>
			</span>
			<span class="cell">
				<span class="weight sTitle">Height</span>
				<span class="value">${array[i].height}cm</span>
			</span>
			<span class="time">${array[i].recordTime}</span>
		</li>`;
	}
	list.innerHTML = str;
}

function BMI() {
	var lightBar = "";
	var status = "";
	var m = (height.value)/100;
	var kg = weight.value;
	var BMI = (kg/(m*m)).toFixed(2);

	if(BMI == "NaN") {
		alert('請輸入正確的數值!');
		return
	}

	var T = new Date();
	var MM = T.getDate();
	var DD = T.getDay();
	var YY = T.getFullYear();
	var recordTime = MM+'-'+DD+'-'+YY;

	if(BMI<18.5) {
		status = '過輕';
		lightBar = 'blue';
		btn.setAttribute("class","blue");
	} 
	else if(18.5<=BMI && BMI<24) {
		status = '理想';
		lightBar = 'green';
		btn.setAttribute("class","green");
	} 
	else if(24<=BMI && BMI<27) {
		status = '過重';
		lightBar = 'orange1';
		btn.setAttribute("class","orange1");
	} 
	else if(27<=BMI && BMI<30) {
		status = '輕度肥胖';
		lightBar = 'orange2';
		btn.setAttribute("class","orange2");
	} 
	else if(30<=BMI && BMI<35) {
		status = '中度肥胖';
		lightBar = 'orange2';
		btn.setAttribute("class","orange2");
	} 
	else if(BMI>=35) {
		status = '重度肥胖';
		lightBar = 'red';
		btn.setAttribute("class","red");
	}
	document.querySelector('.valueOnBtn').textContent = BMI;

	array.push({
		'lightBar': lightBar,
		'status': status,
		'height': m,
		'weight': kg,
		'BMI': BMI,
		'recordTime': recordTime,
	})

	var saveArray = JSON.stringify(array);
	localStorage.setItem('recordBMI',saveArray);
	updateList();
}

function reset() {
	btn.setAttribute("class","default");
	height.value = '請輸入身高';
	weight.value = '請輸入體重';
}