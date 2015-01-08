'use strict';

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var assign = require('object-assign');
var nunjucks = require('nunjucks');
var through = require('through2');

function nunjucksBuild(opts) {

  return through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError('gulp-nunjucks-html', 'Streams are not supported'));
    }

    var options = assign({
      autoescape: false,
      locals: {},
      searchPaths: []
    }, opts);

    var str = file.contents.toString('utf8');
    var data;

    if (file.data) {
      data = assign(options.locals, file.data);
    } else {
      data = options.locals;
    }

    var loader = new nunjucks.FileSystemLoader(options.searchPaths, {
      autoescape: options.autoescape
    });
    var env = new nunjucks.Environment(loader);

    if (options.setUp && typeof options.setUp === 'function') {
      env = options.setUp(env);
    }

    env.renderString(str, data, function(err, res) {

      if (err) {
        return cb(new PluginError('gulp-nunjucks-html', err));
      }

      file.contents = new Buffer(res);

      cb(null, file);

    });

  });

}

module.exports = nunjucksBuild;
