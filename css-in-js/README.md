# CSS in JS

## What Is It?

A more declarative and maintainable way to write CSS in JavaScript for component-based applications.

## Why Do We Need It?

-   It is definitely not wrong to create CSS stylesheets and link them to JavaScript files. However, modern web applications are written in components not pages. CSS was never actually made for component based approaches.

-   CSS class is just a mapping between CSS and HTML. In most cases, we expect an unique CSS class name for each component. If those class names are only used once, why do we need the mapping at all?

## Popular Libraries

### Styled-Components

Pros:

-   More community support.

Cons:

-   Large source file size.
-   No CSS syntax highlighting, code completion and intelliSense.

### Emotion

Pros:

-   Almost identical API to Styled-Components.
-   Babel plugin support for optimizing CSS output.
-   Small source file size.

Cons:

-   Less community support.
-   Fewer features than Styled-Components e.g. extend function.
-   No CSS syntax highlighting, code completion and intelliSense.

## Popularity Comparison

http://www.npmtrends.com/aphrodite-vs-emotion-vs-glamorous-vs-jss-vs-radium-vs-styled-components-vs-styletron

## References

https://hackernoon.com/all-you-need-to-know-about-css-in-js-984a72d48ebc
