function Content()
{

	this.meshes 	= new Array();
	this.textures 	= new Array();
	this.sounds 	= new Array();
	this.levels 	= new Array();

	this.loadCounter = 0; 

 

	this.Load = function(_GameCallBack)
	{
		//load all you shit here
		this.console.log("Content Loaded"); 
		LoadContentCallBack(); 
		_GameCallBack(); 
	}


	var LoadContentCallBack = function()
	{
		Console.log("load Content Call back"); 


	}


}