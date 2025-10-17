import { useState } from "react";
import {
  useGetDesignsQuery,
  useGetDesignReviewsQuery,
  useDeleteReviewMutation
} from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Loader2, MessageSquare, Trash2, Star } from "lucide-react";

export default function ManageReviewsPage() {
  const { data: designsData, isLoading: loadingDesigns } = useGetDesignsQuery({
    page: 1,
    limit: 100
  });
  const [selectedDesignId, setSelectedDesignId] = useState<string>("");
  const { data: reviewsData, isLoading: loadingReviews } =
    useGetDesignReviewsQuery(selectedDesignId, {
      skip: !selectedDesignId
    });
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  const { toast } = useToast();

  const designs = Array.isArray(designsData?.data) ? designsData.data : [];
  const reviews = Array.isArray(reviewsData?.data) ? reviewsData.data : [];

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    try {
      await deleteReview(reviewId).unwrap();
      toast({
        title: "Success",
        description: "Review deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to delete review",
        variant: "destructive"
      });
    }
  };

  if (loadingDesigns) {
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
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-300/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-300/30 dark:bg-rose-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  Manage Reviews
                </CardTitle>
                <CardDescription className="text-base">
                  View and moderate design reviews
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                Select Design
              </label>
              <Select
                value={selectedDesignId}
                onValueChange={setSelectedDesignId}
              >
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Choose a design to view reviews" />
                </SelectTrigger>
                <SelectContent>
                  {designs.map((design: any) => (
                    <SelectItem key={design._id} value={design._id}>
                      {design.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!selectedDesignId ? (
              <div className="text-center py-12 text-muted-foreground">
                Please select a design to view its reviews
              </div>
            ) : loadingReviews ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No reviews found for this design
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Comment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reviews.map((review: any) => (
                      <TableRow key={review._id}>
                        <TableCell className="font-medium">
                          {review.customer?.name ||
                            review.customer?.email ||
                            "Anonymous"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">
                              {review.rating}/5
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-md">
                          {review.comment || "No comment"}
                        </TableCell>
                        <TableCell>
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric"
                                }
                              )
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(review._id)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
