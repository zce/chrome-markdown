const gulp = require('gulp')
const cleanCss = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const zip = require('gulp-zip')
const del = require('del')

gulp.task('clean', del.bind(null, ['dist']))

gulp.task('styles', () => {
  return gulp.src(['src/css/**/*.css', '!src/css/md.css'], { base: 'src' })
    .pipe(cleanCss())
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

gulp.task('build', ['styles', 'scripts', 'images', 'manifest'])

gulp.task('archive', ['build'], () => {
  return gulp.src('dist/**/*')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('dist'))
})
