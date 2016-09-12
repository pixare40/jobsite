var app;
(function (app) {
    var models;
    (function (models) {
        var Review = (function () {
            function Review(ReviewId, AccountId, ReviewFor, ReviewTitle, ReviewText, DateCreated, Rating) {
                this.ReviewId = ReviewId;
                this.AccountId = AccountId;
                this.ReviewFor = ReviewFor;
                this.ReviewTitle = ReviewTitle;
                this.ReviewText = ReviewText;
                this.DateCreated = DateCreated;
                this.Rating = Rating;
            }
            return Review;
        }());
        models.Review = Review;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
//# sourceMappingURL=review.js.map