/**
 * Widget controller - coordinates UI and socket
 */
import { createWidgetHTML } from "../ui/components/ChatWindow";
import { appendMessage } from "../ui/components/MessageList";
import { appendSystemMessage } from "../ui/components/SystemMessage";
import {
  getMessageInput,
  updateSendButtonState,
  disableInput,
} from "../ui/components/MessageInput";
import {
  attachToggleHandler,
  attachStartChatHandler,
  attachSendMessageHandler,
  attachInputChangeHandler,
} from "../ui/uiEvents";
import {
  startConversationUseCase,
  loadConversation,
  renderMessages,
  showConversationUI,
} from "./conversationFlow";
import { updateUserName } from "../ui/components/ChatWindow";
import { getUserName } from "../state/stateStore";
import { SocketConversationHandler } from "./socketConversationHandler";
import { Message } from "../domain/message/message.model";

export class WidgetController {
  private root: HTMLElement | null = null;
  private socketHandler: SocketConversationHandler | null = null;

  /* =========================
     INIT
     ========================= */
  mountWidget(): void {
    if (document.getElementById("valaha-widget")) return;

    this.root = document.createElement("div");
    this.root.id = "valaha-widget";
    this.root.innerHTML = createWidgetHTML();

    document.body.appendChild(this.root);
    this.attachUIEvents();
  }

  /* =========================
     CONVERSATION
     ========================= */
  async startConversation(): Promise<void> {
    if (!this.root) return;

    const conversation = await startConversationUseCase();
    showConversationUI(this.root);

    if (!conversation.isNew) {
      await loadConversation(conversation.conversationId);
    }

    renderMessages(this.root);
    this.connectSocket(conversation.conversationId);
  }

  sendMessage(content: string): void {
    if (!this.root || !this.socketHandler) return;

    const input = getMessageInput(this.root);
    if (input) input.value = "";

    this.socketHandler.sendMessage(content);
    updateSendButtonState(this.root);
  }

  /* =========================
     SOCKET
     ========================= */
  private connectSocket(conversationId: string): void {
    this.socketHandler = new SocketConversationHandler({
      onMessage: (message) => this.onNewMessage(message),
      onSystemMessage: (message) => this.onSystemMessage(message),
      onConversationClosed: () => this.onConversationClosed(),
      onSocketStateChange: () => this.refreshSendButton(),
    });

    this.socketHandler.connect(conversationId);
  }

  /* =========================
     UI HANDLERS
     ========================= */
  private onNewMessage(message: Message): void {
    const container = this.getMessagesContainer();
    if (container) appendMessage(container, message);
  }

  private onSystemMessage(message: string): void {
    const container = this.getMessagesContainer();
    if (container) appendSystemMessage(container, message);
  }

  private onConversationClosed(): void {
    if (!this.root) return;
    disableInput(this.root);
  }

  private refreshSendButton(): void {
    if (!this.root) return;
    updateSendButtonState(this.root);
  }

  /**
   * Updates user name display in header
   */
  updateUserNameDisplay(): void {
    if (!this.root) return;
    const userName = getUserName();
    updateUserName(this.root, userName);
  }

  /* =========================
     HELPERS
     ========================= */
  private getMessagesContainer(): HTMLElement | null {
    return this.root?.querySelector(".vw-messages") as HTMLElement;
  }

  private attachUIEvents(): void {
    if (!this.root) return;

    attachToggleHandler(this.root);
    attachStartChatHandler(this.root, () => this.startConversation());
    attachSendMessageHandler(this.root, (content) => this.sendMessage(content));
    attachInputChangeHandler(this.root, () => this.refreshSendButton());
  }
}
