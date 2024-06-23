import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Donate from "./pages/Donate.jsx";
import Vote from "./pages/Vote.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import SharedLayout from "./components/SharedLayout.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";

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
          <Route exact path="/project-detail" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;