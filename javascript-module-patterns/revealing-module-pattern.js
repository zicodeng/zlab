/**
 * This is an example of creating a JavaScript module via `revealing module pattern` module pattern.
 *
 * This is very similar to object interface module pattern,
 * except that it ensures all methods and variables are kept private until explicitly exposed:
 */

const person = (function() {
    const names = ['Zico', 'David', 'Tom'];

    const greet = function() {
        names.forEach(name => {
            console.log(`Hello, ${name}!`);
        });
    };

    return {
        greet
    };
})();

person.greet();
