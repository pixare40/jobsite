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

        constructor() {
            this.profile = new Profile(false, "", "");
        }

        profile: IProfile;
        setProfile(username: string, token: string, isLoggedIn: boolean) {
            this.profile = new Profile(isLoggedIn, username, token);
        }

        getProfile(): IProfile {
            return this.profile;
        }
    }

    factory.$inject = [];
    function factory(): ICurrentUser {
        return new CurrentUser();
    }


    angular
        .module('app.services')
        .factory('app.services.CurrentUser', factory);
}