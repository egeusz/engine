var fs = require("fs");

var prefs = require("./prefs"); 


//------ loads the file at given path
function GetFile(response, _path)
{
	ParseFileType(response, prefs.getPublicRootDir()+_path);
}

//------ Checks if file exsists, then tries to figure out the file type, finds the MIMEtype and calls LoadFile. returns 404 if file doesnot exsist or file type not matched to MIME type. 
function ParseFileType(response, _path)
{
	
	
	fs.exists(_path, function (exists) {
      if(exists)
      {		
      	   	var pathParts = _path.split("/");
      	   	var filename = pathParts[pathParts.length-1]; 
      	   	var filenameParts =  filename.split(".");
      	   	var fileextension = "."+filenameParts[filenameParts.length-1]; 
      	   	if (prefs.GetMimeTypeFromExtension(fileextension) != "ERROR: extension for MimeType not found.")
      	   	{
      	   		console.log("<- serving file " + filename); 
      	   		LoadFile(response, _path, prefs.GetMimeTypeFromExtension(fileextension)); 
      	   	}
      	   	else
      	   	{
      	   		console.log("<- Mime type not found for " + filename + " - " + fileextension); 
      	   		Error404(response); 
      	   	}
      }
      else
      {
      	console.log("<- file not found for " + _path); 
      	Error404(response); 
      }
   	});
}
function LoadFile(response, _path, _MIMEtype)
{
	var file = fs.readFileSync(_path);
	response.writeHead(200, {"Content-Type": _MIMEtype });
  	//response.write(file); 
  	response.end(file);
    return response; 
}


//----------- writes 404 page
function Error404(response)
{
  console.log("<- serving 404 Error Mwahahahahahahahaha!"); 
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<center><p>404 Server Error</p><p>The file you requested does exsist</p></cemter>"); 
  response.end();
  return response; 
} 

//----------
exports.Error404 = Error404; 
exports.GetFile = GetFile; 

 /* Async call back loader
  fs.readFile(path, 'utf-8', function(err, data) {
    if (err) throw err;
    //console.log('OK: ' + filename);
    console.log(data); 
  
  });
  */