import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout as logoutAction } from "@/store/slices/authStateSlice";
import { useLogoutMutation } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Moon,
  Sun,
  Sparkles,
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ShoppingBag,
  MessageSquare
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Navbar() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [logout] = useLogoutMutation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(logoutAction());
      toast({
        title: "Logged out successfully",
        description: "Come back soon!"
      });
      navigate("/");
      setMobileMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { to: "/designs", label: "Designs", icon: ShoppingBag },
    { to: "/pricing", label: "Pricing", icon: Sparkles },
    { to: "/about", label: "About", icon: Sparkles },
    { to: "/contact", label: "Contact", icon: MessageSquare }
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm">
      {/* Top Bar with Gradient Border */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600"></div>

      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-2 group flex-shrink-0"
          >
            <div className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                UI/UX Studio
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">
                Premium Designs
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                <Button
                  variant={isActivePath(link.to) ? "default" : "ghost"}
                  size="sm"
                  className={`gap-2 ${
                    isActivePath(link.to)
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "hover:bg-purple-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative overflow-hidden group h-8 w-8 sm:h-10 sm:w-10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              {theme === "dark" ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              )}
            </Button>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  {/* User Badge */}
                  <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 border-0 px-2 sm:px-3 py-1 text-xs sm:text-sm max-w-[120px] xl:max-w-none truncate">
                    <User className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">
                      {user?.name || user?.email?.split("@")[0]}
                    </span>
                  </Badge>

                  {/* Profile Button */}
                  <Link to="/customer/profile">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden xl:inline">Profile</span>
                    </Button>
                  </Link>

                  {/* Admin Dashboard Button */}
                  {user?.role !== "customer" && (
                    <Link to="/admin/dashboard">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span className="hidden xl:inline">Dashboard</span>
                      </Button>
                    </Link>
                  )}

                  {/* Logout Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden xl:inline">Logout</span>
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-2"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      size="sm"
                      className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span className="hidden xl:inline">Sign Up Free</span>
                      <span className="xl:hidden">Sign Up</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4 space-y-2 animate-in slide-in-from-top px-2 sm:px-4">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant={isActivePath(link.to) ? "default" : "ghost"}
                  className={`w-full justify-start gap-2 h-11 sm:h-10 ${
                    isActivePath(link.to)
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : ""
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Button>
              </Link>
            ))}

            <div className="pt-4 border-t space-y-2">
              {isAuthenticated ? (
                <>
                  {/* User Info */}
                  <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                    <p className="text-sm font-semibold truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    to="/customer/profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 h-11 sm:h-10"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                  </Link>

                  {user?.role !== "customer" && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 h-11 sm:h-10"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 h-11 sm:h-10 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="gap-2 flex flex-col sm:flex-row">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full h-11 sm:h-10">
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1"
                  >
                    <Button className="w-full h-11 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Sign Up Free
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
