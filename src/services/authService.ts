import { mockUsers } from '../data/mockData';

interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  companyID: number;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  // In a real app, this would be an API call to your backend
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(user => 
        user.email.toLowerCase() === email.toLowerCase() && user.password === password
      );

      if (user) {
        const { id, name, email, role, companyID } = user;
        resolve({ id, name, email, role, companyID });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500); // Simulate network delay
  });
};