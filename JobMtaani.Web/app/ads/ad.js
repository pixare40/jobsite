var app;
(function (app) {
    var domain;
    (function (domain) {
        var Ad = (function () {
            function Ad(AdId, AccountId, AdApplicants, CategoryId, AdLocation, AdClosed, AdDescription) {
                this.AdId = AdId;
                this.AccountId = AccountId;
                this.AdApplicants = AdApplicants;
                this.CategoryId = CategoryId;
                this.AdLocation = AdLocation;
                this.AdClosed = AdClosed;
                this.AdDescription = AdDescription;
            }
            return Ad;
        }());
        domain.Ad = Ad;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=ad.js.map