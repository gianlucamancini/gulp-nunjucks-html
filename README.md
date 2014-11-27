Usage
-----

```js
var nunjucks = require('gulp-nunjucks-html');

gulp.task('html', function() {
  return gulp.src('src/templates/*.html')
    .pipe(nunjucks({
      data: {
        username: 'James'
      },
      searchPaths: ['src/templates']
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('dist'));
});
```

Options
-------

#### searchPaths

Type: `Array`

A list of paths to look for templates (see [FileSystemLoader](http://mozilla.github.io/nunjucks/api.html#filesystemloader)).

#### data

Type: `Object`

An object passed as context to the template.
