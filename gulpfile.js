var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var fileinclude = require('gulp-file-include')
var concat      = require('gulp-concat');
var reload      = browserSync.reload;


gulp.task('sass', function(){
    return gulp.src("src/_assets/stylesheets/*.scss")
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest("dist/assets/css"))
        .pipe(browserSync.stream())
});

gulp.task('compileTemplate', function() {
    return gulp.src(['src/**/*.html'])
        .pipe(
                fileinclude({
                    prefix: '@@',
                    basepath: 'src/'
                })
            )
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
});

gulp.task('compileLayouts', function() {
    return gulp.src(['src/_layouts/*.html'])
        .pipe(
                fileinclude({
                    prefix: '@@',
                    basepath: 'src/'
                })
            )
        .pipe(browserSync.stream())
});

gulp.task('copy', function() {
    gulp.src('src/_assets/images/**/*.{jpg,png,svg}')
        .pipe(gulp.dest('dist/assets/img'))
    gulp.src('src/_assets/javascripts/*.js')
        .pipe(gulp.dest('dist/assets/js'))
    gulp.src('src/_assets/fonts/*.*')
        .pipe(gulp.dest('dist/assets/fonts'))

    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest('dist/assets/js'))
    gulp.src('bower_components/**/*.css')
        .pipe(gulp.dest('dist/assets/css'))

    gulp.src('bower_components/font-awesome/**/*')
        .pipe(gulp.dest('dist/assets/vendor/font-awesome/'))
});


gulp.task('serve', ['sass', 'copy', 'compileTemplate'], function(){

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/_assets/stylesheets/*.scss", ['sass']);
    gulp.watch(['src/**/*.html', 'src/_layouts/*.html'], ['compileTemplate', 'compileLayouts']);
});


gulp.task('default', ['serve']);
