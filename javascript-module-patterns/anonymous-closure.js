/**
 * This is an example of creating a JavaScript module via `anonymous closure` module pattern.
 */

(function() {
    const names = ['Zico', 'David', 'Tom'];

    function greet() {
        names.forEach(name => {
            console.log(`Hello, ${name}!`);
        });
    }

    greet();
})();
