let activeButton;
let activeAct;
let activeAct1;

function getRandomId(){
  let id =  Math.floor(Math.random() * (10000000 - 1) + 1);
  return id
}

function changeButton(){
  let show = document.querySelector('.show')
  show.classList.remove('shown')
  show.innerHTML = 'Показать мои привычки'
}

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("delete")) {
      activeButton = event.target.id;
      let a = document.getElementById(event.target.id)
      let b = a.parentElement
      let el = b.parentElement
      activeAct = el.querySelector(".elemName").id
      deleteAdd()
  }
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("change")) {
      activeButton = event.target.id;
      let a = document.getElementById(event.target.id)
      let b = a.parentElement
      let el = b.parentElement
      activeAct = el.querySelector(".elemName").id
      activeAct1 = el.id
      getAdd()
  }
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("edit")) {
      activeButton = event.target.id;
      let a = document.getElementById(event.target.id)
      let b = a.parentElement
      let el = b.parentElement
      activeAct = el.querySelector(".elemName").id
      activeAct1 = b.id
      changeAdd()
  }
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("start")) {
      activeButton = event.target.id;
      let a = document.getElementById(event.target.id)
      let b = a.parentElement
      let el = b.parentElement
      console.log(el)
      activeAct = el.querySelector(".elemName").id
      start()
  }
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("note")) {
      activeButton = event.target.id;
      let a = document.getElementById(event.target.id)
      let b = a.parentElement
      let el = b.parentElement
      activeAct1 = el.id
      createArea()
  }
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("history")) {
      activeButton = event.target.id;
      let a = document.getElementById(event.target.id)
      let b = a.parentElement
      let el = b.parentElement
      activeAct = el.querySelector(".elemName").id
      activeAct1 = el.id
      getHist()
  }
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("addNote")) {
      activeButton = event.target.id;
      let a = document.getElementById(event.target.id)
      let b = a.parentElement
      let el = b.parentElement
      activeAct = el.querySelector(".elemName").id
      activeAct1 = b.id
      addNote()
  }
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("close")) {
      activeButton = event.target.id;
      let a = document.getElementById(event.target.id)
      let b = a.parentElement
      activeAct = b.remove()
  }
});

function yes0(){
    document.querySelector(".choiseCont").innerHTML = ` У вас есть вредные привычки?
          <div>
              <button onclick="yes()">Да</button>
              <button onclick="no()">Нет</button>
          </div>`
  }
  
function no0(){
  document.querySelector(".choiseCont").innerHTML = 'Ладно, давай в следующий раз.';
}
  
function no(){
  document.querySelector(".choiseCont").innerHTML = 'Позравляю! Продолжай в том же духе!';
}
  
function yes(){
  document.querySelector(".choiseCont").innerHTML = `Это не очень хорошо :( Хочешь помогу избавиться?
        <div>
            <button onclick="yes1()">Да</button>
            <button onclick="no1()">Нет</button>
        </div>`
}
  
function no1(){
  document.querySelector(".choiseCont").innerHTML = 'Печально... Если передумаешь, то я тут';
}
  
function yes1(){
  document.querySelector(".choiseCont").innerHTML = `Отлично. Тогда заполни информацию.
      <input class="add" id="addname" type="text" placeholder="Название привычки">
      <textarea class="add" id="addInf" placeholder="Твои мысли по этому поводу"></textarea> 
      <button class="addBut" onclick="addNewAdd()">Добавить</button>`
}

async function showAdds() {
  let show = document.querySelector('.show')
  let choise = document.querySelector('.choiseCont')
  let catalog = document.querySelector("#catalog1")
  if(show.classList.contains('shown')){
    show.classList.remove('shown')
    show.innerHTML = 'Показать мои привычки'
    choise.innerHTML = `Хочешь поговорить?
        <div>
            <button onclick="yes0()">Да</button>
            <button onclick="no0()">Нет</button>
        </div>`
        catalog.innerHTML = '';
        return 0
  }
    show.classList.add('shown')
    show.innerHTML = 'Скрыть мои привычки'
    const response = await fetch(`/catalog/addictions/all`);
    const data = await response.text();
    catalog.innerHTML = data;
    choise.innerHTML =''
}

async function addNewAdd(){
  let name = document.querySelector("#addname").value
  let description = document.querySelector("#addInf").value

  const sendData = {
    name,
    description,
  };

  const response = await fetch("/catalog/addiction/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });
  
  const responseObj = await response.text();
  document.querySelector("#catalog1").innerHTML = `<p class ="dinText">${responseObj}</p>`;
  document.querySelector(".choiseCont").innerHTML =''
  changeButton()
}

async function deleteAdd() {
  const id = activeAct

  const response = await fetch(`/catalog/addiction/delete?id=${id}`, {
    method: "DELETE",
  });
  
  const responseText = await response.text();
  document.querySelector("#catalog1").innerHTML = `<p class ="dinText">Привычка "${responseText}" удалена <img class="home" src="/img/delete.png" alt=""></p>`;
  changeButton()
}

async function getAdd() {
  const id = activeAct
  const id1 = activeAct1
  const response = await fetch(`/catalog/addiction/get?id=${id}`)
  const responseText = await response.text();
  let array = responseText.split("; ");

  let act = document.getElementById(`${id1}`);
  let change = document.createElement('div');
  change.id = getRandomId()
  change.innerHTML = `
  <input class="changeName ch" type="text">
  <textarea class="changeInf ch" ></textarea>
  <button class="AllAct edit" id=${getRandomId()} >Изменить</button>`;
  act.appendChild(change);
  document.querySelector('.changeName').value = array[0];
  document.querySelector('.changeInf').value = array[1];
}

async function changeAdd(){
  const name = document.querySelector('.changeName').value;
  const information = document.querySelector('.changeInf').value;
  const id = activeAct
  const id1 = activeAct1
  const sendData = {
    name,
    information,
    id
  };
  const response = await fetch("/catalog/addiction/change", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });

  let act = document.getElementById(`${id1}`);
  act.remove()
  const data = await response.text();
  document.querySelector("#catalog1").innerHTML = data;
  document.querySelector(".choiseCont").innerHTML =''
  changeButton()
}

async function start(){
  const id = activeAct
  const sendData = {
    id
  };
  const response = await fetch("/catalog/addiction/start", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });

  const data = await response.text();
  document.querySelector("#catalog1").innerHTML = data;
  document.querySelector(".choiseCont").innerHTML =''
  changeButton()
}

async function createArea() {
  const id = activeAct1

  let act = document.getElementById(`${id}`);
  let change = document.createElement('div');
  change.id = getRandomId()
  change.innerHTML = `
  Напишите здесь свои мысли:
  <input class="noteText ch" type="text">
  <button class="AllAct addNote" id=${getRandomId()} >Добавить</button>`;
  act.appendChild(change);
}

async function addNote(){
  const text = document.querySelector('.noteText').value;
  const id = activeAct
  const id1 = activeAct1
  const sendData = {
    text,
    id
  };
  const response = await fetch("/catalog/addiction/note/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });

  let act = document.getElementById(`${id1}`);
  act.remove()
  const data = await response.text();
  document.querySelector("#catalog1").innerHTML = data;
  document.querySelector(".choiseCont").innerHTML =''
  changeButton()
}

async function getHist() {
  const id = activeAct
  const id1 = activeAct1
  const response = await fetch(`/catalog/addiction/history/get?id=${id}`)
  const responseText = await response.text();
  let array = responseText.split("; ");
  let html = ``
  array.map((el)=>{
    html += `<div class='note0'>${el}</div>`
  })

  let act = document.getElementById(`${id1}`);
  let change = document.createElement('div');
  change.id = `histCont`
  change.innerHTML = `
  <div class="line"></div>
  <div class="historyText"></div>
  <button class="AllAct close" id=${getRandomId()}>Скрыть историю</button>`;
  act.appendChild(change);
  document.querySelector('.historyText').innerHTML = html
}
