module app.domain {

    export interface IAd {
        AdId: number;
        AdTitle: string;
        AccountId: string;
        AdApplicants: any;
        CategoryId: number;
        AdLocation: string;
        AdClosed: boolean;
        AdDescription: string;
        IconClass: string;
        CategoryName: string;
        ApproximateWage: number;
        AdApplied: boolean;
        DateCreated: Date;
    }

    export class Ad implements IAd {

        constructor(
            public AdId: number,
            public AdTitle: string,
            public AccountId: string,
            public AdApplicants: any,
            public CategoryId: number,
            public AdLocation: string,
            public AdClosed: boolean,
            public AdDescription,
            public IconClass,
            public CategoryName,
            public ApproximateWage,
            public AdApplied,
            public DateCreated) {
        }
    }

}