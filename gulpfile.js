var	gulp = require('gulp'),
	less = require('gulp-less'),
	jshint = require('gulp-jshint'),
	lazyMinify = require('gulp-lazy-minify'),
	
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	
	// modernizr = require('gulp-modernizr');
	watch = require('gulp-watch');

/** Les watch pour effectuer les taches à chaque modification de fichier ne peuvent pas fonctionner en distant.
  *	Prévoir la mise en place des watch quand node.js pourra être installé sur le serveur.
  */


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
	
	// jQuery 1.11
	mods + '/angular/angular.min.js',
	mods + '/angular-route/angular-route.min.js',
	
	// NOS MODULES
	
	app + '/js/altima.js',
	app + '/js/altimaArticles.js',
	app + '/js/altimaArticle.js',
	app + '/js/altimaContact.js',
	app + '/js/altimaCarousel.js',

	// LANCEMENTS
	
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

/*
// MODERNIZR A PART
gulp.task('scripts:modernizr', function() {	
	gulp.src(modules)
        .pipe(concat('scripts.js'))
		.pipe(modernizr())
		.pipe(lazyMinify())
        .pipe(gulp.dest(dist + '/js'));
		
	console.log("Modernizr OK !");
});



// CREATION DU JAVASCRIPT POUR VIEUX NAVIGATEUR (pour le footer)
var modulesOld = [
	
	// MODULES EXTERNES
	
	// HTML5 Shiv
	mods + '/html5shiv/dist/html5shiv.js',
	// HTML5 Shiv
	mods + '/respond.js/dest/respond.min.js',

];

gulp.task('scripts:old', function() {	
	gulp.src(modulesOld)
        .pipe(concat('scripts.old.js'))
		.pipe(lazyMinify())
        .pipe(gulp.dest(dist + '/js'));
		
	console.log("Regroupement des JS pour vieux navigateurs OK !");
});
*/

gulp.task('default', function() {
	
	console.log("Début des traitements");
	
	gulp.start('less');
	
	gulp.start('scripts');
	
	// gulp.start('scripts:old');
	
	// gulp.start('scripts:modernizr');

	watch(app + '/less/**/*.less', function($event) {
		gulp.start('less');
	} );
	
	watch(app + '/js/**/*.js', function($event) {
		gulp.start('scripts');
	} );
}); 