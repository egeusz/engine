//directoryparser is a fucntional abstraction for parsing a directory and performing functions on the files found inside. 

var fs          = require("fs");


//------ Fully recurses through a directory structure. When finding a file it performs the _Onfile finction. 
//>>!! _OnFile must be a function that must accept the input parameters of _path, directory to the file, and _filename, the file's name. 
function ParseDirectory(_path, _OnFile)
{
  console.log("> " + _path);  
  var files = fs.readdirSync(_path);

  for (var f in files)
  {
    
    var stat = fs.statSync(_path+"/"+files[f]);
    if (stat.isDirectory())
    {
      ParseDirectory(_path+"/"+files[f], _OnFile); 
    }
    else if (stat.isFile())
    {
      //console.log(_OnFile);
      _OnFile(_path, files[f]); 
    }
    else
    {

    }
  } 
}

exports.ParseDirectory = ParseDirectory; 