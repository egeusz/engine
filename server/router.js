var fs          = require("fs");

var prefs = require("./prefs"); 
var dirParser   = require("./directoryparser"); 
var fileloader  = require("./fileloader"); 

var builders = new Array ();
var routes       = new Array(); 

//--------- checks the requested route with the Path arrays to make sure it is valid, then performs the path function keyed to that path. Errors 404 if path is not valid. 
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

function BuildRoutes()
{
  FindPublicPaths();
  GeneratePagePaths();

  // for (p in routes)
  // {
  //   console.log(p);  
  // }
}


function GeneratePagePaths()
{
   console.log("Getting builders at");
   dirParser.ParseDirectory(prefs.getBuildersRootDir(), AddPagePath); 
   routes["/"] =  builders["/index"].Build;
   // AddPagePath("/404", fileloader.Error404); //fortesting should be removed later. 

}



function FindPublicPaths()
{
  console.log("Getting static paths at \"" + prefs.getPublicRootDir() + "\"" ); 
  dirParser.ParseDirectory(prefs.getPublicRootDir(), AddFilePath); 

  console.log("" ); 
}






function AddFilePath(_dirpath, _filename)
{
  var path = _dirpath.substring(prefs.getPublicRootDir().length) + "/"+_filename; 
  console.log("   < " +  path);
  routes[path] = fileloader.GetFile; 

}


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








exports.BuildRoutes = BuildRoutes; 
exports.route = route;