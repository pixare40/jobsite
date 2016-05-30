var app;
(function (app) {
    var domain;
    (function (domain) {
        var Ad = (function () {
            function Ad(adId, accountId, adApplicants, categoryId, adLocation, adClosed, adDescription) {
                this.adId = adId;
                this.accountId = accountId;
                this.adApplicants = adApplicants;
                this.categoryId = categoryId;
                this.adLocation = adLocation;
                this.adClosed = adClosed;
                this.adDescription = adDescription;
            }
            return Ad;
        }());
        domain.Ad = Ad;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=ad.js.map