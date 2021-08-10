import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";

import "./App.css";

function App() {
  return (
    <>
      <SideMenu />
      <div className="relative md:ml-64">
        <Header />
        <div className="bg-blue-500 h-96 pt-12">
          <div className="px-4 md:px-10 mx-auto w-full"></div>
          <div>lorem ipsum dolor sit</div>
        </div>
      </div>
    </>
  );
}

export default App;
