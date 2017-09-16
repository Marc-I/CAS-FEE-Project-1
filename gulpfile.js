/**
 * Created by marc-iten on 02.12.16.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');

gulp.task('styles', function () {
    gulp.src('sass/**/[^_]*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['>5% in CH'],
            cascade: false
        }))
        .pipe(cleancss({debug: true}, function(details) {
            console.log(details.name + ' (org): ' + details.stats.originalSize);
            console.log(details.name + ' (min): ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('./css/'));

});

gulp.task('default', ['styles'], function () {
    gulp.watch('sass/**/*.scss', ['styles']);
});
