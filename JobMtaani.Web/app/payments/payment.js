var app;
(function (app) {
    var domain;
    (function (domain) {
        var Payment = (function () {
            function Payment(paymentId, paymentAmount, fromAccountId, toAccountId, paymentType, transactionDate) {
                this.paymentId = paymentId;
                this.paymentAmount = paymentAmount;
                this.fromAccountId = fromAccountId;
                this.toAccountId = toAccountId;
                this.paymentType = paymentType;
                this.transactionDate = transactionDate;
            }
            return Payment;
        }());
        domain.Payment = Payment;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=payment.js.map