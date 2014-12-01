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

A list of paths to look for templates (see `FileSystemLoader`_). Normally this hash contains the root directory where the templates are placed to allow a relative import.

data
^^^^

Type: ``Object``

Default: ``{}``

An object passed as context to the template.

.. _FileSystemLoader: http://mozilla.github.io/nunjucks/api.html#filesystemloader
.. _Nunjucks: http://mozilla.github.io/nunjucks/
