import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import Pricing from './pages/Pricing';
import Settings from './pages/Settings';
import About from './pages/About';
import Documentation from './pages/Documentation';
import Proposal from './pages/Proposal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="settings" element={<Settings />} />
          <Route path="about" element={<About />} />
          <Route path="documentation" element={<Documentation />} />
        </Route>
        {/* Proposal route outside Layout to have full screen branding */}
        <Route path="/proposal/:id" element={<Proposal />} />
      </Routes>
    </BrowserRouter>
  );
}
