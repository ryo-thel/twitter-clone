import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Activation from './routes/Activation';

function App() {
  return (
    <Routes>
      <Route path="/activate/:uid/:token" element={<Activation />} />
    </Routes>
  );
}

export default App;