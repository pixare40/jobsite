var app;
(function (app) {
    var domain;
    (function (domain) {
        var ProfileModel = (function () {
            function ProfileModel(UserId, Email, UserName, FirstName, LastName, Location, DateJoined, PhoneNumber, NumberOfReviews, CurrentRating, IDCardNumber, SubscriptionStatus) {
                this.UserId = UserId;
                this.Email = Email;
                this.UserName = UserName;
                this.FirstName = FirstName;
                this.LastName = LastName;
                this.Location = Location;
                this.DateJoined = DateJoined;
                this.PhoneNumber = PhoneNumber;
                this.NumberOfReviews = NumberOfReviews;
                this.CurrentRating = CurrentRating;
                this.IDCardNumber = IDCardNumber;
                this.SubscriptionStatus = SubscriptionStatus;
            }
            return ProfileModel;
        }());
        domain.ProfileModel = ProfileModel;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
