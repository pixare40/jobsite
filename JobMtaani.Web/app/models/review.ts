module app.models {
    export interface IReview {
        ReviewId: number;
        AccountId: string;
        ReviewFor: string;
        ReviewTitle: string;
        ReviewText: string;
        DateCreated: Date;
        Rating: number;
    }
    export class Review implements IReview {
        constructor(
            public ReviewId: number,
            public AccountId: string,
            public ReviewFor: string,
            public ReviewTitle: string,
            public ReviewText: string,
            public DateCreated: Date,
            public Rating: number
        ) { }
    }
}