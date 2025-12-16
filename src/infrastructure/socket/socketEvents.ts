/**
 * Socket event type definitions
 */
import { MessageResponseDto } from "../http/widgetApi";
import {
  ConversationAssignedEvent,
  ConversationClosedEvent,
} from "../../domain/conversation/conversation.model";

export type ConversationAssignedPayload = ConversationAssignedEvent;

export type ConversationClosedPayload = ConversationClosedEvent;

export type ErrorPayload = {
  message: string;
};

export type MessageNewPayload = MessageResponseDto;

export type ConversationJoinPayload = {
  conversationId: string;
};

export type MessageSendPayload = {
  conversationId: string;
  content: string;
};

export type SocketEventCallbacks = {
  onMessage?: (
    message: import("../../domain/message/message.model").Message
  ) => void;
  onSystemMessage?: (message: string) => void;
  onConversationClosed?: () => void;
};
