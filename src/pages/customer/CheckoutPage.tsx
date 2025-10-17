import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetDesignByIdQuery,
  useGetPricingPlansQuery,
  useCreatePurchaseMutation
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Loader2, Check, CreditCard, ShoppingCart } from "lucide-react";

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: designData, isLoading: loadingDesign } = useGetDesignByIdQuery(
    id || "",
    { skip: !id }
  );
  const { data: plansData, isLoading: loadingPlans } =
    useGetPricingPlansQuery();
  const [createPurchase, { isLoading: isPurchasing }] =
    useCreatePurchaseMutation();

  console.log(designData, plansData);

  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");

  const design = designData?.data;
  const pricingPlans = Array.isArray(plansData?.data) ? plansData.data : [];

  const selectedPlan = pricingPlans.find(
    (plan: any) => plan._id === selectedPlanId
  );

  // Calculate total: if design price is 0, use plan price; otherwise add them
  const designPrice = design?.price || 0;
  const planPrice = selectedPlan?.price || 0;
  const totalPrice = designPrice === 0 ? planPrice : designPrice + planPrice;

  const handlePurchase = async () => {
    if (!selectedPlanId) {
      toast({
        title: "Error",
        description: "Please select a pricing plan",
        variant: "destructive"
      });
      return;
    }

    try {
      await createPurchase({
        design: id || "",
        pricingPlan: selectedPlanId
      }).unwrap();

      toast({
        title: "Success",
        description: "Purchase completed successfully!"
      });

      navigate("/customer/my-purchases");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to complete purchase",
        variant: "destructive"
      });
    }
  };

  if (loadingDesign || loadingPlans) {
    return (
      <div className="container py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <p className="text-destructive">Design not found</p>
          <Button onClick={() => navigate("/designs")} className="mt-4">
            Browse Designs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
        <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8" />
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Design Summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Design Details</CardTitle>
            <CardDescription>Review your selected design</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <img
                src={design.previewImageUrl}
                alt={design.title}
                className="w-full sm:w-40 md:w-48 h-40 sm:h-40 md:h-48 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/400?text=Design";
                }}
              />
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  {design.title}
                </h3>
                <p className="text-muted-foreground mb-3 sm:mb-4">
                  by {design.designerName}
                </p>
                <p className="text-sm mb-3 sm:mb-4 line-clamp-2">
                  {design.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
                  <span className="text-muted-foreground">
                    Complexity:{" "}
                    <span className="font-medium text-foreground">
                      {design.complexityLevel}
                    </span>
                  </span>
                  {designPrice > 0 && (
                    <span className="text-muted-foreground">
                      Base Price:{" "}
                      <span className="font-medium text-foreground">
                        {formatCurrency(design.price)}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Select Pricing Plan</CardTitle>
            <CardDescription>
              Choose the plan that best fits your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedPlanId}
              onValueChange={setSelectedPlanId}
            >
              <div className="space-y-4">
                {pricingPlans.map((plan: any) => (
                  <div
                    key={plan._id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPlanId === plan._id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedPlanId(plan._id)}
                  >
                    <div className="flex items-start gap-3">
                      <RadioGroupItem
                        value={plan._id}
                        id={plan._id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={plan._id} className="cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-lg">
                                {plan.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {plan.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">
                                ${plan.price}.00
                              </p>
                            </div>
                          </div>
                          {plan.features && plan.features.length > 0 && (
                            <ul className="space-y-1 mt-3">
                              {plan.features.map(
                                (feature: string, index: number) => (
                                  <li
                                    key={index}
                                    className="text-sm flex items-center gap-2"
                                  >
                                    <Check className="h-4 w-4 text-primary" />
                                    {feature}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you'd like to pay</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 border rounded-lg p-4">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label
                    htmlFor="credit-card"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Credit Card</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-lg p-4">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label
                    htmlFor="paypal"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-xl">💳</span>
                    <span>PayPal</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 border rounded-lg p-4">
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                  <Label
                    htmlFor="bank-transfer"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-xl">🏦</span>
                    <span>Bank Transfer</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Order Summary - Sticky */}
        <Card className="lg:sticky lg:top-24 h-fit">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {designPrice > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Design Base Price
                  </span>
                  <span>{formatCurrency(designPrice)}</span>
                </div>
              )}
              {selectedPlan && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {selectedPlan.name} Plan
                    </span>
                    <span>{formatCurrency(planPrice)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-purple-600 dark:text-purple-400">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </>
              )}
              {!selectedPlan && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Please select a pricing plan to see the total
                </p>
              )}
            </div>

            {selectedPlan && (
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <p className="font-semibold mb-1">
                  Included in {selectedPlan.name}:
                </p>
                <ul className="space-y-1">
                  {selectedPlan.features
                    ?.slice(0, 3)
                    .map((feature: string, index: number) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              size="lg"
              onClick={handlePurchase}
              disabled={isPurchasing || !selectedPlanId}
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Complete Purchase
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
