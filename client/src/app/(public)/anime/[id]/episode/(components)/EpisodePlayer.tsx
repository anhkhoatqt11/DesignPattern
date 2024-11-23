"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaThumbsUp } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BsFillSendFill } from "react-icons/bs";
import { useAnime } from "@/hooks/useAnime";

const FormSchema = z.object({
  comment: z.string().min(1, {
    message: "Bình luận không được trống",
  }),
});
const EpisodePlayer = ({ episodeDetail }) => {
  const userId = "65ec67ad05c5cb2ad67cfb3f";
  const { checkUserHistoryHadSeenEpisode } = useAnime();
  const [hasWatchFullAd, setHasWatchFullAd] = useState(false);
  const [adPosition, setAdPosition] = useState(0);
  const adVideoRef = useRef(null);
  const animeVideoRef = useRef(null);
  const [adDuration, setAdDuration] = useState(0);
  const [previousPosition, setPreviousPosition] = useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onTimeUpdateFunction = () => {
    if (adVideoRef?.current?.currentTime === adVideoRef?.current?.duration)
      setHasWatchFullAd(true);
    else {
      setAdPosition(Math.round(adVideoRef?.current?.currentTime));
      setAdDuration(Math.round(adVideoRef?.current?.duration));
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("🚀 ~ onSubmit ~ JSON.stringify(data, null, 2):", data);
    form.reset({ comment: "" });
  }

  useEffect(() => {
    const getPreviousPositionVideo = async () => {
      const result = await checkUserHistoryHadSeenEpisode(
        "65fff02865ac19bed8721863",
        userId
      );
      setPreviousPosition(result ? result?.position : 0);
    };
    getPreviousPositionVideo();
  }, []);

  useEffect(() => {
    if (animeVideoRef.current !== null) {
      animeVideoRef.current.currentTime = previousPosition;
    }
  }, [previousPosition, animeVideoRef]);

  return (
    <div>
      <section className="flex flex-row gap-3 px-4">
        <div className="basis-[100%] lg:basis-2/3">
          <Suspense fallback={<p>Loading video...</p>}>
            <div className="w-full h-full rounded overflow-hidden">
              {episodeDetail && (
                <AspectRatio ratio={16 / 9}>
                  <div className="relative">
                    {!hasWatchFullAd && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          episodeDetail?.advertisementContent[0]?.forwardLink
                        }
                      >
                        <video
                          ref={adVideoRef}
                          width="100%"
                          height="100%"
                          autoPlay
                          muted
                          playsInline
                          className="absolute top-0 left-0 z-10"
                          src={
                            episodeDetail?.advertisementContent[0]?.adVideoUrl
                          }
                          onTimeUpdate={onTimeUpdateFunction}
                        />
                      </a>
                    )}
                    {!hasWatchFullAd && (
                      <div className="absolute w-[200px] p-[10px] rounded-[40px] bg-[#dddddd] text-[16px] font-semibold pl-[20px] top-[20px] left-[20px] z-20">
                        Quảng cáo còn {adDuration - adPosition}s
                      </div>
                    )}
                    <video
                      id="animeVideo"
                      ref={animeVideoRef}
                      width="100%"
                      height="100%"
                      controls
                      className="absolute top-0 left-0 z-0"
                      src={episodeDetail?.content}
                    />
                  </div>
                </AspectRatio>
              )}
            </div>
          </Suspense>
        </div>
        <div className="hidden lg:block basis-1/3">
          <div className="relative h-full w-full">
            <AspectRatio ratio={9 / 10} className="absolute w-full">
              <div className="h-full w-full overflow-y-auto scrollbar-thin pb-20">
                <div className="pl-2 pb-3 text-white text-xl font-semibold">
                  Bình luận
                </div>
                {episodeDetail?.comments?.map((item) => (
                  <div
                    className="flex flex-row gap-3 px-2 mt-3 w-full"
                    key={item?._id}
                  >
                    <Avatar>
                      <AvatarImage src={item?.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex flex-col gap-[2px] bg-[#2A2A2A] rounded-md p-3 w-full">
                        <p className="text-white font-semibold text-[13px]">
                          {item?.userName}
                        </p>
                        <div className="w-full text-[#cecece] font-normal text-[13px] text-wrap break-all">
                          {item?.content}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex flex-row gap-5 ml-3">
                          <div className="text-white text-[12px] font-semibold">
                            Thích
                          </div>
                          <div className="text-white text-[12px] font-semibold">
                            Trả lời
                          </div>
                          <div className="text-white text-[12px] font-semibold">
                            Báo cáo
                          </div>
                        </div>
                        <p className="flex flex-row gap-1 justify-center items-center text-white text-[12px] font-semibold">
                          13 <FaThumbsUp />
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {episodeDetail?.comments?.length === 0 && (
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <Image
                      alt="Skylark"
                      src="/commentempty.png"
                      width={120}
                      height={120}
                    />
                    <p className="text-white text-[14px]">
                      Chưa có bình luận nào
                    </p>
                    <p className="text-gray-500 text-[13px]">
                      Hãy là người bình luận đầu tiên nào
                    </p>
                  </div>
                )}
              </div>
            </AspectRatio>
            <div className="w-full h-10 bottom-8 left-0 z-10 absolute">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-[98%] flex flex-row pl-4 pr-2 bg-black py-2"
                >
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl className="w-full">
                          <Input
                            placeholder="Viết bình luận"
                            {...field}
                            className="w-full rounded-full text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="bg-transparent">
                    <BsFillSendFill className="text-lg" />
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EpisodePlayer;
