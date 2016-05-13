var	gulp = require('gulp'),
	less = require('gulp-less'),
	jshint = require('gulp-jshint'),
	lazyMinify = require('gulp-lazy-minify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch');

// Répertoires
var app = './app',
	dist = './dev/www',
	mods = './node_modules';

	
// COMPILATION DE MINIFICATION DU LESS
gulp.task('less', function() {	
	gulp.src(app + '/less/main.less')
		.pipe(less())	
		.pipe(lazyMinify())
		.pipe(rename("main.css"))
		.pipe(gulp.dest(dist + '/css'));
		
	console.log("Compilation LESS OK !");
});


// CREATION DU JAVASCRIPT GENERAL (pour le header)
var modules = [
	
	// MODULES EXTERNES
	
	// AngularJS
	mods + '/angular/angular.min.js',
	mods + '/angular-route/angular-route.min.js',
	
	// NOS MODULES
	app + '/js/altima.js',
	app + '/js/altimaArticles.js',
	app + '/js/altimaArticle.js',
	app + '/js/altimaContact.js',
	app + '/js/altimaCarousel.js',
	
	// Script centrale
	app + '/js/main.js'

];


gulp.task('scripts', function() {
		
	gulp.src(modules)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
		
	gulp.src(modules)
        .pipe(concat('main.js'))
		.pipe(uglify({
			mangle: false
		}))
		.pipe(rename("main.js"))
        .pipe(gulp.dest(dist + '/js'));
		
	console.log("Regroupement des JS OK !");
});


gulp.task('default', function() {
	
	console.log("Début des traitements");
	
	gulp.start('less');
	
	gulp.start('scripts');

	watch(app + '/less/**/*.less', function($event) {
		gulp.start('less');
	} );
	
	watch(app + '/js/**/*.js', function($event) {
		gulp.start('scripts');
	} );
}); 