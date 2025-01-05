import { getRequest, postRequest, putRequest } from "@/lib/fetch";
import { baseApiUrl } from "@/lib/utils";
import toast from "react-hot-toast";

export const useReport = () => {
  const sendUserReport = async (
    reportContent,
    userBeReportedId,
    userReportedId,
    type,
    destinationId,
    commentId
  ) => {
    const res = await postRequest({
      endPoint: `${baseApiUrl}/api/reports/sendUserReport`,
      isFormData: false,
      formData: {
        reportContent,
        userBeReportedId,
        userReportedId,
        type,
        destinationId,
        commentId,
      },
    });
    toast.success("Đã gửi báo cáo cho quản trị viên.");
    return res;
  };
  return {
    sendUserReport,
  };
};
