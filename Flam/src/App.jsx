
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { BookmarksProvider } from "@/hooks/useBookmarks";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/pages/Dashboard";
import Bookmarks from "@/pages/Bookmarks";
import Analytics from "@/pages/Analytics";
import EmployeeDetails from "@/components/employees/EmployeeDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <BookmarksProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-300">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/employee/:id" element={<EmployeeDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </BookmarksProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
