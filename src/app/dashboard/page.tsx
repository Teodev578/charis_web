'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Mic, Layers, ListVideo, Users } from 'lucide-react';

interface DashboardStats {
  titres: number;
  categories: number;
  series: number;
  utilisateurs: number;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    titres: 0,
    categories: 0,
    series: 0,
    utilisateurs: 0
  });

  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      const [
        resTitres,
        resCats,
        resSeries,
        resUsers
      ] = await Promise.all([
        supabase.from('messages').select('*', { count: 'exact', head: true }),
        supabase.from('categories').select('*', { count: 'exact', head: true }),
        supabase.from('series').select('*', { count: 'exact', head: true }),
        supabase.from('utilisateurs').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        titres: resTitres.count || 0,
        categories: resCats.count || 0,
        series: resSeries.count || 0,
        utilisateurs: resUsers.count || 0
      });
    }

    fetchStats();
  }, [supabase]);

  const statCards = [
    { label: 'Titres (Messages)', value: stats.titres, icon: Mic, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Catégories', value: stats.categories, icon: Layers, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Séries', value: stats.series, icon: ListVideo, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Utilisateurs', value: stats.utilisateurs, icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Vue d'ensemble</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white/50 flex flex-col gap-4 relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
              style={{ animation: `slideInUp 0.5s ease-out forwards ${i * 0.1}s`, opacity: 0, transform: 'translateY(20px)' }}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 opacity-50 group-hover:scale-150 transition-transform duration-700 ease-out" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} shadow-sm`}>
                  <Icon size={24} strokeWidth={2.5} />
                </div>
              </div>
              
              <div className="relative z-10 mt-2">
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
