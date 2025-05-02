import { mockFuelUsers } from '../data/mockData';

export const getFuelUsers = async () => {
  // In a real app, this would fetch data from your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFuelUsers);
    }, 500);
  });
};

export const getFuelUserById = async (id: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockFuelUsers.find(u => u.id === id);
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User not found'));
      }
    }, 300);
  });
};

export const createFuelUser = async (userData: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would create a user in your API
      const newUser = {
        id: Math.max(...mockFuelUsers.map(u => u.id)) + 1,
        ...userData,
        updated_at: new Date().toISOString(),
      };
      
      resolve(newUser);
    }, 500);
  });
};

export const updateFuelUser = async (id: number, userData: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = mockFuelUsers.findIndex(u => u.id === id);
      if (userIndex !== -1) {
        const updatedUser = {
          ...mockFuelUsers[userIndex],
          ...userData,
          updated_at: new Date().toISOString(),
        };
        
        resolve(updatedUser);
      } else {
        reject(new Error('User not found'));
      }
    }, 500);
  });
};