'use client';

import { createCreation, getCreationsByUser, updateCreation as updateCreationAction } from '@/server/actions/creations';
import { Creation } from '@/types';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';

type State = {
  creations: Creation[];
  loading: boolean;
}

type Actions = {
  updateCreation: (creation: Creation) => void;
  addCreation: (creation: Creation) => void;
}

const CreationsContext = createContext<State & Actions | null>(null);

export function CreationsProvider({ children }: { children: React.ReactNode }) {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const { data, status } = useSession();
  const isAuthLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated) return;
    fetchCreations(data!.user!.id!).then(setCreations);

  }, [isAuthLoading, isAuthenticated]);

  async function fetchCreations(userId: string): Promise<Creation[]> {
    try {
      const { success, data } = await getCreationsByUser(userId);

      if (!success) {
        throw new Error('Failed to fetch creations');
      }

      return data! as any[];
    } catch (error) {
      return [];
      //  TODO: show toast
    } finally {
      setLoading(false);
    }
  }

  function updateCreation(creation: Creation) {
    setCreations((prev) => {
      const index = prev.findIndex((c) => c.id === creation.id);
      if (index === -1) {
        return prev;
      }

      return [...prev.slice(0, index), creation, ...prev.slice(index + 1)];
    });

    updateCreationAction(creation);
  }

  function addCreation(creation: Creation) {
    setCreations((prev) => [creation, ...prev]);
    createCreation(creation);
  }

  return (
    <CreationsContext.Provider
      value={{
        creations,
        addCreation,
        updateCreation,
        loading,
      }}
    >
      {children}
    </CreationsContext.Provider>
  );
}

export function useCreations(): State & Actions {
  const context = useContext(CreationsContext);
  if (!context) {
    throw new Error('useCreations must be used within an ImageProvider');
  }

  return context;
}
