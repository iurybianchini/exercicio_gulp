const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens(){
    return gulp.src('./source/images/*') //não colocamos extensão pois pode haver varias
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

function comprimeJavaScripit(){
    return gulp.src('./source/scripts/*.js') //retorno chamando a função gulp.src (passar os arquivos definindo a pasta de origem e todos arquivos)
    .pipe(uglify()) //pluggin adicionado
    .pipe(obfuscate()) //obfuscação deve ser inserida antes da parta de destino
    .pipe(gulp.dest('./build/scripts'))//pasta de destino para arquivos
}

function compilaSass(){
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init()) //executamos o pluguing
        .pipe(sass({
            outputStyle: 'compressed'
        })) //sass alem de copilar deve minificar
        .pipe(sourcemaps.write('./maps')) //para criar o arquivo do mapa, junto com uma pasta, este caminho ele ja vai considerar o caminho os arquivos css ja estão
        .pipe(gulp.dest('.build/styles'));
}

exports.default = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScripit));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagens));
}