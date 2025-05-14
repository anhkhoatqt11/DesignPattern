import { INotificationHandler } from "./INotificationHandler";

export class EpisodeNotification implements INotificationHandler {
  constructor(private data: any) {}

  getImage(): string {
    return this.data.anime?.image || "/default-episode.jpg";
  }

  getRedirectUrl(): string {
    return `/anime/${this.data.anime?._id}`;
  }

  getOwnerId(): string {
    return this.data.anime?.ownerId || "";
  }
}