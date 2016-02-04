var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat');

gulp.task('minify', function(){
  return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('build'));
});
