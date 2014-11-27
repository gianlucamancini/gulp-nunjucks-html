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

    var defaults = {
      data: {},
      searchPaths: []
    };

    opts = assign(defaults, opts);

    var str = file.contents.toString('utf8');

    var loader = new nunjucks.FileSystemLoader(opts.searchPaths);
    var env = new nunjucks.Environment(loader);

    env.renderString(str, opts.data, function(err, res) {

      if (err) {
        return cb(new PluginError(pluginName, err));
      }

      file.contents = new Buffer(res);

      cb(null, file);

    });

  });

}

module.exports = nunjucksBuild;
