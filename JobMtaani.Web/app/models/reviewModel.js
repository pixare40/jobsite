var app;
(function (app) {
    var models;
    (function (models) {
        var ReviewModel = (function () {
            function ReviewModel(TotalReviews, Reviews) {
                this.TotalReviews = TotalReviews;
                this.Reviews = Reviews;
            }
            return ReviewModel;
        }());
        models.ReviewModel = ReviewModel;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
