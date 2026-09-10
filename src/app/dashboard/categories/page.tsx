'use client';

import React, { useEffect, useState, type FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Edit2, Trash2, Plus, X } from 'lucide-react';
import type { Database } from '@/lib/supabase/database.types';

type CategoryRow = Database['public']['Tables']['categories']['Row'];

interface CategoryFormData {
  nom: string;
  slug: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const supabase = createClient();

  const [formData, setFormData] = useState<CategoryFormData>({
    nom: '',
    slug: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await supabase.from('categories').select('*').order('nom');
    setCategories(data || []);
  }

  const handleOpenModal = (cat: CategoryRow | null = null) => {
    if (cat) {
      setEditingId(cat.id);
      setFormData({
        nom: cat.nom,
        slug: cat.slug
      });
    } else {
      setEditingId(null);
      setFormData({
        nom: '',
        slug: ''
      });
    }
    setIsModalOpen(true);
  };

  const generateSlug = (text: string): string => {
    return text.toString().toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const payload = {
      nom: formData.nom,
      slug: formData.slug || generateSlug(formData.nom)
    };

    if (editingId) {
      await supabase.from('categories').update(payload).eq('id', editingId);
    } else {
      await supabase.from('categories').insert([payload]);
    }
    
    setIsModalOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      await supabase.from('categories').delete().eq('id', id);
      fetchData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Catégories</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-purple text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition-colors"
        >
          <Plus size={18} />
          Nouvelle catégorie
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
              <th className="p-4 font-semibold">Nom</th>
              <th className="p-4 font-semibold">Slug</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map(cat => (
              <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">
                  {cat.nom}
                </td>
                <td className="p-4 text-sm text-gray-500 font-mono">
                  {cat.slug}
                </td>
                <td className="p-4 flex items-center justify-end gap-2">
                  <button onClick={() => handleOpenModal(cat)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md" aria-label="Modifier">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md" aria-label="Supprimer">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">Aucune catégorie trouvée</td>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la catégorie</label>
                <input required type="text" value={formData.nom} onChange={e => {
                  setFormData({
                    ...formData, 
                    nom: e.target.value,
                    slug: !editingId ? generateSlug(e.target.value) : formData.slug
                  })
                }} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none font-mono text-sm" />
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
