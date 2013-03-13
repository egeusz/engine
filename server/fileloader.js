var fs = require("fs");

var prefs = require("./prefs"); 

//-------- Map of all accepted mime tipes for file extensions
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
      	   	if (MIMETypeMap[fileextension] != null)
      	   	{
      	   		console.log("<- serving file " + filename); 
      	   		LoadFile(response, _path, MIMETypeMap[fileextension]); 
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
}


//----------- writes 404 page
function Error404(response)
{
  console.log("<- serving 404 Error Mwahahahahahahahaha!"); 
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<center><p>404 Server Error</p><p>The file you requested does exsist</p></cemter>"); 
  response.end();
} 

//----------
exports.Error404 = Error404; 
exports.GetFile = GetFile; 