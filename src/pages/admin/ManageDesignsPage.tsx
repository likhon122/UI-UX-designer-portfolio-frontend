import { useState } from "react";
import {
  useGetDesignsQuery,
  useGetCategoriesQuery,
  useCreateDesignMutation,
  useUpdateDesignMutation,
  useDeleteDesignMutation
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Loader2, Plus, Edit, Trash2, Package } from "lucide-react";

export default function ManageDesignsPage() {
  const { data, isLoading, refetch } = useGetDesignsQuery({
    page: 1,
    limit: 100
  });
  const { data: categoriesData } = useGetCategoriesQuery();
  const [createDesign, { isLoading: isCreating }] = useCreateDesignMutation();
  const [updateDesign, { isLoading: isUpdating }] = useUpdateDesignMutation();
  const [deleteDesign, { isLoading: isDeleting }] = useDeleteDesignMutation();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDesign, setEditingDesign] = useState<any>(null);
  const [originalData, setOriginalData] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    previewImageUrl: "",
    designerName: "",
    usedTools: "",
    effects: "",
    price: "",
    process: "",
    complexityLevel: "Basic" as "Basic" | "Intermediate" | "Advanced",
    tags: "",
    status: "Active" as "Active" | "Draft" | "Archived"
  });

  const designs = Array.isArray(data?.data) ? data.data : [];
  const categories = Array.isArray(categoriesData?.data)
    ? categoriesData.data
    : [];

  const handleOpenDialog = (design?: any) => {
    if (design) {
      setEditingDesign(design);
      const initialData = {
        title: design.title || "",
        category:
          typeof design.category === "object"
            ? design.category._id
            : design.category || "",
        description: design.description || "",
        previewImageUrl: design.previewImageUrl || "",
        designerName: design.designerName || "",
        usedTools: design.usedTools?.join(", ") || "",
        effects: design.effects?.join(", ") || "",
        price: design.price?.toString() || "",
        process: design.process || "",
        complexityLevel: design.complexityLevel || "Basic",
        tags: design.tags?.join(", ") || "",
        status: design.status || "Active"
      };
      setFormData(initialData);
      setOriginalData(initialData);
    } else {
      setEditingDesign(null);
      setOriginalData(null);
      setFormData({
        title: "",
        category: "",
        description: "",
        previewImageUrl: "",
        designerName: "",
        usedTools: "",
        effects: "",
        price: "",
        process: "",
        complexityLevel: "Basic",
        tags: "",
        status: "Active"
      });
    }
    setIsDialogOpen(true);
  };

  // Check if form has changes
  const hasChanges = () => {
    if (!editingDesign || !originalData) return true;
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  };

  // Get only changed fields
  const getChangedFields = () => {
    if (!originalData) return null;
    const changes: any = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof typeof formData] !== originalData[key]) {
        const value = formData[key as keyof typeof formData];
        // Handle array fields
        if (key === "usedTools" || key === "effects" || key === "tags") {
          changes[key] = value
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean);
        } else if (key === "price") {
          changes[key] = parseFloat(value);
        } else {
          changes[key] = value;
        }
      }
    });

    return Object.keys(changes).length > 0 ? changes : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingDesign) {
        const changedFields = getChangedFields();
        if (!changedFields) {
          toast({
            title: "No Changes",
            description: "No changes detected to update",
            variant: "default"
          });
          return;
        }

        await updateDesign({
          id: editingDesign._id,
          data: changedFields
        }).unwrap();
        toast({
          title: "Success",
          description: "Design updated successfully"
        });
      } else {
        const designData = {
          title: formData.title,
          category: formData.category,
          description: formData.description,
          previewImageUrl: formData.previewImageUrl,
          designerName: formData.designerName,
          usedTools: formData.usedTools
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          effects: formData.effects
            .split(",")
            .map((e) => e.trim())
            .filter(Boolean),
          price: parseFloat(formData.price),
          process: formData.process,
          complexityLevel: formData.complexityLevel,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          status: formData.status
        };

        await createDesign(designData).unwrap();
        toast({
          title: "Success",
          description: "Design created successfully"
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this design?")) return;

    try {
      await deleteDesign(id).unwrap();
      toast({
        title: "Success",
        description: "Design deleted successfully"
      });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to delete design",
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
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Manage Designs
                  </CardTitle>
                  <CardDescription className="text-base">
                    Create, edit, and delete designs ({designs.length} total)
                  </CardDescription>
                </div>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => handleOpenDialog()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Design
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingDesign ? "Edit Design" : "Add New Design"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingDesign
                        ? "Update design information"
                        : "Create a new design"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title *</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                title: e.target.value
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) =>
                              setFormData({ ...formData, category: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((cat: any) => (
                                <SelectItem key={cat._id} value={cat._id}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Input
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value
                            })
                          }
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="designerName">Designer Name *</Label>
                          <Input
                            id="designerName"
                            value={formData.designerName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                designerName: e.target.value
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Price *</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                price: e.target.value
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="previewImageUrl">
                          Preview Image URL *
                        </Label>
                        <Input
                          id="previewImageUrl"
                          value={formData.previewImageUrl}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              previewImageUrl: e.target.value
                            })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="process">Design Process *</Label>
                        <Input
                          id="process"
                          value={formData.process}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              process: e.target.value
                            })
                          }
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="complexityLevel">Complexity *</Label>
                          <Select
                            value={formData.complexityLevel}
                            onValueChange={(value: any) =>
                              setFormData({
                                ...formData,
                                complexityLevel: value
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Basic">Basic</SelectItem>
                              <SelectItem value="Intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status *</Label>
                          <Select
                            value={formData.status}
                            onValueChange={(value: any) =>
                              setFormData({ ...formData, status: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Draft">Draft</SelectItem>
                              <SelectItem value="Archived">Archived</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="usedTools">
                          Tools Used (comma-separated) *
                        </Label>
                        <Input
                          id="usedTools"
                          value={formData.usedTools}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              usedTools: e.target.value
                            })
                          }
                          placeholder="Adobe Illustrator, Photoshop, Figma"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="effects">
                          Effects (comma-separated)
                        </Label>
                        <Input
                          id="effects"
                          value={formData.effects}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              effects: e.target.value
                            })
                          }
                          placeholder="Shadow Overlay, Gradient"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                          id="tags"
                          value={formData.tags}
                          onChange={(e) =>
                            setFormData({ ...formData, tags: e.target.value })
                          }
                          placeholder="branding, logo, minimalist"
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
                          (editingDesign && !hasChanges())
                        }
                      >
                        {(isCreating || isUpdating) && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {editingDesign ? "Update" : "Create"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {designs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No designs found. Click "Add Design" to create one.
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Designer</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {designs?.map((design: any) => (
                      <TableRow key={design._id}>
                        <TableCell>
                          <img
                            src={design.previewImageUrl}
                            alt={design.title}
                            className="w-16 h-16 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/64?text=D";
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {design.title}
                        </TableCell>
                        <TableCell>{design.designerName}</TableCell>
                        <TableCell>
                          {typeof design.category === "object"
                            ? design.category?.name
                            : design.category}
                        </TableCell>
                        <TableCell>{formatCurrency(design.price)}</TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              design.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : design.status === "Draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {design.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDialog(design)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(design._id)}
                              disabled={isDeleting}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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
