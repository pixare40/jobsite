module app.services {
    export interface IMessagingService {
    }

    export class MessagingService implements IMessagingService {

        static $inject = ['$http', 'currentUser']
        constructor(private $http: ng.IHttpService, private currentUser: app.services.CurrentUser) {
        }

        getSentMessages(): ng.IHttpPromise<app.domain.Message[]> {
            return this.$http.get("/api/message/GetSentMessages", {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getRecievedMessages(): ng.IHttpPromise<app.domain.Message[]> {
            return this.$http.get("/api/message/GetReceivedMessages", {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        sendMessage(message: app.domain.Message): ng.IHttpPromise<app.domain.Message> {
            return this.$http.post("/api/message/GetReceivedMessages", message, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

    }
}