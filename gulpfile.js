var gulp   = require("gulp");
var sass   = require("gulp-sass");
var ts     = require("gulp-typescript");
var tslint = require("gulp-tslint");

var options = {
	dev: {
		sass: {
			outputStyle: "expanded"
		}
	}
};

gulp.task("sass", function(){
	return gulp.src("src/stylesheets/**/*.scss")
		.pipe(sass(options.dev.sass).on("error", sass.logError))
		.pipe(gulp.dest("./public/assets/stylesheets"));
});

gulp.task("sass:watch", function(){
	gulp.watch("src/stylesheets/**/*.scss", ["sass"]);
});

/**
 * Compile all typescript files into public directory
 */
gulp.task("scripts", function(){
	var tsProject = ts.createProject("tsconfig.json");

	var tsResult = gulp.src("src/typescript/**/*.ts")
		.pipe(tsProject());
		
	return tsResult.js.pipe(gulp.dest("./public/assets/javascripts"));
});

/**
 * Watchs for all typescripts files and compile when any change is detected
 */
gulp.task("scripts:watch", function(){
	gulp.watch("src/typescript/**/*.ts", ["scripts"])
		.on("change", function(event){
			console.log(`File ${event.path} was ${event.type}, compiling...`);
		});
});

/**
 * Copy all the non-compiled resource files into the public directory
 */
gulp.task("resources", function(){
	return gulp.src(["src/**/*", "!src/**/*.ts", "!src/**/*.scss"])
		.pipe(gulp.dest("./public/assets"));
});

/**
 * Copy all the libraries needed for the application to run to the public directory 
 */
gulp.task("libraries", function(){
	return gulp.src([
		"@angular/**",
		"systemjs/dist/system.src.js",
		"systemjs/dist/system-polyfill.js",
		"rxjs/**",
		"zone.js/dist/**",
		"core-js/client/shim.min.js"
	], {cwd: "node_modules/**"})
	.pipe(gulp.dest("./public/assets/javascripts/libs"));
});