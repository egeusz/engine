function Content(_game)
{

	Debugger.call(this, "content"); 
	this.DEBUGMODE = true; 

	_game.AddToBuildList(this); 

	this.contentList = null; 

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
		this.contentList = new ContentList(); 
		this.CalcLoadCount();
		this.Load(); 
	}

	this.CalcLoadCount = function()
	{
		this.loadCounterTotal  += this.GetListLength(this.contentList.meshes);
		this.loadCounterTotal  += this.GetListLength(this.contentList.models); 
		this.loadCounterTotal  += this.GetListLength(this.contentList.sounds);
		this.loadCounterTotal  += this.GetListLength(this.contentList.textures);
	}

	this.GetListLength = function(_list)
	{
		var length = 0; 
		for(var p in _list)
		{
			length++; 
		}
		return length; 
	}


//=============== Load ============================
	//loads the files using the path list and stores them into approprate lists indexed with their paths. 
	this.Load = function()
	{ //TODO: generalize to load anything. but this works for now
		//load textures. 
		for(var p in this.contentList.textures)
		{
			this.debug('loading ' + p + ' at ' + this.contentList.textures[p]);
			var texture = new Image(); 
			
			var loadCallBack =  function(_content)
			{
				_content.ObjectLoadCallBack(); 
			}

			texture.onLoad = loadCallBack(this)

			texture.src = this.contentList.textures[p];
			this.textures[p] = texture; 
		}

		//load models
		

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