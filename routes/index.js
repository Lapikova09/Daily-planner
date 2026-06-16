const getRouter = require("./getRouter");
const postRouter = require("./postRouter");
const putRouter = require("./putRouter");
const deleteRouter = require("./deleteRouter");

function handler(request, response) {
  console.log(`[${request.method}]: ${request.url}`);

  switch (request.method) {
    case "GET":
      getRouter(request, response);
      break;
    case "POST":
      postRouter(request, response);
      break;
    case "PUT":
      putRouter(request, response);
      break;
    case "DELETE":
      deleteRouter(request, response);
      break;
  }
}

module.exports = handler;