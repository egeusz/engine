function GameView(_game)
{
	View.call(this, _game);
	Debugger.call(this, "game view"); 
	this.DEBUGMODE = true; 

//=============== Build ============================
	this.Build = function()
	{
		
		this.debug("building")
		
		this.renderer = new THREE.WebGLRenderer( { antialias: true, clearColor: this.currColor } );
    	this.renderer.setSize( window.innerWidth, window.innerHeight );
      	document.body.appendChild( this.renderer.domElement );


    	this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
        this.camera.position.z = 400;
        this.camera.position.y = 200;
        //this.camera.rotation.copy(this.player.camRot);

        this.projector = new THREE.Projector();
        this.scene = new THREE.Scene();

        _game.BuildCallBack(); 
	}

}