# ES6 Webapp generator

## Features

Please see our [gulpfile.js](app/templates/gulpfile.js) for up to date information on what we support.

* CSS Autoprefixing
* Built-in preview server with BrowserSync
* Automagically compile LESS including source maps
* Compile ES6 using Browserify including source maps
* Automagically lint your scripts using Babel-Eslint
* Awesome image optimization
* Optional Include Skeleton for some improved CSS
* Automagically wire-up dependencies installed with [Bower](http://bower.io)

*For more information on what this generator can do for you, take a look at the [gulp plugins](app/templates/_package.json) used in our `package.json`.*

## ES6

You can use FULL ES6 in this app. :facepunch: ES6-Webapp uses Babel under the hood to transpile ES6 to ES5, and then uses Browserify to package all your dependencies into one dandy file.

## LESS

LESS is awesome, and works right out of the box. Since all CSS is valid LESS, you can convert any existing CSS files straightaway.

**Why not SASS?** Sass is awesome, and for a Ruby-based project, it's the preprocessor to go with. However, ES6-Webapp is a Node-based app stack from the ground up, which means no Ruby dependency!

## Skeleton

Skeleton is a lightweight alternative to Bootstrap. It features clean markup and a light footprint.

**Why not Bootstrap?** Bootstrap is awesome, but the heavy markup results in a big Aspirin bill. Skeleton has almost no markup whatsoever, so if you decide you don't want it, there is nothing you need to remove but the CSS file itself.


## Getting Started

- Install dependencies: `npm install --global yo bower less babel browserify`
- Install the generator: `npm install --global generator-es6-webapp`
- Run `yo es6-webapp` to scaffold your webapp
- Run `npm install` to verify and repair NPM installs
- Run `gulp serve` to preview and watch for changes
- Run `bower install --save <package>` to install frontend dependencies
- Run `gulp` to build your webapp for production

## Customize

- Modify `.eslintrc` to change your eslint settings
- All other settings can be changed in the Gulpfile

## Gulp Commands

- `gulp es6` compiles your ES6 using babelify
- `gulp less` will compile your Less
- `gulp preflight` will lint your code

## Contribute

See the [contributing docs](contributing.md).


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
