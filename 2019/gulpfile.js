'use strict';

var {gulp, src, dest, watch, series, parallel} = require('gulp');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var copy = require('gulp-copy');

sass.compiler = require('node-sass');

var buildStyles = function() {
	return src('./*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(dest('./css/'));
}

var optimiseStyles = function() {
	return src('./main.css')
		.pipe(copy('css/'))
		.pipe(concatCss('style.css'))
		.pipe(dest('./css/'));
}

var watchSource = function (done) {
	watch('./*.scss', exports.default);
	done();
};

var copyFiles = function (done) {
	src('./css/style.css')
		.pipe(dest('./'))
		.pipe(dest('/Users/paulbunkham/vagrant-local/www/wordpress-meta-environment/wordcamp.test/public_html/wp-content/plugins/wordcamp-remote-css/'));
	done();
}

exports.default = series(
	buildStyles,
	optimiseStyles,
	copyFiles,
);

exports.watch = series(
	exports.default,
	watchSource
);

