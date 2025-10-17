import { useState } from "react";
import { Link } from "react-router-dom";
import { useForgetPasswordMutation } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Shield } from "lucide-react";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Validation Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    try {
      await forgetPassword({ email }).unwrap();
      setEmailSent(true);
      toast({
        title: "Email Sent!",
        description: "Please check your inbox for password reset instructions"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error?.data?.message ||
          "Failed to send reset email. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4 py-12">
        <Card className="w-full max-w-md shadow-2xl border-purple-200 dark:border-purple-900">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50">
                <Mail className="h-16 w-16 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              We've sent password reset instructions to{" "}
              <span className="font-medium text-purple-600 dark:text-purple-400">
                {email}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              If you don't see the email, check your spam folder or try again.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 border-t border-gray-200 dark:border-gray-800 pt-6">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/50 dark:shadow-purple-900/50 transition-all duration-300"
            >
              <Link to="/login">Back to Login</Link>
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setEmailSent(false)}
            >
              Try Another Email
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay opacity-30 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-overlay opacity-30 animate-blob animation-delay-4000" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="max-w-md space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-semibold">
                  Secure Password Reset
                </span>
              </div>
              <h1 className="text-5xl font-bold leading-tight">
                We've Got You Covered
              </h1>
              <p className="text-xl text-white/90">
                Don't worry! Resetting your password is easy. Just enter your
                email and we'll send you instructions.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <div className="w-5 h-5 flex items-center justify-center font-bold">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Enter Your Email</h3>
                  <p className="text-white/80">
                    Provide your registered email address
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <div className="w-5 h-5 flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Check Your Inbox</h3>
                  <p className="text-white/80">
                    We'll send you a secure reset link
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                  <div className="w-5 h-5 flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Create New Password</h3>
                  <p className="text-white/80">Set up a new secure password</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <div className="inline-flex lg:hidden items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-6">
              <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Secure Reset
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Reset Password
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your email to receive reset instructions
            </p>
          </div>

          {/* Form Card */}
          <Card className="border-gray-200 dark:border-gray-800 shadow-lg">
            <form onSubmit={handleSubmit}>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
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
                      Sending...
                    </>
                  ) : (
                    "Send Reset Instructions"
                  )}
                </Button>
                <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                  Remember your password?{" "}
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
              🔒 Your security is our top priority
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
