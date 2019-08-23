'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');


gulp.task('copy', function () {
    return gulp.src('./app/index.html').pipe(gulp.dest('./dist'))
});

gulp.task('sass', function () {
    return gulp.src('./app/sass/**/*.sass')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'Style',
                    message: err.message
                }
            })
        }))
        .pipe(sass())
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream())
});

gulp.task('server', function () {
    browserSync.init({
        server: {baseDir: './app/'}
    });

    gulp.watch('./app/**/*.html').on('change', browserSync.reload);
    // gulp.watch('./app/**/*.css').on('change', browserSync.reload);
    gulp.watch('./app/sass/**/*.sass', gulp.series('sass'));

});


gulp.task('default', gulp.series('sass', 'server'), function () {
    console.log('Gulp running...')
});
