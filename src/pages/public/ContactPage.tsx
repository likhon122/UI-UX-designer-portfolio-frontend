import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  CheckCircle2,
  Zap,
  HeadphonesIcon,
  Globe
} from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully! 🎉",
        description: "We'll get back to you within 24 hours."
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@uiuxstudio.com",
      link: "mailto:support@uiuxstudio.com",
      color: "from-purple-600 to-purple-700"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Design Street, Creative City, CA 90210",
      link: "https://maps.google.com",
      color: "from-pink-600 to-pink-700"
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon-Fri: 9AM - 6PM PST",
      link: null,
      color: "from-green-600 to-green-700"
    }
  ];

  const socialLinks = [
    {
      icon: Facebook,
      url: "#",
      name: "Facebook",
      color: "hover:text-blue-600"
    },
    { icon: Twitter, url: "#", name: "Twitter", color: "hover:text-sky-500" },
    {
      icon: Instagram,
      url: "#",
      name: "Instagram",
      color: "hover:text-pink-600"
    },
    {
      icon: Linkedin,
      url: "#",
      name: "LinkedIn",
      color: "hover:text-blue-700"
    },
    {
      icon: Github,
      url: "#",
      name: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-white"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast Response",
      description: "We typically respond within 2-4 hours during business hours"
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description:
        "Our support team is available around the clock for urgent matters"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Serving clients worldwide with localized support"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-purple-100 dark:border-purple-900/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-blue-600/5 to-pink-600/5"></div>
        <div className="container relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 px-4 sm:px-6 py-2 sm:py-2.5">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
              <span className="text-xs sm:text-sm font-semibold text-purple-700 dark:text-purple-300">
                Get In Touch
              </span>
            </div>

            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 dark:from-purple-400 dark:via-blue-400 dark:to-pink-400 bg-clip-text text-transparent">
                Let's Create
              </span>
              <br />
              Something Amazing Together
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Have a question, feedback, or a project in mind? We'd love to hear
              from you. Our team is here to help bring your vision to life.
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Features Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700"
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 p-3">
                    <feature.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="border-purple-200 dark:border-purple-900/50 bg-white dark:bg-gray-900 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl flex items-center gap-2 sm:gap-3 text-gray-900 dark:text-gray-100">
                  <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-purple-600 dark:text-purple-400" />
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Fill out the form below and we'll respond as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm sm:text-base font-medium"
                      >
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-10 sm:h-11 border-purple-200 dark:border-purple-800 focus:border-purple-500 dark:focus:border-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm sm:text-base font-medium"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-10 sm:h-11 border-purple-200 dark:border-purple-800 focus:border-purple-500 dark:focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subject"
                      className="text-sm sm:text-base font-medium"
                    >
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-10 sm:h-11 border-purple-200 dark:border-purple-800 focus:border-purple-500 dark:focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm sm:text-base font-medium"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="resize-none border-purple-200 dark:border-purple-800 focus:border-purple-500 dark:focus:border-purple-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all text-base sm:text-lg font-semibold h-11 sm:h-12"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className="text-xs sm:text-sm text-center text-gray-500 dark:text-gray-400">
                    By submitting this form, you agree to our{" "}
                    <a
                      href="#"
                      className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  onClick={() => info.link && window.open(info.link, "_blank")}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className={`rounded-lg bg-gradient-to-br ${info.color} p-2.5 sm:p-3 shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <info.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm sm:text-base">
                          {info.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">
                          {info.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Media */}
            <Card className="border-purple-100 dark:border-purple-900/50 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/50 dark:to-blue-950/50">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
                  Follow Us
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Stay connected on social media
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-800 text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:shadow-lg hover:scale-110`}
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="border-purple-200 dark:border-purple-900/50 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-green-500 dark:bg-green-600 p-1.5">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm sm:text-base">
                        Trusted by 50,000+ Clients
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Join thousands of satisfied customers who trust us for
                        premium UI/UX designs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-green-500 dark:bg-green-600 p-1.5">
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm sm:text-base">
                        Award-Winning Support
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Our dedicated support team has won multiple industry
                        awards for excellence
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ or Additional Info Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4 sm:px-0">
              Quick answers to common questions about our services
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                q: "What's your response time?",
                a: "We typically respond within 2-4 hours during business hours and within 24 hours for all inquiries."
              },
              {
                q: "Do you offer custom designs?",
                a: "Yes! We specialize in creating custom UI/UX designs tailored to your specific needs and brand identity."
              },
              {
                q: "What file formats do you provide?",
                a: "We provide all source files including Figma, Sketch, Adobe XD, PSD, and exported assets in various formats."
              },
              {
                q: "Is there a refund policy?",
                a: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with your purchase."
              },
              {
                q: "Do you provide support?",
                a: "Absolutely! We offer lifetime support for all our designs, including updates and technical assistance."
              },
              {
                q: "Can I request modifications?",
                a: "Yes, we offer free revisions on custom projects and support for purchased designs to ensure your satisfaction."
              }
            ].map((faq, index) => (
              <Card
                key={index}
                className="border-purple-100 dark:border-purple-900/50 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg text-gray-900 dark:text-gray-100">
                    {faq.q}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
