var gulp = require('gulp')

gulp.task('hbs', function () {
  var handlebars = require('gulp-compile-handlebars')
  var hbsBlog = require('hbs-blog')
  var pageConfig = require('./src/config.json')

  var localHelper = {
    getUrl: require('./src/helper/getUrl')
  }

  var options = {
    ignorePartials: true,
    batch: ['./src/partials'],
    helpers: Object.assign(
        {},
        localHelper,
        hbsBlog.helper
    )
  }

  return gulp.src('./src/**/*.html')
    .pipe(hbsBlog.document.gulp.load())
    .pipe(handlebars(pageConfig, options))
    .pipe(hbsBlog.document.gulp.remove())
    .pipe(gulp.dest('web'))
})

gulp.task('js', function () {
  var uglify = require('gulp-uglify')

  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('web/assets/js'))
})

gulp.task('css', function () {
  var sourcemaps = require('gulp-sourcemaps')
  var cssnano = require('cssnano')
  var sass = require('gulp-sass')

  var cssSrc = [
    './src/css/base.css'
  ]

  return gulp.src(cssSrc)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('web/assets/css'))
})

gulp.task('default', ['hbs', 'css', 'js'])
gulp.task('watch', function () {
  return gulp.watch('./src/*', ['hbs', 'css', 'js'])
})
