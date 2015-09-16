'use strict';

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var assign = require('object-assign');
var nunjucks = require('nunjucks');
var through = require('through2');

var PLUGIN_NAME = 'gulp-nunjucks-html';

function nunjucksBuild(opts) {

  return through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streams are not supported'));
    }

    var options = assign({
      autoescape: false,
      locals: {},
      searchPaths: []
    }, opts);

    var str = file.contents.toString('utf8');
    var data = file.data ? file.data : {};
    var fm = file.frontMatter ? file.frontMatter : {};
    var context = assign({}, options.locals, data, fm);

    var loader = new nunjucks.FileSystemLoader(options.searchPaths, {
      watch: false,
      noCache: false
    });

    var env = new nunjucks.Environment(loader, (function() {
      var envOptions = {};
      ['autoescape', 'tags'].forEach(function(opt) {
        if (options.hasOwnProperty(opt)) {
          envOptions[opt] = options[opt];
        }
      });
      return envOptions;
    })());

    if (options.setUp && typeof options.setUp === 'function') {
      env = options.setUp(env);
    }

    env.renderString(str, context, function(err, res) {

      if (err) {
        return cb(new PluginError(PLUGIN_NAME, err));
      }

      file.contents = new Buffer(res);

      if (options.ext) {
        file.path = gutil.replaceExtension(file.path, opts.ext);
      }

      cb(null, file);

    });

  });

}

module.exports = nunjucksBuild;
