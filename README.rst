.. image:: https://travis-ci.org/giaman/gulp-nunjucks-html.svg?branch=master
    :target: https://travis-ci.org/giaman/gulp-nunjucks-html

Information
-----------

+--------------+--------------------------------------+
| Package      | gulp-nunjucks-html                   |
+--------------+--------------------------------------+
| Description  | Render `Nunjucks`_ templates to HTML |
+--------------+--------------------------------------+
| Node Version | >= 0.10                              |
+--------------+--------------------------------------+

Usage
-----

.. code-block:: js

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

Options
-------

searchPaths
^^^^^^^^^^^

Type: ``Array``

Default: ``[]``

A list of paths to look for templates (see `FileSystemLoader`_. Can also be a single path for where templates live, and it defaults to the current working directory.

data
^^^^

Type: ``Object``

Default: ``{}``

An object passed as context to `nunjucks.renderstring`_.

setUp
^^^^^

Type: ``Function``

The Nunjuck's ``Environment`` object is passed to this function to enable adding filters and extension.

.. code-block:: js

    var nunjucks = require('gulp-nunjucks-html');

    gulp.task('html', function() {
      return gulp.src('src/templates/*.html')
        .pipe(nunjucks({
          searchPaths: ['src/templates'],
          setUp: function(env) {
            env.addFilter('greet', function(name) {
              // Expected markup: {{ 'James'|greet }}
              return 'Hello ' + name;
            });
            return env;
          }
        }))
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('dist'));
    });

.. _renderString: http://mozilla.github.io/nunjucks/api.html#renderstring
.. _FileSystemLoader: http://mozilla.github.io/nunjucks/api.html#filesystemloader
.. _Nunjucks: http://mozilla.github.io/nunjucks/
