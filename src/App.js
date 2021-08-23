import React, { lazy, Suspense } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";

import "./App.css";

function App() {
  return (
    <>
      <SideMenu />
      <div className="relative md:ml-64">
        <Header />
        <div className="h-96 pt-16">
          <div className="px-4 md:px-10 my-16 mx-auto w-full">
            <span className="font-bold text-3xl font-nunito">Selamat datang di Portal Web Reader Gramedia Digital</span>
            <p className="font-normal text-base font-nunito py-8">Portal ini masih dalam tahap pengembangan / beta tester. Jadi masih ada beberapa fitur yang belum tersedia untuk saat ini.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
