function Game()
{
	
	this.Content = new Content(); 

	this.activeScreen = null

	this.gameScreen = new GameScreen();
	this.laodScreen = new LoadScreen(); 

	this.Init = function()
	{
		
		Console.log("Initialize");
		Content.Load(this.LoadFinished());
	}

	
	this.LoadFinished = function()
	{
		Console.log("LoadFinished game");

	}
}