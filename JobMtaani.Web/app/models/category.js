var app;
(function (app) {
    var domain;
    (function (domain) {
        var Category = (function () {
            function Category(CategoryName) {
                this.CategoryName = CategoryName;
            }
            return Category;
        }());
        domain.Category = Category;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=category.js.map