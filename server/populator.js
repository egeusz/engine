var fs = require("fs");

function PopulateIndex(pathname) {
  
	console.log("populating index");

	scriptString = fs.readFileSync(pathname+'head.html');
	var files = fs.readdirSync(pathname + "js/engine/");
	//scriptString = "<p>File Names Dynamicaly Loaded!</p>"; 
	for (var f in files)
	{
		console.log(files[f]);
		scriptString = scriptString + '<script src="' + files[f] + '"> </script>'; 
	} 
 	
 	scriptString = scriptString +""+ fs.readFileSync(pathname+'body.html');
 	
 	return scriptString; 


}

exports.PopulateIndex = PopulateIndex;