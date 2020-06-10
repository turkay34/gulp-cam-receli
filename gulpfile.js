// Npm Packets

const gulp = require('gulp');
const twig = require('gulp-twig');
const del = require('del');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const cleanCSS = require('gulp-clean-css');

// Folder Maps

const templates = './src/templates/';
const dist = './dist/';
const homePath = './src/assets/';
const nodeModules = './node_modules/';

const paths = {
    js: 'assets/js/',
    css: 'assets/css/'
};

const sourceJs = [
    nodeModules + 'jquery/dist/jquery.js',
    nodeModules + 'bootstrap/dist/js/bootstrap.js',
    nodeModules + 'slick-carousel/slick/slick.js',
    nodeModules + 'wowjs/dist/wow.min.js',
    homePath + 'js/main.js',
];

// Function

function clean(){
    return del([dist + '**', '!' + dist])
}

function compile(){
    return gulp.src('./src/templates/pages/*.html')
        .pipe(twig({base: templates}))
        .pipe(gulp.dest(dist))
}

function style(){
    return gulp.src(sourceJs)
        .pipe(gulp.dest(dist + 'assets/css'))
}

function minimage(){
    return gulp.src('./src/assets/img/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(dist + 'assets/img'))
}

function minifycss(){
    return gulp.src('./src/assets/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/assets/css/'))
}
function clearcache(){
    return cache.clearAll();
}
// Gulp Comments

const build = gulp.series(clean, minifycss, minimage, compile);

exports.clean = clean;
exports.clearcache = clearcache;
exports.minifycss = minifycss;
exports.compile = compile;
exports.style = style;
exports.minimage = minimage;
exports.default = build;
