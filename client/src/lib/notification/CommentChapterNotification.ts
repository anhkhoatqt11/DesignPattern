import { INotificationHandler } from "./INotificationHandler";

export class CommentChapterNotification implements INotificationHandler {
  constructor(private data: any) {}

  getImage(): string {
    return this.data.comic?.image || "/default-comment.jpg";
  }

  getRedirectUrl(): string {
    return `/comic/${this.data.comic?._id}/comments`;
  }

  getOwnerId(): string {
    return this.data.comic?.ownerId || "";
  }
}