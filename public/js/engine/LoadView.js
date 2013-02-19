function loadScreenView(_game)
{
	View.call(this, _game);
	Debugger.call(this, "loadScreenView"); 
	this.DEBUGMODE = true; 


	this.Build = function()
	{
		this.debug("building"); 
		_game.activeView = this;// Hacky override to get load screens showing on build
		_game.BuildCallBack();
	}
}