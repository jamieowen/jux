
# jux-element

Core wrapper.

# api reference

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


* * *

