import { NextResponse } from 'next/server';
import { getBrandPresets } from '@/lib/brand-config';

/**
 * GET /api/brand/presets
 * Get list of available brand presets
 * FOR DEVELOPMENT/TESTING ONLY
 */
export async function GET() {
  try {
    // Only allow in development mode
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'This endpoint is only available in development mode' },
        { status: 403 }
      );
    }

    const presets = await getBrandPresets();

    return NextResponse.json({
      presets,
      count: presets.length,
    });
  } catch (error) {
    console.error('Failed to get brand presets:', error);
    return NextResponse.json(
      { error: 'Failed to get brand presets' },
      { status: 500 }
    );
  }
}
