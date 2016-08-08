module app.services {

    export interface IProfile {
        isLoggedIn: boolean;
        username: string;
        token: string;
    }

    export class Profile implements IProfile {
        constructor(public isLoggedIn: boolean,
                    public username: string,
                    public token: string) {
        }
    }

    export interface ICurrentUser {
        profile: IProfile;
        setProfile(username: string, token: string, isLoggedIn: boolean): void;
        getProfile(): IProfile;
    }

    export class CurrentUser implements ICurrentUser {

        profile: IProfile;
        currentUserId: string;

        static $inject = ['$http', '$cookies', '$rootScope','$location']
        constructor(private $http: ng.IHttpService,
            private $cookies: ng.cookies.ICookiesService, private $rootScope: ng.IRootScopeService, private $location: ng.ILocationService) {
            this.profile = new Profile(false, "", "");
            this.fetchTokenFromCookie();
            this.setUserInfo();
            this.$rootScope.$on(app.ValueObjects.NotificationsValueObject.USER_LOGGED_OUT, (event) => {
                this.removeUserCookie();
                this.currentUserId = null;
                this.$location.path("/home");
            });

            this.$rootScope.$on(app.ValueObjects.NotificationsValueObject.USER_LOGGED_IN, (event) => {
                this.setUserInfo();
            });
        }

        setProfile(username: string, token: string, isLoggedIn: boolean) {
            this.profile.isLoggedIn = isLoggedIn;
            this.profile.token = token;
            this.profile.username = username;
        }

        getProfile(): IProfile {
            return this.profile;
        }

        getCurrentUserInfo(): ng.IHttpPromise<app.domain.ProfileModel> {
            return this.$http.get('/api/Account/GetAccountInfo', {
                headers: { 'Authorization': 'Bearer ' + this.getProfile().token }
            })
        }

        checkLogin(): void {
            this.fetchTokenFromCookie();
            this.setUserInfo();
        }

        fetchTokenFromCookie(): void {
            var token: string = null;
            token = this.$cookies.get("authtoken");
            if (token == null) {
            }
            this.profile.token = token;
        }

        setUserInfo(): void {
            if (!this.profile.token) {
                return;
            }

            this.getCurrentUserInfo().success((data, status) => {
                this.profile.username = data.UserName;
                this.profile.isLoggedIn = true;
                this.currentUserId = data.UserId;
                this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.USER_INFO_AVAILABLE, null);
            }).error((data, status) => {
                console.log("USER_LOGIN_FAILED");
                if (status == 401) {
                    this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.USER_LOGIN_FAILED, data);
                }
            });
        }

        removeUserCookie(): void {
            if (this.$cookies.get("authtoken") != null) {
                this.$cookies.remove("authtoken");
            }
        }
    }

    factory.$inject = ['$http', '$cookies', '$rootScope', '$location'];
    function factory($http: ng.IHttpService, $cookies: ng.cookies.ICookiesService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService): ICurrentUser {
        return new CurrentUser($http, $cookies, $rootScope, $location);
    }

    angular
        .module('app.services')
        .factory('app.services.CurrentUser', factory);
}