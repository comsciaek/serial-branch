import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { Home, Error, Login } from "./pages/pages_index";

function App() {
  return (
    <>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Navigate to={"/home_page"} />} />
          <Route path="*" element={<Error />} />
          <Route path="/home_page" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
