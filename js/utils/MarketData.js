/**
 * Tradix Market Engine - Real-time Simulated Market Feed & Technical Indicators
 */
export class MarketDataEngine {
  constructor() {
    this.pairs = {
      'BTC/USDT': { price: 68500.00, change: +2.45, high: 69200, low: 67100, history: [] },
      'ETH/USDT': { price: 3540.50, change: -0.80, high: 3620, low: 3480, history: [] },
      'SOL/USDT': { price: 184.20, change: +5.12, high: 189.0, low: 175.5, history: [] }
    };
    this.listeners = [];
    this.initHistory();
    this.startFeed();
  }

  initHistory() {
    // Generate initial historical data points for technical indicators
    Object.keys(this.pairs).forEach(symbol => {
      let base = this.pairs[symbol].price;
      for (let i = 0; i < 30; i++) {
        const delta = (Math.random() - 0.48) * (base * 0.008);
        base += delta;
        this.pairs[symbol].history.push(parseFloat(base.toFixed(2)));
      }
    });
  }

  startFeed() {
    setInterval(() => {
      Object.keys(this.pairs).forEach(symbol => {
        const item = this.pairs[symbol];
        const volatility = symbol.startsWith('BTC') ? 25 : symbol.startsWith('ETH') ? 2.5 : 0.3;
        const delta = (Math.random() - 0.49) * volatility;
        item.price = parseFloat((item.price + delta).toFixed(2));
        item.history.push(item.price);
        if (item.history.length > 50) item.history.shift();
      });

      this.notify({
        timestamp: new Date().toLocaleTimeString(),
        pairs: this.pairs,
        indicators: this.calculateIndicators('BTC/USDT')
      });
    }, 1500);
  }

  calculateIndicators(symbol) {
    const history = this.pairs[symbol].history;
    const currentPrice = this.pairs[symbol].price;
    
    // Calculate 14-period RSI
    const gains = [];
    const losses = [];
    for (let i = history.length - 14; i < history.length - 1; i++) {
      const diff = history[i + 1] - history[i];
      if (diff >= 0) gains.push(diff);
      else losses.push(Math.abs(diff));
    }
    const avgGain = gains.reduce((a, b) => a + b, 0) / 14 || 1;
    const avgLoss = losses.reduce((a, b) => a + b, 0) / 14 || 1;
    const rs = avgGain / avgLoss;
    const rsi = Math.round(100 - (100 / (1 + rs)));

    // Calculate 9-period EMA
    const period = 9;
    const k = 2 / (period + 1);
    let ema = history[0];
    for (let i = 1; i < history.length; i++) {
      ema = (history[i] * k) + (ema * (1 - k));
    }

    return {
      price: currentPrice,
      rsi: rsi,
      ema9: parseFloat(ema.toFixed(2)),
      macd: parseFloat((currentPrice - ema).toFixed(2))
    };
  }

  onTick(callback) {
    this.listeners.push(callback);
  }

  notify(data) {
    this.listeners.forEach(cb => cb(data));
  }
}
