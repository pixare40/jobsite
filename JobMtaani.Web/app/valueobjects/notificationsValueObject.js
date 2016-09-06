var app;
(function (app) {
    var ValueObjects;
    (function (ValueObjects) {
        var NotificationsValueObject = (function () {
            function NotificationsValueObject() {
            }
            NotificationsValueObject.USER_LOGGED_IN = "USER_LOGGED_IN";
            NotificationsValueObject.USER_LOGGED_OUT = "USER_LOGGED_OUT";
            NotificationsValueObject.USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
            NotificationsValueObject.PROFILE_CATEGORY_CHANGE = "PROFILE_CATEGORY_CHANGE";
            NotificationsValueObject.SHOW_LOADING = "SHOW_LOADING";
            NotificationsValueObject.HIDE_LOADING = "HIDE_LOADING";
            NotificationsValueObject.USER_INFO_AVAILABLE = "USER_INFO_AVAILABLE";
            NotificationsValueObject.SEARCHING = "SEARCHING";
            NotificationsValueObject.SEARCH_END = "SEARCH_END";
            return NotificationsValueObject;
        }());
        ValueObjects.NotificationsValueObject = NotificationsValueObject;
    })(ValueObjects = app.ValueObjects || (app.ValueObjects = {}));
})(app || (app = {}));
