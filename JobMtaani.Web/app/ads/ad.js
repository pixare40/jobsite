var app;
(function (app) {
    var domain;
    (function (domain) {
        var Ad = (function () {
            function Ad(AdId, AdTitle, AccountId, AdApplicants, CategoryId, AdLocation, AdClosed, AdDescription, DateCreated) {
                this.AdId = AdId;
                this.AdTitle = AdTitle;
                this.AccountId = AccountId;
                this.AdApplicants = AdApplicants;
                this.CategoryId = CategoryId;
                this.AdLocation = AdLocation;
                this.AdClosed = AdClosed;
                this.AdDescription = AdDescription;
                this.DateCreated = DateCreated;
            }
            return Ad;
        }());
        domain.Ad = Ad;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=ad.js.map