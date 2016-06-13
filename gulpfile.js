const gulp = require('gulp')
const cssnano = require('gulp-cssnano')
const uglify = require('gulp-uglify')
const del = require('del')

gulp.task('clean', del.bind(null, ['dist']))

gulp.task('styles', () => {
  return gulp.src(['src/css/**/*.css', '!src/css/md.css'], { base: 'src' })
    .pipe(cssnano())
    .pipe(gulp.dest('dist'))
})

gulp.task('scripts', () => {
  return gulp.src(['src/js/**/*.js'], { base: 'src' })
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

gulp.task('images', () => {
  return gulp.src(['src/img/**/*.png'], { base: 'src' })
    .pipe(gulp.dest('dist'))
})

gulp.task('manifest', () => {
  return gulp.src(['src/manifest.json'], { base: 'src' })
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['clean'], () => {
  return gulp.start(['styles', 'scripts', 'images', 'manifest'])
})
