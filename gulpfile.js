
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  watch = require('gulp-watch');

gulp.task('build', function(){
  return gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function(){
  gulp.watch('src/**/*.js', ['build']);
});
