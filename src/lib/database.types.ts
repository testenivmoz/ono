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
      areas: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "areas_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      authors: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          institution: string | null
          name: string
          orcid: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          institution?: string | null
          name: string
          orcid?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          institution?: string | null
          name?: string
          orcid?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      document_authors: {
        Row: {
          author_id: string | null
          created_at: string | null
          document_id: string | null
          id: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          document_id?: string | null
          id?: string
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          document_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_authors_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_authors_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          }
        ]
      }
      document_requests: {
        Row: {
          created_at: string | null
          description: string
          id: string
          requested_by: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          requested_by?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          requested_by?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_requests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      documents: {
        Row: {
          abstract: string
          area_id: string | null
          category_id: string | null
          created_at: string | null
          download_count: number | null
          file_url: string | null
          id: string
          institution: string
          keywords: string[] | null
          language: string | null
          license: Database["public"]["Enums"]["license_type"] | null
          pages: number | null
          status: Database["public"]["Enums"]["document_status"] | null
          submitted_by: string | null
          subtitle: string | null
          thumbnail_url: string | null
          title: string
          type: Database["public"]["Enums"]["document_type"]
          updated_at: string | null
          view_count: number | null
          year: number
        }
        Insert: {
          abstract: string
          area_id?: string | null
          category_id?: string | null
          created_at?: string | null
          download_count?: number | null
          file_url?: string | null
          id?: string
          institution: string
          keywords?: string[] | null
          language?: string | null
          license?: Database["public"]["Enums"]["license_type"] | null
          pages?: number | null
          status?: Database["public"]["Enums"]["document_status"] | null
          submitted_by?: string | null
          subtitle?: string | null
          thumbnail_url?: string | null
          title: string
          type: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
          view_count?: number | null
          year: number
        }
        Update: {
          abstract?: string
          area_id?: string | null
          category_id?: string | null
          created_at?: string | null
          download_count?: number | null
          file_url?: string | null
          id?: string
          institution?: string
          keywords?: string[] | null
          language?: string | null
          license?: Database["public"]["Enums"]["license_type"] | null
          pages?: number | null
          status?: Database["public"]["Enums"]["document_status"] | null
          submitted_by?: string | null
          subtitle?: string | null
          thumbnail_url?: string | null
          title?: string
          type?: Database["public"]["Enums"]["document_type"]
          updated_at?: string | null
          view_count?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "documents_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_submitted_by_fkey"
            columns: ["submitted_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          institution: string | null
          name: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          institution?: string | null
          name: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          institution?: string | null
          name?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reading_history: {
        Row: {
          created_at: string | null
          document_id: string | null
          id: string
          last_page: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          document_id?: string | null
          id?: string
          last_page?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          document_id?: string | null
          id?: string
          last_page?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reading_history_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reading_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_favorites: {
        Row: {
          created_at: string | null
          document_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          document_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          document_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_download_count: {
        Args: {
          document_id: string
        }
        Returns: undefined
      }
      increment_view_count: {
        Args: {
          document_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      document_status: "pending" | "approved" | "rejected"
      document_type: "thesis" | "dissertation" | "monograph" | "article" | "book"
      license_type: "cc-by" | "cc-by-sa" | "cc-by-nc" | "cc-by-nc-sa" | "public-domain"
      request_status: "open" | "fulfilled" | "closed"
      user_role: "user" | "admin"
    }
  }
}