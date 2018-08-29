const src          = './Brackets/samples/ru/Getting Started/',
    gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    cssmin       = require('gulp-clean-css'),
    sourcemaps   = require('gulp-sourcemaps'),
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin     = require('gulp-imagemin');

//преобразование стилей
gulp.task('sass', function(){
  //что проверяем
  return gulp.src(src+'project/**/*.sass')
  //если ошибка
    .pipe(plumber())
  //действие
    .pipe(sass())
  //куда сохраняем
    .pipe(gulp.dest(src+'project/'));
});

//сборка стилей
gulp.task('css', function() {
  return  gulp.src(src+'project/**/*.css')
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(src+'css/'));
});

//сжатие стилей
gulp.task('css-min', function() {
  return gulp.src(src+'css/style.css')
    .pipe(plumber())
    .pipe(cssmin())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(src+'css'));
});

//сборка скриптов
gulp.task('js', function() {
  return gulp.src(src+'project/**/*.js')
    .pipe(plumber())
    .pipe(concat('script.js'))
    .pipe(gulp.dest(src+'js/'));
});

//сжатие изображений
gulp.task('imagemin', function() {
  return gulp.src(src+'project/**/*.png')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(src+'img'));
});

//при изменении файлов
gulp.task('watch',function(){
  gulp.watch(src+'project/**/*.sass', ['sass']);
  gulp.watch(src+'project/**/*.css', ['css','css-min']);
  gulp.watch(src+'project/**/*.js', ['js']);
});

//при запуске gulp
gulp.task('default', ['css','js','imagemin','watch']);