"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db, User, Progress } from '@/db/db';
import { useLiveQuery } from 'dexie-react-hooks';

type UserContextType = {
  currentUser: User | null;
  users: User[];
  login: (userId: number) => Promise<void>;
  logout: () => void;
  createUser: (name: string, avatar: string) => Promise<void>;
  saveProgress: (lessonId: string, type: 'literacy' | 'math', score: number) => Promise<void>;
  userProgress: Progress[];
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Live query for all users
  const users = useLiveQuery(() => db.users.toArray()) || [];
  
  // Live query for current user's progress
  const userProgress = useLiveQuery(
    () => currentUser?.id ? db.progress.where('userId').equals(currentUser.id).toArray() : [],
    [currentUser?.id]
  ) || [];

  useEffect(() => {
    // Check local storage for last logged in user ID
    const storedUserId = localStorage.getItem('alfabetiza-userid');
    if (storedUserId) {
      db.users.get(parseInt(storedUserId)).then(user => {
        if (user) setCurrentUser(user);
      });
    }
  }, []);

  const login = async (userId: number) => {
    const user = await db.users.get(userId);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('alfabetiza-userid', userId.toString());
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('alfabetiza-userid');
  };

  const createUser = async (name: string, avatar: string) => {
    await db.users.add({
      name,
      avatar,
      points: 0,
      level: 1,
      created_at: new Date()
    });
  };

  const saveProgress = async (lessonId: string, type: 'literacy' | 'math', score: number) => {
    if (!currentUser?.id) return;

    // Check if already completed
    const existing = await db.progress
      .where({ userId: currentUser.id, lessonId })
      .first();

    if (!existing) {
      // 1. Add progress
      await db.progress.add({
        userId: currentUser.id,
        lessonId,
        type,
        score,
        completed_at: new Date()
      });

      // 2. Add Points & Check Level
      const POINTS_PER_LESSON = 10;
      const POINTS_PER_LEVEL = 100;
      
      const newPoints = (currentUser.points || 0) + POINTS_PER_LESSON;
      const newLevel = Math.floor(newPoints / POINTS_PER_LEVEL) + 1;
      
      await db.users.update(currentUser.id, {
        points: newPoints,
        level: newLevel
      });
      
      // Ideally we should update local state, but useLiveQuery might handle it if we re-fetch user.
      // However, currentUser is basic state. We should update it.
      setCurrentUser({ ...currentUser, points: newPoints, level: newLevel });
    }
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      users, 
      login, 
      logout,
      createUser,
      saveProgress,
      userProgress
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
