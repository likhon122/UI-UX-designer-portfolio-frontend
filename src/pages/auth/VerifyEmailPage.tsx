import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useRegisterUserMutation } from "@/services/api";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authStateSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [registerUser] = useRegisterUserMutation();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async (token: string) => {
      try {
        const response = await registerUser({ token }).unwrap();
        setStatus("success");
        setMessage("Your email has been verified successfully!");

        // Update Redux state
        if (response.data.accessToken) {
          dispatch(
            setCredentials({
              user: response.data.user,
              accessToken: response.data.accessToken
            })
          );
        }

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error?.data?.message ||
            "Email verification failed. The link may be invalid or expired."
        );
      }
    };

    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. No token provided.");
      return;
    }

    verifyEmail(token);
  }, [searchParams, registerUser, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl border-purple-200 dark:border-purple-900">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
            Email Verification
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {status === "verifying" && "Verifying your email..."}
            {status === "success" && "Verification Successful"}
            {status === "error" && "Verification Failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 py-8">
          {status === "verifying" && (
            <>
              <div className="p-4 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50">
                <Loader2 className="h-16 w-16 animate-spin text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-center text-gray-600 dark:text-gray-400">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="p-4 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-center font-medium text-gray-900 dark:text-gray-100">
                {message}
              </p>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Redirecting you to your dashboard...
              </p>
            </>
          )}

          {status === "error" && (
            <>
              <div className="p-4 rounded-full bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/50 dark:to-orange-900/50">
                <XCircle className="h-16 w-16 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-center font-medium text-red-600 dark:text-red-400">
                {message}
              </p>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-200 dark:border-gray-800 pt-6">
          {status === "error" && (
            <div className="flex flex-col space-y-2 w-full">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/50 dark:shadow-purple-900/50 transition-all duration-300"
              >
                <Link to="/login">Go to Login</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Link to="/signup">Sign Up Again</Link>
              </Button>
            </div>
          )}
          {status === "success" && (
            <Button
              asChild
              className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/50 dark:shadow-purple-900/50 transition-all duration-300"
            >
              <Link to="/profile">Go to Dashboard</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
