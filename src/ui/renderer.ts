/**
 * UI renderer - DOM manipulation utilities
 */
import { Message } from "../domain/message/message.model";

export function formatTimestamp(createdAt: Date | string): string {
  const date = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function scrollToBottom(container: HTMLElement): void {
  container.scrollTop = container.scrollHeight;
}

export function getWidgetRoot(): HTMLElement | null {
  return document.getElementById("valaha-widget");
}
