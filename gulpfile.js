

let gulp = require('gulp'),
	sass = require('gulp-sass'),  //  сжатие и перенос в папку build всех .scss файлов
	browserSync = require('browser-sync'),  // синхронизация с браузером
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify');


gulp.task('scss', function () {
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(autoprefixer({ overrideBrowserslist: ['last 3 versions'] }))
		.pipe(gulp.dest('app/build'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
	return gulp.src('app/*.html')
		.pipe(gulp.dest('app/build/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function () {
	return gulp.src('app/js/*.js')
		.pipe(browserSync.reload({ stream: true }))
});

// gulp.task('script', function () {
// 	return gulp.src([
// 		'node_modules/slick-carousel/slick/slick.js'
// 	])
// 		.pipe(concat('libs.js'))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('app/js'))
// 		.pipe(browserSync.reload({ stream: true }))
// });

gulp.task('js', function () {
	return gulp.src('app/js/*.js')
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/build'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: { baseDir: "./app" }
	});
});



gulp.task('watch', function () {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
	gulp.watch('app/*.html', gulp.parallel('html'));
	gulp.watch('app/js/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('html', 'scss', 'js', 'browser-sync', 'watch'));
