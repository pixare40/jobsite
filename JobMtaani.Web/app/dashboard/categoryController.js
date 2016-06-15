var app;
(function (app) {
    var dashboard;
    (function (dashboard) {
        var CategoryController = (function () {
            function CategoryController(categoryService) {
                this.categoryService = categoryService;
            }
            CategoryController.prototype.createCategory = function () {
                var _this = this;
                this.categoryService.createCategory(new app.domain.Category(null, this.categoryName)).success(function (data, status) {
                    _this.message = "Success";
                }).error(function (data, status) {
                    _this.message = "Error";
                });
            };
            CategoryController.$inject = ['app.services.CategoryService'];
            return CategoryController;
        }());
        angular
            .module('app.dashboard')
            .controller('app.dashboard.CategoryController', CategoryController);
    })(dashboard = app.dashboard || (app.dashboard = {}));
})(app || (app = {}));
//# sourceMappingURL=categoryController.js.map