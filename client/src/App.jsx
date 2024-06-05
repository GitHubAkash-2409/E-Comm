import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <AppHeader />
      <main>
      <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
