var app;
(function (app) {
    var models;
    (function (models) {
        var AdApplicationModel = (function () {
            function AdApplicationModel(AdApplicationId, AdId, AdApplicantId, DateApplied, Status) {
                this.AdApplicationId = AdApplicationId;
                this.AdId = AdId;
                this.AdApplicantId = AdApplicantId;
                this.DateApplied = DateApplied;
                this.Status = Status;
            }
            return AdApplicationModel;
        }());
        models.AdApplicationModel = AdApplicationModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=adApplicationModel.js.map