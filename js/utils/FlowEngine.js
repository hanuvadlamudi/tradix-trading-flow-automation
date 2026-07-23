/**
 * Tradix Flow Engine - Pipeline Execution & Trading Rule Evaluator
 */
export class FlowEngine {
  constructor() {
    this.activeFlows = [
      {
        id: 'flow-101',
        name: 'RSI Oversold Momentum Buy',
        symbol: 'BTC/USDT',
        status: 'RUNNING',
        nodes: [
          { type: 'TRIGGER', label: 'Price Ticker Stream', param: 'BTC/USDT' },
          { type: 'INDICATOR', label: 'RSI Filter', param: 'RSI < 45' },
          { type: 'RISK', label: 'Max Drawdown Guard', param: 'Max Risk 2%' },
          { type: 'ACTION', label: 'Execute Long Order', param: 'Limit 0.05 BTC' }
        ],
        lastExecuted: null
      },
      {
        id: 'flow-102',
        name: 'Breakout Scalping Strategy',
        symbol: 'ETH/USDT',
        status: 'IDLE',
        nodes: [
          { type: 'TRIGGER', label: 'Webhook Alert', param: 'TradingView Alert' },
          { type: 'INDICATOR', label: 'EMA Trend Confirmation', param: 'Price > EMA 9' },
          { type: 'ACTION', label: 'Execute Market Buy', param: 'Amount $500' }
        ],
        lastExecuted: null
      }
    ];

    this.onExecutionCallbacks = [];
  }

  evaluate(marketTick) {
    const btcIndicators = marketTick.indicators;
    
    // Evaluate active flows against current market indicators
    this.activeFlows.forEach(flow => {
      if (flow.status !== 'RUNNING') return;

      // Simulated condition check (e.g. RSI condition or price threshold)
      if (btcIndicators.rsi < 45) {
        const now = Date.now();
        // Cooldown of 10s between automated order executions
        if (!flow.lastExecuted || (now - flow.lastExecuted) > 10000) {
          flow.lastExecuted = now;
          const order = {
            id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            flowId: flow.id,
            flowName: flow.name,
            symbol: flow.symbol,
            side: 'BUY',
            price: marketTick.pairs[flow.symbol].price,
            amount: '0.05',
            timestamp: new Date().toLocaleTimeString(),
            status: 'EXECUTED'
          };
          this.triggerExecution(order);
        }
      }
    });
  }

  onOrderExecuted(callback) {
    this.onExecutionCallbacks.push(callback);
  }

  triggerExecution(order) {
    this.onExecutionCallbacks.forEach(cb => cb(order));
  }

  toggleFlowState(flowId) {
    const flow = this.activeFlows.find(f => f.id === flowId);
    if (flow) {
      flow.status = flow.status === 'RUNNING' ? 'PAUSED' : 'RUNNING';
    }
    return flow;
  }
}
