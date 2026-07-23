/**
 * Tradix Signal Monitor Component - Real-time Ticker & Indicator Panel
 */
export class SignalMonitor {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  update(tickData) {
    if (!this.container) return;

    const btc = tickData.pairs['BTC/USDT'];
    const eth = tickData.pairs['ETH/USDT'];
    const sol = tickData.pairs['SOL/USDT'];
    const ind = tickData.indicators;

    this.container.innerHTML = `
      <div class="sidebar-title">Live Market Feeds</div>
      
      <div class="price-ticker">
        <div>
          <div class="ticker-symbol">BTC / USDT</div>
          <div class="metric-trend ${btc.change >= 0 ? 'trend-up' : 'trend-down'}">
            ${btc.change >= 0 ? '▲' : '▼'} ${btc.change}%
          </div>
        </div>
        <div class="ticker-price">$${btc.price.toLocaleString()}</div>
      </div>

      <div class="price-ticker">
        <div>
          <div class="ticker-symbol">ETH / USDT</div>
          <div class="metric-trend ${eth.change >= 0 ? 'trend-up' : 'trend-down'}">
            ${eth.change >= 0 ? '▲' : '▼'} ${eth.change}%
          </div>
        </div>
        <div class="ticker-price">$${eth.price.toLocaleString()}</div>
      </div>

      <div class="price-ticker">
        <div>
          <div class="ticker-symbol">SOL / USDT</div>
          <div class="metric-trend ${sol.change >= 0 ? 'trend-up' : 'trend-down'}">
            ${sol.change >= 0 ? '▲' : '▼'} ${sol.change}%
          </div>
        </div>
        <div class="ticker-price">$${sol.price.toLocaleString()}</div>
      </div>

      <div class="sidebar-title" style="margin-top: 10px;">Technical Signals</div>
      
      <div class="glass-panel metric-card">
        <div class="metric-title">BTC RSI (14 Period)</div>
        <div class="metric-value" style="color: ${ind.rsi < 30 ? 'var(--trade-bull)' : ind.rsi > 70 ? 'var(--trade-bear)' : 'var(--accent-cyan)'}">
          ${ind.rsi}
        </div>
        <div class="metric-trend">
          ${ind.rsi < 45 ? '⚡ Signal: Oversold Buying Zone' : '↔ Neutral Zone'}
        </div>
      </div>

      <div class="glass-panel metric-card">
        <div class="metric-title">EMA 9 Trend Filter</div>
        <div class="metric-value">$${ind.ema9}</div>
        <div class="metric-trend trend-up">
          ${ind.price > ind.ema9 ? 'Bullish Above EMA9' : 'Bearish Below EMA9'}
        </div>
      </div>
    `;
  }
}
