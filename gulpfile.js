const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

gulp.task('browserify', function (argument) {
	browserify('./src/js/main.js')
	.transform(babelify, {presets: ["react"]})
	.bundle()
	.pipe(source('main.js'))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function (argument) {
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));
	gulp.src('src/css/*.*')
		.pipe(gulp.dest('dist/css'));
	gulp.src('src/js/vendor/*.*')
		.pipe(gulp.dest('dist/js'));
	gulp.src('src/todomvc-common/*.*')
		.pipe(gulp.dest('dist/todomvc-common'));
});

gulp.task('default',['browserify','copy'],function(){
	return gulp.watch('src/js/**/*.*',['browserify','copy']);

});