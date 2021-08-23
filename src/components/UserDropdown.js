import React, { useState } from "react";
import Cookies from "js-cookie";
import {UserCircleIcon} from '@heroicons/react/outline';
import Diamond from '../assets/diamond.svg'

const getOffers =(offers)=> {
  return JSON.parse(offers)
}

const UserDropdown = () => {
  const [menu, setMenu] = useState(false);
  const username = Cookies.get('username') != null ? Cookies.get('username') : '';
  const packageName = Cookies.get('offer');
  const getPackage = packageName ? getOffers(packageName) : "";
  const offerName = getPackage ? getPackage.map((item, index)=>{
    return (
      <div className="flex ml-6">
        <img src={Diamond} alt="diamond-icon" className="w-5 h-5 mx-1 my-2" />
        <span className="block px-4 py-2 text-sm text-gray-700 float-right font-nunito">
          {item.name}
        </span>
      </div>
    )
  }): '';

  const handleLogout = () => {
    Cookies.remove('username');
    Cookies.remove('token');
    Cookies.remove('offer');
    window.location.href = '/login';
  }

  return (
    <>
      <nav>
        <div className="ml-3">
          <div>
            <button
              type="button"
              className="float-right max-w-xs rounded-full flex items-center text-sm focus:outline-none text-white space-x-4"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
              onClick={(e) => {
                setMenu(!menu);
              }}
            >
              <span className="text-lg font-nunito">Hello, {username}</span>
              <UserCircleIcon className="w-10 h-10 "/>
            </button>
          </div>
          {menu && (
            <div
              className={getPackage !== '' ? 
                "origin-top-right absolute right-0 mt-10 transition duration-150 ease-out w-64 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                :
                "origin-top-right absolute right-0 mt-10 transition duration-150 ease-out w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              }
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              {/* {packageName ?
                <div className="flex ml-6">
                  <img src={Diamond} alt="diamond-icon" className="w-5 h-5 mx-1 my-2" />
                  <span className="block px-4 py-2 text-sm text-gray-700 float-right font-nunito">
                    {packageName}
                  </span>
                </div>
                :
                ''
              } */}
              {offerName}
              
              <button className="block px-5 py-2 text-sm text-gray-700 float-right" onClick={()=>handleLogout()}>
                Sign out
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default UserDropdown;
