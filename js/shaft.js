var Shaft = (function (Shaft) {
    'use strict';

    Shaft = function (conf, id) {
        this.conf = conf;
        this.id = id;
        this.initDom();
        this.isMoving = false;

    };

    Shaft.prototype.initDom = function () {
        this.dom = document.createElement('div');
        this.dom.classList.add('elevator-shaft');
        this.lift = new Lift(this.conf, this.id);
        this.content = this.lift.dom;
        this.dom.appendChild(this.content);
    };

    Shaft.prototype.getLift = function () {
        return this.lift;
    };

    return Shaft;

})(Shaft || {});