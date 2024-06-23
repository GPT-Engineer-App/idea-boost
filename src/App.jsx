import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

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
          <Route exact path="/donate" element={<Donate />} />
          <Route exact path="/vote" element={<Vote />} />
          <Route exact path="/create-project" element={<CreateProject />} />
          <Route exact path="/project-details" element={<ProjectDetails />} />
          <Route exact path="/tasks" element={<Tasks />} />
          <Route exact path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;