module app.domain {
    export class ProfileModel{
        constructor(
            public UserId: string,
            public Email: string,
            public UserName: string,
            public FirstName: string,
            public LastName: string,
            public DateJoined: Date,
            public PhoneNumber: string,
            public SubscriptionStatus: boolean
        ) { }
    }
}