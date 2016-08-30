var app;
(function (app) {
    var models;
    (function (models) {
        var AdApplicationDetailsModel = (function () {
            function AdApplicationDetailsModel(AdApplication, AdDetails) {
                this.AdApplication = AdApplication;
                this.AdDetails = AdDetails;
            }
            return AdApplicationDetailsModel;
        }());
        models.AdApplicationDetailsModel = AdApplicationDetailsModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=adApplicationDetailsModel.js.map