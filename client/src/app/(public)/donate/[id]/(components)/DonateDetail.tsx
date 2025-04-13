"use client";

import Loader from "@/components/Loader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useDonate } from "@/hooks/useDonate";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import { DonateItem } from "../../../(component)/DonateItem";
import { Button } from "@/components/ui/button";
import { DonateRank } from "../../(components)/DonateRank";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Divider, Spinner, Image } from "@nextui-org/react";
import { IoWalletOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { GoQuestion } from "react-icons/go";
import { MdErrorOutline } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";

const DonateDetail = ({ params, session }) => {
  const userId = session?.user?.id;
  const [isLoading, setIsLoading] = useState(true);
  const [packageDetail, setPackageDetail] = useState();
  const [packageList, setPackageList] = useState();
  const router = useRouter();
  const {
    getDonatePackageDetail,
    getDonatePackageList,
    uploadDonateRecord,
    processDonationPayment,
  } = useDonate();
  const { fetchUserInfoById } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [verifyDonate, setVerifyDonate] = useState(false);
  const [processPayment, setProcessPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPackageDetail = async () => {
      const result = await getDonatePackageDetail(params.id);
      const list = await getDonatePackageList();
      console.log("🚀 ~ fetchPackageDetail ~ list:", list);
      console.log("🚀 ~ fetchPackageDetail ~ result:", result);
      setPackageDetail(result);
      setPackageList(list);
      setIsLoading(false);
    };
    fetchPackageDetail();
  }, []);

  const processDonate = async () => {
    setProcessPayment(true);
    try {
      await processDonationPayment(packageDetail?.coin, userId);
      await uploadDonateRecord(params.id, userId);
    } catch (err) {
      setErrorMessage(
        "Giao dịch thất bại, vui lòng kiểm tra lại số dư và thử lại"
      );
    }
    setProcessPayment(false);
  };

  const { data: userInfo } = useQuery({
    queryKey: ["user", "info"],
    queryFn: async () => {
      if (!session?.user?.id) return {};
      const res = await fetchUserInfoById(session?.user?.id);
      return res;
    },
  });

  return isLoading ? (
    <div className="bg-[#141414] flex h-screen items-center justify-center -mt-[50px] md:-mt-[76px]">
      <Loader />
    </div>
  ) : (
    <>
      <div className="bg-[#141414] h-screen pb-[800px] -mt-[50px] md:-mt-[76px] relative overflow-hidden">
        <div className="w-full relative hidden sm:flex justify-end bg-[#141414]">
          <div className="w-2/3">
            <AspectRatio ratio={3 / 4}>
              <img
                src={packageDetail?.coverImage}
                alt={"img"}
                className="brightness-75 object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414] to-transparent pb-[100px]" />
        </div>
        <div className="w-full relative block sm:hidden">
          <AspectRatio ratio={3 / 4}>
            <img
              src={packageDetail?.coverImage}
              alt={"img"}
              className="brightness-75 object-cover h-full w-full"
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-[#141414]/75" />
        </div>
        <div className="w-full sm:px-20 px-8 absolute top-0 right-0 h-full items-center">
          <div className="w-full flex flex-col gap-3 mt-[100px] mr-3">
            <div className="w-full flex flex-row w-full justify-between">
              <div className="w-full flex flex-row gap-5">
                <div className="hidden sm:block basis-[180px] relative rounded overflow-hidden">
                  {/* <AspectRatio ratio={3 / 4}> */}
                  <img
                    src={packageDetail?.coverImage}
                    alt={"img"}
                    className="brightness-75 object-cover h-[240px] w-[180px]"
                  />
                  {/* </AspectRatio> */}
                </div>
                <div className="flex flex-col justify-between h-[240px] w-full">
                  <div className="flex flex-col gap-2">
                    <div className="text-xl font-medium text-[#DA5EF0] line-clamp-1">
                      {packageDetail?.subTitle}
                    </div>
                    <div className="text-[54px] font-bold text-white line-clamp-1">
                      {packageDetail?.title}
                    </div>
                  </div>
                  <Sheet key={"bottom"}>
                    <SheetTrigger asChild>
                      <Button
                        size="sm"
                        className="w-full md:w-fit md:px-12 p-3 z-10 transition-colors transition-transform transition-shadow transition-all duration-500 bg-left hover:bg-right hover:shadow-[#A958FE] hover:shadow-lg data-[hover=true]:opacity-100"
                        style={{
                          backgroundSize: "200% auto",
                          backgroundImage:
                            "var(--button_primary_background_color, linear-gradient(90deg, #A958FE, #DA5EF0 50%, #A958FE))",
                        }}
                      >
                        <div className="flex flex-row gap-3 text-xl font-extrabold">
                          DONATE NGAY
                          <div className="flex flex-row gap-2 text-[#fffe00] font-bold">
                            {packageDetail?.coin}
                            <img src="/skycoin.png" width={30} height={10} />
                          </div>
                        </div>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side={"bottom"} className="bg-[#2b2b2b]">
                      <SheetHeader>
                        <SheetTitle className="text-white px-8">
                          Donate cho đội ngũ chúng tớ có thêm động lực xuất bản
                          nhé!
                        </SheetTitle>
                      </SheetHeader>
                      <div className="flex flex-col gap-4">
                        <div className=" px-8 flex flex-row justify-between items-center">
                          <div className="flex flex-row gap-3 mt-3 items-center">
                            <img
                              src={packageDetail.coverImage}
                              alt="Comic Cover"
                              width={80}
                              height={80}
                              className="rounded-lg"
                            />
                            <div className="flex flex-col gap-1">
                              <span className="text-[#DA5EF0] font-semibold text-xl">
                                {packageDetail?.title}
                              </span>
                              <span className="text-lg text-slate-400">
                                {packageDetail?.subTitle}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row gap-2 text-white font-semibold text-xl">
                            {packageDetail?.coin}
                            <img src="/skycoin.png" width={30} height={30} />
                          </div>
                        </div>
                        <Divider className="h-[0.8px] bg-[#686868] rounded-full" />
                        <div className=" px-8 flex flex-row justify-between items-center">
                          <div className="flex flex-row gap-2">
                            <IoWalletOutline className="text-[#DA5EF0] w-6 h-6" />
                            <span className="text-lg text-white">
                              Bạn hiện đang có:
                            </span>
                          </div>
                          <div className="flex flex-row gap-2 text-white font-semibold text-xl">
                            {(userInfo?.coinPoint || "0")?.toLocaleString(
                              "de-DE"
                            )}
                            <img src="/skycoin.png" width={30} height={30} />
                          </div>
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          {userId ? (
                            <div className="flex flex-row gap-3 w-full mt-4 px-8">
                              <Button
                                className="basis-1/2 bg-transparent border-solid border-2 border-[#DA5EF0] text-[#DA5EF0] hover:bg-[#DA5EF0] hover:text-white"
                                onClick={() => {
                                  router.push(
                                    "https://anime-entertainment-payment.vercel.app/"
                                  );
                                }}
                              >
                                Nạp thêm
                              </Button>
                              <Button
                                className="basis-1/2 bg-gradient-to-r from-[#A958FE] to-[#DA5EF0] transition ease-in-out duration-300 hover:scale-[1.01]"
                                onClick={() => {
                                  setErrorMessage("");
                                  setVerifyDonate(false);
                                  onOpen();
                                }}
                              >
                                Donate
                              </Button>
                            </div>
                          ) : (
                            <Button
                              className="mt-4 w-full px-8 mx-8 bg-gradient-to-r from-[#A958FE] to-[#DA5EF0] hover:scale-[1.01] transition ease-in-out duration-300"
                              onClick={() => {
                                router.push("/auth/login");
                              }}
                            >
                              Đăng nhập để ủng hộ
                            </Button>
                          )}
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              <DonateRank />
            </div>
          </div>
        </div>
        <div className="w-full absolute top-[360px] left-0">
          <section
            id="categories"
            aria-labelledby="categories-heading"
            className="space-y-6 py-3 px-8 sm:px-20"
          >
            <div className="flex flex-row gap-3">
              <div className="w-[6px] h-[24px] sm:w-[8px] sm:h-[40px] bg-gradient-to-b from-[#A958FE] to-[#DA5EF0] rounded-full z-10">
                {" "}
              </div>
              <h2 className="text-white text-xl font-bold leading-[1.1] sm:text-3xl z-10">
                Gói ủng hộ khác
              </h2>
            </div>
            <Swiper
              style={
                {
                  "--swiper-pagination-bullet-inactive-color": "#999999",
                  "--swiper-pagination-bullet-inactive-opacity": "1",
                  "--swiper-pagination-color": "#000000",
                  "--swiper-pagination-bullet-size": "0px",
                  "--swiper-pagination-bullet-width": "0px",
                  "--swiper-pagination-bullet-height": "0px",
                } as React.CSSProperties
              }
              slidesPerView={2}
              spaceBetween={14}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                425: {
                  slidesPerView: 2,
                  spaceBetween: 14,
                },
                700: {
                  slidesPerView: 4,
                  spaceBetween: 14,
                },
                900: {
                  slidesPerView: 5,
                  spaceBetween: 14,
                },
                1100: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
                1300: {
                  slidesPerView: 7,
                  spaceBetween: 20,
                },
              }}
              modules={[Pagination]}
              className="w-full h-auto overflow-visible relative"
            >
              {packageList?.map((item) => (
                <SwiperSlide
                  key={item?._id}
                  className="h-full relative overflow-visible"
                >
                  <Link href={`/donate/${item?._id}`}>
                    <DonateItem
                      img={item?.coverImage}
                      name={item?.title}
                      sub={item?.subTitle}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-[#141414]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                {userInfo?.coinPoint < packageDetail?.coin ||
                errorMessage !== "" ? (
                  <div className="text-white w-full h-full text-center flex flex-row gap-1">
                    <MdErrorOutline className="text-red-500 w-5 h-5" />
                    {errorMessage ||
                      "Số dư hiện tại không đủ, vui lòng nạp thêm"}
                  </div>
                ) : verifyDonate ? (
                  <div className="w-full h-full flex justify-center items-center">
                    {processPayment ? (
                      <Spinner
                        label="Đang xử lý giao dịch"
                        color="danger"
                        labelColor="danger"
                      />
                    ) : (
                      <div className="flex flex-col gap-3 w-full">
                        <div className="text-emerald-500 w-full h-full text-center flex flex-row gap-2 items-center">
                          <IoIosCheckmarkCircleOutline className="text-emerald-500 w-5 h-5" />
                          Donate thành công
                        </div>
                        <div className=" px-1 flex flex-row justify-between items-center">
                          <div className="flex flex-row gap-3 mt-3 items-center">
                            <Image
                              src={packageDetail?.coverImage}
                              alt="Comic Cover"
                              width={100}
                              height={100}
                              className="rounded-lg"
                            />
                            <div className="flex flex-col gap-1">
                              <span className="text-[#DA5EF0] font-semibold">
                                {packageDetail?.title}
                              </span>
                              <span className="text-sm text-slate-400">
                                {packageDetail?.subTitle}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row gap-1 text-white font-semibold text-sm">
                            {packageDetail?.coin}
                            <img src="/skycoin.png" width={20} height={10} />
                          </div>
                        </div>
                        <Divider className="h-[0.8px] bg-[#686868] rounded-full" />
                        <div className="flex flex-col gap-1 justify-center w-full items-center">
                          <span className="text-[#A958FE] font-semibold text-base">
                            Cảm ơn bạn đã ủng hộ Skylark
                          </span>
                          <span className="text-gray-300 font-medium text-sm text-center">
                            Chúng mình sẽ cố gắng xuất bản nhiều truyện để bạn
                            có trải nghiệm tốt hơn
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="text-white w-full h-full text-center flex flex-row gap-2 items-center">
                      <GoQuestion className="text-fuchsia-500 w-5 h-5" />
                      Bạn có chắc chắn muốn donate cho chúng tớ
                    </div>
                    <div className="flex flex-row gap-3 w-full mt-4">
                      <Button
                        className="basis-1/2 p-0 bg-transparent border-solid border-2 border-[#DA5EF0] text-[#DA5EF0] hover:bg-[#DA5EF0] hover:text-white"
                        onClick={onClose}
                      >
                        Hủy
                      </Button>
                      <Button
                        className="basis-1/2 p-0 bg-gradient-to-r from-[#A958FE] to-[#DA5EF0] transition ease-in-out duration-300 hover:scale-[1.01]"
                        onClick={() => {
                          setVerifyDonate(true);
                          processDonate();
                        }}
                      >
                        Xác nhận
                      </Button>
                    </div>
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

export default DonateDetail;
