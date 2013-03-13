var fs          = require("fs");

var publicPathRoot    = "./public/"; 

function Build(response, _path) 
{
  
	console.log("populating index");
	response.writeHead(200, {"Content-Type": "text/html"});
	//response.writeHead(200, {"content-type":"application/x-javascript"});
    response.write(BuildIndexString("")); 
    response.end();
	return response; 
}




function BuildIndexString(_pathname)
{
	var indexString = fs.readFileSync(publicPathRoot+'head.html');
	
	indexString = GetScriptPaths( indexString, _pathname + "js/engine/"); 
	indexString = GetScriptPaths( indexString, _pathname + "js/game/"); 
	indexString = GetScriptPaths( indexString, _pathname + "js/lib/");
	
 	
 	indexString = indexString+""+fs.readFileSync(publicPathRoot+'body.html');
 	
 	return indexString; 

}




function GetScriptPaths(indexString, _path)
{
	console.log("getting scritps from " + _path);  
	var files = fs.readdirSync(publicPathRoot+_path);
	//scriptString = "<p>File Names Dynamicaly Loaded!</p>"; 
	for (var f in files)
	{
		//console.log(files[f]);
		indexString = indexString + '<script src="' + _path + files[f] + '"> </script>'; 
	} 
	return indexString;

}

exports.Build = Build; 