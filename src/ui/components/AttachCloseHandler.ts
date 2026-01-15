export function attachCloseHandler(root: HTMLElement): void {
  const closeBtn = root.querySelector(".vw-close-btn") as HTMLElement;
  const box = root.querySelector(".vw-box") as HTMLElement;
  const chatBtn = root.querySelector(".vw-chat-btn") as HTMLElement;

  if (!closeBtn || !box || !chatBtn) return;

  closeBtn.onclick = () => {
    box.style.display = "none";
    box.classList.remove("show");

    chatBtn.style.display = "flex";
  };
}
