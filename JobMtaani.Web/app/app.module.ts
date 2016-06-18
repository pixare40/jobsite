((): void => {
    'use strict';

    var main = angular
        .module('app', [
            'ngRoute',
            //'app.core',
            'app.widgets',
            //'app.blocks',
            'app.services',
            //'app.layout',
            ///*
            //*feature areas
            //*/
            'app.dashboard',
            'app.ads',
            'app.profile',
            'app.payments',
            //'app.users',
            'app.home'
        ]);

    main.config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider: ng.route.IRouteProvider) {

        $routeProvider
            .when('/home', {
                templateUrl: '/app/home/homeTemplate.html',
                controller: 'app.home.HomeController',
                controllerAs: 'vm'
            })
            .when('/ads', {
                templateUrl: '/app/ads/adsTemplate.html',
                controller: 'app.ads.AdsController',
                controllerAs: 'vm'
            })
            .when('/createad', {
                templateUrl: '/app/ads/createAdTemplate.html',
                controller: 'app.ads.AdsController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '/app/profile/registerTemplate.html',
                controller: 'app.profile.AccountController',
                controllerAs: 'vm'
            })
            .when('/ad/:adId', {
                templateUrl: '/app/ads/adTemplate.html',
                controller: 'app.ads.AdController',
                controllerAs: 'vm'
            })
            .when('/dashboard', {
                templateUrl: '/app/dashboard/dashboardTemplate.html',
                controller: 'app.dashboard.DashboardController',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: '/app/profile/profileTemplate.html',
                controller: 'app.profile.ProfileController',
                controllerAs: 'vm'
            })
            .when('/payments', {
                templateUrl: '/app/payments/paymentsTemplate.html',
                controller: 'app.payments.PaymentsController',
                controllerAs: 'vm'
            })
            .when('/payment/:paymentId', {
                templateUrl: '/app/payments.paymentTemplate',
                controller: 'app.payments.PaymentController',
                controllerAs: 'vm'
            })
            .when('/category', {
                templateUrl: '/app/dashboard/categoryTemplate.html',
                controller: 'app.dashboard.CategoryController',
                controllerAs: 'vm'
            })
            .otherwise('/home');
    }

})();