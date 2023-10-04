import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config({path: "../../.env"});

console.log(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default supabase;