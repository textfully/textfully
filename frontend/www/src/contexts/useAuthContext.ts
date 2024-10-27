'use client';

import { useEffect, useState } from 'react';

import constate from 'constate';

import type { User } from '@/types/data';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [user, setUser] = useState<User | null | undefined>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    // TODO: replace this with your own authentication logic
    try {
      const response = await new Promise<User>((resolve) => {
        setTimeout(() => {
          resolve({
            id: '1',
            name: 'Neo',
            emailAddress: 'neo@matrix.com',
            phoneNumber: '+1555555555',
          } as User);
        }, 1000);
      });
      setUser(response);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return {
    user,
    signOut,
    fetchUser,
  };
};

export const [AuthProvider, useAuthContext] = constate(useAuth);
