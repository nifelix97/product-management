import { createContext, useContext, useEffect, type ReactNode } from 'react';
import type { User } from '../types/userType';
import type { AxiosError } from 'axios';
import { useUserAxios } from '../hooks/useUser';


interface UserContextType {
    user: User | null;
    loading: boolean;
    error: AxiosError | null;
    loginUser: (email: string, password: string) => Promise<User | null>;
    getCurrentUser: () => Promise<User | null>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export function UserProvider({ children }: { children: ReactNode }) {
  const hookData = useUserAxios();
  return (
    <UserContext.Provider value={hookData}>
      {children}
    </UserContext.Provider>
  );
}