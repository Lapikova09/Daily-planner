const {addActivity} = require("../controllers/activitiesController");
const {addAddiction, addNewNote} = require("../controllers/addictionsController");

function postRouter(request, response) {
  switch (request.url) {
    case "/catalog/activity/add":
      addActivity(request, response);
      break;
    case "/catalog/addiction/add":
      addAddiction(request, response);
      break;
    case "/catalog/addiction/note/add":
      addNewNote(request, response);
      break;
    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Request Error. Check the path");
  }
}

module.exports = postRouter;