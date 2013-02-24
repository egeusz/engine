var fs = require("fs");
var fileloader = require("./fileloader"); 


function route(pathname, response) {
  console.log("request for " + pathname);

  if(pathname == "/" || pathname == "/index")
  {
  	return fileloader.GetIndex(response);
  }
  else if(ParsePath(pathname, "/public/style.css"))
  {
  	console.log("Looking for styles");
  	return fileloader.GetCSS( response, pathname);
  }
  else if(ParsePath(pathname, "/public/js"))
  {
  	console.log("Looking for javascript");
  	return fileloader.GetScript( response, pathname); 
  }
  else
  {
  	return error404(response); 
  }


}


//writes 404 page
function error404(response)
{
	response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<center><p>404 Server Error</p><p>The file you requested does exsist</p></cemter>"); 
  response.end();
}

//returns true if path starts with specified string 
function ParsePath(_path, _pathcheck)
{
	if(("."+_path).search(_pathcheck) == 1)
	{
		return true
	}
	return false


}


exports.route = route;