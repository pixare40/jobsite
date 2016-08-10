var app;
(function (app) {
    var ValueObjects;
    (function (ValueObjects) {
        var AlertTypesValueObject = (function () {
            function AlertTypesValueObject() {
            }
            AlertTypesValueObject.ERROR = "danger";
            AlertTypesValueObject.INFO = "info";
            AlertTypesValueObject.WARNING = "warning";
            AlertTypesValueObject.SUCCESS = "success";
            return AlertTypesValueObject;
        }());
        ValueObjects.AlertTypesValueObject = AlertTypesValueObject;
    })(ValueObjects = app.ValueObjects || (app.ValueObjects = {}));
})(app || (app = {}));
