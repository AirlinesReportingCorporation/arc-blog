var gulp = require('gulp');
var connect = require('gulp-connect');

// Shared Plugins
var rename = require('gulp-rename');

// JS Plugins
var browserify = require('browserify'); //Bundles multiple JS files into one 
var babelify = require('babelify'); //transpiles React to vanilla JS
var source = require('vinyl-source-stream'); //converts the browerify stream to a string to be saved as a file
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

// CSS Plugins
var sass = require('gulp-dart-sass'); //Plugin to change scss into css
var tildeImporter = require('node-sass-tilde-importer');
var cleanCSS = require('gulp-clean-css');
const { parallel } = require('gulp');



// Just a message to confirm gulp is working
// gulp.task('message', function(){
//     return console.log('Gulp is running...')
// });

// Copy the HTML to dist file
gulp.task('copyHTML', function(){
   return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

// Path files
var paths = {
    main_js: ['src/app.jsx']
}

gulp.task('js', function(){
    return browserify(paths.main_js) //Browserify bundles the JS
    .transform(babelify) //Transpiles the react to vanilla js
    .bundle()
    .on('error', (err)=>{
        console.log('JS Error', err)    //If there is an error, log it
    })
    .pipe(source('bundle.js')) //Otherwise use the vinyl source stream to convert the stream to a file
    .pipe(buffer())
    .pipe(uglify()) //Minifies JS
    .pipe(rename({
        basename: "arc-blog",
        extname: '.min.js'
    })) //renames JS
    .pipe(gulp.dest('dist')) //Put the final file in the dist folder
    .pipe(connect.reload());
});

gulp.task('css', function(){
    return gulp.src('src/scss/*.scss')
    .pipe(sass({
        importer: tildeImporter
    }).on('error', sass.logError)) //change scss into css and log any errors that may occur
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
        basename: 'arc-blog',
        extname: '.min.css'
    }))
    .pipe(gulp.dest('dist')) //for now, output the css file into the dist.
    .pipe(connect.reload());
})

// Server
gulp.task('connect', function(){
    connect.server({
        root: 'dist',
        livereload: true
    })
})

// Watch for changes
gulp.task('watch', function () {
    gulp.watch(['src/*.html'],['src/scss/*.scss'], ['src/*.jsx']);
  });

gulp.task('dev', gulp.series('connect', 'watch'));

gulp.task('default', gulp.series('copyHTML', 'css', 'js'));