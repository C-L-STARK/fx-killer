import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * POST /api/brand/presets/save
 * 保存当前配置为新预设
 *
 * Body: { presetName: string }
 */
export async function POST(request: Request) {
  try {
    const { presetName } = await request.json();

    if (!presetName || typeof presetName !== 'string') {
      return NextResponse.json(
        { error: 'Preset name is required' },
        { status: 400 }
      );
    }

    // 获取当前配置
    const { data: currentConfig, error: configError } = await supabase
      .from('brand_config')
      .select('*')
      .single();

    if (configError || !currentConfig) {
      return NextResponse.json(
        { error: 'Failed to load current config' },
        { status: 500 }
      );
    }

    // 移除不需要保存的字段
    const { id, created_at, updated_at, ...presetData } = currentConfig;

    // 检查预设是否已存在
    const { data: existing } = await supabase
      .from('brand_presets')
      .select('preset_name')
      .eq('preset_name', presetName)
      .single();

    if (existing) {
      // 更新现有预设
      const { error: updateError } = await supabase
        .from('brand_presets')
        .update({ preset_data: presetData })
        .eq('preset_name', presetName);

      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to update preset' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Preset "${presetName}" updated successfully`,
        presetName,
      });
    } else {
      // 创建新预设
      const { error: insertError } = await supabase
        .from('brand_presets')
        .insert({
          preset_name: presetName,
          preset_data: presetData,
        });

      if (insertError) {
        return NextResponse.json(
          { error: 'Failed to create preset' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Preset "${presetName}" created successfully`,
        presetName,
      });
    }
  } catch (error) {
    console.error('Failed to save preset:', error);
    return NextResponse.json(
      { error: 'Failed to save preset' },
      { status: 500 }
    );
  }
}
