import { INotificationHandler } from "./INotificationHandler";

export class DefaultNotification implements INotificationHandler {
  constructor(private data: any) {}

  getImage(): string {
    return "/commentempty.png";
  }

  getRedirectUrl(): string {
    return "/notifications";
  }

  getOwnerId(): string {
    return "";
  }
}
