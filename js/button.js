var Button = (function (Button) {
    'use strict';

    var Button = function (liftId, floorNumber) {
        this.liftId = liftId;
        this.floorNumber = floorNumber;
        this.initDom(floorNumber);
    };

    Button.prototype.initDom = function (floorNumber) {
        var me = this;
        this.dom = document.createElement('div');
        this.dom.innerHTML = floorNumber;
        this.dom.classList.add('lift-button');
        this.dom.addEventListener('click', function () {
            PubSub.trigger('lift button clicked', [me.liftId, me.floorNumber]);
        });
    };

    return Button;

})(Button || {});