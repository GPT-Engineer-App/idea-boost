import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // Import ProtectedRoute
import Profile from "./pages/Profile.jsx";
import Tasks from "./pages/Tasks.jsx";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Donate from "./pages/Donate.jsx";
import Vote from "./pages/Vote.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import SharedLayout from "./components/SharedLayout.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<SharedLayout />}>
          <Route exact path="/" element={<Index />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/donate" element={<ProtectedRoute><Donate /></ProtectedRoute>} />
          <Route exact path="/vote" element={<ProtectedRoute><Vote /></ProtectedRoute>} />
          <Route exact path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
          <Route exact path="/project-details" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
          <Route exact path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route exact path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;