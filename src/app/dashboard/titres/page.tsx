'use client';

import React, { useEffect, useState, type FormEvent, type ChangeEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Edit2, Trash2, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';
import type { Database } from '@/lib/supabase/database.types';

type MessageRow = Database['public']['Tables']['messages']['Row'];
type CategoryRow = Database['public']['Tables']['categories']['Row'];
type SerieRow = Database['public']['Tables']['series']['Row'];

interface DashboardMessage extends MessageRow {
  categorie: Pick<CategoryRow, 'nom'> | null;
  serie: Pick<SerieRow, 'titre'> | null;
}

interface TitreFormData {
  titre: string;
  orateur: string;
  audio_url: string;
  image_url: string;
  duree_secondes: number;
  ordre_dans_la_serie: number | string;
  categorie_id: string;
  serie_id: string;
}

export default function TitresPage() {
  const [messages, setMessages] = useState<DashboardMessage[]>([]);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [series, setSeries] = useState<SerieRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  
  const supabase = createClient();

  const [formData, setFormData] = useState<TitreFormData>({
    titre: '',
    orateur: 'Rev. Israel Watchman',
    audio_url: '',
    image_url: '',
    duree_secondes: 0,
    ordre_dans_la_serie: '',
    categorie_id: '',
    serie_id: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: mData } = await supabase.from('messages').select('*, categorie:categories(nom), serie:series(titre)').order('date_publication', { ascending: false });
    const { data: cData } = await supabase.from('categories').select('*');
    const { data: sData } = await supabase.from('series').select('*');
    
    setMessages((mData as unknown as DashboardMessage[]) || []);
    setCategories(cData || []);
    setSeries(sData || []);
  }

  const handleOpenModal = (message: DashboardMessage | null = null) => {
    if (message) {
      setEditingId(message.id);
      setFormData({
        titre: message.titre,
        orateur: message.orateur,
        audio_url: message.audio_url,
        image_url: message.image_url || '',
        duree_secondes: message.duree_secondes || 0,
        ordre_dans_la_serie: message.ordre_dans_la_serie || '',
        categorie_id: message.categorie_id || '',
        serie_id: message.serie_id || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        titre: '',
        orateur: 'Rev. Israel Watchman',
        audio_url: '',
        image_url: '',
        duree_secondes: 0,
        ordre_dans_la_serie: '',
        categorie_id: '',
        serie_id: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Calcul automatique de la durée de l'audio
    const objectUrl = URL.createObjectURL(file);
    const audio = new Audio(objectUrl);
    audio.addEventListener('loadedmetadata', () => {
      setFormData(prev => ({ ...prev, duree_secondes: Math.round(audio.duration) }));
      URL.revokeObjectURL(objectUrl);
    });

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('messages_audio')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      console.error(uploadError);
      alert("Erreur lors de l'upload audio. Vérifiez que le Bucket 'messages_audio' existe et est public.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('messages_audio').getPublicUrl(fileName);
    
    setFormData(prev => ({ ...prev, audio_url: data.publicUrl }));
    setUploading(false);
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('messages_images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) {
      console.error(uploadError);
      alert("Erreur lors de l'upload de l'image. Vérifiez que le Bucket 'messages_images' existe et est public.");
      setImageUploading(false);
      return;
    }

    const { data } = supabase.storage.from('messages_images').getPublicUrl(fileName);
    
    setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    setImageUploading(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const payload = {
      titre: formData.titre,
      orateur: formData.orateur,
      audio_url: formData.audio_url,
      image_url: formData.image_url || null,
      duree_secondes: formData.duree_secondes || 0,
      ordre_dans_la_serie: formData.ordre_dans_la_serie ? parseInt(formData.ordre_dans_la_serie as string) : null,
      categorie_id: formData.categorie_id || null,
      serie_id: formData.serie_id || null
    };

    let errorMsg = null;
    if (editingId) {
      const { error } = await supabase.from('messages').update(payload).eq('id', editingId);
      errorMsg = error;
    } else {
      const { error } = await supabase.from('messages').insert([payload]);
      errorMsg = error;
    }
    
    if (errorMsg) {
      console.error("Erreur lors de l'enregistrement du message :", errorMsg);
      alert("Erreur lors de l'enregistrement : " + errorMsg.message);
    } else {
      setIsModalOpen(false);
      fetchData();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer ce titre ?')) {
      await supabase.from('messages').delete().eq('id', id);
      fetchData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Titres</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-purple text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition-colors"
        >
          <Plus size={18} />
          Ajouter un titre
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-600">
              <th className="p-4 font-semibold">Titre</th>
              <th className="p-4 font-semibold">Catégorie</th>
              <th className="p-4 font-semibold">Série</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {messages.map(msg => (
              <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <p className="font-medium text-gray-900">{msg.titre}</p>
                  <p className="text-sm text-gray-500">{msg.orateur}</p>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {msg.categorie?.nom || '-'}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {msg.serie?.titre || '-'}
                </td>
                <td className="p-4 flex items-center justify-end gap-2">
                  <button onClick={() => handleOpenModal(msg)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md" aria-label="Modifier">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(msg.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-md" aria-label="Supprimer">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Modifier le titre' : 'Ajouter un titre'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                  <input required type="text" value={formData.titre} onChange={e => setFormData({...formData, titre: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Orateur</label>
                  <input required type="text" value={formData.orateur} onChange={e => setFormData({...formData, orateur: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durée (secondes)</label>
                  <input type="number" value={formData.duree_secondes} onChange={e => setFormData({...formData, duree_secondes: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none" />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fichier Audio (MP3)</label>
                  <div className="flex gap-2 items-center mb-3">
                    <input 
                      type="file" 
                      accept="audio/*" 
                      onChange={handleFileUpload} 
                      disabled={uploading}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-brand-purple hover:file:bg-purple-100 disabled:opacity-50 cursor-pointer" 
                    />
                  </div>
                  {uploading && <p className="text-sm text-brand-purple mb-3 flex items-center gap-2"><Upload size={16} className="animate-bounce" /> Upload audio en cours...</p>}
                  
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Audio générée</label>
                  <input required type="url" value={formData.audio_url} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500 outline-none" placeholder="L'URL apparaîtra ici..." />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image de couverture (Optionnel)</label>
                  <div className="flex gap-2 items-center mb-3">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      disabled={imageUploading}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 disabled:opacity-50 cursor-pointer" 
                    />
                  </div>
                  {imageUploading && <p className="text-sm text-blue-600 mb-3 flex items-center gap-2"><ImageIcon size={16} className="animate-pulse" /> Upload image en cours...</p>}

                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Image générée</label>
                  <input type="url" value={formData.image_url} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-500 outline-none" placeholder="L'URL apparaîtra ici..." />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select value={formData.categorie_id} onChange={e => setFormData({...formData, categorie_id: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none bg-white">
                    <option value="">Aucune</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Série</label>
                  <select value={formData.serie_id} onChange={e => setFormData({...formData, serie_id: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none bg-white">
                    <option value="">Aucune</option>
                    {series.map(s => <option key={s.id} value={s.id}>{s.titre}</option>)}
                  </select>
                </div>
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
