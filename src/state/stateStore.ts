/**
 * State store - centralized state management
 */
import { WidgetState, createInitialWidgetState } from "./widgetState";
import { Message } from "../domain/message/message.model";

const STORAGE_KEY = "valaha_external_id";
const TOKEN_STORAGE_KEY = "valaha_jwt_token";

let state: WidgetState = createInitialWidgetState();

/**
 * Get current state (read-only)
 */
export function getState(): Readonly<WidgetState> {
  return { ...state };
}

/**
 * Update state (immutable update)
 */
export function updateState(updates: Partial<WidgetState>): void {
  state = { ...state, ...updates };
}

// Configuration
export function setPublicKey(publicKey: string): void {
  state.publicKey = publicKey;
}

export function getPublicKey(): string | null {
  return state.publicKey;
}

export function setBaseURL(baseURL: string): void {
  state.baseURL = baseURL;
}

export function getBaseURL(): string {
  if (state.baseURL) return state.baseURL;

  if (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) {
    return import.meta.env.BASE_URL;
  }

  return "http://localhost:5000";
}

// User
export function getExternalId(): string | null {
  if (state.externalId) return state.externalId;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    state.externalId = stored;
    return stored;
  }
  return null;
}

export function setExternalId(id: string): void {
  state.externalId = id;
  localStorage.setItem(STORAGE_KEY, id);
}

export function generateExternalId(): string {
  return crypto.randomUUID();
}

export function getOrCreateExternalId(): string {
  let externalId = getExternalId();
  if (!externalId) {
    externalId = generateExternalId();
    setExternalId(externalId);
  }
  return externalId;
}

export function getJwtToken(): string | null {
  if (state.jwtToken) return state.jwtToken;
  const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (stored) {
    state.jwtToken = stored;
    return stored;
  }
  return null;
}

export function setJwtToken(token: string): void {
  state.jwtToken = token;
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearJwtToken(): void {
  state.jwtToken = null;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function setCustomerId(customerId: string): void {
  state.customerId = customerId;
}

export function getCustomerId(): string | null {
  return state.customerId;
}

export function setBusinessCustomerId(businessCustomerId: string | null): void {
  state.businessCustomerId = businessCustomerId;
}

export function getBusinessCustomerId(): string | null {
  return state.businessCustomerId;
}

export function setUserName(userName: string | null): void {
  state.userName = userName;
}

export function getUserName(): string | null {
  return state.userName;
}

// Conversation
export function setConversationId(id: string | null): void {
  state.conversation.conversationId = id;
}

export function getConversationId(): string | null {
  return state.conversation.conversationId;
}

export function setIsNewConversation(isNew: boolean): void {
  state.conversation.isNew = isNew;
}

export function getIsNewConversation(): boolean | null {
  return state.conversation.isNew;
}

export function setConversationStatus(status: string | null): void {
  state.conversation.status = status as any;
}

export function getConversationStatus(): string | null {
  return state.conversation.status;
}

export function setConversationClosed(closed: boolean): void {
  state.conversation.closed = closed;
}

export function getConversationClosed(): boolean {
  return state.conversation.closed;
}

// Agent
export function setAgentAssigned(assigned: boolean | null): void {
  state.agent.assigned = assigned;
}

export function getAgentAssigned(): boolean | null {
  return state.agent.assigned;
}

// Socket
export function setSocketConnected(connected: boolean): void {
  state.socketConnected = connected;
}

export function getSocketConnected(): boolean {
  return state.socketConnected;
}

// Messages
export function getMessages(): Message[] {
  return Array.isArray(state.messages) ? state.messages : [];
}

export function setMessages(messages: Message[]): void {
  state.messages = messages;
}

export function addMessage(message: Message): void {
  if (!Array.isArray(state.messages)) {
    state.messages = [];
  }
  state.messages.push(message);
}
