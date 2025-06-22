import { INotificationHandler } from "./INotificationHandler";

export class ChapterNotification implements INotificationHandler {
  constructor(private data: any) {}

  getImage(): string {
    return this.data.comic?.landspaceImage || "/loadingcomicimage.png";
  }

  getRedirectUrl(): string {
    return `/comic/${this.data.comic?._id}`;
  }

  getOwnerId(): string {
    return this.data.comic?.ownerId || "";
  }
}
