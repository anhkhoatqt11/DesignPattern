import { INotificationHandler } from "./INotificationHandler";

export class DefaultNotification implements INotificationHandler {
  constructor(private data: any) {}

  getImage(): string {
    return "/default-noti.jpg";
  }

  getRedirectUrl(): string {
    return "/notifications";
  }

  getOwnerId(): string {
    return "";
  }
}