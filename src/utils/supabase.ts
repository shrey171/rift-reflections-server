import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const { SUPABASE_KEY, SUPABASE_URL } = process.env;

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)