var app;
(function (app) {
    var ValueObjects;
    (function (ValueObjects) {
        var AlertTypesValueObject = (function () {
            function AlertTypesValueObject() {
            }
            return AlertTypesValueObject;
        }());
        AlertTypesValueObject.ERROR = "danger";
        AlertTypesValueObject.INFO = "info";
        AlertTypesValueObject.WARNING = "warning";
        AlertTypesValueObject.SUCCESS = "success";
        ValueObjects.AlertTypesValueObject = AlertTypesValueObject;
    })(ValueObjects = app.ValueObjects || (app.ValueObjects = {}));
})(app || (app = {}));
//# sourceMappingURL=alertTypesValueObject.js.map