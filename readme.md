[![Build Status](https://travis-ci.org/gianlucamancini/gulp-nunjucks-html.svg?branch=master)](https://travis-ci.org/giaman/gulp-nunjucks-html)

> Render [Nunjucks](http://mozilla.github.io/nunjucks) templates to HTML.

*Issues with the output should be reported on the Nunjucks [issue tracker](https://github.com/mozilla/nunjucks/issues).*

## Install

```
$ npm install --save-dev gulp-nunjucks-html
```

## Usage

```js
var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks-html');

gulp.task('nunjucks', function() {
  return gulp.src('app/templates/**/*.html')
    .pipe(nunjucks({
      searchPaths: ['app/templates']
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

### Use with other plugins

The context used for rendering (i.e. the object passed to [nunjucks.renderString](http://mozilla.github.io/nunjucks/api.html#renderstring)) is created by merging the `locals` object (see Options) with other data passed down the stream by other plugins. Currently, this plugin supports [gulp-data](https://www.npmjs.org/package/gulp-data) and [gulp-front-matter](https://www.npmjs.org/package/gulp-front-matter).

Note that `gulp-front-matter` has the highest priority, followed by `gulp-data` and finally `locals`.

```js
gulp.task('nunjucks', function() {
  return gulp.src('src/templates/contact.html')
    // Get data from a JSON file
    .pipe(data(function(file) {
      return require('./metadata/' + path.basename(file.path) + '.json');
    }))
    // Extract the FrontMatter
    .pipe(frontMatter())
    // Context is the FrontMatter of the file and the JSON data, plus the locals object.
    .pipe(nunjucks({
      locals: { apiKey: 'secret-key-here' }
    }))
    .pipe(gulp.dest('dist'));
});
```

## API

### nunjucks(options)

#### options.searchPaths

Type: `Array`

Default: `[]`

A list of paths to look for templates (see [FileSystemLoader](http://mozilla.github.io/nunjucks/api.html#filesystemloader)).
Can also be a single path for where templates live, and it defaults to the current working directory.

#### options.locals

Type: `Object`

Default: `{}`

An hash used as context for compiling the templates.

#### options.autoescape

Type: `Boolean`

Default: `false`

Controls if output with dangerous characters are escaped automatically.

#### options.tags

Type: `Object`

Default: `Default Nunjucks syntax`

Defines the syntax for Nunjucks tags. See [Customizing Syntax](https://mozilla.github.io/nunjucks/api.html#customizing-syntax).

#### options.setUp

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

#### options.ext

Type: `String`

Default: `undefined`

Change generated files extension by this extension instead of templates extension.
