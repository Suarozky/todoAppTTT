"use client"; // Asegúrate de que este es un componente del lado del cliente

import { useAuthStore } from "../../store/authStore";
import { login, register } from "../../services/authService";

const Auth: React.FC = () => {
  const {
    isLogin,
    email,
    password,
    username,
    toggleLogin,
    setEmail,
    setPassword,
    setUsername,
  } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Maneja el inicio de sesión
        const response = await login(email, password);
        console.log("Inicio de sesión exitoso:", response);

        // Almacena el accessToken en el almacenamiento local
        localStorage.setItem("accessToken", response.accessToken);

        // Redirige al usuario a la ruta principal usando window.location
        window.location.href = "/";
      } else {
        // Maneja el registro
        const response = await register(email, password, username);
        console.log("Registro exitoso:", response);

        // Redirige al usuario después del registro, si lo deseas
        window.location.href = "/"; // Descomenta si quieres redirigir después del registro
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      // Aquí puedes manejar el error y mostrar un mensaje al usuario
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl text-green-400 font-bold mb-4">
          {isLogin ? "Iniciar Sesión" : "Registrar"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="username"
              >
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white rounded-md p-2"
          >
            {isLogin ? "Iniciar Sesión" : "Registrar"}
          </button>
          <button
            type="button"
            onClick={toggleLogin}
            className="w-full text-green-400 mt-4"
          >
            {isLogin
              ? "¿No tienes una cuenta? Regístrate"
              : "¿Ya tienes una cuenta? Inicia sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
