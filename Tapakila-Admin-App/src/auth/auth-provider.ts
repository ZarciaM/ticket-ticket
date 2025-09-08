import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  checkAuth: async function (): Promise<void> {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("Veuiller connecter");
    }

    const response = await fetch("http://localhost:3000/api/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok ? Promise.resolve() : Promise.reject();
  },

  checkError: async function (error: any): Promise<void> {
    const { status } = error;

    if (status === 401 || status === 403) {
      localStorage.removeItem("accessToken");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  login: async function (params: any): Promise<void> {
    const { email, password } = params;

    const loginResult = await fetch("http://localhost:3000/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (loginResult.status !== 200) {
      throw new Error("Erreur d’authentification");
    }

    const { accessToken } = await loginResult.json();

    localStorage.setItem("accessToken", accessToken);
  },

  logout: async function (): Promise<void | false | string> {
    localStorage.removeItem("accessToken");
    return Promise.resolve();
  },
};
