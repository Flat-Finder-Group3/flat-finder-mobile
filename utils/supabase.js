import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
// import { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } from '@env'

const supabaseUrl = "https://ewbcpghsdfeysreslsbk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3YmNwZ2hzZGZleXNyZXNsc2JrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODg5NzY5MSwiZXhwIjoxOTk0NDczNjkxfQ.fB8N2TPMpo7FPkCz1sYFPQ7FhWU94ydWfPISQEp1b3E";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
