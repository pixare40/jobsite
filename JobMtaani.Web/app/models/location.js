var app;
(function (app) {
    var models;
    (function (models) {
        var Location = (function () {
            function Location(LocationId, LocationCName, LocationName) {
                this.LocationId = LocationId;
                this.LocationCName = LocationCName;
                this.LocationName = LocationName;
            }
            return Location;
        }());
        models.Location = Location;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=location.js.map