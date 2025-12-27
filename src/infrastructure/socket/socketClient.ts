/**
 * Socket client - manages Socket.IO connection
 */
import { io, Socket } from "socket.io-client";
import {
  getBaseURL,
  getJwtToken,
  setSocketConnected,
} from "../../state/stateStore";
import { registerSocketHandlers } from "./socketHandlers";
import { SocketEventCallbacks, MessageSendPayload } from "./socketEvents";

let socket: Socket | null = null;

/**
 * Gets the current socket instance
 */
export function getSocket(): Socket | null {
  return socket;
}

/**
 * Connects to the WebSocket server
 */
export function connectSocket(callbacks: SocketEventCallbacks): Socket {
  if (socket && socket.connected) {
    return socket;
  }

  const baseURL = getBaseURL();
  const token = getJwtToken();

  if (!token) {
    throw new Error("JWT token not found");
  }

  socket = io(`${baseURL}/widget`, {
    query: { token },
    transports: ["websocket"],
  });

  registerSocketHandlers(socket, callbacks);

  return socket;
}

/**
 * Disconnects the socket
 */
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
    setSocketConnected(false);
  }
}

/**
 * Emits message.send event
 */
export function sendMessageViaSocket(payload: MessageSendPayload): void {
  if (!socket || !socket.connected) {
    return;
  }

  socket.emit("message.send", payload);
}

/**
 * Emits conversation.join event
 */
export function joinConversation(conversationId: string): void {
  if (!socket || !socket.connected) {
    return;
  }

  socket.emit("conversation.join", { conversationId });
}
