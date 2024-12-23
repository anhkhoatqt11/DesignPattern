import { getSession } from "@/lib/auth";
import ChapterComponent from "./(components)/ChapterComponent";

const page = async ({ params }) => {
  const session = await getSession();
  const comicId = params.id;

  return <ChapterComponent session={session} comicId={comicId} />;
};

export default page;
