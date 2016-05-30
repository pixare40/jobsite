module app.home{
    interface IHomeController {
        title: string;
    }

    class HomeController implements IHomeController {
        title: string;

        constructor() {
            this.title = 'Job Mtaani App'
        }
    }

    angular
        .module('app.home')
        .controller('app.home.HomeController', HomeController);
}