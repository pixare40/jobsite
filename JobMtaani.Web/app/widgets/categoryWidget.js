var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var CategoryWidgetController = (function () {
            function CategoryWidgetController(categoryService, adService, $rootScope, $element, $scope, $location) {
                var _this = this;
                this.categoryService = categoryService;
                this.adService = adService;
                this.$rootScope = $rootScope;
                this.$element = $element;
                this.$scope = $scope;
                this.$location = $location;
                this.$scope.vm = this;
                this.categoryService.getAllCategories().success(function (data, status) {
                    _this.categories = data;
                }).error(function (data) {
                    _this.message = "Error fetching category data";
                });
            }
            CategoryWidgetController.prototype.goToCategory = function (categoryId) {
                var _this = this;
                this.adService.getAdsByCategory(categoryId).success(function (data, status) {
                    _this.adService.categoryJobs = data;
                    _this.$location.path('ads');
                }).error(function (data) {
                    _this.message = "An Error Was Encountered navigating to Ads";
                });
            };
            CategoryWidgetController.$inject = ['app.services.CategoryService',
                'app.services.AdService',
                '$rootScope', '$element', '$scope', '$location'];
            return CategoryWidgetController;
        }());
        var CategoryWidget = (function () {
            function CategoryWidget() {
                this.restrict = 'AE';
                this.scope = {
                    categories: '='
                };
                this.controller = CategoryWidgetController;
                this.templateUrl = '/app/widgets/categoryWidgetTemplate.html';
            }
            CategoryWidget.instance = function () {
                return new CategoryWidget;
            };
            return CategoryWidget;
        }());
        widgets.CategoryWidget = CategoryWidget;
        angular
            .module('app.widgets')
            .directive('jmCategoryWidget', CategoryWidget.instance);
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
//# sourceMappingURL=categoryWidget.js.map