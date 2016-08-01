var app;
(function (app) {
    var models;
    (function (models) {
        var AdDetailsModel = (function () {
            function AdDetailsModel(AdDetails, AdApplicantDetails) {
                this.AdDetails = AdDetails;
                this.AdApplicantDetails = AdApplicantDetails;
            }
            return AdDetailsModel;
        }());
        models.AdDetailsModel = AdDetailsModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=adDetailsModel.js.map