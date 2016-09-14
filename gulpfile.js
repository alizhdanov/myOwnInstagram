'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');
var del = require('del');

var gutil = require('gulp-util');
var newer = require('gulp-newer');
var remember = require('gulp-remember');
var cache = require('gulp-cached');
var browserSync = require('browser-sync').create();
var reload =  browserSync.reload;
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");

var svgSprite = require('gulp-svg-sprite');

var jade = require('gulp-jade');

var rename = require('gulp-rename');

var postcss = require('gulp-postcss');
var mqpacker = require("css-mqpacker");
var cssnano = require('cssnano');
var autoprefixer2 = require('autoprefixer');

var uglify = require('gulp-uglify');

var imagemin = require('gulp-imagemin');



var paths = {
		html: {
			src: 'app/templates/',
			dest: 'app/'
		},
    img: {
        src: 'app/img/for_sprite/',
        dest: 'app/img/sprite/sprite.svg'
    },
    scripts: {
        src: 'app/js/',
        dest: 'app/js/'
    },
    styles: {
        src: 'app/sass/',
        dest: 'app/css/'
    },
};

var appFiles = {
    styles: paths.styles.src + 'style.scss',
    stylesWatch: paths.styles.src + '**/*.scss',
    scripts: paths.scripts.src + 'index.js',
    images: paths.img.src + '*.svg',
		html: paths.html.src + '*.jade',
    htmlDest: paths.html.dest + '*.html'
};


gulp.task('styles', function() {
    return gulp.src(appFiles.styles)
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({browsers: ['> 1%', 'IE 9']}))
      .pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.styles.dest))
      .pipe(browserSync.stream())
      .pipe(notify("CSS Compiled"));
});

gulp.task('html', function() {
    return gulp.src(appFiles.html)
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
		  // .pipe(changed(paths.html.dest, {extension: '.html'}))
			// .pipe(cache('html'))
			.pipe(jade({
		      pretty: true
		  }))
		  // .pipe(remember('html'))
			.pipe(gulp.dest(paths.html.dest))
			.pipe(browserSync.stream());
});

gulp.task('svg', function() {
	return gulp.src('app/img/svg/*.svg')
	.pipe(svgSprite({
		mode: {
			css: {
				dest: '.',
				sprite: 'sprite.css.svg',
				render: {
					scss: true
				}
			},
			symbol: {
				dest: '.',
				sprite: 'sprite.svg',
				prefix: 'icon-'
			}
	    }
	}))
	.pipe(gulp.dest('app/img/'));
});



gulp.task('watch',['styles', 'html'], function(){

    browserSync.init({
        server: "./app"
    });

    gulp.watch('app/sass/**/*.scss', ['styles']);
	gulp.watch("app/templates/**/*", ['html']);
	gulp.watch("app/js/*.js").on('change', browserSync.reload);
});

gulp.task('build',['scripts', 'styles'], function() {
    console.log('***build finished correct***');
});
gulp.task('default',['scripts', 'styles'], function() {
    console.log('***build finished correct***');
});


///////////
// build dest version

gulp.task('styles-dest', function() {
		var processors = [
			mqpacker({
				sort: true
			}),
			autoprefixer2({browsers: ['> 1%', 'IE 9']}),
			cssnano({safe:true})
		];
    return gulp.src(appFiles.styles)
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(sass())
			.pipe(postcss(processors))
			.pipe(autoprefixer({browsers: ['> 1%', 'IE 9']}))
			.pipe(gulp.dest('dist/css/'))
      .pipe(notify("CSS-DEST Compiled"));
});

gulp.task('images-dest', function() {
	return gulp.src('app/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img/'))
});

gulp.task('scripts-dest', function() {
    return gulp.src(appFiles.scripts)
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/'));
});