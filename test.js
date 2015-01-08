'use strict';

var path = require('path');

var assert = require('assert');
var gutil = require('gulp-util');

var nunjucks = require('./');

var dir = String.prototype.concat.bind(__dirname, '/');

function createFile(filePath, contents) {
  var absPath = dir(filePath);
  var base = path.dirname(absPath);

  return new gutil.File({
    base: base,
    path: absPath,
    contents: new Buffer(contents)
  });
}

it('should render Nunjucks templates to HTML', function(cb) {
  var opts = {
    locals: {
      name: 'James'
    }
  };

  nunjucks(opts)
    .on('error', cb)
    .on('data', function(file) {
      assert.equal(file.path, dir('fixture/fixture.html'));
      assert.equal(file.relative, 'fixture.html');
      assert(/<p>James<\/p>/.test(file.contents.toString('utf8')));
      cb();
    })
    .write(createFile('fixture/fixture.html', '<p>{{ name }}</p>'));
});

it('should render Nunjucks templates asynchronously', function(cb) {
  function asyncFn(name, cb) {
    cb(null, 'Hello ' + name);
  }

  var opts = {
    setUp: function(env) {
      env.addFilter('greet', function(str, cb) {
        asyncFn(str, cb);
      }, true);

      return env;
    }
  };

  nunjucks(opts)
    .on('error', cb)
    .on('data', function(file) {
      assert(/Hello World/.test(file.contents.toString('utf8')));
      cb();
    })
    .write(createFile('fixture/fixture.html', '{{ "World"|greet }}'));
});
