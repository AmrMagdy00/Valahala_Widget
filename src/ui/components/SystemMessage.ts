/**
 * System message component
 */
export function renderSystemMessage(content: string): string {
  return `
    <div class="vw-message vw-message-system">
      <div class="vw-message-content">${content}</div>
    </div>
  `;
}

export function appendSystemMessage(
  container: HTMLElement,
  content: string
): void {
  const element = document.createElement("div");
  element.innerHTML = renderSystemMessage(content);
  const node = element.firstElementChild as HTMLElement;
  if (node) {
    container.appendChild(node);
  }
}
