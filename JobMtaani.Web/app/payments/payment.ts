module app.domain {

    export interface IPayment {
        paymentId: string;
        paymentAmount: number;
        fromAccountId: string;
        toAccountId: string;
        paymentType: string;
        transactionDate: Date;
    }

    export class Payment {
        constructor(
            public paymentId: string,
            public paymentAmount: number,
            public fromAccountId: string,
            public toAccountId: string,
            public paymentType: string,
            public transactionDate) {
        }
    }

}