/**
 * Conversation domain model
 */
export type Conversation = {
  id: string;
  isNew: boolean;
  status: ConversationStatus;
};

export type ConversationStatus = "OPEN" | "CLOSED";

export type ConversationAssignedEvent = {
  conversationId: string;
  agentAssigned: boolean;
  message?: string;
};

export type ConversationClosedEvent = {
  conversationId: string;
  closedBy: "agent" | "system";
};
