(function () {
    'use strict';
    var gulp = require('gulp'),
        react = require('gulp-react');

    gulp.task('react', function () {
        return gulp.src('jsx/synth.jsx')
            .pipe(react())
            .pipe(gulp.dest('js'));
    });
    gulp.task('watch', function () {
        gulp.watch('jsx/*.jsx', ['react']);
    });
    gulp.task('default', ['react', 'watch']);
}());