'use strict';

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var assign = require('object-assign');
var nunjucks = require('nunjucks');
var through = require('through2');

function nunjucksBuild(opts) {

  return through.obj(function(file, enc, cb) {

    var pluginName = 'gulp-nunjucks-html';

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(pluginName, 'Streaming is not supported'));
    }

    var options = assign({
      data: {},
      searchPaths: []
    }, opts);

    var str = file.contents.toString('utf8');

    var loader = new nunjucks.FileSystemLoader(options.searchPaths);
    var env = new nunjucks.Environment(loader);

    if (options.setUp && typeof options.setUp === 'function') {
      env = options.setUp(env);
    }

    env.renderString(str, options.data, function(err, res) {

      if (err) {
        return cb(new PluginError(pluginName, err));
      }

      file.contents = new Buffer(res);

      if (options.ext) {
        file.path = gutil.replaceExtension(file.path, options.ext);
      }

      cb(null, file);

    });

  });

}

module.exports = nunjucksBuild;
