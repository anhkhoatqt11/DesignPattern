import { FaClipboardList, FaEye, FaThumbsUp, FaYoutube } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa6";
import { convertTagArrayToStr } from "../../page";
import { useAnime } from "@/hooks/useAnime";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { EpisodeComment } from "./EpisodeComment";
export const EpisodeInformation = ({ animeDetail, episodeDetail }) => {
  const userId = "65ec67ad05c5cb2ad67cfb3f";
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const {
    checkUserHasLikeOrSaveEpisode,
    updateUserLikeEpisode,
    updateUserSaveEpisode,
  } = useAnime();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const checkLikeSaveEpisode = async () => {
      const result = await checkUserHasLikeOrSaveEpisode(
        episodeDetail?._id,
        userId
      );
      setHasLiked(result?.like);
      setHasSaved(result?.bookmark);
    };
    checkLikeSaveEpisode();
  }, []);

  const handleChangeLike = async () => {
    if (!userId) {
      router.push("/auth/login");
      return;
    }
    setHasLiked((prev) => !prev);
    await updateUserLikeEpisode(episodeDetail?._id, userId);
  };
  const handleChangeSave = async () => {
    if (!userId) {
      router.push("/auth/login");
      return;
    }
    setHasSaved((prev) => !prev);
    await updateUserSaveEpisode(episodeDetail?._id, userId);
  };
  return (
    <>
      <div className="px-4 flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3 items-center">
            <FaYoutube className="h-6 w-6 text-[#A958FE]" />
            <h1 className="text-lg font-semibold bg-gradient-to-r from-[#A958FE] to-[#DA5EF0] inline-block text-transparent bg-clip-text">
              {animeDetail?.movieName}
            </h1>
          </div>
          <div className="flex flex-row gap-10 mt-2 mb-2 justify-center items-center sm:justify-start sm:items-start  z-50">
            <div
              className="flex flex-col gap-2 justify-center items-center"
              onClick={handleChangeLike}
            >
              <FaThumbsUp
                className={`${!hasLiked ? "text-white" : "text-[#A958FE]"}`}
              />
              <p
                className={`${
                  !hasLiked ? "text-[#8E8E8E]" : "text-[#DA5EF0]"
                } text-xs`}
              >
                Thích
              </p>
            </div>
            <div
              className="flex flex-col gap-2 justify-center items-center"
              onClick={handleChangeSave}
            >
              <FaBookmark
                className={`${!hasSaved ? "text-white" : "text-[#A958FE]"}`}
              />
              <p
                className={`${
                  !hasSaved ? "text-[#8E8E8E]" : "text-[#DA5EF0]"
                } text-xs`}
              >
                Lưu phim
              </p>
            </div>
            <div
              className="flex flex-col gap-2 justify-center items-center lg:hidden"
              onClick={() => {
                onOpen();
              }}
            >
              <BiSolidCommentDetail className={`text-white`} />
              <p className={`text-[#8E8E8E] text-xs`}>Bình luận</p>
            </div>
          </div>
        </div>
        <p className="text-2xl text-white font-bold line-clamp-2">
          {episodeDetail?.episodeName}
        </p>
        <div className="flex flex-row gap-3">
          <p className="text-sm font-medium text-[#8E8E8E]">
            Dành cho độ tuổi:{" "}
          </p>
          <p className="text-sm font-medium text-violet-500">
            {animeDetail?.ageFor}
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <p className="text-sm font-medium text-[#8E8E8E]">Thể loại:</p>
          <p className="text-sm font-medium text-fuchsia-500">
            {convertTagArrayToStr(animeDetail?.genreNames)}
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <p className="text-sm font-medium text-[#8E8E8E]">Phát sóng:</p>
          <p className="text-sm font-medium text-fuchsia-500">
            {animeDetail?.publishTime}
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <p className="text-sm font-medium text-[#8E8E8E]">Nhà phát hành:</p>
          <p className="text-sm font-medium text-white">
            {animeDetail?.publisher}
          </p>
        </div>
      </div>
      <Modal
        size={"lg"}
        isOpen={isOpen}
        onClose={onClose}
        placement="center"
        className="bg-black"
      >
        <ModalContent>
          {
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <EpisodeComment episodeId={episodeDetail?._id} />
              </ModalBody>
            </>
          }
        </ModalContent>
      </Modal>
    </>
  );
};
