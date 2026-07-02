import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";


interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: any) => void; 
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const isAuthenticated = !!token; 


  const login = (newToken: string, newUser: any) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
  };

  const logout = async () => {
    const userString = localStorage.getItem("user");

    if(userString){
      const user = JSON.parse(userString);

      try{
        await fetch("http://localhost:3000/api/admin/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({userId: user.id}),
        });
      }catch(err) {
        console.error("fail to send log logout to server", err);
      }
    }


    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};