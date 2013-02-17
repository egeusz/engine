var DEBUGMODE_GLOBAL = true; 

function Debugger(_prefix)
{
	this.DEBUGMODE = false; 
	
	this.debug = function(_string)
	{
		if(this.DEBUGMODE && DEBUGMODE_GLOBAL)
		{
			console.log(_prefix + "> "+ _string);
		}

	}

	this.NullTest = function()
	{
		return "(" + _prefix + ") I am not Null"; 
	}  


}