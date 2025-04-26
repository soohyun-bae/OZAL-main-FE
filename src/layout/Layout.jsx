import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Nav/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
