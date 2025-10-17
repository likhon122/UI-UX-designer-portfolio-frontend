import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  useGetDesignByIdQuery,
  useGetDesignReviewsQuery,
  useGetMyPurchasesQuery
} from "@/services/api";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import {
  ShoppingCart,
  Heart,
  Download,
  Share2,
  Star,
  CheckCircle2,
  Package,
  Shield,
  Zap,
  Award,
  Users,
  TrendingUp,
  Clock,
  Eye,
  Sparkles,
  ArrowLeft,
  MessageSquare
} from "lucide-react";

export default function DesignDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const {
    data: designData,
    isLoading: loadingDesign,
    error: designError
  } = useGetDesignByIdQuery(id || "", {
    skip: !id
  });

  const { data: reviewsData } = useGetDesignReviewsQuery(id || "", {
    skip: !id
  });

  // Check if user has already purchased this design
  const { data: purchasesData } = useGetMyPurchasesQuery();

  // Check if the design has already been purchased
  const hasPurchased = useMemo(() => {
    if (!purchasesData?.data || !id) return false;
    return purchasesData.data.some((purchase) => {
      const designId =
        typeof purchase.design === "string"
          ? purchase.design
          : purchase.design._id;
      return designId === id;
    });
  }, [purchasesData, id]);

  const handlePurchase = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate(`/checkout/${id}`);
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    alert("Download functionality will be implemented soon!");
  };

  const handleContactUs = () => {
    navigate("/contact");
  };

  if (loadingDesign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400"></div>
              <Package className="absolute inset-0 m-auto h-6 w-6 text-purple-600 dark:text-purple-400 animate-pulse" />
            </div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse">
              Loading design details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (designError || !designData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container py-20">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Design Not Found
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              The design you're looking for doesn't exist or has been removed.
            </p>
            <Button
              onClick={() => navigate("/designs")}
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Designs
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const design = designData.data;
  const reviews = Array.isArray(reviewsData?.data) ? reviewsData.data : [];

  // Handle category object or string
  const categoryName =
    typeof design.category === "object" && design.category !== null
      ? design.category.name
      : design.category;

  // Mock additional images for gallery (in real app, these would come from API)
  const images = [design.previewImageUrl, design.previewImageUrl];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Breadcrumb & Back Button */}
      <div className="border-b border-purple-100 dark:border-purple-900/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/designs")}
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Designs
          </Button>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Image Gallery */}
          <div className="lg:col-span-3">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-purple-100 dark:border-purple-900/50">
              <img
                src={design.previewImageUrl}
                alt={design.title}
                className="w-full h-auto"
              />

              {/* Image Overlay Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isLiked
                        ? "fill-red-500 text-red-500"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 shadow-lg"
                >
                  <Share2 className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </Button>
              </div>

              {/* Status Badge */}
              {design.status === "Active" && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 text-white border-0 shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse mr-2"></span>
                    Available
                  </Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === idx
                      ? "border-purple-600 dark:border-purple-500 shadow-lg"
                      : "border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Tags */}
            {design.tags && design.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {design.tags.map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="px-4 py-2 text-sm border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Description Card */}
            <Card className="mt-6 border-purple-100 dark:border-purple-900/50 bg-white dark:bg-gray-900 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-gray-100">
                  <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  About This Design
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {design.description}
                  </p>
                </div>

                <Separator className="dark:bg-gray-800" />

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Design Process
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {design.process}
                  </p>
                </div>

                <Separator className="dark:bg-gray-800" />

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-purple-100 dark:bg-purple-900/30 p-2">
                        <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Complexity
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {design.complexityLevel}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                        <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Category
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {categoryName || "Uncategorized"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-pink-100 dark:bg-pink-900/30 p-2">
                        <Award className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          Tools Used
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {design.usedTools?.join(", ") || "N/A"}
                        </p>
                      </div>
                    </div>

                    {design.effects && design.effects.length > 0 && (
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-green-100 dark:bg-green-900/30 p-2">
                          <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            Effects
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {design.effects.join(", ")}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card className="mt-6 border-purple-100 dark:border-purple-900/50 bg-white dark:bg-gray-900 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-gray-100">
                  <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Customer Reviews
                  <Badge
                    variant="secondary"
                    className="ml-auto dark:bg-gray-800"
                  >
                    {reviews.length}{" "}
                    {reviews.length === 1 ? "Review" : "Reviews"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                      <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                      No reviews yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Be the first to review this design!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review, idx) => (
                      <div
                        key={review._id || idx}
                        className="rounded-lg border border-purple-100 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-900/10 p-4"
                      >
                        {/* Reviewer Info */}
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={review.customerDetails?.profileImage}
                            alt={review.customerDetails?.name || "Reviewer"}
                            className="h-10 w-10 rounded-full object-cover border border-purple-200 dark:border-purple-700"
                          />
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {review.customerDetails?.name || "Anonymous"}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {review.rating}/5
                          </span>
                        </div>

                        {/* Comment */}
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sticky Purchase Card */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              {/* Main Purchase Card */}
              <Card className="border-purple-200 dark:border-purple-900/50 bg-white dark:bg-gray-900 shadow-2xl">
                <CardHeader className="space-y-4">
                  <div>
                    <Badge className="mb-3 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 text-white">
                      Premium Design
                    </Badge>
                    <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                      {design.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        Created by{" "}
                      </span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        {design.designerName}
                      </span>
                    </CardDescription>
                  </div>

                  <Separator className="dark:bg-gray-800" />

                  {/* Price */}
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Price
                    </p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 dark:from-purple-400 dark:via-blue-400 dark:to-pink-400 bg-clip-text text-transparent">
                      {formatCurrency(design.price)}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {design.likesCount || 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {design.downloadsCount || 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        4.8
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Purchase Button - Conditional based on purchase status */}
                  {hasPurchased ? (
                    <div className="space-y-3">
                      <Button
                        onClick={handleDownload}
                        size="lg"
                        className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-all text-lg font-semibold"
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Download Design
                      </Button>
                      <Button
                        onClick={handleContactUs}
                        size="lg"
                        variant="outline"
                        className="w-full border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-lg font-semibold"
                      >
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Contact Support
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handlePurchase}
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all text-lg font-semibold"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Purchase Now
                    </Button>
                  )}

                  {/* Features List */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Instant download after purchase
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        High-quality source files included
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Lifetime updates & support
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Commercial license included
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card className="border-purple-100 dark:border-purple-900/50 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-white dark:bg-gray-900 p-2 shadow-sm">
                        <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                          Secure Payment
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          256-bit SSL encryption
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-white dark:bg-gray-900 p-2 shadow-sm">
                        <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                          24/7 Support
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          We're here to help anytime
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-white dark:bg-gray-900 p-2 shadow-sm">
                        <Users className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                          Trusted by 50K+
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Join our creative community
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Money Back Guarantee */}
              <Card className="border-green-200 dark:border-green-900/50 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-green-500 dark:bg-green-600 p-2">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                        30-Days Service Guarantee
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Not satisfied? Get a full refund within 30 days of
                        purchase. No questions asked.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Designs Section */}
        <div className="mt-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                More from{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {design.designerName}
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Discover more amazing designs from this creator
              </p>
            </div>
            <Link
              to={"/designs"}
              className="border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 p-2 rounded-lg border flex items-center font-medium transition"
            >
              View All
              <TrendingUp className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1].map((item) => (
              <Card
                key={item}
                className="group border-purple-100 dark:border-purple-900/50 bg-white dark:bg-gray-900 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={design.previewImageUrl}
                    alt="Related design"
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                    Related Design {item}
                  </h3>
                  <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent mt-2">
                    {formatCurrency(design.price)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
