export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      annonces: {
        Row: {
          id: string
          type: 'event' | 'quote'
          title: string | null
          subtitle: string | null
          date_text: string | null
          bg_image: string | null
          accent_color: string | null
          is_cursive_title: boolean
          footer_text: string | null
          socials: boolean
          quote: string | null
          author: string | null
          est_actif: boolean
          cree_le: string | null
          mis_a_jour_le: string | null
        }
        Insert: {
          id?: string
          type: 'event' | 'quote'
          title?: string | null
          subtitle?: string | null
          date_text?: string | null
          bg_image?: string | null
          accent_color?: string | null
          is_cursive_title?: boolean
          footer_text?: string | null
          socials?: boolean
          quote?: string | null
          author?: string | null
          est_actif?: boolean
          cree_le?: string | null
          mis_a_jour_le?: string | null
        }
        Update: {
          id?: string
          type?: 'event' | 'quote'
          title?: string | null
          subtitle?: string | null
          date_text?: string | null
          bg_image?: string | null
          accent_color?: string | null
          is_cursive_title?: boolean
          footer_text?: string | null
          socials?: boolean
          quote?: string | null
          author?: string | null
          est_actif?: boolean
          cree_le?: string | null
          mis_a_jour_le?: string | null
        }
        Relationships: []
      }
      utilisateurs: {
        Row: {
          id: string
          nom_complet: string | null
          profil: 'membre' | 'admin'
          mis_a_jour_le: string | null
        }
        Insert: {
          id: string
          nom_complet?: string | null
          profil?: 'membre' | 'admin'
          mis_a_jour_le?: string | null
        }
        Update: {
          id?: string
          nom_complet?: string | null
          profil?: 'membre' | 'admin'
          mis_a_jour_le?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "utilisateurs_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          id: string
          nom: string
          slug: string
        }
        Insert: {
          id?: string
          nom: string
          slug: string
        }
        Update: {
          id?: string
          nom?: string
          slug?: string
        }
        Relationships: []
      }
      series: {
        Row: {
          id: string
          titre: string
          description: string | null
        }
        Insert: {
          id?: string
          titre: string
          description?: string | null
        }
        Update: {
          id?: string
          titre?: string
          description?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          date_publication: string | null
          titre: string
          orateur: string
          audio_url: string
          image_url: string | null
          duree_secondes: number
          ordre_dans_la_serie: number | null
          categorie_id: string | null
          serie_id: string | null
          utilisateur_id: string | null
        }
        Insert: {
          id?: string
          date_publication?: string | null
          titre: string
          orateur?: string
          audio_url: string
          image_url?: string | null
          duree_secondes?: number
          ordre_dans_la_serie?: number | null
          categorie_id?: string | null
          serie_id?: string | null
          utilisateur_id?: string | null
        }
        Update: {
          id?: string
          date_publication?: string | null
          titre?: string
          orateur?: string
          audio_url?: string
          image_url?: string | null
          duree_secondes?: number
          ordre_dans_la_serie?: number | null
          categorie_id?: string | null
          serie_id?: string | null
          utilisateur_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_categorie_id_fkey"
            columns: ["categorie_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_serie_id_fkey"
            columns: ["serie_id"]
            referencedRelation: "series"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          }
        ]
      }
      favoris: {
        Row: {
          utilisateur_id: string
          message_id: string
          date_ajout: string | null
        }
        Insert: {
          utilisateur_id: string
          message_id: string
          date_ajout?: string | null
        }
        Update: {
          utilisateur_id?: string
          message_id?: string
          date_ajout?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favoris_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favoris_message_id_fkey"
            columns: ["message_id"]
            referencedRelation: "messages"
            referencedColumns: ["id"]
          }
        ]
      }
      progression_lecture: {
        Row: {
          utilisateur_id: string
          message_id: string
          temps_secondes: number
          est_termine: boolean
          mis_a_jour_le: string | null
        }
        Insert: {
          utilisateur_id: string
          message_id: string
          temps_secondes?: number
          est_termine?: boolean
          mis_a_jour_le?: string | null
        }
        Update: {
          utilisateur_id?: string
          message_id?: string
          temps_secondes?: number
          est_termine?: boolean
          mis_a_jour_le?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "progression_lecture_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "progression_lecture_message_id_fkey"
            columns: ["message_id"]
            referencedRelation: "messages"
            referencedColumns: ["id"]
          }
        ]
      }
      notes: {
        Row: {
          id: string
          utilisateur_id: string
          message_id: string
          contenu: string
          position_audio_secondes: number
          cree_le: string | null
        }
        Insert: {
          id?: string
          utilisateur_id: string
          message_id: string
          contenu: string
          position_audio_secondes?: number
          cree_le?: string | null
        }
        Update: {
          id?: string
          utilisateur_id?: string
          message_id?: string
          contenu?: string
          position_audio_secondes?: number
          cree_le?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notes_utilisateur_id_fkey"
            columns: ["utilisateur_id"]
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_message_id_fkey"
            columns: ["message_id"]
            referencedRelation: "messages"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_profil: {
        Args: {
          user_id: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
