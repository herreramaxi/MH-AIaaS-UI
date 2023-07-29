import { EventEmitter, Injectable, OnDestroy, Output } from "@angular/core";
import { SignalRService } from "./signalr-service";
import { WebSocketMessageType } from "../models/enums/enums";

@Injectable({
    providedIn: 'root'
})
export class WebSocketRouterService implements OnDestroy {

    @Output()
    workflowRunHistoryEvent = new EventEmitter<any>();

    @Output()
    workflowNodeRunHistoryEvent = new EventEmitter<any>();

    constructor(private signalRService: SignalRService) { }
    ngOnDestroy(): void {
        this.signalRService.removeHandlerReceiveWorkflowUpdate();
    }

    startConnection() {
        this.signalRService.startConnection();
        this.signalRService.registerHandlerReceiveWorkflowUpdate((message: any) => {
            if (!message) return;

            switch (message.messageType) {
                case WebSocketMessageType.WorkflowRunHistory: this.workflowRunHistoryEvent.emit(message.payload); break;
                case WebSocketMessageType.WorkflowNodeRunHistory: this.workflowNodeRunHistoryEvent.emit(message.payload); break;
                default: {
                    console.log(`Not implemented message handler for message type ${message.messageType}`);
                }
            }
        });
    }
}