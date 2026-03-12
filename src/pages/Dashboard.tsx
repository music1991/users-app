import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">Sesión iniciada correctamente</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="space-y-3">
          <div className="border rounded-xl p-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold text-gray-800">{user?.email}</p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-sm text-gray-500">Rol</p>
            <p className="text-lg font-semibold text-gray-800">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;