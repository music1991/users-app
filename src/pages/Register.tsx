import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerRequest } from "../api/authApi";
import { registerSchema } from "../utils/validationSchemas";
import { RegisterRequest } from "../types/auth";

function Register() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterRequest) => {
    setServerError("");
    setSuccess("");
    try {
      await registerRequest(data);
      setSuccess("Usuario registrado correctamente");
      reset();
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Error al registrar usuario");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Crear cuenta</h1>
          <p className="text-sm text-gray-500 mt-2">Completa los datos para registrarte</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Email</label>
            <input
              {...register("email")}
              type="email"
              placeholder="correo@ejemplo.com"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-100" : "border-gray-300 focus:ring-green-100 focus:border-green-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Contraseña</label>
            <input
              {...register("password")}
              type="password"
              placeholder="****"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition-all focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-100" : "border-gray-300 focus:ring-green-100 focus:border-green-500"
              }`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.password.message}</p>}
          </div>

          {serverError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 font-medium animate-in slide-in-from-top-1">
              {serverError}
            </p>
          )}

          {success && (
            <p className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3 font-medium animate-in slide-in-from-top-1">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Registrando...</span>
              </>
            ) : (
              "Registrarme"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-green-600 font-bold hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;