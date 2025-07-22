import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Sidebar from "@/components/organisms/Sidebar"
import Dashboard from "@/components/pages/Dashboard"
import Contacts from "@/components/pages/Contacts"
import Deals from "@/components/pages/Deals"
import Tasks from "@/components/pages/Tasks"
import Activities from "@/components/pages/Activities"

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Routes>
          <Route 
            path="/" 
            element={<Dashboard onMenuClick={() => setSidebarOpen(true)} />} 
          />
          <Route 
            path="/contacts" 
            element={<Contacts onMenuClick={() => setSidebarOpen(true)} />} 
          />
          <Route 
            path="/deals" 
            element={<Deals onMenuClick={() => setSidebarOpen(true)} />} 
          />
          <Route 
            path="/tasks" 
            element={<Tasks onMenuClick={() => setSidebarOpen(true)} />} 
          />
          <Route 
            path="/activities" 
            element={<Activities onMenuClick={() => setSidebarOpen(true)} />} 
          />
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="z-[9999]"
      />
    </div>
  )
}

export default App