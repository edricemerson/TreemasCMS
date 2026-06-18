import { useState, useEffect } from "react"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router-dom"

function Login() {
   const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = ("/menu/dashboard");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
// NYALAIN KALO MISAL MAU DEVELOPMENT
        // localStorage.setItem("token","dummy-token");

        // localStorage.setItem("user", JSON.stringify({ id: 1, name: "John Doe"}));

        // window.location.href = ("/menu/dashboard");
//SAMPE SINI AJA
        try {
            const response = await fetch("http://localhost:3000/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: username,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Invalid credentials");
            }

            login(data.token, data.user);
            
            window.location.href = ("/menu/dashboard");

        } catch (err: any) {
            setError(err.message || "Login failed");
        }
       // window.location.href = ("/menu/dashboard");
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">

                    <div className="flex flex-col items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">TMS CSR Login</h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Access your business assessment dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-2 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-2 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-800 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login