module app.services {

    export interface IAccountService {
        register(userdata: app.profile.IUserData, onsuccess: any, onfailure: any): ng.IHttpPromise<any>;
        login(userdata: app.widgets.LoginModel): ng.IHttpPromise<any>;
    }

    export class AccountService implements IAccountService {

        static $inject = ['$http', 'app.services.CurrentUser'];
        constructor(private $http: ng.IHttpService,
            private currentUser: app.services.CurrentUser) {
        }
        
        register(userdata: app.profile.IUserData): ng.IHttpPromise<any>{
            return this.$http.post("/api/Account/Register", userdata);
        }

        login(userdata: app.widgets.LoginModel): ng.IHttpPromise<any>{
            return this.$http.post("/Token", userdata,
                {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        transformRequest: function (data, headersGetter) {
                            var str = [];
                            for (var d in data)
                                str.push(encodeURIComponent(d) + "=" +
                                    encodeURIComponent(data[d]));
                            return str.join("&");
                        }
                });
        }

        logout(): ng.IHttpPromise<any> {
            return this.$http.post("/api/Account/Logout", {}, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        updateUserDetails(updatedDetails: app.domain.ProfileModel) {
            return this.$http.post("/api/Account/UpdateAccountDetails", updatedDetails, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }
    }


    angular
        .module('app.services')
        .service('app.services.AccountService', AccountService);
}