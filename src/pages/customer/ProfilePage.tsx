import { useState, useEffect } from "react";
import { useGetCurrentUserQuery, useUpdateUserMutation } from "@/services/api";
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
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  DollarSign,
  Edit,
  Save,
  CheckCircle,
  Sparkles,
  Crown
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { data, isLoading } = useGetCurrentUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { toast } = useToast();

  console.log(data);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profileImage: ""
  });

  useEffect(() => {
    if (data?.data) {
      const { user, customer } = data.data;
      setFormData({
        name: customer?.name || "",
        email: user?.email || "",
        phone: customer?.phone || "",
        address: customer?.address || "",
        profileImage: customer?.profileImage || ""
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = data?.data?.user?._id;

    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found",
        variant: "destructive"
      });
      return;
    }

    try {
      await updateUser({
        id: userId,
        ...formData
      }).unwrap();

      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to update profile",
        variant: "destructive"
      });
    }
  };

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
                Loading your profile...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userData = data?.data?.user;
  const customerData = data?.data?.customer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container px-4  py-6 sm:py-8 lg:py-12 relative">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-2">
            <div className="p-2.5 sm:p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl sm:rounded-2xl shadow-lg">
              <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                My Profile
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                Manage your account settings and preferences
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Profile Summary Card */}
          <div className="space-y-4 sm:space-y-6 lg:col-span-1">
            {/* Profile Summary Card */}
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-200 dark:border-purple-900 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-gray-100">
                  Profile Summary
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center px-4 sm:px-0">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 flex items-center justify-center ring-4 ring-purple-200 dark:ring-purple-900 shadow-xl">
                      {formData.profileImage ? (
                        <img
                          src={formData.profileImage}
                          alt={formData.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          {formData.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 p-1.5 sm:p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg">
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 text-center break-words max-w-full">
                    {customerData?.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3 text-center break-all max-w-full px-2">
                    {userData?.email}
                  </p>

                  <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg">
                    <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="text-xs sm:text-sm font-semibold capitalize">
                      {userData?.role}
                    </span>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 border-t border-purple-200 dark:border-purple-900">
                  <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex-shrink-0">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Member Since
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {userData?.createdAt
                            ? new Date(userData.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric"
                                }
                              )
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex-shrink-0">
                        <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Membership
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {customerData?.membership || "Free"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="p-1.5 sm:p-2 bg-green-100 dark:bg-green-900/50 rounded-lg flex-shrink-0">
                        <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Total Spent
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                          ${customerData?.totalSpent || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 sm:pt-6 border-t border-purple-200 dark:border-purple-900">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Quick Actions
                  </p>
                  <Link to={"/designs"} className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm sm:text-base border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      View Designs
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Edit Profile Form */}
          <Card className="lg:col-span-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-purple-200 dark:border-purple-900 shadow-2xl">
            {/* Edit Profile Form */}
            <CardHeader>
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2 sm:p-2 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-lg flex-shrink-0">
                  <Edit className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
                    Edit Profile
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Update your account information
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center gap-2"
                    >
                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="text-sm sm:text-base border-purple-200 dark:border-purple-900 focus:border-purple-600 dark:focus:border-purple-400 bg-white dark:bg-gray-950"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center gap-2"
                    >
                      <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled
                      className="text-sm sm:text-base bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      Email cannot be changed for security
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center gap-2"
                    >
                      <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="text-sm sm:text-base border-purple-200 dark:border-purple-900 focus:border-purple-600 dark:focus:border-purple-400 bg-white dark:bg-gray-950"
                    />
                  </div>

                  {/* Profile Image URL */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="profileImage"
                      className="text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center gap-2"
                    >
                      <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400" />
                      Profile Image URL
                    </Label>
                    <Input
                      id="profileImage"
                      name="profileImage"
                      value={formData.profileImage}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="text-sm sm:text-base border-purple-200 dark:border-purple-900 focus:border-purple-600 dark:focus:border-purple-400 bg-white dark:bg-gray-950"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="address"
                      className="text-sm sm:text-base text-gray-900 dark:text-gray-100 flex items-center gap-2"
                    >
                      <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your full address"
                      className="text-sm sm:text-base border-purple-200 dark:border-purple-900 focus:border-purple-600 dark:focus:border-purple-400 bg-white dark:bg-gray-950"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-6 border-t border-purple-200 dark:border-purple-900">
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 text-sm sm:text-base border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    onClick={() => {
                      if (data?.data) {
                        const { user, customer } = data.data;
                        setFormData({
                          name: customer?.name || "",
                          email: user?.email || "",
                          phone: customer?.phone || "",
                          address: customer?.address || "",
                          profileImage: customer?.profileImage || ""
                        });
                      }
                    }}
                  >
                    Reset Changes
                  </Button>
                </div>

                {/* Success Message */}
                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-900 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900 dark:text-green-100">
                      Profile Security
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      Your profile information is encrypted and securely stored.
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
