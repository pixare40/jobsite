module app.domain {
    export class Message {
        constructor(
            public messageId: number,
            public title: string,
            public messageBody: string
        ) { }
    }
}