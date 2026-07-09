import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('auth') === 'true'
    })

    const login = () => {
        setIsAuthenticated(true)
        localStorage.setItem('auth', 'true')
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem('auth')
    }

    return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}