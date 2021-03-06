﻿module app.profile {

    export interface IUserData {
        FirstName: string;
        LastName: string;
        UserName: string;
        Location: string;
        Email: string;
        Password: string;
        ConfirmPassword: string;
        PhoneNumber: string;
        IDCardNumber: string;
    }

    export class UserData implements IUserData {
        constructor(
            public FirstName: string,
            public LastName:string,
            public UserName: string,
            public Location: string,
            public Email: string,
            public Password: string,
            public Role: string,
            public ConfirmPassword: string,
            public PhoneNumber: string,
            public IDCardNumber: string,
            public CompanyName: string,
            public grant_type: string) { }
    }

    interface IAccountController {
        errorMessage: string;
        successMessage: string;
        userdata: IUserData;
        isLoggedIn: boolean;
        registerUser(): void;
    }

    class AccountController implements IAccountController {

        errorMessage: string;
        successMessage: string;
        userdata: UserData;
        employerData: any;
        isLoggedIn: boolean;
        locations: app.models.Location[];
        roles: any[];

        static $inject = ['app.services.AccountService', 'app.services.CurrentUser', '$location', '$rootScope', '$cookies', 'app.services.SearchService'];
        constructor(private accountService: app.services.AccountService,
            private currentUser: app.services.CurrentUser,
            private $location: ng.ILocationService, private $rootScope: ng.IRootScopeService,
            private $cookies: ng.cookies.ICookiesService,
            private searchService: app.services.SearchService, private $scope: ng.IScope) {
                this.userdata = new UserData("", "", "","", "","", "", "","", "","", "");
                this.isLoggedIn = this.currentUser.profile.isLoggedIn;
                this.setLocations();
                this.setRoles();
        }

        setRoles(): void {
            this.roles = [app.ValueObjects.RolesValueObject.COMPANY_ROLE, app.ValueObjects.RolesValueObject.INDIVIDUAL_ROLE];
        }

        setLocations(): void {
            if (this.searchService.locations) {
                this.locations = this.searchService.locations;
            }
            else {
                this.searchService.getLocations().success((data) => {
                    this.locations = data;
                    this.searchService.locations = data;
                });
            }
        }

        registerUser(): void {
            this.errorMessage = null;
            this.successMessage = null;

            this.userdata.ConfirmPassword = this.userdata.Password;
            this.userdata.UserName = this.userdata.PhoneNumber;
            this.accountService.register(this.userdata)
                .success(
                (data, status) => {
                    this.userdata.ConfirmPassword = "";
                    this.successMessage = "... Registration successful";
                    this.login();})
                .error(
                (response, status) => {
                    this.errorMessage = "";
                    this.isLoggedIn = false;

                    // Validation errors
                    if (response.ModelState) {
                        for (var key in response.ModelState) {
                            this.errorMessage += response.ModelState[key] + "\r\n";
                        }
                    }
                });
        }

        login(): void {
            this.errorMessage = null;
            this.successMessage = null;
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
                    this.errorMessage = "";
                    this.userdata.Password = "";
                    this.errorMessage = response.statusText + "\r\n";
                    if (response.error_description)
                        this.errorMessage += response.error_description;

                    if (response.error) {
                        this.errorMessage += response.error;
                    }
                }
                );
        }

        registerEmployer(): void {

        }

        logout(): void {
            this.errorMessage = null;
            this.successMessage = null;
            this.accountService.logout().success(
                (data, status) => {
                    this.isLoggedIn = false;
                    this.currentUser.setProfile("", "", false);
                    this.successMessage = "Logout Succesful";
                    this.userdata = new UserData("","","","","", "", "", "", "","","","");
                }).error(
                (data, status) => {
                });
        }
        
    }

    angular
        .module('app.profile')
        .controller('app.profile.AccountController', AccountController);

}