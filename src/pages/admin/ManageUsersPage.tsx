import { useGetCustomersQuery } from "@/services/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  UserCheck
} from "lucide-react";
import { useState } from "react";

export default function ManageUsersPage() {
  const { data, isLoading } = useGetCustomersQuery({ page: 1, limit: 100 });
  const [searchTerm, setSearchTerm] = useState("");

  const customers = Array.isArray(data?.data?.items)
    ? data.data.items
    : Array.isArray(data?.data)
    ? data.data
    : [];

  const filteredCustomers = customers.filter(
    (customer: any) =>
      customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm)
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20">
      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Manage Users
                  </CardTitle>
                  <CardDescription className="text-base">
                    View and manage all registered customers (
                    {filteredCustomers.length} total)
                  </CardDescription>
                </div>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full mb-4">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {searchTerm ? "No users found" : "No users yet"}
                </p>
                <p className="text-muted-foreground">
                  {searchTerm
                    ? "Try adjusting your search"
                    : "Users will appear here once they register"}
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20 hover:from-purple-100/50 hover:to-blue-100/50 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30">
                      <TableHead className="font-bold text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4" />
                          Name
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-gray-900 dark:text-white">
                        Role
                      </TableHead>
                      <TableHead className="font-bold text-gray-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Joined
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer: any) => (
                      <TableRow
                        key={customer._id || customer.id}
                        className="hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-blue-50/30 dark:hover:from-purple-900/10 dark:hover:to-blue-900/10 transition-all duration-200"
                      >
                        <TableCell className="font-semibold text-gray-900 dark:text-white">
                          {customer.name || "N/A"}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {customer.email || "N/A"}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {customer.phone || "N/A"}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                            {customer.role || "customer"}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {customer.createdAt
                            ? new Date(customer.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric"
                                }
                              )
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
