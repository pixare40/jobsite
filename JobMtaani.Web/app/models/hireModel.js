var app;
(function (app) {
    var models;
    (function (models) {
        var HireModel = (function () {
            function HireModel(AdId, UserName) {
                this.AdId = AdId;
                this.UserName = UserName;
            }
            return HireModel;
        }());
        models.HireModel = HireModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=hireModel.js.map