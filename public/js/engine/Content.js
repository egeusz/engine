function Content(_game)
{

	Debugger.call(this, "content"); 
	this.DEBUGMODE = true; 

	_game.AddToBuildList(this); 

	this.meshes 	= new Array();
	this.textures 	= new Array();
	this.sounds 	= new Array();
	this.levels 	= new Array();

	this.loadCounter = 0; 

//=============== Build ============================
	this.Build = function()
	{
		
		this.debug("loading content"); 
		
		//load all you shit here

		//call backs on file and stuff here
		_game.BuildCallBack(); 
	}
}