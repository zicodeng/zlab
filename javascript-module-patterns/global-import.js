/**
 * This is an example of creating a JavaScript module via `global import` module pattern.
 *
 * The benefit of this approach over anonymous closures is that
 * you declare the global variables upfront,
 * making it crystal clear to people reading your code.
 */

const globalVars = ['Zico', 'David', 'Tom'];

(function(globalVars) {
    function greet() {
        globalVars.forEach(globalVar => {
            console.log(`Hello, ${globalVar}!`);
        });
    }

    greet();
})(globalVars);
