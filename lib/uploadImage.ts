import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anonymous Key is not defined.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImage = async (file: File, bucketName: string): Promise<string | null> => {
  if (!file) return null;

  // Cleanse file name by replacing whitespace with an empty string
  const cleansedFileName = `${Date.now()}-${file.name.replace(/\s+/g, '')}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(cleansedFileName, file);

  console.log("Upload response:", { data, error });

  if (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }

  // Base URL for accessing public files
  const baseUrl = 'https://ncjhfrjcgmqhmcsrgmfh.supabase.co/storage/v1/object/public/';

  // Construct the full URL by combining the base URL and the cleansed path
  const fullUrl = `${baseUrl}${data?.fullPath.replace(/\s+/g, '')}`;

  return fullUrl;
};