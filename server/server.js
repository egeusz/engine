var http = require("http");
var url = require("url");

var serverPath = "./server/"; 

var router = require("./router");



function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    //console.log("Request for " + pathname + " received.");
    response = router.route(pathname, response);
    
    //populator.PopulateIndex(indexScriptPath); 
    //response.writeHead(200, {"Content-Type": "text/html"});
    //response.write("you requested"+pathname); 
    //response.write(populator.PopulateIndex("./public/"));
    //response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;