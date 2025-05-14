export interface INotificationHandler {
    getImage(): string;
    getRedirectUrl(): string;
    getOwnerId(): string;
  }