var gulp = require('gulp');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
//var gutil = require('gulp-util');
//var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//var del = require('del');
//var useref = require('gulp-useref');
//var gulpif = require('gulp-if');
var webserver = require('gulp-webserver');
//var minifyCss = require('gulp-clean-css');
//var ghPages = require('gulp-gh-pages');
//var rename = require("gulp-rename");
//var csv2json = require('gulp-csv2json');
//var run = require('gulp-run')
//var prettify = require('gulp-jsbeautifier');

//serves
gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

//------------
//linting
gulp.task('lint', function() {
  return gulp.src('./*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

//------------
//default
gulp.task('default',['serve']);


