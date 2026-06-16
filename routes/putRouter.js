const {changeActivity} = require("../controllers/activitiesController");
const {changeAddiction, startAddiction} = require("../controllers/addictionsController");

function putRouter(request, response) {
  switch (request.url) {
    case "/catalog/activity/change":
      changeActivity(request, response);
      break;
    case "/catalog/addiction/change":
      changeAddiction(request, response);
      break;
    case "/catalog/addiction/start":
      startAddiction(request, response);
      break;
    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Request Error. Check the path");
  }
}

module.exports = putRouter;