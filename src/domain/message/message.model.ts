/**
 * Message domain model
 * Pure business entity - no browser APIs, no dependencies
 */
export type Message = {
  id: string;
  sender: "customer" | "agent";
  content: string;
  type: string;
  createdAt: Date;
  isRead: boolean;
};
