// Importar los módulos y plugins que se usarán. Cada uno se impotar con require('modulo')
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
// var imagemin = require('gulp-imagemin');
// var jshint = require('gulp-jshint');

// Crear tarea

gulp.task('html', function() {
    gulp.src('src/html/*')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream());
});

gulp.task('sass', function () {
  gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: true
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('library', function() {
    gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('js', function() {
    gulp.src('src/js/*')
        //.pipe(jshint())
        //.pipe(jshint.reporter('default'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('img', function() {
    gulp.src('src/img/*')
         
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('default', ['html', 'sass', 'library', 'js', 'img'] ,function() {

    browserSync.init({
        server: "./dist/"
    });

    gulp.watch("./src/scss/**/*.scss", ['sass']);
    gulp.watch("./src/html/**/*.html", ['html']);
    gulp.watch("./src/js/**/*.js", ['js']);
    //gulp.watch("./src/html/*.html").on('change', browserSync.reload);
    //gulp.watch("./src/js/*.js").on('change', browserSync.reload);
});
