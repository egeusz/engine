//Index is a Builder Modual that constructs the Index.html page.  
var router 		= null; 
var fs          = null;
var prefs 		= null; 
var dirParser   = null; 
var name = "ContentList"; //how the builder will be refrenced to as URL 

var buildString = ""; 
var currentArrayName = "";


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
	response.writeHead(200, {"Content-Type": "application/javascript"}); //Add mimetypes gennerated from file type here. 
	buildString = "";
	BuildPage(); 
    //response.write(buildString); 
    response.end(buildString);
	return response; 
}

//------ Loads the head,then adds all routes to the js files in the publicroot/js folder, then loads body. 
function BuildPage(_pathname)
{
	
	buildString += "function ContentList(){"
	BuildContentDirectoryArray("meshes"); 
	BuildContentDirectoryArray("models"); 
	BuildContentDirectoryArray("sounds"); 
	BuildContentDirectoryArray("textures"); 
  	buildString += "}"
}

function BuildContentDirectoryArray(_dirName)
{
	currentArrayName = "this."+_dirName;
	buildString += currentArrayName + " = new Array();"
	dirParser.ParseDirectory(prefs.getPublicRootDir()+"/content/"+_dirName, GetContentRoutes); 
}


//----- Called by dirParser when it finds a file. Gennerates a route for that file with script tags and then adds it to the current build string.
function GetContentRoutes(_dirpath, _filename)
{
	buildString += currentArrayName+"[\""+_filename+"\"]"+" = \""+router.GenerateFileRoute(_dirpath, _filename)+"\";";
}

//-----  
exports.Setup 	= Setup; 
exports.Build 	= Build;  