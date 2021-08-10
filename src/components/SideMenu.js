import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { MenuIcon, XIcon } from "@heroicons/react/solid";
import UserDropdown from "./UserDropdown";

const SideMenu = () => {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const [userName, setUserName] = useState("");
  const [Premium, setPremium] = useState("");
  useEffect(() => {
    setUserName(localStorage.getItem("username"));
    setPremium(PremiumList());
  }, []);
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-50 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <MenuIcon className="text-black h-6 w-6" />
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 hidden whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            <img src={Logo} alt="Gramedia Digital" />
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown name={userName} />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    <img src={Logo} alt="Gramedia Digital" />
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <XIcon className="w-6 h-6 text-black" />
                  </button>
                </div>
              </div>
            </div>
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Grasindo
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {Premium
                ? Premium.map((p) => {
                    return (
                      <li className="items-center">
                        <Link
                          className={
                            "text-xs uppercase py-3 font-bold block " +
                            (window.location.href.indexOf(
                              "/premium/" + p.id
                            ) !== -1
                              ? "text-lightBlue-500 hover:text-lightBlue-600"
                              : "text-blueGray-700 hover:text-blueGray-500")
                          }
                          to={"/premium/" + p.id}
                        >
                          {p.name}
                        </Link>
                      </li>
                    );
                  })
                : ""}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

const PremiumList = () => {
  let data = [
    { id: 112023, name: "Paket Grasindo SD Kelas 1" },
    { id: 112024, name: "Paket Grasindo SD Kelas 2" },
    { id: 112026, name: "Paket Grasindo SD Kelas 3" },
    { id: 112027, name: "Paket Grasindo SD Kelas 4" },
    { id: 112028, name: "Paket Grasindo SD Kelas 5" },
    { id: 12029, name: "Paket Grasindo SD Kelas 6" },
  ];
  return data;
};
export default SideMenu;
