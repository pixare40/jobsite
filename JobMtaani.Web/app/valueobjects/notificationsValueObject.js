var app;
(function (app) {
    var valueobjects;
    (function (valueobjects) {
        var NotificationsValueObject = (function () {
            function NotificationsValueObject() {
            }
            NotificationsValueObject.USER_LOGGED_IN = "USER_LOGGED_IN";
            NotificationsValueObject.USER_LOGGED_OUT = "USER_LOGGED_OUT";
            NotificationsValueObject.USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
            return NotificationsValueObject;
        }());
        valueobjects.NotificationsValueObject = NotificationsValueObject;
    })(valueobjects = app.valueobjects || (app.valueobjects = {}));
})(app || (app = {}));
//# sourceMappingURL=notificationsValueObject.js.map