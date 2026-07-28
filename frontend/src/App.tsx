import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { ReactFlowProvider } from '@xyflow/react';
import CreateWorkFlow from './components/CreateWorkFlow';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-work-flow" element={
          <ReactFlowProvider>
            <CreateWorkFlow />
          </ReactFlowProvider>
        } />
      </Routes>
    </BrowserRouter>
  );
}