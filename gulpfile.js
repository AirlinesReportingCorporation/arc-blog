var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");

var entryJS = 'src/index.jsx'
var appJS = 'src/app.jsx'
// var components = 'src/components/*.jsx'
var jsFiles = [entryJS, appJS]

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
    jsFiles.map(function( entry ){
        return browserify({
            entries: [entry]
        })
        .transform(babelify, {presets: ['env']})
        .bundle()
        .pipe(source(entry))
    })
});

gulp.task("default", function () {
  return browserify("src/index.jsx")
    .transform(babelify)
    .bundle()
    .pipe(source("index.jsx"))
    .pipe(gulp.dest("dist/"));
});
