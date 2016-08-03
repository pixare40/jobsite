var app;
(function (app) {
    var models;
    (function (models) {
        var AdApplicantModel = (function () {
            function AdApplicantModel(AdApplicationId, AdId, AdApplicantId, DateApplied, Status) {
                this.AdApplicationId = AdApplicationId;
                this.AdId = AdId;
                this.AdApplicantId = AdApplicantId;
                this.DateApplied = DateApplied;
                this.Status = Status;
            }
            return AdApplicantModel;
        }());
        models.AdApplicantModel = AdApplicantModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=adApplicationModel.js.map