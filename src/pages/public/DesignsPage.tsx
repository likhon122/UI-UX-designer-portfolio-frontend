import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetDesignsQuery } from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import {
  Sparkles,
  Search,
  SlidersHorizontal,
  Heart,
  Download,
  Star,
  TrendingUp,
  Grid3x3,
  LayoutGrid,
  Eye,
  ShoppingCart
} from "lucide-react";

export default function DesignsPage() {
  const { data, isLoading, error } = useGetDesignsQuery({ page: 1, limit: 12 });
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "large">("grid");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400"></div>
              <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-purple-600 dark:text-purple-400 animate-pulse" />
            </div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse">
              Loading amazing designs...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container py-20">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Error loading designs. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // The API returns data.data as an array directly
  const designs = Array.isArray(data?.data) ? data.data : [];

  if (designs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
              <Sparkles className="h-10 w-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Browse Premium Designs
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No designs available at the moment. Check back soon!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Filter designs by search query
  const filteredDesigns = designs.filter(
    (design: any) =>
      design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.designerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden border-b border-purple-100 dark:border-purple-900/50 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 dark:from-purple-900 dark:via-blue-900 dark:to-pink-900">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-400/30 dark:bg-purple-600/20 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-pink-400/30 dark:bg-pink-600/20 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container relative py-16">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 dark:bg-white/10 px-4 py-2 backdrop-blur-sm border border-white/30">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">
                Premium UI/UX Design Collection
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="pb-6 text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              Discover Amazing
              <br />
              <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 dark:from-yellow-300 dark:via-pink-300 dark:to-purple-300 bg-clip-text text-transparent">
                Design Assets
              </span>
            </h1>

            {/* Description */}
            <p className="mb-8 text-lg md:text-xl text-white/90 dark:text-white/80 leading-relaxed max-w-2xl mx-auto">
              Browse our curated collection of professional UI/UX designs
              crafted by talented designers from around the world.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto relative z-10">
              <div className="rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 border border-white/20 dark:border-white/10">
                <div className="text-3xl font-bold text-white">
                  {designs.length}+
                </div>
                <div className="text-sm text-white/80 dark:text-white/70">
                  Designs
                </div>
              </div>
              <div className="rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 border border-white/20 dark:border-white/10">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-white/80 dark:text-white/70">
                  Downloads
                </div>
              </div>
              <div className="rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 border border-white/20 dark:border-white/10">
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-sm text-white/80 dark:text-white/70">
                  Rating
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              className="fill-purple-50 dark:fill-gray-950"
            />
          </svg>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <Input
                type="text"
                placeholder="Search designs, designers..."
                className="pl-10 h-12 bg-white dark:bg-gray-900 border-purple-200 dark:border-purple-800 focus:border-purple-400 dark:focus:border-purple-600 focus:ring-purple-400/20 dark:focus:ring-purple-600/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* View Mode & Filter */}
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Badge>

              <div className="flex items-center gap-1 rounded-lg bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-800 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-md p-2 transition-colors ${
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("large")}
                  className={`rounded-md p-2 transition-colors ${
                    viewMode === "large"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-purple-600 dark:text-purple-400">
                {filteredDesigns.length}
              </span>{" "}
              {filteredDesigns.length === 1 ? "design" : "designs"}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span>Trending Now</span>
            </div>
          </div>

          {/* Designs Grid */}
          <div
            className={
              viewMode === "grid"
                ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "grid md:grid-cols-2 gap-8"
            }
          >
            {filteredDesigns.map((design: any) => (
              <Link to={`/designs/${design._id}`} key={design._id}>
                <Card className="group h-full border-purple-100 dark:border-purple-900/50 bg-white dark:bg-gray-900 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/30 transition-all duration-300 overflow-hidden">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                    <img
                      src={design.previewImageUrl}
                      alt={design.title}
                      className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                        viewMode === "grid" ? "h-56" : "h-80"
                      }`}
                    />

                    {/* Hover Overlay Actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <Link
                        to={`/designs/${design._id}`}
                        className="bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white shadow-lg flex rounded-md px-3 py-2 items-center"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Link>

                      <Link
                        to={`/designs/${design._id}`}
                        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-white dark:border-gray-800 hover:bg-purple-600 hover:text-white hover:border-purple-600 shadow-lg flex rounded-md p-3 items-center outline-2 outline-white"
                      >
                        <Heart className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-20">
                      {design.tags && design.tags.length > 0 && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 text-white border-0 shadow-lg">
                          {design.tags[0]}
                        </Badge>
                      )}
                      {design.status === "Active" && (
                        <Badge className="bg-green-500 dark:bg-green-600 text-white border-0 shadow-lg">
                          <span className="h-2 w-2 rounded-full bg-white animate-pulse mr-1"></span>
                          New
                        </Badge>
                      )}
                    </div>

                    {/* Stats on Image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1 text-xs text-white bg-black/50 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Heart className="h-3 w-3" />
                        <span>{design.likesCount || 0}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white bg-black/50 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Download className="h-3 w-3" />
                        <span>{design.downloadsCount || 0}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white bg-black/50 dark:bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full ml-auto">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                      {design.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        by{" "}
                        <span className="font-medium text-purple-600 dark:text-purple-400">
                          {design.designerName}
                        </span>
                      </span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                          {formatCurrency(design.price)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {design.complexityLevel}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge
                          variant="outline"
                          className="text-xs border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400"
                        >
                          {design.price == 0 ? "Free" : "Premium"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Button className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredDesigns.length === 0 && (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Search className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                No designs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="container py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 dark:from-purple-900 dark:via-blue-900 dark:to-pink-900 p-12 text-center shadow-2xl">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 dark:bg-white/5 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 dark:bg-white/5 blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10">
            <Badge className="mb-4 bg-white/20 dark:bg-white/10 text-white border-white/30 dark:border-white/20">
              <Sparkles className="mr-2 h-4 w-4" />
              Looking for something specific?
            </Badge>
            <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
              Can't Find What You Need?
            </h2>
            <p className="mb-8 text-lg text-white/90 dark:text-white/80 max-w-2xl mx-auto">
              Get a custom design tailored to your needs. Our talented designers
              are ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800 shadow-xl px-8"
              >
                Request Custom Design
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white dark:border-gray-700 text-white hover:bg-white dark:hover:bg-gray-900 hover:text-purple-600 dark:hover:text-purple-400 shadow-xl px-8"
              >
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
