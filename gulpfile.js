'use strict'

var gulp = require('gulp'),
		   browserSync = require('browser-sync'),
           runSequence = require('gulp-run-sequence'),
		   htmlbuild = require('gulp-htmlbuild'),
		   concat = require('gulp-concat');

gulp.task('assets-dist-webGames', function () {
    return gulp.src(['assets/*'])
        .pipe(gulp.dest('./dist/assets'));
});
gulp.task('css-dist-webGames', function () {
    return gulp
		.src(['./css/*.css'])
		.pipe(concat('customCss.css'))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('js-dist-webGames', function () {
    return gulp
		.src('./src/**/*.js')
		.pipe(concat('customJs.js'))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('html-dist-webGames', function () {
	gulp.src(['./index.html'])
		.pipe(htmlbuild({
			js: htmlbuild.preprocess.js(function (block) {
				block.write('customJs.js');
				block.end();
			}),
			css: htmlbuild.preprocess.css(function (block) {
				block.write('customCss.css');
				block.end();
			})
		}))
		.pipe(gulp.dest('./dist/'));
});
gulp.task('dist-webGames', function () {
    runSequence('assets-dist-webGames', 'html-dist-webGames', 'css-dist-webGames', 'js-dist-webGames');
});

		   
gulp.task('reload', function () {
    process.stdout.write('browserSync reload\n');
    browserSync.reload;
});
gulp.task('js-webGames', function () {
	gulp.src(['./index.html'])
		.pipe(htmlbuild({
			js: htmlbuild.preprocess.js(function (block) {
				block.write('customJs.js');
				block.end();
			}),
			css: htmlbuild.preprocess.css(function (block) {
				block.write('customCss.css');
				block.end();
			})
		}))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('html-webGames', function () {
    gulp.src(['./*.html'])
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('css-webGames', function () {
    gulp.src(['./css/*.css'])
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('serve-webGames', ['js-webGames', 'html-webGames', 'css-webGames'], function () {
    browserSync.init({
        port: 4040,
        server: {
            baseDir: ['./'],
            index: 'index.html'
        }
    });
});
gulp.task('watch-webGames', ['serve-webGames'], function () {
     gulp.watch(['./src/**/*.js'], function () {
        runSequence(['js-webGames'], 'reload');
    });

	gulp.watch(['./*.html'], function () {
        runSequence(['html-webGames'], 'reload');
    });

    gulp.watch(['./css/*.css'], function () {
        runSequence(['css-webGames'], 'reload');
    });
});