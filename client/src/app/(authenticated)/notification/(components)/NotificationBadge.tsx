import { useUser } from "@/hooks/useUser";
import { Badge } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GoBellFill } from "react-icons/go";
export const NotificationBadge = ({ session }) => {
  const { getNotification } = useUser();
  const [notiAmount, setNotiAmount] = useState("");
  useEffect(() => {
    const getNoti = async () => {
      const result = await getNotification(session?.user?.id);
      const filterNotificaions = (result || []).filter(
        (item) => item?.status === "sent"
      );
      setNotiAmount(filterNotificaions.length ? filterNotificaions.length : "");
    };
    getNoti();
  }, []);
  return (
    <Badge
      color="danger"
      content={notiAmount}
      shape="rectangle"
      showOutline={false}
      className="text-sm"
    >
      <GoBellFill className="w-6 h-6" />
    </Badge>
  );
};
