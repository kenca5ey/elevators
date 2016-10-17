var LiftMaster = (function (LiftMaster) {

    var LiftMaster = function (conf, building) {
        this.conf = conf;
        this.building = building;
        this.lifts = this.building.getLifts();
    };

    LiftMaster.prototype.addLiftButtonOrder = function (liftNumber, floorNumber) {
        this.building.getLift(liftNumber).addDestination(floorNumber, null);
    };

    LiftMaster.prototype.addRequest = function (floorNumber, mentality) {

        this.lifts.sort(function (a, b) {
            return Math.abs(a.getCurrentFloor() - floorNumber) - Math.abs(b.getCurrentFloor() - floorNumber);
        });

        this.lifts[0].addDestination(floorNumber, null);

        //@todo build logic for selecting the best placed elevator based on criteria
    };

    return LiftMaster;

})(LiftMaster || {});