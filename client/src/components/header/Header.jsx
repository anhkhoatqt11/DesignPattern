/* eslint-disable no-undef */
"use client";

import React, { useEffect, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import "./styles.css";
import { Button } from "../ui/button";
import { Input } from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { signOut } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import AuthSvg from "@/assets/AuthSvg";
import { MobileNav } from "./MobileNavBar";
import Logo from "../logo";
import { HiOutlineTicket } from "react-icons/hi2";
import { useRouter, usePathname } from "next/navigation";
import { main_color } from "../../../public/color";

const avatarNav = [
  {
    name: "Hồ sơ",
    href: "/user/profile",
  },
  {
    name: "Vé của tôi",
    href: "/user/my-ticket",
  },
  {
    name: "Nhà tổ chức",
    href: "/organizer/profile",
  },
];

const adminAvatarNav = [
  {
    name: "Hồ sơ",
    href: "/user/profile",
  },
  {
    name: "Vé của tôi",
    href: "/user/my-ticket",
  },
  {
    name: "Nhà tổ chức",
    href: "/organizer/profile",
  },
  {
    name: "Trang admin",
    href: "/admin",
  },
];

const NavigationMenuDemo = ({ session }) => {
  const [user] = useState(session?.user);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState("bg-transparent");
  const [HeaderNav, setHeaderNav] = useState(avatarNav);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  });
  const controlNavbar = () => {
    if (window.scrollY > 50) {
      if (window.scrollY > lastScrollY) {
        setShow("bg-[#141414]/80");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("bg-transparent");
    }
    setLastScrollY(window.scrollY);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      router.push(`/search?searchWord=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      setHeaderNav(adminAvatarNav);
    }
  }, []);

  return (
    <div
      className={`w-full h-[50px] md:h-[76px] 
    items-center justify-between z-20
    sticky top-0 transition ease-in-out duration-300 px-6
    ${show}
    `}
    >
      <MobileNav session={session} />

      <div className="py-2 items-center h-full drop-shadow hidden lg:flex">
        {/* {isUserOpen ? <BackDropCus isOpen={isUserOpen} /> : null} */}
        {<Logo />}{" "}
        <div
          className="ml-3 mr-6 text-white font-bold"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Skylark
        </div>
        {pathname !== "/search" ? (
          <div className="form-control ">
            {/* <input
              type="text"
              placeholder="Tìm kiếm sự kiện"
              className="input input-bordered md:w-[500px] ml-5 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyPress}
            /> */}
            <Input
              type="text"
              placeholder="Hôm nay xem gì ta"
              labelPlacement="outside"
              className=" md:w-[450px] ml-5 h-10"
              value={searchQuery}
              radius="sm"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              startContent={
                <IoSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              endContent={
                <div className="flex flex-row w-[60px] gap-3">
                  <div className="text-sm text-[#CFCFCF]">|</div>
                  <div
                    className="text-sm text-[#2A2D34]"
                    onClick={() => {
                      router.push(
                        `/search?searchWord=${encodeURIComponent(searchQuery)}`
                      );
                    }}
                  >
                    Search
                  </div>
                </div>
              }
            />
          </div>
        ) : null}
        <div className="flex flex-row gap-4 items-center justify-center ml-auto mr-6">
          <Link href="/organizer/event">
            <Button
              className={`h-full py-0 w-fit text-lg bg-transparent text-white hover:text-fuchsia-500 hover:bg-transparent font-semibold`}
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Truyện tranh
            </Button>
          </Link>
          <Link href="/organizer/event">
            <Button
              className={`h-full py-0 w-fit text-lg bg-transparent text-white hover:text-fuchsia-500 hover:bg-transparent font-semibold`}
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Anime
            </Button>
          </Link>
          {user ? (
            <>
              <Link href="/organizer/event">
                <Button
                  className={`h-full py-0 w-fit text-lg bg-transparent text-white hover:text-fuchsia-500 hover:bg-transparent font-semibold`}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Thử thách
                </Button>
              </Link>
              <Dropdown
                shouldBlockScroll={true}
                onOpenChange={(open) => {
                  setIsUserOpen(open);
                }}
                closeOnSelect={true}
                onClose={() => {
                  setIsUserOpen(false);
                }}
                isOpen={isUserOpen}
              >
                <DropdownTrigger>
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownSection title={`${user?.name}`}>
                    {HeaderNav.map((item, index) => (
                      <DropdownItem
                        onClick={() => {
                          router.push(item.href);
                        }}
                        className="w-full"
                        key={index}
                      >
                        {item.name}
                      </DropdownItem>
                    ))}
                    <DropdownItem
                      onClick={() => signOut({ callbackUrl: "/auth/login" })}
                    >
                      <div className="flex flex-row gap-2 items-center h-8  ">
                        <div className="">{AuthSvg.signIn()}</div>
                        <div>Đăng xuất</div>
                      </div>
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </>
          ) : (
            <Link href={"/auth/login"}>
              <Button className="h-6 w-full rounded-full border-2 border-solid border-white bg-transparent text-white hover:text-black hover:bg-white font-medium">
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const ListItem = React.forwardRef(
  ({ children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a className={"ListItemLink"} {...props} ref={forwardedRef}>
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

export default NavigationMenuDemo;
