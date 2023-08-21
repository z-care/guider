"use client"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from "react"

export interface ProviderProps {
    children: React.ReactNode
}


const defaultTheme = createTheme()


export const Provider = ({ children }: ProviderProps) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}