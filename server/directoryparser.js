var fs          = require("fs");


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