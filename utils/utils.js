function getRandomId(){
    let id =  Math.floor(Math.random() * (10000000 - 1) + 1);
    return id
}

function check(el, el1){
    let deadline = el.split(".")
    let text = "Введите корректную дату"
      if(Number(deadline[0]<1) || Number(deadline[0]>31) || isNaN(Number(deadline[0]))){
      return text
      }
      if(Number(deadline[1]<1) || Number(deadline[1]>12)|| isNaN(Number(deadline[1]))){
      return text
      }
      if(Number(deadline[2]<2024)|| isNaN(Number(deadline[2]))){
      return text
      }
      if(deadline == ''){
      return text
      }
      if(el1 == ''){
        text = "Введите корректное название"
      return text
      }
  }
  

module.exports = {
    getRandomId,
    check
}