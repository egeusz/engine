function LoadModel(_game)
{
	Model.call(this, _game);
	Debugger.call(this, "loadingModel"); 
	this.DEBUGMODE = true; 
	

	this.Build = function()
	{
		this.debug("building"); 
		_game.activeView = this;// Hacky override to get load screens showing on build
		_game.BuildCallBack();
	}
}