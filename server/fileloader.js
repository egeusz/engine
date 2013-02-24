var fs = require("fs");

var publicPath = "./public/"

var MIMETypeMap = new Array(); 
MIMETypeMap[".html"] 	= "text/html"; 
MIMETypeMap[".css"] 	= "text/css"; 
MIMETypeMap[".xml"] 	= "text/xml"; 
MIMETypeMap[".js"] 		= "application/javascript"; 
MIMETypeMap[".json"]	= "application/json"; 
MIMETypeMap[".png"] 	= "image/png"; 
MIMETypeMap[".jpg"] 	= "image/jpeg"; 
MIMETypeMap[".gif"] 	= "image/gif"; 
MIMETypeMap[".ico"] 	= "image/vnd.microsoft.icon"; 


function GetIndex(response) 
{
  
	console.log("populating index");
	response.writeHead(200, {"Content-Type": "text/html"});
	//response.writeHead(200, {"content-type":"application/x-javascript"});
    response.write(BuildIndexString(publicPath)); 
    response.end();
	return response; 
}

/*
function GetFile(response, _path)
{
	ParseFilePath(_path);


}


function ParseFilePath(_path)
{



}

function 
{


}
*/

function GetScript(response, _path)
{
	var file = fs.readFileSync("."+_path);
	response.writeHead(200, {"Content-Type": "application/javascript"});
  	//response.write(file); 
  	response.end(file);
	return response;
}

function GetCSS(response, _path)
{
	var file = fs.readFileSync("."+_path);
	response.writeHead(200, {"Content-Type": "text/css"});
  	//response.write(file); 
  	response.end(file);
	return response;
}

function GetPNG(response, _path)
{
	 var img = fs.readFileSync("."+_path);
     response.writeHead(200, {'Content-Type': 'image/png' });
     response.end(img);
     return response; 
}


function BuildIndexString(_pathname)
{
	var indexString = fs.readFileSync(_pathname+'head.html');
	
	indexString = GetScriptPaths( indexString, _pathname + "js/engine/"); 
	indexString = GetScriptPaths( indexString, _pathname + "js/game/"); 
	indexString = GetScriptPaths( indexString, _pathname + "js/lib/");
	
 	
 	indexString = indexString+""+fs.readFileSync(_pathname+'body.html');
 	
 	return indexString; 

}


function GetScriptPaths(indexString, _path)
{
	console.log("getting scritps from " + _path);  
	var files = fs.readdirSync(_path);
	//scriptString = "<p>File Names Dynamicaly Loaded!</p>"; 
	for (var f in files)
	{
		//console.log(files[f]);
		indexString = indexString + '<script src="' + _path + files[f] + '"> </script>'; 
	} 
	return indexString;

}



exports.GetIndex = GetIndex;
exports.GetScript = GetScript;
exports.GetCSS = GetCSS;
exports.GetPNG = GetPNG; 