/**
 * Widget entry point - auto-initializes from script tag attributes
 */
import { initWidget } from "./app/widgetApp";
import "./styles/widget.css";
export {};

type WidgetConfig = {
  publicKey: string;
};

/**
 * Gets the current script element that loaded the widget
 */
function getCurrentScript(): HTMLScriptElement | null {
  return (
    (document.currentScript as HTMLScriptElement | null) ||
    document.querySelector('script[src*="valaha-widget"]')
  );
}

/**
 * Reads configuration from script tag data attributes
 */
function resolveConfig(): WidgetConfig | null {
  const script = getCurrentScript();
  const publicKey = script?.getAttribute("data-public-key");

  if (!publicKey) {
    return null;
  }

  return { publicKey };
}

/**
 * Creates bootstrap function with initialization guard
 */
function createBootstrap() {
  let initialized = false;

  return function bootstrap() {
    if (initialized) {
      return;
    }

    const config = resolveConfig();
    if (!config) return;

    try {
      initWidget(config);
      initialized = true;
    } catch (error) {
      // Error handling without logging
    }
  };
}

// Auto-initialize on script load
const bootstrap = createBootstrap();
bootstrap();
