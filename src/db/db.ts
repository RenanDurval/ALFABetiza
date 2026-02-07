import Dexie, { Table } from 'dexie';

export interface User {
  id?: number;
  name: string;
  avatar: string; // Emoji character
  points: number;
  level: number;
  created_at: Date;
}

export interface Progress {
  id?: number;
  userId: number;
  lessonId: string;
  type: 'literacy' | 'math';
  score: number;
  completed_at: Date;
}

export interface Settings {
  id?: number;
  userId: number;
  theme: 'light' | 'dark' | 'system';
  fontSize: 'normal' | 'large';
}

export class AlfabetizaDB extends Dexie {
  users!: Table<User>;
  progress!: Table<Progress>;
  settings!: Table<Settings>;

  constructor() {
    super('AlfabetizaDB');
    
    // Version 1
    this.version(1).stores({
      users: '++id, name',
      progress: '++id, userId, lessonId, type, [userId+lessonId]',
      settings: '++id, userId'
    });

    // Version 2: Add points/level
    this.version(2).stores({
      users: '++id, name, points',
      progress: '++id, userId, lessonId, type, [userId+lessonId]',
      settings: '++id, userId'
    }).upgrade(tx => {
      return tx.table('users').toCollection().modify(user => {
        user.points = 0;
        user.level = 1;
      });
    });
  }
}

export const db = new AlfabetizaDB();
