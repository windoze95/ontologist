import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import AIChatPanel from './AIChatPanel'

export default function Layout({ children }) {
  const { state } = useApp()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-navy-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0">
        <TopBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* AI Chat Panel */}
      {state.aiChatOpen && (
        <div className="w-96 flex-shrink-0 border-l border-navy-600">
          <AIChatPanel />
        </div>
      )}
    </div>
  )
}
