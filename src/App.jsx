import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { Error, Login, Product_page } from "./pages/Index_page";

function App() {
  
  const AccessToken = localStorage.getItem("token");
  if ( !AccessToken ) {
    return <Login />
  }

  return (
    <>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Navigate to={"/product_page"} />} />
          <Route path="*" element={<Error />} />
          <Route path="/login_page" element={<Login />} />
          <Route path="/product_page" element={<Product_page />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
