const url = require("url");
const staticFilesController = require("../controllers/staticFilesController");
const {getAllActivities, filterActivities, getActivity} = require("../controllers/activitiesController");
const {getAllAddictions, getAddiction, getAddictionHistory} = require("../controllers/addictionsController");

function getRouter(request, response) {
    const parsedUrl = url.parse(request.url, true);
    switch (parsedUrl.pathname) {
      case "/":
        response.writeHead(302, {
          Location: "/index.html",
        });
        response.end();
        break;
  
      case "/catalog/activities/all":
        getAllActivities(request, response);
        break;
      case "/catalog/addictions/all":
        getAllAddictions(request, response);
        break;
      case "/catalog/activities/filter":
        filterActivities(request, response);
        break;
      case "/catalog/activity/get":
        getActivity(request, response, parsedUrl);
        break;
      case "/catalog/addiction/get":
        getAddiction(request, response, parsedUrl);
        break;
      case "/catalog/addiction/history/get":
        getAddictionHistory(request, response, parsedUrl);
        break;
      default:
        staticFilesController(request, response);
    }
  }
  
module.exports = getRouter;