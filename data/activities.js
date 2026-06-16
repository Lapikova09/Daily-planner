const { getRandomId, check } = require("../utils/utils");

let date = new Date();

let activities = [
    {
        name: "Уборка",
        information: "Навести порядок в комнате и на кухне",
        type: "Работа по дому",
        id: 2323792379,
        dataOfAdding: "4.12.2024",
        deadline: "31.12.2024"
    },
    {
        name:"Домашнее задание",
        information: "Сделать домашнее по математике",
        type: "Учеба",
        id: 2432423423,
        dataOfAdding: "3.12.2024",
        deadline: "30.12.2024"
    }
]

function addAct(el){
    let array = el.split("; ");
    if( typeof check(array[3], array[0]) == 'undefined'){
      let arr_el ={
        name: `${array[0]}`,
        information: `${array[1]}`,
        type: `${array[2]}`, 
        id: getRandomId(),
        dataOfAdding:`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`,
        deadline: array[3]
      }
      activities.push(arr_el)
      let a = `Добавлено дело "${array[0]}"`
      return a
      }
      else{
        return check(array[3], array[0])
      }
}
 
function deleteActByName(id1){
    let a
    let i = Number(id1)
    activities.map((el)=>{
        if(el.id===i){
          let index = activities.indexOf(el);
          if (index !== -1) {
            activities.splice(index, 1);
          }
        a = el.name
        }
      })
      return a
}

function days(el){
  let data =`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
  let array = el.deadline.split(".");
  let array1 = data.split(".");

  const date1 = new Date(Number(array[2]), Number(array[1]) - 1, Number(array[0])); 
  const date2 = new Date(Number(array1[2]), Number(array1[1]) - 1, Number(array1[0])); 
  const differenceInTime = date1 - date2;
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays
}

function daysLeft(el){
  let a
  let differenceInDays = days(el)
  if(differenceInDays<0){
   a = -Math.abs(differenceInDays);
  }else{
    a = Math.abs(differenceInDays);
  }
  return a
}

function filterAct(el){
  const filtArray = [];
  let a;
  let differenceInDays;
  const activitiesWithDifference = activities.map((el) => {
    a = days(el)
    if(a < 0){
      differenceInDays = -Math.abs(a);
     }else{
      differenceInDays = Math.abs(a);
    }
    return { ...el, differenceInDays }; 
  });
  
  const sortedActivities = activitiesWithDifference.sort((a, b) => a.differenceInDays - b.differenceInDays);
  sortedActivities.forEach((activity) => {
    filtArray.push(activity);
  });
  return filtArray;
}

function getInf(id1){
  let a
  let i = Number(id1)
  activities.map((el)=>{
      if(el.id===i){
        a = `${el.name}; ${el.information}; ${el.type}; ${el.deadline}`
      }
    })
    return a
}

function editAct(e){
  let a
  let array = e.split("; ");
  if( typeof check(array[2], array[0]) == 'undefined'){
  let i = Number(array[3])
  activities.map((el)=>{
    if(el.id===i){
      el.name = array[0];
      el.information = array[1];
      el.deadline = array[2];
      a = `Дело "${el.name}" изменено`
    }
  })
  return a
  }
  else{
    return check(array[2], array[0])
  }
}

module.exports = {
    activities,
    addAct, 
    deleteActByName,
    daysLeft,
    filterAct,
    getInf,
    editAct
}