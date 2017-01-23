var app;
(function (app) {
    var services;
    (function (services) {
        var CategoryService = (function () {
            function CategoryService($http, currentUser) {
                this.$http = $http;
                this.currentUser = currentUser;
            }
            CategoryService.prototype.createCategory = function (category) {
                return this.$http.post("/api/category/CreateCategory", category, {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
                });
            };
            CategoryService.prototype.getAllCategories = function () {
                return this.$http.get("/api/category/GetAll");
            };
            CategoryService.$inject = ["$http", "app.services.CurrentUser"];
            return CategoryService;
        }());
        services.CategoryService = CategoryService;
        angular
            .module('app.services')
            .service('app.services.CategoryService', CategoryService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=categoryService.js.map