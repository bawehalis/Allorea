'use client'
import { Toaster } from 'react-hot-toast'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'var(--font-jost)',
            fontSize: '13px',
            background: '#0f0e0c',
            color: '#faf8f5',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '0',
            padding: '12px 16px',
          },
          success: { iconTheme: { primary:'#b5804f', secondary:'#faf8f5' } },
          error:   { iconTheme: { primary:'#ef4444', secondary:'#fff' } },
        }}
      />
    </>
  )
}
