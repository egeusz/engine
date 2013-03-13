var publicRoot    = "./public"; 
function getPublicRootDir()
{
	return publicRoot;
}


var buildersRoot      = "./server/builders"; 
function getBuildersRootDir()
{
	return buildersRoot;
}

exports.getPublicRootDir = getPublicRootDir; 
exports.getBuildersRootDir = getBuildersRootDir; 