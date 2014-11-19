gulp-dev-js
===========

Gulp plugin to insert unminified javascript files during development, rather than having to muck with minified files or sourcemaps.

Install:
--------

	npm install --save-dev gulp-dev-js

Usage:
------

	var gulp = require("gulp");
	var devjs = require("gulp-dev-js");

	var files = ["js/app/*.js", "js/lib/*.js"];

	gulp.task("dev-js", function(){
	     return gulp.src(files, {read: false}).pipe(devjs("all.js", {cwd: __dirname})).pipe(gulp.dest("js"));
	});

Creates a single javascript file in `js/all.js` that will dynamically include all the supplied javascript files by inserting script tags.

Options:
--------

*cwd:* `path`

Strip the supplied base path from the beginning the specifies files to allow the use of relative paths.