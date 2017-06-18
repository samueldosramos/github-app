'use strict'

import gulp from 'gulp'
import sass from 'gulp-sass'
import plumber from 'gulp-plumber'
import concat from 'gulp-concat'
import babel from 'gulp-babel'
const browserSync = require('browser-sync').create()

const dir = {
  src: 'src',
  dest: 'build'
}

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000
  })
})

gulp.task('sass', () => {
  gulp.src(`${dir.src}/sass/main.scss`)
  .pipe(sass({outputStyle: 'compressed'})
  .on('error', sass.logError))
  .pipe(browserSync.stream())
  .pipe(gulp.dest(`${dir.dest}/styles`))
  .pipe(browserSync.reload({stream:true}))
})

gulp.task('image', () => {
  gulp.src(`${dir.src}/images/**/*.{jpg, png, gif}`)
  .pipe(gulp.dest(`${dir.dest}/img/`))
})

gulp.task('js', () => {
  gulp.src(`${dir.src}/js/**/*.js`)
  .pipe(babel({presets: ['es2015']}))
  .pipe(concat('main.js'))
  .pipe(gulp.dest(`${dir.dest}/js`))
  .pipe(browserSync.reload({stream:true}))
})

gulp.task('watch', () => {
  gulp.watch(`${dir.src}/js/**/*.js`, ['js'])
  gulp.watch(`${dir.src}/image/**/*.{jpg, png, gif}`, ['image'])
  gulp.watch(`${dir.src}/sass/**/*.scss`, ['sass'])
  gulp.watch('*.html').on('change', browserSync.reload)
})

gulp.task('default', ['sass', 'image', 'js', 'browser-sync', 'watch'])
