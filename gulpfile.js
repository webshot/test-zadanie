var gulp = require('gulp');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

//Функция по перезаписи .scss в .css
css_style = (done) =>{
    gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        errorLogToConsole: true,
        outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
        browers: ['last 2 version'],
            cascade: false
    }))
    .pipe( rename( {suffix: '.min'} ) )
    .pipe(sourcemaps.write('./'))
    .pipe( gulp.dest('./css/') );
    //Завершается работа стрелочной функции
    done();
}

//Автоматическое отслеживание изменений в файлах
watchSass = () =>{
    gulp.watch("./scss/**/*", css_style);
}

//Вызов дефолтной функции
gulp.task('default', gulp.series(watchSass));