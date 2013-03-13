var fs          = require("fs");

var prefs       = require("./prefs"); 
var dirParser   = require("./directoryparser"); 
var fileloader  = require("./fileloader"); 

var builders    = new Array ();
var routes      = new Array(); 

//--------- checks the requested route with the routes array to make sure it is valid, then performs the function (ie getfile or build) mapped to that path. Errors 404 if path is not valid. 
function route(_path, response) {
  if (routes[_path] != null)
  {
    console.log("     request  -> " + _path);
    routes[_path](response, _path); 
  }
  else
  {
    console.log("request error -> " + _path);
    fileloader.Error404(response); 
  }
}

//---------- Called on server startup. Builds routes for all public files and for Builder moduals 
function BuildRoutes()
{
  FindPublicPaths();
  GenerateRoutesForBuilders();
  // for (p in routes)
  // {
  //   console.log(p);  
  // }
}

//------- recursivly searches for all static files in the public root directory, then generates routes for them and mappes them to fileloader.GetFile(); to load the file upon request
function FindPublicPaths()
{
  console.log("Getting static paths at \"" + prefs.getPublicRootDir() + "\"" ); 
  dirParser.ParseDirectory(prefs.getPublicRootDir(), AddFilePath); 

  console.log("" ); 
}

//------- recursively searches for all Builder moduals in the root dir and then generates routes for them and mappes them to there Build() function to build the file upon request
function GenerateRoutesForBuilders()
{
   console.log("Getting builders at");
   dirParser.ParseDirectory(prefs.getBuildersRootDir(), AddPagePath); 
   routes["/"] =  builders["/index"].Build; // manualy set special path for null case. set to index
}

//------ called by the dirparser when it finds a file. Gennerates a route based upon the files directory location and then mappes it to the fileloader.GetFile() in the routes map. 
function AddFilePath(_dirpath, _filename)
{
  var path = _dirpath.substring(prefs.getPublicRootDir().length) + "/"+_filename; 
  console.log("   < " +  path);
  routes[path] = fileloader.GetFile; 
}

//------ called by the dirparser when it finds a Builder modual. Gennerates a route based upon the files directory location. It loads the modual to the builders list and then mappes it to the builders Build() function in the routes map. 
function AddPagePath(_dirpath, _filename)
{
  var dirPathParts = _dirpath.split("/");
  var builderRoute = ""; 
  for(var i = 3; i < dirPathParts.length; i++)//replace with regular expression
  {
    builderRoute += "/"+dirPathParts[i]; 
  }
  var fileNameParts = _filename.split("."); 
  builderRoute += "/"+fileNameParts[0]; 
  builders[builderRoute] = require("./builders"+builderRoute); 
  routes[builderRoute] = builders[builderRoute].Build; 
  console.log("   < " +  builderRoute  + " : " + builderRoute + ".build()" );
}


//----------
exports.BuildRoutes = BuildRoutes; 
exports.route = route;