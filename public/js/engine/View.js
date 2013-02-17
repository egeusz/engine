function View( _game )
{
	Debugger.call(this, "view"); 
	this.DEBUGMODE = true; 

	this.debug(_game.NullTest()); 
	_game.AddToBuildList(this); 


	this.Build = function()
	{
		this.debug("building"); 
		_game.BuildCallBack();
	}


}