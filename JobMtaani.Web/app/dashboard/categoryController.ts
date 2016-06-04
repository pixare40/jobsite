module app.dashboard {

    interface ICategoryController {
        categoryName: string;
    }

    class CategoryController implements ICategoryController {

        categoryName: string;
        message: string;

        static $inject = ['app.services.CategoryService'];
        constructor(private categoryService: app.services.CategoryService) {
        }

        createCategory(): void {

            this.categoryService.createCategory(new app.domain.Category(this.categoryName)).success(
                (data, status) => {
                    this.message = "Success";
                }
            ).error(
                (data, status) => {
                    this.message = "Error"
                });
            
        }

    }

    angular
        .module('app.dashboard')
        .controller('app.dashboard.CategoryController', CategoryController);

}