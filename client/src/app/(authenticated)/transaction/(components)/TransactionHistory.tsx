import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface PaymentHistory {
    _id: string;
    userId: string;
    orderDate: string;
    paymentMethod: string;
    status: "completed" | "pending" | "failed";
    price: number;
    packageId: string | null;
}

const mapPaymentMethod = (method: string) => {
    switch (method) {
        case "Donation":
            return "Đóng góp quỹ";
        case "BuyComicChapter":
            return "Mua chương truyện";
        case "ZaloPay":
            return "ZaloPay";
        case "VNPay":
            return "VNPay";
        default:
            return method;
    }
};

const getAvatarSrc = (paymentMethod: string) => {
    switch (paymentMethod) {
        case "Donation":
            return "/skycoin.png";
        case "BuyComicChapter":
            return "/skycoin.png"; 
        case "ZaloPay":
            return "/zalopay.png"; 
        case "VNPay":
            return "/vnpay.jpg"; 
        default:
            return "/skycoin.png"; 
    }
};

const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
    });
    return { formattedDate, formattedTime };
};

export default function TransactionHistory({ paymentHistories }: { paymentHistories: PaymentHistory[] }) {
    return (
        <div className="p-6 space-y-4 text-gray-200">
            <h1 className="text-3xl font-semibold">Lịch sử giao dịch</h1>

            <div className="border border-gray-700 rounded-lg bg-neutral-800">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-gray-400">Tên giao dịch</TableHead>
                            <TableHead className="text-gray-400">Ngày giao dịch</TableHead>
                            <TableHead className="text-gray-400 text-right">Tổng thanh toán</TableHead>
                            <TableHead className="text-gray-400 text-right">Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paymentHistories.map((history) => {
                            const { formattedDate, formattedTime } = formatDateTime(history.orderDate);
                            const isSkyCoin = ["Donation", "BuyComicChapter"].includes(history.paymentMethod);
                            const formattedPrice = isSkyCoin
                                ? `${history.price.toLocaleString("vi-VN")} SkyCoin`
                                : new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(history.price);

                            return (
                                <TableRow key={history._id} className="hover:bg-gray-700">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src={getAvatarSrc(history.paymentMethod)} />
                                                <AvatarFallback>CT</AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-0.5">
                                                <div className="font-medium">
                                                    {mapPaymentMethod(history.paymentMethod)}
                                                </div>
                                                <div className="text-sm text-gray-400">ID: {history._id}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-0.5">
                                            <div>{formattedDate}</div>
                                            <div className="text-sm text-gray-400">
                                                Vào {formattedTime}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right tabular-nums">{formattedPrice}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            variant={history.status === "completed" ? "success" : "destructive"}
                                            className={`capitalize ${history.status === "completed"
                                                    ? "bg-green-600 text-green-100"
                                                    : "bg-red-600 text-red-100"
                                                }`}
                                        >
                                            {history.status === "completed" ? "Thành công" : "Thất bại"}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
