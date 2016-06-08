var app;
(function (app) {
    var domain;
    (function (domain) {
        var Category = (function () {
            function Category(CategoryId, CategoryName) {
                this.CategoryId = CategoryId;
                this.CategoryName = CategoryName;
            }
            return Category;
        }());
        domain.Category = Category;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=category.js.map