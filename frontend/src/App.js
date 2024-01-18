import HomePage from "./pages/HomePage";
import GetGHO from "./pages/GetGHO";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/getgho" element={<GetGHO />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
