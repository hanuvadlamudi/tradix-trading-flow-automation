/**
 * Tradix Flow Canvas Component - Visual Trading Flow Builder & Graph Renderer
 */
export class FlowCanvas {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.nodes = [
      { id: 'n1', type: 'trigger', icon: '⚡', title: 'Market Data Trigger', subtitle: 'Pair: BTC/USDT Ticks', x: 60, y: 120, status: 'Active' },
      { id: 'n2', type: 'indicator', icon: '📊', title: 'RSI Indicator Filter', subtitle: 'Condition: RSI < 45', x: 340, y: 120, status: 'Evaluating' },
      { id: 'n3', type: 'risk', icon: '🛡️', title: 'Risk Guard Manager', subtitle: 'Max Risk: 2% / Stop Loss: 1.5%', x: 620, y: 120, status: 'Ready' },
      { id: 'n4', type: 'action', icon: '🚀', title: 'Execute Limit Order', subtitle: 'Action: BUY 0.05 BTC', x: 900, y: 120, status: 'Standby' }
    ];
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="canvas-grid-bg" id="flow-graph-canvas">
        <svg class="connections-layer" id="svg-connections">
          <!-- SVG Wires between nodes -->
          <path d="M 280 165 C 310 165, 310 165, 340 165" stroke="#38bdf8" stroke-width="3" fill="none" stroke-dasharray="6,3" />
          <path d="M 560 165 C 590 165, 590 165, 620 165" stroke="#f59e0b" stroke-width="3" fill="none" />
          <path d="M 840 165 C 870 165, 870 165, 900 165" stroke="#10b981" stroke-width="3" fill="none" />
        </svg>
        ${this.nodes.map(node => this.createNodeMarkup(node)).join('')}
      </div>
    `;

    this.bindEvents();
  }

  createNodeMarkup(node) {
    return `
      <div class="flow-node-card active" id="${node.id}" style="left: ${node.x}px; top: ${node.y}px;">
        <div class="connector-left node-connector-dot"></div>
        <div class="node-header">
          <div class="node-title-box">
            <span class="node-icon ${node.type}">${node.icon}</span>
            <span>${node.title}</span>
          </div>
        </div>
        <div class="node-body">
          <div>${node.subtitle}</div>
          <div class="node-param-row">
            <span>Status:</span>
            <span style="color: var(--accent-cyan)">${node.status}</span>
          </div>
        </div>
        <div class="connector-right node-connector-dot"></div>
      </div>
    `;
  }

  bindEvents() {
    // Add drag and interactive highlighting handlers
    const cards = this.container.querySelectorAll('.flow-node-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => card.classList.add('hover-glow'));
      card.addEventListener('mouseleave', () => card.classList.remove('hover-glow'));
    });
  }

  highlightExecutionStep(nodeId) {
    const nodeEl = document.getElementById(nodeId);
    if (nodeEl) {
      nodeEl.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.8)';
      nodeEl.style.borderColor = '#10b981';
      setTimeout(() => {
        nodeEl.style.boxShadow = '';
        nodeEl.style.borderColor = '';
      }, 1200);
    }
  }
}
