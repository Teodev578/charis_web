'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Shield, ShieldAlert, Trash2, User } from 'lucide-react';
import type { Database } from '@/lib/supabase/database.types';

type Utilisateur = Database['public']['Tables']['utilisateurs']['Row'];

export default function UtilisateursPage() {
  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('utilisateurs')
      .select('*')
      .order('mis_a_jour_le', { ascending: false });
      
    if (!error && data) {
      setUsers(data);
    }
    setLoading(false);
  }

  const handleRoleChange = async (userId: string, newRole: 'membre' | 'admin') => {
    if (confirm(`Voulez-vous vraiment changer le rôle en ${newRole.toUpperCase()} ?`)) {
      const { error } = await supabase
        .from('utilisateurs')
        .update({ profil: newRole })
        .eq('id', userId);
        
      if (!error) {
        fetchUsers();
      } else {
        alert("Erreur lors de la mise à jour du rôle.");
      }
    }
  };

  const handleDelete = async (userId: string, nom: string | null) => {
    if (confirm(`Voulez-vous vraiment supprimer le profil de ${nom || 'cet utilisateur'} ? (Cela supprime ses accès admin et favoris, mais pas son compte de connexion principal)`)) {
      const { error } = await supabase
        .from('utilisateurs')
        .delete()
        .eq('id', userId);
        
      if (!error) {
        fetchUsers();
      } else {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement des utilisateurs...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
                <th className="p-4 font-semibold w-12"></th>
                <th className="p-4 font-semibold">Utilisateur</th>
                <th className="p-4 font-semibold">Rôle</th>
                <th className="p-4 font-semibold">Dernière maj</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-light text-white flex items-center justify-center font-bold">
                      {user.nom_complet ? user.nom_complet.charAt(0).toUpperCase() : <User size={18} />}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">{user.nom_complet || 'Utilisateur sans nom'}</p>
                    <p className="text-xs text-gray-500 font-mono mt-1">{user.id}</p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.profil === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.profil === 'admin' ? <ShieldAlert size={12} /> : <Shield size={12} />}
                      {user.profil.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {user.mis_a_jour_le ? new Date(user.mis_a_jour_le).toLocaleDateString('fr-FR') : '-'}
                  </td>
                  <td className="p-4 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {user.profil === 'admin' ? (
                      <button 
                        onClick={() => handleRoleChange(user.id, 'membre')} 
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md font-medium transition-colors"
                      >
                        Rétrograder
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleRoleChange(user.id, 'admin')} 
                        className="text-xs bg-purple-50 hover:bg-purple-100 text-brand-purple px-3 py-1.5 rounded-md font-medium transition-colors"
                      >
                        Promouvoir Admin
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(user.id, user.nom_complet)} 
                      className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                      title="Supprimer le profil"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">Aucun utilisateur trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
      `}} />
    </div>
  );
}
