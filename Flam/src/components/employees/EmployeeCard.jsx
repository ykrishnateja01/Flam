
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Bookmark, TrendingUp, Mail, Phone, MapPin } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import StarRating from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const EmployeeCard = ({ employee }) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(employee.id);

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(employee.id);
      toast({
        title: "Bookmark removed",
        description: `${employee.firstName} ${employee.lastName} has been removed from bookmarks.`,
      });
    } else {
      addBookmark(employee.id);
      toast({
        title: "Bookmark added",
        description: `${employee.firstName} ${employee.lastName} has been bookmarked.`,
      });
    }
  };

  const handlePromote = () => {
    toast({
      title: "Promotion initiated",
      description: `Promotion process started for ${employee.firstName} ${employee.lastName}.`,
    });
  };

  const getRatingBadgeVariant = (rating) => {
    if (rating >= 4) return 'default';
    if (rating >= 3) return 'secondary';
    return 'destructive';
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'Engineering': 'from-blue-500 to-cyan-500',
      'Marketing': 'from-pink-500 to-rose-500',
      'Sales': 'from-green-500 to-emerald-500',
      'HR': 'from-purple-500 to-violet-500',
      'Design': 'from-orange-500 to-amber-500',
      'Finance': 'from-indigo-500 to-blue-500'
    };
    return colors[department] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group transform hover:-translate-y-2">
      {/* Header with gradient */}
      <div className={`h-3 bg-gradient-to-r ${getDepartmentColor(employee.department)}`} />
      
      <div className="p-6">
        {/* Top section with avatar and bookmark */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={employee.image}
                alt={`${employee.firstName} ${employee.lastName}`}
                className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${getDepartmentColor(employee.department)} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white text-xs font-bold">{employee.rating}</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                {employee.firstName} {employee.lastName}
              </h3>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1">
                <Mail className="w-3 h-3 mr-1" />
                {employee.email}
              </div>
            </div>
          </div>
          
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
              bookmarked
                ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Badges section */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Badge 
            variant="secondary" 
            className={`bg-gradient-to-r ${getDepartmentColor(employee.department)} text-white border-0 font-medium px-3 py-1`}
          >
            {employee.department}
          </Badge>
          <Badge variant={getRatingBadgeVariant(employee.rating)} className="font-medium">
            ⭐ {employee.rating}/5
          </Badge>
        </div>

        {/* Performance section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Performance Rating</span>
            <StarRating rating={employee.rating} size="sm" showNumber />
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getDepartmentColor(employee.department)} transition-all duration-500 rounded-full`}
              style={{ width: `${(employee.rating / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Additional info */}
        <div className="space-y-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Phone className="w-3 h-3 mr-2" />
            {employee.phone}
          </div>
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-2" />
            Age: {employee.age} • {employee.address.city}, {employee.address.state}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Link to={`/employee/${employee.id}`} className="flex-1">
            <Button 
              variant="outline" 
              className="w-full border-2 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 group/btn"
            >
              <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              View Details
            </Button>
          </Link>
          <Button
            onClick={handlePromote}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
          >
            <TrendingUp className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
            Promote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
