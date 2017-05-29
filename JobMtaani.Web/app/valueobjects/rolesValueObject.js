var app;
(function (app) {
    var ValueObjects;
    (function (ValueObjects) {
        var RolesValueObject = (function () {
            function RolesValueObject() {
            }
            return RolesValueObject;
        }());
        RolesValueObject.COMPANY_ROLE = "Company";
        RolesValueObject.INDIVIDUAL_ROLE = "Individual";
        ValueObjects.RolesValueObject = RolesValueObject;
    })(ValueObjects = app.ValueObjects || (app.ValueObjects = {}));
})(app || (app = {}));
//# sourceMappingURL=rolesValueObject.js.map