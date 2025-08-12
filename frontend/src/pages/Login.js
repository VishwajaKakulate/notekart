import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include" // For cookies if your backend sets them
            });

            const data = await res.json();

            if (res.ok) {
                // Save token in localStorage for later use
                if (data.token) {
                    localStorage.setItem("authToken", data.token);
                }

                alert("Login successful!");
                console.log("Token stored:", data.token);

                navigate("/"); // Redirect to home after login
            } else {
                alert(data.message || "Something went wrong");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Network error");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
