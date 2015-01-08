[![Build Status](https://travis-ci.org/giaman/gulp-nunjucks-html.svg?branch=master)](https://travis-ci.org/giaman/gulp-nunjucks-html)

Render [Nunjucks](http://mozilla.github.io/nunjucks) templates to HTML.

## Usage

```js
var nunjucks = require('gulp-nunjucks-html');

gulp.task('nunjucks', function() {
  return gulp.src('src/templates/*.html')
    .pipe(nunjucks({
      locals: {
        username: 'James'
      },
      searchPaths: ['src/templates']
    }))
    .pipe(gulp.dest('dist'));
});
```

### Error handling

This plugin will emit an error for cases such as invalid Nunjucks syntax or missing imported files. If uncaught, the error will crash Gulp.

You will need to attach a listener for the error event emitted by the stream:

```js
gulp.task('nunjucks', function() {
  return gulp.src('src/templates/*.html')
    .pipe(nunjucks({
      searchPaths: ['src/templates']
    }))
    .on('error', function(err) {
      // err is the error thrown by the Nunjucks compiler.
    })
    .pipe(gulp.dest('dist'));
});
```

### Use with [gulp-data](https://www.npmjs.org/package/gulp-data)

With `gulp-data` you can pass additional context to the Nunjucks compiler.

For example, to get the data from a JSON file:

```js
gulp.task('nunjucks', function() {
  return gulp.src('src/templates/contact.html')
    .pipe(data(function(file) {
      return require('./metadata/' + path.basename(file.path) + '.json');
    }))
    .pipe(nunjucks({
      locals: {
        name: 'James'
      }
    }))
    .pipe(gulp.dest('dist'));
});
```

This will merge the content of the JSON file with the `locals` hash. Note that `gulp-data` has precedence over `locals`.

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

#### autoescape

Type: `Boolean`

Default: `false`

Controls if output with dangerous characters are escaped automatically.

#### setUp

Type: `Function`

Default: `undefined`

Use this function to extend the Nunjuck's `Environment` object, adding custom filters, tags etc.

```js
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
    .pipe(gulp.dest('dist'));
});
```
