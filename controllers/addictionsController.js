const {
  addictions,
  addAdd,
  deleteAddByName,
  getAddInf,
  editAdd,
  daysGone,
  editDaysOfCounting,
  addN,
  getAddHist} = require("../data/addictions");
const { getRandomId } = require("../utils/utils");

function getAllAddictions(request, response) {
    const result = addictions
      .map(
        (el) => 
        ` <div class="activity red" id="${getRandomId()}">
            <div class="butCont">
              <button class="a delete" id="${getRandomId()}"><img class="home" src="/img/delete.png" alt="">Удалить привычку</button>
              <button class="a change" id="${getRandomId()}"><img class="home" src="/img/edit.png" alt="">Изменить информацию</button>
              <button class="a note" id="${getRandomId()}"><img class="home" src="/img/note.png" alt="">Добавить заметку</button>
              <button class="a history" id="${getRandomId()}"><img class="home" src="/img/history.png" alt="">Посмотреть историю заметок</button>
              <button class="a start" id="${getRandomId()}" ><img class="home" src="/img/sad.png" alt="">Сегодня я сорвался</button>
            </div>
            <p class="elemName" id ="${el.id}">Название: ${el.name}</p>
            <p>Подробности: ${el.information}</p>
            <div class="dataCont">
              <p>Tы держишься: ${daysGone(el)} дней</p>
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

const addAddiction = (request, response) => {
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
    const outputString = `${object.name}; ${object.description}`
    const result = addAdd(outputString);
   
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(result); 
  });
};

const deleteAddiction = (request, response, parsedUrl) => {
  const { id } = parsedUrl.query;
  const actName = deleteAddByName(id);

  if (!actName) {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("isn't find");
    return;
  }

  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(actName);
}

const getAddiction = (request, response, parsedUrl) => {
  const { id } = parsedUrl.query;
 
  const result =  getAddInf(id);
  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  response.end(result);
};

const changeAddiction = (request, response) => {
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
    const outputString = `${object.name}; ${object.information}; ${object.id}`
    let result = editAdd(outputString);
   
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(result); 
  });
}

const startAddiction = (request, response) => {
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
    const outputString = `${object.id}`
    let result = editDaysOfCounting(outputString);
   
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(result); 
  });
}

const addNewNote = (request, response) => {
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
    const outputString = `${object.text}; ${object.id}`
    const result = addN(outputString);
   
    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(result); 
  });
};

const getAddictionHistory = (request, response, parsedUrl) => {
  const { id } = parsedUrl.query;
 
  const array =  getAddHist(id);
  let result =''
 
  array.forEach((obj, index) => {
    const objString = Object.values(obj).join(' - ');
    result += objString; 
    if (index < array.length - 1) {
        result += '; '; 
    }
  });

  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
  response.end(result);
};

module.exports = {
    getAllAddictions,
    addAddiction,
    deleteAddiction,
    getAddiction,
    changeAddiction,
    startAddiction,
    addNewNote,
    getAddictionHistory
}