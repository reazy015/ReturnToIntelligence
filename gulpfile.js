const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require("gulp-postcss");
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();

gulp.task('style', function () {
  gulp.src('scss/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('css'))
    .pipe(server.stream());
});


gulp.task('serve', ['style'], function () {
  server.init({
    server: '.'
  });

  gulp.watch('scss/**/*.scss', ['style']).on('change', server.reload);
  gulp.watch('index.html').on('change', server.reload);
});

