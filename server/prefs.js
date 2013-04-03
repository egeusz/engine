//Prefs contains locations for root directories as well as other global settings

var serverRoot = "./server"
function getServerRootDir()
{
	return serverRoot;
}
exports.getServerRootDir = getServerRootDir; 
//!!!! public rooth must be inside the /server root for now. 
var publicRoot    = serverRoot + "/public"; 
function getPublicRootDir()
{
	return publicRoot;
}

exports.getPublicRootDir = getPublicRootDir; 

var contentRoot    = publicRoot + "/content"; 
function getContentRootDir()
{
	return contentRoot;
}

exports.getContentRootDir = getContentRootDir; 


//-------- Map of all accepted mime tipes for file extensions
var MIMETypeMap = new Array(); 
MIMETypeMap[".html"	] 	= "text/html"; 
MIMETypeMap[".css"	] 	= "text/css"; 
MIMETypeMap[".xml"	] 	= "text/xml"; 
MIMETypeMap[".js" 	] 	= "application/javascript"; 
MIMETypeMap[".json"	]	= "application/json"; 
MIMETypeMap[".png"	] 	= "image/png"; 
MIMETypeMap[".jpg"	] 	= "image/jpeg"; 
MIMETypeMap[".gif"	] 	= "image/gif"; 
MIMETypeMap[".ico"	] 	= "image/vnd.microsoft.icon"; 

function GetMimeTypeFromExtension(_extension)
{
	return MIMETypeMap[_extension]; 
}
exports.GetMimeTypeFromExtension = GetMimeTypeFromExtension; 

function GetExtensionFromMimeType(_MimeType)
{
	for (var i in MIMETypeMap)
	{
		if(_MimeType == MIMETypeMap[i])
		{
			return i; 
		}
		else 
		{
			return "ERROR: extension for MimeType not found."
		}
	}

}
exports.GetExtensionFromMimeType = GetExtensionFromMimeType; 