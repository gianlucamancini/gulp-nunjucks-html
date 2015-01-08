[![Build Status](https://travis-ci.org/giaman/gulp-nunjucks-html.svg?branch=master)](https://travis-ci.org/giaman/gulp-nunjucks-html)

Render [Nunjucks](http://mozilla.github.io/nunjucks) templates to HTML.

## Usage

```js
var nunjucks = require('gulp-nunjucks-html');

gulp.task('nunjucks', function() {
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

## Options

#### searchPaths

Type: `Array`

Default: `[]`

A list of paths to look for templates (see [FileSystemLoader](http://mozilla.github.io/nunjucks/api.html#filesystemloader)).
Can also be a single path for where templates live, and it defaults to the current working directory.

#### locals

Type: `Object`

Default: `{}`

The `context` object passed to [nunjucks.renderString](http://mozilla.github.io/nunjucks/api.html#renderstring).

Note that if you are using [gulp-data](npmjs.org/package/gulp-data), the context passed by this will have precedence over the locals.

#### autoescape

Type: `Boolean`

Default: `false`

Controls if output with dangerous characters are escaped automatically.

#### setUp

Type: `Function`

Default: `undefined`

Use this function to extend the Nunjuck's `Environment` object, adding custom filters, tags etc.

```js
var nunjucks = require('gulp-nunjucks-html');

gulp.task('html', function() {
  return gulp.src('src/templates/*.html')
    .pipe(nunjucks({
      searchPaths: ['src/templates'],
      setUp: function(env) {
        env.addFilter('greet', function(name) {
          return 'Hello ' + name;
        });
        return env;
      }
    }))
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('dist'));
});
```
