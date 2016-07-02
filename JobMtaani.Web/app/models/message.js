var app;
(function (app) {
    var domain;
    (function (domain) {
        var Message = (function () {
            function Message(messageId, title, messageBody) {
                this.messageId = messageId;
                this.title = title;
                this.messageBody = messageBody;
            }
            return Message;
        }());
        domain.Message = Message;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
