"use client";

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { PlusCircle, User as UserIcon, LogIn } from 'lucide-react';

export default function LoginPage() {
  const { users, login, createUser } = useUser();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🙂');

  const avatars = ['🙂', '🌟', '🚀', '🐱', '🐶', '🦄', '⚽', '🎨'];

  const handleLogin = async (userId: number) => {
    await login(userId);
    router.push('/dashboard');
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    await createUser(newName, selectedAvatar);
    setIsCreating(false);
    setNewName('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">Quem vai aprender hoje?</h1>

        {!isCreating ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {users.map(user => (
                <button
                  key={user.id}
                  onClick={() => user.id && handleLogin(user.id)}
                  className="flex flex-col items-center p-4 border-2 border-slate-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <span className="text-4xl mb-2">{user.avatar}</span>
                  <span className="font-bold text-slate-700">{user.name}</span>
                </button>
              ))}
              
              <button
                onClick={() => setIsCreating(true)}
                className="flex flex-col items-center p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:text-blue-500 text-slate-400 transition"
              >
                <PlusCircle className="w-10 h-10 mb-2" />
                <span className="font-bold">Novo Aluno</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreate} className="space-y-6 animate-in fade-in slide-in-from-right-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nome do Aluno</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-lg text-black"
                placeholder="Ex: Maria"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Escolha um Avatar</label>
              <div className="flex gap-2 justify-center flex-wrap">
                {avatars.map(avatar => (
                  <button
                    key={avatar}
                    type="button"
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-3xl p-2 rounded-full transition ${selectedAvatar === avatar ? 'bg-blue-100 scale-125' : 'hover:bg-slate-100'}`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!newName.trim()}
                className="flex-1 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                Criar Aluno
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
