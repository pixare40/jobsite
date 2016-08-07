var app;
(function (app) {
    var models;
    (function (models) {
        var NewsFeedModel = (function () {
            function NewsFeedModel(AdDetails, AdApplication) {
                this.AdDetails = AdDetails;
                this.AdApplication = AdApplication;
            }
            return NewsFeedModel;
        }());
        models.NewsFeedModel = NewsFeedModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=newsFeedModel.js.map