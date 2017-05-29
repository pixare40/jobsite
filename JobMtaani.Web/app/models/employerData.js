var app;
(function (app) {
    var models;
    (function (models) {
        var EmployerData = (function () {
            function EmployerData(EmployerName, Password) {
                this.EmployerName = EmployerName;
                this.Password = Password;
            }
            return EmployerData;
        }());
        models.EmployerData = EmployerData;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=employerData.js.map