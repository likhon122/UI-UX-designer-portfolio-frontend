import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Zap,
  Shield,
  Download,
  Palette,
  Layers,
  Star,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Users,
  Award,
  Rocket
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Palette,
      title: "Premium Quality",
      description:
        "Handcrafted designs by award-winning UI/UX designers with years of experience",
      color: "text-purple-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Instant download and seamless integration into your workflow and projects",
      color: "text-yellow-500"
    },
    {
      icon: Shield,
      title: "Secure & Licensed",
      description:
        "Commercial license included with every purchase for worry-free usage",
      color: "text-green-500"
    },
    {
      icon: Layers,
      title: "Fully Layered",
      description:
        "Organized layers and components ready to customize for your brand",
      color: "text-blue-500"
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description:
        "Available in Figma, Sketch, Adobe XD, and more popular formats",
      color: "text-pink-500"
    },
    {
      icon: Users,
      title: "Expert Support",
      description:
        "24/7 dedicated customer support to help you with any questions",
      color: "text-indigo-500"
    }
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Layers, value: "1000+", label: "UI Components" },
    { icon: Award, value: "98%", label: "Satisfaction Rate" },
    { icon: Download, value: "100K+", label: "Downloads" }
  ];

  const benefits = [
    "Lifetime access to all purchased designs",
    "Free updates and new versions",
    "Commercial license included",
    "Dedicated customer support",
    "Money-back guarantee",
    "Regular new design releases"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative z-10 py-20 md:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <Badge className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-500 to-blue-500 border-0">
                <Sparkles className="w-4 h-4 mr-2" />
                #1 UI/UX Design Marketplace
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold pb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Transform Your Vision Into
              <br />
              Stunning Digital Experiences
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Access 1000+ premium UI/UX designs crafted by industry experts.
              Elevate your projects with professional-grade templates and
              components.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/designs">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Explore Designs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold border-2 hover:bg-purple-50 dark:hover:bg-gray-800"
                >
                  <Star className="w-5 h-5 mr-2" />
                  View Pricing Plans
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>30-days Instance Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Commercial license</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 md:h-24 fill-background"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl">
                    <stat.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-purple-50/30 dark:to-gray-900/50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
              <TrendingUp className="w-4 h-4 mr-2" />
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Create Amazing Designs
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Premium features designed to accelerate your workflow and deliver
              exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-2 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-2xl mb-2">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                <Award className="w-4 h-4 mr-2" />
                Premium Benefits
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Invest in Quality,
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Grow Your Business
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join thousands of satisfied customers who have transformed their
                projects with our premium designs. Get instant access to
                professional-grade templates and unlock your creative potential.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
              <Card className="relative border-2 shadow-2xl">
                <CardHeader className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-white/20 backdrop-blur-sm border-white/30">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Most Popular
                    </Badge>
                    <span className="text-4xl font-bold">Pro Plan</span>
                  </div>
                  <CardTitle className="text-5xl font-bold mb-2">
                    $25.00<span className="text-2xl font-normal">/month</span>
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    Everything you need to create stunning designs
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <ul className="space-y-4 mb-8">
                    {[
                      "One time downloads",
                      "All premium templates",
                      "Priority support",
                      "Commercial license",
                      "Lifetime updates",
                      "Team collaboration"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/designs" className="block">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg font-semibold shadow-lg"
                    >
                      Choose Your Design
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Elevate Your Design Game?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-purple-100">
              Join 50,000+ designers and developers who trust our platform for
              their design needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/designs">
                <Button
                  size="lg"
                  className="px-10 py-7 text-lg font-semibold bg-white text-purple-600 hover:bg-gray-100 shadow-2xl"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Creating Today
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-7 text-lg font-semibold border-2 border-white text-purple-600 dark:text-white hover:bg-white/10"
                >
                  View All Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
