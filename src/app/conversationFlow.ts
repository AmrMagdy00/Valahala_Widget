/**
 * Conversation flow - handles conversation loading and message rendering
 */
import {
  postStartConversation,
  getConversationHistory,
  getConversationHistoryByBusinessCustomerId,
} from "../infrastructure/http/widgetApi";
import { mapMessageFromDto } from "../domain/message/message.mapper";
import {
  setConversationId,
  setIsNewConversation,
  setConversationStatus,
  getConversationStatus,
  setMessages,
  getMessages,
  getBusinessCustomerId,
  getUserName,
} from "../state/stateStore";
import {
  showChatInterface,
  getMessagesContainer,
  updateUserName,
} from "../ui/components/ChatWindow";
import { renderAllMessages } from "../ui/components/MessageList";

/**
 * Starts a new conversation or resumes existing one
 */
export async function startConversationUseCase(): Promise<{
  conversationId: string;
  isNew: boolean;
}> {
  const response = await postStartConversation();

  setConversationId(response.conversationId);
  setIsNewConversation(response.isNew);
  setConversationStatus("OPEN");

  return {
    conversationId: response.conversationId,
    isNew: response.isNew,
  };
}

/**
 * Loads conversation history
 * Uses businessCustomerId if available, otherwise uses conversationId
 */
export async function loadConversation(conversationId: string): Promise<void> {
  try {
    const businessCustomerId = getBusinessCustomerId();
    let messages;

    if (businessCustomerId) {
      // Load history by businessCustomerId
      messages = await getConversationHistoryByBusinessCustomerId(
        businessCustomerId
      );
    } else {
      // Fallback to conversationId
      messages = await getConversationHistory(conversationId);
    }

    const domainMessages = messages.map(mapMessageFromDto);
    setMessages(domainMessages);
  } catch (error) {
    console.error("[ValahaWidget] Failed to load conversation history:", error);
  }
}

/**
 * Renders messages in the UI
 */
export function renderMessages(root: HTMLElement): void {
  const container = getMessagesContainer(root);
  if (!container) return;

  const messages = getMessages();
  if (messages.length > 0) {
    renderAllMessages(container, messages);
  }
}

/**
 * Shows chat interface with conversation status
 */
export function showConversationUI(root: HTMLElement): void {
  const status = getConversationStatus();
  showChatInterface(root, status);

  // Update user name display if available
  const userName = getUserName();
  if (userName) {
    updateUserName(root, userName);
  }
}
