function loadScreenModel(_game)
{
	Model.call(this, _game);
	Debugger.call(this, "loadScreenModel"); 
	this.DEBUGMODE = true; 
	

	this.Build = function()
	{
		this.debug("building"); 
		_game.activeView = this;// Hacky override to get load screens showing on build
		_game.BuildCallBack();
	}
}