import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { Error_page, Login_page, Product_page, ShowAll_page } from "./pages/Index_page";

function App() {
  
  const AccessToken = localStorage.getItem("token");
  if ( !AccessToken ) {
    return <Login_page />
  }

  return (
    <>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Navigate to={"/product_page"} />} />
          <Route path="*" element={<Error_page />} />
          <Route path="/product_page" element={<Product_page />} />
          <Route path="/showall_page" element={<ShowAll_page />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
