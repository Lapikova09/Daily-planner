function getRandomId(){
  let id =  Math.floor(Math.random() * (10000000 - 1) + 1);
  return id
}

let activeButton;
let activeAct;
let activeAct1;

function changeButton(){
  let act = document.querySelector('.getActivities')
  act.classList.remove('shown')
  act.innerHTML = 'Показать все дела'
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains("done")) {
        activeButton = event.target.id;
        let a = document.getElementById(event.target.id)
        let b = a.parentElement
        let el = b.parentElement
        el.classList.toggle("green")
        el.classList.toggle("red")
    }
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("delete")) {
      activeButton = event.target.id;
      let a = document.getElementById(event.target.id)
      let b = a.parentElement
      let el = b.parentElement
      activeAct = el.querySelector(".elemName").id
      deleteAct()
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
      getAct()
  }
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains("edit")) {
      activeButton = event.target.id;
      let a = document.getElementById(event.target.id)
      let b = a.parentElement
      let el = b.parentElement
      console.log(el)
      activeAct = el.querySelector(".elemName").id
      activeAct1 = b.id
      changeAct()
  }
});

async function getAll() {
  let act = document.querySelector('.getActivities')
  let catalog = document.querySelector('#catalog')
  if(act.classList.contains('shown')){
    act.classList.remove('shown')
    act.innerHTML = 'Показать все дела'
    catalog.innerHTML = '';
    return 0
  }
  act.classList.add('shown')
  act.innerHTML = 'Скрыть все дела'
  const response = await fetch(`/catalog/activities/all`);
  const data = await response.text();
  catalog.innerHTML = data;
  
}

async function addNewAct() {
  let name = document.querySelector("#name").value
  let description = document.querySelector("#description").value
  let type = document.querySelector("#type").value
  let deadline = document.querySelector("#deadline").value

  const sendData = {
    name,
    description,
    type,
    deadline
  };
  
  const response = await fetch("/catalog/activity/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });
  
  const responseObj = await response.text();
  document.querySelector(".text").innerHTML = `<p class ="dinText">${responseObj} </p>`;
}


async function deleteAct() {
  const id = activeAct

  const response = await fetch(`/catalog/activity/delete?id=${id}`, {
    method: "DELETE",
  });
  
  const responseText = await response.text();
  document.querySelector("#catalog").innerHTML = `<p class ="dinText">Дело "${responseText}" удалено <img class="home" src="/img/delete.png" alt=""></p>`;
  changeButton()
}


async function filter() {
  const response = await fetch(`/catalog/activities/filter`);
  const data = await response.text();
  document.querySelector("#catalog").innerHTML = data;
}

async function getAct() {
  const id = activeAct
  const id1 = activeAct1
  const response = await fetch(`/catalog/activity/get?id=${id}`)
  const responseText = await response.text();
  let array = responseText.split("; ");

  let act = document.getElementById(`${id1}`);
  let change = document.createElement('div');
  change.id = getRandomId()
  change.innerHTML = `
  <input class="changeName ch" type="text">
  <textarea class="changeInf ch" ></textarea>
  <input class="changeDeadline ch" type="text">
  <button class="AllAct edit" id=${getRandomId()} >Изменить</button>`;
  act.appendChild(change);
  document.querySelector('.changeName').value = array[0];
  document.querySelector('.changeInf').value = array[1];
  document.querySelector('.changeDeadline').value = array[3];
}

async function changeAct(){
  const name = document.querySelector('.changeName').value;
  const information = document.querySelector('.changeInf').value;
  const deadline = document.querySelector('.changeDeadline').value;
  const id = activeAct
  const id1 = activeAct1
  const sendData = {
    name,
    information,
    deadline, 
    id
  };
  const response = await fetch("/catalog/activity/change", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });

  let act = document.getElementById(`${id1}`);
  act.remove()
  const data = await response.text();
  document.querySelector("#catalog").innerHTML = data;
  changeButton()
}

