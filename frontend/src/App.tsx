import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Analysis from './pages/Analysis'
import Alerts from './pages/Alerts'
import Alarms from './pages/Alarms'
import Reports from './pages/Reports'
import Layout from './components/layout/Layout'
// 👇 New imports
import PumpDetail from './pages/PumpDetail'
import TankDetail from './pages/TankDetail'

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <DataProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <Layout>{null}</Layout>
                                    </ProtectedRoute>
                                }
                            >
                                <Route index element={<Navigate to="/dashboard" replace />} />
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="analysis" element={<Analysis />} />
                                <Route path="alerts" element={<Alerts />} />
                                <Route path="alarms" element={<Alarms />} />
                                <Route path="reports" element={<Reports />} />
                                {/* 👇 New routes for detail pages */}
                                <Route path="pump/:id" element={<PumpDetail />} />
                                <Route path="tank/:id" element={<TankDetail />} />
                            </Route>
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </BrowserRouter>
                </DataProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}

export default App