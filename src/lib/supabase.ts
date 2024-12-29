import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vlxbobiqalhpsvuqcjgw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZseGJvYmlxYWxocHN2dXFjamd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MDk4NjEsImV4cCI6MjA1MTA4NTg2MX0.L0wJTwPjls7nc0pgdl2zvMBSummjgk63UT3ikahgCzM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
