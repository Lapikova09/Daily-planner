const http = require("http");
const router = require("./routes");

const server = http.createServer(router);
server.listen(3000, () => console.log(`http://localhost:3000/`));