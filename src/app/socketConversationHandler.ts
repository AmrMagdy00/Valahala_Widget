import {
  connectSocket,
  joinConversation,
  sendMessageViaSocket,
} from "../infrastructure/socket/socketClient";
import {
  getJwtToken,
  getSocketConnected,
  getConversationClosed,
  getConversationId,
} from "../state/stateStore";
import { Socket } from "socket.io-client";
import { Message } from "../domain/message/message.model";

export type SocketConversationCallbacks = {
  onMessage: (message: Message) => void;
  onSystemMessage: (message: string) => void;
  onConversationClosed: () => void;
  onSocketStateChange?: () => void;
};

export class SocketConversationHandler {
  private socket: Socket | null = null;

  constructor(private callbacks: SocketConversationCallbacks) {}

  connect(conversationId: string): void {
    if (!getJwtToken()) {
      console.error("JWT token not found");
      return;
    }

    this.socket = connectSocket({
      onMessage: this.callbacks.onMessage,
      onSystemMessage: this.callbacks.onSystemMessage,
      onConversationClosed: this.callbacks.onConversationClosed,
    });

    this.socket.on("connect", () => {
      joinConversation(conversationId);
      this.callbacks.onSocketStateChange?.();
    });

    this.socket.on("disconnect", () => {
      this.callbacks.onSocketStateChange?.();
    });
  }

  sendMessage(content: string): void {
    if (!getSocketConnected()) {
      this.callbacks.onSystemMessage(
        "Unable to send message. Please try again."
      );
      return;
    }

    if (getConversationClosed()) return;

    const conversationId = getConversationId();
    if (!conversationId) {
      console.error("No conversation ID found");
      return;
    }

    sendMessageViaSocket({ conversationId, content });
  }
}
