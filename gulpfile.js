const { src, dest, watch, series } = require('gulp');
const babel = require('gulp-babel');
// Handles minify errors
const uglify = require('gulp-uglify');
// Change the name of the file
const rename = require('gulp-rename');
// plugin to handle scss
const sass = require('gulp-sass')(require('sass'));
// prefixer for css (webkit)
const prefix = require('gulp-autoprefixer');
// minify the css
const minify = require('gulp-clean-css');
// server
const server = require('gulp-webserver');

//Functions

// Handle SCSS to css and minifying it
function scssCompiler(){
    return src('src/scss/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(rename({
        basename: 'arc-blog',
        suffix: '.min'
    }))
    .pipe(dest('dist'))
};

// Use Babel to transform the jsx into js code for gulp
function handleJSX(){
    return src("src/app.jsx")
    .pipe(babel({
        plugins: ["@babel/plugin-transform-react-jsx"]
      }))
    .pipe(rename({
        basename: 'arc-blog',
        suffix: '.min'
    }))
    .pipe(dest("dist"));
};

// Watch for changes in the code
function watchPage() {
    watch('src/scss/*.scss', scssCompiler);
    watch('src/*.jsx', handleJSX);
}

// server for testing
function testServer(){
    return src('src')	
      .pipe(server({
        livereload: true,
        open: true,
        port: 6000	// set a port to avoid conflicts with other local apps
      }));
}

// default gulp command
exports.default = series (
    scssCompiler,
    handleJSX,
    testServer,
    watchPage
    
);


