'use strict';

var gulp = require('gulp');

// js variables
var uglify  = require('gulp-uglify');
var jshint  = require('gulp-jshint');
var concat  = require('gulp-concat');
var watch   = require('gulp-watch');
var webserver = require('gulp-connect');

// scss variables
var sass = require('gulp-sass');

// postcss variables
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano      = require('gulp-cssnano');

var paths = {
  css      : ['./markup/css/**/*.css'],
  js       : ['./markup/js/*.js'],
  jsWatch  : ['markup/js/main/*.js', 'markup/js/main/*.min.js'],
  scss     : ['./markup/scss/**/*.scss']
};


gulp.task('scss', function () {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(postcss([autoprefixer({ browsers: ['ie >= 10', 'last 4 versions', '> 5%'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('markup/css'));
});

gulp.task('css:minify', function () {
  return gulp.src(paths.css)
    .pipe(cssnano())
    .pipe(postcss([autoprefixer({ browsers: ['ie >= 10', 'last 4 versions', '> 5%'] }) ]))
    .pipe(gulp.dest('markup/css'));
});

gulp.task('js', function () {
  return gulp.src(paths.jsWatch)
    .pipe(concat('main.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('markup/js'));
});

gulp.task('js:minify', function () {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest('markup/js'));
});


gulp.task('watcher', function () {
  gulp.watch(paths.scss, ['scss']);
  gulp.watch(paths.jsWatch, ['js']);
});

gulp.task('webserver', function() {
  webserver.server({
    root: './',
    port: 8888
  });
});

gulp.task('build', ['css:minify', 'js:minify'], function () {
  console.log('Build success');
});

