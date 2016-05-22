---
title: Overview
type: guide
order: 1
---
So....

```javascript

var Jux = require( '@jux/core' );

var Jux = require( '@jux/x' );

var Jux = require( '@jux/x/core' );

var Jux = require( '@jux/build' );

var Jux = require( '@jux/ui' );

require( '@jux/controls' )( Jux );


var Core = require( '@jux/ui/core' );

var view = new Jux.ScrollView( {

	container: new THREE.Scene(),
	adapter: new Jux.ThreeAdapter(),
	pool: new Jux.TypedPool(),
	layout: new Jux.VerticalGrid(),
	pointer: new Jux.ThreePointer()
	
} );
```
