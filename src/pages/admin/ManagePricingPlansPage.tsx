import { useState } from "react";
import {
  useGetPricingPlansQuery,
  useCreatePricingPlanMutation,
  useUpdatePricingPlanMutation
} from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Edit, DollarSign } from "lucide-react";

export default function ManagePricingPlansPage() {
  const { data, isLoading, refetch } = useGetPricingPlansQuery();
  const [createPlan, { isLoading: isCreating }] =
    useCreatePricingPlanMutation();
  const [updatePlan, { isLoading: isUpdating }] =
    useUpdatePricingPlanMutation();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [originalData, setOriginalData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    features: ""
  });

  const plans = Array.isArray(data?.data) ? data.data : [];

  const handleOpenDialog = (plan?: any) => {
    if (plan) {
      setEditingPlan(plan);
      const initialData = {
        name: plan.name || "",
        price: plan.price?.toString() || "",
        duration: plan.duration?.toString() || "",
        features: plan.features?.join(", ") || ""
      };
      setFormData(initialData);
      setOriginalData(initialData);
    } else {
      setEditingPlan(null);
      setOriginalData(null);
      setFormData({
        name: "",
        price: "",
        duration: "",
        features: ""
      });
    }
    setIsDialogOpen(true);
  };

  const hasChanges = () => {
    if (!editingPlan || !originalData) return true;
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  };

  const getChangedFields = () => {
    if (!originalData) return null;
    const changes: any = {};

    if (formData.name !== originalData.name) {
      changes.name = formData.name;
    }
    if (formData.price !== originalData.price) {
      changes.price = parseFloat(formData.price);
    }
    if (formData.duration !== originalData.duration) {
      changes.duration = parseInt(formData.duration);
    }
    if (formData.features !== originalData.features) {
      changes.features = formData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
    }

    return Object.keys(changes).length > 0 ? changes : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPlan) {
        const changedFields = getChangedFields();
        if (!changedFields) {
          toast({
            title: "No Changes",
            description: "No changes detected to update",
            variant: "default"
          });
          return;
        }

        await updatePlan({ id: editingPlan._id, data: changedFields }).unwrap();
        toast({
          title: "Success",
          description: "Pricing plan updated successfully"
        });
      } else {
        const planData = {
          name: formData.name as any,
          price: parseFloat(formData.price),
          duration: parseInt(formData.duration),
          features: formData.features
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean)
        };

        await createPlan(planData).unwrap();
        toast({
          title: "Success",
          description: "Pricing plan created successfully"
        });
      }
      setIsDialogOpen(false);
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Operation failed",
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
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-300/30 dark:bg-green-600/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300/30 dark:bg-emerald-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Manage Pricing Plans
                  </CardTitle>
                  <CardDescription className="text-base">
                    Create and edit pricing plans ({plans.length} total)
                  </CardDescription>
                </div>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleOpenDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPlan
                        ? "Edit Pricing Plan"
                        : "Add New Pricing Plan"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingPlan
                        ? "Update pricing plan details"
                        : "Create a new pricing plan"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Plan Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Premium Plan"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($) *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              price: e.target.value
                            })
                          }
                          placeholder="e.g. 29.99"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Duration (days) *</Label>
                        <Input
                          id="duration"
                          type="number"
                          min="1"
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              duration: e.target.value
                            })
                          }
                          placeholder="e.g. 30"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="features">
                          Features (comma-separated) *
                        </Label>
                        <Input
                          id="features"
                          value={formData.features}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              features: e.target.value
                            })
                          }
                          placeholder="High-resolution files, Commercial license, Priority support"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={
                          isCreating ||
                          isUpdating ||
                          (editingPlan && !hasChanges())
                        }
                      >
                        {(isCreating || isUpdating) && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {editingPlan ? "Update" : "Create"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {plans.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No pricing plans found. Click "Add Plan" to create one.
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Features</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plans.map((plan: any) => (
                      <TableRow key={plan._id}>
                        <TableCell className="font-medium">
                          {plan.name}
                        </TableCell>
                        <TableCell>${plan.price}</TableCell>
                        <TableCell>{plan.duration} days</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="text-sm text-muted-foreground">
                            {plan.features?.slice(0, 2).join(", ")}
                            {plan.features?.length > 2 &&
                              ` +${plan.features.length - 2} more`}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(plan)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
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
