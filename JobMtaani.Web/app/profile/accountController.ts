module app.profile {

    export interface IUserData {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
        phoneNumber: string;
    }

    export class UserData implements IUserData {
        constructor(
            public username: string,
            public email: string,
            public password: string,
            public confirmPassword: string,
            public phoneNumber: string,
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

        static $inject = ['app.services.AccountService', 'app.services.CurrentUser'];
        constructor(private accountService: app.services.AccountService, private currentUser: app.services.CurrentUser) {
            this.message = "";
            this.userdata = new UserData("", "", "", "", "", "");
            this.isLoggedIn = this.currentUser.profile.isLoggedIn;
        }

        registerUser() : void {
            this.userdata.confirmPassword = this.userdata.password;
            this.accountService.register(this.userdata)
                .success(
                (data, status) => {
                    this.userdata.confirmPassword = "";
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
            this.userdata.username = this.userdata.email;
            this.userdata.grant_type = "password";
            this.accountService.login(this.userdata).success(
                (data, status) => {
                    this.message = "Login Succesful";
                    this.userdata.password = "";
                    this.isLoggedIn = true;
                    this.currentUser.setProfile(this.userdata.username, data.access_token, true);
                }
            ).error(
                (response, status) => {
                    this.userdata.password = "";
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
                    this.userdata = new UserData("", "", "", "", "","");
                }).error(
                (data, status) => {
                });
        }
        
    }

    angular
        .module('app.profile')
        .controller('app.profile.AccountController', AccountController);

}