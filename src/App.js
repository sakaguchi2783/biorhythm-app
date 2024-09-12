import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';        // Home.js を正しいディレクトリからインポート
import Diagnosis from './components/Diagnosis';  // Diagnosis.js を正しいディレクトリからインポート
import Result from './components/Result';    // Result.js を正しいディレクトリからインポート


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
