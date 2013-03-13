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

 