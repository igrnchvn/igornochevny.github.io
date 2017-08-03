var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if');


gulp.task('styles', function () {
    return gulp.src('resources/sass/*.sass')
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }).on('error', sass.logError))
        // .pipe(gulpif(argv.production, rename({suffix: '.min', prefix: ''})))
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(gulpif(argv.production, cleanCSS()))
        .pipe(gulp.dest('app/css'));
//        .pipe(livereload());
});

gulp.task('lib-scripts', function () {
    return gulp.src([
        './resources/libs/modernizr/modernizr.js',
        './resources/libs/jquery/jquery-1.11.2.min.js',
        './resources/libs/waypoints/waypoints.min.js',
        './resources/libs/animate/animate-css.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulpif(argv.production, uglify())) //Minify libs.js
        .pipe(gulp.dest('./app/js/'));
//        .pipe(livereload());
});

gulp.task('libs-scripts', function () {
    return gulp.src([
        './resources/libs/bootstrap/js/bootstrap.js',
        './resources/libs/html5shiv/*.js',
        './resources/libs/respond/*.js'
    ])
        .pipe(gulpif(argv.production, uglify())) //Minify libs.js
        .pipe(gulp.dest('./app/js/'));
//        .pipe(livereload());
});

gulp.task('libs-styles', function () {
    return gulp.src([
        './resources/libs/font-awesome/css/*.min.css',
        './resources/libs/bootstrap/css/*.min.css',
        './resources/libs/animate/*.css'
    ])
        .pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        .pipe(gulpif(argv.production, cleanCSS()))
        .pipe(gulp.dest('./app/css/'));
//        .pipe(livereload());
});

gulp.task('libs-fonts', function () {
    return gulp.src([
        './resources/libs/font-awesome/fonts/*.eot',
        './resources/libs/font-awesome/fonts/*.svg',
        './resources/libs/font-awesome/fonts/*.ttf',
        './resources/libs/font-awesome/fonts/*.woff',
        './resources/libs/font-awesome/fonts/*.woff2',
        './resources/libs/bootstrap/fonts/*.min.css',
        './resources/libs/bootstrap/fonts/*.eot',
        './resources/libs/bootstrap/fonts/*.svg',
        './resources/libs/bootstrap/fonts/*.ttf',
        './resources/libs/bootstrap/fonts/*.woff',
        './resources/libs/bootstrap/fonts/*.woff2'
    ])
        .pipe(gulp.dest('./app/fonts/'));
//        .pipe(livereload());
});

gulp.task('scripts', function () {
    return gulp.src([
        './resources/js/**/*.js'
    ])
        .pipe(gulpif(argv.production, uglify())) //Minify libs.js
        .pipe(gulp.dest('./app/js/'));
//        .pipe(livereload());
});

gulp.task('watch', function () {
    gulp.watch('resources/sass/*.sass', ['styles']);
    gulp.watch('resources/libs/**/*.css', ['libs-styles', 'libs-fonts']);
    gulp.watch('resources/js/**/*.js', ['lib-scripts', 'scripts']);
    gulp.watch('resources/libs/**/*.js', ['libs-scripts']);
    gulp.watch('app/css/**/*.css').on("change", livereload.reload);
    gulp.watch('app/js/*.js').on("change", livereload.reload);
    gulp.watch('app/*.html').on('change', livereload.reload);
    livereload.listen();
});

gulp.task('default', ['styles', 'libs-styles', 'libs-fonts', 'libs-scripts', 'lib-scripts', 'scripts', 'watch']);
