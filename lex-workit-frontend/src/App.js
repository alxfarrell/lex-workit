import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cindex from "./pages/cindex";
import CreateAccount from "./pages/createacc";
import Login from "./pages/login";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/cindex" element={<Cindex />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;