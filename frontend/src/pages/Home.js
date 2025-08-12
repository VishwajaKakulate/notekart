// src/pages/Home.js
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div style={{ textAlign: "center", padding: "40px" }}>
            <h1>📚 Welcome to Notes App</h1>
            <p>Upload your notes or download existing ones easily!</p>

            <div style={{ marginTop: "30px" }}>
                <Link
                    to="/upload"
                    style={{
                        display: "inline-block",
                        margin: "10px",
                        padding: "12px 20px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        borderRadius: "5px",
                        textDecoration: "none",
                        fontWeight: "bold"
                    }}
                >
                    Upload Notes
                </Link>

                <Link
                    to="/download"
                    style={{
                        display: "inline-block",
                        margin: "10px",
                        padding: "12px 20px",
                        backgroundColor: "#2196F3",
                        color: "white",
                        borderRadius: "5px",
                        textDecoration: "none",
                        fontWeight: "bold"
                    }}
                >
                    Download Notes
                </Link>
            </div>

            <div style={{ marginTop: "40px" }}>
                <Link to="/login" style={{ marginRight: "20px" }}>Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}
