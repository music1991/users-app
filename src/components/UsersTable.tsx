import { useNavigate } from "react-router-dom";
import { User, UserRole } from "../types/user";
import { Eye, Trash2 } from "lucide-react";

interface UsersTableProps {
  users: User[];
  onDelete: (id: number) => void;
}

function UsersTable({ users, onDelete }: UsersTableProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-gray-50 text-gray-600 text-sm">
            <th className="text-left p-4 border-b font-semibold w-1/2">Correo</th>
            <th className="text-left p-4 border-b font-semibold w-1/4">Rol</th>
            <th className="text-right p-4 border-b font-semibold w-1/4">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="p-4 text-gray-700 font-medium">{user.email}</td>

              <td className="p-4">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                    user.role === UserRole.Admin
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/users/${user.id}`)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all text-sm font-semibold"
                  >
                    <Eye size={16} />
                    <span>Ver</span>
                  </button>

                  <button
                    onClick={() => onDelete(user.id)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all text-sm font-semibold"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
