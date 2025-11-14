'use client';

import React from 'react';

export default function LiveTickerTape() {
  return (
    <div className="relative w-full h-[100px] overflow-hidden">
      {/* Iframe */}
      <iframe
        src="https://fxpricing.com/fx-widget/ticker-tape-widget.php?id=1,20,13,19,112,18,39,1984&border=show&speed=80&pair_weight=normal&click_target=blank&theme=dark&tm-cr=212529&hr-cr=FFFFFF13&by-cr=28A745&sl-cr=DC3545&flags=circle&d_mode=compact-name&column=ask,bid,spread,chg_per&tp_scl=ltr&dir=rtl&lang=en&font=Arial, sans-serif"
        width="100%"
        height="100"
        style={{ border: 'unset' }}
        title="Live Forex Ticker Tape"
      />

      {/* Transparent overlay to prevent clicks */}
      <div className="absolute inset-0 cursor-default" style={{ pointerEvents: 'all' }} />
    </div>
  );
}
