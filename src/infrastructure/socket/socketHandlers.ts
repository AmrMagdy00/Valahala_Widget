/**
 * Socket event handlers - business logic for socket events
 */
import { Socket } from "socket.io-client";
import {
  ConversationAssignedPayload,
  ConversationClosedPayload,
  ErrorPayload,
  MessageNewPayload,
  SocketEventCallbacks,
} from "./socketEvents";
import { mapMessageFromDto } from "../../domain/message/message.mapper";
import {
  setSocketConnected,
  setConversationClosed,
  setAgentAssigned,
  addMessage,
} from "../../state/stateStore";

/**
 * Registers all socket event handlers
 */
export function registerSocketHandlers(
  socket: Socket,
  callbacks: SocketEventCallbacks
): void {
  socket.on("connect", () => {
    console.log("✅ Socket connected", socket.id);
    setSocketConnected(true);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
    setSocketConnected(false);
  });

  socket.on("conversation.assigned", (payload: ConversationAssignedPayload) => {
    handleConversationAssigned(payload, callbacks);
  });

  socket.on("message.new", (payload: MessageNewPayload) => {
    handleMessageNew(payload, callbacks);
  });

  socket.on("conversation.closed", (payload: ConversationClosedPayload) => {
    handleConversationClosed(payload, callbacks);
  });

  socket.on("error", (payload: ErrorPayload) => {
    handleError(payload, callbacks);
  });
}

function handleConversationAssigned(
  payload: ConversationAssignedPayload,
  callbacks: SocketEventCallbacks
): void {
  console.log("👤 Conversation assigned", payload);
  setAgentAssigned(payload.agentAssigned);

  const systemMessage =
    payload.agentAssigned === true
      ? "An agent has joined the chat"
      : "No agent is available right now. Please leave your message.";

  if (callbacks.onSystemMessage) {
    callbacks.onSystemMessage(systemMessage);
  }
}

function handleMessageNew(
  payload: MessageNewPayload,
  callbacks: SocketEventCallbacks
): void {
  console.log("📩 New message", payload);
  const message = mapMessageFromDto(payload);
  addMessage(message);

  if (callbacks.onMessage) {
    callbacks.onMessage(message);
  }
}

function handleConversationClosed(
  payload: ConversationClosedPayload,
  callbacks: SocketEventCallbacks
): void {
  console.log("🔒 Conversation closed", payload);
  setConversationClosed(true);

  if (callbacks.onSystemMessage) {
    callbacks.onSystemMessage("Conversation closed");
  }

  if (callbacks.onConversationClosed) {
    callbacks.onConversationClosed();
  }
}

function handleError(
  payload: ErrorPayload,
  callbacks: SocketEventCallbacks
): void {
  console.error("❌ Socket error", payload);
  const errorMessage = payload.message || "An error occurred";
  if (callbacks.onSystemMessage) {
    callbacks.onSystemMessage(errorMessage);
  }
}
