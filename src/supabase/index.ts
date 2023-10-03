import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config({path: "../../.env"});

console.log(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
const BASE_URL_AVATARS = "https://jqsgcqrnrugsklqsnydr.supabase.co/storage/v1/object/public/avatars/";
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default supabase;