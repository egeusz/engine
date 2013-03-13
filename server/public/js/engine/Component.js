function Component(_world)
{
	var myEntity = null; 
	
	
	//Attaches this to an Entity
	this.AttachTo = function(_entity)
	{
		if(!this.CheckIfAttached(_entity) && myEntity == null)//If this is not already attached
		{
			_entity.getComponentList()[_entity.getComponentList().length] = this; //add to entity's component list
			myEntity = _entity; 
		}
	}
	
	
	//deletes this from the myEntity component list. 
	this.Detatch()
	{
		var c = this.CheckIfAttached(myEntity);
		if(c)
		{
			delete myEntity.getComponentList()[c];
			myEntity = null;
		}
	
	}
	
	
	//Returns the index from the myEntity componentList if this component is attached to the _entity. 
	//Returns false otherwise
	this.CheckIfAttached = function(_entity)
	{
		for(var c in _entity.getComponentList())
		{
			if(_entity.getComponentList()[c].ID == ID)
			{
				return c; 	
			}
		}
		return false; 
		
	}
	
	
	//main Update, called in myEntity update
	this.Update = function()
	{
		
		
	}
	

}// JavaScript Document