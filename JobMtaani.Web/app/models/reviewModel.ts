module app.models {
    export class ReviewModel {
        constructor(
            public TotalReviews: number,
            public Reviews: Array<Review>
        ) {
        }
    }
}