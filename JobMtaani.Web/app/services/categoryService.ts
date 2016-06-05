module app.services {

    export interface ICategoryService {
        createCategory(category: app.domain.ICategory): ng.IHttpPromise<app.domain.ICategory>;
    }

    export class CategoryService implements ICategoryService {

        static $inject = ["$http", "app.services.CurrentUser"]
        constructor(private $http: ng.IHttpService, private currentUser: app.services.CurrentUser) {

        }

        createCategory(category: app.domain.ICategory): ng.IHttpPromise<app.domain.ICategory> {
            return this.$http.post("http://localhost:53039/api/category/CreateCategory", category,
                {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

    }

    angular
        .module('app.services')
        .service('app.services.CategoryService', CategoryService);

}