/**
 * UI event handlers - user interactions
 */

// export function attachToggleHandler(root: HTMLElement): void {
//   const chatBtn = root.querySelector(".vw-chat-btn") as HTMLElement;
//   const box = root.querySelector(".vw-box") as HTMLElement;
//   const messageInput = root.querySelector(
//     ".vw-message-input"
//   ) as HTMLInputElement;

//   chatBtn.onclick = () => {
//     const isVisible =
//       box.style.display === "block" || box.classList.contains("show");
//     if (isVisible) {
//       box.style.display = "none";
//       box.classList.remove("show");
//     } else {
//       box.style.display = "flex";
//       box.classList.add("show");
//       if (messageInput) {
//         messageInput.focus();
//       }
//     }
//   };
// }
export function attachToggleHandler(root: HTMLElement): void {
  const chatBtn = root.querySelector(".vw-chat-btn") as HTMLElement;
  const box = root.querySelector(".vw-box") as HTMLElement;
  const messageInput = root.querySelector(
    ".vw-message-input"
  ) as HTMLInputElement;

  if (!chatBtn || !box) return;

  chatBtn.onclick = () => {
    box.style.display = "flex";
    box.classList.add("show");

    chatBtn.style.opacity = "0";
    chatBtn.style.pointerEvents = "none";

    if (messageInput) {
      messageInput.focus();
    }
  };
}

export function attachCloseHandler(root: HTMLElement): void {
  const closeBtn = root.querySelector(".vw-close-btn") as HTMLElement;
  const box = root.querySelector(".vw-box") as HTMLElement;
  const chatBtn = root.querySelector(".vw-chat-btn") as HTMLElement;

  if (!closeBtn || !box || !chatBtn) return;

  closeBtn.onclick = () => {
    box.style.display = "none";
    box.classList.remove("show");

    chatBtn.style.opacity = "1";
    chatBtn.style.pointerEvents = "auto";
  };
}

export function attachStartChatHandler(
  root: HTMLElement,
  onStartChat: () => Promise<void>
): void {
  const startBtn = root.querySelector(".vw-start-btn") as HTMLButtonElement;
  if (!startBtn) return;

  startBtn.onclick = async () => {
    const buttonText = startBtn.querySelector(".vw-btn-text") as HTMLElement;
    const buttonLoading = startBtn.querySelector(
      ".vw-btn-loading"
    ) as HTMLElement;

    startBtn.disabled = true;
    if (buttonText) buttonText.style.display = "none";
    if (buttonLoading) buttonLoading.style.display = "inline";

    try {
      await onStartChat();
    } catch (error) {
      startBtn.disabled = false;
      if (buttonText) buttonText.style.display = "inline";
      if (buttonLoading) buttonLoading.style.display = "none";
    }
  };
}

export function attachSendMessageHandler(
  root: HTMLElement,
  onSendMessage: (content: string) => void
): void {
  const sendBtn = root.querySelector(".vw-send-btn") as HTMLButtonElement;
  const messageInput = root.querySelector(
    ".vw-message-input"
  ) as HTMLInputElement;

  if (!sendBtn || !messageInput) return;

  sendBtn.onclick = () => {
    const content = messageInput.value.trim();
    if (content) {
      onSendMessage(content);
    }
  };

  messageInput.onkeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!sendBtn.disabled) {
        const content = messageInput.value.trim();
        if (content) {
          onSendMessage(content);
        }
      }
    }
  };
}

export function attachInputChangeHandler(
  root: HTMLElement,
  onInputChange: () => void
): void {
  const messageInput = root.querySelector(
    ".vw-message-input"
  ) as HTMLInputElement;

  if (messageInput) {
    messageInput.oninput = onInputChange;
  }
}
