function Game()
{
	Debugger.call(this, "game"); 
	this.DEBUGMODE = true; 

	
	var callBackBuildListIndex = 0; 
	this.CallBackBuildList = new Array(); 

	var clock = null; 
	var delta = null; 

 	//=============== Init & Call Backs ============================
	this.Init = function()
	{
		this.debug("initialize. start loading content");
		clock = new THREE.Clock();
 		delta = 0;		

 		this.activeView = this.loadView;//TO FIX: LoadView and Model building twice.  
 		this.activeModel = this.loadModel; 
		//start clock tick

		this.CallBackBuildList[0].Build(); 
	}

	//called after a view or model finishes building. Builds the next object in the list.  
	this.BuildCallBack = function()
	{
		
		callBackBuildListIndex++; 
		if(callBackBuildListIndex ==  this.CallBackBuildList.length)
		{
			this.Start();//all aobjects are built start game.
		}
		else
		{
			this.CallBackBuildList[callBackBuildListIndex].Build(); 
		}
	}

	//adds an object to the build list
	this.AddToBuildList = function( _toBuild )
	{
		this.CallBackBuildList[this.CallBackBuildList.length] = _toBuild; 
	}


	//starts the game
	this.Start = function()
	{
		this.debug("done building. starting game..."); 
		this.activeView = this.gameView; 
		
		

	}


	//=============== Main Loop ============================
	var OnTick = function()
	{



	}


//------------- Load View/Model ---------------------
	this.loadScreenView = new loadScreenView(this)
	this.loadScreenModel = new loadScreenModel(this);

	//------------- Content -----------------------------
	this.gamecontent = new Content(this); 

	//------------- Views ------------------------------
	this.activeView = null; 
	this.gameView = new GameView(this);
	//this.menuView = new menuView(this); for example.  

	//------------- Models ------------------------------
	this.activeModel = null; 
	this.gameModel = new GameModel(this); 
	//this.mainMenu = new menuModel(this); for exampe

	
}