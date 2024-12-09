/* eslint-disable @next/next/no-img-element */
import HomeAlbum from "./HomeAlbum";
export function ListComponent({session}) {
  return (
    <div className="md:-mt-[250px] mt-2 flex h-full w-full flex-col">
      <HomeAlbum session={session}/>
    </div>
  );
}
export default ListComponent;
