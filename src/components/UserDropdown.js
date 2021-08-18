import React, { useState } from "react";
import Cookies from "js-cookie";
import {UserCircleIcon} from '@heroicons/react/outline';
import { useHistory } from "react-router-dom";

const UserDropdown = () => {
  const [menu, setMenu] = useState(false);
  const username = Cookies.get('username') != null ? Cookies.get('username') : '';

  const handleLogout = () => {
    Cookies.remove('username');
    Cookies.remove('token');
    Cookies.remove('offerId');
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
              <span className="text-lg font-normal">{username}</span>
              {/* <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              /> */}
              <UserCircleIcon className="w-10 h-10 "/>
            </button>
          </div>
          {menu && (
            <div
              className="origin-top-right absolute right-0 mt-10 transition duration-150 ease-out w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <button className="block px-4 py-2 text-sm text-gray-700" onClick={()=>handleLogout()}>
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
