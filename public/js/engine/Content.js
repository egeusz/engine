function Content(_game)
{

	Debugger.call(this, "content"); 
	this.DEBUGMODE = true; 

	_game.AddToBuildList(this); 

	var meshDirectoryPath 			= './public/content/meshes/'; 
	var meshPaths 					= new Array();
	var textuerDirectoryPath 		= './public/content/textures/'; 
	var texturePaths 				= new Array();
	var soundDirectoryPath	 		= './public/content/sounds/'; 
	var soundPaths 					= new Array();
	var modelDataDirectoryPath 		= './public/content/models/'; 
	var modelDataPaths 				= new Array();

	this.meshes 		= new Array();
	this.textures 		= new Array();
	this.sounds 		= new Array();
	this.modelData 		= new Array();

	this.loadCounter = 0;
	this.loadCounterTotal = 0;  

//=============== Build ============================
	this.Build = function()
	{
		this.debug("building and loading content"); 
		this.GetPaths();  
		this.Load(); 
	}


	//Gets the paths to its content and puts them in the path array.
	//Could be replaced with node or load from xml. 
	this.GetPaths = function()
	{
		this.debug("getting paths");
		//------ Test ---------
		this.AddPath(texturePaths, textuerDirectoryPath, 'Galaxy1.jpg');
		this.AddPath(texturePaths, textuerDirectoryPath, 'Galaxy2.jpg');
		this.AddPath(texturePaths, textuerDirectoryPath, 'Stars1.jpg');
		this.AddPath(texturePaths, textuerDirectoryPath, 'Stars2.jpg');
	}
	//Builds the path with directory and name and adds it to the array. 
	this.AddPath = function(_pathList, _dirPath, _name)
	{
		_pathList[_name] = ''+_dirPath+_name; 
		this.loadCounterTotal++;
	}

//=============== Load ============================
	//loads the files using the path list and stores them into approprate lists indexed with their paths. 
	this.Load = function()
	{ //TODO: generalize to load anything. but this works for now
		//load textures. 
		for(var p in texturePaths)
		{
			this.debug('loading ' + texturePaths[p]);
			var texture = new Image(); 
			
			var loadCallBack =  function(_content)
			{
				_content.ObjectLoadCallBack(); 
			}

			texture.onLoad = loadCallBack(this)

			texture.src = texturePaths[p];
			this.textures[p] = texture; 
		}

		//load models
		for(var p in modelDataPaths)
		{
			//TODO: load model data and create model constructors. 
		}

	}

	this.ObjectLoadCallBack = function()
	{
		this.loadCounter++; 
		this.debug('loaded ' + this.loadCounter+'/'+this.loadCounterTotal);
		if (this.loadCounter >= this.loadCounterTotal)
		{
			this.debug('content done loading.');
			_game.BuildCallBack();
		}
	}

}