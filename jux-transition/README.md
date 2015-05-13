
## jux-transition

Create simple transition tweens on container children.

```javascript

var transition = new Transition(container);
transition.tween( function(child, i, props, inView ){

    props.delay = i * 0.2;
    props.position = {
        x: 400
    };

    props.opacity = 0;

}, 1, 0, 'cubicInOut', true, function(){

    // complete...

} );
```

- Uses tweenr internallu
- Maps property objects to child element property objects automatically.