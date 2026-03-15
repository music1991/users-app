import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginRequest } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { loginSchema } from "../utils/validationSchemas";
import { LoginRequest } from "../types/auth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    setServerError("");
    try {
      const response = await loginRequest(data);
      login(response);
      navigate("/profile", { replace: true });
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Iniciar sesión</h1>
          <p className="text-sm text-gray-500 mt-2">Ingresa tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Correo</label>
            <input
              {...register("email")}
              type="email"
              placeholder="correo@ejemplo.com"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all focus:ring-2 ${
                errors.email 
                  ? "border-red-500 focus:ring-red-100" 
                  : "border-gray-300 focus:ring-blue-100 focus:border-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Contraseña</label>
            <input
              {...register("password")}
              type="password"
              placeholder="****"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all focus:ring-2 ${
                errors.password 
                  ? "border-red-500 focus:ring-red-100" 
                  : "border-gray-300 focus:ring-blue-100 focus:border-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.password.message}</p>
            )}
          </div>

          {serverError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 font-medium animate-in slide-in-from-top-1">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Entrando...</span>
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;