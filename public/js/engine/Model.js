function Model(_game)
{
	Debugger.call(this, "model"); 
	this.DEBUGMODE = true; 
	
	_game.AddToBuildList(this); 

	var entityList = null;

//=============== Build ============================
	this.Build = function()
	{
		this.debug("building")
		entityList = new Array(); 



		_game.BuildCallBack(); 
	}

//=============== Update Loop =======================
	this.Update = function(_delta)
	{
		for (var e in entityList)
		{
			entityList[e].Update(_delta); 
		}
	}


//=============== List Access ======================
	this.getEntityList = function(){return entityList}
	
	// Generates a unique ID everytime function is called.
	var IDcount = 0; 
	this.generateComponentID = function()
	{
		IDcount++; 
		return IDcount; 
	}

	//adds an Entity to entity list using unique ID
	this.addEntity = function(_entity)
	{
		_entity.setID(this.generateComponentID()); 
		entityList[_entity.getID()] = _entity; 
	}

	//deletes an entity from the entity list
	this.deleteEntity = function(_entity)
	{
		delete entityList[_entity.getID()];
	}

}