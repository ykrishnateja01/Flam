
import { useState, useEffect } from 'react';

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Design', 'Finance'];

const generateMockData = (users) => {
  return users.map((user, index) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    age: user.age,
    phone: user.phone,
    department: departments[index % departments.length],
    rating: Math.floor(Math.random() * 5) + 1,
    address: user.address,
    image: user.image,
    bio: `Experienced professional in ${departments[index % departments.length]} with excellent track record.`,
    projects: [
      {
        id: 1,
        name: 'Project Alpha',
        status: 'In Progress',
        deadline: '2024-06-15',
      },
      {
        id: 2,
        name: 'Project Beta',
        status: 'Completed',
        deadline: '2024-05-20',
      },
    ],
    feedback: [
      {
        id: 1,
        reviewer: 'John Manager',
        comment: 'Excellent performance and great team collaboration.',
        date: '2024-05-01',
        rating: 5,
      },
      {
        id: 2,
        reviewer: 'Sarah Lead',
        comment: 'Shows initiative and delivers quality work.',
        date: '2024-04-15',
        rating: 4,
      },
    ],
  }));
};

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/users?limit=20');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        const mockEmployees = generateMockData(data.users);
        setEmployees(mockEmployees);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return { employees, loading, error };
};
