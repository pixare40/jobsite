module app.profile {

    interface IViewAdController {
    }
    class ViewAdController implements IViewAdController{
        constructor() { }
    }

    angular
        .module('app.profile')
        .controller('app.profile.ViewAdController', ViewAdController);
}