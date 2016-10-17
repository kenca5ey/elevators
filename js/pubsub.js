var PubSub = (function (PubSub) {
    'use strict';

    var cache = {};

    /**
     * Publish data for a topic
     * @param topic {string}  name of the topic
     * @param args {array}    array of arguments to pass to a callback function subscribed to this topic
     *                        e.g. PubSub.Publish('PubSub/ready', [ pageName ]);
     */
    PubSub.trigger = function (topic, args) {
        if (!cache[topic]) return;
        for (var i = 0, el; el = cache[topic][i] ;i++) el.fn.apply(el.scope, args || []);
    };


    /**
     * Register a callback for a topic/event
     * @param topic {string}      name of the topic
     * @param callback {function}
     * @param scope {object}      [optional] scope for callback
     * @returns {array}           handle for unsubscribe fn
     */
    PubSub.on = function (topic, callback, scope) {
        if (!cache[topic]) cache[topic] = [];
        cache[topic].push({ fn: callback, scope: scope || callback });
        return [topic, callback, scope];
    };


    /**
     * Unregister a function subscribed for a topic/event
     * @param handle {array} a handle that was returned from the Subscribe function
     */
    PubSub.off = function (handle) {
        var i = 0, el, topic = handle[0];
        if (!cache[topic]) return;
        for (; el = cache[topic][i]; i++) if (el.fn == handle[1]) cache[topic].splice(i, 1);
    };


    return PubSub;
})(PubSub || {});