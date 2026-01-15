/**
 * Widget application - lifecycle management
 */
import { WidgetConfig } from "../config/widgetConfig";
import {
  setPublicKey,
  getOrCreateExternalId,
  setCustomerId,
  setJwtToken,
  getBusinessCustomerId,
  getUserName,
} from "../state/stateStore";
import { postWidgetInit } from "../infrastructure/http/widgetApi";
import { WidgetController } from "./widgetController";
import { identifyCustomer, IdentifyPayload } from "./identifyUseCase";
import { getUserName } from "../state/stateStore";

let controller: WidgetController | null = null;

/**
 * Initializes the widget
 */
export async function initWidget(config: WidgetConfig): Promise<void> {
  setPublicKey(config.publicKey);

  const externalId = getOrCreateExternalId();
  try {
    const authResult = await postWidgetInit({ externalId });
    setCustomerId(authResult.customerId);
    setJwtToken(authResult.token);
  } catch (error) {
    throw error;
  }

  controller = new WidgetController();
  controller.mountWidget();

  // Restore businessCustomerId and userName from localStorage if available
  const storedBusinessCustomerId = getBusinessCustomerId();
  const storedUserName = getUserName();
  if (storedBusinessCustomerId || storedUserName) {
    // Update UI if we have stored data
    if (controller && storedUserName) {
      controller.updateUserNameDisplay();
    }
  }

  // Listen for identify events from frontend
  setupIdentifyListener();
}

/**
 * Sets up listener for identify events
 */
function setupIdentifyListener(): void {
  window.addEventListener("valaha:identify", async (event: Event) => {
    const customEvent = event as CustomEvent<IdentifyPayload>;
    const payload = customEvent.detail;

    if (!payload) {
      return;
    }

    try {
      await identifyCustomer(payload);

      // Update user name display in widget if available
      if (controller && payload.name) {
        controller.updateUserNameDisplay();
      }
    } catch (error) {
      // Error handling without logging
    }
  });
}
