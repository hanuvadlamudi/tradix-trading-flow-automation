/**
 * Tradix Application Entry Point - Main Orchestrator
 */
import { MarketDataEngine } from './utils/MarketData.js';
import { FlowEngine } from './utils/FlowEngine.js';
import { FlowCanvas } from './components/FlowCanvas.js';
import { SignalMonitor } from './components/SignalMonitor.js';
import { OrderConsole } from './components/OrderConsole.js';
import { AnalyticsManager } from './components/Analytics.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Subsystems
  const marketEngine = new MarketDataEngine();
  const flowEngine = new FlowEngine();
  const canvas = new FlowCanvas('canvas-container');
  const signalMonitor = new SignalMonitor('right-panel-container');
  const orderConsole = new OrderConsole('console-logs-container');
  const analytics = new AnalyticsManager();

  // Listen to Market Data Ticks
  marketEngine.onTick(tickData => {
    signalMonitor.update(tickData);
    flowEngine.evaluate(tickData);
  });

  // Listen to Automated Flow Executions
  flowEngine.onOrderExecuted(order => {
    orderConsole.logOrder(order);
    analytics.recordTrade(order);
    canvas.highlightExecutionStep('n4');
  });

  // Action Buttons
  const runBtn = document.getElementById('btn-run-automation');
  const addNodeBtn = document.getElementById('btn-add-node');

  if (runBtn) {
    let isRunning = true;
    runBtn.addEventListener('click', () => {
      isRunning = !isRunning;
      runBtn.innerHTML = isRunning ? '⚡ Pause Pipeline' : '▶ Resume Pipeline';
      runBtn.style.background = isRunning ? '' : 'var(--trade-warning)';
      orderConsole.addLog(
        isRunning ? 'info' : 'alert',
        `Flow Engine pipeline ${isRunning ? 'RESUMED' : 'PAUSED'} by user.`
      );
    });
  }

  if (addNodeBtn) {
    addNodeBtn.addEventListener('click', () => {
      orderConsole.addLog('info', 'Node selector opened: Select trigger, indicator, or execution block.');
    });
  }

  // Initial Analytics Display Update
  analytics.updateUI();
});
