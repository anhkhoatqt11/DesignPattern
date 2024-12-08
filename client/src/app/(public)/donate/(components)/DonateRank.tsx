import Loader from "@/components/Loader";
import { useDonate } from "@/hooks/useDonate";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export const DonateRank = () => {
  const { getDonatorList } = useDonate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [rankList, setRankList] = useState();

  const fetchRank = async () => {
    setIsLoading(true);
    const result = await getDonatorList();
    console.log("🚀 ~ fetchRank ~ result:", result);
    setRankList(result);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchRank();
    }
  }, [isOpen]);

  return (
    <>
      <Button
        onPress={onOpen}
        className="p-0 m-0 h-[60px] bg-transparent rounded-md"
      >
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="relative w-[50px] h-[50px] rounded-md">
            <img
              src="/goldtrophy.png"
              width={40}
              className="absolute top-0 left-1"
            />
            <img
              src="/shiningstar.gif"
              width={50}
              height={50}
              className="absolute top-0 left-1"
            />
          </div>
        </div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row items-center gap-2 text-white">
                <img src="/goldtrophy.png" width={20} />{" "}
                <span>Bảng xếp hạng donate</span>
              </ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <div className="bg-[#141414] flex h-full items-center justify-center">
                    <Loader />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
                    {rankList?.map((item, index) => (
                      <div className="flex flex-row gap-4 items-center">
                        <span
                          className={`text-${
                            index === 0
                              ? "[#DA5EF0]"
                              : index === 1
                              ? "emerald-500"
                              : index === 2
                              ? "blue-500"
                              : "gray-500"
                          } font-extrabold text-2xl`}
                        >
                          {index + 1}
                        </span>
                        <div className="flex flex-row items-center justify-between rounded-lg p-3 gap-2 bg-[#141414] w-full">
                          <div className="flex flex-row gap-2">
                            <Avatar src={item?.avatar} />
                            <div className="flex flex-col gap-1">
                              <span className="text-white font-semibold">
                                {item?.username}
                              </span>
                              <span className="text-[#DA5EF0] text-sm font-medium">
                                Đã donate {item?.donationCount} lần
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row justify-center items-center text-white font-medium">
                            {item?.totalCoins.toLocaleString("de-DE")}{" "}
                            <img src="/skycoin.png" className="ml-2 w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
