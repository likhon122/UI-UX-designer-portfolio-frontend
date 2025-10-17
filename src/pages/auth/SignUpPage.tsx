import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Eye, EyeOff, Shield, Sparkles } from "lucide-react";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signUp, { isLoading }] = useSignUpMutation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...submitData } = formData;
      await signUp(submitData).unwrap();

      toast({
        title: "Success!",
        description: "Please check your email to verify your account"
      });

      // Clear form only on success
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: ""
      });

      // Redirect to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      // Keep form data on error - do NOT clear fields
      toast({
        title: "Sign Up Failed",
        description: error?.data?.message || "An error occurred during sign up",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-400 rounded-full mix-blend-overlay opacity-30 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay opacity-30 animate-blob animation-delay-4000" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="max-w-md space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-semibold">
                  Join Our Community
                </span>
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                Start Your Creative Journey Today
              </h1>
              <p className="text-xl text-white/90">
                Create your account and unlock access to thousands of premium
                UI/UX designs.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">100% Secure</h3>
                  <p className="text-white/80">
                    Your information is safe with us
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Instant Access</h3>
                  <p className="text-white/80">
                    Start browsing premium content immediately
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="pt-8 border-t border-white/20">
              <p className="text-white/80 mb-4">
                Trusted by creative professionals
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-white/30 border-2 border-white backdrop-blur-sm"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">10,000+</div>
                  <div className="text-white/80">Happy Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-950 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 py-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <div className="inline-flex lg:hidden items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 mb-6">
              <Sparkles className="h-4 w-4 text-pink-600 dark:text-pink-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
                Join Our Community
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign up to start your creative journey
            </p>
          </div>

          {/* Form Card */}
          <Card className="border-gray-200 dark:border-gray-800 shadow-lg">
            <form onSubmit={handleSubmit}>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="pr-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Minimum 6 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pr-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Phone Number{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Address{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      (Optional)
                    </span>
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City, Country"
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-purple-500 dark:focus:border-purple-500 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t border-gray-200 dark:border-gray-800 pt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/50 dark:shadow-purple-900/50 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span>Your data is secure with us</span>
                </div>

                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                  >
                    Sign in here
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>

          {/* Trust Signal */}
          <div className="text-center lg:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              🔒 Join thousands of creators worldwide
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
