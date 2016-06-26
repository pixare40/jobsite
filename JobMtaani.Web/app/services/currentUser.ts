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

        static $inject = ['$http', '$cookies', '$rootScope']
        constructor(private $http: ng.IHttpService,
            private $cookies: ng.cookies.ICookiesService, private $rootScope: ng.IRootScopeService) {
            this.profile = new Profile(false, "", "");
            this.fetchTokenFromCookie();
            this.setUserInfo();
        }

        setProfile(username: string, token: string, isLoggedIn: boolean) {
            this.profile = new Profile(isLoggedIn, username, token);
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
            if (this.profile.token == null) {
                return;
            }

            this.getCurrentUserInfo().success((data, status) => {
                this.profile.username = data.UserName;
                this.profile.isLoggedIn = true;
                this.$rootScope.$broadcast(app.valueobjects.NotificationsValueObject.USER_LOGGED_IN, null);
            }).error((data) => {
                this.$rootScope.$broadcast(app.valueobjects.NotificationsValueObject.USER_LOGIN_FAILED, data);
            });
        }
    }

    factory.$inject = ['$http', '$cookies', '$rootScope'];
    function factory($http: ng.IHttpService, $cookies: ng.cookies.ICookiesService, $rootScope: ng.IRootScopeService): ICurrentUser {
        return new CurrentUser($http, $cookies, $rootScope);
    }

    angular
        .module('app.services')
        .factory('app.services.CurrentUser', factory);
}