'use strict';

var assert = require('assert');
var gutil = require('gulp-util');

var nunjucks = require('./');

it('should render Nunjucks templates to HTML', function(cb) {
  var stream = nunjucks({
    data: {
      username: 'James'
    },
    setUp: function(env) {
      env.addFilter('greet', function(str) {
        return 'Hello ' + str;
      });
      return env;
    }
  });

  var fakeFile = new gutil.File({
    base: __dirname,
    path: __dirname + '/fixture/fixture.nunjucks',
<<<<<<< HEAD
    contents: new Buffer('<h1>{{ username|greet }}</h1>')
=======
    contents: new Buffer('<h1>Hello {{ username }}</h1>')
>>>>>>> 74ee216795017e862c139ef899d0c13dbfd41d63
  });

  stream.on('data', function(file) {
    assert.equal(file.path, __dirname + '/fixture/fixture.nunjucks');
    assert.equal(file.relative, 'fixture/fixture.nunjucks');
    assert(/<h1>Hello James<\/h1>/.test(file.contents.toString('utf8')));
    cb();
  }).write(fakeFile);
<<<<<<< HEAD
});
=======
});
>>>>>>> 74ee216795017e862c139ef899d0c13dbfd41d63
