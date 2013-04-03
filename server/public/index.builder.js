//Index is a Builder Modual that constructs the Index.html page.  
var router 		= null; 
var fs          = null;
var prefs 		= null; 
var dirParser   = null; 
var name = "index"; //how the builder will be refrenced to as URL 

var buildString = ""; 


//------ gives the builder the nessisary moduals. more may be added later. 
function Setup (_router, _fs, _prefs, _dirParser)
{
	router = _router; 
	fs = _fs; 
	prefs = _prefs;
	dirParser = _dirParser;  
}



//------ called on request by router
function Build(response, _path) 
{
	console.log("<- Building " + name);
	response.writeHead(200, {"Content-Type": "text/html"}); //Add mimetypes gennerated from file type here. 
	buildString = "";
	BuildPage(); 
    //response.write(buildString); 
    response.end(buildString);
	return response; 
}

//------ Loads the head,then adds all routes to the js files in the publicroot/js folder, then loads body. 
function BuildPage(_pathname)
{
	buildString += fs.readFileSync(prefs.getPublicRootDir()+'/head.html');
	dirParser.ParseDirectory(prefs.getPublicRootDir()+"/js", GetScriptRoutes); 
  	buildString += ""+fs.readFileSync(prefs.getPublicRootDir()+'/body.html');
}

//----- Called by dirParser when it finds a file. Gennerates a route for that file with script tags and then adds it to the current build string.
function GetScriptRoutes(_dirpath, _filename)
{

 	var scriptRoute = null; 
 	if(router.isFileABuilder(  _filename))
  	{
    	scriptRoute = router.GenerateBuilderRoute(_dirpath, _filename) 
   	}
   	else 
   	{	
   		scriptRoute = router.GenerateFileRoute(_dirpath, _filename) 
   	}
 	 
 	buildString += '<script src="' +  scriptRoute + '"> </script>'; 
 	//console.log(scriptpath);
}

//-----  
exports.Setup 	= Setup; 
exports.Build 	= Build;  