/**
 * Message list component
 */
import { Message } from "../../domain/message/message.model";
import { formatTimestamp, scrollToBottom } from "../renderer";

function getSenderName(sender: "customer" | "agent"): string {
  return sender === "customer" ? "You" : "Support Agent";
}

export function renderMessage(message: Message): string {
  const isCustomer = message.sender === "customer";
  const senderName = getSenderName(message.sender);
  const timestamp = formatTimestamp(message.createdAt);

  return `
    <div class="vw-message ${
      isCustomer ? "vw-message-customer" : "vw-message-agent"
    }">
      <div class="vw-message-header">
        <span class="vw-message-sender">${senderName}</span>
        <span class="vw-message-time">${timestamp}</span>
      </div>
      <div class="vw-message-content">${message.content}</div>
    </div>
  `;
}

export function appendMessage(container: HTMLElement, message: Message): void {
  const element = document.createElement("div");
  element.innerHTML = renderMessage(message);
  const node = element.firstElementChild as HTMLElement;
  if (node) {
    container.appendChild(node);
    scrollToBottom(container);
  }
}

export function renderAllMessages(
  container: HTMLElement,
  messages: Message[]
): void {
  container.innerHTML = messages.map(renderMessage).join("");
  scrollToBottom(container);
}
