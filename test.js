'use strict';

var assert = require('assert');
var gutil = require('gulp-util');

var nunjucks = require('./');

it('should render Nunjucks templates as HTML', function(cb) {
  var stream = nunjucks({
    data: {
      username: 'James'
    }
  });

  stream.on('data', function(file) {
    assert.equal(file.path, __dirname + '/fixture/fixture.html');
    assert.equal(file.relative, 'fixture/fixture.html');
    assert(/<h1>Hello James<\/h1>/.test(file.contents.toString('utf8')));
    cb();
  });

  var fakeFile = new gutil.File({
    base: __dirname,
    path: __dirname + '/fixture/fixture.html',
    contents: new Buffer('<h1>Hello {{ username }}</h1>')
  });

  stream.write(fakeFile);
});
