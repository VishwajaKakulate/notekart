import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function UploadNotes() {
    const [branch, setBranch] = useState("");
    const [subject, setSubject] = useState("");
    const [unitFrom, setUnitFrom] = useState("");
    const [unitTo, setUnitTo] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        const token = localStorage.getItem("token"); // ✅ Get token from localStorage
        if (!token) {
            setMessage("❌ No token found. Please log in first.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("branch", branch);
            formData.append("subject", subject);
            formData.append("unitFrom", unitFrom);
            formData.append("unitTo", unitTo);
            formData.append("file", file);

            const res = await fetch("http://localhost:5000/api/notes/upload", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ Send token here
                },
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("✅ Notes uploaded successfully!");
                // Clear form
                setBranch("");
                setSubject("");
                setUnitFrom("");
                setUnitTo("");
                setFile(null);
            } else {
                setMessage(`❌ Failed to upload: ${data.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Upload error:", error);
            setMessage("❌ Server error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>📤 Upload Notes</h2>
            {message && (
                <div className={`alert ${message.startsWith("✅") ? "alert-success" : "alert-danger"}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="p-4 shadow">
                <div className="mb-3">
                    <label>Branch</label>
                    <select
                        className="form-control"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        required
                    >
                        <option value="">Select Branch</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Subject</label>
                    <input
                        type="text"
                        className="form-control"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 d-flex gap-3">
                    <div>
                        <label>Unit From</label>
                        <input
                            type="number"
                            min="1"
                            max="8"
                            className="form-control"
                            value={unitFrom}
                            onChange={(e) => setUnitFrom(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Unit To</label>
                        <input
                            type="number"
                            min={unitFrom || 1}
                            max="8"
                            className="form-control"
                            value={unitTo}
                            onChange={(e) => setUnitTo(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label>Upload File</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Uploading..." : "Upload"}
                </button>
            </form>
        </div>
    );
}

export default UploadNotes;
