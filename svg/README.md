# SVG

Understand SVG and explore how it works.

Playground: https://zicodeng.github.io/zlab/svg/

## What Is SVG?

SVG stands for Scalable Vector Graphics.

-   XML based
-   Pragrammable
-   Integrates with DOM
-   Smaller file size and better application performance

## Difference Between SVG and Canvas

### SVG

-   SVG is a language for describing 2D graphics in XML.
-   SVG is XML based, which means that we can attach JavaScript event handlers to any SVG element.
-   Shape is remembered as an object and can be automatically re-rendered by web browser if changed.

### Canvas

-   Canvas draws 2D graphics on the fly with JavaScript.
-   Canvas is rendered pixel by pixel. Once the the Canvas is drawn, it is forgotten by the browser. If anything changes, the entire screen should be re-drawn.

## viewport

viewport (width and height) is the **visible** area on which SVG will be drawn. viewport takes unit such as px.

## viewBox

viewBox is a unitless coordinate system for positioning and zooming SVG. It does not take any unit because what matters is ratio not specific size.

If viewBox size is bigger than viewport size, SVG will look smaller (zoom out).

If viewBox size is smaller than viewport size, SVG will look bigger (zoom in).

## References

https://www.w3schools.com/html/html5_svg.asp
