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
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Target,
  Users,
  Award,
  TrendingUp,
  Heart,
  Zap,
  Shield,
  Palette,
  Lightbulb,
  Rocket,
  Mail,
  CheckCircle2,
  Star,
  Globe,
  Clock,
  MessageSquare
} from "lucide-react";

export default function AboutPage() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Happy Customers",
      color: "text-purple-600"
    },
    {
      icon: Palette,
      value: "1000+",
      label: "Design Assets",
      color: "text-blue-600"
    },
    {
      icon: Globe,
      value: "120+",
      label: "Countries Served",
      color: "text-pink-600"
    },
    {
      icon: Award,
      value: "98%",
      label: "Satisfaction Rate",
      color: "text-green-600"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "Empowering designers and developers worldwide with premium UI/UX resources that inspire creativity and accelerate project delivery.",
      color: "purple"
    },
    {
      icon: Heart,
      title: "Customer-Centric",
      description:
        "Every design decision we make puts our customers first. Your success is our success, and we're committed to your satisfaction.",
      color: "pink"
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description:
        "We stay ahead of design trends, continuously innovating to bring you the latest and most cutting-edge UI/UX solutions.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description:
        "Every design undergoes rigorous quality checks. We guarantee professional-grade assets that meet the highest industry standards.",
      color: "green"
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "15+ years in UI/UX design with a passion for creating beautiful digital experiences.",
      social: { twitter: "#", linkedin: "#" }
    },
    {
      name: "Michael Chen",
      role: "Lead Designer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Award-winning designer specializing in modern, user-centric interfaces.",
      social: { twitter: "#", linkedin: "#" }
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Product strategist with a focus on creating impactful design solutions.",
      social: { twitter: "#", linkedin: "#" }
    },
    {
      name: "David Kim",
      role: "Chief Technology Officer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Tech innovator ensuring seamless delivery of our design assets.",
      social: { twitter: "#", linkedin: "#" }
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "Started with a vision to democratize premium design"
    },
    {
      year: "2019",
      title: "1K+ Customers",
      description: "Reached our first thousand happy customers"
    },
    {
      year: "2021",
      title: "Global Expansion",
      description: "Expanded operations to serve 100+ countries"
    },
    {
      year: "2023",
      title: "10K+ Designs",
      description: "Released over 10,000 premium design assets"
    },
    {
      year: "2025",
      title: "50K+ Community",
      description: "Built a thriving community of designers and developers"
    }
  ];

  const features = [
    { icon: Zap, label: "Lightning Fast Delivery" },
    { icon: Shield, label: "Secure Transactions" },
    { icon: Award, label: "Premium Quality" },
    { icon: Users, label: "Expert Support" },
    { icon: Clock, label: "Regular Updates" },
    { icon: MessageSquare, label: "Active Community" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-500 to-blue-500 border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              About UI/UX Studio
            </Badge>

            <h1 className="text-5xl md:text-7xl font-extrabold pb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Crafting Digital Experiences That Inspire
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
              We're a passionate team of designers and developers dedicated to
              creating world-class UI/UX designs that empower creators
              worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/designs">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Explore Our Work
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold border-2"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>

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
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
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

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-b from-background to-purple-50/30 dark:to-gray-900/50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                <Target className="w-4 h-4 mr-2" />
                Our Story
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Building the Future of
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Digital Design
                </span>
              </h2>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <Card className="border-2 shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <p className="text-lg leading-relaxed mb-6">
                    Founded in 2018, <strong>UI/UX Studio</strong> began with a
                    simple yet powerful vision: to make professional-grade
                    design resources accessible to creators worldwide. What
                    started as a small collection of UI components has grown
                    into a comprehensive design marketplace serving over 50,000
                    customers across 120+ countries.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Our journey has been fueled by an unwavering commitment to
                    quality, innovation, and customer satisfaction. Every design
                    asset we create is meticulously crafted by our team of
                    experienced designers who understand the challenges faced by
                    modern digital creators.
                  </p>
                  <p className="text-lg leading-relaxed mb-6">
                    Today, we're proud to be a trusted partner for designers,
                    developers, and businesses looking to elevate their digital
                    presence. Our platform offers everything from complete UI
                    kits to individual components, all designed with modern best
                    practices and the latest design trends in mind.
                  </p>
                  <p className="text-lg leading-relaxed">
                    As we continue to grow, our mission remains unchanged: to
                    empower creators with the tools they need to bring their
                    visions to life, faster and more beautifully than ever
                    before.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              <Heart className="w-4 h-4 mr-2" />
              Our Values
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core values guide every decision we make and every design we
              create
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-2 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300 hover:shadow-xl group"
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${value.color}-500/10 to-${value.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}
                ></div>
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${value.color}-100 to-${value.color}-200 dark:from-${value.color}-900/30 dark:to-${value.color}-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon
                      className={`w-7 h-7 text-${value.color}-600 dark:text-${value.color}-400`}
                    />
                  </div>
                  <CardTitle className="text-2xl mb-2">{value.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-b from-background to-blue-50/30 dark:to-gray-900/50">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              <TrendingUp className="w-4 h-4 mr-2" />
              Our Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Milestones That
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Define Our Growth
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-blue-600 to-pink-600"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full border-4 border-background transform -translate-x-1/2 z-10"></div>

                  {/* Content */}
                  <div
                    className={`ml-16 md:ml-0 md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <Card className="border-2 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
                            {milestone.year}
                          </Badge>
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        </div>
                        <CardTitle className="text-xl">
                          {milestone.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {milestone.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">
              <Users className="w-4 h-4 mr-2" />
              Our Team
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet the People Behind
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                the Magic
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Talented individuals united by a passion for exceptional design
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="overflow-hidden border-2 hover:border-purple-200 dark:hover:border-purple-800 transition-all hover:shadow-xl group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge className="w-fit bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 border-0">
                    {member.role}
                  </Badge>
                  <CardDescription className="text-sm mt-2 leading-relaxed">
                    {member.bio}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-background to-purple-50/30 dark:to-gray-900/50">
        <div className="container">
          <Card className="relative overflow-hidden border-2 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-blue-600/5 to-pink-600/5"></div>
            <CardContent className="relative z-10 p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full mb-6">
                  <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                    Stay Connected
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Get the Latest Designs & Updates
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter and be the first to know about new
                  releases, exclusive offers, design tips, and special
                  promotions.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 h-12 border-2"
                  />
                  <Button
                    size="lg"
                    className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Subscribe
                  </Button>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Weekly design tips</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Exclusive offers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Unsubscribe anytime</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full mb-3">
                  <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-sm font-medium">{feature.label}</p>
              </div>
            ))}
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
              Ready to Start Your Design Journey?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-purple-100">
              Join thousands of designers and developers who trust UI/UX Studio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/designs">
                <Button
                  size="lg"
                  className="px-10 py-7 text-lg font-semibold bg-white text-purple-600 hover:bg-gray-100 shadow-2xl"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Browse Designs
                </Button>
              </Link>
              <Link to="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-10 py-7 text-lg font-semibold border-2 border-white text-white hover:bg-white/10"
                >
                  <Star className="w-5 h-5 mr-2" />
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
