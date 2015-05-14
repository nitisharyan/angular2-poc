'use strict';

var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var traceur = require('gulp-traceur');
var size = require('gulp-size');
var shell = require('gulp-shell');
var livereload = require('livereload');
var Builder = require('systemjs-builder');

var PATHS = {
    src: {
        js: 'src/js/**/*.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'src/css/**/*.css'
        ],
        html: 'src/html/**/*.html',
        img: 'src/img/**/*.{jpg,png,svg}',
        fonts: 'src/fonts/*.*'
    },
    lib: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'src/vendor/sortable/jquery-sortable.js', //TODO change to npm modules
        'node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/es6-module-loader/dist/es6-module-loader-sans-promises.src.js',
        'node_modules/systemjs/lib/extension-register.js',
        'node_modules/angular2/node_modules/zone.js/zone.js',
        'node_modules/angular2/node_modules/zone.js/long-stack-trace-zone.js'
    ]
};

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('css', function () {
    return gulp.src(PATHS.src.css)
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('img', function () {
    return gulp.src(PATHS.src.img)
        .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function () {
    return gulp.src(PATHS.src.fonts)
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('run-server', shell.task([
    'python3 -m rhino --mode server -lp 8889 --config rhino.config',
], {
    cwd: '../',
    quiet: true
}));

gulp.task('live-reload', function() {
    livereload.createServer().watch(__dirname + "/dist");
});

gulp.task('js', function () {
    var config = {
        meta: {
            'angular2/angular2': {
                build: false
            }
        },
        map: {
            angular2: 'angular2',
        }
    };

    var builder = new Builder();

    return builder.loadConfig('./config.js').then(function() {
        return builder
            .build('main', 'dist/app.js', { minify: true, sourceMaps: true, config: config });
    });
});

gulp.task('libs', ['angular2'], function() {
    return gulp.src(PATHS.lib)
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(size({
            showFiles: true,
            gzip: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('angular2', function() {
    var buildConfig = {
        paths: {
            "angular2/*": "node_modules/angular2/es6/prod/*.es6",
            "rx/*": "node_modules/angular2/node_modules/rx/*.js"
        }
    };

    var builder = new Builder(buildConfig);

    return builder
        .build('angular2/angular2', 'dist/angular2.js', {
            minify: true,
            sourceMaps: true,
            config: buildConfig
        });
});

gulp.task('watch', ['live-reload'], function() {
    gulp.watch(PATHS.src.js, ['js']);
    gulp.watch(PATHS.src.html, ['js']);
    gulp.watch(PATHS.src.css, ['css']);
    gulp.watch(PATHS.src.img, ['img']);
    gulp.watch(PATHS.src.fonts, ['fonts']);
});

gulp.task('default', ['css', 'img', 'fonts', 'libs', 'js']);


