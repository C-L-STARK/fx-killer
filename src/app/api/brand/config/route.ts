import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { clearBrandConfigCache } from '@/lib/brand-config';

/**
 * GET /api/brand/config
 * 获取当前品牌配置
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('brand_config')
      .select('*')
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to load brand config' },
        { status: 500 }
      );
    }

    return NextResponse.json({ config: data });
  } catch (error) {
    console.error('Failed to get brand config:', error);
    return NextResponse.json(
      { error: 'Failed to get brand config' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/brand/config
 * 更新品牌配置
 */
export async function PUT(request: Request) {
  try {
    const updates = await request.json();

    // 获取当前配置的 ID
    const { data: current } = await supabase
      .from('brand_config')
      .select('id')
      .single();

    if (!current?.id) {
      return NextResponse.json(
        { error: 'Brand config not found' },
        { status: 404 }
      );
    }

    // 更新配置
    const { data, error } = await supabase
      .from('brand_config')
      .update(updates)
      .eq('id', current.id)
      .select()
      .single();

    if (error) {
      console.error('Failed to update brand config:', error);
      return NextResponse.json(
        { error: 'Failed to update brand config' },
        { status: 500 }
      );
    }

    // 清除缓存
    clearBrandConfigCache();

    return NextResponse.json({
      success: true,
      message: 'Brand config updated successfully',
      config: data,
    });
  } catch (error) {
    console.error('Failed to update brand config:', error);
    return NextResponse.json(
      { error: 'Failed to update brand config' },
      { status: 500 }
    );
  }
}
