/**
 * Message mapper - converts between DTOs and domain models
 */
import { Message } from "./message.model";

export type MessageResponseDto = {
  id: string;
  sender: "customer" | "agent";
  content: string;
  type: string;
  createdAt: string | Date;
  isRead: boolean;
};

/**
 * Maps MessageResponseDto to domain Message
 */
export function mapMessageFromDto(dto: MessageResponseDto): Message {
  return {
    id: dto.id,
    sender: dto.sender,
    content: dto.content,
    type: dto.type,
    createdAt:
      typeof dto.createdAt === "string"
        ? new Date(dto.createdAt)
        : dto.createdAt,
    isRead: dto.isRead,
  };
}
