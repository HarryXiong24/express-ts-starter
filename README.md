# express-ts-starter

This is a starter project for express projects using typescript.

## Getting started

- Pre-reqs

  To build and run this service locally you will need a few things:

  - Install [Node.js](https://nodejs.org/en/)
  - Install [Docker](https://www.docker.com)

- Clone the repository

```bash
git clone <.git-path>
```

- Install dependencies

```bash
cd img-compare-be
npm install
```

- Build and run the project

```bash
npm run build
npm start
```

Finally, navigate to `http://localhost:3000` and you should see the template being served and rendered locally!

## Project Structure

The most obvious difference in a TypeScript + Node project is the folder structure.
In a TypeScript project, it's best to have separate _source_ and _distributable_ files.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.
The `test` and `views` folders remain top level as expected.

The full folder structure of this app is explained below:

> **Note!**
>
> - Make sure you have already built the app using `npm run build`
> - Some of the folders do not exist as the project has no need for them. Eg) models and views folders do not exist. They are still documented below for reference if the need to add the arises in the future.

| Name                | Description                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| **dist**            | Contains the distributable (or output) from your TypeScript build. This is the code you ship               |
| **node_modules**    | Contains all your npm dependencies                                                                         |
| **src**             | Contains your source code that will be compiled to the dist dir                                            |
| **src/middleware**  | Add express middleware in this folder                                                                      |
| **src/controllers** | Controllers define functions that respond to various http requests                                         |
| **src/models**      | This folder should contain all the data models. Currently N/A                                              |
| **src/public**      | Static assets that will be used client side. Currently N/A                                                 |
| **src/types**       | Holds .d.ts files not found on DefinitelyTyped. Covered more in this [section](#type-definition-dts-files) |
| **src**/server.ts   | Entry point to your express app                                                                            |
| **test**            | Contains your tests. Separate from source because there is a different build process.                      |
| **views**           | Views define how your app renders on the client.                                                           |
| jest.config.js      | Used to configure Jest running tests written in TypeScript                                                 |
| package.json        | File that contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) |
| tsconfig.json       | Config settings for compiling server code written in TypeScript                                            |
| tsconfig.tests.json | Config settings for compiling tests written in TypeScript                                                  |
| .eslintrc           | Config settings for ESLint code style checking                                                             |
| .eslintignore       | Config settings for paths to exclude from linting                                                          |

### Running the build

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:

| Npm Script    | Description                                                                               |
| ------------- | ----------------------------------------------------------------------------------------- |
| `start`       | Does the same as 'npm run serve'. Can be invoked with `npm start`                         |
| `build`       | Full build. Runs ALL build tasks (`build-ts`, `lint`, `copy-static-assets`)               |
| `serve`       | Runs node on `dist/server.js` which is the apps entry point                               |
| `watch-node`  | Runs node with nodemon so the process restarts if it crashes. Used in the main watch task |
| `watch`       | Runs all watch tasks (TypeScript, Node). Use this if you're not touching static assets.   |
| `test`        | Runs tests using Jest test runner                                                         |
| `watch-test`  | Runs tests in watch mode                                                                  |
| `build-ts`    | Compiles all source `.ts` files to `.js` files in the `dist` folder                       |
| `watch-ts`    | Same as `build-ts` but continuously watches `.ts` files and re-compiles when needed       |
| `lint`        | Runs ESLint on project files                                                              |
| `debug`       | Performs a full build and then serves the app in watch mode                               |
| `serve-debug` | Runs the app with the --inspect flag                                                      |
| `watch-debug` | The same as `watch` but includes the --inspect flag so you can attach a debugger          |

## Type Definition (`.d.ts`) Files

TypeScript uses `.d.ts` files to provide types for JavaScript libraries that were not written in TypeScript.
This is great because once you have a `.d.ts` file, TypeScript can type check that library and provide you better help in your editor.
The TypeScript community actively shares all of the most up-to-date `.d.ts` files for popular libraries on a GitHub repository called [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types).
Making sure that your `.d.ts` files are setup correctly is super important because once they're in place, you get an incredible amount of high quality type checking (and thus bug catching, IntelliSense, and other editor tools) for free.

> **Note!** Because we're using `"noImplicitAny": true`, we are required to have a `.d.ts` file for **every** library we use. While you could set `noImplicitAny` to `false` to silence errors about missing `.d.ts` files, it is a best practice to have a `.d.ts` file for every library. (Even if the `.d.ts` file is [basically empty!](#writing-a-dts-file))

### Installing `.d.ts` files from DefinitelyTyped

For the most part, you'll find `.d.ts` files for the libraries you are using on DefinitelyTyped.
These `.d.ts` files can be easily installed into your project by using the npm scope `@types`.
For example, if we want the `.d.ts` file for jQuery, we can do so with `npm install --save-dev @types/jquery`.

> **Note!** Be sure to add `--save-dev` (or `-D`) to your `npm install`. `.d.ts` files are project dependencies, but only used at compile time and thus should be dev dependencies.

In this template, all the `.d.ts` files have already been added to `devDependencies` in `package.json`, so you will get everything you need after running your first `npm install`.
Once `.d.ts` files have been installed using npm, you should see them in your `node_modules/@types` folder.
The compiler will always look in this folder for `.d.ts` files when resolving JavaScript libraries.

### What if a library isn't on DefinitelyTyped?

If you try to install a `.d.ts` file from `@types` and it isn't found, or you check DefinitelyTyped and cannot find a specific library, you will want to create your own `.d.ts file`.
In the `src` folder of this project, you'll find the `types` folder which holds the `.d.ts` files that aren't on DefinitelyTyped (or weren't as of the time of this writing).

#### Setting up TypeScript to look for `.d.ts` files in another folder

The compiler knows to look in `node_modules/@types` by default, but to help the compiler find our own `.d.ts` files we have to configure path mapping in our `tsconfig.json`.
Path mapping can get pretty confusing, but the basic idea is that the TypeScript compiler will look in specific places, in a specific order when resolving modules, and we have the ability to tell the compiler exactly how to do it.
In the `tsconfig.json` for this project you'll see the following:

```json
"baseUrl": ".",
"paths": {
    "*": [
        "node_modules/*",
        "src/types/*"
    ]
}
```

This tells the TypeScript compiler that in addition to looking in `node_modules/@types` for every import (`*`) also look in our own `.d.ts` file location `<baseUrl>` + `src/types/*`.
So when we write something like:

```ts
import * as flash from 'express-flash';
```

First the compiler will look for a `d.ts` file in `node_modules/@types` and then when it doesn't find one look in `src/types` and find our file `express-flash.d.ts`.

#### Using `dts-gen`

Unless you are familiar with `.d.ts` files, I strongly recommend trying to use the tool [dts-gen](https://github.com/Microsoft/dts-gen) first.
The [README](https://github.com/Microsoft/dts-gen#dts-gen-a-typescript-definition-file-generator) does a great job explaining how to use the tool, and for most cases, you'll get an excellent scaffold of a `.d.ts` file to start with.
In this project, `bcrypt-nodejs.d.ts`, `fbgraph.d.ts`, and `lusca.d.ts` were all generated using `dts-gen`.

#### Writing a `.d.ts` file

If generating a `.d.ts` using `dts-gen` isn't working, [you should tell me about it first](https://www.surveymonkey.com/r/LN2CV82), but then you can create your own `.d.ts` file.

If you just want to silence the compiler for the time being, create a file called `<some-library>.d.ts` in your `types` folder and then add this line of code:

```ts
declare module '<some-library>';
```

If you want to invest some time into making a great `.d.ts` file that will give you great type checking and IntelliSense, the TypeScript website has great [docs on authoring `.d.ts` files](http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

## Debugging

Debugging TypeScript is exactly like debugging JavaScript with one caveat, you need source maps.

### Source maps

Source maps allow you to drop break points in your TypeScript source code and have that break point be hit by the JavaScript that is being executed at runtime.

> **Note!** - Source maps aren't specific to TypeScript.
> Anytime JavaScript is transformed (transpiled, compiled, optimized, minified, etc) you need source maps so that the code that is executed at runtime can be _mapped_ back to the source that generated it.

The best part of source maps is when configured correctly, you don't even know they exist! So let's take a look at how we do that in this project.

#### Configuring source maps

First you need to make sure your `tsconfig.json` has source map generation enabled:

```json
"compilerOptions" {
    "sourceMap": true
}
```

With this option enabled, next to every `.js` file that the TypeScript compiler outputs there will be a `.map.js` file as well.
This `.map.js` file provides the information necessary to map back to the source `.ts` file while debugging.

> **Note!** - It is also possible to generate "inline" source maps using `"inlineSourceMap": true`.
> This is more common when writing client side code because some bundlers need inline source maps to preserve the mapping through the bundle.
> Because we are writing Node.js code, we don't have to worry about this.

### Using the debugger in VS Code

Debugging is one of the places where VS Code really shines over other editors.
Node.js debugging in VS Code is easy to setup and even easier to use.
This project comes pre-configured with everything you need to get started.

When you hit `F5` in VS Code, it looks for a top level `.vscode` folder with a `launch.json` file.
In this file, you can tell VS Code exactly what you want to do:

```json
{
  "type": "node",
  "request": "attach",
  "name": "Attach by Process ID",
  "processId": "${command:PickProcess}",
  "protocol": "inspector"
}
```

This is mostly identical to the "Node.js: Attach by Process ID" template with one minor change.
We added `"protocol": "inspector"` which tells VS Code that we're using the latest version of Node which uses a new debug protocol.

With this file in place, you can hit `F5` to attach a debugger.
You will probably have multiple node processes running, so you need to find the one that shows `node dist/server.js`.
Now just set your breakpoints and go!

## Testing

The following frameworks and libraries are used for testing.

- [Jest](https://facebook.github.io/jest/)
- [Chai](https://www.chaijs.com/)
- [SuperTest](https://www.npmjs.com/package/supertest)

### Running tests

Simply run `npm run test`.
Note this will also generate a coverage report.

### Writing tests

Writing tests for web apps has entire books dedicated to it and best practices are strongly influenced by personal style, so I'm deliberately avoiding discussing how or when to write tests in this guide.
However, if prescriptive guidance on testing is something that you're interested in, [let me know](https://www.surveymonkey.com/r/LN2CV82), I'll do some homework and get back to you.

## ESLint

ESLint is a code linter which mainly helps catch quickly minor code quality and style issues.

### ESLint rules

Like most linters, ESLint has a wide set of configurable rules as well as support for custom rule sets.
All rules are configured through `.eslintrc` configuration file.
In this project, we are using a fairly basic set of rules with no additional custom rules.

### Running ESLint

Like the rest of our build steps, we use npm scripts to invoke ESLint.
To run ESLint you can call the main build script or just the ESLint task.

```bash
npm run build   // runs full build including ESLint
npm run lint    // runs only ESLint
```

Notice that ESLint is not a part of the main watch task.
