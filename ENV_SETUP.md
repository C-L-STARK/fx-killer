# Environment Variables Configuration

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://wlksiulicosdnerzhkdl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Where to Find These Values

1. **NEXT_PUBLIC_SUPABASE_URL**: 
   - Go to Supabase Dashboard → Settings → API
   - Copy the "Project URL"

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**:
   - Same location as above
   - Copy the "anon public" key

3. **SUPABASE_SERVICE_ROLE_KEY**:
   - **CRITICAL**: This is used by the MT4/MT5 EA
   - Same location as above
   - Copy the "service_role secret" key
   - ⚠️ **Never expose this in frontend code or commit to Git**

## Security Notes

- Add `.env.local` to your `.gitignore`
- The service role key has full database access
- Only use it in server-side code and EA
- Never share these keys publicly

## Testing the Configuration

After setting up environment variables:

1. Restart your Next.js development server
2. Test API endpoint: `http://localhost:3000/api/trading-orders`
3. You should see an empty array or existing orders

## For Production

Remember to set these same environment variables in your production environment (Vercel, etc.).
