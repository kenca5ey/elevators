var LiftMaster = (function (LiftMaster) {

    LiftMaster = function (conf, building) {
        this.conf = conf;
        this.building = building;
        this.lifts = this.building.getLifts();
    };

    LiftMaster.prototype.addLiftButtonOrder = function (liftNumber, floorNumber) {
        this.building.getLift(liftNumber).addDestination(floorNumber, null);
    };

    LiftMaster.prototype.addRequest = function (floorNumber, mentality) {

        this.lifts.sort(function (a, b) {
            var numJobsA = a.getStatus().downwardDestinations.length + a.getStatus().upwardDestinations.length,
                numJobsB = b.getStatus().downwardDestinations.length + b.getStatus().upwardDestinations.length;
            if (numJobsA < numJobsB) {
                return -1;
            } else if (numJobsA > numJobsB) {
                return 1;
            } else {
                return Math.abs(a.getCurrentFloor() - floorNumber) - Math.abs(b.getCurrentFloor() - floorNumber);
            }
        });

        this.lifts[0].addDestination(floorNumber, null);

        //@todo refine logic for selecting the best placed elevator on pushing floor buttons
        //@todo Fix bug - At the moment the elevator will stop for down/up requests on the way up/down
    };

    return LiftMaster;

})(LiftMaster || {});