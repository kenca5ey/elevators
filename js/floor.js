var Floor = (function () {
    'use strict';

    var Floor = function (floorNumber) {
        this.floorNumber = floorNumber;
        this.initDom();
        this.initButtons();
    };

    Floor.prototype.initDom = function () {
        this.dom = document.createElement('div');
        this.dom.classList.add('floor');
    };

    Floor.prototype.initButtons = function () {
        var frag = document.createDocumentFragment(),
            buttons = ['Up', 'Down'],
            me = this;
        buttons.map(function (btnText) {
            var btnDom = document.createElement('button');
            btnDom.innerText = btnText;
            btnDom.addEventListener('click', function () {
                PubSub.trigger('button clicked', [me.floorNumber, btnText]);
            });
            frag.appendChild(btnDom)
        });
        this.dom.appendChild(frag);
    };

    return Floor;

})(Floor || {});