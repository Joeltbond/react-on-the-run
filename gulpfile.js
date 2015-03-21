(function () {
    'use strict';

    var gulp = require('gulp'),
        react = require('gulp-react'),
        less = require('gulp-less');

    gulp.task('react', function () {
        return gulp.src('jsx/*.jsx')
            .pipe(react({harmony: true}))
            .pipe(gulp.dest('js'));
    });

    gulp.task('less', function () {
        return gulp.src('less/styles.less')
            .pipe(less())
            .pipe(gulp.dest('css'));
    });

    gulp.task('watch', function () {
        gulp.watch('jsx/*.jsx', ['react']);
        gulp.watch('less/*.less', ['less']);
    });

    gulp.task('default', ['react', 'less', 'watch']);
}());
