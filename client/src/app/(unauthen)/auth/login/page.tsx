import React from "react";
import Login from "./Login";

const page = () => {
  return (
    <div className="flex justify-center items-center bg-transparent w-full h-screen relative">
      <Login />
      <div
        className="absolute top-0 left-0 h-full w-full -z-0 bg-[length:460px_360px] brightness-[0.2]"
        style={{
          backgroundImage: "url('/comiclist.jpg')",
          backgroundRepeat: "repeat",
        }}
      ></div>
    </div>
  );
};

export default page;
