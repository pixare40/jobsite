var app;
(function (app) {
    var models;
    (function (models) {
        var NewsFeedModel = (function () {
            function NewsFeedModel(ad, adApplication) {
                this.ad = ad;
                this.adApplication = adApplication;
            }
            return NewsFeedModel;
        }());
        models.NewsFeedModel = NewsFeedModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
