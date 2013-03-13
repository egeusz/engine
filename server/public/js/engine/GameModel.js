function GameModel(_game )
{
	Model.call(this, _game); 
	Debugger.call(this, "gameModel"); 
	this.DEBUGMODE = true; 

//=============== Build ============================
	this.Build = function()
	{
		this.debug("building")
		_game.BuildCallBack(); 
	}


}