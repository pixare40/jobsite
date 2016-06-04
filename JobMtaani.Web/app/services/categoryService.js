var app;
(function (app) {
    var services;
    (function (services) {
        var CategoryService = (function () {
            function CategoryService($http) {
                this.$http = $http;
            }
            CategoryService.prototype.createCategory = function (category) {
                return this.$http.post("http://localhost:53039/api/category/CreateCategory", category);
            };
            CategoryService.$inject = ["$http"];
            return CategoryService;
        }());
        services.CategoryService = CategoryService;
        angular
            .module('app.services')
            .service('app.services.CategoryService', CategoryService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=categoryService.js.map