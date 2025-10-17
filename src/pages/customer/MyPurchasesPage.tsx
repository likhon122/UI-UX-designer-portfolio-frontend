import { useState } from "react";
import {
  useGetMyPurchasesQuery,
  useGetDesignReviewsQuery,
  useCreateReviewMutation
} from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import {
  Loader2,
  Download,
  Calendar,
  Package,
  ShoppingBag,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Sparkles,
  Star,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Review Dialog Component
function ReviewDialog({
  designId,
  designTitle,
  existingReview
}: {
  designId: string;
  designTitle: string;
  existingReview: any;
}) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(existingReview?.rating || 5);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createReview({
        design: designId,
        rating,
        comment
      }).unwrap();

      toast({
        title: "Success",
        description: "Review submitted successfully!"
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to submit review",
        variant: "destructive"
      });
    }
  };

  if (existingReview) {
    return (
      <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-900">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Your Review
          </span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= existingReview.rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            {existingReview.rating}/5
          </span>
        </div>
        {existingReview.comment && (
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {existingReview.comment}
          </p>
        )}
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full mt-3 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-700 dark:text-purple-300"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Write Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 border-purple-200 dark:border-purple-900">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Review Design
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Share your experience with "{designTitle}"
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Rating */}
            <div className="space-y-2">
              <Label className="text-gray-900 dark:text-gray-100">Rating</Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {rating}/5
                </span>
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <Label
                htmlFor="comment"
                className="text-gray-900 dark:text-gray-100"
              >
                Comment (Optional)
              </Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setComment(e.target.value)
                }
                placeholder="Share your thoughts about this design..."
                rows={5}
                className="border-purple-200 dark:border-purple-900 focus:border-purple-600 dark:focus:border-purple-400 bg-white dark:bg-gray-950 resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-gray-300 dark:border-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Star className="h-4 w-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Purchase Card Component with Review
function PurchaseCard({ purchase }: { purchase: any }) {
  const design = purchase.design;
  const pricingPlan = purchase.pricingPlan;
  const isPaid = purchase.paymentStatus === "Paid";
  const isPending = purchase.paymentStatus === "Pending";

  // Fetch reviews for this design
  const { data: reviewsData } = useGetDesignReviewsQuery(design?._id || "", {
    skip: !design?._id
  });

  const reviews = Array.isArray(reviewsData?.data) ? reviewsData.data : [];

  // Check if current user has already reviewed this design
  const userReview = reviews.find(
    (review: any) => review.reviewer?._id === purchase.customer
  );

  return (
    <Card className="flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-200 dark:border-purple-900 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden">
      <CardHeader className="p-0 relative">
        {design?.previewImageUrl && (
          <div className="relative overflow-hidden">
            <img
              src={design.previewImageUrl}
              alt={design.title}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/400x300?text=Design";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              {isPaid ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500 text-white shadow-lg backdrop-blur-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs font-semibold">Paid</span>
                </div>
              ) : isPending ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500 text-white shadow-lg backdrop-blur-sm">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-semibold">Pending</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500 text-white shadow-lg backdrop-blur-sm">
                  <XCircle className="h-4 w-4" />
                  <span className="text-xs font-semibold">Failed</span>
                </div>
              )}
            </div>

            {/* Plan Badge */}
            <div className="absolute top-4 left-4">
              <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg backdrop-blur-sm">
                <span className="text-xs font-semibold">
                  {pricingPlan?.name || "Standard"}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      <div className="p-4 flex-1 flex flex-col">
        <CardTitle className="text-xl text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          {design?.title || "Design"}
        </CardTitle>

        <CardDescription className="text-gray-600 dark:text-gray-400 mb-4">
          {design?.category?.name || "Uncategorized"}
        </CardDescription>

        <div className="space-y-3 mb-4">
          {/* Price */}
          <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount Paid
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {formatCurrency(pricingPlan?.price || 0)}
            </span>
          </div>

          {/* Purchase Date */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span>
              {purchase.createdAt
                ? new Date(purchase.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                  })
                : "N/A"}
            </span>
          </div>

          {/* Features */}
          {pricingPlan?.features && pricingPlan.features.length > 0 && (
            <div className="pt-3 border-t border-purple-200 dark:border-purple-900">
              <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Plan Includes:
              </p>
              <ul className="space-y-1.5">
                {pricingPlan.features
                  .slice(0, 3)
                  .map((feature: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400"
                    >
                      <CheckCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                {pricingPlan.features.length > 3 && (
                  <li className="text-xs text-purple-600 dark:text-purple-400 font-medium pl-5">
                    +{pricingPlan.features.length - 3} more features
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <CardFooter className="flex flex-col gap-3 p-0 mt-auto">
          <div className="flex gap-3 w-full md:flex-row flex-col">
            <Link to={`/designs/${design?._id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-700 dark:text-purple-300"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Design
              </Button>
            </Link>
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isPaid}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Review Section - Only show for paid purchases */}
          {isPaid && design?._id && (
            <ReviewDialog
              designId={design._id}
              designTitle={design.title}
              existingReview={userReview}
            />
          )}
        </CardFooter>
      </div>
    </Card>
  );
}

export default function MyPurchasesPage() {
  const { data, isLoading, error } = useGetMyPurchasesQuery();

  console.log(data);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Animated Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container py-12 relative">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading your purchases...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container py-12">
          <Card className="border-red-200 dark:border-red-900 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <XCircle className="h-16 w-16 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Error Loading Purchases
              </h3>
              <p className="text-red-600 dark:text-red-400">
                Please try again later.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const purchases = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container px-4 py-6 sm:py-8 lg:py-12 relative">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0">
                  <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                    My Purchases
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                    Manage and access your purchased designs
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-200 dark:border-purple-900 shadow-xl w-full sm:w-auto">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-lg sm:rounded-xl flex-shrink-0">
                    <Package className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Total Purchases
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {purchases.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {purchases.length === 0 ? (
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-200 dark:border-purple-900 shadow-2xl">
            <CardContent className="flex flex-col items-center justify-center py-16 px-4">
              <div className="p-6 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-full mb-6">
                <Package className="h-20 w-20 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                No Purchases Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
                Start building your design collection today! Browse our premium
                designs and find the perfect match for your project.
              </p>
              <Link to="/designs">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Browse Premium Designs
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-4">
            {purchases.map((purchase: any) => {
              return <PurchaseCard key={purchase._id} purchase={purchase} />;
            })}
          </div>
        )}

        {/* Stats Section */}
        {purchases.length > 0 && (
          <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-200 dark:border-purple-900 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Completed
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {
                        purchases.filter((p: any) => p.paymentStatus === "Paid")
                          .length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-200 dark:border-purple-900 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/50 dark:to-orange-900/50 rounded-xl">
                    <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pending
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {
                        purchases.filter(
                          (p: any) => p.paymentStatus === "Pending"
                        ).length
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-200 dark:border-purple-900 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-xl">
                    <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Spent
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {formatCurrency(
                        purchases
                          .filter((p: any) => p.paymentStatus === "Paid")
                          .reduce(
                            (sum: number, p: any) =>
                              sum + (p.pricingPlan?.price || 0),
                            0
                          )
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
