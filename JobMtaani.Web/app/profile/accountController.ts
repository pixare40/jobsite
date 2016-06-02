module app.profile {

    export interface IUserData {
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    export class UserData implements IUserData {
        constructor(
            public username: string,
            public email: string,
            public password: string,
            public confirmPassword: string,
            public grant_type: string) { }
    }

    interface IAccountController {
        message: string;
        userdata: IUserData;
        isLoggedIn(): boolean;
        registerUser(): void;
        login(): void;
    }

    class AccountController implements IAccountController {

        message: string;
        userdata: UserData;

        static $inject = ['app.services.AccountService', 'app.services.CurrentUser'];
        constructor(private accountService: app.services.AccountService, private currentUser: app.services.CurrentUser) {
            this.message = "";
            this.userdata = new UserData("", "", "", "","");
        }

        isLoggedIn(): boolean {
            return this.currentUser.profile.isLoggedIn;
        }

        registerUser() : void {
            this.userdata.confirmPassword = this.userdata.password;
            this.accountService.register(this.userdata)
                .success(
                function (data) {
                    this.confirmPassword = "";
                    this.message = "... Registration successful";
                    this.login();})
                .error(
                function (response) {
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
                function (data) {
                    this.message = "";
                    this.password = "";
                    this.currentUser.setProfile(this.userData.userName, data.access_token);
                }
            ).error(
                function (response) {
                    this.password = "";
                    this.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        this.message += response.data.exceptionMessage;

                    if (response.data.error) {
                        this.message += response.data.error;
                    }
                }
                );
        }
        
    }

    angular
        .module('app.profile')
        .controller('app.profile.AccountController', AccountController);

}