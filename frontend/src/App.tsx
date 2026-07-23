import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import CreateWorkFlow from './components/CreateWorkFlow';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-work-flow" element={<CreateWorkFlow />} />
      </Routes>
    </BrowserRouter>
  );
}