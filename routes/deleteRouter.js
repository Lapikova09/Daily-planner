const url = require("url");
const {deleteActivity} = require("../controllers/activitiesController");
const {deleteAddiction} = require("../controllers/addictionsController");

function deleteRouter(request, response) {
  const parsedUrl = url.parse(request.url, true);
  console.log(parsedUrl);

  switch (parsedUrl.pathname) {
    case "/catalog/activity/delete":
      deleteActivity(request, response, parsedUrl);
      break;
    case "/catalog/addiction/delete":
      deleteAddiction(request, response, parsedUrl);
      break;
    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Request Error. Check the path");
  }
}

module.exports = deleteRouter;
