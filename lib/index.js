'use strict';

const Domain = require('./domain');
const Email = require('./email');
const Tlds = require('./tlds');


const internals = {
    defaultTlds: { allow: Tlds, deny: null }
};


module.exports = {
    domain: {
        analyze : function(domain, options) {

            options = internals.options(options);
            return Domain.analyze(domain, options);
        },

        isValid : function(domain, options) {

            options = internals.options(options);
            return Domain.isValid(domain, options);
        }
    },
    email: {
        analyze : function(email, options) {

            options = internals.options(options);
            return Email.analyze(email, options);
        },

        isValid : function(email, options) {

            options = internals.options(options);
            return Email.isValid(email, options);
        }
    }
};


internals.options = function (options) {

    if (!options) {
        return { tlds: internals.defaultTlds };
    }

    if (options.tlds === false) {                // Defaults to true
        return options;
    }

    if (!options.tlds ||
        options.tlds === true) {

        return Object.assign({}, options, { tlds: internals.defaultTlds });
    }

    if (typeof options.tlds !== 'object') {
        throw new Error('Invalid options: tlds must be a boolean or an object');
    }

    if (options.tlds.deny) {
        if (options.tlds.deny instanceof Set === false) {
            throw new Error('Invalid options: tlds.deny must be a Set object');
        }

        if (options.tlds.allow) {
            throw new Error('Invalid options: cannot specify both tlds.allow and tlds.deny lists');
        }

        return options;
    }

    if (options.tlds.allow === true) {
        return Object.assign({}, options, { tlds: internals.defaultTlds });
    }

    if (options.tlds.allow instanceof Set === false) {
        throw new Error('Invalid options: tlds.allow must be a Set object or true');
    }

    return options;
};
