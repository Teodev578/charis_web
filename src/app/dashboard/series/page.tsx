'use client';

import React, { useEffect, useState, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import type { Database } from '@/lib/supabase/database.types';

type SerieRow = Database['public']['Tables']['series']['Row'];

interface SeriesFormData {
  titre: string;
  description: string;
}

export default function SeriesPage() {
  const [series, setSeries] = useState<SerieRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const supabase = createClient();

  const [formData, setFormData] = useState<SeriesFormData>({
    titre: '',
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await supabase.from('series').select('*').order('titre');
    setSeries(data || []);
  }

  const handleOpenModal = (serie: SerieRow | null = null) => {
    if (serie) {
      setEditingId(serie.id);
      setFormData({
        titre: serie.titre,
        description: serie.description || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        titre: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const payload = {
      titre: formData.titre,
      description: formData.description || null
    };

    if (editingId) {
      await supabase.from('series').update(payload).eq('id', editingId);
    } else {
      await supabase.from('series').insert([payload]);
    }
    
    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cette série ?')) {
      await supabase.from('series').delete().eq('id', id);
      fetchData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Séries</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-purple text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition-colors"
        >
          <Plus size={18} />
          Nouvelle série
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
              <th className="p-4 font-semibold">Titre</th>
              <th className="p-4 font-semibold">Description</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {series.map(serie => (
              <tr key={serie.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">
                  {serie.titre}
                </td>
                <td className="p-4 text-sm text-gray-500 truncate max-w-xs">
                  {serie.description || '-'}
                </td>
                <td className="p-4 flex items-center justify-end gap-2">
                  <button onClick={() => handleOpenModal(serie)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md" aria-label="Modifier">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(serie.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md" aria-label="Supprimer">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {series.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">Aucune série trouvée</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Modifier' : 'Ajouter'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la série</label>
                <input required type="text" value={formData.titre} onChange={e => setFormData({...formData, titre: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optionnelle)</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none resize-none"></textarea>
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 text-white bg-brand-purple hover:bg-purple-900 rounded-lg transition-colors">
                  {editingId ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
