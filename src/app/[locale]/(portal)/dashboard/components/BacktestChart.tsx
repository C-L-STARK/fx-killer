"use client";

import React, { useEffect, useRef, useState } from 'react';
import type { Candle, Trade } from '@/lib/trading/types';

interface BacktestChartProps {
  candles: Candle[];
  trades: Trade[];
  symbol: string;
}

export default function BacktestChart({ candles, trades, symbol }: BacktestChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any | null>(null);
  const [chartError, setChartError] = useState<string | null>(null);
  const [isChartLoaded, setIsChartLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadChart = async () => {
      try {
        if (!chartContainerRef.current) {
          console.error('[BacktestChart] Container ref is null');
          return;
        }

        if (candles.length === 0) {
          console.warn('[BacktestChart] No candles to display');
          setChartError('没有K线数据');
          return;
        }

        // Cleanup previous chart
        if (chartRef.current) {
          try {
            chartRef.current.remove();
          } catch (e) {
            console.warn('[BacktestChart] Error removing previous chart:', e);
          }
          chartRef.current = null;
        }

        console.log(`[BacktestChart] Loading chart with ${candles.length} candles and ${trades.length} trades`);

        // Dynamic import
        const LightweightCharts = await import('lightweight-charts');

        if (!isMounted) return;

        const container = chartContainerRef.current;
        const width = container.clientWidth || 800;
        const height = 500;

        console.log(`[BacktestChart] Creating chart: ${width}x${height}`);
        console.log(`[BacktestChart] LightweightCharts object:`, Object.keys(LightweightCharts));

        // Create chart using the exported function
        const chart = LightweightCharts.createChart(container, {
          width,
          height,
          layout: {
            background: { color: '#ffffff' },
            textColor: '#191919',
          },
          grid: {
            vertLines: { color: '#e1e1e1' },
            horzLines: { color: '#e1e1e1' },
          },
          timeScale: {
            borderColor: '#ccc',
            timeVisible: true,
            secondsVisible: false,
          },
          rightPriceScale: {
            borderColor: '#ccc',
          },
        });

        if (!chart) {
          throw new Error('Failed to create chart instance');
        }

        chartRef.current = chart;

        // Log all properties and methods
        console.log('[BacktestChart] Chart object keys:', Object.keys(chart));
        console.log('[BacktestChart] Chart object getOwnPropertyNames:', Object.getOwnPropertyNames(chart));
        console.log('[BacktestChart] Chart prototype:', Object.getOwnPropertyNames(Object.getPrototypeOf(chart)));

        // The chart might have methods in its prototype or as non-enumerable properties
        // Try to find the addCandlestickSeries or addSeries method
        let candlestickSeries: any;

        // Cast chart to any to access dynamic methods
        const chartAny = chart as any;

        // Method 1: Direct method call (v4 style)
        if (typeof chartAny.addCandlestickSeries === 'function') {
          console.log('[BacktestChart] Using chart.addCandlestickSeries()');
          candlestickSeries = chartAny.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
          });
        }
        // Method 2: addSeries with type parameter (v5 beta style)
        else if (typeof chartAny.addSeries === 'function') {
          console.log('[BacktestChart] Using chart.addSeries()');
          candlestickSeries = chartAny.addSeries(LightweightCharts.CandlestickSeries, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
          });
        }
        // Method 3: Direct instantiation (if exposed)
        else if (LightweightCharts.CandlestickSeries && typeof LightweightCharts.CandlestickSeries === 'function') {
          console.log('[BacktestChart] Creating CandlestickSeries directly');
          candlestickSeries = new (LightweightCharts.CandlestickSeries as any)(chart, {
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
          });
        }
        // Method 4: Fallback - use simple area series if candlestick not available
        else if (typeof chartAny.addAreaSeries === 'function') {
          console.warn('[BacktestChart] Candlestick series not available, using area series as fallback');
          candlestickSeries = chartAny.addAreaSeries({
            topColor: 'rgba(38, 166, 154, 0.4)',
            bottomColor: 'rgba(38, 166, 154, 0.0)',
            lineColor: '#26a69a',
            lineWidth: 2,
          });
        }
        else {
          throw new Error(`No suitable series creation method found. Chart type: ${chart.constructor?.name}`);
        }

        if (!candlestickSeries) {
          throw new Error('Failed to create candlestick series');
        }

        console.log('[BacktestChart] Series created successfully');

        // Format and set data
        const chartData = candles.map(c => ({
          time: Math.floor(c.openTime / 1000),
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
          value: c.close, // For area series fallback
        }));

        console.log(`[BacktestChart] Setting ${chartData.length} candles to series`);
        candlestickSeries.setData(chartData);

        // Add trade markers (lightweight-charts v5 doesn't have setMarkers)
        // We'll use line series to mark trades instead
        console.log(`[BacktestChart] 📊 Preparing to add markers for ${trades.length} trades`);
        console.log(`[BacktestChart] Trades data:`, trades.map(t => ({
          entry: new Date(t.entryTime).toISOString(),
          exit: t.exitTime ? new Date(t.exitTime).toISOString() : 'open',
          side: t.side,
          pnl: t.pnl
        })));

        if (trades.length > 0) {
          // Use line series to mark buy/sell points
          const buyPoints: any[] = [];
          const sellPoints: any[] = [];

          trades.forEach((trade, idx) => {
            const entryTime = Math.floor(trade.entryTime / 1000);
            const entryPrice = trade.entryPrice;

            if (trade.side === 'long') {
              buyPoints.push({ time: entryTime, value: entryPrice });
              console.log(`[BacktestChart] Trade ${idx + 1} LONG entry: ${new Date(trade.entryTime).toISOString()} @ ${entryPrice}`);
            } else {
              sellPoints.push({ time: entryTime, value: entryPrice });
              console.log(`[BacktestChart] Trade ${idx + 1} SHORT entry: ${new Date(trade.entryTime).toISOString()} @ ${entryPrice}`);
            }

            if (trade.exitTime) {
              const exitTime = Math.floor(trade.exitTime / 1000);
              const exitPrice = trade.exitPrice!;
              const profit = trade.pnl || 0;

              if (trade.side === 'long') {
                sellPoints.push({ time: exitTime, value: exitPrice });
              } else {
                buyPoints.push({ time: exitTime, value: exitPrice });
              }
              console.log(`[BacktestChart] Trade ${idx + 1} exit: ${new Date(trade.exitTime).toISOString()} @ ${exitPrice}, P&L: ${profit >= 0 ? '+' : ''}$${profit.toFixed(2)}`);
            }
          });

          // Add buy markers (green arrows pointing up)
          if (buyPoints.length > 0 && typeof chart.addSeries === 'function') {
            try {
              const buyMarkers = chart.addSeries(LightweightCharts.LineSeries, {
                color: '#26a69a',
                lineWidth: 1 as any, // Minimal line width to hide the line
                lineVisible: false,
                crosshairMarkerVisible: true,
                crosshairMarkerRadius: 6,
                crosshairMarkerBorderColor: '#26a69a',
                crosshairMarkerBackgroundColor: '#26a69a',
                lastValueVisible: false,
                priceLineVisible: false,
              } as any);
              buyMarkers.setData(buyPoints);
              console.log(`[BacktestChart] ✅ Added ${buyPoints.length} BUY markers (green)`);
            } catch (e) {
              console.error('[BacktestChart] Failed to add buy markers:', e);
            }
          }

          // Add sell markers (red arrows pointing down)
          if (sellPoints.length > 0 && typeof chart.addSeries === 'function') {
            try {
              const sellMarkers = chart.addSeries(LightweightCharts.LineSeries, {
                color: '#ef5350',
                lineWidth: 1 as any, // Minimal line width to hide the line
                lineVisible: false,
                crosshairMarkerVisible: true,
                crosshairMarkerRadius: 6,
                crosshairMarkerBorderColor: '#ef5350',
                crosshairMarkerBackgroundColor: '#ef5350',
                lastValueVisible: false,
                priceLineVisible: false,
              } as any);
              sellMarkers.setData(sellPoints);
              console.log(`[BacktestChart] ✅ Added ${sellPoints.length} SELL markers (red)`);
            } catch (e) {
              console.error('[BacktestChart] Failed to add sell markers:', e);
            }
          }

          console.log(`[BacktestChart] ✅ Trade visualization complete`);
        } else {
          console.log(`[BacktestChart] ⚠️  No trades to display markers for`);
        }

        // Fit content
        if (typeof chart.timeScale === 'function') {
          chart.timeScale().fitContent();
        }

        console.log(`[BacktestChart] ✅ Chart created successfully with ${candles.length} candles and ${trades.length} trades`);
        setChartError(null);
        setIsChartLoaded(true);

        // Handle resize
        const handleResize = () => {
          if (container && chartRef.current) {
            try {
              const newWidth = container.clientWidth;
              chartRef.current.applyOptions({ width: newWidth });
            } catch (e) {
              console.warn('[BacktestChart] Error during resize:', e);
            }
          }
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          if (chartRef.current) {
            try {
              chartRef.current.remove();
            } catch (e) {
              console.warn('[BacktestChart] Error during cleanup:', e);
            }
            chartRef.current = null;
          }
        };
      } catch (error: any) {
        console.error('[BacktestChart] ❌ Error creating chart:', error);
        console.error('[BacktestChart] Error stack:', error.stack);
        setChartError(error.message || 'Unknown error creating chart');
        setIsChartLoaded(false);
      }
    };

    loadChart();

    return () => {
      isMounted = false;
      if (chartRef.current) {
        try {
          chartRef.current.remove();
        } catch (e) {
          console.warn('[BacktestChart] Error during unmount cleanup:', e);
        }
        chartRef.current = null;
      }
    };
  }, [candles, trades]);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-bold text-white">
          {symbol} K线图 ({candles.length} 根K线, {trades.length} 笔交易)
        </h4>
        <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-black dark:text-green-400 border border-green-600">
            ▲ 买入
          </span>
          <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-black dark:text-red-400 border border-red-600">
            ▼ 卖出
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-black dark:text-gray-400 border border-gray-600">
            ● 平仓
          </span>
        </div>
      </div>

      {chartError && (
        <div className="mb-2 p-4 bg-red-100 border-2 border-red-600 text-red-800 dark:bg-red-900 dark:text-red-200">
          <p className="font-bold">图表加载失败</p>
          <p className="text-sm">{chartError}</p>
          <p className="text-xs mt-2">请查看浏览器控制台了解详细错误信息</p>
        </div>
      )}

      {!isChartLoaded && !chartError && (
        <div className="mb-2 p-4 bg-blue-100 border-2 border-blue-600 text-blue-800">
          <p>正在加载图表...</p>
        </div>
      )}

      <div
        ref={chartContainerRef}
        className="border-2 border-gray-800 bg-black"
        style={{ height: '500px', width: '100%', minWidth: '300px' }}
      />
    </div>
  );
}
