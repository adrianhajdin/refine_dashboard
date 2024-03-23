// CurrentUserProvider.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/graphql/schema.types';

interface CurrentUserContextType {
    currentUser: User | null;
    userId: string | null; // Add userId field
  }
  
  const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);
  
  export const useCurrentUser = (): CurrentUserContextType => {
    const context = useContext(CurrentUserContext);
    if (context === undefined) {
      throw new Error('useCurrentUser must be used within a CurrentUserProvider');
    }
    return context;
  };
  
  interface CurrentUserProviderProps {
    children: React.ReactNode;
  }
  
  export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(null); // Initialize userId state
  
    useEffect(() => {
      // Fetch current user data asynchronously
      // Example:
      fetchCurrentUser().then(user => {
        setCurrentUser(user);
        setUserId(user?.id ?? null); // Use null as default if user?.id is undefined
      }).catch(error => console.error(error));
    }, []);
  
    return (
      <CurrentUserContext.Provider value={{ currentUser, userId }}>
        {children}
      </CurrentUserContext.Provider>
    );
  };
  
  // Replace fetchCurrentUser with your actual function to fetch the current user's data
  const fetchCurrentUser = async (): Promise<User | null> => {
    // Fetch current user data from an API or wherever it's stored
    // For example:
    const response = await fetch('/api/current-user');
    if (!response.ok) {
      throw new Error('Failed to fetch current user');
    }
    return response.json();
  };