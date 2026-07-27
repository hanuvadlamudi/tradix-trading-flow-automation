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
import { Timer, type TimerNodeMetaData } from '@/nodes/triggers/Timer';
import { PriceTrigger, type PriceTriggerNodeMetaData } from '@/nodes/triggers/PriceTrigger';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { ActionsSheet } from './ActionsSheet';
import { Lighter, type TradingMetaData } from '@/nodes/actions/Lighter';


const nodeTypes = {
  "timer-trigger": Timer,
  "price-trigger": PriceTrigger,
  "lighter": Lighter,
  "hyper-liquid": Lighter,
  "backpack": Lighter,
}

export type NodeKind = "price-trigger" | "timer-trigger" | "hyper-liquid" | "backpack" | "lighter";
export type NodeMetaData = TradingMetaData | PriceTriggerNodeMetaData | TimerNodeMetaData;

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
  const [open, setOpen] = useState(false);
  const [selectAction , setSelectAction] = useState<{
    position : {
      x: number, 
      y: number },
      startingNodeId : string,
      endingNodeId : string,
  } | null>(null);

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

  const onConnectEnd = useCallback(
    (params: any, connectionInfo: any) => {
      if(!connectionInfo.isValid) {
        setOpen(true);
      }
    }, [])

  return (
    <div className="relative h-[calc(100vh-60px)] w-full bg-background">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      {!nodes.length && (
        <TriggerSheet
          onSelect={(kind, metaData) => {
            setNodes([
              ...nodes,
              {
                id: `node-${nodes.length + 1}`,
                type: kind,
                position: { x: 0, y: 0 },
                data: { type: kind, kind: "trigger", metaData, label: kind },
              } as NodeType
            ])
          }}
        />
      )}

      <ActionsSheet
        open={open}
        onOpenChange={setOpen}
        onSelect={(kind, metaData) => {
          setNodes([
            ...nodes,
            {
              id: `node-${nodes.length + 1}`,
              type: kind,
              position: { x: 0, y: 0 },
              data: { type: kind, kind: "action", metaData, label: kind },
            } as NodeType
          ])

          setEdges([...edges , {
            id: `edge-${edges.length + 1}`,
            source: selectAction?.startingNodeId,
            target: `${kind}-${nodes.length + 1}`,
          } as Edge])
        }}
      />

      <ReactFlow
        colorMode={theme}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
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
