/**
 * This is an example of creating a JavaScript module via `object interface` module pattern.
 */

const person = (function() {
    const names = ['Zico', 'David', 'Tom'];

    return {
        greet: function() {
            names.forEach(name => {
                console.log(`Hello, ${name}!`);
            });
        }
    };
})();

person.greet();
