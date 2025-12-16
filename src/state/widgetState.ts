/**
 * Widget state - single source of truth
 */
import { Message } from "../domain/message/message.model";
import { ConversationState } from "../domain/conversation/conversation.state";
import { AgentState } from "../domain/agent/agent.state";

export type WidgetState = {
  // Configuration
  publicKey: string | null;
  baseURL: string | null;

  // User
  externalId: string | null;
  customerId: string | null;
  businessCustomerId: string | null;
  userName: string | null;
  jwtToken: string | null;

  // Conversation
  conversation: ConversationState;

  // Agent
  agent: AgentState;

  // Socket
  socketConnected: boolean;

  // Messages
  messages: Message[];
};

export function createInitialWidgetState(): WidgetState {
  return {
    publicKey: null,
    baseURL: null,
    externalId: null,
    customerId: null,
    businessCustomerId: null,
    userName: null,
    jwtToken: null,
    conversation: {
      conversationId: null,
      isNew: null,
      status: null,
      closed: false,
    },
    agent: {
      assigned: null,
    },
    socketConnected: false,
    messages: [],
  };
}
