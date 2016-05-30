module app.domain {

    export interface IAd {
        adId: string;
        accountId: string;
        adApplicants: any;
        categoryId: string;
        adLocation: string;
        adClosed: boolean;
        adDescription: string;
    }

    export class Ad implements IAd {

        constructor(
            public adId: string,
            public accountId: string,
            public adApplicants: any,
            public categoryId: string,
            public adLocation: string,
            public adClosed: boolean,
            public adDescription) {
        }
    }

}