import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { supabase } from '@/lib/supabase';

async function getDefaultLanguage(): Promise<'zh' | 'en'> {
  try {
    // Check Config table for LANG setting
    const { data, error } = await supabase
      .from('Config')
      .select('key_content')
      .eq('key_name', 'LANG')
      .single();

    if (!error && data && data.key_content === 'en') {
      return 'en';
    }
  } catch (error) {
    console.log('Failed to fetch default language from Config, using zh as default');
  }

  // Default to Chinese if no config found or error occurred
  return 'zh';
}

export default async function RootPage() {
  // Get language preference from cookie first
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get('language')?.value;

  let language: 'zh' | 'en';

  if (cookieLanguage === 'zh' || cookieLanguage === 'en') {
    // Use cookie preference if valid
    language = cookieLanguage;
  } else {
    // Otherwise, get default from Supabase Config
    language = await getDefaultLanguage();
  }

  // Redirect to locale-specific home page
  redirect(`/${language}`);
}
