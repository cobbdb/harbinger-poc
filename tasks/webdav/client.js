var createClient = require('webdav'),
    auth = require('../../auth.json'),
    hosts = require('./hosts.json'),
    cache = {};

/**
 * @param {string} env Can be one of `dev`, `qa`, `staging`, `prod`, `training`.
 */
module.exports = (env) => {
    cache[env] = cache[env] || createClient(hosts[env], auth.username, auth.password);
    return cache[env];
};
