
# jux

## todo - problems with singleton usage.
Possibly only browserify related : (https://github.com/substack/node-browserify/issues/1063)
Currently avoided by not specifying jux-core as a dependency in jux-element.
This forces the require statement to discover the top level jux-core require statement in the main project.

## todo - unit tests!

## todo - possibly use event emitter instead of signals

## Overview & Goals


- Provide an abstraction to build UI code to interact with popular rendering engines ( DOM, PIXI, THREE, etc ) using the same code.
-


