/**
 * Chat window component - main widget structure
 */
export function createWidgetHTML(): string {
  return `
    <div class="vw-chat-btn">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 0 1-4-.84L3 20l1.4-3.6A7.6 7.6 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
          fill="white"/>
      </svg>
    </div>

    <div class="vw-box">
      <div class="vw-header">
        <div class="vw-header-top">
          <div class="vw-title">Valaha Support</div>
          <div class="vw-status" style="display: none;">OPEN</div>
        </div>
        <div class="vw-subtitle">
          <span class="vw-user-name" style="display: none;"></span>
          <span class="vw-subtitle-text">We reply in minutes</span>
        </div>
      </div>

      <div class="vw-body vw-welcome-screen">
        <p class="vw-welcome">👋 Welcome</p>
        <p class="vw-desc">
          Click Start Chat to begin a conversation with support
        </p>

        <button class="vw-start-btn">
          <span class="vw-btn-text">Start Chat</span>
          <span class="vw-btn-loading" style="display: none;">Loading...</span>
        </button>
      </div>

      <div class="vw-chat-screen" style="display: none;">
        <div class="vw-messages"></div>
        <div class="vw-input-container">
          <input
            type="text"
            class="vw-message-input"
            placeholder="Type your message..."
            maxlength="1000"
          />
          <button class="vw-send-btn" disabled>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

export function showChatInterface(
  root: HTMLElement,
  status: string | null
): void {
  const welcomeScreen = root.querySelector(".vw-welcome-screen") as HTMLElement;
  const chatScreen = root.querySelector(".vw-chat-screen") as HTMLElement;
  const statusElement = root.querySelector(".vw-status") as HTMLElement;
  const messageInput = root.querySelector(
    ".vw-message-input"
  ) as HTMLInputElement;

  welcomeScreen.style.display = "none";
  chatScreen.style.display = "flex";

  if (status) {
    statusElement.textContent = status;
    statusElement.style.display = "block";
  }

  if (messageInput) {
    messageInput.focus();
  }
}

export function getMessagesContainer(root: HTMLElement): HTMLElement | null {
  return root.querySelector(".vw-messages") as HTMLElement;
}

/**
 * Updates user name display in header
 */
export function updateUserName(
  root: HTMLElement,
  userName: string | null
): void {
  const userNameElement = root.querySelector(".vw-user-name") as HTMLElement;
  const subtitleText = root.querySelector(".vw-subtitle-text") as HTMLElement;

  if (userNameElement && subtitleText) {
    if (userName) {
      userNameElement.textContent = userName;
      userNameElement.style.display = "inline";
      subtitleText.style.display = "none";
    } else {
      userNameElement.style.display = "none";
      subtitleText.style.display = "inline";
    }
  }
}
