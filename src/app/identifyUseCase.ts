/**
 * Identify use case - links user data to customer
 */
import { postIdentifyCustomer } from "../infrastructure/http/widgetApi";
import {
  getExternalId,
  setBusinessCustomerId,
  setUserName,
  setCustomerId,
  setJwtToken,
} from "../state/stateStore";

export type IdentifyPayload = {
  businessCustomerId?: string;
  name?: string;
  email?: string;
  phone?: string;
};

/**
 * Identifies customer with user data
 */
export async function identifyCustomer(
  payload: IdentifyPayload
): Promise<void> {
  const externalId = getExternalId();
  if (!externalId) {
    throw new Error("[ValahaWidget] External ID not found");
  }

  const response = await postIdentifyCustomer({
    externalId,
    businessCustomerId: payload.businessCustomerId,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
  });

  // Store businessCustomerId and userName in state after successful identification
  if (payload.businessCustomerId) {
    setBusinessCustomerId(payload.businessCustomerId);
  }
  if (payload.name) {
    setUserName(payload.name);
  }

  // Update customerId and token if provided (when customerId changes after identify)
  if (response.data) {
    if (response.data.customerId) {
      setCustomerId(response.data.customerId);
    }
    if (response.data.token) {
      setJwtToken(response.data.token);
    }
  }
}
