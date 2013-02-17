function Entity ( _world)
{
	Component.call(this); 
	
	var componentList = new Array(); 
	this.getComponentList = function()
	{
		return componentList;
	}
	
	var testComponent = new Component(_world); 
	testComponent.AttachTo(this)
	
	
	
	this.Update = funtion()
	{
		updateComponents(); 
	}
	
	var updateComponents = function()
	{
		for (var c in componentList)
		{
			componentList[c].Update();
		}
		
	}
	
	
	
}// JavaScript Document