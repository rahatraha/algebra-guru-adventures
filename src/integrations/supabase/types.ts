export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      flashcard_decks: {
        Row: {
          created_at: string
          grade: number | null
          id: string
          language: string | null
          name: string
          subject: string
          topic_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          grade?: number | null
          id?: string
          language?: string | null
          name: string
          subject: string
          topic_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          grade?: number | null
          id?: string
          language?: string | null
          name?: string
          subject?: string
          topic_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      flashcards: {
        Row: {
          back: string
          created_at: string
          deck_id: string | null
          difficulty: number | null
          ease_factor: number | null
          front: string
          id: string
          interval: number | null
          last_reviewed: string | null
          next_review: string | null
          repetitions: number | null
        }
        Insert: {
          back: string
          created_at?: string
          deck_id?: string | null
          difficulty?: number | null
          ease_factor?: number | null
          front: string
          id?: string
          interval?: number | null
          last_reviewed?: string | null
          next_review?: string | null
          repetitions?: number | null
        }
        Update: {
          back?: string
          created_at?: string
          deck_id?: string | null
          difficulty?: number | null
          ease_factor?: number | null
          front?: string
          id?: string
          interval?: number | null
          last_reviewed?: string | null
          next_review?: string | null
          repetitions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "flashcard_decks"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_content: {
        Row: {
          created_at: string
          examples: Json | null
          exercises: Json | null
          grade: number
          id: string
          language: string | null
          notes: Json | null
          subject: string
          theory: string | null
          topic_id: string
          topic_name: string
          updated_at: string
          video_links: Json | null
        }
        Insert: {
          created_at?: string
          examples?: Json | null
          exercises?: Json | null
          grade: number
          id?: string
          language?: string | null
          notes?: Json | null
          subject: string
          theory?: string | null
          topic_id: string
          topic_name: string
          updated_at?: string
          video_links?: Json | null
        }
        Update: {
          created_at?: string
          examples?: Json | null
          exercises?: Json | null
          grade?: number
          id?: string
          language?: string | null
          notes?: Json | null
          subject?: string
          theory?: string | null
          topic_id?: string
          topic_name?: string
          updated_at?: string
          video_links?: Json | null
        }
        Relationships: []
      }
      interactive_lessons: {
        Row: {
          content: Json
          created_at: string
          difficulty: number | null
          estimated_time: number | null
          grade: number
          id: string
          language: string | null
          subject: string
          title: string
          topic_id: string | null
          type: string
        }
        Insert: {
          content: Json
          created_at?: string
          difficulty?: number | null
          estimated_time?: number | null
          grade: number
          id?: string
          language?: string | null
          subject: string
          title: string
          topic_id?: string | null
          type?: string
        }
        Update: {
          content?: Json
          created_at?: string
          difficulty?: number | null
          estimated_time?: number | null
          grade?: number
          id?: string
          language?: string | null
          subject?: string
          title?: string
          topic_id?: string | null
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
