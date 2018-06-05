'use strict'

var gulp = require('gulp'),
		   browserSync = require('browser-sync'),
           runSequence = require('gulp-run-sequence'),
		   htmlbuild = require('gulp-htmlbuild'),
           concat = require('gulp-concat'),

           sourcemaps = require('gulp-sourcemaps'),
           tsc = require('gulp-typescript'),
           tsConfig = require("tsconfig-glob");

/* ==================== DIST SECTION START ==================== */
/* ------ PROJECT SITE ------ */
gulp.task('assets-dist-projectSite', function () {
    return gulp.src(['assets/*'])
        .pipe(gulp.dest('./dist/WGA-projectSite/assets'));
});
gulp.task('css-dist-projectSite', function () {
    return gulp
        .src(['./WGA-projectSite/css/*.css'])
        .pipe(gulp.dest('./dist/WGA-projectSite/'));
});
gulp.task('js-dist-projectSite', function () {
    return gulp
        .src('./WGA-projectSite/app.js')
        .pipe(gulp.dest('./dist/WGA-projectSite/'));
});
gulp.task('html-dist-projectSite', function () {
    gulp.src(['./WGA-projectSite/index.html'])
        .pipe(gulp.dest('./dist/WGA-projectSite/'));
});
gulp.task('dist-projectSite', function () {
    runSequence('assets-dist-projectSite', 'html-dist-projectSite', 'css-dist-projectSite', 'js-dist-projectSite');
});
/* ------ WEB GAMES ------ */
gulp.task('assets-dist-webGames', function () {
    return gulp.src(['assets/*'])
        .pipe(gulp.dest('./dist/WGA-webGames/assets'));
});
gulp.task('css-dist-webGames', function () {
    return gulp
        .src(['./WGA-webGames/css/*.css'])
        .pipe(gulp.dest('./dist/WGA-webGames/'));
});
gulp.task('js-dist-webGames', function () {
    return gulp
        .src('./WGA-webGames/app.js')
        .pipe(gulp.dest('./dist/WGA-webGames/'));
});
gulp.task('html-dist-webGames', function () {
    gulp.src(['./WGA-webGames/index.html'])
        .pipe(gulp.dest('./dist/WGA-webGames/'));
});
gulp.task('dist-webGames', function () {
    runSequence('assets-dist-webGames', 'html-dist-webGames', 'css-dist-webGames', 'js-dist-webGames');
});
/* ==================== DIST SECTION END ==================== */
/* ==================== START SECTION START ==================== */
/* ------ COMMON ------ */
gulp.task('reload', function () {
    process.stdout.write('browserSync reload\n');
    browserSync.reload;
});
/* ------ PROJECT SITE ------ */
gulp.task('js-projectSite', function () {
    gulp.src(['./WGA-projectSite/index.html'])
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('html-projectSite', function () {
    gulp.src(['./WGA-projectSite/*.html'])
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('css-projectSite', function () {
    gulp.src(['./WGA-projectSite/css/*.css'])
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('serve-projectSite', ['js-projectSite', 'html-projectSite', 'css-projectSite'], function () {
    browserSync.init({
        port: 4000,
		ui: {
            port: 3000
		},
        server: {
            baseDir: ['./WGA-projectSite/'],
            index: 'index.html'
        }
    });
});
gulp.task('watch-projectSite', ['serve-projectSite'], function () {
    gulp.watch(['./WGA-projectSite/js/**/*.js'], function () {
        runSequence(['js-projectSite'], 'reload');
    });

    gulp.watch(['.WGA-projectSite/*.html'], function () {
        runSequence(['html-projectSite'], 'reload');
    });

    gulp.watch(['.WGA-projectSite/css/*.css'], function () {
        runSequence(['css-projectSite'], 'reload');
    });
});
/* ------ WEB GAMES ------ */
gulp.task('ts-webGames', function () {
    var tsProject = tsc.createProject('./WGA-webGames/tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    tsResult.dts.pipe(gulp.dest('./WGA-webGames'));

    tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./WGA-webGames'))
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('html-webGames', function () {
    gulp.src(['./WGA-webGames/*.html'])
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('css-webGames', function () {
    gulp.src(['./WGA-webGames/css/*.css'])
        .pipe(browserSync.reload({ stream: true }));
});
gulp.task('serve-webGames', ['ts-webGames', 'html-webGames', 'css-webGames'], function () {
    browserSync.init({
        port: 4000,
        ui: {
            port: 3000
        },
        server: {
            baseDir: ['./WGA-webGames/'],
            index: 'index.html'
        }
    });
});
gulp.task('watch-webGames', ['serve-webGames'], function () {
    gulp.watch(['./WGA-webGames/js/**/*.ts'], function () {
        runSequence(['ts-webGames'], 'reload');
    });

    gulp.watch(['.WGA-webGames/**/*.html'], function () {
        runSequence(['html-webGames'], 'reload');
    });

    gulp.watch(['.WGA-webGames/css/**/*.css'], function () {
        runSequence(['css-webGames'], 'reload');
    });
});
/* ==================== START SECTION END ==================== */