var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync= require('browser-sync').create();
 
//mover js para src
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js',
  'node_modules/popper.js/dist/umd/popper.min.js'])
  .pipe(gulp.dest('src/js/'))
  .pipe(browserSync.stream());
});


gulp.task('serve',function(){
   return browserSync.init({
    server:"./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'],['sass']);
  gulp.watch("src/*html").on('change', browserSync.reload);
});


gulp.task('sass', function () {
  return gulp.src(['./sass/**/index.scss','node_modules/bootstrap/scss/bootstrap.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css/'));
});
 
gulp.task('watch', function () {
  gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('default',['sass','watch','js','serve']);