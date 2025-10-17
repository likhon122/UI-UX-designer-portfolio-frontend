import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Palette,
  FolderOpen,
  DollarSign,
  ShoppingCart,
  Star,
  Users,
  UserCog,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const isAdmin = user?.role === "admin" || user?.role === "superAdmin";
  const isSuperAdmin = user?.role === "superAdmin";

  const customerLinks = [
    { to: "/customer/profile", icon: Users, label: "Profile" },
    { to: "/customer/my-purchases", icon: ShoppingCart, label: "My Purchases" }
  ];

  const adminLinks = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/designs", icon: Palette, label: "Designs" },
    { to: "/admin/categories", icon: FolderOpen, label: "Categories" },
    { to: "/admin/pricing-plans", icon: DollarSign, label: "Pricing Plans" },
    { to: "/admin/purchases", icon: ShoppingCart, label: "Purchases" },
    { to: "/admin/reviews", icon: Star, label: "Reviews" },
    { to: "/admin/users", icon: Users, label: "Users" }
  ];

  const superAdminLinks = [
    { to: "/admin/admins", icon: UserCog, label: "Manage Admins" }
  ];

  const links = isAdmin
    ? [...adminLinks, ...(isSuperAdmin ? superAdminLinks : [])]
    : customerLinks;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-20 left-4 z-50 lg:hidden bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-800"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-16 left-0 z-40 w-64 border-r bg-background min-h-[calc(100vh-4rem)] p-4 transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
