var gulp = require("gulp");
var sass = require("gulp-sass");

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
		.pipe(gulp.dest("./assets/stylesheets"));
});

gulp.task("sass:watch", function(){
	gulp.watch("src/stylesheets/**/*.scss", ["sass"]);
});