import fileInclude from 'gulp-file-include'
import webpHtmlNosvg from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'
import pug from 'gulp-pug'

export  const templates = () => {
  return app.gulp.src(`${app.path.src.templates}/*.pug`)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'HTML',
        message: 'Error: U+1F921 <%= error.message %>'
      }))
    )
    .pipe(webpHtmlNosvg())
    .pipe(
      versionNumber({
        'value': '%DT%',
        'append': {
          'key': '_v',
          'cover': 0,
          'to': [
            'css',
            'js',
          ],
        },
        'output': {
          'file': 'gulp/version.json',
        },
      })
    )
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(pug({
      pretty: true,
      verbose: true,
    }))
    .pipe(app.gulp.dest(app.path.build.templates))
    // .pipe(app.plugins.browsersync.stream())
}