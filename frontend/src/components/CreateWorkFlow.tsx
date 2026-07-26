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
  NodeChange,
} from '@xyflow/react';
import { TriggerSheet } from './TriggerSheet';

export type NodeKind = "price-trigger" | "timer-trigger" | "hyper-liquid" | "backpack" | "lighter";
export type NodeMetaData = any;

interface NodeType {
  data: {
    type: "action" | "trigger",
    kind: NodeKind,
    metaData : NodeMetaData,
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
    <div style={{ width: '100%', height: 'calc(100vh - 60px)' }}>

      {!nodes.length &&  <TriggerSheet onSelect = {(kind , metaData) => {
        setNodes([
          ...nodes,
          {
          id : Math.random().toString(),
          position: { x : 0, y : 0 },
          data : {
            type : "trigger",
            kind,
            metaData
          },
        }
        ])   
      }} />}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

    </div>
  );
}
