var app;
(function (app) {
    var domain;
    (function (domain) {
        var Category = (function () {
            function Category(CategoryId, CategoryName, CategoryCName) {
                this.CategoryId = CategoryId;
                this.CategoryName = CategoryName;
                this.CategoryCName = CategoryCName;
            }
            return Category;
        }());
        domain.Category = Category;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
