const { src, dest } = require('gilp');
const babel = require('gulp-babel');
// Handles minify errors
const uglify = require('gulp-uglify');
// Change the name of the file
const rename = require('gulp-rename');

//Functions

function cssTranspile(cb) {
    cb()
};

function cssMinify(cb){
    cb()
};

function jsTranspile(cb){
    cb()
};

function jsBundle(cb) {
    cb()
};

function jsMinify(cb) {
    cb()
};

//plugins to minify and compile js

exports.default = function () {
    return src('src/*.js')
    .pipe(babel())
    .pipe(src('vender/*.js'))
    .pipe(uglify())
    .pipeline(rename({extname: '.min.js'}))
    .pipe(dest('output/'));
}

exports.build = series (
    parallel(cssTranspile, series(jsTranspile, jsBundle), parallel(cssMinify, jsMinify))
);