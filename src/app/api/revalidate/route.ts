import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint to revalidate (clear cache) specific pages
 * Usage: GET /api/revalidate?path=/zh/splan/blog&secret=your_secret
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');
  const secret = searchParams.get('secret');

  // Verify secret token (optional but recommended for security)
  const revalidateSecret = process.env.REVALIDATE_SECRET || 'dev_secret_change_in_production';

  if (secret !== revalidateSecret) {
    return NextResponse.json(
      { error: 'Invalid secret' },
      { status: 401 }
    );
  }

  if (!path) {
    return NextResponse.json(
      { error: 'Missing path parameter' },
      { status: 400 }
    );
  }

  try {
    // Revalidate the specific path
    revalidatePath(path);

    console.log(`[Revalidate] Cache cleared for path: ${path}`);

    return NextResponse.json({
      success: true,
      message: `Cache cleared for ${path}`,
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    console.error('[Revalidate] Error:', error);
    return NextResponse.json(
      {
        error: 'Error revalidating',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
