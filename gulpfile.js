var gulp = require("gulp");

// Shared Plugins

// JS Plugins

// CSS Plugins


// Just a message to confirm gulp is working
// gulp.task('message', function(){
//     return console.log('Gulp is running...')
// });

// Copy the HTML to dist file
gulp.task('copyHTML', function(){
    gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});


gulp.task('js', function(){
    // Handle React
});

gulp.task('css', function(){
    // Handle SCSS 
})