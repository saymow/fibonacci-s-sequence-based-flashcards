import React from 'react';
import Routes from "./routes";

import { AuthProvider } from "./contexts/auth";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
