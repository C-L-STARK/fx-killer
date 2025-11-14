import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * DELETE /api/brand/presets/delete
 * 删除品牌预设
 *
 * Body: { presetName: string }
 */
export async function DELETE(request: Request) {
  try {
    const { presetName } = await request.json();

    if (!presetName || typeof presetName !== 'string') {
      return NextResponse.json(
        { error: 'Preset name is required' },
        { status: 400 }
      );
    }

    // 不允许删除默认预设
    if (presetName === 'fxkiller') {
      return NextResponse.json(
        { error: 'Cannot delete default preset "fxkiller"' },
        { status: 403 }
      );
    }

    const { error } = await supabase
      .from('brand_presets')
      .delete()
      .eq('preset_name', presetName);

    if (error) {
      console.error('Failed to delete preset:', error);
      return NextResponse.json(
        { error: 'Failed to delete preset' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Preset "${presetName}" deleted successfully`,
    });
  } catch (error) {
    console.error('Failed to delete preset:', error);
    return NextResponse.json(
      { error: 'Failed to delete preset' },
      { status: 500 }
    );
  }
}
