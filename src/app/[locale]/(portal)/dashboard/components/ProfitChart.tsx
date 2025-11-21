"use client";

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { BacktestResult } from '@/lib/trading/types';

interface ProfitChartProps {
  results: BacktestResult;
}

export default function ProfitChart({ results }: ProfitChartProps) {
  // Prepare data for chart
  const chartData = (results.equityCurve || []).map((point, index) => ({
    index,
    time: new Date(point.timestamp).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    }),
    equity: Number(point.equity) || 0,
    profit: (Number(point.equity) || 0) - (results.startCapital || 0),
  }));

  console.log('ProfitChart data:', {
    equityCurveLength: results.equityCurve?.length || 0,
    chartDataLength: chartData.length,
    firstPoint: chartData[0],
    lastPoint: chartData[chartData.length - 1],
  });

  // If no data, show empty state
  if (chartData.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-black rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">暂无数据</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">请先运行回测以生成资金曲线</p>
        </div>
      </div>
    );
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#0a0a0a] border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {data.time}
          </p>
          <p className="text-sm text-gray-400">
            资金: <span className="font-semibold">${data.equity.toFixed(2)}</span>
          </p>
          <p className={`text-sm ${
            data.profit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            盈亏: <span className="font-semibold">
              {data.profit >= 0 ? '+' : ''}${data.profit.toFixed(2)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <ReferenceLine
              y={results.startCapital}
              stroke="#6B7280"
              strokeDasharray="3 3"
              label={{
                value: '初始资金',
                position: 'right',
                fill: '#9CA3AF',
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="equity"
              stroke="#6366F1"
              strokeWidth={2}
              dot={false}
              name="资金曲线"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[150px]">
            <p className="text-xs font-medium text-gray-400 mb-2">起始资金</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              ${(results.startCapital || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex-1 min-w-[150px]">
            <p className="text-xs font-medium text-gray-400 mb-2">结束资金</p>
            <p className={`text-xl font-bold ${
              (results.endCapital || 0) >= (results.startCapital || 0)
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              ${(results.endCapital || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="flex-1 min-w-[150px]">
            <p className="text-xs font-medium text-gray-400 mb-2">收益率</p>
            <p className={`text-xl font-bold ${
              (results.totalPnlPercent || 0) >= 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {(results.totalPnlPercent || 0) >= 0 ? '+' : ''}{(results.totalPnlPercent || 0).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
