﻿module app.domain {

    export interface ICategory {
        CategoryId: number;
        CategoryName: string;
        CategoryCName: string;
    }

    export class Category implements ICategory {
        constructor(
            public CategoryId: number,
            public CategoryName: string,
            public CategoryCName: string
        ) { }
    }
}