// services/authService.ts

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error: ${response.status} - ${errorMessage}`);
        }

        const data = await response.json();

        // Guarda el userId y userName en localStorage
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.userName);

        return data; // Retorna la respuesta completa
    } catch (error) {
        console.error("Error en la solicitud de inicio de sesión:", error);
        throw error;
    }
};

  
export const register = async (email: string, password: string, username: string) => {
    try {
        const response = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, userName: username }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        // Guarda el userId y userName en localStorage
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.userName);

        return data; // Retorna la respuesta después del registro
    } catch (error) {
        console.error("Error en la solicitud de registro:", error);
        throw error;
    }
};

  
  