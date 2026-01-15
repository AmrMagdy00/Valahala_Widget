/**
 * Widget API - HTTP endpoints for widget operations
 */
import { httpRequest } from "./httpClient";
import {
  getPublicKey,
  getBaseURL,
  getCustomerId,
  getBusinessCustomerId,
} from "../../state/stateStore";

type InitWidgetPayload = {
  externalId: string;
  name?: string;
  email?: string;
  phone?: string;
};

type InitWidgetResponse = {
  success: boolean;
  data: {
    customerId: string;
    activeConversationId: string | null;
    token: string;
  };
};

type StartConversationResponse = {
  success: boolean;
  message: string;
  data: {
    conversationId: string;
    isNew: boolean;
  };
};

type MessageResponseDto = {
  id: string;
  sender: "customer" | "agent";
  content: string;
  type: string;
  createdAt: Date;
  isRead: boolean;
};

type ConversationHistoryResponse = {
  success: boolean;
  message: string;
  data: MessageResponseDto[];
};

export async function postWidgetInit(
  payload: InitWidgetPayload
): Promise<InitWidgetResponse["data"]> {
  const publicKey = getPublicKey();
  if (!publicKey) {
    throw new Error("API not initialized");
  }

  const baseURL = getBaseURL();
  const url = `${baseURL}/widget/auth/init`;

  const body = {
    publicKey,
    externalId: payload.externalId,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
  };

  const response = await httpRequest<InitWidgetResponse>(url, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return response.data;
}

export async function postStartConversation(): Promise<
  StartConversationResponse["data"]
> {
  const businessCustomerId = getBusinessCustomerId();
  const customerId = getCustomerId();
  const publicKey = getPublicKey();
  const baseURL = getBaseURL();

  if (!publicKey) throw new Error("API not initialized");

  // Use businessCustomerId if available, otherwise fallback to customerId
  const url = businessCustomerId
    ? `${baseURL}/widget/conversations/start?businessCustomerId=${businessCustomerId}`
    : `${baseURL}/widget/conversations/start`;

  if (!businessCustomerId && !customerId) {
    throw new Error("Customer ID or Business Customer ID not found");
  }

  const response = await httpRequest<StartConversationResponse>(url, {
    method: "POST",
  });

  return response.data;
}

export async function getConversationHistory(
  conversationId: string
): Promise<MessageResponseDto[]> {
  const baseURL = getBaseURL();
  const url = `${baseURL}/widget/messages/${conversationId}`;
  const response = await httpRequest<ConversationHistoryResponse>(url, {
    method: "GET",
  });

  return response.data;
}

/**
 * Gets conversation history by businessCustomerId
 */
export async function getConversationHistoryByBusinessCustomerId(
  businessCustomerId: string
): Promise<MessageResponseDto[]> {
  const baseURL = getBaseURL();
  const url = `${baseURL}/widget/messages?businessCustomerId=${businessCustomerId}`;
  const response = await httpRequest<ConversationHistoryResponse>(url, {
    method: "GET",
  });

  return response.data;
}

type IdentifyCustomerPayload = {
  externalId: string;
  businessCustomerId?: string;
  name?: string;
  email?: string;
  phone?: string;
};

type IdentifyCustomerResponse = {
  success: boolean;
  message: string;
  data?: {
    customerId: string;
    token?: string;
  };
};

/**
 * Identifies customer with user data
 */
export async function postIdentifyCustomer(
  payload: IdentifyCustomerPayload
): Promise<IdentifyCustomerResponse> {
  const baseURL = getBaseURL();
  const url = `${baseURL}/widget/auth/identify`;

  const response = await httpRequest<IdentifyCustomerResponse>(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response;
}

export type { MessageResponseDto };
