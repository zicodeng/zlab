# JavaScript Module Patterns

## What Are Module Patterns in JavaScript?

JavaScript does not natively support **Class**, an idea that is widely used in languages such as Java to create **encapsulation** and **abstraction**. Instead, JavaScript programmers use Module patterns to mimic the concept of Class.

## Why Use Modules?

Modules in general can provide us with the following software qualities:

-   Maintainability
-   Namespacing
-   Reusability

## Module Patterns

Because of closure in JavaScript, we can create a module by wrapping code in a function and assigning it to a global variable. Below are various approaches experienced JavaScript programmers have devised to create modules.

-   Anonymous Closure
-   Global Import
-   Object Interface
-   Revealing Module Pattern

## Module Systems

Although module patterns make it possible to create modules in JavaScript, there are still some downsides such as namespace collisions and managing dependency order. So the JavaScript community decided to work together to implement well-defined module systems.

### CommonJS

Server-first approach.

-   Pros:

    -   Support circular dependencies.
    -   Compact syntax.
    -   `require` can be called anywhere: modules can be loaded programmatically.

-   Cons

    -   Synchronous API makes it not suitable for client-side projects.
    -   Only support objects as modules.
    -   One file per module.
    -   No constructor function for modules.

*   Implementations:

    -   Node.js

### AMD (Asynchronous Module Definition)

Client-first approach.

-   Pros:

    -   Asynchronous loading (better startup times).
    -   Circular dependencies are supported.
    -   Modules can be split in multiple files if necessary.
    -   Constructor functions are supported.

-   Cons

    -   Slightly more complex syntactically.
    -   Loader libraries are required unless transpiled.

### UMD (Universal Module Definition)

-   Work on both client and server.
-   Support both AMD and CommonJS.

## ES6 (ES2015) Modules

Various module patterns and community-driven module systems have proved the significance of JavaScript modules. Fortunately, ECMA team behind the standardization of JavaScript decided to tackle the issue of modules. The result is ES6 Modules. It provides the following benefits:

-   Syntactically pleasing.
-   Compatible with both synchronous and asynchronous modes of operation.

## References

https://medium.com/@tkssharma/javascript-module-pattern-b4b5012ada9f

https://auth0.com/blog/javascript-module-systems-showdown/
