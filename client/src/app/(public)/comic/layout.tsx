import React from "react";

async function layout({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#141414]">{children}</div>;
}

export default layout;
