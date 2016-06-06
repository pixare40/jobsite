module app.widgets {

    interface ICategoryWidgetController {
    }

    interface ICategoryWidgetScope extends ng.IScope {
        categories: app.domain.Category[];
        vm: CategoryWidgetController;
    }

    class CategoryWidgetController implements ICategoryWidgetController {

        message: string
        categories: app.domain.Category[];
        static $inject = ['app.services.CategoryService',
            'app.services.AdService',
            '$rootScope', '$element', '$scope','$location'];
        constructor(private categoryService: app.services.CategoryService,
            private adService: app.services.AdService,
            private $rootScope: ng.IRootScopeService,
            private $element: JQuery,
            public $scope: ICategoryWidgetScope, private $location: ng.ILocationService) {
            this.$scope.vm = this;
            this.categoryService.getAllCategories().success(
                (data, status) => {
                    this.categories = data;
                }).error(
                (data) => {
                    this.message = "Error fetching category data"
                });
        }

        goToCategory(categoryId): void {
            this.adService.getAdsByCategory(categoryId).success(
                (data, status) => {
                    this.adService.categoryJobs = data;
                    this.$location.path('ads');
                }).error(
                (data) => {
                    this.message = "An Error Was Encountered navigating to Ads";
                });
        }

    }

    export class CategoryWidget implements ng.IDirective {
        static instance() {
            return new CategoryWidget;
        }

        restrict = 'AE';
        scope = {
            categories: '='
        }
        controller = CategoryWidgetController;
        templateUrl= '/app/widgets/categoryWidgetTemplate.html';
    }

    angular
        .module('app.widgets')
        .directive('jmCategoryWidget', CategoryWidget.instance);
}