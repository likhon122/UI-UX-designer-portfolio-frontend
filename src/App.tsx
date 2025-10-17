import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import { Toaster } from "./components/ui/toaster";

// Layouts
import PublicLayout from "./components/layout/PublicLayout";
import DashboardLayout from "./components/layout/DashboardLayout";

// Public Pages
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import DesignsPage from "./pages/public/DesignsPage";
import DesignDetailPage from "./pages/public/DesignDetailPage";
import PricingPage from "./pages/public/PricingPage";
import ContactPage from "./pages/public/ContactPage";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

// Customer Pages
import ProfilePage from "./pages/customer/ProfilePage";
import MyPurchasesPage from "./pages/customer/MyPurchasesPage";
import CheckoutPage from "./pages/customer/CheckoutPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageDesignsPage from "./pages/admin/ManageDesignsPage";
import ManageCategoriesPage from "./pages/admin/ManageCategoriesPage";
import ManagePricingPlansPage from "./pages/admin/ManagePricingPlansPage";
import ManagePurchasesPage from "./pages/admin/ManagePurchasesPage";
import ManageReviewsPage from "./pages/admin/ManageReviewsPage";
import ManageUsersPage from "./pages/admin/ManageUsersPage";
import ManageAdminsPage from "./pages/admin/ManageAdminsPage";

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/designs" element={<DesignsPage />} />
          <Route path="/designs/:id" element={<DesignDetailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Auth Routes - Now with Navbar and Footer */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/email-verify" element={<VerifyEmailPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Customer Protected Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/customer/profile" element={<ProfilePage />} />
          <Route path="/customer/my-purchases" element={<MyPurchasesPage />} />
        </Route>

        {/* Checkout route - accessible to authenticated users */}
        <Route
          element={
            <ProtectedRoute>
              <PublicLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/checkout/:id" element={<CheckoutPage />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["admin", "superAdmin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/designs" element={<ManageDesignsPage />} />
          <Route path="/admin/categories" element={<ManageCategoriesPage />} />
          <Route
            path="/admin/pricing-plans"
            element={<ManagePricingPlansPage />}
          />
          <Route path="/admin/purchases" element={<ManagePurchasesPage />} />
          <Route path="/admin/reviews" element={<ManageReviewsPage />} />
          <Route path="/admin/users" element={<ManageUsersPage />} />
        </Route>

        {/* SuperAdmin Only Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["superAdmin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/admins" element={<ManageAdminsPage />} />
        </Route>

        {/* 404 Not Found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
