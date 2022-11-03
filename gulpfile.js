var gulp = require("gulp");

// Shared Plugins
var rename = require("gulp-rename");

// JS Plugins
var uglify = require("gulp-uglify");

// CSS Plugins

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

gulp.task('css', function(){
    // Change CSS into Minified CSS
});

gulp.task('js', function(){
    // Change JS to Minified JS
});

// gulp.task('default', [message, copyHtml, css, js]);