// NotificationFactory.ts
import { EpisodeNotification } from "./EpisodeNotification";
import { ChapterNotification } from "./ChapterNotification";
import { CommentChapterNotification } from "./CommentChapterNotification";
import { DefaultNotification } from "./DefaultNotification";
import { INotificationHandler } from "./INotificationHandler";

export function NotificationFactory(data: any): INotificationHandler {
  switch (data.type) {
    case "episode":
      return new EpisodeNotification(data);
    case "chapter":
      return new ChapterNotification(data);
    case "commentChapter":
      return new CommentChapterNotification(data);
    default:
      return new DefaultNotification(data);
  }
}