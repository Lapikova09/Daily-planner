const {
  activities,
  addAct,
  deleteActByName,
  daysLeft,
  filterAct,
  getInf,
  editAct} = require("../data/activities");
const { getRandomId } = require("../utils/utils");

function getAllActivities(request, response) {
    const result = activities
      .map(
        (el) => 
        ` <div class="activity red" id="${getRandomId()}">
            <div class="butCont">
              <button class="AllAct done" id="${getRandomId()}" >Изменить готовность занятия</button>
              <button class="AllAct delete" id="${getRandomId()}" ><img class="home" src="/img/delete.png" alt="">Удалить занятие</button>
              <button class="AllAct change" id="${getRandomId()}" >Изменить информацию дела</button>
            </div>
            <p class="elemName" id ="${el.id}">Название: ${el.name}</p>
            <p>Подробности: ${el.information}</p>
            <div class="dataCont">
              <p>Категория: ${el.type}</p>
              <p>Осталось: ${daysLeft(el)} дней</p>
              <p>Дата добавления: ${el.dataOfAdding}</p>
            </div>
          </div>`
      )
      .join("");
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    response.end(result);
}

const addActivity = (request, response) => {
    let chunkCount = 0;
  
    let dataFromClient = "";
    request.on("data", (chunk) => {
      dataFromClient += chunk;
      chunkCount += 1;
    });
  
    request.on("end", () => {
      chunkCount = 0;
  
      if (!dataFromClient.length) {
        response.writeHead(400, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        response.end("Bad Request :0");
      }
  
      const object = JSON.parse(dataFromClient); 
      const outputString = `${object.name}; ${object.description}; ${object.type}; ${object.deadline}`
      const result = addAct(outputString);
     
      response.writeHead(200, {
        "Content-Type": "application/json",
      });
      response.end(result); 
    });
};
  
const deleteActivity = (request, response, parsedUrl) => {
  const { id } = parsedUrl.query;
  const actName = deleteActByName(id);

  if (!actName) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("isn't find");
    return;
  }

  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(actName);
}

function filterActivities(request, response) {

  const result = filterAct()
    .map(
        (el) => 
        ` <div class="activity red" id="${getRandomId()}">
            <div class="butCont">
              <button class="AllAct done" id="${getRandomId()}" >Изменить готовность занятия</button>
              <button class="AllAct delete" id="${getRandomId()}" ><img class="home" src="/img/delete.png" alt="">Удалить занятие</button>
              <button class="AllAct change" id="${getRandomId()}" >Изменить информацию дела</button>
            </div>
            <p class="elemName" id ="${el.id}">Название: ${el.name}</p>
            <p>Подробности: ${el.information}</p>
            <div class="dataCont">
              <p>Категория: ${el.type}</p>
              <p>Осталось: ${daysLeft(el)} дней</p>
              <p>Дата добавления: ${el.dataOfAdding}</p>
            </div>
          </div>`
      )
      .join("");
  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  response.end(result);
}

const getActivity = (request, response, parsedUrl) => {
  const { id } = parsedUrl.query;
 
  const result = getInf(id);
  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  response.end(result);
};

const changeActivity = (request, response) => {
  let chunkCount = 0;

  let dataFromClient = "";
  request.on("data", (chunk) => {
    dataFromClient += chunk;
    chunkCount += 1;
  });

  request.on("end", () => {
    chunkCount = 0;

    if (!dataFromClient.length) {
      response.writeHead(400, {
        "Content-Type": "text/plain; charset=utf-8",
      });
      response.end("Bad Request :0");
    }

    const object = JSON.parse(dataFromClient); 
    const outputString = `${object.name}; ${object.information}; ${object.deadline}; ${object.id}`
    let result = editAct(outputString);
   
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(result); 
  });
}

module.exports={
    getAllActivities,
    addActivity,
    deleteActivity,
    filterActivities,
    getActivity,
    changeActivity
}  