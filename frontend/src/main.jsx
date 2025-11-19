import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Dashboard from './Pages/Dashboard'
import Stats from './Pages/stats'
import Health from './Pages/Health';
import Analytics from './Pages/Analytics';



createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Dashboard />} />
                    <Route path="code/:code" element={<Stats />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="health" element={<Health />} />

                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)