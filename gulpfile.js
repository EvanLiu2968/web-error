var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
// var concat = require('gulp-concat');
var rename = require('gulp-rename');
var url = require('url');
var fs = require('fs');
var path = require('path');

var basedir ='./';

gulp.task('default', ['webserver'], function() {
  console.log('webserver is running at localhost:8000.')
});

gulp.task('webserver', function() {
  gulp.src(basedir)
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(basedir + 'src/*.js', ['minify-js']);
});

gulp.task('minify-js', function() {
  gulp.src(basedir + 'src/index.js')
    //.pipe(concat('sophon.js'))
    // .pipe(gulp.dest(basedir + 'lib'))
    .pipe(rename('sophon.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(basedir + 'lib'));
});