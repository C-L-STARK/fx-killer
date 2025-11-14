import { NextResponse } from 'next/server';
import { switchBrandPreset, clearBrandConfigCache } from '@/lib/brand-config';
import { revalidatePath } from 'next/cache';

/**
 * POST /api/brand/switch
 * Switch to a different brand preset
 * FOR DEVELOPMENT/TESTING ONLY
 *
 * Body: { presetName: string }
 */
export async function POST(request: Request) {
  try {
    // Only allow in development mode
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'This endpoint is only available in development mode' },
        { status: 403 }
      );
    }

    const { presetName } = await request.json();

    if (!presetName) {
      return NextResponse.json(
        { error: 'presetName is required' },
        { status: 400 }
      );
    }

    const success = await switchBrandPreset(presetName);

    if (success) {
      // Clear cache to ensure new config is loaded
      clearBrandConfigCache();

      // Revalidate all paths to clear Next.js server cache
      revalidatePath('/', 'layout');

      return NextResponse.json({
        success: true,
        message: `Switched to brand preset: ${presetName}. Please reload the page.`,
        presetName,
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to switch brand preset. Preset may not exist.' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Failed to switch brand preset:', error);
    return NextResponse.json(
      { error: 'Failed to switch brand preset' },
      { status: 500 }
    );
  }
}
