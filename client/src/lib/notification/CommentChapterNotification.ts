import { INotificationHandler } from "./INotificationHandler";

export class CommentChapterNotification implements INotificationHandler {
  constructor(private data: any) {}

  getImage(): string {
    if (this.data.type === "commentEpisode") {
      return this.data.anime?.landspaceImage || "/commentempty.png";
    }

    // Mặc định là commentChapter
    return this.data.comic?.landspaceImage || "/commentempty.png";
  }

  getRedirectUrl(): string {
    const sourceId = this.data.sourceId;

    if (this.data.type === "commentEpisode") {
      const animeId = this.data.anime?._id;
      return `/anime/${animeId}/episode?episodeId=${sourceId}`;
    }

    // Mặc định là commentChapter
    const comicId = this.data.comic?._id;
    return `/comic/${comicId}/chapter?chapterId=${sourceId}`;
  }

  getOwnerId(): string {
    return this.data.comic?._id || this.data.anime?._id || "";
  }
}
