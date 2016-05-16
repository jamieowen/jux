
var Jux = require( '@jux/core' );
var Scroller = require( '@jux/scroller' );
//var Pointer = require( '@jux/dom/Pointer' );
var Pointer = require( '@jux/three/Pointer' );

var THREE = require( 'three' );

var ThreeView = function(){

	this._width = 1280;
	this._height = 1024;

	this.layout = null;
	this.view 	= null;

	this.setup();
	this.init();

};

module.exports = ThreeView;

ThreeView.prototype = {

	setup: function(){

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 45, 4/3, 1,10000 );

		this.renderer = new THREE.WebGLRenderer( {
			antialias: true
		});

		this.renderer.setPixelRatio( Math.min( window.devicePixelRatio,2 ) );
		this.renderer.setClearColor( 0x000000, 1 );

		this.geometry = new THREE.SphereBufferGeometry(10);
		this.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 10,-10,10 ) );

		this.material = new THREE.MeshBasicMaterial( {
			wireframe: true,
			color: 0xFF0000
		});

		this.blueMaterial = new THREE.MeshBasicMaterial( {
			color: 0x4444ff
		});

		this.yellowMaterial = new THREE.MeshBasicMaterial( {
			color: 0x44ffff
		});

		var plane = new THREE.PlaneBufferGeometry( 300,300 );
		var mesh = new THREE.Mesh( plane, this.material );

		var light = new THREE.PointLight();
		light.position.z = 100;
		this.scene.add( light );

		var bounds = new THREE.PlaneBufferGeometry( 1,1 );
		bounds.applyMatrix( new THREE.Matrix4().makeTranslation( 0.5,-0.5,0 ) );
		var boundsMesh = new THREE.Mesh( bounds, this.blueMaterial );
		this.scene.add( boundsMesh );
		boundsMesh.scale.x = 100;
		boundsMesh.scale.y = 300;


		this.interactionPlane = mesh;
		this.scene.rotation.x = -Math.PI * 0.25;
		this.scene.add( mesh );

	},

	init: function(){

		var scope = this;

		this.scroller = new Scroller( {
			axes: [true,true,false]
		});

		this.pointer = new Pointer(
			this.renderer.domElement,
			this.camera,
			new THREE.Raycaster(),
			this.interactionPlane
		);

		this.scroller.bindPointer( this.pointer );

		this.view = new Jux.View( null, {

			container: this.scene,

			pool: Jux.RendererPool.extend( {

				create: function( data ){
					return new THREE.Mesh( scope.geometry, scope.yellowMaterial );
				}

			}),

			proxy: Jux.RendererProxy.extend( {

				data_set: function( threeObj, data ){
					threeObj.userData = data;
				},

				position_set: function( threeObj, x, y ){
					threeObj.position.x = x;
					threeObj.position.y = -y;
				},

				size_set: function( threeObj, w, h ){
					// no need to set here.
				},

				child_add: function( threeContainer, threeObj ){
					threeContainer.add( threeObj );
				},

				child_remove: function( threeContainer, threeObj ){
					threeContainer.remove( threeObj );
				}

			})
		});
	},

	update: function(){

		var layout = this.view.layout;

		if( layout ){

			if( layout.axis === 'x' ){
				this.scroller.axes[0].max = layout.bounds.width;
				this.scroller.axes[1].max = layout.bounds.height;
				this.scroller.axes[0].viewSize = 0.1;
				this.scroller.axes[1].viewSize = layout.bounds.height;
			}else
			if( layout.axis === 'y' ){
				this.scroller.axes[0].max = layout.bounds.width;
				this.scroller.axes[1].max = layout.bounds.height;
				this.scroller.axes[0].viewSize = layout.bounds.width;
				this.scroller.axes[1].viewSize = 0.01;//0;
			}


		}

		var scrolled = this.scroller.update();

		if( scrolled ){

			this.view.position(
				this.scroller.axes[0].position,
				this.scroller.axes[1].position
			)

		}

		this.view.update();
		this.renderer.render( this.scene, this.camera );

		this.camera.position.z = 200;
		this.camera.position.y = 0;//100;
		//this.camera.position.x = -200;
		this.camera.lookAt( this.interactionPlane.position );

	},

	size: function( w, h ){

		this.renderer.setSize( w,h );

		this.camera.aspect = w/h;
		this.camera.updateProjectionMatrix();

		//this.view.size( 100,100 );
		this.view.size( 100,100 );
		//this.scroller.setViewSize( w,h );

	},

	setLayout: function( layout ){

		this.view.layout = layout;

	},

	setActive: function( active ){

		if( active ){
			document.body.appendChild( this.renderer.domElement );
		}else{
			document.body.removeChild( this.renderer.domElement );
		}
	}

};