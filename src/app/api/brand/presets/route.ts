import { NextResponse } from 'next/server';
import { getBrandPresets } from '@/lib/brand-config';

/**
 * GET /api/brand/presets
 * Get list of available brand presets
 */
export async function GET() {
  try {
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
