module app.profile {

    export interface IUserData {
        FirstName: string;
        LastName: string;
        UserName: string;
        Email: string;
        Password: string;
        ConfirmPassword: string;
        PhoneNumber: string;
    }

    export class UserData implements IUserData {
        constructor(
            public FirstName: string,
            public LastName:string,
            public UserName: string,
            public Email: string,
            public Password: string,
            public ConfirmPassword: string,
            public PhoneNumber: string,
            public grant_type: string) { }
    }

    interface IAccountController {
        message: string;
        userdata: IUserData;
        isLoggedIn: boolean;
        registerUser(): void;
    }

    class AccountController implements IAccountController {

        message: string;
        userdata: UserData;
        isLoggedIn: boolean;

        static $inject = ['app.services.AccountService', 'app.services.CurrentUser','$location','$rootScope','$cookies'];
        constructor(private accountService: app.services.AccountService,
            private currentUser: app.services.CurrentUser,
            private $location: ng.ILocationService, private $rootScope: ng.IRootScopeService, private $cookies: ng.cookies.ICookiesService) {
            this.message = "";
            this.userdata = new UserData("", "", "", "", "", "", "", "");
            this.isLoggedIn = this.currentUser.profile.isLoggedIn;
        }

        registerUser() : void {
            this.userdata.ConfirmPassword = this.userdata.Password;
            this.accountService.register(this.userdata)
                .success(
                (data, status) => {
                    this.userdata.ConfirmPassword = "";
                    this.message = "... Registration successful";
                    this.login();})
                .error(
                (response, status) => {
                    this.isLoggedIn = false;
                    this.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        this.message += response.data.exceptionMessage;

                    // Validation errors
                    if (response.data.modelState) {
                        for (var key in response.data.modelState) {
                            this.message += response.data.modelState[key] + "\r\n";
                        }
                    }
                });
        }

        login(): void {
            this.userdata.grant_type = "password";
            var loginModel = new app.widgets.LoginModel(this.userdata.UserName, this.userdata.Password, "password");
            this.accountService.login(loginModel).success(
                (data, status) => {
                    this.userdata.Password = "";
                    this.currentUser.setProfile(this.userdata.UserName, data.access_token, true);
                    this.$cookies.put("authtoken", data.access_token);
                    this.isLoggedIn = true;
                    this.$rootScope.$broadcast("USER_LOGGED_IN", null);
                    this.$location.path('/profile');
                }
            ).error(
                (response, status) => {
                    this.userdata.Password = "";
                    this.message = response.statusText + "\r\n";
                    if (response.error_description)
                        this.message += response.error_description;

                    if (response.error) {
                        this.message += response.error;
                    }
                }
                );
        }

        logout(): void {
            this.accountService.logout().success(
                (data, status) => {
                    this.isLoggedIn = false;
                    this.currentUser.setProfile("", "", false);
                    this.message = "Logout Succesful";
                    this.userdata = new UserData("","","", "", "", "", "","");
                }).error(
                (data, status) => {
                });
        }
        
    }

    angular
        .module('app.profile')
        .controller('app.profile.AccountController', AccountController);

}