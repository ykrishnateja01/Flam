
import React, { useMemo } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import { useBookmarks } from '@/hooks/useBookmarks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Analytics = () => {
  const { employees, loading, error } = useEmployees();
  const { bookmarks } = useBookmarks();

  const analyticsData = useMemo(() => {
    if (!employees.length) return null;

    // Department-wise average ratings
    const departmentRatings = employees.reduce((acc, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = { total: 0, count: 0, employees: [] };
      }
      acc[emp.department].total += emp.rating;
      acc[emp.department].count += 1;
      acc[emp.department].employees.push(emp);
      return acc;
    }, {});

    const departmentData = Object.entries(departmentRatings).map(([dept, data]) => ({
      department: dept,
      averageRating: Number((data.total / data.count).toFixed(1)),
      employeeCount: data.count,
      bookmarked: data.employees.filter(emp => bookmarks.includes(emp.id)).length
    }));

    // Rating distribution
    const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
      rating: `${rating} Star${rating !== 1 ? 's' : ''}`,
      count: employees.filter(emp => emp.rating === rating).length
    }));

    // Bookmark trends (simulated monthly data)
    const bookmarkTrends = [
      { month: 'Jan', bookmarks: Math.floor(bookmarks.length * 0.2) },
      { month: 'Feb', bookmarks: Math.floor(bookmarks.length * 0.4) },
      { month: 'Mar', bookmarks: Math.floor(bookmarks.length * 0.6) },
      { month: 'Apr', bookmarks: Math.floor(bookmarks.length * 0.8) },
      { month: 'May', bookmarks: bookmarks.length },
    ];

    return {
      departmentData,
      ratingDistribution,
      bookmarkTrends,
      totalEmployees: employees.length,
      averageRating: Number((employees.reduce((sum, emp) => sum + emp.rating, 0) / employees.length).toFixed(1)),
      totalBookmarks: bookmarks.length,
      highPerformers: employees.filter(emp => emp.rating >= 4).length
    };
  }, [employees, bookmarks]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error || !analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Error loading analytics data</p>
        </div>
      </div>
    );
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            HR Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Insights into employee performance and organizational metrics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.totalEmployees}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Total Employees</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {analyticsData.averageRating}/5
              </div>
              <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {analyticsData.highPerformers}
              </div>
              <p className="text-gray-600 dark:text-gray-400">High Performers (4+ Stars)</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">
                {analyticsData.totalBookmarks}
              </div>
              <p className="text-gray-600 dark:text-gray-400">Bookmarked Employees</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department-wise Average Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="averageRating" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Rating Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.ratingDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ rating, percent }) => `${rating}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {analyticsData.ratingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bookmark Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Bookmark Trends (2024)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.bookmarkTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="bookmarks" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department Employee Count */}
          <Card>
            <CardHeader>
              <CardTitle>Department Employee Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.departmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="employeeCount" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
