import { useEffect, useState } from "react";

export default function DownloadNotes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api/notes")
            .then((res) => {
                console.log("API status:", res.status);
                if (!res.ok) throw new Error(`Failed to fetch notes: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                console.log("Fetched notes:", data);
                setNotes(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p style={{ textAlign: "center" }}>Loading notes...</p>;
    if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}>📥 Download Notes</h1>

            {notes.length === 0 ? (
                <p style={{ textAlign: "center" }}>No notes available to download.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {notes.map((note) => (
                        <li
                            key={note._id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "10px",
                                margin: "8px 0",
                                border: "1px solid #ddd",
                                borderRadius: "5px",
                                background: "#f9f9f9"
                            }}
                        >
                            <span>{note.title}</span>
                            <a
                                href={`http://localhost:5000/uploads/${note.file}`}
                                download
                                style={{
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    padding: "6px 12px",
                                    textDecoration: "none",
                                    borderRadius: "4px"
                                }}
                            >
                                Download
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
