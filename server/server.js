var http = require("http");
var url = require("url");
var router = require("./router");
var populator = require("./populator"); 


function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    router.route(pathname);
    
    //populator.PopulateIndex(indexScriptPath); 
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(populator.PopulateIndex("./public/"));
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;