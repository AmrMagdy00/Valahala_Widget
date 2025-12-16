/**
 * Conversation state management
 * Pure state operations - no side effects
 */
import { ConversationStatus } from "./conversation.model";

export type ConversationState = {
  conversationId: string | null;
  isNew: boolean | null;
  status: ConversationStatus | null;
  closed: boolean;
};

export function createInitialConversationState(): ConversationState {
  return {
    conversationId: null,
    isNew: null,
    status: null,
    closed: false,
  };
}
