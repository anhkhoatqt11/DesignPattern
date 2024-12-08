"use client";

import Loader from "@/components/Loader";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useDonate } from "@/hooks/useDonate";
import { DonateItem } from "../(component)/DonateItem";
import { DonateRank } from "./(components)/DonateRank";

const page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [donateList, setDonateList] = useState();
  const { getDonatePackageList } = useDonate();

  useEffect(() => {
    const fetchDonateList = async () => {
      const result = await getDonatePackageList();
      setDonateList(result);
      setIsLoading(false);
    };
    fetchDonateList();
  }, []);
  return (
    <div className="flex flex-col gap-3 bg-[#141414] -mt-[50px] md:-mt-[76px] px-[60px] py-[100px]">
      <div className="flex flex-row w-full justify-between items-center mb-2">
        <div className="flex flex-row gap-3 items-center">
          <IoIosArrowBack
            className="text-[#da5ef0] w-6 h-6 sm:w-10 sm:h-10"
            onClick={() => {
              router.back();
            }}
          />
          <h2 className="text-white text-xl font-bold leading-[1.1] sm:text-3xl z-10">
            🔥 Donate ủng hộ chúng mình nè
          </h2>
        </div>
        <DonateRank />
      </div>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-5 gap-y-8">
          {donateList?.map((item) => (
            <Link href={`/donate/${item?._id}`} key={item?._id}>
              <DonateItem
                img={item?.coverImage}
                name={item?.title}
                sub={item?.subTitle}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
