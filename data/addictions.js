const { getRandomId } = require("../utils/utils");

let date = new Date();

let addictions = [
    {
        name: "Алкоголь",
        information: "Я довольно часто выпиваю",
        id: 567857858,
        dataOfAdding: "4.12.2024",
        dayOfCounting: "4.12.2024"
    }
]

let notes =[
  {
    id:  567857858,
    dataOfAdding: "5.12.2024",
    text:"Пока довольно тяжело"
  },
  {
    id:  567857858,
    dataOfAdding: "6.12.2024",
    text:"УЖе лучше"
  }
]

function addAdd(el){
    let array = el.split("; ");
    if(array[0] == ''){
        text = "Введите корректное название"
      return text
      }else{
      let arr_el ={
        name: `${array[0]}`,
        information: `${array[1]}`, 
        id: getRandomId(),
        dataOfAdding:`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`,
        dayOfCounting:`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
      }
      addictions.push(arr_el)
      let a = `Добавлена привычка "${array[0]}"`
      return a
      }
}

function deleteAddByName(id1){
    let a
    let i = Number(id1)
    addictions.map((el)=>{
        if(el.id===i){
          let index = addictions.indexOf(el);
          if (index !== -1) {
            addictions.splice(index, 1);
          }
        a = el.name
        }
      })
      return a
}

function getAddInf(id1){
    let a
    let i = Number(id1)
    addictions.map((el)=>{
        if(el.id===i){
          a = `${el.name}; ${el.information}`
        }
      })
      return a
  }

  function editAdd(e){
    let a
    let array = e.split("; ");
    if(array[0] == ''){
        text = "Введите корректное название"
      return text
      }else{
    let i = Number(array[2])
    addictions.map((el)=>{
      if(el.id===i){
        el.name = array[0];
        el.information = array[1];
        a = `Привычка"${el.name}" изменена`
      }
    })
    return a
    }
  }

  function days(el){
    let data =`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    let array = el.dayOfCounting.split(".");
    let array1 = data.split(".");
  
    const date1 = new Date(Number(array[2]), Number(array[1]) - 1, Number(array[0])); 
    const date2 = new Date(Number(array1[2]), Number(array1[1]) - 1, Number(array1[0])); 
    const differenceInTime = date2 - date1;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays
  }
  
function daysGone(el){
    let a
    let differenceInDays = days(el)
    if(differenceInDays<0){
     a = -Math.abs(differenceInDays);
    }else{
      a = Math.abs(differenceInDays);
    }
    return a
}

function editDaysOfCounting(e){
    let data =`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
    let a
    let i = Number(e)
    addictions.map((el)=>{
      if(el.id===i){
        el.dayOfCounting = data
        a = `Привычка "${el.name}" изменена`
      }
    })
    return a
}

function addN(arr){
  let array = arr.split("; ");

  let arr_el ={
    id: Number(array[1]),
    dataOfAdding:`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`,
    text: `${array[0]}`
  }
  notes.push(arr_el)
  let a = `Добавлена заметка`
  console.log(notes)
  return a
}
  
function getAddHist(id1){
  let array =[]
  notes.map((el)=>{
    if(el.id == Number(id1)){
      arrEl = {
        text: `${el.text}`,
        dataOfAdding: `${el.dataOfAdding}`
      }
      array.push(arrEl)
    }
  })
  return array
}

module.exports = {
    addictions,
    addAdd,
    deleteAddByName,
    getAddInf,
    editAdd,
    daysGone,
    editDaysOfCounting,
    addN,
    getAddHist
}