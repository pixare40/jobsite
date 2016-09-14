module app.domain {
    export class ProfileModel{
        constructor(
            public UserId: string,
            public Email: string,
            public UserName: string,
            public FirstName: string,
            public LastName: string,
            public Location: string,
            public DateJoined: Date,
            public PhoneNumber: string,
            public NumberOfReviews: number,
            public CurrentRating: number,
            public IDCardNumber: string,
            public SubscriptionStatus: boolean
        ) { }
    }
}