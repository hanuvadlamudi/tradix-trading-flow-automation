/**
 * Tradix Order Console Component - Automated Order Ledger & Event Log
 */
export class OrderConsole {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.logs = [
      { time: new Date().toLocaleTimeString(), type: 'info', text: 'Tradix Automation Engine initialized successfully.' },
      { time: new Date().toLocaleTimeString(), type: 'info', text: 'Connected to WebSocket market data stream: BTC/USDT, ETH/USDT, SOL/USDT.' },
      { time: new Date().toLocaleTimeString(), type: 'success', text: 'Flow #101 [RSI Oversold Momentum Buy] status set to ACTIVE.' }
    ];
    this.render();
  }

  addLog(type, text) {
    const time = new Date().toLocaleTimeString();
    this.logs.unshift({ time, type, text });
    if (this.logs.length > 40) this.logs.pop();
    this.render();
  }

  logOrder(order) {
    this.addLog('success', `⚡ ORDER EXECUTED [${order.id}]: ${order.side} ${order.amount} ${order.symbol} @ $${order.price} (${order.flowName})`);
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = this.logs.map(log => `
      <div class="log-entry">
        <span class="log-time">[${log.time}]</span>
        <span class="log-${log.type}">${log.text}</span>
      </div>
    `).join('');
  }
}
