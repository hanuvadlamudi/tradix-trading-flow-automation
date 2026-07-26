import { useState, useCallback } from 'react';
import '@xyflow/react/dist/style.css';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  Background,
  Controls,
} from '@xyflow/react';
import { TriggerSheet } from './TriggerSheet';
import { Timer } from '@/nodes/triggers/Timer';
import { PriceTrigger } from '@/nodes/triggers/PriceTrigger';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/hooks/useTheme';


const nodeTypes = {
  "timer-trigger": Timer,
  "price-trigger": PriceTrigger,
}

export type NodeKind = "price-trigger" | "timer-trigger" | "hyper-liquid" | "backpack" | "lighter";
export type NodeMetaData = any;

interface NodeType {
  data: {
    type: NodeKind ,
    kind:  "action" | "trigger",
    metaData : NodeMetaData,
    label : string,
  },
  id: string,
  position: { x: number, y: number },
}

interface Edge{
  id : string,
  source : string,
  target : string,
}


export default function CreateWorkFlow() {
  const { theme, toggleTheme } = useTheme()
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes: any) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect: OnConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <div className="relative h-[calc(100vh-60px)] w-full bg-background">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      {!nodes.length && (
        <TriggerSheet
          onSelect={(kind, metaData) => {
            setNodes((prev) => [
              ...prev,
              {
                id: `node-${prev.length + 1}`,
                type: kind,
                position: { x: 0, y: 0 },
                data: { type: kind, kind: "trigger", metaData, label: kind },
              } as NodeType,
            ]);
          }}
        />
      )}

      <ReactFlow
        colorMode={theme}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="!bg-background"
      >
        <Background
          color={theme === "dark" ? "oklch(1 0 0 / 0.08)" : "oklch(0 0 0 / 0.1)"}
          gap={22}
          size={1}
        />
        <Controls />
      </ReactFlow>

    </div>
  );
}
