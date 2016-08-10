var app;
(function (app) {
    var domain;
    (function (domain) {
        var ProfileModel = (function () {
            function ProfileModel(UserId, Email, UserName, FirstName, LastName, Location, DateJoined, PhoneNumber, SubscriptionStatus) {
                this.UserId = UserId;
                this.Email = Email;
                this.UserName = UserName;
                this.FirstName = FirstName;
                this.LastName = LastName;
                this.Location = Location;
                this.DateJoined = DateJoined;
                this.PhoneNumber = PhoneNumber;
                this.SubscriptionStatus = SubscriptionStatus;
            }
            return ProfileModel;
        }());
        domain.ProfileModel = ProfileModel;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=profileModel.js.map