(function () {

    var floors = {
            0: 0,
            1: 100,
            2: 200
        },
        conf = {
            floors: floors,
            numShafts: 3,
            numFloors: Object.keys(floors).length
        };

    var building = new Building(conf);
    var liftMaster = new LiftMaster(conf, building);

    var _onFloorButtonClicked = function (floorNumber, direction) {
        liftMaster.addRequest(floorNumber, direction);
    };

    var _onLiftButtonClicked = function (liftId, floorNumber) {
        liftMaster.addLiftButtonOrder(liftId, floorNumber);
        console.log('liftId', liftId);
        console.log('floorNumber', floorNumber);
    };

    setInterval(function () {
        console.log('tick');
        PubSub.trigger('tick tock');
    }, 50);

    PubSub.on('button clicked', _onFloorButtonClicked);
    PubSub.on('lift button clicked', _onLiftButtonClicked);

})();

