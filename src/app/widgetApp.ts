/**
 * Widget application - lifecycle management
 */
import { WidgetConfig } from "../config/widgetConfig";
import {
  setPublicKey,
  getOrCreateExternalId,
  setCustomerId,
  setJwtToken,
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
    console.log("Auth result:", authResult);
    setCustomerId(authResult.customerId);
    setJwtToken(authResult.token);
  } catch (error) {
    console.error("[ValahaWidget] Widget init failed", error);
    throw error;
  }

  controller = new WidgetController();
  controller.mountWidget();

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
      console.warn("[ValahaWidget] Invalid identify payload");
      return;
    }

    try {
      await identifyCustomer(payload);
      console.log("[ValahaWidget] Customer identified successfully");

      // Update user name display in widget if available
      if (controller && payload.name) {
        controller.updateUserNameDisplay();
      }
    } catch (error) {
      console.error("[ValahaWidget] Failed to identify customer:", error);
    }
  });
}
