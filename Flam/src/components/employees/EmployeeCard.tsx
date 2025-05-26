
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Bookmark, TrendingUp } from 'lucide-react';
import { Employee } from '@/hooks/useEmployees';
import { useBookmarks } from '@/hooks/useBookmarks';
import StarRating from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
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

  const getRatingBadgeVariant = (rating: number) => {
    if (rating >= 4) return 'default';
    if (rating >= 3) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{employee.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary">{employee.department}</Badge>
                <Badge variant={getRatingBadgeVariant(employee.rating)}>
                  {employee.rating}/5
                </Badge>
              </div>
            </div>
          </div>
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-md transition-colors ${
              bookmarked
                ? 'text-yellow-500 hover:text-yellow-600'
                : 'text-gray-400 hover:text-yellow-500'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Performance:</span>
            <StarRating rating={employee.rating} size="sm" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Age: {employee.age} • Department: {employee.department}
          </p>
        </div>

        <div className="flex space-x-2">
          <Link to={`/employee/${employee.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </Link>
          <Button
            onClick={handlePromote}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Promote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
