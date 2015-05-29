
# jux

##
Todo


### General
- [ ] Unit tests.
- [ ] Emitter instead of Signals.

### Element
- [ ] Revisit sync/update sizes.

### Layout
- [ ] Add axis based iteration options.
- [ ] Check naming of update flags.
- [ ] Caching positions and provide optional updates for applying offsets. ( for scrolling )

### Transition
- [ ] Revisit & finalise
- [ ] Offscreen to onscreen transitions.
- [ ] Tweenr dependency - may be simplify but provide options to use other engine.

### Scroller
- [ ] Add WheelEvent support.
- [ ] Overshoot easing when dragging.
- [ ] Page / Snap support.
- [ ] Spring physics.
- [ ] Access to easing constants.

### Factories
- [ ] Revisit.


##
Roadmap
- [ ] Decide on suitable implementation for Deferred Layouts/Indexing.
- [ ] JSX



### notes
- Had problems with singleton usage with older Jux singleton style.
Possibly only browserify related : (https://github.com/substack/node-browserify/issues/1063)
Currently avoided by not specifying jux-core as a dependency in jux-element.
This forces the require statement to discover the top level jux-core require statement in the main project.

## Overview & Goals


- Provide an abstraction to build UI code to interact with popular rendering engines ( DOM, PIXI, THREE, etc ) using the same code.
-


ERROR, Cannot find module.
Jux

Jux

<a name="Element"></a>
## Element
**Kind**: global class  

* [Element](#Element)
  * [new Element(proxy)](#new_Element_new)
  * [.update()](#Element+update)

<a name="new_Element_new"></a>
### new Element(proxy)
## jux-element

 Core element class acting as a 'stand-in' between an arbitrary display or scene graph object.
 E.g. A DOM HtmlElement, THREE.Object3D or PIXI.DisplayObjectContainer.

 - Elements all act as child containers, not leaf objects.
 - Instantiates a proxy based on current Jux Factory to the 'real' object.
 - Maps common display/ui properties such as position, scale, rotation & size to a proxy instance.
 - Provides framework for deferred and hierarchical updates of objects.

**Params**
- proxy

<a name="Element+update"></a>
### element.update()
Update function.

**Kind**: instance method of <code>[Element](#Element)</code>  

<a name="Scroller"></a>
## Scroller
**Kind**: global class  

* [Scroller](#Scroller)
  * [new Scroller(pointerEvents, wheelEvents, opts)](#new_Scroller_new)
  * [.SCROLL](#Scroller.SCROLL)

<a name="new_Scroller_new"></a>
### new Scroller(pointerEvents, wheelEvents, opts)
Scroller Class for jux.

**Params**
- pointerEvents
- wheelEvents
- opts

<a name="Scroller.SCROLL"></a>
### Scroller.SCROLL
**Kind**: static enum property of <code>[Scroller](#Scroller)</code>  

<a name="ScrollerAxis"></a>
## ScrollerAxis
**Kind**: global class  
<a name="new_ScrollerAxis_new"></a>
### new ScrollerAxis()
ScrollerAxis




