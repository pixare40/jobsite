module app.services {

    export interface ICategoryService {
        createCategory(category: app.domain.ICategory): ng.IHttpPromise<app.domain.ICategory>;
    }

    export class CategoryService implements ICategoryService {

        static $inject = ["$http", "app.services.CurrentUser"]
        constructor(private $http: ng.IHttpService, private currentUser: app.services.CurrentUser) {

        }

        createCategory(category: app.domain.ICategory): ng.IHttpPromise<app.domain.ICategory> {
            return this.$http.post("/api/category/CreateCategory", category,
                {
                    headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getAllCategories(): ng.IHttpPromise<app.domain.ICategory[]>{
            return this.$http.get("/api/category/GetAll");
        }

    }

    angular
        .module('app.services')
        .service('app.services.CategoryService', CategoryService);

}