module app.domain {

    export interface IAd {
        AdId: string;
        AdTitle: string;
        AccountId: string;
        AdApplicants: any;
        CategoryId: number;
        AdLocation: string;
        AdClosed: boolean;
        AdDescription: string;
    }

    export class Ad implements IAd {

        constructor(
            public AdId: string,
            public AdTitle: string,
            public AccountId: string,
            public AdApplicants: any,
            public CategoryId: number,
            public AdLocation: string,
            public AdClosed: boolean,
            public AdDescription) {
        }
    }

}