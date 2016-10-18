var Lift = (function (Lift) {
    'use strict';

    Lift = function (conf, id) {
        this.id = id;
        this.conf = conf;
        this.init();
        this.subscribeToTime();
        this.status = {
            mentality: 'Upwards',
            isMoving: false,
            upwardDestinations: [],
            downwardDestinations: [],
            direction: 'None',
            vector: 'None',
            floor: 3
        };
    };

    Lift.prototype.init = function () {
        this.dom = document.createElement('div');
        this.dom.classList.add('lift');
        this.tempStatus = document.createElement('div');
        this.tempStatus.classList.add('lift-status');
        this.createButtons(this.conf.numFloors);
        this.dom.appendChild(this.tempStatus);
    };

    Lift.prototype.getStatus = function () {
        return this.status;
    };

    Lift.prototype.addDestination = function (floorNum, mentality) {
        if (floorNum >= this.getCurrentFloor()) {
            this.status.upwardDestinations.push(floorNum);
            this.status.upwardDestinations.sort();
        } else {
            this.status.downwardDestinations.push(floorNum);
            this.status.downwardDestinations.sort(function (a, b) {
                return b - a;
            });
        }
    };

    Lift.prototype.subscribeToTime = function () {
        PubSub.on('tick tock', this._onTimeInterval, this);
    };

    Lift.prototype._onTimeInterval = function () {
        this.status.floor = this.getCurrentFloor();
        if (this.waitTime > 0) {
            this.waitTime--;
            this.status.isMoving = false;
            this.printStatus('Waiting ' + this.waitTime);
        } else if (this.status.mentality === 'Upwards' && this.status.upwardDestinations.length > 0) {
            this.status.isMoving = true;
            this.moveTowardsFloor(this.status.upwardDestinations[0]);
        } else if (this.status.mentality === 'Downwards' && this.status.downwardDestinations.length > 0) {
            this.status.isMoving = true;
            this.moveTowardsFloor(this.status.downwardDestinations[0]);
        } else {
            if (this.status.upwardDestinations.length === 0) this.status.mentality = 'Downwards';
            if (this.status.downwardDestinations.length === 0) this.status.mentality = 'Upwards';
        }
    };

    Lift.prototype.moveTowardsFloor = function (floorNum) {
        var targetOffset = this.conf.floors[floorNum], currentOffset = this.dom.offsetTop;
        if (currentOffset < targetOffset) {
            this.status.mentality = 'Upwards';
            this.updateMovingUpwards(currentOffset, floorNum);
        } else if (currentOffset > targetOffset) {
            this.status.direction = 'Downwards';
            this.updateMovingDownwards(currentOffset, floorNum);
        } else {
            this.handleFloorReached();
        }
    };

    Lift.prototype.updateMovingUpwards = function (currentOffset, floorNum) {
        this.dom.style.top = (currentOffset + 1) + "px";
        this.printStatus('destination ' + floorNum);
    };

    Lift.prototype.updateMovingDownwards = function (currentOffset, floorNum) {
        this.dom.style.top = (currentOffset - 1) + "px";
        this.printStatus('destination ' + floorNum);
    };

    Lift.prototype.handleFloorReached = function () {
        if (this.status.mentality === 'Upwards') {
            this.status.upwardDestinations.shift();
        } else {
            this.status.downwardDestinations.shift();
        }
        this.setWaitTime(200);
    };


    //////////////////////////////////////////////


    Lift.prototype.getCurrentFloor = function () {
        var currentOffset = this.dom.offsetTop;
        for (var floor in this.conf.floors) {
            if (this.conf.floors.hasOwnProperty(floor)) {
                if (currentOffset === this.conf.floors[floor]) {
                    return parseInt(floor);
                } else if (currentOffset > this.conf.floors[floor] && currentOffset < (this.conf.floors[parseInt(floor) + 1])) {
                    return (2 * parseInt(floor) + 1) / 2;
                }
            }
        }
    };

    Lift.prototype.printStatus = function (floorNum) {
        this.tempStatus.innerHTML =
            'msg: ' + floorNum + '<br>' +
            'mentality ' + this.status.mentality + '<br>' +
            'isMoving: ' + this.status.isMoving + '<br>' +
            'upwardDestinations: ' + this.status.upwardDestinations + '<br>' +
            'downwardDestinations: ' + this.status.downwardDestinations + '<br>' +
            'direction: ' + this.status.direction + '<br>' +
            'floor: ' + this.status.floor;
    };


    Lift.prototype.setWaitTime = function (length) {
        this.waitTime = length;
    };

    Lift.prototype.createButtons = function (numFloors) {
        var me = this;
        var frag, button, i;
        frag = document.createDocumentFragment();
        for (i = 0; i < numFloors; i++) {
            button = new Button(this.id, i);
            frag.appendChild(button.dom);

        }
        this.dom.appendChild(frag);
    };
    
    return Lift;

})(Lift || {});
