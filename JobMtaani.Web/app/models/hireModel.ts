module app.models {

    export interface IHireModel {
        AdId: number;
        UserName: string;
    }

    export class HireModel {
        constructor(public AdId: number, public UserName: string) {
        }
    }
}