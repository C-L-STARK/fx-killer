'use client';

import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  symbol: string; // e.g., "EURUSD", "AUDUSD"
}

function TradingViewWidget({ symbol }: TradingViewWidgetProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      lineWidth: 2,
      lineType: 0,
      chartType: "candlesticks",
      fontColor: "rgba(255, 255, 255, 1)",
      gridLineColor: "rgba(242, 242, 242, 0.06)",
      volumeUpColor: "rgba(34, 171, 148, 0.5)",
      volumeDownColor: "rgba(247, 82, 95, 0.5)",
      backgroundColor: "#0F0F0F",
      widgetFontColor: "rgba(255, 255, 255, 1)",
      upColor: "rgba(0, 0, 0, 1)",
      downColor: "rgba(255, 255, 255, 1)",
      borderUpColor: "rgba(255, 255, 255, 1)",
      borderDownColor: "rgba(255, 255, 255, 1)",
      wickUpColor: "rgba(255, 255, 255, 1)",
      wickDownColor: "rgba(255, 255, 255, 1)",
      colorTheme: "dark",
      isTransparent: false,
      locale: "en",
      chartOnly: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      valuesTracking: "1",
      changeMode: "price-and-percent",
      symbols: [
        [`TICKMILL:${symbol}|1D|USD`]
      ],
      dateRanges: [
        "1d|5",
        "5d|5",
        "1m|60",
        "6m|240"
      ],
      fontSize: "10",
      headerFontSize: "small",
      autosize: true,
      dateFormat: "yyyy-MM-dd",
      width: "100%",
      height: "100%",
      noTimeScale: false,
      hideDateRanges: false,
      showMA: true,
      maLength: "20",
      maLineColor: "rgba(186, 104, 200, 0.51)",
      maLineWidth: 4,
      hideMarketStatus: false,
      hideSymbolLogo: false
    });

    container.current.appendChild(script);

    // Cleanup function to remove script when component unmounts or symbol changes
    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container w-full h-[600px]" ref={container}>
      <div className="tradingview-widget-container__widget h-full"></div>
    </div>
  );
}

export default memo(TradingViewWidget);
