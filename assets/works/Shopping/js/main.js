var listArray = [];

const delBtn = document.querySelector(".list");
delBtn.addEventListener('click', delItem);

const addBtn = document.querySelector(".add");
addBtn.addEventListener('click', addItem);
// document.onkeydown = (e) => {
//   if(e.keyCode = 13) {
//     addItem();
//   }
// }

getList();

function getList() {
  let get = localStorage.getItem('shoppingList');
  if(get === null || get === '[]'){return};
  listArray = JSON.parse(get);
  updataList();
}

function addItem() {
  let name = document.querySelector(".itemName");
  let price = document.querySelector(".itemPrice");
  if(!name.value || !price.value){
    alert('請輸入資料!');
    return
  };
  let obj = {};
  obj.name = name.value;
  obj.price = price.value;

  listArray.push(obj);
  updataList();
  name.value = '';
  price.value = '';
}

function delItem(e) {
  if(e.target.nodeName != 'BUTTON'){return};
  let num = e.target.dataset.num;
  listArray.splice(num, 1);

  updataList();
}

function updataList() {
  let str = '';
  let sum = 0; 
  let list = document.querySelector('.list');
  let total = document.querySelector('.count');
  listArray.forEach(buildStr);

  function buildStr(obj, index) {
    sum += parseInt(obj.price);
    str +=`
    <li class="item">
      <section class="name">${index+1}.${obj.name}</section>
      <div class="warp">
        <section class="money">${obj.price} $</section>
        <button class="del" data-num="${index}">x</button>
      </div>
    </li>
    `;
  }
  list.innerHTML = str;
  total.textContent = sum+' $';

  let save = JSON.stringify(listArray);
  localStorage.setItem('shoppingList',save);
}


