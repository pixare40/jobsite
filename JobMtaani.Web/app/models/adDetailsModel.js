var app;
(function (app) {
    var models;
    (function (models) {
        var AdDetailsModel = (function () {
            function AdDetailsModel(ad, user) {
                this.ad = ad;
                this.user = user;
            }
            return AdDetailsModel;
        }());
        models.AdDetailsModel = AdDetailsModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=adDetailsModel.js.map