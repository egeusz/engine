//Index is a Builder Modual that constructs the Index.html page.  
var fs          = null;
var prefs 		= null; 
var dirParser   = null; 
var buildString = ""; 

this.teststring = "Index builder test string"; 

//------ gives the builder the nessisary moduals. more may be added later. 
function Setup (_fs, _prefs, _dirParser)
{
	fs = _fs; 
	prefs = _prefs;
	dirParser = _dirParser;  
}



//------ called on request by router
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

//------ Loads the head,then adds all routes to the js files in the publicroot/js folder, then loads body. 
function BuildPage(_pathname)
{
	buildString += fs.readFileSync(prefs.getPublicRootDir()+'/head.html');
	dirParser.ParseDirectory(prefs.getPublicRootDir()+"/js", GetScriptPaths); 
  	buildString += buildString+""+fs.readFileSync(prefs.getPublicRootDir()+'/body.html');
}

//----- Called by dirParser when it finds a file. Gennerates a route for that file with script tags and then adds it to the current build string.
function GetScriptPaths(_dirpath, _filename)
{
 	var scriptpath = _dirpath.substring(prefs.getPublicRootDir().length) + "/"+ _filename; 
 	buildString += '<script src="' +  scriptpath + '"> </script>'; 
 	//console.log(scriptpath);
}

//-----  
exports.Setup = Setup; 
exports.Build = Build; 