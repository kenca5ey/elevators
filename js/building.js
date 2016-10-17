var Building = (function () {

    var Building = function (conf) {
        this._wrap = document.getElementsByClassName('building')[0];
        this.shafts = [];
        this.conf = conf;
        this.floorsDom = document.createElement('div');
        this.floors = [];
        this.init();
    };

    Building.prototype.init = function () {
        this.getWrap().classList.add('building');
        this.genFloors();
        this.genShafts();
    };

    Building.prototype.getWrap = function () {
        return this._wrap;
    };

    Building.prototype.genShafts = function () {
        var frag, shaft, i;
        frag = document.createDocumentFragment();
        for (i = 0; i < this.conf.numShafts; i++) {
            shaft = new Shaft(this.conf, i);
            this.shafts.push(shaft);
            frag.appendChild(shaft.dom);
        }
        this.getWrap().appendChild(frag);
    };

    Building.prototype.genFloors = function () {
        var frag, floor, i;
        frag = document.createDocumentFragment();
        for (i = 0; i < this.conf.numFloors; i++) {
            floor = new Floor(i);
            this.floors.push(floor);
            frag.appendChild(floor.dom);
        }
        this.floorsDom.appendChild(frag);
        this.floorsDom.classList.add('floors');
        this._wrap.appendChild(this.floorsDom);
    };

    Building.prototype.getLifts = function () {
        var lifts = [];
        this.shafts.map(function (shaft) {
            lifts.push(shaft.getLift());
        });
        return lifts;
    };

    Building.prototype.getLift = function (liftNumber) {
        return this.shafts[liftNumber].getLift();
    };

    return Building;

})(Building || {});