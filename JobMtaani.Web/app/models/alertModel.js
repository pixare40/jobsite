var app;
(function (app) {
    var models;
    (function (models) {
        var AlertModel = (function () {
            function AlertModel(type, msg) {
                this.type = type;
                this.msg = msg;
            }
            return AlertModel;
        }());
        models.AlertModel = AlertModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=alertModel.js.map