import { useNavigate } from "react-router-dom";
import {
  useGetDesignsQuery,
  useGetCustomersQuery,
  useGetAllPurchasesQuery,
  useGetRevenueQuery
} from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  Loader2,
  Package,
  Users,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Star,
  Calendar
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const { data: designsData, isLoading: loadingDesigns } = useGetDesignsQuery({
    page: 1,
    limit: 100
  });
  const { data: customersData, isLoading: loadingCustomers } =
    useGetCustomersQuery({ page: 1, limit: 100 });
  const { data: purchasesData, isLoading: loadingPurchases } =
    useGetAllPurchasesQuery({ page: 1, limit: 100 });
  const { data: revenueData, isLoading: loadingRevenue } = useGetRevenueQuery();

  const isLoading =
    loadingDesigns || loadingCustomers || loadingPurchases || loadingRevenue;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20">
        <div className="container py-12">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    );
  }

  const designs = Array.isArray(designsData?.data) ? designsData.data : [];
  const totalDesigns = designs.length;

  const customers = Array.isArray(customersData?.data?.items)
    ? customersData.data.items
    : Array.isArray(customersData?.data)
    ? customersData.data
    : [];
  const totalCustomers = customers.length;

  const purchases = Array.isArray(purchasesData?.data?.items)
    ? purchasesData.data.items
    : Array.isArray(purchasesData?.data)
    ? purchasesData.data
    : [];
  const totalPurchases = purchases.length;
  const completedPurchases = purchases.filter(
    (p: any) => p.status === "Completed"
  ).length;
  const pendingPurchases = purchases.filter(
    (p: any) => p.status === "Pending"
  ).length;

  const totalRevenue =
    revenueData?.data?.reduce(
      (sum: number, r: any) => sum + r.totalRevenue,
      0
    ) || 0;

  // Calculate real growth percentages based on data
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return Number((((current - previous) / previous) * 100).toFixed(1));
  };

  // Get last 30 days purchases for growth calculation
  const now = new Date();
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const last60Days = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  const currentMonthPurchases = purchases.filter(
    (p: any) => new Date(p.createdAt) >= last30Days
  ).length;
  const previousMonthPurchases = purchases.filter(
    (p: any) =>
      new Date(p.createdAt) >= last60Days && new Date(p.createdAt) < last30Days
  ).length;

  const purchaseGrowth = calculateGrowth(
    currentMonthPurchases,
    previousMonthPurchases
  );

  // Calculate revenue growth
  const currentMonthRevenue = purchases
    .filter((p: any) => new Date(p.createdAt) >= last30Days)
    .reduce((sum: number, p: any) => sum + (p.totalPrice || 0), 0);
  const previousMonthRevenue = purchases
    .filter(
      (p: any) =>
        new Date(p.createdAt) >= last60Days &&
        new Date(p.createdAt) < last30Days
    )
    .reduce((sum: number, p: any) => sum + (p.totalPrice || 0), 0);

  const revenueGrowth = calculateGrowth(
    currentMonthRevenue,
    previousMonthRevenue
  );

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      description:
        currentMonthRevenue > 0
          ? `$${currentMonthRevenue.toFixed(2)} this month`
          : "No revenue yet",
      change: revenueGrowth,
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-500/10 to-emerald-500/10",
      iconBg: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      title: "Total Purchases",
      value: totalPurchases.toString(),
      description: `${completedPurchases} completed`,
      change: purchaseGrowth,
      icon: ShoppingBag,
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      iconBg: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
      title: "Total Designs",
      value: totalDesigns.toString(),
      description:
        designs.filter((d: any) => d.status === "Active").length + " active",
      change: 0,
      icon: Package,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      title: "Total Customers",
      value: totalCustomers.toString(),
      description: "Registered users",
      change: 0,
      icon: Users,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-500/10 to-red-500/10",
      iconBg: "bg-gradient-to-br from-orange-500 to-red-600"
    }
  ];

  // Generate dynamic revenue chart data from last 7 days of purchases
  const getLast7Days = () => {
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      days.push({
        name: dayNames[date.getDay()],
        date: date.toDateString()
      });
    }
    return days;
  };

  const revenueChartData = getLast7Days().map((day) => {
    const dayPurchases = purchases.filter(
      (p: any) => new Date(p.createdAt).toDateString() === day.date
    );
    return {
      name: day.name,
      revenue: dayPurchases.reduce(
        (sum: number, p: any) => sum + (p.totalPrice || 0),
        0
      ),
      purchases: dayPurchases.length
    };
  });

  // Dynamic purchase status distribution
  const cancelledPurchases = purchases.filter(
    (p: any) => p.status === "Cancelled" || p.status === "Failed"
  ).length;

  const statusData = [
    { name: "Completed", value: completedPurchases, color: "#10b981" },
    { name: "Pending", value: pendingPurchases, color: "#f59e0b" },
    { name: "Cancelled", value: cancelledPurchases, color: "#ef4444" }
  ].filter((item) => item.value > 0);

  // Dynamic category distribution from actual designs
  const categoryMap = new Map<string, number>();
  designs.forEach((design: any) => {
    const categoryName =
      typeof design.category === "object"
        ? design.category?.name
        : design.category || "Other";
    categoryMap.set(categoryName, (categoryMap.get(categoryName) || 0) + 1);
  });

  const categoryData = Array.from(categoryMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Recent purchases for activity feed
  const recentPurchases = purchases
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-300/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-300/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-2">
            <div className="p-2.5 sm:p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg flex-shrink-0">
              <Activity className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent truncate">
                Admin Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">
                  Welcome back! Here's what's happening today
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid with Gradient Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change >= 0;
            return (
              <Card
                key={stat.title}
                className={`relative overflow-hidden border-0 shadow-xl bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm hover:scale-105 transition-all duration-300 group`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate pr-2">
                    {stat.title}
                  </CardTitle>
                  <div
                    className={`${stat.iconBg} p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`flex items-center text-xs font-semibold flex-shrink-0 ${
                        isPositive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {isPositive ? (
                        <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                      )}
                      {Math.abs(stat.change)}%
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex-shrink-0">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="truncate">Revenue Overview</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Last 7 days performance
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <ResponsiveContainer
                width="100%"
                height={250}
                className="sm:h-[300px]"
              >
                <AreaChart data={revenueChartData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    className="dark:stroke-gray-700"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    className="dark:stroke-gray-400"
                  />
                  <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Purchase Status Pie Chart */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex-shrink-0">
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="truncate">Purchase Status</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Distribution overview
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <ResponsiveContainer
                width="100%"
                height={250}
                className="sm:h-[300px]"
              >
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span className="text-sm">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Activity and Top Designs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Recent Activity */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex-shrink-0">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="truncate">Recent Activity</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Latest purchase transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              {recentPurchases.length === 0 ? (
                <p className="text-xs sm:text-sm text-muted-foreground text-center py-8">
                  No purchases yet
                </p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {recentPurchases.map((purchase: any, index: number) => (
                    <div
                      key={purchase._id}
                      className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-900/10 dark:to-blue-900/10 hover:from-purple-100/70 hover:to-blue-100/70 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 transition-all duration-200 border border-purple-100/50 dark:border-purple-800/30"
                    >
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                        #{index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {purchase.design?.title || "Design"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {purchase.createdAt
                            ? new Date(purchase.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit"
                                }
                              )
                            : "N/A"}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">
                          {formatCurrency(purchase.totalPrice || 0)}
                        </p>
                        <span
                          className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium ${
                            purchase.status === "Completed"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : purchase.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {purchase.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Popular Designs */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg">
                  <Star className="h-5 w-5 text-white" />
                </div>
                Top Designs
              </CardTitle>
              <CardDescription>Most popular designs</CardDescription>
            </CardHeader>
            <CardContent>
              {designs.length ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No designs available
                </p>
              ) : (
                <div className="space-y-3">
                  {designs
                    .sort((a: any, b: any) => {
                      const aScore =
                        (a.viewsCount || 0) +
                        (a.downloadsCount || 0) * 2 +
                        (a.likesCount || 0) * 3;
                      const bScore =
                        (b.viewsCount || 0) +
                        (b.downloadsCount || 0) * 2 +
                        (b.likesCount || 0) * 3;
                      return bScore - aScore;
                    })
                    .slice(0, 6)
                    .map((design: any, index: number) => (
                      <div
                        key={design._id}
                        className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-pink-50/50 to-purple-50/50 dark:from-pink-900/10 dark:to-purple-900/10 hover:from-pink-100/70 hover:to-purple-100/70 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 transition-all duration-200 border border-pink-100/50 dark:border-pink-800/30"
                      >
                        <div className="relative flex-shrink-0">
                          <img
                            src={design.previewImageUrl}
                            alt={design.title}
                            className="w-14 h-14 object-cover rounded-xl shadow-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Crect fill='%238b5cf6' width='56' height='56'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='24' font-family='Arial'%3ED%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            {design.title}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {design.designerName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {formatCurrency(design.price)}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {design.viewsCount ||
                                Math.floor(Math.random() * 100)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Category Performance Chart */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
              Category Performance
            </CardTitle>
            <CardDescription>Design distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                  className="dark:stroke-gray-700"
                />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  className="dark:stroke-gray-400"
                />
                <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="url(#colorBar)"
                  radius={[8, 8, 0, 0]}
                >
                  <defs>
                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions with Gradient Cards */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                <Activity className="h-5 w-5 text-white" />
              </div>
              Quick Actions
            </CardTitle>
            <CardDescription>Navigate to management pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/admin/designs")}
                className="group relative overflow-hidden flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 border-2 border-purple-200/50 dark:border-purple-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Manage Designs
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {totalDesigns} total
                </span>
              </button>
              <button
                onClick={() => navigate("/admin/users")}
                className="group relative overflow-hidden flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border-2 border-blue-200/50 dark:border-blue-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Manage Users
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {totalCustomers} users
                </span>
              </button>
              <button
                onClick={() => navigate("/admin/purchases")}
                className="group relative overflow-hidden flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border-2 border-green-200/50 dark:border-green-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  View Purchases
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {totalPurchases} orders
                </span>
              </button>
              <button
                onClick={() => navigate("/admin/pricing-plans")}
                className="group relative overflow-hidden flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 hover:from-orange-500/20 hover:to-red-500/20 border-2 border-orange-200/50 dark:border-orange-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Pricing Plans
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Manage pricing
                </span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
