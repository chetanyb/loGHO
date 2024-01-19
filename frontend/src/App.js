import React from "react";
import { WagmiConfig } from "wagmi";
import { config } from "./components/common/ConnectKit"; // Import the config
import HomePage from "./pages/HomePage";
import GetGHO from "./pages/GetGHO";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <WagmiConfig config={config}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/getgho" element={<GetGHO />} />
          </Routes>
        </div>
      </Router>
    </WagmiConfig>
  );
}

export default App;
