

## npm

- @jux/x

- @jux/core
- @jux/pixi
- @jux/three
- @jux/ui

Jux is divided up into smaller micro modules importable seperately via npm.
The entire library is contained in one git repo however, this is slightly experimental but seems to working so far.
Read more about the npm setup doc for more info on this.

To import the bare essentials use the special package in the jux namespace 'x' which you
can import via :

* Scrap the jux/x idea *
 
Base stuff will always be..
```
npm install @jux/core
```
To add your view proxy interaction layer pick from one of the following
```
npm install @jux/dom
npm install @jux/three
npm install @jux/pixi
```

Extras will be 
```
npm install @jux/scroller
npm install @jux/layouts
npm install @jux/gestures
```

Top Level 'easy usage' will combine scroller,layouts,views, proxy/pool/pointer creation in one. 
```
npm install @jux/ui

var List = require( '@jux/ui/List' )
var Grid = require( '@jux/ui/Grid' );
// etc
```



Its recommended that you include the dom adaptor with most projects even if it is a Three.js
or Pixi.js project.  As at some point you will probably use Pointer events from the DOM.
```

```