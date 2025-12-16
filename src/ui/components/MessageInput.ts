/**
 * Message input component
 */
import {
  getSocketConnected,
  getConversationClosed,
} from "../../state/stateStore";

export function getMessageInput(root: HTMLElement): HTMLInputElement | null {
  return root.querySelector(".vw-message-input") as HTMLInputElement;
}

export function getSendButton(root: HTMLElement): HTMLButtonElement | null {
  return root.querySelector(".vw-send-btn") as HTMLButtonElement;
}

export function updateSendButtonState(root: HTMLElement): void {
  const messageInput = getMessageInput(root);
  const sendBtn = getSendButton(root);

  if (!messageInput || !sendBtn) return;

  const isClosed = getConversationClosed();
  const isConnected = getSocketConnected();
  const hasContent = messageInput.value.trim().length > 0;

  if (isClosed) {
    messageInput.disabled = true;
    sendBtn.disabled = true;
    return;
  }

  messageInput.disabled = false;
  sendBtn.disabled = !hasContent || !isConnected;
}

export function disableInput(root: HTMLElement): void {
  const messageInput = getMessageInput(root);
  const sendBtn = getSendButton(root);

  if (messageInput) messageInput.disabled = true;
  if (sendBtn) sendBtn.disabled = true;
}
