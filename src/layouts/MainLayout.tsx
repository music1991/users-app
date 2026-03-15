import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ConfirmModal from "../components/ConfirmModal";
import { useSessionTimeout } from "../hooks/useSessionTimeout";
import { ToastContainer } from 'react-toastify';

function MainLayout() {
  const { 
    showWarning, 
    isRefreshing, 
    handleContinueSession, 
    handleManualLogout 
  } = useSessionTimeout();

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} /> 
      <Navbar />
      
      <main className="max-w-6xl mx-auto p-4 sm:p-6">
        <Outlet />
      </main>

      <ConfirmModal
        isOpen={showWarning}
        title="Tu sesión va a expirar"
        message="¿Deseas continuar conectado o prefieres cerrar la sesión?"
        confirmText="Continuar"
        cancelText="Cerrar sesión"
        onClose={handleManualLogout}
        onConfirm={handleContinueSession}
        isLoading={isRefreshing}
      />
    </div>
  );
}

export default MainLayout;