import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UploadNotes from "./pages/UploadNote";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DownloadNotes from "./pages/DownloadNotes";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadNotes />} />
            <Route path="/download" element={<DownloadNotes />} /> {/* NEW */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
