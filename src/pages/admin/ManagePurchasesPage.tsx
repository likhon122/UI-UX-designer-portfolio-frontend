import {
  useGetAllPurchasesQuery,
  useUpdatePurchaseMutation
} from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Loader2, ShoppingBag } from "lucide-react";

export default function ManagePurchasesPage() {
  const { data, isLoading, refetch } = useGetAllPurchasesQuery({
    page: 1,
    limit: 100
  });
  const [updatePurchase, { isLoading: isUpdating }] =
    useUpdatePurchaseMutation();
  const { toast } = useToast();

  const purchases = Array.isArray(data?.data?.items)
    ? data.data.items
    : Array.isArray(data?.data)
    ? data.data
    : [];

  const handleStatusChange = async (purchaseId: string, newStatus: string) => {
    try {
      await updatePurchase({
        id: purchaseId,
        data: { paymentStatus: newStatus as "Paid" | "Cancelled" }
      }).unwrap();
      toast({
        title: "Success",
        description: "Purchase status updated successfully"
      });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update status",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20">
        <div className="container py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-300/30 dark:bg-cyan-600/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Manage Purchases
                </CardTitle>
                <CardDescription className="text-base">
                  View and manage all purchase transactions ({purchases.length}{" "}
                  total)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {purchases.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No purchases found.
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Design</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchases.map((purchase: any) => (
                      <TableRow key={purchase._id}>
                        <TableCell className="font-medium">
                          {purchase.design?.title || "N/A"}
                        </TableCell>
                        <TableCell>
                          {purchase.customer?.name ||
                            purchase.customer?.email ||
                            "N/A"}
                        </TableCell>
                        <TableCell>
                          {purchase.pricingPlan?.name || "Standard"}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {formatCurrency(purchase.totalPrice || 0)}
                        </TableCell>
                        <TableCell>{purchase.paymentMethod || "N/A"}</TableCell>
                        <TableCell>
                          {purchase.createdAt
                            ? new Date(purchase.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric"
                                }
                              )
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              purchase.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : purchase.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {purchase.paymentStatus || "Pending"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Select
                            value={purchase.paymentStatus}
                            onValueChange={(value) =>
                              handleStatusChange(purchase._id, value)
                            }
                            disabled={isUpdating}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Paid">Completed</SelectItem>
                              <SelectItem value="Cancelled">
                                Cancelled
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
