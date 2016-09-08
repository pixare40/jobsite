module app.ValueObjects {
    export class NotificationsValueObject {
        public static USER_LOGGED_IN: string = "USER_LOGGED_IN";
        public static USER_LOGGED_OUT: string = "USER_LOGGED_OUT";
        public static USER_LOGIN_FAILED: string = "USER_LOGIN_FAILED";
        public static PROFILE_CATEGORY_CHANGE: string = "PROFILE_CATEGORY_CHANGE";
        public static SHOW_LOADING: string = "SHOW_LOADING";
        public static HIDE_LOADING: string = "HIDE_LOADING";
        public static USER_INFO_AVAILABLE: string = "USER_INFO_AVAILABLE";
        public static SEARCHING: string = "SEARCHING";
        public static SEARCH_END: string = "SEARCH_END";
        public static USER_NOT_LOGGED_IN: string = "USER_NOT_LOGGED_IN";
    }
}
