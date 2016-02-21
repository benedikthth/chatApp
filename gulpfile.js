
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  watch = require('gulp-watch'),
  jshint = require('gulp-jshint');

gulp.task('build', function(){
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function(){
  gulp.watch('src/**/*.js', ['build']);
});
