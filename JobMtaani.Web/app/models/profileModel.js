var app;
(function (app) {
    var domain;
    (function (domain) {
        var ProfileModel = (function () {
            function ProfileModel(Email, UserName, FirstName, LastName, DateJoined, PhoneNumber, SubscriptionStatus) {
                this.Email = Email;
                this.UserName = UserName;
                this.FirstName = FirstName;
                this.LastName = LastName;
                this.DateJoined = DateJoined;
                this.PhoneNumber = PhoneNumber;
                this.SubscriptionStatus = SubscriptionStatus;
            }
            return ProfileModel;
        }());
        domain.ProfileModel = ProfileModel;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
