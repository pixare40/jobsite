module app.widgets {

    export class LoginModel {
        username: string;
        password: string;
        grant_type: string;
    }

    interface ILoginWidgetController {
    }

    class LoginWidgetController implements ILoginWidgetController {
        loginMessage: string;
        userdata: LoginModel;
        isLoggedIn: boolean;

        static $inject = ['app.services.AccountService', 'app.services.CurrentUser']
        constructor(private accountService: app.services.AccountService, private currentUser: app.services.CurrentUser) {
            this.isLoggedIn = this.currentUser.getProfile().isLoggedIn;
        }

        login(): void {
            this.userdata.grant_type = "password";
            this.accountService.login(this.userdata).success(
                (data, status) => {
                    this.loginMessage = "Welcome Back!";
                    this.userdata.password = "";
                    this.currentUser.setProfile(this.userdata.username, data.access_token, true);
                    this.isLoggedIn = true;
                }
            ).error(
                (response, status) => {
                    this.userdata.password = "";
                    this.isLoggedIn = false;
                    this.loginMessage = response.statusText + "\r\n";
                    if (response.error_description)
                        this.loginMessage += response.error_description;

                    if (response.error) {
                        this.loginMessage += response.error;
                    }
                }
                );
        }

        logout(): void {
            this.accountService.logout().success(
                (data, status) => {
                    this.currentUser.setProfile("", "", false);
                    this.isLoggedIn = false;
                    this.loginMessage = "Logout Succesful";
                    this.userdata = new LoginModel;
                }).error(
                (data, status) => {
                });
        }
    }

    export class LoginWidget implements ng.IDirective {
        static instance() {
            return new LoginWidget;
        }

        restrict = 'AE';
        controller = LoginWidgetController;
        controllerAs = 'vm';
        templateUrl = '/app/widgets/loginWidget/loginWidgetTemplate.html'
    }

    angular
        .module('app.widgets')
        .directive('jmLoginWidget', LoginWidget.instance);
}