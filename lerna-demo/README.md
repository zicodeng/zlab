# Lerna

Lerna is a tool for managing **monorepo** JavaScript projects.

Built by people behind Babel.

## What Is Monorepo?

Monorepo is a single repository holding the code of multiple projects which may or may not be related in some way.

Codebase is split into **multiple versioned** packages or submodules.

The projects managed in a Monorepo can be dependents of each other (like React and the react-dom package) or they can be completely unrelated (like the Google search algorithm and Angular) respectively only related because both are Google projects.

One example would be an organization managing the code for their website, their iOS and Android apps and the API which is powering both, in one large repository.

### Monorepo In The Wild

-   Babel
-   React
-   Twitter
-   Facebook
-   Google

### Pros:

-   Easy to share code (e.g. utility functions) across the entire codebase.
-   Uniform coding style, software architecture and design patterns.

### Cons:

-   Typically codebase is very large.
-   IDE lag.
-   Git slow down.
-   Long build time.

## Commands

`lerna bootstrap`: looks at all your packages in the package directory and resolves their dependencies. If you have cross dependencies like one of your packages depends on another one of your packages, Lerna bootstrap takes care of that and creates a symlink to the dependency in the packages `node_modules` directory.

`lerna publish`: publish a new release.

...

## lerna.json

```json
{
    "packages": ["components/*"],
    "npmClient": "yarn",
    "useWorkspaces": true,
    "version": "independent",
    "command": {
        "publish": {
            "allowBranch": "master"
        }
    }
}
```

`useWorkspaces: true`: Monorepo typically has multiple packages, meaning each contains a `package.json`. By default, `npm install` will go over each directory and install dependencies for all of them. This will slow down development process. However, if `useWorkspaces` is set to true, npm will look up `workspaces` section in `package.json` first, then perform installation on a specified package.

## References

https://github.com/lerna/lerna

https://medium.com/@maoberlehner/monorepos-in-the-wild-33c6eb246cb9

https://blog.risingstack.com/yarn-vs-npm-node-js-package-managers/

https://codeburst.io/monorepos-by-example-part-1-3a883b49047e

https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/

https://www.youtube.com/watch?v=lV8-1S28ycM
