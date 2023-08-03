import { Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SignalRService {
    private hubConnection: HubConnection;

    startConnection() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(`${environment.api.serverUrl}/workflow-run-history-hub`)
            .build();

        this.hubConnection.start().then(() => {
            console.log('SignalR connection started.');
        }).catch(err => {
            console.error('Error starting SignalR connection:', err);
        });
    }

    stopConnection() {
        this.hubConnection.stop().then(() => {
            console.log('SignalR connection stopped.');
        }).catch(err => {
            console.error('Error stopping SignalR connection:', err);
        });
    }

    registerHandlerReceiveWorkflowUpdate(handler: any) {
        this.hubConnection.on('ReceiveWorkflowUpdate', handler);
    }

    removeHandlerReceiveWorkflowUpdate() {
        this.hubConnection.off('ReceiveWorkflowUpdate');
    }
}