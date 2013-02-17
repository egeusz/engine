var fs = require("fs");

function PopulateIndex(_pathname) {
  
	console.log("populating index");

	scriptString = fs.readFileSync(_pathname+'head.html');
	
	scriptString = GetScripts( scriptString, _pathname + "js/engine/"); 
	scriptString = GetScripts( scriptString, _pathname + "js/game/"); 
	
 	
 	scriptString = scriptString +""+ fs.readFileSync(_pathname+'body.html');
 	
 	return scriptString; 


}

function GetScripts(scriptString, _path)
{
	console.log("getting scritps from " + _path);  
	var files = fs.readdirSync(_path);
	//scriptString = "<p>File Names Dynamicaly Loaded!</p>"; 
	for (var f in files)
	{
		console.log(files[f]);
		scriptString = scriptString + '<script src="' + _path + files[f] + '"> </script>'; 
	} 
	return scriptString;

}


exports.PopulateIndex = PopulateIndex;