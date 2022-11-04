var gulp = require("gulp");

// Shared Plugins
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps')

// JS Plugins
var uglify = require("gulp-uglify");

// CSS Plugins
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');

// Just a message to confirm gulp is working
gulp.task('message', function(){
    return new Promise(function(resolve, reject) {
        console.log("Gulp has loaded. . . ");
    resolve();
    })
});

// Copy the HTML to dist file
gulp.task('copyHTML', function(){
    gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

// This minifies the CSS and puts it in the dist
// TODO: figure out how to combine this method and the next one to output directly to dist
gulp.task('css', function(){
    gulp.src('src/css/*.css')
    .pipe(concatCss('src/css/main.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
        basename: 'arc-blog',
        extname: '.min.css'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
});

// Moves the css file to the correct location
gulp.task('move', function(){
    return gulp.src('dist/src/*.css')
    .pipe(gulp.dest('dist'));
})

gulp.task('js', function(){
    gulp.src('src/index.js')
    .pipe(uglify())
    .pipe(rename({
        basename: 'arc-blog',
        extname: '.min.js'
    }))
    .pipe(gulp.dest('dist'));
});

// gulp.task('default', [message, copyHtml, css, js]);