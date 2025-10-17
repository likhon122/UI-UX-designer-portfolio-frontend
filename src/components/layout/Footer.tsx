import { Link } from "react-router-dom";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Github,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Designs", href: "/designs" },
      { label: "Pricing", href: "/pricing" },
      { label: "Categories", href: "/designs" },
      { label: "New Releases", href: "/designs" }
    ],
    company: [
      { label: "About Us", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Press Kit", href: "/" }
    ],
    support: [
      { label: "Help Center", href: "/" },
      { label: "Contact Us", href: "/" },
      { label: "FAQ", href: "/" },
      { label: "Refund Policy", href: "/" }
    ],
    legal: [
      { label: "Terms of Service", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Cookie Policy", href: "/" },
      { label: "License", href: "/" }
    ]
  };

  const socialLinks = [
    {
      icon: Twitter,
      href: "https://x.com/MDLikhon694258",
      label: "Twitter",
      color: "hover:text-blue-400"
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/mdlikhon.islam.3975012",
      label: "Facebook",
      color: "hover:text-blue-600"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/imd.likhon/",
      label: "Instagram",
      color: "hover:text-pink-500"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/likhon-islam-919438255/",
      label: "LinkedIn",
      color: "hover:text-blue-700"
    },
    {
      icon: Github,
      href: "#",
      label: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-gray-100"
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-purple-50/30 dark:to-gray-900/50 border-t">
      {/* Main Footer Content */}
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  UI/UX Studio
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Premium UI/UX design marketplace. Transform your vision into
              stunning digital experiences with our professional-grade
              templates.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <a
                  href="mailto:md.likhonislam2x@gmail.com"
                  className="hover:text-purple-600 transition-colors"
                >
                  md.likhonislam2x@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span>+880 1622422800</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                  <MapPin className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                </div>
                <span>Dhaka Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full"></div>
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"></div>
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-pink-600 dark:hover:text-pink-400 transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-full"></div>
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Bottom Bar */}
        <div className="mt-16 pt-8 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full hover:scale-110 transition-all ${social.color}`}
                  >
                    <social.icon className="h-4 w-4" />
                  </Button>
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                © {currentYear} ALL RIGHTS RESERVED UI/UX Studio
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Secure
              </div>
              <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                SSL Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600"></div>
    </footer>
  );
}
