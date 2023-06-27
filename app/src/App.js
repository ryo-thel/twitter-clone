import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Activation from './routes/Activation';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/activate/:uid/:token" element={<Activation />} />
          </Routes>
      </Router>
  );
}

export default App;