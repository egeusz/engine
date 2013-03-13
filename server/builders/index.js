var fs          = require("fs");

var prefs = require("../prefs"); 
var dirParser   = require("../directoryparser"); 



var buildString = ""; 

function Build(response, _path) 
{
  
	console.log("populating index");
	response.writeHead(200, {"Content-Type": "text/html"});
	//response.writeHead(200, {"content-type":"application/x-javascript"});
    BuildPage(); 
    response.write(buildString); 
    response.end();
	return response; 
}


function BuildPage(_pathname)
{
	buildString += fs.readFileSync(prefs.getPublicRootDir()+'/head.html');
	dirParser.ParseDirectory(prefs.getPublicRootDir()+"/js", GetScriptPaths); 
  	buildString += buildString+""+fs.readFileSync(prefs.getPublicRootDir()+'/body.html');
}


function GetScriptPaths(_dirpath, _filename)
{
 	var scriptpath = _dirpath.substring(prefs.getPublicRootDir().length) + "/"+ _filename; 
 	buildString += '<script src="' +  scriptpath + '"> </script>'; 
 	//console.log(scriptpath); 

}


exports.Build = Build; 