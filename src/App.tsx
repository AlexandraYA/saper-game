import React from 'react'
import { Layout } from './pages/Layout/Layout'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Game } from './pages/Game/Game';
import { About } from './pages/About/About';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/:levelCode" element={<Game />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
