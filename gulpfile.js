'use strict';

const sourcemaps = require('gulp-sourcemaps');
//const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
//const cssnano = require("cssnano");
const del = require("del");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
//const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const tsc = require('gulp-typescript');

// BrowserSync
function BrowserSync(done) {
    browsersync.init({
        server: {
            baseDir: "./WGA-webGames/dist/"
        },
        port: 3000
    });
    done();
}

// BrowserSync Reload
function BrowserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean assets
function Clean() {
    return del(["./WGA-webGames/dist/"]);
}

function Css() {
    return gulp
        .src("./WGA-webGames/src/css/**/*")
        .pipe(gulp.dest("./WGA-webGames/dist/css/"))
        .pipe(rename({ suffix: ".min" }))
        //.pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(browsersync.stream());
}

function MakeTS() {
    var tsProject = tsc.createProject('./WGA-webGames/tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    tsResult.dts.pipe(gulp.dest('./WGA-webGames/dist/js'));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./WGA-webGames'))
        .pipe(browsersync.stream());
}

function Scripts() {
    return (
        gulp
            .src(["./WGA-webGames/ts/**/*"])
            .pipe(plumber())
            .pipe(gulp.dest("./WGA-webGames/dist/js"))
            .pipe(browsersync.stream())
    );
}

function WatchFiles() {
    gulp.watch("./WGA-webGames/src/css/**/*",
        Css);
    gulp.watch("./WGA-webGames/src/ts/**/*", 
        gulp.series(MakeTS, Scripts)
    );
}

// define complex tasks
const js = gulp.series(MakeTS, Scripts);
const build = gulp.series(Clean, gulp.parallel(Css, js));
const watch = gulp.parallel(WatchFiles, BrowserSync);

// export tasks
exports.js = js;
exports.clean = Clean;
exports.build = build;
exports.watch = watch;
exports.default = build;
