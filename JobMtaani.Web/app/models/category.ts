module app.domain {

    export interface ICategory {
        CategoryName: string;
    }

    export class Category implements ICategory {
        constructor(
            public CategoryName: string
        ) { }
    }
}