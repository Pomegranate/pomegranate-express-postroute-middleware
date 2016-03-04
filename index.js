/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project pomegranate-express-postroute-middleware
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
var _ = require('lodash');

/**
 * Configures the Express application and mounts all post-route middleware, including error handlers.
 * @module PostMiddleware
 * @injector {None} Adds nothing to the injector.
 * @property {Object} options Plugin Options
 * @property {String[]} options.order='['404','500']' -  Mount order of middleware functions.
 *
 */

module.exports = {
  options: {
    order: ['404', '500']
  },
  metadata: {
    name: 'PostRouter',
    layer: 'post_router',
    type: 'none'
  },
  plugin: {
    load: function(inject, loaded) {
      var self = this;
      inject(function(Express, Middleware) {
        _.chain(self.options.order)
          .map(function(p) {
            return {fn: Middleware[p], name: p}
          })
          .filter(function(mw) {
            return _.isFunction(mw.fn);
          })
          .each(function(vmw) {
            self.Logger.log(vmw.name + ' Middleware added after routes.');
            Express.use(vmw.fn)
          })
          .value()
      })

      loaded(null, null)
    },
    start: function(done) {
      done()
    },
    stop: function(done) {
      done()
    }
  }
}