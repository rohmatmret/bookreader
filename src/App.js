import React, { lazy, Suspense } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Greeting from './assets/Greeting.png'

import "./App.css";

function App() {
  return (
    <>
      <SideMenu />
      <div className="relative md:ml-64">
        <Header />
        <div className="h-96 pt-16">
          <div className="px-4 md:px-10 my-12 mx-auto w-full text-center">
            <span className="font-bold text-2xl font-nunito">Selamat datang di Portal Web Reader Gramedia Digital</span>
            <p className="font-normal text-base font-nunito py-8">Portal ini masih dalam tahap pengembangan, sehingga masih terdapat beberapa fitur yang belum tersedia.</p>
            <img src={Greeting} alt="greeting-img" className="w-5/12 mx-auto"/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
