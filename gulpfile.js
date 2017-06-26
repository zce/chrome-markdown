const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const del = require('del')

const $ = gulpLoadPlugins()

const src = 'src'
const build = 'build'
const dist = 'dist'

gulp.task('clean', del.bind(null, [build]))

gulp.task('styles', () => {
  return gulp.src([`${src}/styles/**/*.scss`], { base: src })
    .pipe($.sass())
    .pipe(gulp.dest(build))
})

gulp.task('scripts', () => {
  return gulp.src([`${src}/scripts/**/*.js`], { base: src })
    .pipe($.babel())
    .pipe(gulp.dest(build))
})

gulp.task('images', () => {
  return gulp.src([`${src}/images/**/*.png`], { base: src })
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{ cleanupIDs: false }]
    })).on('error', err => console.error(err))))
    .pipe(gulp.dest(build))
})

gulp.task('html',  () => {
  return gulp.src([`${src}/**/*.html`], { base: src })
    .pipe($.useref({searchPath: ['app', '.']}))
    .pipe($.sourcemaps.init())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cleanCss({ compatibility: '*' })))
    .pipe($.sourcemaps.write())
    .pipe($.if('*.html', $.htmlmin({ removeComments: true, collapseWhitespace: true })))
    .pipe(gulp.dest(build))
})

gulp.task('manifest', () => {
  return gulp.src([`${src}/manifest.json`], { base: src })
    .pipe($.chromeManifest({
      buildnumber: true,
      background: {
        target: 'scripts/background.js',
        exclude: [
          'scripts/chromereload.js'
        ]
      }
    }))
    .pipe($.if('*.css', $.cleanCss({ compatibility: '*' })))
    .pipe($.if('*.js', $.sourcemaps.init()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.js', $.sourcemaps.write('.')))
    .pipe(gulp.dest(build))
})

gulp.task('default', ['clean'], () => {
  return gulp.start(['styles', 'scripts', 'images', 'html', 'manifest'])
})
