# Polymer Boilerplate Light App

This is a boilerplate for [Polymer](http://www.polymer-project.org/) 2.0 with minimal tools and dependencies. For some reason or another, I just could not get Polymer-CLI working, but I suspect its because I am behind proxies and firewalls and using a locked computer.
I tried to live without Bower, but packages on NPM are of a different version than on Github, and it was just easier to install dependent web components using Bower.

This boilerplate is derived from [polymer-boilerplate-light](https://github.com/shahrin-14/polymer-boilerplate-light)

Please be advised:

* If you are able to use Polymer-Cli, I suggest you do. 
* This is not for production use. It is just for those who want to try out web components.

## Features

* Minimal tools. Only used NPM, Bower and Gulp. No Polimer-CLI.
* Can use ES6 Javascript, which is later transpiled by Babel

## Prerequisites
We need [Bower](https://bower.io/) and [Gulp](http://gulpjs.com/) to be installed globally.

```
#Run the following to install bower globally
npm install -g bower
#Run the following to install gulp globally
npm install -g gulp
#Run this line to install all project specific dependent items
npm install
#Run this line to install all project specific dependent components
bower install
```

## Build
Run `gulp app`

This will perform a bower install for necessary stuff in the sub directory bower_components/app-layout.
This only needs to be done once.

Run `gulp build`

This task performs the following:

*   Cleans the dist folder
*   Copies all files in bower_components to dist/bower_components
*   Copies all corresponding files into the dist folder except for dist/components (which will go through the build process below)
*   HTML files in folder src/CustomComponents will be separated into HTML and JS files using crisper
*   ES6 JS syntax will be transformed using Babel
*   Specified files will be aggregated for optimization using Vulcanize

## Run
Run `gulp serve`
Then open a browser and :
* View my-app at [http://localhost:3000/](http://localhost:3000/)
* View app-layout (Google's demo on app components) at [http://localhost:3000/bower_components/app-layout](http://localhost:3000/bower_components/app-layout)
* View custom component from [polymer-boilerplate-light](https://github.com/shahrin-14/polymer-boilerplate-light) in action in the app, go to [http://localhost:3000/view4](http://localhost:3000/view4)

## Deploy
Just copy all the files you want in the generated dist folder.