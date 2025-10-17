import { useGetPricingPlansQuery } from "@/services/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import {
  Check,
  Sparkles,
  Zap,
  Crown,
  Shield,
  Star,
  TrendingUp,
  Award,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PricingPage() {
  const { data, isLoading, error } = useGetPricingPlansQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-purple-600 dark:text-purple-400" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading pricing plans...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <Card className="max-w-md mx-4 shadow-2xl border-red-200 dark:border-red-900">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="text-red-600 dark:text-red-400 text-5xl">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Error loading pricing plans. Please try again later.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const plans = data?.data || [];

  // Helper function to get plan icon
  const getPlanIcon = (index: number) => {
    const icons = [Zap, Crown, Star];
    return icons[index % icons.length];
  };

  // Helper function to determine if plan is popular (middle one or specific name)
  const isPopularPlan = (plan: any, index: number) => {
    return (
      index === 1 ||
      plan.name.toLowerCase().includes("pro") ||
      plan.name.toLowerCase().includes("popular")
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-20 dark:opacity-10 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-normal opacity-20 dark:opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="container relative z-10 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-900 mb-4">
            <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 dark:from-purple-400 dark:via-blue-400 dark:to-pink-400 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 dark:from-purple-400 dark:via-blue-400 dark:to-pink-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan that matches your creative needs. All plans
            include premium features and 24/7 support.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>Money-back Guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => {
            const IconComponent = getPlanIcon(index);
            const isPopular = isPopularPlan(plan, index);

            return (
              <Card
                key={plan.id}
                className={`flex flex-col relative transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isPopular
                    ? "border-2 border-purple-500 dark:border-purple-600 shadow-xl shadow-purple-500/20 dark:shadow-purple-900/30 lg:scale-105"
                    : "border-gray-200 dark:border-gray-800 shadow-lg"
                } bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white text-sm font-semibold shadow-lg flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="space-y-4 pb-8">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 rounded-xl ${
                      isPopular
                        ? "bg-gradient-to-br from-purple-500 to-blue-500"
                        : "bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800"
                    }`}
                  >
                    <IconComponent
                      className={`h-6 w-6 ${
                        isPopular
                          ? "text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    />
                  </div>

                  {/* Plan Name */}
                  <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </CardTitle>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-5xl font-bold ${
                          isPopular
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {formatCurrency(plan.price)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-lg">
                        /{plan.duration} days
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Billed every {plan.duration} days
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

                  <ul className="space-y-4">
                    {plan.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 p-1 rounded-full ${
                            isPopular
                              ? "bg-purple-100 dark:bg-purple-900/30"
                              : "bg-gray-100 dark:bg-gray-800"
                          }`}
                        >
                          <Check
                            className={`h-4 w-4 ${
                              isPopular
                                ? "text-purple-600 dark:text-purple-400"
                                : "text-gray-600 dark:text-gray-400"
                            }`}
                          />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6">
                  <Button
                    onClick={() => navigate("/designs")}
                    className={`w-full py-6 text-lg font-semibold transition-all duration-300 ${
                      isPopular
                        ? "bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/50 dark:shadow-purple-900/50"
                        : "bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white"
                    }`}
                  >
                    Choose Your Design
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* FAQ / Additional Info Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-200 dark:border-purple-900 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Not sure which plan to choose?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All plans include access to our premium design library,
                  regular updates, and dedicated support. Upgrade or downgrade
                  anytime.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                  >
                    Contact Sales
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                  >
                    Compare Plans
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Trust Section */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            🔒 Trusted by 10,000+ creative professionals worldwide
          </p>
          <div className="flex justify-center gap-8 flex-wrap text-sm text-gray-500 dark:text-gray-500">
            <span>✓ No credit card required</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 30-day money back</span>
          </div>
        </div>
      </div>
    </div>
  );
}
